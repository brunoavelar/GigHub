System.register(['angular2/core', './notifications.service', './popover.component'], function(exports_1, context_1) {
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
    var core_1, notifications_service_1, popover_component_1;
    var NotificationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            },
            function (popover_component_1_1) {
                popover_component_1 = popover_component_1_1;
            }],
        execute: function() {
            NotificationsComponent = (function () {
                function NotificationsComponent(notificationsService) {
                    this.notificationsService = notificationsService;
                    this.notifications = [];
                }
                Object.defineProperty(NotificationsComponent.prototype, "showBadge", {
                    get: function () {
                        return this.notifications.length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                NotificationsComponent.prototype.ngOnInit = function () {
                    this.fetchNotifications();
                };
                NotificationsComponent.prototype.fetchNotifications = function () {
                    var _this = this;
                    this.notificationsService.getNotifications()
                        .then(function (notifications) { return _this.notifications = notifications; })
                        .catch(function (error) { return console.log('fetchNotifications error', error); });
                };
                NotificationsComponent.prototype.popoverShown = function () {
                    this.notificationsService.markAsRead();
                };
                NotificationsComponent.prototype.popoverHidden = function () {
                    //this.fetchNotifications();
                };
                __decorate([
                    core_1.ViewChild(popover_component_1.PopoverComponent), 
                    __metadata('design:type', popover_component_1.PopoverComponent)
                ], NotificationsComponent.prototype, "popover", void 0);
                NotificationsComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'notifications',
                        templateUrl: 'notifications.component.html',
                        styleUrls: ['notifications.component.css'],
                        providers: [notifications_service_1.NotificationsService],
                        directives: [popover_component_1.PopoverComponent]
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
                ], NotificationsComponent);
                return NotificationsComponent;
            }());
            exports_1("NotificationsComponent", NotificationsComponent);
        }
    }
});
//# sourceMappingURL=notifications.component.js.map