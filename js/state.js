var KEY="ielts_proto_v1";
function load(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d)return d}catch(e){}return{xp:0,streak:1,att:[],notes:{}}}
var D=load();function save(){try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}}
var S={role:null,view:"home",sec:0,ans:{},w:"",s:"",cur:null};
D.att.forEach(function(a){
 a.studentName=a.studentName||D.name||"Student Demo";
 a.studentId=a.studentId||"demo";
 a.createdAt=a.createdAt||Date.now();
 a.revisionNo=a.revisionNo||0;
 a.history=a.history||[];
 a.reviewDraft=a.reviewDraft||{};
 if(!a.status){var hasW=!!(a.W&&a.W.text),hasS=!!(a.S&&a.S.text);a.status=(hasW||hasS)?"submitted":"reviewed"}
});
D.days=D.days||[];D.daily=D.daily||{};D.target=D.target||7;D.cat=D.cat||{};D.dd=D.dd||{};D.miss=D.miss||[];D.ex=D.ex||{};D.prof=D.prof||{email:"",phone:"",city:"",goal:"University admission",prev:"None",hours:"5"};D.sc=D.sc||{R:[],L:[],W:[],S:[]};D.mins=D.mins||0;D.name=D.name||"Student";D.exam=D.exam||"";
D.draft=D.draft||{};
setInterval(function(){if(S.role=="student"){D.mins++;save()}},60000);
D.dl=D.dl||{};D.act=D.act||{};if(D.onb===undefined)D.onb=(D.xp>0||D.att.length>0)?1:0;
function ds(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
D.gv=D.gv||0;
