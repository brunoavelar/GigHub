import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Gig } from './gig';
import { GigService } from './gig.service';
import { GigFilterPipe } from './gigs-filter.pipe'
import { AttendanceButtonComponent } from '../shared/attendance-button.component'

@Component({
    moduleId: __moduleName,
    templateUrl: 'gig-list.component.html',
    styleUrls: ['gig-list.component.css'],
    directives: [ROUTER_DIRECTIVES, AttendanceButtonComponent],
    pipes: [GigFilterPipe]
})
export class GigListComponent implements OnInit {
    pageTitle: string = 'Gig list';
    gigs: Gig[];
    errorMessage: string;
    searchTerm:string = '';

    constructor(private gigService: GigService){
        
    }
    
    ngOnInit(): void {
        this.gigService.getGigs()
            .then((gigs) => this.gigs = gigs)
            .catch((error) => console.log(error));
    }
    
}