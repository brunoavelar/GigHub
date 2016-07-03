
import { Component, provide } from 'angular2/core';
import { HTTP_PROVIDERS, Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';
import { MockBackend, MockConnection } from 'angular2/http/testing';

import { GigService, GigListComponent, GigMineComponent, GigDetailComponent } from './gigs/index';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginService } from './account/login.service';
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
                FakeHttp,
                MockBackend,
                HTTP_PROVIDERS,
                BaseRequestOptions,
                provide(
                    Http,
                    {
                        useFactory: (backend, defaultOptions) => {
                            return new FakeHttp(backend, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    }
                ),
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