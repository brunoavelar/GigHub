
import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';

import { GigService } from './gigs/gig.service';
import { NavBarComponent } from './nav-bar.component';
import { GigListComponent } from './gigs/gig-list.component';

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
    directives: [NavBarComponent, ROUTER_DIRECTIVES],
    providers: [GigService, 
                HTTP_PROVIDERS,
                ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/gigs', name: 'Gigs', component: GigListComponent, useAsDefault: true }
    // { path: '/products', name: 'Products', component: ProductListComponent },
    // { path: '/product/:id', name: 'ProductDetail', component: ProductDetailComponent }, 
    // { path: '/secretfriend', name: 'SecretFriend', component: SecretFriendComponent }
])
export class AppComponent {
    
}