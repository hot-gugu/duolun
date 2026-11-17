import{s as _,e as b,a as w,u as E,k as z,m as H}from"./light-C6iFuy1F.js";import{r as L}from"./Scrollbar-BZksWPOS.js";import{u as O}from"./use-houdini-Dbgcgyf-.js";import{p as v}from"./index-BS1Lf1EV.js";import{d as j,B as k,L as A,F,h as y}from"./runtime-core.esm-bundler-CbNHRoSM.js";function T(e){const{heightSmall:s,heightMedium:r,heightLarge:a,borderRadius:i}=e;return{color:"#eee",colorEnd:"#ddd",borderRadius:i,heightSmall:s,heightMedium:r,heightLarge:a}}const $={common:_,self:T},I=b([w("skeleton",`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),b("@keyframes skeleton-loading",`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]),K=Object.assign(Object.assign({},z.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),G=j({name:"Skeleton",inheritAttrs:!1,props:K,setup(e){O();const{mergedClsPrefixRef:s,mergedComponentPropsRef:r}=E(e),a=y(()=>{var o,t;return e.size||((t=(o=r?.value)===null||o===void 0?void 0:o.Skeleton)===null||t===void 0?void 0:t.size)}),i=z("Skeleton","-skeleton",I,$,e,s);return{mergedClsPrefix:s,style:y(()=>{var o,t;const g=i.value,{common:{cubicBezierEaseInOut:S}}=g,h=g.self,{color:x,colorEnd:B,borderRadius:P}=h;let l;const{circle:d,sharp:R,round:C,width:n,height:c,text:f,animated:N}=e,p=a.value;p!==void 0&&(l=h[H("height",p)]);const u=d?(o=n??c)!==null&&o!==void 0?o:l:n,m=(t=d?n??c:c)!==null&&t!==void 0?t:l;return{display:f?"inline-block":"",verticalAlign:f?"-0.125em":"",borderRadius:d?"50%":C?"4096px":R?"":P,width:typeof u=="number"?v(u):u,height:typeof m=="number"?v(m):m,animation:N?"":"none","--n-bezier":S,"--n-color-start":x,"--n-color-end":B}})}},render(){const{repeat:e,style:s,mergedClsPrefix:r,$attrs:a}=this,i=k("div",A({class:`${r}-skeleton`,style:s},a));return e>1?k(F,null,L(e,null).map(o=>[i,`
`])):i}});export{G as N,K as s};
