System.register(['angular2/core', 'angular2/router', './gig.service'], function(exports_1, context_1) {
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
    var core_1, router_1, gig_service_1;
    var GigListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (gig_service_1_1) {
                gig_service_1 = gig_service_1_1;
            }],
        execute: function() {
            GigListComponent = (function () {
                function GigListComponent(gigService) {
                    this.gigService = gigService;
                    this.pageTitle = 'Gig list';
                }
                GigListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.gigService.getGigs()
                        .subscribe(function (gigs) { return _this.gigs = gigs; }, function (error) { return _this.errorMessage = error; });
                };
                GigListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/gigs/gig-list.component.html',
                        styleUrls: ['app/gigs/gig-list.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [gig_service_1.GigService])
                ], GigListComponent);
                return GigListComponent;
            }());
            exports_1("GigListComponent", GigListComponent);
        }
    }
});
//# sourceMappingURL=gig-list.component.js.map