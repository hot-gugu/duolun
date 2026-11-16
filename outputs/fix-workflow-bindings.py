from pathlib import Path
import json,re
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8');a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
for name in ['currentTask','current','pending','videoOptions','videoMonitor']:
 t=re.sub(r'workflow\.'+name+r'(?![\w]|\.value)', 'workflow.'+name+'.value',t)
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:]
# exact monitor identity in result rows and no loss when multiple targets share location
st=s.index('const consoleResults=t=>',s.index('const Platform='));en=s.index('\n',st)
line=s[st:en]
line=line.replace(".map(c=>c.name)",".map(c=>({name:c.name,monitor:c.monitor||c.monitors?.[0]}))").replace("(pget(point)?.checks||[])","(pget(point)?.checks||[]).map(name=>({name}))").replace("checks.map((name,j)=>{", "checks.map((check,j)=>{const {name,monitor}=check;").replace("return{point,name,done", "return{point,monitor,name,done")
s=s[:st]+line+s[en:]
# grouped source rules' notification settings must not be overwritten on selecting band
p.write_text(s,encoding='utf8')
p=Path('assets/point-workflow.js');s=p.read_text(encoding='utf8')
s=s.replace("const ingest=a=>{if(a.workflowProcessed)return;", "const ingest=a=>{if(a.workflowProcessed)return;if(a.sourceAlarmId){const old=store.alarms.find(x=>x!==a&&x.source===a.source&&x.sourceAlarmId===a.sourceAlarmId);if(old){old.currentValue=a.currentValue??a.value;old.currentSampleTime=a.currentSampleTime??a.time;old.alarmState=a.alarmState??old.alarmState;store.alarms.splice(store.alarms.indexOf(a),1);persist();return}}")
p.write_text(s,encoding='utf8')
