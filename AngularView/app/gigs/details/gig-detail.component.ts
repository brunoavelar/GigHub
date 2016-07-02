import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';

import { FollowButtonComponent } from "../../shared/follow-button.component";
import { Gig } from "../gig";
import { GigService } from '../gig.service';


@Component({
    moduleId: __moduleName,
    templateUrl: 'gig-detail.component.html',
    directives: [FollowButtonComponent]
})
export class GigDetailComponent implements OnInit {
    private gig:Gig = new Gig();
    private isAttending: boolean;
    private isFollowing: boolean;

    constructor(private gigService: GigService, private routeParams: RouteParams, private router: Router) { 
        this.gig = new Gig();
    }
    
    onBack(): void {
        this.router.navigate(['Gigs']);
    }
    
    ngOnInit(): void { 
        let gigId:number = +this.routeParams.get('id');
        
        this.gigService.getGig(gigId)
            .then((gig) => {
                this.gig = gig;
            })
            .catch((error) => console.log(error));

        this.gigService.getAttendance(gigId)
            .then(result => this.isAttending = result);
    }

}