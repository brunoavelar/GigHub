//btn-default - btn-info
import { Component, OnInit, Input } from 'angular2/core';
import { AttendanceService } from './attendance.service';

@Component({
    moduleId: __moduleName,
    selector: 'attendance-button',
    templateUrl: 'attendance-button.component.html',
})
export class AttendanceButtonComponent implements OnInit {
    private isAttending: boolean;
    @Input() gigId:string;

    get btnText():string {
        return this.isAttending ? "Going" : "Going?";
    }
    
    get activeClass():string {
        return this.isAttending ? "btn-info" : "btn-default";
    }

    constructor(private attendanceService: AttendanceService) { 

    }
    
    ngOnInit(): void { 
        this.attendanceService.getAttendance(this.gigId)
            .then(result => this.isAttending = result);
    }

    toggleAttendance():void {
        if(this.isAttending)
            this.deleteAttendance();
        else
            this.attend();
    }

    private attend():void {
        this.attendanceService.attend(this.gigId)
            .then(result => this.isAttending = true);
    }

    private deleteAttendance():void {
        this.attendanceService.deleteAttendance(this.gigId)
            .then(result => this.isAttending = false);
    }

}