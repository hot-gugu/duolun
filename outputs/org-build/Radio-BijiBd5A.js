import{a as c,d as t,g as o,e as n,j as I,k as v,u as N,r as O,l as H,m as h}from"./light-C6iFuy1F.js";import{s as T,r as V}from"./use-radio-DRQGFqKT.js";import{c as L}from"./Loading-DZbvIzCl.js";import{r as M}from"./light-DgFVxpFV.js";import{d as W,B as l,h as u}from"./runtime-core.esm-bundler-CbNHRoSM.js";const K=c("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[t("checked",[o("dot",`
 background-color: var(--n-color-active);
 `)]),o("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),c("radio-input",`
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `),o("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[n("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),t("checked",{boxShadow:"var(--n-box-shadow-active)"},[n("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),o("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),I("disabled",`
 cursor: pointer;
 `,[n("&:hover",[o("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),t("focus",[n("&:not(:active)",[o("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),t("disabled",`
 cursor: not-allowed;
 `,[o("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[n("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),t("checked",`
 opacity: 1;
 `)]),o("label",{color:"var(--n-text-color-disabled)"}),c("radio-input",`
 cursor: not-allowed;
 `)])]),Y=Object.assign(Object.assign({},v.props),V),X=W({name:"Radio",props:Y,setup(a){const e=T(a),i=v("Radio","-radio",K,M,a,e.mergedClsPrefix),s=u(()=>{const{mergedSize:{value:b}}=e,{common:{cubicBezierEaseInOut:m},self:{boxShadow:x,boxShadowActive:w,boxShadowDisabled:k,boxShadowFocus:z,boxShadowHover:C,color:R,colorDisabled:S,colorActive:y,textColor:$,textColorDisabled:_,dotColorActive:D,dotColorDisabled:B,labelPadding:P,labelLineHeight:E,labelFontWeight:j,[h("fontSize",b)]:A,[h("radioSize",b)]:F}}=i.value;return{"--n-bezier":m,"--n-label-line-height":E,"--n-label-font-weight":j,"--n-box-shadow":x,"--n-box-shadow-active":w,"--n-box-shadow-disabled":k,"--n-box-shadow-focus":z,"--n-box-shadow-hover":C,"--n-color":R,"--n-color-active":y,"--n-color-disabled":S,"--n-dot-color-active":D,"--n-dot-color-disabled":B,"--n-font-size":A,"--n-radio-size":F,"--n-text-color":$,"--n-text-color-disabled":_,"--n-label-padding":P}}),{inlineThemeDisabled:d,mergedClsPrefixRef:f,mergedRtlRef:p}=N(a),g=O("Radio",p,f),r=d?H("radio",u(()=>e.mergedSize.value[0]),s,a):void 0;return Object.assign(e,{rtlEnabled:g,cssVars:d?void 0:s,themeClass:r?.themeClass,onRender:r?.onRender})},render(){const{$slots:a,mergedClsPrefix:e,onRender:i,label:s}=this;return i?.(),l("label",{class:[`${e}-radio`,this.themeClass,this.rtlEnabled&&`${e}-radio--rtl`,this.mergedDisabled&&`${e}-radio--disabled`,this.renderSafeChecked&&`${e}-radio--checked`,this.focus&&`${e}-radio--focus`],style:this.cssVars},l("div",{class:`${e}-radio__dot-wrapper`}," ",l("div",{class:[`${e}-radio__dot`,this.renderSafeChecked&&`${e}-radio__dot--checked`]}),l("input",{ref:"inputRef",type:"radio",class:`${e}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur})),L(a.default,d=>!d&&!s?null:l("div",{ref:"labelRef",class:`${e}-radio__label`},d||s)))}});export{X as N,Y as r};
