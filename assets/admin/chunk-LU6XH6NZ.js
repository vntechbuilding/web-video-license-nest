import{a as W}from"./chunk-6IU5STV2.js";import{a as sr,b as ur,c as dr,d as gr,e as _r}from"./chunk-I5YTVZF4.js";import{a as Er}from"./chunk-WYAJB6NR.js";import"./chunk-ZDAHY7KC.js";import"./chunk-O25UQVZ2.js";import{a as lr}from"./chunk-UVZ7OHOK.js";import{a as jr}from"./chunk-ON5W3XZ3.js";import{b as fr}from"./chunk-E2MPIU5O.js";import{a as mr,b as Hr}from"./chunk-FIVRONS2.js";import"./chunk-QCY6BLAQ.js";import{a as pr}from"./chunk-HUONOAPD.js";import"./chunk-W244JUTK.js";import"./chunk-PSR5DFFY.js";import"./chunk-5TKBH2EH.js";import"./chunk-FTHBAHA3.js";import{a as Nr}from"./chunk-SLOIDIPU.js";import{d as nr}from"./chunk-AB36JMP2.js";import"./chunk-7XZ66E5Q.js";import{a as ir}from"./chunk-W72PHP5T.js";import"./chunk-HHG4OQGC.js";import"./chunk-ASNUN4YP.js";import{a as Xr,b as qr}from"./chunk-YANWLB2B.js";import{a as V,b as Br,d as or,e as tr,h as ar,j as Gr,k as Ur,l as Ar,m as Lr,n as kr,o as Or,p as Rr}from"./chunk-CIAYRUPY.js";import"./chunk-OC6OS4EK.js";import{a as H,b as K,c as J,m as Q,n as Y,o as Z,p as $,q as x,r as rr,t as er}from"./chunk-53LNINAL.js";import"./chunk-PUH3HP37.js";import{d as L,e as w,g as k,h as O,l as R,n as X,o as q,r as Vr,s as j,t as I,u as P,w as F,x as T}from"./chunk-TEFF5QW5.js";import{Ba as M,E as Wr,F as Dr}from"./chunk-E7AKRIK7.js";import"./chunk-SE4MWOQF.js";import"./chunk-3D2PYGCY.js";import{Ea as D,Fa as N,Kb as t,Lb as i,Mb as C,Nb as yr,Ob as Cr,Qb as Mr,Sc as Ir,Tb as y,Tc as Pr,Vb as _,Yb as hr,Zb as vr,Zc as Fr,_c as Tr,a as zr,b as Sr,bd as b,cb as B,cc as cr,dc as E,ec as G,gb as a,hb as v,hc as f,ic as u,jc as d,lc as c,mc as br,pc as U,qc as wr,rb as z,rc as A,ta as h,wb as S,yb as o}from"./chunk-KXMLQHF5.js";var $r=(()=>{let p=class p extends V(or,tr){constructor(n){super(),this.pageService=n,this.uploadContentImageUrl=M.uploadMetaImageThumbnailUrl,this.validators={}}ngOnInit(){this.defaultValue=this.nzModalData,this.defaultValue.userId=this.nzModalData.domain?.userId,this.validateForm=this.fb.group({title:[this.nzModalData.title,[w.required]]})}submitForm(){this.formValid()&&this.pageService.updatePage(Sr(zr({},this.removeBlankString(this.validateForm.value)),{pageId:this.nzModalData.id})).pipe(this.httpErrorOperator("domain")).subscribe(n=>{this.destroyModal(n)})}};p.\u0275fac=function(m){return new(m||p)(v(W))},p.\u0275cmp=h({type:p,selectors:[["app-page-edit"]],standalone:!0,features:[z,c],decls:22,vars:76,consts:[["nz-form","",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["nz-input","","formControlName","title","id","title"],["label","Ng\xE0y t\u1EA3i l\xEAn","dateField","uploadDate",3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","defaultValue"],[3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","label","defaultValue","defaultField","aspectRatio","uploadContentImageUrl"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","Kh\xF3a b\xE0i vi\u1EBFt",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors","allowClear"],["label","M\xF4 t\u1EA3","field","summary",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","N\u1ED9i dung","field","content",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled"]],template:function(m,r){m&1&&(t(0,"form",0),y("ngSubmit",function(){return r.submitForm()}),t(1,"nz-form-item")(2,"nz-form-label",1),E(3,"Ti\xEAu \u0111\u1EC1"),i(),t(4,"nz-form-control",2),C(5,"input",3),i()(),t(6,"app-date-input",4),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(7,"app-content-image-input",5),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(8,"app-head-meta-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(9,"app-rating-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(10,"app-user-id-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(11,"app-domain-input-by-user",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(12,"app-disabled-input",7),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(13,"app-video-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(14,"app-author-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(15,"app-publisher-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(16,"app-input-text-area",9),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(17,"app-input-ckeditor",10),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(18,"nz-form-item",11)(19,"nz-form-control",12)(20,"button",13),E(21,"C\u1EADp nh\u1EADt Trang"),i()()()()),m&2&&(o("formGroup",r.validateForm),a(2),o("nzSm",10)("nzXs",24),a(2),o("nzSm",14)("nzXs",24)("nzErrorTip",r.formErrors.title),a(2),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("defaultValue",r.defaultValue),a(),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("label","H\xECnh \u1EA3nh")("defaultValue",r.defaultValue)("defaultField","image")("aspectRatio",16/9)("uploadContentImageUrl",r.uploadContentImageUrl),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(2),o("nzSpan",12)("nzOffset",8),a(),o("disabled",!r.validateForm.valid))},dependencies:[x,K,H,Y,Q,$,Z,J,T,F,I,P,er,rr,j,R,L,k,O,X,q,ar,b,dr,nr,lr,ir,fr,mr,Er,_r,gr,sr,pr,ur]});let l=p;return l})();var ie=()=>({}),xr=(()=>{let p=class p extends V(or,tr){constructor(n){super(),this.pageService=n,this.uploadContentImageUrl=M.uploadMetaImageThumbnailUrl,this.validators={},this._formErrorMsg={domain:{required:"Domain kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"},userId:{required:"User kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"}}}ngOnInit(){this.validateForm=this.fb.group({title:["",[w.required]],userId:["",[w.required]],domainId:["",[w.required]]})}submitForm(){this.formValid()&&this.pageService.createPage(this.removeBlankString(this.validateForm.value)).pipe(this.httpErrorOperator("domain")).subscribe(n=>{this.destroyModal(n)})}};p.\u0275fac=function(m){return new(m||p)(v(W))},p.\u0275cmp=h({type:p,selectors:[["app-page-create"]],standalone:!0,features:[z,c],decls:22,vars:77,consts:[["nz-form","",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["nz-input","","formControlName","title","id","title"],["label","Ng\xE0y t\u1EA3i l\xEAn","dateField","uploadDate",3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","defaultValue"],[3,"formErrorMsgChange","validators","formErrorMsg","formGroup","formErrors","label","defaultValue","defaultField","aspectRatio","uploadContentImageUrl"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","Kh\xF3a b\xE0i vi\u1EBFt",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],[3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors","allowClear"],["label","M\xF4 t\u1EA3","field","summary",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["label","N\u1ED9i dung","field","content",3,"formErrorMsgChange","validators","defaultValue","formErrorMsg","formGroup","formErrors"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled"]],template:function(m,r){m&1&&(t(0,"form",0),y("ngSubmit",function(){return r.submitForm()}),t(1,"nz-form-item")(2,"nz-form-label",1),E(3,"Ti\xEAu \u0111\u1EC1"),i(),t(4,"nz-form-control",2),C(5,"input",3),i()(),t(6,"app-date-input",4),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(7,"app-content-image-input",5),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(8,"app-head-meta-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(9,"app-rating-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(10,"app-user-id-input",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(11,"app-domain-input-by-user",6),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(12,"app-disabled-input",7),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(13,"app-video-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(14,"app-author-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(15,"app-publisher-input-by-user",8),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(16,"app-input-text-area",9),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(17,"app-input-ckeditor",10),d("formErrorMsgChange",function(e){return u(r.formErrorMsg,e)||(r.formErrorMsg=e),e}),i(),t(18,"nz-form-item",11)(19,"nz-form-control",12)(20,"button",13),E(21,"T\u1EA1o Trang"),i()()()()),m&2&&(o("formGroup",r.validateForm),a(2),o("nzSm",10)("nzXs",24),a(2),o("nzSm",14)("nzXs",24)("nzErrorTip",r.formErrors.title),a(2),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("defaultValue",br(76,ie)),a(),o("validators",r.validators),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("label","H\xECnh \u1EA3nh")("defaultValue",r.defaultValue)("defaultField","image")("aspectRatio",16/9)("uploadContentImageUrl",r.uploadContentImageUrl),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors)("allowClear",!0),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(),o("validators",r.validators)("defaultValue",r.defaultValue),f("formErrorMsg",r.formErrorMsg),o("formGroup",r.validateForm)("formErrors",r.formErrors),a(2),o("nzSpan",12)("nzOffset",8),a(),o("disabled",!r.validateForm.valid))},dependencies:[x,K,H,Y,Q,$,Z,J,T,F,I,P,er,rr,j,R,L,k,O,X,q,ar,b,dr,nr,lr,ir,fr,mr,Er,_r,gr,sr,pr,ur]});let l=p;return l})();function ae(l,p){if(l&1&&(t(0,"a",13),C(1,"img",14),i()),l&2){let g=_().$implicit,n=_(2);vr("href","",n.videoUploadPath,"",g.video.file,"",B),a(),vr("src","",n.imageUploadPath,"",g.video.thumbnail,"",B)}}function ne(l,p){if(l&1&&C(0,"img",14),l&2){let g=_().$implicit,n=_(2);hr("src",n.imageUploadPath+g.image,B)}}function me(l,p){if(l&1&&(yr(0),t(1,"a",13),U(2,"domainUrl"),E(3),i(),Cr()),l&2){let g=_().$implicit;a(),hr("href",A(2,2,g.url,g.domain),B),a(2),G(g.url)}}function pe(l,p){if(l&1){let g=Mr();t(0,"tr")(1,"td"),E(2),U(3,"date"),i(),t(4,"td"),E(5),U(6,"date"),i(),t(7,"td"),E(8),i(),t(9,"td"),S(10,ae,2,6,"a",9),i(),t(11,"td"),S(12,ne,1,1,"img",10),i(),t(13,"td"),S(14,me,4,5,"ng-container",3),i(),t(15,"td")(16,"button",11),y("click",function(){let m=D(g).$implicit,r=_(2);return N(r.edit(m))}),E(17,"S\u1EEDa"),i(),t(18,"button",12),y("nzOnConfirm",function(){let m=D(g).$implicit,r=_(2);return N(r.delete(m))}),E(19,"X\xF3a"),i()()()}if(l&2){let g=p.$implicit;a(2),G(A(3,6,g.createdAt,"dd/MM/yyyy hh:mm")),a(3),G(A(6,9,g.uploadDate,"dd/MM/yyyy hh:mm:ss")),a(3),G(g.title),a(2),o("ngIf",g.video),a(2),o("ngIf",g.image),a(2),o("ngIf",g.domain)}}function le(l,p){if(l&1){let g=Mr();yr(0),t(1,"nz-table",4,0),y("nzPageIndexChange",function(m){D(g);let r=_();return N(r.changePage(m))}),t(3,"thead")(4,"tr")(5,"th"),E(6,"Th\u01A1\u0300i gian kh\u1EDFi t\u1EA1o"),i(),t(7,"th"),E(8,"Th\u01A1\u0300i gian T\u1EA3i l\xEAn"),i(),t(9,"th"),E(10,"Trang"),i(),t(11,"th"),E(12,"Video"),i(),t(13,"th"),E(14,"Image"),i(),t(15,"th"),E(16,"Domain"),i(),t(17,"th"),E(18,"X\u1EED l\xFD"),i()(),t(19,"tr")(20,"th",5)(21,"button",6),y("click",function(){D(g);let m=_();return N(m.create())}),C(22,"span",7),i()()()(),t(23,"tbody"),S(24,pe,20,12,"tr",8),i()(),Cr()}if(l&2){let g=p.ngIf,n=cr(2),m=_();a(),o("nzData",g.data)("nzTotal",g.count)("nzPageIndex",m.pageIndex+1)("nzPageSize",m.pageSize),a(23),o("ngForOf",n.data)}}var wo=(()=>{let p=class p extends V(Br,Nr){constructor(n){super(),this.pageService=n,this.videoUploadPath=M.videoUploadPath,this.imageUploadPath=M.uploadMetaImageThumbnailUrl,this.page$=this.createObservableData((m,r)=>this.filterData&&this.filterData.domainId?this.pageService.getAllDomainPage(this.filterData.domainId,m,r):this.filterData&&this.filterData.userId?this.pageService.getAllUserPage(this.filterData.userId,m,r):this.pageService.getAllPage(m,r))}create(){this.createComponentModal({nzTitle:"T\u1EA1o trang",nzWidth:"100vw"},xr).afterClose.subscribe(()=>this.loadDataSubject$.next(!0))}edit(n){this.createComponentModal({nzTitle:"C\u1EADp nh\u1EADt trang "+n.title,nzWidth:"100vw"},$r,n).afterClose.subscribe(()=>this.loadDataSubject$.next(!0))}delete(n){this.pageService.deletePage(n.id).subscribe(()=>this.loadDataSubject$.next(!0))}filter(n){this.filterData=n,this.loadDataSubject$.next(!0)}};p.\u0275fac=function(m){return new(m||p)(v(W))},p.\u0275cmp=h({type:p,selectors:[["app-page-index"]],standalone:!0,features:[z,c],decls:4,vars:3,consts:[["pageTable",""],[1,"mb-2"],[3,"filter"],[4,"ngIf"],["nzSize","small","nzShowPagination","true","nzFrontPagination","false",3,"nzPageIndexChange","nzData","nzTotal","nzPageIndex","nzPageSize"],["colspan","8",1,"center-align"],["nz-button","","nzType","primary","nz-tooltip","","nzTooltipTitle","T\u1EA1o trang",3,"click"],["nz-icon","","nzType","plus","nzTheme","outline"],[4,"ngFor","ngForOf"],["target","_blank",3,"href",4,"ngIf"],["style","height: 50px","alt","",3,"src",4,"ngIf"],["nz-button","","nzType","primary","nzSize","small",1,"mr1",3,"click"],["nz-button","","nzDanger","","nzType","primary","nzSize","small","nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this task?","nzPopconfirmPlacement","bottom",3,"nzOnConfirm"],["target","_blank",3,"href"],["alt","",2,"height","50px",3,"src"]],template:function(m,r){m&1&&(t(0,"div",1)(1,"app-user-domain-filter",2),y("filter",function(e){return r.filter(e)}),i()(),S(2,le,25,5,"ng-container",3),U(3,"async")),m&2&&(a(2),o("ngIf",wr(3,1,r.page$)))},dependencies:[jr,Rr,Lr,Gr,Ur,Or,Ar,kr,T,F,I,P,b,Ir,Pr,Fr,Tr,Vr,qr,Xr,Dr,Wr,Hr]});let l=p;return l})();export{wo as PageIndexComponent};
