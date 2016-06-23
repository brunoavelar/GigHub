import { Injectable } from "angular2/core";
import { IGig } from "./gig";
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GigService {
    private _productUrl = 'api/gigs/gigs.json';
    
    constructor(private _http: Http){
        
    }   
    
    getGigs(): Observable<IGig[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => this.parseGig(response))
            //.do(data => console.log(JSON.stringify(data)))
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
        console.error(error);
        
        return Observable.throw(error.json().error || 'Server error');
    }
}