// Use the twitch api to display a streamers name, recent game played, broadcast title, views, and follows
// Define app namespace
var kyT = {};
// Define Vars
var baseUrl = 'https://api.twitch.tv/kraken/';
var channels = 'channels/';
var streams = 'streams/';
var streamerInput = $('.streamerSearch');
// Define streamer
var streamer;
$('.appContainer').hide();
$('.status').hide();
// Wait for user to type streamer name, Then save to var
streamerInput.on('keyup change', function() {
    streamer = streamerInput.val().toLowerCase();
});

// When searching call getUser 
kyT.findStreamer = function() {
    $('form').on('submit form', function(e) {
        e.preventDefault();
        kyT.getUser(streamer);
        kyT.getStreamStatus(streamer);
    });
};
// Step one: include api via ajax 
kyT.getUser = function() {
    console.log(streamer);
    $.ajax({
        url: baseUrl + channels + streamer,
        type: 'GET',
        dataType: 'jsonp',
        success: function(response) {
            $('.appContainer').fadeIn(500);
            kyT.showUser(response);
        },
        error: function(err) {
            console.log('There was an error ' + err);
        }
    });
};

// ******************* TODO  CHECK TO SEE IF STREAM IS LIFE AND IF IT IS THEN POST s*********************************
kyT.getStreamStatus = function() {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/' + streams + streamer,
        type: 'GET',
        dataType: 'jsonp',
        success: function(response) {
            if (response.stream !== null) {
                console.log(response);
                $('.status').fadeIn(500);
                kyT.getStreamerDetails(response);
            } else {
                console.log('strim not available');
                $('.onlineStatus').text('Streamer is Offline');
            }
        },
        error: function(err) {
            console.log('Something went wrong ' + err);
        }
    });
};
// ********************** END OF TODO ******************************
kyT.showUser = function(status) {
    $('.casterLogo').attr('src', status.logo);
    $('.displayName').text(status.display_name);
    $('.gamePlayed').text(status.game);
    $('.castTitle').text(status.status);
    $('.views').text('Overall Views ' + status.views);
    $('.follows').text('Followers: ' + status.followers);
    $('.profileImgContainer').css('background-image', 'url(' + status.profile_banner + ')');
};
//  Step two: print stuff into respective html elements
kyT.getStreamerDetails = function(status) {
    $('.onlineStatus').text('Streamer is online');
    $('.url a').attr('href', status.stream.channel.url);
    $('.fps').text('Average Fps: ' + status.stream.average_fps.toFixed(2));
};
kyT.init = function() {
    kyT.findStreamer();
};

$(document).ready(function() {
    kyT.init();
});
