import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { LoginService } from './account/login.service';
import { UserInfo } from './account/user-info';

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav-bar.component.html',
    styleUrls: ['app/nav-bar.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponent {
    isLoggedIn: boolean;
    userName: string;

    constructor(private loginService: LoginService){
        
    }
    
    test(){
        console.log(this.loginService.isLoggedIn());
        console.log(this.loginService.getUserName());
    }

    logout(){
        this.loginService.logout();
    }
    
}