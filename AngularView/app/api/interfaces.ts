import { Notification } from '../nav-bar/notifications/notification';

export interface Attendance {
    attendeeId:string;
    gigId:number;
}

export interface User {
    id:string;
    name:string;
    email?:string;
}

export interface UserNotification {
    user:User;
    notification:Notification;
    isRead:boolean;
}