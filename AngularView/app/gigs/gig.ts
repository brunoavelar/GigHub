import { IdName } from './id.name'

export interface IGig {
    gigId: number;
    venue: string;
    artist: IdName;
    genre:IdName;
    datetime: string;
    date: Date
}