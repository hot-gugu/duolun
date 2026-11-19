const fs=require('fs'),vm=require('vm'),assert=require('assert');const messages=[];const ctx={console,setTimeout,clearTimeout,setInterval,clearInterval};vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/vue.global.prod.js','utf8'),ctx);ctx.ProdEmptyState={};ctx.naive={useMessage:()=>({error:x=>messages.push(x),warning:x=>messages.push(x),success:x=>messages.push(x)}),useDialog:()=>({warning:o=>o.onPositiveClick()})};const saved={};ctx.localStorage={getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v};vm.runInContext(fs.readFileSync('assets/organization-management.js','utf8')+';globalThis.OM=OrganizationManagement',ctx);let warnings=[];ctx.Vue.compile(ctx.OM.template,{decodeEntities:s=>s,onError:e=>{throw e},onWarn:e=>warnings.push(e.message)});assert.equal(warnings.length,0);
const store=ctx.Vue.reactive({employees:[],posts:[],events:[],points:[]});const props=ctx.Vue.reactive({mode:'departments',store});const c=ctx.OM.setup(props);c.open();Object.assign(c.ui.draft,{name:'罐区运行部',code:'DEP001'});c.save();assert.equal(store.departments.length,1);const dep=store.departments[0];props.mode='posts';c.open();Object.assign(c.ui.draft,{name:'工艺工程师',code:'P001'});c.save();assert.equal(store.posts.length,1);props.mode='roles';c.open();Object.assign(c.ui.draft,{name:'核查员',code:'R001',permissions:['alarm.verify'],scope:'custom'});c.save();assert.equal(store.roles.length,1);c.open(store.roles[0]);c.ui.draft.name='现场核查员';c.save();assert.equal(store.roles[0].name,'现场核查员');assert.equal(store.roles[0].scope,'custom');assert.deepEqual(Array.from(store.roles[0].permissions),['alarm.verify']);props.mode='employees';c.open();Object.assign(c.ui.draft,{name:'测试人员',code:'E001',departmentId:dep.id,postIds:[store.posts[0].id],roleIds:[store.roles[0].id],account:'tester',accountEnabled:true,mobile:'13800000000'});c.save();assert.equal(store.employees.length,1);assert.equal(store.employees[0].departmentName,dep.name);props.mode='departments';c.toggle(dep);assert.notEqual(dep.enabled,false);props.mode='employees';c.open(store.employees[0]);c.ui.draft.mobile='12';c.save();assert.equal(store.employees[0].mobile,'13800000000');c.ui.draft.mobile='13900000000';c.save();assert.equal(store.employees[0].mobile,'13900000000');c.toggle(store.employees[0]);assert.equal(store.employees[0].enabled,false);assert.equal(store.employees[0].accountEnabled,false);assert(JSON.parse(saved['duolun-platform-v1']).roles.length===1);console.log('PASS: template, CRUD, relations, legacy role editing, invalid phone, disable guards, account disabling, persistence');
const html=fs.readFileSync('多伦智能巡检平台.html','utf8');const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');new vm.Script(inline);console.log('PASS: platform JavaScript syntax');

const scopedStore = ctx.Vue.reactive({
  departments: [
    {id:'root',name:'所属单位'},
    {id:'child',name:'下级部门',parentId:'root'},
    {id:'grandchild',name:'下下级部门',parentId:'child'},
    {id:'other',name:'其他单位'}
  ],
  employees:[
    {id:'me',name:'值守人员',departmentId:'root'},
    {id:'member',name:'成员',departmentId:'child'},
    {id:'other-member',name:'其他员工',departmentId:'other'}
  ],
  posts:[],roles:[]
});
const scopedProps = ctx.Vue.reactive({mode:'employees',store:scopedStore,employeeId:'me'});
const scoped = ctx.OM.setup(scopedProps);
assert.equal(scoped.departmentTree.value.length,1);
assert.equal(scoped.departmentTree.value[0].key,'root');
assert.equal(scoped.departmentTree.value[0].children[0].children[0].key,'grandchild');
assert.equal(scoped.rows.value.length,2);
scoped.ui.department='child';
assert.equal(scoped.rows.value.length,1);
assert.equal(scoped.stats.value.length,3);
assert.equal(scoped.stats.value[0].value,2);
scoped.open();
Object.assign(scoped.ui.draft,{name:'新员工',code:'NEW',departmentId:'child'});
scoped.save();
assert.equal(scopedStore.employees.length,3);
scoped.ui.draft.mobile='13800000000';
scoped.save();
assert.equal(scopedStore.employees.length,3);
scoped.ui.draft.account='new_user';
scoped.save();
assert.equal(scopedStore.employees.length,3);
scopedStore.roles.push({id:'role'});
scoped.ui.draft.roleIds=['role'];
scoped.save();
assert.equal(scopedStore.employees.length,4);
scopedProps.mode='departments';
scoped.open(scopedStore.departments[0]);
assert.equal(scoped.parentOptions.value.map(o=>o.value).join(','),'other');
scoped.ui.draft.parentId='grandchild';
scoped.save();
assert.equal(scopedStore.departments[0].parentId,undefined);
for(const mode of ['departments','posts','roles']){
  scopedProps.mode=mode;
  assert.equal(scoped.stats.value.map(s=>s.unit).join(','),'个,个,个,人');
}
assert.equal(scoped.permissionCount({permissions:['alarm','alarm.view','monitor.view','unknown']}),4);
assert.equal(scoped.permissionCount({permissions:['alarm.view','alarm.view']}),1);
assert(!ctx.OM.template.includes('数据范围'));
console.log('PASS: organization scope, fixed statistics, required fields, parent guard, leaf permission count');
