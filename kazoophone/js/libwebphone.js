var libwebphone=function(e){var n={};function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)o.d(t,a,function(n){return e[n]}.bind(null,a));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="dist",o(o.s=0)}([function(e,n,o){const t=o(1).default;e.exports=t},function(e,n,o){"use strict";var t,a,s,l,i,r,c,d,u,m,f,p;o.r(n),n.default=class{constructor(e){var n,o;console.info("Construction call for Kazoophone"),n="SIPml-api_2.1.4.js",(o=document.createElement("script")).src=n,o.type="text/javascript",console.info(o),document.getElementsByTagName("head").item(0).appendChild(o),console.info("SIP Stack Started")}StartAgenStack(e,n,o,_,v,g,b,y,S,C,h,k,I,E,T,B,w,P,R){this.UserName=e,this.UserNumber=n,this.SIPURI=o,this.Password=_,this.Realm=v,this.WSService=g,this.StunService=b,r=document.getElementById(S),c=document.getElementById(C),d=document.getElementById(h),u=document.getElementById(k),m=document.getElementById(I),document.getElementById(E),document.getElementById(T),document.getElementById(B),document.getElementById(w),f=document.getElementById(P),p=document.getElementById(R),function(e){"started"==e.type||"i_new_message"==e.type||e.type},a=function(e){switch(console.info("Session Status :"+e.type),e.type){case"started":try{(s=this.newSession("register",{expires:200,events_listener:{events:"*",listener:a},sip_caps:[{name:"+g.oma.sip-im",value:null},{name:"+audio",value:null},{name:"language",value:'"en,fr"'}]})).register(),console.info("Kazoo SIP Agent stack started"),console.info("Session Status :"+e.type);var n="started"==e.type;d.value="",d.value=n?"Connected "+e.description+"  ":" Connected",console.info("Connected and Logged-in"),r.disabled=!0,c.disabled=!1;break}catch(e){d.value="",d.value="Error Connection Status: "+e.description,console.info("Error Connection Status: "+e.description),r.disabled=!1,c.disabled=!1}break;case"stopping":case"stopped":case"failed_to_start":case"failed_to_stop":t=null,s=null,i=null;"failed_to_start"==e.type||e.type;break;case"i_new_call":if(i)e.newSession.hangup();else{(i=e.newSession).setConfiguration(void 0),document.getElementById("ringtone").play;var o=i.getRemoteFriendlyName()||"unknown";document.getElementById("Incoming call from "+o),console.info("Incoming call from "+o)}break;case"m_permission_requested":break;case"m_permission_accepted":case"m_permission_refused":e.type}},l=function(e){switch(e.type){case"connecting":case"connected":var n="connected"==e.type;e.session==s?(uiOnConnectionEvent(n,!n),u.value="",u.value=e.description):e.session==i&&(window.btnBFCP&&(window.btnBFCP.disabled=!1),u.value="",u.value=e.description,console.info("EventSession> Connecting / Connected: "+e.description));break;case"terminating":case"terminated":e.session==s?(uiOnConnectionEvent(!1,!1),i=null,u.value="",u.value=e.description,console.info("EventSession-> terminating / terminated: "+e.description)):e.session;break;case"m_stream_video_local_added":case"m_stream_video_local_removed":case"m_stream_video_remote_added":case"m_stream_video_remote_removed":e.session;break;case"m_stream_audio_local_added":case"m_stream_audio_local_removed":case"m_stream_audio_remote_added":case"m_stream_audio_remote_removed":break;case"i_ect_new_call":oSipSessionTransferCall=e.session;break;case"i_ao_request":if(e.session==i){var o=e.getSipResponseCode();180!=o&&183!=o||(u.value="",u.value="Remote party ringing...",console.info("Remote party ringing..."),document.getElementById("ringbacktone").play)}break;case"m_early_media":e.session==i&&(u.value="",u.value="Early media started",console.info("Early media started"));break;case"m_local_hold_ok":e.session==i&&(i.bTransfering&&(i.bTransfering=!1),u.value="",u.value="Call placed on hold",console.info("Call placed on hold"));break;case"m_local_hold_nok":e.session==i&&(i.bTransfering=!1,btnHoldResume.value="Hold",btnHoldResume.disabled=!1,u.value="",u.value="Failed to place remote party on hold",console.info("Failed to place remote party on hold"));break;case"m_local_resume_ok":e.session==i&&(i.bTransfering=!1,btnHoldResume.value="Hold",btnHoldResume.disabled=!1,u.value="",u.value="Call taken off hold",console.info("Call taken off hold"),i.bHeld=!1);break;case"m_local_resume_nok":e.session==i&&(i.bTransfering=!1,btnHoldResume.disabled=!1,u.value="",u.value="Failed to unhold call",console.info("Failed to unhold call"));break;case"m_remote_hold":e.session==i&&(u.value="",u.value="Placed on hold by remote party",console.info("Placed on hold by remote party"));break;case"m_remote_resume":e.session==i&&(u.value="",u.value="Taken off hold by remote party",console.info("Taken off hold by remote party"));break;case"m_bfcp_info":e.session==i&&(u.value="",u.value="BFCP Info: "+e.description,console.info("BFCP Info: "+e.description));break;case"o_ect_trying":e.session==i&&(u.value="",u.value="Call transfer in progress...",console.info("Call transfer in progress..."));break;case"o_ect_accepted":e.session==i&&(u.value="",u.value="Call transfer accepted",console.info("Call transfer accepted"));break;case"o_ect_completed":case"i_ect_completed":e.session==i&&(u.value="",u.value="Call transfer completed",console.info("Call transfer completed"),oSipSessionTransferCall&&(i=oSipSessionTransferCall),oSipSessionTransferCall=null);break;case"o_ect_failed":case"i_ect_failed":e.session==i&&(u.value="",u.value="Call transfer failed",console.info("Call transfer failed"));break;case"o_ect_notify":case"i_ect_notify":e.session==i&&(u.value="Call Transfer: "+e.getSipResponseCode()+" "+e.description,console.info("Call Transfer: "+e.getSipResponseCode()+" "+e.description),e.getSipResponseCode()>=300&&(i.bHeld&&i.resume(),btnTransfer.disabled=!1));break;case"i_ect_requested":if(e.session==i){if(confirm(s_message)){u.value="",u.value="Call transfer in progress...",console.info("Call transfer in progress..."),i.acceptTransfer(),console.info("Call transfer in accepted.");break}i.rejectTransfer(),console.info("Call transfer rejected")}}},0!=(t=new SIPml.Stack({realm:this.Realm,impi:this.UserNumber,impu:this.SIPURI,password:this.Password,display_name:this.UserName,websocket_proxy_url:this.WSService,enable_rtcweb_breaker:!0,events_listener:{events:"*",listener:a},enable_click2call:!0,sip_headers:[{name:"User-Agent",value:"IM-client/OMA1.0 kazoophoneagent-v0.1"},{name:"Organization",value:"2600Hz Telecom"}]})).start()&&console.info("Failed to start tKazoo SIP Agent")}CallAudioOnly(e){0==(i=t.newSession("call-audiovideo",{audio_remote:document.getElementById("audio-remote"),events_listener:{events:"*",listener:l}})).call(e)?i&&i.accept(void 0):i=null}CallAudioVideoBoth(e){i=t.newSession("call-audiovideo",{video_local:document.getElementById("video-local"),video_remote:document.getElementById("video-remote"),audio_remote:document.getElementById("audio-remote"),events_listener:{events:"*",listener:l}}),console.info("Establishing call..."),i.call(e)}MuteUnMuteCallAudio(){if(i){var e=!i.bMute;if(0!=i.mute("audio",e))return u.value="",u.value="Mute / Unmute failed",void console.info("Mute / Unmute failed");i.bMute=e,m.value=e?"Unmute":"Mute"}}MuteUnMuteCallVideo(){if(i){var e=!i.bMute;if(0!=i.mute("video",e))return u.value="",u.value="Stop / Resume failed video sharing failed",void console.info("Stop / Resume failed video sharing failed");f.value=e?"Resume Video Sharing":"Stop Video Sharing"}}HoldResumCall(){}CallTransfer(e){if(i){var n=e;if(!tsk_string_is_null_or_empty(n)){if(0!=i.transfer(n))return void console.info("Call transfer failed");console.info("Transfering the call to..."+e)}}}sipSendDTMF(e){if(i&&e){if(0==i.dtmf(e)){dtmfTone.play();var n=p.value;p.value=n+e,console.info("DTMF Character Sent: "+e)}}else{n=p.value;p.value=n+e,dtmfTone.play(),console.info("Dial key button pressed: "+e)}}HangUpCall(){i?(console.info("Hanging Up the ongoing call"),i.hangup({events_listener:{events:"*",listener:l}}),u.value="Call Hanged-up successfully"):u.value="No call session  found to terminate"}Disconnect(){t&&(t.stop(),d.value="Logged-out, disconnected Agent and close all sessions",console.info("Logged-out, disconnected Agent and close all sessions"),r.disabled=!1,c.disabled=!0)}}}]);