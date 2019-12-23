import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { DrawerLayoutComponent } from '../drawer-layout/drawer-layout.component';
import { Router } from '@angular/router';
export const NOTIFICATION_EVENT: string = 'NOTIFICATION_EVENT';
export const NOTIFICATION_TOGGLE_EVENT : string = 'NOTIFICATION_TOGGLE';
export enum NotificationType {
  success = 0,
  error = 1,
  warning = 2
}
export interface Notification {
  id? : any;
  data: string;
  type: NotificationType;
  timeout? : number;
}

@Component({
  selector: 'jhi-notification',
  templateUrl: './notification.component.html',
  styleUrls : ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private $notifications: Notification[] = [];
  public get notifications(): Notification[] {
    return this.$notifications;
  }
  public get notificationErrors() : Notification[]{
    return this.$notifications.filter(x => x.type == NotificationType.error);
  }
  private toggleEvent : Subscription;
  private event: Subscription;
  @ViewChild('drawer')
  private drawer : DrawerLayoutComponent;
  
  /*
    VIEW VARIABLES
  */
  public dispatched : boolean =true;
  public unreadNotifications : number = 0;
  
  constructor(private eventManager: JhiEventManager, private router : Router) { }

  public ngOnInit(): void {
    this.router.events.subscribe((event)=> {
      let lastNotification = this.$notifications[this.$notifications.length - 1];
      if(lastNotification != null){
        // Dispatch if only notification don't has a timeout
        if(lastNotification.timeout == null)
          this.dispatched = true;
      }
    });
    this.event = this.eventManager.subscribe(NOTIFICATION_EVENT, (event) => {this.handleNotification(event.data);});
    this.toggleEvent = this.eventManager.subscribe(NOTIFICATION_TOGGLE_EVENT,(event)=>this.showNotifications());
  }
  public ngOnDestroy(): void {
    this.eventManager.destroy(this.event);
    this.eventManager.destroy(this.toggleEvent);
  }
  /**
   * Trigger a success notification in component
   * @param value Value has displayed
   */
  public success(value: string, id? : any): void {
    this.handleNotification({
      data: value,
      type: NotificationType.success,
      timeout : 5000
    });
  }
  /**
   * Trigger a error notification in component
   * @param value Value has displayed
   */
  public error(value: string, id?: any): void {
    this.handleNotification({
      data: value,
      id : id,
      type: NotificationType.error
    });
  }
  /**
   * Trigger a warning notification in component
   * @param value Value has displayed
   */
  public warning(value: string, id? : string): void {
    this.handleNotification({
      data: value,
      id: id,
      type: NotificationType.warning
    });
  }
  public clear() : void{
    this.$notifications = [];
    this.unreadNotifications = 0;
  }
  public showNotifications() : void{
    this.drawer.toggle();
    this.unreadNotifications = 0;
  }
  private handleNotification(data: Notification): void {
    let notification : Notification = null;
    if(data.id != null)
      notification = this.$notifications.find(x => x.id == data.id);

    if(notification != null){
      notification.data = data.data;
      notification.timeout = data.timeout;
      notification.type = data.type;
      data = notification;
    }else{
      notification = data;
      this.$notifications.push(data);
    }
    
    if(notification.type != NotificationType.success)
      this.unreadNotifications++;

    this.dispatched = false;
    if(data.timeout != null){
      setTimeout(()=>{
        let index = this.$notifications.indexOf(data);
        this.onRemove(index);
      },data.timeout);
    }
  }
  /*
    VIEW METHODS
  */
  onRemove(index : number) : void{
    if(this.$notifications[index] == undefined)
      return;
    this.$notifications.splice(index,1);
    this.dispatched = true;
  }
  onDispatchMainNotification() : void{
    this.dispatched = true;
    this.notifications.pop();
  }
}
