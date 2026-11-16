from pathlib import Path
import re,json
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8')
s=re.sub(r" const executionIssues=m=>.*?return items};", " const executionIssues=m=>{const items=[];if(!m.enabled)items.push('监测点已停用');if(!m.execution?.vendorMonitorId?.trim())items.push('缺少厂商监测点位编码');if(['待确认','失效'].includes(m.execution?.mappingStatus))items.push('机器人映射'+m.execution.mappingStatus);return items};",s)
s=re.sub(r" if\(d.execution.checks.some.*?\n",'',s)
s=re.sub(r" if\(d.execution.checks.length.*?\n",'',s)
s=s.replace("['我方检查项',props.monitors.reduce((n,m)=>n+(m.execution?.checks?.length||0),0)]","['关联监测点',props.store.points.reduce((n,p)=>n+p.links.length,0)]")
s=s.replace('巡检动作数量','关联监测点数').replace('{{pointChecks(p).length}}','{{p.links.length}}').replace('p.object,pointChecks(p).length','p.object,p.links.length')
s=s.replace("['基础资料','巡检内容','监测关联','业务追溯','变更记录']","['基础资料','监测关联','业务追溯','变更记录']")
st=s.index(' <template v-if="ui.tab===\'巡检内容\'">');en=s.index(' <template v-if="ui.tab===\'报警联动\'">',st);s=s[:st]+s[en:]
st=s.index('<n-form-item label="厂商导航点编号">',s.index("ui.tab==='报警联动'"));en=s.index(' <template v-if="ui.tab===\'辅助视频\'">',st)
s=s[:st]+'''<n-form-item label="机器人映射状态"><n-select v-model:value="ui.draft.execution.mappingStatus" :options="options(['已配置','待确认','失效'])" to="body" :disabled="ui.readonly"/></n-form-item><n-form-item label="关联巡检点位"><n-input :value="owners(ui.draft.id).map(p=>p.name).join('、')||'未关联'" disabled/></n-form-item></div></n-form></template>
'''+s[en:]
s=s.replace("if(kind==='monitor'){ui.draft.alarmMode", "if(kind==='monitor'){ui.draft.alarmMode").replace("ui.draft.auxVideos??=[];", "ui.draft.execution.mappingStatus??=ui.draft.execution.vendorMonitorId?'已配置':'待确认';ui.draft.auxVideos??=[];")
s=s.replace('未配置有效执行点位或对应机器人检查项','未配置有效厂商监测点编码')
p.write_text(s,encoding='utf8')
p=Path('assets/point-workflow.js');s=p.read_text(encoding='utf8')
st=s.index('  const reason=a=>');en=s.index('\n',st)
s=s[:st]+"  const reason=a=>{const m=mget(a.monitor),e=m?.execution;if(!m||!m.enabled)return '监测点不存在或已停用';if(!e?.vendorMonitorId?.trim())return '未配置厂商监测点位编码';if(['待确认','失效'].includes(e.mappingStatus))return '机器人映射'+e.mappingStatus;return ''};"+s[en:]
s=s.replace("checkSnapshot:ids.flatMap(id=>mget(id).execution.checks.map(c=>({...JSON.parse(JSON.stringify(c)),point:pending.find(a=>a.monitor===id).point,monitor:id,monitors:[id]})))", "checkSnapshot:ids.map(id=>({id:'RESULT-'+id,name:mget(id).name,point:pending.find(a=>a.monitor===id).point,monitor:id,monitors:[id],vendorMonitorId:mget(id).execution.vendorMonitorId}))")
p.write_text(s,encoding='utf8')
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8')
s=s.replace("m?.enabled&&m.execution?.vendorMonitorId&&m.execution?.checks?.length", "m?.enabled&&m.execution?.vendorMonitorId&&!['待确认','失效'].includes(m.execution?.mappingStatus)")
old=".flatMap(m=>m.execution.checks.map(c=>({...JSON.parse(JSON.stringify(c)),point:id,monitor:m.id,monitors:[m.id]})))"
new=".map(m=>({id:'RESULT-'+m.id,name:m.name,point:id,monitor:m.id,monitors:[m.id],vendorMonitorId:m.execution.vendorMonitorId})))"
s=s.replace(old,new)
s=s.replace('未配置有效执行点位或对应机器人检查项','未配置有效厂商监测点编码')
p.write_text(s,encoding='utf8')
