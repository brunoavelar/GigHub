import { Injectable,Inject } from "angular2/core";
import { Request, Headers, ResponseOptions, Response } from 'angular2/http';

import { Notification } from "../nav-bar/notifications/notification";
import { Gig } from "../gigs/index";
import { Attendance } from '../gigs/attendance';
import { Gigs, Attendances, Users, Tokens, InvalidLogin, UserNotifications } from './server-data'
import { User, UserNotification } from './interfaces'

@Injectable()
class Api {
    createResponseBasedOnContent(content:any, url:string){
        if(content)
            return this.createOkResponse(content, url);
        else{
            return this.createBadRequestResponse(content, url);
        }
    }

    createOkResponse(content:any, url:string):Response{
        let options:ResponseOptions = this.createOptions(content, url, 200);
        
        return new Response(options);
    }

    createBadRequestResponse(content:any, url:string):Response {
        let options:ResponseOptions = this.createOptions(content, url, 400);
        
        return new Response(options);
    }

    createOptions(content:any, url:string, status:number){
        return new ResponseOptions({ 
            body: JSON.stringify(content),
            headers: new Headers({'Content-Type': 'application/json;charset=UTF-8'}),
            status: status,
            statusText: "ok",
            type: 2,
            url: url
        });
    }
}

@Injectable()
export class GigApi extends Api {
    private gigs:Gig[];

    constructor(private userApi:UserApi){
        super();
        this.gigs = Gigs.map(value => new Gig(value));
    }

    getGigs(request:Request):Response {
        let response = this.createOkResponse(this.gigs, request.url);
        return response;
    }

    getMyGigs(request:Request):Response {
        let myGigs = this.gigs.filter((gig:Gig) => gig.artist.id === this.userApi.userId)

        let response = this.createOkResponse(myGigs, request.url);
        return response;
    }

    getGig(request:Request):Response {
        let gigId = /(\d+)(?!.*\d)/.exec(request.url)[0];
        let gig = this.gigs.find(gig => gig.id.toString() === gigId);
        
        return this.createResponseBasedOnContent(gig, request.url);
    }
}

@Injectable()
export class NotificationApi extends Api {
    private userNotifications:any[];

    constructor(private userApi:UserApi){
        super();

        this.userNotifications = UserNotifications.map(un => {
            return {
                user: un.user,
                notification: un.notification,
                isRead: un.isRead
            };
        });
    }
    
    private filterByUserIdNotRead(un:any):boolean{
        return un.user.id === this.userApi.userId && !un.isRead;
    }

    getNotifications(request:Request):Response {
        let notifications = this.userNotifications
            .filter(un => this.filterByUserIdNotRead(un))
            .map(un => un.notification);
        
        return this.createOkResponse(notifications, request.url);
    }

    markAsRead(request:Request):Response {
        this.userNotifications
            .filter (un => this.filterByUserIdNotRead(un))
            .forEach(un => un.isRead = true);
        
        return this.createOkResponse('', request.url);
    }
}

@Injectable()
export class AttendanceApi extends Api {
    private attendances:Attendance[] = Attendances;

    constructor(private userApi:UserApi) {
        super();
     }

     getAttendances(request:Request):Response {
        let attendeeId:string = this.userApi.userId;
        let result = this.attendances.filter((at:Attendance) => at.attendeeId === attendeeId);
        
        return this.createOkResponse(result, request.url); 
     }

    isAttending(request:Request):Response {
        let gigId = /\d+/.exec(request.url)[0];
        let attendeeId:string = this.userApi.userId;

        let result = this.attendances.some((at:Attendance) => (at.attendeeId === attendeeId && at.gigId.toString() === gigId));

        return this.createResponseBasedOnContent(result, request.url);
    }

    attend(request:Request){
        let body:string = request.text().toString();
        let gigId = JSON.parse(body).gigId;
        
        let attendance:Attendance = {attendeeId: this.userApi.userId, gigId:gigId};
        this.attendances.push(attendance);
        
        return this.createOkResponse('', request.url);
    }
}

@Injectable()
export class UserApi extends Api{
    private users:User[] = Users;
    private currentUserId:string;

    get userId():string {
        return this.currentUserId;
    }

    constructor(){
        super();

        this.currentUserId = localStorage.getItem('user_id');
    }

    loginUser(request:Request):Response {
        let body:String = request.text();
        let begin:number = body.indexOf("&username=") + "&username=".length;
        let end:number = body.indexOf("&password=");
        let email = body.substring(begin, end);
        
        let token = Tokens.find(token => token.userName === email);

        this.currentUserId = this.users.find(user => user.email === email).id
        localStorage.setItem('user_id', this.currentUserId);

        return this.createResponseBasedOnContent(token, request.url);
    }
}



