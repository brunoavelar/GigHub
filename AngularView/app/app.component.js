System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Rx', './gigs/index', './nav-bar/nav-bar.component', './account/login.service', './gigs/attendance.service', './account/login.component', './account/user-info', './account/logged-in-router-outlet', './shared/authorized.http', './api/fake.http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, index_1, nav_bar_component_1, login_service_1, attendance_service_1, login_component_1, user_info_1, logged_in_router_outlet_1, authorized_http_1, fake_http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (nav_bar_component_1_1) {
                nav_bar_component_1 = nav_bar_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (attendance_service_1_1) {
                attendance_service_1 = attendance_service_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (user_info_1_1) {
                user_info_1 = user_info_1_1;
            },
            function (logged_in_router_outlet_1_1) {
                logged_in_router_outlet_1 = logged_in_router_outlet_1_1;
            },
            function (authorized_http_1_1) {
                authorized_http_1 = authorized_http_1_1;
            },
            function (fake_http_1_1) {
                fake_http_1 = fake_http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pm-app',
                        template: "\n    <div>\n        <nav-bar></nav-bar>\n        <div class='container body-content'>\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n    ",
                        providers: [index_1.GigService,
                            user_info_1.UserInfo,
                            login_service_1.LoginService,
                            authorized_http_1.AuthorizedHttp,
                            http_1.HTTP_PROVIDERS,
                            attendance_service_1.AttendanceService,
                            core_1.provide(http_1.Http, {
                                useClass: fake_http_1.FakeHttp
                            }),
                            router_1.ROUTER_PROVIDERS],
                        directives: [logged_in_router_outlet_1.LoggedInRouterOutlet, nav_bar_component_1.NavBarComponent]
                    }),
                    router_1.RouteConfig([
                        { path: '/gigs', name: 'Gigs', component: index_1.GigListComponent, useAsDefault: true },
                        { path: '/gigs/mine', name: 'MyGigs', component: index_1.GigMineComponent },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/gig/:id', name: 'GigDetail', component: index_1.GigDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map