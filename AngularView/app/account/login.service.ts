import { Injectable } from "angular2/core";
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from './user-info';

@Injectable()
export class LoginService {
    constructor(private http: Http, private userInfo:UserInfo) {
        
    }

    private apiUrl = 'http://localhost:53009/token';

    loginUser(userName: string, password: string): Observable<boolean>{
        let headers:Headers = new Headers();
        headers.append('Accept', 'application/json');
        let options:RequestOptions = new RequestOptions({ headers: headers });

        let body:string = `grant_type=password&username=${userName}&password=${password}`;

        return this.http.post(this.apiUrl, body, options)       
            .do((response:Response) => { 
                let responseData = <UserInfo>response.json(); 
                localStorage.setItem('access_token', responseData.access_token);
                localStorage.setItem('token_type', responseData.token_type);
                localStorage.setItem('userName', responseData.userName);
                localStorage.setItem('isLoggedIn', 'true');
                this.userInfo = new UserInfo();
            })
             .map((response:Response) => {
                return true;
            })   
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<UserInfo> {
        return Observable.throw(<UserInfo>error.json())
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        this.userInfo = new UserInfo();
    }

    isLoggedIn():boolean {
        return this.userInfo && this.userInfo.isLoggedIn;
    }

    getUserName():string{
        return this.userInfo.userName || "";
    }

}