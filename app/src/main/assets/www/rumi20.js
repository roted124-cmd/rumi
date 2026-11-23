/* RUMI 20.0: adaptive practice, mini-games, achievements and parent analytics.
   Runs locally; no extra tracking or third-party service is introduced. */
(()=>{
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today=()=>new Date().toLocaleDateString('en-CA');
  const words=()=>allWords();
  const oldRender=render;
  function level(){const n=Number(data.xp||0);return Math.min(10,1+Math.floor(n/60))}
  function earned(){const w=Number(data.wordsLearned||0),m=data.done.length,s=Number(data.stars||0),r=Number(data.reviewed||0);return [
    ["first-step","Pierwszy krok","Ukończ pierwszą misję",m>=1,"🌱"],
    ["five-missions","Mała odkrywczyni","Ukończ 5 misji",m>=5,"🧭"],
    ["all-missions","Gwiazda akademii","Ukończ wszystkie 20 misji",m>=20,"🏆"],
    ["word-collector","Łowczyni słówek","Poznaj 30 słówek",w>=30,"📚"],
    ["memory-pro","Mistrzyni pamięci","Wykonaj 20 powtórek",r>=20,"🧠"],
    ["star-collector","Deszcz gwiazd","Zdobądź 50 gwiazdek",s>=50,"⭐"],
    ["daily-hero","Codzienna bohaterka","Wykonaj 3 dzienne wyzwania",Number(data.dailyChallenges||0)>=3,"🌟"]
  ]}
  function render20(){
    oldRender();
    const main=document.querySelector('main'); if(!main)return;
    let panel=$('#rumi20Hub');
    if(!panel){panel=document.createElement('section');panel.id='rumi20Hub';main.insertBefore(panel,$('.practice-card'));}
    const lv=level(),xp=Number(data.xp||0),toNext=60-(xp%60),doneToday=data.challengeDate===today();
    const list=words();const seed=[...today()].reduce((a,c)=>a+c.charCodeAt(0),0);const challenge=list[seed%list.length];
    const badges=earned();
    panel.innerHTML=`
      <div class="r20-head"><div><span class="eyebrow">RUMI 20 · SMART ACADEMY</span><h2>Twoja akademia</h2><p>20 misji, codzienne wyzwania i gry językowe.</p></div><div class="r20-level"><b>LVL ${lv}</b><span>${xp} XP</span></div></div>
      <div class="r20-xp"><div style="width:${Math.round((xp%60)/60*100)}%"></div></div><div class="r20-sub">${toNext} XP do następnego poziomu</div>
      <div class="r20-grid">
       <article class="r20-card daily"><span class="eyebrow">WYZWANIE DNIA</span><div class="r20-challenge"><span>${challenge.emoji}</span><div><b>${esc(challenge.en)}</b><small>Jak powiesz to po polsku?</small></div></div><p id="r20ChallengeFeedback">${doneToday?'Dzisiejsze wyzwanie zaliczone! Wróć jutro.':'Wybierz prawidłowe znaczenie.'}</p><div class="r20-options">${[challenge.pl,...list.filter(w=>w.id!==challenge.id).sort((a,b)=>((a.en.length+seed)%7)-((b.en.length+seed)%7)).slice(0,3).map(w=>w.pl)].sort((a,b)=>((a.length+seed)%5)-((b.length+seed)%5)).map(x=>`<button class="r20-option" data-challenge="${esc(x)}" ${doneToday?'disabled':''}>${esc(x)}</button>`).join('')}</div></article>
       <article class="r20-card"><span class="eyebrow">SZYBKA GRA</span><h3>⚡ Błyskawiczny quiz</h3><p>Pięć krótkich pytań. Zdobywaj XP i gwiazdki.</p><button class="primary" id="r20Quiz">Graj teraz →</button></article>
       <article class="r20-card"><span class="eyebrow">UKŁADANIE ZDAŃ</span><h3>💬 Sentence studio</h3><p>Ułóż proste zdanie z angielskich słów.</p><button class="secondary" id="r20Sentence">Otwórz studio →</button></article>
       <article class="r20-card"><span class="eyebrow">KOLEKCJA</span><h3>🏅 Odznaki</h3><p>${badges.filter(x=>x[3]).length} z ${badges.length} zdobytych</p><div class="r20-badges">${badges.map(b=>`<span title="${esc(b[2])}" class="${b[3]?'unlocked':''}">${b[4]}</span>`).join('')}</div></article>
      </div>`;
    panel.querySelectorAll('[data-challenge]').forEach(b=>b.onclick=()=>{
      if(data.challengeDate===today())return;
      const good=b.dataset.challenge===challenge.pl;
      if(!good){$('#r20ChallengeFeedback').textContent='Jeszcze jedna próba! Rumi trzyma kciuki.';b.classList.add('bad');return;}
      data.challengeDate=today();data.dailyChallenges=(data.dailyChallenges||0)+1;data.xp=(data.xp||0)+15;data.stars=(data.stars||0)+2;
      $('#r20ChallengeFeedback').textContent='Świetnie! +15 XP i 2 gwiazdki!';panel.querySelectorAll('[data-challenge]').forEach(x=>x.disabled=true);b.classList.add('good');save();
    });
    $('#r20Quiz').onclick=quickQuiz;$('#r20Sentence').onclick=sentenceStudio;
  }
  function quickQuiz(){
    let pool=words().slice().sort(()=>Math.random()-.5).slice(0,5),i=0,score=0;
    const dlg=$('#lessonDialog');$('#lessonTag').textContent='RUMI ARCADE';$('#lessonTitle').textContent='Błyskawiczny quiz';
    const show=()=>{if(i>=pool.length){const xp=score*5;data.xp=(data.xp||0)+xp;data.stars=(data.stars||0)+score;$('#lessonBody').innerHTML=`<div class="r20-finish">🏆<h3>Wynik: ${score}/5</h3><p>Zdobywasz ${xp} XP i ${score} gwiazdek!</p><button class="primary" id="r20Done">Gotowe</button></div>`;$('#r20Done').onclick=()=>{save();dlg.close();avatar('celebrate','Amazing! You are a star!')};return;}
      const w=pool[i],opts=[w,...words().filter(x=>x.id!==w.id).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
      $('#lessonBody').innerHTML=`<div class="review-meter"><div style="width:${i/5*100}%"></div></div><p class="review-counter">Pytanie ${i+1} z 5</p><div class="review-word">${w.emoji}</div><h3 style="text-align:center">Co oznacza <b>${esc(w.en)}</b>?</h3><div class="r20-answer-grid">${opts.map(o=>`<button class="r20-option" data-q="${esc(o.id)}">${esc(o.pl)}</button>`).join('')}</div><p id="r20QFeedback" class="feedback"></p>`;
      $('#lessonBody').querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const ok=b.dataset.q===w.id;if(ok)score++;$('#r20QFeedback').textContent=ok?'Brawo! +1 punkt':'Dobra próba!';$('#r20QFeedback').style.color=ok?'#65e0bd':'#ff8dc7';$('#lessonBody').querySelectorAll('[data-q]').forEach(x=>x.disabled=true);setTimeout(()=>{i++;show()},650)});
    };show();dlg.showModal();
  }
  const sentenceSets=[
    {parts:['I','like','cats'],answer:'I like cats',pl:'Lubię koty.'},
    {parts:['I','am','happy'],answer:'I am happy',pl:'Jestem szczęśliwa.'},
    {parts:['It','is','blue'],answer:'It is blue',pl:'To jest niebieskie.'},
    {parts:['I','have','a dog'],answer:'I have a dog',pl:'Mam psa.'},
    {parts:['I','see','a star'],answer:'I see a star',pl:'Widzę gwiazdę.'}
  ];
  function sentenceStudio(){
    const s=sentenceSets[Math.floor(Math.random()*sentenceSets.length)],parts=s.parts.slice().sort(()=>Math.random()-.5);let picked=[];
    $('#lessonTag').textContent='SPEAKING LAB';$('#lessonTitle').textContent='Sentence studio';
    const draw=()=>{$('#lessonBody').innerHTML=`<p class="lesson-intro">Ułóż słowa we właściwej kolejności. Znaczenie: <b>${esc(s.pl)}</b></p><div class="r20-built" id="r20Built">${picked.length?picked.map((x,i)=>`<button data-remove="${i}">${esc(x)}</button>`).join(''):'Dotknij słów poniżej…'}</div><div class="r20-tiles">${parts.filter(x=>!picked.includes(x)).map(x=>`<button data-word="${esc(x)}">${esc(x)}</button>`).join('')}</div><p id="r20SentenceFeedback" class="feedback"></p><button class="primary" id="r20CheckSentence" ${picked.length!==s.parts.length?'disabled':''}>Sprawdź zdanie</button>`;
      $('#lessonBody').querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{picked.push(b.dataset.word);draw()});$('#lessonBody').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{picked.splice(Number(b.dataset.remove),1);draw()});$('#r20CheckSentence').onclick=()=>{if(picked.join(' ')===s.answer){data.xp=(data.xp||0)+10;data.stars=(data.stars||0)+2;$('#r20SentenceFeedback').textContent='Perfect sentence! +10 XP';$('#r20SentenceFeedback').style.color='#65e0bd';$('#r20CheckSentence').textContent='Zakończ';$('#r20CheckSentence').onclick=()=>{save();$('#lessonDialog').close()};speak(s.answer)}else{$('#r20SentenceFeedback').textContent='Prawie! Spróbuj zmienić kolejność.';$('#r20SentenceFeedback').style.color='#ff8dc7'}};
    };draw();$('#lessonDialog').showModal();
  }
  // Add XP to the existing lesson completion flow without changing the lesson engine.
  const originalOpenLesson=openLesson;
  openLesson=function(id){originalOpenLesson(id);const complete=$('#completeMission');if(complete&&!complete.dataset.r20){complete.dataset.r20='1';complete.addEventListener('click',()=>{data.xp=(data.xp||0)+25;save()})}};
  // Add XP for memory-card completion; preserve the original spaced-repetition logic.
  const originalGradeReview=gradeReview;
  gradeReview=function(g){const before=reviewIndex;originalGradeReview(g);if(reviewIndex>before){data.xp=(data.xp||0)+(g===2?5:2);save()}};
  // Extend parent dashboard after the original PIN-protected screen is opened.
  const originalParentLogin=parentLogin;
  parentLogin=function(){originalParentLogin();const host=$('#parentContent');if(host&&host.querySelector('#exportProgress')&&!host.querySelector('.r20-parent')){const box=document.createElement('section');box.className='r20-parent';box.innerHTML=`<hr><h3>RUMI 20 · raport nauki</h3><div class="parent-stats"><div><strong>${level()}</strong>Poziom</div><div><strong>${data.xp||0}</strong>XP</div><div><strong>${earned().filter(x=>x[3]).length}/${earned().length}</strong>Odznaki</div><div><strong>${missions.length}</strong>Misje w programie</div></div><p class="muted">Wyniki gier i wyzwań są zapisywane lokalnie na tym urządzeniu.</p>`;host.append(box);}};
  render=render20; // app.js save() now refreshes the RUMI 20 dashboard
  window.addEventListener('beforeunload',()=>{try{localStorage.setItem('rumi20',JSON.stringify(data))}catch{}});
  render20();
})();
