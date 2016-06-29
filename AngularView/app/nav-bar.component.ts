import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { LoginService } from './account/login.service';
import { UserInfo } from './account/user-info';

@Component({
    moduleId: __moduleName,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponent {
    isLoggedIn: boolean;
    userName: string;

    constructor(private loginService: LoginService){
        
    }

    logout(){
        this.loginService.logout();
    }
    
}