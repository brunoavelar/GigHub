import { Injectable } from "angular2/core";
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { AuthorizedHttp } from '../shared/authorized.http';
import { Gig } from "./index";
import { AttendanceService } from './attendance.service';


@Injectable()
export class GigService {
    private gigsUrl = '/gigs';
    private myGigsUrl = '/gigs/artist';
    private gigUrl = '/gigs/:id';

    constructor(private http: AuthorizedHttp){

    }   

    getGig(gigId:number):Promise<Gig> {
        return this.http.get(this.gigUrl.replace(":id", gigId.toString()))
                .map((response:Response) => {
                    let gig = new Gig(response.json());
                    return gig;
                })
                .toPromise()
                .catch(this.handleError);
    }

    getGigs(): Promise<Gig[]> {
        return this.http.get(this.gigsUrl)
            .map((response) => this.parseGigs(response))
            .toPromise()
            .catch(this.handleError);
    }

    getMyGigs(): Promise<Gig[]> {
        return this.http.get(this.myGigsUrl)
            .map((response) => this.parseGigs(response))
            .toPromise()
            .catch(this.handleError);
    }

    parseGigs(response: Response): Gig[]{
        let gigs:Gig[] = [];
        response.json().forEach(element => {
            var gig:Gig = new Gig(element);
            gigs.push(gig);
        });
        return gigs;
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }
}