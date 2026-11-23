const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('app/src/main/assets/www/rumi30.js','utf8');
function setup(done=[]){
 const missions=[{id:'one'},{id:'two'},{id:'three'}];
 const data={done:done.slice(),missionWins:{one:2,two:0},missionAttempts:{},focusSessions:0};
 const document={querySelector:()=>null};
 const window={addEventListener(){}};
 const context={missions,data,defaults:{},save(){},render(){},openLesson(){},parentLogin(){},avatar(){},document,window,navigator:{},location:{protocol:'https:'},Date,Math,Number,String,Object,Array,Set,JSON,localStorage:{setItem(){}},setInterval,clearInterval};
 vm.runInNewContext(source,context);
 return {api:window.RUMI30,data};
}
test('Smart Coach proposes an unfinished mission first',()=>{
 const {api}=setup(['one']);
 assert.equal(api.pickNext(),'two');
});
test('Smart Coach revisits the least completed mission after the path is finished',()=>{
 const {api}=setup(['one','two','three']);
 assert.equal(api.pickNext(),'two');
});
test('RUMI 30 adds focus settings without replacing existing learning data',()=>{
 const {data}=setup(['one']);
 assert.deepEqual(Array.from(data.done),['one']);
 assert.equal(data.focusMinutes,8);
 assert.equal(data.focusSessions,0);
});
