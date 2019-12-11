# dist/libwebphone.js library v0.2.0

The goal of this library is to turn the browser in a softphone based on SIP+WebRTC

1. [Initialization of the Library](#initialization-of-the-library)
2. [Methods](#methods)
3. [Contact](#contact)

# Initialization of the Library

Get the libarary fro dist/libwebphone.js

1) First of all you need to include the JavaScript in the browser. In order to do so, you need to add the following snippet in your HTML.

<script type="text/javascript">
  var phone = new libwebphone();    
</script> 

2) Next need to set the parameter to start connect kazoo platform in below function "StartStack"

<script type="text/javascript">
function StartStack() {
phone.StartAgenStack
(
     [Displayname],
     [DisplayPhoneNumber],
     [sip:[userid]@vbbZ65Q.sb.2600hz.com,
     [passowrd]document.getElementById("txtpassword").value,
     "vbbZ65Q.sb.2600hz.com",
     "wss://sandbox.2600hz.com:5065/",
     "[{url:'stun:stun.l.google.com:19302'}]",
     "udp://vbbZ65Q.sb.2600hz.com",
     [html_buttonid_for_login],
     [html_buttonid_for_logout],
     [html_labelid_for_connectionstatus],
     [html_labelid_for_callstatus],
     [html_buttonid_for audio mute/unumte],
     [html_buttonid_for_par/unpark call],
     [html_video_buttonid_for_localvideo],
     [html_video_buttonid_for_remotevideo],
     [html_audio_for_remote_audio], 
     [html_inputid_for_numbertocall],
 ); 
</script> 
}

[Methods](#methods)
The phone object has below accessible methods:

StartStack() :: Connect to Kazoo platform with credential and other paramaters
phone.Disconnect() :: Logout and disconnect from kazoo platform
phone.CallAudioOnly([Number to dial]) :: Audio call generation
phone.MuteUnMuteCallAudio() :: Mute / UnMute audio call
phone.HoldResumCall() :: park / Unpark audio call
phone.HangUpCall() :: Hang up ongoing call
phone.CallTransfer([Number to transfer]) :: Call transfer
phone.CallAudioVideoBoth([Number to dial]) :: Audio and Video call generation 
phone.MuteUnMuteCallVideo() :: Stop / Sahring video local video stream 


Using this, you should now be able to create some cool applications using softphones in your browser!You can use the kazoopjone example project where the libwebphone.js is used

## Contact
If you have any question or remark about the library or its documentation, feel free to come talk to us on IRC #2600hz on FreeNode.
