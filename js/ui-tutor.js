function crit(k,cr,a){return cr.map(function(c,i){return '<div class="q"><label>'+c+'</label><input id="'+k+i+'" type="number" min="0" max="9" step="0.5" value="'+(a[k].g?a[k].g[i]:"")+'"></div>'}).join("")}
function tut(){var h="";
 if(S.view=="queue"){var pend=D.att.filter(function(a){return (a.W.text&&!a.W.g)||(a.S.text&&!a.S.g)});
  h+='<div class="card"><h2>Review queue ('+pend.length+')</h2>'+(pend.length?pend.map(function(a){return '<div class="row"><div>Student Demo · '+a.date+'<br><span class="mu">'+(a.lab?'Practice · '+NM[a.lab]:'R '+a.R.b+' · L '+a.L.b)+'</span></div><button onclick="S.cur='+a.id+';go(\'grade\')">Grade</button></div>'}).join(""):'<p class="mu">Nothing pending. Complete a mock as the student first.</p>')+'</div>';
  h+='<div class="card"><h2>Students (CRM)</h2><div class="sc"><table><tr><th>Student</th><th>Mocks</th><th>Avg R/L</th><th>Notes</th></tr><tr><td>Student Demo</td><td>'+D.att.length+'</td><td>'+stud()+'</td><td><input value="'+esc(D.notes.demo||"")+'" onchange="note(\'demo\',this.value)" placeholder="Lesson notes, goals…"></td></tr></table></div></div>'}
 if(S.view=="grade"){var a=D.att.filter(function(x){return x.id==S.cur})[0];
  h+='<div class="card"><h2>Writing</h2><p style="white-space:pre-wrap">'+(esc(a.W.text)||"(empty)")+'</p>'+crit("W",WS,a)+'<textarea id="Wc" style="min-height:70px" placeholder="Comment">'+esc(a.W.c)+'</textarea></div>';
  h+='<div class="card"><h2>Speaking</h2><p style="white-space:pre-wrap">'+(esc(a.S.text)||"(empty)")+'</p>'+crit("S",SS,a)+'<textarea id="Sc" style="min-height:70px" placeholder="Comment">'+esc(a.S.c)+'</textarea></div>';
  h+='<div class="row"><button class="g" onclick="go(\'queue\')">Cancel</button><button onclick="grade('+a.id+')">Save grades</button></div>'}
 return h}
