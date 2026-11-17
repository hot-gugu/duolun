import{e as b,f as $e,a as O,N as ee,d as x,g as d,j as A,h as Be,u as Se,k as oe,r as Pe,l as Te,o as ke,m as r,M as j}from"./light-C6iFuy1F.js";import{i as Re}from"./browser-DLIXj5nt.js";import{g as He}from"./warn-BfczDB-2.js";import{a as je,j as Ee,c as J,b as Ie,d as Oe,k as Ne,h as De}from"./Loading-DZbvIzCl.js";import{i as Fe}from"./is-browser-DqcmxZSF.js";import{d as re,B as p,k as _e,z as Me,U as Ke,r as k,C as Ge,h as E}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{N as Ve}from"./FadeInExpandTransition-BhYgIGUe.js";import{b as We}from"./light-z9xWbWme.js";import{c as Z}from"./color-to-class-B0iQgAn2.js";const{cubicBezierEaseInOut:C}=$e;function qe({duration:e=".2s",delay:f=".1s"}={}){return[b("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",{opacity:1}),b("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),b("&.fade-in-width-expand-transition-leave-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${C},
 max-width ${e} ${C} ${f},
 margin-left ${e} ${C} ${f},
 margin-right ${e} ${C} ${f};
 `),b("&.fade-in-width-expand-transition-enter-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${C} ${f},
 max-width ${e} ${C},
 margin-left ${e} ${C},
 margin-right ${e} ${C};
 `)]}const Qe=O("base-wave",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),Le=re({name:"BaseWave",props:{clsPrefix:{type:String,required:!0}},setup(e){je("-base-wave",Qe,Ke(e,"clsPrefix"));const f=k(null),h=k(!1);let u=null;return _e(()=>{u!==null&&window.clearTimeout(u)}),{active:h,selfRef:f,play(){u!==null&&(window.clearTimeout(u),h.value=!1,u=null),Me(()=>{var v;(v=f.value)===null||v===void 0||v.offsetHeight,h.value=!0,u=window.setTimeout(()=>{h.value=!1,u=null},1e3)})}}},render(){const{clsPrefix:e}=this;return p("div",{ref:"selfRef","aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}});function B(e){return ee(e,[255,255,255,.16])}function I(e){return ee(e,[0,0,0,.12])}const Ue=He("n-button-group"),Xe=b([O("button",`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[x("color",[d("border",{borderColor:"var(--n-border-color)"}),x("disabled",[d("border",{borderColor:"var(--n-border-color-disabled)"})]),A("disabled",[b("&:focus",[d("state-border",{borderColor:"var(--n-border-color-focus)"})]),b("&:hover",[d("state-border",{borderColor:"var(--n-border-color-hover)"})]),b("&:active",[d("state-border",{borderColor:"var(--n-border-color-pressed)"})]),x("pressed",[d("state-border",{borderColor:"var(--n-border-color-pressed)"})])])]),x("disabled",{backgroundColor:"var(--n-color-disabled)",color:"var(--n-text-color-disabled)"},[d("border",{border:"var(--n-border-disabled)"})]),A("disabled",[b("&:focus",{backgroundColor:"var(--n-color-focus)",color:"var(--n-text-color-focus)"},[d("state-border",{border:"var(--n-border-focus)"})]),b("&:hover",{backgroundColor:"var(--n-color-hover)",color:"var(--n-text-color-hover)"},[d("state-border",{border:"var(--n-border-hover)"})]),b("&:active",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[d("state-border",{border:"var(--n-border-pressed)"})]),x("pressed",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[d("state-border",{border:"var(--n-border-pressed)"})])]),x("loading","cursor: wait;"),O("base-wave",`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[x("active",{zIndex:1,animationName:"button-wave-spread, button-wave-opacity"})]),Fe&&"MozBoxSizing"in document.createElement("div").style?b("&::moz-focus-inner",{border:0}):null,d("border, state-border",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),d("border",`
 border: var(--n-border);
 `),d("state-border",`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),d("icon",`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[O("icon-slot",`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Ee({top:"50%",originalTransform:"translateY(-50%)"})]),qe()]),d("content",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[b("~",[d("icon",{margin:"var(--n-icon-margin)",marginRight:0})])]),x("block",`
 display: flex;
 width: 100%;
 `),x("dashed",[d("border, state-border",{borderStyle:"dashed !important"})]),x("disabled",{cursor:"not-allowed",opacity:"var(--n-opacity-disabled)"})]),b("@keyframes button-wave-spread",{from:{boxShadow:"0 0 0.5px 0 var(--n-ripple-color)"},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)"}}),b("@keyframes button-wave-opacity",{from:{opacity:"var(--n-wave-opacity)"},to:{opacity:0}})]),Ye=Object.assign(Object.assign({},oe.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:"button"},type:{type:String,default:"default"},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:"left"},attrType:{type:String,default:"button"},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Re},spinProps:Object}),Ae=re({name:"Button",props:Ye,slots:Object,setup(e){const f=k(null),h=k(null),u=k(!1),v=Be(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),te=Ge(Ue,{}),{inlineThemeDisabled:Q,mergedClsPrefixRef:N,mergedRtlRef:ne,mergedComponentPropsRef:D}=Se(e),{mergedSizeRef:F}=Ie({},{defaultSize:"medium",mergedSize:t=>{var l,m;const{size:o}=e;if(o)return o;const{size:P}=te;if(P)return P;const{mergedSize:w}=t||{};if(w)return w.value;const T=(m=(l=D?.value)===null||l===void 0?void 0:l.Button)===null||m===void 0?void 0:m.size;return T||"medium"}}),_=E(()=>e.focusable&&!e.disabled),ie=t=>{var l;_.value||t.preventDefault(),!e.nativeFocusBehavior&&(t.preventDefault(),!e.disabled&&_.value&&((l=f.value)===null||l===void 0||l.focus({preventScroll:!0})))},ae=t=>{var l;if(!e.disabled&&!e.loading){const{onClick:m}=e;m&&ke(m,t),e.text||(l=h.value)===null||l===void 0||l.play()}},se=t=>{switch(t.key){case"Enter":if(!e.keyboard)return;u.value=!1}},le=t=>{switch(t.key){case"Enter":if(!e.keyboard||e.loading){t.preventDefault();return}u.value=!0}},de=()=>{u.value=!1},ce=oe("Button","-button",Xe,We,e,N),ue=Pe("Button",ne,N),L=E(()=>{const t=ce.value,{common:{cubicBezierEaseInOut:l,cubicBezierEaseOut:m},self:o}=t,{rippleDuration:P,opacityDisabled:w,fontWeight:T,fontWeightStrong:M}=o,g=F.value,{dashed:K,type:z,ghost:G,text:y,color:i,round:U,circle:V,textColor:$,secondary:be,tertiary:X,quaternary:fe,strong:he}=e,ve={"--n-font-weight":he?M:T};let a={"--n-color":"initial","--n-color-hover":"initial","--n-color-pressed":"initial","--n-color-focus":"initial","--n-color-disabled":"initial","--n-ripple-color":"initial","--n-text-color":"initial","--n-text-color-hover":"initial","--n-text-color-pressed":"initial","--n-text-color-focus":"initial","--n-text-color-disabled":"initial"};const R=z==="tertiary",Y=z==="default",n=R?"default":z;if(y){const s=$||i;a={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":"#0000","--n-text-color":s||o[r("textColorText",n)],"--n-text-color-hover":s?B(s):o[r("textColorTextHover",n)],"--n-text-color-pressed":s?I(s):o[r("textColorTextPressed",n)],"--n-text-color-focus":s?B(s):o[r("textColorTextHover",n)],"--n-text-color-disabled":s||o[r("textColorTextDisabled",n)]}}else if(G||K){const s=$||i;a={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":i||o[r("rippleColor",n)],"--n-text-color":s||o[r("textColorGhost",n)],"--n-text-color-hover":s?B(s):o[r("textColorGhostHover",n)],"--n-text-color-pressed":s?I(s):o[r("textColorGhostPressed",n)],"--n-text-color-focus":s?B(s):o[r("textColorGhostHover",n)],"--n-text-color-disabled":s||o[r("textColorGhostDisabled",n)]}}else if(be){const s=Y?o.textColor:R?o.textColorTertiary:o[r("color",n)],c=i||s,H=z!=="default"&&z!=="tertiary";a={"--n-color":H?j(c,{alpha:Number(o.colorOpacitySecondary)}):o.colorSecondary,"--n-color-hover":H?j(c,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-pressed":H?j(c,{alpha:Number(o.colorOpacitySecondaryPressed)}):o.colorSecondaryPressed,"--n-color-focus":H?j(c,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-disabled":o.colorSecondary,"--n-ripple-color":"#0000","--n-text-color":c,"--n-text-color-hover":c,"--n-text-color-pressed":c,"--n-text-color-focus":c,"--n-text-color-disabled":c}}else if(X||fe){const s=Y?o.textColor:R?o.textColorTertiary:o[r("color",n)],c=i||s;X?(a["--n-color"]=o.colorTertiary,a["--n-color-hover"]=o.colorTertiaryHover,a["--n-color-pressed"]=o.colorTertiaryPressed,a["--n-color-focus"]=o.colorSecondaryHover,a["--n-color-disabled"]=o.colorTertiary):(a["--n-color"]=o.colorQuaternary,a["--n-color-hover"]=o.colorQuaternaryHover,a["--n-color-pressed"]=o.colorQuaternaryPressed,a["--n-color-focus"]=o.colorQuaternaryHover,a["--n-color-disabled"]=o.colorQuaternary),a["--n-ripple-color"]="#0000",a["--n-text-color"]=c,a["--n-text-color-hover"]=c,a["--n-text-color-pressed"]=c,a["--n-text-color-focus"]=c,a["--n-text-color-disabled"]=c}else a={"--n-color":i||o[r("color",n)],"--n-color-hover":i?B(i):o[r("colorHover",n)],"--n-color-pressed":i?I(i):o[r("colorPressed",n)],"--n-color-focus":i?B(i):o[r("colorFocus",n)],"--n-color-disabled":i||o[r("colorDisabled",n)],"--n-ripple-color":i||o[r("rippleColor",n)],"--n-text-color":$||(i?o.textColorPrimary:R?o.textColorTertiary:o[r("textColor",n)]),"--n-text-color-hover":$||(i?o.textColorHoverPrimary:o[r("textColorHover",n)]),"--n-text-color-pressed":$||(i?o.textColorPressedPrimary:o[r("textColorPressed",n)]),"--n-text-color-focus":$||(i?o.textColorFocusPrimary:o[r("textColorFocus",n)]),"--n-text-color-disabled":$||(i?o.textColorDisabledPrimary:o[r("textColorDisabled",n)])};let W={"--n-border":"initial","--n-border-hover":"initial","--n-border-pressed":"initial","--n-border-focus":"initial","--n-border-disabled":"initial"};y?W={"--n-border":"none","--n-border-hover":"none","--n-border-pressed":"none","--n-border-focus":"none","--n-border-disabled":"none"}:W={"--n-border":o[r("border",n)],"--n-border-hover":o[r("borderHover",n)],"--n-border-pressed":o[r("borderPressed",n)],"--n-border-focus":o[r("borderFocus",n)],"--n-border-disabled":o[r("borderDisabled",n)]};const{[r("height",g)]:q,[r("fontSize",g)]:pe,[r("padding",g)]:me,[r("paddingRound",g)]:ge,[r("iconSize",g)]:xe,[r("borderRadius",g)]:ye,[r("iconMargin",g)]:Ce,waveOpacity:we}=o,ze={"--n-width":V&&!y?q:"initial","--n-height":y?"initial":q,"--n-font-size":pe,"--n-padding":V||y?"initial":U?ge:me,"--n-icon-size":xe,"--n-icon-margin":Ce,"--n-border-radius":y?"initial":V||U?q:ye};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":l,"--n-bezier-ease-out":m,"--n-ripple-duration":P,"--n-opacity-disabled":w,"--n-wave-opacity":we},ve),a),W),ze)}),S=Q?Te("button",E(()=>{let t="";const{dashed:l,type:m,ghost:o,text:P,color:w,round:T,circle:M,textColor:g,secondary:K,tertiary:z,quaternary:G,strong:y}=e;l&&(t+="a"),o&&(t+="b"),P&&(t+="c"),T&&(t+="d"),M&&(t+="e"),K&&(t+="f"),z&&(t+="g"),G&&(t+="h"),y&&(t+="i"),w&&(t+=`j${Z(w)}`),g&&(t+=`k${Z(g)}`);const{value:i}=F;return t+=`l${i[0]}`,t+=`m${m[0]}`,t}),L,e):void 0;return{selfElRef:f,waveElRef:h,mergedClsPrefix:N,mergedFocusable:_,mergedSize:F,showBorder:v,enterPressed:u,rtlEnabled:ue,handleMousedown:ie,handleKeydown:le,handleBlur:de,handleKeyup:se,handleClick:ae,customColorCssVars:E(()=>{const{color:t}=e;if(!t)return null;const l=B(t);return{"--n-border-color":t,"--n-border-color-hover":l,"--n-border-color-pressed":I(t),"--n-border-color-focus":l,"--n-border-color-disabled":t}}),cssVars:Q?void 0:L,themeClass:S?.themeClass,onRender:S?.onRender}},render(){const{mergedClsPrefix:e,tag:f,onRender:h}=this;h?.();const u=J(this.$slots.default,v=>v&&p("span",{class:`${e}-button__content`},v));return p(f,{ref:"selfElRef",class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement==="right"&&u,p(Ve,{width:!0},{default:()=>J(this.$slots.icon,v=>(this.loading||this.renderIcon||v)&&p("span",{class:`${e}-button__icon`,style:{margin:Oe(this.$slots.default)?"0":""}},p(Ne,null,{default:()=>this.loading?p(De,Object.assign({clsPrefix:e,key:"loading",class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):p("div",{key:"icon",class:`${e}-icon-slot`,role:"none"},this.renderIcon?this.renderIcon():v)})))}),this.iconPlacement==="left"&&u,this.text?null:p(Le,{ref:"waveElRef",clsPrefix:e}),this.showBorder?p("div",{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?p("div",{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),so=Ae;export{Ae as B,Le as N,so as X,Ye as a,Ue as b,qe as f};
