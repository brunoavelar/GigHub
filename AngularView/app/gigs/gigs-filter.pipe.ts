import { PipeTransform, Pipe } from 'angular2/core';
import { IGig } from './gig';

@Pipe({
    name: 'gigFilter'
})
export class GigFilterPipe implements PipeTransform {
    
    transform(value: IGig[], args: string[]){
        if(!value)
        return value;

        let filter = args ? args[0].toLowerCase() : null;

        let filteredArray: IGig[] = value.filter((gig: IGig) => {  
            let foundInArtist:boolean = gig.artist.name.toLowerCase().indexOf(filter) >= 0;
            let foundInVenue:boolean = gig.venue.toLowerCase().indexOf(filter) >= 0;
            let foundInGenre:boolean = gig.genre.name.toLowerCase().indexOf(filter) >= 0;
            
            return foundInArtist || foundInVenue || foundInGenre;
        });
        
        return filteredArray;
    }
}