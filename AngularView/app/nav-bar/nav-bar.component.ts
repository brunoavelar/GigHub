import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { LoginService } from '../account/login.service';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
    moduleId: __moduleName,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css'],
    directives: [ROUTER_DIRECTIVES, NotificationsComponent]
})
export class NavBarComponent {
    constructor(private loginService: LoginService){
        this.clickedOutside = this.clickedOutside.bind(this);
    }

    get isLoggedIn():boolean {
        return this.loginService.isLoggedIn();
    }
    
    get userName():string {
        return this.loginService.getUserName();
    }

    clickedOutside(){
        console.log("clicked outside");
    }

    logout(){
        this.loginService.logout();
    }
    
}