from pathlib import Path
p=Path('assets/point-management.js');s=p.read_text(encoding='utf8')
s=s.replace("const autoPolicy=m=>['DCS','GDS'].includes(m.source)?'自动机器人复查':'人工核查，可手动发起机器人复查';", """const autoPolicy=m=>['DCS','GDS'].includes(m.source)?'自动机器人复查':'人工核查';
 const executionIssues=m=>{const e=m.execution||{},items=[];if(!m.enabled)items.push('监测点已停用');for(const [k,label] of [['vendorMonitorId','厂商监测点位编码'],['navigationId','厂商导航点编号'],['targetId','现场检查目标编号']])if(!e[k]?.trim())items.push('缺少'+label);if(!e.checks?.length)items.push('未配置检查指令');else if(e.checks.some(c=>!c.name||!c.content?.trim()))items.push('检查指令或现场检查内容不完整');return items};
 const executionStatus=m=>executionIssues(m).length?(['DCS','GDS'].includes(m.source)?'配置缺失，无法自动复查':'未配置机器人复查'):'配置完整';
 const pointMonitors=p=>(p.links||[]).map(monitor).filter(Boolean);
""")
s=s.replace('return {setCommand,','return {executionIssues,executionStatus,pointMonitors,setCommand,')
s=s.replace('检查项汇总','巡检内容').replace('检查与机器人映射','报警联动')
s=s.replace('<th>来源系统</th><th>数据维护方式</th>', '<th>来源系统</th><th>报警响应方式</th><th>机器人配置状态</th><th>数据维护方式</th>')
s=s.replace('<td>{{p.source}}</td><td>{{p.method}}</td>', '''<td>{{p.source}}</td><td><span class="pill" :class="['DCS','GDS'].includes(p.source)?'blue':'gray'">{{autoPolicy(p)}}</span></td><td><button class="device-link" @click="open(p,'monitor',true);ui.tab='报警联动'"><span class="pill" :class="executionIssues(p).length?'orange':'green'">{{executionStatus(p)}}</span></button></td><td>{{p.method}}</td>''')
s=s.replace('<button class="row-btn" @click="open(p,\'monitor\')">编辑</button>', '<button class="row-btn" @click="open(p,\'monitor\');ui.tab=\'报警联动\'">报警联动</button><button class="row-btn" @click="open(p,\'monitor\')">编辑</button>')
s=s.replace('<th>检查项数量</th>','<th>巡检动作数量</th>').replace("'检查项数量'","'巡检动作数量'")
start=s.index(' <template v-if="ui.tab===\'巡检内容\'">');end=s.index(' <template v-if="ui.tab===\'报警联动\'">',start)
s=s[:start]+''' <template v-if="ui.tab==='巡检内容'"><h3 class="section-title">关联监测点巡检内容</h3><div class="pm-rule" v-for="m in pointMonitors(ui.draft)" :key="m.id"><div class="pm-form-grid"><div><span class="info-label">监测点位编号</span>{{m.id}}</div><div><span class="info-label">监测点位名称</span>{{m.name}}</div><div><span class="info-label">报警响应方式</span>{{autoPolicy(m)}}</div><div><span class="info-label">现场检查目标</span>{{m.execution?.targetId||'未配置'}}</div></div><table class="pm-table"><thead><tr><th>执行顺序</th><th>检查指令</th><th>现场检查内容</th></tr></thead><tbody><tr v-for="(c,i) in m.execution?.checks||[]" :key="c.id"><td>{{i+1}}</td><td>{{c.name}}</td><td>{{c.content}}</td></tr></tbody></table><prod-empty-state v-if="!m.execution?.checks?.length" text="该监测点暂无检查指令"/><button class="row-btn" @click="open(m,'monitor',true);ui.tab='报警联动'">查看监测点配置</button></div><prod-empty-state v-if="!pointMonitors(ui.draft).length" text="暂无关联监测点"/></template>
'''+s[end:]
s=s.replace('<template v-if="ui.tab===\'报警联动\'"><h3 class="section-title">执行配置</h3>', '''<template v-if="ui.tab==='报警联动'"><h3 class="section-title">报警响应策略</h3><div class="pm-response-summary"><div><span class="info-label">响应方式</span><span class="pill" :class="['DCS','GDS'].includes(ui.draft.source)?'blue':'gray'">{{autoPolicy(ui.draft)}}</span></div><div><span class="info-label">自动联动机器人</span>{{['DCS','GDS'].includes(ui.draft.source)?'必须自动联动':'不自动联动'}}</div><div><span class="info-label">人工核查</span>{{['DCS','GDS'].includes(ui.draft.source)?'结合机器人现场证据判定':'查看报警证据，必要时手动发起机器人复查'}}</div><div><span class="info-label">机器人配置状态</span><span class="pill" :class="executionIssues(ui.draft).length?'orange':'green'">{{executionStatus(ui.draft)}}</span></div></div><ul v-if="executionIssues(ui.draft).length" class="pm-config-issues"><li v-for="item in executionIssues(ui.draft)" :key="item">{{item}}</li></ul><h3 class="section-title">机器人执行映射</h3>''')
# export has same response columns as list
s=s.replace(":fields.map(f=>f[1]);const values", ":[...fields.map(f=>f[1]),'报警响应方式','机器人配置状态'];const values")
s=s.replace(":fields.map(([k])=>k==='enabled'?(p.enabled?'启用':'停用'):p[k]));", ":[...fields.map(([k])=>k==='enabled'?(p.enabled?'启用':'停用'):p[k]),autoPolicy(p),executionStatus(p)]);")
p.write_text(s,encoding='utf8')
for f in ['assets/verify-points.cjs','assets/verify-workflow.cjs']:
 p=Path(f);s=p.read_text(encoding='utf8').replace('检查项汇总','巡检内容').replace('检查与机器人映射','报警联动');p.write_text(s,encoding='utf8')
