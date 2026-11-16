from pathlib import Path
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8')
s=s.replace("const ui=reactive({id:","const ui=reactive({treeKey:'all',treeSearch:'',id:")
pos=s.index(' const rows=computed')
s=s[:pos]+''' const treeOptions=computed(()=>{const regions=[...new Set(props.monitors.map(m=>m.area||'未分配罐区'))];return regions.map(area=>{const ms=props.monitors.filter(m=>(m.area||'未分配罐区')===area),children=props.store.points.map(p=>{const leaves=ms.filter(m=>p.links.includes(m.id));return {key:'point:'+area+':'+p.id,label:p.name+'（'+leaves.length+'）',scope:leaves.map(m=>m.id),children:leaves.map(m=>({key:'monitor:'+area+':'+p.id+':'+m.id,label:m.name,scope:[m.id]}))}}).filter(p=>p.children.length);const loose=ms.filter(m=>!props.store.points.some(p=>p.links.includes(m.id)));if(loose.length)children.push({key:'unbound:'+area,label:'未关联巡检点（'+loose.length+'）',scope:loose.map(m=>m.id),children:loose.map(m=>({key:'monitor:'+area+':unbound:'+m.id,label:m.name,scope:[m.id]}))});return {key:'area:'+area,label:area+'（'+ms.length+'）',scope:ms.map(m=>m.id),children}})});
 const treeSelected=computed(()=>{const find=nodes=>{for(const n of nodes){if(n.key===ui.treeKey)return n;const child=find(n.children||[]);if(child)return child}return null};return find(treeOptions.value)});
 const selectTree=keys=>{ui.treeKey=keys[0]||'all';ui.page=1};
'''+s[pos:]
s=s.replace("return list.filter(x=>", "return list.filter(x=>(props.mode!=='monitors'||ui.treeKey==='all'||(treeSelected.value?.scope||[]).includes(x.id))&&")
s=s.replace("area:null,tank:null,object:'',source:null,status:null,method:null,drawer:false", "area:null,tank:null,object:'',source:null,status:null,method:null,treeKey:'all',treeSearch:'',drawer:false")
s=s.replace("const reset=()=>Object.assign(ui,{id:","const reset=()=>Object.assign(ui,{treeKey:'all',treeSearch:'',id:")
s=s.replace('return {tankOptions,','return {treeOptions,treeSelected,selectTree,tankOptions,')
s=s.replace('template:`<div class="pm-workbench">', '''template:`<div class="pm-workbench"><div class="pm-content-shell" :class="{'pm-content-shell--tree':mode==='monitors'}"><aside v-if="mode==='monitors'" class="pm-monitor-tree"><h3>监测点位树</h3><n-input v-model:value="ui.treeSearch" clearable placeholder="搜索罐区、巡检点、监测点"/><button class="pm-tree-all" :class="{active:ui.treeKey==='all'}" @click="selectTree([])">全部监测点位（{{monitors.length}}）</button><div class="pm-tree-scroll"><n-tree :data="treeOptions" :pattern="ui.treeSearch" :selected-keys="ui.treeKey==='all'?[]:[ui.treeKey]" :default-expanded-keys="treeOptions.map(n=>n.key)" block-line @update:selected-keys="selectTree"/><prod-empty-state v-if="!treeOptions.length" text="暂无监测点位"/></div></aside><div class="pm-monitor-main">''')
s=s.replace(' <n-drawer v-model:show="ui.drawer"', ' </div></div><n-drawer v-model:show="ui.drawer"',1)
s=s.replace('<span class="subtext">共 {{rows.length}} 个点位','<span class="subtext"><span v-if="mode===\'monitors\'&&treeSelected">{{treeSelected.label}} · </span>共 {{rows.length}} 个点位')
p.write_text(s,encoding='utf8')
