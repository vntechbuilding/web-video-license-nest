import{a as _r,b as Cr,c as hr,d as Mr,e as wr}from"./chunk-G4JSADAS.js";import{a as cr}from"./chunk-AVOTTRO7.js";import"./chunk-ZDAHY7KC.js";import"./chunk-O25UQVZ2.js";import{a as Er}from"./chunk-UVZ7OHOK.js";import{a as le,b as yr}from"./chunk-E2MPIU5O.js";import{a as dr,b as se}from"./chunk-U22GUFMB.js";import{a as me,b as pe}from"./chunk-QCY6BLAQ.js";import{a as gr}from"./chunk-HUONOAPD.js";import"./chunk-W244JUTK.js";import"./chunk-PSR5DFFY.js";import"./chunk-5TKBH2EH.js";import"./chunk-FTHBAHA3.js";import{a as Kr}from"./chunk-SLOIDIPU.js";import{d as fr}from"./chunk-FCOSAHCS.js";import"./chunk-7XZ66E5Q.js";import{a as ur}from"./chunk-W72PHP5T.js";import"./chunk-HHG4OQGC.js";import{a as Qr}from"./chunk-ASNUN4YP.js";import{a as ne,b as ae}from"./chunk-YANWLB2B.js";import{a as H,b as Jr,d as sr,e as lr,f as Yr,g as Zr,h as K,j as $r,k as xr,l as re,m as ee,n as oe,o as te,p as ie}from"./chunk-CIAYRUPY.js";import"./chunk-OC6OS4EK.js";import{a as A,b as L,c as k,m as O,n as mr,o as R,p as X,q as j,r as pr,t as q}from"./chunk-53LNINAL.js";import"./chunk-PUH3HP37.js";import{a as Xr,d as nr,e as I,g as F,h as V,l as ar,n as D,o as T,r as jr,s as W,t as B,u as G,w as P,x as U}from"./chunk-TEFF5QW5.js";import{Ba as _,E as qr,F as Hr}from"./chunk-E7AKRIK7.js";import"./chunk-SE4MWOQF.js";import{b as Rr}from"./chunk-3D2PYGCY.js";import{Ea as Q,Fa as Y,Kb as t,Lb as i,Ma as Ur,Mb as C,Nb as $,Ob as x,Qb as Sr,Sc as or,Tb as h,Tc as tr,Vb as y,Yb as Ir,Zb as Nr,Zc as ir,_c as Or,a as Fr,b as Vr,ba as Wr,bd as S,cb as Z,cc as Ar,dc as E,ec as b,gb as a,ha as Br,hb as w,hc as f,ia as Gr,ic as d,jc as g,kc as Lr,lc as z,mc as kr,na as Pr,o as Dr,pc as N,qc as rr,rb as v,rc as er,ta as c,wb as M,y as Tr,yb as o}from"./chunk-KXMLQHF5.js";function Me(s,p){if(s&1&&C(0,"nz-option",6),s&2){let l=p.$implicit;o("nzValue",l.id)("nzLabel",l.title)}}function ce(s,p){if(s&1&&($(0),M(1,Me,1,2,"nz-option",5),x()),s&2){let l=p.$implicit;a(),o("ngForOf",l)}}var zr=(()=>{let p=class p extends Qr{constructor(n){super(),this.newsCategoryService=n,this.loadData$=new Dr,this.category$=this.loadData$.pipe(Wr(m=>m?this.newsCategoryService.allDomainCategory(m):[]),Tr(m=>this.flattenCategories(m))),this.flattenCategories=me,this.categoryId=new Ur,this.allowClear=!1}ngOnInit(){this.addControl("categoryId",this.validators.categoryId,this.defaultValue.categoryId),this.domainIdSubscription=this.formGroup.get("domainId")?.valueChanges.subscribe(n=>this.loadData$.next(n)),this.categoryIdSubscription=this.formGroup.get("userId")?.valueChanges.subscribe(n=>{this.categoryId.next(n)}),this.defaultValue.domainId&&this.loadData$.next(this.defaultValue.domainId)}ngOnDestroy(){this.domainIdSubscription&&this.domainIdSubscription.unsubscribe(),this.categoryIdSubscription&&this.categoryIdSubscription.unsubscribe()}};p.\u0275fac=function(m){return new(m||p)(w(pe))},p.\u0275cmp=c({type:p,selectors:[["app-category-input-by-domain"]],inputs:{allowClear:"allowClear"},outputs:{categoryId:"categoryId"},standalone:!0,features:[Lr([{provide:Xr,useExisting:Br(()=>p),multi:!0}]),v,z],decls:8,vars:10,consts:[[3,"formGroup"],["nzFor","categoryId",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["formControlName","categoryId","nzShowSearch","",3,"nzAllowClear"],[4,"ngIf"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[3,"nzValue","nzLabel"]],template:function(m,r){m&1&&(t(0,"div",0)(1,"nz-form-item")(2,"nz-form-label",1),E(3,"Danh m\u1EE5c"),i(),t(4,"nz-form-control",2)(5,"nz-select",3),M(6,ce,2,1,"ng-container",4),N(7,"async"),i()()()()),m&2&&(o("formGroup",r.formGroup),a(2),o("nzSm",10)("nzXs",24),a(2),o("nzSm",14)("nzXs",24)("nzErrorTip",r.formErrors.categoryId),a(),o("nzAllowClear",r.allowClear),a(),o("ngIf",rr(7,8,r.category$)))},dependencies:[j,L,A,O,X,R,K,Yr,Zr,k,W,F,V,D,T,q,S,or,tr,ir]});let s=p;return s})();var J=(()=>{let p=class p{constructor(n){this.http=n}getAllNews(n=9999,m=0){return this.http.get(_.apiUrl+`news?perPage=${n}&page=${m}`)}getAllUserNews(n,m=9999,r=0){return this.http.get(_.apiUrl+`news/user/${n}?perPage=${m}&page=${r}`)}getAllDomainNews(n,m=9999,r=0){return this.http.get(_.apiUrl+`news/domain/${n}?perPage=${m}&page=${r}`)}getAllCategoryNews(n,m=9999,r=0){return this.http.get(_.apiUrl+`news/category/${n}?perPage=${m}&page=${r}`)}createNews(n){return this.http.post(_.apiUrl+"news",n)}updateNews(n){return this.http.put(_.apiUrl+"news",n)}deleteNews(n){return this.http.delete(_.apiUrl+`news/${n}`)}};p.\u0275fac=function(m){return new(m||p)(Pr(Rr))},p.\u0275prov=Gr({token:p,factory:p.\u0275fac,providedIn:"root"});let s=p;return s})();var ve=()=>({}),ye=(()=>{let p=class p extends H(sr,lr){constructor(n){super(),this.newsService=n,this.uploadContentImageUrl=_.uploadMetaImageThumbnailUrl,this.validators={},this._formErrorMsg={domain:{required:"Domain kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"},userId:{required:"User kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"}}}ngOnInit(){this.validateForm=this.fb.group({title:["",[I.required]],userId:["",[I.required]],domainId:["",[I.required]]})}submitForm(){this.formValid()&&this.newsService.createNews(this.removeBlankString(this.validateForm.value)).pipe(this.httpErrorOperator("domain")).subscribe(n=>{this.destroyModal(n)})}};p.\u0275fac=function(m){return new(m||p)(w(J))},p.\u0275cmp=c({type:p,selectors:[["app-news-create"]],standalone:!0,features:[v,z],decls:23,vars:82,consts:[["nz-form","",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["nz-input","","formControlName","title","id","title"],["label","Ng\xE0y t\u1EA3i l\xEAn","dateField","uploadDate",3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","defaultValue"],[3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","label","defaultValue","defaultField","aspectRatio","uploadContentImageUrl"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","Kh\xF3a b\xE0i vi\u1EBFt",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors","allowClear"],["label","M\xF4 t\u1EA3","field","summary",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","N\u1ED9i dung","field","content",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled"]],template:function(m,r){m&1&&(t(0,"form",0),h("ngSubmit",function(){return r.submitForm()}),t(1,"nz-form-item")(2,"nz-form-label",1),E(3,"Ti\xEAu \u0111\u1EC1"),i(),t(4,"nz-form-control",2),C(5,"input",3),i()(),t(6,"app-date-input",4),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(7,"app-content-image-input",5),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(8,"app-head-meta-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(9,"app-rating-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(10,"app-user-id-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(11,"app-domain-input-by-user",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(12,"app-category-input-by-domain",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(13,"app-disabled-input",7),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(14,"app-video-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(15,"app-author-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(16,"app-publisher-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(17,"app-input-text-area",9),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(18,"app-input-ckeditor",10),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(19,"nz-form-item",11)(20,"nz-form-control",12)(21,"button",13),E(22,"T\u1EA1o tin t\u1EE9c"),i()()()()),m&2&&(o("formGroup",r.validateForm),a(2),o("nzSm",10)("nzXs",24),a(2),o("nzSm",14)("nzXs",24)("nzErrorTip",r.formErrors.title),a(2),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("defaultValue",kr(81,ve)),a(),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("label","H\xECnh \u1EA3nh")("defaultValue",r.defaultValue)("defaultField","image")("aspectRatio",16/9)("uploadContentImageUrl",r.uploadContentImageUrl),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(2),o("nzSpan",12)("nzOffset",8),a(),o("disabled",!r.validateForm.valid))},dependencies:[j,L,A,mr,O,X,R,k,U,P,B,G,q,pr,W,ar,nr,F,V,D,T,K,S,fr,dr,gr,ur,_r,yr,zr,Cr,hr,Mr,Er,cr,wr]});let s=p;return s})();var Ce=(()=>{let p=class p extends H(sr,lr){constructor(n){super(),this.newsService=n,this.uploadContentImageUrl=_.uploadMetaImageThumbnailUrl,this.validators={},this._formErrorMsg={domain:{required:"Domain kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"},userId:{required:"User kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"}}}ngOnInit(){this.defaultValue=this.nzModalData,this.defaultValue.userId=this.nzModalData.domain?.userId,this.validateForm=this.fb.group({title:[this.nzModalData.title,[I.required]],userId:[this.nzModalData.domain?.userId,[I.required]],domainId:[this.nzModalData.domainId,[I.required]]})}submitForm(){this.formValid()&&this.newsService.updateNews(Vr(Fr({},this.removeBlankString(this.validateForm.value)),{newsId:this.nzModalData.id})).pipe(this.httpErrorOperator("domain")).subscribe(n=>{this.destroyModal(n)})}};p.\u0275fac=function(m){return new(m||p)(w(J))},p.\u0275cmp=c({type:p,selectors:[["app-news-edit"]],standalone:!0,features:[v,z],decls:23,vars:81,consts:[["nz-form","",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["nz-input","","formControlName","title","id","title"],["label","Ng\xE0y t\u1EA3i l\xEAn","dateField","uploadDate",3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","defaultValue"],[3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","label","defaultValue","defaultField","aspectRatio","uploadContentImageUrl"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","Kh\xF3a b\xE0i vi\u1EBFt",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors","allowClear"],["label","M\xF4 t\u1EA3","field","summary",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","N\u1ED9i dung","field","content",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled"]],template:function(m,r){m&1&&(t(0,"form",0),h("ngSubmit",function(){return r.submitForm()}),t(1,"nz-form-item")(2,"nz-form-label",1),E(3,"Ti\xEAu \u0111\u1EC1"),i(),t(4,"nz-form-control",2),C(5,"input",3),i()(),t(6,"app-date-input",4),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(7,"app-content-image-input",5),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(8,"app-head-meta-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(9,"app-rating-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(10,"app-user-id-input",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(11,"app-domain-input-by-user",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(12,"app-category-input-by-domain",6),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(13,"app-disabled-input",7),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(14,"app-video-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(15,"app-author-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(16,"app-publisher-input-by-user",8),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(17,"app-input-text-area",9),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(18,"app-input-ckeditor",10),g("formErrorMsgChange",function(e){return d(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(19,"nz-form-item",11)(20,"nz-form-control",12)(21,"button",13),E(22,"C\u1EADp nh\u1EADt tin t\u1EE9c"),i()()()()),m&2&&(o("formGroup",r.validateForm),a(2),o("nzSm",10)("nzXs",24),a(2),o("nzSm",14)("nzXs",24)("nzErrorTip",r.formErrors.title),a(2),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("defaultValue",r.defaultValue),a(),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("label","H\xECnh \u1EA3nh")("defaultValue",r.defaultValue)("defaultField","image")("aspectRatio",16/9)("uploadContentImageUrl",r.uploadContentImageUrl),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(2),o("nzSpan",12)("nzOffset",8),a(),o("disabled",!r.validateForm.valid))},dependencies:[j,L,A,mr,O,X,R,k,U,P,B,G,q,pr,W,ar,nr,F,V,D,T,K,S,fr,dr,gr,ur,_r,yr,zr,Cr,hr,Mr,Er,cr,wr]});let s=p;return s})();function ze(s,p){if(s&1&&(t(0,"a",13),C(1,"img",14),i()),s&2){let l=y().$implicit,n=y(2);Nr("href","",n.videoUploadPath,"",l.video.file,"",Z),a(),Nr("src","",n.imageUploadPath,"",l.video.thumbnail,"",Z)}}function Se(s,p){if(s&1&&C(0,"img",14),s&2){let l=y().$implicit,n=y(2);Ir("src",n.imageUploadPath+l.image,Z)}}function Ie(s,p){if(s&1&&($(0),t(1,"a",13),N(2,"domainUrl"),E(3),i(),x()),s&2){let l=y().$implicit;a(),Ir("href",er(2,2,l.url,l.domain),Z),a(2),b(l.url)}}function Ne(s,p){if(s&1){let l=Sr();t(0,"tr")(1,"td"),E(2),N(3,"date"),i(),t(4,"td"),E(5),N(6,"date"),i(),t(7,"td"),E(8),i(),t(9,"td"),E(10),i(),t(11,"td"),M(12,ze,2,6,"a",9),i(),t(13,"td"),M(14,Se,1,1,"img",10),i(),t(15,"td"),M(16,Ie,4,5,"ng-container",3),i(),t(17,"td")(18,"button",11),h("click",function(){let m=Q(l).$implicit,r=y(2);return Y(r.edit(m))}),E(19,"S\u1EEDa"),i(),t(20,"button",12),h("nzOnConfirm",function(){let m=Q(l).$implicit,r=y(2);return Y(r.delete(m))}),E(21,"X\xF3a"),i()()()}if(s&2){let l=p.$implicit;a(2),b(er(3,7,l.createdAt,"dd/MM/yyyy hh:mm")),a(3),b(er(6,10,l.uploadDate,"dd/MM/yyyy hh:mm:ss")),a(3),b(l.title),a(2),b(l.category==null?null:l.category.title),a(2),o("ngIf",l.video),a(2),o("ngIf",l.image),a(2),o("ngIf",l.domain)}}function be(s,p){if(s&1){let l=Sr();$(0),t(1,"nz-table",4,0),h("nzPageIndexChange",function(m){Q(l);let r=y();return Y(r.changePage(m))}),t(3,"thead")(4,"tr")(5,"th"),E(6,"Th\u01A1\u0300i gian kh\u1EDFi t\u1EA1o"),i(),t(7,"th"),E(8,"Th\u01A1\u0300i gian T\u1EA3i l\xEAn"),i(),t(9,"th"),E(10,"Tin t\u1EE9c"),i(),t(11,"th"),E(12,"Danh m\u1EE5c"),i(),t(13,"th"),E(14,"Video"),i(),t(15,"th"),E(16,"Image"),i(),t(17,"th"),E(18,"Domain"),i(),t(19,"th"),E(20,"X\u1EED l\xFD"),i()(),t(21,"tr")(22,"th",5)(23,"button",6),h("click",function(){Q(l);let m=y();return Y(m.create())}),C(24,"span",7),i()()()(),t(25,"tbody"),M(26,Ne,22,13,"tr",8),i()(),x()}if(s&2){let l=p.ngIf,n=Ar(2),m=y();a(),o("nzData",l.data)("nzTotal",l.count)("nzPageIndex",m.pageIndex+1)("nzPageSize",m.pageSize),a(25),o("ngForOf",n.data)}}var pt=(()=>{let p=class p extends H(Jr,Kr){constructor(n){super(),this.newsService=n,this.videoUploadPath=_.videoUploadPath,this.imageUploadPath=_.uploadMetaImageThumbnailUrl,this.news$=this.createObservableData((m,r)=>this.filter&&this.filter.categoryId?this.newsService.getAllCategoryNews(this.filter.categoryId,m,r):this.filter&&this.filter.domainId?this.newsService.getAllDomainNews(this.filter.domainId,m,r):this.filter&&this.filter.userId?this.newsService.getAllUserNews(this.filter.userId,m,r):this.newsService.getAllNews(m,r))}create(){this.createComponentModal({nzTitle:"T\u1EA1o tin t\u1EE9c",nzWidth:"100vw"},ye).afterClose.subscribe(()=>this.loadDataSubject$.next(!0))}edit(n){this.createComponentModal({nzTitle:"C\u1EADp nh\u1EADt tin t\u1EE9c "+n.title,nzWidth:"100vw"},Ce,n).afterClose.subscribe(()=>this.loadDataSubject$.next(!0))}delete(n){this.newsService.deleteNews(n.id).subscribe(()=>this.loadDataSubject$.next(!0))}filterData(n){this.filter=n,this.loadDataSubject$.next(!0)}};p.\u0275fac=function(m){return new(m||p)(w(J))},p.\u0275cmp=c({type:p,selectors:[["app-news-index"]],standalone:!0,features:[v,z],decls:4,vars:3,consts:[["newsTable",""],[1,"mb-2"],[3,"filter"],[4,"ngIf"],["nzSize","small","nzShowPagination","true","nzFrontPagination","false",3,"nzPageIndexChange","nzData","nzTotal","nzPageIndex","nzPageSize"],["colspan","8",1,"center-align"],["nz-button","","nzType","primary","nz-tooltip","","nzTooltipTitle","T\u1EA1o tin t\u1EE9c",3,"click"],["nz-icon","","nzType","plus","nzTheme","outline"],[4,"ngFor","ngForOf"],["target","_blank",3,"href",4,"ngIf"],["style","height: 50px","alt","",3,"src",4,"ngIf"],["nz-button","","nzType","primary","nzSize","small",1,"mr1",3,"click"],["nz-button","","nzDanger","","nzType","primary","nzSize","small","nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this task?","nzPopconfirmPlacement","bottom",3,"nzOnConfirm"],["target","_blank",3,"href"],["alt","",2,"height","50px",3,"src"]],template:function(m,r){m&1&&(t(0,"div",1)(1,"app-user-domain-news-category-filter",2),h("filter",function(e){return r.filterData(e)}),i()(),M(2,be,27,5,"ng-container",3),N(3,"async")),m&2&&(a(2),o("ngIf",rr(3,1,r.news$)))},dependencies:[le,ie,ee,$r,xr,te,re,oe,U,P,B,G,S,or,tr,ir,Or,jr,ae,ne,Hr,qr,se]});let s=p;return s})();export{pt as NewsIndexComponent};