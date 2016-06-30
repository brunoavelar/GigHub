import { Injectable } from "angular2/core";
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../shared/authorized.http';
import { Notification } from './notification';

@Injectable()
export class NotificationsService {
    private serviceUrl = '/notifications/';

    constructor(private http: AuthorizedHttp){
        
    }   

    getNotifications():Promise<Notification[]> {
        return this.http.get(this.serviceUrl)
                .map((response:Response) => this.parseNotifications(response))
                .toPromise()
                .catch(error => this.handleError(error));
    }

    parseNotifications(response:Response):Notification[] {
        let notifications:Notification[] = [];
        response.json().forEach(element => {
            let notification:Notification = new Notification(element);
             notifications.push(notification);
        });
        return notifications;
    }

    markAsRead():Promise<Response> {        
        return this.http.post(this.serviceUrl, '')
                .toPromise()
                .catch(error => console.log(error));
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }
}