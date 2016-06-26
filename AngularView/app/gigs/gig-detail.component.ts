import { Component, OnInit } from 'angular2/core';
import { GigService } from './gig.service';
import { RouteParams, Router} from 'angular2/router';

@Component({
    templateUrl: 'app/gigs/gig-detail.component.html'
})
export class GigDetailComponent implements OnInit {
    
    constructor(private gigService: GigService, 
                private routeParams: RouteParams,
                private router: Router) { 

        console.log(this.routeParams.get('id'));
    }
    
    onBack(): void {
        this.router.navigate(['Gigs']);
    }
    
    ngOnInit(): void { 
        
    }

}