from pathlib import Path
import json,re
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8')
s=s.replace('<script src="assets/point-management.js"></script>','<script src="assets/point-workflow.js"></script>\n<script src="assets/point-management.js"></script>')
pos=s.index('// Additional prototype scenarios')
s=s[:pos]+'PointWorkflow.migrate(store,monitors);\n'+s[pos:]
s=s.replace("const checksForAlarm=a=>a.checkSnapshot||(pget(a.point)?.checkItems||[]).filter(c=>c.monitors.includes(a.monitor));","const checksForAlarm=a=>a.checkSnapshot||monitors.find(m=>m.id===a.monitor)?.execution?.checks||[];")
s=s.replace("const p=pget(a.point);if(!p?.robotId)return '未配置机器人执行点位';if(!checksForAlarm(a).some(c=>c.execution==='机器人复查'))return '未配置对应机器人检查项'","const reason=workflow.reason(a);if(reason)return reason")
start=s.index('const requestRobot=ids=>',s.index('const Platform='));end=s.index("s.handlingMode='record'",start)
s=s[:start]+'''const requestRobot=ids=>{const list=checkedAlarms(ids).filter(a=>!alarmActionReason(a,'robot'));if(!list.length){message.warning('请选择具备执行映射的报警');return}s.batchIds=list.map(a=>a.id);s.reviewPoints=[...new Set(list.map(a=>a.monitor))];s.invalidPoints=[];s.reviewPriority='排队执行';s.modal='review'};
const sendRobot=()=>{const alarms=checkedAlarms(s.batchIds);if(alarms.some(a=>alarmActionReason(a,'robot'))){message.warning('报警状态或执行配置已变化，请重新选择');return}const result=workflow.dispatch(alarms,false);s.modal='';message.success('已创建或关联 '+result.valid+' 条报警的演示复查任务，人工核查状态不变')};
'''+s[end:]
# 各个新建日常任务和修改任务均从监测点展开动作
old="taskForm.points.flatMap(id=>(pget(id)?.checkItems||[]).map(c=>({...JSON.parse(JSON.stringify(c)),point:id})))"
new="taskForm.points.flatMap(id=>(pget(id)?.links||[]).map(mget).filter(m=>m?.enabled&&m.execution?.vendorMonitorId).flatMap(m=>m.execution.checks.map(c=>({...JSON.parse(JSON.stringify(c)),point:id,monitor:m.id,monitors:[m.id]}))))"
s=s.replace(old,new)
s=s.replace("s.tick++;if(s.owner)","s.tick++;workflow.tick();if(s.owner)")
s=s.replace("text:'按巡检点回填：最新读数、图片及执行结果',value:pname(a.point)+' / '+(a.point==='PT-102'?'68 %':'1.12 MPa')","monitor:a.monitor,text:'演示取证结果按监测点回填',value:(mget(a.monitor)?.name||a.monitor)+' / '+(mget(a.monitor)?.value??'未返回读数')")
s=s.replace("复查结果已按巡检点回填关联报警","复查结果已按监测点回填关联报警")
# Workflow created after functions before lifecycle hooks, referenced lazily by actions
pos=s.index('const handleVideoNav=',s.index('const Platform='))
s=s[:pos]+"const workflow=PointWorkflow.create({store,monitors,persist,openAlarm,openTask});\n"+s[pos:]
pos=s.index('return {',s.index('let timer;onMounted',s.index('const Platform=')))
s=s[:pos]+s[pos:].replace('return {','return {workflow,',1)
# json template edits
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
t=t.replace('个巡检点</p><p v-for="p in reviewPoints">{{pname(p)}}','个监测点</p><p v-for="p in reviewPoints">{{mget(p)?.name}} · {{p}}')
t=t.replace(":options=\"opts(['排队执行','暂停当前任务后优先执行'])\"",":options=\"opts(['排队执行'])\"")
# task target summary and separate robot status in alarm summary
marker='<div class="tab-group fixed-tabs"><button v-for="t in [\'报警证据\''
idx=t.index(marker)
t=t[:idx]+'''<div class="monitor-toolbar"><span class="pill blue">机器人复查：{{workflow.task(currentAlarm)?.state||currentAlarm.robotError||'无需自动复查'}}</span><button v-if="workflow.task(currentAlarm)" class="row-btn" @click="openTask(workflow.task(currentAlarm).id)">查看机器人任务</button><button v-if="workflow.videos(currentAlarm).length" class="row-btn" @click="workflow.showVideo(currentAlarm)">关联视频</button></div>'''+t[idx:]
# global popup outside main, available from every menu
popup='''<aside v-if="workflow.current" class="workflow-alert" role="dialog" aria-label="报警提醒"><div class="workflow-alert-head"><h3>报警提醒</h3><span>{{workflow.pending.length}} 条</span><button class="row-btn" @click="workflow.close">关闭提醒</button></div><h3>{{workflow.current.name}}</h3><div class="workflow-alert-grid"><div><small>监测点位</small>{{mget(workflow.current.monitor)?.name||workflow.current.monitor||'待关联'}}</div><div><small>所属区域</small>{{mget(workflow.current.monitor)?.area||'待关联'}}</div><div><small>具体位置</small>{{mget(workflow.current.monitor)?.location||pname(workflow.current.point)}}</div><div><small>报警来源</small>{{workflow.current.source}}</div><div><small>报警等级</small>{{workflow.current.level}}</div><div><small>报警档位</small>{{workflow.current.band||'无档位'}}</div><div><small>触发值</small>{{workflow.current.value}} {{workflow.current.unit}}</div><div><small>触发阈值</small>{{workflow.current.triggerLimit??'事件触发'}} {{workflow.current.unit}}</div><div><small>发生时间</small>{{workflow.current.time}}</div><div><small>人工核查</small>{{workflow.current.state}}</div><div><small>当前值</small>{{mget(workflow.current.monitor)?.value??'—'}} {{workflow.current.unit}}</div><div><small>数据质量</small>{{mget(workflow.current.monitor)?.quality||'未知'}}</div></div><div class="workflow-task-status"><span>机器人复查</span><strong>{{workflow.currentTask?.state||workflow.current.robotError||'不自动复查'}}</strong><small v-if="workflow.currentTask">{{workflow.currentTask.id}} · 演示任务</small></div><div class="actions workflow-alert-actions"><button v-if="workflow.currentTask" class="primary" @click="workflow.viewTask">查看机器人任务</button><button :class="workflow.currentTask?'soft':'primary'" @click="workflow.viewAlarm">查看报警详情</button><button v-if="workflow.videos(workflow.current).length" class="soft" @click="workflow.showVideo()">关联视频</button></div><div class="actions" v-if="workflow.pending.length>1"><button class="row-btn" @click="workflow.ui.index=(workflow.ui.index+1)%workflow.pending.length">下一条报警</button></div></aside>
<n-modal v-model:show="workflow.ui.video" preset="card" title="关联视频" style="width:min(900px,94vw)"><n-select v-model:value="workflow.ui.videoId" :options="workflow.videoOptions" to="body"/><template v-if="workflow.videoMonitor"><div class="workflow-video-meta"><span>设备编号：{{workflow.videoMonitor.deviceId}}</span><span>通道编号：{{workflow.videoMonitor.channelId||'—'}}</span><span>预置位：{{workflow.videoMonitor.presetName||'—'}}</span></div><div class="two-video"><div v-for="channel in (workflow.videoMonitor.source==='气云设备'?['可见光','伪彩']:['可见光'])" :key="channel" class="video-shell"><div class="video-heading">{{channel}}</div><div class="scene"><img :src="channel==='伪彩'?'assets/gas-cloud-false-color.jpg':'assets/propylene-tanks.jpg'" alt="工业场景演示画面"><div class="scene-label">{{channel}} · 演示画面</div></div></div></div></template></n-modal>'''
last=t.rfind('</div>');t=t[:last]+popup+t[last:]
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:]
s=s.replace('</head>','<link rel="stylesheet" href="assets/point-workflow.css">\n</head>')
p.write_text(s,encoding='utf8')
