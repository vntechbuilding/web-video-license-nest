import{c as p,m as f}from"./chunk-E7AKRIK7.js";import{Da as a,La as d,Ra as c,hb as n,nb as m,s as r,va as s}from"./chunk-KXMLQHF5.js";var l="nz-animate-disabled",D=(()=>{let e=class e{constructor(t,o,u){this.element=t,this.renderer=o,this.animationType=u,this.nzNoAnimation=!1}ngOnChanges(){this.updateClass()}ngAfterViewInit(){this.updateClass()}updateClass(){let t=p(this.element);t&&(this.nzNoAnimation||this.animationType==="NoopAnimations"?this.renderer.addClass(t,l):this.renderer.removeClass(t,l))}};e.\u0275fac=function(o){return new(o||e)(n(d),n(m),n(c,8))},e.\u0275dir=s({type:e,selectors:[["","nzNoAnimation",""]],inputs:{nzNoAnimation:"nzNoAnimation"},exportAs:["nzNoAnimation"],standalone:!0,features:[a]});let i=e;return r([f()],i.prototype,"nzNoAnimation",void 0),i})();export{D as a};