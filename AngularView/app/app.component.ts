
import { Component, provide } from 'angular2/core';
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig } from 'angular2/router';
import 'rxjs/Rx';

import { GigService, GigListComponent, GigMineComponent, GigDetailComponent, GigFormComponent } from './gigs/index';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginService } from './account/login.service';
import { AttendanceService } from './gigs/attendance.service';
import { LoginComponent } from './account/login.component';
import { UserInfo } from './account/user-info';
import { LoggedInRouterOutlet } from './account/logged-in-router-outlet';
import { AuthorizedHttp } from './shared/authorized.http';
import { FakeHttp } from './api/fake.http';



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
                AttendanceService,
                // provide(
                //     Http,
                //     {
                //         useClass: FakeHttp
                //     }
                // ),
                ROUTER_PROVIDERS],
    directives: [LoggedInRouterOutlet, NavBarComponent]
})
@RouteConfig([
    { path: '/gigs', name: 'Gigs', component: GigListComponent, useAsDefault: true },
    { path: '/gigs/mine', name: 'MyGigs', component: GigMineComponent },
    { path: '/gigs/manage', name: 'AddGig', component: GigFormComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/gig/:id', name: 'GigDetail', component: GigDetailComponent }
])
export class AppComponent {

}