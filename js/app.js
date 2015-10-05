var kyT = {},
    baseUrl = "https://api.twitch.tv/kraken/",
    channels = "channels/",
    streams = "streams/",
    streamerInput = $(".streamerSearch"),
    streamer;
streamerInput.on("keyup change", function() {
    streamer = streamerInput.val().toLowerCase()
}), kyT.findStreamer = function() {
    $("form").on("submit form", function(e) {
        e.preventDefault(), kyT.getUser(streamer), kyT.getStreamStatus(streamer)
    })
}, kyT.getUser = function() {
    console.log(streamer), $.ajax({
        url: baseUrl + channels + streamer,
        type: "GET",
        dataType: "jsonp",
        success: function(e) {
            console.log("response: " + e.stream), 404 === e.status || 422 === e.status ? ($(".appContainer").fadeOut(500), $(".appError").fadeIn(500), $(".appError .errMessg").text("Oh no! Something went wrong: " + e.message + "."), console.log(e)) : ($(".appError").fadeOut(500), $(".appContainer").fadeIn(500), kyT.showUser(e))
        },
        error: function(e) {
            console.log("There was an error " + e)
        }
    })
}, kyT.getStreamStatus = function() {
    $.ajax({
        url: "https://api.twitch.tv/kraken/" + streams + streamer,
        type: "GET",
        dataType: "jsonp",
        success: function(e) {
            kyT.getStreamerDetails(e)
        },
        error: function(e) {
            console.log("Something went wrong " + e)
        }
    })
}, kyT.showUser = function(e) {
    $(".casterLogo").attr("src", e.logo), $(".displayName").text(e.display_name), $(".gamePlayed").text("Game Played: " + e.game), $(".castTitle").text("Cast title: " + e.status), $(".views").text("Overall Views: " + e.views), $(".follows").text("Followers: " + e.followers), $(".profileImgContainer").css("background-image", "url(" + e.profile_banner + ")")
}, kyT.getStreamerDetails = function(e, t) {
    null !== e ? (t = "Streamer is Offline", $(".url").hide(), console.log(e)) : (t = "Streamer is Online", $(".url a").attr("href", e.stream.channel.url), $(".fps").text("Average Fps: " + e.stream.average_fps.toFixed(2))), $(".onlineStatus").text(t)
}, kyT.init = function() {
    kyT.findStreamer()
}, $(document).ready(function() {
    kyT.init()
});
