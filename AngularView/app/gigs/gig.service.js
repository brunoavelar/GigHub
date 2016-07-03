System.register(["angular2/core", 'angular2/http', "./index"], function(exports_1, context_1) {
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
    var core_1, http_1, index_1;
    var GigService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            GigService = (function () {
                function GigService(http) {
                    this.http = http;
                    this.gigsUrl = '/api/gigs';
                    this.myGigsUrl = '/api/gigs/artist';
                    this.gigUrl = '/api/gigs/:id';
                    this.attendanceUrl = '/api/attendances/:id';
                    this.followingUrl = '/api/followings/:id';
                }
                GigService.prototype.getAttendance = function (gigId) {
                    return this.http.get(this.attendanceUrl.replace(":id", gigId.toString()))
                        .map(function (response) {
                        return true;
                    })
                        .toPromise()
                        .catch(function (error) {
                        if (error.status === 404)
                            return false;
                        else
                            Promise.reject(error);
                    });
                };
                GigService.prototype.getFollowing = function (artistId) {
                    return this.http.get(this.followingUrl.replace(":id", artistId))
                        .map(function (response) {
                        return true;
                    })
                        .toPromise()
                        .catch(function (error) {
                        if (error.status === 404)
                            return false;
                        else
                            Promise.reject(error);
                    });
                };
                GigService.prototype.getGig = function (gigId) {
                    return this.http.get(this.gigUrl.replace(":id", gigId.toString()))
                        .map(function (response) {
                        var gig = new index_1.Gig(response.json());
                        return gig;
                    })
                        .toPromise()
                        .catch(this.handleError);
                };
                GigService.prototype.getGigs = function () {
                    var _this = this;
                    return this.http.get(this.gigsUrl)
                        .map(function (response) { return _this.parseGigs(response); })
                        .toPromise()
                        .catch(this.handleError);
                };
                GigService.prototype.getMyGigs = function () {
                    var _this = this;
                    return this.http.get(this.myGigsUrl)
                        .map(function (response) { return _this.parseGigs(response); })
                        .toPromise()
                        .catch(this.handleError);
                };
                GigService.prototype.parseGigs = function (response) {
                    var gigs = [];
                    response.json().forEach(function (element) {
                        var gig = new index_1.Gig(element);
                        gigs.push(gig);
                    });
                    return gigs;
                };
                GigService.prototype.handleError = function (error) {
                    return Promise.reject(error);
                };
                GigService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GigService);
                return GigService;
            }());
            exports_1("GigService", GigService);
        }
    }
});
//# sourceMappingURL=gig.service.js.map