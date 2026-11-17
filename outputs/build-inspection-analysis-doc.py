from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT

OUT=Path('巡检分析开发说明.docx')
doc=Document();sec=doc.sections[0]
sec.page_width=Cm(21);sec.page_height=Cm(29.7)
sec.top_margin=sec.bottom_margin=Cm(1.8);sec.left_margin=sec.right_margin=Cm(1.8)
sec.header_distance=sec.footer_distance=Cm(.8)
for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3']:
 st=doc.styles[name];st.font.name='Microsoft YaHei';st._element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'微软雅黑');st.font.color.rgb=RGBColor(0,0,0)
 st.font.size=Pt(10.5);st.paragraph_format.space_after=Pt(6)
doc.styles['Normal'].paragraph_format.line_spacing=1.18
for name,size in [('Title',24),('Heading 1',17),('Heading 2',12.5)]:
 st=doc.styles[name];st.font.size=Pt(size);st.paragraph_format.keep_with_next=True;st.paragraph_format.space_before=Pt(10)
doc.styles['Subtitle'].font.size=Pt(11)
header=sec.header.paragraphs[0];header.text='大唐多伦煤化工智能巡检平台';header.runs[0].font.size=Pt(9)
footer=sec.footer.paragraphs[0];footer.alignment=2
footer.add_run('巡检分析开发说明  |  2026年11月16日  |  ')
field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGE');footer._p.append(field)
for r in footer.runs:r.font.size=Pt(8)

def p(text):doc.add_paragraph(text)
def h(text):doc.add_heading(text,2)
def page(title):
 # Continuous sections avoid near-empty overflow pages.
 doc.add_heading(title,1)
def table(headers,rows,widths=None):
 t=doc.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=False
 widths=widths or [17.4/len(headers)]*len(headers)
 for c,w in zip(t.columns,widths):c.width=Cm(w)
 for cells,values,head in [(t.rows[0].cells,headers,True)]+[(t.add_row().cells,row,False) for row in rows]:
  for c,text,w in zip(cells,values,widths):
   c.width=Cm(w);c.text=str(text);c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
   pr=c._tc.get_or_add_tcPr();mar=OxmlElement('w:tcMar')
   for edge in ['top','left','bottom','right']:
    e=OxmlElement('w:'+edge);e.set(qn('w:w'),'75');e.set(qn('w:type'),'dxa');mar.append(e)
   pr.append(mar)
   if head:
    shade=OxmlElement('w:shd');shade.set(qn('w:fill'),'EAF2FA');pr.append(shade)
   border=OxmlElement('w:tcBorders')
   for edge in ['top','bottom','left','right']:
    e=OxmlElement('w:'+edge);e.set(qn('w:val'),'single');e.set(qn('w:sz'),'4');e.set(qn('w:color'),'D8E5F4');border.append(e)
   pr.append(border)
   for para in c.paragraphs:
    para.paragraph_format.space_after=Pt(2);para.paragraph_format.line_spacing=1.08
    for r in para.runs:r.font.size=Pt(9);r.bold=head
  tr=cells[0]._tc.getparent().get_or_add_trPr();tr.append(OxmlElement('w:cantSplit'))
  if head:tr.append(OxmlElement('w:tblHeader'))
 doc.add_paragraph().paragraph_format.space_after=Pt(0)

doc.add_paragraph('巡检分析开发说明',style='Title')
doc.add_paragraph('大唐多伦煤化工智能巡检平台\n原型实现与开发交付口径  版本 V1.0  2026年11月16日',style='Subtitle')
p('本说明供产品、前端、后端与测试共同使用，定义巡检分析的功能边界、数据字段、统计口径和明细联动。当前原型已接入本地任务、报警、处理事件和设备记录；正式开发应以服务端业务事实、历史快照和统一权限为准。原型数据及画面用于功能演示，不代表现场运行统计。')
h('1 功能定位')
p('入口保留在统计分析下的巡检分析，进入后展示四个同级页签。分析围绕计划履约、有效采集、报警判定、处理闭环和设备保障形成可追溯查询。巡检报表继续承担固定报表输出与归档。分析页不直接下发机器人动作或修改核查、处理结论。')
table(['页签','核心内容','主要明细'],[
 ['综合概览','六项指标 任务与报警趋势 来源及部位分布 当前待关注事项','计划履约与各业务积压'],
 ['巡检执行','计划与机器人筛选 完成率 有效覆盖 无有效结果 即时任务 时长','任务 对象执行结果'],
 ['报警与闭环','来源等级 核查完成率 误报占比 核查及处理时长 高频对象','业务报警 核查记录 处理事件'],
 ['设备保障','新增异常 类型排行 恢复状态 关联对象与任务','设备异常及关联业务记录']],[2.7,8.4,6.3])
