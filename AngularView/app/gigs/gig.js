System.register(['./id.name'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var id_name_1;
    var Gig;
    return {
        setters:[
            function (id_name_1_1) {
                id_name_1 = id_name_1_1;
            }],
        execute: function() {
            Gig = (function () {
                function Gig(object) {
                    if (object) {
                        this.gigId = object.id;
                        this.venue = object.venue;
                        this.artist = object.artist;
                        this.genre = object.genre;
                        this.datetime = new Date(object.datetime);
                        this.isCanceled = object.isCanceled;
                    }
                    else {
                        this.artist = new id_name_1.IdName();
                        this.genre = new id_name_1.IdName();
                        this.datetime = new Date();
                    }
                }
                return Gig;
            }());
            exports_1("Gig", Gig);
        }
    }
});
//# sourceMappingURL=gig.js.map