System.register(['angular2/core', 'angular2/router', './attendance-button.component', '../gig.service', './../gigs-filter.pipe', "./../gig-date.component", '../../account/login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, attendance_button_component_1, gig_service_1, gigs_filter_pipe_1, gig_date_component_1, login_service_1;
    var GigListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (attendance_button_component_1_1) {
                attendance_button_component_1 = attendance_button_component_1_1;
            },
            function (gig_service_1_1) {
                gig_service_1 = gig_service_1_1;
            },
            function (gigs_filter_pipe_1_1) {
                gigs_filter_pipe_1 = gigs_filter_pipe_1_1;
            },
            function (gig_date_component_1_1) {
                gig_date_component_1 = gig_date_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            GigListComponent = (function () {
                function GigListComponent(gigService, loginService) {
                    this.gigService = gigService;
                    this.loginService = loginService;
                }
                Object.defineProperty(GigListComponent.prototype, "isLoggedIn", {
                    get: function () {
                        return this.loginService.isLoggedIn();
                    },
                    enumerable: true,
                    configurable: true
                });
                GigListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.gigService.getGigs()
                        .then(function (gigs) { return _this.gigs = gigs; })
                        .catch(function (error) { return console.log(error); });
                };
                GigListComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        templateUrl: 'gig-list.component.html',
                        styleUrls: ['gig-list.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, attendance_button_component_1.AttendanceButtonComponent, gig_date_component_1.GigDateComponent],
                        pipes: [gigs_filter_pipe_1.GigFilterPipe]
                    }), 
                    __metadata('design:paramtypes', [gig_service_1.GigService, login_service_1.LoginService])
                ], GigListComponent);
                return GigListComponent;
            }());
            exports_1("GigListComponent", GigListComponent);
        }
    }
});
//# sourceMappingURL=gig-list.component.js.map