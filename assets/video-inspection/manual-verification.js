(()=>{
const {ref,reactive,computed,onMounted,onUnmounted}=Vue;
const App={components:{SharedPersonField:window.SharedPersonField},setup(){const message=naive.useMessage(),ready=ref(false),busy=ref(false),people=ref([]),context=ref({});
const draft=reactive({name:'未佩戴安全帽',content:'',time:null,location:'',method:'线上核查',situation:'',person:null,handlingUnit:'',confirmer:null,result:'真警'});
const picker=reactive({show:false,field:'person',selected:null,keyword:'',post:null}),posts=ref([]),organizations=ref([]);
const pickerRows=computed(()=>people.value.filter(p=>(!picker.post||(p.postIds||[]).includes(picker.post))&&(!picker.keyword.trim()||[p.label,p.id].join(' ').includes(picker.keyword.trim()))));
function openPicker(field){picker.field=field;picker.keyword='';picker.post=null;picker.selected=people.value.find(p=>p.value===draft[field])?.id||null;picker.show=true}
function confirmPicker(){const person=people.value.find(p=>p.id===picker.selected);if(!person)return message.warning('请选择人员');draft[picker.field]=person.value;picker.show=false}
const requestId='MANUAL-'+Date.now()+'-'+Math.random().toString(36).slice(2);
const names=['未佩戴安全帽','未穿反光衣','人员吸烟','非法闯入','围栏翻越','杂物堆积','烟雾报警','火焰报警','跑冒滴漏','气体泄漏'].map(value=>({label:value,value}));
function receive(e){if(e.source!==parent)return;if(e.data?.type==='duolun-manual-init'){context.value=e.data.context||{};people.value=e.data.people||[];posts.value=e.data.posts||[];organizations.value=e.data.organizations||[];draft.location=context.value.location||'';ready.value=true}else if(e.data?.type==='duolun-manual-error'&&e.data.requestId===requestId){busy.value=false;message.error(e.data.message||'保存失败，请重试')}}
function submit(){if(busy.value)return;if(!ready.value)return message.warning('尚未连接主平台，请返回后重新进入');if(!draft.name||!draft.content.trim()||!draft.time||!draft.location.trim()||!draft.situation.trim()||!draft.person)return message.error('请填写报警内容、时间、地点、核查情况和记录人');if(draft.time>Date.now())return message.error('报警时间不能晚于当前时间');if(draft.result==='真警'&&(!draft.handlingUnit.trim()||!draft.confirmer))return message.error('请填写处理单位和处理确认人');busy.value=true;parent.postMessage({type:'duolun-manual-submit',requestId,record:{...draft,result:'真警',method:'线上核查',cameraId:context.value.cameraId}},'*')}
function cancel(){if(!busy.value)history.back()}
onMounted(()=>{window.addEventListener('message',receive);parent.postMessage({type:'duolun-manual-init-request',cameraId:new URLSearchParams(location.search).get('camera')},'*')});onUnmounted(()=>window.removeEventListener('message',receive));return{draft,people,names,busy,submit,cancel,picker,posts,organizations,pickerRows,openPicker,confirmPicker};},template:`<n-form label-placement="top" :show-feedback="false" class="manual-check-form">
<n-form-item label="事件照片"><div class="grid grid-cols-3 gap-2 review-evidence"><img src="sample-no-helmet.jpg" alt="事件照片1"><img src="sample-normal-scene.jpg" alt="事件照片2"><img src="sample-safety-belt.jpg" alt="事件照片3"></div></n-form-item>
<n-form-item label="事件名称" required><n-select v-model:value="draft.name" :options="names" to="body"/></n-form-item>
<n-form-item label="报警（误报）内容" required><n-input v-model:value="draft.content" type="textarea" :autosize="{minRows:2,maxRows:5}" maxlength="2000"/></n-form-item>
<n-form-item label="报警(误报)时间" required><n-date-picker v-model:value="draft.time" type="datetime" to="body" style="width:100%"/></n-form-item>
<n-form-item label="报警(误报)地点" required><n-input v-model:value="draft.location" maxlength="200"/></n-form-item>
<n-form-item label="核查方式"><n-input value="线上核查" readonly/></n-form-item>
<n-form-item label="报警信息核查情况" required><n-input v-model:value="draft.situation" type="textarea" :autosize="{minRows:2,maxRows:5}" maxlength="2000"/></n-form-item>
<n-form-item label="记录人" required><shared-person-field v-model:value="draft.person" :employees="people" :posts="posts" :organizations="organizations" title="选择记录人" placeholder="请选择记录人"/></n-form-item>
<n-form-item label="处理单位" :required="draft.result==='真警'"><n-input v-model:value="draft.handlingUnit" maxlength="100"/></n-form-item>
<n-form-item label="处理确认人" :required="draft.result==='真警'"><shared-person-field v-model:value="draft.confirmer" :employees="people" :posts="posts" :organizations="organizations" title="选择处理确认人" placeholder="请选择处理确认人"/></n-form-item>
<div class="manual-check-actions"><n-button :disabled="busy" @click="cancel">取消</n-button><n-button type="primary" :loading="busy" @click="submit">确定提交</n-button></div></n-form>`};
Vue.createApp({components:{App},setup(){return{locale:naive.zhCN,theme:{common:{primaryColor:'#0879ff',fontSize:'14px',textColorBase:'#24344d',borderRadius:'8px'},Input:{heightMedium:'36px'},Button:{fontWeight:'400'}}}},template:'<n-config-provider :locale="locale" :theme-overrides="theme"><n-message-provider><app/></n-message-provider></n-config-provider>'}).use(naive).mount('#manual-verification-root');
})();