(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{178:function(e,t,n){"use strict";var a,r=n(21),o=n.n(r),i=n(180),c=n(181),l=n(0),s=n.n(l),u=n(54),f=n(79),d=n(258),m=n(138),p=n.n(m),g=n(179),b=n(1),h=n(3),v=n(105),y=n(102),O=n(139),k=n(15),E=n.n(k),S=n(18),w=n(259),C=n(260),j=function(e){var t=e.icon,n=e.label,a=e.mode,r=e.onPress,o=Object(S.b)(),i=Object(l.useCallback)((function(e){return s.a.createElement(w.a,E()({},e,{style:{margin:0},color:o.colors.text,icon:t}))}),[t,o.colors.text]);return s.a.createElement(C.a,{style:{marginHorizontal:8},accessibilityRole:"button",color:o.colors.accent,icon:i,mode:a,onPress:r},s.a.createElement(y.a,null,n))},D=n(8),P=n.n(D),x=n(116),V=n.n(x),R=n(7);!function(e){e.JoinRequest="JoinRequest",e.JoinResponse="JoinResponse",e.LeaveRequest="LeaveRequest",e.Reset="Reset",e.RoomUpdate="RoomUpdate",e.SetName="SetName",e.SetVoteValue="SetVoteValue"}(a||(a={}));var I,T=function(e,t){e.readyState===WebSocket.OPEN&&e.send(JSON.stringify(t))},W=function(e){0},L=function(){var e=function(e){var t=window.location.search;return new URLSearchParams(t).get(e)||void 0}("roomId"),t=function(){if(e)return e;var t=new V.a(4).toString();return"web"===R.a.OS&&(window.location.search="roomId="+t),t}(),n=Object(l.useState)("Guest"),r=o()(n,2),i=r[0],c=r[1],s=Object(l.useState)(),f=o()(s,2),d=f[0],m=f[1],p=Object(l.useState)(),g=o()(p,2),b=g[0],h=g[1],v=function(e,t,n){var a=Object(l.useMemo)((function(){var a=new WebSocket("wss://planningpokerserver.herokuapp.com/");return a.onopen=e,a.onmessage=t,a.onerror=n,a}),[]);return Object(l.useEffect)((function(){a.onmessage=t}),[t,a]),Object(l.useEffect)((function(){a.onerror=n}),[n,a]),a}(Object(l.useCallback)((function(){!function(){var e,n;P.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=3,P.a.awrap(u.a.getItem("username"));case 3:e=r.sent,n={type:a.JoinRequest,roomId:t,payload:{name:null!=e?e:"Guest"}},T(v,n);case 6:case"end":return r.stop()}}),null,null,null,Promise)}()}),[]),Object(l.useCallback)((function(e){if("Heartbeat"!==e.data)try{var t=JSON.parse(e.data);switch(t.type){case a.JoinResponse:h(t.payload.userId);break;case a.RoomUpdate:0,E(t.payload.room),b&&"hidden"!==t.payload.room.users[b].voteValue&&m(t.payload.room.users[b].voteValue)}}catch(n){console.error("Error while parsing JSON",e.data)}else console.log("Received heartbeat from server")}),[b]),W),y=Object(l.useState)({id:t||new V.a(4).toString(),name:"",users:{},admin:void 0}),O=o()(y,2),k=O[0],E=O[1],S=Object(l.useCallback)((function(e){c(e);var t={type:a.SetName,roomId:k.id,payload:{name:e}};T(v,t)}),[k.id,v]),w=Object(l.useCallback)((function(e){m(e);var t={type:a.SetVoteValue,roomId:k.id,payload:{voteValue:e}};T(v,t)}),[k.id,v]);return{name:i,reset:Object(l.useCallback)((function(){m(void 0);var e={type:a.Reset,roomId:k.id};T(v,e)}),[k.id,v]),room:k,setName:S,userId:b,vote:w,voteValue:d}},N=function(){var e=Object(l.useState)("dark"===f.Appearance.getColorScheme()),t=o()(e,2),n=t[0],a=t[1];return Object(l.useEffect)((function(){var e=f.Appearance.addChangeListener((function(e){var t=e.colorScheme;a("dark"===t)}));return function(){return e.remove()}}),[]),n},z=function(e){var t=Object(S.b)(),n=Object(l.useState)(e(t)),a=o()(n,2),r=a[0],i=a[1];return Object(l.useEffect)((function(){i(e(t))}),[e,t]),r},F=function(e){var t=e.children,n=e.mode;return s.a.createElement(h.a,{style:[U.flexWrapRow,{justifyContent:n}]},t)},U=b.a.create({flexWrapRow:{alignItems:"center",alignSelf:"stretch",flexDirection:"row",flexWrap:"wrap",marginVertical:16}}),J=n(255),H=b.a.create({body1:{fontFamily:"Poppins",fontSize:16,fontWeight:"400",letterSpacing:.5},body2:{fontFamily:"Poppins",fontSize:14,fontWeight:"400",letterSpacing:.25},button:{fontFamily:"Poppins",fontSize:14,fontWeight:"500",letterSpacing:1.25},caption:{fontFamily:"Poppins",fontSize:12,fontWeight:"400",letterSpacing:.4},headline1:{fontFamily:"Poppins",fontSize:96,fontWeight:"300",letterSpacing:-1.5},headline2:{fontFamily:"Poppins",fontSize:60,fontWeight:"300",letterSpacing:-.5},headline3:{fontFamily:"Poppins",fontSize:48,fontWeight:"700",letterSpacing:0},headline4:{fontFamily:"Poppins",fontSize:36,fontWeight:"500",letterSpacing:.25},headline5:{fontFamily:"Poppins",fontSize:24,fontWeight:"400",letterSpacing:0},headline6:{fontFamily:"Poppins",fontSize:20,fontWeight:"500",letterSpacing:.15},overline:{fontFamily:"Poppins",fontSize:10,fontWeight:"400",letterSpacing:1.5},subtitle1:{fontFamily:"Poppins",fontSize:16,fontWeight:"400",letterSpacing:.15},subtitle2:{fontFamily:"Poppins",fontSize:14,fontWeight:"500",letterSpacing:.1}}),A=function(){var e=Object(S.b)(),t=z(q);return s.a.createElement(h.a,{style:t.avatarWatermark},s.a.createElement(J.a,{color:e.colors.accent,style:H.body2,name:"person"}))},q=function(e){return b.a.create({avatarWatermark:{position:"absolute",top:4,right:4}})},G=n(88),Z=n(46),M=function(e){var t=e.value,n=e.onChangeText,a=Object(S.b)(),r=z(_),i=Object(l.useState)(!1),c=o()(i,2),u=c[0],f=c[1],d=Object(l.useRef)(null),m=Object(l.useCallback)((function(){0===(null==t?void 0:t.length)&&n("Guest"),f((function(e){return!e}))}),[n,t]);return Object(l.useEffect)((function(){var e;u&&(null==(e=d.current)||e.focus())}),[u]),u?s.a.createElement(h.a,{style:r.updatableUserNameContainer},s.a.createElement(h.a,{style:{flex:1}},s.a.createElement(G.a,{ref:d,style:{paddingHorizontal:4,color:a.colors.text},value:t,onChangeText:n,onSubmitEditing:m})),s.a.createElement(Z.a,{onPress:m,style:r.button},s.a.createElement(y.a,{style:[H.overline,r.buttonText]},"OK"))):s.a.createElement(Z.a,{onPress:m},s.a.createElement(B,{userName:t}))},B=function(e){var t=e.userName,n=z(_);return s.a.createElement(h.a,{style:n.userCardSubtitleContainer},s.a.createElement(y.a,{style:H.body2,numberOfLines:1},t))},_=function(e){return b.a.create({button:{backgroundColor:e.colors.accent,borderRadius:e.roundness,marginLeft:8,paddingHorizontal:8,paddingVertical:4},buttonText:{fontWeight:"900"},updatableUserNameContainer:{alignItems:"center",backgroundColor:e.colors.primary,flexDirection:"row",padding:4},userCardSubtitleContainer:{alignItems:"center",backgroundColor:e.colors.primary,flexShrink:1,minHeight:32,paddingHorizontal:4,paddingVertical:8},userCardTitleContainer:{alignItems:"center",flex:1,justifyContent:"center"}})},K=function(e){var t=e.onUserNameChange,n=e.resultValue,a=e.showAvatar,r=e.username,o=e.isExtreme,i=z(Q),c=n&&"hidden"!==n?n:"?";return s.a.createElement(v.a,{style:[a&&i.avatarDecoration,i.resultCard,o&&i.isExtreme]},a&&s.a.createElement(A,null),s.a.createElement(h.a,{style:i.resultCardTitleContainer},s.a.createElement(y.a,{style:H.headline4},c)),a?s.a.createElement(M,{value:r,onChangeText:t}):s.a.createElement(B,{userName:r}))},Q=function(e){return b.a.create({avatarDecoration:{borderWidth:2,borderColor:e.colors.primary},isExtreme:{borderColor:e.colors.accent},resultCard:{borderRadius:2*e.roundness,elevation:8,height:112,margin:8,overflow:"hidden",width:96},resultCardTitleContainer:{alignItems:"center",flex:1,justifyContent:"center"}})},X=function(e){var t=e.users,n=e.userId,a=e.userName,r=e.onUserNameChange,o=t.sort((function(e,t){return Y(e.voteValue)-Y(t.voteValue)})),i=o.length?o[0].voteValue:0,c=o.length?o[o.length-1].voteValue:0;return s.a.createElement(F,{mode:"center"},o.map((function(e){var t=e.id===n,o=void 0!==e.voteValue&&"hidden"!==e.voteValue&&i!==c&&(e.voteValue===i||e.voteValue===c);return s.a.createElement(K,{key:e.id,resultValue:e.voteValue,showAvatar:t,username:n===e.id&&a?a:e.userName,isExtreme:o,onUserNameChange:r})})))},Y=function(e){switch(typeof e){case"number":return e;default:return Number.MAX_SAFE_INTEGER}},$=n(256);!function(e){e.DarkZero="#292d3d",e.DarkOne="#37324e",e.DarkTwo="#4d355b",e.DarkThree="#693462",e.DarkFive="#853161",e.DarkEight="#a02d59",e.DarkThirteen="#b62e49",e.DarkTwentyOne="#c63834",e.DarkUnknown="#cd4b13",e.DarkDisabled="#333",e.LightZero="#eaeaeb",e.LightOne="#e4deec",e.LightTwo="#e5d1e9",e.LightThree="#ebc2e0",e.LightFive="#f4b2cf",e.LightEight="#fba2b7",e.LightThirteen="#fe949a",e.LightTwentyOne="#fb8978",e.LightUnknown="#ef8354",e.LightDisabled="#ccc"}(I||(I={}));var ee=function(e,t){switch(e){case-1:return t?I.DarkDisabled:I.LightDisabled;case 0:return t?I.DarkZero:I.LightZero;case 1:return t?I.DarkOne:I.LightOne;case 2:return t?I.DarkTwo:I.LightTwo;case 3:return t?I.DarkThree:I.LightThree;case 5:return t?I.DarkFive:I.LightFive;case 8:return t?I.DarkEight:I.LightEight;case 13:return t?I.DarkThirteen:I.LightThirteen;case 21:return t?I.DarkTwentyOne:I.LightTwentyOne;default:return t?I.DarkUnknown:I.LightUnknown}},te=function(e){var t=e.value,n=e.onPress,a=e.isDark,r=e.greyedOut,o=z(ne),i={backgroundColor:ee(r?-1:t,a)},c=Object(l.useCallback)((function(){return n(t)}),[n,t]);return s.a.createElement($.a,{style:[o.valueContainer,i],onPress:c},s.a.createElement(h.a,{style:o.valueCard},s.a.createElement(y.a,{style:[H.subtitle1,{fontWeight:"900"}]},t)))},ne=function(e){return b.a.create({valueCard:{alignItems:"center",borderRadius:8,height:50,justifyContent:"center",width:50},valueContainer:{marginHorizontal:8,elevation:4,marginVertical:4}})},ae=[0,1,2,3,5,8,13,21,"\ud83e\udd14"],re=function(e){var t=e.onValuePress,n=e.selectedValue,a=e.isDark,r=z(oe);return s.a.createElement(h.a,{style:r.container},ae.map((function(e){return s.a.createElement(te,{key:e,value:e,onPress:t,isDark:a,greyedOut:void 0!==n&&n!==e})})))},oe=function(e){return b.a.create({container:{flexDirection:"row",justifyContent:"center",flexWrap:"wrap",width:"100%"}})},ie=function(e){var t=e.isDark,n=e.toggleTheme,a=z(ce),r=Object(O.useMediaQuery)({query:"(min-device-width: 600px)"}),o=r?H.headline3:H.headline4,i=L(),c=i.name,f=i.setName,d=i.voteValue,m=i.vote,b=i.room,k=i.userId,E=i.reset,S=Object(l.useCallback)((function(e){f(e),u.a.setItem("username",e)}),[f]),w=Object(l.useCallback)((function(){var e=window.location.href;p.a.setString(e)}),[]);return Object(l.useEffect)((function(){u.a.getItem("username").then((function(e){e&&S(e)}))}),[S]),s.a.createElement(v.a,{style:a.page},s.a.createElement(v.a,{style:[a.canvas,{width:r?"90%":"100%"}]},s.a.createElement(y.a,{style:o},"Planning Poker \ud83c\udfb2"),s.a.createElement(h.a,{style:a.spacedRow},s.a.createElement(j,{icon:"share",label:"Share room",mode:"outlined",onPress:w}),s.a.createElement(g.a,{value:t,onChange:n})),s.a.createElement(h.a,{style:a.divider}),s.a.createElement(h.a,{style:a.centerRow},s.a.createElement(j,{icon:"replay",label:"Reset",mode:"contained",onPress:E})),s.a.createElement(re,{onValuePress:m,isDark:t,selectedValue:d}),s.a.createElement(X,{users:Object.values(b.users),userId:k,userName:c,onUserNameChange:S})))},ce=function(e){return b.a.create({canvas:{alignItems:"center",height:"100%",paddingHorizontal:16,paddingVertical:16},centerRow:{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:8},divider:{alignSelf:"stretch",borderBottomColor:e.colors.primary,borderBottomWidth:2},page:{alignItems:"center",backgroundColor:e.colors.primary,flex:1},spacedRow:{alignItems:"center",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",maxWidth:375,paddingVertical:8,width:"100%"}})},le=n(13),se=n.n(le),ue=n(61),fe=n(101);function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function me(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(Object(n),!0).forEach((function(t){se()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var pe={light:me({},ue.a,{colors:me({},ue.a.colors,{accent:"#ef8354",primary:"#eaeaeb",surface:"#bfc0c0",text:"#000000"})}),dark:me({},fe.a,{colors:me({},fe.a.colors,{accent:"#cd4b13",primary:"#292d3d",surface:"#323a49",text:"#ffffff"})})};t.a=function(){var e=N(),t=Object(l.useState)(e),a=o()(t,2),r=a[0],m=a[1],p=Object(i.a)({Poppins:n(242)}),g=o()(p,1)[0],b=Object(l.useCallback)((function(){m(!r),u.a.setItem("isDark",JSON.stringify(!r))}),[r,m]);return Object(l.useEffect)((function(){u.a.getItem("isDark").then((function(e){e&&m(JSON.parse(e))}))}),[]),g?s.a.createElement(f.AppearanceProvider,null,s.a.createElement(d.a,{theme:r?pe.dark:pe.light},s.a.createElement(ie,{isDark:r,toggleTheme:b}))):s.a.createElement(c.a,null)}},188:function(e,t,n){e.exports=n(246)},242:function(e,t,n){e.exports=n.p+"./fonts/Poppins-Regular.ttf"}},[[188,1,2]]]);
//# sourceMappingURL=app.8bb343a6.chunk.js.map