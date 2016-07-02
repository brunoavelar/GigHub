
import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';

import { GigService, GigListComponent, GigMineComponent, GigDetailComponent } from './gigs/index';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginService } from './account/login.service';
import { LoginComponent } from './account/login.component';
import { UserInfo } from './account/user-info';
import { LoggedInRouterOutlet } from './account/logged-in-router-outlet';
import {AuthorizedHttp} from './shared/authorized.http';


@Component({
    selector: 'pm-app',
    template: `
    <div>
        <nav-bar></nav-bar>
        <div class='container body-content'>
            <router-outlet></router-outlet>
        </div>
    </div>
    `,
    providers: [GigService, 
                UserInfo,
                LoginService,
                AuthorizedHttp,
                HTTP_PROVIDERS,
                ROUTER_PROVIDERS],
    directives: [LoggedInRouterOutlet, NavBarComponent]
})
@RouteConfig([
    { path: '/gigs', name: 'Gigs', component: GigListComponent, useAsDefault: true },
    { path: '/gigs/mine', name: 'MyGigs', component: GigMineComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/gig/:id', name: 'GigDetail', component: GigDetailComponent }
])
export class AppComponent {

}