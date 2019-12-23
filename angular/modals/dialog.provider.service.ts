import { Injectable, Injector } from '@angular/core';
import { IDialog } from './dialog.interface';
import { LazyModalComponent } from '../lazy-modal/lazy-modal.component';
import { DialogComponent } from './dialog';

@Injectable({providedIn: 'root'})
export class DialogProvider{
    constructor(private injector : Injector){
        
    }
    showDialog(title? : string) : IDialog{
        return LazyModalComponent.instance.show(title,DialogComponent);
    }
}