System.register(["angular2/core", 'angular2/http', 'rxjs/Observable', './user-info'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, user_info_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (user_info_1_1) {
                user_info_1 = user_info_1_1;
            }],
        execute: function() {
            LoginService = (function () {
                function LoginService(http, userInfo) {
                    this.http = http;
                    this.userInfo = userInfo;
                    this.apiUrl = 'http://localhost:53009/token';
                }
                LoginService.prototype.loginUser = function (userName, password) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Accept', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    var body = "grant_type=password&username=" + userName + "&password=" + password;
                    return this.http.post(this.apiUrl, body, options)
                        .do(function (response) {
                        var responseData = response.json();
                        localStorage.setItem('access_token', responseData.access_token);
                        localStorage.setItem('token_type', responseData.token_type);
                        localStorage.setItem('userName', responseData.userName);
                        localStorage.setItem('isLoggedIn', 'true');
                        _this.userInfo = new user_info_1.UserInfo();
                    })
                        .map(function (response) {
                        return true;
                    })
                        .catch(this.handleError);
                };
                LoginService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json());
                };
                LoginService.prototype.logout = function () {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('token_type');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('isLoggedIn');
                    this.userInfo = new user_info_1.UserInfo();
                };
                LoginService.prototype.isLoggedIn = function () {
                    return this.userInfo && this.userInfo.isLoggedIn;
                };
                LoginService.prototype.getUserName = function () {
                    return this.userInfo.userName || "";
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, user_info_1.UserInfo])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map