/* ════════════════════════════════════════════════════════════════════
   FINTEX GLOBAL — PRACTICE PORTAL  (v11)
   Client + Team portal. Data persists in the browser (localStorage).
   NOTE: localStorage is per-browser/per-device — great for a live demo
   and single-operator use. For real multi-user shared data, connect a
   free backend (Supabase / Firebase) — see WEBSITE_GUIDE.html.
════════════════════════════════════════════════════════════════════ */

/* ---------- storage helper ---------- */
var DB = {
  get:function(k){try{var v=localStorage.getItem('fintex_'+k);return v===null?null:JSON.parse(v);}catch(e){return null;}},
  set:function(k,v){try{localStorage.setItem('fintex_'+k,JSON.stringify(v));}catch(e){}},
  del:function(k){try{localStorage.removeItem('fintex_'+k);}catch(e){}}
};
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
function today(){return new Date().toISOString().slice(0,10);}
function nowStr(){return new Date().toLocaleString();}

/* ---------- toast + modal ---------- */
function toast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},2600);}
function openModal(html){document.getElementById('modalBox').innerHTML=html;document.getElementById('modalBg').classList.add('show');}
function closeModal(){document.getElementById('modalBg').classList.remove('show');}
document.getElementById('modalBg').addEventListener('click',function(e){if(e.target===this)closeModal();});

/* ════════════════════════════════════════════════════════════════════
   SEED DEFAULT DATA (only if missing)
════════════════════════════════════════════════════════════════════ */
function seed(){
  if(!DB.get('team')) DB.set('team',[
    {id:uid(),name:'Harish Mannepalli',email:'admin@fintexglobal.com',password:'FintexAdmin2024!',role:'full_admin',status:'active'},
    {id:uid(),name:'Arun Kalluparampil',email:'arun@tensquare.com.au',password:'Arun2024!',role:'full_admin',status:'active'}
  ]);
  if(!DB.get('clients')) DB.set('clients',[
    {id:uid(),name:'Demo Client Pty Ltd',email:'client@example.com',password:'Client123!',region:'AU',service:'BAS Preparation',status:'active',entity:'Company',phone:'+61 4xx xxx xxx',created:today()},
    {id:uid(),name:'Priya Sharma',email:'priya@example.com',password:'Priya123!',region:'India',service:'GST Returns',status:'active',entity:'Individual',phone:'+91 9xxxxxxxxx',created:today()}
  ]);
  if(!DB.get('jobs')) DB.set('jobs',[
    {id:uid(),title:'FY24 Tax Return',client:'Demo Client Pty Ltd',service:'Tax Return',assignee:'Arun',due:'',priority:'high',stage:'progress',created:today()},
    {id:uid(),title:'Q1 BAS Lodgement',client:'Demo Client Pty Ltd',service:'BAS',assignee:'Harish',due:'',priority:'med',stage:'todo',created:today()},
    {id:uid(),title:'GST Reconciliation',client:'Priya Sharma',service:'GST',assignee:'Harish',due:'',priority:'low',stage:'review',created:today()}
  ]);
  if(!DB.get('onboarding')) DB.set('onboarding',[]);
  if(!DB.get('submissions')) DB.set('submissions',[]);
  if(!DB.get('signups')) DB.set('signups',[]);
  if(!DB.get('notifications')) DB.set('notifications',[]);
  if(!DB.get('intakeForm')) DB.set('intakeForm', defaultIntakeForm());
  if(!DB.get('audit')) DB.set('audit',[]);
  if(!DB.get('content')) DB.set('content',{
    testimonials:[
      {id:uid(),region:'AU',stars:5,text:'Harish handled our SMSF audit and company tax return for the last 3 years. Incredibly thorough and always meets every ATO deadline. Highly recommend to any Brisbane business owner.',name:'Michael T.',role:'Director, Retail Business · Brisbane QLD',initials:'MT'},
      {id:uid(),region:'AU',stars:5,text:'Our BAS lodgements have been stress-free since we moved to Fintex. The Xero reconciliation is spotless every quarter. Worth every cent for any AU small business.',name:'Sarah K.',role:'Owner, Consulting Firm · Gold Coast QLD',initials:'SK'},
      {id:uid(),region:'UAE',stars:5,text:'Fintex managed our UAE VAT registration and quarterly filings. Clear, timely, and completely FTA-compliant. They understand the UAE market and structure advice accordingly.',name:'Rajesh M.',role:'CEO, Trading Co. · Business Bay, Dubai',initials:'RM'},
      {id:uid(),region:'UAE',stars:5,text:'The UAE Corporate Tax guidance was excellent. Harish explained the Freezone qualifying rules clearly and structured our entities correctly before the first CT return.',name:'Priya S.',role:'CFO, Tech Startup · DMCC Free Zone',initials:'PS'},
      {id:uid(),region:'India',stars:5,text:'GST returns, TDS compliance and MCA filings — all handled on time every month. Fintex India team is responsive, accurate and very professional. Highly recommended.',name:'Arjun V.',role:'MD, Manufacturing Co. · Hyderabad',initials:'AV'},
      {id:uid(),region:'Global',stars:5,text:'As an Australian CPA firm we outsource our bookkeeping work to Fintex. The quality is AU-standard and turnaround is fast. It has genuinely transformed our practice efficiency.',name:'David L.',role:'Principal, CPA Practice · Melbourne VIC',initials:'DL'}
    ],
    banners:[
      {id:uid(),region:'AU',eyebrow:'Australia — New Clients',title:'Free BAS Review for New AU Clients',sub:'First-time clients get a complimentary BAS health check and tax position review. No obligation. Xero/MYOB/QuickBooks ready.',b1:'Get a Free Quote →',l1:'contact.html',b2:'Australian Services',l2:'services.html#au'},
      {id:uid(),region:'UAE',eyebrow:'UAE — Corporate Tax',title:'UAE Corporate Tax Registration Open',sub:'CT registration, taxable income calculation and CT301 returns — fully managed. FTA registered practice. Business Bay, Dubai.',b1:'Talk to Us →',l1:'contact.html',b2:'UAE Services',l2:'services.html#uae'},
      {id:uid(),region:'India',eyebrow:'India — GST Season',title:'GSTR-9 Annual Return Filing — FY 2024-25',sub:'Beat the deadline. Our India team handles end-to-end GST annual return filing, reconciliation and ITC verification.',b1:'Enquire Now →',l1:'contact.html',b2:'India Services',l2:'services.html#india'},
      {id:uid(),region:'Global',eyebrow:'Outsourcing',title:'AU CPA Firms: Cut Costs, Not Quality',sub:'White-label accounting outsourcing for Australian CPA firms. AU-standard trained staff in India. Xero/MYOB ready. Start with a trial engagement.',b1:'Start a Trial →',l1:'contact.html',b2:'Learn More',l2:'about.html'}
    ]
  });
  if(!DB.get('settings')) DB.set('settings',{
    company:{name:'Fintex Global Group',email:'info@fintexglobal.com',abn:'20 772 623 135',phone:'+971 55 728 2794'},
    sheetsUrl:'', emailjs:{service:'',template:'',key:''}, analytics:{provider:'',id:''},
    signup:{defaultPassword:'Welcome@Fintex1',mode:'default'},
    notify:{adminEmail:'admin@fintexglobal.com',adminWhatsApp:'971557282794'}
  });
}
seed();

/* ════════════════════════════════════════════════════════════════════
   RBAC
════════════════════════════════════════════════════════════════════ */
var ROLE_LABEL={viewer:'Viewer',editor:'Editor',editor_delete:'Editor + Delete',full_admin:'Full Admin'};
function roleRank(r){return {viewer:1,editor:2,editor_delete:3,full_admin:4}[r]||0;}
var SESSION=null; // {role:'admin'|'client', email, name, teamRole}
function can(perm){
  if(!SESSION||SESSION.role!=='admin') return false;
  var r=SESSION.teamRole;
  if(perm==='view')   return true;
  if(perm==='edit')   return roleRank(r)>=2;
  if(perm==='delete') return roleRank(r)>=3;
  if(perm==='admin')  return r==='full_admin';
  return false;
}
function applyPerms(){
  document.querySelectorAll('[data-perm]').forEach(function(el){
    var ok=can(el.getAttribute('data-perm'));
    el.disabled=!ok; el.style.display=ok?'':'none';
  });
  ['navTeam','navSettings','navAudit'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.style.display=can('admin')?'':'none';
  });
  var nc=document.getElementById('navContent'); if(nc) nc.style.display=can('edit')?'':'none';
  var nfm=document.getElementById('navForm'); if(nfm) nfm.style.display=can('edit')?'':'none';
  var bb=document.getElementById('bellBtn'); if(bb) bb.style.display=(SESSION&&SESSION.role==='admin')?'':'none';
}
function guard(perm){ if(!can(perm)){ toast('🔒 Your role does not allow this action.'); return false;} return true; }

/* ════════════════════════════════════════════════════════════════════
   AUDIT
════════════════════════════════════════════════════════════════════ */
function audit(action){
  var a=DB.get('audit')||[];
  a.unshift({time:nowStr(),user:(SESSION&&SESSION.name)||'system',action:action});
  if(a.length>500)a=a.slice(0,500);
  DB.set('audit',a);
}

/* ════════════════════════════════════════════════════════════════════
   AUTH
════════════════════════════════════════════════════════════════════ */
function switchTab(t){
  var c=t==='client';
  document.getElementById('seg-client').classList[c?'add':'remove']('active');
  document.getElementById('seg-admin').classList[c?'remove':'add']('active');
  document.getElementById('pane-client').classList[c?'add':'remove']('active');
  document.getElementById('pane-admin').classList[c?'remove':'add']('active');
  document.getElementById('c-err').style.display='none';
  document.getElementById('a-err').style.display='none';
}
function doClientLogin(){
  var email=document.getElementById('c-email').value.trim().toLowerCase();
  var pass=document.getElementById('c-pass').value;
  var c=(DB.get('clients')||[]).find(function(x){return x.email.toLowerCase()===email&&x.password===pass;});
  if(!c){document.getElementById('c-err').style.display='block';return;}
  if(c.status==='frozen'){document.getElementById('c-err').textContent='This account is currently on hold. Please contact us.';document.getElementById('c-err').style.display='block';return;}
  SESSION={role:'client',email:c.email,name:c.name};
  DB.set('session',SESSION);
  if(c.mustReset){forcePwReset(c);return;}
  showClient(c);
}
function doAdminLogin(){
  var email=document.getElementById('a-email').value.trim().toLowerCase();
  var pass=document.getElementById('a-pass').value;
  var m=(DB.get('team')||[]).find(function(x){return x.email.toLowerCase()===email&&x.password===pass;});
  if(!m||m.status==='disabled'){document.getElementById('a-err').style.display='block';return;}
  SESSION={role:'admin',email:m.email,name:m.name,teamRole:m.role};
  DB.set('session',SESSION);
  audit('Signed in');
  showAdmin();
}
function doLogout(){
  if(SESSION) audit('Signed out');
  DB.del('session'); SESSION=null;
  document.getElementById('loginPage').style.display='flex';
  document.getElementById('clientApp').classList.remove('show');
  document.getElementById('adminApp').classList.remove('show');
  document.getElementById('logoutBtn').style.display='none';
  document.getElementById('rolePill').style.display='none';
  ['c-email','c-pass','a-email','a-pass'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('c-err').textContent='Invalid email or password.';
  switchTab('client');
}

/* ════════════════════════════════════════════════════════════════════
   ADMIN SHELL
════════════════════════════════════════════════════════════════════ */
function showAdmin(){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('clientApp').classList.remove('show');
  document.getElementById('adminApp').classList.add('show');
  document.getElementById('logoutBtn').style.display='';
  var pill=document.getElementById('rolePill');
  pill.style.display=''; pill.textContent=ROLE_LABEL[SESSION.teamRole]||'Admin';
  document.getElementById('greet').textContent='Welcome back, '+(SESSION.name.split(' ')[0])+' 👋';
  document.getElementById('greetSub').textContent='Here is what is happening across Fintex Global today.';
  applyPerms();
  renderAll();
  go('dashboard',document.querySelector('.snav[data-sec="dashboard"]'));
}
function go(sec,btn){
  document.querySelectorAll('.snav').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  document.querySelectorAll('#adminApp .sec').forEach(function(s){s.classList.remove('active');});
  var el=document.getElementById('sec-'+sec); if(el)el.classList.add('active');
  document.getElementById('side').classList.remove('open');
  if(sec==='dashboard')renderDashboard();
  if(sec==='jobs')renderKanban();
  if(sec==='leads')renderLeads();
  if(sec==='onboarding')renderOnboarding();
  if(sec==='approvals')renderApprovals();
  if(sec==='content')renderContent();
  if(sec==='formbuilder')renderFormBuilder();
  if(sec==='clients')renderClients();
  if(sec==='documents')renderDocuments();
  if(sec==='reports')renderReports();
  if(sec==='team')renderTeam();
  if(sec==='settings')renderSettings();
  if(sec==='audit')renderAudit();
}
function renderAll(){
  syncSignupNotifs();
  renderDashboard();renderKanban();renderLeads();renderOnboarding();renderApprovals();renderContent();renderFormBuilder();
  renderClients();renderDocuments();renderReports();renderTeam();renderSettings();renderAudit();
  updateBadges();
}
function updateBadges(){
  var leads=getLeads().length, onb=(DB.get('onboarding')||[]).filter(function(o){return o.status!=='Completed';}).length;
  var pend=(DB.get('signups')||[]).filter(function(s){return s.status==='pending';}).length;
  var unread=(DB.get('notifications')||[]).filter(function(n){return !n.read;}).length;
  var bl=document.getElementById('bdgLeads'); if(bl){bl.textContent=leads; bl.style.display=leads?'':'none';}
  var bo=document.getElementById('bdgOnb'); if(bo){bo.textContent=onb; bo.style.display=onb?'':'none';}
  var ba=document.getElementById('bdgApprovals'); if(ba){ba.textContent=pend; ba.style.display=pend?'':'none';}
  var bd=document.getElementById('bellDot'); if(bd){bd.textContent=unread; bd.style.display=unread?'':'none';}
}

/* ---------- shared data accessors ---------- */
function getAnalytics(){try{return JSON.parse(localStorage.getItem('fintex_analytics')||'{}');}catch(e){return {};}}
function getLeads(){var a=getAnalytics();return (a.leads||[]).slice().reverse();}
function getFootfall(){
  var a=getAnalytics(); var visits=a.visits||[]; var days={};
  for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days[d.toISOString().slice(0,10)]=0;}
  visits.forEach(function(v){if(v.date in days)days[v.date]++;});
  // if no real visits yet, fall back to pageview total spread (demo nicety)
  return days;
}

