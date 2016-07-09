System.register(["angular2/core", '../shared/authorized.http'], function(exports_1, context_1) {
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
    var core_1, authorized_http_1;
    var AttendanceService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authorized_http_1_1) {
                authorized_http_1 = authorized_http_1_1;
            }],
        execute: function() {
            AttendanceService = (function () {
                function AttendanceService(http) {
                    this.http = http;
                    this.attendanceUrl = '/attendances/:id';
                }
                AttendanceService.prototype.getAttendance = function (gigId) {
                    var getUrl = this.attendanceUrl.replace(":id", gigId);
                    return this.http.get(getUrl)
                        .map(function (response) {
                        return !!response.ok;
                    })
                        .toPromise()
                        .catch(function (error) {
                        if (error.status === 404)
                            return false;
                        else
                            Promise.reject(error);
                    });
                };
                AttendanceService.prototype.attend = function (gigId) {
                    var postUrl = this.attendanceUrl.replace(":id", '');
                    var body = JSON.stringify({ gigId: gigId });
                    return this.http.post(postUrl, body)
                        .toPromise()
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceService.prototype.deleteAttendance = function (gigId) {
                    var deleteUrl = this.attendanceUrl.replace(":id", gigId);
                    return this.http.delete(deleteUrl)
                        .toPromise()
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceService.prototype.handleError = function (error) {
                    return Promise.reject(error);
                };
                AttendanceService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [authorized_http_1.AuthorizedHttp])
                ], AttendanceService);
                return AttendanceService;
            }());
            exports_1("AttendanceService", AttendanceService);
        }
    }
});
//# sourceMappingURL=attendance.service.js.map