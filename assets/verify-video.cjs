const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root='assets/video-inspection';const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const id of ['panel-area','video-grid-fullscreen','grid-select','auto-sort-play','overlay','sidebar-alert'])assert(html.includes('id="'+id+'"'),'missing original control '+id);
for(const name of ['switchLeftTab','switchGrid','toggleFullscreenDisplay','openAlertList','openCarouselModal','requestIgnoreAlert','confirmIgnoreAlert','renderAutomatic','renderManual'])assert(html.includes('function '+name+'('),'missing original workflow '+name);
assert(html.includes("const mode = 'key-area'"));assert(!html.includes('cdn.tailwindcss.com'));assert(!html.includes('navigation.js'));assert(!html.includes('查看作业'));assert(!html.includes('未绑定作业'));
for(const file of fs.readdirSync(root).filter(x=>x.endsWith('.html'))){const text=fs.readFileSync(path.join(root,file),'utf8');for(const match of text.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(match[1],{filename:file});for(const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/g)){const ref=match[1].split('?')[0];if(/^(https?:|#|data:|javascript:|\$)/.test(ref))continue;assert(fs.existsSync(path.resolve(root,ref)),file+' missing '+ref)}}
const main=fs.readFileSync('多伦智能巡检平台.html','utf8');assert(main.includes('video-inspection-frame'));assert(main.includes('duolun-video-nav'));assert(fs.existsSync(path.join(root,'AI预警实时和倒查标记.html')));assert(fs.existsSync(path.join(root,'人工标注工作台.html')));
console.log('PASS: original monitoring controls/workflows, key-area mode, removed work bindings, local asset references, marking/annotation pages, script syntax and menu embedding');
const css=fs.readFileSync(path.join(root,'utilities.css'),'utf8');
for(const rule of ['.px-4{padding-left:16px;padding-right:16px}', '.gap-4{gap:16px}', '.z-50{z-index:50}', '.w-\\[440px\\]{width:440px}', '.bottom-\\[68px\\]{bottom:68px}'])assert(css.includes(rule),'missing layout utility '+rule);
assert(!html.includes('是否绑定作业计划:'));console.log('PASS: spacing, arbitrary widths, positioning and overlay layers have concrete CSS declarations');
