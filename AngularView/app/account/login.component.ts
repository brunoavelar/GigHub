import { Component } from 'angular2/core';
import { LoginService, LoginResponse } from './login.service';
import { UserInfo } from './user-info'
import { Router } from 'angular2/router';

@Component({
    moduleId: __moduleName,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    userName: string;
    password: string;

    constructor(private loginService: LoginService, private router: Router){        
    }   

    login(){
        this.loginService.login(this.userName, this.password)
            .then((login:LoginResponse) => {
                if(login.success){
                    this.redirect();
                }else{
                    console.log('error_message: ', login.errorMessage);
                }
            }).catch(this.handleError)
    }

    private redirect():void{
        this.router.navigate(['Gigs']);
    }

    private handleError(error):void{
        console.log(error);
    }
}