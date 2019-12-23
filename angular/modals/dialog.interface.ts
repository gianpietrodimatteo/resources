import { Observable } from 'rxjs';

export interface DialogResult{
    /**
     * Indicates if dialog has confirmed or canceled
     */
    confirm : boolean;
    /**
     * when this field is marked as 'true',
     * the dialog won't be close
     */
    cancel : boolean;
}

export interface IDialog{
    title : string;
    body : string;
    size : string;
    offset : string;
    listen() : Observable<DialogResult>;
    close() : void;
}