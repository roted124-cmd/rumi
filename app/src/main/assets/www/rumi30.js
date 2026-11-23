/* RUMI 30.0 — adaptive next-quest coach, focus sessions and offline app shell. */
(()=>{
  const $=s=>document.querySelector(s);
  const defaults30={focusMinutes:8,focusSessions:0,lastMission:'',missionAttempts:{},missionWins:{}};
  Object.keys(defaults30).forEach(k=>{if(data[k]===undefined)data[k]=defaults30[k]});
  const originalSave=save;
  save=function(){try{localStorage.setItem('rumi30',JSON.stringify(data))}catch{};originalSave()};
  const pickNext=()=>{
    const stats=data.missionWins||{};
    const unfinished=missions.filter(m=>!data.done.includes(m.id));
    const pool=unfinished.length?unfinished:missions;
    return pool.slice().sort((a,b)=>(stats[a.id]||0)-(stats[b.id]||0))[0];
  };
  function addCoach(){
    const main=document.querySelector('main');
    if(!main||$('#r30Coach'))return;
    const m=pickNext(), box=document.createElement('section');
    box.id='r30Coach';box.className='r30-coach';
    box.innerHTML=`<div><span class="eyebrow">RUMI SMART COACH · 30.0</span><h2>Twoja następna przygoda</h2><p id="r30Why">Rumi wybrała krótką misję, aby nauka była lekka i ciekawa.</p></div><div class="r30-next"><span>${m.emoji}</span><div><b>${m.pl}</b><small>${m.title}</small></div><button class="primary" id="r30Go">Start →</button></div>`;
    const anchor=$('#missionGrid');
    anchor?.parentNode.insertBefore(box,anchor);
    $('#r30Go').onclick=()=>openLesson(m.id);
  }
  const originalRender=render;
  render=function(){originalRender();addCoach()};
  const originalOpen=openLesson;
  openLesson=function(id){
    const before=data.done.includes(id);
    data.lastMission=id;
    data.missionAttempts[id]=(data.missionAttempts[id]||0)+1;
    originalOpen(id);
    const done=$('#completeMission');
    if(done&&!done.dataset.r30){
      done.dataset.r30='1';
      done.addEventListener('click',()=>{
        if(!before)data.missionWins[id]=(data.missionWins[id]||0)+1;
        save();
      });
    }
  };
  function focusWidget(host){
    if(!host||$('#r30Focus'))return;
    const section=document.createElement('section');section.id='r30Focus';section.className='r30-settings';
    section.innerHTML=`<hr><h3>RUMI 30 · rytm nauki</h3>
      <p class="muted">Krótkie sesje pomagają utrzymać uwagę. Zegar działa lokalnie i nie wysyła danych.</p>
      <label for="r30Minutes">Długość sesji</label><select id="r30Minutes"><option value="5">5 minut</option><option value="8">8 minut</option><option value="10">10 minut</option></select>
      <div class="r30-timer"><strong id="r30Clock">08:00</strong><span id="r30TimerState">Gotowa na małą przygodę?</span></div>
      <div class="parent-actions"><button type="button" id="r30Start">Start</button><button type="button" id="r30Reset">Reset</button></div>
      <p class="muted">Ukończone sesje: <b id="r30Count">${data.focusSessions}</b></p>`;
    host.append(section);
    const select=$('#r30Minutes');select.value=String([5,8,10].includes(data.focusMinutes)?data.focusMinutes:8);
    let remaining=Number(select.value)*60,interval=null,started=false;
    const paint=()=>{$('#r30Clock').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`};
    select.onchange=()=>{data.focusMinutes=Number(select.value);remaining=data.focusMinutes*60;save();paint()};
    $('#r30Start').onclick=()=>{
      if(interval){clearInterval(interval);interval=null;$('#r30Start').textContent='Wznów';$('#r30TimerState').textContent='Pauza';return}
      if(remaining<=0)remaining=Number(select.value)*60;
      started=true;$('#r30Start').textContent='Pauza';$('#r30TimerState').textContent='Świetnie! Skupiamy się na angielskim.';
      interval=setInterval(()=>{
        remaining--;paint();
        if(remaining<=0){clearInterval(interval);interval=null;data.focusSessions++;save();$('#r30Count').textContent=data.focusSessions;$('#r30Start').textContent='Jeszcze raz';$('#r30TimerState').textContent='Brawo! Czas na krótką przerwę.';avatar('celebrate','Amazing work! Take a little break!');}
      },1000);
    };
    $('#r30Reset').onclick=()=>{if(interval)clearInterval(interval);interval=null;remaining=Number(select.value)*60;started=false;$('#r30Start').textContent='Start';$('#r30TimerState').textContent='Gotowa na małą przygodę?';paint()};
    paint();
  }
  const parentBefore=parentLogin;
  parentLogin=function(){parentBefore();focusWidget($('#parentContent'))};
  if('serviceWorker'in navigator && location.protocol!=='file:'){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
  window.RUMI30={pickNext:()=>pickNext().id};
  render();
})();