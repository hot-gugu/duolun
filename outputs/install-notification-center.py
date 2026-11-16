from pathlib import Path
import json
p=Path('assets/notification-center.js');s=p.read_text(encoding='utf8').replace("selected:null,dismissed", "preferExtra:false,selected:null,dismissed").replace("const close=()=>{if(current.value)ui.dismissed.push(current.value.id)}", "const close=()=>{if(current.value)ui.dismissed.push(current.value.id);ui.preferExtra=false}").replace("const demo=n=>{push", "const demo=n=>{ui.preferExtra=true;push")
p.write_text(s,encoding='utf8')
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8').replace('<script src="assets/alarm-response.js"></script>','<script src="assets/alarm-response.js"></script>\n<script src="assets/notification-center.js"></script>')
s=s.replace('AlarmResponseConfig:AlarmResponse.component}', 'AlarmResponseConfig:AlarmResponse.component,NotificationCenterView:NotificationCenter.component}')
s=s.replace('recoverMinutes:retained.recoverMinutes||5','notificationRecords:retained.notificationRecords||[],recoverMinutes:retained.recoverMinutes||5')
pos=s.index('const responseEngine=AlarmResponse.engine');s=s[:pos]+"const center=NotificationCenter.create({store,persist,openAlarm,openTask,openEvent,go,devices:initial});\n"+s[pos:]
s=s.replace('s.tick++;responseEngine.evaluate();','s.tick++;center.scan();responseEngine.evaluate();')
s=s.replace('return {responseEngine,','return {center,responseEngine,')
# Device link opens the referenced device when the management view mounts.
marker="const openData=(d,t='实时读数')=>"
pos=s.index(marker)
en=s.index('\n',pos)
s=s[:en]+"\nonMounted(()=>{try{const id=localStorage.getItem('duolun-device-focus');if(id){const d=flattenDevices().find(d=>d.id===id);if(d)openData(d,'异常记录');localStorage.removeItem('duolun-device-focus')}}catch{}});"+s[en:]
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
t=t.replace('<span class="avatar">值</span>', '<button class="nc-top-entry" @click="center.ui.drawer=true">提醒中心<span v-if="center.unread.value">{{center.unread.value}}</span></button><span class="avatar">值</span>')
t=t.replace('<aside v-if="workflow.current.value" class="workflow-alert"','<aside v-if="workflow.current.value&&!(center.current.value&&center.ui.preferExtra)" class="workflow-alert"')
t=t.replace('<h3>报警提醒</h3>', '<h3>报警提醒</h3><button class="device-link" @click="center.ui.drawer=true">更多</button>')
insert='''<aside v-if="center.current.value&&(!workflow.current.value||center.ui.preferExtra)" class="workflow-alert" :class="center.current.value.level==='一级'?'workflow-alert--critical':center.current.value.level==='二级'?'workflow-alert--warning':'workflow-alert--notice'" role="dialog" aria-label="设备及任务提醒"><div class="workflow-alert-head"><span class="workflow-severity-icon" aria-hidden="true">!</span><h3>{{center.current.value.category}}</h3><button class="device-link" @click="center.ui.drawer=true">更多</button><button class="row-btn" @click="center.close">关闭提醒</button></div><h3>{{center.current.value.name}}</h3><div class="workflow-alert-grid"><div><small>提醒来源</small>{{center.current.value.source}}</div><div><small>当前状态</small>{{center.current.value.status}}</div><div><small>发生时间</small>{{center.current.value.time}}</div><div><small>提醒级别</small>{{center.current.value.level}}</div></div><p v-if="center.current.value.demo" class="subtext">场景演示</p><div class="actions workflow-alert-actions"><button class="primary" @click="center.open(center.current.value)">{{center.current.value.action}}</button></div></aside><notification-center-view :center="center"/>'''
pos=t.rfind('</div>');t=t[:pos]+insert+t[pos:]
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];s=s.replace('</head>','<link rel="stylesheet" href="assets/notification-center.css">\n</head>');p.write_text(s,encoding='utf8')
for file in ['assets/verify-workflow.cjs','assets/verify-points.cjs']:
 p=Path(file);s=p.read_text(encoding='utf8');s=s.replace("vm.runInContext(fs.readFileSync('assets/alarm-response.js','utf8'),ctx);", "vm.runInContext(fs.readFileSync('assets/alarm-response.js','utf8'),ctx);\nvm.runInContext(fs.readFileSync('assets/notification-center.js','utf8'),ctx);");p.write_text(s,encoding='utf8')
