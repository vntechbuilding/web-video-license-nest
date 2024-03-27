import{Ba as L}from"./chunk-E7AKRIK7.js";import{b as J,m as K}from"./chunk-3D2PYGCY.js";import{I as N,K as P,Qa as j,S as U,_ as M,ba as k,dd as T,ea as G,ia as c,ja as Z,la as m,m as x,n as I,na as n,o as F,pb as S,u as a,ua as q,vc as B,y as g}from"./chunk-KXMLQHF5.js";var H=(()=>{let e=class e{constructor(t,s){this.http=t,this.router=s,this.isCheckLocal$=new I(!1)}loginUrl(t){return this.router.navigate(["/auth","login"],{queryParams:{retUrl:t}})}resetToken(t,s){return this.http.get(L.apiUrl+"auth",{headers:{Authorization:`${t}`,token:s}})}loginRequest(t,s){return this.http.post(L.apiUrl+"auth",{username:t,password:s}).pipe(g(o=>o))}};e.\u0275fac=function(s){return new(s||e)(n(J),n(K))},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();var d=function(r){return r.Local="local_strategy",r.Session="session_strategy",r.InMemory="in_memory_strategy",r}(d||{}),A=class{static isStorageAvailable(e){let i=!0;try{typeof e=="object"?(e.setItem("test-storage","foobar"),e.removeItem("test-storage")):i=!1}catch{i=!1}return i}};function D(){}var ee="ngx-webstorage",te="|",se=!1,p=(()=>{let e=class e{static normalize(t){return t=e.isCaseSensitive?t:t.toLowerCase(),`${e.prefix}${e.separator}${t}`}static isNormalizedKey(t){return t.indexOf(e.prefix+e.separator)===0}static setPrefix(t){e.prefix=t}static setSeparator(t){e.separator=t}static setCaseSensitive(t){e.isCaseSensitive=t}static consumeConfiguration(t){"prefix"in t&&this.setPrefix(t.prefix),"separator"in t&&this.setSeparator(t.separator),"caseSensitive"in t&&this.setCaseSensitive(t.caseSensitive)}};e.prefix=ee,e.separator=te,e.isCaseSensitive=se;let r=e;return r})(),f=class{constructor(e){this.strategy=e}retrieve(e){let i;return this.strategy.get(p.normalize(e)).subscribe(t=>i=typeof t>"u"?null:t),i}store(e,i){return this.strategy.set(p.normalize(e),i).subscribe(D),i}clear(e){e!==void 0?this.strategy.del(p.normalize(e)).subscribe(D):this.strategy.clear().subscribe(D)}getStrategyName(){return this.strategy.name}observe(e){return e=p.normalize(e),this.strategy.keyChanges.pipe(N(i=>i===null||i===e),k(()=>this.strategy.get(e)),U(),M({refCount:!0,bufferSize:1}))}};var $=(()=>{let e=class e{constructor(){this.caches={}}get(t,s){return this.getCacheStore(t)[s]}set(t,s,o){this.getCacheStore(t)[s]=o}del(t,s){delete this.getCacheStore(t)[s]}clear(t){this.caches[t]={}}getCacheStore(t){return t in this.caches?this.caches[t]:this.caches[t]={}}};e.\u0275fac=function(s){return new(s||e)},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})(),Y=new m("window_local_storage");function ie(){return typeof window<"u"?window.localStorage:null}var re={provide:Y,useFactory:ie},W=new m("window_session_storage");function ne(){return typeof window<"u"?window.sessionStorage:null}var ae={provide:W,useFactory:ne},C=class{constructor(e,i){this.storage=e,this.cache=i,this.keyChanges=new x}get isAvailable(){return this._isAvailable===void 0&&(this._isAvailable=A.isStorageAvailable(this.storage)),this._isAvailable}get(e){let i=this.cache.get(this.name,e);if(i!==void 0)return a(i);try{let t=this.storage.getItem(e);t!==null&&(i=JSON.parse(t),this.cache.set(this.name,e,i))}catch(t){console.warn(t)}return a(i)}set(e,i){let t=JSON.stringify(i);return this.storage.setItem(e,t),this.cache.set(this.name,e,i),this.keyChanges.next(e),a(i)}del(e){return this.storage.removeItem(e),this.cache.del(this.name,e),this.keyChanges.next(e),a(null)}clear(){return this.storage.clear(),this.cache.clear(this.name),this.keyChanges.next(null),a(null)}},h=class h extends C{constructor(e,i,t,s){super(e,i),this.storage=e,this.cache=i,this.platformId=t,this.zone=s,this.name=h.strategyName,T(this.platformId)&&this.listenExternalChanges()}listenExternalChanges(){window.addEventListener("storage",e=>this.zone.run(()=>{if(e.storageArea!==this.storage)return;let i=e.key;i!==null?this.cache.del(this.name,e.key):this.cache.clear(this.name),this.keyChanges.next(i)}))}};h.strategyName=d.Local,h.\u0275fac=function(i){return new(i||h)(n(Y),n($),n(j),n(S))},h.\u0275prov=c({token:h,factory:h.\u0275fac});var E=h,l=class l extends C{constructor(e,i,t,s){super(e,i),this.storage=e,this.cache=i,this.platformId=t,this.zone=s,this.name=l.strategyName,T(this.platformId)&&this.listenExternalChanges()}listenExternalChanges(){window.addEventListener("storage",e=>this.zone.run(()=>{if(e.storageArea!==this.storage)return;let i=e.key;e.key!==null?this.cache.del(this.name,e.key):this.cache.clear(this.name),this.keyChanges.next(i)}))}};l.strategyName=d.Session,l.\u0275fac=function(i){return new(i||l)(n(W),n($),n(j),n(S))},l.\u0275prov=c({token:l,factory:l.\u0275fac});var R=l,u=class u{constructor(e){this.cache=e,this.keyChanges=new x,this.isAvailable=!0,this.name=u.strategyName}get(e){return a(this.cache.get(this.name,e))}set(e,i){return this.cache.set(this.name,e,i),this.keyChanges.next(e),a(i)}del(e){return this.cache.del(this.name,e),this.keyChanges.next(e),a(null)}clear(){return this.cache.clear(this.name),this.keyChanges.next(null),a(null)}};u.strategyName=d.InMemory,u.\u0275fac=function(i){return new(i||u)(n($))},u.\u0275prov=c({token:u,factory:u.\u0275fac});var z=u,w=new m("STORAGE_STRATEGIES"),oe=[{provide:w,useClass:z,multi:!0},{provide:w,useClass:E,multi:!0},{provide:w,useClass:R,multi:!0}];var Q="invalid_strategy",v=(()=>{let e=class e{constructor(t){this.strategies=t,this.registration$=new x,t||(t=[]),this.strategies=t.reverse().map((s,o,b)=>s.name).map((s,o,b)=>b.indexOf(s)===o?o:null).filter(s=>s!==null).map(s=>t[s])}static get(t){if(!this.isStrategyRegistered(t))throw Error(Q);let s=this.index[t];return s.isAvailable||(s=this.index[d.InMemory]),s}static set(t,s){this.index[t]=s}static clear(t){t!==void 0?delete this.index[t]:this.index={}}static isStrategyRegistered(t){return t in this.index}static hasRegistredStrategies(){return Object.keys(this.index).length>0}getStrategy(t){return e.get(t)}indexStrategies(){this.strategies.forEach(t=>this.register(t.name,t))}indexStrategy(t,s=!1){if(e.isStrategyRegistered(t)&&!s)return e.get(t);let o=this.strategies.find(b=>b.name===t);if(!o)throw new Error(Q);return this.register(t,o,s),o}register(t,s,o=!1){(!e.isStrategyRegistered(t)||o)&&(e.set(t,s),this.registration$.next(t))}};e.index={},e.\u0275fac=function(s){return new(s||e)(n(w,8))},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})(),y=class extends f{};function ce(r){let e=r.indexStrategy(d.Local);return new f(e)}var he={provide:y,useFactory:ce,deps:[v]},O=class extends f{};function le(r){let e=r.indexStrategy(d.Session);return new f(e)}var ue={provide:O,useFactory:le,deps:[v]};var de=[he,ue],X=new m("ngx_webstorage_config");function fe(r){return r.indexStrategies(),()=>v.index}var Te=(()=>{let e=class e{constructor(t,s){s?p.consumeConfiguration(s):console.error("NgxWebstorage : Possible misconfiguration (The forRoot method usage is mandatory since the 3.0.0)")}static forRoot(t={}){return{ngModule:e,providers:[{provide:X,useValue:t},re,ae,...de,...oe,{provide:B,useFactory:fe,deps:[v],multi:!0}]}}};e.\u0275fac=function(s){return new(s||e)(n(v),n(X,8))},e.\u0275mod=q({type:e}),e.\u0275inj=Z({});let r=e;return r})();var De=(()=>{let e=class e{constructor(t,s){this.auth=t,this.localSt=s,this.token$=new I(null),this.tokenId=null,this.memberId=null,this.userData=null,this.userData$=new F(1)}loadToken(){return a(this.getLocalUserData()).pipe(k(t=>t&&t.accessToken?this.auth.resetToken(t.refreshToken,t.token).pipe(G(s=>{this.setToken(s)}),P(s=>(this.removeToken(),a(!1)))):(this.removeToken(),a(!1))))}getLocalUserData(){return this.localSt.retrieve("adminData")}removeLocalUserData(){this.localSt.clear("adminData")}setLocalUserData(t){this.localSt.store("adminData",t)}removeToken(){this.token$.next(""),this.userData$.next(null),this.userData=null,this.tokenId="",this.memberId="",this.removeLocalUserData()}setToken(t){this.tokenId=t.token,this.memberId=t.userId,this.token$.next(t.accessToken),this.userData=t,this.userData$.next(t),this.setLocalUserData(t)}getLocalAccessToken(){let t=this.getLocalUserData();return t?t.accessToken:null}getLocalRefreshToken(){let t=this.getLocalUserData();return t?t.refreshToken:null}checkLocalAccessToken(){return a(this.getLocalUserData()).pipe(g(t=>t&&t.accessToken&&t.accessToken!==this.token$.value?(this.tokenId=t.token,this.memberId=t.userId,this.token$.next(t.accessToken),!0):!1))}};e.\u0275fac=function(s){return new(s||e)(n(H),n(y))},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();export{H as a,Te as b,De as c};
