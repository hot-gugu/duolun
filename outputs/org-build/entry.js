import {l as Vue} from './warn-BfczDB-2.js';
import {n as naive,z as zhCN,d as dateZhCN} from './preset-mlEAr3G_.js';
import {c as createPinia} from './usePermissionStore-CcQMVHvK.js';
import {c as createRouter,a as createWebHashHistory,R as RouterView} from './vue-router-DHdv1LHA.js';
import Members from './OrgMembersPage-BNfKPIhb.js';
import Structure from './OrgStructurePage-CYSRGFWJ.js';
import Posts from './OrgPostsPage-DzLESh2J.js';
import Roles from './OrgRolesPage-CJYsJyXD.js';
import {ready} from './local-data.js';
const routes=[{path:'/members',name:'productionOrgMembers',component:Members},{path:'/structure',name:'productionOrgStructure',component:Structure},{path:'/posts',name:'productionOrgPosts',component:Posts},{path:'/roles',name:'productionOrgRoles',component:Roles},{path:'/:pathMatch(.*)*',redirect:'/members'}];
const router=createRouter({history:createWebHashHistory(),routes});
router.afterEach(to=>{if(parent!==window)parent.postMessage({type:'duolun-org-source-navigation',path:to.path,query:to.query},'*')});
const theme={common:{primaryColor:'#0879ff',primaryColorHover:'#3d8fff',primaryColorPressed:'#065fd4',borderRadius:'8px',fontFamily:'"PingFang SC", "Microsoft YaHei", "Segoe UI", system-ui, sans-serif',fontSize:'14px'},Button:{fontWeight:'400'}};
const Root={render(){return Vue.h(Vue.resolveComponent('n-config-provider'),{locale:zhCN,dateLocale:dateZhCN,themeOverrides:theme},()=>Vue.h(Vue.resolveComponent('n-message-provider'),null,()=>Vue.h(Vue.resolveComponent('n-dialog-provider'),null,()=>Vue.h(RouterView))))}};
async function start(){await ready;const app=Vue.createApp(Root);app.use(createPinia());app.use(naive);app.use(router);await router.isReady();app.mount('#app');window.addEventListener('message',event=>{if(event.source!==parent||event.data?.type!=='duolun-org-source-route')return;router.replace({path:event.data.path,query:event.data.query||{}})});document.getElementById('loading')?.remove()}
start().catch(error=>{console.error(error);document.getElementById('loading').textContent='页面加载失败：'+error.message});

let overlayState=false,overlayScheduled=false;
function reportOverlay(){overlayScheduled=false;const visible=!![...document.querySelectorAll('.biz-drawer__panel[aria-hidden="false"],.n-dialog.n-modal,.n-modal')].find(e=>e.getBoundingClientRect().width>0&&getComputedStyle(e).visibility!=='hidden');if(visible!==overlayState){overlayState=visible;if(parent!==window)parent.postMessage({type:'duolun-org-source-overlay',open:visible},'*')}}
new MutationObserver(()=>{if(!overlayScheduled){overlayScheduled=true;requestAnimationFrame(reportOverlay)}}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-hidden','inert','class']});
window.addEventListener('message',event=>{if(event.source!==parent||event.data?.type!=='duolun-org-source-layout')return;const app=document.getElementById('app'),r=event.data.rect;if(r){Object.assign(app.style,{position:'absolute',left:r.x+'px',top:r.y+'px',width:r.width+'px',height:r.height+'px'})}else{for(const k of ['position','left','top','width','height'])app.style[k]=''}});
