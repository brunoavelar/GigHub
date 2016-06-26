import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions, ConnectionBackend } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthorizedHttp {

    constructor(private http: Http) {
    }   

    private createHeaders():Headers {
        let headers:Headers = new Headers();
        this.appendAuthorization(headers);

        return headers;
    }

    private appendAuthorization(headers:Headers):void {
        headers.append('Authorization', 'bearer '+ localStorage.getItem('access_token'));
    }

    private ManageRequestOptions(defaultOptions?:RequestOptions) {
        if(defaultOptions && defaultOptions.headers){
            this.appendAuthorization(defaultOptions.headers);
        }else{
            defaultOptions = new RequestOptions({ headers: this.createHeaders() }); 
        }

        return defaultOptions;
    }

    get(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.ManageRequestOptions(defaultOptions);

        return this.http.get(url, options);
    }

    
}