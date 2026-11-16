from pathlib import Path
import json
p=Path('多伦智能巡检平台.html');s=p.read_text(encoding='utf-8')
s=s.replace('const s=reactive({alarmOverviewExpanded:', 'const s=reactive({robotVerificationTabs:{},alarmOverviewExpanded:',1)
s=s.replace('const openAlarm=id=>{s.alarmOverviewExpanded=false;', 'const openAlarm=id=>{s.robotVerificationTabs={};s.alarmOverviewExpanded=false;',1)
s=s.replace("progress:t.progress||0,items:[],photos:[],videos:[],logs:","progress:t.progress||0,taskSnapshot:JSON.parse(JSON.stringify(t)),items:[],photos:[],videos:[],logs:",1)
s=s.replace("const records=new Map();\n for(const t of tasks)","const records=new Map();\n const tankId=a.tankId||mget(a.monitor)?.tankId;\n const sameTank=id=>id===a.monitor||!!(tankId&&mget(id)?.tankId===tankId);\n for(const t of tasks)",1)
s=s.replace("!i.monitor&&!i.monitors?.length||i.monitor===a.monitor||i.monitors?.includes(a.monitor)","!i.monitor&&!i.monitors?.length||sameTank(i.monitor)||(i.monitors||[]).some(sameTank)",1)
s=s.replace("if(e.monitor&&e.monitor!==a.monitor)continue;","if(e.monitor&&!sameTank(e.monitor))continue;",1)
s=s.replace("r.items.push({name:e.name||'核查结果'", "r.items.push({monitor:e.monitor,point:e.point,name:e.name||'核查结果'",1)
s=s.replace("return {...r,items,photos:media(","return {...r,tankId,tankName:a.tankName||mget(a.monitor)?.tankName||'—',point:r.point||a.point,items,photos:media(",1)
pos=s.index('const verificationRobotRecords=computed(')
helper="""const verificationTaskFor=r=>{
 const a=currentAlarm.value||{},base=r.taskSnapshot||{},tankId=r.tankId||a.tankId||mget(a.monitor)?.tankId;
 const sameTank=id=>id===a.monitor||!!(tankId&&mget(id)?.tankId===tankId);
 const inScope=row=>{if(row.tankId&&tankId)return row.tankId===tankId;const id=row.monitorId||row.monitor||row.monitors?.[0];if(id)return sameTank(id);const point=row.pointId||row.point;return !point||point===(r.point||a.point)||(pget(point)?.links||[]).some(sameTank)};
 const raw=base.reportRecords||base.robotReport?.records;
 const items=(r.items||[]).filter(inScope);
 const rows=raw?raw.filter(inScope):items.map((item,i)=>({id:item.id||r.id+'-RESULT-'+i,pointId:item.point||r.point||a.point,monitorId:item.monitor||item.monitors?.[0],objectName:item.name||'现场巡检',recognitionResult:item.value??'—',recognizedAt:item.time||'',executionStatus:item.state==='已采集'||item.state==='异常'?'已完成':item.state||'未开始',collectionInfo:item.state||'—',photoUrl:item.photoUrl,videoUrl:item.videoUrl||item.clipUrl,threshold:item.threshold,alarm:item.abnormal===true||item.state==='异常',alarmLevel:item.level||'—'}));
 const task={...base,id:r.taskId||r.id,name:base.name||(r.tankName||a.tankName||mget(a.monitor)?.tankName||'储罐')+'机器人核查',state:r.state||base.state,robotId:r.robotId,robotName:r.robot,sentAt:r.sentAt,startedAt:r.startedAt,finishedAt:r.finishedAt,progress:r.progress??base.progress??0,date:base.date||r.sentAt?.slice(0,10),time:base.time||r.sentAt?.slice(11,16),points:(base.points||[r.point||a.point].filter(Boolean)).filter(point=>point===(r.point||a.point)||(pget(point)?.links||[]).some(sameTank)),checkSnapshot:(base.checkSnapshot||[]).filter(inScope)};
 // Only use records belonging to this verification task and tank.
 if(raw||items.length||!base.id)task.reportRecords=rows;
 else if(base.prototype)task.reportRecords=consoleResults(task).filter(inScope).map((row,i)=>({id:task.id+'-RESULT-'+i,pointId:row.point,monitorId:row.monitor,objectName:row.name,recognitionResult:row.value,recognizedAt:row.done?row.time:'',executionStatus:row.done?'已完成':'未开始',alarm:row.abnormal,alarmLevel:row.abnormal?row.level:'正常',photoUrl:row.done?(/温|红外/.test(row.name)?'assets/robot-thermal.jpg':/压力|液位|表/.test(row.name)?'assets/robot-gauge.png':'assets/propylene-tanks.jpg'):''}));
 else task.reportRecords=[];
 task.alertRecords=(base.alertRecords||base.robotReport?.alerts||r.alertRecords||[]).filter(inScope);
 return task;
};
const verificationTaskTab=r=>s.robotVerificationTabs[r.id]||'巡检过程记录';
const verificationTaskAlerts=r=>consoleAlerts(verificationTaskFor(r),verificationTaskTab(r));
"""
s=s[:pos]+helper+s[pos:]
s=s.replace("const consoleAlerts=t=>{", "const consoleAlerts=(t,tab=s.taskResultTab)=>{if(Array.isArray(t.alertRecords)){const rows=t.alertRecords.map(r=>({...r,point:r.point||r.pointId,type:r.type||r.category,name:r.name||r.alarmName,value:r.value??r.detectionInfo??'—',level:r.level||r.alarmLevel||'—',time:r.time||r.occurredAt||'—',state:r.state||r.status||'—'}));return tab==='综合告警'?rows:rows.filter(r=>r.type===tab)}",1)
a=s.index('const consoleAlerts=');b=s.index('\n',a);s=s[:a]+s[a:b].replace("s.taskResultTab==='", "tab==='")+s[b:]
s=s.replace('verificationFields,verificationRobotRecords,','verificationFields,verificationTaskFor,verificationTaskTab,verificationTaskAlerts,verificationRobotRecords,',1)
o=s.index('},template: ')+len('},template: ');t,n=json.JSONDecoder().raw_decode(s[o:])
a=t.index('<template v-if="alarmDetailTab===\'机器人核查\'">');b=t.index('<template v-if="alarmDetailTab===\'人工核查记录\'">',a)
old=t[a:b]
new=old.replace("['开始时间',r.startedAt||'—'],['到点时间',r.arrivedAt||'—'],",'').replace("['巡查对象',currentAlarm.monitorName||mget(currentAlarm.monitor)?.name||'—']","['所属部位',r.tankName||currentAlarm.tankName||mget(currentAlarm.monitor)?.tankName||'—']")
new=new.replace('<p v-if="r.summary">{{r.summary}}</p><span v-if="r.prototype" class="pill gray">演示数据</span>','')
a2=new.index('<section class="surface process-compact-card"><h3 class="section-title">核查过程');b2=new.index('<section class="surface process-compact-card"><h3 class="section-title">现场证据',a2)
records='''<div class="tab-group" role="tablist" aria-label="机器人核查任务记录"><button v-for="tab in ['巡检过程记录','环境告警','综合告警','系统告警']" :key="tab" class="tab" role="tab" :aria-selected="verificationTaskTab(r)===tab" :class="{active:verificationTaskTab(r)===tab}" @click="robotVerificationTabs[r.id]=tab">{{tab}}</button></div>
<template v-if="verificationTaskTab(r)==='巡检过程记录'"><robot-report :key="r.id" :embedded="true" :task="verificationTaskFor(r)" :points="store.points" :monitors="monitors"/>
'''
new=new[:a2]+records+new[b2:]
end='''</template><div v-else class="table-card robot-console-results"><div class="table-scroll"><table><thead><tr><th>任务名称</th><th>巡检对象</th><th>告警类别</th><th>告警名称</th><th>检测信息</th><th>告警等级</th><th>发生时间</th><th>状态</th></tr></thead><tbody><tr v-for="(alert,i) in verificationTaskAlerts(r)" :key="alert.id||i"><td>{{verificationTaskFor(r).name}}</td><td>{{alert.objectName||pname(alert.point)||'—'}}</td><td>{{alert.type}}</td><td>{{alert.name}}</td><td>{{alert.value}}</td><td><span class="pill orange">{{alert.level}}</span></td><td>{{alert.time}}</td><td>{{alert.state}}</td></tr></tbody></table><prod-empty-state v-if="!verificationTaskAlerts(r).length" text="暂无该类告警" compact/></div></div>
'''
new=new.replace('</article></template>',end+'</article></template>')
t=t[:a]+new+t[b:]
p.write_text(s[:o]+json.dumps(t,ensure_ascii=False)+s[o+n:],encoding='utf-8')
print('Updated robot verification overview and task tabs.')