h('2 页面与视觉')
p('固定页签置顶，内容区独立滚动。内容依次为时间与空间筛选、专题筛选、六张指标卡、可点击趋势图、三块分布或关注事项、带分页的明细。复用浅色业务表面、主色 #0879ff、正文14px与400字重、标题16px与400字重；主筛选36px高与8px圆角，行操作30px高与6px圆角。空态使用 ProdEmptyState，分页不增加顶部通栏分割线。')
h('3 交付文件')
p('入口文件为多伦智能巡检平台.html；统计与页面组件位于 assets/inspection-analysis.js；局部样式位于 assets/inspection-analysis.css。原型使用原有 Vue 与 Naive UI，无新增在线图表依赖。')

page('一 查询范围与公共规则')
table(['规则','实现与开发要求'],[
 ['时间范围','默认北京时间近7个自然日，含今日；快捷项为今日 近7天 近30天；支持自定义日期。清空日期回退近7天。日界按 Asia/Shanghai 计算。'],
 ['计划履约截止','归期按计划执行时间；应执行只取统计结束时间与当前时间的较早者。未来安排不进入完成率分母。'],
 ['报警与事件归期','报警按发生时间；处理事件按创建时间。处理完成率追踪该批事件截至查询时的完成状态，不按处理完成日期另换分母。'],
 ['当前积压','当前待核查报警 未完成处理事件 未恢复设备异常不受所选发生日期限制，仍受所属罐区和所属部位限制。到期未完成任务与无有效结果仍属于所选计划时间范围。'],
 ['筛选作用域','所属罐区与所属部位对全页生效。机器人 任务类型 所属计划仅对巡检执行生效；报警来源 等级仅对报警与闭环生效。隐藏筛选不得污染其他页签。'],
 ['空间维度','罐体沿用 T41402A 至 T41402D；PUBLIC为公共设施，MULTI为跨罐覆盖，UNCONFIRMED为待确认。跨罐记录单独归类，不拆到各罐重复累计。'],
 ['编号去重','任务按任务编号去重；计划履约进一步按计划编号与计划执行时间去重。报警按报警编号，事件按事件编号，异常按设备编号与异常记录编号去重。'],
 ['无数据处理','分母为0或缺少必要字段时显示—；确有分母且分子为0时显示0.0%。计数为空集合显示0。平均时长不使用负值或缺失时间。'],
 ['趋势分桶','31天以内按日，超过31天分成不超过约31个等宽日期桶；点击趋势使用同一桶起止时间查明细，不能仅按显示标签匹配。']],[3.1,14.3])
h('历史快照与兼容边界')
p('正式系统必须保存执行安排与对象快照、报警发生时对象归属、等级、档位和阈值，不得因配置修改重写历史。当前原型优先使用已有快照；老记录缺少空间归属或对象名称时兼容当前对象台账，因此不具备完整历史重放能力。缺少应巡检对象列表时不从当前巡检点关联关系补造分母。')
h('查询一致性')
p('正式接口应返回统一数据截止时间 asOf。卡片、趋势、分布和明细使用同一过滤条件与数据版本；明细分页不得改变指标分母。当前原型业务数据响应式更新，明细抽屉保存点击时的数据集合；关闭后再次点击可读取最新集合。')

page('二 巡检执行统计口径')
table(['指标','分子与分母或计算方式','明细入口'],[
 ['应执行任务数','所选期内且截至当前应执行的非即时安排；包含到期未生成任务的有效计划安排','计划履约明细'],
 ['任务完成率','执行完成的应执行安排数 ÷ 应执行安排数 × 100%','已完成安排'],
 ['有效巡检覆盖率','有效的安排与巡查对象组合数 ÷ 应巡检组合数 × 100%','对象执行明细'],
 ['无有效结果','已知应巡检组合中未获得有效结果的次数','无有效结果明细'],
 ['即时任务数','计划时间在所选期的即时任务数；独立展示，不进入计划履约分母','即时任务明细'],
 ['平均执行时长','实际结束时间减实际开始时间，以分钟求算术平均；只纳入时间完整且差值非负的任务','本期任务明细'],
 ['到期未完成','所选计划期内，计划时间早于当前且未执行完成的应执行安排，含中途终止与未生成','到期未完成安排']],[3.4,10.2,3.8])
