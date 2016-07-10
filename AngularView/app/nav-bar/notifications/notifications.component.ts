import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from 'angular2/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification';
import { PopoverComponent } from './popover.component';

@Component({
    moduleId: __moduleName,
    selector: 'notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css'],
    providers: [NotificationsService],
    directives: [PopoverComponent]
})
export class NotificationsComponent implements OnInit {
    notifications:Notification[] = [];

    @ViewChild(PopoverComponent)
    private popover:PopoverComponent;

    get showBadge():boolean {
        return this.notifications.length > 0;
    }

    constructor(private notificationsService: NotificationsService){
        
    }

    ngOnInit():void {
        this.fetchNotifications();
    }

    fetchNotifications():void {
        this.notificationsService.getNotifications()
            .then(notifications => this.notifications = notifications)
            .catch(error => console.log('fetchNotifications error', error));
    }

    popoverShown():void {
        this.notificationsService.markAsRead();
    }
    
    popoverHidden():void {
        //this.fetchNotifications();
    }
}