import { Component, OnInit, Input } from 'angular2/core';
import { FollowService } from './follow.service';

@Component({
    moduleId: __moduleName,
    selector: 'follow-button',
    templateUrl: 'follow-button.component.html',
    providers: [FollowService]
})
export class FollowButtonComponent implements OnInit {
    private isFollowing: boolean;
    @Input() followee:string;

    get btnText():string {
        return this.isFollowing ? "Following" : "Follow";
    }
    
    get activeClass():string {
        return this.isFollowing ? "btn-info" : "btn-default";
    }    

    constructor(private followService: FollowService) { 
        
    }
    
    ngOnInit():void { 
        this.followService.getFollowing(this.followee)
            .then(result => this.isFollowing = result);
    }

    toggleFollow():void {        
        if(this.isFollowing){
            this.unfollow();
        }else{
            this.follow();
        }
    }

    private follow():void {
        this.followService.follow(this.followee)
            .then(result => this.isFollowing = true);
    }

    private unfollow():void {
        this.followService.unfollow(this.followee)
            .then(result => this.isFollowing = false);
    }

}