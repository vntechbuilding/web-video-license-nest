import{Ba as r}from"./chunk-E7AKRIK7.js";import{b as n}from"./chunk-3D2PYGCY.js";import{ia as a,na as l}from"./chunk-KXMLQHF5.js";var h=(()=>{let e=class e{constructor(t){this.http=t}getAllTemplate(t=9999,i=0){return this.http.get(r.apiUrl+`template?perPage=${t}&page=${i}`)}createTemplate(t){return this.http.post(r.apiUrl+"template",t)}updateTemplate(t){return this.http.put(r.apiUrl+"template",t)}updateZip(t){return this.http.put(r.apiUrl+"template/zip",t)}deleteTemplate(t){return this.http.delete(r.apiUrl+`template/${t}`)}};e.\u0275fac=function(i){return new(i||e)(l(n))},e.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"});let p=e;return p})();export{h as a};