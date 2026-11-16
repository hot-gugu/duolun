from pathlib import Path
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH
out=Path('outputs/demo-speech-20261106');doc=Document();sec=doc.sections[0];sec.page_width=Cm(21);sec.page_height=Cm(29.7);sec.top_margin=Cm(1.9);sec.bottom_margin=Cm(1.8);sec.left_margin=Cm(2.1);sec.right_margin=Cm(2.1)
for name in ['Normal','Title','Heading 1','Heading 2']:
 st=doc.styles[name];st.font.name='Microsoft YaHei';st.font.color.rgb=RGBColor(0,0,0);st._element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'Microsoft YaHei')
 st.paragraph_format.space_after=Pt(3);st.paragraph_format.line_spacing=1.1
normal=doc.styles['Normal'];normal.font.size=Pt(10.5)
doc.styles['Title'].font.size=Pt(18);doc.styles['Title'].font.bold=True
doc.styles['Heading 1'].font.size=Pt(14);doc.styles['Heading 1'].paragraph_format.space_before=Pt(10)
doc.styles['Heading 2'].font.size=Pt(11);doc.styles['Heading 2'].font.bold=True;doc.styles['Heading 2'].paragraph_format.space_before=Pt(8)
# Keep each operation line together without forcing long speech blocks onto one page.
sections=[
('一 开场介绍','约40秒',['停留在平台首页或实时报警中心，暂不点击具体功能。'],[
'各位好，下面向大家介绍多伦智能巡检系统的核心业务流程。',
'这套系统将DCS、GDS、气云监测、视频AI和机器人巡检的信息汇集起来，帮助值守人员及时发现异常、定位现场对象，并通过人工核查和机器人复查，跟踪后续处理过程。',
'接下来，我们以“储罐压力异常”为例，展示从基础配置到报警核查、现场复查和处理追溯的完整过程。']),
('二 先把现场监测对象建立清楚','约1分钟',['进入“设备管理中心 → 监测点位管理”。','打开T-101储罐压力监测点位，展示基础资料和报警规则。'],[
'首先，系统需要明确每一个监测点在哪里、数据来自哪里，以及它监测的具体内容。',
'例如当前这个压力点，来自DCS系统，对应T-101储罐。这里记录了它的区域、具体位置、设备信息、监测参数和数据单位。',
'报警规则可以根据实际情况配置一档、两档或四档。压力、液位等数值点位可以设置高报、高高报、低报、低低报；视频识别则根据事件类型触发报警；只提供数据或画面的点位，也可以设置为仅监测。',
'这些基础资料可以从电子档案同步，也可以按权限手工维护。来源系统的阈值与我方配置的规则分别标明，保证维护边界清楚。']),
('三 明确报警以后应该检查什么','约1分钟',['进入“巡检点位管理”，打开T-101罐底出料阀组。','依次展示“监测关联”和“我方检查项”。'],[
'有了监测数据，我们还需要知道：这个点位报警以后，应该去哪里、检查哪个对象、执行什么动作。',
'这里把压力测点关联到T-101罐底阀组，同时可以关联附近的气体测点、气云预置位和视频通道。',
'检查项由我方系统配置。例如“压力表读数识别”，需要明确读取哪一块现场压力表，并配置对应的执行目标。',
'因此，压力传感器提供报警依据，检查指令定义核查动作，现场表计目标确定具体检查对象。这几层关系建立起来后，报警才能对应到正确的复查内容。']),
('四 通过多种手段发现现场异常','约1分钟',['打开“气体泄漏监测”，展示设备画面和监测数据。','打开“视频智能巡检”，展示摄像头树及监控宫格。','打开“机器人智能巡检”，展示今日任务列表。'],[
'系统通过几种方式互相补充，发现现场异常。',
'气体监测用于持续观察相关数据和气云情况。视频智能巡检提供现场画面，并接收已配置算法识别到的事件，例如人员吸烟、未佩戴安全帽和可见液体跑冒滴漏。',
'机器人则按照计划任务，对具体巡检对象开展检查，例如读取仪表、检测气体或进行红外测温。需要进一步核实时，也可以安排临时复查任务。',
'这里展示的是各类监测和巡检入口，发现的业务报警统一进入实时报警中心。']),
('五 集中核查报警并发起复查','约1分30秒',['进入“实时报警中心”，打开一条待核查的压力超限报警。','查看报警值、触发阈值、发生时间及相关证据。','点击“开始核查”，再点击“机器人复查”，确认范围并下发演示任务。'],[
'接下来，我们看这条压力超限报警。',
'报警详情记录了异常发生的位置、监测值、触发阈值和报警等级。值守人员可以结合趋势、现场图片、视频以及其他关联数据进行判断。',
'点击“开始核查”后，报警进入核查中，同时记录操作过程。原报警会继续保留，不会因为开始核查而被删除。',
'如果现有证据还不足以判断，可以发起机器人复查。系统根据前面配置的对应关系，确定需要复查的巡检点和检查项。',
'这里需要强调：机器人复查负责补充检测结果和现场证据，最终的真警、误报结论仍由人员根据证据作出。']),
('六 查看机器人执行情况及返回结果','约1分钟',['打开对应机器人复查任务，展示任务状态、执行进度和巡检对象。','查看“对象巡检结果”和“巡检对象告警”。','返回报警详情，查看复查证据。'],[
'任务创建后，可以查看执行状态、进度，以及本次需要检查的对象。',
'在结果中，我们可以看到对应检查项的检测信息，例如压力表读数、现场图片和异常情况。巡检过程中发现的对象告警，也会保留对应对象和发生时间。',
'这些结果为值守人员判断提供依据，避免只看单一报警数值就直接作出结论。']),
('七 确认真警后跟踪处理','约1分钟',['返回压力报警详情，点击“判真警”，填写核查说明并提交。','打开生成的处理事件，展示添加处理记录及历史记录的入口。'],[
'当现场证据支持报警成立时，可以判定为真警，并记录判断依据；如果确认是误报，则记录误报原因，结束本次核查。',
'判真警以后，系统另行生成处理事件，用于跟踪后续处理。原始报警仍然保留，方便查阅当时的数据和证据。',
'处理人员可以逐次记录采取了哪些措施、取得了什么结果，并补充相关附件，直到处理完成。',
'这里把“报警核查”和“问题处理”分开：核查解决是否真的存在问题，处理解决确认的问题如何消除。']),
('八 收尾说明','约30秒',['停留在处理记录或报警详情页面，展示关联任务和历史记录。'],[
'以上就是系统的核心业务流程。',
'从监测点位和巡检对象建档开始，到多源发现异常、人工核查、机器人复查，再到处理记录和历史追溯，各个环节通过点位、报警和任务关联起来。',
'客户后续需要重点确认现场点位、报警规则、检查指令和执行目标。基础关系维护准确后，系统才能把发现的问题对应到正确的检查与处理流程中。',
'本次展示的是核心业务原型，真实数据接入和设备执行效果，将在后续接口联调与现场验证中确认。'])]
doc.add_paragraph('多伦智能巡检系统演示讲解稿及操作脚本','Title')
p=doc.add_paragraph('建议时长：约6—8分钟');p.paragraph_format.space_after=Pt(6)
doc.add_paragraph('演示主线：基础建档 → 多源发现 → 报警核查 → 机器人复查 → 处理闭环 → 历史追溯。')
p=doc.add_paragraph('演示前准备：打开平台，确认压力报警、机器人任务及处理记录可查看。使用原型演示数据，实际接口与设备能力以项目联调结果为准。');p.paragraph_format.space_after=Pt(8)
for i,(title,duration,ops,speech) in enumerate(sections):
 if i in [2,4,6]:doc.add_page_break()
 doc.add_paragraph(title,'Heading 1');p=doc.add_paragraph(duration);p.paragraph_format.space_after=Pt(4);p.runs[0].font.size=Pt(10)
 doc.add_paragraph('页面操作','Heading 2')
 for j,text in enumerate(ops,1):
  p=doc.add_paragraph(f'{j}. {text}');p.paragraph_format.space_after=Pt(2)
 if i==5:
  p=doc.add_paragraph('操作提示：若演示任务尚未完成，可打开预先准备好的已完成任务，说明这是同类结果示例。');p.paragraph_format.space_after=Pt(5);p.runs[0].font.size=Pt(10)
 doc.add_paragraph('讲解词','Heading 2')
 for text in speech:doc.add_paragraph(text)
footer=sec.footer.paragraphs[0];footer.alignment=WD_ALIGN_PARAGRAPH.CENTER
r=footer.add_run();r.font.size=Pt(9);fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');r._r.addnext(fld)
doc.core_properties.title='多伦智能巡检系统演示讲解稿及操作脚本';doc.core_properties.subject='客户演示讲解词与页面操作步骤';doc.core_properties.author=''
for border in list(doc.styles.element.iter(qn('w:pBdr'))):border.getparent().remove(border)
file=out/'多伦智能巡检系统演示讲解稿及操作脚本.docx';doc.save(file);print(file.resolve())
