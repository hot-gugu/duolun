/* 趋势窗口：每屏七条，保留每日数据，初始定位到当前日期或范围内最近日期。 */
const InspectionTrendWindow={
 mounted(el,binding){
  const state={rows:binding.value||[],key:'',step:0};
  state.layout=()=>{
   const rows=state.rows,count=rows.length,visible=Math.min(7,Math.max(1,count)),gap=8;
   const width=Math.max(0,(el.clientWidth-gap*(visible-1))/visible),step=width+gap;
   el.style.gridTemplateColumns='repeat('+Math.max(1,count)+','+width+'px)';
   const now=Date.now();let last=-1;rows.forEach((r,i)=>{if(r.from<=now)last=i});
   if(last<0)last=Math.min(6,count-1);
   const key=count+'|'+rows[0]?.from+'|'+rows[count-1]?.to+'|'+last;
   if(key!==state.key){el.scrollLeft=Math.max(0,last-6)*step;state.key=key}
   else if(state.step&&state.step!==step)el.scrollLeft=el.scrollLeft/state.step*step;
   state.step=step;
  };
  el.__inspectionTrend=state;state.layout();
  if(typeof ResizeObserver!=='undefined'){state.observer=new ResizeObserver(state.layout);state.observer.observe(el)}
 },
 updated(el,binding){const state=el.__inspectionTrend;if(state){state.rows=binding.value||[];state.layout()}},
 unmounted(el){el.__inspectionTrend?.observer?.disconnect();delete el.__inspectionTrend}
};
/* 巡检分析：只读取业务记录，不生成采集结果或修改业务状态。 */
const InspectionDistribution={
 props:['panel'],
 setup(props){
  const palette=['#0879ff','#12a36a','#d98600','#6654f7','#ef2f4f','#8190a5'];
  const items=Vue.computed(()=>props.panel.items),total=Vue.computed(()=>items.value.reduce((sum,item)=>sum+item.count,0));
  const max=Vue.computed(()=>Math.max(1,...items.value.map(item=>item.count)));
  const pie=Vue.computed(()=>{let offset=0;return 'conic-gradient('+items.value.map((item,i)=>{const start=offset;offset+=total.value?item.count/total.value*100:0;return palette[i%palette.length]+' '+start+'% '+offset+'%'}).join(',')+')'});
  const kind=Vue.computed(()=>/核查方式分布|所属部位报警分布/.test(props.panel.title)?'bar':'pie');
  const percent=n=>total.value?(n/total.value*100).toFixed(1)+'%':'0.0%';
  return {items,total,max,pie,kind,palette,percent};
 },
 template:`<div v-if="kind==='pie'" class="ia-distribution-pie"><div class="ia-pie-disc" role="img" :aria-label="panel.title+'，共'+total+'条'" :style="{background:pie}"></div><div class="ia-pie-legend"><div v-for="(item,i) in items" :key="item.key" :title="item.name+'：'+item.count+'（'+percent(item.count)+'）'"><i :style="{background:palette[i%palette.length]}"></i><span>{{item.name}}</span><strong>{{item.count}}</strong><small>{{percent(item.count)}}</small></div></div></div><div v-else class="ia-category-bars" role="img" :aria-label="panel.title"><div class="ia-category-axis"><span>{{max}}</span><span>{{Math.round(max/2)}}</span><span>0</span></div><div class="ia-category-scroll"><div class="ia-category-columns" :style="{gridTemplateColumns:'repeat('+items.length+',minmax(100px,1fr))'}"><div v-for="(item,i) in items" :key="item.key" class="ia-category-item"><div class="ia-category-plot"><div class="ia-category-bar" :style="{height:item.count/max*100+'%',background:palette[i%palette.length]}" :title="item.name+'：'+item.count"><span>{{item.count}}</span></div></div><div class="ia-category-label" :title="item.name">{{item.name}}</div></div></div></div></div>`
};
const InspectionAnalysis={
 create({store,monitors,getDevices,allowedAlarm=()=>true,openRecord,now=()=>Date.now(),sectionName=null,sharedUi=null}){
 const {reactive,computed}=Vue,DAY=86400000;
 const time=v=>typeof v==='number'?v:!v||['—','未提供','未记录'].includes(v)?NaN:Date.parse(/Z$|[+-]\d\d:\d\d$/.test(v)?v:String(v).replace(' ','T')+(String(v).length===10?'T00:00:00':'')+'+08:00');
 const date=v=>Number.isFinite(v)?new Date(v+8*3600000).toISOString().slice(0,10):'',fmt=v=>Number.isFinite(v)?new Date(v+8*3600000).toISOString().slice(0,19).replace('T',' '):'—';
 const start=time(date(now())),ui=reactive({tab:sectionName||'综合概览',range:[start-6*DAY,start+DAY-1],quick:'近7天',area:null,part:null,robot:null,kind:null,source:null,level:null,plan:null,ledger:{execution:'tasks',alarm:'alarms',device:'faults'},keyword:'',page:1,size:10,detail:null,detailPage:1,detailSize:20,returning:false});
 if(sharedUi)Vue.watch(()=>[sharedUi.range,sharedUi.quick,sharedUi.area,sharedUi.part],([range,quick,area,part])=>Object.assign(ui,{range,quick,area,part}),{immediate:true,flush:'sync'});
 const unique=a=>[...new Set(a.filter(Boolean))],options=a=>unique(a).map(x=>({label:x,value:x})),map=computed(()=>new Map(monitors.map(m=>[m.id,m])));
 const range=()=>ui.range?.length===2?ui.range:[start-6*DAY,start+DAY-1],inRange=v=>{const at=time(v),r=range();return at>=r[0]&&at<=r[1]},end=()=>Math.min(range()[1],now());
 const identity=(m={},snap={})=>({area:snap.tankArea||m.tankArea||'待确认',part:snap.tankId||m.tankId||'UNCONFIRMED'});
 const partLabel=x=>({PUBLIC:'公共设施',MULTI:'跨罐覆盖',UNCONFIRMED:'待确认'}[x]||x);
 const spatial=x=>(!ui.area||x.area===ui.area)&&(!ui.part||x.part===ui.part);
 const taskLabel=t=>({排队中:'未开始',进行中:'正在执行',暂停中:'任务暂停',已完成:'执行完成',失败:'中途终止',已终止:'中途终止'}[t.state]||t.state||'—');
 const snapshots=t=>Array.isArray(t.checkSnapshot)?t.checkSnapshot:[];
 const targets=t=>{
  let ids=Array.isArray(t.monitorIds)?t.monitorIds:Array.isArray(t.config?.selectedMonitors)?t.config.selectedMonitors:null;
  if(ids===null&&snapshots(t).length)ids=snapshots(t).flatMap(s=>s.monitors?.length?s.monitors:[s.monitor||s.monitorId]);
  // 不使用当前巡检点关联关系补造历史应巡检对象。
  return ids===null?null:unique(ids).map(id=>{const snap=snapshots(t).find(s=>s.monitor===id||s.monitorId===id||s.monitors?.includes(id))||{};const m=map.value.get(id)||{};return {id,name:snap.monitorName||snap.objectName||snap.name||m.name||id,...identity(m,snap),deviceId:snap.deviceId||m.deviceId,point:snap.point||snap.pointId,metric:snap.metric||m.metric||'—'};});
 };
 const resultValid=r=>['已完成','执行完成'].includes(r.executionStatus||r.status)&&!['无效','失效','质量失效','数据失效','采集失败','未知'].includes(r.quality||r.dataQuality)&&r.valid!==false&&(r.recognitionResult??r.value)!==null&&(r.recognitionResult??r.value)!==undefined&&!['','—','未返回','未提供'].includes(String(r.recognitionResult??r.value));
 const taskObjects=t=>{const all=targets(t);return all===null?null:all.filter(spatial)};
 const taskSpatial=t=>!ui.area&&!ui.part||!!taskObjects(t)?.length;
 const tasks=computed(()=>[...new Map(store.tasks.map(t=>[t.id,t])).values()].filter(t=>!t.deleted&&inRange(t.scheduledAt||[t.date,t.time].filter(Boolean).join(' '))&&taskSpatial(t)&&(ui.tab!=='巡检执行'||!ui.robot||t.robotId===ui.robot)&&(ui.tab!=='巡检执行'||!ui.kind||t.kind===ui.kind)&&(ui.tab!=='巡检执行'||!ui.plan||(t.planId||t.cycleId)===ui.plan)));
 const slots=computed(()=>{
  const attempts=tasks.value.filter(t=>t.kind!=='即时任务'&&time(t.scheduledAt||t.date+' '+t.time)<=end());
  const bySlot=new Map();for(const t of attempts){const key=(t.planId||t.cycleId)?(t.planId||t.cycleId)+'|'+time(t.scheduledAt||t.date+' '+t.time):t.id;const previous=bySlot.get(key);if(!previous||previous.state!=='已完成')bySlot.set(key,t);}const actual=[...bySlot.values()];
  const rows=actual.map(t=>({task:t,plan:store.inspectionPlans.find(p=>p.id===(t.planId||t.cycleId)),at:time(t.scheduledAt||t.date+' '+t.time),id:t.id}));
  const keys=new Set(store.tasks.map(t=>(t.planId||t.cycleId||'')+'|'+time(t.scheduledAt||t.date+' '+t.time)));
  for(const p of store.inspectionPlans||[]){const c=p.config||{};if(c.kind==='即时任务'||(!c.start&&!c.date)||(!p.createdAt&& (p.deleted||p.terminated||p.enabled===false)))continue;
   if(ui.tab==='巡检执行'&&ui.plan&&p.id!==ui.plan)continue;
   if(ui.tab==='巡检执行'&&(ui.robot&&p.robotId!==ui.robot||ui.kind&&c.kind!==ui.kind))continue;
   const created=time(p.createdAt),cut=Math.min(end(),Number.isFinite(time(p.terminatedAt))?time(p.terminatedAt)-1:Infinity,Number.isFinite(time(p.deletedAt))?time(p.deletedAt)-1:Infinity);
   if((p.deleted&&!p.deletedAt)||(p.terminated&&!p.terminatedAt)||(p.enabled===false&&!p.terminatedAt&&!p.deletedAt))continue;
   let first=time(date(time(c.start||c.date))+' '+(c.time||'00:00')),last=c.kind==='周期任务'?time(date(time(c.end))+' 23:59:59'):first;
   const step=c.kind==='周期任务'?Number(c.every)*(c.unit==='小时'?3600000:c.unit==='天'?DAY:NaN):DAY;
   if(!Number.isFinite(first)||!Number.isFinite(last)||!(step>0))continue;
   const lower=Math.max(range()[0],Number.isFinite(created)?created:first);first+=Math.max(0,Math.ceil((lower-first)/step))*step;last=Math.min(last,cut);
   for(let at=first;at<=last;at+=step){if(keys.has(p.id+'|'+at))continue;const t={id:'SCHEDULE|'+p.id+'|'+at,name:p.name,planId:p.id,robotId:p.robotId,robotName:p.robotName,kind:c.kind,type:c.type,mode:c.mode,config:c,monitorIds:c.selectedMonitors,state:'未生成',scheduledAt:fmt(at),date:date(at),time:fmt(at).slice(11,16)};if(!taskSpatial(t))continue;rows.push({task:t,plan:p,at,id:t.id,missing:true});}
  }return rows.sort((a,b)=>b.at-a.at);
 });
 const coverage=computed(()=>{let expected=0,valid=0,unknown=0;const rows=[];for(const slot of slots.value){const t=slot.task,objects=taskObjects(t);if(objects===null){unknown++;continue;}const records=t.reportRecords||t.robotReport?.records||[];for(const o of objects){expected++;const rs=records.filter(r=>(r.monitorId||r.monitor)===o.id);const good=rs.some(resultValid);if(good)valid++;rows.push({id:slot.id+'|'+o.id,task:t,object:o,valid:good,result:rs.find(resultValid)||rs[0],missing:slot.missing});}}return {expected,valid,unknown,rows};});
 const businessSource=a=>/气云|OGI/.test(a.source||'')?'OGI气云监测':/视频|摄像头/.test(a.source||'')?'视频AI':/机器人/.test(a.source||'')?'机器人现场检测':a.source||'待确认';
 const alarmIdentity=a=>{const snap=a.closureContext||a.objectSnapshot||a.monitorSnapshot||{};return identity(map.value.get(a.monitor),{...snap,tankId:a.tankId||snap.tankId,tankArea:a.tankArea||snap.tankArea});};
 const allAlarms=computed(()=>[...new Map(store.alarms.map(a=>[a.id,a])).values()].filter(a=>allowedAlarm(a)&&['一级','二级','三级'].includes(a.level)&&businessSource(a)!=='待确认'&&alarmIdentity(a).part!=='UNCONFIRMED'&&alarmIdentity(a).area!=='待确认'&&spatial(alarmIdentity(a))&&(ui.tab!=='报警与闭环'||!ui.source||businessSource(a)===ui.source)&&(ui.tab!=='报警与闭环'||!ui.level||(a.level||'待确认')===ui.level)));
 const alarms=computed(()=>allAlarms.value.filter(a=>inRange(a.time||a.occurredAt)));
 const verified=a=>['已判真警','已判误报'].includes(a.state),verifiedAt=a=>a.verifiedAt||a.verificationFeedback?.time||a.humanFeedback?.time;
 const method=a=>a.verificationFeedback?.method||(a.humanFeedback?'人工现场核查':verified(a)?'未记录':'待核查');
 const alarmById=id=>store.alarms.find(a=>a.id===id);
 const eventAlarm=e=>e.alarmSnapshot||alarmById(e.alarmId)||{};
 const eventMatch=e=>{const a=eventAlarm(e);return ['一级','二级','三级'].includes(a.level)&&businessSource(a)!=='待确认'&&alarmIdentity(a).part!=='UNCONFIRMED'&&alarmIdentity(a).area!=='待确认'&&(alarmById(e.alarmId)?.state||a.state)!=='已判误报'&&spatial(alarmIdentity(a))&&(ui.tab!=='报警与闭环'||!ui.source||businessSource(a)===ui.source)&&(ui.tab!=='报警与闭环'||!ui.level||a.level===ui.level)};
 const eventCreated=e=>e.createdAt||e.assignment?.time;
 const eventFinished=e=>e.completedAt||(e.records||[]).find(r=>r.state==='处理完成')?.time;
 const events=computed(()=>[...new Map(store.events.map(e=>[e.id,e])).values()].filter(e=>eventMatch(e)&&inRange(eventCreated(e))));
 const backlogAlarms=computed(()=>allAlarms.value.filter(a=>!verified(a)));
 const backlogEvents=computed(()=>[...new Map(store.events.map(e=>[e.id,e])).values()].filter(e=>eventMatch(e)&&e.state!=='处理完成'));
 const flatten=(list,parent=null)=>list.flatMap(d=>[{...d,parentId:d.parentId||parent?.id,parentName:parent?.name},...flatten(d.children||[],d)]);
 const devices=computed(()=>flatten(getDevices()||[]));
 const faultRows=computed(()=>{const result=[];for(const d of devices.value){const direct=monitors.filter(m=>m.deviceId===d.id||m.deviceId===d.parentId),robotTasks=store.tasks.filter(t=>t.robotId===(d.parentId||d.id)),associated=[...new Map([...direct,...robotTasks.flatMap(t=>(targets(t)||[]).map(o=>map.value.get(o.id)).filter(Boolean))].map(m=>[m.id,m])).values()],isRobot=/机器人/.test(d.type||d.name)||/^RB-/.test(d.id);const matches=associated.filter(m=>spatial(identity(m)));if((ui.area||ui.part)&&!matches.length)continue;
  const history=d.faultHistory||[];const current=unique([...(d.fault||'').split(/\s*[／/、；;]\s*/),...(d.online===false?['设备离线']:[])]).filter(x=>!history.some(f=>f.title===x&&f.status==='未恢复')).map(title=>({id:'CURRENT-'+title,title,status:'未恢复'}));
  for(const f of [...history,...current]){const key=d.id+'|'+(f.id||f.title+'|'+f.start);if(result.some(r=>r.id===key))continue;const startAt=time(f.start||f.startedAt),stop=time(f.end||f.recoveredAt);const objectIds=matches.map(m=>m.id);const affected=store.tasks.filter(t=>!t.deleted&&taskSpatial(t)&&(t.robotId===(d.parentId||d.id)||targets(t)?.some(o=>objectIds.includes(o.id))));const ongoing=f.status!=='已恢复';result.push({id:key,device:d,fault:f,startAt,stop,ongoing,category:isRobot?'机器人自身异常':'监测设备异常',objects:matches,tasks:affected,duration:Number.isFinite(startAt)&&((ongoing?now():stop)>=startAt)?Math.round(((ongoing?now():stop)-startAt)/60000):null});}
 }return result;});
 const faults=computed(()=>faultRows.value.filter(f=>inRange(f.startAt))),backlogFaults=computed(()=>faultRows.value.filter(f=>f.ongoing));
 const pct=(n,d)=>d?((n/d)*100).toFixed(1)+'%':'—',avg=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):'—';
 const duration=(a,b)=>{const x=time(a),y=time(b);return Number.isFinite(x)&&Number.isFinite(y)&&y>=x?(y-x)/60000:null;};
 const summary=computed(()=>{const s=slots.value,c=coverage.value,a=alarms.value,e=events.value;return {planned:s.length,completed:s.filter(x=>x.task.state==='已完成').length,completion:pct(s.filter(x=>x.task.state==='已完成').length,s.length),coverage:c.unknown?'—':pct(c.valid,c.expected),alarms:a.length,verification:pct(a.filter(verified).length,a.length),handling:pct(e.filter(x=>x.state==='处理完成').length,e.length),instant:tasks.value.filter(t=>t.kind==='即时任务').length};});
 const metric=(label,value,unit,key,hint,tone='blue')=>({label,value,unit,key,hint,tone});
 const cards=computed(()=>{const s=summary.value,c=coverage.value,a=alarms.value,e=events.value;
  if(ui.tab==='巡检执行')return [metric('应执行任务',s.planned,'次','planned','截至统计结束与当前时间较早者，按计划执行时间归期；即时任务单列'),metric('任务完成率',s.completion,'','completed',s.completed+' / '+s.planned+' 次'),metric('有效巡检覆盖率',s.coverage,'','coverage','有效对象执行次数 / 应巡检对象执行次数；缺少对象快照的安排 '+c.unknown+' 次'),metric('无有效结果',c.rows.filter(r=>!r.valid).length,'次','uncovered','已知应巡检对象中无有效结果的执行次数','orange'),metric('即时任务',s.instant,'次','instant','按计划时间归期，不进入计划履约分母'),metric('平均执行时长',avg(tasks.value.map(t=>duration(t.startedAt,t.finishedAt)).filter(x=>x!==null)),'分钟','tasks','仅使用真实记录的开始及结束时间')];
  if(ui.tab==='报警与闭环')return [metric('新增业务报警',a.length,'条','alarms','按发生时间及报警编号去重'),metric('核查完成率',s.verification,'','verified','本期报警中已判真警及误报 / 本期报警'),metric('误报占比',pct(a.filter(x=>x.state==='已判误报').length,a.filter(verified).length),'','false','已判误报 / 已完成核查'),metric('平均核查时长',avg(a.filter(verified).map(x=>duration(x.time,verifiedAt(x))).filter(x=>x!==null)),'分钟','verified','发生至最终判定，缺失时间不参与'),metric('处理完成率',s.handling,'','events','本期新增事件中处理完成 / 本期新增事件'),metric('平均处理时长',avg(e.filter(x=>x.state==='处理完成').map(x=>duration(eventCreated(x),eventFinished(x))).filter(x=>x!==null)),'分钟','events','处理事件创建至处理完成')];
  if(ui.tab==='设备保障')return [metric('新增设备异常',faults.value.length,'次','faults','按设备编号与异常记录编号去重，按发生时间归期'),metric('机器人自身异常',faults.value.filter(f=>f.category==='机器人自身异常').length,'次','robotFaults','包括机器人所属子设备异常'),metric('监测设备异常',faults.value.filter(f=>f.category==='监测设备异常').length,'次','monitorFaults','不与业务报警相加'),metric('当前未恢复异常',backlogFaults.value.length,'次','backlogFaults','当前积压，含历史及发生时间未提供的记录','orange'),metric('关联巡查对象',unique(faults.value.flatMap(f=>f.objects.map(m=>m.id))).length,'个','faultObjects','按设备关联关系定位，表示可能受影响的对象'),metric('关联任务',unique(faults.value.flatMap(f=>f.tasks.map(t=>t.id))).length,'个','faultTasks','按机器人或对象关联定位，不等同已证实受影响任务')];
  return [metric('应执行任务',s.planned,'次','planned','按计划执行时间归期，即时任务单列'),metric('任务完成率',s.completion,'','completed',s.completed+' / '+s.planned+' 次'),metric('有效巡检覆盖率',s.coverage,'','coverage','按执行安排 × 巡查对象计数；缺少快照安排 '+c.unknown+' 次'),metric('新增业务报警',s.alarms,'条','alarms','按发生时间归期，通知和复核不重复计数'),metric('报警核查完成率',s.verification,'','verified','本期已判真警及误报 / 本期业务报警'),metric('处理完成率',s.handling,'','events','本期处理完成事件 / 本期新增处理事件')];
 });
 const schemas={task:['任务编号','任务名称','所属计划','执行机器人','任务类型','巡检类型','巡检模式','计划执行时间','实际开始时间','实际结束时间','任务状态','应巡检对象数','有效结果对象数'],object:['任务编号','巡查对象编号','巡查对象名称','所属罐区','所属部位','监测项','结果状态','测量值'],alarm:['报警编号','巡查对象名称','巡查对象编号','所属罐区','所属部位','报警名称','报警来源','报警等级','报警档位','发生时间','核查状态','核查方式','判定时间'],event:['处理事件编号','报警编号','巡查对象名称','所属罐区','所属部位','处理状态','处理人','创建时间','处理完成时间'],fault:['异常记录编号','设备编号','设备名称','异常类别','异常类型','发生时间','恢复时间','恢复状态','持续时间 分钟','关联巡查对象数','关联任务数']};
 const taskRow=(t,missing=false)=>{const objects=taskObjects(t),raw=t.reportRecords||t.robotReport?.records||[];return {id:t.id,kind:missing?'schedule':'task',target:t,values:[t.id,t.name,store.inspectionPlans.find(p=>p.id===(t.planId||t.cycleId))?.name||'独立任务',t.robotName||t.robotId||'—',t.kind||'—',t.type||'—',t.mode||'—',t.scheduledAt||[t.date,t.time].filter(Boolean).join(' '),t.startedAt||'—',t.finishedAt||'—',missing?'到期未生成':taskLabel(t),objects?.length??'—',objects?objects.filter(o=>raw.some(r=>(r.monitorId||r.monitor)===o.id&&resultValid(r))).length:'—']};};
 const objectRow=r=>({id:r.id,kind:r.missing?'schedule':'task',target:r.task,values:[r.task.id,r.object.id,r.object.name,r.object.area,partLabel(r.object.part),r.object.metric,r.valid?'有效结果':'无有效结果',r.result?.recognitionResult??r.result?.value??'—']});
 const alarmRow=a=>{const m=map.value.get(a.monitor),i=alarmIdentity(a);return {id:a.id,kind:'alarm',target:a,values:[a.id,a.monitorName||a.closureIdentity?.objectName||m?.name||'—',a.monitor||'—',i.area,partLabel(i.part),a.name,businessSource(a),a.level||'—',a.band||'—',a.time||'—',verified(a)?a.state:'待核查',method(a),verifiedAt(a)||'—']};};
 const eventRow=e=>{const a=eventAlarm(e),i=alarmIdentity(a);return {id:e.id,kind:'event',target:e,values:[e.id,e.alarmId,a.monitorName||map.value.get(a.monitor)?.name||'—',i.area,partLabel(i.part),e.state,e.owner||e.assignment?.owner||'—',eventCreated(e)||'—',eventFinished(e)||'—']};};
 const faultRow=f=>({id:f.id,kind:'device',target:f.device,values:[f.fault.id||'—',f.device.id,f.device.name,f.category,f.fault.title,fmt(f.startAt),fmt(f.stop),f.ongoing?'未恢复':'已恢复',f.duration??'—',f.objects.length,f.tasks.length]});
 const dataset=key=>{
  if(['planned','completed','tasks','instant','late','missing'].includes(key)){let rows=key==='tasks'||key==='instant'?tasks.value.map(t=>({task:t})):slots.value;if(key==='completed')rows=rows.filter(x=>x.task.state==='已完成');if(key==='instant')rows=rows.filter(x=>x.task.kind==='即时任务');if(key==='late')rows=rows.filter(x=>x.at<now()&&x.task.state!=='已完成');if(key==='missing')rows=rows.filter(x=>x.missing);return {schema:'task',rows:rows.map(x=>taskRow(x.task,x.missing))};}
  if(['coverage','uncovered'].includes(key))return {schema:'object',rows:coverage.value.rows.filter(r=>key!=='uncovered'||!r.valid).map(objectRow)};
  if(['alarms','verified','false','backlogAlarms'].includes(key))return {schema:'alarm',rows:(key==='backlogAlarms'?backlogAlarms.value:alarms.value.filter(a=>key==='verified'?verified(a):key==='false'?a.state==='已判误报':true)).map(alarmRow)};
  if(['events','backlogEvents'].includes(key))return {schema:'event',rows:(key==='backlogEvents'?backlogEvents.value:events.value).map(eventRow)};
  if(key==='faultObjects')return {schema:'object',rows:unique(faults.value.flatMap(f=>f.objects.map(m=>m.id))).map(id=>{const m=map.value.get(id),i=identity(m);return {id,kind:'monitor',target:m,values:['—',id,m.name,i.area,partLabel(i.part),m.metric,'设备关联','—']};})};
  if(key==='faultTasks')return {schema:'task',rows:[...new Map(faults.value.flatMap(f=>f.tasks).map(t=>[t.id,t])).values()].map(t=>taskRow(t))};
  return {schema:'fault',rows:(key==='backlogFaults'?backlogFaults.value:faults.value.filter(f=>key==='robotFaults'?f.category==='机器人自身异常':key==='monitorFaults'?f.category==='监测设备异常':true)).map(faultRow)};
 };
 const show=(key,title,filter)=>{const d=dataset(key);ui.detail={title:title||cards.value.find(c=>c.key===key)?.label||'分析明细',schema:d.schema,rows:filter?d.rows.filter(filter):d.rows};ui.detailPage=1;};
 const group=(rows,value,label)=>{const m=new Map();for(const row of rows){const k=value(row)||'待确认';m.set(k,(m.get(k)||0)+1);}return [...m].map(([name,count])=>({name:label?label(name):name,count,key:name})).sort((a,b)=>b.count-a.count)};
 const verificationMethodPanel=()=>{
  const classify=a=>{const value=String(method(a)||'').trim();if(/线下|人工现场|现场核查/.test(value))return '线下核查';if(/线上|机器人|视频|远程/.test(value))return '线上核查（含机器人核查）';return null};
  const checked=alarms.value.filter(verified),known=checked.filter(a=>classify(a)),items=known.length?['线上核查（含机器人核查）','线下核查'].map(name=>({name,key:name,count:known.filter(a=>classify(a)===name).length})):[],demo=checked.length>0&&!items.length;
  return {title:demo?'核查方式分布（演示）':'核查方式分布',key:'verified',column:11,demo,items:demo?[{name:'线上核查（含机器人核查）',key:'online',count:7},{name:'线下核查',key:'offline',count:6}]:items};
 };
 const panels=computed(()=>{
  if(ui.tab==='巡检执行')return [{title:'任务状态分布',key:'tasks',items:group(tasks.value,taskLabel),column:10},{title:'机器人执行分布',key:'tasks',items:group(tasks.value,t=>t.robotName||t.robotId||'未关联'),column:3},{title:'中途终止原因',key:'tasks',items:group(tasks.value.filter(t=>['失败','已终止'].includes(t.state)),t=>t.terminationReason||t.failureReason||'未记录'),custom:'termination'}];
  if(ui.tab==='报警与闭环')return [{title:'报警来源分布',key:'alarms',items:group(alarms.value,businessSource),column:6},verificationMethodPanel(),{title:'高频报警对象',key:'alarms',items:group(alarms.value,a=>a.monitor||'未关联',id=>map.value.get(id)?.name||id).slice(0,8),column:2,raw:true}];
  if(ui.tab==='设备保障')return [{title:'异常类型分布',key:'faults',items:group(faults.value,f=>f.fault.title),column:4},{title:'异常设备排行',key:'faults',items:group(faults.value,f=>f.device.name).slice(0,8),column:2}];
  return [{title:'报警来源分布',key:'alarms',items:group(alarms.value,businessSource),column:6},{title:'所属部位报警分布',key:'alarms',items:group(alarms.value,a=>alarmIdentity(a).part,partLabel),column:4}];
 });
 const panelClick=(p,item)=>{if(p.attention){show(item.key,item.name);return;}show(p.key,p.title+' · '+item.name,r=>p.custom==='termination'?(r.target.terminationReason||r.target.failureReason||'未记录')===item.key:r.values[p.column]===(p.raw?item.key:item.name));};
 const trend=computed(()=>{const [from,to]=range(),bucket=1;const rows=[];for(let at=time(date(from));at<=to;at+=bucket*DAY){const next=Math.min(at+bucket*DAY-1,to),ss=slots.value.filter(s=>s.at>=at&&s.at<=next),aa=alarms.value.filter(a=>time(a.time)>=at&&time(a.time)<=next),ff=faults.value.filter(f=>f.startAt>=at&&f.startAt<=next);rows.push({label:date(at).slice(5),fullLabel:date(at)+(date(next)!==date(at)?' 至 '+date(next):''),stackIncomplete:ss.filter(s=>s.at<now()&&!['已完成','失败','已终止'].includes(s.task.state)).length,from:at,to:next,planned:ss.length,completed:ss.filter(s=>s.task.state==='已完成').length,terminated:ss.filter(s=>['失败','已终止'].includes(s.task.state)).length,incomplete:ss.filter(s=>s.at<now()&&s.task.state!=='已完成').length,one:aa.filter(a=>a.level==='一级').length,two:aa.filter(a=>a.level==='二级').length,three:aa.filter(a=>a.level==='三级').length,unknown:aa.filter(a=>!['一级','二级','三级'].includes(a.level)).length,faults:ff.length});}return rows;});
 const trendSeries=computed(()=>ui.tab==='设备保障'?[{key:'faults',label:'新增设备异常',tone:'orange'}]:ui.tab==='报警与闭环'?[{key:'one',label:'一级报警',tone:'red'},{key:'two',label:'二级报警',tone:'orange'},{key:'three',label:'三级报警',tone:'blue'}]:[{key:'planned',label:'应执行',tone:'gray'},{key:'completed',label:'执行完成',tone:'green'},{key:'terminated',label:'中途终止',tone:'orange'},{key:'incomplete',label:'到期未完成',tone:'blue'}]);
 const alarmSeries=[{key:'one',label:'一级报警',tone:'red'},{key:'two',label:'二级报警',tone:'orange'},{key:'three',label:'三级报警',tone:'blue'}];
 const alarmMax=computed(()=>Math.max(1,...trend.value.map(t=>alarmSeries.reduce((n,s)=>n+t[s.key],0))));
 const alarmTrendClick=(t,s)=>show('alarms',t.label+' · '+s.label,r=>{const at=time(r.values[9]);return at>=t.from&&at<=t.to&&(s.key==='all'||(s.key==='unknown'?!['一级','二级','三级'].includes(r.values[7]):r.values[7]===({one:'一级',two:'二级',three:'三级'}[s.key])));});
 const trendMax=computed(()=>ui.tab==='报警与闭环'?alarmMax.value:Math.max(1,...trend.value.map(t=>ui.tab==='设备保障'?t.faults:t.planned)));
 const stackSeries=computed(()=>trendSeries.value.filter(s=>s.key!=='planned'));
 const stackValue=(t,s)=>s.key==='incomplete'?t.stackIncomplete:(t[s.key]||0);
 const stackTotal=(t,alarm=false)=>alarm||ui.tab==='报警与闭环'?alarmSeries.reduce((n,s)=>n+(t[s.key]||0),0):t.planned;
 const stackStyle=(t,s,series,alarm=false)=>{const total=stackTotal(t,alarm)||1,index=series.findIndex(x=>x.key===s.key);return{height:stackValue(t,s)/total*100+'%',bottom:series.slice(0,index).reduce((n,x)=>n+stackValue(t,x),0)/total*100+'%'}};
 const trendTick=()=>true;
 const trendClick=(t,s,stacked=false)=>{const key=ui.tab==='设备保障'?'faults':ui.tab==='报警与闭环'?'alarms':'planned';show(key,t.label+' · '+s.label,r=>{const at=key==='faults'?time(r.values[5]):key==='alarms'?time(r.values[9]):time(r.values[7]);if(at<t.from||at>t.to)return false;if(key==='alarms')return r.values[7]===({one:'一级',two:'二级',three:'三级'}[s.key])||(s.key==='unknown'&&!['一级','二级','三级'].includes(r.values[7]));if(s.key==='completed')return r.target.state==='已完成';if(s.key==='terminated')return ['失败','已终止'].includes(r.target.state);if(s.key==='incomplete')return at<now()&&r.target.state!=='已完成'&&(!stacked||!['失败','已终止'].includes(r.target.state));return true;});};
 const baseKey=computed(()=>({'综合概览':'planned','巡检执行':ui.ledger.execution,'报警与闭环':ui.ledger.alarm,'设备保障':ui.ledger.device}[ui.tab]));
 const ledgerOptions=computed(()=>ui.tab==='巡检执行'?[['tasks','巡检任务'],['coverage','对象结果']]:ui.tab==='报警与闭环'?[['alarms','业务报警'],['events','处理事件']]:ui.tab==='设备保障'?[['faults','本期新增'],['backlogFaults','当前未恢复']]:[]);
 const ledgerGroup=computed(()=>({'巡检执行':'execution','报警与闭环':'alarm','设备保障':'device'}[ui.tab]));
 const closurePanels=computed(()=>ui.tab==='报警与闭环'?[{title:'本期报警核查状态',key:'alarms',column:10,items:group(alarms.value,a=>verified(a)?a.state:'待核查')},{title:'本期事件处理状态',key:'events',column:5,items:group(events.value,e=>e.state)},{title:'当前核查与处理积压',attention:true,items:[{name:'当前待核查报警',count:backlogAlarms.value.length,key:'backlogAlarms'},{name:'当前未完成处理事件',count:backlogEvents.value.length,key:'backlogEvents'}]}]:[]);
 const table=computed(()=>dataset(baseKey.value)),tableRows=computed(()=>table.value.rows.filter(r=>!ui.keyword.trim()||r.values.join(' ').toLowerCase().includes(ui.keyword.trim().toLowerCase()))),paged=computed(()=>tableRows.value.slice((ui.page-1)*ui.size,ui.page*ui.size));
 const detailRows=computed(()=>ui.detail?.rows.slice((ui.detailPage-1)*ui.detailSize,ui.detailPage*ui.detailSize)||[]);
 const drill=r=>{ui.savedDetail=ui.detail;ui.detail=null;ui.returning=true;openRecord(r.kind,r.target);};
 const reset=()=>{ui.area=null;ui.part=null;ui.robot=null;ui.kind=null;ui.plan=null;ui.source=null;ui.level=null;ui.keyword='';quick('近7天');};
 const quick=label=>{const today=time(date(now()));ui.quick=label;ui.range=[today-(label==='今日'?0:label==='近30天'?29:6)*DAY,today+DAY-1];};
 const plans=computed(()=>(store.inspectionPlans||[]).map(p=>({label:p.name,value:p.id})));
 const areas=computed(()=>options(monitors.map(m=>m.tankArea))),parts=computed(()=>options(monitors.filter(m=>!ui.area||m.tankArea===ui.area).map(m=>m.tankId||'UNCONFIRMED')).map(o=>({...o,label:partLabel(o.value)}))),robots=computed(()=>[...new Map(store.tasks.filter(t=>t.robotId).map(t=>[t.robotId,{value:t.robotId,label:t.robotName||t.robotId}])).values()]);
 Vue.watch(()=>[ui.tab,ui.range,ui.area,ui.part,ui.robot,ui.kind,ui.plan,ui.source,ui.level,ui.keyword,ui.size,ui.ledger.execution,ui.ledger.alarm,ui.ledger.device],()=>{ui.page=1;ui.detail=null;});
 Vue.watch(()=>ui.area,()=>{if(ui.part&&!parts.value.some(o=>o.value===ui.part))ui.part=null;});
 const sections=sectionName?[]:['综合概览','报警与闭环','设备保障'].map(name=>{let child;child=InspectionAnalysis.create({store,monitors,getDevices,allowedAlarm,now,sectionName:name,sharedUi:ui,openRecord:(kind,row)=>{ui.returning=true;ui.originSection=child;openRecord(kind,row)}});return {name,model:child};});
 const unifiedCards=computed(()=>sections.flatMap(s=>s.model.cards.value.filter(c=>s.name!=='报警与闭环'||!['新增业务报警','核查完成率','处理完成率'].includes(c.label)).map(c=>({...c,owner:s.model}))));
 const metricGroups=computed(()=>[{title:'巡检任务',items:unifiedCards.value.filter(c=>['应执行任务','任务完成率','有效巡检覆盖率'].includes(c.label))},{title:'报警与处理',items:unifiedCards.value.filter(c=>['新增业务报警','报警核查完成率','处理完成率','误报占比','平均核查时长','平均处理时长'].includes(c.label))},{title:'设备异常',items:unifiedCards.value.filter(c=>['新增设备异常','机器人自身异常','监测设备异常','当前未恢复异常','关联巡查对象','关联任务'].includes(c.label))}]);
 const restoreContext=()=>{const child=ui.originSection;if(child){child.ui.returning=false;child.ui.detail=child.ui.savedDetail||null;}ui.returning=false;};
 return {sections,unifiedCards,metricGroups,restoreContext,ui,summary,cards,schemas,table,baseKey,ledgerOptions,ledgerGroup,closurePanels,tableRows,paged,detailRows,areas,parts,robots,plans,options,show,panelClick,panels,trend,trendSeries,trendMax,trendClick,stackSeries,stackValue,stackTotal,stackStyle,trendTick,alarmSeries,alarmMax,alarmTrendClick,drill,reset,quick,slots,tasks,alarms,events,coverage,faults,backlogFaults,dataset,time,resultValid};
 },
 sectionComponent:{directives:{trendWindow:InspectionTrendWindow},props:['model'],template:`<section class="ia-column" :aria-label="model.ui.tab">

 <div class="ia-trends" :class="{'ia-trends--pair':model.ui.tab==='综合概览'}"><section v-if="model.ui.tab!=='报警与闭环'" class="ia-card"><div class="ia-section-head"><h2>{{model.ui.tab==='设备保障'?'设备异常发生趋势':model.ui.tab==='报警与闭环'?'报警等级趋势':'任务执行趋势'}}</h2><div class="ia-legend"><span v-for="s in model.trendSeries.value"><i :class="s.tone"></i>{{s.label}}</span></div></div><div v-if="model.ui.tab!=='设备保障'" class="ia-trend ia-trend--stacked" :style="{'--ia-count':model.trend.value.length}" v-trend-window="model.trend.value"><div v-for="(t,index) in model.trend.value" :key="t.from" class="ia-trend-day"><div class="ia-bars"><div class="ia-stack" :style="{height:model.stackTotal(t)/model.trendMax.value*112+'px'}"><div v-if="model.ui.tab!=='报警与闭环'&&t.planned" class="ia-stack-base gray" :title="t.fullLabel+' · 应执行 '+t.planned+' 次'" :aria-label="t.fullLabel+' 应执行 '+t.planned+' 次'"></div><template v-for="s in model.stackSeries.value" :key="s.key"><div v-if="model.stackValue(t,s)>0" class="ia-stack-segment" :class="s.tone" :style="model.stackStyle(t,s,model.stackSeries.value)" :title="t.fullLabel+' · '+s.label+' '+model.stackValue(t,s)" :aria-label="t.fullLabel+' '+s.label+' '+model.stackValue(t,s)"><span v-if="model.stackValue(t,s)/model.trendMax.value*112>=18">{{model.stackValue(t,s)}}</span></div></template><span v-if="model.stackTotal(t)" class="ia-stack-total" :title="t.fullLabel+' · '+(model.ui.tab==='报警与闭环'?'报警总数 ':'应执行 ')+model.stackTotal(t)">{{model.stackTotal(t)}}</span></div></div><small :class="{'ia-tick-hidden':!model.trendTick(index)}" :title="t.fullLabel">{{t.label}}</small></div></div><div v-else class="ia-trend" :style="{'--ia-count':model.trend.value.length}" v-trend-window="model.trend.value"><div v-for="t in model.trend.value" :key="t.from" class="ia-trend-day"><div class="ia-bars"><div class="ia-bar" v-for="s in model.trendSeries.value" :key="s.key" :class="s.tone" :style="{height:Math.max(2,t[s.key]/model.trendMax.value*112)+'px'}" :title="t.label+' '+s.label+' '+t[s.key]" :aria-label="t.label+' '+s.label+' '+t[s.key]"><span v-if="t[s.key]">{{t[s.key]}}</span></div></div><small>{{t.label}}</small></div></div></section>
 <section v-if="model.ui.tab==='综合概览'" class="ia-card"><div class="ia-section-head"><h2>报警发生趋势</h2><div class="ia-legend"><span v-for="s in model.alarmSeries"><i :class="s.tone"></i>{{s.label}}</span></div></div><div class="ia-trend ia-trend--stacked" :style="{'--ia-count':model.trend.value.length}" v-trend-window="model.trend.value"><div v-for="(t,index) in model.trend.value" :key="t.from" class="ia-trend-day"><div class="ia-bars"><div class="ia-stack" :style="{height:model.stackTotal(t,true)/model.alarmMax.value*112+'px'}"><template v-for="s in model.alarmSeries" :key="s.key"><div v-if="model.stackValue(t,s)>0" class="ia-stack-segment" :class="s.tone" :style="model.stackStyle(t,s,model.alarmSeries,true)" :title="t.fullLabel+' · '+s.label+' '+t[s.key]" :aria-label="t.fullLabel+' '+s.label+' '+t[s.key]"><span v-if="t[s.key]/model.alarmMax.value*112>=18">{{t[s.key]}}</span></div></template><span v-if="model.stackTotal(t,true)" class="ia-stack-total" :title="t.fullLabel+' · 报警总数 '+model.stackTotal(t,true)">{{model.stackTotal(t,true)}}</span></div></div><small :class="{'ia-tick-hidden':!model.trendTick(index)}" :title="t.fullLabel">{{t.label}}</small></div></div></section>
 </div><div class="ia-panels" :class="{'ia-panels--distribution':model.ui.tab==='综合概览'}"><section v-for="p in model.panels.value.filter(p=>!p.attention&&(model.ui.tab!=='报警与闭环'||p.title!=='报警来源分布'))" :key="p.title" class="ia-card"><h2>{{p.title}}</h2><inspection-distribution v-if="p.items.length&&/核查方式分布|所属部位报警分布|报警来源分布|本期报警核查状态|本期事件处理状态/.test(p.title)" :panel="p"/><div v-else-if="p.items.length" class="ia-ranks"><div class="ia-rank-row" v-for="item in p.items" :key="item.key"><span>{{item.name}}</span><strong>{{item.count}}</strong><i :style="{width:Math.max(2,item.count/Math.max(1,...p.items.map(x=>x.count))*100)+'%'}"></i></div></div><prod-empty-state v-else compact text="暂无统计记录"/></section></div>
 <div v-if="model.closurePanels.value.length" class="ia-panels"><section v-for="p in model.closurePanels.value.filter(p=>!p.attention)" class="ia-card"><h2>{{p.title}}</h2><inspection-distribution v-if="p.items.length&&/核查方式分布|所属部位报警分布|报警来源分布|本期报警核查状态|本期事件处理状态/.test(p.title)" :panel="p"/><div v-else-if="p.items.length" class="ia-ranks"><div class="ia-rank-row" v-for="item in p.items" :key="item.key"><span>{{item.name}}</span><strong>{{item.count}}</strong><i :style="{width:Math.max(2,item.count/Math.max(1,...p.items.map(x=>x.count))*100)+'%'}"></i></div></div><prod-empty-state v-else compact text="暂无统计记录"/></section></div>
</section>`},
 component:{props:['model'],mounted(){this.$nextTick(()=>{if(this.$refs.scroll)this.$refs.scroll.scrollTop=this.model.ui.scrollTop||0})},template:`<section class="ia-page" aria-label="巡检分析"><div class="ia-scroll" ref="scroll" @scroll="model.ui.scrollTop=$event.target.scrollTop"><div class="ia-filters"><div class="ia-range-tabs" role="tablist" aria-label="统计时间范围"><button v-for="q in ['今日','近7天','近30天']" :key="q" type="button" role="tab" :aria-selected="model.ui.quick===q" :class="{active:model.ui.quick===q}" @click="model.quick(q)">{{q}}</button></div><div class="ia-date" :class="{'is-custom':!model.ui.quick}"><n-date-picker v-model:value="model.ui.range" type="daterange" clearable to="body" aria-label="自定义时间" @update:value="model.ui.quick=''"/></div></div>
 <div class="ia-summary-groups"><section v-for="g in model.metricGroups.value" :key="g.title" class="ia-summary-group" :class="{'ia-summary-group--tasks':g.title==='巡检任务'}"><h2>{{g.title}}</h2><dl><div v-for="c in g.items" :key="c.label" class="ia-summary-item" :title="c.hint"><dt>{{c.label}}</dt><dd>{{c.value}}<small v-if="c.unit">{{c.unit}}</small></dd></div></dl></section></div><div class="ia-chart-grid"><inspection-analysis-section v-for="s in model.sections" :key="s.name" :model="s.model"/></div></div></section>`}
};
InspectionAnalysis.sectionComponent.components={ProdEmptyState,InspectionDistribution};
InspectionAnalysis.component.components={InspectionAnalysisSection:InspectionAnalysis.sectionComponent};
