// sipjs_demos.js

var URL = window.URL || window.webkitURL;

function getCookie(key) {
    var re = new RegExp("(?:(?:^|.*;\s*) ?" + key + "\s*\=\s*([^;]*).*$)|^.*$");
    return document.cookie.replace(re, "$1");

}

// This demo uses unauthenticated users on the "sipjs.onsip.com" demo domain.
// To allow multiple users to run the demo without playing a game of
// chatroulette, we give both callers in the demo a random token and then only
// make calls between users with these token suffixes.
// So, you still might run into a user besides yourself.
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
// Each session gets a token that expires 1 day later. This is so we minimize
// the number of users we register for the SIP domain, because SIP hosts
// generally have limits on the number of registered users you may have in total
// or over a period of time.
var token = getCookie('onsipToken');
if (token === '') {
    token = randomString(32, ['0123456789',
                              'abcdefghijklmnopqrstuvwxyz',
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join(''));
    var d = new Date();
    d.setTime(d.getTime() + 1000*60*60*24); // expires in 1 day
    document.cookie = ('onsipToken=' + token + ';'
                       + 'expires=' + d.toUTCString() + ';');
}
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice.' + window.token + '@' + domain;
var aliceName     = 'Alice';

var bobURI        = 'bob.' + window.token + '@' + domain;
var bobName       = 'Bob';

function getCustomUA() {
    return {
        traceSip: true,
        uri: 'myrealm.com',
        displayName: 'displayName',
        wsServers: ['wss://websockets.url.com:1111'],
        authorizationUser: 'username',
        password: 'password'
    }
}

function getRandomOnSipUA() {
    return {
        traceSip: true,
        uri: 'alice.' + window.token + '@' + domain,
        displayName: 'Alice ' + window.token,
        userAgentString: SIP.C.USER_AGENT + " sipjs.com"
    }
}

var currentUA = getRandomOnSipUA();

// Function: createSimple
//   creates a SIP.js Simple instance with the given arguments plugged into the
//   configuration. This is a standard Simple instance for WebRTC calls.
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
//   remoteVideo: the DOM element id of the video for the remote
//   buttonId: the DOM element id of the button for that user
function createSimple(remoteVideo, buttonId) {
    var recipient = document.getElementById('recipient');
    var remoteVideoElement = document.getElementById(remoteVideo);
    var localVideoElement = document.getElementById('localVideo');
    var button = document.getElementById(buttonId);

    var configuration = {
        media: {
            remote: {
                audio: remoteVideoElement
            },
            local: {
                audio: localVideoElement
            }
        },
        ua: getCustomUA()
    };
    var simple = new SIP.Web.Simple(configuration);

    // Adjust the style of the demo based on what is happening
    simple.on('ended', function() {
        remoteVideoElement.style.visibility = 'hidden';
        button.firstChild.nodeValue = 'Call';
    });

    simple.on('connected', function() {
        remoteVideoElement.style.visibility = 'visible';
        button.firstChild.nodeValue = 'Hang up';
    });

    simple.on('ringing', function() {
      simple.answer();
    });

    button.addEventListener('click', function() {
        // No current call up
        if (simple.state === SIP.Web.Simple.C.STATUS_NULL ||
            simple.state === SIP.Web.Simple.C.STATUS_COMPLETED) {
            simple.call(recipient.value);
        } else {
            simple.hangup();
        }
    });

    return simple;
}


(function () {
    if (!window.RTCPeerConnection) return;

    var usernameElement = document.getElementById('username');

    // Now we do SIP.js stuff
    var aliceSimple = createSimple('video-of-bob', 'alice-video-button');

    // We want to only run the demo if all users for the demo can register
    var markAsRegistered = function () {
        console.log('User registered!');
        usernameElement.innerHTML = currentUA.uri;
    };
    var failRegistration = function () {
        console.log('User registration failed');
    };
    // We don't want to proceed until we've registered all users.
    // For each registered user, increase the counter.
    aliceSimple.on('registered', markAsRegistered);
    // If any registration fails, then we need to disable the app and tell the
    // user that we could not register them.
    aliceSimple.on('registrationFailed', failRegistration);

    // Unregister the user agents and terminate all active sessions when the
    // window closes or when we navigate away from the page
    window.onunload = function () {
        aliceSimple.stop();
    };
})();
