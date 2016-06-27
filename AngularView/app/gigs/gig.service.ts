import { Injectable } from "angular2/core";
import { IGig } from "./gig";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../shared/authorized.http';


@Injectable()
export class GigService {
    private gigsUrl = 'http://localhost:53009/api/gigs';
    private gigUrl = 'http://localhost:53009/api/gigs/:id';
    private attendanceUrl = 'http://localhost:53009/api/attendances/:id';

    constructor(private http: AuthorizedHttp){
        
    }   
    
    getAttendance(gigId:number):Promise<boolean> {
        return this.http.get(this.attendanceUrl.replace(":id", gigId.toString()))
                .map((response:Response) => {
                    console.log(response);
                    
                    
                    return true;
                })
                .toPromise()
                .catch(error => {
                    if(error.status === 404)
                        return false
                    else
                        Promise.reject(error)
                });
    }

    getGig(gigId:number):Promise<IGig> {
        return this.http.get(this.gigUrl.replace(":id", gigId.toString()))
                .map((response:Response) => {
                    let gig = <IGig>response.json();
                    this.setGigDate(gig);
                    return gig;
                })
                .toPromise()
                .catch(this.handleError);
    }

    getGigs(): Promise<IGig[]> {
        return this.http.get(this.gigsUrl)
            .map((response) => this.parseGig(response))
            .toPromise()
            .catch(this.handleError);
    }

    parseGig(response: Response): IGig[]{
        var gigs:IGig[] = <IGig[]>response.json();
        gigs.forEach(gig => {
            this.setGigDate(gig);
        });
        return gigs;
    }

    setGigDate(gig: IGig){
        gig.date = new Date(gig.datetime);
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }
}