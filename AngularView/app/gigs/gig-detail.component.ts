import { Component, OnInit } from 'angular2/core';
import { GigService } from './gig.service';
import { RouteParams, Router} from 'angular2/router';
import { IGig } from "./gig";
import { FollowButtonComponent } from "../shared/follow-button.component";

@Component({
    templateUrl: 'app/gigs/gig-detail.component.html',
    directives: [FollowButtonComponent]
})
export class GigDetailComponent implements OnInit {
    private gig:IGig;
    private isAttending: boolean;
    private isFollowing: boolean;

    constructor(private gigService: GigService, private routeParams: RouteParams, private router: Router) { 
        this.gig = {
            gigId: 0,
            venue: '',
            artist: {id: '', name: ''},
            genre: {id: '', name: ''},
            datetime: '',
            date: new Date(),
            isCanceled: false
        };
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