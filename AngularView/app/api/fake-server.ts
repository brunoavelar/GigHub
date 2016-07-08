import { Injectable } from "angular2/core";
import { Request, RequestMethod, Response, ResponseOptions, Headers } from 'angular2/http';

import { GigApi, AttendanceApi, UserApi, NotificationApi } from './apis'

type RouteCallback = (request:Request) => Response; 

class Route {
    constructor(public method:RequestMethod, public urlRegex:RegExp, public callback:RouteCallback) {    }

    public matches(request:Request):boolean {
        if (this.method !== request.method) {
            return false;
        }

        return this.urlRegex.test(request.url);
    }
}

@Injectable()
export class FakeServer {

    private routes:Route[];

    constructor(private gigsApi:GigApi, private userApi:UserApi, private attendanceApi:AttendanceApi, private notificationApi:NotificationApi) {
        this.routes = [
            new Route(RequestMethod.Post, /\/token/, this.userApi.loginUser.bind(this.userApi)),
            new Route(RequestMethod.Get, /\/api\/attendances\/\d+/, this.attendanceApi.isAttending.bind(this.attendanceApi)),
            new Route(RequestMethod.Get, /\/api\/gigs\/\d+/, this.gigsApi.getGig.bind(gigsApi)),
            new Route(RequestMethod.Get, /\/api\/gigs/, this.gigsApi.getGigs.bind(gigsApi)),
            new Route(RequestMethod.Post, /\/api\/attendances/, this.attendanceApi.attend.bind(this.attendanceApi)),
            new Route(RequestMethod.Get, /\/api\/notifications/, this.notificationApi.getNotifications.bind(this.notificationApi)),
            new Route(RequestMethod.Post, /\/api\/notifications/, this.notificationApi.markAsRead.bind(this.notificationApi))
        ]
    }

    getData(request:Request):Response{
        var response:Response;
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if(route.matches(request)){
                response = route.callback(request);
                
                break;
            }
        }
        
        return response;
    }

    createResponse(data:any, url:string):Response{
        var headers:Headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8')

        let options:ResponseOptions = new ResponseOptions({ 
            body: JSON.stringify(data),
            headers: headers,
            status: 200,
            statusText: "ok",
            type: 2,
            url: url
        });
        return new Response(options);
    }
}