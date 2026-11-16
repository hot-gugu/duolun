from pathlib import Path
import re,json
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8')
s=s.replace("area:null,object:''","area:null,tank:null,object:''")
s=s.replace("['location','具体位置'],['object','监测对象']", "['tankId','所属部位编号'],['tankName','所属部位'],['location','具体位置']")
s=s.replace(",['deviceId','所属设备编号'],['deviceName','所属设备名称']",'')
needle=" const sources=['DCS'"
pos=s.index(needle);s=s[:pos]+''' const tankOptions=[{label:'A罐（T41402A）',value:'T41402A'},{label:'B罐（T41402B）',value:'T41402B'},{label:'C罐（T41402C）',value:'T41402C'},{label:'D罐（T41402D）',value:'T41402D'},{label:'公共设施',value:'PUBLIC'},{label:'多罐覆盖',value:'MULTI'},{label:'待确认',value:'UNCONFIRMED'}];
 const tankName=id=>tankOptions.find(x=>x.value===id)?.label.split('（')[0]||'待确认';
 const setTank=()=>{ui.draft.tankName=tankName(ui.draft.tankId)};
 const tankLabel=m=>m?.tankId==='MULTI'?'多罐覆盖：'+(m.tankIds||[]).map(tankName).join('、'):tankName(m?.tankId);
'''+s[pos:]
s=s.replace("(!ui.area||x.area===ui.area)&&", "(!ui.area||x.area===ui.area)&&(!ui.tank||(props.mode==='points'?x.links.some(id=>{const m=monitor(id);return m?.tankId===ui.tank||m?.tankIds?.includes(ui.tank)}):x.tankId===ui.tank||x.tankIds?.includes(ui.tank)))&&")
s=s.replace('ui.id,ui.name,ui.area,ui.object','ui.id,ui.name,ui.area,ui.tank,ui.object')
s=s.replace("ui.draft.alarmMode=modeOf(x);", "ui.draft.alarmMode=modeOf(x);ui.draft.tankId??='UNCONFIRMED';ui.draft.tankName=tankName(ui.draft.tankId);ui.draft.tankIds??=[];")
s=s.replace("||!d.object?.trim()", "||(ui.kind==='point'&&!d.object?.trim())")
s=s.replace('所属区域和检查对象','所属区域及巡检部位')
s=s.replace("||!d.deviceId?.trim()||!d.deviceName?.trim()",'').replace('来源编号、所属设备和监测参数','来源编号和监测参数')
s=s.replace(" const ruleError=validateRules(d);", " d.tankName=tankName(d.tankId);if(d.tankId==='MULTI'&&!d.tankIds?.length){msg.error('请选择多罐覆盖的关联罐体');return}\n const ruleError=validateRules(d);")
s=s.replace("['enabled','alarmMode'].includes(k)","['enabled','alarmMode','tankId','tankName','tankIds'].includes(k)")
s=s.replace('const execution=clone(old.execution||{})',"const tankId=old.tankId,tankName=old.tankName,tankIds=clone(old.tankIds||[]);const execution=clone(old.execution||{})")
s=s.replace('enabled,alarmMode,execution,auxVideos','enabled,alarmMode,tankId,tankName,tankIds,execution,auxVideos')
s=s.replace('return {executionIssues','return {tankOptions,tankName,setTank,tankLabel,executionIssues')
s=s.replace('<n-input v-model:value="ui.object" clearable placeholder="检查对象"/>','<n-select v-model:value="ui.tank" clearable :options="tankOptions" placeholder="所属部位" to="body"/><n-input v-if="mode===\'points\'" v-model:value="ui.object" clearable placeholder="巡检部位"/>')
s=s.replace('<th>具体位置</th><th>监测对象</th><th>所属设备编号</th><th>所属设备名称</th>','<th>所属部位编号</th><th>所属部位</th><th>具体位置</th>')
s=s.replace('<td>{{p.location}}</td><td>{{p.object}}</td><td>{{p.deviceId}}</td><td>{{p.deviceName}}</td>', '<td>{{p.tankId||\'待确认\'}}</td><td>{{tankLabel(p)}}</td><td>{{p.location}}</td>')
s=s.replace("['id','name','area','location','object','sourceId','deviceId','deviceName','metric']", "['id','name','area','location','sourceId','metric']")
s=s.replace('<n-select v-if="f[0]===\'alarmMode\'"', '''<n-select v-if="f[0]==='tankId'" v-model:value="ui.draft.tankId" :options="tankOptions" @update:value="setTank" to="body" :disabled="ui.readonly"/><n-input v-else-if="f[0]==='tankName'" :value="tankLabel(ui.draft)" disabled/><n-select v-else-if="f[0]==='alarmMode'"''')
s=s.replace('</n-form-item></div>\n <div class="pm-form-grid" v-else>', '''</n-form-item><n-form-item v-if="ui.draft.tankId==='MULTI'" label="覆盖罐体" required><n-select v-model:value="ui.draft.tankIds" multiple :options="tankOptions.filter(t=>t.value.startsWith('T41402'))" to="body" :disabled="ui.readonly"/></n-form-item></div>
 <div class="pm-form-grid" v-else>''')
