import { Injectable } from "angular2/core";

@Injectable()
export class UserInfo {
    AccessToken: string;
    TokenType: string;
    UserName: string;
    IsLoggedIn:boolean = false;

    constructor() {
        this.AccessToken = localStorage.getItem('access_token');
        this.TokenType = localStorage.getItem('token_type');
        this.UserName = localStorage.getItem('userName');
        this.IsLoggedIn = !!localStorage.getItem('isLoggedIn');
    }
}