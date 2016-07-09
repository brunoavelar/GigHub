import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions, ConnectionBackend } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

const rootUrl = 'http://localhost:53009/api'

@Injectable()
export class AuthorizedHttp {
    
    constructor(private http: Http) {
    }   

    private createHeaders():Headers {
        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.appendAuthorization(headers);

        return headers;
    }

    private appendAuthorization(headers:Headers):void {
        headers.append('Authorization', 'bearer '+ localStorage.getItem('access_token'));
    }

    private manageRequestOptions(defaultOptions?:RequestOptions) {
        if(defaultOptions && defaultOptions.headers){
            this.appendAuthorization(defaultOptions.headers);
        }else{
            defaultOptions = new RequestOptions({ headers: this.createHeaders() }); 
        }

        return defaultOptions;
    }

    get(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.manageRequestOptions(defaultOptions);

        return this.http.get(rootUrl+url, options);
    }

    post(url:string, body:any, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.manageRequestOptions(defaultOptions);

        return this.http.post(rootUrl+url, body, options);
    }

    delete(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.manageRequestOptions(defaultOptions);

        return this.http.delete(rootUrl+url, options);
    }

    
}