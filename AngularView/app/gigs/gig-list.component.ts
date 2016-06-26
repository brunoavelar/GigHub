import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { IGig } from './gig';
import { GigService } from './gig.service';
import { GigFilterPipe } from './gigs-filter.pipe'

@Component({
    templateUrl: 'app/gigs/gig-list.component.html',
    styleUrls: ['app/gigs/gig-list.component.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: [GigFilterPipe]
})
export class GigListComponent implements OnInit {
    pageTitle: string = 'Gig list';
    gigs: IGig[];
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