/* ════════════════════════════════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════════════════════════════════ */
function renderDashboard(){
  var clients=DB.get('clients')||[], jobs=DB.get('jobs')||[], onb=DB.get('onboarding')||[];
  var leads=getLeads();
  var openJobs=jobs.filter(function(j){return j.stage!=='done';}).length;
  var activeOnb=onb.filter(function(o){return o.status!=='Completed';}).length;
  var foot=getFootfall(); var footTotal=0; for(var k in foot)footTotal+=foot[k];
  var kpis=[
    {n:clients.filter(function(c){return c.status!=='frozen';}).length,l:'Active clients'},
    {n:openJobs,l:'Open jobs'},
    {n:leads.length,l:'Total leads'},
    {n:activeOnb,l:'Onboarding in progress'},
    {n:footTotal,l:'Visits (7 days)'}
  ];
  document.getElementById('kpis').innerHTML=kpis.map(function(x){
    return '<div class="kpi"><div class="kpi-n">'+x.n+'</div><div class="kpi-l">'+x.l+'</div></div>';
  }).join('');
  // footfall bar chart (SVG)
  var keys=Object.keys(foot), max=Math.max(1,Math.max.apply(null,keys.map(function(d){return foot[d];})));
  var W=Math.max(320,keys.length*64), H=170, pad=26, bw=34, gap=(W-pad*2-bw*keys.length)/Math.max(1,keys.length-1);
  var bars=keys.map(function(d,i){
    var h=Math.round((foot[d]/max)*(H-pad*2));
    var x=pad+i*(bw+gap), y=H-pad-h;
    var lbl=d.slice(5); // MM-DD
    return '<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+Math.max(2,h)+'" rx="5" fill="url(#bg1)"/>'+
           '<text x="'+(x+bw/2)+'" y="'+(H-pad+13)+'" fill="#7FA8C9" font-size="9" text-anchor="middle">'+lbl+'</text>'+
           '<text x="'+(x+bw/2)+'" y="'+(y-5)+'" fill="#A9D6F0" font-size="10" text-anchor="middle" font-weight="700">'+(foot[d]||'')+'</text>';
  }).join('');
  document.getElementById('footChart').innerHTML=
    (footTotal===0?'<div class="note" style="margin-bottom:12px;">No website visits recorded yet on this browser. Footfall counts visits made on this device. For true cross-visitor totals, connect a free analytics tool in Settings → Analytics.</div>':'')+
    '<svg viewBox="0 0 '+W+' '+H+'" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:'+W+'px;">'+
    '<defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#48CAE4"/><stop offset="1" stop-color="#1E4B7A"/></linearGradient></defs>'+bars+'</svg>';
  // recent activity
  var a=(DB.get('audit')||[]).slice(0,8);
  document.getElementById('recent').innerHTML=a.length?a.map(function(x){
    return '<div style="padding:7px 0;border-bottom:1px solid rgba(150,205,240,.07);">'+
      '<span style="color:var(--cyan-lt);">'+esc(x.user)+'</span> · '+esc(x.action)+
      ' <span style="color:var(--muted);float:right;">'+esc(x.time)+'</span></div>';
  }).join(''):'<div class="empty">No activity yet.</div>';
}

/* ════════════════════════════════════════════════════════════════════
   JOB MANAGER (Kanban)
════════════════════════════════════════════════════════════════════ */
var STAGES=[{k:'todo',t:'To Do',c:'#7FA8C9'},{k:'progress',t:'In Progress',c:'#2E86C1'},{k:'review',t:'Review',c:'#FBBF24'},{k:'done',t:'Done',c:'#34D399'}];
function renderKanban(){
  var jobs=DB.get('jobs')||[];
  document.getElementById('kanban').innerHTML=STAGES.map(function(s){
    var items=jobs.filter(function(j){return j.stage===s.k;});
    var cards=items.map(function(j){
      return '<div class="kcard" draggable="true" ondragstart="dragJob(event,\''+j.id+'\')" onclick="openJobModal(\''+j.id+'\')">'+
        '<div class="kcard-t">'+esc(j.title)+'</div>'+
        '<div class="kcard-m"><span class="prio '+esc(j.priority)+'">'+esc(j.priority).toUpperCase()+'</span>'+
        '<span>👤 '+esc(j.client||'—')+'</span>'+(j.due?'<span>📅 '+esc(j.due)+'</span>':'')+'</div></div>';
    }).join('')||'<div style="font-size:.72rem;color:var(--muted);padding:8px 2px;">Drop jobs here</div>';
    return '<div class="kcol" ondragover="event.preventDefault();this.classList.add(\'drag\');" ondragleave="this.classList.remove(\'drag\')" ondrop="dropJob(event,\''+s.k+'\',this)">'+
      '<div class="kcol-h"><span><span class="dot" style="background:'+s.c+'"></span>'+s.t+'</span><span class="kcount">'+items.length+'</span></div>'+cards+'</div>';
  }).join('');
}
var _dragId=null;
function dragJob(e,id){_dragId=id;try{e.dataTransfer.setData('text/plain',id);}catch(x){}}
function dropJob(e,stage,col){
  e.preventDefault(); col.classList.remove('drag');
  if(!can('edit')){toast('🔒 Your role does not allow moving jobs.');return;}
  var id=_dragId; var jobs=DB.get('jobs')||[];
  var j=jobs.find(function(x){return x.id===id;}); if(!j)return;
  if(j.stage!==stage){j.stage=stage;DB.set('jobs',jobs);audit('Moved job "'+j.title+'" → '+stage);renderKanban();renderDashboard();updateBadges();}
  _dragId=null;
}
function openJobModal(id){
  var jobs=DB.get('jobs')||[]; var j=id?jobs.find(function(x){return x.id===id;}):null;
  if(id&&!can('edit')){return openReadJob(j);}
  if(!id&&!guard('edit'))return;
  var clients=DB.get('clients')||[];
  var team=DB.get('team')||[];
  var copts=clients.map(function(c){return '<option'+(j&&j.client===c.name?' selected':'')+'>'+esc(c.name)+'</option>';}).join('');
  var aopts=team.map(function(m){var fn=m.name.split(' ')[0];return '<option'+(j&&j.assignee===fn?' selected':'')+'>'+esc(fn)+'</option>';}).join('');
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">'+(id?'Edit job':'New job')+'</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="fld"><label class="lab">Job title</label><input class="inp" id="j-title" value="'+esc(j?j.title:'')+'" placeholder="e.g. FY24 Tax Return"/></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Client</label><select class="inp" id="j-client"><option value="">— none —</option>'+copts+'</select></div>'+
    '<div class="fld"><label class="lab">Service</label><input class="inp" id="j-service" value="'+esc(j?j.service:'')+'" placeholder="e.g. BAS"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Assignee</label><select class="inp" id="j-assignee"><option value="">— unassigned —</option>'+aopts+'</select></div>'+
    '<div class="fld"><label class="lab">Due date</label><input class="inp" type="date" id="j-due" value="'+esc(j?j.due:'')+'"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Priority</label><select class="inp" id="j-prio">'+
      ['high','med','low'].map(function(p){return '<option value="'+p+'"'+(j&&j.priority===p?' selected':'')+'>'+p.toUpperCase()+'</option>';}).join('')+'</select></div>'+
    '<div class="fld"><label class="lab">Stage</label><select class="inp" id="j-stage">'+
      STAGES.map(function(s){return '<option value="'+s.k+'"'+(j&&j.stage===s.k?' selected':'')+'>'+s.t+'</option>';}).join('')+'</select></div></div>'+
    '<div class="row-acts" style="margin-top:8px;justify-content:flex-end;">'+
      (id&&can('delete')?'<button class="ab red" onclick="delJob(\''+id+'\')">Delete</button>':'')+
      '<button class="ab green" onclick="saveJob('+(id?'\''+id+'\'':'null')+')">Save job</button></div>'
  );
}
function openReadJob(j){
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">'+esc(j.title)+'</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note">Client: '+esc(j.client||'—')+'<br>Service: '+esc(j.service||'—')+'<br>Assignee: '+esc(j.assignee||'—')+'<br>Due: '+esc(j.due||'—')+'<br>Priority: '+esc(j.priority).toUpperCase()+'<br>Stage: '+esc(j.stage)+'</div>'+
    '<div class="row-acts" style="margin-top:12px;justify-content:flex-end;"><button class="ab" onclick="closeModal()">Close</button></div>');
}
function saveJob(id){
  if(!guard('edit'))return;
  var title=document.getElementById('j-title').value.trim();
  if(!title){toast('Please enter a job title.');return;}
  var jobs=DB.get('jobs')||[];
  var data={title:title,client:document.getElementById('j-client').value,service:document.getElementById('j-service').value.trim(),
    assignee:document.getElementById('j-assignee').value,due:document.getElementById('j-due').value,
    priority:document.getElementById('j-prio').value,stage:document.getElementById('j-stage').value};
  if(id){var j=jobs.find(function(x){return x.id===id;});Object.assign(j,data);audit('Edited job "'+title+'"');}
  else{data.id=uid();data.created=today();jobs.push(data);audit('Created job "'+title+'"');}
  DB.set('jobs',jobs);closeModal();toast('Job saved ✓');renderKanban();renderDashboard();updateBadges();
}
function delJob(id){
  if(!guard('delete'))return;
  var jobs=DB.get('jobs')||[]; var j=jobs.find(function(x){return x.id===id;});
  jobs=jobs.filter(function(x){return x.id!==id;});DB.set('jobs',jobs);
  audit('Deleted job "'+(j?j.title:id)+'"');closeModal();toast('Job deleted');renderKanban();renderDashboard();
}

/* ════════════════════════════════════════════════════════════════════
   LEADS
════════════════════════════════════════════════════════════════════ */
function regionTag(r){
  var m={AU:'au',Australia:'au',India:'in',UAE:'uae',Dubai:'uae'};var cls=m[r]||'muted';
  return '<span class="tag '+cls+'">'+esc(r||'—')+'</span>';
}
function renderLeads(){
  var leads=getLeads();
  var b=document.getElementById('leadsBody');
  if(!leads.length){b.innerHTML='<tr><td colspan="6"><div class="empty">No leads yet. They arrive here automatically from the website contact form.</div></td></tr>';return;}
  b.innerHTML=leads.map(function(l,i){
    var d=l.timestamp?new Date(l.timestamp).toLocaleDateString():'—';
    return '<tr><td>'+esc(d)+'</td><td>'+esc(l.name)+'</td><td>'+esc(l.email)+'</td><td>'+regionTag(l.region)+'</td><td>'+esc(l.service||'—')+'</td>'+
      '<td><div class="row-acts"><button class="mini" onclick="viewLead('+i+')">View</button>'+
      (can('edit')?'<button class="mini" onclick="leadToClient('+i+')">→ Client</button>':'')+'</div></td></tr>';
  }).join('');
}
function viewLead(i){
  var l=getLeads()[i]; if(!l)return;
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">Lead details</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note">Name: '+esc(l.name)+'<br>Email: '+esc(l.email)+'<br>Region: '+esc(l.region||'—')+'<br>Service: '+esc(l.service||'—')+'<br>Source: '+esc(l.source||'website')+'<br>Received: '+esc(l.timestamp?new Date(l.timestamp).toLocaleString():'—')+'</div>'+
    '<div class="fld" style="margin-top:12px;"><label class="lab">Message</label><div class="note" style="background:rgba(0,0,0,.2);">'+esc(l.message||'(no message)')+'</div></div>'+
    '<div class="row-acts" style="justify-content:flex-end;">'+(can('edit')?'<button class="ab green" onclick="leadToClient('+i+')">Convert to client</button>':'')+'<button class="ab" onclick="closeModal()">Close</button></div>');
}
function leadToClient(i){
  if(!guard('edit'))return;
  var l=getLeads()[i]; if(!l)return;
  var clients=DB.get('clients')||[];
  if(clients.some(function(c){return c.email.toLowerCase()===(l.email||'').toLowerCase();})){toast('A client with this email already exists.');return;}
  clients.push({id:uid(),name:l.name,email:l.email,password:'Welcome123!',region:l.region||'AU',service:l.service||'',status:'active',entity:'',phone:'',created:today()});
  DB.set('clients',clients);audit('Converted lead "'+l.name+'" to client');closeModal();toast('Lead added to client database ✓ (temp password: Welcome123!)');go('clients',document.querySelector('.snav[data-sec="clients"]'));
}

