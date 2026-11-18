var CATS=[["Vocabulary","Academic words and synonyms"],["Grammar","Accuracy and error correction"],["Reading","True/False/Not Given and strategy"],["Listening","Prediction, distractors, spelling"],["Writing","Task 1 and 2 structure, cohesion"],["Speaking","Parts 1 to 3 strategies"]];
function rnd(s){var x=0;for(var i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))>>>0;return function(){x=(x*1664525+1013904223)>>>0;return x/4294967296}}
function pick(arr,n,seed){var r=rnd(seed),a=arr.slice(),o=[];while(o.length<n&&a.length)o.push(a.splice(Math.floor(r()*a.length),1)[0]);return o}
function pok(q,v){return q.o?v===q.a:[].concat(q.a).indexOf((v||"").trim().toLowerCase())>-1}
function pStart(mode,c,list){var it;
 if(mode=="daily")it=pick(BANK,6,today());
 else if(mode=="cat"){D.ex[c]=(D.ex[c]||0)+1;it=pick(BANK.filter(function(b){return b.c==c}),5,today()+c+D.ex[c])}
 else if(mode=="miss")it=BANK.filter(function(b){return D.miss.indexOf(b.id)>-1}).slice(0,8);
 else it=list;
 if(!it||!it.length)return;S.P={mode:mode,c:c,items:it,i:0,sel:null,res:[],fin:false};go("dq")}
function pRec(v){var P=S.P,q=P.items[P.i];if(P.sel!==null)return;P.sel=v;var r=pok(q,v);P.res.push({id:q.id,v:v,r:r});
 var s=D.cat[q.c]=D.cat[q.c]||{n:0,k:0};s.n++;if(r)s.k++;var ix=D.miss.indexOf(q.id);if(r&&ix>-1)D.miss.splice(ix,1);if(!r&&ix<0)D.miss.push(q.id);save();draw()}
function pOpt(i){pRec(S.P.items[S.P.i].o[i])}
function pGap(){var v=document.getElementById("gi").value;if(v.trim())pRec(v)}
function pNext(){var P=S.P;P.i++;P.sel=null;if(P.i>=P.items.length){P.fin=true;var k=P.res.filter(function(r){return r.r}).length;if(P.mode=="daily")D.dd[today()]=1;xp(k*5+(P.mode=="daily"?20:0),k+"/"+P.items.length)}draw()}
function pRetry(){var ids=S.P.res.filter(function(r){return !r.r}).map(function(r){return r.id});pStart("retry",null,BANK.filter(function(b){return ids.indexOf(b.id)>-1}))}
function dqView(){var P=S.P,n=P.items.length,ttl={daily:"Daily set",cat:P.c,miss:"Review mistakes",retry:"Retry mistakes"}[P.mode];
 var h='<div class="top"><div class="mu">'+ttl+(P.fin?"":" · "+(P.i+1)+" of "+n)+'</div><button class="g" onclick="go(\'practice\')">Exit</button></div><div class="prog"><i style="width:'+(P.fin?100:P.i/n*100)+'%"></i></div>';
 if(P.fin){var k=P.res.filter(function(r){return r.r}).length,w=P.res.filter(function(r){return !r.r});
  h+='<div class="card"><div class="mu">Session complete</div><div class="big" style="color:var(--tx)">'+k+' / '+n+'</div><p class="mu">+'+(k*5+(P.mode=="daily"?20:0))+' XP · '+Math.round(k/n*100)+'% accuracy</p></div>';
  h+=w.length?'<div class="card"><h3>Review your mistakes</h3>'+w.map(function(r){var q=BANK.filter(function(b){return b.id==r.id})[0];return '<div class="q"><div>'+q.q+'</div><div class="mu">Your answer: '+esc(r.v)+'</div><div class="fb ok"><b>'+[].concat(q.a)[0]+'</b>. '+q.e+'</div></div>'}).join("")+'</div>':'<div class="card"><p class="ok">No mistakes. Excellent.</p></div>';
  return h+'<div class="row">'+(w.length?'<button onclick="pRetry()">Retry mistakes</button>':'')+'<button class="g" onclick="go(\'practice\')">Back to practice</button></div>'}
 var q=P.items[P.i],an=P.sel!==null,ok=an&&pok(q,P.sel);
 h+='<div class="card"><span class="pill">'+q.c+' · '+q.t+'</span><p style="font-size:16px;margin:12px 0">'+q.q+'</p>';
 if(q.o)h+=q.o.map(function(o,i){var c=an?(o===q.a?" ok":(o===P.sel?" no":"")):"";return '<button class="opt'+c+'" '+(an?"disabled":'onclick="pOpt('+i+')"')+'>'+o+'</button>'}).join("");
 else h+=an?'<input disabled value="'+esc(P.sel)+'">':'<div class="row"><input id="gi" placeholder="Type your answer"><button style="flex:none" onclick="pGap()">Check</button></div>';
 if(an)h+='<div class="fb '+(ok?"ok":"no")+'"><b>'+(ok?"Correct":"Not quite")+'.</b> '+(ok?"":"Answer: <b>"+[].concat(q.a)[0]+"</b>. ")+q.e+'</div><button onclick="pNext()">'+(P.i+1<n?"Next question":"Finish")+'</button>';
 return h+'</div>'}
