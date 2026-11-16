const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('多伦智能巡检平台.html','utf8');
const code=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
function boot(saved){
 const messages=[],local=saved?{'duolun-platform-v1':JSON.stringify(saved)}:{};
 const ctx={console,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},localStorage:{getItem:k=>local[k]||null,setItem:(k,v)=>local[k]=v},location:{reload(){}},FileReader:class{readAsDataURL(f){this.result=f.data;this.onload()}}};
 vm.createContext(ctx);
 for(const file of ['vue.global.prod.js','robot-report.js','point-workflow.js','point-management.js','alarm-response.js','notification-center.js'])vm.runInContext(fs.readFileSync('assets/'+file,'utf8'),ctx);
 ctx.naive={useMessage:()=>Object.fromEntries(['error','success','warning','info'].map(k=>[k,text=>messages.push({k,text})])),useDialog:()=>({warning:o=>o.onPositiveClick?.(),info(){}})};
 vm.runInContext(code.slice(0,code.indexOf('const app=createApp'))+';globalThis.P=Platform;',ctx);
 const errors=[];const render=ctx.Vue.compile(ctx.P.template,{decodeEntities:s=>s,onError:e=>errors.push(e)});
 assert.deepEqual(errors,[],'Vue template must compile without structural errors');
 const p=ctx.P.setup(),view=ctx.Vue.proxyRefs(p);
 function nodes(){const result=[];function walk(v){if(!v)return;if(Array.isArray(v)){v.forEach(walk);return}if(typeof v!=='object')return;result.push(v);if(Array.isArray(v.children))walk(v.children);else if(v.children&&typeof v.children==='object')for(const key of ['default','footer'])if(typeof v.children[key]==='function')walk(v.children[key]());}walk(render.call(view,view,[]));return result;}
 return {ctx,p,local,messages,nodes,template:ctx.P.template};
}
const {p,local,nodes,template,messages}=boot();
const record=(id,state='待核查',extra={})=>({id,source:'视频AI',monitor:'CAM-01',point:'PT-101',name:'核查测试',time:'2026-11-09 08:00:00',state,level:'二级',reviewIds:[],evidence:[],robotReviewHistory:[],logs:[],workflowProcessed:true,...extra});
function add(a){p.store.alarms.unshift(a);return p.store.alarms.find(r=>r.id===a.id)}
function renderAlarm(a){p.openAlarm(a.id);for(const tab of ['报警详情','机器人核查','人工核查记录']){p.alarmDetailTab.value=tab;nodes();}}
assert(p.store.alarms.every(a=>a.state!=='核查中'));
assert(p.store.events.every(e=>['待处理','处理完成'].includes(e.state)&&e.records.length<=1));
for(const a of p.store.alarms)renderAlarm(a);
for(const e of p.store.events){p.openEvent(e.id);for(const tab of ['处理记录','关联核查记录']){p.recordTab.value=tab;nodes();}}
console.log('PASS all seeded sources, verification tabs and processing tabs render VNodes');
const empty=add(record('TEST-EMPTY'));p.openAlarm(empty.id);p.alarmDetailTab.value='机器人核查';
assert.equal(p.verificationRobotRecords.value.length,0);
assert(nodes().some(n=>n.props?.text==='暂无机器人核查记录'));
const fake=add(record('TEST-ROBOT','待核查',{reviewIds:['TASK-TEST'],robotReviewHistory:[{id:'H-TEST',taskId:'TASK-TEST',state:'已完成',sentAt:'2026-11-09 08:01:00',finishedAt:'2026-11-09 08:04:00',items:[{monitor:'CAM-01',name:'现场检测',value:0,time:'2026-11-09 08:03:00',photoUrl:'assets/robot-thermal.jpg',videoUrl:'test.webm'},{monitor:'OTHER',name:'其他报警对象',value:99}],photos:[]}]}));
p.store.tasks.unshift({id:'TASK-TEST',reviews:[fake.id],state:'已完成',points:['PT-101'],date:'2026-11-09',time:'08:01',robotId:'RB-001',robotName:'巡检机器人01',startedAt:'2026-11-09 08:02:00',finishedAt:'2026-11-09 08:04:00',log:['08:01 任务下发','08:02 开始执行','08:04 返回结果'],progress:100});
p.openAlarm(fake.id);p.alarmDetailTab.value='机器人核查';assert.equal(p.verificationRobotRecords.value.length,1);const r=p.verificationRobotRecords.value[0];assert.equal(r.items.length,1);assert.equal(r.items[0].value,0);assert.equal(r.photos.length,1);assert.equal(r.videos.length,1);assert.equal(r.logs.length,3);nodes();
const taskId='SECOND-TEST';fake.robotReviewHistory.push({id:taskId,state:'失败',sentAt:'2026-11-09 08:05:00',summary:'采集失败',items:[]});assert.equal(p.verificationRobotRecords.value.length,2);nodes();
console.log('PASS absent robot data, task/history merge, zero reading, evidence, multiple attempts and failed tasks');
p.alarmAction('true',[fake.id]);nodes();p.submitDecision();assert.equal(fake.state,'待核查','reason is required');p.reason.value='依据现场照片和机器人结果确认真警';p.attachments.value=[{name:'佐证.png',type:'image/png',url:'data:image/png;base64,AAAA'}];p.submitDecision();
assert.equal(fake.state,'已判真警');assert.equal(fake.verificationRobotSnapshot.length,2);assert.equal(fake.verificationFiles.length,1);const event=p.store.events.find(e=>e.alarmId===fake.id);assert(event);assert.equal(event.state,'待处理');assert.equal(event.records.length,0);
const snapshot=JSON.stringify(fake.verificationRobotSnapshot);fake.robotReviewHistory[0].items[0].value=888;p.openAlarm(fake.id);assert.equal(JSON.stringify(p.verificationRobotRecords.value),snapshot,'later robot updates cannot rewrite decision evidence');
p.alarmAction('true',[fake.id]);p.submitDecision();assert.equal(p.store.events.filter(e=>e.alarmId===fake.id).length,1);
p.alarmAction('false',[empty.id]);p.reason.value='人工复核确认误报';p.submitDecision();assert.equal(empty.state,'已判误报');assert.equal(empty.verificationRobotSnapshot.length,0);assert(!p.store.events.some(e=>e.alarmId===empty.id));renderAlarm(empty);
p.go('alarms');p.alarmTab.value='历史报警记录';nodes();
console.log('PASS true/false decisions, required fields, historical classification and frozen verification evidence');
p.openEvent(event.id);p.recordTab.value='关联核查记录';nodes();p.openEventVerification();assert.equal(p.nav.value,'alarms');assert.equal(p.detail.value.id,fake.id);assert.equal(p.alarmDetailTab.value,'人工核查记录');nodes();p.backFromDetail();assert.equal(p.nav.value,'events');assert.equal(p.detail.value.id,event.id);assert.equal(p.recordTab.value,'关联核查记录');
p.handle([event.id]);nodes();p.reason.value='现场已消除异常';p.handlingResult.value='复测正常';p.submitHandle();assert.equal(event.state,'待处理');p.completionBasis.value='现场复测确认异常消除';p.submitHandle();assert.equal(event.state,'处理完成');assert.equal(event.records.length,1);assert.equal(event.records[0].measures,'现场已消除异常');p.submitHandle();assert.equal(event.records.length,1,'duplicate submit blocked');p.handle([event.id]);assert.notEqual(p.modal.value,'handle','completed event cannot be appended');
p.openEvent(event.id);nodes();
console.log('PASS direct event navigation, return to linked event, final submission and duplicate guard');
const concurrent=add(record('TEST-RACE'));p.alarmAction('true',[concurrent.id]);p.reason.value='真警';p.submitDecision();const raced=p.store.events.find(e=>e.alarmId===concurrent.id);p.handle([raced.id]);p.reason.value='处理';p.handlingResult.value='正常';p.completionBasis.value='确认';raced.state='处理完成';raced.records=[{state:'处理完成',time:'external',result:'他人处理'}];p.submitHandle();assert.equal(raced.records.length,1);assert.equal(raced.records[0].result,'他人处理');
console.log('PASS stale submission cannot overwrite another completion');
const saved=JSON.parse(local['duolun-platform-v1']);const reloaded=boot(saved);assert.equal(reloaded.p.store.events.find(e=>e.id===event.id).records.length,1);reloaded.p.openAlarm(fake.id);assert.equal(JSON.stringify(reloaded.p.verificationRobotRecords.value),snapshot);
saved.alarms.push(record('LEGACY-ALARM','核查中',{robotReviewHistory:[{id:'FC-LEGACY-ALARM',state:'已完成',items:[{value:'自动补入'}]}]}));
saved.events.push({id:'LEGACY-PENDING',state:'处理中',alarmId:fake.id,records:[{state:'处理中',result:'旧过程'}]},{id:'LEGACY-COMPLETE',state:'处理完成',alarmId:fake.id,records:[{state:'处理中',result:'旧过程'},{state:'处理完成',kind:'确认处理完成',result:'最终结果'},{state:'处理完成',kind:'补充记录',result:'旧补充'}]});
const migrated=boot(saved).p;assert.equal(migrated.store.alarms.find(a=>a.id==='LEGACY-ALARM').state,'待核查');migrated.openAlarm('LEGACY-ALARM');assert.equal(migrated.verificationRobotRecords.value.length,0);const pending=migrated.store.events.find(e=>e.id==='LEGACY-PENDING'),complete=migrated.store.events.find(e=>e.id==='LEGACY-COMPLETE');assert.equal(pending.state,'待处理');assert.equal(pending.records.length,0);assert.equal(pending.legacyProcessingRecords.length,1);assert.equal(complete.records.length,1);assert.equal(complete.records[0].result,'最终结果');assert.equal(complete.legacyProcessingRecords.length,3);
console.log('PASS persistence, old-state migration, legacy data preservation and final-record selection');
for(const text of ['关联监测与视频','开始核查','添加处理记录','补充记录','处理中','核查佐证</button>','>处理详情</button>','次记录'])assert(!template.includes(text),text+' must not remain in the interface');
assert(template.includes("['报警详情','机器人核查','人工核查记录']"));assert(template.includes("['处理记录','关联核查记录']"));
const failure=boot(),fp=failure.p;
fp.store.alarms.unshift(record('FAIL-SAVE'));
fp.alarmAction('true',['FAIL-SAVE']);fp.reason.value='确认真警';
const setItem=failure.ctx.localStorage.setItem;failure.ctx.localStorage.setItem=()=>{throw Error('quota')};
fp.submitDecision();assert.equal(fp.store.alarms.find(a=>a.id==='FAIL-SAVE').state,'待核查');assert(!fp.store.events.some(e=>e.alarmId==='FAIL-SAVE'));assert.equal(fp.modal.value,'decision');assert(failure.messages.at(-1).text.includes('保存失败'));
failure.ctx.localStorage.setItem=setItem;fp.submitDecision();const failEvent=fp.store.events.find(e=>e.alarmId==='FAIL-SAVE');fp.handle([failEvent.id]);fp.reason.value='现场处理';fp.handlingResult.value='已恢复';fp.completionBasis.value='复测正常';failure.ctx.localStorage.setItem=()=>{throw Error('quota')};fp.submitHandle();assert.equal(failEvent.state,'待处理');assert.equal(failEvent.records.length,0);assert.equal(fp.modal.value,'handle');failure.ctx.localStorage.setItem=setItem;fp.submitHandle();assert.equal(failEvent.state,'处理完成');assert.equal(failEvent.records.length,1);
console.log('PASS storage failures roll back decisions and processing, keep the form open and allow retry');
// Visible history operations must expose two buttons for true alarms and one for false alarms.
p.go('alarms');p.alarmTab.value='历史报警记录';p.keyword.value='TEST-ROBOT';
let historyNodes=nodes();const actions=historyNodes.find(n=>n.type==='div'&&n.props?.class==='row-actions');assert(actions);assert.equal(actions.children.filter(n=>n.type==='button').length,2);
p.keyword.value='TEST-EMPTY';historyNodes=nodes();const falseActions=historyNodes.find(n=>n.type==='div'&&n.props?.class==='row-actions');assert(falseActions);assert.equal(falseActions.children.filter(n=>n.type==='button').length,1);
p.openAlarm(fake.id);p.go('events');p.openAlarm(empty.id);assert.equal(p.returnToEvent.value,null);
console.log('PASS historical action counts and navigation context reset');
(async()=>{await p.updateEvidenceFiles([{name:'现场.png',file:{type:'image/png',data:'data:image/png;base64,AAAA'}}]);assert.equal(p.attachments.value[0].url,'data:image/png;base64,AAAA');assert.equal(p.attachmentsLoading.value,false);console.log('PASS evidence upload stores content for later viewing');console.log('ALL ALARM RECORD CHECKS PASSED (logic and VNode rendering; no browser visual check)');})().catch(e=>{console.error(e);process.exitCode=1});
