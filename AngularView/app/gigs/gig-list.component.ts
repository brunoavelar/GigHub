import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { IGig } from './gig';
import { GigService } from './gig.service';

@Component({
    templateUrl: 'app/gigs/gig-list.component.html',
    styleUrls: ['app/gigs/gig-list.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class GigListComponent implements OnInit {
    pageTitle: string = 'Gig list';
    gigs: IGig[];
    errorMessage: string;

    constructor(private gigService: GigService){
        
    }
    
    ngOnInit(): void {
        this.gigService.getGigs()
            .subscribe(
                gigs => this.gigs = gigs,
                error => this.errorMessage = <any>error
            );
    }
    
}