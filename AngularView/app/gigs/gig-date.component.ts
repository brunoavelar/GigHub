import { Component, Input } from 'angular2/core';

@Component({
    moduleId: __moduleName,
    selector: 'gig-date',
    templateUrl: 'gig-date.component.html',
    styleUrls: ['gig-date.component.css']
})
export class GigDateComponent {
    @Input() datetime:Date = new Date();

    constructor() { }
}