import { Gig } from '../../gigs/gig';

export class Notification {
    type:number;
    datetime: Date;
    originalDatetime:Date;
    originalVenue:string;
    gig:Gig;

    venueChanged:boolean;
    datetimeChanged:boolean;

    constructor(object?:any) {
        if(object){
            this.type = object.type;
            this.datetime = new Date(object.datetime);
            this.originalDatetime = new Date(object.originalDateTime);
            this.originalVenue = object.originalVenue;
            this.gig = new Gig(object.gig);
        }else{
            this.datetime = new Date();
            this.originalDatetime = new Date();
            this.gig = new Gig();
        }

        this.venueChanged = this.originalVenue != this.gig.venue;
        this.datetimeChanged = this.originalDatetime != this.gig.datetime;
    }
}