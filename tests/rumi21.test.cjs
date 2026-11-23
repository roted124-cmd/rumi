const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('app/src/main/assets/www/rumi21.js', 'utf8');
const missions = [{id:'colors'},{id:'animals'}];
const words = [{id:'colors:red'},{id:'animals:cat'}];
const data = {stars:4,done:['colors'],days:['2026-11-23'],reviews:{},pin:'9876',aiEndpoint:'https://private.example'};
const context = {missions,allWords:()=>words,data,defaults:{dailyGoal:5},parentLogin(){},speak(){},render(){},avatar(){},window:{},document:{},URL:{},Blob:function(){},Date,Math,Number,String,Set,Array,Object,JSON,confirm:()=>false};
vm.runInNewContext(source, context);
const api = context.window.RUMI21;
test('creates a backup without PIN or AI endpoint', () => {
  const backup = api.snapshot();
  assert.equal(backup.app, 'RUMI');
  assert.equal(backup.version, '21.0.0');
  assert.equal('pin' in backup.progress, false);
  assert.equal('aiEndpoint' in backup.progress, false);
});
test('validates and bounds a learning backup', () => {
  const result = api.validateBackup({app:'RUMI',schema:1,progress:{done:['colors','colors'],days:['2026-11-23'],reviews:{'colors:red':{box:4,due:10,seen:2}},stars:12,dailyGoal:7}});
  assert.deepEqual(Array.from(result.done), ['colors']);
  assert.equal(result.stars, 12);
  assert.equal(result.dailyGoal, 7);
  assert.equal(result.reviews['colors:red'].box, 4);
});
test('rejects a foreign or malformed backup', () => {
  assert.throws(()=>api.validateBackup({app:'OTHER',schema:1,progress:{}}), /prawidłowa kopia/);
  assert.throws(()=>api.validateBackup({app:'RUMI',schema:1,progress:{done:['not-a-mission'],days:[],reviews:{}}}), /misji/);
});
