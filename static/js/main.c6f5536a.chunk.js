(this.webpackJsonpcopyservice=this.webpackJsonpcopyservice||[]).push([[0],{24:function(e,t,a){e.exports=a(43)},29:function(e,t,a){},30:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},38:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(7),r=a.n(s),o=(a(29),a(30),a(31),a(16)),i=(a(32),a(22)),l=a(18),u=(a(33),a(19)),d=a.n(u),m=a(15),h=(a(38),function(e){return c.a.createElement("div",null,c.a.createElement("div",{className:"progressBarBG"}),c.a.createElement("div",{className:"progressBar",style:{width:(a=e.progress,500*a/100),backgroundColor:(t=e.status,"canceled"==t?"#f46c6c":"working"==t?"#36a784":"#FFAE42")}},c.a.createElement("span",{className:"infoText"},e.status)));var t,a}),b=a(6),p=a(64);function g(){var e=Object(l.a)(["\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n"]);return g=function(){return e},e}var f=Object(m.css)(g()),v=Object(b.a)((function(e){return{root:{width:42,height:26,padding:0,margin:e.spacing(1)},switchBase:{padding:1,"&$checked":{transform:"translateX(16px)",color:e.palette.common.white,"& + $track":{backgroundColor:"#36a784",opacity:1,border:"none"}},"&$focusVisible $thumb":{color:"#52d869",border:"6px solid #fff"}},thumb:{width:24,height:24},track:{borderRadius:13,border:"1px solid ".concat(e.palette.grey[400]),backgroundColor:e.palette.grey[50],opacity:1,transition:e.transitions.create(["background-color","border"])},checked:{},focusVisible:{}}}))((function(e){var t=e.classes,a=Object(i.a)(e,["classes"]);return c.a.createElement(p.a,Object.assign({focusVisibleClassName:t.focusVisible,disableRipple:!0,classes:{root:t.root,switchBase:t.switchBase,thumb:t.thumb,track:t.track,checked:t.checked}},a))})),w=function(e){return"working"===e},k=function(e){return c.a.createElement("div",{className:"job"},c.a.createElement("div",{className:"jobContents"},c.a.createElement("div",{className:"text"},"JOB #1"),c.a.createElement("div",{className:"loader",style:{paddingRight:(t=e.status,"working"===t?0:60)}},c.a.createElement(d.a,{css:f,size:150,color:"#36D7B7",loading:w(e.status)})),c.a.createElement("div",{className:"progressbar"},c.a.createElement(h,{progress:e.progress,canceled:e.canceled,status:e.status})),c.a.createElement("div",{className:"switch"},c.a.createElement(v,{checked:e.switchChecked,onChange:function(t){return e.onSwitchClick(t,e.id,e.index)}})),c.a.createElement("button",{className:"btn",onClick:function(t){return e.onClickCancel(t,e.id,e.index)}}," ","Cancel")));var t},E=function(){var e=Object(n.useState)({list:[{id:"1",progress:60,status:"working",switchStatus:!0},{id:"2",progress:100,status:"canceled",switchStatus:!0},{id:"3",progress:30,status:"paused",switchStatus:!0}]}),t=Object(o.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)("true"),i=Object(o.a)(r,2),l=(i[0],i[1]),u=function(e,t,a){console.log(t)},d=function(e,t,n){l(!1),console.log(n);var c=a.list,r=c[n].switchStatus;c[n].switchStatus=!1===r,s({list:c})};return c.a.createElement("div",{className:"layout"},c.a.createElement("div",{className:"title"},"Copy Service"),c.a.createElement("div",{className:"buttonContainer"},c.a.createElement("button",null,"Select Input File Path"),c.a.createElement("button",null,"Select Output File Path"),c.a.createElement("button",null,"Add Copy Job")),c.a.createElement("div",{className:"jobsContainer"},a.list.map((function(e,t){return c.a.createElement(k,{id:e.id,status:e.status,progress:e.progress,onClickCancel:u,onSwitchClick:d,switchChecked:e.switchStatus,index:t,className:"job"})}))))};var C=function(){return c.a.createElement(E,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.c6f5536a.chunk.js.map