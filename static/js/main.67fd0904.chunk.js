(this.webpackJsonparisto=this.webpackJsonparisto||[]).push([[0],{42:function(e,t,n){},44:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(12),c=n.n(i),s=(n(42),n(20)),o=n.n(s),l=n(15),u=n(25),d=(n(44),n(26)),p=n(21),g=n(69),h=n(71),b=n(75),j=n(77),f=n(72),x=n(73),m=n(74),v=n(76),O=n(3);function y(e){var t=e.value,n=Object(d.a)({value:t,options:{width:2,height:100}}).inputRef;return Object(O.jsxs)("li",{style:{},children:[Object(O.jsx)("div",{style:{textAlign:"center",fontWeight:"bold"},children:"Aristo"}),Object(O.jsx)("svg",{ref:n})]})}function k(){return Math.floor((e=1,t=99999999999999,Math.floor(Math.random()*(t-e+1)+e)));var e,t}var w=!1,S="https://www.googleapis.com/auth/drive.file",I="843901847350-30igg13jkqtha7fnb3eh7seatf09n93t.apps.googleusercontent.com";function L(e,t){return A.apply(this,arguments)}function A(){return(A=Object(u.a)(o.a.mark((function e(t,n){var a,r,i,c,s,l,u,d,p;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="aristo.txt",n("Fetching database..."),e.next=4,gapi.client.drive.files.list({pageSize:100,fields:"files(id, name, trashed)",q:"trashed=false"});case 4:if(r=e.sent,!((i=r.result.files)&&i.length>0)){e.next=16;break}s=0;case 8:if(!(s<i.length)){e.next=16;break}if((l=i[s]).name!=a){e.next=13;break}return c=l.id,e.abrupt("break",16);case 13:s++,e.next=8;break;case 16:if(void 0!=c){e.next=29;break}return e.next=19,gapi.client.drive.files.create({resource:{name:a,mimeType:"text/plain",parents:["root"]},fields:"id"});case 19:r=e.sent,e.t0=r.status,e.next=200===e.t0?23:27;break;case 23:return l=r.result,c=l.id,console.log("Created file: ",l.id),e.abrupt("break",29);case 27:return console.log("Error creating the file, "+r),e.abrupt("break",29);case 29:if(void 0!=c){e.next=31;break}return e.abrupt("return");case 31:return e.next=33,gapi.client.drive.files.get({fileId:c,alt:"media",fields:"id"});case 33:r=e.sent,u="",e.t1=r.status,e.next=200===e.t1?38:41;break;case 38:return l=r.result,u=r.body,e.abrupt("break",43);case 41:return n("Error creating file, "+r),e.abrupt("break",43);case 43:return(d=new Set(u.split("\n").map((function(e){return parseInt(e)})).concat(t))).delete(NaN),d.delete(0),p=Array.from(d.keys()).map((function(e){return e.toString().padStart(14,"0")})).join("\n"),n("Updating database..."),e.next=50,gapi.client.request({path:"https://www.googleapis.com/upload/drive/v3/files/"+c,method:"PATCH",headers:{"Content-Type":"text/plain","Content-Length":u.length},params:{uploadType:"media"},body:p});case 50:r=e.sent,n("");case 52:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=Object(g.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var T=function(){var e=Object(a.useState)(18),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),c=Object(l.a)(i,2),s=c[0],d=c[1],g=Object(a.useState)(!1),A=Object(l.a)(g,2),T=A[0],P=A[1],F=Object(a.useState)(!1),G=Object(l.a)(F,2),N=(G[0],G[1]),B=Object(a.useState)(""),E=Object(l.a)(B,2),M=E[0],q=E[1],J=C();function R(){d(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Array.from({length:e},(function(e,n){return n+t}))}(n).map((function(){return k()})))}return Object(a.useEffect)((function(){gapi.load("client",(function(){gapi.client.load("drive","v3",(function(){}))})),gapi.load("client:auth2",(function(){!function(e){if(!w){w=!0;try{gapi.client.init({clientId:I,scope:S}),console.log("gapi.auth2",gapi.auth2),gapi.auth2.getAuthInstance().isSignedIn.listen(e.updateLoggedInStatus),e.updateLoggedInStatus(gapi.auth2.getAuthInstance().isSignedIn.get())}catch(t){console.error("Caught error",t)}}}({updateLoggedInStatus:function(e){P(e)}})})),N(!0)}),[]),Object(O.jsxs)("div",{children:[Object(O.jsx)(j.a,{position:"static",children:Object(O.jsxs)(f.a,{children:[Object(O.jsx)(x.a,{edge:"start",className:J.menuButton,color:"inherit","aria-label":"menu",children:Object(O.jsx)(v.a,{})}),Object(O.jsx)(m.a,{variant:"h6",className:J.title,children:"Aristo"}),Object(O.jsxs)(h.a,{color:"inherit",children:[" ",!T&&Object(O.jsx)(p.GoogleLogin,{clientId:I,buttonText:"Log in with Google",style:{display:"inline-block"},scope:S,cookiePolicy:"single_host_origin"}),T&&Object(O.jsx)(p.GoogleLogout,{clientId:I,buttonText:"Logout",onLogoutSuccess:function(){}})]})]})}),T?Object(O.jsxs)("div",{style:{textAlign:"center",padding:"10px"},children:[Object(O.jsx)("div",{className:"noprint",children:T&&Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{style:{margin:"5px"},children:[Object(O.jsx)(h.a,{variant:"contained",color:"primary",onClick:R,children:"Generate barcodes"}),Object(O.jsx)(b.a,{type:"text",style:{maxWidth:"35px",margin:"0 5px",verticalAlign:"center"},inputProps:{maxLength:3},datatype:"number",value:n,onChange:function(e){return r(parseInt(e.target.value))}})]}),Object(O.jsxs)("div",{style:{margin:"5px"},children:[s.length>0&&Object(O.jsx)(h.a,{variant:"outlined",color:"primary",onClick:Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L(s,q);case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),q(""),alert("An error ocurred while trying to sync with the cloud. Printing codes that are not stored in the cloud is not recommended.");case 9:window.print();case 10:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Print"}),"\xa0"]}),Object(O.jsx)("p",{children:M})]})}),Object(O.jsx)("ul",{className:"BarcodeList",children:s.map((function(e){return Object(O.jsx)(y,{value:e.toString().padStart(14,"0")})}))})]}):Object(O.jsx)(O.Fragment,{})]})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,79)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};c.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(T,{})}),document.getElementById("root")),P()}},[[50,1,2]]]);
//# sourceMappingURL=main.67fd0904.chunk.js.map