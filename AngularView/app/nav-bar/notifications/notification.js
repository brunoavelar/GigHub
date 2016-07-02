System.register(['../../gigs/gig'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gig_1;
    var Notification;
    return {
        setters:[
            function (gig_1_1) {
                gig_1 = gig_1_1;
            }],
        execute: function() {
            Notification = (function () {
                function Notification(object) {
                    if (object) {
                        this.type = object.type;
                        this.datetime = new Date(object.datetime);
                        this.originalDatetime = new Date(object.originalDateTime);
                        this.originalVenue = object.originalVenue;
                        this.gig = new gig_1.Gig(object.gig);
                    }
                    else {
                        this.datetime = new Date();
                        this.originalDatetime = new Date();
                        this.gig = new gig_1.Gig();
                    }
                    this.venueChanged = this.originalVenue != this.gig.venue;
                    this.datetimeChanged = this.originalDatetime != this.gig.datetime;
                }
                return Notification;
            }());
            exports_1("Notification", Notification);
        }
    }
});
//# sourceMappingURL=notification.js.map