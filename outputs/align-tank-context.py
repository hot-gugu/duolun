from pathlib import Path
import json,re
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8')
pos=s.index('const alarmCommonMatch=');s=s[:pos]+'''const tankOptions=[...['A','B','C','D'].map(x=>({label:x+'罐（T41402'+x+'）',value:'T41402'+x})),{label:'公共设施',value:'PUBLIC'},{label:'多罐覆盖',value:'MULTI'},{label:'待确认',value:'UNCONFIRMED'}];s.tankFilter=null;
const pointContext=a=>{const m=mget(a?.monitor);return {area:a?.area||m?.area||'—',tankId:a?.tankId||m?.tankId||'UNCONFIRMED',tankName:a?.tankName||m?.tankName||'待确认',tankIds:a?.tankIds||m?.tankIds||[],monitorName:a?.monitorName||m?.name||a?.monitor||'待关联'}};
const tankMatches=a=>!s.tankFilter||pointContext(a).tankId===s.tankFilter||pointContext(a).tankIds.includes(s.tankFilter);
'''+s[pos:]
s=s.replace("const alarmCommonMatch=a=>", "const alarmCommonMatch=a=>tankMatches(a)&&").replace("[a.id,a.name,pname(a.point)]", "[a.id,a.name,pname(a.point),pointContext(a).monitorName,pointContext(a).tankId,pointContext(a).tankName,pointContext(a).area]")
s=s.replace("const eventMatch=e=>", "const eventMatch=e=>tankMatches(store.alarms.find(a=>a.id===e.alarmId))&&")
s=s.replace("s.sourceFilter=null;s.levelFilter=null;", "s.sourceFilter=null;s.levelFilter=null;s.tankFilter=null;")
s=s.replace("return {workflow,", "return {pointContext,tankOptions,workflow,")
s=s.replace("['监测设备',f.device],['设备位号／编号',f.code]", "['监测点位名称',f.device],['监测点位编号',f.code],['所属区域',pointContext(a).area],['所属部位编号',pointContext(a).tankId],['所属部位',pointContext(a).tankName]")
s=s.replace("device:a.deviceName||(matched?monitor.name:'设备未绑定'),code:a.deviceCode||(matched?a.monitor:'—')", "device:a.monitorName||monitor?.name||a.monitor||'监测点位未关联',code:a.monitor||'—'")
s=s.replace("['报警编号','报警名称','报警来源','监测设备','设备位号／编号','安装位置'", "['报警编号','报警名称','报警来源','监测点位名称','监测点位编号','所属区域','所属部位编号','所属部位','具体位置'")
s=s.replace('f.device,f.code,f.location,f.metric','f.device,f.code,pointContext(a).area,pointContext(a).tankId,pointContext(a).tankName,f.location,f.metric')
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
t=t.replace('<th>监测设备</th><th>设备位号／编号</th>', '<th>监测点位名称</th><th>监测点位编号</th><th>所属区域</th><th>所属部位编号</th><th>所属部位</th>')
t=t.replace('<td>{{alarmFields(a).code}}</td>', '<td>{{alarmFields(a).code}}</td><td>{{pointContext(a).area}}</td><td>{{pointContext(a).tankId}}</td><td>{{pointContext(a).tankName}}</td>')
# grouped alarm names/fields may use row variable; add context in own sections below as common detail.
t=re.sub(r'(<n-select\b[^>]*v-model:value="pointFilter"[^>]*?/>)',r'\1<n-select v-model:value="tankFilter" :options="tankOptions" clearable placeholder="所属部位" to="body" @update:value="page=1"/>',t)
# event detail gets the exact same source-alarm context
marker='<template v-if="detail?.kind===\'event\'&&currentEvent">'
if marker in t:t=t.replace(marker,marker+'''<div class="process-evidence-grid"><div v-for="f in [['所属区域',pointContext(eventAlarm(currentEvent)).area],['所属部位编号',pointContext(eventAlarm(currentEvent)).tankId],['所属部位',pointContext(eventAlarm(currentEvent)).tankName],['监测点位',pointContext(eventAlarm(currentEvent)).monitorName]]"><span class="info-label">{{f[0]}}</span>{{f[1]}}</div></div>''')
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];p.write_text(s,encoding='utf8')
