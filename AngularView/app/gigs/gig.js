System.register(['./index'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1;
    var Gig;
    return {
        setters:[
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            Gig = (function () {
                function Gig(object) {
                    if (object) {
                        this.id = object.id;
                        this.venue = object.venue;
                        this.artist = object.artist;
                        this.genre = object.genre;
                        this.genreId = parseInt(object.genreId);
                        this.datetime = new Date(object.datetime);
                        this.isCanceled = object.isCanceled;
                    }
                    else {
                        this.artist = new index_1.IdName();
                        this.genre = new index_1.IdName();
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