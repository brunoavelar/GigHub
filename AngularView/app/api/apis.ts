import { Injectable } from "angular2/core";
import { Request, Headers, ResponseOptions, Response } from 'angular2/http';

import { Gig } from "../gigs/index";
import { Gigs, Attendances, Users, Tokens, InvalidLogin } from './server-data'
import { Attendance, User } from './interfaces'

@Injectable()
export class GigsApi {
    private gigs:Gig[];

    constructor(){
        this.gigs = Gigs.map(value => new Gig(value));
    }

    getGigs():Gig[] {
        return this.gigs;
    }
}

@Injectable()
export class AttendanceApi {
    private attendances:Attendance[] = Attendances;

    constructor(private userApi:UserApi) { }

    isAttending(request:Request):boolean {
        let gigId = /\d+/.exec(request.url)[0];
        return true;
    }
}

@Injectable()
class Api {
    createOkResponse(data:any, url:string):Response{
        let options:ResponseOptions = this.createOptions(data, url, 200);
        
        return new Response(options);
    }

    createBadRequestResponse(data:any, url:string):Response {
        let options:ResponseOptions = this.createOptions(data, url, 400);
        
        return new Response(options);
    }

    createOptions(data:any, url:string, status:number){
        return new ResponseOptions({ 
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json;charset=UTF-8'}),
            status: status,
            statusText: "ok",
            type: 2,
            url: url
        });
    }
}

@Injectable()
export class UserApi extends Api{
    private users:User[] = Users;

    loginUser(request:Request):any {
        let body:String = request.text();
        let begin:number = body.indexOf("&username=") + "&username=".length;
        let end:number = body.indexOf("&password=");
        let email = body.substring(begin, end);
        
        let token = Tokens.find(token => token.userName === email);

        if(!token)
            return this.createBadRequestResponse(InvalidLogin, request.url);
        

        return this.createOkResponse(token, request.url);
    }
}