/* ════════════════════════════════════════════════════════════════════
   ONBOARDING  (ATO / TPB aligned checklist)
════════════════════════════════════════════════════════════════════ */
var ONB_STEPS=['Invited','Details received','Verification','Engagement','Completed'];
var ONB_CHECKLIST=[
  {k:'poi',t:'Proof of identity (100 points) collected',note:'TPB client verification'},
  {k:'tfn',t:'Tax identifiers verified securely (TFN/ABN)',note:'Via ATO channels — never a web form'},
  {k:'engagement',t:'Engagement letter signed',note:'Scope, fees & terms'},
  {k:'aml',t:'AML/CTF & fit-and-proper check',note:'Where applicable'},
  {k:'auth',t:'ATO agent linking / authorisation done',note:'Client-agent linking'},
  {k:'bank',t:'Bank & contact details recorded',note:''}
];
function renderOnboarding(){
  var list=DB.get('onboarding')||[];
  var c=document.getElementById('onbList');
  if(!list.length){c.innerHTML='<div class="panel"><div class="empty">No onboardings yet. Click “+ New Onboarding” to send a client the ATO-aligned intake form.</div></div>';return;}
  c.innerHTML=list.map(function(o){
    var done=ONB_CHECKLIST.filter(function(it){return o.checklist&&o.checklist[it.k];}).length;
    var pct=Math.round(done/ONB_CHECKLIST.length*100);
    var stepIdx=ONB_STEPS.indexOf(o.status); if(stepIdx<0)stepIdx=0;
    var track=ONB_STEPS.map(function(s,i){return '<div class="stp '+(i<=stepIdx?'done':'')+'"><div class="c">'+(i<=stepIdx?'✓':(i+1))+'</div><div class="l">'+s+'</div></div>';}).join('');
    var checks=ONB_CHECKLIST.map(function(it){
      return '<label class="chk"><input type="checkbox" '+(o.checklist&&o.checklist[it.k]?'checked':'')+' onchange="toggleOnb(\''+o.id+'\',\''+it.k+'\',this.checked)" '+(can('edit')?'':'disabled')+'>'+
        '<span>'+esc(it.t)+(it.note?' <span style="color:var(--muted);font-size:.72rem;">· '+esc(it.note)+'</span>':'')+'</span></label>';
    }).join('');
    var statusOpts=ONB_STEPS.map(function(s){return '<option'+(o.status===s?' selected':'')+'>'+s+'</option>';}).join('');
    return '<div class="panel"><div class="panel-t"><span>'+esc(o.client)+' '+regionTag(o.region)+'</span>'+
      '<span class="tag '+(o.status==='Completed'?'ok':'warn')+'">'+esc(o.status)+'</span></div>'+
      '<div style="font-size:.78rem;color:var(--muted-lt);margin-bottom:4px;">'+esc(o.email)+' · '+esc(o.service||'—')+'</div>'+
      '<div class="step-track">'+track+'</div>'+
      '<div style="display:flex;justify-content:space-between;font-size:.74rem;color:var(--muted-lt);margin-bottom:4px;"><span>ATO / TPB checklist</span><span>'+done+'/'+ONB_CHECKLIST.length+'</span></div>'+
      '<div class="bar"><i style="width:'+pct+'%"></i></div>'+
      '<div style="margin-top:12px;">'+checks+'</div>'+
      '<div class="row-acts" style="margin-top:14px;justify-content:flex-end;">'+
        '<button class="mini" onclick="copyOnbLink(\''+o.id+'\')">🔗 Copy intake link</button>'+
        (can('edit')?'<select class="mini" style="padding:5px 8px;" onchange="setOnbStatus(\''+o.id+'\',this.value)">'+statusOpts+'</select>':'')+
        (can('delete')?'<button class="mini red" onclick="delOnb(\''+o.id+'\')">Delete</button>':'')+'</div></div>';
  }).join('');
}
function openOnbModal(){
  if(!guard('edit'))return;
  var clients=DB.get('clients')||[];
  var copts=clients.map(function(c){return '<option data-email="'+esc(c.email)+'" data-region="'+esc(c.region)+'" data-service="'+esc(c.service)+'">'+esc(c.name)+'</option>';}).join('');
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">New onboarding</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note" style="margin-bottom:14px;">This creates an ATO/TPB-aligned onboarding record and a sharable intake form link you can send the client.</div>'+
    '<div class="fld"><label class="lab">Existing client (optional)</label><select class="inp" id="o-existing" onchange="onbPrefill(this)"><option value="">— new prospect —</option>'+copts+'</select></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Client / business name</label><input class="inp" id="o-name"/></div>'+
    '<div class="fld"><label class="lab">Email</label><input class="inp" id="o-email"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Region</label><select class="inp" id="o-region"><option>AU</option><option>UAE</option><option>India</option></select></div>'+
    '<div class="fld"><label class="lab">Service</label><input class="inp" id="o-service" placeholder="e.g. Tax + BAS"/></div></div>'+
    '<div class="row-acts" style="justify-content:flex-end;"><button class="ab green" onclick="saveOnb()">Create &amp; generate link</button></div>');
}
function onbPrefill(sel){
  var o=sel.options[sel.selectedIndex];
  document.getElementById('o-name').value=sel.value;
  document.getElementById('o-email').value=o.getAttribute('data-email')||'';
  if(o.getAttribute('data-region'))document.getElementById('o-region').value=o.getAttribute('data-region');
  document.getElementById('o-service').value=o.getAttribute('data-service')||'';
}
function saveOnb(){
  if(!guard('edit'))return;
  var name=document.getElementById('o-name').value.trim();
  var email=document.getElementById('o-email').value.trim();
  if(!name||!email){toast('Please enter a name and email.');return;}
  var list=DB.get('onboarding')||[];
  list.unshift({id:uid(),client:name,email:email,region:document.getElementById('o-region').value,service:document.getElementById('o-service').value.trim(),status:'Invited',checklist:{},created:today()});
  DB.set('onboarding',list);audit('Started onboarding for "'+name+'"');closeModal();toast('Onboarding created ✓');renderOnboarding();renderDashboard();updateBadges();
}
function toggleOnb(id,key,val){
  if(!can('edit'))return;
  var list=DB.get('onboarding')||[];var o=list.find(function(x){return x.id===id;});if(!o)return;
  o.checklist=o.checklist||{};o.checklist[key]=val;
  var done=ONB_CHECKLIST.filter(function(it){return o.checklist[it.k];}).length;
  if(done===ONB_CHECKLIST.length)o.status='Completed';
  else if(o.status==='Invited'&&done>0)o.status='Details received';
  DB.set('onboarding',list);audit('Updated onboarding checklist for "'+o.client+'"');renderOnboarding();updateBadges();
}
function setOnbStatus(id,status){
  if(!guard('edit'))return;
  var list=DB.get('onboarding')||[];var o=list.find(function(x){return x.id===id;});if(!o)return;
  o.status=status;DB.set('onboarding',list);audit('Set onboarding status "'+o.client+'" → '+status);renderOnboarding();updateBadges();
}
function delOnb(id){
  if(!guard('delete'))return;
  var list=(DB.get('onboarding')||[]).filter(function(x){return x.id!==id;});
  DB.set('onboarding',list);audit('Deleted an onboarding record');toast('Removed');renderOnboarding();updateBadges();
}
function copyOnbLink(id){
  var base=location.href.split('#')[0];
  var link=base+'#onboard='+id;
  try{navigator.clipboard.writeText(link);toast('Intake link copied ✓');}
  catch(e){openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.1rem;">Intake form link</div><button class="x" onclick="closeModal()">×</button></div><div class="note">Share this link with your client:<br><br><span style="color:var(--cyan-lt);word-break:break-all;">'+esc(link)+'</span></div>');}
}

/* ════════════════════════════════════════════════════════════════════
   CLIENT DATABASE
════════════════════════════════════════════════════════════════════ */
function renderClients(){
  var clients=DB.get('clients')||[];
  var q=(document.getElementById('clientSearch')||{}).value||'';q=q.toLowerCase();
  var rows=clients.filter(function(c){return !q||(c.name+' '+c.email+' '+(c.service||'')).toLowerCase().indexOf(q)>=0;});
  var b=document.getElementById('clientsBody');
  if(!rows.length){b.innerHTML='<tr><td colspan="6"><div class="empty">No clients found.</div></td></tr>';return;}
  b.innerHTML=rows.map(function(c){
    var st=c.status==='frozen'?'<span class="tag off">On hold</span>':'<span class="tag ok">Active</span>';
    return '<tr><td>'+esc(c.name)+'</td><td>'+esc(c.email)+'</td><td>'+regionTag(c.region)+'</td><td>'+esc(c.service||'—')+'</td><td>'+st+'</td>'+
      '<td><div class="row-acts">'+
      (can('edit')?'<button class="mini" onclick="openClientModal(\''+c.id+'\')">Edit</button>':'<button class="mini" onclick="openClientModal(\''+c.id+'\')">View</button>')+
      (can('edit')?'<button class="mini" onclick="freezeClient(\''+c.id+'\')">'+(c.status==='frozen'?'Reactivate':'Hold')+'</button>':'')+
      (can('delete')?'<button class="mini red" onclick="delClient(\''+c.id+'\')">Delete</button>':'')+'</div></td></tr>';
  }).join('');
}
function openClientModal(id){
  var clients=DB.get('clients')||[];var c=id?clients.find(function(x){return x.id===id;}):null;
  var ro=!can('edit');
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">'+(id?(ro?'Client':'Edit client'):'Add client')+'</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Name / business</label><input class="inp" id="cl-name" value="'+esc(c?c.name:'')+'" '+(ro?'disabled':'')+'/></div>'+
    '<div class="fld"><label class="lab">Email (login)</label><input class="inp" id="cl-email" value="'+esc(c?c.email:'')+'" '+(ro?'disabled':'')+'/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Region</label><select class="inp" id="cl-region" '+(ro?'disabled':'')+'>'+['AU','UAE','India'].map(function(r){return '<option'+(c&&c.region===r?' selected':'')+'>'+r+'</option>';}).join('')+'</select></div>'+
    '<div class="fld"><label class="lab">Entity type</label><select class="inp" id="cl-entity" '+(ro?'disabled':'')+'>'+['Individual','Sole Trader','Company','Trust','Partnership','SMSF'].map(function(e){return '<option'+(c&&c.entity===e?' selected':'')+'>'+e+'</option>';}).join('')+'</select></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Service</label><input class="inp" id="cl-service" value="'+esc(c?c.service:'')+'" '+(ro?'disabled':'')+'/></div>'+
    '<div class="fld"><label class="lab">Phone</label><input class="inp" id="cl-phone" value="'+esc(c?c.phone:'')+'" '+(ro?'disabled':'')+'/></div></div>'+
    (ro?'':'<div class="fld"><label class="lab">Portal password</label><input class="inp" id="cl-pass" value="'+esc(c?c.password:'Welcome123!')+'"/></div>')+
    (ro?'':'<div class="row-acts" style="justify-content:flex-end;">'+(id&&can('delete')?'<button class="ab red" onclick="delClient(\''+id+'\')">Delete</button>':'')+'<button class="ab green" onclick="saveClient('+(id?'\''+id+'\'':'null')+')">Save client</button></div>'));
}
function saveClient(id){
  if(!guard('edit'))return;
  var name=document.getElementById('cl-name').value.trim();var email=document.getElementById('cl-email').value.trim();
  if(!name||!email){toast('Name and email are required.');return;}
  var clients=DB.get('clients')||[];
  var data={name:name,email:email,region:document.getElementById('cl-region').value,entity:document.getElementById('cl-entity').value,
    service:document.getElementById('cl-service').value.trim(),phone:document.getElementById('cl-phone').value.trim(),password:document.getElementById('cl-pass').value||'Welcome123!'};
  if(id){var c=clients.find(function(x){return x.id===id;});Object.assign(c,data);audit('Edited client "'+name+'"');}
  else{data.id=uid();data.status='active';data.created=today();clients.push(data);audit('Added client "'+name+'"');}
  DB.set('clients',clients);closeModal();toast('Client saved ✓');renderClients();renderDashboard();
}
function freezeClient(id){
  if(!guard('edit'))return;
  var clients=DB.get('clients')||[];var c=clients.find(function(x){return x.id===id;});if(!c)return;
  c.status=c.status==='frozen'?'active':'frozen';DB.set('clients',clients);
  audit((c.status==='frozen'?'Put on hold':'Reactivated')+' client "'+c.name+'"');toast('Updated ✓');renderClients();
}
function delClient(id){
  if(!guard('delete'))return;
  var clients=DB.get('clients')||[];var c=clients.find(function(x){return x.id===id;});
  if(!confirm('Delete client "'+(c?c.name:'')+'"? This cannot be undone.'))return;
  DB.set('clients',clients.filter(function(x){return x.id!==id;}));
  audit('Deleted client "'+(c?c.name:id)+'"');closeModal();toast('Client deleted');renderClients();renderDashboard();
}

