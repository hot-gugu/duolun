async function r(e,a){if(e.value)return{started:!1};e.value=!0;try{return{started:!0,value:await a()}}finally{e.value=!1}}export{r};
