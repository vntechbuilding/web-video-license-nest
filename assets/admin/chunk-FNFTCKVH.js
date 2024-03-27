import{a as ot,c as nt}from"./chunk-GAHYWOGS.js";import{a as H,b as K,m as Q,n as X,o as Y,q as Z,r as $,s as tt,t as et,u as v}from"./chunk-53LNINAL.js";import"./chunk-PUH3HP37.js";import{O as it,P as rt,d as _,e as z,g as T,h as k,l as P,n as V,o as O,q as U,r as R,s as B,t as q,u as L,w as J,x as W}from"./chunk-TEFF5QW5.js";import{F as G}from"./chunk-E7AKRIK7.js";import"./chunk-SE4MWOQF.js";import{k as j,m as A}from"./chunk-3D2PYGCY.js";import{Ea as N,Fa as C,Kb as n,Lb as l,Mb as h,Nb as F,Ob as I,Qb as x,Tb as E,Tc as D,Vb as g,dc as d,gb as f,hb as o,ia as y,lc as M,na as S,ta as b,wb as w,yb as m}from"./chunk-KXMLQHF5.js";var at=(()=>{let i=class i{constructor(t){this.notification=t}markAsDirty(t){Object.values(t.controls).forEach(e=>{e.invalid&&(e.markAsDirty(),e.updateValueAndValidity({onlySelf:!0}))})}setError(t,e,u){if(t.status==400&&t.error&&t.error.message){let p=t.error.message;return p&&Array.isArray(p)?p.forEach(a=>{let s=u.controls[a.property];s&&(e[a.property]=a.message,s.markAsDirty(),s.markAsTouched(),s.setErrors({error:a.message,info:"incorrect"},1))}):this.notification.unknownError(),e}return e}};i.\u0275fac=function(e){return new(e||i)(S(v))},i.\u0275prov=y({token:i,factory:i.\u0275fac,providedIn:"root"});let r=i;return r})();function pt(r,i){if(r&1){let c=x();F(0),n(1,"form",1),E("ngSubmit",function(){N(c);let e=g();return C(e.submitForm())}),n(2,"label",2),d(3,"Username"),l(),n(4,"nz-form-item")(5,"nz-form-control",3)(6,"nz-input-group",4),h(7,"input",5),l()()(),n(8,"label",6),d(9,"Password"),l(),n(10,"nz-form-item")(11,"nz-form-control",3)(12,"nz-input-group",7),h(13,"input",8),l()()(),n(14,"div",9)(15,"button",10),d(16," Login "),l()()(),I()}if(r&2){let c=g();f(),m("formGroup",c.validateForm),f(4),m("nzErrorTip",c.errors.username),f(6),m("nzErrorTip",c.errors.password),f(4),m("nzType","primary")}}var jt=(()=>{let i=class i{constructor(t,e,u,p,a,s,st,mt){this.fb=t,this.authService=e,this.notification=u,this.form=p,this.aRouter=a,this.router=s,this.jwtDataStorage=st,this.nzModal=mt,this.isSubmit=!1,this.errors={username:"Username is not valid!",password:"Password is not valid!"}}submitForm(){this.validateForm.valid&&!this.isSubmit?(this.isSubmit=!0,this.authService.loginRequest(this.validateForm.value.username,this.validateForm.value.password).subscribe({complete:()=>{},error:t=>{this.isSubmit=!1,this.errors=this.form.setError(t,this.errors,this.validateForm),this.isSubmit=!1},next:t=>{if(t&&t.accessToken){this.jwtDataStorage.setToken(t);let e=this.aRouter.snapshot.queryParams.retUrl;e?this.router.navigateByUrl(e).then():this.router.navigateByUrl("/").then()}else this.notification.unknownError()}})):Object.values(this.validateForm.controls).forEach(t=>{t.invalid&&(t.markAsDirty(),t.updateValueAndValidity({onlySelf:!0}))})}ngOnDestroy(){}ngOnInit(){this.nzModal.closeAll(),this.validateForm=this.fb.group({username:[null,[z.required]],password:[null,[z.required]],remember:[!0]})}};i.\u0275fac=function(e){return new(e||i)(o(U),o(ot),o(v),o(at),o(j),o(A),o(nt),o(it))},i.\u0275cmp=b({type:i,selectors:[["app-login"]],standalone:!0,features:[M],decls:1,vars:1,consts:[[4,"ngIf"],["nz-form","",1,"login-form",3,"ngSubmit","formGroup"],["for","username",1,"custom-label"],[3,"nzErrorTip"],["nzPrefixIcon","user"],["id","username","type","text","nz-input","","formControlName","username","placeholder","Username"],["for","password",1,"custom-label"],["nzPrefixIcon","lock"],["id","password","type","password","nz-input","","formControlName","password","placeholder","Password"],[1,"text-center"],["nz-button","","type","submit",1,"login-form-button","login-form-margin",3,"nzType"]],template:function(e,u){e&1&&w(0,pt,17,4,"ng-container",0),e&2&&m("ngIf",u.validateForm)},dependencies:[G,W,J,q,L,Z,K,H,X,Q,Y,et,$,tt,rt,R,P,_,T,k,D,B,V,O],styles:[".login-form[_ngcontent-%COMP%]{max-width:300px;margin:auto}.login-form-margin[_ngcontent-%COMP%]{margin-bottom:16px}.login-form-forgot[_ngcontent-%COMP%]{float:right}.login-form-button[_ngcontent-%COMP%]{width:100%}"]});let r=i;return r})();export{jt as LoginComponent};