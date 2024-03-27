import{a as re,r as oe}from"./chunk-TEFF5QW5.js";import{Da as Qt,La as Zt,Ma as L,U as qt,a as R,b as Gt,bd as ee,c as Ht,f as at,ha as zt,hb as It,ja as Vt,kc as te,pb as Xt,ta as Jt,ua as $t,wb as Yt}from"./chunk-KXMLQHF5.js";var W=class{constructor(e){if(this.crashes=[],this.state="initializing",this._now=Date.now,this.crashes=[],this._crashNumberLimit=typeof e.crashNumberLimit=="number"?e.crashNumberLimit:3,this._minimumNonErrorTimePeriod=typeof e.minimumNonErrorTimePeriod=="number"?e.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=r=>{let o="error"in r?r.error:r.reason;o instanceof Error&&this._handleError(o,r)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}destroy(){this._stopErrorHandling(),this._listeners={}}on(e,r){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(r)}off(e,r){this._listeners[e]=this._listeners[e].filter(o=>o!==r)}_fire(e,...r){let o=this._listeners[e]||[];for(let a of o)a.apply(this,[null,...r])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(e,r){if(this._shouldReactToError(e)){this.crashes.push({message:e.message,stack:e.stack,filename:r instanceof ErrorEvent?r.filename:void 0,lineno:r instanceof ErrorEvent?r.lineno:void 0,colno:r instanceof ErrorEvent?r.colno:void 0,date:this._now()});let o=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:e,causesRestart:o}),o?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(e){return e.is&&e.is("CKEditorError")&&e.context!==void 0&&e.context!==null&&this.state==="ready"&&this._isErrorComingFromThisItem(e)}_shouldRestart(){if(this.crashes.length<=this._crashNumberLimit)return!0;let e=this.crashes[this.crashes.length-1].date,r=this.crashes[this.crashes.length-1-this._crashNumberLimit].date;return(e-r)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}};function tt(t,e=new Set){let r=[t],o=new Set,a=0;for(;r.length>a;){let i=r[a++];if(!(o.has(i)||!Vr(i)||e.has(i)))if(o.add(i),Symbol.iterator in i)try{for(let n of i)r.push(n)}catch{}else for(let n in i)n!=="defaultValue"&&r.push(i[n])}return o}function Vr(t){let e=Object.prototype.toString.call(t),r=typeof t;return!(r==="number"||r==="boolean"||r==="string"||r==="symbol"||r==="function"||e==="[object Date]"||e==="[object RegExp]"||e==="[object Module]"||t===void 0||t===null||t._watchdogExcluded||t instanceof EventTarget||t instanceof Event)}function it(t,e,r=new Set){if(t===e&&Jr(t))return!0;let o=tt(t,r),a=tt(e,r);for(let i of o)if(a.has(i))return!0;return!1}function Jr(t){return typeof t=="object"&&t!==null}var $r=typeof global=="object"&&global&&global.Object===Object&&global,st=$r;var Qr=typeof self=="object"&&self&&self.Object===Object&&self,Zr=st||Qr||Function("return this")(),l=Zr;var Xr=l.Symbol,w=Xr;var ae=Object.prototype,Yr=ae.hasOwnProperty,to=ae.toString,et=w?w.toStringTag:void 0;function eo(t){var e=Yr.call(t,et),r=t[et];try{t[et]=void 0;var o=!0}catch{}var a=to.call(t);return o&&(e?t[et]=r:delete t[et]),a}var ie=eo;var ro=Object.prototype,oo=ro.toString;function ao(t){return oo.call(t)}var se=ao;var io="[object Null]",so="[object Undefined]",ne=w?w.toStringTag:void 0;function no(t){return t==null?t===void 0?so:io:ne&&ne in Object(t)?ie(t):se(t)}var b=no;function fo(t){return t!=null&&typeof t=="object"}var h=fo;var uo="[object Symbol]";function po(t){return typeof t=="symbol"||h(t)&&b(t)==uo}var fe=po;var lo=Array.isArray,B=lo;var mo=/\s/;function co(t){for(var e=t.length;e--&&mo.test(t.charAt(e)););return e}var ue=co;var ho=/^\s+/;function go(t){return t&&t.slice(0,ue(t)+1).replace(ho,"")}var de=go;function xo(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var c=xo;var pe=NaN,yo=/^[-+]0x[0-9a-f]+$/i,bo=/^0b[01]+$/i,_o=/^0o[0-7]+$/i,vo=parseInt;function To(t){if(typeof t=="number")return t;if(fe(t))return pe;if(c(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=c(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=de(t);var r=bo.test(t);return r||_o.test(t)?vo(t.slice(2),r?2:8):yo.test(t)?pe:+t}var Pt=To;var Eo="[object AsyncFunction]",wo="[object Function]",Oo="[object GeneratorFunction]",Co="[object Proxy]";function jo(t){if(!c(t))return!1;var e=b(t);return e==wo||e==Oo||e==Eo||e==Co}var nt=jo;var Ao=l["__core-js_shared__"],ft=Ao;var le=function(){var t=/[^.]+$/.exec(ft&&ft.keys&&ft.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function So(t){return!!le&&le in t}var me=So;var Io=Function.prototype,Po=Io.toString;function No(t){if(t!=null){try{return Po.call(t)}catch{}try{return t+""}catch{}}return""}var O=No;var Do=/[\\^$.*+?()[\]{}|]/g,Fo=/^\[object .+?Constructor\]$/,Mo=Function.prototype,Ro=Object.prototype,Lo=Mo.toString,Wo=Ro.hasOwnProperty,Bo=RegExp("^"+Lo.call(Wo).replace(Do,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function ko(t){if(!c(t)||me(t))return!1;var e=nt(t)?Bo:Fo;return e.test(O(t))}var ce=ko;function Uo(t,e){return t?.[e]}var he=Uo;function Ko(t,e){var r=he(t,e);return ce(r)?r:void 0}var y=Ko;var Go=y(l,"WeakMap"),ut=Go;var ge=Object.create,Ho=function(){function t(){}return function(e){if(!c(e))return{};if(ge)return ge(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),xe=Ho;function qo(t,e){var r=-1,o=t.length;for(e||(e=Array(o));++r<o;)e[r]=t[r];return e}var ye=qo;var zo=function(){try{var t=y(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Nt=zo;function Vo(t,e){for(var r=-1,o=t==null?0:t.length;++r<o&&e(t[r],r,t)!==!1;);return t}var be=Vo;var Jo=9007199254740991,$o=/^(?:0|[1-9]\d*)$/;function Qo(t,e){var r=typeof t;return e=e??Jo,!!e&&(r=="number"||r!="symbol"&&$o.test(t))&&t>-1&&t%1==0&&t<e}var _e=Qo;function Zo(t,e,r){e=="__proto__"&&Nt?Nt(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var dt=Zo;function Xo(t,e){return t===e||t!==t&&e!==e}var pt=Xo;var Yo=Object.prototype,ta=Yo.hasOwnProperty;function ea(t,e,r){var o=t[e];(!(ta.call(t,e)&&pt(o,r))||r===void 0&&!(e in t))&&dt(t,e,r)}var lt=ea;function ra(t,e,r,o){var a=!r;r||(r={});for(var i=-1,n=e.length;++i<n;){var s=e[i],f=o?o(r[s],t[s],s,r,t):void 0;f===void 0&&(f=t[s]),a?dt(r,s,f):lt(r,s,f)}return r}var I=ra;var oa=9007199254740991;function aa(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=oa}var mt=aa;function ia(t){return t!=null&&mt(t.length)&&!nt(t)}var ct=ia;var sa=Object.prototype;function na(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||sa;return t===r}var k=na;function fa(t,e){for(var r=-1,o=Array(t);++r<t;)o[r]=e(r);return o}var ve=fa;var ua="[object Arguments]";function da(t){return h(t)&&b(t)==ua}var Dt=da;var Te=Object.prototype,pa=Te.hasOwnProperty,la=Te.propertyIsEnumerable,ma=Dt(function(){return arguments}())?Dt:function(t){return h(t)&&pa.call(t,"callee")&&!la.call(t,"callee")},Ee=ma;function ca(){return!1}var we=ca;var je=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Oe=je&&typeof module=="object"&&module&&!module.nodeType&&module,ha=Oe&&Oe.exports===je,Ce=ha?l.Buffer:void 0,ga=Ce?Ce.isBuffer:void 0,xa=ga||we,ht=xa;var ya="[object Arguments]",ba="[object Array]",_a="[object Boolean]",va="[object Date]",Ta="[object Error]",Ea="[object Function]",wa="[object Map]",Oa="[object Number]",Ca="[object Object]",ja="[object RegExp]",Aa="[object Set]",Sa="[object String]",Ia="[object WeakMap]",Pa="[object ArrayBuffer]",Na="[object DataView]",Da="[object Float32Array]",Fa="[object Float64Array]",Ma="[object Int8Array]",Ra="[object Int16Array]",La="[object Int32Array]",Wa="[object Uint8Array]",Ba="[object Uint8ClampedArray]",ka="[object Uint16Array]",Ua="[object Uint32Array]",p={};p[Da]=p[Fa]=p[Ma]=p[Ra]=p[La]=p[Wa]=p[Ba]=p[ka]=p[Ua]=!0;p[ya]=p[ba]=p[Pa]=p[_a]=p[Na]=p[va]=p[Ta]=p[Ea]=p[wa]=p[Oa]=p[Ca]=p[ja]=p[Aa]=p[Sa]=p[Ia]=!1;function Ka(t){return h(t)&&mt(t.length)&&!!p[b(t)]}var Ae=Ka;function Ga(t){return function(e){return t(e)}}var U=Ga;var Se=typeof exports=="object"&&exports&&!exports.nodeType&&exports,rt=Se&&typeof module=="object"&&module&&!module.nodeType&&module,Ha=rt&&rt.exports===Se,Ft=Ha&&st.process,qa=function(){try{var t=rt&&rt.require&&rt.require("util").types;return t||Ft&&Ft.binding&&Ft.binding("util")}catch{}}(),C=qa;var Ie=C&&C.isTypedArray,za=Ie?U(Ie):Ae,Pe=za;var Va=Object.prototype,Ja=Va.hasOwnProperty;function $a(t,e){var r=B(t),o=!r&&Ee(t),a=!r&&!o&&ht(t),i=!r&&!o&&!a&&Pe(t),n=r||o||a||i,s=n?ve(t.length,String):[],f=s.length;for(var u in t)(e||Ja.call(t,u))&&!(n&&(u=="length"||a&&(u=="offset"||u=="parent")||i&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||_e(u,f)))&&s.push(u);return s}var gt=$a;function Qa(t,e){return function(r){return t(e(r))}}var xt=Qa;var Za=xt(Object.keys,Object),Ne=Za;var Xa=Object.prototype,Ya=Xa.hasOwnProperty;function ti(t){if(!k(t))return Ne(t);var e=[];for(var r in Object(t))Ya.call(t,r)&&r!="constructor"&&e.push(r);return e}var De=ti;function ei(t){return ct(t)?gt(t):De(t)}var K=ei;function ri(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var Fe=ri;var oi=Object.prototype,ai=oi.hasOwnProperty;function ii(t){if(!c(t))return Fe(t);var e=k(t),r=[];for(var o in t)o=="constructor"&&(e||!ai.call(t,o))||r.push(o);return r}var Me=ii;function si(t){return ct(t)?gt(t,!0):Me(t)}var G=si;var ni=y(Object,"create"),j=ni;function fi(){this.__data__=j?j(null):{},this.size=0}var Re=fi;function ui(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Le=ui;var di="__lodash_hash_undefined__",pi=Object.prototype,li=pi.hasOwnProperty;function mi(t){var e=this.__data__;if(j){var r=e[t];return r===di?void 0:r}return li.call(e,t)?e[t]:void 0}var We=mi;var ci=Object.prototype,hi=ci.hasOwnProperty;function gi(t){var e=this.__data__;return j?e[t]!==void 0:hi.call(e,t)}var Be=gi;var xi="__lodash_hash_undefined__";function yi(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=j&&e===void 0?xi:e,this}var ke=yi;function H(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}H.prototype.clear=Re;H.prototype.delete=Le;H.prototype.get=We;H.prototype.has=Be;H.prototype.set=ke;var Mt=H;function bi(){this.__data__=[],this.size=0}var Ue=bi;function _i(t,e){for(var r=t.length;r--;)if(pt(t[r][0],e))return r;return-1}var P=_i;var vi=Array.prototype,Ti=vi.splice;function Ei(t){var e=this.__data__,r=P(e,t);if(r<0)return!1;var o=e.length-1;return r==o?e.pop():Ti.call(e,r,1),--this.size,!0}var Ke=Ei;function wi(t){var e=this.__data__,r=P(e,t);return r<0?void 0:e[r][1]}var Ge=wi;function Oi(t){return P(this.__data__,t)>-1}var He=Oi;function Ci(t,e){var r=this.__data__,o=P(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this}var qe=Ci;function q(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}q.prototype.clear=Ue;q.prototype.delete=Ke;q.prototype.get=Ge;q.prototype.has=He;q.prototype.set=qe;var N=q;var ji=y(l,"Map"),D=ji;function Ai(){this.size=0,this.__data__={hash:new Mt,map:new(D||N),string:new Mt}}var ze=Ai;function Si(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var Ve=Si;function Ii(t,e){var r=t.__data__;return Ve(e)?r[typeof e=="string"?"string":"hash"]:r.map}var F=Ii;function Pi(t){var e=F(this,t).delete(t);return this.size-=e?1:0,e}var Je=Pi;function Ni(t){return F(this,t).get(t)}var $e=Ni;function Di(t){return F(this,t).has(t)}var Qe=Di;function Fi(t,e){var r=F(this,t),o=r.size;return r.set(t,e),this.size+=r.size==o?0:1,this}var Ze=Fi;function z(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}z.prototype.clear=ze;z.prototype.delete=Je;z.prototype.get=$e;z.prototype.has=Qe;z.prototype.set=Ze;var Xe=z;function Mi(t,e){for(var r=-1,o=e.length,a=t.length;++r<o;)t[a+r]=e[r];return t}var yt=Mi;var Ri=xt(Object.getPrototypeOf,Object),V=Ri;var Li="[object Object]",Wi=Function.prototype,Bi=Object.prototype,Ye=Wi.toString,ki=Bi.hasOwnProperty,Ui=Ye.call(Object);function Ki(t){if(!h(t)||b(t)!=Li)return!1;var e=V(t);if(e===null)return!0;var r=ki.call(e,"constructor")&&e.constructor;return typeof r=="function"&&r instanceof r&&Ye.call(r)==Ui}var tr=Ki;function Gi(){this.__data__=new N,this.size=0}var er=Gi;function Hi(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var rr=Hi;function qi(t){return this.__data__.get(t)}var or=qi;function zi(t){return this.__data__.has(t)}var ar=zi;var Vi=200;function Ji(t,e){var r=this.__data__;if(r instanceof N){var o=r.__data__;if(!D||o.length<Vi-1)return o.push([t,e]),this.size=++r.size,this;r=this.__data__=new Xe(o)}return r.set(t,e),this.size=r.size,this}var ir=Ji;function J(t){var e=this.__data__=new N(t);this.size=e.size}J.prototype.clear=er;J.prototype.delete=rr;J.prototype.get=or;J.prototype.has=ar;J.prototype.set=ir;var sr=J;function $i(t,e){return t&&I(e,K(e),t)}var nr=$i;function Qi(t,e){return t&&I(e,G(e),t)}var fr=Qi;var lr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ur=lr&&typeof module=="object"&&module&&!module.nodeType&&module,Zi=ur&&ur.exports===lr,dr=Zi?l.Buffer:void 0,pr=dr?dr.allocUnsafe:void 0;function Xi(t,e){if(e)return t.slice();var r=t.length,o=pr?pr(r):new t.constructor(r);return t.copy(o),o}var mr=Xi;function Yi(t,e){for(var r=-1,o=t==null?0:t.length,a=0,i=[];++r<o;){var n=t[r];e(n,r,t)&&(i[a++]=n)}return i}var cr=Yi;function ts(){return[]}var bt=ts;var es=Object.prototype,rs=es.propertyIsEnumerable,hr=Object.getOwnPropertySymbols,os=hr?function(t){return t==null?[]:(t=Object(t),cr(hr(t),function(e){return rs.call(t,e)}))}:bt,$=os;function as(t,e){return I(t,$(t),e)}var gr=as;var is=Object.getOwnPropertySymbols,ss=is?function(t){for(var e=[];t;)yt(e,$(t)),t=V(t);return e}:bt,_t=ss;function ns(t,e){return I(t,_t(t),e)}var xr=ns;function fs(t,e,r){var o=e(t);return B(t)?o:yt(o,r(t))}var vt=fs;function us(t){return vt(t,K,$)}var yr=us;function ds(t){return vt(t,G,_t)}var br=ds;var ps=y(l,"DataView"),Tt=ps;var ls=y(l,"Promise"),Et=ls;var ms=y(l,"Set"),wt=ms;var _r="[object Map]",cs="[object Object]",vr="[object Promise]",Tr="[object Set]",Er="[object WeakMap]",wr="[object DataView]",hs=O(Tt),gs=O(D),xs=O(Et),ys=O(wt),bs=O(ut),M=b;(Tt&&M(new Tt(new ArrayBuffer(1)))!=wr||D&&M(new D)!=_r||Et&&M(Et.resolve())!=vr||wt&&M(new wt)!=Tr||ut&&M(new ut)!=Er)&&(M=function(t){var e=b(t),r=e==cs?t.constructor:void 0,o=r?O(r):"";if(o)switch(o){case hs:return wr;case gs:return _r;case xs:return vr;case ys:return Tr;case bs:return Er}return e});var Q=M;var _s=Object.prototype,vs=_s.hasOwnProperty;function Ts(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&vs.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Or=Ts;var Es=l.Uint8Array,Rt=Es;function ws(t){var e=new t.constructor(t.byteLength);return new Rt(e).set(new Rt(t)),e}var Z=ws;function Os(t,e){var r=e?Z(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Cr=Os;var Cs=/\w*$/;function js(t){var e=new t.constructor(t.source,Cs.exec(t));return e.lastIndex=t.lastIndex,e}var jr=js;var Ar=w?w.prototype:void 0,Sr=Ar?Ar.valueOf:void 0;function As(t){return Sr?Object(Sr.call(t)):{}}var Ir=As;function Ss(t,e){var r=e?Z(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var Pr=Ss;var Is="[object Boolean]",Ps="[object Date]",Ns="[object Map]",Ds="[object Number]",Fs="[object RegExp]",Ms="[object Set]",Rs="[object String]",Ls="[object Symbol]",Ws="[object ArrayBuffer]",Bs="[object DataView]",ks="[object Float32Array]",Us="[object Float64Array]",Ks="[object Int8Array]",Gs="[object Int16Array]",Hs="[object Int32Array]",qs="[object Uint8Array]",zs="[object Uint8ClampedArray]",Vs="[object Uint16Array]",Js="[object Uint32Array]";function $s(t,e,r){var o=t.constructor;switch(e){case Ws:return Z(t);case Is:case Ps:return new o(+t);case Bs:return Cr(t,r);case ks:case Us:case Ks:case Gs:case Hs:case qs:case zs:case Vs:case Js:return Pr(t,r);case Ns:return new o;case Ds:case Rs:return new o(t);case Fs:return jr(t);case Ms:return new o;case Ls:return Ir(t)}}var Nr=$s;function Qs(t){return typeof t.constructor=="function"&&!k(t)?xe(V(t)):{}}var Dr=Qs;var Zs="[object Map]";function Xs(t){return h(t)&&Q(t)==Zs}var Fr=Xs;var Mr=C&&C.isMap,Ys=Mr?U(Mr):Fr,Rr=Ys;var tn="[object Set]";function en(t){return h(t)&&Q(t)==tn}var Lr=en;var Wr=C&&C.isSet,rn=Wr?U(Wr):Lr,Br=rn;var on=1,an=2,sn=4,kr="[object Arguments]",nn="[object Array]",fn="[object Boolean]",un="[object Date]",dn="[object Error]",Ur="[object Function]",pn="[object GeneratorFunction]",ln="[object Map]",mn="[object Number]",Kr="[object Object]",cn="[object RegExp]",hn="[object Set]",gn="[object String]",xn="[object Symbol]",yn="[object WeakMap]",bn="[object ArrayBuffer]",_n="[object DataView]",vn="[object Float32Array]",Tn="[object Float64Array]",En="[object Int8Array]",wn="[object Int16Array]",On="[object Int32Array]",Cn="[object Uint8Array]",jn="[object Uint8ClampedArray]",An="[object Uint16Array]",Sn="[object Uint32Array]",d={};d[kr]=d[nn]=d[bn]=d[_n]=d[fn]=d[un]=d[vn]=d[Tn]=d[En]=d[wn]=d[On]=d[ln]=d[mn]=d[Kr]=d[cn]=d[hn]=d[gn]=d[xn]=d[Cn]=d[jn]=d[An]=d[Sn]=!0;d[dn]=d[Ur]=d[yn]=!1;function Ot(t,e,r,o,a,i){var n,s=e&on,f=e&an,u=e&sn;if(r&&(n=a?r(t,o,a,i):r(t)),n!==void 0)return n;if(!c(t))return t;var v=B(t);if(v){if(n=Or(t),!s)return ye(t,n)}else{var x=Q(t),A=x==Ur||x==pn;if(ht(t))return mr(t,s);if(x==Kr||x==kr||A&&!a){if(n=f||A?{}:Dr(t),!s)return f?xr(t,fr(n,t)):gr(t,nr(n,t))}else{if(!d[x])return a?t:{};n=Nr(t,x,s)}}i||(i=new sr);var E=i.get(t);if(E)return E;i.set(t,n),Br(t)?t.forEach(function(T){n.add(Ot(T,e,r,T,t,i))}):Rr(t)&&t.forEach(function(T,_){n.set(_,Ot(T,e,r,_,t,i))});var At=u?f?br:yr:f?G:K,ot=v?void 0:At(t);return be(ot||t,function(T,_){ot&&(_=T,T=t[_]),lt(n,_,Ot(T,e,r,_,t,i))}),n}var Gr=Ot;var In=1,Pn=4;function Nn(t,e){return e=typeof e=="function"?e:void 0,Gr(t,In|Pn,e)}var Lt=Nn;var Dn=function(){return l.Date.now()},Ct=Dn;var Fn="Expected a function",Mn=Math.max,Rn=Math.min;function Ln(t,e,r){var o,a,i,n,s,f,u=0,v=!1,x=!1,A=!0;if(typeof t!="function")throw new TypeError(Fn);e=Pt(e)||0,c(r)&&(v=!!r.leading,x="maxWait"in r,i=x?Mn(Pt(r.maxWait)||0,e):i,A="trailing"in r?!!r.trailing:A);function E(m){var S=o,Y=a;return o=a=void 0,u=m,n=t.apply(Y,S),n}function At(m){return u=m,s=setTimeout(_,e),v?E(m):n}function ot(m){var S=m-f,Y=m-u,Kt=e-S;return x?Rn(Kt,i-Y):Kt}function T(m){var S=m-f,Y=m-u;return f===void 0||S>=e||S<0||x&&Y>=i}function _(){var m=Ct();if(T(m))return Ut(m);s=setTimeout(_,ot(m))}function Ut(m){return s=void 0,A&&o?E(m):(o=a=void 0,n)}function qr(){s!==void 0&&clearTimeout(s),u=0,o=f=a=s=void 0}function zr(){return s===void 0?n:Ut(Ct())}function St(){var m=Ct(),S=T(m);if(o=arguments,a=this,f=m,S){if(s===void 0)return At(f);if(x)return clearTimeout(s),s=setTimeout(_,e),E(f)}return s===void 0&&(s=setTimeout(_,e)),n}return St.cancel=qr,St.flush=zr,St}var Hr=Ln;function Wn(t){return h(t)&&t.nodeType===1&&!tr(t)}var jt=Wn;var Bn="Expected a function";function kn(t,e,r){var o=!0,a=!0;if(typeof t!="function")throw new TypeError(Bn);return c(r)&&(o="leading"in r?!!r.leading:o,a="trailing"in r?!!r.trailing:a),Hr(t,e,{leading:o,maxWait:e,trailing:a})}var Wt=kn;var X=class extends W{constructor(e,r={}){super(r),this._editor=null,this._initUsingData=!0,this._editables={},this._throttledSave=Wt(this._save.bind(this),typeof r.saveInterval=="number"?r.saveInterval:5e3),e&&(this._creator=(o,a)=>e.create(o,a)),this._destructor=o=>o.destroy()}get editor(){return this._editor}get _item(){return this._editor}setCreator(e){this._creator=e}setDestructor(e){this._destructor=e}_restart(){return Promise.resolve().then(()=>(this.state="initializing",this._fire("stateChange"),this._destroy())).catch(e=>{console.error("An error happened during the editor destroying.",e)}).then(()=>{let e={},r=[],o=this._config.rootsAttributes||{},a={};for(let[n,s]of Object.entries(this._data.roots))s.isLoaded?(e[n]="",a[n]=o[n]||{}):r.push(n);let i=Gt(R({},this._config),{extraPlugins:this._config.extraPlugins||[],lazyRoots:r,rootsAttributes:a,_watchdogInitialData:this._data});return delete i.initialData,i.extraPlugins.push(Bt),this._initUsingData?this.create(e,i,i.context):jt(this._elementOrData)?this.create(this._elementOrData,i,i.context):this.create(this._editables,i,i.context)}).then(()=>{this._fire("restart")})}create(e=this._elementOrData,r=this._config,o){return Promise.resolve().then(()=>(super._startErrorHandling(),this._elementOrData=e,this._initUsingData=typeof e=="string"||Object.keys(e).length>0&&typeof Object.values(e)[0]=="string",this._config=this._cloneEditorConfiguration(r)||{},this._config.context=o,this._creator(e,this._config))).then(a=>{this._editor=a,a.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=a.model.document.version,this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this.state="ready",this._fire("stateChange")})}destroy(){return Promise.resolve().then(()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy()))}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling(),this._throttledSave.cancel();let e=this._editor;return this._editor=null,e.model.document.off("change:data",this._throttledSave),this._destructor(e)})}_save(){let e=this._editor.model.document.version;try{this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this._lastDocumentVersion=e}catch(r){console.error(r,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(e){this._excludedProps=e}_getData(){let e=this._editor,r=e.model.document.roots.filter(s=>s.isAttached()&&s.rootName!="$graveyard"),{plugins:o}=e,a=o.has("CommentsRepository")&&o.get("CommentsRepository"),i=o.has("TrackChanges")&&o.get("TrackChanges"),n={roots:{},markers:{},commentThreads:JSON.stringify([]),suggestions:JSON.stringify([])};r.forEach(s=>{n.roots[s.rootName]={content:JSON.stringify(Array.from(s.getChildren())),attributes:JSON.stringify(Array.from(s.getAttributes())),isLoaded:s._isLoaded}});for(let s of e.model.markers)s._affectsData&&(n.markers[s.name]={rangeJSON:s.getRange().toJSON(),usingOperation:s._managedUsingOperations,affectsData:s._affectsData});return a&&(n.commentThreads=JSON.stringify(a.getCommentThreads({toJSON:!0,skipNotAttached:!0}))),i&&(n.suggestions=JSON.stringify(i.getSuggestions({toJSON:!0,skipNotAttached:!0}))),n}_getEditables(){let e={};for(let r of this.editor.model.document.getRootNames()){let o=this.editor.ui.getEditableElement(r);o&&(e[r]=o)}return e}_isErrorComingFromThisItem(e){return it(this._editor,e.context,this._excludedProps)}_cloneEditorConfiguration(e){return Lt(e,(r,o)=>{if(jt(r)||o==="context")return r})}};var Bt=class{constructor(e){this.editor=e,this._data=e.config.get("_watchdogInitialData")}init(){this.editor.data.on("init",e=>{e.stop(),this.editor.model.enqueueChange({isUndoable:!1},r=>{this._restoreCollaborationData(),this._restoreEditorData(r)}),this.editor.data.fire("ready")},{priority:999})}_createNode(e,r){if("name"in r){let o=e.createElement(r.name,r.attributes);if(r.children)for(let a of r.children)o._appendChild(this._createNode(e,a));return o}else return e.createText(r.data,r.attributes)}_restoreEditorData(e){let r=this.editor;Object.entries(this._data.roots).forEach(([o,{content:a,attributes:i}])=>{let n=JSON.parse(a),s=JSON.parse(i),f=r.model.document.getRoot(o);for(let[u,v]of s)e.setAttribute(u,v,f);for(let u of n){let v=this._createNode(e,u);e.insert(v,f,"end")}}),Object.entries(this._data.markers).forEach(([o,a])=>{let{document:i}=r.model,E=a,{rangeJSON:{start:n,end:s}}=E,f=Ht(E,["rangeJSON"]),u=i.getRoot(n.root),v=e.createPositionFromPath(u,n.path,n.stickiness),x=e.createPositionFromPath(u,s.path,s.stickiness),A=e.createRange(v,x);e.addMarker(o,R({range:A},f))})}_restoreCollaborationData(){let e=JSON.parse(this._data.commentThreads),r=JSON.parse(this._data.suggestions);e.forEach(o=>{let a=this.editor.config.get("collaboration.channelId"),i=this.editor.plugins.get("CommentsRepository");i.hasCommentThread(o.threadId)&&i.getCommentThread(o.threadId).remove(),i.addCommentThread(R({channelId:a},o))}),r.forEach(o=>{let a=this.editor.plugins.get("TrackChangesEditing");if(a.hasSuggestion(o.id)){let i=a.getSuggestion(o.id);i.attributes=o.attributes}else a.addSuggestionData(o)})}};var ac=Symbol("MainQueueId");function Un(t,e){}var g=new Array(256).fill(0).map((t,e)=>("0"+e.toString(16)).slice(-2));function Kn(){let t=Math.random()*4294967296>>>0,e=Math.random()*4294967296>>>0,r=Math.random()*4294967296>>>0,o=Math.random()*4294967296>>>0;return"e"+g[t>>0&255]+g[t>>8&255]+g[t>>16&255]+g[t>>24&255]+g[e>>0&255]+g[e>>8&255]+g[e>>16&255]+g[e>>24&255]+g[r>>0&255]+g[r>>8&255]+g[r>>16&255]+g[r>>24&255]+g[o>>0&255]+g[o>>8&255]+g[o>>16&255]+g[o>>24&255]}var kt="Lock from Angular integration (@ckeditor/ckeditor5-angular)",Tc=(()=>{class t{constructor(r,o){this.config={},this.data="",this.tagName="div",this.disableTwoWayDataBinding=!1,this.ready=new L,this.change=new L,this.blur=new L,this.focus=new L,this.error=new L,this.initiallyDisabled=!1,this.isEditorSettingData=!1,this.id=Kn(),this.ngZone=o,this.elementRef=r;let{CKEDITOR_VERSION:a}=window;if(a){let[i]=a.split(".").map(Number);i<37&&console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.")}else console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')}set disabled(r){this.setDisabledState(r)}get disabled(){return this.editorInstance?this.editorInstance.isReadOnly:this.initiallyDisabled}get editorInstance(){let r=this.editorWatchdog;return this.watchdog&&(r=this.watchdog._watchdogs.get(this.id)),r?r.editor:null}getId(){return this.id}ngOnChanges(r){Object.prototype.hasOwnProperty.call(r,"data")&&r.data&&!r.data.isFirstChange()&&this.writeValue(r.data.currentValue)}ngAfterViewInit(){this.attachToWatchdog()}ngOnDestroy(){return at(this,null,function*(){this.watchdog?yield this.watchdog.remove(this.id):this.editorWatchdog&&this.editorWatchdog.editor&&(yield this.editorWatchdog.destroy(),this.editorWatchdog=void 0)})}writeValue(r){r===null&&(r=""),this.editorInstance?(this.isEditorSettingData=!0,this.editorInstance.data.set(r),this.isEditorSettingData=!1):(this.data=r,this.ready.pipe(qt()).subscribe(o=>{o.data.set(this.data)}))}registerOnChange(r){this.cvaOnChange=r}registerOnTouched(r){this.cvaOnTouched=r}setDisabledState(r){this.editorInstance&&(r?this.editorInstance.enableReadOnlyMode(kt):this.editorInstance.disableReadOnlyMode(kt)),this.initiallyDisabled=r}attachToWatchdog(){let r=(s,f)=>this.ngZone.runOutsideAngular(()=>at(this,null,function*(){this.elementRef.nativeElement.appendChild(s);let u=yield this.editor.create(s,f);return this.initiallyDisabled&&u.enableReadOnlyMode(kt),this.ngZone.run(()=>{this.ready.emit(u)}),this.setUpEditorEvents(u),u})),o=s=>at(this,null,function*(){yield s.destroy(),this.elementRef.nativeElement.removeChild(this.editorElement)}),a=s=>{Gn(this.error)&&this.ngZone.run(()=>this.error.emit(s))},i=document.createElement(this.tagName),n=this.getConfig();if(this.editorElement=i,this.watchdog)this.watchdog.add({id:this.id,type:"editor",creator:r,destructor:o,sourceElementOrData:i,config:n}).catch(s=>{a(s)}),this.watchdog.on("itemError",(s,{itemId:f})=>{f===this.id&&a()});else{let s=new X(this.editor,this.editorWatchdogConfig);s.setCreator(r),s.setDestructor(o),s.on("error",a),this.editorWatchdog=s,this.ngZone.runOutsideAngular(()=>{s.create(i,n).catch(f=>{a(f)})})}}getConfig(){if(this.data&&this.config.initialData)throw new Error("Editor data should be provided either using `config.initialData` or `data` properties.");let r=R({},this.config),o=this.config.initialData||this.data;return o&&(r.initialData=o),r}setUpEditorEvents(r){let o=r.model.document,a=r.editing.view.document;o.on("change:data",i=>{this.ngZone.run(()=>{if(!this.disableTwoWayDataBinding){if(this.cvaOnChange&&!this.isEditorSettingData){let n=r.data.get();this.cvaOnChange(n)}this.change.emit({event:i,editor:r})}})}),a.on("focus",i=>{this.ngZone.run(()=>{this.focus.emit({event:i,editor:r})})}),a.on("blur",i=>{this.ngZone.run(()=>{this.cvaOnTouched&&this.cvaOnTouched(),this.blur.emit({event:i,editor:r})})})}}return t.\u0275fac=function(r){return new(r||t)(It(Zt),It(Xt))},t.\u0275cmp=Jt({type:t,selectors:[["ckeditor"]],inputs:{editor:"editor",config:"config",data:"data",tagName:"tagName",watchdog:"watchdog",editorWatchdogConfig:"editorWatchdogConfig",disableTwoWayDataBinding:"disableTwoWayDataBinding",disabled:"disabled"},outputs:{ready:"ready",change:"change",blur:"blur",focus:"focus",error:"error"},features:[te([{provide:re,useExisting:zt(()=>t),multi:!0}]),Qt],decls:1,vars:0,template:function(r,o){r&1&&Yt(0,Un,0,0,"ng-template")},encapsulation:2}),t})();function Gn(t){return t.observed||t.observers.length>0}var Ec=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=$t({type:t}),t.\u0275inj=Vt({imports:[[oe,ee]]}),t})();export{Tc as a,Ec as b};