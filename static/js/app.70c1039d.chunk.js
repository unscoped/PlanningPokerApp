(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{241:function(e,t,r){"use strict";var n=r(41),a=r.n(n),i=r(1),o=r.n(i),c=r(64),l=r(105),s=r(23),u=r(242),m=r(13),f=r(9),d=r(214),g=r(10),h=r.n(g),p=function(e){var t=e.children,r=e.mode;return o.a.createElement(f.a,{style:[b.flexWrapRow,{justifyContent:r}]},t)},b=m.a.create({flexWrapRow:{alignItems:"center",alignSelf:"stretch",flex:1,flexDirection:"row",flexWrap:"wrap"}}),v=function(){var e=Object(i.useState)("dark"===l.Appearance.getColorScheme()),t=a()(e,2),r=t[0],n=t[1];return Object(i.useEffect)((function(){var e=l.Appearance.addChangeListener((function(e){var t=e.colorScheme;n("dark"===t)}));return function(){return e.remove()}}),[]),r},y=function(e){var t=Object(s.useTheme)(),r=Object(i.useState)(e(t)),n=a()(r,2),o=n[0],c=n[1];return Object(i.useEffect)((function(){c(e(t))}),[e,t]),o},O=m.a.create({body1:{fontSize:16,fontWeight:"400",letterSpacing:.5},body2:{fontSize:14,fontWeight:"400",letterSpacing:.25},button:{fontSize:14,fontWeight:"500",letterSpacing:1.25},caption:{fontSize:12,fontWeight:"400",letterSpacing:.4},headline1:{fontSize:96,fontWeight:"300",letterSpacing:-1.5},headline2:{fontSize:60,fontWeight:"300",letterSpacing:-.5},headline3:{fontSize:48,fontWeight:"400",letterSpacing:0},headline4:{fontSize:34,fontWeight:"400",letterSpacing:.25},headline5:{fontSize:24,fontWeight:"400",letterSpacing:0},headline6:{fontSize:20,fontWeight:"500",letterSpacing:.15},overline:{fontSize:10,fontWeight:"400",letterSpacing:1.5},subtitle1:{fontSize:16,fontWeight:"400",letterSpacing:.15},subtitle2:{fontSize:14,fontWeight:"500",letterSpacing:.1}});function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){h()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k,w=function(e){var t=e.users,r=y(j),n=Object(i.useCallback)((function(e){var t=e.voteValue&&"hidden"!==e.voteValue?e.voteValue:"?";return o.a.createElement(s.Surface,{key:""+e.id,style:r.userCard},o.a.createElement(f.a,{style:r.userCardTitleContainer},o.a.createElement(s.Text,{style:O.headline3},t)),o.a.createElement(f.a,{style:r.userCardSubtitleContainer},o.a.createElement(s.Text,{style:r.subtitle,numberOfLines:1},e.userName)))}),[r.subtitle,r.userCard,r.userCardSubtitleContainer,r.userCardTitleContainer]);return o.a.createElement(p,{mode:"center"},t.map(n))},j=function(e){return m.a.create({subtitle:S(S({},O.body1),{},{color:e.dark?"black":"white"}),userCard:{borderRadius:2*e.roundness,elevation:8,height:150,margin:8,overflow:"hidden",width:100},userCardTitleContainer:{alignItems:"center",flex:1,justifyContent:"center"},userCardSubtitleContainer:{alignItems:"center",backgroundColor:e.dark?e.colors.accent:e.colors.primary,flexShrink:1,paddingHorizontal:4}})},D=r(161),C=r.n(D),T=r(26);!function(e){e[e.JoinRequest=0]="JoinRequest",e[e.JoinResponse=1]="JoinResponse",e[e.LeaveRequest=2]="LeaveRequest",e[e.SetVoteValue=3]="SetVoteValue",e[e.SetName=4]="SetName",e[e.RoomUpdate=5]="RoomUpdate"}(k||(k={}));var x,L=function(e){var t=Object(i.useRef)(new WebSocket("wss://planningpokerserver.herokuapp.com/")).current,r=function(e){var t=window.location.search;return new URLSearchParams(t).get(e)||void 0}("roomId");"web"!==T.a.OS||r||(window.location.search="roomId="+new C.a(4).toString());var n=Object(i.useState)({id:r||new C.a(4).toString(),name:"",users:{},admin:void 0}),o=a()(n,2),c=o[0],l=o[1];e=e||"Guest";var s=Object(i.useCallback)((function(e){return t.send(JSON.stringify(e))}),[t]);Object(i.useEffect)((function(){t.onopen=function(){var t={type:k.JoinRequest,roomId:c.id,payload:{name:e}};s(t)},t.onmessage=function(e){if("Heartbeat"!==e.data){var t=JSON.parse(e.data);switch(t.type){case k.RoomUpdate:0,l(t.payload.room)}}else console.log("Received heartbeat from server")},t.onerror=function(e){0}}),[c.id,s,e,t]),Object(i.useEffect)((function(){if(t.readyState===WebSocket.OPEN){var r={type:k.SetName,roomId:c.id,payload:{name:e}};s(r)}}),[c.id,s,e,t.readyState]);return{vote:function(e){var t={type:k.SetVoteValue,roomId:c.id,payload:{voteValue:e}};s(t)},room:c}};!function(e){e.DarkOne="#94cc7d",e.DarkTwo="#69cb30",e.DarkThree="#c8cc00",e.DarkFive="#b27500",e.DarkEight="#a10000",e.DarkThirteen="#a252b7",e.DarkTwentyOne="#8a8a8a",e.DarkUnknown="#000000",e.LightOne="#C6FFAD",e.LightTwo="#9EFF64",e.LightThree="#FFFF3C",e.LightFive="#E9A426",e.LightEight="#DB0000",e.LightThirteen="#D581EA",e.LightTwentyOne="#BABABA",e.LightUnknown="#FFFFFF"}(x||(x={}));var P=[0,1,2,3,5,8,13,21,"\ud83e\udd14"],W=function(e){var t=e.value,r=e.onPress,n=e.isDark,a=y(I),c=Object(i.useCallback)((function(){return r(t)}),[r,t]);return o.a.createElement(s.Card,{style:[a.valueContainer,{backgroundColor:R(t,n)}],onPress:c},o.a.createElement(f.a,{style:a.valueCard},o.a.createElement(s.Text,null,t)))},R=function(e,t){switch(e){case 1:return t?x.DarkOne:x.LightOne;case 2:return t?x.DarkTwo:x.LightTwo;case 3:return t?x.DarkThree:x.LightThree;case 5:return t?x.DarkFive:x.LightFive;case 8:return t?x.DarkEight:x.LightEight;case 13:return t?x.DarkThirteen:x.LightThirteen;case 21:return t?x.DarkTwentyOne:x.LightTwentyOne;default:return t?x.DarkUnknown:x.LightUnknown}},F=function(e){var t=e.onValuePress,r=e.isDark;return o.a.createElement(p,{mode:"center"},P.map((function(e){return o.a.createElement(W,{key:e,value:e,onPress:t,isDark:r})})))},I=function(e){return m.a.create({container:{flexDirection:"row",justifyContent:"center"},valueCard:{alignItems:"center",borderRadius:8,height:50,justifyContent:"center",width:50},valueContainer:{marginHorizontal:8,elevation:4,marginVertical:4}})},z={small:4,standard:8,medium:16,large:32,extraLarge:64},V=m.a.create({spacingSmall:{width:z.small,height:z.small},spacingStandard:{width:z.standard,height:z.standard},spacingMedium:{width:z.medium,height:z.medium},spacingLarge:{width:z.large,height:z.large},spacingExtraLarge:{width:z.extraLarge,height:z.extraLarge}}),A=function(e){var t=e.small,r=e.medium,n=e.large,a=e.extraLarge,i=V.spacingStandard;return t?i=V.spacingSmall:r?i=V.spacingMedium:n?i=V.spacingLarge:a&&(i=V.spacingExtraLarge),o.a.createElement(f.a,{style:i})},J=function(e){var t=e.roomId;return o.a.createElement(s.Card,{elevation:0,style:U.clipTextOverflow},o.a.createElement(f.a,{style:[{marginHorizontal:8},U.clipTextOverflow]},o.a.createElement(A,{medium:!0}),o.a.createElement(s.Text,{style:O.headline5},"Room"),o.a.createElement(s.Text,{style:O.subtitle2,numberOfLines:2},"ID: "+t),o.a.createElement(A,{medium:!0})))},U=m.a.create({clipTextOverflow:{flexShrink:1}}),N=function(e){var t=e.username;return o.a.createElement(s.Card,{elevation:0},o.a.createElement(f.a,{style:[{marginHorizontal:8}]},o.a.createElement(A,{medium:!0}),o.a.createElement(s.Text,{style:O.headline5},"User"),o.a.createElement(s.Text,{style:O.subtitle2},"username: "+t),o.a.createElement(A,{medium:!0})))},B=function(e){var t=e.isDark,r=e.toggleTheme,n=Object(i.useState)(""),l=a()(n,2),m=l[0],d=l[1],g=y(H),h=L(m),b=h.vote,v=h.room,E=Object(i.useCallback)((function(e){d(e),c.a.setItem("username",e)}),[d]);return Object(i.useEffect)((function(){c.a.getItem("username").then((function(e){e&&d(e)}))}),[]),o.a.createElement(s.Surface,{style:g.page},o.a.createElement(s.Surface,{style:g.canvas},o.a.createElement(p,{mode:"space-between"},o.a.createElement(s.Text,{style:O.headline3},"Planning Poker \ud83c\udfb2"),o.a.createElement(u.a,{value:t,onChange:r})),o.a.createElement(f.a,{style:g.divider}),o.a.createElement(p,{mode:"space-evenly"},o.a.createElement(f.a,{style:g.flexRow},o.a.createElement(J,{roomId:v.id}),o.a.createElement(A,null)),o.a.createElement(f.a,{style:g.flexRow},o.a.createElement(A,null),o.a.createElement(N,{username:m}))),o.a.createElement(f.a,{style:g.fillWidth},o.a.createElement(A,null),o.a.createElement(s.TextInput,{value:m,label:"Username",onChangeText:E}),o.a.createElement(A,null)),o.a.createElement(f.a,null,o.a.createElement(A,null),o.a.createElement(F,{onValuePress:b,isDark:t}),o.a.createElement(A,null)),o.a.createElement(w,{users:Object.values(v.users)})))},H=function(e){return m.a.create({canvas:{alignItems:"center",height:"100%",paddingHorizontal:16,paddingVertical:16,width:Object(d.a)("80%")},divider:{alignSelf:"stretch",borderBottomColor:e.dark?e.colors.accent:e.colors.primary,borderBottomWidth:2},fillWidth:{alignSelf:"stretch"},flexRow:{flex:1,flexDirection:"row"},page:{alignItems:"center",backgroundColor:e.colors.primary,flex:1,paddingBottom:32}})};function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(Object(r),!0).forEach((function(t){h()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var G={light:M(M({},s.DefaultTheme),{},{colors:M(M({},s.DefaultTheme.colors),{},{primary:"#00838f",accent:"#FfCDD2"})}),dark:M(M({},s.DarkTheme),{},{colors:M(M({},s.DarkTheme.colors),{},{primary:"#005662",accent:"#cb9ca1"})})};t.a=function(){var e=v(),t=Object(i.useState)(e),r=a()(t,2),n=r[0],u=r[1],m=Object(i.useCallback)((function(){u(!n),c.a.setItem("isDark",JSON.stringify(!n))}),[n,u]);return Object(i.useEffect)((function(){c.a.getItem("isDark").then((function(e){e&&u(JSON.parse(e))}))}),[]),o.a.createElement(l.AppearanceProvider,null,o.a.createElement(s.Provider,{theme:n?G.dark:G.light},o.a.createElement(B,{isDark:n,toggleTheme:m})))}},249:function(e,t,r){r(250),e.exports=r(455)},250:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/PlanningPokerApp/expo-service-worker.js",{scope:"/PlanningPokerApp/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))}},[[249,1,2]]]);
//# sourceMappingURL=app.70c1039d.chunk.js.map