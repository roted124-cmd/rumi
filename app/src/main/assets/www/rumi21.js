/* RUMI 21.0 — safe learning backups, restore and parent-controlled study settings. */
(()=>{
  const $=s=>document.querySelector(s);
  const KEY='rumi21-learning-backup';
  const validMissionIds=new Set(missions.map(m=>m.id));
  const validWordIds=new Set(allWords().map(w=>w.id));
  const learningKeys=['stars','done','days','reviews','sessions','wordsLearned','reviewed','xp','dailyChallenges','challengeDate','dailyGoal'];
  const safeSnapshot=()=>({
    schema:1,app:'RUMI',version:'21.0.0',exportedAt:new Date().toISOString(),
    progress:Object.fromEntries(learningKeys.map(k=>[k,data[k]??defaults[k]??null]))
  });
  function validateBackup(x){
    if(!x||x.app!=='RUMI'||x.schema!==1||!x.progress||typeof x.progress!=='object')throw new Error('To nie jest prawidłowa kopia RUMI.');
    const p=x.progress;
    if(!Array.isArray(p.done)||p.done.some(id=>!validMissionIds.has(id)))throw new Error('Kopia zawiera nieprawidłową listę misji.');
    if(!Array.isArray(p.days)||p.days.length>5000||p.days.some(d=>typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d)))throw new Error('Nieprawidłowe daty nauki.');
    if(!p.reviews||typeof p.reviews!=='object'||Array.isArray(p.reviews))throw new Error('Nieprawidłowe dane powtórek.');
    const reviews={};
    for(const [id,r] of Object.entries(p.reviews)){
      if(!validWordIds.has(id)||!r||!Number.isInteger(r.box)||r.box<0||r.box>4)continue;
      reviews[id]={box:r.box,due:Number.isFinite(r.due)?Math.max(0,r.due):Date.now(),seen:Number.isFinite(r.seen)?Math.max(0,Math.min(100000,r.seen)):0,last:Number.isFinite(r.last)?r.last:0};
    }
    const num=k=>Number.isFinite(Number(p[k]))?Math.max(0,Math.min(1000000,Math.floor(Number(p[k])))):0;
    return {stars:num('stars'),done:[...new Set(p.done)],days:[...new Set(p.days)],reviews,sessions:num('sessions'),wordsLearned:num('wordsLearned'),reviewed:num('reviewed'),xp:num('xp'),dailyChallenges:num('dailyChallenges'),challengeDate:typeof p.challengeDate==='string'?p.challengeDate:'',dailyGoal:Math.max(3,Math.min(10,num('dailyGoal')||5))};
  }
  function attachBackupControls(host){
    if(!host||host.querySelector('#r21Backup'))return;
    const section=document.createElement('section');section.id='r21Backup';section.className='r21-settings';
    section.innerHTML=`<hr><h3>RUMI 21 · Kopia i ustawienia nauki</h3>
      <p class="muted">Kopia zawiera postępy, misje i harmonogram powtórek. Nie zawiera PIN-u rodzica, adresu AI ani rozmów.</p>
      <div class="parent-actions"><button id="r21Export" type="button">Pobierz kopię</button><button id="r21Choose" type="button">Przywróć kopię</button></div>
      <input id="r21File" type="file" accept="application/json,.json" hidden>
      <label for="r21Goal">Cel dzienny — liczba kart powtórek</label><select id="r21Goal"><option value="3">3 karty</option><option value="5">5 kart</option><option value="7">7 kart</option><option value="10">10 kart</option></select>
      <p class="muted" id="r21Status" role="status" aria-live="polite">Ustawienia są przechowywane lokalnie na tym urządzeniu.</p>`;
    host.append(section);
    const goal=$('#r21Goal');goal.value=String([3,5,7,10].includes(Number(data.dailyGoal))?data.dailyGoal:5);
    goal.onchange=()=>{data.dailyGoal=Number(goal.value);save();$('#r21Status').textContent='Zapisano dzienny cel.'};
    $('#r21Export').onclick=()=>{
      const blob=new Blob([JSON.stringify(safeSnapshot(),null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`rumi-kopia-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      $('#r21Status').textContent='Kopia postępów została przygotowana.';
    };
    $('#r21Choose').onclick=()=>$('#r21File').click();
    $('#r21File').onchange=async e=>{
      const file=e.target.files?.[0];if(!file)return;
      try{
        if(file.size>2*1024*1024)throw new Error('Plik kopii jest zbyt duży.');
        const parsed=JSON.parse(await file.text()),restored=validateBackup(parsed);
        if(!confirm('Przywrócić postępy z kopii? Bieżące postępy nauki zostaną zastąpione. PIN i ustawienia serwera AI pozostaną bez zmian.'))return;
        Object.assign(data,restored);save();goal.value=String(data.dailyGoal);
        $('#r21Status').textContent='Przywrócono postępy. Panel został odświeżony.';
      }catch(err){$('#r21Status').textContent=err.message||'Nie udało się odczytać kopii.'}
      finally{e.target.value=''}
    };
  }
  const parentLogin21=parentLogin;
  parentLogin=function(){parentLogin21();attachBackupControls($('#parentContent'))};
  const speak21=speak;
  speak=function(word,lang='en-US'){
    if(!('speechSynthesis'in window))return;
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang=lang;
    u.rate=Math.max(.65,Math.min(1.05,Number(data.voiceRate)||.82));u.pitch=1.08;
    u.onstart=()=>avatar('talk',word);u.onend=()=>avatar('idle',"Hi! I'm Rumi! 💜");speechSynthesis.speak(u);
  };
  window.RUMI21={validateBackup,snapshot:safeSnapshot};
  render();
})();
