import { Component, OnInit } from 'angular2/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification';

@Component({
    moduleId: __moduleName,
    selector: 'notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css'],
    providers: [NotificationsService]
})
export class NotificationsComponent implements OnInit {
    notifications:Notification[] = [];
    showPopOver:boolean;

    get showBadge():boolean {
        return this.notifications.length > 0;
    }

    constructor(private notificationsService: NotificationsService){
        
    }

    ngOnInit():void {
        this.notificationsService.getNotifications()
            .then(notifications => this.notifications = notifications);
    }

    togglePopOver(event:Event):void {
        event.preventDefault();
        this.showPopOver = !this.showPopOver;
    }
    
}