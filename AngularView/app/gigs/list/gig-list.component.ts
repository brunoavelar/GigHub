import { Component, OnInit, provide } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { AttendanceButtonComponent } from './attendance-button.component'
import { Gig } from '../index';
import { GigService } from '../gig.service';
import { GigFilterPipe } from './../gigs-filter.pipe'
import { GigDateComponent } from "./../gig-date.component";
import { LoginService } from '../../account/login.service';

@Component({
    moduleId: __moduleName,
    templateUrl: 'gig-list.component.html',
    styleUrls: ['gig-list.component.css'],
    directives: [ROUTER_DIRECTIVES, AttendanceButtonComponent, GigDateComponent],
    pipes: [GigFilterPipe]
})
export class GigListComponent implements OnInit {
    gigs: Gig[];
    errorMessage: string;

    get isLoggedIn():boolean {
        return this.loginService.isLoggedIn();
    }

    constructor(private gigService: GigService, private loginService:LoginService){
        
    }
    
    ngOnInit(): void {
        this.gigService.getGigs()
            .then((gigs) => this.gigs = gigs)
            .catch((error) => console.log(error));
    }
    
}