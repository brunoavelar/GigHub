import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../shared/authorized.http';


@Injectable()
export class FollowService {
    private followingUrl = '/followings/:id';

    constructor(private http: AuthorizedHttp){
        
    }   

    getFollowing(artistId:string):Promise<boolean> {
        let getUrl:string = this.followingUrl.replace(":id", artistId);

        return this.http.get(getUrl)
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

    follow(artistId:string):Promise<Response> {
        let postUrl:string = this.followingUrl.replace(":id", '');
        let body:string = JSON.stringify({ FolloweeId: artistId });
        
        return this.http.post(postUrl, body)
                .toPromise()
                .catch(error => console.log(error));
    }

    unfollow(artistId:string):Promise<Response> {
        let deleteUrl:string = this.followingUrl.replace(":id", artistId);

        return this.http.delete(deleteUrl)
                .toPromise()
                .catch(error => console.log(error));
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }
}