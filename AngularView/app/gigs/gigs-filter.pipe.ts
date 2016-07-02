import { PipeTransform, Pipe } from 'angular2/core';

import { Gig } from './index';

@Pipe({
    name: 'gigFilter'
})
export class GigFilterPipe implements PipeTransform {
    
    transform(value:Gig[], args:string):Gig[] {
        if(!value || !args)
            return value;

        let filter:string = args.toLowerCase();

        let filteredArray: Gig[] = value.filter((gig: Gig) => {  
            let foundInArtist:boolean = gig.artist.name.toLowerCase().indexOf(filter) >= 0;
            let foundInVenue:boolean = gig.venue.toLowerCase().indexOf(filter) >= 0;
            let foundInGenre:boolean = gig.genre.name.toLowerCase().indexOf(filter) >= 0;
            
            return foundInArtist || foundInVenue || foundInGenre;
        });
        
        return filteredArray;
    }
}