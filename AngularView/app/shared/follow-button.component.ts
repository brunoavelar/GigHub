import { Component, OnInit, Input } from 'angular2/core';
import { FollowService } from './follow.service';

@Component({
    selector: 'follow-button',
    templateUrl: 'app/shared/follow-button.component.html',
    providers: [FollowService]
})
export class FollowButtonComponent implements OnInit {
    private isFollowing: boolean;
    @Input() followee:string;

    constructor(private followService: FollowService) { 

    }
    
    onBack(): void {
        
    }
    
    ngOnInit(): void { 
        this.followService.getFollowing(this.followee)
            .then(result => this.isFollowing = result);
    }

    follow():void{
        this.followService.follow(this.followee)
            .then(result => this.isFollowing = true);
    }

    unfollow():void{
        this.followService.unfollow(this.followee)
            .then(result => this.isFollowing = false);
    }

}