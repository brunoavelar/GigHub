System.register(["angular2/core", '../shared/authorized.http', './notification'], function(exports_1, context_1) {
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
    var core_1, authorized_http_1, notification_1;
    var NotificationsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authorized_http_1_1) {
                authorized_http_1 = authorized_http_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            }],
        execute: function() {
            NotificationsService = (function () {
                function NotificationsService(http) {
                    this.http = http;
                    this.serviceUrl = '/notifications/';
                }
                NotificationsService.prototype.getNotifications = function () {
                    var _this = this;
                    return this.http.get(this.serviceUrl)
                        .map(function (response) { return _this.parseNotifications(response); })
                        .toPromise()
                        .catch(function (error) { return _this.handleError(error); });
                };
                NotificationsService.prototype.parseNotifications = function (response) {
                    var notifications = [];
                    response.json().forEach(function (element) {
                        var notification = new notification_1.Notification(element);
                        notifications.push(notification);
                    });
                    return notifications;
                };
                NotificationsService.prototype.markAsRead = function () {
                    return this.http.post(this.serviceUrl, '')
                        .toPromise()
                        .catch(function (error) { return console.log(error); });
                };
                NotificationsService.prototype.handleError = function (error) {
                    return Promise.reject(error);
                };
                NotificationsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [authorized_http_1.AuthorizedHttp])
                ], NotificationsService);
                return NotificationsService;
            }());
            exports_1("NotificationsService", NotificationsService);
        }
    }
});
//# sourceMappingURL=notifications.service.js.map