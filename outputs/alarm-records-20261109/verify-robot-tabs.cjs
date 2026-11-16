const fs=require('fs'),vm=require('vm');
const harness=fs.readFileSync('outputs/alarm-records-20261109/verify.cjs','utf8').split('const {p,local,nodes,template,messages}=boot();')[0];
vm.runInNewContext(harness+String.raw`
const {p,ctx,nodes,template}=boot();
const monitors=p.monitors;
const m=monitors.find(m=>m.id==='DCS-PT101');
const other=monitors.find(n=>n.tankId&&n.tankId!==m.tankId);
const sibling=monitors.find(n=>n.id!==m.id&&n.tankId===m.tankId);
assert(m&&other&&sibling);
const point=p.store.points.find(pt=>pt.links.includes(m.id)).id;
const alarm={id:'VERIFY-TANK-TABS',monitor:m.id,tankId:m.tankId,tankName:m.tankName,point,source:'DCS',name:'压力报警',time:'2026-11-09 08:00:00',state:'待核查',level:'一级',reviewIds:['VERIFY-TASK'],robotReviewHistory:[],evidence:[],logs:[]};
p.store.alarms.unshift(alarm);
p.store.tasks.unshift({id:'VERIFY-TASK',name:'储罐核查任务',reviews:[alarm.id],robotId:'RB-001',robotName:'巡检机器人01',state:'已完成',progress:100,date:'2026-11-09',time:'08:01',createdAt:'2026-11-09 08:01:00',finishedAt:'2026-11-09 08:09:00',points:[point],reportRecords:[
 {id:'first',pointId:point,monitorId:m.id,objectName:m.name,recognitionResult:0,executionStatus:'已完成',recognizedAt:'2026-11-09 08:03:00',photoUrl:'assets/robot-gauge.png',videoUrl:'tank.mp4'},
 {id:'sibling',pointId:point,monitorId:sibling.id,recognitionResult:12,executionStatus:'已完成',recognizedAt:'2026-11-09 08:04:00'},
 {id:'other',monitorId:other.id,recognitionResult:999,photoUrl:'unrelated.png'}],alertRecords:[
 {id:'env',point,type:'环境告警',name:'环境记录',value:0},
 {id:'sys',point,type:'系统告警',name:'系统记录'},
 {id:'obj',monitorId:m.id,point,type:'巡检对象告警',name:'对象记录'},
 {id:'other',monitorId:other.id,type:'环境告警',name:'其他罐体'}]});
p.openAlarm(alarm.id);p.alarmDetailTab.value='机器人核查';
let r=p.verificationRobotRecords.value[0],task=p.verificationTaskFor(r);
assert.equal(task.reportRecords.length,2,'all available results for current tank, exclude another tank');
assert.equal(task.reportRecords[0].recognitionResult,0);
assert.equal(r.photos.length,1);assert.equal(r.videos[0].src,'tank.mp4');
for(const [tab,count] of [['环境告警',1],['系统告警',1],['综合告警',3]]){
 const tabNode=nodes().find(n=>n.type==='button'&&n.props?.role==='tab'&&n.children===tab);
 assert(tabNode,'tab button exists');tabNode.props.onClick();
 assert.equal(p.verificationTaskTab(r),tab);assert.equal(p.verificationTaskAlerts(r).length,count);nodes();
}
const returnTab=nodes().find(n=>n.type==='button'&&n.props?.role==='tab'&&n.children==='巡检过程记录');returnTab.props.onClick();
assert(nodes().some(n=>n.type==='robot-report'&&n.props.task.id==='VERIFY-TASK'));
const RR=vm.runInContext('RobotReport',ctx);
const props={task,points:p.store.points,monitors,embedded:true};
const report=RR.setup(props,{emit(){}});assert.equal(report.source.value.length,2);assert.equal(report.source.value[0].result,0);
const render=ctx.Vue.compile(RR.template,{decodeEntities:s=>s,onError:e=>{throw e}}),view=ctx.Vue.proxyRefs({...props,...report});render.call(view,view,[]);
assert(report.timeline.value.some(g=>g.records.length===2));
const region=template.slice(template.indexOf('<template v-if="alarmDetailTab===\'机器人核查\'">'),template.indexOf('<template v-if="alarmDetailTab===\'人工核查记录\'">'));
for(const label of ['开始时间','到点时间','现场核查结果','>核查过程<','r.summary','演示数据'])assert(!region.includes(label),label+' removed from verification overview');
assert(region.includes('所属部位')&&region.includes('下发时间')&&region.includes('结束时间'));
const mediaButton=nodes().find(n=>n.type==='button'&&n.props?.class==='robot-photo-button');mediaButton.props.onClick();assert.equal(p.robotPhoto.value.src,'assets/robot-gauge.png');
const videoButton=nodes().find(n=>n.type==='button'&&n.children==='现场视频 1');videoButton.props.onClick();assert.equal(p.reviewVideo.value.src,'tank.mp4');
p.alarmAction('true',[alarm.id]);p.reason.value='现场核查确认';p.submitDecision();
const frozen=JSON.stringify(p.verificationTaskFor(p.verificationRobotRecords.value[0]));
p.store.tasks.find(t=>t.id==='VERIFY-TASK').reportRecords[0].recognitionResult=999;
assert.equal(JSON.stringify(p.verificationTaskFor(p.verificationRobotRecords.value[0])),frozen,'later task updates cannot change historical verification');
p.openAlarm(alarm.id);assert.equal(p.verificationTaskTab(r),'巡检过程记录');
const legacy={id:'LEGACY-NO-TASK',state:'已完成',items:[],photos:[],videos:[]};
assert.equal(p.verificationTaskFor(legacy).reportRecords.length,0);
assert.equal(p.verificationTaskAlerts(legacy).length,0,'do not fabricate environmental or system alerts');
console.log('PASS overview fields, all four tab clicks, task/tank scope, sibling results, photo/video actions, reused report component render, missing records and frozen task evidence.');
`,{require,console,setTimeout,clearTimeout,setInterval,clearInterval});
