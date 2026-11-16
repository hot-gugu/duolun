from pathlib import Path
import pypdfium2 as pdfium
from PIL import Image,ImageOps,ImageDraw
p=Path('outputs/requirements-20261106/render');pdf=pdfium.PdfDocument(p/'review.pdf')
for i,page in enumerate(pdf):
 im=page.render(scale=1.3).to_pil();im.save(p/f'page-{i+1}.png')
for first in range(0,len(pdf),4):
 sheet=Image.new('RGB',(1240,1800),'#aaaaaa');draw=ImageDraw.Draw(sheet)
 for j in range(4):
  if first+j>=len(pdf):break
  im=Image.open(p/f'page-{first+j+1}.png');im.thumbnail((610,860))
  x=(j%2)*620;y=(j//2)*900;sheet.paste(im,(x,y+24));draw.text((x+8,y+5),str(first+j+1),fill='black')
 sheet.save(p/f'sheet-{first//4+1}.png')
print('pages',len(pdf))