function practice(){var dn=D.dd[today()],wk="";
 for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);wk+='<span class="'+(D.days.indexOf(ds(d))>-1?"d":"")+'">'+"SMTWTFS"[d.getDay()]+'</span>'}
 var h=ph("Practice","Short daily training that builds skills. It does not change your band estimate. Full exams are in Mock tests.");
 if(!D.gv)h+='<div class="card"><b>New to IELTS?</b><div class="mu" style="margin:4px 0 12px">Read the short guide to learn the format before you practise.</div><button class="g" onclick="go(\'guide\')">Open IELTS guide</button></div>';
 h+='<div class="hero2"><div class="top"><div><div class="eyebrow">TODAY\'S SET</div><h2 style="margin:6px 0 4px;font-size:20px">6 mixed questions</h2><div style="opacity:.8;font-size:13px">Vocabulary, grammar and exam strategy · about 5 minutes · +50 XP'+(dn?' · Completed today':'')+'</div></div><button onclick="pStart(\'daily\')">'+(dn?"Replay":"Start")+'</button></div><div class="days" style="margin-top:16px">'+wk+'</div><div style="margin-top:8px;font-size:12px;opacity:.8">Streak: '+D.streak+' days</div></div>';
 if(D.miss.length)h+='<div class="card"><div class="top"><div><h3 style="margin:0">Review mistakes</h3><div class="mu">'+D.miss.length+' question'+(D.miss.length>1?"s":"")+' you got wrong earlier</div></div><button class="g" onclick="pStart(\'miss\')">Review</button></div></div>';
 h+='<h3 style="margin:22px 0 10px">Topics</h3><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr));margin-bottom:16px">'+CATS.map(function(c){var s=D.cat[c[0]]||{n:0,k:0},p=s.n?Math.round(s.k/s.n*100):0;return '<div class="card" style="margin:0"><b>'+c[0]+'</b><div class="mu">'+c[1]+'</div><div class="bar"><i style="width:'+p+'%"></i></div><div class="top"><span class="mu">'+(s.n?p+"% accuracy · "+s.n+" answered":"Not started")+'</span><button class="g" onclick="pStart(\'cat\',\''+c[0]+'\')">Practice</button></div></div>'}).join("")+'</div>';
 var rows=[["R","Reading practice","True/False/Not Given, sentence completion"],["L","Listening practice","Note completion, multiple choice"],["W","Writing Task 2","Essay marked by your tutor on four criteria"],["S","Speaking Part 2","Cue card answer marked by your tutor"]].map(function(x){return '<div class="qst"><div><b>'+x[1]+'</b><div class="mu">'+x[2]+'</div></div><button class="g" onclick="startSkill(\''+x[0]+'\')">Start</button></div>'}).join("");
 var lb=D.att.filter(function(a){return a.lab});return h+'<div class="card"><h3>Skill practice</h3>'+rows+'</div>'+(lb.length?'<div class="card"><h3>Your tutor-marked tasks</h3>'+lb.map(function(a){var k=a.lab;return '<div class="qst"><div><b>'+NM[k]+' task</b><div class="mu">'+a.date+'</div></div>'+(a[k].g?'<span class="st g">Band '+a[k].b+'</span>':'<span class="st">Waiting for tutor</span>')+'</div>'}).join('')+'</div>':'')}
