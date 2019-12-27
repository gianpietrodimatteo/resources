import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { Moment } from 'moment';
import * as moment from 'moment';
type ResponseOptions = {observe:'response', responseType:'text'};
export type Response<T> = Observable<HttpResponse<T>>;
export type ResponseBlob = Observable<HttpResponse<Blob>>;
export type FactoryType<T>= (new ()=> T);
@Injectable()
export class BaseService{
    protected resourceUrl = SERVER_API_URL+"api";
    constructor(protected http : HttpClient){}

    private getUrl(url : string) : string{
        return `${this.resourceUrl}/${url}`;
    }
    private get responseOptions() : ResponseOptions{
        return {observe:'response', responseType:'text'};
    }
    
    protected tryGetRaw(url : string, options? : any) : Response<string>{
        return this.http.get(this.getUrl(url),{observe:'response',params: options, responseType:'text'});
    }
    protected tryPostRaw(url : string, body : any) : Response<string>{
        return this.http.post(this.getUrl(url),body,this.responseOptions);
    }
    protected tryDeleteRaw(url : string) : Response<string>{
        return this.http.delete(this.getUrl(url),this.responseOptions);
    }
    protected tryPutRaw(url : string,body :any) : Response<string>{
        return this.http.put(this.getUrl(url),body,this.responseOptions);
    }

    protected tryGet<T>(url : string, options? : any) : Response<T>{
        return this.http.get<T>(this.getUrl(url),{params:options,observe:'response'});
    }
    protected tryPost<T>(url : string, body: any) : Response<T>{
        return this.http.post<T>(this.getUrl(url),body,{observe:'response'});
    }
    protected tryDelete<T>(url : string) : Response<T>{
        return this.http.delete<T>(this.getUrl(url),{observe:'response'});
    }
    protected tryPut<T>(url: string, body : any) : Response<T>{
        return this.http.put<T>(this.getUrl(url),body,{observe:'response'});
    }
    protected tryUpload<T>(url: string, body : FormData) : Observable<HttpEvent<T>>{
        let req = new HttpRequest('POST',this.getUrl(url),body,{reportProgress:true});
        return this.http.request<T>(req);
    }
    protected tryDownload(url : string){
        return this.http.get(this.getUrl(url),{observe:'response',responseType:'blob'});
    }
    protected parseToMoment(value : any) : Moment {
        if(value.constructor.name === 'String')
            value = moment(value,'YYYY-MM-DD');
        return value;
    }
}