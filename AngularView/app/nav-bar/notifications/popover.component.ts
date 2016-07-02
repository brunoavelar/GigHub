import { Component, ElementRef, HostListener } from 'angular2/core';

@Component({
    moduleId: __moduleName,
    selector: 'popover',
    templateUrl: 'popover.component.html',
    styleUrls: ['popover.component.css']
})
export class PopoverComponent {
    private closed:boolean = true;

    constructor(private elementRef:ElementRef) { }

    @HostListener('document:click', ['$event'])
    private clickEventHandler(clickEvent:any) {
        event.preventDefault();
        //Ignore if the click was inside the component.
        if ( this.eventTriggeredInsideHost(clickEvent) ) {
            return;
        }

         this.close();
    }

    private eventTriggeredInsideHost(event:any) {
        var currentElement = event.target;
        var hostElement = this.elementRef.nativeElement;
        
        do {
            if (currentElement === hostElement) {
                return true;
            }
            currentElement = currentElement.parentNode;
        } while (currentElement);

        return false;
    }

    private open():void {
        this.closed = false;
    }

    private close():void {
        this.closed = true;
    }

    public toggle(){
        this.closed ? this.open() : this.close();
    }
}