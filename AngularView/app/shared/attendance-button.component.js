System.register(['angular2/core', './attendance.service'], function(exports_1, context_1) {
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
    var core_1, attendance_service_1;
    var AttendanceButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (attendance_service_1_1) {
                attendance_service_1 = attendance_service_1_1;
            }],
        execute: function() {
            AttendanceButtonComponent = (function () {
                function AttendanceButtonComponent(attendanceService) {
                    this.attendanceService = attendanceService;
                }
                Object.defineProperty(AttendanceButtonComponent.prototype, "btnText", {
                    get: function () {
                        return this.isAttending ? "Going" : "Going?";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AttendanceButtonComponent.prototype, "activeClass", {
                    get: function () {
                        return this.isAttending ? "btn-info" : "btn-default";
                    },
                    enumerable: true,
                    configurable: true
                });
                AttendanceButtonComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.attendanceService.getAttendance(this.gigId)
                        .then(function (result) { return _this.isAttending = result; });
                };
                AttendanceButtonComponent.prototype.toggleAttendance = function () {
                    if (this.isAttending)
                        this.deleteAttendance();
                    else
                        this.attend();
                };
                AttendanceButtonComponent.prototype.attend = function () {
                    var _this = this;
                    this.attendanceService.attend(this.gigId)
                        .then(function (result) { return _this.isAttending = true; });
                };
                AttendanceButtonComponent.prototype.deleteAttendance = function () {
                    var _this = this;
                    this.attendanceService.deleteAttendance(this.gigId)
                        .then(function (result) { return _this.isAttending = false; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AttendanceButtonComponent.prototype, "gigId", void 0);
                AttendanceButtonComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'attendance-button',
                        templateUrl: 'attendance-button.component.html',
                        providers: [attendance_service_1.AttendanceService]
                    }), 
                    __metadata('design:paramtypes', [attendance_service_1.AttendanceService])
                ], AttendanceButtonComponent);
                return AttendanceButtonComponent;
            }());
            exports_1("AttendanceButtonComponent", AttendanceButtonComponent);
        }
    }
});
//# sourceMappingURL=attendance-button.component.js.map