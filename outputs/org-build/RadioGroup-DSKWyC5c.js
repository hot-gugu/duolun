import{a as y,g as u,d as p,e as w,j as I,u as Q,k as $,r as W,l as X,m as V,o as S}from"./light-C6iFuy1F.js";import{a as Y}from"./use-radio-DRQGFqKT.js";import{f as Z}from"./flatten-C9ump3RF.js";import{g as oo}from"./get-slot-Bk_rJcZu.js";import{b as to}from"./Loading-DZbvIzCl.js";import{u as eo}from"./Scrollbar-BZksWPOS.js";import{r as ro}from"./light-DgFVxpFV.js";import{d as no,B as U,r as _,h as T,U as E,H as ao}from"./runtime-core.esm-bundler-CbNHRoSM.js";const io=y("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[u("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[p("checked",{backgroundColor:"var(--n-button-border-color-active)"}),p("disabled",{opacity:"var(--n-opacity-disabled)"})]),p("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[y("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),u("splitor",{height:"var(--n-height)"})]),y("radio-button",`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[y("radio-input",`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),u("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),w("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[u("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),w("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[u("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),I("disabled",`
 cursor: pointer;
 `,[w("&:hover",[u("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),I("checked",{color:"var(--n-button-text-color-hover)"})]),p("focus",[w("&:not(:active)",[u("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),p("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),p("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function so(o,a,t){var s;const e=[];let c=!1;for(let i=0;i<o.length;++i){const d=o[i],l=(s=d.type)===null||s===void 0?void 0:s.name;l==="RadioButton"&&(c=!0);const h=d.props;if(l!=="RadioButton"){e.push(d);continue}if(i===0)e.push(d);else{const f=e[e.length-1].props,m=a===f.value,v=f.disabled,x=a===h.value,g=h.disabled,z=(m?2:0)+(v?0:1),k=(x?2:0)+(g?0:1),B={[`${t}-radio-group__splitor--disabled`]:v,[`${t}-radio-group__splitor--checked`]:m},F={[`${t}-radio-group__splitor--disabled`]:g,[`${t}-radio-group__splitor--checked`]:x},R=z<k?F:B;e.push(U("div",{class:[`${t}-radio-group__splitor`,R]}),d)}}return{children:e,isButtonGroup:c}}const lo=Object.assign(Object.assign({},$.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),mo=no({name:"RadioGroup",props:lo,setup(o){const a=_(null),{mergedSizeRef:t,mergedDisabledRef:s,nTriggerFormChange:e,nTriggerFormInput:c,nTriggerFormBlur:i,nTriggerFormFocus:d}=to(o),{mergedClsPrefixRef:l,inlineThemeDisabled:h,mergedRtlRef:f}=Q(o),m=$("Radio","-radio-group",io,ro,o,l),v=_(o.defaultValue),x=E(o,"value"),g=eo(x,v);function z(r){const{onUpdateValue:n,"onUpdate:value":C}=o;n&&S(n,r),C&&S(C,r),v.value=r,e(),c()}function k(r){const{value:n}=a;n&&(n.contains(r.relatedTarget)||d())}function B(r){const{value:n}=a;n&&(n.contains(r.relatedTarget)||i())}ao(Y,{mergedClsPrefixRef:l,nameRef:E(o,"name"),valueRef:g,disabledRef:s,mergedSizeRef:t,doUpdateValue:z});const F=W("Radio",f,l),R=T(()=>{const{value:r}=t,{common:{cubicBezierEaseInOut:n},self:{buttonBorderColor:C,buttonBorderColorActive:G,buttonBorderRadius:H,buttonBoxShadow:A,buttonBoxShadowFocus:D,buttonBoxShadowHover:N,buttonColor:j,buttonColorActive:P,buttonTextColor:M,buttonTextColorActive:O,buttonTextColorHover:K,opacityDisabled:L,[V("buttonHeight",r)]:q,[V("fontSize",r)]:J}}=m.value;return{"--n-font-size":J,"--n-bezier":n,"--n-button-border-color":C,"--n-button-border-color-active":G,"--n-button-border-radius":H,"--n-button-box-shadow":A,"--n-button-box-shadow-focus":D,"--n-button-box-shadow-hover":N,"--n-button-color":j,"--n-button-color-active":P,"--n-button-text-color":M,"--n-button-text-color-hover":K,"--n-button-text-color-active":O,"--n-height":q,"--n-opacity-disabled":L}}),b=h?X("radio-group",T(()=>t.value[0]),R,o):void 0;return{selfElRef:a,rtlEnabled:F,mergedClsPrefix:l,mergedValue:g,handleFocusout:B,handleFocusin:k,cssVars:h?void 0:R,themeClass:b?.themeClass,onRender:b?.onRender}},render(){var o;const{mergedValue:a,mergedClsPrefix:t,handleFocusin:s,handleFocusout:e}=this,{children:c,isButtonGroup:i}=so(Z(oo(this)),a,t);return(o=this.onRender)===null||o===void 0||o.call(this),U("div",{onFocusin:s,onFocusout:e,ref:"selfElRef",class:[`${t}-radio-group`,this.rtlEnabled&&`${t}-radio-group--rtl`,this.themeClass,i&&`${t}-radio-group--button-group`],style:this.cssVars},c)}});export{mo as N,lo as r};
