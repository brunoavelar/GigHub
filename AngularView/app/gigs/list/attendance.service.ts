import { Injectable } from "angular2/core";
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { AuthorizedHttp } from '../../shared/authorized.http';
import { Attendance } from './Attendance';

@Injectable()
export class AttendanceService {
    private attendanceUrl = '/attendances/:id';
    private attendancesUrl = '/attendances';

    private attendances:Promise<Attendance[]>;

    constructor(private http: AuthorizedHttp){
        this.attendances = this.http.get(this.attendancesUrl)
            .map((response:Response) => <Attendance[]>response.json())
            .toPromise();
    }

    getAttendance(gigId:string):Promise<boolean> {
        let attending:Promise<boolean> = this.attendances.then((attendances:Attendance[]) => {
            return attendances.some((attendance:Attendance) => attendance.gigId.toString() == gigId);
        });
        return attending;
    }

    attend(gigId:string):Promise<Response> {
        let postUrl:string = this.attendanceUrl.replace(":id", '');
        let body:string = JSON.stringify({ gigId });
        
        return this.http.post(postUrl, body)
                .do((response:Response) => this.addAttendanceToList(response, gigId))
                .toPromise()
                .catch(error => console.log(error));
    }

    private addAttendanceToList(response:Response, gigId:string){
        if(response.ok){
            var attendance:Attendance = { gigId: Number.parseInt(gigId) };
            this.attendances.then((attendances:Attendance[]) => {                    
                attendances.push(attendance)
            });
        }
    }

    deleteAttendance(gigId:string):Promise<Response> {
        let deleteUrl:string = this.attendanceUrl.replace(":id", gigId);

        return this.http.delete(deleteUrl)
                .do((response:Response) => this.removeAttendanceFromListt(response, gigId))
                .toPromise()
                .catch(error => console.log(error));
    }

    private removeAttendanceFromListt(response:Response, gigId:string){
        if(response.ok){
            var attendance:Attendance = { gigId: Number.parseInt(gigId) };
            this.attendances.then((attendances:Attendance[]) => {
                let attendanceToDelete:Attendance = attendances.find(a => a.gigId.toString() == gigId);
                let index:number = attendances.indexOf(attendanceToDelete);
                attendances.splice(index, 1);
            });
        }
    }
    
    private handleError(error: Response) {
        return Promise.reject(error);
    }

    public clearData(){
        this.attendances = null;
    }
}