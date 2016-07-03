import { IdName } from './index'

export class Gig {
    id: number;
    venue: string;
    artist: IdName;
    genre:IdName;
    datetime: Date;
    isCanceled: boolean;

    constructor(object?:any){
        if(object){
            this.id = object.id;
            this.venue = object.venue;
            this.artist = object.artist;
            this.genre = object.genre;
            this.datetime = new Date(object.datetime);
            this.isCanceled = object.isCanceled;
        }else{
            this.artist = new IdName();
            this.genre = new IdName();
            this.datetime = new Date();
        }
    }
}