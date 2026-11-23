const missions = [
 {id:"colors",title:"Rainbow colors",pl:"Kolory",emoji:"🌈",desc:"Meet the colors!",words:[["❤️","red","czerwony"],["🧡","orange","pomarańczowy"],["💛","yellow","żółty"],["💚","green","zielony"],["💙","blue","niebieski"],["💜","purple","fioletowy"]],q:"What color is the sun?",a:["blue","yellow","green","red"],correct:"yellow"},
 {id:"animals",title:"Lovely animals",pl:"Zwierzęta",emoji:"🐾",desc:"Who says woof?",words:[["🐶","dog","pies"],["🐱","cat","kot"],["🐰","rabbit","królik"],["🐻","bear","niedźwiedź"],["🐸","frog","żaba"],["🐦","bird","ptak"]],q:"Which animal says 'meow'?",a:["dog","cat","bird","frog"],correct:"cat"},
 {id:"numbers",title:"Magic numbers",pl:"Liczby",emoji:"🔢",desc:"Count with Rumi!",words:[["1️⃣","one","jeden"],["2️⃣","two","dwa"],["3️⃣","three","trzy"],["4️⃣","four","cztery"],["5️⃣","five","pięć"],["6️⃣","six","sześć"]],q:"How do you say 3?",a:["one","two","three","five"],correct:"three"},
 {id:"food",title:"Yummy food",pl:"Jedzenie",emoji:"🍓",desc:"What do you like?",words:[["🍎","apple","jabłko"],["🍌","banana","banan"],["🍕","pizza","pizza"],["🥛","milk","mleko"],["🍓","strawberry","truskawka"],["🍦","ice cream","lody"]],q:"Which one is a fruit?",a:["milk","pizza","apple","ice cream"],correct:"apple"},
 {id:"greetings",title:"Say hello!",pl:"Powitania",emoji:"👋",desc:"Meet and greet!",words:[["👋","hello","cześć"],["🌞","good morning","dzień dobry"],["🌙","good night","dobranoc"],["😊","thank you","dziękuję"],["💜","please","proszę"],["🤗","goodbye","do widzenia"]],q:"What do you say when someone helps you?",a:["goodbye","thank you","good night","please"],correct:"thank you"},
 {id:"family",title:"My family",pl:"Rodzina",emoji:"👨‍👩‍👧",desc:"People we love!",words:[["👩","mother","mama"],["👨","father","tata"],["👧","sister","siostra"],["👦","brother","brat"],["👵","grandma","babcia"],["👴","grandpa","dziadek"]],q:"Who is your mother's mother?",a:["sister","grandma","brother","father"],correct:"grandma"},
 {id:"body",title:"Funny body",pl:"Części ciała",emoji:"🖐️",desc:"Touch your nose!",words:[["👀","eyes","oczy"],["👂","ears","uszy"],["👃","nose","nos"],["👄","mouth","usta"],["🖐️","hand","dłoń"],["🦶","foot","stopa"]],q:"What do you smell with?",a:["eyes","ears","nose","hand"],correct:"nose"},
 {id:"weather",title:"Weather time",pl:"Pogoda",emoji:"⛅",desc:"Look outside!",words:[["☀️","sunny","słonecznie"],["🌧️","rainy","deszczowo"],["❄️","snowy","śnieżnie"],["💨","windy","wietrznie"],["☁️","cloudy","pochmurno"],["🌈","rainbow","tęcza"]],q:"What is it when water falls from the sky?",a:["sunny","rainy","windy","snowy"],correct:"rainy"}

,
 {id:"clothes",title:"Fashion show",pl:"Ubrania",emoji:"👗",desc:"Dress up in English!",words:[["👕","T-shirt","koszulka"],["👖","jeans","dżinsy"],["👗","dress","sukienka"],["👟","shoes","buty"],["🧦","socks","skarpetki"],["🧥","jacket","kurtka"]],q:"What do you wear on your feet?",a:["jacket","shoes","dress","T-shirt"],correct:"shoes"},
 {id:"school",title:"School stars",pl:"Szkoła",emoji:"🎒",desc:"Ready for class?",words:[["📚","book","książka"],["✏️","pencil","ołówek"],["🎒","schoolbag","plecak"],["📏","ruler","linijka"],["🖍️","crayon","kredka"],["🪑","chair","krzesło"]],q:"What do you write with?",a:["pencil","chair","book","ruler"],correct:"pencil"},
 {id:"home",title:"My cosy home",pl:"Dom",emoji:"🏠",desc:"Rooms and things!",words:[["🛏️","bed","łóżko"],["🚪","door","drzwi"],["🪟","window","okno"],["🛋️","sofa","sofa"],["🍽️","table","stół"],["💡","lamp","lampa"]],q:"Where do you sleep?",a:["table","bed","door","lamp"],correct:"bed"},
 {id:"transport",title:"Let's travel",pl:"Transport",emoji:"🚲",desc:"Go, go, go!",words:[["🚗","car","samochód"],["🚌","bus","autobus"],["🚲","bike","rower"],["🚆","train","pociąg"],["✈️","plane","samolot"],["🚤","boat","łódź"]],q:"What flies in the sky?",a:["boat","bike","plane","bus"],correct:"plane"},
 {id:"feelings",title:"Feelings club",pl:"Emocje",emoji:"😊",desc:"How do you feel?",words:[["😊","happy","szczęśliwa"],["😢","sad","smutna"],["😴","tired","zmęczona"],["😠","angry","zła"],["😲","surprised","zaskoczona"],["🥰","love","miłość"]],q:"Which word means szczęśliwa?",a:["sad","happy","tired","angry"],correct:"happy"},
 {id:"nature",title:"Nature explorers",pl:"Przyroda",emoji:"🌳",desc:"Discover the world!",words:[["🌳","tree","drzewo"],["🌸","flower","kwiat"],["🌊","sea","morze"],["⛰️","mountain","góra"],["🌙","moon","księżyc"],["⭐","star","gwiazda"]],q:"What shines at night in the sky?",a:["tree","flower","star","sea"],correct:"star"},
 {id:"actions",title:"Action heroes",pl:"Czasowniki",emoji:"🏃",desc:"Move and say!",words:[["🏃","run","biegać"],["🚶","walk","chodzić"],["🦘","jump","skakać"],["💃","dance","tańczyć"],["🎤","sing","śpiewać"],["📖","read","czytać"]],q:"Which action means tańczyć?",a:["read","run","dance","walk"],correct:"dance"},
 {id:"time",title:"Time travellers",pl:"Czas",emoji:"⏰",desc:"Morning to night!",words:[["🌅","morning","rano"],["☀️","afternoon","popołudnie"],["🌆","evening","wieczór"],["🌙","night","noc"],["📅","today","dzisiaj"],["➡️","tomorrow","jutro"]],q:"What comes after today?",a:["yesterday","night","tomorrow","morning"],correct:"tomorrow"},
 {id:"prepositions",title:"Where is it?",pl:"Położenie",emoji:"📦",desc:"In, on and under!",words:[["📦","in","w"],["⬆️","on","na"],["⬇️","under","pod"],["↔️","next to","obok"],["🔙","behind","za"],["🔜","in front of","przed"]],q:"The cat is ___ the box (w środku).",a:["under","in","behind","on"],correct:"in"},
 {id:"phrases",title:"My first sentences",pl:"Zdania",emoji:"💬",desc:"Speak in full sentences!",words:[["💜","I like","Lubię"],["🙋","I am","Jestem"],["👀","I see","Widzę"],["🤝","I have","Mam"],["❓","What is this?","Co to jest?"],["✨","It is","To jest"]],q:"How do you say Lubię koty?",a:["I see cats","I like cats","I am cats","I have cats"],correct:"I like cats"},
 {id:"sports",title:"Move your body",pl:"Sport",emoji:"⚽",desc:"Play and have fun!",words:[["⚽","football","piłka nożna"],["🏊","swimming","pływanie"],["🏀","basketball","koszykówka"],["🎾","tennis","tenis"],["⛸️","skating","łyżwiarstwo"],["🧘","yoga","joga"]],q:"Which sport uses a racket?",a:["football","tennis","swimming","yoga"],correct:"tennis"},
 {id:"city",title:"Around town",pl:"Miasto",emoji:"🏙️",desc:"Places near you!",words:[["🏫","school","szkoła"],["🏥","hospital","szpital"],["🌳","park","park"],["📚","library","biblioteka"],["🛒","shop","sklep"],["🍽️","restaurant","restauracja"]],q:"Where can you borrow books?",a:["shop","park","library","hospital"],correct:"library"}
];
const $=s=>document.querySelector(s);
const defaults={stars:0,done:[],days:[],pin:"1234",name:"Superstar",aiEndpoint:"",reviews:{},sessions:0,wordsLearned:0,reviewed:0,dailyGoal:5};
const load=()=>{try{return {...defaults,...JSON.parse(localStorage.getItem("rumi20")||localStorage.getItem("rumi50")||localStorage.getItem("rumi30")||"{}")}}catch{return {...defaults}}};
let data=load(),current=null,quizDone=false;
let chatHistory=[];
function save(){localStorage.setItem("rumi20",JSON.stringify(data));render()}
function avatar(action,text){window.dispatchEvent(new CustomEvent("rumi-action",{detail:{action,text}}));if(text)$("#avatarSpeech").textContent=text}
function speak(word,lang="en-US"){if(!("speechSynthesis" in window)){return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang=lang;u.rate=.82;u.pitch=1.08;u.onstart=()=>avatar("talk",word);u.onend=()=>avatar("idle","Hi! I'm Rumi! 💜");speechSynthesis.speak(u)}
function allWords(){return missions.flatMap(m=>m.words.map(w=>({id:m.id+":"+w[1],mission:m.id,emoji:w[0],en:w[1],pl:w[2]})))}
function dueWords(){const now=Date.now();return allWords().filter(w=>{const r=data.reviews[w.id];return !!r&&(!r.due||r.due<=now)})}
function dayStamp(){return new Date().toISOString().slice(0,10)}
function render(){
 $("#reviewSummary").textContent=dueWords().length?`${dueWords().length} słówek czeka na powtórkę. Dzisiejszy cel: ${data.dailyGoal} kart.`:"Wszystko powtórzone! Wróć jutro po kolejną porcję słówek.";
 $("#streak").textContent=`⭐ ${data.stars}`;$("#totalStars").textContent=data.stars;$("#doneCount").textContent=`${data.done.length}/${missions.length}`;
 const pct=Math.round(data.done.length/missions.length*100);$("#progressLabel").textContent=pct+"%";$("#progressBar").style.width=pct+"%";
 $("#missionGrid").innerHTML=missions.map(m=>`<button class="mission" data-mission="${m.id}"><span class="emoji">${m.emoji}</span>${data.done.includes(m.id)?'<span class="done">✓</span>':''}<h3>${m.title}</h3><p>${m.pl} · ${m.desc}</p></button>`).join("");
 $("#weekGrid").innerHTML=["Pn","Wt","Śr","Cz","Pt","Sb","Nd"].map((d,i)=>`<div class="day ${data.days.includes(dayKey(i))?"active":""}">${d}<b>${data.days.includes(dayKey(i))?"★":"·"}</b></div>`).join("");
}
function dayKey(i){const d=new Date();const monday=(d.getDay()+6)%7;d.setDate(d.getDate()-monday+i);return d.toISOString().slice(0,10)}
function openLesson(id){current=missions.find(m=>m.id===id);quizDone=false;avatar("wave","Let's learn together! ✨");$("#lessonTag").textContent=current.pl.toUpperCase();$("#lessonTitle").textContent=current.title;$("#lessonBody").innerHTML=`<p class="lesson-intro">Posłuchaj słówek, powtórz je na głos i wybierz dobrą odpowiedź. You can do it! 💜</p><div class="word-grid">${current.words.map(w=>`<div class="word"><span class="picture">${w[0]}</span><strong>${w[1]}</strong><small>${w[2]}</small><br><button data-say="${w[1]}">🔊 Listen</button></div>`).join("")}</div><div class="quiz"><h3>🧠 ${current.q}</h3><div class="answers">${current.a.map(a=>`<button class="answer" data-answer="${a}">${a}</button>`).join("")}</div><div class="feedback" id="feedback"></div></div><button class="primary complete" id="completeMission" disabled>Ukończ misję ⭐</button>`;
 $("#lessonBody").querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>speak(b.dataset.say));
 $("#lessonBody").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{if(quizDone)return;const ok=b.dataset.answer===current.correct;$("#feedback").textContent=ok?"Amazing! Świetnie! 🌟":"Spróbuj jeszcze raz! Rumi wierzy w Ciebie!";$("#feedback").style.color=ok?"#65e0bd":"#ff8dc7";b.classList.add(ok?"correct":"wrong");if(ok){quizDone=true;$("#lessonBody").querySelectorAll("[data-answer]").forEach(x=>x.disabled=true);$("#completeMission").disabled=false;speak("Amazing! You did it!")}});
 $("#completeMission").onclick=()=>{if(!data.done.includes(current.id)){data.done.push(current.id);data.stars+=3;data.days.push(dayStamp());data.days=[...new Set(data.days)]}
  current.words.forEach(w=>{const id=current.id+":"+w[1];if(!data.reviews[id]){data.reviews[id]={box:0,due:Date.now(),seen:0};data.wordsLearned++}});data.sessions=(data.sessions||0)+1;save();avatar("celebrate","You are a superstar! ⭐");$("#lessonDialog").close()};
 $("#lessonDialog").showModal();
}
let reviewQueue=[],reviewIndex=0,activeReview=null;
function openReview(){
 reviewQueue=dueWords().slice(0,Math.max(1,data.dailyGoal));reviewIndex=0;
 if(!reviewQueue.length){alert("Brawo! Nie ma teraz słówek do powtórki. Wróć jutro! 💜");return}
 activeReview=reviewQueue[0];$("#lessonTag").textContent="SMART MEMORY";$("#lessonTitle").textContent="Powtórka z Rumi";showReviewCard();$("#lessonDialog").showModal();avatar("wave","Let's train your memory!");
}
function showReviewCard(){
 const w=reviewQueue[reviewIndex];activeReview=w;const r=data.reviews[w.id]||{box:0};
 const pct=Math.round(reviewIndex/reviewQueue.length*100);
 $("#lessonBody").innerHTML=`<div class="review-meter"><div style="width:${pct}%"></div></div><p class="review-counter">Karta ${reviewIndex+1} z ${reviewQueue.length} · poziom pamięci ${r.box}/4</p><div class="review-word">${w.emoji}</div><div class="review-word" style="font-size:30px;padding:2px">${w.en}</div><div class="review-translation" id="reviewTranslation">Pomyśl o polskim znaczeniu…</div><button class="primary complete" id="revealReview">Pokaż odpowiedź</button><div class="review-actions" id="reviewActions" hidden><button data-grade="0">Jeszcze raz</button><button data-grade="1">Trudne</button><button data-grade="2">Umiem!</button></div>`;
 $("#revealReview").onclick=()=>{$("#reviewTranslation").textContent=w.pl;$("#reviewActions").hidden=false;$("#revealReview").hidden=true;speak(w.en)};
 $("#reviewActions").querySelectorAll("[data-grade]").forEach(b=>b.onclick=()=>gradeReview(Number(b.dataset.grade)));
}
function gradeReview(grade){
 const w=activeReview;const old=data.reviews[w.id]||{box:0,seen:0};const box=grade===0?0:(grade===1?Math.max(1,old.box):Math.min(4,old.box+1));const days=[0,1,3,7,14][box];data.reviews[w.id]={box,due:Date.now()+days*86400000,seen:(old.seen||0)+1,last:Date.now()};data.reviewed=(data.reviewed||0)+1;if(grade===2)data.stars+=1;
 reviewIndex++;if(reviewIndex>=reviewQueue.length){data.days.push(dayStamp());data.days=[...new Set(data.days)];data.stars+=2;save();$("#lessonBody").innerHTML=`<div class="review-word">🏆</div><h3 style="text-align:center">Wspaniała praca!</h3><p style="text-align:center">Powtórzyłaś ${reviewQueue.length} słówek. Zdobywasz 2 gwiazdki!</p><button class="primary complete" id="finishReview">Gotowe</button>`;$("#finishReview").onclick=()=>{$("#lessonDialog").close();avatar("celebrate","Memory champion! ⭐")};return}
 save();showReviewCard();
}
$("#startReview").onclick=openReview;
$("#missionGrid").addEventListener("click",e=>{const b=e.target.closest("[data-mission]");if(b)openLesson(b.dataset.mission)});
$("#startMission").onclick=()=>openLesson(missions.find(m=>!data.done.includes(m.id))?.id||missions[0].id);
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).close());
$("#openChat").onclick=()=>{$("#chatDialog").showModal();chatHistory=[];avatar("wave","Let's talk in English!");$("#voiceStatus").textContent=data.aiEndpoint?"Tryb AI skonfigurowany — Rumi czeka na Twoją wiadomość.":"Tryb ćwiczeń lokalnych. Rodzic może podłączyć serwer AI w ustawieniach."};
function addBubble(text,who){const el=document.createElement("div");el.className="bubble "+who;el.textContent=text;$("#chatLog").append(el);$("#chatLog").scrollTop=$("#chatLog").scrollHeight}
const replies=[
 {test:/^(hello|hi|hey|good morning)/i,en:"Hello, superstar! What's your name?",pl:"Cześć, gwiazdo! Jak masz na imię?"},
 {test:/my name is|i am|i'm/i,en:"Lovely to meet you! How are you today?",pl:"Miło Cię poznać! Jak się dziś czujesz?"},
 {test:/good|fine|great|happy/i,en:"Wonderful! What is your favourite animal?",pl:"Wspaniale! Jakie jest Twoje ulubione zwierzątko?"},
 {test:/dog|cat|rabbit|bear|frog|bird/i,en:"I love animals too! Can you say: I like animals?",pl:"Ja też lubię zwierzęta! Powiedz: I like animals — Lubię zwierzęta."},
 {test:/thank/i,en:"You're welcome! You're doing great. ⭐",pl:"Nie ma za co! Świetnie Ci idzie."},
 {test:/bye|goodbye/i,en:"Bye-bye, superstar! See you next time! 👋",pl:"Pa, pa! Do zobaczenia następnym razem!"},
 {test:/help|don't know|nie wiem/i,en:"That's okay! Let's try together. Repeat: I am happy.",pl:"Nic nie szkodzi! Spróbujmy razem. Powtórz: I am happy — Jestem szczęśliwa."},
 {test:/red|blue|pink|purple|yellow|green/i,en:"Great color! Can you make a sentence: It is ...?",pl:"Świetny kolor! Ułóż zdanie: It is ... — To jest ..."},
 {test:/what is your name/i,en:"My name is Rumi! I'm your English learning friend. 💜",pl:"Mam na imię Rumi! Jestem Twoją przyjaciółką od angielskiego."},
 {test:/how are you/i,en:"I'm happy because we learn together! And you?",pl:"Jestem szczęśliwa, bo uczymy się razem! A Ty?"}
];
async function sendChat(){
 const input=$("#chatInput"),msg=input.value.trim();if(!msg)return;
 input.value="";addBubble(msg,"me");
 const send=$("#sendChat");send.disabled=true;$("#voiceStatus").textContent="Rumi układa odpowiedź…";
 chatHistory.push({role:"user",content:msg});chatHistory=chatHistory.slice(-10);
 let answer="";
 if(data.aiEndpoint){
  try{
   const endpoint=data.aiEndpoint.replace(/\/$/,"");
   const response=await fetch(endpoint+"/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({messages:chatHistory}),signal:AbortSignal.timeout(18000)});
   const payload=await response.json();if(!response.ok)throw new Error(payload.error||"AI offline");
   answer=String(payload.reply||"").slice(0,700);if(!answer)throw new Error("Pusta odpowiedź");
  }catch(err){$("#voiceStatus").textContent="AI jest chwilowo niedostępne — Rumi przełącza się na ćwiczenia lokalne.";}
 }
 if(!answer){const hit=replies.find(x=>x.test.test(msg));answer=hit?`${hit.en}\n${hit.pl}`:`Good try, superstar! 🌟 Let's practise: say "I like..." or "My name is..."\nDobra próba! Spróbuj powiedzieć „I like...” albo „My name is...”.`;}
 chatHistory.push({role:"assistant",content:answer});chatHistory=chatHistory.slice(-10);
 addBubble(answer,"rumi");const english=answer.split("\n")[0];speak(english);send.disabled=false;
 if(data.aiEndpoint)$("#voiceStatus").textContent="Rumi jest gotowa na kolejną rozmowę.";
}
$("#sendChat").onclick=sendChat;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendChat()});
let recognition=null;$("#micBtn").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("#voiceStatus").textContent="Ta wersja Android WebView nie udostępnia rozpoznawania mowy. Możesz wpisać odpowiedź.";return}if(recognition){recognition.stop();recognition=null;return}recognition=new SR();recognition.lang="en-US";recognition.interimResults=false;$("#voiceStatus").textContent="Rumi słucha... Say something in English!";avatar("listen","I'm listening! 👂");recognition.onresult=e=>{$("#chatInput").value=e.results[0][0].transcript;$("#voiceStatus").textContent="Usłyszałam! Sprawdź tekst i naciśnij Wyślij."};recognition.onerror=()=>$("#voiceStatus").textContent="Nie udało się rozpoznać głosu. Spróbuj ponownie.";recognition.onend=()=>{recognition=null;avatar("idle")};recognition.start()};
$("#parentOpen").onclick=()=>{$("#parentContent").innerHTML='<p>Wpisz PIN rodzica, aby zobaczyć ustawienia.</p><div class="pin-row"><input id="pinInput" type="password" inputmode="numeric" maxlength="8" placeholder="PIN"><button class="primary" id="pinSubmit">Otwórz</button></div><small class="muted">Domyślny PIN: 1234. Zmień go po pierwszym uruchomieniu.</small>';$ ("#parentDialog").showModal();$("#pinSubmit").onclick=parentLogin};
function parentLogin(){
 if($("#pinInput").value!==data.pin){$("#parentContent").insertAdjacentHTML("beforeend",'<p style="color:#ff8dc7">Nieprawidłowy PIN.</p>');return}
 $("#parentContent").innerHTML=`<p>Postępy dziecka pozostają na tym urządzeniu. Rozmowy nie są zapisywane po zamknięciu aplikacji.</p><div class="parent-stats"><div><strong>${data.stars}</strong>Gwiazdek</div><div><strong>${data.done.length}/${missions.length}</strong>Misji ukończonych</div><div><strong>${data.wordsLearned||0}</strong>Poznane słówka</div><div><strong>${data.reviewed||0}</strong>Powtórki</div></div><label>Adres bezpiecznego serwera AI (opcjonalnie)<br><input id="aiEndpoint" type="url" value="${(data.aiEndpoint||"").replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}" placeholder="https://twoj-serwer.example.com"></label><small class="muted">Klucz API musi pozostać na serwerze — nigdy nie wpisuj go tutaj. Bez adresu serwera działa tryb ćwiczeń offline.</small><div class="parent-actions" style="margin-top:12px"><button id="saveEndpoint">Zapisz serwer AI</button><button id="testEndpoint">Sprawdź połączenie</button></div><label>Nowy PIN rodzica<br><input id="newPin" type="password" inputmode="numeric" maxlength="8" placeholder="Minimum 4 cyfry"></label><div class="parent-actions" style="margin-top:15px"><button id="savePin">Zapisz PIN</button><button id="resetProgress">Wyczyść postępy</button><button id="exportProgress">Eksportuj postępy</button></div><p class="muted">Tryb AI wysyła tekst ostatnich wiadomości do skonfigurowanego serwera. Nie wysyła nagrań audio. Używaj pod nadzorem rodzica.</p>`;
 $("#saveEndpoint").onclick=()=>{const v=$("#aiEndpoint").value.trim().replace(/\/$/,"");if(v && !/^https:\/\//i.test(v) && !/^http:\/\/localhost(:\d+)?$/i.test(v)){alert("Wpisz adres HTTPS. HTTP jest dozwolone wyłącznie dla localhost.");return}data.aiEndpoint=v;save();alert(v?"Adres serwera zapisany.":"Wyłączono połączenie z AI.")};
 $("#testEndpoint").onclick=async()=>{const v=$("#aiEndpoint").value.trim().replace(/\/$/,"");if(!v){alert("Najpierw wpisz adres serwera.");return}try{const r=await fetch(v+"/health",{signal:AbortSignal.timeout(8000)});const j=await r.json();alert(r.ok?(j.aiConfigured?"Serwer działa, AI skonfigurowane.":"Serwer działa, ale nie ma klucza API."):"Serwer zwrócił błąd.")}catch{alert("Nie udało się połączyć z serwerem.")}};
 $("#savePin").onclick=()=>{const v=$("#newPin").value;if(v.length<4){alert("PIN powinien mieć co najmniej 4 znaki.");return}data.pin=v;save();alert("PIN zapisany na tym urządzeniu.")};
 $("#resetProgress").onclick=()=>{if(confirm("Czy na pewno wyczyścić postępy?")){data.done=[];data.stars=0;data.days=[];data.reviews={};data.wordsLearned=0;data.reviewed=0;data.sessions=0;save();parentLogin()}};
 $("#exportProgress").onclick=()=>{const blob=new Blob([JSON.stringify({version:"20.0",stars:data.stars,done:data.done,days:data.days,reviews:data.reviews,wordsLearned:data.wordsLearned,reviewed:data.reviewed,sessions:data.sessions},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="rumi-postepy.json";a.click();URL.revokeObjectURL(a.href)}
}
render();
