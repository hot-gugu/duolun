from pathlib import Path
import json
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8');s=s.replace('<script src="assets/point-management.js"></script>','<script src="assets/point-management.js"></script>\n<script src="assets/alarm-response.js"></script>')
s=s.replace('components:{Icon,DeviceView,PointManagement,ProdEmptyState}', 'components:{Icon,DeviceView,PointManagement,ProdEmptyState,AlarmResponseConfig:AlarmResponse.component}')
s=s.replace('const workflow=PointWorkflow.create', 'const responseEngine=AlarmResponse.engine(store,persist);onUnmounted(()=>responseEngine.unwatch());\nconst workflow=PointWorkflow.create')
s=s.replace('s.tick++;workflow.tick();','s.tick++;responseEngine.evaluate();workflow.tick();')
s=s.replace('return {pointContext,','return {responseEngine,pointContext,')
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:]);st=t.index('<template v-if="nav===\'levels\'">');en=t.index('<!-- Point data workbench -->',st)
old=t[st:en].strip();body=old[len('<template v-if="nav===\'levels\'">'):-len('</template>')]
t=t[:st]+'''<alarm-response-config v-if="nav==='levels'" :store="store" :persist="persist" @navigate="navigatePointRecord">'''+body+'''</alarm-response-config>\n\n'''+t[en:]
t=t.replace("nav==='levels'?'来源报警档位与平台等级映射'", "nav==='levels'?'统一配置报警等级、响应时限及系统超时提醒'")
# Existing details reflect the same timing rules and remain read-only.
t=t.replace('<div class="tab-group fixed-tabs"><button v-for="t in [\'报警证据\'', '''<div class="monitor-toolbar"><span class="pill orange">{{(tick,responseEngine.status(currentAlarm))}}</span></div><div class="tab-group fixed-tabs"><button v-for="t in ['报警证据' ''',1) if False else t
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];s=s.replace('报警等级配置','报警分级与响应配置');s=s.replace('</head>','<link rel="stylesheet" href="assets/alarm-response.css">\n</head>');p.write_text(s,encoding='utf8')
for file in ['assets/verify-points.cjs','assets/verify-workflow.cjs']:
 p=Path(file);s=p.read_text(encoding='utf8');marker="const html=fs.readFileSync('多伦智能巡检平台.html'"
 s=s.replace(marker,"vm.runInContext(fs.readFileSync('assets/alarm-response.js','utf8'),ctx);\n"+marker,1);p.write_text(s,encoding='utf8')