h('有效结果判定')
p('原型读取 reportRecords 或 robotReport.records，按 monitorId 关联应巡查对象。要求执行状态为已完成或执行完成、结果值存在、valid不为false，且数据质量不为无效 失效 质量失效 数据失效 采集失败或未知。数值0属于有效值。缺少显式质量标识的旧记录按未显式失效兼容，正式接入应强制提供质量枚举。报警结果可以同时是有效采集结果，不能因超阈值排除。')
p('同一安排同一巡查对象多次回传只计一次有效覆盖；至少有一次有效结果即为有效。任务状态为执行完成不能替代对象结果。缺少对象列表的安排计入快照缺失数量，并使覆盖率显示—，提示信息显示缺失次数。')
h('计划安排补齐与取消')
p('原型按现有计划规则补齐到期未生成的安排：周期任务支持按小时或天的固定间隔，定期任务使用配置日期与时间。下界为统计开始与计划创建时间的较晚者，上界为统计结束、当前时间、有效期结束以及终止或删除时间之前。已有同计划同时间的任务不再补齐；被删除任务占住原安排，避免将已取消安排重新算作漏执行。')
p('没有准确停用时间的停用计划不反推历史应执行数；不能识别的周期不强行展开。正式系统须建立独立的执行安排台账与状态履历，避免用现行计划配置重建历史。原型补齐记录只用于查询，不写入任务台账，也不发送执行请求。')
h('统一任务状态')
p('排队中显示未开始，进行中显示正在执行，暂停中显示任务暂停，已完成显示执行完成，失败与已终止显示中途终止；底层失败原因保留。到期未生成属于分析安排状态，并非新增机器人执行状态。')

page('三 报警核查与处理统计口径')
table(['指标','计算规则'],[
 ['新增业务报警','发生时间在所选期内的有效业务报警，按报警编号去重；不累计通知次数、弹窗次数或复核次数。'],
 ['报警核查完成率','本期报警中已判真警与已判误报数量 ÷ 本期业务报警数量。'],
 ['误报占比','本期已判误报数量 ÷ 本期已完成核查数量；待核查不进入分母。'],
 ['平均核查时长','本期已完成核查报警的最终判定时间减报警发生时间，按分钟取平均；排除缺失与负值。'],
 ['处理完成率','本期新增事件中状态为处理完成的事件数 ÷ 本期新增处理事件数。缺少创建时间的事件不进入本期，但仍可进入当前积压。'],
 ['平均处理时长','本期新增且处理完成事件的完成时间减事件创建时间，按分钟取平均。'],
 ['高频报警对象','按巡查对象编号聚合本期业务报警数，降序展示前8名；对象无编号单列未关联。'],
 ['来源与等级分布','来源统一为DCS GDS OGI气云监测 视频AI 机器人现场检测；等级使用一级 二级 三级，未知等级单列待确认。']],[3.6,13.8])
h('状态规则')
p('报警源状态、核查状态、处理状态独立。源端恢复不代表核查完成；机器人结束复核不代表已判真警或误报。核查完成只认可已判真警或已判误报。真警进入处理事件链路，误报不进入处理事件统计；历史误报异常挂接事件也从事件统计排除。设备故障不与工艺及现场业务报警相加。')
h('核查方式与身份')
p('优先使用 verificationFeedback.method；人工反馈记录映射为人工现场核查。规范值为人工现场核查、机器人复核后人工判定、直接人工佐证判定。已经判定但缺少方式时显示未记录，不能仅因存在机器人历史就推定核查方式。最终判定人与机器人现场复核主体分别保留。')
h('时长兼容字段')
p('报警判定时间优先 verifiedAt，其次 verificationFeedback.time 与 humanFeedback.time；事件创建时间优先 createdAt，其次 assignment.time；事件完成时间优先 completedAt，其次状态为处理完成的处理记录时间。正式接口应统一提供标准字段，不依赖展示文本或日志推算。未确认业务时限前仅展示时长，不新增超时判断。')
h('本期与当前积压')
p('本期处理完成率只追踪本期创建的事件。历史事件本期完成不并入该分母；历史尚未完成事件进入当前积压。应在接口、导出与测试用例中沿用相同定义，避免将发生量、完成流量、当前存量混算。')

