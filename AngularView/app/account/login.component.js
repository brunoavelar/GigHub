System.register(['angular2/core', './login.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, login_service_1, router_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(loginService, router) {
                    this.loginService = loginService;
                    this.router = router;
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this.loginService.login(this.userName, this.password)
                        .then(function (login) {
                        if (login.success) {
                            _this.redirect();
                        }
                        else {
                            console.log('error_message: ', login.errorMessage);
                        }
                    }).catch(this.handleError);
                };
                LoginComponent.prototype.redirect = function () {
                    this.router.navigate(['Gigs']);
                };
                LoginComponent.prototype.handleError = function (error) {
                    console.log(error);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        templateUrl: 'login.component.html',
                        styleUrls: ['login.component.css']
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map