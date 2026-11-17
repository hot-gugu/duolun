from pathlib import Path
import re,urllib.request,concurrent.futures,json
base='http://112.27.198.15:9862/ai-nav-lowcode/assets/';out=Path('outputs/org-reference');todo={p.name for p in out.glob('Org*.js')}|{'preset-mlEAr3G_.js'};done=set();failed=[]
# Only collect static imports needed by these four views. Other application routes are not downloaded.
def grab(name):
 try:
  p=out/name
  if not p.exists():p.write_bytes(urllib.request.urlopen(base+name,timeout=25).read())
  s=p.read_text(encoding='utf-8');return name,s,None
 except Exception as e:return name,'',str(e)
while todo:
 batch=sorted(todo-done);todo=set()
 if not batch:break
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
  for name,s,error in pool.map(grab,batch):
   done.add(name)
   if error:failed.append([name,error]);continue
   todo.update(x[2:] for x in re.findall(r'(?:from|import)\s*["\'](\./[^"\']+\.js)["\']',s) if x[2:] not in done)
print('Static modules:',len(done),'Failures:',failed)
(out/'module-manifest.json').write_text(json.dumps(sorted(done)),encoding='utf-8')
