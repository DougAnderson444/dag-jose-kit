import{S as K,i as x,s as $,F as ee,l as X,m as V,n as M,h as C,p as b,q as A,a1 as Ye,b as D,aa as Re,G as te,H as se,I as ne,f as P,t as T,_ as ie,E as G,e as ae,o as Qe,N as Y,O as R,Z as Ue,r as we,a as J,u as Oe,c as Q,a4 as re,J as H,v as Ze,M as q,g as le,d as oe,a7 as qe,C as Le,w as fe,x as ue,y as he,z as Ce,A as Pe,B as ce,R as Ge,ab as Ke,$ as xe,a0 as $e,a6 as et,Q as tt}from"./index-ef46e954.js";class N{constructor(e){this.id=-1,this.nativePointer=e,this.pageX=e.pageX,this.pageY=e.pageY,this.clientX=e.clientX,this.clientY=e.clientY,self.Touch&&e instanceof Touch?this.id=e.identifier:Z(e)&&(this.id=e.pointerId)}getCoalesced(){if("getCoalescedEvents"in this.nativePointer){const e=this.nativePointer.getCoalescedEvents().map(t=>new N(t));if(e.length>0)return e}return[this]}}const Z=s=>"pointerId"in s,de=s=>"changedTouches"in s,ye=()=>{};class st{constructor(e,{start:t=()=>!0,move:n=ye,end:i=ye,rawUpdates:o=!1,avoidPointerEvents:l=!1,eventListenerOptions:a={capture:!1,passive:!1,once:!1}}={}){this._element=e,this.startPointers=[],this.currentPointers=[],this._excludeFromButtonsCheck=new Set,this._pointerStart=r=>{if(Z(r)&&r.buttons===0)this._excludeFromButtonsCheck.add(r.pointerId);else if(!(r.buttons&1))return;const f=new N(r);this.currentPointers.some(d=>d.id===f.id)||!this._triggerPointerStart(f,r)||(Z(r)?((r.target&&"setPointerCapture"in r.target?r.target:this._element).setPointerCapture(r.pointerId),this._element.addEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move,this._eventListenerOptions),this._element.addEventListener("pointerup",this._pointerEnd,this._eventListenerOptions),this._element.addEventListener("pointercancel",this._pointerEnd,this._eventListenerOptions)):(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd)))},this._touchStart=r=>{for(const f of Array.from(r.changedTouches))this._triggerPointerStart(new N(f),r)},this._move=r=>{if(!de(r)&&(!Z(r)||!this._excludeFromButtonsCheck.has(r.pointerId))&&r.buttons===0){this._pointerEnd(r);return}const f=this.currentPointers.slice(),d=de(r)?Array.from(r.changedTouches).map(h=>new N(h)):[new N(r)],u=[];for(const h of d){const m=this.currentPointers.findIndex(O=>O.id===h.id);m!==-1&&(u.push(h),this.currentPointers[m]=h)}u.length!==0&&this._moveCallback(f,u,r)},this._triggerPointerEnd=(r,f)=>{if(!de(f)&&f.buttons&1)return!1;const d=this.currentPointers.findIndex(h=>h.id===r.id);if(d===-1)return!1;this.currentPointers.splice(d,1),this.startPointers.splice(d,1),this._excludeFromButtonsCheck.delete(r.id);const u=!(f.type==="mouseup"||f.type==="touchend"||f.type==="pointerup");return this._endCallback(r,f,u),!0},this._pointerEnd=r=>{if(!!this._triggerPointerEnd(new N(r),r))if(Z(r)){if(this.currentPointers.length)return;this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd)}else window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)},this._touchEnd=r=>{for(const f of Array.from(r.changedTouches))this._triggerPointerEnd(new N(f),r)},this._startCallback=t,this._moveCallback=n,this._endCallback=i,this._rawUpdates=o&&"onpointerrawupdate"in window,this._eventListenerOptions=a,self.PointerEvent&&!l?this._element.addEventListener("pointerdown",this._pointerStart,this._eventListenerOptions):(this._element.addEventListener("mousedown",this._pointerStart,this._eventListenerOptions),this._element.addEventListener("touchstart",this._touchStart,this._eventListenerOptions),this._element.addEventListener("touchmove",this._move,this._eventListenerOptions),this._element.addEventListener("touchend",this._touchEnd,this._eventListenerOptions),this._element.addEventListener("touchcancel",this._touchEnd,this._eventListenerOptions))}stop(){this._element.removeEventListener("pointerdown",this._pointerStart),this._element.removeEventListener("mousedown",this._pointerStart),this._element.removeEventListener("touchstart",this._touchStart),this._element.removeEventListener("touchmove",this._move),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)}_triggerPointerStart(e,t){return this._startCallback(e,t)?(this.currentPointers.push(e),this.startPointers.push(e),!0):!1}}let nt=(s=21)=>crypto.getRandomValues(new Uint8Array(s)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");function it(s){let e;return{c(){e=X("div"),this.h()},l(t){e=V(t,"DIV",{class:!0}),M(e).forEach(C),this.h()},h(){b(e,"class","h-16 w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[2em] border-pink-500/50")},m(t,n){D(t,e,n)},p:G,d(t){t&&C(e)}}}function rt(s){let e,t,n;const i=s[9].default,o=ee(i,s,s[8],null),l=o||it();return{c(){e=X("div"),l&&l.c(),this.h()},l(a){e=V(a,"DIV",{id:!0,class:!0,style:!0});var r=M(e);l&&l.l(r),r.forEach(C),this.h()},h(){b(e,"id",s[1]),b(e,"class","absolute"),A(e,"left",s[5]+"px"),A(e,"top",s[4]+"px"),Ye(()=>s[11].call(e))},m(a,r){D(a,e,r),l&&l.m(e,null),s[10](e),t=Re(e,s[11].bind(e)),n=!0},p(a,[r]){o&&o.p&&(!n||r&256)&&te(o,i,a,a[8],n?ne(i,a[8],r,null):se(a[8]),null),(!n||r&2)&&b(e,"id",a[1]),(!n||r&32)&&A(e,"left",a[5]+"px"),(!n||r&16)&&A(e,"top",a[4]+"px")},i(a){n||(P(l,a),n=!0)},o(a){T(l,a),n=!1},d(a){a&&C(e),l&&l.d(a),s[10](null),t()}}}function lt(s,e,t){let n,i,{$$slots:o={},$$scope:l}=e,{marker:a}=e,{id:r}=e,{left:f}=e,{top:d}=e,u,h;function m(E){ie[E?"unshift":"push"](()=>{a=E,t(0,a)})}function O(){u=this.offsetWidth,h=this.offsetHeight,t(2,u),t(3,h)}return s.$$set=E=>{"marker"in E&&t(0,a=E.marker),"id"in E&&t(1,r=E.id),"left"in E&&t(6,f=E.left),"top"in E&&t(7,d=E.top),"$$scope"in E&&t(8,l=E.$$scope)},s.$$.update=()=>{s.$$.dirty&68&&t(5,n=f-u/2),s.$$.dirty&136&&t(4,i=d-h/2)},[a,r,u,h,i,n,f,d,l,o,m,O]}class ot extends K{constructor(e){super(),x(this,e,lt,rt,$,{marker:0,id:1,left:6,top:7})}}const me=Math.PI,ge=2*me,U=1e-6,at=ge-U;function pe(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function je(){return new pe}pe.prototype=je.prototype={constructor:pe,moveTo:function(s,e){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(s,e){this._+="L"+(this._x1=+s)+","+(this._y1=+e)},quadraticCurveTo:function(s,e,t,n){this._+="Q"+ +s+","+ +e+","+(this._x1=+t)+","+(this._y1=+n)},bezierCurveTo:function(s,e,t,n,i,o){this._+="C"+ +s+","+ +e+","+ +t+","+ +n+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(s,e,t,n,i){s=+s,e=+e,t=+t,n=+n,i=+i;var o=this._x1,l=this._y1,a=t-s,r=n-e,f=o-s,d=l-e,u=f*f+d*d;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=s)+","+(this._y1=e);else if(u>U)if(!(Math.abs(d*a-r*f)>U)||!i)this._+="L"+(this._x1=s)+","+(this._y1=e);else{var h=t-o,m=n-l,O=a*a+r*r,E=h*h+m*m,y=Math.sqrt(O),v=Math.sqrt(u),p=i*Math.tan((me-Math.acos((O+u-E)/(2*y*v)))/2),B=p/v,w=p/y;Math.abs(B-1)>U&&(this._+="L"+(s+B*f)+","+(e+B*d)),this._+="A"+i+","+i+",0,0,"+ +(d*h>f*m)+","+(this._x1=s+w*a)+","+(this._y1=e+w*r)}},arc:function(s,e,t,n,i,o){s=+s,e=+e,t=+t,o=!!o;var l=t*Math.cos(n),a=t*Math.sin(n),r=s+l,f=e+a,d=1^o,u=o?n-i:i-n;if(t<0)throw new Error("negative radius: "+t);this._x1===null?this._+="M"+r+","+f:(Math.abs(this._x1-r)>U||Math.abs(this._y1-f)>U)&&(this._+="L"+r+","+f),t&&(u<0&&(u=u%ge+ge),u>at?this._+="A"+t+","+t+",0,1,"+d+","+(s-l)+","+(e-a)+"A"+t+","+t+",0,1,"+d+","+(this._x1=r)+","+(this._y1=f):u>U&&(this._+="A"+t+","+t+",0,"+ +(u>=me)+","+d+","+(this._x1=s+t*Math.cos(i))+","+(this._y1=e+t*Math.sin(i))))},rect:function(s,e,t,n){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+e)+"h"+ +t+"v"+ +n+"h"+-t+"Z"},toString:function(){return this._}};function Se(s){return function(){return s}}var ft=Array.prototype.slice;function ut(s){return s[0]}function ht(s){return s[1]}class ct{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function _t(s){return new ct(s,!0)}function dt(s){return s.source}function mt(s){return s.target}function gt(s){let e=dt,t=mt,n=ut,i=ht,o=null,l=null;function a(){let r;const f=ft.call(arguments),d=e.apply(this,f),u=t.apply(this,f);if(o==null&&(l=s(r=je())),l.lineStart(),f[0]=d,l.point(+n.apply(this,f),+i.apply(this,f)),f[0]=u,l.point(+n.apply(this,f),+i.apply(this,f)),l.lineEnd(),r)return l=null,r+""||null}return a.source=function(r){return arguments.length?(e=r,a):e},a.target=function(r){return arguments.length?(t=r,a):t},a.x=function(r){return arguments.length?(n=typeof r=="function"?r:Se(+r),a):n},a.y=function(r){return arguments.length?(i=typeof r=="function"?r:Se(+r),a):i},a.context=function(r){return arguments.length?(r==null?o=l=null:l=s(o=r),a):o},a}function Te(s,e,t){const n=s.slice();return n[17]=e[t],n[19]=t,n}function ze(s){let e,t=s[0],n=[];for(let i=0;i<t.length;i+=1)n[i]=Ie(Te(s,t,i));return{c(){e=Y("svg");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=R(i,"svg",{style:!0,class:!0});var o=M(e);for(let l=0;l<n.length;l+=1)n[l].l(o);o.forEach(C),this.h()},h(){A(e,"pointer-events","none"),b(e,"class","svelte-1t43067")},m(i,o){D(i,e,o);for(let l=0;l<n.length;l+=1)n[l].m(e,null)},p(i,o){if(o&2047){t=i[0];let l;for(l=0;l<t.length;l+=1){const a=Te(i,t,l);n[l]?n[l].p(a,o):(n[l]=Ie(a),n[l].c(),n[l].m(e,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=t.length}},d(i){i&&C(e),Ue(n,i)}}}function Me(s){var v,p,B,w,g,c;let e,t,n,i,o,l,a,r=((B=(p=(v=s[17])==null?void 0:v.opts)==null?void 0:p.label)!=null&&B.enabled?(c=(g=(w=s[17])==null?void 0:w.opts)==null?void 0:g.label)==null?void 0:c.value:"")+"",f,d,u,h,m,O,E,y;return{c(){e=Y("g"),t=Y("path"),o=Y("text"),l=Y("textPath"),a=Y("tspan"),f=we(r),d=J(),m=Y("textPath"),O=we("\u27A4"),this.h()},l(_){e=R(_,"g",{stroke:!0,"stroke-opacity":!0});var k=M(e);t=R(k,"path",{d:!0,id:!0,"stroke-width":!0,stroke:!0,fill:!0,"stroke-linecap":!0,"stroke-opacity":!0}),M(t).forEach(C),o=R(k,"text",{class:!0});var S=M(o);l=R(S,"textPath",{"xlink:href":!0,startOffset:!0});var z=M(l);a=R(z,"tspan",{fill:!0,class:!0});var F=M(a);f=Oe(F,r),F.forEach(C),d=Q(z),z.forEach(C),m=R(S,"textPath",{"xlink:href":!0,startOffset:!0,fill:!0,opacity:!0});var L=M(m);O=Oe(L,"\u27A4"),L.forEach(C),S.forEach(C),k.forEach(C),this.h()},h(){b(t,"d",n=s[10](s[17])),b(t,"id",i=s[17].id),b(t,"stroke-width",s[2]),b(t,"stroke",s[1]),b(t,"fill","none"),b(t,"stroke-linecap","round"),b(t,"stroke-opacity",s[4]),b(a,"fill","black"),b(a,"class","svelte-1t43067"),re(l,"xlink:href",u="#"+s[17].id),b(l,"startOffset",h=s[7]+"%"),re(m,"xlink:href",E="#"+s[17].id),b(m,"startOffset",s[8]),b(m,"fill",s[3]),b(m,"opacity",y=s[4]*1.3),b(o,"class","svelte-1t43067"),b(e,"stroke",s[6]),b(e,"stroke-opacity",s[5])},m(_,k){D(_,e,k),H(e,t),H(e,o),H(o,l),H(l,a),H(a,f),H(l,d),H(o,m),H(m,O)},p(_,k){var S,z,F,L,W,j;k&1&&n!==(n=_[10](_[17]))&&b(t,"d",n),k&1&&i!==(i=_[17].id)&&b(t,"id",i),k&4&&b(t,"stroke-width",_[2]),k&2&&b(t,"stroke",_[1]),k&16&&b(t,"stroke-opacity",_[4]),k&1&&r!==(r=((F=(z=(S=_[17])==null?void 0:S.opts)==null?void 0:z.label)!=null&&F.enabled?(j=(W=(L=_[17])==null?void 0:L.opts)==null?void 0:W.label)==null?void 0:j.value:"")+"")&&Ze(f,r),k&1&&u!==(u="#"+_[17].id)&&re(l,"xlink:href",u),k&128&&h!==(h=_[7]+"%")&&b(l,"startOffset",h),k&1&&E!==(E="#"+_[17].id)&&re(m,"xlink:href",E),k&256&&b(m,"startOffset",_[8]),k&8&&b(m,"fill",_[3]),k&16&&y!==(y=_[4]*1.3)&&b(m,"opacity",y),k&64&&b(e,"stroke",_[6]),k&32&&b(e,"stroke-opacity",_[5])},d(_){_&&C(e)}}}function Ie(s){let e,t=s[17]&&s[9]&&Me(s);return{c(){t&&t.c(),e=ae()},l(n){t&&t.l(n),e=ae()},m(n,i){t&&t.m(n,i),D(n,e,i)},p(n,i){n[17]&&n[9]?t?t.p(n,i):(t=Me(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(n){t&&t.d(n),n&&C(e)}}}function pt(s){let e,t=s[9]&&s[0]&&s[0].length>0&&ze(s);return{c(){t&&t.c(),e=ae()},l(n){t&&t.l(n),e=ae()},m(n,i){t&&t.m(n,i),D(n,e,i)},p(n,[i]){n[9]&&n[0]&&n[0].length>0?t?t.p(n,i):(t=ze(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:G,o:G,d(n){t&&t.d(n),n&&C(e)}}}function kt(s,e,t){let{links:n}=e,{calcOffsetFromCanvas:i}=e,{strokeColor:o="green"}=e,{strokeWidth:l=1}=e,{arrowColor:a="green"}=e,{strokeOpacity:r="0.3"}=e,{groupStrokeOpacity:f="0.1"}=e,{groupStrokeColor:d="white"}=e,{textStartOffset:u=20}=e,{arrowStartOffset:h="40%"}=e;const m=gt(_t);let O,E,y,v,p;Qe(()=>{t(9,O=!0)});function B(w){let g=document.getElementById(w.source.id),c=document.getElementById(w.target.id);if(!g||!c)return;const{x:_,y:k}=i(g),{x:S,y:z}=i(c);return E=_+g.offsetWidth/2,y=k+g.offsetHeight/2,v=S+c.offsetWidth/2,p=z+c.offsetHeight/2,m({source:[E,y],target:[v,p]})}return s.$$set=w=>{"links"in w&&t(0,n=w.links),"calcOffsetFromCanvas"in w&&t(11,i=w.calcOffsetFromCanvas),"strokeColor"in w&&t(1,o=w.strokeColor),"strokeWidth"in w&&t(2,l=w.strokeWidth),"arrowColor"in w&&t(3,a=w.arrowColor),"strokeOpacity"in w&&t(4,r=w.strokeOpacity),"groupStrokeOpacity"in w&&t(5,f=w.groupStrokeOpacity),"groupStrokeColor"in w&&t(6,d=w.groupStrokeColor),"textStartOffset"in w&&t(7,u=w.textStartOffset),"arrowStartOffset"in w&&t(8,h=w.arrowStartOffset)},[n,o,l,a,r,f,d,u,h,O,B,i]}class Fe extends K{constructor(e){super(),x(this,e,kt,pt,$,{links:0,calcOffsetFromCanvas:11,strokeColor:1,strokeWidth:2,arrowColor:3,strokeOpacity:4,groupStrokeOpacity:5,groupStrokeColor:6,textStartOffset:7,arrowStartOffset:8})}}function He(s){let e;const t=s[7].default,n=ee(t,s,s[6],null),i=n||bt(s);return{c(){i&&i.c()},l(o){i&&i.l(o)},m(o,l){i&&i.m(o,l),e=!0},p(o,l){n?n.p&&(!e||l&64)&&te(n,t,o,o[6],e?ne(t,o[6],l,null):se(o[6]),null):i&&i.p&&(!e||l&4)&&i.p(o,e?l:-1)},i(o){e||(P(i,o),e=!0)},o(o){T(i,o),e=!1},d(o){i&&i.d(o)}}}function bt(s){let e,t;return{c(){e=X("div"),this.h()},l(n){e=V(n,"DIV",{style:!0,class:!0}),M(e).forEach(C),this.h()},h(){A(e,"transform","translate(-50%, -50%)"),b(e,"class",t="absolute border-["+(s[2]+"em")+"] md:border-["+(s[2]/2+"em")+"] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full")},m(n,i){D(n,e,i)},p(n,i){i&4&&t!==(t="absolute border-["+(n[2]+"em")+"] md:border-["+(n[2]/2+"em")+"] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full")&&b(e,"class",t)},d(n){n&&C(e)}}}function vt(s){let e,t,n,i,o,l,a=s[0]&&He(s);return{c(){e=X("div"),a&&a.c(),this.h()},l(r){e=V(r,"DIV",{id:!0,"data-highlighter":!0,class:!0,style:!0});var f=M(e);a&&a.l(f),f.forEach(C),this.h()},h(){b(e,"id",t=s[1].id+"--highlighter"),b(e,"data-highlighter","true"),b(e,"class",n="absolute border-["+(s[2]+"em")+"] md:border-["+(s[2]/2+"em")+"] border-transparent rounded-full p-0 m-0"),A(e,"top",s[5]+"px"),A(e,"left",s[4]+"px")},m(r,f){D(r,e,f),a&&a.m(e,null),s[9](e),i=!0,o||(l=[q(window,"resize",s[8]),q(e,"mouseover",s[10]),q(e,"mouseleave",s[11]),q(e,"focus",s[12]),q(e,"blur",s[13])],o=!0)},p(r,[f]){r[0]?a?(a.p(r,f),f&1&&P(a,1)):(a=He(r),a.c(),P(a,1),a.m(e,null)):a&&(le(),T(a,1,1,()=>{a=null}),oe()),(!i||f&2&&t!==(t=r[1].id+"--highlighter"))&&b(e,"id",t),(!i||f&4&&n!==(n="absolute border-["+(r[2]+"em")+"] md:border-["+(r[2]/2+"em")+"] border-transparent rounded-full p-0 m-0"))&&b(e,"class",n),(!i||f&32)&&A(e,"top",r[5]+"px"),(!i||f&16)&&A(e,"left",r[4]+"px")},i(r){i||(P(a),i=!0)},o(r){T(a),i=!1},d(r){r&&C(e),a&&a.d(),s[9](null),o=!1,qe(l)}}}function Et(s,e,t){let n,i,{$$slots:o={},$$scope:l}=e,{node:a}=e,{zoneSize:r=2}=e,{highlight:f=!1}=e,d;const u=v=>{t(5,n),t(3,d),t(1,a),t(4,i),t(3,d),t(1,a)};function h(v){ie[v?"unshift":"push"](()=>{d=v,t(3,d)})}const m=v=>{t(0,f=!0)},O=v=>{t(0,f=!1)},E=v=>{t(0,f=!0)},y=v=>{t(0,f=!1)};return s.$$set=v=>{"node"in v&&t(1,a=v.node),"zoneSize"in v&&t(2,r=v.zoneSize),"highlight"in v&&t(0,f=v.highlight),"$$scope"in v&&t(6,l=v.$$scope)},s.$$.update=()=>{s.$$.dirty&10&&t(5,n=d?-d.offsetHeight/2+a.offsetHeight/2:0),s.$$.dirty&10&&t(4,i=d?-d.offsetWidth/2+a.offsetWidth/2:0),s.$$.dirty&10&&d&&a.insertAdjacentElement("beforeend",d)},[f,a,r,d,i,n,l,o,u,h,m,O,E,y]}class wt extends K{constructor(e){super(),x(this,e,Et,vt,$,{node:1,zoneSize:2,highlight:0})}}const Ot=wt,Be=(s,e,t=!1)=>{const n=s.find(o=>o.id==e);if(!n||!n.value)return"";if(!t)return n.value+" to";const i=s.find(o=>o.id==t);return i?`${n.value} to ${i.value}`:n.value},{window:Lt}=Ke;function De(s,e,t){const n=s.slice();return n[18]=e[t][0],n[19]=e[t][1].node,n[20]=e[t][1].highlight,n}const Ct=s=>({}),Ae=s=>({connectable:s[10]}),Pt=s=>({}),We=s=>({connectable:s[10]});function Xe(s){let e,t,n;function i(l){s[13](l)}let o={left:s[7],top:s[8],id:Je,$$slots:{default:[St]},$$scope:{ctx:s}};return s[5]!==void 0&&(o.marker=s[5]),e=new ot({props:o}),ie.push(()=>xe(e,"marker",i)),{c(){fe(e.$$.fragment)},l(l){ue(e.$$.fragment,l)},m(l,a){he(e,l,a),n=!0},p(l,a){const r={};a&128&&(r.left=l[7]),a&256&&(r.top=l[8]),a&32768&&(r.$$scope={dirty:a,ctx:l}),!t&&a&32&&(t=!0,r.marker=l[5],$e(()=>t=!1)),e.$set(r)},i(l){n||(P(e.$$.fragment,l),n=!0)},o(l){T(e.$$.fragment,l),n=!1},d(l){ce(e,l)}}}function yt(s){let e;return{c(){e=X("div"),this.h()},l(t){e=V(t,"DIV",{class:!0}),M(e).forEach(C),this.h()},h(){b(e,"class","h-32 w-32 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[4em] md:border-[2em] ")},m(t,n){D(t,e,n)},p:G,d(t){t&&C(e)}}}function St(s){let e;const t=s[11].marker,n=ee(t,s,s[15],We),i=n||yt();return{c(){i&&i.c()},l(o){i&&i.l(o)},m(o,l){i&&i.m(o,l),e=!0},p(o,l){n&&n.p&&(!e||l&32768)&&te(n,t,o,o[15],e?ne(t,o[15],l,Pt):se(o[15]),We)},i(o){e||(P(i,o),e=!0)},o(o){T(i,o),e=!1},d(o){i&&i.d(o)}}}function Ve(s){let e;const t=s[11].default,n=ee(t,s,s[15],Ae);return{c(){n&&n.c()},l(i){n&&n.l(i)},m(i,o){n&&n.m(i,o),e=!0},p(i,o){n&&n.p&&(!e||o&32768)&&te(n,t,i,i[15],e?ne(t,i[15],o,Ct):se(i[15]),Ae)},i(i){e||(P(n,i),e=!0)},o(i){T(n,i),e=!1},d(i){n&&n.d(i)}}}function Ne(s){let e,t;return e=new Ot({props:{node:s[19],highlight:s[20]}}),{c(){fe(e.$$.fragment)},l(n){ue(e.$$.fragment,n)},m(n,i){he(e,n,i),t=!0},p(n,i){const o={};i&4&&(o.node=n[19]),i&4&&(o.highlight=n[20]),e.$set(o)},i(n){t||(P(e.$$.fragment,n),t=!0)},o(n){T(e.$$.fragment,n),t=!1},d(n){ce(e,n)}}}function Tt(s){var w,g;let e,t,n,i,o,l,a,r,f,d,u=s[4]&&Xe(s),h=s[3]&&Ve(s);const m=[{links:[s[6]]},{calcOffsetFromCanvas:s[9]},(w=s[1])==null?void 0:w.links];let O={};for(let c=0;c<m.length;c+=1)O=Le(O,m[c]);i=new Fe({props:O});const E=[{links:s[0].links},{calcOffsetFromCanvas:s[9]},(g=s[1])==null?void 0:g.links];let y={};for(let c=0;c<E.length;c+=1)y=Le(y,E[c]);l=new Fe({props:y});let v=[...Object.entries(s[2])],p=[];for(let c=0;c<v.length;c+=1)p[c]=Ne(De(s,v,c));const B=c=>T(p[c],1,1,()=>{p[c]=null});return{c(){e=X("div"),u&&u.c(),t=J(),h&&h.c(),n=J(),fe(i.$$.fragment),o=J(),fe(l.$$.fragment),a=J();for(let c=0;c<p.length;c+=1)p[c].c();this.h()},l(c){e=V(c,"DIV",{class:!0});var _=M(e);u&&u.l(_),t=Q(_),h&&h.l(_),n=Q(_),ue(i.$$.fragment,_),o=Q(_),ue(l.$$.fragment,_),a=Q(_);for(let k=0;k<p.length;k+=1)p[k].l(_);_.forEach(C),this.h()},h(){b(e,"class","relative")},m(c,_){D(c,e,_),u&&u.m(e,null),H(e,t),h&&h.m(e,null),H(e,n),he(i,e,null),H(e,o),he(l,e,null),H(e,a);for(let k=0;k<p.length;k+=1)p[k].m(e,null);s[14](e),r=!0,f||(d=q(Lt,"resize",s[12]),f=!0)},p(c,[_]){var z,F;c[4]?u?(u.p(c,_),_&16&&P(u,1)):(u=Xe(c),u.c(),P(u,1),u.m(e,t)):u&&(le(),T(u,1,1,()=>{u=null}),oe()),c[3]?h?(h.p(c,_),_&8&&P(h,1)):(h=Ve(c),h.c(),P(h,1),h.m(e,n)):h&&(le(),T(h,1,1,()=>{h=null}),oe());const k=_&578?Ce(m,[_&64&&{links:[c[6]]},_&512&&{calcOffsetFromCanvas:c[9]},_&2&&Pe((z=c[1])==null?void 0:z.links)]):{};i.$set(k);const S=_&515?Ce(E,[_&1&&{links:c[0].links},_&512&&{calcOffsetFromCanvas:c[9]},_&2&&Pe((F=c[1])==null?void 0:F.links)]):{};if(l.$set(S),_&4){v=[...Object.entries(c[2])];let L;for(L=0;L<v.length;L+=1){const W=De(c,v,L);p[L]?(p[L].p(W,_),P(p[L],1)):(p[L]=Ne(W),p[L].c(),P(p[L],1),p[L].m(e,null))}for(le(),L=v.length;L<p.length;L+=1)B(L);oe()}},i(c){if(!r){P(u),P(h),P(i.$$.fragment,c),P(l.$$.fragment,c);for(let _=0;_<v.length;_+=1)P(p[_]);r=!0}},o(c){T(u),T(h),T(i.$$.fragment,c),T(l.$$.fragment,c),p=p.filter(Boolean);for(let _=0;_<p.length;_+=1)T(p[_]);r=!1},d(c){c&&C(e),u&&u.d(),h&&h.d(),ce(i),ce(l),Ue(p,c),s[14](null),f=!1,d()}}}const Je="marker";function zt(s,e,t){let{$$slots:n={},$$scope:i}=e,{data:o}=e,{opts:l={}}=e;const a=Ge();let r={},f,d,u,h=null,m=0,O=0;function E(g,c){c.stopPropagation(),c.preventDefault(),t(7,m=g.pageX-f.offsetLeft),t(8,O=g.pageY-f.offsetTop)}function y(g){if(!g)return;if(g==f)return{x:g.offsetLeft,y:g.offsetTop};let c=g.getBoundingClientRect().top,_=f.getBoundingClientRect().top,k=c-_,S=g.getBoundingClientRect().left,z=f.getBoundingClientRect().left;return{x:S-z,y:k}}function v(g,c){var z,F;g.id||(g.id=nt()),g.style.position||(g.style.position="relative");let _=!1,k;t(2,r[g.id]={node:g,highlight:_},r);let S;return c!=null&&c.dataset&&(g.dataset.dataset=JSON.stringify(c.dataset)),(z=c==null?void 0:c.restrictions)!=null&&z.startOnly||(g.dataset.dropzone=!0),(F=c==null?void 0:c.restrictions)!=null&&F.dropOnly||(S=new st(g,{start(L,W){return S.currentPointers.length===1?!1:(t(4,d=!0),E(L,W),!0)},move(L,W,j){var _e;E(S.currentPointers[0],j),t(6,h={id:g.id+"-to-",source:{id:g.id},target:{id:Je},opts:{label:{enabled:!0,value:Be(o.nodes,g.id)}}}),k&&t(2,r[k.id].highlight=!1,r),k=((_e=document.elementFromPoint(S.currentPointers[0].clientX,S.currentPointers[0].clientY))==null?void 0:_e.closest("[data-dropzone]"))||null,k!=null&&k.id&&t(2,r[k.id].highlight=!0,r)},end:(L,W,j)=>{var be,ve;t(5,u.style.display="none",u),t(4,d=!1),r&&k&&k.id&&r[k.id].highlight&&t(2,r[k.id].highlight=!1,r),k=null;let I=document.elementFromPoint(L.clientX,L.clientY).closest("[data-dropzone]");if(t(6,h=null),!I||!(I!=null&&I.id)||!g||!(g!=null&&g.id))return;const ke={id:g.id+"-to-"+I.id,source:{id:g.id},target:{id:I.id},opts:{label:{enabled:!0,value:Be(o.nodes,g.id,I.id)}}};if(console.log({newLink:ke}),t(0,o.links=[...o.links,ke],o),(c==null?void 0:c.dataset)||((be=I==null?void 0:I.dataset)==null?void 0:be.dataset)){const Ee={source:{dataset:(c==null?void 0:c.dataset)||null},target:{dataset:(ve=I==null?void 0:I.dataset)!=null&&ve.dataset?JSON.parse(I.dataset.dataset):null}};console.log(Ee),a("connected",Ee)}},avoidPointerEvents:!0,eventListenerOptions:{capture:!0,passive:!1}})),{update(L){},destroy(){}}}const p=g=>{t(0,o)};function B(g){u=g,t(5,u)}function w(g){ie[g?"unshift":"push"](()=>{f=g,t(3,f)})}return s.$$set=g=>{"data"in g&&t(0,o=g.data),"opts"in g&&t(1,l=g.opts),"$$scope"in g&&t(15,i=g.$$scope)},[o,l,r,f,d,u,h,m,O,y,v,n,p,B,w,i]}class Mt extends K{constructor(e){super(),x(this,e,zt,Tt,$,{data:0,opts:1})}}const At=Mt;function It(s){let e;return{c(){e=X("div"),this.h()},l(t){e=V(t,"DIV",{class:!0}),M(e).forEach(C),this.h()},h(){b(e,"class","flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800")},m(t,n){D(t,e,n)},p:G,d(t){t&&C(e)}}}function Ft(s){let e,t,n,i,o,l,a,r;const f=s[11].default,d=ee(f,s,s[10],null),u=d||It();return{c(){e=X("div"),t=X("div"),u&&u.c(),this.h()},l(h){e=V(h,"DIV",{class:!0,style:!0});var m=M(e);t=V(m,"DIV",{class:!0});var O=M(t);u&&u.l(O),O.forEach(C),m.forEach(C),this.h()},h(){b(t,"class","relative"),b(e,"class","flex absolute EndPoint"),b(e,"style",i="top: "+s[8]+"px; "+(s[0]=="right"?`right: ${s[7]}px;`:`left: ${s[6]}px;`)),Ye(()=>s[14].call(e))},m(h,m){D(h,e,m),H(e,t),u&&u.m(t,null),s[13](e),o=Re(e,s[14].bind(e)),l=!0,a||(r=[q(window,"resize",s[12]),et(n=s[1].call(null,t,s[2]))],a=!0)},p(h,[m]){d&&d.p&&(!l||m&1024)&&te(d,f,h,h[10],l?ne(f,h[10],m,null):se(h[10]),null),n&&tt(n.update)&&m&4&&n.update.call(null,h[2]),(!l||m&449&&i!==(i="top: "+h[8]+"px; "+(h[0]=="right"?`right: ${h[7]}px;`:`left: ${h[6]}px;`)))&&b(e,"style",i)},i(h){l||(P(u,h),l=!0)},o(h){T(u,h),l=!1},d(h){h&&C(e),u&&u.d(h),s[13](null),o(),a=!1,qe(r)}}}function Ht(s,e,t){let n,i,o,{$$slots:l={},$$scope:a}=e,{position:r="right"}=e,{connectable:f}=e,{options:d={}}=e,u,h,m,O;const E=p=>{t(8,n),t(9,O),t(4,h),t(3,u),t(6,o),t(5,m),t(7,i),t(5,m)};function y(p){ie[p?"unshift":"push"](()=>{u=p,t(3,u)})}function v(){m=this.offsetWidth,h=this.offsetHeight,t(5,m),t(4,h)}return s.$$set=p=>{"position"in p&&t(0,r=p.position),"connectable"in p&&t(1,f=p.connectable),"options"in p&&t(2,d=p.options),"$$scope"in p&&t(10,a=p.$$scope)},s.$$.update=()=>{s.$$.dirty&8&&u&&(t(3,u.parentNode.style.position="relative",u),t(9,O=u.parentNode.offsetHeight)),s.$$.dirty&528&&t(8,n=O&&h?O/2-h/2:0),s.$$.dirty&32&&t(7,i=m?-m/2:0),s.$$.dirty&32&&t(6,o=m?-m/2:0)},[r,f,d,u,h,m,o,i,n,O,a,l,E,y,v]}class Bt extends K{constructor(e){super(),x(this,e,Ht,Ft,$,{position:0,connectable:1,options:2})}}const Wt=Bt;export{At as Canvas,Wt as EndPoint,Ot as Highlighter,Be as generateLinkLabel};
