import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

export const LOADING_SHOW_EVENT = 'LoadingShowEvent';
export const LOADING_HIDE_EVENT = 'LoadingHideEvent';

@Component({
  selector: 'jhi-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  
  private showEvent : Subscription;
  private hideEvent : Subscription;
  
  public visible: boolean = false;
  public infinity: boolean = true;
  private $progress: number = 0;
  public get progress() { return this.$progress; }
  public set progress(value: number) {
    this.$progress = value;
    this.infinity = false;
  }
  getProgressBarStyle() {
    if(!this.infinity)
      return {transform:`scaleX(${this.progress/100.0})`};
    else
      return {};  
  }
  constructor(private eventManager : JhiEventManager) { }

  ngOnInit() {
    this.showEvent = this.eventManager.subscribe(LOADING_SHOW_EVENT,()=>this.show());
    this.hideEvent = this.eventManager.subscribe(LOADING_HIDE_EVENT,()=>this.hide());
  }
  ngOnDestroy(): void {
    this.eventManager.destroy(this.showEvent);
    this.eventManager.destroy(this.hideEvent);
  }
  public show() {
    this.visible = true;
  }
  public hide() {
    this.visible = false;
  }
  public toggle() {
    this.visible = !this.visible;
  }
}