s=s.replace('检查对象','巡检部位')
s=s.replace('<n-form-item label="检查项维护方"><n-input value="我方系统" disabled/></n-form-item>','')
s=s.replace("['设备编号',monitor(id)?.deviceId]", "['所属部位',tankLabel(monitor(id))]")
s=s.replace('<th>设备编号</th><th>设备名称</th>', '<th>所属区域</th><th>所属部位</th>').replace("<td>{{m.deviceId||'—'}}</td><td>{{m.deviceName||'—'}}</td>","<td>{{m.area||'—'}}</td><td>{{tankLabel(m)}}</td>")
s=s.replace("monitor:m.id,triggerLimit:","monitor:m.id,tankId:m.tankId,tankName:m.tankName,tankIds:clone(m.tankIds||[]),area:m.area,location:m.location,monitorName:m.name,triggerLimit:")
p.write_text(s,encoding='utf8')
p=Path('assets/point-workflow.js');s=p.read_text(encoding='utf8').replace('  for(const m of monitors){',"  for(const m of monitors){m.tankId??='UNCONFIRMED';m.tankName??='待确认';m.tankIds??=[];")
s=s.replace('a.workflowProcessed=true;',"a.tankId??=mget(a.monitor)?.tankId||'UNCONFIRMED';a.tankName??=mget(a.monitor)?.tankName||'待确认';a.area??=mget(a.monitor)?.area;a.location??=mget(a.monitor)?.location;a.monitorName??=mget(a.monitor)?.name;a.workflowProcessed=true;")
p.write_text(s,encoding='utf8')
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8');a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
t=t.replace('<div><small>所属区域</small>',"<div><small>所属部位编号</small>{{workflow.current.value.tankId==='UNCONFIRMED'?'待确认':workflow.current.value.tankId}}</div><div><small>所属部位</small>{{workflow.current.value.tankName||'待确认'}}</div><div><small>所属区域</small>")
# Add common alarm/event location fields to details, preserve source snapshots.
marker='<div class="tab-group fixed-tabs"><button v-for="t in [\'报警证据\''
t=t.replace(marker,'''<div class="process-evidence-grid"><div class="info-item"><span class="info-label">所属区域</span>{{currentAlarm.area||mget(currentAlarm.monitor)?.area||'—'}}</div><div class="info-item"><span class="info-label">所属部位编号</span>{{currentAlarm.tankId||mget(currentAlarm.monitor)?.tankId||'待确认'}}</div><div class="info-item"><span class="info-label">所属部位</span>{{currentAlarm.tankName||mget(currentAlarm.monitor)?.tankName||'待确认'}}</div><div class="info-item"><span class="info-label">监测点位</span>{{currentAlarm.monitorName||mget(currentAlarm.monitor)?.name||currentAlarm.monitor||'待关联'}}</div></div>'''+marker)
t=t.replace('个关联监测设备','个关联监测点位').replace('关联设备分布','关联监测点位分布').replace('联动监测设备','关联监测点位').replace('本次报警设备','本次报警监测点位').replace('关联监测设备（','关联监测点位（')
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];p.write_text(s,encoding='utf8')
