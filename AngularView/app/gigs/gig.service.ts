import { Injectable } from "angular2/core";
import { IGig } from "./gig";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GigService {
    //private gigUrl = 'api/gigs/gigs.json';
    private gigUrl = 'http://localhost:53009/api/gigs';
    
    constructor(private _http: Http){
        
    }   
    
    getGigs(): Observable<IGig[]> {
        let headers:Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'bearer '+ localStorage.getItem('access_token'));
        let options:RequestOptions = new RequestOptions({ headers: headers });

        return this._http.get(this.gigUrl, options)
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