System.register(['angular2/http', "../app/gigs/index", './server-data'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, index_1, server_data_1;
    var GigsApi, AttendanceApi, UserApi, FakeServer;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (server_data_1_1) {
                server_data_1 = server_data_1_1;
            }],
        execute: function() {
            GigsApi = (function () {
                function GigsApi() {
                    this.gigs = server_data_1.Gigs.map(function (value) { return new index_1.Gig(value); });
                }
                GigsApi.prototype.getGigs = function () {
                    return this.gigs;
                };
                return GigsApi;
            }());
            AttendanceApi = (function () {
                function AttendanceApi() {
                    this.attendances = server_data_1.Attendances;
                }
                AttendanceApi.prototype.isAttending = function (request) {
                    var gigId = /\d+/.exec(request.url)[0];
                    return true;
                };
                return AttendanceApi;
            }());
            UserApi = (function () {
                function UserApi() {
                    this.users = server_data_1.Users;
                }
                UserApi.prototype.loginUser = function (request) {
                    var body = request.text();
                    var begin = body.indexOf("&username=") + "&username=".length;
                    var end = body.indexOf("&password=");
                    var email = body.substring(begin, end);
                    var user = server_data_1.Users.find(function (user) { return user.email === email; });
                    return {
                        access_token: '',
                        token_type: '',
                        userName: user.email
                    };
                };
                return UserApi;
            }());
            FakeServer = (function () {
                function FakeServer() {
                    this.attendanceApi = new AttendanceApi();
                    this.gigsApi = new GigsApi();
                    this.userApi = new UserApi();
                }
                FakeServer.prototype.getData = function (request) {
                    var response;
                    if (/\/token/.test(request.url)) {
                        var data = this.userApi.loginUser(request);
                        response = this.createResponse(request);
                    }
                    else if (/\/api\/attendances\/\d+/.test(request.url)) {
                        var data = this.attendanceApi.isAttending(request);
                        response = this.createResponse(data);
                    }
                    else if (/\/api\/gigs/.test(request.url)) {
                        var data = this.gigsApi.getGigs();
                        response = this.createResponse(data);
                    }
                    return response;
                };
                FakeServer.prototype.createResponse = function (data) {
                    var options = new http_1.ResponseOptions({ body: JSON.stringify(data) });
                    return new http_1.Response(options);
                };
                return FakeServer;
            }());
            exports_1("FakeServer", FakeServer);
        }
    }
});
//# sourceMappingURL=fake-route.js.map