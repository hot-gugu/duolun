(()=>{
  const scene=document.querySelector('#scene'),anchor=document.querySelector('#robot');
  if(!scene||!anchor)return;
  const popup=document.createElement('section');
  popup.className='map-robot-popup';popup.hidden=true;popup.id='map-robot-popup';
  popup.setAttribute('role','region');popup.setAttribute('aria-label','巡检机器人 01 实时详情');
  popup.innerHTML=`<div class="mr-head"><h2>巡检机器人 01</h2><button type="button" class="mr-close" aria-label="关闭机器人悬浮卡片">×</button></div><div class="mr-body"><div class="mr-statuses"></div><dl class="mr-fields"></dl><div class="mr-task"></div><h3 class="mr-title">环境监测</h3><div class="mr-sensors"></div><div class="mr-fault"></div><div class="mr-time"></div></div><div class="mr-actions"><button type="button" class="button mr-play" aria-expanded="false">查看视频</button></div>`;
  scene.append(popup);
  const videoPopup=document.createElement('section');
  videoPopup.className='mr-video-popup';videoPopup.hidden=true;videoPopup.id='robot-video-popup';videoPopup.setAttribute('aria-label','机器人双光视频');
  videoPopup.innerHTML=`<div class="mr-head"><h2>巡检机器人 01 · 视频</h2><button type="button" class="mr-video-close" aria-label="关闭机器人视频">×</button></div><div class="mr-video-frame"><video controls playsinline muted aria-label="机器人可见光视频"></video><div class="mr-video-message" role="status" hidden></div></div><div class="mr-video-footer"><span class="mr-video-state" role="status"></span><div class="mr-video-tabs" role="tablist" aria-label="视频通道"><button type="button" role="tab" aria-selected="true" data-channel="visible">可见光</button><button type="button" role="tab" aria-selected="false" data-channel="infrared">红外</button></div></div>`;
  scene.append(videoPopup);
  const arrow=document.createElementNS('http://www.w3.org/2000/svg','svg');arrow.classList.add('mr-video-arrow');arrow.setAttribute('aria-hidden','true');arrow.style.display='none';arrow.innerHTML='<defs><marker id="robot-arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#91e9fa"/></marker></defs><line stroke="#91e9fa" stroke-width="2" marker-end="url(#robot-arrowhead)"/>';
  scene.append(arrow);
  const vq=s=>videoPopup.querySelector(s);let channel='visible';let playRequest=0;

  const q=s=>popup.querySelector(s),esc=v=>String(v??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state={online:true,mode:'自动巡检',battery:76,location:'丙烯罐区 · T41402A 附近中央通道',task:{name:'罐区例行巡检',status:'执行中',done:6,total:12,alarms:1,remaining:'00:12:30'},fault:null,updatedAt:null,videoSources:{},sensors:[]};
  let opener=anchor;
  const video=vq('video');
  function position(){
    if(popup.hidden&&videoPopup.hidden)return;
    const s=scene.getBoundingClientRect(),a=anchor.getBoundingClientRect(),w=popup.offsetWidth,h=popup.offsetHeight;
    const targetX=a.left-s.left+a.width*.14;
    const right=targetX+60,left=targetX-w-60;
    popup.style.left=Math.max(10,Math.min(right+w<=s.width-10?right:left>=10?left:a.left-s.left+(a.width-w)/2,s.width-w-10))+'px';
    popup.style.top=Math.max(10,Math.min(a.top-s.top+a.height/2-h/2,s.height-h-10))+'px';
    if(!videoPopup.hidden){
      const tx=a.left-s.left+a.width*.14,ty=a.top-s.top+a.height*.8;
      const vw=videoPopup.offsetWidth,vh=videoPopup.offsetHeight;
      const vx=Math.max(10,Math.min(tx-vw-30,s.width-vw-10)),vy=Math.max(10,Math.min(ty-vh-45,s.height-vh-10));
      videoPopup.style.left=vx+'px';videoPopup.style.top=vy+'px';
      arrow.setAttribute('viewBox',`0 0 ${s.width} ${s.height}`);
      const line=arrow.querySelector('line');line.setAttribute('x1',Math.max(vx+16,Math.min(tx,vx+vw-16)));line.setAttribute('y1',vy+vh);line.setAttribute('x2',tx);line.setAttribute('y2',ty);arrow.style.display='block';
    }

  }
  function render(){
    vq('.mr-video-state').textContent=state.online?'在线':'离线';
    vq('.mr-video-state').classList.toggle('is-offline',!state.online);
    const t=state.task,done=Math.max(0,Number(t?.done)||0),total=Math.max(0,Number(t?.total)||0),pct=total?Math.min(100,Math.round(done/total*100)):null;
    const taskStatus=t?t.status||'待执行':'待命';
    q('.mr-statuses').innerHTML=`<span class="mr-pill ${state.online?'ok':'warn'}">${state.online?'在线':'离线'}</span><span class="mr-pill">${esc(state.mode)}</span><span class="mr-pill">${esc(taskStatus)}</span>`;
    const field=(name,value,wide=false)=>`<div${wide?' class="wide"':''}><dt>${name}</dt><dd>${esc(value)}</dd></div>`;
    q('.mr-fields').innerHTML=field('当前位置',state.location,true)+field('剩余电量',state.battery==null?'—':state.battery+'%')+field('设备状态',state.fault?'故障':state.online?'正常':'离线，状态未知');
    q('.mr-task').innerHTML=t?`<div class="mr-task-top"><span>${esc(t.name)}</span><span>${pct==null?'—':pct+'%'}</span></div><div class="mr-track" role="progressbar" aria-label="当前任务执行进度" ${pct==null?'':`aria-valuenow="${pct}"`} aria-valuemin="0" aria-valuemax="100"><span style="width:${pct||0}%"></span></div><div class="mr-task-meta">已巡 ${done} / ${total} · 告警 ${esc(t.alarms??'—')}<br>预计剩余时间 ${esc(t.remaining)}</div>`:'<div class="mr-task-top"><span>暂无任务</span><span>待命</span></div><div class="mr-task-meta">当前任务进度：—</div>';
    const labels={methane:'甲烷',oxygen:'氧气',co:'一氧化碳',h2s:'硫化氢',temperature:'温度',smoke:'烟雾'};
    const sensors=Array.isArray(state.sensors)?state.sensors:Object.entries(state.sensors||{}).map(([key,value])=>typeof value==='object'&&value!==null?{key,...value}:{key,label:labels[key]||key,value});
    const monitoredSensors=Object.keys(labels).map(key=>({key,label:labels[key],...sensors.find(item=>item.key===key||item.label===labels[key]||item.name===labels[key])}));
    monitoredSensors.push(...sensors.filter(item=>!monitoredSensors.some(field=>field.key===item.key||field.label===(item.label||item.name))));
    const sensorHTML=monitoredSensors.map(item=>`<div class="mr-sensor"><span>${esc(item.label||item.name||labels[item.key]||item.key)}</span><b>${esc(item.value==null||item.value===''?'--':item.value)}${item.value!=null&&item.value!==''&&item.unit?' '+esc(item.unit):''}</b></div>`).join('');
    q('.mr-sensors').innerHTML=sensorHTML;
    const sidebarSensors=document.querySelector('.robot-panel .gas-readings');
    if(sidebarSensors)sidebarSensors.innerHTML=sensors.map(item=>`<div><span>${esc(item.label||item.name||labels[item.key]||item.key)}</span><b>${esc(item.value==null?'未返回':item.value)}${item.value!=null&&item.unit?' '+esc(item.unit):''}</b></div>`).join('')||'<div>暂无机器人上报数据</div>';
    q('.mr-fault').hidden=!state.fault;q('.mr-fault').textContent=state.fault?'故障提示：'+state.fault:'';
    q('.mr-time').textContent=state.updatedAt?`数据更新时间：${state.updatedAt}${state.online?'':' · 已离线，以上为最后上报数据'}`:'数据更新时间：— · 等待机器人上报';
    if(!state.online&&!state.updatedAt)q('.mr-time').textContent+=' · 设备已离线';
    position();
  }
  function close(){popup.hidden=true;closeVideo();opener.setAttribute('aria-expanded','false');opener.focus({preventScroll:true})}
  function open(event){opener=event?.currentTarget||anchor;popup.hidden=false;opener.setAttribute('aria-expanded','true');render();q('.mr-close').focus({preventScroll:true})}
  anchor.onclick=open;anchor.setAttribute('aria-controls',popup.id);anchor.setAttribute('aria-expanded','false');
  const photo=document.querySelector('#robot-photo');if(photo){photo.onclick=open;photo.setAttribute('aria-controls',popup.id);photo.setAttribute('aria-expanded','false')}
  q('.mr-close').onclick=close;
  function closeVideo(){videoPopup.hidden=true;arrow.style.display='none';video.pause();playRequest++;q('.mr-play').textContent='查看视频';q('.mr-play').setAttribute('aria-expanded','false')}
  function loadVideo(){
    const request=++playRequest;vq('.mr-video-message').hidden=true;video.pause();video.removeAttribute('src');video.load();
    const name=channel==='visible'?'可见光':'红外';
    video.setAttribute('aria-label','机器人'+name+'视频');
    videoPopup.querySelectorAll('[role="tab"]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.channel===channel)));
    const source=state.videoSources?.[channel]||(channel==='visible'?scene.dataset.robotVideoSrc:scene.dataset.robotInfraredSrc);
    if(!state.online){vq('.mr-video-message').textContent='机器人已离线，无法查看实时视频';return}
    if(!source){vq('.mr-video-message').textContent=name+'视频未接入，暂无可播放画面';return}
    video.src=source;vq('.mr-video-message').textContent='正在连接'+name+'视频…';video.play().catch(()=>{if(request===playRequest){vq('.mr-video-message').hidden=false;vq('.mr-video-message').textContent='请点击播放按钮播放'+name+'视频'}});
  }
  q('.mr-play').setAttribute('aria-controls',videoPopup.id);
  q('.mr-play').onclick=()=>{if(!videoPopup.hidden){closeVideo();return}videoPopup.hidden=false;q('.mr-play').textContent='关闭视频';q('.mr-play').setAttribute('aria-expanded','true');loadVideo();position()};
  vq('.mr-video-close').onclick=closeVideo;
  videoPopup.querySelectorAll('[role="tab"]').forEach(button=>{button.onclick=()=>{channel=button.dataset.channel;loadVideo()};button.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'visible':e.key==='End'?'infrared':channel==='visible'?'infrared':'visible';videoPopup.querySelector(`[data-channel="${next}"]`).focus();channel=next;loadVideo()}}});
  video.addEventListener('playing',()=>vq('.mr-video-message').hidden=true);
  video.addEventListener('error',()=>{if(video.getAttribute('src')){vq('.mr-video-message').hidden=false;vq('.mr-video-message').textContent='视频连接失败，请切换通道或稍后重试'}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!popup.hidden){e.preventDefault();close()}});
  new ResizeObserver(position).observe(scene);
  // A null task represents standby. Mode and task state are independent.
  window.addEventListener('duolun:robot-state',e=>{if(!e.detail)return;const previousSource=state.videoSources?.[channel];const wasOnline=state.online;state={...state,...e.detail};render();if(!videoPopup.hidden&&(previousSource!==state.videoSources?.[channel]||wasOnline!==state.online))loadVideo()});
  render();
  window.addEventListener('pagehide',()=>video.pause());
})();
