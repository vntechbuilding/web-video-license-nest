import{Ba as r}from"./chunk-E7AKRIK7.js";import{b as s}from"./chunk-3D2PYGCY.js";import{a,b as p,ia as u,na as l}from"./chunk-KXMLQHF5.js";var U=(()=>{let e=class e{constructor(t){this.http=t}getAllMenu(){return this.http.get(r.apiUrl+"menu")}getAllUserMenu(t){return this.http.get(r.apiUrl+`menu/user/${t}`)}getAllDomainMenu(t){return this.http.get(r.apiUrl+`menu/domain/${t}`)}createMenu(t){return this.http.post(r.apiUrl+"menu",t)}updateMenu(t){return this.http.put(r.apiUrl+"menu",t)}deleteMenu(t){return this.http.delete(r.apiUrl+`menu/${t}`)}};e.\u0275fac=function(o){return new(o||e)(l(s))},e.\u0275prov=u({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var h=(n,e=0)=>{let i=[];for(let t of n){let o=p(a({},t),{text:"--".repeat(e*2)+t.text});if(i.push(o),t.children){let c=h(t.children,e+1);i=i.concat(c)}}return i};export{h as a,U as b};
