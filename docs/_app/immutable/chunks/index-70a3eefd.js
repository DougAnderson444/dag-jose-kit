import{S as ke,i as Me,s as Se,l as L,N as V,m as R,n as E,O as A,h as d,p as c,a4 as Ae,b as G,J as w,E as Oe,F as rt,w as _e,a as K,x as we,c as X,a5 as ve,y as Ee,M as le,a6 as yt,G as lt,H as st,I as at,f as N,t as H,B as ye,a7 as it,g as me,d as pe,R as ot,a1 as oe,a2 as Z,a8 as be,q as Pe,a9 as Be,L as Ge,aa as Fe,Q as bt,o as ct,ab as It,r as Dt,u as kt,v as Mt,_ as ut,e as Ye,$ as St,a0 as Ct,ac as Lt}from"./index-ef46e954.js";import{_ as Rt}from"./preload-helper-fe81da0e.js";import{f as ee}from"./index-589677d1.js";function Pt(t,n){var e=n&&n.cache?n.cache:zt,l=n&&n.serializer?n.serializer:Ht,s=n&&n.strategy?n.strategy:Wt;return s(t,{cache:e,serializer:l})}function Nt(t){return t==null||typeof t=="number"||typeof t=="boolean"}function Vt(t,n,e,l){var s=Nt(l)?l:e(l),r=n.get(s);return typeof r>"u"&&(r=t.call(this,l),n.set(s,r)),r}function At(t,n,e){var l=Array.prototype.slice.call(arguments,3),s=e(l),r=n.get(s);return typeof r>"u"&&(r=t.apply(this,l),n.set(s,r)),r}function Ot(t,n,e,l,s){return e.bind(n,t,l,s)}function Wt(t,n){var e=t.length===1?Vt:At;return Ot(t,this,e,n.cache.create(),n.serializer)}function Ht(){return JSON.stringify(arguments)}function Ne(){this.cache=Object.create(null)}Ne.prototype.has=function(t){return t in this.cache};Ne.prototype.get=function(t){return this.cache[t]};Ne.prototype.set=function(t,n){this.cache[t]=n};var zt={create:function(){return new Ne}},Ut=Pt,ge={MAIN:"svelte-draggable",DRAGGING:"svelte-draggable-dragging",DRAGGED:"svelte-draggable-dragged"},Tt=(t,n={})=>{var e,l;let{bounds:s,axis:r="both",gpuAcceleration:a=!0,applyUserSelectHack:i=!0,disabled:o=!1,ignoreMultitouch:g=!1,grid:f,position:h,cancel:m,handle:v,defaultClass:D=ge.MAIN,defaultClassDragging:_=ge.DRAGGING,defaultClassDragged:p=ge.DRAGGED,defaultPosition:k={x:0,y:0},onDragStart:y,onDrag:u,onDragEnd:I}=n;const P=new Promise(requestAnimationFrame);let z=!1,[O,F]=[0,0],[$,S]=[0,0],[te,W]=[0,0],{x:C,y:T}={x:(e=h==null?void 0:h.x)!=null?e:0,y:(l=h==null?void 0:h.y)!=null?l:0};We(C,T,t,a);let q,M,U="",B,J,ce,Ie,mt=!!h;const Ve=()=>({offsetX:O,offsetY:F,domRect:t.getBoundingClientRect()});function pt(b){const Y=Ve();b.dispatchEvent(new CustomEvent("svelte-drag:start",{detail:Y})),y==null||y(Y)}function _t(b){const Y=Ve();b.dispatchEvent(new CustomEvent("svelte-drag:end",{detail:Y})),I==null||I(Y)}function wt(b,Y,ne){const j=Ve();b.dispatchEvent(new CustomEvent("svelte-drag",{detail:j})),u==null||u(j)}const ue=addEventListener;ue("touchstart",Ce,!1),ue("touchend",Le,!1),ue("touchmove",Re,!1),ue("mousedown",Ce,!1),ue("mouseup",Le,!1),ue("mousemove",Re,!1),t.style.touchAction="none";const ze=()=>{let b=t.offsetWidth/J.width;return isNaN(b)&&(b=1),b};function Ce(b){if(o||g&&b.type==="touchstart"&&b.touches.length>1)return;if(t.classList.add(D),ce=Gt(v,t),Ie=Ft(m,t),q=["both","x"].includes(r),M=["both","y"].includes(r),typeof s<"u"&&(B=Yt(s,t)),J=t.getBoundingClientRect(),Xe(v)&&Xe(m)&&v===m)throw new Error("`handle` selector can't be same as `cancel` selector");if(Ie!=null&&Ie.contains(ce))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");if(ce.contains(b.target)&&!(Ie!=null&&Ie.contains(b.target))&&(z=!0),!z)return;i&&(U=document.body.style.userSelect,document.body.style.userSelect="none"),pt(t);const{clientX:Y,clientY:ne}=je(b)?b.touches[0]:b,j=ze();q&&($=Y-C/j),M&&(S=ne-T/j),B&&(te=Y-J.left,W=ne-J.top)}function Le(){!z||(t.classList.remove(_),t.classList.add(p),i&&(document.body.style.userSelect=U),_t(t),q&&($=O),q&&(S=F),z=!1)}function Re(b){if(!z)return;t.classList.add(_),b.preventDefault(),J=t.getBoundingClientRect();const{clientX:Y,clientY:ne}=je(b)?b.touches[0]:b;let[j,re]=[Y,ne];const ae=ze();if(B){const x={left:B.left+te,top:B.top+W,right:B.right+te-J.width,bottom:B.bottom+W-J.height};j=Ke(j,x.left,x.right),re=Ke(re,x.top,x.bottom)}if(Array.isArray(f)){let[x,fe]=f;if(isNaN(+x)||x<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+fe)||fe<0)throw new Error("2nd argument of `grid` must be a valid positive number");let[de,he]=[j-$,re-S];[de,he]=Bt([Math.floor(x/ae),Math.floor(fe/ae)],de,he),[j,re]=[$+de,S+he]}q&&(O=(j-$)*ae),M&&(F=(re-S)*ae),[C,T]=[O,F],wt(t),P.then(()=>We(O,F,t,a))}return{destroy:()=>{const b=removeEventListener;b("touchstart",Ce,!1),b("touchend",Le,!1),b("touchmove",Re,!1),b("mousedown",Ce,!1),b("mouseup",Le,!1),b("mousemove",Re,!1)},update:b=>{var Y,ne,j,re,ae,x,fe,de,he,Ue,Te;r=b.axis||"both",o=(Y=b.disabled)!=null?Y:!1,g=(ne=b.ignoreMultitouch)!=null?ne:!1,v=b.handle,s=b.bounds,m=b.cancel,i=(j=b.applyUserSelectHack)!=null?j:!0,f=b.grid,a=(re=b.gpuAcceleration)!=null?re:!0;const Et=t.classList.contains(p);t.classList.remove(D,p),D=(ae=b.defaultClass)!=null?ae:ge.MAIN,_=(x=b.defaultClassDragging)!=null?x:ge.DRAGGING,p=(fe=b.defaultClassDragged)!=null?fe:ge.DRAGGED,t.classList.add(D),Et&&t.classList.add(p),mt&&(C=O=(he=(de=b.position)==null?void 0:de.x)!=null?he:O,T=F=(Te=(Ue=b.position)==null?void 0:Ue.y)!=null?Te:F,P.then(()=>We(O,F,t,a)))}}};function je(t){return Boolean(t.touches&&t.touches.length)}function Ke(t,n,e){return Math.min(Math.max(t,n),e)}function Xe(t){return typeof t=="string"}var Bt=Ut(([t,n],e,l)=>{const s=Math.round(e/t)*t,r=Math.round(l/n)*n;return[s,r]});function Gt(t,n){if(!t)return n;const e=n.querySelector(t);if(e===null)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return e}function Ft(t,n){if(!t)return;const e=n.querySelector(t);if(e===null)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return e}function Yt(t,n){if(typeof t=="object"){const[s,r]=[window.innerWidth,window.innerHeight],{top:a=0,left:i=0,right:o=0,bottom:g=0}=t,f=s-o,h=r-g;return{top:a,right:f,bottom:h,left:i}}if(t==="parent")return n.parentNode.getBoundingClientRect();const e=document.querySelector(t);if(e===null)throw new Error("The selector provided for bound doesn't exists in the document.");return e.getBoundingClientRect()}function We(t,n,e,l){e.style.transform=l?`translate3d(${+t}px, ${+n}px, 0)`:`translate(${+t}px, ${+n}px)`}function jt(t){let n,e,l,s,r,a,i,o,g,f,h,m,v;return{c(){n=L("div"),e=V("svg"),l=V("defs"),s=V("defs"),r=V("path"),a=V("path"),i=V("path"),o=V("radialGradient"),g=V("stop"),f=V("stop"),h=V("use"),m=V("use"),v=V("use"),this.h()},l(D){n=R(D,"DIV",{});var _=E(n);e=A(_,"svg",{xmlns:!0,"xmlns:xlink":!0,viewBox:!0,width:!0,height:!0,class:!0});var p=E(e);l=A(p,"defs",{}),E(l).forEach(d),s=A(p,"defs",{});var k=E(s);r=A(k,"path",{id:!0,d:!0}),E(r).forEach(d),a=A(k,"path",{id:!0,d:!0}),E(a).forEach(d),i=A(k,"path",{id:!0,d:!0}),E(i).forEach(d),o=A(k,"radialGradient",{id:!0,cx:!0,cy:!0,r:!0,gradientUnits:!0});var y=E(o);g=A(y,"stop",{offset:!0,"stop-color":!0}),E(g).forEach(d),f=A(y,"stop",{offset:!0,"stop-color":!0}),E(f).forEach(d),y.forEach(d),k.forEach(d),h=A(p,"use",{fill:!0,"xlink:href":!0}),E(h).forEach(d),m=A(p,"use",{fill:!0,"xlink:href":!0}),E(m).forEach(d),v=A(p,"use",{fill:!0,"xlink:href":!0}),E(v).forEach(d),p.forEach(d),_.forEach(d),this.h()},h(){c(r,"id","a"),c(r,"d","M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z"),c(a,"id","c"),c(a,"d","M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z"),c(i,"id","d"),c(i,"d","M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z"),c(g,"offset","0%"),c(g,"stop-color","#69ed66"),c(f,"offset","100%"),c(f,"stop-color","#279c19"),c(o,"id","b"),c(o,"cx","992.3"),c(o,"cy","174.2"),c(o,"r","1312.8"),c(o,"gradientUnits","userSpaceOnUse"),c(h,"fill","url(#b)"),Ae(h,"xlink:href","#a"),c(m,"fill","#fff"),Ae(m,"xlink:href","#c"),c(v,"fill","#fff"),Ae(v,"xlink:href","#d"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),c(e,"viewBox","0 0 1440 1440"),c(e,"width","100"),c(e,"height","100"),c(e,"class","svelte-189qcdl")},m(D,_){G(D,n,_),w(n,e),w(e,l),w(e,s),w(s,r),w(s,a),w(s,i),w(s,o),w(o,g),w(o,f),w(e,h),w(e,m),w(e,v)},p:Oe,i:Oe,o:Oe,d(D){D&&d(n)}}}class ft extends ke{constructor(n){super(),Me(this,n,null,jt,Se,{})}}const Kt=t=>({openNav:t&1,hideNav:t&1}),qe=t=>({openNav:t[5],hideNav:t[6]});function Xt(t){let n,e,l,s,r,a,i,o,g,f,h,m,v,D,_,p;e=new ft({});const k=t[4].default,y=rt(k,t,t[3],qe);return{c(){n=L("div"),_e(e.$$.fragment),l=K(),s=L("div"),r=L("div"),a=K(),i=L("div"),o=K(),g=L("div"),f=K(),h=L("div"),m=K(),v=L("div"),y&&y.c(),this.h()},l(u){n=R(u,"DIV",{class:!0});var I=E(n);we(e.$$.fragment,I),l=X(I),s=R(I,"DIV",{class:!0});var P=E(s);r=R(P,"DIV",{class:!0}),E(r).forEach(d),a=X(P),i=R(P,"DIV",{class:!0}),E(i).forEach(d),o=X(P),g=R(P,"DIV",{class:!0}),E(g).forEach(d),P.forEach(d),I.forEach(d),f=X(u),h=R(u,"DIV",{class:!0}),E(h).forEach(d),m=X(u),v=R(u,"DIV",{class:!0});var z=E(v);y&&y.l(z),z.forEach(d),this.h()},h(){c(r,"class","bar1 svelte-c02puv"),c(i,"class","bar2 svelte-c02puv"),c(g,"class","bar3 svelte-c02puv"),c(s,"class","menu-icon svelte-c02puv"),c(n,"class","container svelte-c02puv"),ve(n,"change",t[0]),c(h,"class","svelte-c02puv"),ve(h,"mask",t[0]),c(v,"class","sidenav svelte-c02puv"),ve(v,"open",t[0])},m(u,I){G(u,n,I),Ee(e,n,null),w(n,l),w(n,s),w(s,r),w(s,a),w(s,i),w(s,o),w(s,g),G(u,f,I),G(u,h,I),G(u,m,I),G(u,v,I),y&&y.m(v,null),D=!0,_||(p=[le(n,"click",t[1]),yt(Tt.call(null,n)),le(h,"click",t[2])],_=!0)},p(u,[I]){I&1&&ve(n,"change",u[0]),I&1&&ve(h,"mask",u[0]),y&&y.p&&(!D||I&9)&&lt(y,k,u,u[3],D?at(k,u[3],I,Kt):st(u[3]),qe),I&1&&ve(v,"open",u[0])},i(u){D||(N(e.$$.fragment,u),N(y,u),D=!0)},o(u){H(e.$$.fragment,u),H(y,u),D=!1},d(u){u&&d(n),ye(e),u&&d(f),u&&d(h),u&&d(m),u&&d(v),y&&y.d(u),_=!1,it(p)}}}function qt(t,n,e){let{$$slots:l={},$$scope:s}=n,r=!1;function a(){e(0,r=!r)}function i(f){e(0,r=!1)}const o=()=>e(0,r=!0),g=()=>e(0,r=!1);return t.$$set=f=>{"$$scope"in f&&e(3,s=f.$$scope)},[r,a,i,s,l,o,g]}class xt extends ke{constructor(n){super(),Me(this,n,qt,Xt,Se,{})}}var Q;(function(t){t.Call="call",t.Reply="reply",t.Syn="syn",t.SynAck="synAck",t.Ack="ack"})(Q||(Q={}));var ie;(function(t){t.Fulfilled="fulfilled",t.Rejected="rejected"})(ie||(ie={}));var De;(function(t){t.ConnectionDestroyed="ConnectionDestroyed",t.ConnectionTimeout="ConnectionTimeout",t.NoIframeSrc="NoIframeSrc"})(De||(De={}));var He;(function(t){t.DataCloneError="DataCloneError"})(He||(He={}));var se;(function(t){t.Message="message"})(se||(se={}));const $t=(t,n)=>{const e=[];let l=!1;return{destroy(s){l||(l=!0,n(`${t}: Destroying connection`),e.forEach(r=>{r(s)}))},onDestroy(s){l?s():e.push(s)}}},Jt=t=>(...n)=>{t&&console.log("[Penpal]",...n)},Qt={"http:":"80","https:":"443"},Zt=/^(https?:)?\/\/([^/:]+)?(:(\d+))?/,en=["file:","data:"],tn=t=>{if(t&&en.find(i=>t.startsWith(i)))return"null";const n=document.location,e=Zt.exec(t);let l,s,r;e?(l=e[1]?e[1]:n.protocol,s=e[2],r=e[4]):(l=n.protocol,s=n.hostname,r=n.port);const a=r&&r!==Qt[l]?`:${r}`:"";return`${l}//${s}${a}`},xe=({name:t,message:n,stack:e})=>({name:t,message:n,stack:e}),nn=t=>{const n=new Error;return Object.keys(t).forEach(e=>n[e]=t[e]),n},rn=(t,n,e)=>{const{localName:l,local:s,remote:r,originForSending:a,originForReceiving:i}=t;let o=!1;const g=f=>{if(f.source!==r||f.data.penpal!==Q.Call)return;if(i!=="*"&&f.origin!==i){e(`${l} received message from origin ${f.origin} which did not match expected origin ${i}`);return}const h=f.data,{methodName:m,args:v,id:D}=h;e(`${l}: Received ${m}() call`);const _=p=>k=>{if(e(`${l}: Sending ${m}() reply`),o){e(`${l}: Unable to send ${m}() reply due to destroyed connection`);return}const y={penpal:Q.Reply,id:D,resolution:p,returnValue:k};p===ie.Rejected&&k instanceof Error&&(y.returnValue=xe(k),y.returnValueIsError=!0);try{r.postMessage(y,a)}catch(u){if(u.name===He.DataCloneError){const I={penpal:Q.Reply,id:D,resolution:ie.Rejected,returnValue:xe(u),returnValueIsError:!0};r.postMessage(I,a)}throw u}};new Promise(p=>p(n[m].apply(n,v))).then(_(ie.Fulfilled),_(ie.Rejected))};return s.addEventListener(se.Message,g),()=>{o=!0,s.removeEventListener(se.Message,g)}};let ln=0;const sn=()=>++ln,dt=".",ht=t=>t?t.split(dt):[],an=t=>t.join(dt),on=(t,n)=>{const e=ht(n||"");return e.push(t),an(e)},cn=(t,n,e)=>{const l=ht(n);return l.reduce((s,r,a)=>(typeof s[r]>"u"&&(s[r]={}),a===l.length-1&&(s[r]=e),s[r]),t),t},vt=(t,n)=>{const e={};return Object.keys(t).forEach(l=>{const s=t[l],r=on(l,n);typeof s=="object"&&Object.assign(e,vt(s,r)),typeof s=="function"&&(e[r]=s)}),e},un=t=>{const n={};for(const e in t)cn(n,e,t[e]);return n},fn=(t,n,e,l,s)=>{const{localName:r,local:a,remote:i,originForSending:o,originForReceiving:g}=n;let f=!1;s(`${r}: Connecting call sender`);const h=v=>(...D)=>{s(`${r}: Sending ${v}() call`);let _;try{i.closed&&(_=!0)}catch{_=!0}if(_&&l(),f){const p=new Error(`Unable to send ${v}() call due to destroyed connection`);throw p.code=De.ConnectionDestroyed,p}return new Promise((p,k)=>{const y=sn(),u=P=>{if(P.source!==i||P.data.penpal!==Q.Reply||P.data.id!==y)return;if(g!=="*"&&P.origin!==g){s(`${r} received message from origin ${P.origin} which did not match expected origin ${g}`);return}const z=P.data;s(`${r}: Received ${v}() reply`),a.removeEventListener(se.Message,u);let O=z.returnValue;z.returnValueIsError&&(O=nn(O)),(z.resolution===ie.Fulfilled?p:k)(O)};a.addEventListener(se.Message,u);const I={penpal:Q.Call,id:y,methodName:v,args:D};i.postMessage(I,o)})},m=e.reduce((v,D)=>(v[D]=h(D),v),{});return Object.assign(t,un(m)),()=>{f=!0}},dn=(t,n,e,l,s)=>{const{destroy:r,onDestroy:a}=l;let i,o;const g={};return f=>{if(n!=="*"&&f.origin!==n){s(`Parent: Handshake - Received ACK message from origin ${f.origin} which did not match expected origin ${n}`);return}s("Parent: Handshake - Received ACK");const h={localName:"Parent",local:window,remote:f.source,originForSending:e,originForReceiving:n};i&&i(),i=rn(h,t,s),a(i),o&&o.forEach(v=>{delete g[v]}),o=f.data.methodNames;const m=fn(g,h,o,r,s);return a(m),g}},hn=(t,n,e,l)=>s=>{if(!s.source)return;if(e!=="*"&&s.origin!==e){t(`Parent: Handshake - Received SYN message from origin ${s.origin} which did not match expected origin ${e}`);return}t("Parent: Handshake - Received SYN, responding with SYN-ACK");const r={penpal:Q.SynAck,methodNames:Object.keys(n)};s.source.postMessage(r,l)},vn=6e4,gn=(t,n)=>{const{destroy:e,onDestroy:l}=n,s=setInterval(()=>{t.isConnected||(clearInterval(s),e())},vn);l(()=>{clearInterval(s)})},mn=(t,n)=>{let e;return t!==void 0&&(e=window.setTimeout(()=>{const l=new Error(`Connection timed out after ${t}ms`);l.code=De.ConnectionTimeout,n(l)},t)),()=>{clearTimeout(e)}},pn=t=>{if(!t.src&&!t.srcdoc){const n=new Error("Iframe must have src or srcdoc property defined.");throw n.code=De.NoIframeSrc,n}},_n=t=>{let{iframe:n,methods:e={},childOrigin:l,timeout:s,debug:r=!1}=t;const a=Jt(r),i=$t("Parent",a),{onDestroy:o,destroy:g}=i;l||(pn(n),l=tn(n.src));const f=l==="null"?"*":l,h=vt(e),m=hn(a,h,l,f),v=dn(h,l,f,i,a);return{promise:new Promise((_,p)=>{const k=mn(s,g),y=u=>{if(!(u.source!==n.contentWindow||!u.data)){if(u.data.penpal===Q.Syn){m(u);return}if(u.data.penpal===Q.Ack){const I=v(u);I&&(k(),_(I));return}}};window.addEventListener(se.Message,y),a("Parent: Awaiting handshake"),gn(n,i),o(u=>{window.removeEventListener(se.Message,y),u&&p(u)})}),destroy(){g()}}};function $e(t){let n,e,l,s,r,a;return{c(){n=L("div"),e=V("svg"),l=V("rect"),s=V("path"),this.h()},l(i){n=R(i,"DIV",{});var o=E(n);e=A(o,"svg",{"v-if":!0,xmlns:!0,"enable-background":!0,viewBox:!0,fill:!0,class:!0});var g=E(e);l=A(g,"rect",{fill:!0,height:!0,width:!0}),E(l).forEach(d),s=A(g,"path",{d:!0}),E(s).forEach(d),g.forEach(d),o.forEach(d),this.h()},h(){c(l,"fill","none"),c(l,"height","24"),c(l,"width","24"),c(s,"d","M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"),c(e,"v-if","icon === 'close'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"enable-background","new 0 0 24 24"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(i,o){G(i,n,o),w(n,e),w(e,l),w(e,s),a=!0},i(i){a||(oe(()=>{r||(r=Z(n,ee,{delay:100,duration:100},!0)),r.run(1)}),a=!0)},o(i){r||(r=Z(n,ee,{delay:100,duration:100},!1)),r.run(0),a=!1},d(i){i&&d(n),i&&r&&r.end()}}}function Je(t){let n,e,l,s,r,a;return{c(){n=L("div"),e=V("svg"),l=V("path"),s=V("path"),this.h()},l(i){n=R(i,"DIV",{});var o=E(n);e=A(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var g=E(e);l=A(g,"path",{d:!0,fill:!0}),E(l).forEach(d),s=A(g,"path",{d:!0}),E(s).forEach(d),g.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0z"),c(l,"fill","none"),c(s,"d","M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"),c(e,"v-else-if","icon === 'launch'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(i,o){G(i,n,o),w(n,e),w(e,l),w(e,s),a=!0},i(i){a||(oe(()=>{r||(r=Z(n,ee,{delay:100,duration:100},!0)),r.run(1)}),a=!0)},o(i){r||(r=Z(n,ee,{delay:100,duration:100},!1)),r.run(0),a=!1},d(i){i&&d(n),i&&r&&r.end()}}}function Qe(t){let n,e,l,s,r,a;return{c(){n=L("div"),e=V("svg"),l=V("path"),s=V("path"),this.h()},l(i){n=R(i,"DIV",{});var o=E(n);e=A(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var g=E(e);l=A(g,"path",{d:!0,fill:!0}),E(l).forEach(d),s=A(g,"path",{d:!0}),E(s).forEach(d),g.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0z"),c(l,"fill","none"),c(s,"d","M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"),c(e,"v-else-if","icon === 'plug'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(i,o){G(i,n,o),w(n,e),w(e,l),w(e,s),a=!0},i(i){a||(oe(()=>{r||(r=Z(n,ee,{delay:100,duration:100},!0)),r.run(1)}),a=!0)},o(i){r||(r=Z(n,ee,{delay:100,duration:100},!1)),r.run(0),a=!1},d(i){i&&d(n),i&&r&&r.end()}}}function Ze(t){let n,e,l,s,r,a;return{c(){n=L("div"),e=V("svg"),l=V("path"),s=V("path"),this.h()},l(i){n=R(i,"DIV",{});var o=E(n);e=A(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var g=E(e);l=A(g,"path",{d:!0,fill:!0}),E(l).forEach(d),s=A(g,"path",{d:!0}),E(s).forEach(d),g.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0V0z"),c(l,"fill","none"),c(s,"d","M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z"),c(e,"v-else-if","icon === 'unplug'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(i,o){G(i,n,o),w(n,e),w(e,l),w(e,s),a=!0},i(i){a||(oe(()=>{r||(r=Z(n,ee,{delay:100,duration:100},!0)),r.run(1)}),a=!0)},o(i){r||(r=Z(n,ee,{delay:100,duration:100},!1)),r.run(0),a=!1},d(i){i&&d(n),i&&r&&r.end()}}}function wn(t){let n,e,l,s,r,a,i,o,g,f=t[0]==="close"&&$e(),h=t[0]==="launch"&&Je(),m=t[0]==="plug"&&Qe(),v=t[0]==="unplug"&&Ze();const D=t[3].default,_=rt(D,t,t[2],null);return{c(){n=L("button"),e=L("div"),f&&f.c(),l=K(),h&&h.c(),s=K(),m&&m.c(),r=K(),v&&v.c(),a=K(),_&&_.c(),this.h()},l(p){n=R(p,"BUTTON",{class:!0});var k=E(n);e=R(k,"DIV",{class:!0});var y=E(e);f&&f.l(y),l=X(y),h&&h.l(y),s=X(y),m&&m.l(y),r=X(y),v&&v.l(y),y.forEach(d),a=X(k),_&&_.l(k),k.forEach(d),this.h()},h(){c(e,"class","img-container svelte-1c05l0n"),c(n,"class","svelte-1c05l0n")},m(p,k){G(p,n,k),w(n,e),f&&f.m(e,null),w(e,l),h&&h.m(e,null),w(e,s),m&&m.m(e,null),w(e,r),v&&v.m(e,null),w(n,a),_&&_.m(n,null),i=!0,o||(g=le(n,"click",t[4]),o=!0)},p(p,[k]){p[0]==="close"?f?k&1&&N(f,1):(f=$e(),f.c(),N(f,1),f.m(e,l)):f&&(me(),H(f,1,1,()=>{f=null}),pe()),p[0]==="launch"?h?k&1&&N(h,1):(h=Je(),h.c(),N(h,1),h.m(e,s)):h&&(me(),H(h,1,1,()=>{h=null}),pe()),p[0]==="plug"?m?k&1&&N(m,1):(m=Qe(),m.c(),N(m,1),m.m(e,r)):m&&(me(),H(m,1,1,()=>{m=null}),pe()),p[0]==="unplug"?v?k&1&&N(v,1):(v=Ze(),v.c(),N(v,1),v.m(e,null)):v&&(me(),H(v,1,1,()=>{v=null}),pe()),_&&_.p&&(!i||k&4)&&lt(_,D,p,p[2],i?at(D,p[2],k,null):st(p[2]),null)},i(p){i||(N(f),N(h),N(m),N(v),N(_,p),i=!0)},o(p){H(f),H(h),H(m),H(v),H(_,p),i=!1},d(p){p&&d(n),f&&f.d(),h&&h.d(),m&&m.d(),v&&v.d(),_&&_.d(p),o=!1,g()}}}function En(t,n,e){let{$$slots:l={},$$scope:s}=n,{icon:r}=n;const a=ot(),i=()=>a("click","detail value");return t.$$set=o=>{"icon"in o&&e(0,r=o.icon),"$$scope"in o&&e(2,s=o.$$scope)},[r,a,s,l,i]}class gt extends ke{constructor(n){super(),Me(this,n,En,wn,Se,{icon:0})}}const{window:yn}=It;function et(t){let n,e,l,s,r;return e=new gt({props:{icon:t[12]}}),e.$on("click",t[15]),{c(){n=L("div"),_e(e.$$.fragment),this.h()},l(a){n=R(a,"DIV",{class:!0});var i=E(n);we(e.$$.fragment,i),i.forEach(d),this.h()},h(){var a;c(n,"class",l=be((a=t[0])!=null&&a.keepPopup?"action":"action dim")+" svelte-hxe3ne")},m(a,i){G(a,n,i),Ee(e,n,null),r=!0},p(a,i){var g;const o={};i&4096&&(o.icon=a[12]),e.$set(o),(!r||i&1&&l!==(l=be((g=a[0])!=null&&g.keepPopup?"action":"action dim")+" svelte-hxe3ne"))&&c(n,"class",l)},i(a){r||(N(e.$$.fragment,a),oe(()=>{s||(s=Z(n,ee,{delay:100,duration:100},!0)),s.run(1)}),r=!0)},o(a){H(e.$$.fragment,a),s||(s=Z(n,ee,{delay:100,duration:100},!1)),s.run(0),r=!1},d(a){a&&d(n),ye(e),a&&s&&s.end()}}}function bn(t){let n,e=t[10].loading||!t[6]?"Loading...":"Load",l,s;return{c(){n=L("span"),l=Dt(e),this.h()},l(r){n=R(r,"SPAN",{class:!0});var a=E(n);l=kt(a,e),a.forEach(d),this.h()},h(){var r;c(n,"class",s=be((r=t[0])!=null&&r.address?" connected ":" disconnected ")+" svelte-hxe3ne")},m(r,a){G(r,n,a),w(n,l)},p(r,a){var i;a&1088&&e!==(e=r[10].loading||!r[6]?"Loading...":"Load")&&Mt(l,e),a&1&&s!==(s=be((i=r[0])!=null&&i.address?" connected ":" disconnected ")+" svelte-hxe3ne")&&c(n,"class",s)},d(r){r&&d(n)}}}function In(t){var te;let n,e,l,s,r,a,i,o,g,f,h,m,v,D,_,p,k,y,u,I,P,z,O,F,$;r=new ft({});let S=(((te=t[0])==null?void 0:te.address)||t[1])&&et(t);return _=new gt({props:{icon:t[11],$$slots:{default:[bn]},$$scope:{ctx:t}}}),_.$on("click",t[23]),{c(){n=L("div"),e=L("div"),l=L("a"),s=L("div"),_e(r.$$.fragment),a=K(),i=L("div"),o=L("input"),g=K(),f=L("span"),h=K(),m=L("div"),S&&S.c(),v=K(),D=L("div"),_e(_.$$.fragment),y=K(),u=L("div"),I=L("iframe"),this.h()},l(W){n=R(W,"DIV",{class:!0});var C=E(n);e=R(C,"DIV",{class:!0,style:!0});var T=E(e);l=R(T,"A",{href:!0,target:!0,rel:!0});var q=E(l);s=R(q,"DIV",{class:!0});var M=E(s);we(r.$$.fragment,M),M.forEach(d),q.forEach(d),a=X(T),i=R(T,"DIV",{class:!0});var U=E(i);o=R(U,"INPUT",{class:!0,placeholder:!0}),g=X(U),f=R(U,"SPAN",{class:!0}),E(f).forEach(d),U.forEach(d),h=X(T),m=R(T,"DIV",{class:!0});var B=E(m);S&&S.l(B),v=X(B),D=R(B,"DIV",{class:!0});var J=E(D);we(_.$$.fragment,J),J.forEach(d),B.forEach(d),T.forEach(d),y=X(C),u=R(C,"DIV",{class:!0,style:!0});var ce=E(u);I=R(ce,"IFRAME",{title:!0,src:!0,allow:!0,class:!0}),E(I).forEach(d),ce.forEach(d),C.forEach(d),this.h()},h(){var W,C;c(s,"class","actions logo svelte-hxe3ne"),c(l,"href","https://PeerPiper.io"),c(l,"target","_blank"),c(l,"rel","noreferrer"),c(o,"class","url svelte-hxe3ne"),c(o,"placeholder",Dn),c(f,"class","green-line svelte-hxe3ne"),c(i,"class","url-input-container svelte-hxe3ne"),c(D,"class",p=be((W=t[10])!=null&&W.loading?"action dim":(C=t[0])!=null&&C.address?" connected ":" disconnected ")+" svelte-hxe3ne"),c(m,"class","actions svelte-hxe3ne"),c(e,"class","top svelte-hxe3ne"),Pe(e,"--topOffsetHeight",t[2]),oe(()=>t[24].call(e)),c(I,"title","Web Wallet"),Be(I.src,P=t[6])||c(I,"src",P),c(I,"allow","clipboard-read 'self' 'src'; clipboard-write 'self' 'src';"),c(I,"class","svelte-hxe3ne"),c(u,"class","iframe svelte-hxe3ne"),Pe(u,"height","calc("+t[4]+"px + 18px)"),oe(()=>t[26].call(u)),c(n,"class","connector-container svelte-hxe3ne")},m(W,C){G(W,n,C),w(n,e),w(e,l),w(l,s),Ee(r,s,null),w(e,a),w(e,i),w(i,o),Ge(o,t[1]),w(i,g),w(i,f),w(e,h),w(e,m),S&&S.m(m,null),w(m,v),w(m,D),Ee(_,D,null),k=Fe(e,t[24].bind(e)),w(n,y),w(n,u),w(u,I),t[25](I),z=Fe(u,t[26].bind(u)),O=!0,F||($=[le(yn,"keydown",t[16]),le(o,"focus",t[20]),le(o,"blur",t[21]),le(o,"input",t[22]),le(o,"input",function(){bt(t[8])&&t[8].apply(this,arguments)})],F=!0)},p(W,[C]){var q,M,U;t=W,C&2&&o.value!==t[1]&&Ge(o,t[1]),((q=t[0])==null?void 0:q.address)||t[1]?S?(S.p(t,C),C&3&&N(S,1)):(S=et(t),S.c(),N(S,1),S.m(m,v)):S&&(me(),H(S,1,1,()=>{S=null}),pe());const T={};C&2048&&(T.icon=t[11]),C&1073742913&&(T.$$scope={dirty:C,ctx:t}),_.$set(T),(!O||C&1025&&p!==(p=be((M=t[10])!=null&&M.loading?"action dim":(U=t[0])!=null&&U.address?" connected ":" disconnected ")+" svelte-hxe3ne"))&&c(D,"class",p),(!O||C&4)&&Pe(e,"--topOffsetHeight",t[2]),(!O||C&64&&!Be(I.src,P=t[6]))&&c(I,"src",P),(!O||C&16)&&Pe(u,"height","calc("+t[4]+"px + 18px)")},i(W){O||(N(r.$$.fragment,W),N(S),N(_.$$.fragment,W),O=!0)},o(W){H(r.$$.fragment,W),H(S),H(_.$$.fragment,W),O=!1},d(W){W&&d(n),ye(r),S&&S.d(),ye(_),k(),t[25](null),z(),F=!1,it($)}}}let Dn="Enter Wallet Url";const tt="INPUT_URL";function kn(t,n,e){let l,s,{wallet:r=null}=n,{inputUrl:a="https://peerpiper.github.io/iframe-wallet-sdk/"}=n,{topOffsetHeight:i=0}=n,{topOffsetWidth:o=0}=n,{iframeParentHeight:g=0}=n,{iframeParentWidth:f=0}=n,h,{show:m}=n,{hide:v}=n;const D=ot();let _,p,k,y;const u={loading:!0};ct(async()=>{const{ImmortalDB:M}=await Rt(()=>import("./index-f3824ee7.js"),[]);e(8,y=async()=>{try{await M.set(tt,_)}catch(U){console.warn("Did not save",_,U)}});try{const U=await M.get(tt,null);U&&e(1,a=U)}catch(U){console.warn("Did not get",U)}P()});async function I(){e(10,u.loading=!1,u);let M;M=await _n({iframe:p,methods:{setIframeParentHeight(B){e(4,g=B)},setIframeParentWidth(B){e(17,f=B)},show(){m()},hide(){v()},walletReady(){return e(0,r=M),D("walletReady",{wallet:r}),window.arweaveWallet=r.arweaveWalletAPI,!0}}}).promise,m()}const P=()=>{_!==a&&(e(6,_=""),e(6,_=a),e(10,u.loading=!0,u))},z=()=>r.disconnect(),O=()=>window.open(a);function F(M){M.key==="Enter"&&k&&P()}const $=()=>e(9,k=!0),S=()=>e(9,k=!1);function te(){a=this.value,e(1,a)}const W=()=>{r!=null&&r.address?z():P()};function C(){i=this.offsetHeight,o=this.offsetWidth,e(2,i),e(3,o)}function T(M){ut[M?"unshift":"push"](()=>{p=M,e(7,p)})}function q(){h=this.offsetWidth,e(5,h)}return t.$$set=M=>{"wallet"in M&&e(0,r=M.wallet),"inputUrl"in M&&e(1,a=M.inputUrl),"topOffsetHeight"in M&&e(2,i=M.topOffsetHeight),"topOffsetWidth"in M&&e(3,o=M.topOffsetWidth),"iframeParentHeight"in M&&e(4,g=M.iframeParentHeight),"iframeParentWidth"in M&&e(17,f=M.iframeParentWidth),"show"in M&&e(18,m=M.show),"hide"in M&&e(19,v=M.hide)},t.$$.update=()=>{t.$$.dirty&320&&_&&y&&y(),t.$$.dirty&128&&p&&p.addEventListener("load",I),t.$$.dirty&1&&e(12,l=r!=null&&r.keepPopup?"close":"launch"),t.$$.dirty&1&&e(11,s=r!=null&&r.address?"unplug":"plug"),t.$$.dirty&33&&h&&r&&(r==null||r.setWidth(h))},[r,a,i,o,g,h,_,p,y,k,u,s,l,P,z,O,F,f,m,v,$,S,te,W,C,T,q]}class Mn extends ke{constructor(n){super(),Me(this,n,kn,In,Se,{wallet:0,inputUrl:1,topOffsetHeight:2,topOffsetWidth:3,iframeParentHeight:4,iframeParentWidth:17,show:18,hide:19})}}function nt(t){let n,e;return n=new xt({props:{$$slots:{default:[Sn,({openNav:l,hideNav:s})=>({5:l,6:s}),({openNav:l,hideNav:s})=>(l?32:0)|(s?64:0)]},$$scope:{ctx:t}}}),{c(){_e(n.$$.fragment)},l(l){we(n.$$.fragment,l)},m(l,s){Ee(n,l,s),e=!0},p(l,s){const r={};s&227&&(r.$$scope={dirty:s,ctx:l}),n.$set(r)},i(l){e||(N(n.$$.fragment,l),e=!0)},o(l){H(n.$$.fragment,l),e=!1},d(l){ye(n,l)}}}function Sn(t){let n,e,l;function s(a){t[3](a)}let r={inputUrl:t[1],show:t[5],hide:t[6]};return t[0]!==void 0&&(r.wallet=t[0]),n=new Mn({props:r}),ut.push(()=>St(n,"wallet",s)),n.$on("walletReady",t[4]),{c(){_e(n.$$.fragment)},l(a){we(n.$$.fragment,a)},m(a,i){Ee(n,a,i),l=!0},p(a,i){const o={};i&2&&(o.inputUrl=a[1]),i&32&&(o.show=a[5]),i&64&&(o.hide=a[6]),!e&&i&1&&(e=!0,o.wallet=a[0],Ct(()=>e=!1)),n.$set(o)},i(a){l||(N(n.$$.fragment,a),l=!0)},o(a){H(n.$$.fragment,a),l=!1},d(a){ye(n,a)}}}function Cn(t){let n,e,l=t[2]&&nt(t);return{c(){l&&l.c(),n=Ye()},l(s){l&&l.l(s),n=Ye()},m(s,r){l&&l.m(s,r),G(s,n,r),e=!0},p(s,[r]){s[2]?l?(l.p(s,r),r&4&&N(l,1)):(l=nt(s),l.c(),N(l,1),l.m(n.parentNode,n)):l&&(me(),H(l,1,1,()=>{l=null}),pe())},i(s){e||(N(l),e=!0)},o(s){H(l),e=!1},d(s){l&&l.d(s),s&&d(n)}}}function Ln(t,n,e){let{inputUrl:l}=n,{wallet:s=null}=n,r;ct(()=>{e(2,r=!0)});function a(o){s=o,e(0,s)}function i(o){Lt.call(this,t,o)}return t.$$set=o=>{"inputUrl"in o&&e(1,l=o.inputUrl),"wallet"in o&&e(0,s=o.wallet)},[s,l,r,a,i]}class Rn extends ke{constructor(n){super(),Me(this,n,Ln,Cn,Se,{inputUrl:1,wallet:0})}}const An=Rn;export{An as Web3WalletMenu};
