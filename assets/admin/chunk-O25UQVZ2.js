import{Ba as r}from"./chunk-E7AKRIK7.js";import{b as h}from"./chunk-3D2PYGCY.js";import{ia as s,na as l}from"./chunk-KXMLQHF5.js";var c=(()=>{let e=class e{constructor(t){this.http=t}getAllPublisher(t=9999,i=0){return this.http.get(r.apiUrl+`publisher?perPage=${t}&page=${i}`)}getAllUserPublisher(t,i=9999,a=0){return this.http.get(r.apiUrl+`publisher/user/${t}?perPage=${i}&page=${a}`)}createPublisher(t){return this.http.post(r.apiUrl+"publisher",t)}updatePublisher(t){return this.http.put(r.apiUrl+"publisher",t)}deletePublisher(t){return this.http.delete(r.apiUrl+`publisher/${t}`)}};e.\u0275fac=function(i){return new(i||e)(l(h))},e.\u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"});let p=e;return p})();export{c as a};
