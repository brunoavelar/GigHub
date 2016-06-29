System.register(['angular2/core', './gig.service', 'angular2/router', "../shared/follow-button.component"], function(exports_1, context_1) {
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
    var core_1, gig_service_1, router_1, follow_button_component_1;
    var GigDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (gig_service_1_1) {
                gig_service_1 = gig_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (follow_button_component_1_1) {
                follow_button_component_1 = follow_button_component_1_1;
            }],
        execute: function() {
            GigDetailComponent = (function () {
                function GigDetailComponent(gigService, routeParams, router) {
                    this.gigService = gigService;
                    this.routeParams = routeParams;
                    this.router = router;
                    this.gig = {
                        gigId: 0,
                        venue: '',
                        artist: { id: '', name: '' },
                        genre: { id: '', name: '' },
                        datetime: '',
                        date: new Date(),
                        isCanceled: false
                    };
                }
                GigDetailComponent.prototype.onBack = function () {
                    this.router.navigate(['Gigs']);
                };
                GigDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var gigId = +this.routeParams.get('id');
                    this.gigService.getGig(gigId)
                        .then(function (gig) {
                        _this.gig = gig;
                    })
                        .catch(function (error) { return console.log(error); });
                    this.gigService.getAttendance(gigId)
                        .then(function (result) { return _this.isAttending = result; });
                };
                GigDetailComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        templateUrl: 'gig-detail.component.html',
                        directives: [follow_button_component_1.FollowButtonComponent]
                    }), 
                    __metadata('design:paramtypes', [gig_service_1.GigService, router_1.RouteParams, router_1.Router])
                ], GigDetailComponent);
                return GigDetailComponent;
            }());
            exports_1("GigDetailComponent", GigDetailComponent);
        }
    }
});
//# sourceMappingURL=gig-detail.component.js.map