/* ════════════════════════════════════════════════════════════════════
   DOCUMENTS  (Hubdoc-style inbox of client submissions)
════════════════════════════════════════════════════════════════════ */
function renderDocuments(){
  var subs=DB.get('submissions')||[];
  var c=document.getElementById('docList');
  if(!subs.length){c.innerHTML='<div class="panel"><div class="empty">No documents yet. When a client submits files or details through their portal, they appear here.</div></div>';return;}
  c.innerHTML='<div class="panel"><div class="tbl-wrap"><table class="t"><thead><tr><th>Date</th><th>Client</th><th>Type</th><th>Detail</th><th>Actions</th></tr></thead><tbody>'+
    subs.slice().reverse().map(function(s,i){
      var realIdx=subs.length-1-i;
      return '<tr><td>'+esc(s.date||'—')+'</td><td>'+esc(s.client)+'</td><td><span class="tag muted">'+esc(s.type||'Submission')+'</span></td><td>'+esc(s.detail||s.files||'—')+'</td>'+
        '<td><div class="row-acts"><button class="mini" onclick="viewDoc('+realIdx+')">View</button>'+(can('delete')?'<button class="mini red" onclick="delDoc('+realIdx+')">Delete</button>':'')+'</div></td></tr>';
    }).join('')+'</tbody></table></div></div>';
}
function viewDoc(i){
  var s=(DB.get('submissions')||[])[i];if(!s)return;
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">'+esc(s.type||'Submission')+'</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note">Client: '+esc(s.client)+'<br>Date: '+esc(s.date||'—')+'<br>'+esc(s.detail||'')+'</div>'+
    (s.files?'<div class="fld" style="margin-top:10px;"><label class="lab">Files referenced</label><div class="note" style="background:rgba(0,0,0,.2);">'+esc(s.files)+'</div></div>':'')+
    '<div class="note" style="margin-top:10px;">📎 In this demo, files are recorded by name only (no server upload). After connecting a backend, real files would be stored securely. See WEBSITE_GUIDE.html.</div>');
}
function delDoc(i){
  if(!guard('delete'))return;
  var subs=DB.get('submissions')||[];subs.splice(i,1);DB.set('submissions',subs);audit('Deleted a document submission');toast('Removed');renderDocuments();
}

/* ════════════════════════════════════════════════════════════════════
   REPORTS + EXPORT (PDF / CSV / XLSX)
════════════════════════════════════════════════════════════════════ */
function reportRows(type){
  if(type==='leads'){return {head:['Date','Name','Email','Region','Service','Message'],
    rows:getLeads().map(function(l){return [l.timestamp?new Date(l.timestamp).toLocaleDateString():'',l.name,l.email,l.region||'',l.service||'',(l.message||'').replace(/\s+/g,' ')];})};}
  if(type==='clients'){return {head:['Name','Email','Region','Entity','Service','Status','Phone'],
    rows:(DB.get('clients')||[]).map(function(c){return [c.name,c.email,c.region||'',c.entity||'',c.service||'',c.status||'',c.phone||''];})};}
  if(type==='jobs'){return {head:['Title','Client','Service','Assignee','Priority','Stage','Due'],
    rows:(DB.get('jobs')||[]).map(function(j){return [j.title,j.client||'',j.service||'',j.assignee||'',j.priority||'',j.stage||'',j.due||''];})};}
  if(type==='onboarding'){return {head:['Client','Email','Region','Service','Status','Checklist done','Started'],
    rows:(DB.get('onboarding')||[]).map(function(o){var d=ONB_CHECKLIST.filter(function(it){return o.checklist&&o.checklist[it.k];}).length;return [o.client,o.email,o.region||'',o.service||'',o.status,d+'/'+ONB_CHECKLIST.length,o.created||''];})};}
  if(type==='footfall'){var f=getFootfall();return {head:['Date','Visits'],rows:Object.keys(f).map(function(d){return [d,String(f[d])];})};}
  if(type==='audit'){return {head:['Time','User','Action'],rows:(DB.get('audit')||[]).map(function(a){return [a.time,a.user,a.action];})};}
  return {head:[],rows:[]};
}
var REPORT_TITLE={leads:'Leads Report',clients:'Client Database',jobs:'Jobs Report',onboarding:'Onboarding Report',footfall:'Website Footfall (7 days)',audit:'Audit Log'};
function renderReports(){
  var defs=[
    {t:'leads',ic:'📩',d:'All enquiries captured from the website contact form.'},
    {t:'clients',ic:'👥',d:'Your full client database with status and details.'},
    {t:'jobs',ic:'🗂️',d:'Every job, its stage, assignee and due date.'},
    {t:'onboarding',ic:'🚀',d:'Onboarding progress against the ATO/TPB checklist.'},
    {t:'footfall',ic:'📈',d:'Daily website visits recorded on this device.'},
    {t:'audit',ic:'📜',d:'A record of key actions, for compliance.'}
  ];
  document.getElementById('reportGrid').innerHTML='<div class="kpis" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">'+
    defs.map(function(r){var n=reportRows(r.t).rows.length;
      return '<div class="panel" style="margin:0;"><div class="panel-t"><span>'+r.ic+' '+REPORT_TITLE[r.t]+'</span><span class="tag muted">'+n+' rows</span></div>'+
        '<div style="font-size:.78rem;color:var(--muted-lt);margin-bottom:14px;">'+r.d+'</div>'+
        '<div class="row-acts"><button class="ab" onclick="exportData(\''+r.t+'\',\'csv\')">⬇ CSV</button>'+
        '<button class="ab purple" onclick="exportData(\''+r.t+'\',\'xlsx\')">⬇ Excel</button>'+
        '<button class="ab" onclick="exportData(\''+r.t+'\',\'pdf\')">⬇ PDF</button></div></div>';
    }).join('')+'</div>';
}
function dl(blob,fname){
  var u=URL.createObjectURL(blob);var a=document.createElement('a');a.href=u;a.download=fname;document.body.appendChild(a);a.click();
  setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(u);},300);
}
function csvCell(v){v=String(v==null?'':v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function exportData(type,fmt){
  var data=reportRows(type);var title=REPORT_TITLE[type]||type;var fname=type+'_'+today();
  if(!data.rows.length){toast('Nothing to export — this report is empty.');return;}
  if(fmt==='csv'){
    var csv=[data.head.map(csvCell).join(',')].concat(data.rows.map(function(r){return r.map(csvCell).join(',');})).join('\r\n');
    dl(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}),fname+'.csv');audit('Exported '+title+' (CSV)');toast('CSV downloaded ✓');return;
  }
  if(fmt==='xlsx'){
    if(typeof XLSX==='undefined'){toast('Excel library still loading — try again in a moment (needs internet).');return;}
    var aoa=[data.head].concat(data.rows);var ws=XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols']=data.head.map(function(h,i){var w=h.length;data.rows.forEach(function(r){w=Math.max(w,String(r[i]||'').length);});return {wch:Math.min(48,w+2)};});
    var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,title.slice(0,28));
    XLSX.writeFile(wb,fname+'.xlsx');audit('Exported '+title+' (Excel)');toast('Excel downloaded ✓');return;
  }
  if(fmt==='pdf'){
    var J=window.jspdf&&window.jspdf.jsPDF;
    if(!J){toast('PDF library still loading — try again in a moment (needs internet).');return;}
    var doc=new J({orientation:data.head.length>5?'landscape':'portrait'});
    doc.setFontSize(15);doc.setTextColor(11,24,41);doc.text('Fintex Global Group',14,16);
    doc.setFontSize(11);doc.setTextColor(46,134,193);doc.text(title,14,23);
    doc.setFontSize(8);doc.setTextColor(120,120,120);doc.text('Generated '+nowStr(),14,28);
    doc.autoTable({head:[data.head],body:data.rows,startY:32,styles:{fontSize:7,cellPadding:2},
      headStyles:{fillColor:[30,75,122],textColor:255},alternateRowStyles:{fillColor:[240,246,251]},margin:{left:14,right:14}});
    doc.save(fname+'.pdf');audit('Exported '+title+' (PDF)');toast('PDF downloaded ✓');return;
  }
}

/* ════════════════════════════════════════════════════════════════════
   TEAM & ACCESS
════════════════════════════════════════════════════════════════════ */
function renderTeam(){
  var team=DB.get('team')||[];
  var b=document.getElementById('teamBody');
  b.innerHTML=team.map(function(m){
    var st=m.status==='disabled'?'<span class="tag off">Disabled</span>':'<span class="tag ok">Active</span>';
    var isSelf=SESSION&&SESSION.email.toLowerCase()===m.email.toLowerCase();
    return '<tr><td>'+esc(m.name)+(isSelf?' <span class="tag muted">you</span>':'')+'</td><td>'+esc(m.email)+'</td><td><span class="tag uae">'+ROLE_LABEL[m.role]+'</span></td><td>'+st+'</td>'+
      '<td><div class="row-acts">'+
      '<button class="mini" onclick="openMemberModal(\''+m.id+'\')">Edit</button>'+
      '<button class="mini" onclick="resetPw(\''+m.id+'\')">Reset password</button>'+
      (isSelf?'':'<button class="mini" onclick="toggleMember(\''+m.id+'\')">'+(m.status==='disabled'?'Enable':'Disable')+'</button>')+
      (isSelf?'':'<button class="mini red" onclick="delMember(\''+m.id+'\')">Delete</button>')+'</div></td></tr>';
  }).join('');
}
function openMemberModal(id){
  if(!guard('admin'))return;
  var team=DB.get('team')||[];var m=id?team.find(function(x){return x.id===id;}):null;
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">'+(id?'Edit member':'Add team member')+'</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Full name</label><input class="inp" id="m-name" value="'+esc(m?m.name:'')+'"/></div>'+
    '<div class="fld"><label class="lab">Email (login)</label><input class="inp" id="m-email" value="'+esc(m?m.email:'')+'"/></div></div>'+
    '<div class="fld"><label class="lab">Role &amp; permissions</label><select class="inp" id="m-role">'+
      Object.keys(ROLE_LABEL).map(function(r){return '<option value="'+r+'"'+(m&&m.role===r?' selected':'')+'>'+ROLE_LABEL[r]+'</option>';}).join('')+'</select></div>'+
    '<div class="fld"><label class="lab">'+(id?'Set / change password':'Initial password')+'</label><input class="inp" id="m-pass" value="'+esc(m?m.password:'Fintex'+new Date().getFullYear()+'!')+'"/></div>'+
    '<div class="note" style="margin-bottom:14px;">Viewer = read-only · Editor = add/edit · Editor + Delete = also remove records · Full Admin = everything incl. team &amp; settings.</div>'+
    '<div class="row-acts" style="justify-content:flex-end;"><button class="ab green" onclick="saveMember('+(id?'\''+id+'\'':'null')+')">Save member</button></div>');
}
function saveMember(id){
  if(!guard('admin'))return;
  var name=document.getElementById('m-name').value.trim();var email=document.getElementById('m-email').value.trim();
  if(!name||!email){toast('Name and email are required.');return;}
  var team=DB.get('team')||[];
  if(team.some(function(x){return x.email.toLowerCase()===email.toLowerCase()&&x.id!==id;})){toast('That email is already used by another member.');return;}
  var role=document.getElementById('m-role').value,pass=document.getElementById('m-pass').value;
  if(id){var m=team.find(function(x){return x.id===id;});var wasAdmin=m.role==='full_admin';
    m.name=name;m.email=email;m.role=role;if(pass)m.password=pass;
    if(wasAdmin&&role!=='full_admin'&&team.filter(function(x){return x.role==='full_admin'&&x.status!=='disabled';}).length===0){m.role='full_admin';toast('You must keep at least one Full Admin.');return;}
    audit('Edited team member "'+name+'"');}
  else{team.push({id:uid(),name:name,email:email,role:role,password:pass||'Fintex2024!',status:'active'});audit('Added team member "'+name+'" ('+ROLE_LABEL[role]+')');}
  DB.set('team',team);closeModal();toast('Member saved ✓');renderTeam();
}
function resetPw(id){
  if(!guard('admin'))return;
  var team=DB.get('team')||[];var m=team.find(function(x){return x.id===id;});if(!m)return;
  openModal('<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">Reset password</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note" style="margin-bottom:12px;">Set a new password for <b>'+esc(m.name)+'</b>.</div>'+
    '<div class="fld"><label class="lab">New password</label><input class="inp" id="rp-pass" value="Fintex'+new Date().getFullYear()+'!"/></div>'+
    '<div class="row-acts" style="justify-content:flex-end;"><button class="ab green" onclick="doResetPw(\''+id+'\')">Update password</button></div>');
}
function doResetPw(id){
  if(!guard('admin'))return;
  var team=DB.get('team')||[];var m=team.find(function(x){return x.id===id;});if(!m)return;
  var p=document.getElementById('rp-pass').value;if(!p){toast('Enter a password.');return;}
  m.password=p;DB.set('team',team);audit('Reset password for "'+m.name+'"');closeModal();toast('Password updated ✓');
}
function toggleMember(id){
  if(!guard('admin'))return;
  var team=DB.get('team')||[];var m=team.find(function(x){return x.id===id;});if(!m)return;
  if(m.role==='full_admin'&&m.status!=='disabled'&&team.filter(function(x){return x.role==='full_admin'&&x.status!=='disabled';}).length<=1){toast('You must keep at least one active Full Admin.');return;}
  m.status=m.status==='disabled'?'active':'disabled';DB.set('team',team);audit((m.status==='disabled'?'Disabled':'Enabled')+' member "'+m.name+'"');toast('Updated ✓');renderTeam();
}
function delMember(id){
  if(!guard('admin'))return;
  var team=DB.get('team')||[];var m=team.find(function(x){return x.id===id;});if(!m)return;
  if(m.role==='full_admin'&&team.filter(function(x){return x.role==='full_admin'&&x.status!=='disabled';}).length<=1){toast('You must keep at least one active Full Admin.');return;}
  if(!confirm('Remove team member "'+m.name+'"?'))return;
  DB.set('team',team.filter(function(x){return x.id!==id;}));audit('Removed team member "'+m.name+'"');toast('Member removed');renderTeam();
}

