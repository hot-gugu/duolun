/* 周期报表使用独立分析实例；快照与业务数据分开持久化。 */
const InspectionReports={
 create({store,monitors,allowedAlarm,openRecord,onReturn}){
 const {reactive,computed}=Vue,KEY='duolun-inspection-reports-v1',DAY=86400000;
 const date=t=>new Date(t+8*3600000).toISOString().slice(0,10),stamp=t=>new Date(t+8*3600000).toISOString().slice(0,19).replace('T',' '),parse=d=>Date.parse(d+'T00:00:00+08:00');
 const ui=reactive({reports:[],selected:null,drawer:false,type:null,area:null,status:null,keyword:'',range:null,page:1,size:10,tab:'tasks',detailPage:1,detailSize:20,error:'',returning:false});
 const form=reactive({type:'日报',day:Date.now()-DAY,area:null,sources:['机器人现场检测','OGI气云监测','视频AI'],name:'',origin:null,unit:'',highlights:'',problems:'',actions:'',coordination:'',includeDetails:false});
 const sources=['机器人现场检测','OGI气云监测','视频AI'],types=['日报','周报','月报'],opts=a=>a.map(x=>({label:x,value:x}));
 const areas=computed(()=>opts([...new Set(monitors.map(m=>m.tankArea).filter(Boolean))]));
 let damaged=false;try{const saved=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(saved))throw Error();ui.reports=saved.map(r=>r.status==='生成中'?{...r,status:'生成失败',error:'上次生成被中断，请重试'}:r)}catch{damaged=true;ui.error='本地报表记录无法读取，已暂停生成，请先检查浏览器存储。'}
 const period=()=>{let a=parse(date(form.day)),b;if(form.type==='周报'){const w=new Date(a+8*3600000).getUTCDay();a-=((w+6)%7)*DAY;b=a+7*DAY-1}else if(form.type==='月报'){const d=date(a);a=parse(d.slice(0,7)+'-01');const n=new Date(a+8*3600000);n.setUTCMonth(n.getUTCMonth()+1);b=Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),1)-8*3600000-1}else b=a+DAY-1;return[a,b]};
 const periodText=computed(()=>form.day?period().map(date).join(' 至 '):'请选择统计日期');
 const defaultName=computed(()=>`${form.area||'全部区域'}巡检${form.type}（${periodText.value}）`);
 const persist=()=>{localStorage.setItem(KEY,JSON.stringify(ui.reports));};
 const filtered=computed(()=>ui.reports.filter(r=>(!ui.type||r.type===ui.type)&&(!ui.area||r.area===ui.area)&&(!ui.status||r.status===ui.status)&&(!ui.keyword||r.name.includes(ui.keyword))&&(!ui.range||(r.from<=ui.range[1]+DAY-1&&r.to>=ui.range[0]))).sort((a,b)=>b.createdAt-a.createdAt));
 const paged=computed(()=>filtered.value.slice((ui.page-1)*ui.size,ui.page*ui.size)),current=computed(()=>ui.reports.find(r=>r.id===ui.selected));
 Vue.watch(()=>[ui.type,ui.area,ui.status,ui.keyword,ui.range,ui.size],()=>ui.page=1);
 const reset=()=>Object.assign(ui,{type:null,area:null,status:null,keyword:'',range:null,page:1});
 const openForm=r=>{Object.assign(form,r?{type:r.type,day:r.from,area:r.area,sources:[...r.sources],name:r.name,origin:r.id,...(r.editorial||{})}:{type:'日报',day:Date.now()-DAY,area:null,sources:[...sources],name:'',origin:null,unit:'',highlights:'',problems:'',actions:'',coordination:'',includeDetails:false});ui.drawer=true;if(!damaged)ui.error=''};
 const cleanRow=r=>({id:r.id,kind:r.kind,values:r.values.map(v=>v??'—'),target:{id:r.target?.id||r.id,planId:r.target?.planId}});
 const build=r=>{
  const scope=Vue.effectScope();try{return scope.run(()=>{
   const m=InspectionAnalysis.create({store,monitors,getDevices:()=>[],allowedAlarm,sectionName:'报表',now:()=>r.cutoff,openRecord:()=>{}});
   Object.assign(m.ui,{range:[r.from,Math.min(r.to,r.cutoff)],area:r.area});
   const robot=r.sources.includes(sources[0]);
   const ds=key=>{const d=m.dataset(key);return {headers:m.schemas[d.schema],rows:d.rows.map(cleanRow)}};
   const task=ds('planned'),instant=ds('instant'),coverage=ds('coverage');
   if(!robot){task.rows=[];instant.rows=[];coverage.rows=[]}
   const alarm=ds('alarms');alarm.rows=alarm.rows.filter(x=>r.sources.includes(x.values[6]));
   // 事件按自身编号去重，依关联报警的区域和来源过滤；不受新增报警时间限制。
   const alarms=new Map(store.alarms.map(a=>[a.id,a]));
   const eventRows=[...new Map(store.events.map(e=>[e.id,e])).values()].flatMap(e=>{
    const a=e.alarmSnapshot||alarms.get(e.alarmId)||{},live=alarms.get(e.alarmId)||a;if(!allowedAlarm(live)||live.state==='已判误报')return[];
    const source=/气云|OGI/.test(a.source||'')?sources[1]:/视频|摄像头/.test(a.source||'')?sources[2]:/机器人/.test(a.source||'')?sources[0]:a.source;
    const obj=monitors.find(x=>x.id===a.monitor)||{},snap=a.closureContext||a.objectSnapshot||a.monitorSnapshot||{},area=a.tankArea||snap.tankArea||obj.tankArea;
    if(!r.sources.includes(source)||(r.area&&area!==r.area))return[];
    const start=m.time(e.createdAt||e.assignment?.time),finish=m.time(e.completedAt||(e.records||[]).find(x=>x.state==='处理完成')?.time),end=Math.min(r.to,r.cutoff);
    if(!Number.isFinite(start)||start>end)return[];
    const done=Number.isFinite(finish)&&finish<=end,unknown=e.state==='处理完成'&&!Number.isFinite(finish);
    const state=unknown?'完成时间缺失':done?'处理完成':'待处理';
    return[{id:e.id,kind:'event',target:{id:e.id},start,finish,done,unknown,values:[e.id,e.alarmId||'—',a.monitorName||obj.name||'—',area||'待确认',state,e.owner||e.assignment?.owner||'—',e.createdAt||e.assignment?.time||'—',done?stamp(finish):'—']}];
   });
   const end=Math.min(r.to,r.cutoff),opening=eventRows.filter(x=>x.start<r.from&&(!Number.isFinite(x.finish)||x.finish>=r.from)&&!x.unknown),added=eventRows.filter(x=>x.start>=r.from),closed=eventRows.filter(x=>x.done&&x.finish>=r.from),pending=eventRows.filter(x=>!x.done&&!x.unknown),unknown=eventRows.filter(x=>x.unknown);
   const complete=task.rows.filter(x=>x.values[10]==='执行完成').length,pct=(a,b)=>b?(a/b*100).toFixed(1)+'%':'—';
   const summary={planned:task.rows.length,completed:complete,incomplete:task.rows.length-complete,completion:pct(complete,task.rows.length),instant:instant.rows.length,coverage:robot&&m.coverage.value.unknown===0?pct(coverage.rows.filter(x=>x.values[6]==='有效结果').length,coverage.rows.length):'—',alarms:alarm.rows.length,true:alarm.rows.filter(x=>x.values[10]==='已判真警').length,false:alarm.rows.filter(x=>x.values[10]==='已判误报').length,unverified:alarm.rows.filter(x=>!['已判真警','已判误报'].includes(x.values[10])).length,opening:opening.length,added:added.length,closed:closed.length,pending:pending.length,unknown:unknown.length};
   const eh=['处理事件编号','关联报警编号','巡查对象','所属区域','截止时状态','处理人','创建时间','完成时间'];
   const tables={tasks:{title:'计划执行明细',...task},instant:{title:'即时任务明细',...instant},coverage:{title:'采集结果明细',...coverage},alarms:{title:'报警核查明细',...alarm},events:{title:'本期新增事件',headers:eh,rows:added},pending:{title:'期末遗留事项',headers:eh,rows:pending},closed:{title:'本期完成事件',headers:eh,rows:closed},unknown:{title:'时间待补全事件',headers:eh,rows:unknown}};
   return JSON.parse(JSON.stringify({summary,tables,sourceStats:r.sources.map(source=>({source,total:alarm.rows.filter(x=>x.values[6]===source).length,true:alarm.rows.filter(x=>x.values[6]===source&&x.values[10]==='已判真警').length})),end}));
  })}finally{scope.stop()}
 };
 const generate=async existing=>{
  if(damaged)return;if(!existing&&(!form.day||!form.sources.length)){ui.error='请选择统计日期和至少一个数据来源';return}
  const range=existing?[existing.from,existing.to]:period();if(range[0]>Date.now()){ui.error='不能生成尚未开始的统计周期';return}
  const now=Date.now(),origin=existing||ui.reports.find(x=>x.id===form.origin),family=origin?.family||'IR-'+now+'-'+Math.random().toString(36).slice(2,7);
  const r=existing||reactive({id:'R-'+now+'-'+Math.random().toString(36).slice(2,7),family,version:Math.max(0,...ui.reports.filter(x=>x.family===family).map(x=>x.version))+1,name:form.name.trim()||defaultName.value,type:form.type,from:range[0],to:range[1],area:form.area,sources:[...form.sources],createdAt:now,method:'手动生成',editorial:{unit:form.unit.trim(),highlights:form.highlights.trim(),problems:form.problems.trim(),actions:form.actions.trim(),coordination:form.coordination.trim(),includeDetails:form.includeDetails}});
  r.status='生成中';r.cutoff=now;r.error='';if(!existing)ui.reports.unshift(r);
  try{persist()}catch{if(!existing)ui.reports=ui.reports.filter(x=>x.id!==r.id);r.status='生成失败';ui.error='报表无法保存，请检查浏览器存储空间';return}
  ui.drawer=false;ui.selected=null;await new Promise(resolve=>setTimeout(resolve,80));
  try{const data=build(r);Object.assign(r,data,{status:'已生成'});persist()}catch(e){r.status='生成失败';r.error='生成或保存失败，请检查存储空间后重试';try{persist()}catch{}ui.error=r.error}
 };
 const show=r=>{ui.selected=r.id;ui.tab='tasks';ui.detailPage=1;ui.returning=false};
 const table=computed(()=>current.value?.tables?.[ui.tab]),detailRows=computed(()=>table.value?.rows.slice((ui.detailPage-1)*ui.detailSize,ui.detailPage*ui.detailSize)||[]);
 Vue.watch(()=>[ui.tab,ui.detailSize],()=>ui.detailPage=1);
 const visit=row=>{if(row.kind==='schedule'){ui.error='该批次尚未生成任务，请在计划管理中查看';return}const source=row.kind==='task'?store.tasks:row.kind==='alarm'?store.alarms:store.events;if(!source.some(x=>x.id===row.target.id)){ui.error='原始记录已不存在，报表快照仍保留';return}ui.returning=true;openRecord(row.kind,row.target)};
 const restore=()=>{ui.returning=false;onReturn()};
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const metricLabels={planned:'应执行任务',completed:'执行完成',incomplete:'未完成任务',completion:'任务完成率',instant:'即时任务',coverage:'有效采集覆盖率',alarms:'新增报警',true:'已判真警',false:'已判误报',unverified:'待核查',opening:'期初未完成',added:'本期新增事件',closed:'本期完成事件',pending:'期末未完成',unknown:'完成时间待补全'};
 const sheets=r=>[{title:'报表概况',headers:['项目','内容'],rows:[['报表名称',r.name],['统计周期',date(r.from)+' 至 '+date(r.to)],['统计范围',r.area||'全部区域'],['数据来源',r.sources.join('、')],['数据截止',stamp(r.cutoff)],['生成时间',stamp(r.createdAt)],['版本','V'+r.version],...Object.entries(r.summary).map(([k,v])=>[metricLabels[k],v])]},...Object.values(r.tables).map(t=>({title:t.title,headers:t.headers,rows:t.rows.map(x=>x.values)}))];
 const download=(content,type,name)=>{const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name.replace(/[\\/:*?"<>|]/g,'_');a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 // 无外部依赖的 OOXML 工作簿，所有业务值使用文本单元格，避免公式注入。
 const excel=r=>{
  const list=sheets(r),ns='http://schemas.openxmlformats.org/spreadsheetml/2006/main',files={};
  files['[Content_Types].xml']='<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+list.map((_,i)=>'<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join('')+'</Types>';
  files['_rels/.rels']='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
  files['xl/workbook.xml']='<workbook xmlns="'+ns+'" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+list.map((t,i)=>'<sheet name="'+esc(t.title)+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>').join('')+'</sheets></workbook>';
  files['xl/_rels/workbook.xml.rels']='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+list.map((_,i)=>'<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>').join('')+'</Relationships>';
  const col=n=>{let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s};
  list.forEach((t,i)=>files['xl/worksheets/sheet'+(i+1)+'.xml']='<worksheet xmlns="'+ns+'"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="'+t.headers.length+'" width="24" customWidth="1"/></cols><sheetData>'+[t.headers,...t.rows].map((row,j)=>'<row r="'+(j+1)+'">'+row.map((v,k)=>'<c r="'+col(k)+(j+1)+'" t="inlineStr"><is><t xml:space="preserve">'+esc(String(v??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,''))+'</t></is></c>').join('')+'</row>').join('')+'</sheetData></worksheet>');
  download(packXml(files),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',r.name+'-V'+r.version+'.xlsx');
 };
 const packXml=files=>{
  const encoder=new TextEncoder(),chunks=[],central=[];let offset=0;
  const header=(size,fields)=>{const b=new Uint8Array(size),v=new DataView(b.buffer);fields.forEach(([at,n,width])=>width===2?v.setUint16(at,n,true):v.setUint32(at,n,true));return b};
  const crc=bytes=>{let c=0xffffffff;for(const b of bytes){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0};
  for(const [name,value] of Object.entries(files)){const n=encoder.encode(name),b=encoder.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+value),c=crc(b);const h=header(30,[[0,0x04034b50,4],[4,20,2],[6,0x800,2],[14,c,4],[18,b.length,4],[22,b.length,4],[26,n.length,2]]);chunks.push(h,n,b);central.push(header(46,[[0,0x02014b50,4],[4,20,2],[6,20,2],[8,0x800,2],[16,c,4],[20,b.length,4],[24,b.length,4],[28,n.length,2],[42,offset,4]]),n);offset+=h.length+n.length+b.length}
  const size=central.reduce((n,b)=>n+b.length,0),end=header(22,[[0,0x06054b50,4],[8,Object.keys(files).length,2],[10,Object.keys(files).length,2],[12,size,4],[16,offset,4]]);
  return new Blob([...chunks,...central,end]);
 };
 const word=r=>{
  const text=(value,size=20,color='24344D')=>'<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei"/><w:color w:val="'+color+'"/><w:sz w:val="'+size+'"/></w:rPr><w:t xml:space="preserve">'+esc(String(value??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,''))+'</w:t></w:r>';
  const para=(value,size=20)=>'<w:p><w:pPr><w:spacing w:after="120"/></w:pPr>'+text(value,size)+'</w:p>';
  const e=r.editorial||{},v=r.summary,robot=r.sources.includes(sources[0]);
  const heading=t=>'<w:p><w:pPr><w:keepNext/><w:spacing w:before="260" w:after="140"/></w:pPr>'+text(t,28,'000000')+'</w:p>';
  const paragraphs=t=>String(t||'').split(/\r?\n/).filter(x=>x.trim()).map(x=>para(x,24)).join('');
  const pct=v.completion==='—'?'暂无可计算的计划任务完成率':'计划任务完成率为'+v.completion;
  const overview='本期围绕'+(r.area||'全部区域')+'开展智能巡检，纳入统计的监测方式包括'+r.sources.join('、')+'。'+(robot?'计划应执行巡检'+v.planned+'次，已完成'+v.completed+'次，'+pct+'；另开展即时任务'+v.instant+'次。':'本期所选范围不包含机器人任务，未统计任务执行次数。')+'本期新增报警'+v.alarms+'条，其中已判真警'+v.true+'条、已判误报'+v.false+'条、待核查'+v.unverified+'条。期末未完成处理事项'+v.pending+'项。';
  const work=(robot?'机器人巡检方面，本期已完成计划任务'+v.completed+'次，未完成'+v.incomplete+'次。':'')+r.sourceStats.map(x=>x.source+'纳入的新增报警共'+x.total+'条，其中已确认真警'+x.true+'条。').join('')+'上述数量反映已纳入平台记录的结果，不代表全部设备在线或监测数据完整。';
  const rows=r.tables.alarms.rows,group=(at)=>{const counts=new Map();rows.forEach(x=>{const k=x.values[at]||'待确认';counts.set(k,(counts.get(k)||0)+1)});return [...counts].sort((a,b)=>b[1]-a[1]).slice(0,3).map(([name,n])=>name+'（'+n+'条）').join('、')};
  const abnormal=(v.alarms?'从新增报警分布看，涉及区域主要包括'+group(3)+'；报警类型主要包括'+group(5)+'。':'本期纳入统计的新增报警为0条。')+'核查方面，已判真警'+v.true+'条，已判误报'+v.false+'条，尚有'+v.unverified+'条待核查。处置方面，期初未完成'+v.opening+'项，本期新增'+v.added+'项，本期完成'+v.closed+'项，期末未完成'+v.pending+'项。'+(v.unknown?'另有'+v.unknown+'项事件缺少完成时间，已单列，未计入期初、本期完成及期末数量。':'');
  const concerns=[];if(robot&&v.incomplete)concerns.push('本期仍有'+v.incomplete+'次计划巡检未完成，需逐项核实执行状态及未完成原因。');if(v.unverified)concerns.push('尚有'+v.unverified+'条报警待核查，相关异常性质尚不能确定。');if(v.pending)concerns.push('期末'+v.pending+'项处理事项尚未完成，需持续跟踪处置进展。');if(v.unknown)concerns.push('部分处理事件缺少完成时间，影响跨期处置统计的完整性。');if(!concerns.length)concerns.push('按本期纳入的记录，未见'+(robot?'未完成计划任务、':'')+'待核查报警及未完成处理事项；该结果仅反映本报告的统计范围。');
  const table=(headers,data)=>{const width=9360,col=Math.floor(width/headers.length),row=(values,head=false)=>'<w:tr><w:trPr>'+(head?'<w:tblHeader/>':'')+'</w:trPr>'+values.map(x=>'<w:tc><w:tcPr><w:tcW w:w="'+col+'" w:type="dxa"/>'+(head?'<w:shd w:fill="EEF6FF"/>':'')+'</w:tcPr>'+para(x,20)+'</w:tc>').join('')+'</w:tr>';return '<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(x=>'<w:'+x+' w:val="single" w:sz="4" w:color="D8E5F4"/>').join('')+'</w:tblBorders><w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+headers.map(()=>'<w:gridCol w:w="'+col+'"/>').join('')+'</w:tblGrid>'+row(headers,true)+data.map(x=>row(x)).join('')+'</w:tbl>'+para('')};
  const metrics=[['计划应执行 / 已完成',robot?v.planned+'次 / '+v.completed+'次':'未纳入'],['计划任务完成率',robot?v.completion:'未纳入'],['新增报警 / 待核查',v.alarms+'条 / '+v.unverified+'条'],['本期完成 / 期末未完成',v.closed+'项 / '+v.pending+'项']];
  let body=para(r.name,36)+para('统计周期：'+date(r.from)+' 至 '+date(r.to),22)+para('数据截止：'+stamp(r.cutoff),20)+heading('一、总体情况')+paragraphs(overview)+heading('二、主要工作开展情况')+paragraphs(work)+table(['核心指标','本期情况'],metrics)+heading('三、异常发现与处置情况')+paragraphs(abnormal)+heading('四、存在问题与风险')+concerns.map(x=>paragraphs(x)).join('')+para('统计说明：任务、报警与处理事件分别计数，报警条数不等于隐患数量。核查结论取报表生成时的记录，事件处置按已记录时间归期；无报警不能单独据此判定现场安全。',20);
  {body+='<w:p><w:r><w:br w:type="page"/></w:r></w:p>'+heading('附件：巡检及异常处理明细');
   const demoDay=date(r.from),demoArea=r.area||'演示罐区';
   const demoAlarms=[
    ['DEMO-A001','演示储罐A','DEMO-M001',demoArea,'演示部位A','温度异常','机器人现场检测','二级','—',demoDay+' 09:10:00','已判真警','人工现场核查',demoDay+' 09:25:00'],
    ['DEMO-A002','演示管线B','DEMO-M002',demoArea,'演示部位B','疑似气体泄漏','OGI气云监测','二级','—',demoDay+' 10:20:00','待核查','待核查','—'],
    ['DEMO-A003','演示作业区C','DEMO-M003',demoArea,'演示部位C','人员违规进入','视频AI','三级','—',demoDay+' 11:05:00','已判误报','视频核查',demoDay+' 11:18:00']
   ];
   const demoEvents=[
    ['DEMO-E001','DEMO-A001','演示储罐A',demoArea,'处理完成','演示处理人甲',demoDay+' 09:30:00',demoDay+' 14:00:00'],
    ['DEMO-E002','DEMO-A004','演示设备D',demoArea,'待处理','演示处理人乙',demoDay+' 13:20:00','—']
   ];
   const append=(title,key,fallback,columns)=>{const data=r.tables[key];body+=heading(title);const records=data?.rows.length?data.rows:fallback?.map(values=>({id:values[0],values}));if(!records?.length){body+=para('暂无相关记录。');return}if(!data?.rows.length)body+=para('以下为演示数据，仅用于展示附件内容和排版，不代表现场记录，不计入正文统计。',20);const selected=columns||data.headers.map((label,index)=>({label,index}));body+=table(selected.map(c=>c.label),records.map(record=>selected.map(c=>record.values[c.index]??'—')))};
   body+=heading('附件二：即时任务明细');
   const instantRows=r.tables.instant?.rows||[];
   body+=instantRows.length?table(['任务名称','执行机器人','实际开始时间','实际结束时间','任务状态','有效结果对象数'],instantRows.map(x=>[1,3,8,9,10,12].map(i=>x.values[i]??'—'))):para('暂无相关记录。');
   append('附件三：报警核查明细','alarms',demoAlarms,[{label:'巡查对象名称',index:1},{label:'报警名称',index:5},{label:'报警来源',index:6},{label:'报警等级',index:7},{label:'报警档位',index:8},{label:'发生时间',index:9},{label:'核查状态',index:10},{label:'核查方式',index:11},{label:'判定时间',index:12}]);
   append('附件四：本期新增事件','events',demoEvents);
  }
  const files={
   '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
   '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
   'word/document.xml':'<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+body+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1273" w:bottom="1000" w:left="1273" w:header="400" w:footer="400"/></w:sectPr></w:body></w:document>'
  };download(packXml(files),'application/vnd.openxmlformats-officedocument.wordprocessingml.document',r.name+'.docx');
 };
 const pdf=r=>{const w=window.open('','_blank');if(!w){ui.error='请允许打开打印窗口后重试';return}w.document.write('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>'+esc(r.name)+'</title><style>@page{size:A4 landscape;margin:14mm}body{font:12px Microsoft YaHei,sans-serif;color:#24344d}h1{font-size:20px;font-weight:400}h2{font-size:16px;font-weight:400;margin-top:28px}table{width:100%;border-collapse:collapse;font-size:10px;table-layout:fixed}td,th{border:1px solid #d8e5f4;padding:6px;overflow-wrap:anywhere;text-align:left}th{background:#eef6ff;font-weight:400}thead{display:table-header-group}tr{break-inside:avoid}section{break-before:page}section:first-of-type{break-before:auto}</style><h1>'+esc(r.name)+' · V'+r.version+'</h1>'+sheets(r).map(t=>'<section><h2>'+esc(t.title)+'</h2><table><thead><tr>'+t.headers.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+t.rows.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></section>').join('')+'</html>');w.document.close();w.focus();setTimeout(()=>w.print(),300)};
 return {ui,form,areas,sources,types,opts,periodText,defaultName,filtered,paged,current,reset,openForm,generate,show,table,detailRows,visit,restore,word,excel,pdf,date,stamp,metricLabels};
 },
 component:{props:['model'],components:{ProdEmptyState},setup(p){return p.model},template:`
 <section class="ir-page" aria-label="巡检报表">
 <template v-if="!current"><header class="ir-head"><h1>巡检报表</h1><button class="primary" @click="openForm()">生成报表</button></header>
 <div class="ir-filters"><label>报表类型<n-select v-model:value="ui.type" :options="opts(types)" clearable placeholder="全部类型" to="body"/></label><label>统计日期<n-date-picker v-model:value="ui.range" type="daterange" clearable to="body"/></label><label>统计范围<n-select v-model:value="ui.area" :options="areas" clearable placeholder="全部区域" to="body"/></label><label>生成状态<n-select v-model:value="ui.status" :options="opts(['已生成','生成中','生成失败'])" clearable placeholder="全部状态" to="body"/></label><label>报表名称<n-input v-model:value="ui.keyword" clearable placeholder="搜索报表名称"/></label><button class="soft" @click="reset">重置</button></div>
 <div class="ir-list"><table v-if="paged.length"><thead><tr><th>报表名称</th><th>类型</th><th>统计周期</th><th>统计范围</th><th>生成时间</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-for="r in paged" :key="r.id"><td><button v-if="r.status==='已生成'" class="ir-name" @click="show(r)">{{r.name}}</button><span v-else>{{r.name}}</span></td><td>{{r.type}}</td><td>{{date(r.from)}} 至 {{date(r.to)}}</td><td>{{r.area||'全部区域'}}</td><td>{{stamp(r.createdAt)}}</td><td><span class="ir-status" :class="{failed:r.status==='生成失败',pending:r.status==='生成中'}">{{r.status}}</span></td><td><div v-if="r.status==='已生成'" class="ir-actions"><button class="ir-link" @click="word(r)">导出 Word</button></div><button v-else-if="r.status==='生成失败'" class="ir-link" @click="generate(r)">重试</button><div v-if="r.error" class="ir-error">{{r.error}}</div></td></tr></tbody></table><prod-empty-state v-else :text="ui.reports.length?'暂无符合条件的报表':'暂无巡检报表'" :description="ui.reports.length?'调整筛选条件后查看':'点击生成报表，创建日报、周报或月报'"/></div>
 <footer class="ir-pagination"><span>共 {{filtered.length}} 份报表</span><n-pagination v-model:page="ui.page" v-model:page-size="ui.size" :item-count="filtered.length" :page-sizes="[10,20,50]" show-size-picker/></footer></template>
 <template v-else><header class="ir-head"><div><h1>{{current.name}} <span class="ir-status">V{{current.version}}</span></h1><div class="ir-meta">{{date(current.from)}} 至 {{date(current.to)}}　·　{{current.area||'全部区域'}}　·　数据截止 {{stamp(current.cutoff)}}<br>生成时间 {{stamp(current.createdAt)}}　·　{{current.sources.join(' / ')}}</div></div><div class="ir-actions"><button class="soft" @click="ui.selected=null">返回列表</button><button class="soft" @click="openForm(current)">生成新版本</button><button class="primary" @click="word(current)">导出 Word</button></div></header>
 <div class="ir-paper"><section class="ir-section"><h2>巡检执行</h2><div class="ir-metrics"><div class="ir-metric" v-for="key in ['planned','completed','completion','coverage']" :key="key"><span>{{metricLabels[key]}}</span><strong>{{current.summary[key]}}</strong></div></div><p class="ir-meta">未完成任务 {{current.summary.incomplete}} 次　·　即时任务 {{current.summary.instant}} 次</p></section>
 <section class="ir-section"><h2>监测与异常</h2><div class="ir-sources"><article v-for="s in current.sourceStats" class="ir-source"><div>{{s.source}}</div><div>新增报警 <b>{{s.total}}</b> 条　·　已判真警 <b>{{s.true}}</b> 条</div></article></div></section>
 <section class="ir-section"><h2>报警核查</h2><div class="ir-metrics"><div v-for="key in ['alarms','true','false','unverified']" class="ir-metric"><span>{{metricLabels[key]}}</span><strong>{{current.summary[key]}}</strong></div></div></section>
 <section class="ir-section"><h2>处置与遗留事项</h2><div class="ir-metrics"><div v-for="key in ['opening','added','closed','pending']" class="ir-metric"><span>{{metricLabels[key]}}</span><strong>{{current.summary[key]}}</strong></div></div><p v-if="current.summary.unknown" class="ir-error">{{current.summary.unknown}} 条事件缺少完成时间，单列于“时间待补全事件”，未计入期初、完成和期末数量。</p></section>
 <section class="ir-section"><h2>明细附件</h2><div class="ir-tabs"><button class="soft" v-for="(t,key) in current.tables" :class="{active:ui.tab===key}" @click="ui.tab=key">{{t.title}} {{t.rows.length}}</button></div><div class="ir-table"><table v-if="table.rows.length"><thead><tr><th v-for="h in table.headers">{{h}}</th><th>操作</th></tr></thead><tbody><tr v-for="(row,i) in detailRows" :key="row.id+'-'+i"><td v-for="v in row.values">{{v}}</td><td><button class="ir-link" @click="visit(row)">原始记录</button></td></tr></tbody></table><prod-empty-state v-else text="暂无相关记录"/></div><footer class="ir-pagination"><span>共 {{table.rows.length}} 条</span><n-pagination v-model:page="ui.detailPage" v-model:page-size="ui.detailSize" :item-count="table.rows.length" :page-sizes="[20,50,100]" show-size-picker/></footer></section></div></template>
 <div v-if="ui.error" class="ir-error" role="alert">{{ui.error}}</div>
 <n-drawer v-model:show="ui.drawer" :width="520" placement="right"><n-drawer-content :title="form.origin?'生成新版本':'生成巡检报表'" closable :native-scrollbar="false"><div class="ir-drawer-form"><label>报表类型<n-select v-model:value="form.type" :options="opts(types)" to="body"/></label><label>统计日期<n-date-picker v-model:value="form.day" :type="form.type==='月报'?'month':'date'" to="body"/><span class="ir-period">{{periodText}}</span></label><label>统计范围<n-select v-model:value="form.area" :options="areas" clearable placeholder="全部区域" to="body"/></label><label>数据来源<n-checkbox-group v-model:value="form.sources"><n-space vertical><n-checkbox v-for="source in sources" :key="source" :value="source" :label="source"/></n-space></n-checkbox-group></label><label>报表名称<n-input v-model:value="form.name" :maxlength="100" :placeholder="defaultName"/></label><div v-if="ui.error" class="ir-error" role="alert">{{ui.error}}</div></div><template #footer><div class="ir-actions"><button class="soft" @click="ui.drawer=false">取消</button><button class="primary" @click="generate()">生成报表</button></div></template></n-drawer-content></n-drawer>
 </section>`}
};
