import{B as Ne,V as Re,e as Pe,r as ke,N as Ke,f as ae}from"./Popover-17HLIuny.js";import{g as re,h as Ie,i as Ce}from"./warn-BfczDB-2.js";import{p as se,X as _e,j as Oe,k as ze,u as $e}from"./Scrollbar-BZksWPOS.js";import{r as F,w as ue,d as T,B as l,C as j,L as ce,h as m,H as E,F as De,U as k}from"./runtime-core.esm-bundler-CbNHRoSM.js";import{r as G,f as Ae}from"./fade-in-scale-up.cssr-CLYwdj1u.js";import{N as Fe}from"./Icon-BTQoCpyu.js";import{C as je}from"./ChevronRight-DgOjBikf.js";import{h as q,a as x,e as L,j as ie,d as K,g as O,u as Te,k as pe,l as Be,o as oe,m as A}from"./light-C6iFuy1F.js";import{h as de,c as Me}from"./light-DppTtB0P.js";import{k as Le}from"./keep-BuBMtln4.js";import{u as Ee}from"./use-keyboard-2GN9UVrn.js";import{c as He}from"./create-ref-setter-C4J8sofl.js";import{d as Ue}from"./light-CtaOkF5E.js";function We(e,i,a){const t=F(e.value);let r=null;return ue(e,n=>{r!==null&&window.clearTimeout(r),n===!0?a&&!a.value?t.value=!0:r=window.setTimeout(()=>{t.value=!0},i):t.value=!1}),t}const te=re("n-dropdown-menu"),V=re("n-dropdown"),le=re("n-dropdown-option"),fe=T({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return l("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),qe=T({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:i}=j(te),{renderLabelRef:a,labelFieldRef:t,nodePropsRef:r,renderOptionRef:n}=j(V);return{labelField:t,showIcon:e,hasSubmenu:i,renderLabel:a,nodeProps:r,renderOption:n}},render(){var e;const{clsPrefix:i,hasSubmenu:a,showIcon:t,nodeProps:r,renderLabel:n,renderOption:f}=this,{rawNode:v}=this.tmNode,p=l("div",Object.assign({class:`${i}-dropdown-option`},r?.(v)),l("div",{class:`${i}-dropdown-option-body ${i}-dropdown-option-body--group`},l("div",{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__prefix`,t&&`${i}-dropdown-option-body__prefix--show-icon`]},G(v.icon)),l("div",{class:`${i}-dropdown-option-body__label`,"data-dropdown-option":!0},n?n(v):G((e=v.title)!==null&&e!==void 0?e:v[this.labelField])),l("div",{class:[`${i}-dropdown-option-body__suffix`,a&&`${i}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return f?f({node:p,option:v}):p}});function ne(e,i){return e.type==="submenu"||e.type===void 0&&e[i]!==void 0}function Ge(e){return e.type==="group"}function ve(e){return e.type==="divider"}function Ve(e){return e.type==="render"}const he=T({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const i=j(V),{hoverKeyRef:a,keyboardKeyRef:t,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:n,activeKeyPathRef:f,animatedRef:v,mergedShowRef:p,renderLabelRef:y,renderIconRef:g,labelFieldRef:S,childrenFieldRef:I,renderOptionRef:N,nodePropsRef:R,menuPropsRef:z}=i,w=j(le,null),C=j(te),_=j(se),U=m(()=>e.tmNode.rawNode),H=m(()=>{const{value:o}=I;return ne(e.tmNode.rawNode,o)}),X=m(()=>{const{disabled:o}=e.tmNode;return o}),J=m(()=>{if(!H.value)return!1;const{key:o,disabled:u}=e.tmNode;if(u)return!1;const{value:b}=a,{value:$}=t,{value:ee}=r,{value:D}=n;return b!==null?D.includes(o):$!==null?D.includes(o)&&D[D.length-1]!==o:ee!==null?D.includes(o):!1}),Q=m(()=>t.value===null&&!v.value),Y=We(J,300,Q),Z=m(()=>!!w?.enteringSubmenuRef.value),B=F(!1);E(le,{enteringSubmenuRef:B});function M(){B.value=!0}function W(){B.value=!1}function P(){const{parentKey:o,tmNode:u}=e;u.disabled||p.value&&(r.value=o,t.value=null,a.value=u.key)}function d(){const{tmNode:o}=e;o.disabled||p.value&&a.value!==o.key&&P()}function s(o){if(e.tmNode.disabled||!p.value)return;const{relatedTarget:u}=o;u&&!de({target:u},"dropdownOption")&&!de({target:u},"scrollbarRail")&&(a.value=null)}function c(){const{value:o}=H,{tmNode:u}=e;p.value&&!o&&!u.disabled&&(i.doSelect(u.key,u.rawNode),i.doUpdateShow(!1))}return{labelField:S,renderLabel:y,renderIcon:g,siblingHasIcon:C.showIconRef,siblingHasSubmenu:C.hasSubmenuRef,menuProps:z,popoverBody:_,animated:v,mergedShowSubmenu:m(()=>Y.value&&!Z.value),rawNode:U,hasSubmenu:H,pending:q(()=>{const{value:o}=n,{key:u}=e.tmNode;return o.includes(u)}),childActive:q(()=>{const{value:o}=f,{key:u}=e.tmNode,b=o.findIndex($=>u===$);return b===-1?!1:b<o.length-1}),active:q(()=>{const{value:o}=f,{key:u}=e.tmNode,b=o.findIndex($=>u===$);return b===-1?!1:b===o.length-1}),mergedDisabled:X,renderOption:N,nodeProps:R,handleClick:c,handleMouseMove:d,handleMouseEnter:P,handleMouseLeave:s,handleSubmenuBeforeEnter:M,handleSubmenuAfterEnter:W}},render(){var e,i;const{animated:a,rawNode:t,mergedShowSubmenu:r,clsPrefix:n,siblingHasIcon:f,siblingHasSubmenu:v,renderLabel:p,renderIcon:y,renderOption:g,nodeProps:S,props:I,scrollable:N}=this;let R=null;if(r){const _=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,t,t.children);R=l(me,Object.assign({},_,{clsPrefix:n,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const z={class:[`${n}-dropdown-option-body`,this.pending&&`${n}-dropdown-option-body--pending`,this.active&&`${n}-dropdown-option-body--active`,this.childActive&&`${n}-dropdown-option-body--child-active`,this.mergedDisabled&&`${n}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},w=S?.(t),C=l("div",Object.assign({class:[`${n}-dropdown-option`,w?.class],"data-dropdown-option":!0},w),l("div",ce(z,I),[l("div",{class:[`${n}-dropdown-option-body__prefix`,f&&`${n}-dropdown-option-body__prefix--show-icon`]},[y?y(t):G(t.icon)]),l("div",{"data-dropdown-option":!0,class:`${n}-dropdown-option-body__label`},p?p(t):G((i=t[this.labelField])!==null&&i!==void 0?i:t.title)),l("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__suffix`,v&&`${n}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?l(Fe,null,{default:()=>l(je,null)}):null)]),this.hasSubmenu?l(Ne,null,{default:()=>[l(Re,null,{default:()=>l("div",{class:`${n}-dropdown-offset-container`},l(Pe,{show:this.mergedShowSubmenu,placement:this.placement,to:N&&this.popoverBody||void 0,teleportDisabled:!N},{default:()=>l("div",{class:`${n}-dropdown-menu-wrapper`},a?l(Ie,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>R}):R)}))})]}):null);return g?g({node:C,option:t}):C}}),Xe=T({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:i,clsPrefix:a}=this,{children:t}=e;return l(De,null,l(qe,{clsPrefix:a,tmNode:e,key:e.key}),t?.map(r=>{const{rawNode:n}=r;return n.show===!1?null:ve(n)?l(fe,{clsPrefix:a,key:r.key}):r.isGroup?(Ce("dropdown","`group` node is not allowed to be put in `group` node."),null):l(he,{clsPrefix:a,tmNode:r,parentKey:i,key:r.key})}))}}),Je=T({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:i}}=this.tmNode;return l("div",i,[e?.()])}}),me=T({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:i,childrenFieldRef:a}=j(V);E(te,{showIconRef:m(()=>{const r=i.value;return e.tmNodes.some(n=>{var f;if(n.isGroup)return(f=n.children)===null||f===void 0?void 0:f.some(({rawNode:p})=>r?r(p):p.icon);const{rawNode:v}=n;return r?r(v):v.icon})}),hasSubmenuRef:m(()=>{const{value:r}=a;return e.tmNodes.some(n=>{var f;if(n.isGroup)return(f=n.children)===null||f===void 0?void 0:f.some(({rawNode:p})=>ne(p,r));const{rawNode:v}=n;return ne(v,r)})})});const t=F(null);return E(Oe,null),E(ze,null),E(se,t),{bodyRef:t}},render(){const{parentKey:e,clsPrefix:i,scrollable:a}=this,t=this.tmNodes.map(r=>{const{rawNode:n}=r;return n.show===!1?null:Ve(n)?l(Je,{tmNode:r,key:r.key}):ve(n)?l(fe,{clsPrefix:i,key:r.key}):Ge(n)?l(Xe,{clsPrefix:i,tmNode:r,parentKey:e,key:r.key}):l(he,{clsPrefix:i,tmNode:r,parentKey:e,key:r.key,props:n.props,scrollable:a})});return l("div",{class:[`${i}-dropdown-menu`,a&&`${i}-dropdown-menu--scrollable`],ref:"bodyRef"},a?l(_e,{contentClass:`${i}-dropdown-menu__content`},{default:()=>t}):t,this.showArrow?ke({clsPrefix:i,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),Qe=x("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Ae(),x("dropdown-option",`
 position: relative;
 `,[L("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[L("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),x("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[L("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ie("disabled",[K("pending",`
 color: var(--n-option-text-color-hover);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),L("&::before","background-color: var(--n-option-color-hover);")]),K("active",`
 color: var(--n-option-text-color-active);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),L("&::before","background-color: var(--n-option-color-active);")]),K("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),K("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),K("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[O("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[K("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),O("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[K("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),x("icon",`
 font-size: var(--n-option-icon-size);
 `)]),O("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),O("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[K("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),x("icon",`
 font-size: var(--n-option-icon-size);
 `)]),x("dropdown-menu","pointer-events: all;")]),x("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),x("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),x("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),L(">",[x("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ie("scrollable",`
 padding: var(--n-padding);
 `),K("scrollable",[O("content",`
 padding: var(--n-padding);
 `)])]),Ye={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},Ze=Object.keys(ae),eo=Object.assign(Object.assign(Object.assign({},ae),Ye),pe.props),ho=T({name:"Dropdown",inheritAttrs:!1,props:eo,setup(e){const i=F(!1),a=$e(k(e,"show"),i),t=m(()=>{const{keyField:d,childrenField:s}=e;return Me(e.options,{getKey(c){return c[d]},getDisabled(c){return c.disabled===!0},getIgnored(c){return c.type==="divider"||c.type==="render"},getChildren(c){return c[s]}})}),r=m(()=>t.value.treeNodes),n=F(null),f=F(null),v=F(null),p=m(()=>{var d,s,c;return(c=(s=(d=n.value)!==null&&d!==void 0?d:f.value)!==null&&s!==void 0?s:v.value)!==null&&c!==void 0?c:null}),y=m(()=>t.value.getPath(p.value).keyPath),g=m(()=>t.value.getPath(e.value).keyPath),S=q(()=>e.keyboard&&a.value);Ee({keydown:{ArrowUp:{prevent:!0,handler:Q},ArrowRight:{prevent:!0,handler:J},ArrowDown:{prevent:!0,handler:Y},ArrowLeft:{prevent:!0,handler:X},Enter:{prevent:!0,handler:Z},Escape:H}},S);const{mergedClsPrefixRef:I,inlineThemeDisabled:N,mergedComponentPropsRef:R}=Te(e),z=m(()=>{var d,s;return e.size||((s=(d=R?.value)===null||d===void 0?void 0:d.Dropdown)===null||s===void 0?void 0:s.size)||"medium"}),w=pe("Dropdown","-dropdown",Qe,Ue,e,I);E(V,{labelFieldRef:k(e,"labelField"),childrenFieldRef:k(e,"childrenField"),renderLabelRef:k(e,"renderLabel"),renderIconRef:k(e,"renderIcon"),hoverKeyRef:n,keyboardKeyRef:f,lastToggledSubmenuKeyRef:v,pendingKeyPathRef:y,activeKeyPathRef:g,animatedRef:k(e,"animated"),mergedShowRef:a,nodePropsRef:k(e,"nodeProps"),renderOptionRef:k(e,"renderOption"),menuPropsRef:k(e,"menuProps"),doSelect:C,doUpdateShow:_}),ue(a,d=>{!e.animated&&!d&&U()});function C(d,s){const{onSelect:c}=e;c&&oe(c,d,s)}function _(d){const{"onUpdate:show":s,onUpdateShow:c}=e;s&&oe(s,d),c&&oe(c,d),i.value=d}function U(){n.value=null,f.value=null,v.value=null}function H(){_(!1)}function X(){M("left")}function J(){M("right")}function Q(){M("up")}function Y(){M("down")}function Z(){const d=B();d?.isLeaf&&a.value&&(C(d.key,d.rawNode),_(!1))}function B(){var d;const{value:s}=t,{value:c}=p;return!s||c===null?null:(d=s.getNode(c))!==null&&d!==void 0?d:null}function M(d){const{value:s}=p,{value:{getFirstAvailableNode:c}}=t;let o=null;if(s===null){const u=c();u!==null&&(o=u.key)}else{const u=B();if(u){let b;switch(d){case"down":b=u.getNext();break;case"up":b=u.getPrev();break;case"right":b=u.getChild();break;case"left":b=u.getParent();break}b&&(o=b.key)}}o!==null&&(n.value=null,f.value=o)}const W=m(()=>{const{inverted:d}=e,s=z.value,{common:{cubicBezierEaseInOut:c},self:o}=w.value,{padding:u,dividerColor:b,borderRadius:$,optionOpacityDisabled:ee,[A("optionIconSuffixWidth",s)]:D,[A("optionSuffixWidth",s)]:be,[A("optionIconPrefixWidth",s)]:we,[A("optionPrefixWidth",s)]:ye,[A("fontSize",s)]:ge,[A("optionHeight",s)]:xe,[A("optionIconSize",s)]:Se}=o,h={"--n-bezier":c,"--n-font-size":ge,"--n-padding":u,"--n-border-radius":$,"--n-option-height":xe,"--n-option-prefix-width":ye,"--n-option-icon-prefix-width":we,"--n-option-suffix-width":be,"--n-option-icon-suffix-width":D,"--n-option-icon-size":Se,"--n-divider-color":b,"--n-option-opacity-disabled":ee};return d?(h["--n-color"]=o.colorInverted,h["--n-option-color-hover"]=o.optionColorHoverInverted,h["--n-option-color-active"]=o.optionColorActiveInverted,h["--n-option-text-color"]=o.optionTextColorInverted,h["--n-option-text-color-hover"]=o.optionTextColorHoverInverted,h["--n-option-text-color-active"]=o.optionTextColorActiveInverted,h["--n-option-text-color-child-active"]=o.optionTextColorChildActiveInverted,h["--n-prefix-color"]=o.prefixColorInverted,h["--n-suffix-color"]=o.suffixColorInverted,h["--n-group-header-text-color"]=o.groupHeaderTextColorInverted):(h["--n-color"]=o.color,h["--n-option-color-hover"]=o.optionColorHover,h["--n-option-color-active"]=o.optionColorActive,h["--n-option-text-color"]=o.optionTextColor,h["--n-option-text-color-hover"]=o.optionTextColorHover,h["--n-option-text-color-active"]=o.optionTextColorActive,h["--n-option-text-color-child-active"]=o.optionTextColorChildActive,h["--n-prefix-color"]=o.prefixColor,h["--n-suffix-color"]=o.suffixColor,h["--n-group-header-text-color"]=o.groupHeaderTextColor),h}),P=N?Be("dropdown",m(()=>`${z.value[0]}${e.inverted?"i":""}`),W,e):void 0;return{mergedClsPrefix:I,mergedTheme:w,mergedSize:z,tmNodes:r,mergedShow:a,handleAfterLeave:()=>{e.animated&&U()},doUpdateShow:_,cssVars:N?void 0:W,themeClass:P?.themeClass,onRender:P?.onRender}},render(){const e=(t,r,n,f,v)=>{var p;const{mergedClsPrefix:y,menuProps:g}=this;(p=this.onRender)===null||p===void 0||p.call(this);const S=g?.(void 0,this.tmNodes.map(N=>N.rawNode))||{},I={ref:He(r),class:[t,`${y}-dropdown`,`${y}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:y,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:f,onMouseleave:v};return l(me,ce(this.$attrs,I,S))},{mergedTheme:i}=this,a={show:this.mergedShow,theme:i.peers.Popover,themeOverrides:i.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return l(Ke,Object.assign({},Le(this.$props,Ze),a),{trigger:()=>{var t,r;return(r=(t=this.$slots).default)===null||r===void 0?void 0:r.call(t)}})}});export{ho as N,eo as d};
