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
                function PopoverComponent(elementRef) {
                    this.elementRef = elementRef;
                    this.closed = true;
                    this.shown = new core_1.EventEmitter();
                    this.hidden = new core_1.EventEmitter();
                }
                PopoverComponent.prototype.clickEventHandler = function (clickEvent) {
                    event.preventDefault();
                    //Ignore if the click was inside the component.
                    if (this.eventTriggeredInsideHost(clickEvent)) {
                        return;
                    }
                    this.close();
                };
                PopoverComponent.prototype.eventTriggeredInsideHost = function (event) {
                    var currentElement = event.target;
                    var hostElement = this.elementRef.nativeElement;
                    do {
                        if (currentElement === hostElement) {
                            return true;
                        }
                        currentElement = currentElement.parentNode;
                    } while (currentElement);
                    return false;
                };
                PopoverComponent.prototype.open = function () {
                    this.closed = false;
                    this.shown.emit(null);
                };
                PopoverComponent.prototype.close = function () {
                    if (!this.closed) {
                        this.closed = true;
                        this.hidden.emit(null);
                    }
                };
                PopoverComponent.prototype.toggle = function () {
                    this.closed ? this.open() : this.close();
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PopoverComponent.prototype, "shown", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PopoverComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.HostListener('document:click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], PopoverComponent.prototype, "clickEventHandler", null);
                PopoverComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'popover',
                        templateUrl: 'popover.component.html',
                        styleUrls: ['popover.component.css']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PopoverComponent);
                return PopoverComponent;
            }());
            exports_1("PopoverComponent", PopoverComponent);
        }
    }
});
//# sourceMappingURL=popover.component.js.map