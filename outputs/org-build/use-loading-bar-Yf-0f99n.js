import{g as j,h as M,v as V,t as z}from"./warn-BfczDB-2.js";import{e as F}from"./Scrollbar-BZksWPOS.js";import{s as H,a as L,d as x,u as E,k as N,l as q,n as G}from"./light-C6iFuy1F.js";import{d as k,B as g,y as J,C as T,r as c,h as _,z as m,T as Q,F as U,H as w}from"./runtime-core.esm-bundler-CbNHRoSM.js";const W=j("n-loading-bar"),$=j("n-loading-bar-api");function X(r){const{primaryColor:n,errorColor:a}=r;return{colorError:a,colorLoading:n,height:"2px"}}const Y={common:H,self:X},Z=L("loading-bar-container",`
 z-index: 5999;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 2px;
`,[F({enterDuration:"0.3s",leaveDuration:"0.8s"}),L("loading-bar",`
 width: 100%;
 transition:
 max-width 4s linear,
 background .2s linear;
 height: var(--n-height);
 `,[x("starting",`
 background: var(--n-color-loading);
 `),x("finishing",`
 background: var(--n-color-loading);
 transition:
 max-width .2s linear,
 background .2s linear;
 `),x("error",`
 background: var(--n-color-error);
 transition:
 max-width .2s linear,
 background .2s linear;
 `)])]);var y=function(r,n,a,o){function d(i){return i instanceof a?i:new a(function(e){e(i)})}return new(a||(a=Promise))(function(i,e){function p(l){try{s(o.next(l))}catch(v){e(v)}}function u(l){try{s(o.throw(l))}catch(v){e(v)}}function s(l){l.done?i(l.value):d(l.value).then(p,u)}s((o=o.apply(r,n||[])).next())})};function b(r,n){return`${n}-loading-bar ${n}-loading-bar--${r}`}const ee=k({name:"LoadingBar",props:{containerClass:String,containerStyle:[String,Object]},setup(){const{inlineThemeDisabled:r}=E(),{props:n,mergedClsPrefixRef:a}=T(W),o=c(null),d=c(!1),i=c(!1),e=c(!1),p=c(!1);let u=!1;const s=c(!1),l=_(()=>{const{loadingBarStyle:t}=n;return t?t[s.value?"error":"loading"]:""});function v(){return y(this,void 0,void 0,function*(){d.value=!1,e.value=!1,u=!1,s.value=!1,p.value=!0,yield m(),p.value=!1})}function R(){return y(this,arguments,void 0,function*(t=0,B=80,C="starting"){if(i.value=!0,yield v(),u)return;e.value=!0,yield m();const f=o.value;f&&(f.style.maxWidth=`${t}%`,f.style.transition="none",f.offsetWidth,f.className=b(C,a.value),f.style.transition="",f.style.maxWidth=`${B}%`)})}function A(){return y(this,void 0,void 0,function*(){if(u||s.value)return;i.value&&(yield m()),u=!0;const t=o.value;t&&(t.className=b("finishing",a.value),t.style.maxWidth="100%",t.offsetWidth,e.value=!1)})}function D(){if(!(u||s.value))if(!e.value)R(100,100,"error").then(()=>{s.value=!0;const t=o.value;t&&(t.className=b("error",a.value),t.offsetWidth,e.value=!1)});else{s.value=!0;const t=o.value;if(!t)return;t.className=b("error",a.value),t.style.maxWidth="100%",t.offsetWidth,e.value=!1}}function O(){d.value=!0}function P(){d.value=!1}function I(){return y(this,void 0,void 0,function*(){yield v()})}const K=N("LoadingBar","-loading-bar",Z,Y,n,a),S=_(()=>{const{self:{height:t,colorError:B,colorLoading:C}}=K.value;return{"--n-height":t,"--n-color-loading":C,"--n-color-error":B}}),h=r?q("loading-bar",void 0,S,n):void 0;return{mergedClsPrefix:a,loadingBarRef:o,started:i,loading:e,entering:d,transitionDisabled:p,start:R,error:D,finish:A,handleEnter:O,handleAfterEnter:P,handleAfterLeave:I,mergedLoadingBarStyle:l,cssVars:r?void 0:S,themeClass:h?.themeClass,onRender:h?.onRender}},render(){if(!this.started)return null;const{mergedClsPrefix:r}=this;return g(M,{name:"fade-in-transition",appear:!0,onEnter:this.handleEnter,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave,css:!this.transitionDisabled},{default:()=>{var n;return(n=this.onRender)===null||n===void 0||n.call(this),J(g("div",{class:[`${r}-loading-bar-container`,this.themeClass,this.containerClass],style:this.containerStyle},g("div",{ref:"loadingBarRef",class:[`${r}-loading-bar`],style:[this.cssVars,this.mergedLoadingBarStyle]})),[[V,this.loading||!this.loading&&this.entering]])}})}}),ne=Object.assign(Object.assign({},N.props),{to:{type:[String,Object,Boolean],default:void 0},containerClass:String,containerStyle:[String,Object],loadingBarStyle:{type:Object}}),oe=k({name:"LoadingBarProvider",props:ne,setup(r){const n=G(),a=c(null),o={start(){var i;n.value?(i=a.value)===null||i===void 0||i.start():m(()=>{var e;(e=a.value)===null||e===void 0||e.start()})},error(){var i;n.value?(i=a.value)===null||i===void 0||i.error():m(()=>{var e;(e=a.value)===null||e===void 0||e.error()})},finish(){var i;n.value?(i=a.value)===null||i===void 0||i.finish():m(()=>{var e;(e=a.value)===null||e===void 0||e.finish()})}},{mergedClsPrefixRef:d}=E(r);return w($,o),w(W,{props:r,mergedClsPrefixRef:d}),Object.assign(o,{loadingBarRef:a})},render(){var r,n;return g(U,null,g(Q,{disabled:this.to===!1,to:this.to||"body"},g(ee,{ref:"loadingBarRef",containerStyle:this.containerStyle,containerClass:this.containerClass})),(n=(r=this.$slots).default)===null||n===void 0?void 0:n.call(r))}});function se(){const r=T($,null);return r===null&&z("use-loading-bar","No outer <n-loading-bar-provider /> founded."),r}export{oe as N,ne as l,se as u};
