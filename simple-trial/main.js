// sipjs_demos.js
//
// Even though both "Alice" and "Bob" are running on the same computer,
// this demo behaves as if the dialog was an SIP call over a network.

var data = {
    userUri: 'usercode@myrealm.com',
    privateUser: 'username',
    password: 'password',
    displayName: 'displayName',
    wsServer: 'wss://websockets.url.com:5065',
    directory: {
        personA: '5558889999',  // Guillermo
    }
}

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
        ua: {
            traceSip: true,
            uri: data.userUri,
            displayName: data.displayName,
            //userAgentString: SIP.C.USER_AGENT + " sipjs.com"
            wsServers: [data.wsServer],
            authorizationUser: data.privateUser,
            password: data.password
        }
    };
    var simple = new SIP.Web.Simple(configuration);

    // Adjust the style of the demo based on what is happening
    simple.on('ended', function() {
        remoteVideoElement.style.visibility = 'hidden';
        button.firstChild.nodeValue = 'video';
    });

    simple.on('connected', function() {
        remoteVideoElement.style.visibility = 'visible';
        button.firstChild.nodeValue = 'hang up';
    });

    simple.on('ringing', function() {
      simple.answer();
    });

    button.addEventListener('click', function() {
        // No current call up
        if (simple.state === SIP.Web.Simple.C.STATUS_NULL ||
            simple.state === SIP.Web.Simple.C.STATUS_COMPLETED) {
            simple.call(data.directory.personA);
        } else {
            simple.hangup();
        }
    });

    return simple;
}


(function () {
    if (!window.RTCPeerConnection) return;

    // Now we do SIP.js stuff
    var aliceSimple = createSimple('video-of-bob', 'alice-video-button');

    // We want to only run the demo if all users for the demo can register
    var markAsRegistered = function () {
        console.log('User registered!');
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