/* ════════════════════════════════════════════════════════════════════
   SETTINGS
════════════════════════════════════════════════════════════════════ */
function renderSettings(){
  var s=DB.get('settings')||{};var co=s.company||{};var ej=s.emailjs||{};var an=s.analytics||{};var su=s.signup||{};var nt=s.notify||{};
  document.getElementById('settingsBody').innerHTML=
    '<div class="panel"><div class="panel-t">🏢 Company profile</div>'+
      '<div class="grid2"><div class="fld"><label class="lab">Business name</label><input class="inp" id="s-name" value="'+esc(co.name)+'"/></div>'+
      '<div class="fld"><label class="lab">Public email</label><input class="inp" id="s-email" value="'+esc(co.email)+'"/></div></div>'+
      '<div class="grid2"><div class="fld"><label class="lab">ABN (Australia)</label><input class="inp" id="s-abn" value="'+esc(co.abn)+'"/></div>'+
      '<div class="fld"><label class="lab">Phone</label><input class="inp" id="s-phone" value="'+esc(co.phone)+'"/></div></div></div>'+
    '<div class="panel"><div class="panel-t">📊 Google Sheets sync <span class="tag muted">optional</span></div>'+
      '<div class="note" style="margin-bottom:12px;">Paste a Google Apps Script Web App URL to mirror new leads into a spreadsheet. Full steps in INTEGRATION_GUIDE.html.</div>'+
      '<div class="fld"><label class="lab">Web App URL</label><input class="inp" id="s-sheet" value="'+esc(s.sheetsUrl)+'" placeholder="https://script.google.com/macros/s/.../exec"/></div></div>'+
    '<div class="panel"><div class="panel-t">✉️ EmailJS notifications <span class="tag muted">optional</span></div>'+
      '<div class="note" style="margin-bottom:12px;">Get instant email alerts when a lead arrives. Free tier: 200 emails/month. See INTEGRATION_GUIDE.html.</div>'+
      '<div class="grid2"><div class="fld"><label class="lab">Service ID</label><input class="inp" id="s-ej-s" value="'+esc(ej.service)+'"/></div>'+
      '<div class="fld"><label class="lab">Template ID</label><input class="inp" id="s-ej-t" value="'+esc(ej.template)+'"/></div></div>'+
      '<div class="fld"><label class="lab">Public key</label><input class="inp" id="s-ej-k" value="'+esc(ej.key)+'"/></div></div>'+
    '<div class="panel"><div class="panel-t">📈 Website analytics <span class="tag muted">recommended</span></div>'+
      '<div class="note" style="margin-bottom:12px;">For true cross-visitor footfall, add a free analytics tool. <b>Cloudflare Web Analytics</b> (privacy-friendly, no cookie banner) or <b>Google Analytics 4</b>. Paste the snippet into each page before &lt;/body&gt; — see WEBSITE_GUIDE.html.</div>'+
      '<div class="grid2"><div class="fld"><label class="lab">Provider</label><select class="inp" id="s-an-p"><option value="">— none —</option><option value="Cloudflare"'+(an.provider==='Cloudflare'?' selected':'')+'>Cloudflare Web Analytics</option><option value="GA4"'+(an.provider==='GA4'?' selected':'')+'>Google Analytics 4</option></select></div>'+
      '<div class="fld"><label class="lab">Tag / Measurement ID</label><input class="inp" id="s-an-id" value="'+esc(an.id)+'" placeholder="e.g. G-XXXXXXX"/></div></div></div>'+
    '<div class="panel"><div class="panel-t">👤 Client sign-up &amp; notifications</div>'+
      '<div class="note" style="margin-bottom:12px;">When you approve a website sign-up, a login is created automatically. Pick the starting password style — the client is forced to set their own the first time they sign in. New sign-ups alert the team email/WhatsApp below (email is sent automatically once EmailJS above is set up — see INTEGRATION_GUIDE.html).</div>'+
      '<div class="grid2"><div class="fld"><label class="lab">Starting password</label><select class="inp" id="s-su-mode"><option value="default"'+(su.mode==='default'?' selected':'')+'>Standard default password</option><option value="random"'+(su.mode==='random'?' selected':'')+'>Random password each time</option></select></div>'+
      '<div class="fld"><label class="lab">Default password</label><input class="inp" id="s-su-pass" value="'+esc(su.defaultPassword||'')+'" placeholder="Welcome@Fintex1"/></div></div>'+
      '<div class="grid2"><div class="fld"><label class="lab">Notify — team email</label><input class="inp" id="s-nt-email" value="'+esc(nt.adminEmail||'')+'" placeholder="admin@fintexglobal.com"/></div>'+
      '<div class="fld"><label class="lab">Notify — WhatsApp (digits only)</label><input class="inp" id="s-nt-wa" value="'+esc(nt.adminWhatsApp||'')+'" placeholder="61xxxxxxxxx"/></div></div></div>'+
    '<div class="row-acts" style="justify-content:flex-end;"><button class="btn-go" style="width:auto;padding:12px 22px;" onclick="saveSettings()" '+(can('admin')?'':'disabled')+'>Save settings</button></div>';
}
function saveSettings(){
  if(!guard('admin'))return;
  DB.set('settings',{
    company:{name:V('s-name'),email:V('s-email'),abn:V('s-abn'),phone:V('s-phone')},
    sheetsUrl:V('s-sheet'),
    emailjs:{service:V('s-ej-s'),template:V('s-ej-t'),key:V('s-ej-k')},
    analytics:{provider:V('s-an-p'),id:V('s-an-id')},
    signup:{defaultPassword:V('s-su-pass')||'Welcome@Fintex1',mode:V('s-su-mode')||'default'},
    notify:{adminEmail:V('s-nt-email'),adminWhatsApp:V('s-nt-wa')}
  });
  audit('Updated settings');toast('Settings saved ✓');
}
function V(id){var e=document.getElementById(id);return e?e.value.trim():'';}

/* ════════════════════════════════════════════════════════════════════
   AUDIT LOG
════════════════════════════════════════════════════════════════════ */
function renderAudit(){
  var a=DB.get('audit')||[];var b=document.getElementById('auditBody');
  if(!a.length){b.innerHTML='<tr><td colspan="3"><div class="empty">No activity recorded yet.</div></td></tr>';return;}
  b.innerHTML=a.map(function(x){return '<tr><td style="white-space:nowrap;">'+esc(x.time)+'</td><td>'+esc(x.user)+'</td><td>'+esc(x.action)+'</td></tr>';}).join('');
}
function clearAudit(){
  if(!guard('admin'))return;
  if(!confirm('Clear the entire audit log?'))return;
  DB.set('audit',[]);audit('Cleared audit log');renderAudit();renderDashboard();toast('Audit log cleared');
}

/* ════════════════════════════════════════════════════════════════════
   CLIENT PORTAL
════════════════════════════════════════════════════════════════════ */
function showClient(c){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('adminApp').classList.remove('show');
  document.getElementById('clientApp').classList.add('show');
  document.getElementById('logoutBtn').style.display='';
  var pill=document.getElementById('rolePill');pill.style.display='';pill.textContent='Client';
  var onb=(DB.get('onboarding')||[]).find(function(o){return o.email.toLowerCase()===c.email.toLowerCase();});
  var jobs=(DB.get('jobs')||[]).filter(function(j){return j.client===c.name;});
  var stepIdx=onb?Math.max(0,ONB_STEPS.indexOf(onb.status)):0;
  var track=ONB_STEPS.map(function(s,i){return '<div class="stp '+(i<=stepIdx?'done':'')+'"><div class="c">'+(i<=stepIdx?'✓':(i+1))+'</div><div class="l">'+s+'</div></div>';}).join('');
  var jobRows=jobs.length?jobs.map(function(j){return '<tr><td>'+esc(j.title)+'</td><td>'+esc(j.service||'—')+'</td><td><span class="tag '+(j.stage==='done'?'ok':'warn')+'">'+esc(j.stage)+'</span></td></tr>';}).join(''):'<tr><td colspan="3"><div class="empty">No active jobs yet.</div></td></tr>';
  document.getElementById('clientInner').innerHTML=
    '<div class="ph"><div><div class="ph-t">Welcome, '+esc(c.name.split(' ')[0])+' 👋</div><div class="ph-s">Your secure client space with Fintex Global Group.</div></div></div>'+
    '<div class="panel"><div class="panel-t">📋 Your onboarding status</div>'+(onb?'<div class="step-track">'+track+'</div>':'<div class="note">Your onboarding has not started yet. Our team will be in touch shortly. You can still submit documents below.</div>')+'</div>'+
    '<div class="panel"><div class="panel-t">🚀 Onboarding intake form</div>'+renderIntakeForm(c)+'</div>'+
    '<div class="panel"><div class="panel-t">📤 Submit documents</div>'+
      '<div class="dz" id="cdz" onclick="document.getElementById(\'cfile\').click()" ondragover="event.preventDefault();this.classList.add(\'over\')" ondragleave="this.classList.remove(\'over\')" ondrop="clientDrop(event)">📎 Click to choose files, or drag &amp; drop here<br><span style="font-size:.72rem;">PDF, images, spreadsheets — e.g. receipts, statements, paysummaries</span></div>'+
      '<input type="file" id="cfile" multiple style="display:none;" onchange="clientFiles(this.files)"/>'+
      '<div id="cfileList" style="margin-top:10px;font-size:.78rem;color:var(--muted-lt);"></div>'+
      '<div class="row-acts" style="justify-content:flex-end;margin-top:10px;"><button class="ab green" onclick="submitFiles(\''+esc(c.name)+'\')">Submit documents</button></div></div>'+
    '<div class="panel"><div class="panel-t">🗂️ Your jobs</div><div class="tbl-wrap"><table class="t"><thead><tr><th>Job</th><th>Service</th><th>Status</th></tr></thead><tbody>'+jobRows+'</tbody></table></div></div>'+
    '<div class="note">🔒 Your data is private to your account on this device. Once a backend is connected (see WEBSITE_GUIDE.html), it syncs securely to your firm.</div>';
}
var _cfiles=[];
function clientFiles(fl){_cfiles=[];for(var i=0;i<fl.length;i++)_cfiles.push(fl[i].name);renderCFiles();}
function clientDrop(e){e.preventDefault();e.currentTarget.classList.remove('over');var fl=e.dataTransfer.files;_cfiles=[];for(var i=0;i<fl.length;i++)_cfiles.push(fl[i].name);renderCFiles();}
function renderCFiles(){document.getElementById('cfileList').innerHTML=_cfiles.length?('Selected: '+_cfiles.map(esc).join(', ')):'';}
function submitIntake(){
  var fields=getFormFields(); var data={}; var missing=null;
  for(var i=0;i<fields.length;i++){
    var f=fields[i]; if(f.enabled===false) continue;
    var el=document.getElementById('dyn-'+f.id); if(!el) continue;
    var val=(f.type==='checkbox')?(el.checked?'Yes':''):el.value.trim();
    if(f.required && !val){ missing=f.label; break; }
    data[f.label]=val;
  }
  if(missing){ toast('Please complete: '+missing); return; }
  var who=(SESSION&&SESSION.name)||data['Legal / business name']||data['Full name']||'Client';
  var detail=fields.filter(function(f){return f.enabled!==false && f.type!=='checkbox' && data[f.label];})
    .slice(0,6).map(function(f){return f.label+': '+data[f.label];}).join(' · ');
  var subs=DB.get('submissions')||[];
  subs.push({date:today(),client:who,type:'Intake form',detail:detail.slice(0,240),full:data});
  DB.set('submissions',subs);
  var onb=DB.get('onboarding')||[];var o=onb.find(function(x){return x.email.toLowerCase()===((SESSION&&SESSION.email)||'').toLowerCase();});
  if(o&&o.status==='Invited'){o.status='Details received';DB.set('onboarding',onb);}
  toast('Thank you — your details have been submitted ✓');
  if(SESSION&&SESSION.role==='client'){var c=(DB.get('clients')||[]).find(function(x){return x.email===SESSION.email;});if(c)showClient(c);}
}
function submitFiles(name){
  if(!_cfiles.length){toast('Please choose at least one file.');return;}
  var subs=DB.get('submissions')||[];
  subs.push({date:today(),client:name,type:'Documents',detail:_cfiles.length+' file(s)',files:_cfiles.join(', ')});
  DB.set('submissions',subs);_cfiles=[];renderCFiles();
  toast('Documents submitted ✓ — your firm can now see them.');
}

