const fs=require('fs'),vm=require('vm'),assert=require('assert');
const c={console,Date,setTimeout,clearTimeout};vm.createContext(c);vm.runInContext(fs.readFileSync('assets/vue.global.prod.js','utf8'),c);vm.runInContext('const ProdEmptyState={};',c);vm.runInContext(fs.readFileSync('assets/inspection-analysis.js','utf8'),c);
c.document={createElement:()=>({set innerHTML(v){this.children=[{getAttribute:()=>v.slice(10,-2).replace(/&quot;/g,'"')}];this.textContent=v.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/&quot;/g,'\"')},textContent:''})};
vm.runInContext(`globalThis.directive=InspectionTrendWindow;globalThis.model=InspectionAnalysis.create({store:{tasks:[],alarms:[],events:[],inspectionPlans:[]},monitors:[],getDevices:()=>[],sectionName:'综合概览'});globalThis.compiled=Vue.compile(InspectionAnalysis.sectionComponent.template);`,c);
const today=new Date();const start=Date.parse(today.toISOString().slice(0,10)+'T00:00:00Z')-86400000*29;
const rows=Array.from({length:30},(_,i)=>({from:start+i*86400000,to:start+(i+1)*86400000-1}));const el={clientWidth:700,style:{},scrollLeft:0};c.directive.mounted(el,{value:rows});const step=(700-48)/7+8;assert(Math.abs(el.scrollLeft-23*step)<.01);
el.scrollLeft=step*4;c.directive.updated(el,{value:rows});assert(Math.abs(el.scrollLeft-step*4)<.01,'user scroll preserved');
el.clientWidth=560;c.directive.updated(el,{value:rows});assert(Math.abs(el.scrollLeft-4*((560-48)/7+8))<.01,'resize preserves position');
c.directive.updated(el,{value:rows.slice(-7)});assert(el.scrollLeft===0,'seven rows fit');
c.model.ui.range=[start-8*3600000,start-8*3600000+60*86400000-1];assert(c.model.trend.value.length===60,'daily records retained for long ranges');assert(c.model.trendTick(5),'all ticks visible');assert(typeof c.compiled==='function');c.directive.unmounted(el);assert(!el.__inspectionTrend);
console.log('PASS: seven-record viewport, latest-date positioning, preserved scrolling, resize, long-range daily buckets, template compilation, cleanup');

vm.runInContext('globalThis.chart=InspectionDistribution;Vue.compile(InspectionDistribution.template)',c);
const panel=c.Vue.reactive({title:'报警来源分布',items:[{name:'A',count:3},{name:'B',count:1}]});const chart=c.chart.setup({panel});assert(chart.kind.value==='pie');assert(chart.percent(3)==='75.0%');assert(chart.pie.value.includes('75%'));panel.title='所属部位报警分布';assert(chart.kind.value==='bar');panel.title='核查方式分布（演示）';assert(chart.kind.value==='bar');console.log('PASS: distribution template, pie proportions, requested chart types');
