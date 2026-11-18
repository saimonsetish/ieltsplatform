function band(r,n){var x=Math.round(r/n*40);return x>=39?9:x>=37?8.5:x>=35?8:x>=33?7.5:x>=30?7:x>=27?6.5:x>=23?6:x>=19?5.5:x>=16?5:x>=13?4.5:x>=10?4:3.5}
function ok(q,v){v=(v||"").trim().toLowerCase();return Array.isArray(q.a)?q.a.indexOf(v)>-1:v===q.a.toLowerCase()}
function avg(a){var s=0;a.forEach(function(x){s+=+x});return Math.round(s/a.length*2)/2}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function today(){return ds(new Date())}
function mark(){var t=today();if(D.days.indexOf(t)<0)D.days.push(t);var s=0,d=new Date();while(D.days.indexOf(ds(d))>-1){s++;d.setDate(d.getDate()-1)}D.streak=s}
function toast(m){var e=document.createElement("div");e.className="toast";e.textContent=m;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function boom(){}
function xp(n,m){D.xp+=n;D.act[today()]=(D.act[today()]||0)+1;mark();save();toast("+"+n+" XP"+(m?" · "+m:""))}
function dq(){return Q[new Date().getDate()%Q.length]}
function daily(v){var q=dq(),r=ok(q,v);D.daily={date:today(),ok:r};xp(r?15:5,r?"Correct!":"Good try");if(r)boom();draw()}
function go(v){S.view=v;S.hwid=S.recid=S.lid=null;window.scrollTo(0,0);draw()}
function login(r){S.role=r;S.view=r=="student"?"dash":"queue";draw()}
function submissionSkills(a){if(a.lab)return [a.lab];return ["W","S"].filter(function(k){return !!(a[k]&&a[k].text&&a[k].text.trim())})}
function submissionStatus(a){if(a.status)return a.status;var ks=submissionSkills(a);return ks.length?"submitted":"reviewed"}
function openReview(id){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;S.cur=id;if(a.status==="submitted"||!a.status)a.status="in_review";save();go("grade")}
function reviewDraftChange(id,k,i,v){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;a.reviewDraft=a.reviewDraft||{};a.reviewDraft[k]=a.reviewDraft[k]||{g:[],c:a[k].c||""};a.reviewDraft[k].g[i]=v;save()}
function reviewCommentChange(id,k,v){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;a.reviewDraft=a.reviewDraft||{};a.reviewDraft[k]=a.reviewDraft[k]||{g:[],c:""};a.reviewDraft[k].c=v;save()}
function saveReviewDraft(id){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;a.status="in_review";save();toast("Review draft saved")}
function start(){S.ans={};S.w="";S.s="";S.sec=0;S.ends=[];S.fl={};go("test")}
function setA(id,v){S.ans[id]=v;var c=document.getElementById("n_"+id);if(c)c.className="qn"+(v?" on":"")+(S.fl&&S.fl[id]?" fl":"")}
function speak(){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(SCRIPT);u.lang="en-GB";speechSynthesis.speak(u)}catch(e){alert("Audio unavailable in this browser")}}
function finish(){
 var wr=[],tot={Reading:0,Listening:0},sc={Reading:0,Listening:0};
 Q.forEach(function(q){tot[q.s]++;if(ok(q,S.ans[q.id]))sc[q.s]++;else wr.push({id:q.id,mine:S.ans[q.id]||"(blank)"})});
 var at={id:Date.now(),date:new Date().toLocaleDateString(),createdAt:Date.now(),studentId:"demo",studentName:D.name||"Student Demo",status:(S.w.trim()||S.s.trim())?"submitted":"reviewed",revisionNo:0,history:[],reviewDraft:{},wr:wr,
  R:{sc:sc.Reading,n:tot.Reading,b:band(sc.Reading,tot.Reading)},L:{sc:sc.Listening,n:tot.Listening,b:band(sc.Listening,tot.Listening)},
  W:{text:S.w,g:null,c:""},S:{text:S.s,g:null,c:""}};
 D.att.unshift(at);D.sc.R.push(at.R.b);D.sc.L.push(at.L.b);xp((sc.Reading+sc.Listening)*10+50,"Mock complete");S.cur=at.id;go("result");boom()}
function grade(id){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;var skills=submissionSkills(a);if(!skills.length){toast("There is no written response to review");return}
 var values={};for(var j=0;j<skills.length;j++){var k=skills[j],v=[];for(var i=0;i<4;i++){var e=document.getElementById(k+i),n=e?Number(e.value):NaN;if(!e||e.value===""||!Number.isFinite(n)||n<0||n>9||Math.round(n*2)!==n*2){toast("Enter all four "+(k==="W"?"Writing":"Speaking")+" scores from 0 to 9 in 0.5 steps");return}v.push(n)}values[k]=v}
 skills.forEach(function(k){var nw=!a[k].g;a[k].g=values[k];a[k].b=avg(values[k]);var d=(a.reviewDraft||{})[k]||{};a[k].c=d.c!==undefined?d.c:(a[k].c||"");if(nw&&!a.lab)D.sc[k].push(a[k].b)});
 a.status="reviewed";a.reviewedAt=Date.now();a.reviewDraft={};a.feedbackRequest="";save();toast("Feedback sent to "+(a.studentName||"the learner"));go("queue")}
function sendForRevision(id,k){var a=D.att.filter(function(x){return x.id==id})[0];if(!a)return;var d=(a.reviewDraft||{})[k]||{},message=d.c||a[k].c||"";if(!message.trim()){toast("Add feedback explaining what to improve in "+NM[k]);return}a.feedbackRequest=message;a.revisionSkill=k;a.status="revision_requested";a.reviewDraft={};save();toast(NM[k]+" revision requested");go("queue")}
function note(n,v){D.notes[n]=v;save()}
function stud(){var b=[];D.att.forEach(function(a){if(!a.lab){b.push(a.R.b);b.push(a.L.b)}});return b.length?avg(b):"–"}
function drill(s){S.dr=s;S.ans={};S.drDone=false;go('drill')}
function drillSubmit(){var n=0,t=0;Q.forEach(function(q){if(q.s==S.dr){t++;if(ok(q,S.ans[q.id]))n++}});S.drDone=[n,t];D.dl[today()]=1;var cs=D.cat[S.dr]=D.cat[S.dr]||{n:0,k:0};cs.n+=t;cs.k+=n;xp(n*10+5,n+'/'+t);if(n==t)boom();draw()}