/* ════════════════════════════════════════════════════════════════════
   SESSION RESUME
════════════════════════════════════════════════════════════════════ */
(function(){
  var s=DB.get('session');
  if(!s){switchTab('client');return;}
  SESSION=s;
  if(s.role==='admin'){
    var m=(DB.get('team')||[]).find(function(x){return x.email.toLowerCase()===s.email.toLowerCase();});
    if(m&&m.status!=='disabled'){SESSION.teamRole=m.role;showAdmin();return;}
    DB.del('session');SESSION=null;switchTab('client');
  }else{
    var c=(DB.get('clients')||[]).find(function(x){return x.email.toLowerCase()===s.email.toLowerCase();});
    if(c&&c.status!=='frozen'){ if(c.mustReset){forcePwReset(c);return;} showClient(c);return;}
    DB.del('session');SESSION=null;switchTab('client');
  }
})();

/* ════════════════════════════════════════════════════════════════════
   PART 3 — SIGN-UP, APPROVALS, NOTIFICATIONS, CONTENT (v11.1)
════════════════════════════════════════════════════════════════════ */
var FLAG_AU='<span class="flag" title="Australia"><svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#00247D"/><path d="M0 0l15 10M15 0L0 10" stroke="#fff" stroke-width="2"/><path d="M0 0l15 10M15 0L0 10" stroke="#CF142B" stroke-width="1"/><path d="M7.5 0v10M0 5h15" stroke="#fff" stroke-width="3"/><path d="M7.5 0v10M0 5h15" stroke="#CF142B" stroke-width="1.6"/><circle cx="7.5" cy="15" r="1.7" fill="#fff"/><circle cx="22" cy="4.5" r=".9" fill="#fff"/><circle cx="25.5" cy="10.5" r=".9" fill="#fff"/><circle cx="21" cy="13.5" r=".8" fill="#fff"/><circle cx="24.5" cy="16.5" r=".7" fill="#fff"/><circle cx="27.5" cy="7.5" r=".5" fill="#fff"/></svg></span>';
var FLAG_IN='<span class="flag" title="India"><svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#FF9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width=".7"/><circle cx="15" cy="10" r=".45" fill="#000080"/></svg></span>';
var FLAG_AE='<span class="flag" title="United Arab Emirates"><svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#00732F"/><rect y="13.33" width="30" height="6.67" fill="#000"/><rect width="8" height="20" fill="#FF0000"/></svg></span>';
var FLAG_GLOBE='<span class="flag-ico" title="Global"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#00B4D8" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="9.5" fill="none" stroke="#00B4D8" stroke-width="1.1"/><path d="M2.7 12h18.6M4.2 7h15.6M4.2 17h15.6" stroke="#00B4D8" stroke-width="1"/></svg></span>';
var REGION_META={
  AU:{flag:FLAG_AU,color:'#E8B800',label:'Australia'},
  India:{flag:FLAG_IN,color:'#E07B00',label:'India'},
  UAE:{flag:FLAG_AE,color:'#00B4D8',label:'UAE'},
  Global:{flag:FLAG_GLOBE,color:'#00B4D8',label:'Global'}
};
function rMeta(r){return REGION_META[r]||REGION_META.Global;}
function genPassword(){
  var a='ABCDEFGHJKLMNPQRSTUVWXYZ',b='abcdefghijkmnpqrstuvwxyz',c='23456789',s='!@#$';
  function pick(p){return p.charAt(Math.floor(Math.random()*p.length));}
  return pick(a)+pick(b)+pick(b)+pick(b)+pick(c)+pick(c)+pick(s)+pick(b)+pick(c);
}

/* ---------- SIGN-UP (public-facing, same as contact form) ---------- */
var SERVICE_OPTS=['','BAS Preparation','Individual Tax Returns','Company Tax Returns','SMSF Compliance','Bookkeeping','Payroll','GST Returns (India)','Income Tax (India)','Statutory Audit (India)','UAE VAT','UAE Corporate Tax','Business Advisory','Accounting Outsourcing','Other'];
function openSignup(){
  var regionOpts=['AU','India','UAE'].map(function(r){return '<option value="'+r+'">'+rMeta(r).label+'</option>';}).join('');
  var svcOpts=SERVICE_OPTS.map(function(s){return '<option value="'+esc(s)+'">'+(s?esc(s):'— Select a service —')+'</option>';}).join('');
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">Create your client account</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note" style="margin-bottom:14px;">Tell us a little about you and what you need. Our team reviews every request and, once approved, emails you a secure login. Details collected per ATO &amp; Tax Practitioners Board (TPB) requirements.</div>'+
    '<div class="grid2"><div class="fld"><label class="lab">First name *</label><input class="inp" id="su-fn" placeholder="John"/></div>'+
    '<div class="fld"><label class="lab">Last name</label><input class="inp" id="su-ln" placeholder="Smith"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Email address *</label><input class="inp" type="email" id="su-email" placeholder="john@company.com"/></div>'+
    '<div class="fld"><label class="lab">Phone / WhatsApp</label><input class="inp" id="su-phone" placeholder="+61 4xx xxx xxx"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Region *</label><select class="inp" id="su-region">'+regionOpts+'</select></div>'+
    '<div class="fld"><label class="lab">Service needed</label><select class="inp" id="su-service">'+svcOpts+'</select></div></div>'+
    '<div class="fld"><label class="lab">How can we help? *</label><textarea class="inp" id="su-msg" placeholder="Brief description of what you need..."></textarea></div>'+
    '<label class="chk"><input type="checkbox" id="su-consent"><span>I agree to be contacted by Fintex Global Group about my enquiry.</span></label>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:12px;"><button class="ab" onclick="closeModal()">Cancel</button><button class="ab green" onclick="submitSignup()">Submit request →</button></div>'
  );
}
function submitSignup(){
  var fn=V('su-fn'),ln=V('su-ln'),email=V('su-email').toLowerCase(),phone=V('su-phone'),
      region=V('su-region')||'AU',service=V('su-service'),msg=V('su-msg');
  if(!fn){toast('Please enter your first name.');return;}
  if(!email||email.indexOf('@')<1){toast('Please enter a valid email.');return;}
  if(!msg){toast('Please tell us how we can help.');return;}
  if(!document.getElementById('su-consent').checked){toast('Please tick the consent box.');return;}
  var name=(fn+' '+ln).trim();
  var ts=new Date().toISOString();
  var sig={id:uid(),name:name,email:email,phone:phone,region:region,service:service,message:msg,status:'pending',created:today(),ts:ts};
  var sgs=DB.get('signups')||[]; sgs.unshift(sig); DB.set('signups',sgs);
  // mirror into the website leads report (used for advertising / remarketing)
  try{
    var k='fintex_analytics',d=JSON.parse(localStorage.getItem(k)||'{}');
    if(!d.leads)d.leads=[];
    d.leads.push({name:name,email:email,phone:phone,region:region,service:service,message:msg,timestamp:ts,source:'signup'});
    if(d.leads.length>300)d.leads=d.leads.slice(-300);
    localStorage.setItem(k,JSON.stringify(d));
  }catch(ex){}
  pushNotif('signup','New client sign-up: '+name+' ('+region+')','sig:'+sig.id);
  notifyAdminOfSignup(sig);
  if(typeof updateBadges==='function')try{updateBadges();}catch(e){}
  if(SESSION&&SESSION.role==='admin'){try{renderApprovals();}catch(e){}}
  // success screen + optional WhatsApp ping to the firm
  var nt=(DB.get('settings')||{}).notify||{};
  var wa=(nt.adminWhatsApp||'').replace(/[^0-9]/g,'');
  var waMsg=encodeURIComponent('Hi Fintex Global Group, I just submitted a sign-up request.\nName: '+name+'\nEmail: '+email+'\nRegion: '+region+(service?'\nService: '+service:''));
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">Request received ✓</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note">Thank you, '+esc(fn)+'! Your sign-up request has been sent to our team for review. Once approved, you will receive your login details by email. You will be asked to set your own password the first time you sign in.</div>'+
    (wa?'<div class="row-acts" style="justify-content:center;margin-top:14px;"><a class="ab green" target="_blank" rel="noopener" href="https://wa.me/'+wa+'?text='+waMsg+'">💬 Also message us on WhatsApp</a></div>':'')+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:12px;"><button class="ab" onclick="closeModal()">Done</button></div>'
  );
}
function notifyAdminOfSignup(sig){
  // Best-effort automatic email alert via EmailJS, if configured + library present.
  try{
    var st=DB.get('settings')||{},ej=st.emailjs||{},nt=st.notify||{};
    if(window.emailjs&&ej.service&&ej.template&&ej.key){
      if(emailjs.init)try{emailjs.init(ej.key);}catch(e){}
      emailjs.send(ej.service,ej.template,{
        to_email:nt.adminEmail||'',from_name:sig.name,reply_to:sig.email,
        subject:'New client sign-up: '+sig.name,
        message:'Region: '+sig.region+'\nService: '+(sig.service||'-')+'\nPhone: '+(sig.phone||'-')+'\n\n'+sig.message
      });
    }
  }catch(e){}
}

/* ---------- APPROVALS ---------- */
function renderApprovals(){
  var box=document.getElementById('approvalsList'); if(!box)return;
  var sgs=DB.get('signups')||[];
  var pending=sgs.filter(function(s){return s.status==='pending';});
  var done=sgs.filter(function(s){return s.status!=='pending';}).slice(0,12);
  var html='';
  if(!pending.length){
    html+='<div class="panel"><div class="empty">No sign-ups waiting for approval. New requests from the website appear here.</div></div>';
  }else{
    html+=pending.map(function(s){
      var m=rMeta(s.region);
      return '<div class="panel" style="border-left:3px solid '+m.color+';">'+
        '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;align-items:flex-start;">'+
        '<div><div class="panel-t" style="margin:0;">'+m.flag+' '+esc(s.name)+' <span class="tag muted">'+esc(s.region)+'</span></div>'+
        '<div style="font-size:.8rem;color:var(--muted-lt);margin-top:4px;">'+esc(s.email)+(s.phone?' · '+esc(s.phone):'')+'</div>'+
        '<div style="font-size:.78rem;color:var(--muted);margin-top:2px;">Service: '+esc(s.service||'—')+' · Received '+esc(s.created)+'</div></div>'+
        '<div class="row-acts">'+
        (can('edit')?'<button class="ab green" onclick="approveSignup(\''+s.id+'\')">✓ Approve &amp; create login</button>':'')+
        (can('edit')?'<button class="ab red" onclick="rejectSignup(\''+s.id+'\')">Reject</button>':'<span class="tag muted">View only</span>')+
        '</div></div>'+
        '<div class="note" style="margin-top:10px;background:rgba(0,0,0,.18);">'+esc(s.message||'(no message)')+'</div></div>';
    }).join('');
  }
  if(done.length){
    html+='<div class="panel"><div class="panel-t">Recently processed</div><div class="tbl-wrap"><table class="t"><thead><tr><th>Name</th><th>Email</th><th>Region</th><th>Status</th></tr></thead><tbody>'+
      done.map(function(s){return '<tr><td>'+esc(s.name)+'</td><td>'+esc(s.email)+'</td><td>'+regionTag(s.region)+'</td><td><span class="tag '+(s.status==='approved'?'ok':'warn')+'">'+esc(s.status)+'</span></td></tr>';}).join('')+
      '</tbody></table></div></div>';
  }
  box.innerHTML=html;
}
function approveSignup(id){
  if(!guard('edit'))return;
  var sgs=DB.get('signups')||[];var s=sgs.find(function(x){return x.id===id;});if(!s)return;
  var clients=DB.get('clients')||[];
  var exists=clients.find(function(c){return c.email.toLowerCase()===s.email.toLowerCase();});
  var st=DB.get('settings')||{};var su=st.signup||{};
  var pw=(su.mode==='random')?genPassword():(su.defaultPassword||'Welcome@Fintex1');
  if(exists){
    s.status='approved';DB.set('signups',sgs);
    pushNotif('info','Sign-up approved (existing client): '+s.name);
    audit('Approved sign-up for existing client "'+s.name+'"');
    toast('A client with this email already exists — marked approved.');
    renderApprovals();updateBadges();return;
  }
  clients.push({id:uid(),name:s.name,email:s.email,password:pw,mustReset:true,region:s.region||'AU',service:s.service||'',status:'active',entity:'',phone:s.phone||'',created:today()});
  DB.set('clients',clients);
  // start onboarding
  var onb=DB.get('onboarding')||[];
  if(!onb.some(function(o){return o.email.toLowerCase()===s.email.toLowerCase();})){
    onb.unshift({id:uid(),client:s.name,email:s.email,region:s.region||'AU',service:s.service||'',status:'Invited',checklist:{},created:today()});
    DB.set('onboarding',onb);
  }
  s.status='approved';DB.set('signups',sgs);
  audit('Approved sign-up "'+s.name+'" and created client login');
  pushNotif('info','Login created for '+s.name);
  renderApprovals();renderClients();renderOnboarding();updateBadges();
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.1rem;">Login created ✓</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="note">A client account for <b>'+esc(s.name)+'</b> is ready.</div>'+
    '<div class="panel" style="margin:12px 0;"><div style="font-size:.85rem;line-height:1.9;">Email: <b>'+esc(s.email)+'</b><br>Temporary password: <b style="color:var(--cyan);">'+esc(pw)+'</b></div></div>'+
    '<div class="note">Share these with the client securely. They must change the password the first time they sign in. The account stays active while you work on their jobs.</div>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:12px;"><button class="ab" onclick="closeModal()">Close</button></div>'
  );
}
function rejectSignup(id){
  if(!guard('edit'))return;
  var sgs=DB.get('signups')||[];var s=sgs.find(function(x){return x.id===id;});if(!s)return;
  if(!confirm('Reject the sign-up request from "'+s.name+'"?'))return;
  s.status='rejected';DB.set('signups',sgs);
  audit('Rejected sign-up "'+s.name+'"');toast('Sign-up rejected.');
  renderApprovals();updateBadges();
}