page('四 对象与任务字段字典')
table(['统一名称','原型字段或建议字段','定义与约束'],[
 ['所属罐区','tankArea','使用对象字典名称；正式传输建议同时提供tankAreaCode'],
 ['所属部位','tankId','T41402A至T41402D及PUBLIC MULTI UNCONFIRMED'],
 ['覆盖部位','tankIds','跨罐覆盖对象涉及罐体编号数组，不用于重复计数'],
 ['巡检点编号与名称','pointId pointName','独立于巡查对象；任务快照中兼容point'],
 ['巡查对象编号与名称','monitorId objectName','管理台账兼容id name；编号是聚合主键'],
 ['监测项','metric','压力 温度 液位 气体浓度等；不与对象名称混用'],
 ['测量值与单位','recognitionResult unit','保留原始值类型与单位；不得将空值转成0'],
 ['数据质量','quality dataQuality valid','明确质量枚举及有效标识；正式必传'],
 ['任务编号与名称','id name','任务事实主键，不用名称去重'],
 ['所属计划','planId cycleId','优先planId，cycleId作为旧字段兼容'],
 ['机器人编号与名称','robotId robotName','无编号不默认推定为某台机器人'],
 ['任务类型','kind','周期任务 定期任务 即时任务'],
 ['巡检类型','type','沿用任务配置中的例行巡检 专项巡检 特殊巡检等'],
 ['巡检模式','mode','沿用常规巡检 红外快巡等现有字典'],
 ['计划执行时间','scheduledAt 或 date与time','归期与执行安排去重依据；时区为北京时间'],
 ['实际开始与结束','startedAt finishedAt','用于执行时长；缺失不推算'],
 ['任务状态','state','保留源状态，展示按统一状态映射'],
 ['应巡检对象列表','monitorIds checkSnapshot','与安排绑定的历史对象集合；不从当前关联补造'],
 ['过程结果列表','reportRecords robotReport.records','逐对象执行状态 测量结果 质量与回传时间'],
 ['终止与失败原因','terminationReason failureReason','保留原始原因；缺失显示未记录']],[3.5,5.4,8.5])
p('正式开发推荐增加 scheduleId、attemptId、snapshotVersion、cancelledAt、cancelReason。重试任务关联同一scheduleId；履约只计一次安排，对象覆盖按同一安排与对象汇总，任务明细可保留各次尝试。')

page('五 报警与处理字段字典')
table(['统一名称','原型字段','定义与约束'],[
 ['报警编号','id','业务报警唯一编号，通知不可冒用新报警编号'],
 ['巡查对象编号','monitor','关联统一对象台账；正式接口建议monitorId'],
 ['巡查对象名称','monitorName 或 closureIdentity.objectName','优先发生时快照名称'],
 ['报警名称','name','来源报警名称与标准显示名称应有映射表'],
 ['报警来源','source','原型气云设备映射OGI气云监测，机器人映射机器人现场检测'],
 ['报警等级','level','一级 二级 三级；使用报警事实记录，不用当前规则重算'],
 ['报警档位','band','H HH L LL或无档位；不与等级合并'],
 ['发生时间','time occurredAt','业务发生时间，不用通知发送时间替代'],
 ['报警值与单位','value unit','保留触发时原始读数及单位'],
 ['触发阈值','triggerLimit closureFields.threshold','保存触发时规则阈值及规则版本'],
 ['报警源状态','alarmState','源端ACTIVE RECOVERED等；与核查状态独立'],
 ['核查状态','state','待核查 已判真警 已判误报'],
 ['核查方式','verificationFeedback.method','规范的三条核查路径；缺失不得猜测'],
 ['判定人与判定时间','verifiedBy verifiedAt及反馈字段','以最终判定事实为准；不使用机器人任务结束时间'],
 ['处理事件编号','events.id','处理事实唯一编号，不与报警编号混用'],
 ['关联报警编号','events.alarmId','追溯原报警与核查记录'],
 ['处理状态','events.state','沿用现有待处理与处理完成；新增状态须另行定义'],
 ['处理人','owner assignment.owner','实际分配的处理责任人'],
 ['事件创建时间','createdAt assignment.time','处理事件归期与处理时长起点'],
 ['处理完成时间','completedAt records.time','仅取处理完成事实时间'],
 ['报警及位置快照','alarmSnapshot closureContext','保存当时对象 罐区 部位 等级及触发信息']],[3.5,5.4,8.5])
