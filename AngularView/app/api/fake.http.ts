import { Injectable, ReflectiveInjector, provide } from "angular2/core";
import { Http, Response, Headers, RequestOptions, ResponseOptions, ConnectionBackend, BaseRequestOptions } from 'angular2/http';
import { MockBackend, MockConnection } from 'angular2/http/testing';
import { Observable } from 'rxjs/Observable';

import { FakeServer } from './fake-server'
import { Delay } from './delay'
import { GigApi, AttendanceApi, UserApi, NotificationApi } from './apis'

@Injectable() 
export class FakeHttp extends Http {
    private http:Http;
    private server:FakeServer;

    constructor(protected backend?: MockBackend, protected _defaultOptions?: RequestOptions) {
        super(backend, _defaultOptions);
        
        let injector = this.setupInjector();
        this.http = injector.get(Http);
        this.backend = injector.get(MockBackend);
        this.server = injector.get(FakeServer);

        this.backend.connections.subscribe((connection:MockConnection) => {
            setTimeout(() => {
                let response:Response = this.server.getData(connection.request);
            
                connection.mockRespond(response);
            }, Delay)
            
        });
    } 

    private setupInjector(){
        return ReflectiveInjector.resolveAndCreate([
            MockBackend,
            BaseRequestOptions,
            provide(
                Http,
                {
                    useFactory: (backend, defaultOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ),
            GigApi,
            UserApi,
            provide(
                AttendanceApi, 
                {
                    useFactory: (userApi) => new AttendanceApi(userApi), 
                    deps: [UserApi] 
                }
            ),
            provide(
                NotificationApi, 
                {
                    useFactory: (userApi) => new NotificationApi(userApi), 
                    deps: [UserApi] 
                }
            ),
            FakeServer
        ]); 
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
        
        return this.http.get(url, options);
    }

    post(url:string, body:any, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.manageRequestOptions(defaultOptions);

        return this.http.post(url, body, options);
    }

    delete(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        let options:RequestOptions = this.manageRequestOptions(defaultOptions);

        return this.http.delete(url, options);
    }
    
}