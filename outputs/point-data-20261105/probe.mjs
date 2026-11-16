import { createRequire } from 'node:module';
const require=createRequire('C:/Users/65170/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
try { const {Workbook}=require('@oai/artifact-tool'); const w=Workbook.create();w.worksheets.add('test'); console.log('ARTIFACT_AVAILABLE'); } catch(e){console.log(e.stack);process.exitCode=1}
