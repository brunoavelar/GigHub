var FollowingController = function (followingService) {
    var button;

    var init = function (container) {
        $(container).on("click", ".js-toggle-following", toggleFollowing);
    }

    var toggleFollowing = function (e) {
        button = $(event.target);
        var followeeId = button.attr("data-user-id");

        if (button.hasClass("btn-info")) {
            followingService.unfollow(followeeId, done, fail);
        } else {
            followingService.follow(followeeId, done, fail);
        }
    }

    var done = function () {
        var text = (button.text() == "Follow") ? "Following" : "Follow";

        button.toggleClass("btn-info").toggleClass("btn-default").text(text);
    }

    var fail = function () {
        alert('Something Failed');
    }

    return {
        init: init
    }
}(FollowingService);