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

// $('.appContainer').hide();
// $('.appError').hide();

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
            console.log('response: ' + response.stream);
            if ( response.status === 404 || response.status === 422) {
                $('.appContainer').fadeOut(500);
                $('.appError').fadeIn(500);
                $('.appError .errMessg').text('Oh no! Something went wrong: ' + response.message + '.');
                console.log(response);
            } else {
                $('.appError').fadeOut(500);
                $('.appContainer').fadeIn(500);
                kyT.showUser(response);
            }
        },
        error: function(err) {
            console.log('There was an error ' + err);
        }
    });
};

kyT.getStreamStatus = function() {
    // Get's the online status and prints
    $.ajax({
        url: 'https://api.twitch.tv/kraken/' + streams + streamer,
        type: 'GET',
        dataType: 'jsonp',
        success: function(response) {
            kyT.getStreamerDetails(response);
        },
        error: function(err) {
            console.log('Something went wrong ' + err);
        }
    });
};

kyT.showUser = function(status) {
    $('.casterLogo').attr('src', status.logo);
    $('.displayName').text(status.display_name);
    $('.gamePlayed').text('Game Played: ' + status.game);
    $('.castTitle').text('Cast title: ' + status.status);
    $('.views').text('Overall Views: ' + status.views);
    $('.follows').text('Followers: ' + status.followers);
    $('.profileImgContainer').css('background-image', 'url(' + status.profile_banner + ')');
};
//  Step two: print stuff into respective html elements
kyT.getStreamerDetails = function(status, onlineStatus) {
    // Define online Status var will be given value depending on response 
    if (status !== null) {
        onlineStatus = 'Streamer is Offline';
        $('.url').hide();
        console.log(status);
    } else {
        onlineStatus = 'Streamer is Online';
        $('.url a').attr('href', status.stream.channel.url);
        $('.fps').text('Average Fps: ' + status.stream.average_fps.toFixed(2));
    }
    $('.onlineStatus').text(onlineStatus);

};
kyT.init = function() {
    kyT.findStreamer();
};

$(document).ready(function() {
    kyT.init();
});
