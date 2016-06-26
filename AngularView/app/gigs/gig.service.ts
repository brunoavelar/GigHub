import { Injectable } from "angular2/core";
import { IGig } from "./gig";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../shared/authorized.http';


@Injectable()
export class GigService {
    private gigUrl = 'http://localhost:53009/api/gigs';
    
    constructor(private _http: AuthorizedHttp){
        
    }   
    
    getGigs(): Observable<IGig[]> {
        return this._http.get(this.gigUrl)
            .map((response: Response) => this.parseGig(response))
            .catch(this.handleError);
    }

    parseGig(response: Response): IGig[]{
        var gigs:IGig[] = <IGig[]>response.json();
        gigs.forEach(gig => {
            gig.date = new Date(gig.datetime);
        });
        return gigs;
    }
    
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}