/* ---------- FORCED PASSWORD RESET (first login) ---------- */
function forcePwReset(c){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('adminApp').classList.remove('show');
  document.getElementById('clientApp').classList.add('show');
  document.getElementById('logoutBtn').style.display='';
  document.getElementById('clientInner').innerHTML=
    '<div class="ph"><div><div class="ph-t">Set your password</div><div class="ph-s">Welcome, '+esc(c.name.split(' ')[0])+'. For your security, please choose a new password before continuing.</div></div></div>'+
    '<div class="panel" style="max-width:460px;">'+
    '<div class="fld"><label class="lab">New password *</label><input class="inp" type="password" id="np1" placeholder="At least 8 characters"/></div>'+
    '<div class="fld"><label class="lab">Confirm new password *</label><input class="inp" type="password" id="np2" placeholder="Re-enter password"/></div>'+
    '<div class="err" id="np-err" style="display:none;"></div>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:8px;"><button class="ab green" onclick="doForcePwReset(\''+c.id+'\')">Save &amp; continue →</button></div></div>';
}
function doForcePwReset(id){
  var p1=V('np1'),p2=V('np2');var err=document.getElementById('np-err');
  function fail(m){err.textContent=m;err.style.display='block';}
  if(p1.length<8){fail('Password must be at least 8 characters.');return;}
  if(p1!==p2){fail('The two passwords do not match.');return;}
  var clients=DB.get('clients')||[];var c=clients.find(function(x){return x.id===id;});if(!c)return;
  c.password=p1;c.mustReset=false;DB.set('clients',clients);
  audit('Client "'+c.name+'" set a new password');
  toast('Password updated ✓');
  showClient(c);
}

/* ---------- NOTIFICATIONS ---------- */
function getNotifs(){return DB.get('notifications')||[];}
function pushNotif(type,text,key){
  var n=getNotifs();
  if(key&&n.some(function(x){return x.key===key;}))return;
  n.unshift({id:uid(),key:key||'',type:type||'info',text:text,time:nowStr(),read:false});
  if(n.length>200)n=n.slice(0,200);
  DB.set('notifications',n);
}
function syncSignupNotifs(){
  // create notifications for any website leads that arrived while logged out
  try{
    var leads=getLeads();
    leads.forEach(function(l){
      var key='lead:'+(l.timestamp||'')+':'+(l.email||'');
      if(l.source==='signup')return; // signups already notified at submit time
      pushNotif('lead','New website enquiry: '+(l.name||l.email||'unknown')+' ('+(l.region||'—')+')',key);
    });
  }catch(e){}
}
function openNotifs(){
  var n=getNotifs();
  var list=n.length?n.map(function(x){
    var ic=x.type==='signup'?'✅':(x.type==='lead'?'📩':'🔔');
    return '<div class="panel" style="margin:0 0 8px;'+(x.read?'opacity:.6;':'')+'border-left:3px solid '+(x.read?'var(--border)':'var(--cyan)')+';">'+
      '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">'+
      '<div style="font-size:.85rem;">'+ic+' '+esc(x.text)+'<div style="font-size:.72rem;color:var(--muted);margin-top:3px;">'+esc(x.time)+'</div></div>'+
      (x.type==='signup'?'<button class="mini" onclick="closeModal();go(\'approvals\',document.querySelector(\'[data-sec=approvals]\'))">Review</button>':'')+
      '</div></div>';
  }).join(''):'<div class="empty">No notifications yet.</div>';
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.15rem;">Notifications</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div style="max-height:52vh;overflow:auto;">'+list+'</div>'+
    '<div class="row-acts" style="justify-content:space-between;margin-top:12px;"><button class="ab" onclick="clearNotifs()">Clear all</button><button class="ab green" onclick="markNotifsRead()">Mark all read</button></div>'
  );
}
function markNotifsRead(){
  var n=getNotifs();n.forEach(function(x){x.read=true;});DB.set('notifications',n);
  updateBadges();closeModal();
}
function clearNotifs(){
  if(!confirm('Clear all notifications?'))return;
  DB.set('notifications',[]);updateBadges();closeModal();toast('Notifications cleared');
}

/* ---------- WEBSITE CONTENT: TESTIMONIALS + BANNERS ---------- */
function getContent(){var c=DB.get('content')||{};if(!c.testimonials)c.testimonials=[];if(!c.banners)c.banners=[];return c;}
function renderContent(){
  var box=document.getElementById('contentBody'); if(!box)return;
  var c=getContent();
  var tCards=c.testimonials.map(function(t){var m=rMeta(t.region);
    return '<div class="panel" style="margin:0 0 10px;border-left:3px solid '+m.color+';">'+
      '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;">'+
      '<div><div style="font-weight:700;">'+m.flag+' '+esc(t.name)+' <span style="color:#E8B800;">'+('★'.repeat(t.stars||5))+'</span></div>'+
      '<div style="font-size:.78rem;color:var(--muted-lt);">'+esc(t.role||'')+'</div>'+
      '<div style="font-size:.82rem;color:var(--muted-lt);margin-top:6px;">'+esc((t.text||'').slice(0,160))+((t.text||'').length>160?'…':'')+'</div></div>'+
      '<div class="row-acts">'+(can('edit')?'<button class="mini" onclick="openTestiModal(\''+t.id+'\')">Edit</button>':'')+(can('delete')?'<button class="mini" onclick="delTesti(\''+t.id+'\')">Delete</button>':'')+'</div>'+
      '</div></div>';
  }).join('')||'<div class="empty">No testimonials yet.</div>';
  var bCards=c.banners.map(function(b){var m=rMeta(b.region);
    return '<div class="panel" style="margin:0 0 10px;border-left:3px solid '+m.color+';">'+
      '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;">'+
      '<div><div style="font-weight:700;">'+m.flag+' '+esc(b.title)+'</div>'+
      '<div style="font-size:.76rem;color:var(--muted);">'+esc(b.eyebrow||'')+'</div>'+
      '<div style="font-size:.8rem;color:var(--muted-lt);margin-top:5px;">'+esc((b.sub||'').slice(0,150))+'</div></div>'+
      '<div class="row-acts">'+(can('edit')?'<button class="mini" onclick="openBannerModal(\''+b.id+'\')">Edit</button>':'')+(can('delete')?'<button class="mini" onclick="delBanner(\''+b.id+'\')">Delete</button>':'')+'</div>'+
      '</div></div>';
  }).join('')||'<div class="empty">No banners yet.</div>';
  box.innerHTML=
    '<div class="panel"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div class="panel-t" style="margin:0;">🖼️ Homepage banner slides</div>'+(can('edit')?'<button class="ab green" onclick="openBannerModal()">+ Add banner</button>':'')+'</div>'+
      '<div style="margin-top:12px;">'+bCards+'</div></div>'+
    '<div class="panel"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div class="panel-t" style="margin:0;">💬 Client testimonials</div>'+(can('edit')?'<button class="ab green" onclick="openTestiModal()">+ Add testimonial</button>':'')+'</div>'+
      '<div style="margin-top:12px;">'+tCards+'</div></div>'+
    '<div class="note">💡 Edits here are saved instantly and show on the website <b>in this browser</b>. To publish them for all visitors, connect a free backend (Supabase/Firebase) — see WEBSITE_GUIDE.html → “Publishing content live”. Until then, this is a live preview/management tool for your own device.</div>';
}
function regionSelect(id,val){
  return '<select class="inp" id="'+id+'">'+['AU','India','UAE','Global'].map(function(r){return '<option value="'+r+'"'+(val===r?' selected':'')+'>'+rMeta(r).label+'</option>';}).join('')+'</select>';
}
function openTestiModal(id){
  if(!guard('edit'))return;
  var c=getContent();var t=id?c.testimonials.find(function(x){return x.id===id;}):{region:'AU',stars:5,text:'',name:'',role:'',initials:''};if(!t)return;
  var starOpts=[5,4,3,2,1].map(function(n){return '<option value="'+n+'"'+((t.stars||5)===n?' selected':'')+'>'+('★'.repeat(n))+'</option>';}).join('');
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.1rem;">'+(id?'Edit':'Add')+' testimonial</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Region</label>'+regionSelect('t-region',t.region)+'</div>'+
    '<div class="fld"><label class="lab">Rating</label><select class="inp" id="t-stars">'+starOpts+'</select></div></div>'+
    '<div class="fld"><label class="lab">Quote *</label><textarea class="inp" id="t-text" placeholder="What the client said...">'+esc(t.text)+'</textarea></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Name *</label><input class="inp" id="t-name" value="'+esc(t.name)+'" placeholder="Michael T."/></div>'+
    '<div class="fld"><label class="lab">Initials</label><input class="inp" id="t-initials" value="'+esc(t.initials)+'" placeholder="MT" maxlength="3"/></div></div>'+
    '<div class="fld"><label class="lab">Role / location</label><input class="inp" id="t-role" value="'+esc(t.role)+'" placeholder="Director, Retail · Brisbane QLD"/></div>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:10px;"><button class="ab" onclick="closeModal()">Cancel</button><button class="ab green" onclick="saveTesti(\''+(id||'')+'\')">Save</button></div>'
  );
}
function saveTesti(id){
  if(!guard('edit'))return;
  var name=V('t-name'),text=V('t-text');
  if(!name||!text){toast('Please add a name and quote.');return;}
  var ini=V('t-initials')||name.split(' ').map(function(w){return w.charAt(0);}).join('').slice(0,2).toUpperCase();
  var c=getContent();
  if(id){var t=c.testimonials.find(function(x){return x.id===id;});if(t){t.region=V('t-region');t.stars=parseInt(V('t-stars'),10)||5;t.text=text;t.name=name;t.role=V('t-role');t.initials=ini;}}
  else{c.testimonials.push({id:uid(),region:V('t-region'),stars:parseInt(V('t-stars'),10)||5,text:text,name:name,role:V('t-role'),initials:ini});}
  DB.set('content',c);audit((id?'Edited':'Added')+' testimonial "'+name+'"');closeModal();renderContent();toast('Saved ✓ — visible on the website (this browser).');
}
function delTesti(id){
  if(!guard('delete'))return;
  var c=getContent();var t=c.testimonials.find(function(x){return x.id===id;});if(!t)return;
  if(!confirm('Delete testimonial from "'+t.name+'"?'))return;
  c.testimonials=c.testimonials.filter(function(x){return x.id!==id;});
  DB.set('content',c);audit('Deleted testimonial "'+t.name+'"');renderContent();toast('Deleted');
}
function openBannerModal(id){
  if(!guard('edit'))return;
  var c=getContent();var b=id?c.banners.find(function(x){return x.id===id;}):{region:'AU',eyebrow:'',title:'',sub:'',b1:'Get a Free Quote →',l1:'contact.html',b2:'',l2:''};if(!b)return;
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.1rem;">'+(id?'Edit':'Add')+' banner slide</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Region / accent</label>'+regionSelect('b-region',b.region)+'</div>'+
    '<div class="fld"><label class="lab">Eyebrow label</label><input class="inp" id="b-eyebrow" value="'+esc(b.eyebrow)+'" placeholder="e.g. Australia — New Clients"/></div></div>'+
    '<div class="fld"><label class="lab">Headline *</label><input class="inp" id="b-title" value="'+esc(b.title)+'" placeholder="Free BAS Review for New AU Clients"/></div>'+
    '<div class="fld"><label class="lab">Sub-text</label><textarea class="inp" id="b-sub" placeholder="Short supporting sentence...">'+esc(b.sub)+'</textarea></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Button 1 label</label><input class="inp" id="b-b1" value="'+esc(b.b1)+'"/></div>'+
    '<div class="fld"><label class="lab">Button 1 link</label><input class="inp" id="b-l1" value="'+esc(b.l1)+'" placeholder="contact.html"/></div></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Button 2 label (optional)</label><input class="inp" id="b-b2" value="'+esc(b.b2)+'"/></div>'+
    '<div class="fld"><label class="lab">Button 2 link</label><input class="inp" id="b-l2" value="'+esc(b.l2)+'" placeholder="services.html"/></div></div>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:10px;"><button class="ab" onclick="closeModal()">Cancel</button><button class="ab green" onclick="saveBanner(\''+(id||'')+'\')">Save</button></div>'
  );
}
function saveBanner(id){
  if(!guard('edit'))return;
  var title=V('b-title');if(!title){toast('Please add a headline.');return;}
  var c=getContent();
  var obj={region:V('b-region'),eyebrow:V('b-eyebrow'),title:title,sub:V('b-sub'),b1:V('b-b1'),l1:V('b-l1')||'contact.html',b2:V('b-b2'),l2:V('b-l2')};
  if(id){var b=c.banners.find(function(x){return x.id===id;});if(b)Object.keys(obj).forEach(function(k){b[k]=obj[k];});}
  else{obj.id=uid();c.banners.push(obj);}
  DB.set('content',c);audit((id?'Edited':'Added')+' banner "'+title+'"');closeModal();renderContent();toast('Saved ✓ — visible on the website (this browser).');
}
function delBanner(id){
  if(!guard('delete'))return;
  var c=getContent();var b=c.banners.find(function(x){return x.id===id;});if(!b)return;
  if(!confirm('Delete banner "'+b.title+'"?'))return;
  c.banners=c.banners.filter(function(x){return x.id!==id;});
  DB.set('content',c);audit('Deleted banner "'+b.title+'"');renderContent();toast('Deleted');
}

