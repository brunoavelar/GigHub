import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from './user-info';

export class LoginResponse {
    constructor(public success:boolean, public errorMessage?:string){

    }
}

@Injectable()
export class LoginService {
    private apiUrl = 'http://localhost:53009/token';

    constructor(private http: Http, private userInfo:UserInfo) {
        
    }

    login(userName: string, password: string):Promise<LoginResponse> {
        let headers:Headers = new Headers();
        headers.append('Accept', 'application/json');
        let options:RequestOptions = new RequestOptions({ headers: headers });
        let body:string = `grant_type=password&username=${userName}&password=${password}`;

        var response = this.http.post(this.apiUrl, body, options)
                                .do((response:Response) => {
                                    let responseData = response.json(); 
                                    localStorage.setItem('access_token', responseData.access_token);
                                    localStorage.setItem('token_type', responseData.token_type);
                                    localStorage.setItem('userName', responseData.userName);
                                    localStorage.setItem('isLoggedIn', 'true');
                                    this.userInfo = new UserInfo();
                                })
                                .map((response:Response) => {
                                    let data = response.json();
                                    return new LoginResponse (response.ok, data.error_description);
                                })
                                .toPromise();
        return response;
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        this.userInfo = new UserInfo();
    }

    isLoggedIn():boolean {
        return this.userInfo && this.userInfo.IsLoggedIn;
    }

    getUserName():string{
        return this.userInfo.UserName || "";
    }

}