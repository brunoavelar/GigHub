import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';

import { Gig } from '../index';
import { GigFormModel } from "./gig-form.model";
import { GigService } from '../gig.service';
import { IdName } from '../index';

@Component({
    moduleId: __moduleName,
    templateUrl: 'gig-form.component.html'
})
export class GigFormComponent implements OnInit {
    private gig:GigFormModel = new GigFormModel();
    private genres:IdName[]

    constructor(private gigService: GigService, private routeParams: RouteParams, private router: Router) { 
        this.gig.venue = "vanue 01";
        this.gig.date = "10/10/2016"
        this.gig.time = "22:00";
    }
    
    onBack(): void {
        this.router.navigate(['Gigs']);
    }
    
    ngOnInit(): void { 
        this.gigService.getGenres()
            .then(genres => {
                this.genres = genres
                this.gig.genreId = this.genres[0].id;    
            });
    }

    submit(){
        let gigToSave = new Gig(this.gig);
        
        this.gigService.saveGig(gigToSave)
            .then((gig:Gig) => this.router.navigate(['GigDetail', {id: gig.id}]));
    }

}