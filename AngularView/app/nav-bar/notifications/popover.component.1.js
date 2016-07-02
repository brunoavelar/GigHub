System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var PopoverComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PopoverComponent = (function () {
                function PopoverComponent() {
                }
                PopoverComponent.prototype.ngOnInit = function () { };
                PopoverComponent.prototype.onClick = function (event) {
                    event.preventDefault();
                    console.log("Click Event at PopoverComponent");
                };
                PopoverComponent.prototype.show = function () {
                    console.log('PopoverComponent.show()');
                    this.isVisisble = true;
                };
                PopoverComponent.prototype.hide = function () {
                    console.log('PopoverComponent.hide()');
                    this.isVisisble = false;
                };
                __decorate([
                    core_1.HostListener('click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], PopoverComponent.prototype, "onClick", null);
                PopoverComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'popover',
                        templateUrl: 'popover.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PopoverComponent);
                return PopoverComponent;
            }());
            exports_1("PopoverComponent", PopoverComponent);
        }
    }
});
//# sourceMappingURL=popover.component.1.js.map