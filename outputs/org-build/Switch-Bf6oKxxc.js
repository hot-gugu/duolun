import{j as H,d as M,c as y,b as de,k as ce,h as ue}from"./Loading-DZbvIzCl.js";import{s as he,M as be,a as L,g as o,e as N,d as l,j as E,u as fe,k as I,l as ve,o as W,m as x}from"./light-C6iFuy1F.js";import{u as ge}from"./Scrollbar-BZksWPOS.js";import{c as me}from"./_common-CtIASumb.js";import{p as K,d as s}from"./index-BS1Lf1EV.js";import{d as we,B as a,r as U,h as F,U as pe}from"./runtime-core.esm-bundler-CbNHRoSM.js";function ye(e){const{primaryColor:d,opacityDisabled:f,borderRadius:n,textColor3:v}=e;return Object.assign(Object.assign({},me),{iconColor:v,textColor:"white",loadingColor:d,opacityDisabled:f,railColor:"rgba(0, 0, 0, .14)",railColorActive:d,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:n,railBorderRadiusMedium:n,railBorderRadiusLarge:n,buttonBorderRadiusSmall:n,buttonBorderRadiusMedium:n,buttonBorderRadiusLarge:n,boxShadowFocus:`0 0 0 2px ${be(d,{alpha:.2})}`})}const xe={common:he,self:ye},ke=L("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[o("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),o("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),o("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),L("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[H({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),o("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),o("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),o("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),N("&:focus",[o("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),l("round",[o("rail","border-radius: calc(var(--n-rail-height) / 2);",[o("button","border-radius: calc(var(--n-button-height) / 2);")])]),E("disabled",[E("icon",[l("rubber-band",[l("pressed",[o("rail",[o("button","max-width: var(--n-button-width-pressed);")])]),o("rail",[N("&:active",[o("button","max-width: var(--n-button-width-pressed);")])]),l("active",[l("pressed",[o("rail",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),o("rail",[N("&:active",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),l("active",[o("rail",[o("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),o("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[o("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[H()]),o("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),l("active",[o("rail","background-color: var(--n-rail-color-active);")]),l("loading",[o("rail",`
 cursor: wait;
 `)]),l("disabled",[o("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Se=Object.assign(Object.assign({},I.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let $;const Ve=we({name:"Switch",props:Se,slots:Object,setup(e){$===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?$=CSS.supports("width","max(1px)"):$=!1:$=!0);const{mergedClsPrefixRef:d,inlineThemeDisabled:f,mergedComponentPropsRef:n}=fe(e),v=I("Switch","-switch",ke,xe,e,d),g=de(e,{mergedSize(t){var c,u;if(e.size!==void 0)return e.size;if(t)return t.mergedSize.value;const p=(u=(c=n?.value)===null||c===void 0?void 0:c.Switch)===null||u===void 0?void 0:u.size;return p||"medium"}}),{mergedSizeRef:S,mergedDisabledRef:m}=g,C=U(e.defaultValue),z=pe(e,"value"),w=ge(z,C),_=F(()=>w.value===e.checkedValue),i=U(!1),r=U(!1),B=F(()=>{const{railStyle:t}=e;if(t)return t({focused:r.value,checked:_.value})});function V(t){const{"onUpdate:value":c,onChange:u,onUpdateValue:p}=e,{nTriggerFormInput:j,nTriggerFormChange:O}=g;c&&W(c,t),p&&W(p,t),u&&W(u,t),C.value=t,j(),O()}function X(){const{nTriggerFormFocus:t}=g;t()}function Y(){const{nTriggerFormBlur:t}=g;t()}function q(){e.loading||m.value||(w.value!==e.checkedValue?V(e.checkedValue):V(e.uncheckedValue))}function G(){r.value=!0,X()}function J(){r.value=!1,Y(),i.value=!1}function Q(t){e.loading||m.value||t.key===" "&&(w.value!==e.checkedValue?V(e.checkedValue):V(e.uncheckedValue),i.value=!1)}function Z(t){e.loading||m.value||t.key===" "&&(t.preventDefault(),i.value=!0)}const A=F(()=>{const{value:t}=S,{self:{opacityDisabled:c,railColor:u,railColorActive:p,buttonBoxShadow:j,buttonColor:O,boxShadowFocus:ee,loadingColor:te,textColor:oe,iconColor:ie,[x("buttonHeight",t)]:h,[x("buttonWidth",t)]:ae,[x("buttonWidthPressed",t)]:ne,[x("railHeight",t)]:b,[x("railWidth",t)]:R,[x("railBorderRadius",t)]:re,[x("buttonBorderRadius",t)]:le},common:{cubicBezierEaseInOut:se}}=v.value;let P,T,D;return $?(P=`calc((${b} - ${h}) / 2)`,T=`max(${b}, ${h})`,D=`max(${R}, calc(${R} + ${h} - ${b}))`):(P=K((s(b)-s(h))/2),T=K(Math.max(s(b),s(h))),D=s(b)>s(h)?R:K(s(R)+s(h)-s(b))),{"--n-bezier":se,"--n-button-border-radius":le,"--n-button-box-shadow":j,"--n-button-color":O,"--n-button-width":ae,"--n-button-width-pressed":ne,"--n-button-height":h,"--n-height":T,"--n-offset":P,"--n-opacity-disabled":c,"--n-rail-border-radius":re,"--n-rail-color":u,"--n-rail-color-active":p,"--n-rail-height":b,"--n-rail-width":R,"--n-width":D,"--n-box-shadow-focus":ee,"--n-loading-color":te,"--n-text-color":oe,"--n-icon-color":ie}}),k=f?ve("switch",F(()=>S.value[0]),A,e):void 0;return{handleClick:q,handleBlur:J,handleFocus:G,handleKeyup:Q,handleKeydown:Z,mergedRailStyle:B,pressed:i,mergedClsPrefix:d,mergedValue:w,checked:_,mergedDisabled:m,cssVars:f?void 0:A,themeClass:k?.themeClass,onRender:k?.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:d,checked:f,mergedRailStyle:n,onRender:v,$slots:g}=this;v?.();const{checked:S,unchecked:m,icon:C,"checked-icon":z,"unchecked-icon":w}=g,_=!(M(C)&&M(z)&&M(w));return a("div",{role:"switch","aria-checked":f,class:[`${e}-switch`,this.themeClass,_&&`${e}-switch--icon`,f&&`${e}-switch--active`,d&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},a("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:n},y(S,i=>y(m,r=>i||r?a("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),i),a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),r)):null)),a("div",{class:`${e}-switch__button`},y(C,i=>y(z,r=>y(w,B=>a(ce,null,{default:()=>this.loading?a(ue,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(r||i)?a("div",{class:`${e}-switch__button-icon`,key:r?"checked-icon":"icon"},r||i):!this.checked&&(B||i)?a("div",{class:`${e}-switch__button-icon`,key:B?"unchecked-icon":"icon"},B||i):null})))),y(S,i=>i&&a("div",{key:"checked",class:`${e}-switch__checked`},i)),y(m,i=>i&&a("div",{key:"unchecked",class:`${e}-switch__unchecked`},i)))))}});export{Ve as N,Se as s};
