(this["webpackJsonpreact-tutorial"]=this["webpackJsonpreact-tutorial"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n(5),c=n.n(s),a=n(3),i=n.n(a),u=n(6),l=n(4),j=n(0);function o(){return Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Username"}),Object(j.jsx)("th",{children:"Avatar"})]})})}function h(e){return Object(j.jsx)("tbody",{children:e.users.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.username}),Object(j.jsx)("td",{children:Object(j.jsx)("img",{src:"https://www.mc-heads.net/avatar/"+e.uuid,alt:e.username+" avatar",width:"100",height:"100"})})]},t)}))})}var b=function(e){return e.users&&e.users.length?Object(j.jsxs)("table",{children:[Object(j.jsx)(o,{}),Object(j.jsx)(h,{users:e.users})]}):null},d="memohat.xyz";var x=function(){var e=Object(r.useState)(null),t=Object(l.a)(e,2),n=t[0],s=t[1],c=Object(r.useState)(!0),a=Object(l.a)(c,2),o=a[0],h=a[1];function x(){return(x=Object(u.a)(i.a.mark((function e(){var t,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://mcapi.us/server/query?ip="+d,{mode:"cors"});case 2:return t=e.sent,console.log(t),e.next=6,t.json();case 6:if((n=e.sent).online){e.next=18;break}return e.prev=8,e.next=11,fetch("https://memohat.xyz");case 11:r=e.sent,n.idle=r.ok,e.next=18;break;case 15:e.prev=15,e.t0=e.catch(8),console.log(e.t0);case 18:s(n),h(!1);case 20:case"end":return e.stop()}}),e,null,[[8,15]])})))).apply(this,arguments)}var O=o?"Loading...":n?n.online?"Running":n.idle?"Idle":"Down":"Unable to reach API Server";return n&&n.online?Object(j.jsxs)("div",{className:"container",children:[Object(j.jsxs)("h1",{children:["Status: ",O]}),Object(j.jsxs)("h1",{children:["Users: ",n.players.now,"/",n.players.max]}),Object(j.jsx)(b,{users:n.players.list}),Object(j.jsx)("button",{onClick:function(){return h(!0)},children:"refresh"})]}):Object(j.jsxs)("div",{className:"container",children:[Object(j.jsxs)("h1",{children:["Status: ",O]}),Object(j.jsx)("button",{onClick:function(){return x.apply(this,arguments)},children:"refresh"})]})};n(13);c.a.render(Object(j.jsx)(x,{}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9d78ecb0.chunk.js.map