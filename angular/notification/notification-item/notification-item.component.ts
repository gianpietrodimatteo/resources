import { Component, Output, Input, HostListener, ElementRef,EventEmitter } from '@angular/core';
import { Notification } from '../notification.component';
import { isNullOrUndefined } from 'util';
const TRANSITION_DURATION : number = 300;
const DISPATCH_THRESHOLD : number = 0.5;
@Component({
  selector: 'jhi-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent {
  @Output('remove')
  public onRemove: EventEmitter<any> = new EventEmitter();
  @Input('data')
  public data: Notification;
  /*
    VIEW VARIABLES
  */
  private $style : any = {transform : '', opacity: 1};
  public get style() : any{
    if(!isNullOrUndefined(this.data['__destroyed__']))
    {
      if(this.data['__destroyed__'])
        this.$style.opacity = 0;
    }
    return this.$style;
  }
  private drag: boolean = false;
  private initialOffset : number = 0;
  private offset : number = 0;
  constructor(private element : ElementRef) { }

  public isDestroyed() : boolean{
    if(isNullOrUndefined((this.data as any)['__destroyed__']))
      return false;
    let state = (this.data as any)['__destroyed__'];
    if(state)
      delete this.style.opacity;
    return state;
  }
  @HostListener('mousedown',['$event'])
  private onInitDrag(event : MouseEvent): void {
    this.drag = true;
    this.initialOffset = event.clientX;
  }
  @HostListener('window:mousemove', ['$event'])
  private onDrag(event: MouseEvent): void {
    if (!this.drag)
      return;

    this.offset = Math.clamp(event.clientX - this.initialOffset,-9999,0);
    this.$style.transform = `translateX(${this.offset}px)`;
    this.$style.opacity = 1 - this.getPercent();
  }
  @HostListener('window:mouseup',['$event'])
  private onDragEnd(event : MouseEvent) : void{
    this.drag = false;
    let percent = this.getPercent();
    if(percent < DISPATCH_THRESHOLD)
    {
      this.resetCard();
      return;
    }
    this.dispatchCard();
    setTimeout(()=>{
      this.onRemove.emit();
    },TRANSITION_DURATION + 10);
  }
  private getPercent() : number{
    let element : HTMLElement = this.element.nativeElement;
    let rect = element.getBoundingClientRect();

    let offset = this.offset < 0 ? this.offset * -1 : this.offset;
    return offset / rect.width;
  }
  private dispatchCard() : void{
    this.$style.opacity = 0;
    this.$style.transform = `translateX(-100%)`;
    this.$style.transition = TRANSITION_DURATION+'ms';
  }
  private resetCard() : void{
    this.$style.opacity = 1;
    this.$style.transform = `translateX(0)`;
    this.$style.transition = TRANSITION_DURATION+'ms';
    setTimeout(() => {
      delete this.$style.transition;
    },TRANSITION_DURATION);
  }
}
