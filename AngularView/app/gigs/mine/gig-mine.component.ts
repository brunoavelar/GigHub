import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { AttendanceButtonComponent } from '../../shared/attendance-button.component'
import { Gig } from '../gig';
import { GigService } from '../gig.service';
import { GigFilterPipe } from '../gigs-filter.pipe'
import { GigDateComponent } from "../gig-date.component";

@Component({
    moduleId: __moduleName,
    templateUrl: 'gig-mine.component.html',
    styleUrls: ['gig-mine.component.css'],
    directives: [ROUTER_DIRECTIVES, AttendanceButtonComponent, GigDateComponent],
    pipes: [GigFilterPipe]
})
export class GigMineComponent implements OnInit {
    gigs: Gig[];
    errorMessage: string;
    searchTerm:string = '';

    constructor(private gigService: GigService){
        
    }
    
    ngOnInit(): void {
        this.gigService.getMyGigs()
            .then((gigs) => this.gigs = gigs)
            .catch((error) => console.log(error));
    }
    
}