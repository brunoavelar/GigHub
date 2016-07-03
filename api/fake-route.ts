import { Request, Response, ResponseOptions } from 'angular2/http';

import { Gig } from "../app/gigs/index";

import { Gigs, Attendances, Users } from './server-data'

export interface Attendance {
    attendeeId:string;
    gigId:number;
}

class GigsApi {
    private gigs:Gig[];

    constructor(){
        this.gigs = Gigs.map(value => new Gig(value));
    }

    getGigs():Gig[] {
        return this.gigs;
    }
}

class AttendanceApi {
    private attendances:Attendance[] = Attendances;

    isAttending(request:Request):boolean {
        let gigId = /\d+/.exec(request.url)[0];
        return true;
    }
}

interface User {
    id:string;
    name:string;
    email:string;
}

class UserApi {
    private users:User[] = Users;

    loginUser(request:Request):any {
        let body:String = request.text();
        let begin:number = body.indexOf("&username=") + "&username=".length;
        let end:number = body.indexOf("&password=");
        let email = body.substring(begin, end);
        
        let user:User =  Users.find(user => user.email === email);

        return {
            access_token: '',
            token_type: '',
            userName: user.email
        };
    }
}

export class FakeServer {
    private responses:Response[];
    private attendanceApi:AttendanceApi = new AttendanceApi();
    private gigsApi:GigsApi = new GigsApi();
    private userApi:UserApi = new UserApi();

    constructor() {

    }

    getData(request:Request):Response{
        var response:Response;
        
        if(/\/token/.test(request.url)){
            let data = this.userApi.loginUser(request);
            response = this.createResponse(request);
        }
        else if(/\/api\/attendances\/\d+/.test(request.url)){
            let data = this.attendanceApi.isAttending(request);
            response = this.createResponse(data);
        }else if(/\/api\/gigs/.test(request.url)){
            let data = this.gigsApi.getGigs();
            response = this.createResponse(data);
        }
        
        return response;
    }

    createResponse(data:any):Response{
        let options:ResponseOptions = new ResponseOptions({ body: JSON.stringify(data) });
        return new Response(options);
    }

    // private getRouteData(url:string):any {
    //     let data = routes.find(route => {
    //         return route.regex.test(url);
    //     }).data

    //     return data;
    // }

    // private parseRoutes():Response[] {
    //     let responses:Response[] = [];

    //     routes.forEach((route:IFakeRoute) => {
    //         let body:string = JSON.stringify(route.data);

    //         let options:ResponseOptions = new ResponseOptions({
    //             body: body
    //         });

    //         responses[route.url] = new Response(options)
    //     });

    //     return responses;
    // }
}