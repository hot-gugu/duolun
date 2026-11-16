from pathlib import Path
import re
from docx import Document
from docx.shared import Inches,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT,WD_CELL_VERTICAL_ALIGNMENT
p=Path('智能巡检一张图-开发说明.md');d=Document();sec=d.sections[0];sec.page_width=Inches(8.5);sec.page_height=Inches(11);sec.top_margin=sec.bottom_margin=Inches(.7);sec.left_margin=sec.right_margin=Inches(.75)
for name in ['Normal','Title','Heading 1','Heading 2','Heading 3','Heading 4']:
 st=d.styles[name];st.font.name='Microsoft YaHei';st._element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'微软雅黑');st.font.color.rgb=RGBColor.from_string('000000');st.font.size=Pt(11)
 st.paragraph_format.space_after=Pt(6)
d.styles['Normal'].paragraph_format.line_spacing=1.25
for name,size in [('Title',22),('Heading 1',18),('Heading 2',15),('Heading 3',12),('Heading 4',11)]:
 st=d.styles[name];st.font.size=Pt(size);st.paragraph_format.space_before=Pt(12);st.paragraph_format.keep_with_next=True
footer=sec.footer.paragraphs[0];footer.alignment=2
r=footer.add_run('智能巡检一张图开发说明  ·  ');r.font.size=Pt(9)
f=OxmlElement('w:fldSimple');f.set(qn('w:instr'),'PAGE');footer._p.append(f)
lines=p.read_text(encoding='utf-8').splitlines();i=0
while i<len(lines):
 line=lines[i]
 if not line.strip():i+=1;continue
 if line.startswith('|'):
  rows=[]
  while i<len(lines) and lines[i].startswith('|'):
   l=lines[i]
   if not re.match(r'^\|[\s:|\-]+\|$',l):rows.append([c.strip() for c in l.strip('|').split('|')])
   i+=1
  t=d.add_table(rows=0,cols=len(rows[0]));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=False
  widths=[1.3,1.65,4.05] if len(rows[0])==3 else [7/len(rows[0])]*len(rows[0])
  for col,w in zip(t.columns,widths):col.width=Inches(w)
  for ri,row in enumerate(rows):
   cells=t.add_row().cells
   for ci,(c,text) in enumerate(zip(cells,row)):
    c.width=Inches(widths[ci]);c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER;c.text=text
    pr=c._tc.get_or_add_tcPr();b=OxmlElement('w:tcBorders')
    for edge in ['top','left','bottom','right']:
     e=OxmlElement('w:'+edge);e.set(qn('w:val'),'single');e.set(qn('w:sz'),'4');e.set(qn('w:color'),'D9D9D9');b.append(e)
    pr.append(b);mar=OxmlElement('w:tcMar')
    for edge in ['top','left','bottom','right']:
     el=OxmlElement('w:'+edge);el.set(qn('w:w'),'85');el.set(qn('w:type'),'dxa');mar.append(el)
    pr.append(mar)
    if ri==0:
     shade=OxmlElement('w:shd');shade.set(qn('w:fill'),'EAF2FA');pr.append(shade)
    for para in c.paragraphs:
     para.paragraph_format.space_after=Pt(2);para.paragraph_format.line_spacing=1.1
     for run in para.runs:run.font.size=Pt(10);run.bold=ri==0
   trpr=t.rows[-1]._tr.get_or_add_trPr();cant=OxmlElement('w:cantSplit');trpr.append(cant)
   if ri==0:repeat=OxmlElement('w:tblHeader');trpr.append(repeat)
  d.add_paragraph().paragraph_format.space_after=Pt(0)
  continue
 m=re.match(r'^(#{1,4}) (.+)$',line)
 if m:
  level=len(m[1]);d.add_paragraph(m[2],style='Title' if level==1 else 'Heading '+str(level-1))
 else:d.add_paragraph(line)
 i+=1
out=Path('智能巡检一张图-开发说明.docx');d.save(out)
print(out.resolve())
