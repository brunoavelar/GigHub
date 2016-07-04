import { Injectable, Injector, ReflectiveInjector, provide } from "angular2/core";
import { Http, Response, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from 'angular2/http';
import { MockBackend, MockConnection } from 'angular2/http/testing';
import { Observable } from 'rxjs/Observable';

import { AuthorizedHttp } from '../shared/authorized.http';
import { Gig } from "./index";


@Injectable()
export class GigService {
    private gigsUrl = '/api/gigs';
    private myGigsUrl = '/api/gigs/artist';
    private gigUrl = '/api/gigs/:id';
    private attendanceUrl = '/api/attendances/:id';
    private followingUrl = '/api/followings/:id';

    constructor(private http: Http){

    }   
    
    getAttendance(gigId:number):Promise<boolean> {
        return this.http.get(this.attendanceUrl.replace(":id", gigId.toString()))
                .map((response:Response) => {
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

    getFollowing(artistId:string):Promise<boolean> {
        return this.http.get(this.followingUrl.replace(":id", artistId))
                .map((response:Response) => {
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