/* ════════════════════════════════════════════════════════════════════
   PART 4 — ONBOARDING FORM BUILDER (Google/MS Forms style) — v11.2
   ATO/TPB compliant: we do NOT collect TFN/ABN via this web form.
════════════════════════════════════════════════════════════════════ */
function defaultIntakeForm(){
  return [
    {id:'notice',label:'For your security, do not enter your Tax File Number (TFN) or ABN here. We never collect tax identifiers through this form — they are verified later through secure ATO/TPB channels (e.g. ATO online services and client–agent linking). Required fields are marked *.',type:'note',required:false,enabled:true},
    {id:'legalname',label:'Legal / business name',type:'text',required:true,placeholder:'e.g. Smith Pty Ltd or John Smith',enabled:true},
    {id:'trading',label:'Trading name (if different)',type:'text',required:false,placeholder:'',enabled:true},
    {id:'entity',label:'Entity type',type:'select',required:true,options:['Individual','Sole Trader','Company','Trust','Partnership','SMSF','Not-for-profit'],enabled:true},
    {id:'industry',label:'Industry / main business activity',type:'text',required:false,placeholder:'e.g. Hospitality, IT consulting',enabled:true},
    {id:'contactname',label:'Primary contact name',type:'text',required:true,placeholder:'Full name',enabled:true},
    {id:'role',label:'Position / role',type:'text',required:false,placeholder:'e.g. Director, Owner',enabled:true},
    {id:'email',label:'Email address',type:'email',required:true,placeholder:'you@company.com',enabled:true},
    {id:'phone',label:'Phone / mobile',type:'tel',required:true,placeholder:'+61 4xx xxx xxx',enabled:true},
    {id:'contactpref',label:'Preferred contact method',type:'select',required:false,options:['Email','Phone call','WhatsApp'],enabled:true},
    {id:'address',label:'Business / residential address',type:'text',required:false,placeholder:'Street, suburb, postcode',enabled:true},
    {id:'region',label:'State / Emirate / Region',type:'text',required:false,placeholder:'e.g. QLD, Dubai, Telangana',enabled:true},
    {id:'service',label:'Service you need',type:'select',required:true,options:['Tax Return','BAS / GST','Bookkeeping','Payroll','SMSF','Company setup','UAE VAT','UAE Corporate Tax','India GST / ITR','Advisory / CFO','Other'],enabled:true},
    {id:'software',label:'Accounting software you use',type:'select',required:false,options:['Xero','MYOB','QuickBooks','Tally','Zoho Books','None / not sure','Other'],enabled:true},
    {id:'turnover',label:'Approx. annual turnover',type:'select',required:false,options:['Pre-revenue','Under 250k','250k – 1M','1M – 5M','5M – 20M','Over 20M'],enabled:true},
    {id:'employees',label:'Number of employees',type:'select',required:false,options:['Just me','2 – 5','6 – 20','21 – 50','50+'],enabled:true},
    {id:'prevaccountant',label:'Current / previous accountant (if switching)',type:'text',required:false,placeholder:'Optional',enabled:true},
    {id:'needs',label:'What do you need help with?',type:'textarea',required:true,placeholder:'Tell us about your situation, deadlines and goals…',enabled:true},
    {id:'timing',label:'How soon do you need help?',type:'select',required:false,options:['Immediately','Within a month','This quarter','Just exploring'],enabled:true},
    {id:'hearabout',label:'How did you hear about us?',type:'select',required:false,options:['Google search','Referral','Social media','LinkedIn','Existing client','Other'],enabled:true},
    {id:'consent',label:'I authorise Fintex Global Group to contact me and begin onboarding. I understand a formal engagement letter and secure identity verification will follow, and that I should never send my TFN/ABN by email or web form.',type:'checkbox',required:true,enabled:true},
    {id:'marketing',label:'I would like to receive occasional updates and tax deadline reminders (optional).',type:'checkbox',required:false,enabled:true}
  ];
}
function getFormFields(){var f=DB.get('intakeForm'); return (f&&f.length)?f:defaultIntakeForm();}
function setFormFields(f){DB.set('intakeForm',f);}

/* ---------- client-facing dynamic render ---------- */
function renderIntakeForm(c){
  var fields=getFormFields(); var out='';
  fields.forEach(function(f){
    if(f.enabled===false) return;
    var id='dyn-'+f.id;
    var req=f.required?' *':'';
    var pre='';
    if(f.id==='legalname'||f.id==='contactname') pre=esc(c&&c.name||'');
    else if(f.id==='email') pre=esc(c&&c.email||'');
    else if(f.id==='phone') pre=esc(c&&c.phone||'');
    var help=f.help?'<div style="font-size:.72rem;color:var(--muted);margin-top:4px;">'+esc(f.help)+'</div>':'';
    if(f.type==='note'){ out+='<div class="note" style="margin-bottom:14px;">'+esc(f.label)+'</div>'; return; }
    if(f.type==='checkbox'){ out+='<label class="chk"><input type="checkbox" id="'+id+'"><span>'+esc(f.label)+req+'</span></label>'; return; }
    out+='<div class="fld"><label class="lab">'+esc(f.label)+req+'</label>';
    if(f.type==='textarea'){ out+='<textarea class="inp" id="'+id+'" placeholder="'+esc(f.placeholder||'')+'">'+pre+'</textarea>'; }
    else if(f.type==='select'){ out+='<select class="inp" id="'+id+'"><option value="">— Select —</option>'+(f.options||[]).map(function(o){return '<option value="'+esc(o)+'">'+esc(o)+'</option>';}).join('')+'</select>'; }
    else { var t=(['email','tel','number','date'].indexOf(f.type)>=0)?f.type:'text'; out+='<input class="inp" type="'+t+'" id="'+id+'" placeholder="'+esc(f.placeholder||'')+'" value="'+pre+'"/>'; }
    out+=help+'</div>';
  });
  out+='<div class="row-acts" style="justify-content:flex-end;margin-top:12px;"><button class="ab green" onclick="submitIntake()">Submit details</button></div>';
  return out;
}

/* ---------- admin form builder ---------- */
var FIELD_TYPES=[['text','Short text'],['textarea','Long text'],['email','Email'],['tel','Phone'],['number','Number'],['date','Date'],['select','Dropdown'],['checkbox','Checkbox / consent'],['note','Info note (no input)']];
function fieldTypeLabel(t){var m=FIELD_TYPES.find(function(x){return x[0]===t;});return m?m[1]:t;}
function renderFormBuilder(){
  var box=document.getElementById('formBuilderBody'); if(!box)return;
  var fields=getFormFields();
  var rows=fields.map(function(f,i){
    var tags=(f.type==='note'?'<span class="tag muted">info</span>':'<span class="tag muted">'+esc(fieldTypeLabel(f.type))+'</span>')+
      (f.required?' <span class="tag warn">required</span>':'')+(f.enabled===false?' <span class="tag">hidden</span>':'');
    return '<div class="panel" style="margin:0 0 8px;">'+
      '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">'+
      '<div style="min-width:0;"><div style="font-weight:600;font-size:.9rem;">'+(i+1)+'. '+esc((f.label||'').slice(0,90))+((f.label||'').length>90?'…':'')+'</div>'+
      '<div style="margin-top:5px;">'+tags+(f.type==='select'&&f.options?' <span style="font-size:.72rem;color:var(--muted);">('+f.options.length+' options)</span>':'')+'</div></div>'+
      '<div class="row-acts">'+
      '<button class="mini" onclick="moveField(\''+f.id+'\',-1)" '+(i===0?'disabled':'')+' title="Move up">↑</button>'+
      '<button class="mini" onclick="moveField(\''+f.id+'\',1)" '+(i===fields.length-1?'disabled':'')+' title="Move down">↓</button>'+
      (can('edit')?'<button class="mini" onclick="openFieldModal(\''+f.id+'\')">Edit</button>':'')+
      (can('delete')?'<button class="mini" onclick="delField(\''+f.id+'\')">Delete</button>':'')+
      '</div></div></div>';
  }).join('');
  box.innerHTML='<div class="note" style="margin-bottom:12px;">🛡️ <b>Compliance:</b> this form must never request a client\'s TFN or ABN. Tax identifiers are verified separately through secure ATO/TPB channels. Keep the security note field at the top.</div>'+
    rows+
    '<div class="note" style="margin-top:6px;">Changes are saved instantly and appear in every client\'s portal intake form (on this browser/device — connect a backend to share live across devices). Use <b>↑ ↓</b> to reorder, <b>Edit</b> to change a field, <b>+ Add Field</b> for new questions.</div>';
}
function openFieldModal(id){
  if(!guard('edit'))return;
  var fields=getFormFields();
  var f=id?fields.find(function(x){return x.id===id;}):{label:'',type:'text',required:false,placeholder:'',help:'',options:[],enabled:true};
  if(!f)return;
  var typeOpts=FIELD_TYPES.map(function(t){return '<option value="'+t[0]+'"'+(f.type===t[0]?' selected':'')+'>'+t[1]+'</option>';}).join('');
  openModal(
    '<div class="modal-h"><div class="ph-t" style="font-size:1.1rem;">'+(id?'Edit':'Add')+' field</div><button class="x" onclick="closeModal()">×</button></div>'+
    '<div class="fld"><label class="lab">Question / label *</label><textarea class="inp" id="ff-label" placeholder="e.g. What is your business name?">'+esc(f.label)+'</textarea></div>'+
    '<div class="grid2"><div class="fld"><label class="lab">Field type</label><select class="inp" id="ff-type" onchange="ffToggleOpts()">'+typeOpts+'</select></div>'+
    '<div class="fld"><label class="lab">Placeholder (optional)</label><input class="inp" id="ff-ph" value="'+esc(f.placeholder||'')+'"/></div></div>'+
    '<div class="fld" id="ff-opts-wrap" style="display:'+(f.type==='select'?'block':'none')+';"><label class="lab">Dropdown options (one per line)</label><textarea class="inp" id="ff-opts" placeholder="Option A&#10;Option B">'+esc((f.options||[]).join('\n'))+'</textarea></div>'+
    '<div class="fld"><label class="lab">Help text (optional)</label><input class="inp" id="ff-help" value="'+esc(f.help||'')+'"/></div>'+
    '<label class="chk"><input type="checkbox" id="ff-req"'+(f.required?' checked':'')+'><span>Required field</span></label>'+
    '<label class="chk"><input type="checkbox" id="ff-en"'+(f.enabled!==false?' checked':'')+'><span>Show this field on the form</span></label>'+
    '<div class="row-acts" style="justify-content:flex-end;margin-top:10px;"><button class="ab" onclick="closeModal()">Cancel</button><button class="ab green" onclick="saveField(\''+(id||'')+'\')">Save field</button></div>'
  );
}
function ffToggleOpts(){var t=V('ff-type');var w=document.getElementById('ff-opts-wrap');if(w)w.style.display=(t==='select')?'block':'none';}
function saveField(id){
  if(!guard('edit'))return;
  var label=V('ff-label'); if(!label){toast('Please enter the question / label.');return;}
  var type=V('ff-type');
  var opts=V('ff-opts').split('\n').map(function(x){return x.trim();}).filter(Boolean);
  if(type==='select'&&!opts.length){toast('Add at least one dropdown option.');return;}
  var obj={label:label,type:type,required:document.getElementById('ff-req').checked,enabled:document.getElementById('ff-en').checked,placeholder:V('ff-ph'),help:V('ff-help'),options:opts};
  var fields=getFormFields();
  if(id){var f=fields.find(function(x){return x.id===id;});if(f){obj.id=id;Object.keys(obj).forEach(function(k){f[k]=obj[k];});}}
  else{obj.id='f'+uid();fields.push(obj);}
  setFormFields(fields);audit((id?'Edited':'Added')+' onboarding form field "'+label.slice(0,40)+'"');closeModal();renderFormBuilder();toast('Field saved ✓');
}
function delField(id){
  if(!guard('delete'))return;
  var fields=getFormFields();var f=fields.find(function(x){return x.id===id;});if(!f)return;
  if(!confirm('Delete this field?\n\n"'+(f.label||'').slice(0,80)+'"'))return;
  setFormFields(fields.filter(function(x){return x.id!==id;}));audit('Deleted onboarding form field');renderFormBuilder();toast('Field deleted');
}
function moveField(id,dir){
  if(!guard('edit'))return;
  var fields=getFormFields();var i=fields.findIndex(function(x){return x.id===id;});
  var j=i+dir; if(i<0||j<0||j>=fields.length)return;
  var tmp=fields[i];fields[i]=fields[j];fields[j]=tmp;
  setFormFields(fields);renderFormBuilder();
}
function restoreDefaultForm(){
  if(!guard('edit'))return;
  if(!confirm('Restore the onboarding form to the default fields? This replaces the current fields.'))return;
  setFormFields(defaultIntakeForm());audit('Restored default onboarding form');renderFormBuilder();toast('Default form restored ✓');
}
