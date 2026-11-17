import {request, ready} from './local-data.js';
class ApiError extends Error{constructor(message,status=400,code=400){super(message);this.name='ApiError';this.status=status;this.code=code}}
const run=(...args)=>request(...args).catch(e=>{throw e instanceof ApiError?e:new ApiError(e.message)});
const api={get:(url,config)=>run('GET',url,undefined,config),post:(url,data,config)=>run('POST',url,data,config),put:(url,data,config)=>run('PUT',url,data,config),delete:(url,config)=>run('DELETE',url,config?.data,config),getBlob:(url,config)=>run('BLOB',url,undefined,config),postForm:(url,data)=>run('FORM',url,data)};
const raw={get:async(url,config)=>({status:200,data:await api.get(url,config)})};
const session=()=>({user:{id:'DEMO-LOCAL',userId:'DEMO-LOCAL',tenantId:'DUOLUN-DEMO'}});
export{api as i,raw as p,ApiError as P,session as r};export const e=()=>null,j=()=>null,u=x=>x;
