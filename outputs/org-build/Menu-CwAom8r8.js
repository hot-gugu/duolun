import{L as je,s as Ke,N as fe,a as d,d as S,u as ae,k as D,l as ce,g as a,e as z,o as B,j as q,h as re}from"./light-C6iFuy1F.js";import{s as Ve,S as xe,t as Ce,f as ee,u as ne,V as De,b as Ue}from"./Scrollbar-BZksWPOS.js";import{g as Y}from"./warn-BfczDB-2.js";import{d as _,B as s,h as x,r as F,H as U,C as j,U as Z,F as Ge,J as ge,L as qe}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{N as ye}from"./Loading-DZbvIzCl.js";import{C as Ye}from"./ChevronRight-DgOjBikf.js";import{f as We}from"./fade-in-height-expand.cssr-D4K_l8Yn.js";import{r as V}from"./fade-in-scale-up.cssr-CLYwdj1u.js";import{k as se}from"./keysOf-HiGXOwLp.js";import{N as Xe}from"./Tooltip-D37N6fPH.js";import{k as oe}from"./keep-BuBMtln4.js";import{N as Je}from"./Dropdown-CmbliNR4.js";import{N as Ze}from"./FadeInExpandTransition-BhYgIGUe.js";import{X as Qe}from"./light-DdZBKeZR.js";import{V as eo,c as te}from"./light-DppTtB0P.js";import{f as oo}from"./use-locale-jSpv77sT.js";const to=_({name:"ChevronDownFilled",render(){return s("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}});function ro(e){const{baseColor:r,textColor2:t,bodyColor:l,cardColor:c,dividerColor:i,actionColor:v,scrollbarColor:p,scrollbarColorHover:m,invertedColor:g}=e;return{textColor:t,textColorInverted:"#FFF",color:l,colorEmbedded:v,headerColor:c,headerColorInverted:g,footerColor:v,footerColorInverted:g,headerBorderColor:i,headerBorderColorInverted:g,footerBorderColor:i,footerBorderColorInverted:g,siderBorderColor:i,siderBorderColorInverted:g,siderColor:c,siderColorInverted:g,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:r,siderToggleButtonIconColor:t,siderToggleButtonIconColorInverted:t,siderToggleBarColor:fe(l,p),siderToggleBarColorHover:fe(l,m),__invertScrollbar:"true"}}const ze=je({name:"Layout",common:Ke,peers:{Scrollbar:Ve},self:ro}),Ie=Y("n-layout-sider"),Se={type:String,default:"static"},no=d("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[d("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),S("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),io={embedded:Boolean,position:Se,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},we=Y("n-layout");function lo(e){return _({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},D.props),io),setup(r){const t=F(null),l=F(null),{mergedClsPrefixRef:c,inlineThemeDisabled:i}=ae(r),v=D("Layout","-layout",no,ze,r,c);function p(I,w){if(r.nativeScrollbar){const{value:T}=t;T&&(w===void 0?T.scrollTo(I):T.scrollTo(I,w))}else{const{value:T}=l;T&&T.scrollTo(I,w)}}U(we,r);let m=0,g=0;const k=I=>{var w;const T=I.target;m=T.scrollLeft,g=T.scrollTop,(w=r.onScroll)===null||w===void 0||w.call(r,I)};Ce(()=>{if(r.nativeScrollbar){const I=t.value;I&&(I.scrollTop=g,I.scrollLeft=m)}});const H={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},h={scrollTo:p},A=x(()=>{const{common:{cubicBezierEaseInOut:I},self:w}=v.value;return{"--n-bezier":I,"--n-color":r.embedded?w.colorEmbedded:w.color,"--n-text-color":w.textColor}}),N=i?ce("layout",x(()=>r.embedded?"e":""),A,r):void 0;return Object.assign({mergedClsPrefix:c,scrollableElRef:t,scrollbarInstRef:l,hasSiderStyle:H,mergedTheme:v,handleNativeElScroll:k,cssVars:i?void 0:A,themeClass:N?.themeClass,onRender:N?.onRender},h)},render(){var r;const{mergedClsPrefix:t,hasSider:l}=this;(r=this.onRender)===null||r===void 0||r.call(this);const c=l?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return s("div",{class:i,style:this.cssVars},this.nativeScrollbar?s("div",{ref:"scrollableElRef",class:[`${t}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,c],onScroll:this.handleNativeElScroll},this.$slots):s(xe,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,c]}),this.$slots))}})}const _o=lo(!1),ao=d("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[S("bordered",[a("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),a("left-placement",[S("bordered",[a("border",`
 right: 0;
 `)])]),S("right-placement",`
 justify-content: flex-start;
 `,[S("bordered",[a("border",`
 left: 0;
 `)]),S("collapsed",[d("layout-toggle-button",[d("base-icon",`
 transform: rotate(180deg);
 `)]),d("layout-toggle-bar",[z("&:hover",[a("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),a("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),d("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[d("base-icon",`
 transform: rotate(0);
 `)]),d("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[z("&:hover",[a("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),a("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),S("collapsed",[d("layout-toggle-bar",[z("&:hover",[a("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),a("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),d("layout-toggle-button",[d("base-icon",`
 transform: rotate(0);
 `)])]),d("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[d("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),d("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[a("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),a("bottom",`
 position: absolute;
 top: 34px;
 `),z("&:hover",[a("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),a("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),a("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),z("&:hover",[a("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),a("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),d("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),S("show-content",[d("layout-sider-scroll-container",{opacity:1})]),S("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),co=_({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},s("div",{class:`${e}-layout-toggle-bar__top`}),s("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),so=_({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},s(ye,{clsPrefix:e},{default:()=>s(Ye,null)}))}}),uo={position:Se,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},$o=_({name:"LayoutSider",props:Object.assign(Object.assign({},D.props),uo),setup(e){const r=j(we),t=F(null),l=F(null),c=F(e.defaultCollapsed),i=ne(Z(e,"collapsed"),c),v=x(()=>ee(i.value?e.collapsedWidth:e.width)),p=x(()=>e.collapseMode!=="transform"?{}:{minWidth:ee(e.width)}),m=x(()=>r?r.siderPlacement:"left");function g(P,C){if(e.nativeScrollbar){const{value:y}=t;y&&(C===void 0?y.scrollTo(P):y.scrollTo(P,C))}else{const{value:y}=l;y&&y.scrollTo(P,C)}}function k(){const{"onUpdate:collapsed":P,onUpdateCollapsed:C,onExpand:y,onCollapse:M}=e,{value:$}=i;C&&B(C,!$),P&&B(P,!$),c.value=!$,$?y&&B(y):M&&B(M)}let H=0,h=0;const A=P=>{var C;const y=P.target;H=y.scrollLeft,h=y.scrollTop,(C=e.onScroll)===null||C===void 0||C.call(e,P)};Ce(()=>{if(e.nativeScrollbar){const P=t.value;P&&(P.scrollTop=h,P.scrollLeft=H)}}),U(Ie,{collapsedRef:i,collapseModeRef:Z(e,"collapseMode")});const{mergedClsPrefixRef:N,inlineThemeDisabled:I}=ae(e),w=D("Layout","-layout-sider",ao,ze,e,N);function T(P){var C,y;P.propertyName==="max-width"&&(i.value?(C=e.onAfterLeave)===null||C===void 0||C.call(e):(y=e.onAfterEnter)===null||y===void 0||y.call(e))}const G={scrollTo:g},L=x(()=>{const{common:{cubicBezierEaseInOut:P},self:C}=w.value,{siderToggleButtonColor:y,siderToggleButtonBorder:M,siderToggleBarColor:$,siderToggleBarColorHover:Q}=C,O={"--n-bezier":P,"--n-toggle-button-color":y,"--n-toggle-button-border":M,"--n-toggle-bar-color":$,"--n-toggle-bar-color-hover":Q};return e.inverted?(O["--n-color"]=C.siderColorInverted,O["--n-text-color"]=C.textColorInverted,O["--n-border-color"]=C.siderBorderColorInverted,O["--n-toggle-button-icon-color"]=C.siderToggleButtonIconColorInverted,O.__invertScrollbar=C.__invertScrollbar):(O["--n-color"]=C.siderColor,O["--n-text-color"]=C.textColor,O["--n-border-color"]=C.siderBorderColor,O["--n-toggle-button-icon-color"]=C.siderToggleButtonIconColor),O}),E=I?ce("layout-sider",x(()=>e.inverted?"a":"b"),L,e):void 0;return Object.assign({scrollableElRef:t,scrollbarInstRef:l,mergedClsPrefix:N,mergedTheme:w,styleMaxWidth:v,mergedCollapsed:i,scrollContainerStyle:p,siderPlacement:m,handleNativeElScroll:A,handleTransitionend:T,handleTriggerClick:k,inlineThemeDisabled:I,cssVars:L,themeClass:E?.themeClass,onRender:E?.onRender},G)},render(){var e;const{mergedClsPrefix:r,mergedCollapsed:t,showTrigger:l}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("aside",{class:[`${r}-layout-sider`,this.themeClass,`${r}-layout-sider--${this.position}-positioned`,`${r}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${r}-layout-sider--bordered`,t&&`${r}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${r}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ee(this.width)}]},this.nativeScrollbar?s("div",{class:[`${r}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):s(xe,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),l?l==="bar"?s(co,{clsPrefix:r,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):s(so,{clsPrefix:r,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?s("div",{class:`${r}-layout-sider__border`}):null)}}),W=Y("n-menu"),Re=Y("n-submenu"),de=Y("n-menu-item-group"),pe=[z("&::before","background-color: var(--n-item-color-hover);"),a("arrow",`
 color: var(--n-arrow-color-hover);
 `),a("icon",`
 color: var(--n-item-icon-color-hover);
 `),d("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[z("a",`
 color: var(--n-item-text-color-hover);
 `),a("extra",`
 color: var(--n-item-text-color-hover);
 `)])],be=[a("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),d("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[z("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),a("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],vo=z([d("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[S("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[d("submenu","margin: 0;"),d("menu-item","margin: 0;"),d("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[z("&::before","display: none;"),S("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),d("menu-item-content",[S("selected",[a("icon","color: var(--n-item-icon-color-active-horizontal);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[z("a","color: var(--n-item-text-color-active-horizontal);"),a("extra","color: var(--n-item-text-color-active-horizontal);")])]),S("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[d("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[z("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),a("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),a("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),q("disabled",[q("selected, child-active",[z("&:focus-within",be)]),S("selected",[K(null,[a("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[z("a","color: var(--n-item-text-color-active-hover-horizontal);"),a("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),S("child-active",[K(null,[a("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[z("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),a("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),K("border-bottom: 2px solid var(--n-border-color-horizontal);",be)]),d("menu-item-content-header",[z("a","color: var(--n-item-text-color-horizontal);")])])]),q("responsive",[d("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),S("collapsed",[d("menu-item-content",[S("selected",[z("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),d("menu-item-content-header","opacity: 0;"),a("arrow","opacity: 0;"),a("icon","color: var(--n-item-icon-color-collapsed);")])]),d("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),d("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z("> *","z-index: 1;"),z("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),S("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),S("collapsed",[a("arrow","transform: rotate(0);")]),S("selected",[z("&::before","background-color: var(--n-item-color-active);"),a("arrow","color: var(--n-arrow-color-active);"),a("icon","color: var(--n-item-icon-color-active);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[z("a","color: var(--n-item-text-color-active);"),a("extra","color: var(--n-item-text-color-active);")])]),S("child-active",[d("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[z("a",`
 color: var(--n-item-text-color-child-active);
 `),a("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),a("arrow",`
 color: var(--n-arrow-color-child-active);
 `),a("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),q("disabled",[q("selected, child-active",[z("&:focus-within",pe)]),S("selected",[K(null,[a("arrow","color: var(--n-arrow-color-active-hover);"),a("icon","color: var(--n-item-icon-color-active-hover);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[z("a","color: var(--n-item-text-color-active-hover);"),a("extra","color: var(--n-item-text-color-active-hover);")])])]),S("child-active",[K(null,[a("arrow","color: var(--n-arrow-color-child-active-hover);"),a("icon","color: var(--n-item-icon-color-child-active-hover);"),d("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[z("a","color: var(--n-item-text-color-child-active-hover);"),a("extra","color: var(--n-item-text-color-child-active-hover);")])])]),S("selected",[K(null,[z("&::before","background-color: var(--n-item-color-active-hover);")])]),K(null,pe)]),a("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),a("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),d("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[z("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[z("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),a("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),d("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[d("menu-item-content",`
 height: var(--n-item-height);
 `),d("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[We({duration:".2s"})])]),d("menu-item-group",[d("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),d("menu-tooltip",[z("a",`
 color: inherit;
 text-decoration: none;
 `)]),d("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function K(e,r){return[S("hover",e,r),z("&:hover",e,r)]}const Pe=_({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:r}=j(W);return{menuProps:r,style:x(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:x(()=>{const{maxIconSize:t,activeIconSize:l,iconMarginRight:c}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${l}px`,marginRight:`${c}px`}})}},render(){const{clsPrefix:e,tmNode:r,menuProps:{renderIcon:t,renderLabel:l,renderExtra:c,expandIcon:i}}=this,v=t?t(r.rawNode):V(this.icon);return s("div",{onClick:p=>{var m;(m=this.onClick)===null||m===void 0||m.call(this,p)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},v&&s("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[v]),s("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:l?l(r.rawNode):V(this.title),this.extra||c?s("span",{class:`${e}-menu-item-content-header__extra`}," ",c?c(r.rawNode):V(this.extra)):null),this.showArrow?s(ye,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(r.rawNode):s(to,null)}):null)}}),J=8;function ue(e){const r=j(W),{props:t,mergedCollapsedRef:l}=r,c=j(Re,null),i=j(de,null),v=x(()=>t.mode==="horizontal"),p=x(()=>v.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),m=x(()=>{var h;return Math.max((h=t.collapsedIconSize)!==null&&h!==void 0?h:t.iconSize,t.iconSize)}),g=x(()=>{var h;return!v.value&&e.root&&l.value&&(h=t.collapsedIconSize)!==null&&h!==void 0?h:t.iconSize}),k=x(()=>{if(v.value)return;const{collapsedWidth:h,indent:A,rootIndent:N}=t,{root:I,isGroup:w}=e,T=N===void 0?A:N;return I?l.value?h/2-m.value/2:T:i&&typeof i.paddingLeftRef.value=="number"?A/2+i.paddingLeftRef.value:c&&typeof c.paddingLeftRef.value=="number"?(w?A/2:A)+c.paddingLeftRef.value:0}),H=x(()=>{const{collapsedWidth:h,indent:A,rootIndent:N}=t,{value:I}=m,{root:w}=e;return v.value||!w||!l.value?J:(N===void 0?A:N)+I+J-(h+I)/2});return{dropdownPlacement:p,activeIconSize:g,maxIconSize:m,paddingLeft:k,iconMarginRight:H,NMenu:r,NSubmenu:c,NMenuOptionGroup:i}}const ve={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},mo=_({name:"MenuDivider",setup(){const e=j(W),{mergedClsPrefixRef:r,isHorizontalRef:t}=e;return()=>t.value?null:s("div",{class:`${r.value}-menu-divider`})}}),Ne=Object.assign(Object.assign({},ve),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),ho=se(Ne),fo=_({name:"MenuOption",props:Ne,setup(e){const r=ue(e),{NSubmenu:t,NMenu:l,NMenuOptionGroup:c}=r,{props:i,mergedClsPrefixRef:v,mergedCollapsedRef:p}=l,m=t?t.mergedDisabledRef:c?c.mergedDisabledRef:{value:!1},g=x(()=>m.value||e.disabled);function k(h){const{onClick:A}=e;A&&A(h)}function H(h){g.value||(l.doSelect(e.internalKey,e.tmNode.rawNode),k(h))}return{mergedClsPrefix:v,dropdownPlacement:r.dropdownPlacement,paddingLeft:r.paddingLeft,iconMarginRight:r.iconMarginRight,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,mergedTheme:l.mergedThemeRef,menuProps:i,dropdownEnabled:re(()=>e.root&&p.value&&i.mode!=="horizontal"&&!g.value),selected:re(()=>l.mergedValueRef.value===e.internalKey),mergedDisabled:g,handleClick:H}},render(){const{mergedClsPrefix:e,mergedTheme:r,tmNode:t,menuProps:{renderLabel:l,nodeProps:c}}=this,i=c?.(t.rawNode);return s("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i?.class]}),s(Xe,{theme:r.peers.Tooltip,themeOverrides:r.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>l?l(t.rawNode):V(this.title),trigger:()=>s(Pe,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Te=Object.assign(Object.assign({},ve),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),go=se(Te),po=_({name:"MenuOptionGroup",props:Te,setup(e){const r=ue(e),{NSubmenu:t}=r,l=x(()=>t?.mergedDisabledRef.value?!0:e.tmNode.disabled);U(de,{paddingLeftRef:r.paddingLeft,mergedDisabledRef:l});const{mergedClsPrefixRef:c,props:i}=j(W);return function(){const{value:v}=c,p=r.paddingLeft.value,{nodeProps:m}=i,g=m?.(e.tmNode.rawNode);return s("div",{class:`${v}-menu-item-group`,role:"group"},s("div",Object.assign({},g,{class:[`${v}-menu-item-group-title`,g?.class],style:[g?.style||"",p!==void 0?`padding-left: ${p}px;`:""]}),V(e.title),e.extra?s(Ge,null," ",V(e.extra)):null),s("div",null,e.tmNodes.map(k=>me(k,i))))}}});function ie(e){return e.type==="divider"||e.type==="render"}function bo(e){return e.type==="divider"}function me(e,r){const{rawNode:t}=e,{show:l}=t;if(l===!1)return null;if(ie(t))return bo(t)?s(mo,Object.assign({key:e.key},t.props)):null;const{labelField:c}=r,{key:i,level:v,isGroup:p}=e,m=Object.assign(Object.assign({},t),{title:t.title||t[c],extra:t.titleExtra||t.extra,key:i,internalKey:i,level:v,root:v===0,isGroup:p});return e.children?e.isGroup?s(po,oe(m,go,{tmNode:e,tmNodes:e.children,key:i})):s(le,oe(m,xo,{key:i,rawNodes:t[r.childrenField],tmNodes:e.children,tmNode:e})):s(fo,oe(m,ho,{key:i,tmNode:e}))}const Ae=Object.assign(Object.assign({},ve),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),xo=se(Ae),le=_({name:"Submenu",props:Ae,setup(e){const r=ue(e),{NMenu:t,NSubmenu:l}=r,{props:c,mergedCollapsedRef:i,mergedThemeRef:v}=t,p=x(()=>{const{disabled:h}=e;return l?.mergedDisabledRef.value||c.disabled?!0:h}),m=F(!1);U(Re,{paddingLeftRef:r.paddingLeft,mergedDisabledRef:p}),U(de,null);function g(){const{onClick:h}=e;h&&h()}function k(){p.value||(i.value||t.toggleExpand(e.internalKey),g())}function H(h){m.value=h}return{menuProps:c,mergedTheme:v,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,iconMarginRight:r.iconMarginRight,dropdownPlacement:r.dropdownPlacement,dropdownShow:m,paddingLeft:r.paddingLeft,mergedDisabled:p,mergedValue:t.mergedValueRef,childActive:re(()=>{var h;return(h=e.virtualChildActive)!==null&&h!==void 0?h:t.activePathRef.value.includes(e.internalKey)}),collapsed:x(()=>c.mode==="horizontal"?!1:i.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:x(()=>!p.value&&(c.mode==="horizontal"||i.value)),handlePopoverShowChange:H,handleClick:k}},render(){var e;const{mergedClsPrefix:r,menuProps:{renderIcon:t,renderLabel:l}}=this,c=()=>{const{isHorizontal:v,paddingLeft:p,collapsed:m,mergedDisabled:g,maxIconSize:k,activeIconSize:H,title:h,childActive:A,icon:N,handleClick:I,menuProps:{nodeProps:w},dropdownShow:T,iconMarginRight:G,tmNode:L,mergedClsPrefix:E,isEllipsisPlaceholder:P,extra:C}=this,y=w?.(L.rawNode);return s("div",Object.assign({},y,{class:[`${E}-menu-item`,y?.class],role:"menuitem"}),s(Pe,{tmNode:L,paddingLeft:p,collapsed:m,disabled:g,iconMarginRight:G,maxIconSize:k,activeIconSize:H,title:h,extra:C,showArrow:!v,childActive:A,clsPrefix:E,icon:N,hover:T,onClick:I,isEllipsisPlaceholder:P}))},i=()=>s(Ze,null,{default:()=>{const{tmNodes:v,collapsed:p}=this;return p?null:s("div",{class:`${r}-submenu-children`,role:"menu"},v.map(m=>me(m,this.menuProps)))}});return this.root?s(Je,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:l}),{default:()=>s("div",{class:`${r}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},c(),this.isHorizontal?null:i())}):s("div",{class:`${r}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},c(),i())}}),Co=Object.assign(Object.assign({},D.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),Lo=_({name:"Menu",inheritAttrs:!1,props:Co,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:t}=ae(e),l=D("Menu","-menu",vo,Qe,e,r),c=j(Ie,null),i=x(()=>{var u;const{collapsed:b}=e;if(b!==void 0)return b;if(c){const{collapseModeRef:o,collapsedRef:f}=c;if(o.value==="width")return(u=f.value)!==null&&u!==void 0?u:!1}return!1}),v=x(()=>{const{keyField:u,childrenField:b,disabledField:o}=e;return te(e.items||e.options,{getIgnored(f){return ie(f)},getChildren(f){return f[b]},getDisabled(f){return f[o]},getKey(f){var R;return(R=f[u])!==null&&R!==void 0?R:f.name}})}),p=x(()=>new Set(v.value.treeNodes.map(u=>u.key))),{watchProps:m}=e,g=F(null);m?.includes("defaultValue")?ge(()=>{g.value=e.defaultValue}):g.value=e.defaultValue;const k=Z(e,"value"),H=ne(k,g),h=F([]),A=()=>{h.value=e.defaultExpandAll?v.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||v.value.getPath(H.value,{includeSelf:!1}).keyPath};m?.includes("defaultExpandedKeys")?ge(A):A();const N=oo(e,["expandedNames","expandedKeys"]),I=ne(N,h),w=x(()=>v.value.treeNodes),T=x(()=>v.value.getPath(H.value).keyPath);U(W,{props:e,mergedCollapsedRef:i,mergedThemeRef:l,mergedValueRef:H,mergedExpandedKeysRef:I,activePathRef:T,mergedClsPrefixRef:r,isHorizontalRef:x(()=>e.mode==="horizontal"),invertedRef:Z(e,"inverted"),doSelect:G,toggleExpand:E});function G(u,b){const{"onUpdate:value":o,onUpdateValue:f,onSelect:R}=e;f&&B(f,u,b),o&&B(o,u,b),R&&B(R,u,b),g.value=u}function L(u){const{"onUpdate:expandedKeys":b,onUpdateExpandedKeys:o,onExpandedNamesChange:f,onOpenNamesChange:R}=e;b&&B(b,u),o&&B(o,u),f&&B(f,u),R&&B(R,u),h.value=u}function E(u){const b=Array.from(I.value),o=b.findIndex(f=>f===u);if(~o)b.splice(o,1);else{if(e.accordion&&p.value.has(u)){const f=b.findIndex(R=>p.value.has(R));f>-1&&b.splice(f,1)}b.push(u)}L(b)}const P=u=>{const b=v.value.getPath(u??H.value,{includeSelf:!1}).keyPath;if(!b.length)return;const o=Array.from(I.value),f=new Set([...o,...b]);e.accordion&&p.value.forEach(R=>{f.has(R)&&!b.includes(R)&&f.delete(R)}),L(Array.from(f))},C=x(()=>{const{inverted:u}=e,{common:{cubicBezierEaseInOut:b},self:o}=l.value,{borderRadius:f,borderColorHorizontal:R,fontSize:$e,itemHeight:Le,dividerColor:Me}=o,n={"--n-divider-color":Me,"--n-bezier":b,"--n-font-size":$e,"--n-border-color-horizontal":R,"--n-border-radius":f,"--n-item-height":Le};return u?(n["--n-group-text-color"]=o.groupTextColorInverted,n["--n-color"]=o.colorInverted,n["--n-item-text-color"]=o.itemTextColorInverted,n["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,n["--n-item-text-color-active"]=o.itemTextColorActiveInverted,n["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,n["--n-item-icon-color"]=o.itemIconColorInverted,n["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,n["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,n["--n-arrow-color"]=o.arrowColorInverted,n["--n-arrow-color-hover"]=o.arrowColorHoverInverted,n["--n-arrow-color-active"]=o.arrowColorActiveInverted,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,n["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,n["--n-item-color-hover"]=o.itemColorHoverInverted,n["--n-item-color-active"]=o.itemColorActiveInverted,n["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(n["--n-group-text-color"]=o.groupTextColor,n["--n-color"]=o.color,n["--n-item-text-color"]=o.itemTextColor,n["--n-item-text-color-hover"]=o.itemTextColorHover,n["--n-item-text-color-active"]=o.itemTextColorActive,n["--n-item-text-color-child-active"]=o.itemTextColorChildActive,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,n["--n-item-icon-color"]=o.itemIconColor,n["--n-item-icon-color-hover"]=o.itemIconColorHover,n["--n-item-icon-color-active"]=o.itemIconColorActive,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,n["--n-arrow-color"]=o.arrowColor,n["--n-arrow-color-hover"]=o.arrowColorHover,n["--n-arrow-color-active"]=o.arrowColorActive,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,n["--n-arrow-color-child-active"]=o.arrowColorChildActive,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,n["--n-item-color-hover"]=o.itemColorHover,n["--n-item-color-active"]=o.itemColorActive,n["--n-item-color-active-hover"]=o.itemColorActiveHover,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),n}),y=t?ce("menu",x(()=>e.inverted?"a":"b"),C,e):void 0,M=Ue(),$=F(null),Q=F(null);let O=!0;const he=()=>{var u;O?O=!1:(u=$.value)===null||u===void 0||u.sync({showAllItemsBeforeCalculate:!0})};function He(){return document.getElementById(M)}const X=F(-1);function ke(u){X.value=e.options.length-u}function Oe(u){u||(X.value=-1)}const Ee=x(()=>{const u=X.value;return{children:u===-1?[]:e.options.slice(u)}}),Be=x(()=>{const{childrenField:u,disabledField:b,keyField:o}=e;return te([Ee.value],{getIgnored(f){return ie(f)},getChildren(f){return f[u]},getDisabled(f){return f[b]},getKey(f){var R;return(R=f[o])!==null&&R!==void 0?R:f.name}})}),Fe=x(()=>te([{}]).treeNodes[0]);function _e(){var u;if(X.value===-1)return s(le,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:Fe.value,domId:M,isEllipsisPlaceholder:!0});const b=Be.value.treeNodes[0],o=T.value,f=!!(!((u=b.children)===null||u===void 0)&&u.some(R=>o.includes(R.key)));return s(le,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:f,tmNode:b,domId:M,rawNodes:b.rawNode.children||[],tmNodes:b.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:r,controlledExpandedKeys:N,uncontrolledExpanededKeys:h,mergedExpandedKeys:I,uncontrolledValue:g,mergedValue:H,activePath:T,tmNodes:w,mergedTheme:l,mergedCollapsed:i,cssVars:t?void 0:C,themeClass:y?.themeClass,overflowRef:$,counterRef:Q,updateCounter:()=>{},onResize:he,onUpdateOverflow:Oe,onUpdateCount:ke,renderCounter:_e,getCounter:He,onRender:y?.onRender,showOption:P,deriveResponsiveState:he}},render(){const{mergedClsPrefix:e,mode:r,themeClass:t,onRender:l}=this;l?.();const c=()=>this.tmNodes.map(m=>me(m,this.$props)),v=r==="horizontal"&&this.responsive,p=()=>s("div",qe(this.$attrs,{role:r==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${r}`,v&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),v?s(eo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:c,counter:this.renderCounter}):c());return v?s(De,{onResize:this.onResize},{default:p}):p()}});export{$o as N,Lo as a,_o as b,lo as c,io as d,uo as e,ze as l,Co as m,Se as p};
