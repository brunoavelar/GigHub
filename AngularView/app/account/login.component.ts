import { Component } from 'angular2/core';
import { LoginService } from './login.service';
import { UserInfo } from './user-info'
import { Router } from 'angular2/router';

@Component({
    templateUrl: 'app/account/login.component.html',
    styleUrls: ['app/account/login.component.css']
})
export class LoginComponent {
    userName: string;
    password: string;

    constructor(private loginService: LoginService, private router: Router){        
    }   

    login(){
        this.loginService.loginUser(this.userName, this.password)
            .subscribe(
                success => this.redirect(),
                error => this.handleError(error)
            );
    }

    private redirect():void{
        this.router.navigate(['Gigs']);
    }

    private handleError(error:UserInfo):void{
        console.log(error.error_description);
    }
}