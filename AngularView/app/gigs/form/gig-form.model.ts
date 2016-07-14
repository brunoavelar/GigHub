import { IdName } from '../index'

export class GigFormModel {
    id: number;
    venue: string;
    genreId:string;
    date: string;
    time:string;

    get datetime():Date{
        let typedDate = this.date + " " +this.time
        return new Date(typedDate)
    }

    constructor(){

    }
}