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
    var GoingButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (attendance_service_1_1) {
                attendance_service_1 = attendance_service_1_1;
            }],
        execute: function() {
            GoingButtonComponent = (function () {
                function GoingButtonComponent(attendanceService) {
                    this.attendanceService = attendanceService;
                }
                Object.defineProperty(GoingButtonComponent.prototype, "btnText", {
                    get: function () {
                        return this.isAttending ? "Going" : "Going?";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GoingButtonComponent.prototype, "activeClass", {
                    get: function () {
                        return this.isAttending ? "btn-info" : "btn-default";
                    },
                    enumerable: true,
                    configurable: true
                });
                GoingButtonComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.attendanceService.getAttendance(this.gigId)
                        .then(function (result) { return _this.isAttending = result; });
                };
                GoingButtonComponent.prototype.toggleAttendance = function () {
                    if (this.isAttending)
                        this.deleteAttendance();
                    else
                        this.attend();
                };
                GoingButtonComponent.prototype.attend = function () {
                    var _this = this;
                    this.attendanceService.attend(this.gigId)
                        .then(function (result) { return _this.isAttending = true; });
                };
                GoingButtonComponent.prototype.deleteAttendance = function () {
                    var _this = this;
                    this.attendanceService.deleteAttendance(this.gigId)
                        .then(function (result) { return _this.isAttending = false; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], GoingButtonComponent.prototype, "gigId", void 0);
                GoingButtonComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'going-button',
                        templateUrl: 'going-button.component.html',
                        providers: [attendance_service_1.AttendanceService]
                    }), 
                    __metadata('design:paramtypes', [attendance_service_1.AttendanceService])
                ], GoingButtonComponent);
                return GoingButtonComponent;
            }());
            exports_1("GoingButtonComponent", GoingButtonComponent);
        }
    }
});
//# sourceMappingURL=going-button.component.js.map