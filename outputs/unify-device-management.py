from pathlib import Path
for f,comp in [('多伦智能巡检平台.html','DeviceView'),('智能巡检设备管理.html','AppView')]:
 p=Path(f);s=p.read_text(encoding='utf8');b=s.index('const '+comp+'=');e=s.index('naive.defaultLocale',b) if comp=='AppView' else s.index('const Platform=',b);chunk=s[b:e]
 chunk=chunk.replace('components:{Icon},','components:{Icon},props:[\'pointStore\',\'monitorRecords\',\'taskRecords\'],',1)
 if comp=='AppView':chunk=chunk.replace('setup(){','setup(props){',1)
 pos=chunk.index('const menu=')
 helpers='''let linkedSaved={};try{linkedSaved=JSON.parse(localStorage.getItem('duolun-platform-v1'))||{}}catch{}
const linkedMonitors=()=>props?.monitorRecords||linkedSaved.monitorRecords||[];
const linkedPoints=()=>props?.pointStore?.points||linkedSaved.points||[];
const isMobile=d=>(get(d.parentId)||d).type==='巡检机器人';
const deviceLinks=d=>{const explicit=d.monitorIds||[];const demoPrefix=d.id.startsWith('OGI-')?'OGI-'+String(Number(d.id.split('-')[1])).padStart(2,'0')+'-P':null;const cam=d.id.startsWith('CAM-')?'CAM-'+String(Number(d.id.split('-')[1])).padStart(2,'0'):null;return linkedMonitors().filter(m=>explicit.includes(m.id)||m.deviceId===d.id||(demoPrefix&&m.source==='气云设备'&&m.id.startsWith(demoPrefix))||(cam&&m.source==='摄像头'&&m.id===cam))};
const devicePatrols=d=>linkedPoints().filter(p=>deviceLinks(d).some(m=>p.links?.includes(m.id)));
const deviceScope=(d,key)=>{if(isMobile(d))return '—';const list=[...new Set(deviceLinks(d).map(m=>m[key]).filter(Boolean))];return list.join('、')||d[key]||'—'};
const deviceFaults=d=>(d.faultHistory||[]).filter(e=>e.status!=='已恢复').length;
const showLinks=d=>{open(d);tab.value='关联点位'};
const currentDevicePosition=d=>{if(!isMobile(d))return d.location||'—';const owner=d.parentId||d.id,task=(props?.taskRecords||linkedSaved.tasks||[]).find(t=>t.robotId===owner&&['进行中','暂停中'].includes(t.state));const point=linkedPoints().find(p=>p.id===task?.currentPoint);return point?point.name+' / '+point.id:'未回传当前位置'};
'''
 chunk=chunk[:pos]+helpers+chunk[pos:]
 chunk=chunk.replace("const tabs=['基础档案','安装与覆盖','接入信息','资产与维保','关联记录'];","const tabs=['基础档案','关联点位','实时读数','监测曲线','异常记录','安装与覆盖','接入信息','资产与维保','维护记录'];",1)
 # Unified status filtering supports both lifecycle and running states.
 x=chunk.index('const statusOptions=') if 'const statusOptions=' in chunk else -1
 # declaration follows typeOptions on same line
 start=chunk.index('const statusOptions=computed');end=chunk.index(';const regionOptions=',start)
 chunk=chunk[:start]+"const statusOptions=computed(()=>['在用','停用','退役','在线','离线','存在异常','正常'].map(v=>({label:v,value:v})))"+chunk[end:]
 chunk=chunk.replace("menu.value==='ledger'?d.life===status.value:status.value==='在线'?d.online:status.value==='离线'?!d.online:status.value==='存在异常'?eventsFor(d).some(e=>e.status!=='已恢复'):!eventsFor(d).some(e=>e.status!=='已恢复')&&d.online","['在用','停用','退役'].includes(status.value)?d.life===status.value:status.value==='在线'?d.online:status.value==='离线'?!d.online:status.value==='存在异常'?hasFault(d):!hasFault(d)&&d.online",1)
 # Search related patrol/monitor identifiers as well.
 chunk=chunk.replace('[d.name,d.id,d.location,d.owner].join',"[d.name,d.id,d.location,d.owner,...deviceLinks(d).flatMap(m=>[m.id,m.name]),...devicePatrols(d).flatMap(p=>[p.id,p.name])].join",1)
 chunk=chunk.replace("menu.value==='monitor'?eventsFor(d).some(e=>e.status!=='已恢复'):hasFault(d)","hasFault(d)",1)
 chunk=chunk.replace('return{maintenanceModal,','return{deviceLinks,devicePatrols,deviceScope,deviceFaults,showLinks,isMobile,currentDevicePosition,maintenanceModal,',1)
 tb=chunk.index('},template:`');logic=chunk[:tb];t=chunk[tb:]
 t=t.replace('<button class="nav" :class="{active:menu===\'ledger\'}" @click="switchMenu(\'ledger\')">设备台账管理</button><button class="nav" :class="{active:menu===\'monitor\'}" @click="switchMenu(\'monitor\')">设备状态实时监测</button>','<button class="nav active" @click="switchMenu(\'ledger\')">监测设备管理</button>',1)
 t=t.replace("{{menu==='ledger'?'设备台账管理':'设备状态实时监测'}}",'监测设备管理')
 t=t.replace("{{menu==='ledger'?'统一管理罐区前端设备档案与挂载关系':'汇集实时巡检读数、监测曲线与异常记录'}}",'统一查看设备档案、运行状态及关联监测点位')
 # Remove embedded two-tab module navigation if present.
 import re
 t=re.sub(r'<div class="tab-group[^\"]*"><button[^>]*@click="switchMenu\(\'ledger\'\)"[\s\S]*?</div>', '', t, count=1)
 t=t.replace("{{menu==='ledger'?'主设备总数':'监测主设备'}}",'主设备总数').replace("metric===(menu==='ledger'?'children':'online')","metric==='online'").replace("metric=menu==='ledger'?'children':'online'","metric='online'").replace(":name=\"menu==='ledger'?'sensor':'check'\"",'name="check"').replace("{{menu==='ledger'?'挂载设备数量':'在线设备'}}",'在线主设备').replace("{{menu==='ledger'?childrenTotal:onlineCount}}",'{{onlineCount}}').replace("{{menu==='ledger'?'存在异常的主设备':'有未关闭异常的设备'}}",'异常主设备').replace("{{menu==='ledger'?faultCount:anomalyDevices}}",'{{faultCount}}')
 t=t.replace("{{menu==='ledger'?'使用状态':'运行状态'}}",'设备状态').replace('<label>所属区域</label>','<label>所属罐区</label>',1).replace('placeholder="搜索设备名称、编号、位置或责任人"','placeholder="搜索设备、巡检点或监测点名称及编号"',1)
 t=t.replace("{{archive?'归档设备':menu==='ledger'?'设备列表':'实时监测数据'}}","{{archive?'归档设备':'设备列表'}}",1)
 start=t.index('<div class="table-scroll"><table v-if="rows.length"');end=t.index('<div v-else class="empty">',start)
 table='''<div class="table-scroll"><table v-if="rows.length" class="unified-device-table"><thead><tr><th><n-checkbox :checked="rows.length>0&&rows.every(d=>selected.has(d.id))" :indeterminate="rows.some(d=>selected.has(d.id))&&!rows.every(d=>selected.has(d.id))" @update:checked="v=>rows.forEach(d=>check(d.id,v))"/></th><th>设备编号</th><th>设备名称</th><th>设备类型</th><th>所属主设备</th><th>所属罐区</th><th>所属部位</th><th>所属区域</th><th>关联巡检点</th><th>关联监测点数量</th><th>在线状态</th><th>运行状态</th><th>当前异常数量</th><th>最近上报时间</th><th>操作</th></tr></thead><tbody><tr v-for="d in rows" :key="d.id" :class="{child:d.parentId}"><td><n-checkbox :checked="selected.has(d.id)" @update:checked="v=>check(d.id,v)"/></td><td>{{d.id}}</td><td><div class="device-cell"><button v-if="d.children?.length" class="toggle" @click="toggle(d.id)" :aria-label="'展开或收起'+d.name">{{rows.some(c=>c.parentId===d.id)?'⌄':'›'}}</button><span v-if="d.parentId" class="child-mark">└</span><span class="device-icon"><icon :name="icon(d)"/></span><button class="device-link" @click="open(d)">{{d.name}}</button></div></td><td>{{d.type}}</td><td>{{get(d.parentId)?.name||'—'}}<span v-if="d.parentId" class="subtext">{{d.parentId}}</span></td><td>{{deviceScope(d,'tankArea')}}</td><td>{{deviceScope(d,'tankName')}}<span class="subtext">{{deviceScope(d,'tankId')}}</span></td><td>{{deviceScope(d,'area')}}</td><td><button v-if="devicePatrols(d).length" class="device-link" @click="showLinks(d)">{{devicePatrols(d).length===1?devicePatrols(d)[0].name:devicePatrols(d).length+' 个巡检点'}}<span v-if="devicePatrols(d).length===1" class="subtext">{{devicePatrols(d)[0].id}}</span></button><span v-else>—</span></td><td><button class="device-link" @click="showLinks(d)">{{deviceLinks(d).length}} 个</button></td><td><span class="pill" :class="d.online?'green':'gray'">{{d.online?'在线':'离线'}}</span></td><td><span class="pill" :class="hasFault(d)?'orange':d.online?'green':'gray'">{{hasFault(d)?'异常':d.online?'正常':'未知'}}</span></td><td><button class="device-link" @click="openData(d,'异常记录')">{{deviceFaults(d)}} 条</button></td><td>{{readings(d)[0]?.time||'—'}}</td><td><div class="row-actions"><button class="row-btn" @click="open(d)">详情</button><button class="row-btn" @click="openData(d)">实时数据</button><button class="row-btn" @click="openData(d,'异常记录')">异常记录</button><button v-if="!archive" class="row-btn" @click="startEdit(d)">编辑</button><button v-if="!d.parentId" class="row-btn" @click="archiveDevice(d)">{{archive?'恢复':'归档'}}</button></div></td></tr></tbody></table>'''
 t=t[:start]+table+t[end:]
 t=t.replace("(menu==='monitor'?monitorTabs:tabs)","(editing?['基础档案','安装与覆盖','接入信息','资产与维保']:tabs)")
 t=t.replace("menu==='monitor'?'设备监测详情':'设备档案详情'","'设备详情'")
 t=t.replace("tab==='关联记录'","tab==='维护记录'")
 needle='<template v-if="tab===\'实时读数\'">'
 if needle not in t:needle='<template v-if="tab===\'实时读数\'&&current">'
 # Insert new association branch before existing first tab branch, preserving chain.
 idx=t.index('<template v-if="tab===')
 assoc='''<template v-if="tab==='关联点位'"><h3 class="section-title">位置与监测点关联</h3><div class="surface"><span class="info-label">{{isMobile(current)?'当前所在位置':'安装位置'}}</span><p>{{currentDevicePosition(current)}}</p></div><div class="table-scroll"><table><thead><tr><th>所属罐区</th><th>所属部位</th><th>所属区域</th><th>巡检点名称 / 编号</th><th>监测点名称 / 编号</th><th>具体位置</th></tr></thead><tbody><template v-for="m in deviceLinks(current)" :key="m.id"><tr v-for="p in linkedPointsForMonitor(m.id)" :key="p?.id||m.id"><td>{{m.tankArea||'—'}}<span class="subtext">{{m.tankAreaCode||'未同步编号'}}</span></td><td>{{m.tankName||'—'}}<span class="subtext">{{m.tankId||'未同步编号'}}</span></td><td>{{m.area||'—'}}<span class="subtext">{{m.areaCode||'未同步编号'}}</span></td><td>{{p?.name||'未关联'}}<span class="subtext">{{p?.id||'—'}}</span></td><td>{{m.name}}<span class="subtext">{{m.id}}</span></td><td>{{m.location||'—'}}</td></tr></template></tbody></table></div><div v-if="!deviceLinks(current).length" class="empty"><img src="assets/empty.svg" alt=""><p>暂无关联监测点位</p></div></template>'''
 t=t[:idx]+assoc+t[idx:].replace('<template v-if="tab===','<template v-else-if="tab===',1)
 # Preserve monitoring export access and edit access regardless of old page mode.
 t=t.replace('v-if="menu===\'monitor\'" class="soft" @click="exportReadings"','v-if="[\'实时读数\',\'监测曲线\',\'异常记录\'].includes(tab)" class="soft" @click="exportReadings"')
 t=t.replace("v-else-if=\"menu==='ledger'&&!current?.archived\"","v-else-if=\"!current?.archived\"")
 t=t.replace('← 返回实时监测','← 返回设备列表')
 # Remove old fictional external-point summary in maintenance tab.
 m=t.index('<template v-else-if="tab===\'维护记录\'">');n=t.index('<div class="monitor-toolbar">',m)
 t=t[:m]+"<template v-else-if=\"tab==='维护记录'\">"+t[n:]
 logic=logic.replace('const devicePatrols=',"const linkedPointsForMonitor=id=>{const ps=linkedPoints().filter(p=>p.links?.includes(id));return ps.length?ps:[null]};\nconst devicePatrols=",1).replace('return{deviceLinks,','return{linkedPointsForMonitor,deviceLinks,',1)
 chunk=logic+t;s=s[:b]+chunk+s[e:]
 if comp=='DeviceView':s=s.replace('<device-view @open-module="go($event)"/>','<device-view :point-store="store" :monitor-records="monitors" :task-records="store.tasks" @open-module="go($event)"/>',1)
 # shared scoped list styling
 css='''<style>.unified-device-table{width:100%;min-width:2200px;border-collapse:separate;border-spacing:0}.unified-device-table th,.unified-device-table td{font-size:14px;font-weight:400;padding:14px 16px;vertical-align:middle}.unified-device-table th{background:#eef6ff;color:#526b91}.unified-device-table th:last-child,.unified-device-table td:last-child{position:sticky;right:0;background:#fafbfd;min-width:260px;border-left:1px solid #e7eef8;z-index:1}.unified-device-table th:last-child{z-index:3;background:#eef6ff}.unified-device-table .device-cell{min-width:240px}.unified-device-table .row-actions{display:flex;flex-wrap:wrap;gap:6px}.unified-device-table td{border-bottom:1px solid #e7eef8}.unified-device-table .child td{background:#f7fbff}</style>'''
 s=s.replace('</head>',css+'</head>',1);p.write_text(s,encoding='utf8')
