import{a as S,d as y,e as Y,u as le,k as ie,f as ze,g as ee,l as Me,m as A}from"./light-C6iFuy1F.js";import{k as ne}from"./keysOf-HiGXOwLp.js";import{f as be}from"./light-BCah1vY4.js";import{C as V,an as Le,w as oe,k as se,j as ve,d as pe,B as w,H as re,r as O,h as b,U as te}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{S as fe}from"./index-Cp9QasH9.js";import{g as ke,h as je,i as ce}from"./warn-BfczDB-2.js";import{c as Ae,g as We}from"./Loading-DZbvIzCl.js";import{g as we}from"./use-locale-jSpv77sT.js";import{f as ae,b as ue}from"./Scrollbar-BZksWPOS.js";function qe(n,e,a){var t;const s=V(n,null);if(s===null)return;const r=(t=Le())===null||t===void 0?void 0:t.proxy;oe(a,o),o(a.value),se(()=>{o(void 0,a.value)});function o(l,i){if(!s)return;const f=s[e];i!==void 0&&c(f,i),l!==void 0&&h(f,l)}function c(l,i){l[i]||(l[i]=[]),l[i].splice(l[i].findIndex(f=>f===r),1)}function h(l,i){l[i]||(l[i]=[]),~l[i].findIndex(f=>f===r)||l[i].push(r)}}function et(n,e,a){const t=V(n,null);t!==null&&(e in t||(t[e]=[]),t[e].push(a.value),oe(a,(s,r)=>{const o=t[e],c=o.findIndex(h=>h===r);~c&&o.splice(c,1),o.push(s)}),se(()=>{const s=t[e],r=s.findIndex(o=>o===a.value);~r&&s.splice(r,1)}))}function tt(n,e,a){const t=V(n,null);t!==null&&(e in t||(t[e]=[]),ve(()=>{const s=a();s&&t[e].push(s)}),se(()=>{const s=t[e],r=a(),o=s.findIndex(c=>c===r);~o&&s.splice(o,1)}))}const G=ke("n-form"),xe=ke("n-form-item-insts"),Fe=S("form",[y("inline",`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[S("form-item",{width:"auto",marginRight:"18px"},[Y("&:last-child",{marginRight:0})])])]);var Oe=function(n,e,a,t){function s(r){return r instanceof a?r:new a(function(o){o(r)})}return new(a||(a=Promise))(function(r,o){function c(i){try{l(t.next(i))}catch(f){o(f)}}function h(i){try{l(t.throw(i))}catch(f){o(f)}}function l(i){i.done?r(i.value):s(i.value).then(c,h)}l((t=t.apply(n,e||[])).next())})};const Ve=Object.assign(Object.assign({},ie.props),{inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:"top"},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:n=>{n.preventDefault()}},showLabel:{type:Boolean,default:void 0},validateMessages:Object}),nt=pe({name:"Form",props:Ve,setup(n){const{mergedClsPrefixRef:e}=le(n);ie("Form","-form",Fe,be,n,e);const a={},t=O(void 0),s=l=>{const i=t.value;(i===void 0||l>=i)&&(t.value=l)};function r(){var l;for(const i of ne(a)){const f=a[i];for(const v of f)(l=v.invalidateLabelWidth)===null||l===void 0||l.call(v)}}function o(l){return Oe(this,arguments,void 0,function*(i,f=()=>!0){return yield new Promise((v,W)=>{const d=[];for(const $ of ne(a)){const E=a[$];for(const I of E)I.path&&d.push(I.internalValidate(null,f))}Promise.all(d).then($=>{const E=$.some(P=>!P.valid),I=[],q=[];$.forEach(P=>{var M,_;!((M=P.errors)===null||M===void 0)&&M.length&&I.push(P.errors),!((_=P.warnings)===null||_===void 0)&&_.length&&q.push(P.warnings)}),i&&i(I.length?I:void 0,{warnings:q.length?q:void 0}),E?W(I.length?I:void 0):v({warnings:q.length?q:void 0})})})})}function c(){for(const l of ne(a)){const i=a[l];for(const f of i)f.restoreValidation()}}return re(G,{props:n,maxChildLabelWidthRef:t,deriveMaxChildLabelWidth:s}),re(xe,{formItems:a}),Object.assign({validate:o,restoreValidation:c,invalidateLabelWidth:r},{mergedClsPrefix:e})},render(){const{mergedClsPrefix:n}=this;return w("form",{class:[`${n}-form`,this.inline&&`${n}-form--inline`],onSubmit:this.onSubmit},this.$slots)}}),{cubicBezierEaseInOut:me}=ze;function Ee({name:n="fade-down",fromOffset:e="-4px",enterDuration:a=".3s",leaveDuration:t=".3s",enterCubicBezier:s=me,leaveCubicBezier:r=me}={}){return[Y(`&.${n}-transition-enter-from, &.${n}-transition-leave-to`,{opacity:0,transform:`translateY(${e})`}),Y(`&.${n}-transition-enter-to, &.${n}-transition-leave-from`,{opacity:1,transform:"translateY(0)"}),Y(`&.${n}-transition-leave-active`,{transition:`opacity ${t} ${r}, transform ${t} ${r}`}),Y(`&.${n}-transition-enter-active`,{transition:`opacity ${a} ${s}, transform ${a} ${s}`})]}const Be=S("form-item",`
 display: grid;
 line-height: var(--n-line-height);
`,[S("form-item-label",`
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `,[ee("asterisk",`
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `),ee("asterisk-placeholder",`
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]),S("form-item-blank",`
 grid-area: blank;
 min-height: var(--n-blank-height);
 `),y("auto-label-width",[S("form-item-label","white-space: nowrap;")]),y("left-labelled",`
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `,[S("form-item-label",`
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `,[y("reverse-columns-space",`
 grid-template-columns: auto 1fr;
 `),y("left-mark",`
 grid-template-areas:
 "mark text"
 ". text";
 `),y("right-mark",`
 grid-template-areas: 
 "text mark"
 "text .";
 `),y("right-hanging-mark",`
 grid-template-areas: 
 "text mark"
 "text .";
 `),ee("text",`
 grid-area: text; 
 `),ee("asterisk",`
 grid-area: mark; 
 align-self: end;
 `)])]),y("top-labelled",`
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `,[y("no-label",`
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `),S("form-item-label",`
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]),S("form-item-blank",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `),S("form-item-feedback-wrapper",`
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `,[Y("&:not(:empty)",`
 padding: var(--n-feedback-padding);
 `),S("form-item-feedback",{transition:"color .3s var(--n-bezier)",color:"var(--n-feedback-text-color)"},[y("warning",{color:"var(--n-feedback-text-color-warning)"}),y("error",{color:"var(--n-feedback-text-color-error)"}),Ee({fromOffset:"-3px",enterDuration:".3s",leaveDuration:".2s"})])])]);function Te(n){const e=V(G,null),{mergedComponentPropsRef:a}=le(n);return{mergedSize:b(()=>{var t,s;if(n.size!==void 0)return n.size;if(e?.props.size!==void 0)return e.props.size;const r=(s=(t=a?.value)===null||t===void 0?void 0:t.Form)===null||s===void 0?void 0:s.size;return r||"medium"})}}function Ne(n){const e=V(G,null),a=b(()=>{const{labelPlacement:d}=n;return d!==void 0?d:e?.props.labelPlacement?e.props.labelPlacement:"top"}),t=b(()=>a.value==="left"&&(n.labelWidth==="auto"||e?.props.labelWidth==="auto")),s=b(()=>{if(a.value==="top")return;const{labelWidth:d}=n;if(d!==void 0&&d!=="auto")return ae(d);if(t.value){const $=e?.maxChildLabelWidthRef.value;return $!==void 0?ae($):void 0}if(e?.props.labelWidth!==void 0)return ae(e.props.labelWidth)}),r=b(()=>{const{labelAlign:d}=n;if(d)return d;if(e?.props.labelAlign)return e.props.labelAlign}),o=b(()=>{var d;return[(d=n.labelProps)===null||d===void 0?void 0:d.style,n.labelStyle,{width:s.value}]}),c=b(()=>{const{showRequireMark:d}=n;return d!==void 0?d:e?.props.showRequireMark}),h=b(()=>{const{requireMarkPlacement:d}=n;return d!==void 0?d:e?.props.requireMarkPlacement||"right"}),l=O(!1),i=O(!1),f=b(()=>{const{validationStatus:d}=n;if(d!==void 0)return d;if(l.value)return"error";if(i.value)return"warning"}),v=b(()=>{const{showFeedback:d}=n;return d!==void 0?d:e?.props.showFeedback!==void 0?e.props.showFeedback:!0}),W=b(()=>{const{showLabel:d}=n;return d!==void 0?d:e?.props.showLabel!==void 0?e.props.showLabel:!0});return{validationErrored:l,validationWarned:i,mergedLabelStyle:o,mergedLabelPlacement:a,mergedLabelAlign:r,mergedShowRequireMark:c,mergedRequireMarkPlacement:h,mergedValidationStatus:f,mergedShowFeedback:v,mergedShowLabel:W,isAutoLabelWidth:t}}function He(n){const e=V(G,null),a=b(()=>{const{rulePath:o}=n;if(o!==void 0)return o;const{path:c}=n;if(c!==void 0)return c}),t=b(()=>{const o=[],{rule:c}=n;if(c!==void 0&&(Array.isArray(c)?o.push(...c):o.push(c)),e){const{rules:h}=e.props,{value:l}=a;if(h!==void 0&&l!==void 0){const i=we(h,l);i!==void 0&&(Array.isArray(i)?o.push(...i):o.push(i))}}return o}),s=b(()=>t.value.some(o=>o.required)),r=b(()=>s.value||n.required);return{mergedRules:t,mergedRequired:r}}var ge=function(n,e,a,t){function s(r){return r instanceof a?r:new a(function(o){o(r)})}return new(a||(a=Promise))(function(r,o){function c(i){try{l(t.next(i))}catch(f){o(f)}}function h(i){try{l(t.throw(i))}catch(f){o(f)}}function l(i){i.done?r(i.value):s(i.value).then(c,h)}l((t=t.apply(n,e||[])).next())})};const Re=Object.assign(Object.assign({},ie.props),{label:String,labelWidth:[Number,String],labelStyle:[String,Object],labelAlign:String,labelPlacement:String,path:String,first:Boolean,rulePath:String,required:Boolean,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:void 0},rule:[Object,Array],size:String,ignorePathChange:Boolean,validationStatus:String,feedback:String,feedbackClass:String,feedbackStyle:[String,Object],showLabel:{type:Boolean,default:void 0},labelProps:Object,contentClass:String,contentStyle:[String,Object]}),it=ne(Re);function he(n,e){return(...a)=>{try{const t=n(...a);return!e&&(typeof t=="boolean"||t instanceof Error||Array.isArray(t))||t?.then?t:(t===void 0||ce("form-item/validate",`You return a ${typeof t} typed value in the validator method, which is not recommended. Please use ${e?"`Promise`":"`boolean`, `Error` or `Promise`"} typed value instead.`),!0)}catch(t){ce("form-item/validate","An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."),console.error(t);return}}}const at=pe({name:"FormItem",props:Re,slots:Object,setup(n){qe(xe,"formItems",te(n,"path"));const{mergedClsPrefixRef:e,inlineThemeDisabled:a}=le(n),t=V(G,null),s=Te(n),r=Ne(n),{validationErrored:o,validationWarned:c}=r,{mergedRequired:h,mergedRules:l}=He(n),{mergedSize:i}=s,{mergedLabelPlacement:f,mergedLabelAlign:v,mergedRequireMarkPlacement:W}=r,d=O([]),$=O(ue()),E=O(null),I=t?te(t.props,"disabled"):O(!1),q=ie("Form","-form-item",Be,be,n,e);oe(te(n,"path"),()=>{n.ignorePathChange||M()});function P(){if(!r.isAutoLabelWidth.value)return;const m=E.value;if(m!==null){const x=m.style.whiteSpace;m.style.whiteSpace="nowrap",m.style.width="",t?.deriveMaxChildLabelWidth(Number(getComputedStyle(m).width.slice(0,-2))),m.style.whiteSpace=x}}function M(){d.value=[],o.value=!1,c.value=!1,n.feedback&&($.value=ue())}const _=(...m)=>ge(this,[...m],void 0,function*(x=null,C=()=>!0,p={suppressWarning:!0}){const{path:z}=n;p?p.first||(p.first=n.first):p={};const{value:F}=l,T=t?we(t.props.model,z||""):void 0,N={},H={},L=(x?F.filter(u=>Array.isArray(u.trigger)?u.trigger.includes(x):u.trigger===x):F).filter(C).map((u,k)=>{const g=Object.assign({},u);if(g.validator&&(g.validator=he(g.validator,!1)),g.asyncValidator&&(g.asyncValidator=he(g.asyncValidator,!0)),g.renderMessage){const K=`__renderMessage__${k}`;H[K]=g.message,g.message=K,N[K]=g.renderMessage}return g}),j=L.filter(u=>u.level!=="warning"),J=L.filter(u=>u.level==="warning"),R={valid:!0,errors:void 0,warnings:void 0};if(!L.length)return R;const D=z??"__n_no_path__",Q=new fe({[D]:j}),X=new fe({[D]:J}),{validateMessages:U}=t?.props||{};U&&(Q.messages(U),X.messages(U));const Z=u=>{d.value=u.map(k=>{const g=k?.message||"";return{key:g,render:()=>g.startsWith("__renderMessage__")?N[g]():g}}),u.forEach(k=>{var g;!((g=k.message)===null||g===void 0)&&g.startsWith("__renderMessage__")&&(k.message=H[k.message])})};if(j.length){const u=yield new Promise(k=>{Q.validate({[D]:T},p,k)});u?.length&&(R.valid=!1,R.errors=u,Z(u))}if(J.length&&!R.errors){const u=yield new Promise(k=>{X.validate({[D]:T},p,k)});u?.length&&(Z(u),R.warnings=u)}return!R.errors&&!R.warnings?M():(o.value=!!R.errors,c.value=!!R.warnings),R});function ye(){_("blur")}function Se(){_("change")}function $e(){_("focus")}function Ie(){_("input")}function _e(m,x){return ge(this,void 0,void 0,function*(){let C,p,z,F;return typeof m=="string"?(C=m,p=x):m!==null&&typeof m=="object"&&(C=m.trigger,p=m.callback,z=m.shouldRuleBeApplied,F=m.options),yield new Promise((T,N)=>{_(C,z,F).then(({valid:H,errors:L,warnings:j})=>{H?(p&&p(void 0,{warnings:j}),T({warnings:j})):(p&&p(L,{warnings:j}),N(L))})})})}re(We,{path:te(n,"path"),disabled:I,mergedSize:s.mergedSize,mergedValidationStatus:r.mergedValidationStatus,restoreValidation:M,handleContentBlur:ye,handleContentChange:Se,handleContentFocus:$e,handleContentInput:Ie});const Pe={validate:_e,restoreValidation:M,internalValidate:_,invalidateLabelWidth:P};ve(P);const de=b(()=>{var m;const{value:x}=i,{value:C}=f,p=C==="top"?"vertical":"horizontal",{common:{cubicBezierEaseInOut:z},self:{labelTextColor:F,asteriskColor:T,lineHeight:N,feedbackTextColor:H,feedbackTextColorWarning:L,feedbackTextColorError:j,feedbackPadding:J,labelFontWeight:R,[A("labelHeight",x)]:D,[A("blankHeight",x)]:Q,[A("feedbackFontSize",x)]:X,[A("feedbackHeight",x)]:U,[A("labelPadding",p)]:Z,[A("labelTextAlign",p)]:u,[A(A("labelFontSize",C),x)]:k}}=q.value;let g=(m=v.value)!==null&&m!==void 0?m:u;return C==="top"&&(g=g==="right"?"flex-end":"flex-start"),{"--n-bezier":z,"--n-line-height":N,"--n-blank-height":Q,"--n-label-font-size":k,"--n-label-text-align":g,"--n-label-height":D,"--n-label-padding":Z,"--n-label-font-weight":R,"--n-asterisk-color":T,"--n-label-text-color":F,"--n-feedback-padding":J,"--n-feedback-font-size":X,"--n-feedback-height":U,"--n-feedback-text-color":H,"--n-feedback-text-color-warning":L,"--n-feedback-text-color-error":j}}),B=a?Me("form-item",b(()=>{var m;return`${i.value[0]}${f.value[0]}${((m=v.value)===null||m===void 0?void 0:m[0])||""}`}),de,n):void 0,Ce=b(()=>f.value==="left"&&W.value==="left"&&v.value==="left");return Object.assign(Object.assign(Object.assign(Object.assign({labelElementRef:E,mergedClsPrefix:e,mergedRequired:h,feedbackId:$,renderExplains:d,reverseColSpace:Ce},r),s),Pe),{cssVars:a?void 0:de,themeClass:B?.themeClass,onRender:B?.onRender})},render(){const{$slots:n,mergedClsPrefix:e,mergedShowLabel:a,mergedShowRequireMark:t,mergedRequireMarkPlacement:s,onRender:r}=this,o=t!==void 0?t:this.mergedRequired;r?.();const c=()=>{const h=this.$slots.label?this.$slots.label():this.label;if(!h)return null;const l=w("span",{class:`${e}-form-item-label__text`},h),i=o?w("span",{class:`${e}-form-item-label__asterisk`},s!=="left"?" *":"* "):s==="right-hanging"&&w("span",{class:`${e}-form-item-label__asterisk-placeholder`}," *"),{labelProps:f}=this;return w("label",Object.assign({},f,{class:[f?.class,`${e}-form-item-label`,`${e}-form-item-label--${s}-mark`,this.reverseColSpace&&`${e}-form-item-label--reverse-columns-space`],style:this.mergedLabelStyle,ref:"labelElementRef"}),s==="left"?[i,l]:[l,i])};return w("div",{class:[`${e}-form-item`,this.themeClass,`${e}-form-item--${this.mergedSize}-size`,`${e}-form-item--${this.mergedLabelPlacement}-labelled`,this.isAutoLabelWidth&&`${e}-form-item--auto-label-width`,!a&&`${e}-form-item--no-label`],style:this.cssVars},a&&c(),w("div",{class:[`${e}-form-item-blank`,this.contentClass,this.mergedValidationStatus&&`${e}-form-item-blank--${this.mergedValidationStatus}`],style:this.contentStyle},n),this.mergedShowFeedback?w("div",{key:this.feedbackId,style:this.feedbackStyle,class:[`${e}-form-item-feedback-wrapper`,this.feedbackClass]},w(je,{name:"fade-down-transition",mode:"out-in"},{default:()=>{const{mergedValidationStatus:h}=this;return Ae(n.feedback,l=>{var i;const{feedback:f}=this,v=l||f?w("div",{key:"__feedback__",class:`${e}-form-item-feedback__line`},l||f):this.renderExplains.length?(i=this.renderExplains)===null||i===void 0?void 0:i.map(({key:W,render:d})=>w("div",{key:W,class:`${e}-form-item-feedback__line`},d())):null;return v?h==="warning"?w("div",{key:"controlled-warning",class:`${e}-form-item-feedback ${e}-form-item-feedback--warning`},v):h==="error"?w("div",{key:"controlled-error",class:`${e}-form-item-feedback ${e}-form-item-feedback--error`},v):h==="success"?w("div",{key:"controlled-success",class:`${e}-form-item-feedback ${e}-form-item-feedback--success`},v):w("div",{key:"controlled-default",class:`${e}-form-item-feedback`},v):null})}})):null)}});export{nt as N,at as a,tt as b,Re as c,Ve as d,it as f,et as u};
