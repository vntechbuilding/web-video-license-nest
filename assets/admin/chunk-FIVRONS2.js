import{a as ie,b as ne,c as ae}from"./chunk-AB36JMP2.js";import{a as te}from"./chunk-ASNUN4YP.js";import{a as re,b as oe}from"./chunk-YANWLB2B.js";import{a as j,b as B,c as W,m as J,o as K,p as Q,q as Y,r as Z,t as $}from"./chunk-53LNINAL.js";import{a as P,d as V,e as I,g as H,h as G,n as U,o as q,s as O,t as X,u as A,w as L,x as k}from"./chunk-TEFF5QW5.js";import{Ba as ee}from"./chunk-E7AKRIK7.js";import{i as R}from"./chunk-3D2PYGCY.js";import{Ea as M,Fa as E,Kb as a,Lb as r,Mb as u,Qb as T,Tb as z,Tc as F,Vb as g,Zb as D,bd as w,cb as h,dc as l,gb as o,gc as N,ha as C,hb as y,kc as b,lc as x,rb as S,ta as v,wa as _,wb as c,yb as m}from"./chunk-KXMLQHF5.js";var me=(t,e)=>(t.https?"https://":"http://")+t.domain+"/"+(e.startsWith("/")?e.slice(1):e);var fe=(()=>{let e=class e{transform(i,p){return p?me(p,i):i}};e.\u0275fac=function(p){return new(p||e)},e.\u0275pipe=_({name:"domainUrl",type:e,pure:!0,standalone:!0});let t=e;return t})();function se(t,e){if(t&1&&(a(0,"div",16),u(1,"img",17),r()),t&2){let s=g();o(),D("src","",s.uploadMetaImageUrl,"",s.defaultValue.metaImage,"",h)}}function le(t,e){if(t&1){let s=T();a(0,"button",18),z("nzOnConfirm",function(){M(s);let p=g();return E(p.cancelMetaImage())}),l(1,"H\u1EE7y"),r()}}function de(t,e){if(t&1&&(a(0,"div"),l(1),r()),t&2){let s=g(2);o(),N("Width: ",s.metaImageDimensions.width,"px / Height: ",s.metaImageDimensions.height,"px")}}function ce(t,e){if(t&1&&(a(0,"div",19),c(1,de,2,2,"div",20),u(2,"img",21),r()),t&2){let s=g();o(),m("ngIf",s.metaImageDimensions),o(),m("src",s.croppedImage,h)}}var Xe=(()=>{let e=class e extends te{constructor(i){super(),this.sanitizer=i,this.uploadMetaImageUrl=ee.uploadMetaImageThumbnailUrl,this.validatorError={metaTitle:{required:"Meta title kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"},metaDescription:{required:"Meta description kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"}},this.imageChangedEvent="",this.croppedImage="",this.reader=new FileReader}ngOnInit(){this.reader.onloadend=()=>{this.formGroup.get("metaImage")?.setValue(this.reader.result),this.metaImage=this.reader.result,ae(this.metaImage).then(i=>this.metaImageDimensions=i)},this.addControl("metaTitle",this.setValidators(this.validators.metaTitle,[I.required])),this.addControl("metaDescription",this.setValidators(this.validators.metaDescription,[I.required])),this.addControl("metaImage",this.setValidators(this.validators.metaImage,[]),"",!0),this.emitNewErrorMsg("metaTitle"),this.emitNewErrorMsg("metaDescription")}fileChangeEvent(i){this.imageChangedEvent=i}imageCropped(i){this.croppedImage=this.sanitizer.bypassSecurityTrustUrl(i.objectUrl),this.reader.readAsDataURL(i.blob)}imageLoaded(i){}cropperReady(){}loadImageFailed(){}cancelMetaImage(){this.imageChangedEvent=null,this.croppedImage=null,this.metaImageDimensions=null,this.metaImage="",this.formGroup.get("metaImage")?.setValue("")}};e.\u0275fac=function(p){return new(p||e)(y(R))},e.\u0275cmp=v({type:e,selectors:[["app-head-meta-input"]],standalone:!0,features:[b([{provide:P,useExisting:C(()=>e),multi:!0}]),S,x],decls:24,vars:19,consts:[[3,"formGroup"],["nzFor","metaTitle",3,"nzSm","nzXs","nzRequired"],[3,"nzSm","nzXs","nzErrorTip"],["nz-input","","formControlName","metaTitle","id","metaTitle"],["nzFor","metaDescription",3,"nzSm","nzXs","nzRequired"],["nz-input","","formControlName","metaDescription","id","metaDescription"],["nz-row","","nzGutter","20"],["nz-col","","nzSm","10","nzXs","24",1,"text-right"],["nz-col","","nzSm","14","nzXs","24"],["class","mb1",4,"ngIf"],["type","file","accept",".png,.jpg,.jpeg,.gif,.webp",3,"change"],["nz-button","","nzType","primary","nzDanger","","nzSize","small","nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this task?","nzPopconfirmPlacement","bottom",3,"nzOnConfirm",4,"ngIf"],[1,"crop-wrapper","mb1","mt1"],["nz-col","","nzSpan","7"],["format","png",3,"imageCropped","imageLoaded","cropperReady","loadImageFailed","imageChangedEvent","maintainAspectRatio","aspectRatio"],["nz-col","","nzSpan","14",4,"ngIf"],[1,"mb1"],["alt","",2,"max-height","100px",3,"src"],["nz-button","","nzType","primary","nzDanger","","nzSize","small","nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this task?","nzPopconfirmPlacement","bottom",3,"nzOnConfirm"],["nz-col","","nzSpan","14"],[4,"ngIf"],[3,"src"]],template:function(p,n){p&1&&(a(0,"div",0)(1,"nz-form-item")(2,"nz-form-label",1),l(3,"Meta title"),r(),a(4,"nz-form-control",2),u(5,"input",3),r()(),a(6,"nz-form-item")(7,"nz-form-label",4),l(8,"Meta description"),r(),a(9,"nz-form-control",2),u(10,"input",5),r()(),a(11,"div",6)(12,"div",7),l(13,"Meta image"),r(),a(14,"div",8)(15,"div"),c(16,se,2,3,"div",9),a(17,"input",10),z("change",function(d){return n.fileChangeEvent(d)}),r(),c(18,le,2,0,"button",11),r(),a(19,"div",12)(20,"div",6)(21,"div",13)(22,"image-cropper",14),z("imageCropped",function(d){return n.imageCropped(d)})("imageLoaded",function(d){return n.imageLoaded(d)})("cropperReady",function(){return n.cropperReady()})("loadImageFailed",function(){return n.loadImageFailed()}),r()(),c(23,ce,3,2,"div",15),r()()()()()),p&2&&(m("formGroup",n.formGroup),o(2),m("nzSm",10)("nzXs",24)("nzRequired",n.formErrorMsg.metaTitle&&n.formErrorMsg.metaTitle.required),o(2),m("nzSm",14)("nzXs",24)("nzErrorTip",n.formErrors.metaTitle),o(3),m("nzSm",10)("nzXs",24)("nzRequired",n.formErrorMsg.metaDescription&&n.formErrorMsg.metaDescription.required),o(2),m("nzSm",14)("nzXs",24)("nzErrorTip",n.formErrors.metaDescription),o(7),m("ngIf",n.defaultValue.metaImage),o(2),m("ngIf",n.croppedImage),o(4),m("imageChangedEvent",n.imageChangedEvent)("maintainAspectRatio",!0)("aspectRatio",16/9),o(),m("ngIf",n.croppedImage))},dependencies:[Y,B,j,J,Q,K,$,Z,W,O,V,H,G,U,q,ne,ie,w,F,k,L,X,A,oe,re],styles:[".crop-wrapper[_ngcontent-%COMP%]{display:inline-block;max-width:100%;width:700px}.crop-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}"]});let t=e;return t})();export{Xe as a,fe as b};