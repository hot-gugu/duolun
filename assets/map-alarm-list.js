/* Map list uses the same business-alarm presentation contract as platform popups. */
(()=>{
const style=document.createElement('style');style.textContent=`
.alarms{display:flex;flex-direction:column;min-height:0;overflow:hidden}
#alarms{display:block!important;overflow-y:auto;min-height:0;flex:1;padding:0 10px}
#alarms .alarm{display:block;height:auto;min-height:min-content;overflow:hidden;flex:none;padding:12px 0;margin:0;border:0;border-bottom:1px solid rgba(139,219,239,.24);border-radius:0;background:transparent}
#alarms .map-alarm-heading{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
#alarms h3{margin:0;color:#e4f5ff;font-size:16px;line-height:1.5;font-weight:600;flex:1;min-width:0;overflow-wrap:anywhere}
#alarms .map-alarm-level{flex:none;font-size:12px;line-height:22px;padding:0 6px;border-radius:4px;color:var(--alarm-tone);background:rgba(255,255,255,.07)}
#alarms dl{margin:0;display:grid;gap:5px;font-size:12px;line-height:1.5}
#alarms dl div{display:grid;grid-template-columns:72px minmax(0,1fr);gap:6px}
#alarms dt{color:#9cb9ca}#alarms dd{margin:0;color:#d7e8f1;overflow-wrap:anywhere}
#alarms dd.map-alarm-band{color:var(--alarm-tone)}
#alarms .alarm-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
#alarms .alarm-actions .button{flex:1 1 auto;justify-content:center;font-size:12px;min-height:30px;padding:4px 7px}
.map-alarm-empty{padding:20px 4px;color:#a9c4d5;text-align:center;font-size:12px}`;document.head.append(style);
let selectedAlarmId=null,currentRows=[],currentSaved=null;
const pointButtons=()=>Array.from(document.querySelectorAll('#scene > button.hotspot')).filter(b=>/^[A-D]-0[1-3] 巡检点$/.test(b.getAttribute('aria-label')||''));
function pointFor(a){
 const monitor=(currentSaved?.monitorRecords||[]).find(m=>m.id===a.monitor);
 const tokens=[a.pointId,a.pointName,a.patrolPointId,a.patrolPointName,a.monitorName,a.id,monitor?.pointId,monitor?.pointName,monitor?.name];
 for(const value of tokens){const match=String(value||'').match(/(?:^|[^A-Z0-9])([A-D]-0[1-3])(?:$|[^0-9])/);if(match)return match[1];}
 // The map's existing A-02 abnormal demonstration is the A-tank pressure alarm.
 if(/PI414007A/i.test(String(a.monitorName||'')+' '+String(monitor?.name||'')))return 'A-02';
 return null;
}
function pressureSeverity(tag,rows,saved){
 const rank={'一级':1,'二级':2,'三级':3};let severity=null;
 for(const alarm of rows){
  if(alarm.alarmState==='RECOVERED'||alarm.state==='已判误报')continue;
  const record=(saved?.monitorRecords||[]).find(m=>m.id===alarm.monitor);
  const names=[alarm.monitorName,alarm.monitorTag,alarm.tag,alarm.id,record?.name,record?.tag,record?.code];
  if(!names.some(name=>String(name||'').toUpperCase()===tag.toUpperCase()))continue;
  const level=AlertRecordRules.level(alarm,record);const next=rank[level];if(next&&(!severity||next<severity))severity=next;
 }
 return severity;
}
function syncPressureColors(){
 document.querySelectorAll('[data-pressure-tag]').forEach(value=>{
  const severity=pressureSeverity(value.dataset.pressureTag,currentRows,currentSaved);
  value.classList.remove('pressure-level-1','pressure-level-2','pressure-level-3');
  if(severity){value.classList.add('pressure-level-'+severity);value.setAttribute('aria-label',value.textContent+'，'+['','一级报警','二级报警','三级报警'][severity]);value.title=['','一级报警','二级报警','三级报警'][severity];}
  else{value.removeAttribute('aria-label');value.removeAttribute('title');}
 });
}
function syncSelection(scroll){
 const active=currentRows.find(a=>String(a.id)===String(selectedAlarmId));const selectedPoint=active?pointFor(active):null;
 document.querySelectorAll('#alarms [data-alarm-id]').forEach(card=>{const selected=card.dataset.alarmId===String(selectedAlarmId);card.classList.toggle('is-map-selected',selected);card.setAttribute('aria-current',String(selected));if(selected&&scroll)card.scrollIntoView({block:'nearest',behavior:'smooth'});});
 pointButtons().forEach(button=>{const id=button.getAttribute('aria-label').split(' ')[0];const abnormal=id==='A-02'||currentRows.some(a=>pointFor(a)===id&&a.alarmState!=='RECOVERED');button.classList.toggle('is-alarm-abnormal',abnormal);button.classList.toggle('is-alarm-selected',id===selectedPoint);button.setAttribute('aria-pressed',String(id===selectedPoint));});
}
function selectAlarm(id,scroll=false){selectedAlarmId=id;syncSelection(scroll);}
// Capture before the map's non-interactive hotspot guard; never open a point dialog.
const scene=document.getElementById('scene');
scene.addEventListener('click',event=>{const button=event.target.closest('button.hotspot');if(!button)return;const id=(button.getAttribute('aria-label')||'').match(/^([A-D]-0[1-3]) 巡检点$/)?.[1];if(!id)return;const linked=currentRows.filter(a=>pointFor(a)===id);if(!linked.length)return;event.preventDefault();event.stopImmediatePropagation();selectAlarm((linked.find(a=>a.alarmState!=='RECOVERED')||linked[0]).id,true);},true);
const linkedStyle=document.createElement('style');linkedStyle.textContent=`
.tank-c-tip-row span.pressure-level-1{color:#ff6274}
.tank-c-tip-row span.pressure-level-2{color:#ffca70}
.tank-c-tip-row span.pressure-level-3{color:#71baff}
#alarms .alarm{cursor:pointer}
#alarms .alarm.is-map-selected{background:rgba(8,121,255,.2);box-shadow:inset 3px 0 #45caff,inset 0 0 0 1px #45caff;border-radius:6px;padding-left:8px;padding-right:8px}
#scene .hotspot.is-alarm-abnormal{background:rgba(239,47,79,.12);border:1px solid rgba(255,86,106,.75);border-radius:10px;cursor:pointer}
#scene .hotspot.is-alarm-selected,#scene .hotspot.is-alarm-selected:hover{outline:2px solid #78e5ff;outline-offset:3px;box-shadow:0 0 14px rgba(69,202,255,.8);background:rgba(8,121,255,.2)}
#scene .hotspot.is-alarm-abnormal.is-alarm-selected{border:2px solid #ff526b;background:rgba(239,47,79,.2)}
`;document.head.append(linkedStyle);
const esc=v=>String(v??'未提供').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
let saved=null;try{saved=JSON.parse(localStorage.getItem('duolun-platform-v1'))}catch{}
const seeded=alarms.map(a=>({id:a.id,name:a.title,time:a.time,location:a.place,source:a.id==='OGI-03'?'气云设备':a.id==='A-02'?'机器人':'DCS',level:'二级',monitorName:a.id==='A-02'?'A-02 巡检点':a.id,monitor:null,alarmState:'ACTIVE',mapSeed:true}));
const rows=saved&&Array.isArray(saved.alarms)?saved.alarms.filter(a=>a.state!=='已判误报'&&!(saved.events||[]).some(e=>e.alarmId===a.id&&e.state==='处理完成')&&AlertRecordRules.allowed(a)):seeded;
currentRows=rows;currentSaved=saved;syncPressureColors();
if(!rows.some(a=>String(a.id)===String(selectedAlarmId)))selectedAlarmId=(rows.find(a=>pointFor(a)==='A-02'&&a.alarmState!=='RECOVERED')||{}).id??null;
const root=document.getElementById('alarms');root.innerHTML=rows.map(a=>{const r=AlertRecordRules.business(a,saved?.monitorRecords||[],saved?.tasks||[]);const fields=r.fields.filter(f=>!['报警名称','报警等级','所在位置'].includes(f[0]));const buttons=[['detail','报警详情']];if(r.task?.state==='进行中')buttons.push(['task','查看机器人任务']);buttons.push(['video','视频联动']);return `<article class="alarm" data-alarm-id="${esc(a.id)}" style="--alarm-tone:${r.level==='一级'?'#ff6274':r.level==='二级'?'#ffca70':'#71baff'}"><div class="map-alarm-heading"><h3>${esc(r.name)}</h3><span class="map-alarm-level">${esc(r.level)}报警</span></div><dl>${fields.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd${k==='报警档位'?' class="map-alarm-band"':''}>${esc(v)}</dd></div>`).join('')}</dl><div class="alarm-actions">${buttons.map(([key,label])=>`<button class="button" data-map-action="${key}">${label}</button>`).join('')}</div></article>`}).join('')||'<div class="map-alarm-empty">暂无实时报警</div>';
syncSelection(false);
root.onclick=e=>{const card=e.target.closest('[data-alarm-id]');if(card)selectAlarm(card.dataset.alarmId);const button=e.target.closest('[data-map-action]');if(!button)return;const a=rows.find(a=>a.id===button.closest('[data-alarm-id]').dataset.alarmId);if(!a)return;const action=button.dataset.mapAction;if(action==='detail')location.href='多伦智能巡检平台.html?mapAlarm='+encodeURIComponent(a.id)+'#alarms';else if(action==='task'){const r=AlertRecordRules.business(a,saved?.monitorRecords||[],saved?.tasks||[]);location.href='多伦智能巡检平台.html?mapTask='+encodeURIComponent(r.task.id)+'#robot'}else showAlarmCameraLinkage(a)};
}
render();window.addEventListener('storage',e=>{if(e.key==='duolun-platform-v1')render()});window.addEventListener('pageshow',render);
})();
