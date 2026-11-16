const fs=require('fs'),vm=require('vm');
const suite=fs.readFileSync('outputs/alarm-records-20261109/verify.cjs','utf8');
const harness=suite.slice(0,suite.indexOf('const {p,local,nodes,template,messages}=boot();'));
vm.runInNewContext(harness+`
const b=boot(),p=b.p,minute=60000,day=24*60*minute;
const a=p.store.alarms.find(a=>a.source==='DCS'&&a.prototype);
assert(a);p.openAlarm(a.id);
const at=Date.parse(a.time.replace(' ','T')+'+08:00');
assert.equal(p.trendRange.value[1]-p.trendRange.value[0],10*minute);
assert.equal(p.trendRange.value[1],at);
const curve=p.processTrend(a);assert(curve&&curve.points.length>=401);
assert(!/NaN|Infinity/.test(curve.path));
assert(Math.abs(curve.points.at(-1).value-Number(a.value))<1e-9);
let turns=0,previous=0;
for(let i=1;i<curve.points.length;i++){const direction=Math.sign(curve.points[i].value-curve.points[i-1].value);if(previous&&direction&&previous!==direction)turns++;if(direction)previous=direction;}
assert(turns>=4,'default sine curve must have multiple peaks and valleys');
b.nodes();
p.trendDraft.value=[at-7*day,at];p.queryProcessRange();assert.equal(p.trendRange.value[1]-p.trendRange.value[0],7*day);assert(p.processTrend(a).labels.some(l=>l.text.includes('-')));b.nodes();
const valid=JSON.stringify(p.trendRange.value);
for(const range of [[at-7*day-1,at],[at,at],[at+minute,at],[NaN,at],null]){p.trendDraft.value=range;p.queryProcessRange();assert.equal(JSON.stringify(p.trendRange.value),valid,'invalid range must preserve current chart');}
assert(b.messages.some(m=>m.text.includes('最多查询7天')));
p.resetProcessRange(a);assert.equal(p.trendRange.value[1]-p.trendRange.value[0],10*minute);
const plain={...a,id:'REAL-SAMPLES',prototype:false,demoEvidence:false,demoHistory:[{time:a.time,value:1.234}]};assert.equal(p.processTrend(plain).points.length,1);assert.equal(p.processTrend(plain).points[0].value,1.234,'supplied samples cannot be rewritten into a sine wave');
assert.equal(p.processTrend({...plain,demoHistory:[]}),null);
const gas=p.store.alarms.find(a=>a.source==='气云设备'&&a.demoEvidence&&a.lightTriggerValue);if(gas){p.openAlarm(gas.id);p.ogiTrendMetric.value='光强';const light=p.processTrend(p.ogiTrendAlarm(gas));assert(light&&!/NaN|Infinity/.test(light.path));b.nodes();}
console.log('PASS 10-minute alarm-time default, sine peaks/valleys, exact 7-day boundary, over-limit/invalid inputs, reset, multi-day labels, unchanged supplied samples and template rendering.');
`,{require,console,setTimeout,clearTimeout,setInterval,clearInterval});
