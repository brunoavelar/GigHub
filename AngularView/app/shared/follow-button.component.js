System.register(['angular2/core', './follow.service'], function(exports_1, context_1) {
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
    var core_1, follow_service_1;
    var FollowButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (follow_service_1_1) {
                follow_service_1 = follow_service_1_1;
            }],
        execute: function() {
            FollowButtonComponent = (function () {
                function FollowButtonComponent(followService) {
                    this.followService = followService;
                }
                FollowButtonComponent.prototype.onBack = function () {
                };
                FollowButtonComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.followService.getFollowing(this.followee)
                        .then(function (result) { return _this.isFollowing = result; });
                };
                FollowButtonComponent.prototype.follow = function () {
                    var _this = this;
                    this.followService.follow(this.followee)
                        .then(function (result) { return _this.isFollowing = true; });
                };
                FollowButtonComponent.prototype.unfollow = function () {
                    var _this = this;
                    this.followService.unfollow(this.followee)
                        .then(function (result) { return _this.isFollowing = false; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], FollowButtonComponent.prototype, "followee", void 0);
                FollowButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'follow-button',
                        templateUrl: 'app/shared/follow-button.component.html',
                        providers: [follow_service_1.FollowService]
                    }), 
                    __metadata('design:paramtypes', [follow_service_1.FollowService])
                ], FollowButtonComponent);
                return FollowButtonComponent;
            }());
            exports_1("FollowButtonComponent", FollowButtonComponent);
        }
    }
});
//# sourceMappingURL=follow-button.component.js.map