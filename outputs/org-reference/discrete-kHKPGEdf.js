import{b as Pe,f as Le,N as re,d as Se,g as ae,h as se,m as Ie,i as Re,j as Ee,k as Me,u as $e}from"./Modal-DD7pUXXR.js";import{d as C,B as c,n as Ne,r as k,F as M,H as O,A as $,C as R,h as I,j as le,T as ce,J as Fe,z as He,u as ie}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{o as N}from"./omit-DbnPTcif.js";import{b as F,S as _e}from"./Scrollbar-BZksWPOS.js";import{g as de,h as Te,t as Be,c as Ke,i as De}from"./warn-BfczDB-2.js";import{u as qe}from"./composables-BcTlT-AN.js";import{u as Ve,N as We}from"./use-loading-bar-Yf-0f99n.js";import{r as P}from"./fade-in-scale-up.cssr-CLYwdj1u.js";import{j as Ue,k as Xe,h as Je,N as fe}from"./Loading-DZbvIzCl.js";import{N as ue}from"./Close-C8_AQrzr.js";import{e as b,a as v,g as w,d as m,u as H,r as he,k as _,l as ve,m as j}from"./light-C6iFuy1F.js";import{k as Ge}from"./keysOf-HiGXOwLp.js";import{E as pe,S as me,I as ge}from"./Success-D80re6mc.js";import{W as be}from"./Warning-CNxmuKdi.js";import{a as Qe}from"./index-BS1Lf1EV.js";import{k as xe}from"./keep-BuBMtln4.js";import{m as Ye,n as Ze}from"./light-BX9A80W0.js";import{m as ye,a as en,u as nn}from"./use-message-BvQru7T_.js";import{N as tn}from"./ConfigProvider-DLICqQ-B.js";import{i as on}from"./is-browser-DqcmxZSF.js";import{d as rn,a as an,b as sn}from"./context-l6GNbigX.js";import{f as ln}from"./fade-in-height-expand.cssr-D4K_l8Yn.js";import{N as cn}from"./FadeInExpandTransition-BhYgIGUe.js";const dn=Object.assign(Object.assign({},Se),{onAfterEnter:Function,onAfterLeave:Function,transformOrigin:String,blockScroll:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},internalStyle:[String,Object],maskClosable:{type:Boolean,default:!0},zIndex:Number,onPositiveClick:Function,onNegativeClick:Function,onClose:Function,onMaskClick:Function,draggable:[Boolean,Object]}),fn=C({name:"DialogEnvironment",props:Object.assign(Object.assign({},dn),{internalKey:{type:String,required:!0},to:[String,Object],onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const n=k(!0);function o(){const{onInternalAfterLeave:r,internalKey:h,onAfterLeave:p}=e;r&&r(h),p&&p()}function t(r){const{onPositiveClick:h}=e;h?Promise.resolve(h(r)).then(p=>{p!==!1&&i()}):i()}function a(r){const{onNegativeClick:h}=e;h?Promise.resolve(h(r)).then(p=>{p!==!1&&i()}):i()}function d(){const{onClose:r}=e;r?Promise.resolve(r()).then(h=>{h!==!1&&i()}):i()}function u(r){const{onMaskClick:h,maskClosable:p}=e;h&&(h(r),p&&i())}function l(){const{onEsc:r}=e;r&&r()}function i(){n.value=!1}function s(r){n.value=r}return{show:n,hide:i,handleUpdateShow:s,handleAfterLeave:o,handleCloseClick:d,handleNegativeClick:a,handlePositiveClick:t,handleMaskClick:u,handleEsc:l}},render(){const{handlePositiveClick:e,handleUpdateShow:n,handleNegativeClick:o,handleCloseClick:t,handleAfterLeave:a,handleMaskClick:d,handleEsc:u,to:l,zIndex:i,maskClosable:s,show:r}=this;return c(re,{show:r,onUpdateShow:n,onMaskClick:d,onEsc:u,to:l,zIndex:i,maskClosable:s,onAfterEnter:this.onAfterEnter,onAfterLeave:a,closeOnEsc:this.closeOnEsc,blockScroll:this.blockScroll,autoFocus:this.autoFocus,transformOrigin:this.transformOrigin,draggable:this.draggable,internalAppear:!0,internalDialog:!0},{default:({draggableClass:h})=>c(Pe,Object.assign({},xe(this.$props,Le),{titleClass:Ne([this.titleClass,h]),style:this.internalStyle,onClose:t,onNegativeClick:o,onPositiveClick:e}))})}}),un={injectionKey:String,to:[String,Object]},hn=C({name:"DialogProvider",props:un,setup(){const e=k([]),n={};function o(l={}){const i=F(),s=$(Object.assign(Object.assign({},l),{key:i,destroy:()=>{var r;(r=n[`n-dialog-${i}`])===null||r===void 0||r.hide()}}));return e.value.push(s),s}const t=["info","success","warning","error"].map(l=>i=>o(Object.assign(Object.assign({},i),{type:l})));function a(l){const{value:i}=e;i.splice(i.findIndex(s=>s.key===l),1)}function d(){Object.values(n).forEach(l=>{l?.hide()})}const u={create:o,destroyAll:d,info:t[0],success:t[1],warning:t[2],error:t[3]};return O(an,u),O(rn,{clickedRef:se(64),clickedPositionRef:ae()}),O(sn,e),Object.assign(Object.assign({},u),{dialogList:e,dialogInstRefs:n,handleAfterLeave:a})},render(){var e,n;return c(M,null,[this.dialogList.map(o=>c(fn,N(o,["destroy","style"],{internalStyle:o.style,to:this.to,ref:t=>{t===null?delete this.dialogInstRefs[`n-dialog-${o.key}`]:this.dialogInstRefs[`n-dialog-${o.key}`]=t},internalKey:o.key,onInternalAfterLeave:this.handleAfterLeave}))),(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e)])}}),Ce={icon:Function,type:{type:String,default:"info"},content:[String,Number,Function],showIcon:{type:Boolean,default:!0},closable:Boolean,keepAliveOnHover:Boolean,spinProps:Object,onClose:Function,onMouseenter:Function,onMouseleave:Function},vn=b([v("message-wrapper",`
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `,[ln({overflow:"visible",originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.85)"}})]),v("message",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 border: var(--n-border);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `,[w("content",`
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `),w("icon",`
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `,[["default","info","success","warning","error","loading"].map(e=>m(`${e}-type`,[b("> *",`
 color: var(--n-icon-color-${e});
 transition: color .3s var(--n-bezier);
 `)])),b("> *",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `,[Ue()])]),w("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `,[b("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),b("&:active",`
 color: var(--n-close-icon-color-pressed);
 `)])]),v("message-container",`
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `,[m("top",`
 top: 12px;
 left: 0;
 right: 0;
 `),m("top-left",`
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `),m("top-right",`
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `),m("bottom",`
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `),m("bottom-left",`
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `),m("bottom-right",`
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)])]),pn={info:()=>c(ge,null),success:()=>c(me,null),warning:()=>c(be,null),error:()=>c(pe,null),default:()=>null},mn=C({name:"Message",props:Object.assign(Object.assign({},Ce),{render:Function}),setup(e){const{inlineThemeDisabled:n,mergedRtlRef:o}=H(e),{props:t,mergedClsPrefixRef:a}=R(ye),d=he("Message",o,a),u=_("Message","-message",vn,Ye,t,a),l=I(()=>{const{type:s}=e,{common:{cubicBezierEaseInOut:r},self:{padding:h,margin:p,maxWidth:g,iconMargin:f,closeMargin:x,closeSize:y,iconSize:A,fontSize:L,lineHeight:S,borderRadius:z,border:B,iconColorInfo:K,iconColorSuccess:D,iconColorWarning:q,iconColorError:V,iconColorLoading:W,closeIconSize:U,closeBorderRadius:X,[j("textColor",s)]:J,[j("boxShadow",s)]:G,[j("color",s)]:Q,[j("closeColorHover",s)]:Y,[j("closeColorPressed",s)]:Z,[j("closeIconColor",s)]:ee,[j("closeIconColorPressed",s)]:ne,[j("closeIconColorHover",s)]:te}}=u.value;return{"--n-bezier":r,"--n-margin":p,"--n-padding":h,"--n-max-width":g,"--n-font-size":L,"--n-icon-margin":f,"--n-icon-size":A,"--n-close-icon-size":U,"--n-close-border-radius":X,"--n-close-size":y,"--n-close-margin":x,"--n-text-color":J,"--n-color":Q,"--n-box-shadow":G,"--n-icon-color-info":K,"--n-icon-color-success":D,"--n-icon-color-warning":q,"--n-icon-color-error":V,"--n-icon-color-loading":W,"--n-close-color-hover":Y,"--n-close-color-pressed":Z,"--n-close-icon-color":ee,"--n-close-icon-color-pressed":ne,"--n-close-icon-color-hover":te,"--n-line-height":S,"--n-border-radius":z,"--n-border":B}}),i=n?ve("message",I(()=>e.type[0]),l,{}):void 0;return{mergedClsPrefix:a,rtlEnabled:d,messageProviderProps:t,handleClose(){var s;(s=e.onClose)===null||s===void 0||s.call(e)},cssVars:n?void 0:l,themeClass:i?.themeClass,onRender:i?.onRender,placement:t.placement}},render(){const{render:e,type:n,closable:o,content:t,mergedClsPrefix:a,cssVars:d,themeClass:u,onRender:l,icon:i,handleClose:s,showIcon:r}=this;l?.();let h;return c("div",{class:[`${a}-message-wrapper`,u],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:[{alignItems:this.placement.startsWith("top")?"flex-start":"flex-end"},d]},e?e(this.$props):c("div",{class:[`${a}-message ${a}-message--${n}-type`,this.rtlEnabled&&`${a}-message--rtl`]},(h=gn(i,n,a,this.spinProps))&&r?c("div",{class:`${a}-message__icon ${a}-message__icon--${n}-type`},c(Xe,null,{default:()=>h})):null,c("div",{class:`${a}-message__content`},P(t)),o?c(ue,{clsPrefix:a,class:`${a}-message__close`,onClick:s,absolute:!0}):null))}});function gn(e,n,o,t){if(typeof e=="function")return e();{const a=n==="loading"?c(Je,Object.assign({clsPrefix:o,strokeWidth:24,scale:.85},t)):pn[n]();return a?c(fe,{clsPrefix:o,key:n},{default:()=>a}):null}}const bn=C({name:"MessageEnvironment",props:Object.assign(Object.assign({},Ce),{duration:{type:Number,default:3e3},onAfterLeave:Function,onLeave:Function,internalKey:{type:String,required:!0},onInternalAfterLeave:Function,onHide:Function,onAfterHide:Function}),setup(e){let n=null;const o=k(!0);le(()=>{t()});function t(){const{duration:r}=e;r&&(n=window.setTimeout(u,r))}function a(r){r.currentTarget===r.target&&n!==null&&(window.clearTimeout(n),n=null)}function d(r){r.currentTarget===r.target&&t()}function u(){const{onHide:r}=e;o.value=!1,n&&(window.clearTimeout(n),n=null),r&&r()}function l(){const{onClose:r}=e;r&&r(),u()}function i(){const{onAfterLeave:r,onInternalAfterLeave:h,onAfterHide:p,internalKey:g}=e;r&&r(),h&&h(g),p&&p()}function s(){u()}return{show:o,hide:u,handleClose:l,handleAfterLeave:i,handleMouseleave:d,handleMouseenter:a,deactivate:s}},render(){return c(cn,{appear:!0,onAfterLeave:this.handleAfterLeave,onLeave:this.onLeave},{default:()=>[this.show?c(mn,{content:this.content,type:this.type,icon:this.icon,showIcon:this.showIcon,closable:this.closable,spinProps:this.spinProps,onClose:this.handleClose,onMouseenter:this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.keepAliveOnHover?this.handleMouseleave:void 0}):null]})}}),xn=Object.assign(Object.assign({},_.props),{to:[String,Object],duration:{type:Number,default:3e3},keepAliveOnHover:Boolean,max:Number,placement:{type:String,default:"top"},closable:Boolean,containerClass:String,containerStyle:[String,Object]}),yn=C({name:"MessageProvider",props:xn,setup(e){const{mergedClsPrefixRef:n}=H(e),o=k([]),t=k({}),a={create(i,s){return d(i,Object.assign({type:"default"},s))},info(i,s){return d(i,Object.assign(Object.assign({},s),{type:"info"}))},success(i,s){return d(i,Object.assign(Object.assign({},s),{type:"success"}))},warning(i,s){return d(i,Object.assign(Object.assign({},s),{type:"warning"}))},error(i,s){return d(i,Object.assign(Object.assign({},s),{type:"error"}))},loading(i,s){return d(i,Object.assign(Object.assign({},s),{type:"loading"}))},destroyAll:l};O(ye,{props:e,mergedClsPrefixRef:n}),O(en,a);function d(i,s){const r=F(),h=$(Object.assign(Object.assign({},s),{content:i,key:r,destroy:()=>{var g;(g=t.value[r])===null||g===void 0||g.hide()}})),{max:p}=e;return p&&o.value.length>=p&&o.value.shift(),o.value.push(h),h}function u(i){o.value.splice(o.value.findIndex(s=>s.key===i),1),delete t.value[i]}function l(){Object.values(t.value).forEach(i=>{i.hide()})}return Object.assign({mergedClsPrefix:n,messageRefs:t,messageList:o,handleAfterLeave:u},a)},render(){var e,n,o;return c(M,null,(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e),this.messageList.length?c(ce,{to:(o=this.to)!==null&&o!==void 0?o:"body"},c("div",{class:[`${this.mergedClsPrefix}-message-container`,`${this.mergedClsPrefix}-message-container--${this.placement}`,this.containerClass],key:"message-container",style:this.containerStyle},this.messageList.map(t=>c(bn,Object.assign({ref:a=>{a&&(this.messageRefs[t.key]=a)},internalKey:t.key,onInternalAfterLeave:this.handleAfterLeave},N(t,["destroy"],void 0),{duration:t.duration===void 0?this.duration:t.duration,keepAliveOnHover:t.keepAliveOnHover===void 0?this.keepAliveOnHover:t.keepAliveOnHover,closable:t.closable===void 0?this.closable:t.closable}))))):null)}}),Cn=C({name:"ModalEnvironment",props:Object.assign(Object.assign({},Ie),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const n=k(!0);function o(){const{onInternalAfterLeave:r,internalKey:h,onAfterLeave:p}=e;r&&r(h),p&&p()}function t(){const{onPositiveClick:r}=e;r?Promise.resolve(r()).then(h=>{h!==!1&&i()}):i()}function a(){const{onNegativeClick:r}=e;r?Promise.resolve(r()).then(h=>{h!==!1&&i()}):i()}function d(){const{onClose:r}=e;r?Promise.resolve(r()).then(h=>{h!==!1&&i()}):i()}function u(r){const{onMaskClick:h,maskClosable:p}=e;h&&(h(r),p&&i())}function l(){const{onEsc:r}=e;r&&r()}function i(){n.value=!1}function s(r){n.value=r}return{show:n,hide:i,handleUpdateShow:s,handleAfterLeave:o,handleCloseClick:d,handleNegativeClick:a,handlePositiveClick:t,handleMaskClick:u,handleEsc:l}},render(){const{handleUpdateShow:e,handleAfterLeave:n,handleMaskClick:o,handleEsc:t,show:a}=this;return c(re,Object.assign({},this.$props,{show:a,onUpdateShow:e,onMaskClick:o,onEsc:t,onAfterLeave:n,internalAppear:!0,internalModal:!0}),this.$slots)}}),wn={to:[String,Object]},kn=C({name:"ModalProvider",props:wn,setup(){const e=k([]),n={};function o(u={}){const l=F(),i=$(Object.assign(Object.assign({},u),{key:l,destroy:()=>{var s;(s=n[`n-modal-${l}`])===null||s===void 0||s.hide()}}));return e.value.push(i),i}function t(u){const{value:l}=e;l.splice(l.findIndex(i=>i.key===u),1)}function a(){Object.values(n).forEach(u=>{u?.hide()})}const d={create:o,destroyAll:a};return O(Ee,d),O(Re,{clickedRef:se(64),clickedPositionRef:ae()}),O(Me,e),Object.assign(Object.assign({},d),{modalList:e,modalInstRefs:n,handleAfterLeave:t})},render(){var e,n;return c(M,null,[this.modalList.map(o=>{var t;return c(Cn,N(o,["destroy","render"],{to:(t=o.to)!==null&&t!==void 0?t:this.to,ref:a=>{a===null?delete this.modalInstRefs[`n-modal-${o.key}`]:this.modalInstRefs[`n-modal-${o.key}`]=a},internalKey:o.key,onInternalAfterLeave:this.handleAfterLeave}),{default:o.render})}),(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e)])}}),T=de("n-notification-provider"),On=C({name:"NotificationContainer",props:{scrollable:{type:Boolean,required:!0},placement:{type:String,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:n,wipTransitionCountRef:o}=R(T),t=k(null);return Fe(()=>{var a,d;o.value>0?(a=t?.value)===null||a===void 0||a.classList.add("transitioning"):(d=t?.value)===null||d===void 0||d.classList.remove("transitioning")}),{selfRef:t,mergedTheme:e,mergedClsPrefix:n,transitioning:o}},render(){const{$slots:e,scrollable:n,mergedClsPrefix:o,mergedTheme:t,placement:a}=this;return c("div",{ref:"selfRef",class:[`${o}-notification-container`,n&&`${o}-notification-container--scrollable`,`${o}-notification-container--${a}`]},n?c(_e,{theme:t.peers.Scrollbar,themeOverrides:t.peerOverrides.Scrollbar,contentStyle:{overflow:"hidden"}},e):e)}}),jn={info:()=>c(ge,null),success:()=>c(me,null),warning:()=>c(be,null),error:()=>c(pe,null),default:()=>null},oe={closable:{type:Boolean,default:!0},type:{type:String,default:"default"},avatar:Function,title:[String,Function],description:[String,Function],content:[String,Function],meta:[String,Function],action:[String,Function],onClose:{type:Function,required:!0},keepAliveOnHover:Boolean,onMouseenter:Function,onMouseleave:Function},An=Ge(oe),zn=C({name:"Notification",props:oe,setup(e){const{mergedClsPrefixRef:n,mergedThemeRef:o,props:t}=R(T),{inlineThemeDisabled:a,mergedRtlRef:d}=H(),u=he("Notification",d,n),l=I(()=>{const{type:s}=e,{self:{color:r,textColor:h,closeIconColor:p,closeIconColorHover:g,closeIconColorPressed:f,headerTextColor:x,descriptionTextColor:y,actionTextColor:A,borderRadius:L,headerFontWeight:S,boxShadow:z,lineHeight:B,fontSize:K,closeMargin:D,closeSize:q,width:V,padding:W,closeIconSize:U,closeBorderRadius:X,closeColorHover:J,closeColorPressed:G,titleFontSize:Q,metaFontSize:Y,descriptionFontSize:Z,[j("iconColor",s)]:ee},common:{cubicBezierEaseOut:ne,cubicBezierEaseIn:te,cubicBezierEaseInOut:ke}}=o.value,{left:Oe,right:je,top:Ae,bottom:ze}=Qe(W);return{"--n-color":r,"--n-font-size":K,"--n-text-color":h,"--n-description-text-color":y,"--n-action-text-color":A,"--n-title-text-color":x,"--n-title-font-weight":S,"--n-bezier":ke,"--n-bezier-ease-out":ne,"--n-bezier-ease-in":te,"--n-border-radius":L,"--n-box-shadow":z,"--n-close-border-radius":X,"--n-close-color-hover":J,"--n-close-color-pressed":G,"--n-close-icon-color":p,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":f,"--n-line-height":B,"--n-icon-color":ee,"--n-close-margin":D,"--n-close-size":q,"--n-close-icon-size":U,"--n-width":V,"--n-padding-left":Oe,"--n-padding-right":je,"--n-padding-top":Ae,"--n-padding-bottom":ze,"--n-title-font-size":Q,"--n-meta-font-size":Y,"--n-description-font-size":Z}}),i=a?ve("notification",I(()=>e.type[0]),l,t):void 0;return{mergedClsPrefix:n,showAvatar:I(()=>e.avatar||e.type!=="default"),handleCloseClick(){e.onClose()},rtlEnabled:u,cssVars:a?void 0:l,themeClass:i?.themeClass,onRender:i?.onRender}},render(){var e;const{mergedClsPrefix:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("div",{class:[`${n}-notification-wrapper`,this.themeClass],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:this.cssVars},c("div",{class:[`${n}-notification`,this.rtlEnabled&&`${n}-notification--rtl`,this.themeClass,{[`${n}-notification--closable`]:this.closable,[`${n}-notification--show-avatar`]:this.showAvatar}],style:this.cssVars},this.showAvatar?c("div",{class:`${n}-notification__avatar`},this.avatar?P(this.avatar):this.type!=="default"?c(fe,{clsPrefix:n},{default:()=>jn[this.type]()}):null):null,this.closable?c(ue,{clsPrefix:n,class:`${n}-notification__close`,onClick:this.handleCloseClick}):null,c("div",{ref:"bodyRef",class:`${n}-notification-main`},this.title?c("div",{class:`${n}-notification-main__header`},P(this.title)):null,this.description?c("div",{class:`${n}-notification-main__description`},P(this.description)):null,this.content?c("pre",{class:`${n}-notification-main__content`},P(this.content)):null,this.meta||this.action?c("div",{class:`${n}-notification-main-footer`},this.meta?c("div",{class:`${n}-notification-main-footer__meta`},P(this.meta)):null,this.action?c("div",{class:`${n}-notification-main-footer__action`},P(this.action)):null):null)))}}),Pn=Object.assign(Object.assign({},oe),{duration:Number,onClose:Function,onLeave:Function,onAfterEnter:Function,onAfterLeave:Function,onHide:Function,onAfterShow:Function,onAfterHide:Function}),Ln=C({name:"NotificationEnvironment",props:Object.assign(Object.assign({},Pn),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const{wipTransitionCountRef:n}=R(T),o=k(!0);let t=null;function a(){o.value=!1,t&&window.clearTimeout(t)}function d(f){n.value++,He(()=>{f.style.height=`${f.offsetHeight}px`,f.style.maxHeight="0",f.style.transition="none",f.offsetHeight,f.style.transition="",f.style.maxHeight=f.style.height})}function u(f){n.value--,f.style.height="",f.style.maxHeight="";const{onAfterEnter:x,onAfterShow:y}=e;x&&x(),y&&y()}function l(f){n.value++,f.style.maxHeight=`${f.offsetHeight}px`,f.style.height=`${f.offsetHeight}px`,f.offsetHeight}function i(f){const{onHide:x}=e;x&&x(),f.style.maxHeight="0",f.offsetHeight}function s(){n.value--;const{onAfterLeave:f,onInternalAfterLeave:x,onAfterHide:y,internalKey:A}=e;f&&f(),x(A),y&&y()}function r(){const{duration:f}=e;f&&(t=window.setTimeout(a,f))}function h(f){f.currentTarget===f.target&&t!==null&&(window.clearTimeout(t),t=null)}function p(f){f.currentTarget===f.target&&r()}function g(){const{onClose:f}=e;f?Promise.resolve(f()).then(x=>{x!==!1&&a()}):a()}return le(()=>{e.duration&&(t=window.setTimeout(a,e.duration))}),{show:o,hide:a,handleClose:g,handleAfterLeave:s,handleLeave:i,handleBeforeLeave:l,handleAfterEnter:u,handleBeforeEnter:d,handleMouseenter:h,handleMouseleave:p}},render(){return c(Te,{name:"notification-transition",appear:!0,onBeforeEnter:this.handleBeforeEnter,onAfterEnter:this.handleAfterEnter,onBeforeLeave:this.handleBeforeLeave,onLeave:this.handleLeave,onAfterLeave:this.handleAfterLeave},{default:()=>this.show?c(zn,Object.assign({},xe(this.$props,An),{onClose:this.handleClose,onMouseenter:this.duration&&this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.duration&&this.keepAliveOnHover?this.handleMouseleave:void 0})):null})}}),Sn=b([v("notification-container",`
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `,[b(">",[v("scrollbar",`
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[b(">",[v("scrollbar-container",`
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[v("scrollbar-content",`
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]),m("top, top-right, top-left",`
 top: 12px;
 `,[b("&.transitioning >",[v("scrollbar",[b(">",[v("scrollbar-container",`
 min-height: 100vh !important;
 `)])])])]),m("bottom, bottom-right, bottom-left",`
 bottom: 12px;
 `,[b(">",[v("scrollbar",[b(">",[v("scrollbar-container",[v("scrollbar-content",`
 padding-bottom: 12px;
 `)])])])]),v("notification-wrapper",`
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]),m("top, bottom",`
 left: 50%;
 transform: translateX(-50%);
 `,[v("notification-wrapper",[b("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: scale(0.85);
 `),b("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: scale(1);
 `)])]),m("top",[v("notification-wrapper",`
 transform-origin: top center;
 `)]),m("bottom",[v("notification-wrapper",`
 transform-origin: bottom center;
 `)]),m("top-right, bottom-right",[v("notification",`
 margin-left: 28px;
 margin-right: 16px;
 `)]),m("top-left, bottom-left",[v("notification",`
 margin-left: 16px;
 margin-right: 28px;
 `)]),m("top-right",`
 right: 0;
 `,[E("top-right")]),m("top-left",`
 left: 0;
 `,[E("top-left")]),m("bottom-right",`
 right: 0;
 `,[E("bottom-right")]),m("bottom-left",`
 left: 0;
 `,[E("bottom-left")]),m("scrollable",[m("top-right",`
 top: 0;
 `),m("top-left",`
 top: 0;
 `),m("bottom-right",`
 bottom: 0;
 `),m("bottom-left",`
 bottom: 0;
 `)]),v("notification-wrapper",`
 margin-bottom: 12px;
 `,[b("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),b("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 opacity: 1;
 `),b("&.notification-transition-leave-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),b("&.notification-transition-enter-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]),v("notification",`
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `,[w("avatar",[v("icon",`
 color: var(--n-icon-color);
 `),v("base-icon",`
 color: var(--n-icon-color);
 `)]),m("show-avatar",[v("notification-main",`
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]),m("closable",[v("notification-main",[b("> *:first-child",`
 padding-right: 20px;
 `)]),w("close",`
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),w("avatar",`
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[v("icon","transition: color .3s var(--n-bezier);")]),v("notification-main",`
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `,[v("notification-main-footer",`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `,[w("meta",`
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),w("action",`
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]),w("header",`
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),w("description",`
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),w("content",`
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `,[b("&:first-child","margin: 0;")])])])])]);function E(e){const o=e.split("-")[1]==="left"?"calc(-100%)":"calc(100%)";return v("notification-wrapper",[b("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: translate(${o}, 0);
 `),b("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: translate(0, 0);
 `)])}const we=de("n-notification-api"),In=Object.assign(Object.assign({},_.props),{containerClass:String,containerStyle:[String,Object],to:[String,Object],scrollable:{type:Boolean,default:!0},max:Number,placement:{type:String,default:"top-right"},keepAliveOnHover:Boolean}),Rn=C({name:"NotificationProvider",props:In,setup(e){const{mergedClsPrefixRef:n}=H(e),o=k([]),t={},a=new Set;function d(g){const f=F(),x=()=>{a.add(f),t[f]&&t[f].hide()},y=$(Object.assign(Object.assign({},g),{key:f,destroy:x,hide:x,deactivate:x})),{max:A}=e;if(A&&o.value.length-a.size>=A){let L=!1,S=0;for(const z of o.value){if(!a.has(z.key)){t[z.key]&&(z.destroy(),L=!0);break}S++}L||o.value.splice(S,1)}return o.value.push(y),y}const u=["info","success","warning","error"].map(g=>f=>d(Object.assign(Object.assign({},f),{type:g})));function l(g){a.delete(g),o.value.splice(o.value.findIndex(f=>f.key===g),1)}const i=_("Notification","-notification",Sn,Ze,e,n),s={create:d,info:u[0],success:u[1],warning:u[2],error:u[3],open:h,destroyAll:p},r=k(0);O(we,s),O(T,{props:e,mergedClsPrefixRef:n,mergedThemeRef:i,wipTransitionCountRef:r});function h(g){return d(g)}function p(){Object.values(o.value).forEach(g=>{g.hide()})}return Object.assign({mergedClsPrefix:n,notificationList:o,notificationRefs:t,handleAfterLeave:l},s)},render(){var e,n,o;const{placement:t}=this;return c(M,null,(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e),this.notificationList.length?c(ce,{to:(o=this.to)!==null&&o!==void 0?o:"body"},c(On,{class:this.containerClass,style:this.containerStyle,scrollable:this.scrollable&&t!=="top"&&t!=="bottom",placement:t},{default:()=>this.notificationList.map(a=>c(Ln,Object.assign({ref:d=>{const u=a.key;d===null?delete this.notificationRefs[u]:this.notificationRefs[u]=d}},N(a,["destroy","hide","deactivate"]),{internalKey:a.key,onInternalAfterLeave:this.handleAfterLeave,keepAliveOnHover:a.keepAliveOnHover===void 0?this.keepAliveOnHover:a.keepAliveOnHover})))})):null)}});function En(){const e=R(we,null);return e===null&&Be("use-notification","No outer `n-notification-provider` found."),e}const Mn=C({name:"InjectionExtractor",props:{onSetup:Function},setup(e,{slots:n}){var o;return(o=e.onSetup)===null||o===void 0||o.call(e),()=>{var t;return(t=n.default)===null||t===void 0?void 0:t.call(n)}}}),$n={message:nn,notification:En,loadingBar:Ve,dialog:qe,modal:$e};function Nn({providersAndProps:e,configProviderProps:n}){let o=Ke(a);const t={app:o};function a(){return c(tn,ie(n),{default:()=>e.map(({type:l,Provider:i,props:s})=>c(i,ie(s),{default:()=>c(Mn,{onSetup:()=>t[l]=$n[l]()})}))})}let d;return on&&(d=document.createElement("div"),document.body.appendChild(d),o.mount(d)),Object.assign({unmount:()=>{var l;if(o===null||d===null){De("discrete","unmount call no need because discrete app has been unmounted");return}o.unmount(),(l=d.parentNode)===null||l===void 0||l.removeChild(d),d=null,o=null}},t)}function at(e,{configProviderProps:n,messageProviderProps:o,dialogProviderProps:t,notificationProviderProps:a,loadingBarProviderProps:d,modalProviderProps:u}={}){const l=[];return e.forEach(s=>{switch(s){case"message":l.push({type:s,Provider:yn,props:o});break;case"notification":l.push({type:s,Provider:Rn,props:a});break;case"dialog":l.push({type:s,Provider:hn,props:t});break;case"loadingBar":l.push({type:s,Provider:We,props:d});break;case"modal":l.push({type:s,Provider:kn,props:u})}}),Nn({providersAndProps:l,configProviderProps:n})}export{hn as N,yn as a,kn as b,at as c,Rn as d,un as e,wn as f,xn as m,In as n,En as u};