p('关联处理事件不存在时，报警详情仍可独立打开。处理事件关联报警已经丢失时，应保留事件自身快照及明确缺失字段，不能借用其他报警凑齐数据。事件缺少创建时间时显示—，不能拿报警发生时间替代。')

page('六 设备保障规则与字段')
table(['指标','口径'],[
 ['新增设备异常','所选发生时间内的独立异常事件，按设备编号与异常记录编号去重'],
 ['机器人自身异常','机器人及其子设备异常；使用设备层级归属识别'],
 ['监测设备异常','除机器人体系外的监测设备异常，不包含业务报警'],
 ['当前未恢复异常','所有尚未恢复异常，含历史记录及发生时间未知的当前快照'],
 ['持续时间','已恢复取恢复时间减发生时间；未恢复取当前时间减发生时间，以分钟展示'],
 ['关联巡查对象','本期异常设备关联对象按对象编号去重；机器人关联通过任务对象查询'],
 ['关联任务','本期异常设备通过机器人或巡查对象关联的任务，按任务编号去重']],[3.6,13.8])
h('关联与影响的区别')
p('当前原型只能证明设备与任务或对象有关联，无法证明异常确实造成该任务失败或漏检。因此页面使用关联巡查对象和关联任务，提示中说明可能受影响。正式影响分析必须增加异常区间与任务实际执行区间重叠判定、设备使用关系和失败原因佐证。不得将关联数量直接称为故障导致的损失。')
table(['统一名称','字段','规则'],[
 ['设备编号与名称','device.id device.name','使用父子设备真实编号'],
 ['父设备编号','parentId','子设备继承机器人归属'],
 ['异常记录编号','faultHistory.id','同一故障持续过程复用同一记录编号'],
 ['异常类型','title','沿用异常类型字典，不以设备名称替代'],
 ['发生与恢复时间','start end','不使用首次观测时间补造发生时间'],
 ['恢复状态','status','已恢复与未恢复；不表示检修完成'],
 ['观测时间','observedAt','记录首次发现时刻，与实际发生时间独立'],
 ['持续时间','durationMinutes','起止缺失或顺序错误时显示—']],[3.5,4.8,9.1])
p('只存在当前fault或online=false但没有历史事件时，可在当前未恢复中展示当前快照；发生时间与持续时间均显示—，不进入本期新增异常。当前原型未提供完整在线状态历史，因此不展示历史在线率或可用率。')

page('七 明细联动与开发接入')
table(['触发入口','目标与行为'],[
 ['指标卡','打开该指标对应明细；完成率与核查完成率定位分子，处理完成率定位本期事件集合，提示说明分母'],
 ['趋势柱','打开所点击日期桶及序列对应明细，保留空间筛选；不同序列独立过滤'],
 ['分布及排行','来源 部位 状态 核查方式或对象编号作为附加条件打开明细'],
 ['任务明细','未开始打开执行安排详情；执行中进入该机器人实时巡检；已完成或中途终止打开任务报告'],
 ['到期未生成安排','打开所属计划详情，不创建或补发任务'],
 ['业务报警明细','打开同一报警编号的报警详情或核查记录，沿用现有处理逻辑'],
 ['处理事件明细','打开该处理事件抽屉，保留报警与核查关联'],
 ['设备异常明细','进入对应设备的异常记录页；当前定位粒度为设备，异常记录编号保留在分析明细'],
 ['关联巡查对象','打开对应对象只读详情；不触发保存或配置修改'],
 ['返回巡检分析','顶部入口恢复原页签 时间 空间条件 搜索 分页 滚动位置及来源明细抽屉']],[3.8,13.6])
