// logged-in-router-outlet.ts
import { ViewContainerRef, DynamicComponentLoader, AttributeMetadata, Directive, Attribute } from 'angular2/core';
import { Router, RouterOutlet, ComponentInstruction } from 'angular2/router';

import { LoginService } from '../account/login.service';

@Directive({
    selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
    publicRoutes: Array<string>;
    private router: Router;

    constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader, router: Router,
        @Attribute('name') nameAttr: string, private loginService: LoginService) {
        super(_viewContainerRef, _loader, router, nameAttr);

        this.publicRoutes = ['', 'login'];
        this.router = router;
    }

    activate(instruction: ComponentInstruction) {
        if (this._canActivate(instruction.urlPath)) {
            return super.activate(instruction);
        }

        this.router.navigate(['Login']);
    }

    _canActivate(url) {       
        return this.publicRoutes.indexOf(url) !== -1 || this.loginService.isLoggedIn() || localStorage.getItem('isLoggedIn') === 'true'
    }
}