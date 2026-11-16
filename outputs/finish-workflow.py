from pathlib import Path
import json
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8')
s=s.replace("const evidenceMonitors=computed(()=>currentAlarm.value?(pget(currentAlarm.value.point)?.links||[]).map(mget).filter(Boolean):[]);", "const evidenceMonitors=computed(()=>currentAlarm.value?[...new Set([...(pget(currentAlarm.value.point)?.links||[]),...(mget(currentAlarm.value.monitor)?.auxVideos||[])])].map(mget).filter(Boolean):[]);")
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:]);t=t.replace('<div><small>数据质量</small>{{mget(workflow.current.value.monitor)?.quality||\'未知\'}}</div>','<div><small>数据质量</small>{{mget(workflow.current.value.monitor)?.quality||\'未知\'}}</div><div><small>采集时间</small>{{workflow.current.value.currentSampleTime||\'—\'}}</div>')
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];p.write_text(s,encoding='utf8')
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8')
s=s.replace("const autoPolicy=m=>", "const setCommand=c=>{c.commandCode='CMD-'+String(checkNames.indexOf(c.name)+1).padStart(2,'0');c.version='1.0'};\n const autoPolicy=m=>")
s=s.replace('return {pointChecks','return {setCommand,pointChecks')
s=s.replace('v-model:value="c.name" :options="checkNameOptions(c.name)"', 'v-model:value="c.name" @update:value="setCommand(c)" :options="checkNameOptions(c.name)"')
s=s.replace('<n-form-item label="现场检查内容" required>', '<n-form-item label="检查指令编码"><n-input :value="c.commandCode||\'待选择指令\'" disabled/></n-form-item><n-form-item label="指令版本"><n-input :value="c.version||\'1.0\'" disabled/></n-form-item><n-form-item label="现场检查内容" required>')
s=s.replace('<n-form-item label="执行顺序">','<n-form-item label="输出单位"><n-input v-model:value="c.outputUnit" :disabled="ui.readonly"/></n-form-item><n-form-item label="复查判断依据"><n-select v-model:value="c.judgement" :options="options([\'关联监测点报警规则\',\'仅采集佐证，由人工判断\'])" to="body" :disabled="ui.readonly"/></n-form-item><n-form-item label="执行顺序">')
p.write_text(s,encoding='utf8')
p=Path('assets/verify-points.cjs');s=p.read_text(encoding='utf8').replace("['基础资料','我方检查项','监测关联','业务追溯','变更记录']:['基础资料','报警规则','关联巡检点','变更记录']", "['基础资料','检查项汇总','监测关联','业务追溯','变更记录']:['基础资料','报警规则','检查与机器人映射','辅助视频','关联巡检点','变更记录']");p.write_text(s,encoding='utf8')