h('现有接入位置')
p('InspectionAnalysis.create在平台setup中初始化并持有状态。组件按导航挂载，返回时从父级恢复查询上下文。任务复用openTask，报警复用openAlarm，事件复用openEvent；设备复用duolun-device-focus定位，巡查对象增加只读duolun-monitor-focus事件。样式全部使用ia前缀，未修改其他页面的共享外观。')
h('正式服务建议')
p('建议提供分析汇总、趋势、分布、分页明细四类只读查询接口，统一接收startTime endTime tankAreaCode tankId以及专题条件。响应包含asOf timezone metricCode numerator denominator unknownCount items total和口径版本。服务端负责权限过滤与去重，前端不能先取全项目数据再隐藏未授权记录。以上为正式开发建议，当前未实现后台接口。')
h('性能与数据完整性')
p('原型在浏览器内计算，适合现有演示数据规模。正式环境应由服务端按执行安排和时间分区聚合，明细分页查询；长周期、大量计划不得在浏览器无限展开。历史计划修改、停用、删除与重试必须记录版本和状态履历。')

page('八 验收要求与交付边界')
table(['验收场景','预期结果'],[
 ['同一对象一日应巡三次，仅一次有效','分母3，分子1；不能按对象去重成100%'],
 ['任务执行完成但没有对象结果','任务可完成，有效覆盖不因此增加'],
 ['读数为0或读数超阈值','只要采集与质量有效，均计入有效覆盖'],
 ['任务类型为即时任务','进入即时任务与任务明细，不进入计划履约分母'],
 ['未来与取消安排','未来不计到期应执行；取消安排不被补齐为漏执行'],
 ['有效计划到期但任务未生成','计入应执行与到期未完成；点击查看计划'],
 ['缺少历史应巡对象列表','覆盖率显示—，提示缺少快照安排数'],
 ['源报警恢复或机器人复核完成','不自动计入已完成核查'],
 ['误报及历史误挂事件','不进入处理事件统计'],
 ['缺少事件创建时间','不进入本期新增；未完成时可在当前积压查看'],
 ['异常只有观测时间','只进入当前未恢复，发生时间与持续时间显示—'],
 ['跨罐覆盖对象','独立归类，总数不按涉及罐体重复相加'],
 ['切换专题后隐藏筛选','不影响其他页签；公共条件继续生效'],
 ['点击指标与趋势后进入详情再返回','业务编号一致，筛选 分页和来源上下文保留'],
 ['空集合与分母为0','计数0，比例与平均值—，明细使用统一空态']],[6.5,10.9])
h('原型边界')
p('所有展示基于当前浏览器保存的原型数据及既有演示记录，未连接真实机器人、DCS、GDS、视频或设备接口。分析模块本身不补造测量结果、报警或处理记录。历史快照不完整、事件时间缺失、计划版本缺失会影响可统计范围，正式接入须补齐来源数据。')
p('首期不实现同比环比、重复报警合并、历史设备在线率、风险评分与自动超时判断；未确认的阈值与权重不进入计算。巡检报表保持原有预留功能，不在本次范围内增加固定报表导出。')
h('校验入口')
p('outputs/check-inspection-analysis.cjs覆盖安排补齐与去重、即时与未来及取消排除、有效覆盖质量、快照缺失、核查与误报事件规则、设备当前积压、专题筛选隔离、卡片明细和跳转参数。页面验收应另检查四页签布局、滚动、抽屉分页和各业务详情的真实交互。')

# Remove inherited template decoration and theme fonts for deterministic rendering.
for st in doc.styles:
 for border in list(st.element.iter(qn('w:pBdr'))):border.getparent().remove(border)
 if st.type==1:
  pp=st.element.get_or_add_pPr();grid=OxmlElement('w:snapToGrid');grid.set(qn('w:val'),'0');pp.append(grid)
for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3']:
 st=doc.styles[name];st.font.italic=False;st.font.underline=False
 fonts=st.element.get_or_add_rPr().rFonts
 for key in list(fonts.attrib):
  if 'Theme' in key:del fonts.attrib[key]
 fonts.set(qn('w:ascii'),'Microsoft YaHei');fonts.set(qn('w:hAnsi'),'Microsoft YaHei');fonts.set(qn('w:eastAsia'),'Microsoft YaHei')
for para in doc.paragraphs:
 pp=para._p.get_or_add_pPr();grid=OxmlElement('w:snapToGrid');grid.set(qn('w:val'),'0');pp.append(grid)
for t in doc.tables:
 for row in t.rows:
  for cell in row.cells:
   for para in cell.paragraphs:
    pp=para._p.get_or_add_pPr();grid=OxmlElement('w:snapToGrid');grid.set(qn('w:val'),'0');pp.append(grid)

doc.save(OUT)
print(OUT.resolve())
