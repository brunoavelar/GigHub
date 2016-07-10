import { Injectable, ReflectiveInjector, provide } from "angular2/core";
import { Http, Response, Headers, RequestOptions, ResponseOptions, ConnectionBackend, BaseRequestOptions } from 'angular2/http';
import { MockBackend, MockConnection } from 'angular2/http/testing';
import { Observable } from 'rxjs/Observable';

import { FakeServer } from './fake-server'
import { Delay } from './delay'
import { GigApi, AttendanceApi, UserApi, NotificationApi } from './apis'

@Injectable() 
export class FakeHttp{
    private http:Http;
    private server:FakeServer;
    protected backend: MockBackend

    constructor() {
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
            UserApi,
            provide(
                GigApi,
                {
                    useFactory: (userApi) => new GigApi(userApi), 
                    deps: [UserApi] 
                }
            ),
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

    get(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        
        return this.http.get(url, defaultOptions);
    }

    post(url:string, body:any, defaultOptions?: RequestOptions): Observable<Response> {
        
        return this.http.post(url, body, defaultOptions);
    }

    delete(url:string, defaultOptions?: RequestOptions): Observable<Response> {
        
        return this.http.delete(url, defaultOptions);
    }
    
}