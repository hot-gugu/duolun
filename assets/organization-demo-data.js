/* 多伦罐区巡检演示组织：仅用于原型展示，不代表现场真实组织、人员或授权。 */
const DuolunOrganizationDemo={
 version:1,
 seed(store){
  if(store.organizationDemoVersion>=this.version)return false;
  const departments=[
   ['DEP-DL','DL-ORG-001','多伦煤化工（模拟）',null,'EMP-DEMO-01'],
   ['DEP-OPS','DL-ORG-002','储运运行部','DEP-DL','EMP-DEMO-02'],
   ['DEP-TANK','DL-ORG-003','丙烯罐区运行班组','DEP-OPS','EMP-DEMO-03'],
   ['DEP-CONTROL','DL-ORG-004','中控值守班组','DEP-OPS','EMP-DEMO-06'],
   ['DEP-SAFETY','DL-ORG-005','安全环保部','DEP-DL','EMP-DEMO-09'],
   ['DEP-EQUIP','DL-ORG-006','设备仪表部','DEP-DL','EMP-DEMO-11'],
   ['DEP-INSTRUMENT','DL-ORG-007','仪表维护班组','DEP-EQUIP','EMP-DEMO-12'],
   ['DEP-IT','DL-ORG-008','信息化运维组','DEP-DL','EMP-DEMO-15'],
   ['DEP-OLD','DL-ORG-009','罐区专项巡检筹备组','DEP-OPS',null,false]
  ].map(([id,code,name,parentId,leaderId,enabled=true])=>({id,code,name,parentId,leaderId,enabled,description:'模拟组织，用于展示多伦罐区巡检部门层级与人员归属。'}));
  const posts=[
   ['POST-MANAGER','DL-POST-001','生产管理负责人','统筹罐区生产运行与异常处置'],
   ['POST-SHIFT','DL-POST-002','班组负责人','组织现场核查、协调班组处置'],
   ['POST-TANK-PROCESS','DL-POST-003','罐区工艺工程师','复核罐区压力、液位及工艺异常'],
   ['POST-FIELD','DL-POST-004','现场巡检员','执行现场核查、上传核查证据'],
   ['POST-DUTY','DL-POST-005','当班值守人员','监看报警及机器人巡检执行状态'],
   ['POST-DUTY-LEAD','DL-POST-006','当班负责人','协调当班报警核查与处理'],
   ['POST-SAFETY','DL-POST-007','安全管理工程师','跟踪气体泄漏及安全事件闭环'],
   ['POST-EQUIP','DL-POST-008','设备维护工程师','维护机器人、OGI及视频监测设备'],
   ['POST-INSTRUMENT','DL-POST-009','仪表维护员','维护压力、温度及液位监测仪表'],
   ['POST-ADMIN','DL-POST-010','平台运维管理员','维护平台组织、账号及业务配置'],
   ['POST-TEMP','DL-POST-011','临时专项巡检员','专项巡检结束后停用的岗位',false]
  ].map(([id,code,name,description,enabled=true])=>({id,code,name,description:'模拟岗位：'+description,enabled}));
  const roles=[
   ['ROLE-ADMIN','DL-ROLE-001','平台管理员','all',['monitor.view','report.export','alarm.view','alarm.verify','alarm.handle','task.manage','device.control','device.edit','rule.edit','employee.manage','department.manage','role.manage','post.manage']],
   ['ROLE-MANAGER','DL-ROLE-002','生产管理查看','subtree',['monitor.view','report.export','alarm.view','alarm.handle']],
   ['ROLE-DUTY','DL-ROLE-003','中控值守操作','department',['monitor.view','alarm.view','alarm.verify','task.manage']],
   ['ROLE-FIELD','DL-ROLE-004','现场核查处理','self',['monitor.view','alarm.view','alarm.verify','alarm.handle']],
   ['ROLE-SAFETY','DL-ROLE-005','安全监督查看','all',['monitor.view','report.export','alarm.view']],
   ['ROLE-MAINT','DL-ROLE-006','设备运维操作','custom',['monitor.view','alarm.view','device.edit','device.control','task.manage']],
   ['ROLE-READONLY','DL-ROLE-007','巡检报表查看','department',['monitor.view','report.export','alarm.view']],
   ['ROLE-OLD','DL-ROLE-008','专项巡检临时查看','self',['monitor.view','alarm.view'],false]
  ].map(([id,code,name,scope,permissions,enabled=true])=>({id,code,name,scope,permissions,enabled,scopeDepartmentIds:scope==='custom'?['DEP-TANK','DEP-CONTROL','DEP-INSTRUMENT']:[],description:'模拟角色，用于查看功能授权及数据范围配置。'}));
  const employees=[
   ['EMP-DEMO-01','陈志远','DEP-DL',['POST-MANAGER'],['ROLE-MANAGER']],
   ['EMP-DEMO-02','刘建华','DEP-OPS',['POST-MANAGER','POST-DUTY-LEAD'],['ROLE-MANAGER','ROLE-READONLY']],
   ['EMP-DEMO-03','王海峰','DEP-TANK',['POST-SHIFT'],['ROLE-DUTY','ROLE-FIELD']],
   ['EMP-ZHONG-XIAOGANG','仲晓刚','DEP-TANK',['POST-TANK-PROCESS'],['ROLE-FIELD','ROLE-READONLY']],
   ['EMP-DEMO-04','张旭东','DEP-TANK',['POST-FIELD'],['ROLE-FIELD']],
   ['EMP-DEMO-05','赵文博','DEP-TANK',['POST-FIELD'],['ROLE-FIELD']],
   ['EMP-DEMO-06','李国强','DEP-CONTROL',['POST-DUTY-LEAD','POST-DUTY'],['ROLE-DUTY']],
   ['EMP-DEMO-07','周晓燕','DEP-CONTROL',['POST-DUTY'],['ROLE-DUTY','ROLE-READONLY']],
   ['EMP-DEMO-08','孙立新','DEP-CONTROL',['POST-DUTY'],['ROLE-DUTY']],
   ['EMP-DEMO-09','高志鹏','DEP-SAFETY',['POST-SAFETY'],['ROLE-SAFETY']],
   ['EMP-DEMO-10','马晓宁','DEP-SAFETY',['POST-SAFETY'],['ROLE-SAFETY','ROLE-READONLY']],
   ['EMP-DEMO-11','郑文涛','DEP-EQUIP',['POST-EQUIP'],['ROLE-MAINT','ROLE-READONLY']],
   ['EMP-DEMO-12','何建军','DEP-INSTRUMENT',['POST-SHIFT','POST-INSTRUMENT'],['ROLE-MAINT']],
   ['EMP-DEMO-13','许志刚','DEP-INSTRUMENT',['POST-INSTRUMENT'],['ROLE-MAINT']],
   ['EMP-DEMO-14','郭明宇','DEP-EQUIP',['POST-EQUIP'],['ROLE-MAINT']],
   ['EMP-DEMO-15','吴晓峰','DEP-IT',['POST-ADMIN'],['ROLE-ADMIN']],
   ['EMP-DEMO-16','梁思远','DEP-IT',['POST-ADMIN'],['ROLE-READONLY']],
   ['EMP-DEMO-17','韩启明','DEP-TANK',['POST-FIELD'],['ROLE-FIELD'],false,'在职'],
   ['EMP-DEMO-18','宋文斌','DEP-OLD',['POST-TEMP'],['ROLE-OLD'],false,'离职']
  ].map(([id,name,departmentId,postIds,roleIds,enabled=true,employment='在职'],i)=>({id,name,code:'DL-EMP-'+String(i+1).padStart(3,'0'),departmentId,postIds,roleIds,enabled,employment,account:'demo_dl_'+String(i+1).padStart(3,'0'),accountEnabled:enabled&&i!==16,mobile:'',description:'模拟员工资料，仅用于原型效果与组织关系演示。'}));
  // Match existing entries first; fill absent fields only, preserving edits and historical IDs.
  const maps={};
  for(const [kind,list] of Object.entries({departments,posts,roles,employees})){
   store[kind]??=[];maps[kind]=new Map();
   for(const row of list){const old=store[kind].find(x=>x.id===row.id||x.code===row.code||(kind==='employees'?x.account&&x.account===row.account:x.name===row.name));maps[kind].set(row.id,old?.id||row.id)}
  }
  const ref=(kind,id)=>id?maps[kind].get(id)||id:null;
  for(const row of departments){row.parentId=ref('departments',row.parentId);row.leaderId=ref('employees',row.leaderId)}
  for(const row of roles)row.scopeDepartmentIds=row.scopeDepartmentIds.map(x=>ref('departments',x));
  for(const row of employees){row.departmentId=ref('departments',row.departmentId);row.postIds=row.postIds.map(x=>ref('posts',x));row.roleIds=row.roleIds.map(x=>ref('roles',x))}
  for(const [kind,list] of Object.entries({departments,posts,roles,employees}))for(const row of list){const id=ref(kind,row.id);const old=store[kind].find(x=>x.id===id);if(old){for(const [key,value] of Object.entries(row))if(key!=='id'&&old[key]===undefined)old[key]=value}else store[kind].push({...row,id})}
  for(const employee of store.employees)if(employee.departmentName===undefined)employee.departmentName=store.departments.find(x=>x.id===employee.departmentId)?.name||'';
  store.organizationDemoVersion=this.version;
  return true;
 }
};
