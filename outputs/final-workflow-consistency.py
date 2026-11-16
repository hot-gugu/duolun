from pathlib import Path
p=Path('assets/point-workflow.js');s=p.read_text(encoding='utf8');s=s.replace("m.auxVideos??=", "for(const c of m.execution.checks||[]){c.outputUnit??=m.unit;c.judgement??='仅采集佐证，由人工判断';c.version??='1.0';}\n   m.auxVideos??=")
p.write_text(s,encoding='utf8')
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8').replace(" props.persist();ui.drawer=false;msg.success('已保存", " props.store.points.forEach(p=>{p.checkItems=pointChecks(p);p.checks=p.checkItems.map(c=>c.name)});\n props.persist();ui.drawer=false;msg.success('已保存")
p.write_text(s,encoding='utf8')
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8')
s=s.replace("const saveTask=()=>{if(!taskForm.name.trim()", "const saveTask=()=>{const unavailable=taskForm.points.filter(id=>!(pget(id)?.links||[]).some(mid=>{const m=mget(mid);return m?.enabled&&m.execution?.vendorMonitorId&&m.execution?.checks?.length}));if(unavailable.length){message.error('以下巡检点没有可执行监测点：'+unavailable.map(pname).join('、'));return}if(!taskForm.name.trim()")
# show selected monitor scope above task tabs without changing map or navigation layout
import json
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:]);needle='<div class="tab-group fixed-tabs"><button v-for="t in [\'对象巡检结果\''
if needle in t:
 t=t.replace(needle,'''<div v-if="currentTask.monitorIds?.length" class="surface"><h3 class="section-title">本次复查监测点</h3><div class="actions"><span v-for="id in currentTask.monitorIds" :key="id" class="pill" :class="workflow.ui.focus?.monitor===id?'blue':'gray'">{{mget(id)?.name||id}} · {{id}}</span></div></div>'''+needle,1)
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];p.write_text(s,encoding='utf8')
