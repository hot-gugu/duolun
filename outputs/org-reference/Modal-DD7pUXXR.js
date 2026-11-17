import{g as ve,t as Me,i as Xe,h as Te,v as ke}from"./warn-BfczDB-2.js";import{d as Ye}from"./context-l6GNbigX.js";import{e as g,a as b,S as Ee,d as R,g as p,p as je,q as qe,u as he,k as K,r as Ie,l as me,o as V,m as G,n as We}from"./light-C6iFuy1F.js";import{c as A,l as _,N as Ge,r as xe}from"./Loading-DZbvIzCl.js";import{N as Ae}from"./Close-C8_AQrzr.js";import{a as D,o as H,S as Ne,F as Je,c as Qe,m as _e,j as Ze,k as eo,p as oo,e as to,L as no,z as ro,l as io,g as ao}from"./Scrollbar-BZksWPOS.js";import{c as lo,d as so,m as co}from"./light-C4B2JHYH.js";import{k as be}from"./keysOf-HiGXOwLp.js";import{a as Le}from"./index-BS1Lf1EV.js";import{bn as Q,bf as De,k as He,r as E,d as Z,B as s,h as O,l as uo,C as Y,aN as fo,L as go,y as ue,w as de,z as we,U as X,n as Se,H as J}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{r as L,f as vo}from"./fade-in-scale-up.cssr-CLYwdj1u.js";import{B as ze}from"./Button-Dvr9gQNd.js";import{E as ho,S as mo,I as Pe}from"./Success-D80re6mc.js";import{W as bo}from"./Warning-CNxmuKdi.js";import{i as Ke,h as Ve,g as po,k as fe}from"./keep-BuBMtln4.js";import{u as Co,a as yo}from"./use-lock-html-scroll-C6JwkjTY.js";import{e as ko}from"./ConfigProvider-DLICqQ-B.js";const U=E(null);function Re(e){if(e.clientX>0||e.clientY>0)U.value={x:e.clientX,y:e.clientY};else{const{target:f}=e;if(f instanceof Element){const{left:a,top:o,width:C,height:v}=f.getBoundingClientRect();a>0||o>0?U.value={x:a+C/2,y:o+v/2}:U.value={x:0,y:0}}else U.value=null}}let q=0,Be=!0;function xo(){if(!Ke)return Q(E(null));q===0&&D("click",document,Re,!0);const e=()=>{q+=1};return Be&&(Be=Ve())?(De(e),He(()=>{q-=1,q===0&&H("click",document,Re,!0)})):e(),Q(U)}const wo=E(void 0);let W=0;function $e(){wo.value=Date.now()}let Oe=!0;function So(e){if(!Ke)return Q(E(!1));const f=E(!1);let a=null;function o(){a!==null&&window.clearTimeout(a)}function C(){o(),f.value=!0,a=window.setTimeout(()=>{f.value=!1},e)}W===0&&D("click",window,$e,!0);const v=()=>{W+=1,D("click",window,C,!0)};return Oe&&(Oe=Ve())?(De(v),He(()=>{W-=1,W===0&&H("click",window,$e,!0),H("click",window,C,!0),o()})):v(),Q(f)}const Fe=b("card-content",`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),zo=g([b("card",`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[Ee({background:"var(--n-color-modal)"}),R("hoverable",[g("&:hover","box-shadow: var(--n-box-shadow);")]),R("content-segmented",[g(">",[b("card-content",`
 padding-top: var(--n-padding-bottom);
 `),p("content-scrollbar",[g(">",[b("scrollbar-container",[g(">",[b("card-content",`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),R("content-soft-segmented",[g(">",[b("card-content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),p("content-scrollbar",[g(">",[b("scrollbar-container",[g(">",[b("card-content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),R("footer-segmented",[g(">",[p("footer",`
 padding-top: var(--n-padding-bottom);
 `)])]),R("footer-soft-segmented",[g(">",[p("footer",`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),g(">",[b("card-header",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[p("main",`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),p("extra",`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),p("close",`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),p("action",`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),Fe,b("card-content",[g("&:first-child",`
 padding-top: var(--n-padding-bottom);
 `)]),p("content-scrollbar",`
 display: flex;
 flex-direction: column;
 `,[g(">",[b("scrollbar-container",[g(">",[Fe])])]),g("&:first-child >",[b("scrollbar-container",[g(">",[b("card-content",`
 padding-top: var(--n-padding-bottom);
 `)])])])]),p("footer",`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[g("&:first-child",`
 padding-top: var(--n-padding-bottom);
 `)]),p("action",`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),b("card-cover",`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[g("img",`
 display: block;
 width: 100%;
 `)]),R("bordered",`
 border: 1px solid var(--n-border-color);
 `,[g("&:target","border-color: var(--n-color-target);")]),R("action-segmented",[g(">",[p("action",[g("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),R("content-segmented, content-soft-segmented",[g(">",[b("card-content",`
 transition: border-color 0.3s var(--n-bezier);
 `,[g("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)]),p("content-scrollbar",`
 transition: border-color 0.3s var(--n-bezier);
 `,[g("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),R("footer-segmented, footer-soft-segmented",[g(">",[p("footer",`
 transition: border-color 0.3s var(--n-bezier);
 `,[g("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),R("embedded",`
 background-color: var(--n-color-embedded);
 `)]),je(b("card",`
 background: var(--n-color-modal);
 `,[R("embedded",`
 background-color: var(--n-color-embedded-modal);
 `)])),qe(b("card",`
 background: var(--n-color-popover);
 `,[R("embedded",`
 background-color: var(--n-color-embedded-popover);
 `)]))]),pe={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:"div"},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},Po=be(pe),Ro=Object.assign(Object.assign({},K.props),pe),Bo=Z({name:"Card",props:Ro,slots:Object,setup(e){const f=()=>{const{onClose:c}=e;c&&V(c)},{inlineThemeDisabled:a,mergedClsPrefixRef:o,mergedRtlRef:C,mergedComponentPropsRef:v}=he(e),y=K("Card","-card",zo,lo,e,o),k=Ie("Card",C,o),t=O(()=>{var c,d;return e.size||((d=(c=v?.value)===null||c===void 0?void 0:c.Card)===null||d===void 0?void 0:d.size)||"medium"}),h=O(()=>{const c=t.value,{self:{color:d,colorModal:m,colorTarget:x,textColor:P,titleTextColor:B,titleFontWeight:z,borderColor:u,actionColor:F,borderRadius:M,lineHeight:S,closeIconColor:r,closeIconColorHover:l,closeIconColorPressed:i,closeColorHover:w,closeColorPressed:$,closeBorderRadius:T,closeIconSize:j,closeSize:I,boxShadow:ee,colorPopover:oe,colorEmbedded:te,colorEmbeddedModal:ne,colorEmbeddedPopover:re,[G("padding",c)]:ie,[G("fontSize",c)]:ae,[G("titleFontSize",c)]:le},common:{cubicBezierEaseInOut:se}}=y.value,{top:ce,left:N,bottom:Ue}=Le(ie);return{"--n-bezier":se,"--n-border-radius":M,"--n-color":d,"--n-color-modal":m,"--n-color-popover":oe,"--n-color-embedded":te,"--n-color-embedded-modal":ne,"--n-color-embedded-popover":re,"--n-color-target":x,"--n-text-color":P,"--n-line-height":S,"--n-action-color":F,"--n-title-text-color":B,"--n-title-font-weight":z,"--n-close-icon-color":r,"--n-close-icon-color-hover":l,"--n-close-icon-color-pressed":i,"--n-close-color-hover":w,"--n-close-color-pressed":$,"--n-border-color":u,"--n-box-shadow":ee,"--n-padding-top":ce,"--n-padding-bottom":Ue,"--n-padding-left":N,"--n-font-size":ae,"--n-title-font-size":le,"--n-close-size":I,"--n-close-icon-size":j,"--n-close-border-radius":T}}),n=a?me("card",O(()=>t.value[0]),h,e):void 0;return{rtlEnabled:k,mergedClsPrefix:o,mergedTheme:y,handleCloseClick:f,cssVars:a?void 0:h,themeClass:n?.themeClass,onRender:n?.onRender}},render(){const{segmented:e,bordered:f,hoverable:a,mergedClsPrefix:o,rtlEnabled:C,onRender:v,embedded:y,tag:k,$slots:t}=this;return v?.(),s(k,{class:[`${o}-card`,this.themeClass,y&&`${o}-card--embedded`,{[`${o}-card--rtl`]:C,[`${o}-card--content-scrollable`]:this.contentScrollable,[`${o}-card--content${typeof e!="boolean"&&e.content==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.content,[`${o}-card--footer${typeof e!="boolean"&&e.footer==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.footer,[`${o}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${o}-card--bordered`]:f,[`${o}-card--hoverable`]:a}],style:this.cssVars,role:this.role},A(t.cover,h=>{const n=this.cover?_([this.cover()]):h;return n&&s("div",{class:`${o}-card-cover`,role:"none"},n)}),A(t.header,h=>{const{title:n}=this,c=n?_(typeof n=="function"?[n()]:[n]):h;return c||this.closable?s("div",{class:[`${o}-card-header`,this.headerClass],style:this.headerStyle,role:"heading"},s("div",{class:`${o}-card-header__main`,role:"heading"},c),A(t["header-extra"],d=>{const m=this.headerExtra?_([this.headerExtra()]):d;return m&&s("div",{class:[`${o}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},m)}),this.closable&&s(Ae,{clsPrefix:o,class:`${o}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),A(t.default,h=>{const{content:n}=this,c=n?_(typeof n=="function"?[n()]:[n]):h;return c?this.contentScrollable?s(Ne,{class:`${o}-card__content-scrollbar`,contentClass:[`${o}-card-content`,this.contentClass],contentStyle:this.contentStyle},c):s("div",{class:[`${o}-card-content`,this.contentClass],style:this.contentStyle,role:"none"},c):null}),A(t.footer,h=>{const n=this.footer?_([this.footer()]):h;return n&&s("div",{class:[`${o}-card__footer`,this.footerClass],style:this.footerStyle,role:"none"},n)}),A(t.action,h=>{const n=this.action?_([this.action()]):h;return n&&s("div",{class:`${o}-card__action`,role:"none"},n)}))}}),Ce={icon:Function,type:{type:String,default:"default"},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},$o=be(Ce),Oo=g([b("dialog",`
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[p("icon",`
 color: var(--n-icon-color);
 `),R("bordered",`
 border: var(--n-border);
 `),R("icon-top",[p("close",`
 margin: var(--n-close-margin);
 `),p("icon",`
 margin: var(--n-icon-margin);
 `),p("content",`
 text-align: center;
 `),p("title",`
 justify-content: center;
 `),p("action",`
 justify-content: center;
 `)]),R("icon-left",[p("icon",`
 margin: var(--n-icon-margin);
 `),R("closable",[p("title",`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),p("close",`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),p("content",`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[R("last","margin-bottom: 0;")]),p("action",`
 display: flex;
 justify-content: flex-end;
 `,[g("> *:not(:last-child)",`
 margin-right: var(--n-action-space);
 `)]),p("icon",`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),p("title",`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),b("dialog-icon-container",`
 display: flex;
 justify-content: center;
 `)]),je(b("dialog",`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),b("dialog",[Ee(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),Fo={default:()=>s(Pe,null),info:()=>s(Pe,null),success:()=>s(mo,null),warning:()=>s(bo,null),error:()=>s(ho,null)},Mo=Z({name:"Dialog",alias:["NimbusConfirmCard","Confirm"],props:Object.assign(Object.assign({},K.props),Ce),slots:Object,setup(e){const{mergedComponentPropsRef:f,mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedRtlRef:C}=he(e),v=Ie("Dialog",C,a),y=O(()=>{var m,x;const{iconPlacement:P}=e;return P||((x=(m=f?.value)===null||m===void 0?void 0:m.Dialog)===null||x===void 0?void 0:x.iconPlacement)||"left"});function k(m){const{onPositiveClick:x}=e;x&&x(m)}function t(m){const{onNegativeClick:x}=e;x&&x(m)}function h(){const{onClose:m}=e;m&&m()}const n=K("Dialog","-dialog",Oo,so,e,a),c=O(()=>{const{type:m}=e,x=y.value,{common:{cubicBezierEaseInOut:P},self:{fontSize:B,lineHeight:z,border:u,titleTextColor:F,textColor:M,color:S,closeBorderRadius:r,closeColorHover:l,closeColorPressed:i,closeIconColor:w,closeIconColorHover:$,closeIconColorPressed:T,closeIconSize:j,borderRadius:I,titleFontWeight:ee,titleFontSize:oe,padding:te,iconSize:ne,actionSpace:re,contentMargin:ie,closeSize:ae,[x==="top"?"iconMarginIconTop":"iconMargin"]:le,[x==="top"?"closeMarginIconTop":"closeMargin"]:se,[G("iconColor",m)]:ce}}=n.value,N=Le(le);return{"--n-font-size":B,"--n-icon-color":ce,"--n-bezier":P,"--n-close-margin":se,"--n-icon-margin-top":N.top,"--n-icon-margin-right":N.right,"--n-icon-margin-bottom":N.bottom,"--n-icon-margin-left":N.left,"--n-icon-size":ne,"--n-close-size":ae,"--n-close-icon-size":j,"--n-close-border-radius":r,"--n-close-color-hover":l,"--n-close-color-pressed":i,"--n-close-icon-color":w,"--n-close-icon-color-hover":$,"--n-close-icon-color-pressed":T,"--n-color":S,"--n-text-color":M,"--n-border-radius":I,"--n-padding":te,"--n-line-height":z,"--n-border":u,"--n-content-margin":ie,"--n-title-font-size":oe,"--n-title-font-weight":ee,"--n-title-text-color":F,"--n-action-space":re}}),d=o?me("dialog",O(()=>`${e.type[0]}${y.value[0]}`),c,e):void 0;return{mergedClsPrefix:a,rtlEnabled:v,mergedIconPlacement:y,mergedTheme:n,handlePositiveClick:k,handleNegativeClick:t,handleCloseClick:h,cssVars:o?void 0:c,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var e;const{bordered:f,mergedIconPlacement:a,cssVars:o,closable:C,showIcon:v,title:y,content:k,action:t,negativeText:h,positiveText:n,positiveButtonProps:c,negativeButtonProps:d,handlePositiveClick:m,handleNegativeClick:x,mergedTheme:P,loading:B,type:z,mergedClsPrefix:u}=this;(e=this.onRender)===null||e===void 0||e.call(this);const F=v?s(Ge,{clsPrefix:u,class:`${u}-dialog__icon`},{default:()=>A(this.$slots.icon,S=>S||(this.icon?L(this.icon):Fo[this.type]()))}):null,M=A(this.$slots.action,S=>S||n||h||t?s("div",{class:[`${u}-dialog__action`,this.actionClass],style:this.actionStyle},S||(t?[L(t)]:[this.negativeText&&s(ze,Object.assign({theme:P.peers.Button,themeOverrides:P.peerOverrides.Button,ghost:!0,size:"small",onClick:x},d),{default:()=>L(this.negativeText)}),this.positiveText&&s(ze,Object.assign({theme:P.peers.Button,themeOverrides:P.peerOverrides.Button,size:"small",type:z==="default"?"primary":z,disabled:B,loading:B,onClick:m},c),{default:()=>L(this.positiveText)})])):null);return s("div",{class:[`${u}-dialog`,this.themeClass,this.closable&&`${u}-dialog--closable`,`${u}-dialog--icon-${a}`,f&&`${u}-dialog--bordered`,this.rtlEnabled&&`${u}-dialog--rtl`],style:o,role:"dialog"},C?A(this.$slots.close,S=>{const r=[`${u}-dialog__close`,this.rtlEnabled&&`${u}-dialog--rtl`];return S?s("div",{class:r},S):s(Ae,{focusable:this.closeFocusable,clsPrefix:u,class:r,onClick:this.handleCloseClick})}):null,v&&a==="top"?s("div",{class:`${u}-dialog-icon-container`},F):null,s("div",{class:[`${u}-dialog__title`,this.titleClass],style:this.titleStyle},v&&a==="left"?F:null,xe(this.$slots.header,()=>[L(y)])),s("div",{class:[`${u}-dialog__content`,M?"":`${u}-dialog__content--last`,this.contentClass],style:this.contentStyle},xe(this.$slots.default,()=>[L(k)])),M)}}),nt=ve("n-modal-provider"),To=ve("n-modal-api"),Eo=ve("n-modal-reactive-list");function rt(){const e=Y(To,null);return e===null&&Me("use-modal","No outer <n-modal-provider /> founded."),e}function it(){const e=Y(Eo,null);return e===null&&Me("use-modal-reactive-list","No outer <n-modal-provider /> founded."),e}const ge="n-draggable";function jo(e,f){let a;const o=O(()=>e.value!==!1),C=O(()=>o.value?ge:""),v=O(()=>{const t=e.value;return t===!0||t===!1?!0:t?t.bounds!=="none":!0});function y(t){const h=t.querySelector(`.${ge}`);if(!h||!C.value)return;let n=0,c=0,d=0,m=0,x=0,P=0,B,z=null,u=null;function F(l){l.preventDefault(),B=l;const{x:i,y:w,right:$,bottom:T}=t.getBoundingClientRect();c=i,m=w,n=window.innerWidth-$,d=window.innerHeight-T;const{left:j,top:I}=t.style;x=+I.slice(0,-2),P=+j.slice(0,-2)}function M(){u&&(t.style.top=`${u.y}px`,t.style.left=`${u.x}px`,u=null),z=null}function S(l){if(!B)return;const{clientX:i,clientY:w}=B;let $=l.clientX-i,T=l.clientY-w;v.value&&($>n?$=n:-$>c&&($=-c),T>d?T=d:-T>m&&(T=-m));const j=$+P,I=T+x;u={x:j,y:I},z||(z=requestAnimationFrame(M))}function r(){B=void 0,z&&(cancelAnimationFrame(z),z=null),u&&(t.style.top=`${u.y}px`,t.style.left=`${u.x}px`,u=null),f.onEnd(t)}D("mousedown",h,F),D("mousemove",window,S),D("mouseup",window,r),a=()=>{z&&cancelAnimationFrame(z),H("mousedown",h,F),H("mousemove",window,S),H("mouseup",window,r)}}function k(){a&&(a(),a=void 0)}return uo(k),{stopDrag:k,startDrag:y,draggableRef:o,draggableClassRef:C}}const ye=Object.assign(Object.assign({},pe),Ce),Io=be(ye),Ao=Z({name:"ModalBody",inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},ye),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(e){const f=E(null),a=E(null),o=E(e.show),C=E(null),v=E(null),y=Y(_e);let k=null;de(X(e,"show"),i=>{i&&(k=y.getMousePosition())},{immediate:!0});const{stopDrag:t,startDrag:h,draggableRef:n,draggableClassRef:c}=jo(X(e,"draggable"),{onEnd:i=>{P(i)}}),d=O(()=>Se([e.titleClass,c.value])),m=O(()=>Se([e.headerClass,c.value]));de(X(e,"show"),i=>{i&&(o.value=!0)}),Co(O(()=>e.blockScroll&&o.value));function x(){if(y.transformOriginRef.value==="center")return"";const{value:i}=C,{value:w}=v;if(i===null||w===null)return"";if(a.value){const $=a.value.containerScrollTop;return`${i}px ${w+$}px`}return""}function P(i){if(y.transformOriginRef.value==="center"||!k||!a.value)return;const w=a.value.containerScrollTop,{offsetLeft:$,offsetTop:T}=i,j=k.y,I=k.x;C.value=-($-I),v.value=-(T-j-w),i.style.transformOrigin=x()}function B(i){we(()=>{P(i)})}function z(i){i.style.transformOrigin=x(),e.onBeforeLeave()}function u(i){const w=i;n.value&&h(w),e.onAfterEnter&&e.onAfterEnter(w)}function F(){o.value=!1,C.value=null,v.value=null,t(),e.onAfterLeave()}function M(){const{onClose:i}=e;i&&i()}function S(){e.onNegativeClick()}function r(){e.onPositiveClick()}const l=E(null);return de(l,i=>{i&&we(()=>{const w=i.el;w&&f.value!==w&&(f.value=w)})}),J(Ze,f),J(eo,null),J(oo,null),{mergedTheme:y.mergedThemeRef,appear:y.appearRef,isMounted:y.isMountedRef,mergedClsPrefix:y.mergedClsPrefixRef,bodyRef:f,scrollbarRef:a,draggableClass:c,displayed:o,childNodeRef:l,cardHeaderClass:m,dialogTitleClass:d,handlePositiveClick:r,handleNegativeClick:S,handleCloseClick:M,handleAfterEnter:u,handleAfterLeave:F,handleBeforeLeave:z,handleEnter:B}},render(){const{$slots:e,$attrs:f,handleEnter:a,handleAfterEnter:o,handleAfterLeave:C,handleBeforeLeave:v,preset:y,mergedClsPrefix:k}=this;let t=null;if(!y){if(t=po("default",e.default,{draggableClass:this.draggableClass}),!t){Xe("modal","default slot is empty");return}t=fo(t),t.props=go({class:`${k}-modal`},f,t.props||{})}return this.displayDirective==="show"||this.displayed||this.show?ue(s("div",{role:"none",class:[`${k}-modal-body-wrapper`,this.maskHidden&&`${k}-modal-body-wrapper--mask-hidden`]},s(Ne,{ref:"scrollbarRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${k}-modal-scroll-content`},{default:()=>{var h;return[(h=this.renderMask)===null||h===void 0?void 0:h.call(this),s(Je,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>{var n;return s(Te,{name:"fade-in-scale-up-transition",appear:(n=this.appear)!==null&&n!==void 0?n:this.isMounted,onEnter:a,onAfterEnter:o,onAfterLeave:C,onBeforeLeave:v},{default:()=>{const c=[[ke,this.show]],{onClickoutside:d}=this;return d&&c.push([Qe,this.onClickoutside,void 0,{capture:!0}]),ue(this.preset==="confirm"||this.preset==="dialog"?s(Mo,Object.assign({},this.$attrs,{class:[`${k}-modal`,this.$attrs.class],ref:"bodyRef",theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},fe(this.$props,$o),{titleClass:this.dialogTitleClass,"aria-modal":"true"}),e):this.preset==="card"?s(Bo,Object.assign({},this.$attrs,{ref:"bodyRef",class:[`${k}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},fe(this.$props,Po),{headerClass:this.cardHeaderClass,"aria-modal":"true",role:"dialog"}),e):this.childNodeRef=t,c)}})}})]}})),[[ke,this.displayDirective==="if"||this.displayed||this.show]]):null}}),No=g([b("modal-container",`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),b("modal-mask",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[to({enterDuration:".25s",leaveDuration:".25s",enterCubicBezier:"var(--n-bezier-ease-out)",leaveCubicBezier:"var(--n-bezier-ease-out)"})]),b("modal-body-wrapper",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[b("modal-scroll-content",`
 min-height: 100%;
 display: flex;
 position: relative;
 `),R("mask-hidden","pointer-events: none;",[b("modal-scroll-content",[g("> *",`
 pointer-events: all;
 `)])])]),b("modal",`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[vo({duration:".25s",enterScale:".5"}),g(`.${ge}`,`
 cursor: move;
 user-select: none;
 `)])]),_o=Object.assign(Object.assign(Object.assign(Object.assign({},K.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:"if"},transformOrigin:{type:String,default:"mouse"},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),ye),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),at=Z({name:"Modal",inheritAttrs:!1,props:_o,slots:Object,setup(e){const f=E(null),{mergedClsPrefixRef:a,namespaceRef:o,inlineThemeDisabled:C}=he(e),v=K("Modal","-modal",No,co,e,a),y=So(64),k=xo(),t=We(),h=e.internalDialog?Y(Ye,null):null,n=e.internalModal?Y(io,null):null,c=yo();function d(r){const{onUpdateShow:l,"onUpdate:show":i,onHide:w}=e;l&&V(l,r),i&&V(i,r),w&&!r&&w(r)}function m(){const{onClose:r}=e;r?Promise.resolve(r()).then(l=>{l!==!1&&d(!1)}):d(!1)}function x(){const{onPositiveClick:r}=e;r?Promise.resolve(r()).then(l=>{l!==!1&&d(!1)}):d(!1)}function P(){const{onNegativeClick:r}=e;r?Promise.resolve(r()).then(l=>{l!==!1&&d(!1)}):d(!1)}function B(){const{onBeforeLeave:r,onBeforeHide:l}=e;r&&V(r),l&&l()}function z(){const{onAfterLeave:r,onAfterHide:l}=e;r&&V(r),l&&l()}function u(r){var l;const{onMaskClick:i}=e;i&&i(r),e.maskClosable&&!((l=f.value)===null||l===void 0)&&l.contains(ao(r))&&d(!1)}function F(r){var l;(l=e.onEsc)===null||l===void 0||l.call(e),e.show&&e.closeOnEsc&&ko(r)&&(c.value||d(!1))}J(_e,{getMousePosition:()=>{const r=h||n;if(r){const{clickedRef:l,clickedPositionRef:i}=r;if(l.value&&i.value)return i.value}return y.value?k.value:null},mergedClsPrefixRef:a,mergedThemeRef:v,isMountedRef:t,appearRef:X(e,"internalAppear"),transformOriginRef:X(e,"transformOrigin")});const M=O(()=>{const{common:{cubicBezierEaseOut:r},self:{boxShadow:l,color:i,textColor:w}}=v.value;return{"--n-bezier-ease-out":r,"--n-box-shadow":l,"--n-color":i,"--n-text-color":w}}),S=C?me("theme-class",void 0,M,e):void 0;return{mergedClsPrefix:a,namespace:o,isMounted:t,containerRef:f,presetProps:O(()=>fe(e,Io)),handleEsc:F,handleAfterLeave:z,handleClickoutside:u,handleBeforeLeave:B,doUpdateShow:d,handleNegativeClick:P,handlePositiveClick:x,handleCloseClick:m,cssVars:C?void 0:M,themeClass:S?.themeClass,onRender:S?.onRender}},render(){const{mergedClsPrefix:e}=this;return s(no,{to:this.to,show:this.show},{default:()=>{var f;(f=this.onRender)===null||f===void 0||f.call(this);const{showMask:a}=this;return ue(s("div",{role:"none",ref:"containerRef",class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},s(Ao,Object.assign({style:this.overlayStyle},this.$attrs,{ref:"bodyWrapper",displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!a},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:a?void 0:this.handleClickoutside,renderMask:a?()=>{var o;return s(Te,{name:"fade-in-transition",key:"mask",appear:(o=this.internalAppear)!==null&&o!==void 0?o:this.isMounted},{default:()=>this.show?s("div",{"aria-hidden":!0,ref:"containerRef",class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null})}:void 0}),this.$slots)),[[ro,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{at as N,Bo as a,Mo as b,Ro as c,Ce as d,it as e,$o as f,xo as g,So as h,nt as i,To as j,Eo as k,_o as m,rt as u};
