System.register(["angular2/core", 'rxjs/Observable', '../shared/authorized.http'], function(exports_1, context_1) {
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
    var core_1, Observable_1, authorized_http_1;
    var GigService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (authorized_http_1_1) {
                authorized_http_1 = authorized_http_1_1;
            }],
        execute: function() {
            GigService = (function () {
                function GigService(_http) {
                    this._http = _http;
                    this.gigUrl = 'http://localhost:53009/api/gigs';
                }
                GigService.prototype.getGigs = function () {
                    var _this = this;
                    return this._http.get(this.gigUrl)
                        .map(function (response) { return _this.parseGig(response); })
                        .catch(this.handleError);
                };
                GigService.prototype.parseGig = function (response) {
                    var gigs = response.json();
                    gigs.forEach(function (gig) {
                        gig.date = new Date(gig.datetime);
                    });
                    return gigs;
                };
                GigService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                GigService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [authorized_http_1.AuthorizedHttp])
                ], GigService);
                return GigService;
            }());
            exports_1("GigService", GigService);
        }
    }
});
//# sourceMappingURL=gig.service.js.map