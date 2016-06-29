import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../shared/authorized.http';


@Injectable()
export class AttendanceService {
    private attendanceUrl = '/attendances/:id';

    constructor(private http: AuthorizedHttp){
        
    }   

    getAttendance(gigId:string):Promise<boolean> {
        let getUrl:string = this.attendanceUrl.replace(":id", gigId);        
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

    attend(gigId:string):Promise<Response> {
        let postUrl:string = this.attendanceUrl.replace(":id", '');
        let body:string = JSON.stringify({ gigId });
        
        return this.http.post(postUrl, body)
                .toPromise()
                .catch(error => console.log(error));
    }

    deleteAttendance(gigId:string):Promise<Response> {
        let deleteUrl:string = this.attendanceUrl.replace(":id", gigId);

        return this.http.delete(deleteUrl)
                .toPromise()
                .catch(error => console.log(error));
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }
}