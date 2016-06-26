import { Injectable } from "angular2/core";

@Injectable()
export class UserInfo {
    access_token: string;
    token_type: string;
    userName: string;
    isLoggedIn:boolean = false;
    error: string;
    error_description: string;

    constructor() {
        this.access_token = localStorage.getItem('access_token');
        this.token_type = localStorage.getItem('token_type');
        this.userName = localStorage.getItem('userName');
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    }
}