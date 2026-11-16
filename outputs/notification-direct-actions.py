from pathlib import Path
p=Path('assets/notification-center.js');s=p.read_text(encoding='utf8').replace('go,devices})','go,devices,videos,showVideo})',1)
pos=s.index(' const close=()=>')
s=s[:pos]+''' const alarmFor=n=>store.alarms.find(a=>a.id===n.alarmId);
 const taskFor=n=>store.tasks.find(t=>t.id===n.taskId)||store.tasks.find(t=>(t.reviews||[]).includes(n.alarmId)&&['进行中','排队中','暂停中'].includes(t.state))||store.tasks.find(t=>(t.reviews||[]).includes(n.alarmId))||(n.deviceId?store.tasks.find(t=>t.robotId===n.deviceId&&['进行中','排队中','暂停中'].includes(t.state)):null);
 const videoContext=n=>{const a=alarmFor(n);if(a&&videos?.(a)?.length)return a;const ids=n.taskId?store.tasks.find(t=>t.id===n.taskId)?.monitorIds||[]:[];const list=(store.monitorRecords||[]).filter(m=>ids.includes(m.id)||(n.deviceId&&m.deviceId===n.deviceId));for(const m of list){const point=store.points.find(p=>p.links.includes(m.id));const context={monitor:m.id,point:point?.id};if(videos?.(context)?.length)return context}return null};
 const actions=n=>{if(n.demo)return [{type:'scene',label:'查看场景'}];const result=[],a=alarmFor(n),task=taskFor(n);if(task)result.push({type:'task',label:'查看机器人任务',id:task.id});if(n.eventId)result.push({type:'event',label:'查看处理事件',id:n.eventId});if(a)result.push({type:'alarm',label:'查看报警详情',id:a.id});if(n.deviceId)result.push({type:'device',label:'查看设备异常'});if(videoContext(n))result.push({type:'video',label:n.source==='视频AI'||n.source==='气云设备'?'查看视频':'关联视频'});if(!result.length)result.push({type:'scene',label:'查看提醒详情'});return result};
 const act=(n,action)=>{mark(n);if(action.type==='video'){const context=videoContext(n);if(context)showVideo?.(context);return}if(action.type==='task'){ui.drawer=false;openTask(action.id);return}if(action.type==='alarm'){ui.drawer=false;openAlarm(action.id);return}if(action.type==='event'){ui.drawer=false;openEvent(action.id);return}if(action.type==='device'){open(n);return}ui.detail=n};
'''+s[pos:]
s=s.replace('return {describe,','return {actions,act,videoContext,taskFor,describe,')
s=s.replace('''<button class="row-btn" @click="center.open(n)">{{n.demo?'查看场景':n.action}}</button>''','''<div class="nc-direct-actions"><button v-for="(action,i) in center.actions(n)" :key="action.type" class="row-btn" :class="{'nc-action-primary':i===0}" @click="center.act(n,action)">{{action.label}}</button><button v-if="!n.demo&&!n.read" class="nc-mark-read" @click="center.mark(n)">标为已读</button></div>''')
p.write_text(s,encoding='utf8')
p=Path('assets/point-workflow.js');s=p.read_text(encoding='utf8').replace("[...(m?.auxVideos||[]),...(p?.links||[])", "[...(['摄像头','气云设备'].includes(m?.source)?[m.id]:[]),...(m?.auxVideos||[]),...(p?.links||[])")
p.write_text(s,encoding='utf8')
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf8').replace('go,devices:initial});','go,devices:initial,videos:a=>workflow.videos(a),showVideo:a=>workflow.showVideo(a)});')
import json
a=s.index('},template: ',s.index('const Platform='))+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[a:])
t=t.replace('<button class="device-link" @click="center.ui.drawer=true">更多</button>','')
svg='''<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'''
t=t.replace('<button class="row-btn" @click="workflow.close">关闭提醒</button>', '<button class="workflow-icon-close" @click="workflow.close" aria-label="关闭提醒" title="关闭提醒">'+svg+'</button>')
t=t.replace('<button class="row-btn" @click="center.close">关闭提醒</button>', '<button class="workflow-icon-close" @click="center.close" aria-label="关闭提醒" title="关闭提醒">'+svg+'</button>')
t=t.replace('''<h3>{{workflow.current.value.name}}<small v-if="workflow.current.value.demoType">演示报警</small></h3>''', '''<div class="workflow-event-row"><h3>{{workflow.current.value.name}}<small v-if="workflow.current.value.demoType">演示报警</small></h3><button class="workflow-more" @click="center.ui.drawer=true">更多 <span aria-hidden="true">›</span></button></div>''')
t=t.replace('<h3>{{center.current.value.name}}</h3>', '''<div class="workflow-event-row"><h3>{{center.current.value.name}}</h3><button class="workflow-more" @click="center.ui.drawer=true">更多 <span aria-hidden="true">›</span></button></div>''')
s=s[:a]+json.dumps(t,ensure_ascii=False)+s[a+n:];p.write_text(s,encoding='utf8')
