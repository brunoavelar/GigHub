import { Injectable } from "angular2/core";
import { Request, Response, ResponseOptions, Headers } from 'angular2/http';

import { GigsApi, AttendanceApi, UserApi } from './apis'



@Injectable()
export class FakeServer {
    constructor(private gigsApi:GigsApi, private userApi:UserApi, private attendanceApi:AttendanceApi) {
    }

    getData(request:Request):Response{
        var response:Response;
        
        if(/\/token/.test(request.url)){
            response = this.userApi.loginUser(request);
        } else if(/\/api\/attendances\/\d+/.test(request.url)){
            let data = this.attendanceApi.isAttending(request);
            response = this.createResponse(data, request.url);
        } else if(/\/api\/gigs/.test(request.url)){
            let data = this.gigsApi.getGigs();
            response = this.createResponse(data, request.url);
        } else{
            response = this.createResponse('', request.url);
        }
        
        return response;
    }

    createResponse(data:any, url:string):Response{
        var headers:Headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8')

        let options:ResponseOptions = new ResponseOptions({ 
            body: JSON.stringify(data),
            headers: headers,
            status: 200,
            statusText: "ok",
            type: 2,
            url: url
        });
        return new Response(options);
    }
}