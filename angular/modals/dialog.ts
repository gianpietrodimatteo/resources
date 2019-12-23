import { Component } from '@angular/core';
import { IDialog, DialogResult } from './dialog.interface';
import { Observable, Observer } from 'rxjs';
import { LazyModalComponent } from '../lazy-modal/lazy-modal.component';

class DialogViewModel{
    public body : string;
    private confirmCallback : Function;
    private cancelCallback  : Function;

    constructor(confirmFn : Function, cancelCallback : Function){
        this.confirmCallback = confirmFn;
        this.cancelCallback = cancelCallback;
    }
    confirm() : void{
        this.confirmCallback();
    }
    cancel() : void{
        this.cancelCallback();
    }
}

@Component({
    templateUrl: './templates/dialog.html',
    styleUrls: ['./templates/dialog.css']
})
export class DialogComponent implements IDialog{
    public data : DialogViewModel;
    private observer : Observer<DialogResult>;
    public get title() : string{
        return this.modal.title;
    }
    public set title(value : string){
        this.modal.title = value;
    }
    public get body() : string{
        return this.data.body;
    }
    public set body(value : string){
        this.data.body = value;
    }
    public get size() : string{
        return this.modal.modalStyle.marginLeft;
    }
    public set size(value : string){
        this.modal.modalStyle.marginLeft = this.modal.modalStyle.marginRight = value;
    }
    public get offset() : string{
        return this.modal.modalStyle.marginTop;
    }
    public set offset(value : string){
        this.modal.modalStyle.marginTop = value;
    }
    constructor(private modal : LazyModalComponent){
        this.size = '35vw';
        this.offset = '15vh';
        this.data = new DialogViewModel(
            ()=> this.onConfirm(),
            () => this.onCancel());
    }
    public listen() : Observable<DialogResult>{
        return Observable.create((observer)=>{
            this.observer = observer;
        });
    }
    public close() : void{
        this.modal.close();
    }
    private onConfirm() : void{
        this.tryNotify(this.makeDialogResult(true));
    }
    private onCancel() : void{
        this.tryNotify(this.makeDialogResult(false));
    }
    private tryNotify(result : DialogResult){
        if(this.observer == null)
        {
            this.modal.close();
            return;
        }

        this.observer.next(result);
        this.observer.complete();

        if(!result.cancel)
            this.modal.close();
    }
    private makeDialogResult(confirmed : boolean) : DialogResult{
        return {confirm : confirmed,cancel : false};
    }
}
