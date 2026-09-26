﻿/* ==========================================================================
   Çınarköy Nöbet — v2.0
   Çevrimdışı çalışan, telefonlar arası aktarılabilir güvenlik nöbet asistanı
   ========================================================================== */
'use strict';

/* ---------------------------------------------------------------- 0. araçlar */
/* Uygulama genelinde EMOJI KULLANILMAZ. Tüm simgeler Feather üslubunda,
   tek çizgi kalınlığında, 24x24 viewBox'lı satır içi SVG'dir. */
const IC = {
  map:   '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="18" x2="16" y2="22"/>',
  repeat:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  list:  '<path d="M9 5H4v16h16V5h-5"/><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 12h8M8 16h5"/>',
  nav:   '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  lock:  '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mic:   '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
  help:  '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  cam:   '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/>',
  book:  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  db:    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  star:  '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x:     '<path d="M18 6 6 18M6 6l12 12"/>',
  edit:  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  save:  '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  sync:  '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  pin:   '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  warn:  '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  phone: '<path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
};
/* ic(name) -> tam <svg> dizesi (currentColor, Feather üslubu) */
function ic(name, size){
  const p = IC[name] || IC.help;
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
    +' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'
    + (size? ' width="'+size+'" height="'+size+'"' : '') +'>'+p+'</svg>';
}
const $  = (s, r) => (r||document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r||document).querySelectorAll(s));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad2 = n => (n<10?'0':'')+n;
const dateStamp = () => { const d=new Date(); return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate()); };
const fileStamp = () => { const d=new Date(); return dateStamp().replace(/-/g,'')+'-'+pad2(d.getHours())+pad2(d.getMinutes()); };
const TRC = {'ı':'i','İ':'i','ş':'s','Ş':'s','ğ':'g','Ğ':'g','ç':'c','Ç':'c','ö':'o','Ö':'o','ü':'u','Ü':'u','â':'a','î':'i','û':'u','Â':'a','Î':'i','Û':'u'};
const norm  = s => String(s==null?'':s).toLowerCase().replace(/[ıİşŞğĞçÇöÖüÜâîûÂÎÛ]/g, c=>TRC[c]).replace(/[^a-z0-9]+/g,' ');
const keyOf = s => norm(s).replace(/ /g,'');
const uid = () => 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
const fmtTR = (ms, withDate) => { const d=new Date(ms);
  return (withDate? d.toLocaleDateString('tr-TR')+' ' : '') + d.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}); };
const dayKey = ms => { const d=new Date(ms); return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate()); };
const startOfToday = () => { const d=new Date(); d.setHours(0,0,0,0); return d.getTime(); };

/* ses + titreşim */
let _ac=null;
function ac(){ try{ if(!_ac) _ac=new (window.AudioContext||window.webkitAudioContext)(); if(_ac.state==='suspended') _ac.resume(); }catch(e){} return _ac; }
function tone(f,dur,type,vol,dly){ if(!P.sound) return; const c=ac(); if(!c) return;
  const t0=c.currentTime+(dly||0), o=c.createOscillator(), g=c.createGain();
  o.type=type||'sine'; o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t0); g.gain.exponentialRampToValueAtTime(vol||.08,t0+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t0+(dur||.12));
  o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0+(dur||.12)+.03); }
const sfx = {
  ok(){ tone(760,.08,'sine',.07); tone(1180,.1,'sine',.06,.09); },
  err(){ tone(190,.15,'square',.05); tone(140,.18,'square',.05,.1); },
  tap(){ tone(520,.04,'sine',.04); },
  shutter(){ tone(320,.04,'square',.07); tone(190,.07,'square',.06,.05); },
  scan(){ tone(980,.05,'sine',.05); tone(980,.05,'sine',.05,.12); tone(1400,.08,'sine',.05,.24); }
};
function buzz(ms){ if(P.haptic && navigator.vibrate) { try{ navigator.vibrate(ms||12); }catch(e){} } }

/* ---------------------------------------------------------------- 1. tercihler */
const DEF = { guard:'', names:[], tts:false, sound:true, haptic:true, autolearn:true, autoPlate:true, autoCam:false,
  autoCam:true, autoFirm:true, rate:1, waLink:'', lastExport:0, lastImport:0, lastSync:0 };
let P = load('ck_pref', DEF);
/* Sesli okuma (TTS) varsayılan KAPALI — isteyen Ayarlar'dan açar.
   Daha önce kaydedilmiş tercihlerde "otomatik açılmış" değerler de kapatılır. */
if(P.tts && !P.ttsSet){ P.tts=false; savePrefs(); }
function load(k,d){
  const dflt = ()=>Array.isArray(d)?d.slice():Object.assign({},d);
  try{ const v=JSON.parse(localStorage.getItem(k));
    if(Array.isArray(d)) return Array.isArray(v)?v:dflt();
    return (v&&typeof v==='object'&&!Array.isArray(v))?Object.assign({},d,v):dflt();
  }catch(e){ return dflt(); } }
function savePrefs(){ try{ localStorage.setItem('ck_pref', JSON.stringify(P)); }catch(e){} }
const DEVICE = (function(){ let d=localStorage.getItem('ck_dev'); if(!d){ d='d'+Math.random().toString(36).slice(2,8); localStorage.setItem('ck_dev',d); } return d; })();

/* ---------------------------------------------------------------- 2. veritabanı */
const DBN='ck_nobet_v2', S_V='visits', S_C='couriers';
let DB=null, LS_MODE=false;
const lsKey = st => st===S_V ? 'ck_v2_visits' : 'ck_v2_couriers';
function lsRead(st){ try{ const v=JSON.parse(localStorage.getItem(lsKey(st))); return Array.isArray(v)?v:[]; }catch(e){ return []; } }
function lsWrite(st,a){ localStorage.setItem(lsKey(st), JSON.stringify(a)); }
function openDB(){
  if(!self.indexedDB) return Promise.reject(new Error('IndexedDB desteklenmiyor'));
  return new Promise((res,rej)=>{ let r;
    try{ r=indexedDB.open(DBN,1); }catch(e){ return rej(e); }
    r.onupgradeneeded=e=>{ const d=e.target.result; [S_V,S_C].forEach(s=>{ if(!d.objectStoreNames.contains(s)) d.createObjectStore(s,{keyPath:'uid'}); }); };
    r.onsuccess=e=>{ DB=e.target.result;
      DB.onversionchange=()=>{ try{ DB.close(); }catch(_){} DB=null; LS_MODE=true; };
      res(); };
    r.onerror=()=>rej(r.error||new Error('IndexedDB açılamadı'));
    r.onblocked=()=>rej(new Error('IndexedDB kilitli'));
    setTimeout(()=>{ if(!DB) rej(new Error('zaman aşımı')); }, 8000); });
}
function dbAll(st){
  if(LS_MODE || !DB) return Promise.resolve(lsRead(st));
  return new Promise((res,rej)=>{ const t=DB.transaction(st,'readonly'), q=t.objectStore(st).getAll();
    q.onsuccess=()=>res(q.result||[]); q.onerror=()=>rej(q.error); }); }
function dbPut(st,rec){
  if(LS_MODE || !DB) return new Promise((res,rej)=>{ try{ const a=lsRead(st);
      const i=a.findIndex(x=>x&&x.uid===rec.uid); if(i>=0) a[i]=rec; else a.push(rec);
      lsWrite(st,a); res(rec); }catch(e){ rej(e); } });
  return new Promise((res,rej)=>{ const t=DB.transaction(st,'readwrite'); t.objectStore(st).put(rec);
    t.oncomplete=()=>res(rec); t.onerror=()=>rej(t.error); }); }
function dbDrop(st,k){
  if(LS_MODE || !DB) return new Promise((res)=>{ lsWrite(st, lsRead(st).filter(x=>x&&x.uid!==k)); res(); });
  return new Promise((res,rej)=>{ const t=DB.transaction(st,'readwrite'); t.objectStore(st).delete(k);
    t.oncomplete=()=>res(); t.onerror=()=>rej(t.error); }); }
function dbWipe(st){
  if(LS_MODE || !DB) return new Promise((res)=>{ lsWrite(st,[]); res(); });
  return new Promise((res,rej)=>{ const t=DB.transaction(st,'readwrite'); t.objectStore(st).clear();
    t.oncomplete=()=>res(); t.onerror=()=>rej(t.error); }); }

let VISITS=[], COURIERS=[], ALL=[];
async function refresh(){
  const v = await dbAll(S_V), c = await dbAll(S_C);
  VISITS = v.filter(x=>!x.deleted).sort((a,b)=>b.ts-a.ts);
  COURIERS = c.filter(x=>!x.deleted).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  renderStats(); renderCouriers(); renderLastPlates();
}

/* eski sürümden aktarım */
function readLegacy(){ return new Promise(res=>{ let r; try{ if(!self.indexedDB) return res([]); r=indexedDB.open('cinarkoy_nobet'); }catch(e){ return res([]); }
  r.onsuccess=e=>{ const d=e.target.result;
    if(!d.objectStoreNames.contains('visits')){ try{ d.close(); }catch(_){} return res([]); }
    const q=d.transaction('visits','readonly').objectStore('visits').getAll();
    q.onsuccess=()=>{ const rows=q.result||[]; try{ d.close(); }catch(_){} res(rows); }; q.onerror=()=>res([]); };
  r.onerror=()=>res([]); }); }
async function migrateLegacy(rows){
  if(!rows.length) return 0;
  const has = await dbAll(S_V), seen = new Set(has.map(v=>v.site+'|'+v.unit+'|'+v.ts));
  let n=0;
  for(const r of rows){ const k=(r.site||'?')+'|'+(r.unit||'?')+'|'+(r.ts||0); if(seen.has(k)) continue; seen.add(k);
    await dbPut(S_V, mkVisit({ site:r.site, unit:r.unit, guard:r.guard, courier:r.courier, ts:r.ts||Date.now(), dev:'legacy' })); n++; }
  return n;
}

/* ---------------------------------------------------------------- 3. kayıt üreticiler */
function mkVisit(d){ const t=Date.now();
  return { uid:uid(), site:d.site||'', unit:d.unit||'', guard:d.guard||P.guard||'', courier:d.courier||'',
    company:(d.company==null?'':String(d.company)), plate:fmtPlate(d.plate||''), note:d.note||'',
    ts:d.ts||t, updatedAt:t, dev:DEVICE, deleted:false }; }
function mkCourier(d){ const t=Date.now();
  return { uid:uid(), plate:fmtPlate(d.plate||''), key:plateKey(d.plate||''), name:d.name||'', company:d.company||'',
    ts:d.ts||t, updatedAt:t, dev:DEVICE, deleted:false, seen:d.seen||0 }; }

/* ---------------------------------------------------------------- 4. plaka motoru */
function fmtPlate(s){
  const t = String(s==null?'':s).toUpperCase().replace(/[^0-9A-Z]/g,'').replace(/^TR(?=\d)/,'');
  if(!t) return '';
  const m = t.match(/^(\d{2})([A-Z]{0,3})(\d{0,5})$/);
  if(m){ return (m[1] + (m[2]?' '+m[2]:'') + (m[3]?' '+m[3]:'')).trim(); }
  return t;
}
function plateKey(s){
  return String(s==null?'':s).toUpperCase().replace(/[^0-9A-Z]/g,'')
    .replace(/[OQD]/g,'0').replace(/[IL]/g,'1').replace(/S/g,'5').replace(/Z/g,'2').replace(/G/g,'6');
}
function lev(a,b){
  if(a===b) return 0; if(!a.length) return b.length; if(!b.length) return a.length;
  let prev=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){ const cur=[i];
    for(let j=1;j<=b.length;j++){ cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+(a[i-1]===b[j-1]?0:1)); }
    prev=cur; }
  return prev[b.length];
}
function matchPlate(plate){
  const k = plateKey(plate); if(!k) return null;
  let best=null;
  for(const c of COURIERS){ const ck=c.key||plateKey(c.plate); if(!ck) continue;
    if(ck===k) return c;
    const d=lev(ck,k), sc=1-d/Math.max(ck.length,k.length);
    if(!best||sc>best.sc) best={ c:c, sc:sc }; }
  return (best && best.sc>=0.74) ? best.c : null;
}
function matchName(name, allowFirm){
  const k = keyOf(name); if(!k) return null; let hit=null;
  /* allowFirm ile firma adıyla da eşleşir — nöbetçi "Trendyol" yazınca
     o firmanın kuryesi listelenebilsin. Ad eşleşmesi her zaman önceliklidir. */
  let byFirm=null;
  for(const c of COURIERS){
    if(keyOf(c.name)===k) return c;
    if(!hit && keyOf(c.name).indexOf(k)>=0) hit=c;
    if(allowFirm && !byFirm && c.company && keyOf(c.company).indexOf(k)>=0) byFirm=c;
  }
  return hit||byFirm;
}
/* OCR'ın okuduğu plakayı bilinen plakalara "snap"lar (0/O, 1/I, 5/S gibi
   karışıklıkları düzeltir). Yalnızca AYNI plakaya oturuyorsa düzeltir. */
function snapToKnown(plate){
  const k=plateKey(plate);
  if(!k || k.length<4) return null;
  let best=null;
  for(const c of COURIERS){
    const ck=c.key||plateKey(c.plate);
    if(!ck || ck.length!==k.length) continue;
    if(ck===k) return { plate:c.plate||fmtPlate(ck), c:c, d:0 };
    const d=lev(ck,k);
    const max = k.length>=9?2:1;
    if(d>max) continue;
    if(!best||d<best.d) best={ plate:c.plate||fmtPlate(ck), c:c, d:d };
  }
  return best;
}
function matchPlateInText(text){
  const raw = String(text||'').toUpperCase().replace(/[^0-9A-Z]/g,'');
  if(!raw) return null;
  let best=null;
  for(const c of COURIERS){ const k=c.key||plateKey(c.plate); if(!k||k.length<4) continue;
    if(raw.indexOf(k)>=0 && (!best||k.length>best.k.length)) best={ c:c, k:k }; }
  if(best) return best.c;
  const fk = plateKey(raw); let b2=null;
  for(const c of COURIERS){ const ck=c.key||plateKey(c.plate); if(!ck) continue;
    const sc=1-lev(ck,fk)/Math.max(ck.length,fk.length);
    if(!b2||sc>b2.sc) b2={ c:c, sc:sc }; }
  return (b2 && b2.sc>=0.8) ? b2.c : null;
}
function extractPlates(text){
  const t=String(text||'').toUpperCase().replace(/[^0-9A-Z]/g,'');
  const out=[];
  let re=/(\d{2})([A-Z]{1,3})(\d{2,5})/g, m;
  while((m=re.exec(t))){ const p=fmtPlate(m[1]+' '+m[2]+' '+m[3]); if(p && out.indexOf(p)<0) out.push(p); }
  if(!out.length){ re=/(\d{2,4})([A-Z]{1,3})(\d{1,4})/g;
    while((m=re.exec(t))){ const p=fmtPlate(m[1]+' '+m[2]+' '+m[3]); if(p && out.indexOf(p)<0) out.push(p); } }
  return out;
}

/* ---------------------------------------------------------------- 4b. FİRMA ALANI */
/* Firma serbest metindir; sadece hızlı işaretleme için hazır rozetler vardır.
   Kategori gibi sabit seçim DEĞİLDİR — serbest yazılabilir, açılır/kapanır. */
const FIRMS = ['Trendyol','Uber Eats','Yemeksepeti','PaketTaxi','Migros','Getir','Alo','Yemek Mart'];
let FIRM_POPULAR = FIRMS.slice();
function extraFirms(){
  const s={};
  COURIERS.forEach(c=>{ const n=norm(c.company); if(n) s[n]=(c.company||'').trim(); });
  VISITS.forEach(v=>{ const n=norm(v.company); if(n) s[n]=(v.company||'').trim(); });
  return Object.keys(s).map(k=>s[k]).filter(x=>x && FIRMS.indexOf(x)<0);
}
function firmList(){
  const extra=extraFirms();
  return FIRMS.concat(extra.slice(0,14));
}
/* Açılır rozet listesi + serbest yazım alanı üretir.
   writeId: yazılacak <input> id, fieldId: sarmalayan .co-field, chipsId: rozet kabı   */
function buildFirmUI(fieldEl, chipsEl, inputId, value, onChange){
  if(!fieldEl || !chipsEl) return;
  chipsEl.innerHTML='';
  const all=firmList();
  const inp=$(inputId);
  all.forEach(name=>{
    const b=document.createElement('button');
    b.type='button'; b.className='co-chip'; b.textContent=name; b.dataset.firm=name;
    if(norm(value)===norm(name)) b.classList.add('on');
    b.onclick=e=>{
      e.preventDefault();
      const same = norm(inp.value)===norm(name);
      inp.value = same ? '' : name;
      if(same && inputId==='f_company'){ /* form alanından temizlendi */ }
      paintFirmChips(chipsEl, inp.value);
      if(onChange) onChange(inp.value);
      try{ inp.dispatchEvent(new Event('input',{bubbles:true})); }catch(_){}
    };
    chipsEl.appendChild(b);
  });
  paintFirmChips(chipsEl, inp?inp.value:value);
}
function paintFirmChips(chipsEl, value){
  if(!chipsEl) return;
  Array.prototype.forEach.call(chipsEl.children, b=>{
    b.classList.toggle('on', !!value && norm(b.dataset.firm)===norm(value));
  });
}
function firmToggle(fieldEl, on){
  if(!fieldEl) return;
  const open = (on===undefined) ? !fieldEl.classList.contains('open') : !!on;
  fieldEl.classList.toggle('open', open);
  return open;
}
/* Bir kurye/firmanın rengi/tutarlılığı için normalize karşılaştırma */
function sameFirm(a,b){ return !!a && !!b && norm(a)===norm(b); }
function firmOf(plate, fallbackCourier){
  const c=matchPlate(plate); if(c && c.company) return c.company;
  const n=matchName(fallbackCourier||''); if(n && n.company) return n.company;
  return '';
}

/* ---------------------------------------------------------------- 5. blok verisi
   ============================================================================
   ADRES LİSTESİ — tek düzenleme noktası
   ----------------------------------------------------------------------------
   Her satır bir apartman/sitedir.  name  : ekranda görünen ad (boş bırakılırsa
   id kullanılır)  •  street : sokağın adı (sokak filtresi ve aramada kullanılır)
   •  box : harita görselindeki konum (x,y,genişlik,yükseklik — 900x1323 birim)
   •  units : daire numaraları

   Bu liste yanlışsa Ayarlar › Adresler ekranından telefonunuzdan düzeltebilir,
   ekleme ve silebilirsiniz. Değişiklikler cihazınızda saklanır ve yedeklenir.
   ============================================================================ */
const BASE_SITES = [
  /*
   * ============================================================
   * GERCEK ADRES LISTESI - Cinarköy HT Mahallesi
   * Kaynak: Site yerlesim plani görseli (güncel)
   * Sokaklar: Aleyna Sokak, Dede Korkut Sokak, Ovacık Sokak,
   *           Emekçi Sokak, Kışlık Sokak, Dumlusu Sokak
   * Box koordinatlari: viewBox 0 0 900 1323 (harita görseliyle hizali)
   * ============================================================
   */

  /* ---- CEVAHIR BLOKLARI ---- */
  {
    id:'cevahir563-13', street:'Aleyna Sokak', name:'Cevahir 563-13',
    box:[155,290,250,82],
    units:['A1','A2','B','A3','A4','C1']
  },
  {
    id:'cevahir563-12', street:'Kışlık Sokak', name:'Cevahir 563-12',
    box:[375,155,100,100],
    units:['A8','A7','C2']
  },
  {
    id:'cevahir564-1', street:'Dumlusu Sokak', name:'Cevahir 564-1',
    box:[478,40,310,375],
    units:['E','D','A4','C1','C2','A3','A8','A7','A2','A6','A5','B','E1','E2','C3','C4','B1','B2','A1']
  },

  /* ---- AYDUR BLOKLARI ---- */
  {
    id:'aydur563-15', street:'Dede Korkut Sokak', name:'Aydur 563-15',
    box:[42,392,140,160],
    units:['I','J','K']
  },
  {
    id:'aydur563-14', street:'Dede Korkut Sokak', name:'Aydur 563-14',
    box:[185,385,195,167],
    units:['N','O','P','L','M']
  },

  /* ---- GÖKYOL BLOKLARI ---- */
  {
    id:'gokyol563-16', street:'Ovacık Sokak', name:'Gökyol 563-16',
    box:[42,555,370,148],
    units:['A','B','C','D','E','F','G','H']
  },

  /* ---- SERRA BLOKLARI ---- */
  {
    id:'serra563-18', street:'Ovacık Sokak', name:'Serra 563-18',
    box:[42,708,92,160],
    units:['B3','B2','A2','B1']
  },
  {
    id:'serra563-17', street:'Ovacık Sokak', name:'Serra 563-17',
    box:[137,700,268,178],
    units:['C1','A1','C2','C3','C4','A2','E1','H1']
  },

  /* ---- PEKERLER BLOKLARI ---- */
  {
    id:'pekerler563-19', street:'Emekçi Sokak', name:'Pekerler 563-19',
    box:[42,870,370,155],
    units:['B4','D2','D1','F1','B5','G2','G1']
  },

  /* ---- KARPEM BLOKLARI ---- */
  {
    id:'karpem570-3', street:'Dumlusu Sokak', name:'Karpem 570-3',
    box:[408,398,115,192],
    units:['C2','C1','B2','B3','D','A']
  },
  {
    id:'karpem565-1', street:'Aleyna Sokak', name:'Karpem 565-1',
    box:[578,400,172,77],
    units:['B','A']
  },

  /* ---- ÖZKİYI BLOKLARI ---- */
  {
    id:'ozkiyi570-1', street:'Dumlusu Sokak', name:'Özkıyı 570-1',
    box:[408,590,115,262],
    units:['E2','E1','D2','D1','A','B1','B2','C']
  },

  /* ---- EGEYAPI BLOKLARI ---- */
  {
    id:'egeyapi569-1', street:'Emekçi Sokak', name:'Egeyapı 569-1',
    box:[408,855,188,218],
    units:['B4','A1','B3','D2','B1','B2','D1','A2','C']
  }

].map(s=>{ s.base=true; s.units=s.units.map(c=>({ c:c, entry:'' })); return s; });

let NOTES = load('ck_notes', {});
function saveNotes(){ localStorage.setItem('ck_notes', JSON.stringify(NOTES)); }
function userSites(){ const v=load('ck_sites',[]); return Array.isArray(v)?v:[]; }
function setUserSites(v){ localStorage.setItem('ck_sites', JSON.stringify(v)); rebuild(); }

/* Kullanıcının TEMEL bloklar üzerine yazdığı düzeltmeler.
   ck_ovr = { "<id>": { name, street, units, box, off } }
   "off": true  -> o temel blok gizlenir (listeden ve plandan kalkar)
   Böylece uygulamaya gömülü adres listesi yanlış olsa bile nöbetçi
   telefonundan düzeltebilir; hiçbir şey kaybolmaz.

   NOT: değişiklik yapılıp HEMEN kaydedildiği için tek bir önbellek
   nesnesi üzerinden yürüyoruz. (Depodan her seferinde yeniden okumak,
   yapılan değişikliği kaydederken ezdi — sessizce kaybolmasına yol açardı.) */
let OVR_CACHE = null;
function siteOvr(){
  if(OVR_CACHE) return OVR_CACHE;
  const v=load('ck_ovr',{});
  OVR_CACHE = (v && typeof v==='object' && !Array.isArray(v)) ? v : {};
  return OVR_CACHE;
}
function saveOvr(){
  try{ localStorage.setItem('ck_ovr', JSON.stringify(siteOvr())); }
  catch(e){ toast('Değişiklik kaydedilemedi — depolama dolu olabilir','err'); }
}
function setOvr(id, patch){
  const o=siteOvr();
  if(patch===null) delete o[id];
  else o[id]=Object.assign({}, o[id]||{}, patch);
  saveOvr();
}
function resetOvrCache(){ OVR_CACHE=null; }
/* Blok adından sokağı çıkarır: "Cevahir 563-13" -> "Cevahir".
   Ad hazırsa street alanı onu kullanır. */
function streetOf(s){
  if(s && s.street) return String(s.street).trim();
  const n=String((s&&(s.name||s.id))||'').trim();
  const m=n.match(/^([0-9]*\s*[A-Za-zÇĞİÖŞÜçğıöşüÂâÎîÛû]+)/);
  if(m) return m[1].replace(/\s+/g,' ').trim();
  return n || 'Diğer';
}
let SITES=[];

function rebuild(){
  const OVR=siteOvr();
  const merged=[], byId={};
  BASE_SITES.concat(userSites()).forEach(s=>{
    const id=s.id;
    /* kullanıcı bu temel bloğu gizlediyse hiçbir yerde görünmesin */
    if(OVR[id] && OVR[id].off) return;
    if(!byId[id]){ byId[id]={ id:id, name:s.name||id, street:streetOf(s),
      lat:s.lat||null, lng:s.lng||null, box:s.box||null, base:!!s.base, custom:!s.base, units:[] };
      merged.push(byId[id]); }
    const b=byId[id];
    if(s.box && !b.box) b.box=s.box;
    (s.units||[]).forEach(u=>{
      const c=String(typeof u==='string'?u:(u.c||'')).trim().toUpperCase();
      if(c && !b.units.some(x=>x.c===c)) b.units.push({ c:c, entry:(typeof u==='object'&&u.entry)||'' });
    });
  });
  /* kullanıcı düzeltmeleri en son uygulanır — her şeyi geçersiz kılar */
  merged.forEach(b=>{
    const o=OVR[b.id]; if(!o) return;
    if(typeof o.name==='string' && o.name.trim()) b.name=o.name.trim();
    if(typeof o.street==='string' && o.street.trim()) b.street=o.street.trim();
    if(Array.isArray(o.box) && o.box.length===4) b.box=o.box.map(Number);
    if(Array.isArray(o.units)){
      const seen={};
      b.units = o.units.map(c=>{
        const code=String((c&&c.c!=null)?c.c:c).trim().toUpperCase();
        return { c:code, entry:(c&&c.entry)||'' };
      }).filter(c=>{ if(!c.c||seen[c.c]) return false; seen[c.c]=1; return true; });
    }
    b.edited=!!(o.name||o.street||o.units||o.box);
  });
  merged.forEach(s=>{ s.units.sort((a,b)=>a.c.localeCompare(b.c,'tr',{numeric:true}));
    s.units.forEach(u=>{ const k=s.id+'|'+u.c; if(NOTES[k]) u.entry=NOTES[k]; }); });
  SITES=merged;
  /* sokak listesi: alfabetik, blok sayısıyla */
  const sm={};
  SITES.forEach(s=>{ const k=s.street||'Diğer'; (sm[k]=sm[k]||[]).push(s); });
  STREETS=Object.keys(sm).map(n=>({ name:n, sites:sm[n] }))
    .sort((a,b)=>a.name.localeCompare(b.name,'tr'));
  if(streetFilter && !STREETS.some(s=>s.name===streetFilter)) streetFilter='';
  ALL=[]; SITES.forEach(s=>s.units.forEach(u=>ALL.push({ site:s, code:u.c, label:u.entry||'',
    h:keyOf(s.name+' '+u.c+' '+(u.entry||'')+' '+s.street) })));
  buildAccordion(); buildHotspots(); renderSiteList(); renderStreetChips();
  const sv=$('#sitesVal'); if(sv) sv.textContent=SITES.length+' blok · '+ALL.length+' daire';
}
const siteById = id => SITES.find(s=>s.id===id) || null;

/* ---------------------------------------------------------------- 6. arayüz */
function toast(msg,kind){
  const t=$('#toast'); t.textContent=msg; t.className='toast show'+(kind?' '+kind:'');
  clearTimeout(t._t); t._t=setTimeout(()=>{ t.className='toast'; }, 2400);
}
function tickClock(){ const e=$('#clock'); if(e) e.textContent=new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}); }

function buildAccordion(){
  const box=$('#browseList'); if(!box) return; box.innerHTML='';
  const list = streetFilter ? SITES.filter(s=>s.street===streetFilter) : SITES;
  if(!list.length){
    box.innerHTML='<div class="sm-empty">Bu sokakta blok yok.<br><span style="font-size:12.5px">'
      +'Ayarlar › Adresler ekranından ekleyebilirsiniz.</span></div>';
    return;
  }
  list.forEach(site=>{
    const item=document.createElement('div'); item.className='acc-item';
    item.innerHTML='<div class="acc-head"><div><div class="ah-name">'+esc(site.name)+'</div>'
      +'<div class="ah-count">'+esc(site.street||'')+(site.street?' · ':'')+site.units.length+' ünite</div></div>'
      +'<svg class="acc-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div>'
      +'<div class="acc-body"><div class="acc-body-inner"></div></div>';
    const inner=item.querySelector('.acc-body-inner');
    site.units.forEach(u=>{
      const c=document.createElement('div'); c.className='unit-cell'; c.textContent=u.c;
      if(u.entry) c.title=u.entry;
      c.onclick=e=>{ e.stopPropagation(); openUnitDetail(site,u.c); };
      inner.appendChild(c);
    });
    item.querySelector('.acc-head').onclick=()=>{ item.classList.toggle('open'); sfx.tap(); };
    box.appendChild(item);
  });
}
/* Sokak filtre çubuğu — "Tümü" + her sokağın blok sayısı */
function renderStreetChips(){
  const row=$('#streetRow'); if(!row) return;
  row.innerHTML='';
  if(STREETS.length<2){ row.style.display='none'; return; }
  row.style.display='flex';
  const mk=(label,count,on,fn)=>{
    const c=document.createElement('button');
    c.type='button'; c.className='chip'+(on?' on':'');
    c.innerHTML=esc(label)+(count!=null? '<span class="n">'+count+'</span>':'');
    c.onclick=()=>{ fn(); sfx.tap(); };
    row.appendChild(c);
  };
  mk('Tümü', SITES.length, !streetFilter, ()=>{ streetFilter=''; renderStreetChips(); buildAccordion(); });
  STREETS.forEach(s=>mk(s.name, s.sites.length, streetFilter===s.name, ()=>{
    streetFilter = (streetFilter===s.name) ? '' : s.name;
    renderStreetChips(); buildAccordion();
  }));
}

function buildHotspots(){
  const svg=$('#hotspots'); if(!svg) return; let html='';
  SITES.forEach(s=>{ if(!s.box) return; const b=s.box;
    html+='<rect class="plot" data-site="'+esc(s.id)+'" x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" rx="10"></rect>'; });
  svg.innerHTML=html;
  $$('.plot',svg).forEach(z=>{ z.addEventListener('click',()=>{
    if(placing){ placeAt(z.dataset.site, svgPoint(z)); return; }
    $$('.plot',svg).forEach(o=>o.classList.remove('sel')); z.classList.add('sel');
    openSitePicker(siteById(z.dataset.site)); }); });
}
function svgPoint(target){
  const img=$('#mapImg'), r=img.getBoundingClientRect(), b=target.getBoundingClientRect();
  const x=(b.left+b.width/2-r.left)/r.width*900, y=(b.top+b.height/2-r.top)/r.height*1323;
  return [Math.max(6,Math.min(894,x-70)), Math.max(6,Math.min(1317,y-45))];
}
function renderSiteList(){
  const box=$('#siteListBox'); if(!box) return;
  const missing=SITES.filter(s=>!s.box);
  if(!missing.length){ box.innerHTML=''; return; }
  box.innerHTML='<div class="list-title">Planda olmayan bloklar</div>'
    + missing.map(s=>'<div class="log-item" data-site="'+esc(s.id)+'"><div class="l-main"><div class="l-addr">'+esc(s.name)+'</div>'
      +'<div class="l-meta">'+s.units.length+' ünite · plan üzerine ekleyin</div></div><div class="chev">›</div></div>').join('');
  $$('.log-item',box).forEach(el=>{ el.onclick=()=>{ setTab('map'); placing=el.dataset.site;
      const s=siteById(el.dataset.site);
      $('#mapHint').innerHTML='<b>'+esc(s?s.name:'')+'</b> için planda bir noktaya dokunun.';
      toast('Planda konuma dokunun'); }; });
}

/* ---- arama ---- */
const searchInput=$('#searchInput');
/* seçili sokak filtresi (arama sonuçlarını da daraltır; boşsa tümü) */
let STREETS=[], streetFilter='';
function toksOf(q){ return norm(q).split(' ').filter(Boolean); }
function renderResults(){
  const q=(searchInput.value||'').trim();
  const browse=$('#browseList'), flat=$('#resultList'), hints=$('#srHints');
  if(!q){ browse.style.display='flex'; flat.style.display='none'; hints.style.display='none'; return; }
  browse.style.display='none'; flat.style.display='flex';
  const toks=toksOf(q);
  const list=ALL.filter(u=>(!streetFilter||u.site.street===streetFilter)
    && toks.every(t=>u.h.indexOf(t)>=0));
  renderHints(q);
  if(!list.length){
    const c=matchPlate(q)||matchName(q,true)||matchPlateInText(q);
    if(c){ flat.innerHTML='';
      const el=document.createElement('div'); el.className='result';
      el.innerHTML='<div class="badge">'+esc(c.plate)+'</div><div class="info"><div class="name">'+esc(c.name||'İsimsiz')+'</div>'
        +'<div class="site">Kayıtlı kurye'+(c.company?' · '+esc(c.company):'')+'</div></div><div class="arrow">›</div>';
      el.onclick=()=>{ setTab('plate'); $('#courierSearch').value=c.name||c.plate; renderCouriers(); };
      flat.appendChild(el); return; }
    flat.innerHTML='<div class="empty"><svg class="em" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Eşleşen adres bulunamadı.<br>Farklı bir blok veya harf deneyin.'
      +'<br><span class="mini-note">'+(streetFilter? 'Seçili sokak: <b>'+esc(streetFilter)+'</b> — '
        +'<span data-clearstreet="1" style="color:var(--amber);text-decoration:underline">filtreyi kaldır</span><br>':'')
        +'Blok/daire eklemek için Ayarlar › Adresler</span></div>';
    const clr=$('[data-clearstreet]', flat);
    if(clr) clr.onclick=()=>{ streetFilter=''; renderStreetChips(); renderResults(); };
    return; }
  flat.innerHTML='';
  list.slice(0,80).forEach(u=>{
    const el=document.createElement('div'); el.className='result';
    el.innerHTML='<div class="badge">'+esc(u.code)+'</div><div class="info"><div class="name">'+esc(u.site.name)+' · '+esc(u.code)+'</div>'
      +'<div class="site">'+esc(u.label||(u.site.street?u.site.street+' · Detay için dokunun':'Detay için dokunun'))+'</div></div><div class="arrow">›</div>';
    el.onclick=()=>{ openUnitDetail(u.site,u.code); };
    flat.appendChild(el);
  });
  if(list.length>80){
    const m=document.createElement('div'); m.className='mini-note';
    m.style.textAlign='center'; m.textContent='İlk 80 sonuç gösteriliyor ('+list.length+' eşleşme). Aramayı daraltın.';
    flat.appendChild(m);
  }
}
function renderHints(q){
  const box=$('#srHints');
  const near=ALL.filter(u=>keyOf(u.code)===keyOf(q)).slice(0,6);
  if(!near.length){ box.style.display='none'; box.innerHTML=''; return; }
  box.style.display='flex'; box.innerHTML='';
  near.forEach(u=>{ const c=document.createElement('div'); c.className='chip';
    c.textContent=u.code+' · '+u.site.name; c.onclick=()=>openUnitDetail(u.site,u.code); box.appendChild(c); });
}
if(searchInput) searchInput.addEventListener('input', renderResults);

/* ---- adres detayı ---- */
const sheet=$('#sheet'), sheetBackdrop=$('#sheetBackdrop');
let currentUnit=null, currentSite=null;
function showSheet(){ sheet.classList.add('show'); sheetBackdrop.classList.add('show'); }
function closeSheet(){ sheet.classList.remove('show'); sheetBackdrop.classList.remove('show'); }
if(sheetBackdrop) sheetBackdrop.onclick=closeSheet;

function openSitePicker(site){
  if(!site) return; currentSite=site;
  $('#sheetTitle').textContent=site.name;
  $('#sheetSub').textContent='Üniteyi seçin';
  $('#unitDetail').style.display='none';
  const grid=$('#unitPicker'); grid.style.display='grid'; grid.innerHTML='';
  site.units.forEach(u=>{ const c=document.createElement('div'); c.className='unit-cell'; c.textContent=u.c;
    c.onclick=()=>openUnitDetail(site,u.c); grid.appendChild(c); });
  showSheet();
}
function openUnitDetail(site, code){
  currentUnit={ site:site, code:code }; currentSite=site;
  $('#sheetTitle').textContent=site.name+' · '+code;
  $('#sheetSub').textContent='Çınarköy Evleri, Çekmeköy';
  $('#unitPicker').style.display='none';
  $('#unitDetail').style.display='block';
  const u=(site.units||[]).find(x=>x.c===code);
  const noteBox=$('#sheetNote');
  if(u && u.entry){ noteBox.style.display='flex'; $('#sheetNoteText').textContent=u.entry; } else noteBox.style.display='none';
  paintUnitHistory();
  const box=$('#qrBox');
  if(window.QRCode){ box.style.display='block'; $('#qrcode').innerHTML='';
    try{ new QRCode($('#qrcode'),{ text:mapsUrl(site,code), width:210, height:210, colorDark:'#0A0D0D', colorLight:'#ffffff' }); }catch(e){ box.style.display='none'; } }
  else { box.style.display='block'; $('#qrcode').innerHTML='<div class="qr-fallback">'+esc(mapsUrl(site,code))+'</div>'; }
  showSheet();
}
function paintUnitHistory(){
  if(!currentUnit) return;
  const list=VISITS.filter(v=>v.site===currentUnit.site.name && v.unit===currentUnit.code);
  $('#usTotal').textContent=list.length;
  $('#usLast').textContent=list.length?fmtTR(list[0].ts):'—';
  $('#usCourier').textContent=list.length?(list[0].courier||'—'):'—';
  const h=$('#unitHistory'); h.innerHTML='';
  if(!list.length){ h.innerHTML='<div class="ml"><span>Bu daireye daha önce kayıt yapılmamış</span></div>'; return; }
  h.innerHTML='<div class="ml" style="justify-content:center;text-align:center;padding:12px 0;"><span style="color:var(--sub);font-size:13px;line-height:1.4;">Toplam '+list.length+' giriş kaydı var.<br>Detayları Kayıtlar veya Excel üzerinden görebilirsiniz.</span></div>';
}
function mapsUrl(site, code){
  if(site.lat&&site.lng) return 'https://www.google.com/maps?q='+site.lat+','+site.lng;
  return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Çınarköy Evleri '+site.name+' '+code);
}
function openMaps(site, code){
  if(!site){ toast('Blok bulunamadı','err'); return; }
  const url=mapsUrl(site, code);
  const w=window.open(url,'_blank','noopener');
  if(!w || w===undefined){ toast('Açılama engellendi — bağlantıyı elle açabilirsiniz','err'); copyText(url); }
  else toast(site.name+' '+(code||'')+' haritada açıldı','ok');
}
/* Uygulama içi haritada bloğu seçip odaklar — dış sekme açmadan hızlı yön bulma */
function focusOnMap(site, code){
  if(!site){ toast('Blok bulunamadı','err'); return; }
  setTab('map');
  const sel=$('.plot.sel', $('#hotspots'));
  if(sel) sel.classList.remove('sel');
  const z=$('.plot[data-site="'+site.id+'"]', $('#hotspots'));
  if(z){
    z.classList.add('sel');
    if(z.scrollIntoView) try{ z.scrollIntoView({ block:'center', behavior:'smooth' }); }catch(e){}
    z.animate ? z.animate([{opacity:.35},{opacity:1}], { duration:700, iterations:3 }) : 0;
  }
  openUnitDetail(site, code|| (site.units[0]&&site.units[0].c));
  toast(site.name+(code?' · '+code:'')+' planda işaretlendi','ok');
  speak(site.name+(code?' '+code:'')+' planda gösteriliyor.');
}
$('#closeSheetBtn').onclick=closeSheet;
$('#openMapsBtn').onclick=()=>{ if(currentUnit) openMaps(currentUnit.site, currentUnit.code); };
$('#speakUnitBtn').onclick=()=>{ if(!currentUnit) return; sfx.tap();
  const h=VISITS.find(v=>v.site===currentUnit.site.name&&v.unit===currentUnit.code);
  speak(currentUnit.site.name+' '+currentUnit.code+' numaralı daire.'
    + (h? ' Son giriş: '+(h.courier||'—')+(h.plate?', plaka '+h.plate:'')+'.':'') ); };

/* ---- teslimat kaydı ---- */
let pendingCourier=false;
function paintCourierFirm(){
  const field=$('#courierCoField'), chips=$('#courierCoChips');
  if(!field||!chips) return;
  buildFirmUI(field, chips, '#courierCompanyInput', $('#courierCompanyInput').value, null);
  firmToggle(field, !!P.autoFirm);
}
function openCourierModal(pre){
  pre=pre||{};
  if(!currentUnit && !pre.unit){ toast('Önce bir daire seçin','err'); return; }
  if(pre.unit && !currentUnit) currentUnit=pre.unit;
  pendingCourier=true;
  const name=pre.courier||'', plate=pre.plate||'';
  const known=matchPlate(plate);
  $('#courierNameInput').value = name || (known?known.name:'');
  $('#courierPlateInput').value = plate;
  $('#courierCompanyInput').value = pre.company!=null ? pre.company
    : (known? (known.company||'') : (norm(name)? (firmOf('',name)||'') : ''));
  $('#courierModalText').textContent = currentUnit
    ? (currentUnit.site.name+' · '+currentUnit.code+' — kuryeyi girin ya da plakayı okutun.')
    : 'Kuryeyi girin ya da plakayı okutun.';
  $('#courierPlateBox').style.display=P.autoPlate?'block':'none';
  $('#plateHint').textContent='';
  paintCourierFirm();
  courierSuggest();
  plateLookup();
  /* Zayıf okuma: kaydedilen plaka kurye listesine de yazılacağı için
     yanlış okuma kalıcılaşmasın diye nöbetçiye uyarıp alana odaklanılır. */
  const weak = !!pre.weak && !known;
  $('#plateHint').className = weak ? 'warn' : '';
  if(weak){
    $('#plateHint').innerHTML='<b>Okuma zayıf — plakayı karşılaştırıp düzeltin.</b> Yanlış plaka kurye listesine kaydedilir.';
    $('#courierPlateBox').classList.add('weak');
  } else $('#courierPlateBox').classList.remove('weak');
  $('#courierModal').classList.add('show');
  setTimeout(()=>{
    if(weak){ const p=$('#courierPlateInput'); if(p){ p.focus(); try{ p.select(); }catch(e){} } return; }
    const n=$('#courierNameInput'); if(n && !n.value) n.focus();
  },260);
}
$('#logVisitBtn').onclick=()=>{ sfx.tap(); if(!currentUnit){ toast('Önce bir daire seçin','err'); return; }
  if(!P.guard){ openNameModal(false); return; } openCourierModal(); };
$('#cancelCourierBtn').onclick=()=>{ pendingCourier=false; $('#courierModal').classList.remove('show'); };
$('#cancelGuardBtn').onclick=()=>{ $('#nameModal').classList.remove('show'); };

$('#courierNameInput').addEventListener('input', courierSuggest);
$('#courierCompanyInput').addEventListener('input', ()=>paintFirmChips($('#courierCoChips'), $('#courierCompanyInput').value));
$('#courierCoToggle').onclick=()=>firmToggle($('#courierCoField'));
function courierSuggest(){
  const box=$('#courierSuggest'), q=keyOf($('#courierNameInput').value);
  if(!q){ box.innerHTML=''; return; }
  const list=COURIERS.filter(c=>keyOf(c.name).indexOf(q)>=0||keyOf(c.company).indexOf(q)>=0).slice(0,6);
  if(!list.length){ box.innerHTML=''; return; }
  box.innerHTML='';
  list.forEach(c=>{ const d=document.createElement('div'); d.className='ml'; d.style.cursor='pointer';
    d.innerHTML='<div>'+esc(c.name)+' <span class="plate-sm">'+esc(c.plate)+'</span></div><span>'+esc(c.company||'—')+'</span>';
    d.onclick=()=>{ $('#courierNameInput').value=c.name; $('#courierPlateInput').value=c.plate;
      if(c.company) $('#courierCompanyInput').value=c.company;
      $('#plateHint').textContent='Listeden seçildi.'; paintCourierFirm(); courierSuggest(); };
    box.appendChild(d); });
}
$('#courierPlateInput').addEventListener('input', ()=>{
  const el=$('#courierPlateInput');
  const oldVal=el.value, pos=el.selectionStart;
  const newVal=fmtPlate(oldVal);
  if(newVal!==oldVal){
    el.value=newVal;
    // Cursor ofsetini duzelt: format bosluk ekleyince/cikarinca dogru konuma git
    const diff=newVal.length-oldVal.length;
    const newPos=Math.max(0,Math.min(newVal.length, pos+diff));
    try{ el.setSelectionRange(newPos,newPos); }catch(e){}
  }
  /* nobetci plakaya dokundu - zayif okuma isareti kalkar */
  $('#plateHint').className=''; $('#courierPlateBox').classList.remove('weak');
  plateLookup();
});
function plateLookup(){
  const p=$('#courierPlateInput').value, hint=$('#plateHint');
  if(!p){ hint.textContent=''; return; }
  const c=matchPlate(p);
  if(c){
    hint.innerHTML='<b style="color:var(--ok)">✓ Listede bulundu: '+esc(c.name||'adı girilmemiş')+'</b>'+(c.company?' ('+esc(c.company)+')':'');
    if(!$('#courierNameInput').value && c.name){ $('#courierNameInput').value=c.name; }
    if(c.company && !$('#courierCompanyInput').value){ $('#courierCompanyInput').value=c.company; paintCourierFirm(); }
  }
  else hint.textContent='Bu plaka listede yok — kaydederken otomatik öğrenilir.';
}
$('#courierCamBtn').onclick=()=>{ sfx.tap(); Cam.ctxMode='fill'; Cam.open({ mode:'fill' }); };
$('#camUnitBtn').onclick=()=>{ sfx.tap(); Cam.ctxMode='log'; Cam.open({ mode:'log', unit:currentUnit }); };

$('#saveCourierBtn').onclick=async ()=>{
  const name=$('#courierNameInput').value.trim();
  const plate=fmtPlate($('#courierPlateInput').value);
  const company=$('#courierCompanyInput').value.trim();
  if(!name && !plate){ toast('Kurye adı ya da plaka girin','err'); sfx.err(); return; }
  if(!currentUnit){ toast('Önce bir daire seçin','err'); return; }
  const siteName=currentUnit.site.name, code=currentUnit.code;
  const unitRef={ site:currentUnit.site, code:code };
  /* Ad bos birakildiysa sahte bir isim ("Bilinmiyor") yazma: o isim listeye
     kalici gecer ve sonraki kayitlarda otomatik gelir, kurye listesi kirenir. */
  const cname = name || (matchPlate(plate)||{}).name || '';
  const rec = await saveVisit({ site:siteName, unit:code, courier:cname, plate:plate, company:company });
  if(plate && P.autolearn){
    const known=COURIERS.find(c=>c.key===plateKey(plate));
    if(!known) await learnPlate(plate, cname, company);
    else if(company && !known.company){ known.company=company; known.updatedAt=Date.now(); await dbPut(S_C,known); }
  }
  pendingCourier=false;
  $('#courierModal').classList.remove('show');
  closeSheet();
  sfx.ok(); buzz(18);
  speak('Giriş kaydedildi. '+(cname||'Kurye adı girilmedi')+(plate?'. Plaka '+plate:''));
  afterSave(siteName, code, unitRef, rec);
};

/* Kayıt sonrası: ne yapmak istediğini sor — mantık zinciri tamam */
function afterSave(siteName, code, unitRef, rec){
  const site=unitRef?unitRef.site:(SITES.find(s=>s.name===siteName)||null);
  const total=VISITS.filter(v=>v.site===siteName&&v.unit===code).length;
  openActions('Giriş kaydedildi',
    siteName+' '+code+(total>1? ' · bu dairede toplam '+total+' kayıt' : ''),
    [
      { ico:ic('map',17), t:'Planda göster', s:siteName+' '+code+' — uygulama içi planda işaretle', primary:true,
        run:()=>{ focusOnMap(site, code); } },
      { ico:ic('repeat',17), t:'Ardışık kayıt', s:'Aynı daireye bir kurye daha girdiyse hemen kaydet',
        run:()=>{ setTimeout(()=>{ currentUnit=unitRef||currentUnit; openCourierModal(); },320); } },
      { ico:ic('list',17), t:'Kayıt listesinde gör', s:'Tüm giriş kayıtlarını aç',
        run:()=>{ setTab('log'); } },
      { ico:ic('nav',17), t:'Google Haritalar\'da aç', s:'Adresi yeni sekmede açar',
        run:()=>{ openMaps(site, code); } }
    ]);
}
function openActions(title, text, actions){
  $('#actTitle').textContent=title||'';
  const t=$('#actText'); t.textContent=text||''; t.style.display=text?'block':'none';
  const box=$('#actList'); box.innerHTML='';
  (actions||[]).forEach(a=>{
    const b=document.createElement('button'); b.type='button';
    if(a.primary) b.className='prim';
    if(a.danger) b.className='danger';
    b.innerHTML='<span class="ai">'+(a.ico||'•')+'</span><span class="at">'+esc(a.t)
      +(a.s?'<small>'+esc(a.s)+'</small>':'')+'</span>';
    b.onclick=()=>{ $('#actModal').classList.remove('show'); setTimeout(()=>{ if(a.run) a.run(); },80); };
    box.appendChild(b);
  });
  $('#actModal').classList.add('show');
  /* Önceki bir soru hâlâ bekliyorsa onu iptal et — yoksa vaatler birikiyor
     ve o akış (ör. silme onayı) sonsuza dek kilitli kalıyor. */
  if(actResolve){ const prev=actResolve; actResolve=null; try{ prev(false); }catch(e){} }
  return new Promise(res=>{ actResolve=res; });
}
let actResolve=null;
$('#actClose').onclick=()=>{ $('#actModal').classList.remove('show'); if(actResolve){ const r=actResolve; actResolve=null; r(false); } };

async function saveVisit(d){
  const rec=mkVisit(d); await dbPut(S_V,rec);
  VISITS.unshift(rec);
  const c=COURIERS.find(x=>d.plate && x.key===plateKey(d.plate));
  if(c){ c.seen=(c.seen||0)+1; c.updatedAt=Date.now(); await dbPut(S_C,c); }
  renderStats(); renderLastPlates(); renderCouriers();
  /* kayit listesi ve daire istatistikleri de tazelenir */
  renderLog(); paintUnitHistory(); return rec;
}
async function learnPlate(plate, name, company){
  const c=mkCourier({ plate:plate, name:name, company:company||'' }); await dbPut(S_C,c);
  COURIERS.unshift(c); renderCouriers(); return c;
}

/* ---------------------------------------------------------------- 7. nöbetçi adı */
function openNameModal(isEdit){
  $('#nameModalTitle').textContent = isEdit?'Nöbetçi adını değiştir':'Nöbetçi adınız';
  $('#nameModalText').textContent = isEdit
    ? 'Yeni adı kaydedin. Geçmiş kayıtlar eski isimlerini korur.'
    : 'Kayıtlar hangi güvenlik görevlisine ait olsun? İstediğiniz zaman değiştirebilirsiniz.';
  $('#nameHint').style.display = isEdit?'block':'none';
  $('#guardNameInput').value = P.guard || '';
  $('#nameModal').classList.add('show');
  setTimeout(()=>$('#guardNameInput').focus(),260);
}
$('#saveGuardBtn').onclick=()=>{
  const v=$('#guardNameInput').value.trim();
  if(!v){ toast('İsim girin','err'); sfx.err(); return; }
  const old=P.guard; P.guard=v;
  if(old && old!==v) P.names=Array.from(new Set([old].concat(P.names))).slice(0,8);
  if(P.names.indexOf(v)<0) P.names.unshift(v);
  P.names=P.names.slice(0,8);
  savePrefs(); paintGuard();
  $('#nameModal').classList.remove('show'); sfx.ok();
  if(pendingCourier || currentUnit) openCourierModal();
  else toast('Nöbetçi adı: '+v,'ok');
};
$('#guardLabel').onclick=()=>{ sfx.tap(); openNameModal(!!P.guard); };
$('#rowGuard').onclick=()=>openNameModal(!!P.guard);
function paintGuard(){
  $('#guardLabel').textContent = P.guard || 'Güvenlik adres asistanı';
  const v=$('#guardVal'); if(v) v.textContent = P.guard || '—';
  const n=$('#namesVal'); if(n) n.textContent = String((P.names||[]).length);
}

/* ---------------------------------------------------------------- 8. sesli okuma */
const TTS = { ok:('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window) };
function trVoice(){
  try{ const v=speechSynthesis.getVoices()||[]; return v.find(x=>/^tr[-_]/i.test(x.lang))||v.find(x=>/Türk/i.test(x.name))||null; }catch(e){ return null; }
}
function speak(text, force){
  if(!TTS.ok){ if(force) toast('Bu cihazda sesli okuma yok','err'); return; }
  if(!P.tts && !force) return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(text));
    const v=trVoice(); if(v){ u.voice=v; u.lang=v.lang; } else u.lang='tr-TR';
    u.rate=P.rate||1; u.pitch=1; u.volume=1;
    speechSynthesis.speak(u);
  }catch(e){}
}
function stopSpeak(){ try{ speechSynthesis.cancel(); }catch(e){} }
$('#speakBtn').onclick=()=>{ sfx.tap(); readScreen(); };
function readScreen(){
  const tab=currentTabName;
  if(tab==='search'){ const q=searchInput.value.trim();
    if(q){ const l=ALL.filter(u=>toksOf(q).every(t=>u.h.indexOf(t)>=0)).slice(0,5);
      speak(l.length? l.map(u=>u.site.name+' '+u.code).join(', ') : 'Sonuç bulunamadı.'); }
    else speak('Çınarköy Nöbet. '+SITES.length+' blok, '+ALL.length+' daire. Aramak için yazın ya da mikrofona dokunun.'); }
  else if(tab==='map') speak('Yerleşim planı. Bir bloğa dokunun.');
  else if(tab==='plate') speak('Plaka tanıma. Kamerayı aç ve okut tuşuna dokunun. Kayıtlı kurye sayısı: '+COURIERS.length);
  else if(tab==='log') readLogAloud();
  else speak('Ayarlar. Nöbetçi adı: '+(P.guard||'belirlenmedi')+'.');
}
function readLogAloud(){
  const today=VISITS.filter(v=>v.ts>=startOfToday());
  if(!today.length){ speak('Bugün henüz giriş kaydı yok.'); return; }
  speak('Bugün '+today.length+' giriş kaydı var. İlk kayıt: '+today[today.length-1].site+' '+today[today.length-1].unit
    +', kurye '+(today[today.length-1].courier||'—')+'. Son kayıt: '+today[0].site+' '+today[0].unit+'.');
}

/* ---------------------------------------------------------------- 9. sesli yazım */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const liveBar=$('#liveBar');
function showLive(t,x){ if(!liveBar) return; $('#liveTitle').textContent=t; $('#liveText').textContent=x||''; liveBar.classList.toggle('show',!!t); }
const Voice = {
  rec:null, btn:null, onFinal:null,
  get active(){ return !!this.rec; },
  start(btn, opts){
    opts=opts||{};
    if(this.rec){ const same=(this.btn===btn); this.stop(); if(same) return; }
    if(!SR){ sfx.err(); sttHelp('Bu tarayıcı sesli yazımı desteklemiyor. Google Chrome (Android) ya da Microsoft Edge kullanın.'); return; }
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ sfx.err();
      sttHelp('Bu sayfa mikrofon erişimine izin vermiyor. Dosya olarak açılan uygulamalarda bu sınırlıdır; aşağıdaki adımları deneyin.'); return; }
    let r; try{ r=new SR(); }catch(e){ toast('Mikrofon başlatılamadı','err'); return; }
    r.lang='tr-TR'; r.continuous=!!opts.continuous; r.interimResults=true; r.maxAlternatives=1;
    this.rec=r; this.btn=btn; this.onFinal=opts.onFinal;
    btn.classList.add('listening'); showLive('Dinliyor…','');
    r.onresult=e=>{ let fin='', itm='';
      for(let i=e.resultIndex;i<e.results.length;i++){ const t=e.results[i][0].transcript; if(e.results[i].isFinal) fin+=t; else itm+=t; }
      if(itm) showLive('Dinliyor…',itm);
      if(fin.trim()){ const txt=fin.trim(); this.stop(); if(this.onFinal) this.onFinal(txt); } };
    r.onerror=e=>{ const m=this.msg(e.error); this.stop();
      if(e.error!=='no-speech' && e.error!=='aborted'){ sfx.err(); sttHelp(m); } };
    r.onend=()=>{ this.clean(); };
    try{ r.start(); }catch(e){ this.clean(); toast('Mikrofon başlatılamadı','err'); }
  },
  stop(){ const r=this.rec; this.rec=null; if(r){ try{ r.stop(); }catch(e){} } this.clean(); },
  clean(){ if(this.btn) this.btn.classList.remove('listening'); this.rec=null; this.btn=null; showLive('',''); },
  msg(code){
    switch(code){
      case 'not-allowed': case 'service-not-allowed': return 'Tarayıcı mikrofon iznini vermedi. Adres çubuğundaki kilit simgesine dokunup Mikrofon için İzin Verin, sonra tekrar deneyin.';
      case 'audio-capture': return 'Mikrofon bulunamadı. Kulaklık takılı olabilir, çıkarıp tekrar deneyin.';
      case 'network': return 'Sesli yazım servisine ulaşılamadı. Bu özellik için internet bağlantısı gerekir.';
      case 'no-speech': return 'Ses algılanmadı. Mikrofona yaklaşın ve tekrar deneyin.';
      case 'aborted': return 'Sesli yazım iptal edildi.';
      default: return 'Sesli yazım başarısız oldu. Tekrar deneyin.';
    }
  }
};
$('#micBtn').onclick=()=>{ sfx.tap(); Voice.start($('#micBtn'), { onFinal:t=>{
  searchInput.value=t; renderResults(); sfx.ok();
  const first=$('#resultList .result');
  if(first){ speak('Bulundu'); setTimeout(()=>{ first.click(); },260); } } }); };
$('#guardMicBtn').onclick=()=>{ sfx.tap(); Voice.start($('#guardMicBtn'), { onFinal:t=>{ $('#guardNameInput').value=cleanSpeech(t); } }); };
$('#courierMicBtn').onclick=()=>{ sfx.tap(); Voice.start($('#courierMicBtn'), { onFinal:t=>{ $('#courierNameInput').value=cleanSpeech(t); courierSuggest(); } }); };
$('#plateMicBtn').onclick=()=>{ sfx.tap(); Voice.start($('#plateMicBtn'), { onFinal:t=>{
  const d=spokenPlate(t); $('#courierPlateInput').value=d||fmtPlate(cleanSpeech(t)); plateLookup(); if(d) sfx.ok(); } }); };
function cleanSpeech(t){ return String(t||'').trim().replace(/\s+/g,' ').replace(/[.,]$/,''); }
function spokenPlate(t){ const s=String(t||'').toUpperCase().replace(/[^0-9A-Z]/g,'').replace(/^TR/,'');
  const m=s.match(/^(\d{2})([A-Z]{1,3})(\d{1,5})$/); return m?fmtPlate(m[1]+' '+m[2]+' '+m[3]):''; }

/* =================================================================
   10. KAMERA + PLAKA OKUMA
   - Tam ekran camgöbeği arayüz, okuma sonucu kartı
   - Otomatik plaka bölgesi bulma (parlaklık projeksiyonu)
   - Kontrast germe + Otsu + ters çevirme ile metin ön işleme
   - Çok denemeli tanıma, güvenilirlik puanlaması, elle düzeltme
   ================================================================= */

/* --- Türk plakası makullüğü: 34 ABC 123 biçimi --- */
function platePlausible(p){
  const raw=String(p==null?'':p).toUpperCase().replace(/[^0-9A-Z]/g,'');
  const m=raw.match(/^(\d{2})([A-Z]{1,3})(\d{1,5})$/);
  if(!m) return 0;
  let pen=0;
  if(/[OQG]/.test(m[2])) pen+=4;            // plaka harf grubunda nadir
  if(m[2].length===3 && m[3].length>4) pen+=1;
  /* Rakam grubu uzunluğu: 2018 sonrası plakalar 3-4 haneli. 2 haneli okuma
     genelde son hanelerin ATILMASI demektir, bu yüzden ceza alır. */
  if(m[3].length<2) pen+=5; else if(m[3].length===2) pen+=3;
  if(m[2].length===1) pen+=1;
  if(raw.length>10) pen+=3;
  let sc=12-pen;
  if(sc<=0) return 0;
  if(matchPlate(raw)) sc+=25;               // kayıtlı kurye listesinde eşleşti
  return sc;
}
/* OCR'ın harf/rakam karışıklıklarını konum farkındalıklı düzeltir.
   Plaka yapısı: 2 rakam + 1-3 harf + 2-5 rakam.                     */
const CH2DIG={ 'O':'0','Q':'0','D':'0','I':'1','L':'1','Z':'2','S':'5','G':'6','B':'8','A':'4','T':'7' };
const CH2LET={ '0':'O','1':'I','2':'Z','5':'S','6':'G','8':'B','4':'A','7':'T' };
const isDig = c => c>='0'&&c<='9';
const isLet = c => c>='A'&&c<='Z';
function structCandidates(raw){
  const out=[], n=raw.length;
  /* varyant havuzu: değişmemiş metin + her konumdan bir karakter silinmiş
     halleri + sondaki tekrar eden rakamın atılmış halleri.
     "06TI9021" -> "06T9021", "06KL23011" -> "06KL2301" gibi onarımlar buradan gelir. */
  const seeds=[{ s:raw, pen:0 }];
  for(let j=2; j<n-1; j++) seeds.push({ s: raw.slice(0,j)+raw.slice(j+1), pen:2 });
  for(let j=3; j<n; j++){                      /* sondaki tekrar eden rakamı at */
    if(raw[j]!==raw[j-1]) continue;
    seeds.push({ s: raw.slice(0,j)+raw.slice(j+1), pen:1 });
  }
  for(let lead=0; lead<=2; lead++){
    for(const v of seeds){
      const s = v.s.slice(lead);
      if(s.length<5) continue;
      let d1='';
      for(let k=0;k<2;k++){ const c=s[k]; const m=isDig(c)?c:(CH2DIG[c]||''); if(!m){ d1=''; break; } d1+=m; }
      if(!d1) continue;
      for(let L=1; L<=3; L++){
        const numLen=s.length-2-L;
        /* Türk plakasında harf grubundan sonra EN FAZLA 4 rakam olur.
           5 rakam kabul ediliyordu ve "06 KL 23011" gibi geçersiz okumaları
           en yüksek puanla taşıyordu. */
        if(numLen<1 || numLen>4) continue;
        let letters='', bad=false;
        for(let k=0;k<L;k++){ const c=s[2+k]; const m=isLet(c)?c:(CH2LET[c]||''); if(!m){bad=true;break;} letters+=m; }
        if(bad) continue;
        let num='';
        for(let k=0;k<numLen;k++){ const c=s[2+L+k]; const m=isDig(c)?c:(CH2DIG[c]||''); if(!m){bad=true;break;} num+=m; }
        if(bad) continue;
        let sc=(L===2?6:(L===1?4:3)) + (numLen===4?2:(numLen<3?-2:0));
        /* zaten doğru sınıfta okunan karakterler güvenilirdir */
        for(let k=0;k<L;k++) if(isLet(s[2+k])) sc+=1;
        for(let k=0;k<numLen;k++) if(isDig(s[2+L+k])) sc+=1;
        /* sondaki rakam tekrarı düzeltildiyse küçük bir puan geri ver:
           "23011" -> "2301" gerçek bir onarımdır, tahmin değil */
        if(v.pen===1) sc+=2;
        /* Pencere kaydirmak (lead) ve karakter DEGISTIRMEK (O->0, A->4 gibi)
           tahmindir; dogrudan okunan metin her zaman once gelmeli. Aksi halde
           '34ABC123' temiz okunmasina ragmen '44 BC 123'e donusuyordu: A'nin
           rakam sanilmasi (CH2DIG A->4) puani yukari tasiyordu.
           * Dogrudan okunan metin  : 0 ceza
           * Karakter degistirilmis : -4
           * Pencere kaydirilmis    : -3
         */
        let subs=0;
        for(let k=0;k<2;k++) if(!isDig(s[k])) subs++;
        for(let k=0;k<L;k++) if(!isLet(s[2+k])) subs++;
        for(let k=0;k<numLen;k++) if(!isDig(s[2+L+k])) subs++;
        if(lead>0) sc-=3;
        sc-=subs*4;
        out.push({ plate: fmtPlate(d1+' '+letters+' '+num), score: sc - v.pen });
      }
    }
  }
  return out;
}
/* Bir OCR metninden aday plakaları puanlı çıkar */
function plateCandidates(text, conf){
  const out=[];
  const push=(p, bonus)=>{
    let pl=fmtPlate(p);
    if(pl){
      /* bilinen plakaya oturuyorsa yazım hatasını düzelt (S5AB1234 -> 55 AB 1234) */
      const sn=snapToKnown(pl);
      if(sn) pl=sn.plate;
    }
    if(!pl) return;
    const s=platePlausible(pl)+bonus;
    if(s<=0) return;
    const c=matchPlate(pl);
    /* Eşleşen kurye varsa gösterilen plaka onun KAYITLI plakası olsun.
       Böylece "44 BC 123 → Ali Yılmaz (34 ABC 123)" gibi çelişki olmaz ve
       kaydedilen kayıt her zaman tutarlı kalır. */
    if(c && c.plate) pl=c.plate;
    const at=out.find(o=>o.plate===pl);
    if(at){ if(s>at.score) at.score=s; if(c&&!at.courier) at.courier=c; return; }
    out.push({ plate:pl, score:s, courier:c||null });
  };
  let raw=String(text||'').toUpperCase().replace(/[^0-9A-Z]/g,'');
  /* plakanın soluna/altına bulaşan gereksiz harfleri at (ör. "S5AB1234", "TR55AB1234") */
  const trimmed=raw.replace(/^[^0-9]{1,3}(?=\d{2}[A-Z])/,'');
  if(trimmed && trimmed!==raw) raw=trimmed;
  if(raw){
    /* 1) kayıtlı plakalardan metin içinde geçen */
    for(const c of COURIERS){
      const k=c.key||plateKey(c.plate);
      if(k && k.length>=4 && raw.indexOf(k)>=0) push(k, 30);
    }
    /* 2) yapısal olarak yakalananlar */
    let re=/(\d{2})([A-Z]{1,3})(\d{2,5})/g, m;
    while((m=re.exec(raw))) push(m[1]+' '+m[2]+' '+m[3], 3);
    /* 3) konum farkındalıklı onarım — O/0, S/5, K gibi karışıklıkları düzeltir */
    structCandidates(raw).forEach(c=>push(c.plate, c.score-10));
    if(!out.length){
      re=/(\d{2,4})([A-Z]{1,3})(\d{1,4})/g;
      while((m=re.exec(raw))) push(m[1]+' '+m[2]+' '+m[3], -3);
    }
    if(!out.length && raw.length>=5 && raw.length<=10) push(raw, -4);
  }
  /* Kesilmiş okumalar: "34 ABC 12" aslında "34 ABC 123"in yarısıdır.
     Tesseract düşük kontrastlı SON karakterleri atar, uydurmaz. Bu yüzden
     bir adayın, aynı resimden çıkan başka bir adayın tam ön eki ise puanı
     düşürülür. (Aksi halde eksik okuma doğru okumayı yeniyordu.) */
  const nk=o=>String(o.plate||'').toUpperCase().replace(/[^0-9A-Z]/g,'');
  out.forEach(o=>{
    const k=nk(o); if(k.length<6) return;
    for(const q of out){
      if(q===o) continue;
      const qk=nk(q);
      if(qk.length>k.length && qk.indexOf(k)===0){ o.score-=5; break; }
    }
  });
  /* Tesseract'ın güven puanı kırpılmış plakada kararsızdır: bazen doğru
     okuma 0, bazen eksik okuma 95 geliyor. Bu yüzden ağırlığı çok düşük
     tutulur (yalnızca eşitlik bozucu). */
  const c=conf||70;
  out.forEach(o=>{ o.score += Math.max(-2, Math.min(2, (c-70)/25)); o.score=Math.round(o.score*10)/10; });
  out.sort((a,b)=>b.score-a.score);
  return out;
}

/* --- Plaka bölgesi bulma ------------------------------------------------
   Plaka, çevresinden daha parlak (ya da koyu) yatay bir dikdörtgendir.
   Satır/sütun projeksiyonuyla önce plaka bandını, sonra genişliğini buluruz.
   Eşikler kendiliğinden ayarlanır (medyan tabanlı) ve kısa boşluklar
   birleştirilir; böylece kalın karakterler bandı delmez.                */
function longestRun(counts, den, thr, minLen, gap){
  const n=counts.length, ok=new Uint8Array(n);
  for(let i=0;i<n;i++) ok[i]=(counts[i]/den>=thr)?1:0;
  const g=(gap==null?1:gap);
  let best=null, s=-1, miss=0;
  for(let i=0;i<n;i++){
    if(ok[i]){ if(s<0) s=i; miss=0; }
    else if(s>=0){
      miss++;
      if(miss>g){ const e=i-miss; if(!best||(e-s)>(best[1]-best[0])) best=[s,e]; s=-1; miss=0; }
    }
  }
  if(s>=0 && (!best||(n-s)>(best[1]-best[0]))) best=[s,n];
  if(!best || (best[1]-best[0])<minLen) return null;
  return best;
}
function medianOf(arr){
  const a=Array.prototype.slice.call(arr).sort(function(p,q){ return p-q; });
  return a.length? a[a.length>>1] : 0;
}
/* Plaka bölgesi adaylarını en iyiden başlayarak sıralı döndürür.
   TEK aday döndürmek yanlış bölge seçilince okumayı tümden başarısız
   kılıyordu; bu yüzden birden çok aday denenir.
   Üç ayrı dedektör birlikte çalışır:
     1) parlak maske  — beyaz zeminli plaka (gündüz, aydınlık)
     2) koyu maske    — siyah zeminli plaka (gece, özel plaka)
     3) kenar maskesi — ne parlak ne koyu: kirli, yansımalı, ters ışıklı   */
function findPlateRegions(src){
  const TW=400, TH=Math.max(80, Math.min(600, Math.round(src.height*TW/src.width)));
  const c=document.createElement('canvas'); c.width=TW; c.height=TH;
  const x=c.getContext('2d',{ willReadFrequently:true });
  try{ x.drawImage(src,0,0,TW,TH); }catch(e){ return []; }
  let d; try{ d=x.getImageData(0,0,TW,TH).data; }catch(e){ return []; }
  const N=TW*TH, lum=new Uint8Array(N);
  const mb=new Uint8Array(N), md=new Uint8Array(N), me=new Uint8Array(N);
  let nb=0, nd=0, ne=0;
  for(let i=0,p=0;i<d.length;i+=4,p++){
    const v=d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114;
    lum[p]=v;
    if(v>=148){ mb[p]=1; nb++; }
    if(v<60){ md[p]=1; nd++; }          /* çok koyu: neredeyse siyah plaka/çerçeve */
  }
  /* 3) kenar enerjisi maskesi — dikey kenarlar (harf sütunları) yatay bir
     plakada güçlüdür. Ne parlak ne koyu plakaları yakalamak için. */
  edgeMask(lum, TW, TH, me);
  for(let p=0;p<N;p++) if(me[p]) ne++;

  const out=[];
  const push=(m,cnt,light,boost)=>{
    if(cnt < N*0.004) return;
    const r=regionFromMask(m,TW,TH,src,light);
    if(r){ r.fit*=boost; out.push(r); }
  };
  push(mb, nb, true,  1.00);
  push(md, nd, false, 1.00);
  push(me, ne, null,  0.92);   /* kenar bulgusu biraz daha zayıf sayılır */

  if(!out.length) return [];
  /* aynı yeri gösteren adayları birleştir (IOU benzeri) */
  out.sort(function(a,b){ return b.fit-a.fit; });
  const uniq=[];
  for(const r of out){
    let dup=false;
    for(const u of uniq){
      const ax=r.rect, bx=u.rect;
      const ix=Math.max(0,Math.min(ax[0]+ax[2],bx[0]+bx[2])-Math.max(ax[0],bx[0]));
      const iy=Math.max(0,Math.min(ax[1]+ax[3],bx[1]+bx[3])-Math.max(ax[1],bx[1]));
      const inter=ix*iy, uni=ax[2]*ax[3]+bx[2]*bx[3]-inter;
      if(inter/Math.max(1,uni) > 0.55){ dup=true; if(r.fit>u.fit) u.fit=r.fit, u.rect=r.rect, u.angle=r.angle, u.light=r.light; break; }
    }
    if(!dup) uniq.push(r);
  }
  return uniq.slice(0,3);
}
/* Yatay kenar enerjisi (Sobel-yatay) — harf sütunlarını vurgular */
function edgeMask(lum, W, H, out){
  const TH=0.055;
  for(let y=1;y<H-1;y++){
    const o=y*W;
    for(let px=1;px<W-1;px++){
      const i=o+px;
      const g=Math.abs(lum[i+1]-lum[i-1]) + Math.abs(lum[i+W+1]-lum[i+W-1]);
      if(g>TH*255) out[i]=1;
    }
  }
}
/* Tek bir maske üzerinde plaka bandını arar; bulunamazsa null */
function regionFromMask(m, TW, TH, src, light){
  const N=TW*TH;
  /* 1) satır bandı — medyan tabanlı uyarlanabilir eşik */
  const rowF=new Float32Array(TH);
  for(let y=0;y<TH;y++){ const o=y*TW; let k=0; for(let px=0;px<TW;px++) if(m[o+px]) k++; rowF[y]=k/TW; }
  const med=medianOf(rowF);
  const thrR=Math.max(0.07, Math.min(0.42, med*2.4+0.03));
  const band=longestRun(rowF, 1, thrR, 4, Math.max(2, Math.round(TH*0.10)));
  if(!band) return null;
  const y0=band[0], y1=band[1], bh=y1-y0;
  if(bh<6 || bh>TH*0.55) return null;
  /* 2) band içinde sütun genişliği.
        Açık zeminli plakada maske dolu, koyu plakada ise ince harf çizgileri
        olduğu için eşik en yüksek sütuna göre uyarlanır. Karakterler arası
        boşlukları atlamak için ilk/son eşikli sütun alınır. */
  const colF=new Float32Array(TW);
  for(let px=0;px<TW;px++){ let k=0; for(let y=y0;y<y1;y++) if(m[y*TW+px]) k++; colF[px]=k/bh; }
  const med2=medianOf(colF);
  let cmax=0; for(let px=0;px<TW;px++) if(colF[px]>cmax) cmax=colF[px];
  const thrC=Math.max(0.12, Math.min(0.80, Math.max(med2*0.70, cmax*0.30)));
  let x0=-1, x1=-1, hits=0;
  for(let px=0;px<TW;px++){ if(colF[px]>=thrC){ if(x0<0) x0=px; x1=px+1; hits++; } }
  if(x0<0 || hits<3) return null;
  const rw=x1-x0;
  /* Türk plakası en-boy oranı 520/110 ≈ 4.7. Perspektif ve eğim nedeniyle
     geniş bir aralık kabul ediyoruz; çok katı sınır gerçek plakayı eliyordu. */
  if(rw/bh<1.9 || rw/bh>18) return null;
  /* 3) sıkı sınır kutusu — hafif eğime dayanıklı */
  const pad=2;
  let bx0=x1, bx1=x0, by0=y1, by1=y0;
  for(let y=Math.max(0,y0-pad); y<Math.min(TH,y1+pad); y++){
    for(let px=Math.max(0,x0-pad); px<Math.min(TW,x1+pad); px++){
      if(m[y*TW+px]){ if(px<bx0)bx0=px; if(px>bx1)bx1=px; if(y<by0)by0=y; if(y>by1)by1=y; }
    }
  }
  let tw=bx1-bx0, th=by1-by0;
  if(tw<8 || th<6) return null;
  /* 3b) YÜKSEKLİK GÜVENLİĞİ — plaka en-boy oranı ≈ 4.7. Satır bandı bazen
     plakanın üst/altını kesiyor ve sağdaki rakamlar kırpılıyordu ("41 RS 778"
     yerine "41 RS 7788" okunmalıydı). Genişlikten beklenen yükseklik hesaplanıp
     bandın ORTASINA uygulanır; böylece plaka hangi yönde kırpılmış olursa
     olsun tamamı kapsanır. Aşırı uzun (birleşmiş) bantlar da kırpılır. */
  const expH=tw/4.72;
  if(expH>th*1.02 || th>expH*1.9){
    const cy=(by0+by1)/2, nh=Math.max(expH, Math.min(th, expH*1.35));
    by0=Math.max(0, Math.round(cy-nh/2));
    by1=Math.min(TH-1, Math.round(cy+nh/2));
    th=by1-by0;
  }
  /* 4) eğim tahmini — plakanın üst/alt kenarına en küçük kareler çizgisi */
  const angle=estimateSkew(m, TW, bx0, bx1, by0, by1);
  const kx=src.width/TW, ky=src.height/TH;
  let rx=bx0*kx, ry=by0*ky, rrw=tw*kx, rrh=th*ky;
  const padX=rrw*0.09, padY=Math.max(rrh*0.26, rrw/4.72*0.30);
  rx=Math.max(0, rx-padX); ry=Math.max(0, ry-padY);
  rrw=Math.min(src.width-rx, rrw+padX*2); rrh=Math.min(src.height-ry, rrh+padY*2);
  if(rrw<40 || rrh<12) return null;
  /* 5) "plaka benzerliği" puanı — iki adaydan iyisini seçmek için.
        Türk plakasının en-boy oranı ≈ 520/110 ≈ 4.7 */
  const ar=tw/th;
  const arPen = 1 - Math.min(1, Math.abs(Math.log(ar/4.72)));
  const areaFrac=(tw*th)/N;
  /* Sıralama ölçekten bağımsız olmalı: plaka kareye göre küçük bir nesnedir.
     Eski puan (alanOranı × enBoy) büyük, birleşmiş bölgeleri ödüllendiriyor
     ve gerçek plaka ikinci sıraya düşüyordu. Artık en-boy uyumu baskın. */
  const sizeSc = areaFrac<0.008 ? areaFrac/0.008
               : (areaFrac>0.34 ? Math.max(0.2, 1-(areaFrac-0.34)/0.66) : 1);
  const fit = (0.10 + 0.90*arPen*arPen) * sizeSc;
  return { rect:[Math.round(rx),Math.round(ry),Math.round(rrw),Math.round(rrh)], light:light,
    tight:[bx0,by0,tw,th], box:[Math.round(bx0*kx),Math.round(by0*ky),Math.round(tw*kx),Math.round(th*ky)],
    angle:angle, fit:fit };
}
/* Plaka maskesinin üst ve alt kenarına en küçük kareler çizgisi uydurur;
   eğimi dereceye çevirir. Maksimum ±18°. */
function estimateSkew(m, W, x0, x1, y0, y1){
  const fit=useTop=>{
    let n=0, sx=0, sy=0, sxx=0, sxy=0;
    for(let px=x0; px<=x1; px++){
      let top=-1, bot=-1, hit=0;
      for(let y=y0; y<=y1; y++) if(m[y*W+px]){ if(top<0) top=y; bot=y; hit++; }
      if(hit<3) continue;                       // bu sütun plaka dışında
      const v=useTop? top : bot;
      n++; sx+=px; sy+=v; sxx+=px*px; sxy+=px*v;
    }
    if(n<8) return null;
    const den=n*sxx-sx*sx;
    if(Math.abs(den)<1e-6) return null;
    return (n*sxy-sx*sy)/den;
  };
  const a=fit(true), b=fit(false);
  let sl = (a!=null && b!=null) ? (a+b)/2 : (a!=null? a : b);
  if(sl==null || !isFinite(sl)) return 0;
  let deg=Math.atan(sl)*180/Math.PI;
  if(deg>18) deg=18; if(deg<-18) deg=-18;
  return Math.round(deg*100)/100;
}
/* --- Görüntü kalitesi: karanlık / bulanık mı --- */
function imageQuality(src){
  const w=160, h=Math.max(40, Math.round(src.height*w/src.width));
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const x=c.getContext('2d',{ willReadFrequently:true });
  try{ x.drawImage(src,0,0,w,h); }catch(e){ return null; }
  let d; try{ d=x.getImageData(0,0,w,h).data; }catch(e){ return null; }
  let sum=0, n=0, sx=0, sy=0, sxx=0, syy=0, sxy=0;
  for(let i=0,p=0;i<d.length;i+=4,p++){
    const v=d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114; sum+=v; n++;
    const px=p%w, py=(p/w)|0; sx+=px; sy+=py; sxx+=px*px; syy+=py*py; sxy+=px*py;
  }
  const mx=sx/n, my=sy/n;
  const varx=(sxx/n-mx*mx), vary=(syy/n-my*my), cov=(sxy/n-mx*my);
  const sharp=Math.sqrt(Math.max(0,(varx*vary)-cov*cov));
  return { mean:sum/n, sharp:sharp };
}

/* --- Ön işleme: kırp + ölçek + gri + kontrast germe (+ isteğe bağlı Otsu) --- */
function prep(src, rect, mode, scale, angle){
  const r = rect || [0,0,src.width,src.height];
  const sw=Math.max(1,Math.min(src.width, r[2])), sh=Math.max(1,Math.min(src.height, r[3]));
  const sx=Math.max(0,Math.min(src.width-1,r[0])), sy=Math.max(0,Math.min(src.height-1,r[1]));
  let f=scale||1;
  /* karakterleri yeterince büyük tut: hedef yükseklik ~ 110px, üst sınır 1600px */
  const want=Math.max(f, 110/(sh||1));
  /* Geniş kırpmalarda (tam kare 1280x860, "cerceve" bandı 1280x360) Tesseract
     çok yavaşlıyor ve doğruluk artmıyor — tek deneme 10+ saniye sürebiliyordu.
     Genişlik 1000px, toplam piksel 420k ile sınırlanır. Küçük plaka
     kırpmaları bu sınırlardan hiç etkilenmez. */
  let ratio=Math.min(want, 1600/(Math.max(sw,sh)||1), 1000/(sw||1));
  const capPx=420000;
  if(sw*sh*ratio*ratio>capPx) ratio=Math.sqrt(capPx/(sw*sh));
  if(ratio<0.5) ratio=0.5; if(ratio>6) ratio=6;
  const rad=((angle||0)*Math.PI)/180;
  /* döndürme yapılacaksa döndürülmüş çerçeveye sığacak kadar boşluk bırak */
  const cw=Math.round(sw*ratio), ch=Math.round(sh*ratio);
  const rot=Math.abs(angle||0)>0.05;
  const ow=rot ? Math.round(Math.abs(cw*Math.cos(rad))+Math.abs(ch*Math.sin(rad))) : cw;
  const oh=rot ? Math.round(Math.abs(cw*Math.sin(rad))+Math.abs(ch*Math.cos(rad))) : ch;
  const c=document.createElement('canvas');
  c.width=Math.max(8,ow); c.height=Math.max(8,oh);
  const x=c.getContext('2d',{ willReadFrequently:true });
  x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high';
  if(rot){
    x.save();
    x.translate(c.width/2, c.height/2);
    x.rotate(-rad);
    x.drawImage(src, sx, sy, sw, sh, -cw/2, -ch/2, cw, ch);
    x.restore();
  } else {
    x.drawImage(src, sx, sy, sw, sh, 0, 0, c.width, c.height);
  }
  if(mode==='raw') return c;
  const im=x.getImageData(0,0,c.width,c.height), d=im.data, px=c.width*c.height;
  const hist=new Array(256).fill(0);
  for(let i=0;i<d.length;i+=4){ const g=(d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114)|0; d[i]=d[i+1]=d[i+2]=g; hist[g]++; }
  if(mode==='gray'){ x.putImageData(im,0,0); return c; }
  /* yüzdelik kontrast germe — karanlık/baskılı fotoğraflarda hayat kurtarır */
  const pct=t=>{ let acc=0; for(let i=0;i<256;i++){ acc+=hist[i]; if(acc>=t) return i; } return 255; };
  const lo=pct(Math.max(1,px*0.02)), hi=pct(Math.min(px-1,px*0.98));
  if(hi-lo<12){ const m=lo; lo=Math.max(0,m-8); hi=Math.min(255,m+8); }
  const span=Math.max(1,hi-lo);
  for(let i=0;i<d.length;i+=4){ let v=(d[i]-lo)*255/span; v=v<0?0:(v>255?255:v); d[i]=d[i+1]=d[i+2]=v; }
  if(mode==='sharp'){
    /* Unsharp mask — elde sallanan fotoğrafta kenarları geri kazandırır.
       Tesseract ince, bulanık harflerde çok zorlanır; bu geçiş belirgin
       fark yaratır. 3x3 Gauss çekirdeği ile 1.1 kazanç. */
    const src2=new Uint8ClampedArray(d);
    const W2=c.width, H2=c.height;
    const K=[1,2,1,2,4,2,1,2,1];
    for(let y=1;y<H2-1;y++){
      const o=y*W2;
      for(let px=1;px<W2-1;px++){
        const i=(o+px)*4;
        let s=0,k=0;
        for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++,k++) s+=src2[i+dy*W2*4+dx*4]*K[k];
        const blur=s/16;
        let v=src2[i]+1.1*(src2[i]-blur);
        v=v<0?0:(v>255?255:v);
        d[i]=d[i+1]=d[i+2]=v;
      }
    }
    x.putImageData(im,0,0);
    return c;
  }
  if(mode==='otsu'){
    const h2=new Array(256).fill(0);
    for(let i=0;i<d.length;i+=4) h2[d[i]]++;
    const total=px; let sum2=0,i; for(i=0;i<256;i++) sum2+=i*h2[i];
    let sb=0,wb=0,best=-1,th=140;
    for(i=0;i<256;i++){ wb+=h2[i]; if(!wb) continue; const wf=total-wb; if(!wf) break; sb+=i*h2[i];
      const mb=sb/wb, mf=(sum2-sb)/wf, bt=wb*wf*(mb-mf)*(mb-mf); if(bt>best){ best=bt; th=i; } }
    let dark=0;
    for(i=0;i<d.length;i+=4){ const v=d[i]>th?255:0; d[i]=d[i+1]=d[i+2]=v; if(v===0) dark++; }
    /* Tesseract koyu yazı / açık zemin bekler — değilse ters çevir */
    if(dark/px>0.62){ for(i=0;i<d.length;i+=4){ d[i]=d[i+1]=d[i+2]=255-d[i]; } }
  }
  x.putImageData(im,0,0);
  return c;
}
function preprocess(src, crop, otsu, scale){   /* geriye uyumlu imza */
  const r = crop ? { x:crop.x*src.width, y:crop.y*src.height, w:crop.w*src.width, h:crop.h*src.height } : null;
  return prep(src, r?[r.x,r.y,r.w,r.h]:null, otsu?'otsu':'stretch', scale);
}

/* --- Kamera denetleyicisi --- */
const Cam = {
  stream:null, facing:'environment', busy:false, engine:null, engineTried:false,
  ctx:null, ctxMode:'scan', result:null, autoT:null,

  status(t, kind){ const e=$('#camSub'); if(e) e.textContent=t||''; if(kind!==undefined) $('#camStatus').classList.toggle('bad',!!kind); },
  say(t){ const e=$('#camStatus'); if(e) e.textContent=t||''; },
  prog(p){ const b=$('#camProg'); if(!b) return; b.style.display='block'; b.firstElementChild.style.width=Math.max(0,Math.min(100,p))+'%'; },
  progOff(){ const b=$('#camProg'); if(b){ b.firstElementChild.style.width='0%'; b.style.display='none'; } },
  scanning(on){ $('#camSheet').classList.toggle('scanning',!!on); $('#camShot').disabled=!!on; },

  async open(ctx){
    let c = ctx || { mode:this.ctxMode };
    /* kurye kaydı bağlamı yoksa tarama moduna düş — mantık hatası olmasın */
    if((c.mode==='fill'||c.mode==='log') && !currentUnit) c.mode='scan';
    this.ctx=c; this.result=null;
    this.reset();
    document.body.classList.add('cam-on');
    $('#camSheet').classList.add('show');
    $('#camTitle').textContent = c.mode==='scan' ? 'Plaka Okut' : 'Plakayı Okut';
    await this.start();
  },
  reset(){
    this.result=null;
    $('#camOut').classList.remove('show');
    $('#camActions').classList.remove('show');
    $('#camPlateBox').style.display='none';
    $('#camPlate').textContent='—';
    $('#camCourier').textContent='—'; $('#camCourier').classList.add('dim');
    this.paintAlts([]);
    this.say(''); this.progOff();
  },
  /* Kamera üstündeki kalıcı uyarı şeridi (dosya modu, kısıt vb.) */
  warn(t){
    const w=$('#camWarn');
    if(!w) return;
    if(!t){ w.style.display='none'; return; }
    $('#camWarnText').innerHTML=t;
    w.style.display='flex';
  },
  async start(){
    this.stopStream();
    clearTimeout(this.autoT); this.autoT=null;
    /* Dosya modunda (file://) tarayıcı kamerayı güvenlik gereği engeller.
       Kullanıcı bunu bilmezse "bozuk" sanır; açıkça söyleniyor. */
    if(location.protocol==='file:'){
      this.warn('Uygulama dosya olarak açık. Tarayıcı güvenlik kuralı gereği <b>kamera burada çalışmaz</b>. '
        +'Çözüm: dosyayı bir <b>https</b> adresine yükleyip oradan açın ya da aşağıdaki '
        +'<b>Yaz</b> düğmesiyle plakayı elle girin.');
    } else this.warn('');
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
      this.ph('<b>Kamera erişimi yok.</b><br>Tarayıcı bu sayfada kamerayı açmıyor. Dosya olarak açılan uygulamalarda bu sınırlıdır — uygulamayı bir <b>https</b> adresinden açın ya da aşağıdaki düğmeleri kullanın.');
      this.status('Kamera kullanılamıyor', true);
      $('#camShot').disabled=true; $('#camSwitch').disabled=true;
      return;
    }
    this.status('Kamera açılıyor…');
    this.ph('Kamera açılıyor…');
    try{
      this.stream=await navigator.mediaDevices.getUserMedia({
        video:{ facingMode:{ ideal:this.facing }, width:{ideal:1920}, height:{ideal:1080} }, audio:false });
      const v=$('#camVideo'); v.srcObject=this.stream; v.style.display='block'; $('#camPh').style.display='none';
      try{ await v.play(); }catch(e){}
      $('#camShot').disabled=false; $('#camSwitch').disabled=false;
      this.status('Plakayı çerçeveye alın → Tara butonuna basın');
      if(P.autoCam) this.autoT=setTimeout(()=>{ if(this.stream) this.shoot(); }, 1500);
    }catch(e){
      const why = (e&&e.name==='NotAllowedError') ? 'Kamera izni verilmedi.'
        : (e&&e.name==='SecurityError') ? 'Tarayıcı güvenlik kuralı nedeniyle kamera engellendi.'
        : (e&&e.name==='NotFoundError') ? 'Kamerayla bağlantı kurulamadı — başka bir uygulama kullanıyor olabilir.'
        : (e&&e.name==='NotReadableError') ? 'Kamera başka bir uygulama tarafından kullanılıyor.'
        : 'Kamera açılamadı: '+(e&&e.name?e.name:'bilinmeyen hata');
      this.ph('<b>'+why+'</b><br>Yine de galeriden plaka fotoğrafı seçebilir ya da plakayı elle yazabilirsiniz.');
      this.status(why, true);
      $('#camShot').disabled=true;
    }
  },
  ph(html){ const p=$('#camPh'); p.innerHTML=html; p.style.display='block'; $('#camVideo').style.display='none'; },
  stopStream(){
    clearTimeout(this.autoT); this.autoT=null;
    if(this.stream){ this.stream.getTracks().forEach(t=>t.stop()); this.stream=null; }
    const v=$('#camVideo'); if(v) v.srcObject=null;
  },
  close(){
    this.stopStream();
    $('#camSheet').classList.remove('show');
    document.body.classList.remove('cam-on');
    this.scanning(false); this.ctx=null; this.reset(); this.warn('');
  },

  /* ---- çek ---- */
  async shoot(){
    if(this.busy) return;
    const v=$('#camVideo');
    if(!v || !v.videoWidth){ toast('Kamera görüntüsü yok','err'); return; }
    const raw=document.createElement('canvas'); raw.width=v.videoWidth; raw.height=v.videoHeight;
    raw.getContext('2d').drawImage(v,0,0,raw.width,raw.height);
    sfx.shutter(); buzz(20);
    this.flash();
    await this.read(raw);
  },
  flash(){
    const f=$('#camView');
    const d=document.createElement('div');
    d.style.cssText='position:absolute;inset:0;background:#fff;z-index:9;pointer-events:none;opacity:.85;transition:opacity .28s';
    f.appendChild(d);
    setTimeout(()=>{ d.style.opacity='0'; setTimeout(()=>d.remove(),320); },40);
  },

  /* ---- okuma --- */
  async read(raw){
    this.busy=true; this.scanning(true);
    this.status('Plaka aranıyor…');
    this.prog(4);
    const texts=[]; let cands=[]; let regions=[];
    try{
      const q=imageQuality(raw);
      this.quality=q;
      if(q && q.mean<52) this.status('Görüntü karanlık — plakayı aydınlatın');
      else if(q && q.sharp<11) this.status('Görüntü bulanık — telefonu sabit tutun');
      regions=findPlateRegions(raw);
      const rects=[];
      /* Deneme listesi düz ve sıralıdır: önce HIZLI ve genelde doğru olan
         bölge kırpmaları, sonra güvenli ama pahalı olan tam kare.
         Nöbetçiyi bekletmemek için erken çıkış koşulu her denemede kontrol
         edilir (aşağıda): iki bağımsız deneme aynı plakayı verirse daha
         pahalı denemelere hiç geçilmez. */
      const AT=[ {mode:'otsu',psm:'7'},    {mode:'stretch',psm:'6'} ];
      const AS=[ {mode:'sharp',psm:'7'} ];
      const AO=[ {mode:'otsu',psm:'13'} ];
      if(regions.length){
        /* Kırpma kaynağı: bölgenin dolgulu kutusu (rg.rect) kullanılır, ama
           en-boy oranından hesaplanan YÜKSEKLİK uygulanmış hali alınır; bölge
           bulucu bandı kestiğinde plaka dikeyde eksik kalıyordu. */
        const bx=[];
        regions.forEach((rg)=>{
          const b=rg.rect.slice();
          const wantH=b[2]/4.72, cy=b[1]+b[3]/2;
          if(wantH>b[3]*0.9){
            const nh=Math.min(wantH*1.5, raw.height);
            b[1]=Math.max(0, Math.round(cy-nh/2));
            b[3]=Math.min(raw.height-b[1], Math.round(nh));
          }
          const qx=b[2]*0.05;
          b[0]=Math.max(0, Math.round(b[0]-qx));
          b[2]=Math.min(raw.width-b[0], Math.round(b[2]+qx*2));
          /* Türk plakasının solundaki mavi "TR" şeridini at — okuma bozulmasının
             en sık nedeni budur. DİKKAT: sağ kenar KORUNMALIDIR. Şerit solda
             olduğu için genişlikten yalnızca şeridin kendisi düşülür; fazlası
             düşülürse plakanın son hanesi kırpılır ve okuma "06 TY 445" gibi
             eksik çıkıyordu. Sağ kenarda bir pay bırakılır. */
          const tw=b[2]*0.10;
          bx.push({ tam:[Math.round(b[0]+tw), b[1], Math.round(b[2]-tw*0.94), b[3]],
            tam2:b, ang:rg.angle||0 });
        });
        rects.push({ r:bx[0].tam,  a:bx[0].ang, tag:'plaka',     att:AT });
        /* Bölge dedektörü pencere/tabela/başka aracı gösterebilir; bu durumda
           tüm bölge denemeleri boşa gider. Tam kare TEK denemede bütün kareyi
           okur ve yanlış bölge seçimini kurtarır. */
        rects.push({ r:[0,0,raw.width,raw.height], a:0, tag:'tam-kare', att:AS });
        rects.push({ r:bx[0].tam2, a:bx[0].ang, tag:'tam-bolge',  att:AT });
        rects.push({ r:bx[0].tam,  a:bx[0].ang, tag:'plaka-keskin', att:AS });
        rects.push({ r:bx[0].tam,  a:bx[0].ang, tag:'plaka-harf', att:AO });
        for(let i=1;i<bx.length;i++){
          rects.push({ r:bx[i].tam,  a:bx[i].ang, tag:'plaka'+(i+1),      att:AT });
          rects.push({ r:bx[i].tam2, a:bx[i].ang, tag:'tam-bolge'+(i+1), att:AS });
        }
        rects.push({ r:band(raw,0.30,0.20), a:0, tag:'cerceve', att:AT });
      }
      else {
        rects.push({ r:band(raw,0.30,0.40), a:0, tag:'cerceve', att:AT.concat(AS) });
        rects.push({ r:band(raw,0.22,0.56), a:0, tag:'genis',    att:AT });
        rects.push({ r:[0,0,raw.width,raw.height], a:0, tag:'tam-kare', att:AS });
        rects.push({ r:band(raw,0.10,0.80), a:0, tag:'genis2',   att:AO });
      }
      const w=await this.worker(p=>this.prog(10+p*72));
      let done=0, lastErr=null;
      let total=0; rects.forEach(it=>{ total+=it.att.length; });
      /* Zaman bütçesi: nöbetçiyi bekletmemek için en fazla ~9 saniye tanıma.
         Kayıtlı kurye eşleşirse zaten daha çabuk durur. */
      const deadline=Date.now()+9000;
      const votes={};                    /* plaka -> kaç bağımsız denemede çıktı */
      const outOfTime=()=> Date.now()>deadline && cands.length>0;
      /* Tesseract'ın DPI tahmini kırpılmış plakada genelde yanlış çıkar ve
         karakter yüksekliğini yanlış ölçeklendirir. 300 dpi sabitlemek
         kırpılmış plaka okumasında en büyük tek doğruluk artışıdır. */
      const BASE_PARAMS={ tessedit_char_whitelist:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        preserve_interword_spaces:'1', user_defined_dpi:'300' };
      for(const item of rects){
        if(outOfTime()) break;
        for(const at of item.att){
          let img;
          try{ img=prep(raw, item.r, at.mode, 1, item.a||0); }
          catch(e){ lastErr='görüntü hazırlanamadı: '+(e&&e.message||e); continue; }
          let txt='', conf=0;
          try{
            const p=Object.assign({}, BASE_PARAMS); p.tessedit_pageseg_mode=at.psm;
            await w.setParameters(p);
            const r=await w.recognize(img);
            txt=(r&&r.data&&r.data.text)||''; conf=(r&&r.data&&r.data.confidence)||0;
          }catch(e){ lastErr=(e&&e.message)||String(e); }
          if(txt && txt.trim()) texts.push(txt.trim());
          cands=cands.concat(plateCandidates(txt, conf).map(o=>({ plate:o.plate, score:o.score,
            src:item.tag, psm:at.psm, courier:o.courier })));
          this.prog(10+(++done/total)*80);
          const b=bestCandidate(cands);
          if(b) votes[b.plate]=(votes[b.plate]||0)+1;
          if(b && b.__s>=36) break;             // kayıtlı kurye eşleşti: yeter
          /* İki ayrı ön işleme aynı plakayı verdiyse okuma büyük olasılıkla doğru;
             yeni kuryenin ilk karşılaşmasında beklemektense hemen bitir. */
          if(b && b.__s>=12 && votes[b.plate]>=2) break;
          if(outOfTime()) break;
        }
        const best=bestCandidate(cands);
        if(best && best.__s>=36) break;
        if(best && best.__s>=12 && votes[best.plate]>=2) break;
      }
      /* Süre bitti ama hiç aday yoksa son bir çaba: hiç kısıtlama olmadan
         tüm kareyi dene. Bazen plaka dedektörü tamamen kaçırır. */
      if(!cands.length && !outOfTime()){
        for(const at of [{mode:'otsu',psm:'6'},{mode:'stretch',psm:'6'}]){
          try{
            const img=prep(raw, [0,0,raw.width,raw.height], at.mode, 1, 0);
            const p=Object.assign({}, BASE_PARAMS); p.tessedit_pageseg_mode=at.psm;
            await w.setParameters(p);
            const r=await w.recognize(img);
            const t2=(r&&r.data&&r.data.text)||'';
            if(t2 && t2.trim()) texts.push(t2.trim());
            cands=cands.concat(plateCandidates(t2, (r&&r.data&&r.data.confidence)||0)
              .map(o=>({ plate:o.plate, score:o.score, src:'son', psm:at.psm, courier:o.courier })));
          }catch(e){}
          if(cands.length) break;
        }
      }
      this.rawText=texts.join(' ');
      if(!cands.length && this.rawText) cands=plateCandidates(this.rawText, 60);
      this.lastErr=lastErr;
      this.prog(100);
    }catch(e){
      this.progOff(); this.busy=false; this.scanning(false);
      this.show();
      this.say('Okuma yapılamadı: '+(e&&e.message?e.message:e));
      this.status('Tanıma motoru hazır değil', true);
      return;
    }
    setTimeout(()=>{ this.progOff(); }, 500);
    this.busy=false; this.scanning(false);
    this.deliver(cands, texts, regions);
  },

  /* ---- sonucu göster ve kullanıcıya doğrulat --- */
  deliver(cands, texts, regions){
    const best=bestCandidate(cands);
    const courier = best ? (best.courier||matchPlate(best.plate)||null) : null;
    /* Son bir tutarlılık kontrolü: kurye eşleştiyse gösterilen plaka onunki olsun */
    if(best && courier && courier.plate) best.plate=courier.plate;
    /* Diğer olası okumalar: nöbetçi yanlışı gördüğünde dokunup seçebilsin.
       Bu, OCR'ı "ya hep ya hiç" olmaktan çıkarıp güvenli bir seçim aracına
       dönüştürür. */
    const alts=[];
    if(best){
      const seen={}; seen[best.plate]=1;
      /* Sıralamada da "kaç denemede tekrarlandı" bilgisi kullanılır. */
      const cnt={};
      cands.forEach(c=>{ if(c&&c.plate) cnt[c.plate]=(cnt[c.plate]||0)+1; });
      const ord=cands.slice().sort(function(a,b){
        return (b.score+Math.min(6,(cnt[b.plate]||1)-1)*2)-(a.score+Math.min(6,(cnt[a.plate]||1)-1)*2);
      });
      ord.forEach(function(c){
        if(seen[c.plate] || alts.length>=3) return;
        seen[c.plate]=1;
        const cpl=matchPlate(c.plate);
        alts.push({ plate:cpl?cpl.plate:c.plate,
          score:Math.round((c.score+Math.min(6,(cnt[c.plate]||1)-1)*2)*10)/10,
          name:cpl?cpl.name:'' });
      });
    }
    const bs = best ? (best.__s!=null?best.__s:best.score) : 0;
    this.result={ plate:best?best.plate:'', courier:courier, guess:best||null,
      region:(regions&&regions[0])||null, alts:alts };
    this.show();
    if(best){
      sfx.scan(); buzz(24);
      $('#camPlateBox').style.display='flex';
      $('#camPlate').textContent=best.plate;
      const n=$('#camCourier'); n.textContent=courier?(courier.name+(courier.company?' · '+courier.company:'')):'Listede yok';
      n.classList.toggle('dim',!courier);
      if(courier) this.status('Listede bulundu');
      else if(bs>=18) this.status('Okundu — kurye listesinde yok');
      else this.status('Zayıf okuma — kontrol edin', true);
      this.say(courier? ('Plaka <b>'+best.plate+'</b> · '+courier.name)
        : ('Plaka <b>'+best.plate+'</b> okundu. '+(bs>=18?'Bu plaka listede yok, kullanırsanız kurye adıyla eşleştirilir.':'Okuma zayıf, elle düzeltmeniz önerilir.')));
      speak(best.plate+(courier?': '+courier.name:''));
      this.paintAlts(alts);
    }else{
      $('#camPlateBox').style.display='none';
      const n=$('#camCourier'); n.textContent='—'; n.classList.add('dim');
      const seen=(texts||[]).filter(Boolean).join(' · ');
      this.say('Plaka okunamadı. '+(seen? 'Okunan kısım: <b>'+esc(seen).slice(0,60)+'</b>. ':'')
        +'Daha yakından, düz açıyla ve gün ışığında tekrar deneyin ya da galeriden fotoğraf seçin.'
        +(this.lastErr? ' <span style="opacity:.6">('+esc(this.lastErr)+')</span>':''));
      this.status('Okunamadı', true);
      this.paintAlts([]);
    }
  },
  /* Diğer olasılıkları küçük dokunulabilir düğmeler olarak göster */
  paintAlts(alts){
    const box=$('#camAlts');
    if(!box) return;
    if(!alts || !alts.length){ box.innerHTML=''; box.style.display='none'; return; }
    box.style.display='flex';
    box.innerHTML='<span class="cam-alts-lb">Diğer okumalar</span>';
    alts.forEach(a=>{
      const b=document.createElement('button');
      b.type='button'; b.className='cam-alt';
      b.innerHTML='<span class="cam-alt-p">'+esc(a.plate)+'</span>'
        +(a.name? '<span class="cam-alt-n">'+esc(a.name)+'</span>' : '');
      b.onclick=()=>{
        if(!this.result) return;
        const cpl=matchPlate(a.plate);
        this.result.plate = cpl ? cpl.plate : a.plate;
        this.result.courier = cpl || null;
        this.result.guess = { plate:this.result.plate, score:a.score };
        this.paintAlts([]); this.show();
        $('#camPlate').textContent=this.result.plate;
        const n=$('#camCourier');
        n.textContent = cpl ? (cpl.name+(cpl.company?' · '+cpl.company:'')) : 'Listede yok';
        n.classList.toggle('dim',!cpl);
        this.status(cpl?'Listede bulundu':'Seçtiğiniz okuma');
        this.say('Seçildi: <b>'+this.result.plate+'</b>'+(cpl?' · '+esc(cpl.name):''));
        sfx.tap(); buzz(10);
      };
      box.appendChild(b);
    });
  },
  show(){ $('#camOut').classList.add('show'); $('#camActions').classList.add('show'); },

  /* ---- tanıma motoru (bir kez kurulur, sonra yeniden kullanılır) ---- */
  async worker(onP){
    if(this.engine) return this.engine;
    if(!window.Tesseract){
      await new Promise((res,rej)=>{
        const s=document.createElement('script');
        s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
        s.onload=res; s.onerror=()=>rej(new Error('tanıma kütüphanesi indirilemedi'));
        document.head.appendChild(s);
        setTimeout(()=>{ if(!window.Tesseract) rej(new Error('zaman aşımı')); }, 60000);
      });
    }
    this.status('Tanıma motoru hazırlanıyor…');
    this.prog(10);
    const w = await Tesseract.createWorker('eng', 1, {
      logger:m=>{ if(m.status==='recognizing text' && onP) onP(m.progress||0); } });
    try{ await w.setParameters({
      tessedit_char_whitelist:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', tessedit_pageseg_mode:'7' }); }catch(e){}
    this.engine=w; this.engineTried=true;
    return w;
  },
  releaseEngine(){
    const w=this.engine; this.engine=null;
    if(w){ try{ w.terminate(); }catch(e){} }
  }
};
function band(src, y0, h){ return [0, Math.round(src.height*y0), src.width, Math.max(8,Math.round(src.height*h))]; }
function bestCandidate(list){
  if(!list || !list.length) return null;
  /* Aynı plaka birden çok BAGIMSIZ denemede çıktıysa okuma büyük olasılıkla
     doğrudur: tek deneme yanılabilir, birkaç bağımsız deneme zor yanılır. */
  const n={};
  list.forEach(o=>{ if(o&&o.plate) n[o.plate]=(n[o.plate]||0)+1; });
  let b=null, bs=0;
  list.forEach(o=>{
    if(!o || !o.plate) return;
    const s=o.score + Math.min(6, (n[o.plate]-1)*2);
    if(s>bs){ bs=s; b=o; b.__s=Math.round(s*10)/10; }
  });
  return b;
}

/* ---- düğmeler ---- */
$('#camShot').onclick=()=>{ clearTimeout(Cam.autoT); Cam.shoot(); };
$('#camClose').onclick=()=>Cam.close();
$('#camSwitch').onclick=()=>{ Cam.facing = Cam.facing==='environment'?'user':'environment'; Cam.start(); };
$('#camType').onclick=()=>{ const m=(Cam.ctx&&Cam.ctx.mode)||Cam.ctxMode; Cam.close(); plateTypeDialog(m); };
$('#camAgain').onclick=()=>{ Cam.reset(); Cam.status('Plakayı çerçeveye alın'); };
$('#camGallery').onclick=()=>{ $('#camFile').click(); };
$('#camFile').addEventListener('change', e=>{
  const f=e.target.files && e.target.files[0]; if(!f) return;
  const img=new Image(), url=URL.createObjectURL(f);
  img.onload=async ()=>{
    const c=document.createElement('canvas');
    c.width=img.naturalWidth||1200; c.height=img.naturalHeight||900;
    c.getContext('2d').drawImage(img,0,0,c.width,c.height);
    URL.revokeObjectURL(url);
    Cam.stopStream(); Cam.reset(); Cam.show();
    Cam.status('Fotoğraf okunuyor…');
    await Cam.read(c);
  };
  img.onerror=()=>{ URL.revokeObjectURL(url); toast('Fotoğraf açılamadı','err'); };
  img.src=url; e.target.value='';
});
$('#camUse').onclick=async ()=>{
  const r=Cam.result||{};
  const mode=(Cam.ctx&&Cam.ctx.mode)||Cam.ctxMode||'scan';
  Cam.close();
  if(mode==='fill'||mode==='log'){
    if(!currentUnit){ toast('Önce bir daire seçin','err'); setTab('search'); return; }
    if(r.plate) $('#courierPlateInput').value=r.plate;
    if(r.courier){ $('#courierNameInput').value=r.courier.name; $('#courierCompanyInput').value=r.courier.company||''; }
    plateLookup(); paintCourierFirm();
    /* kayıtlı kurye eşleştiyse okuma güvenilirdir; yoksa zayıf okuma uyarısı ver */
    const weak = !!r.plate && !r.courier && (!r.guess || r.guess.score < 20);
    openCourierModal({ plate:r.plate||'', courier:r.courier?r.courier.name:'', weak:weak });
    return;
  }
  if(!r.plate){ plateTypeDialog('scan'); return; }
  if(r.courier){ toast(r.plate+' → '+r.courier.name,'ok'); speak(r.courier.name); }
  else bindPlateDialog(r.plate);
};
$('#openCamBtn').onclick=()=>{ sfx.tap(); Cam.ctxMode='scan'; Cam.open({ mode:'scan' }); };
$('#camQuickBtn').onclick=()=>{ sfx.tap(); Cam.ctxMode='scan'; Cam.open({ mode:'scan' }); };
$('#plateTypeBtn').onclick=()=>{ sfx.tap(); Cam.ctxMode='scan'; plateTypeDialog('scan'); };

function bindPlateDialog(plate){
  const known=matchPlate(plate)||{};
  openForm({ title:'Plakayı kuryeye bağla', text:plate+' numaralı plaka hangi kuryeye ait?',
    fields:[{ id:'name', label:'Kurye adı', value:known.name||'' },
            { id:'company', label:'Firma', type:'company', value:known.company||'' }],
    onOk:async v=>{
      if(!v.name){ toast('Kurye adı girin','err'); return false; }
      await learnPlate(plate, v.name, v.company); toast('Listeye eklendi: '+v.name,'ok'); sfx.ok(); renderStats(); return true; } });
}
function plateTypeDialog(mode){
  mode=mode||Cam.ctxMode||'scan';
  openForm({ title:'Plakayı yazın', text:'Plakayı elle girin — listede varsa kurye adı otomatik gelir.',
    fields:[{ id:'plate', label:'Plaka', value:(Cam.result&&Cam.result.plate)||'', placeholder:'34 ABC 123' }],
    onOk:async v=>{
      const p=fmtPlate(v.plate); if(!p){ toast('Plaka girin','err'); return false; }
      const c=matchPlate(p);
      if(mode==='fill'||mode==='log'){
        if(!currentUnit){ toast('Önce bir daire seçin','err'); return false; }
        $('#courierPlateInput').value=p;
        if(c){ $('#courierNameInput').value=c.name; $('#courierCompanyInput').value=c.company||''; }
        plateLookup(); paintCourierFirm();
        openCourierModal({ plate:p, courier:c?c.name:'' });
        toast(p+' → '+(c?c.name:'yeni plaka'),'ok');
      }
      else if(c){ toast(p+' → '+c.name,'ok'); speak(c.name); }
      else bindPlateDialog(p);
      return true; } });
}
/* ---------------------------------------------------------------- 11. kurye listesi */
function renderCouriers(){
  const box=$('#courierList'); if(!box) return;
  const q=keyOf($('#courierSearch')?$('#courierSearch').value:'');
  const list=COURIERS.filter(c=>!q||keyOf(c.name).indexOf(q)>=0||keyOf(c.plate).indexOf(q)>=0||keyOf(c.company).indexOf(q)>=0);
  $('#courierStat').textContent=list.length+' kayıt';
  const cv=$('#courierVal'); if(cv) cv.textContent=String(COURIERS.length);
  if(!list.length){ box.innerHTML='<div class="empty" style="padding:30px 16px">Liste boş.<br><span class="mini-note">Plaka okutulunca ya da elle plaka girilince buraya otomatik eklenir.</span></div>'; return; }
  box.innerHTML='';
  list.forEach(c=>{
    const r=document.createElement('div'); r.className='plate-row';
    r.innerHTML='<span class="plate-sm">'+esc(c.plate)+'</span><div class="who"><div class="n">'+esc(c.name||'İsimsiz')+'</div>'
      +'<div class="c">'+((c.seen||0))+' giriş</div>'+(c.company?'<div class="f">'+esc(c.company)+'</div>':'')+'</div>'
      +'<div class="icon-mini" data-a="use" title="Bu plaka ile kayıt"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div>'
      +'<div class="icon-mini" data-a="edit" title="Düzenle"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></div>'
      +'<div class="icon-mini" data-a="del" title="Sil"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></div>';
    r.onclick=async e=>{
      const a=e.target.closest('[data-a]'); if(!a) return;
      if(a.dataset.a==='use'){ Cam.ctxMode='fill'; openCourierModal({ plate:c.plate, courier:c.name }); }
      else if(a.dataset.a==='edit'){ editCourier(c); }
      else { const ok=await ask('Kurye silinsin mi?', c.plate+' — '+(c.name||'adsız')+' listeden kaldırılacak. Geçmiş kayıtlar silinmez.'); if(ok){ c.deleted=true; c.updatedAt=Date.now(); await dbPut(S_C,c); await refresh(); toast('Silindi','ok'); } }
    };
    box.appendChild(r);
  });
}
function editCourier(c){
  openForm({ title:'Kuryeyi düzenle', text:'Plaka, ad ve firma bilgisini güncelleyin.',
    fields:[{ id:'plate', label:'Plaka', value:c.plate },{ id:'name', label:'Kurye adı', value:c.name },
            { id:'company', label:'Firma', type:'company', value:c.company||'' }],
    onOk:async v=>{ if(!v.plate||!v.name){ toast('Plaka ve ad zorunlu','err'); return false; }
      c.plate=fmtPlate(v.plate); c.key=plateKey(c.plate); c.name=v.name; c.company=(v.company||'').trim(); c.updatedAt=Date.now(); c.dev=DEVICE;
      /* kayıtlı girişlerdeki firma boşsa güncelle */
      const list=await dbAll(S_V);
      for(const r of list){ if(r.plate && plateKey(r.plate)===c.key && !r.company && c.company){
        r.company=c.company; r.updatedAt=Date.now(); await dbPut(S_V,r); } }
      await dbPut(S_C,c); await refresh(); toast('Güncellendi','ok'); return true; } });
}
$('#courierAddBtn').onclick=()=>{ sfx.tap();
  openForm({ title:'Yeni kurye', text:'Plakayı ve kurye adını girin. Bundan sonra plaka okutulduğunda adı otomatik gelir.',
    fields:[{ id:'plate', label:'Plaka', value:'', placeholder:'34 ABC 123' },{ id:'name', label:'Kurye adı', value:'' },
            { id:'company', label:'Firma', type:'company', value:'' }],
    onOk:async v=>{ if(!v.plate||!v.name){ toast('Plaka ve ad zorunlu','err'); return false; }
      const p=fmtPlate(v.plate); if(matchPlate(p)){ toast('Bu plaka zaten listede','err'); return false; }
      await learnPlate(p, v.name, v.company); sfx.ok(); toast('Kurye eklendi','ok'); renderStats(); return true; } }); };
$('#rowCourierList').onclick=()=>setTab('plate');
$('#courierSearch').addEventListener('input', renderCouriers);

function renderLastPlates(){
  const box=$('#lastPlates'); if(!box) return;
  const seen=[], out=[];
  VISITS.filter(v=>v.plate).forEach(v=>{ const k=plateKey(v.plate); if(seen.indexOf(k)>=0) return; seen.push(k); out.push(v); });
  $('#plateStat').textContent=out.length+' plaka';
  if(!out.length){ box.innerHTML='<div class="empty" style="padding:26px 16px">Henüz plaka kaydı yok.</div>'; return; }
  box.innerHTML=out.slice(0,8).map(v=>'<div class="plate-row"><span class="plate-sm">'+esc(v.plate)+'</span><div class="who">'
    +'<div class="n">'+esc(v.courier||'—')+'</div><div class="c">'+esc(v.site)+' '+esc(v.unit)+' · '+fmtTR(v.ts,true)+'</div>'
    +((v.company||firmOf(v.plate,v.courier))?'<div class="f">'+esc(v.company||firmOf(v.plate,v.courier))+'</div>':'')+'</div></div>').join('');
  $$('.plate-row',box).forEach((el,i)=>{ el.onclick=()=>{ const v=out[i]; setTab('log'); $('#logSearch').value=v.plate; renderLog(); }; });
}

/* ---------------------------------------------------------------- 12. kayıt listesi */
let logRange='today', currentTabName='search';
function renderStats(){
  $('#statToday').textContent=VISITS.filter(v=>v.ts>=startOfToday()).length;
  $('#statTotal').textContent=VISITS.length;
  $('#statCourier').textContent=new Set(VISITS.map(v=>keyOf(v.courier)).filter(Boolean)).size;
  $('#statPlate').textContent=new Set(VISITS.map(v=>plateKey(v.plate)).filter(Boolean)).size;
}
function rangeStart(){
  if(logRange==='all') return 0;
  if(logRange==='today') return startOfToday();
  return startOfToday()-(parseInt(logRange,10)-1)*86400000;
}
let logBlockSite='';
function filteredLog(){
  const q=keyOf($('#logSearch')?$('#logSearch').value:''); const from=rangeStart();
  const bSite=logBlockSite;
  return VISITS.filter(v=>v.ts>=from
    && (!bSite || SITES.some(s=>s.id===bSite && s.name===v.site))
    && (!q ||
    keyOf(v.site+' '+v.unit+' '+v.courier+' '+(v.company||firmOf(v.plate,v.courier))
      +' '+v.plate+' '+v.guard+' '+(v.note||'')).indexOf(q)>=0));
}
function populateLogFilter(){
  const sel=$('#logBlockFilter'); if(!sel) return;
  const prev=sel.value;
  sel.innerHTML='<option value="">Tüm Bloklar</option>';
  SITES.forEach(s=>{ const o=document.createElement('option'); o.value=s.id; o.textContent=s.name; sel.appendChild(o); });
  if(prev) sel.value=prev;
}
function renderLog(){
  const box=$('#logList'); if(!box) return;
  const list=filteredLog();
  if(!list.length){
    box.innerHTML='<div class="empty"><svg class="em" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5H4v16h16V5h-5"/><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 12h8M8 16h5"/></svg>'
      + (VISITS.length? 'Bu aralıkta kayıt yok.<br><span class="mini-note">Filtreyi "Tümü" yapın.</span>' : 'Henüz kayıt yok.<br>Bir adresi açıp "Girişi Kaydet"e dokunun.')
      + '</div>';
    return;
  }
  let last=''; box.innerHTML='';
  list.slice(0,400).forEach(v=>{
    const k=dayKey(v.ts);
    if(k!==last){ last=k;
      const d=document.createElement('div'); d.className='date-sep';
      d.textContent = k===dayKey(Date.now()) ? 'Bugün' : new Date(v.ts).toLocaleDateString('tr-TR',{day:'2-digit',month:'long',weekday:'long'});
      box.appendChild(d); }
    const el=document.createElement('div'); el.className='log-item';
    el.innerHTML='<div class="l-main"><div class="l-addr">'+esc(v.site)+' · '+esc(v.unit)+'</div>'
      +'<div class="l-meta"><span>'+esc(v.courier||'—')+'</span>'+(v.plate?'<span class="plate-sm">'+esc(v.plate)+'</span>':'')
      +(v.company?'<span class="firm-tag">'+esc(v.company)+'</span>':'')
      +'<span class="pill">'+esc(v.guard||'—')+'</span></div></div>'
      +'<div class="l-right"><div class="l-time">'+fmtTR(v.ts)+'</div>'
      +'<div class="icon-mini" data-a="say" title="Sesli oku"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg></div></div>';
    el.onclick=e=>{
      const a=e.target.closest('[data-a]');
      if(a && a.dataset.a==='say'){ sfx.tap(); speak(v.site+' '+v.unit+', kurye '+(v.courier||'')+(v.plate?', plaka '+v.plate:'')); return; }
      openEntry(v);
    };
    box.appendChild(el);
  });
}
$('#logSearch').addEventListener('input', renderLog);
$$#logBlockFilter.addEventListener('change',()=>{ logBlockSite=#logBlockFilter.value; renderLog(); });
('#logRange > div').forEach(d=>{ d.onclick=()=>{ logRange=d.dataset.r;
  $$('#logRange > div').forEach(x=>x.classList.toggle('on',x===d)); sfx.tap(); renderLog(); }; });
function openEntry(v){
  openForm({ title:v.site+' · '+v.unit, text:'Kayıt: '+fmtTR(v.ts,true)+' · Görevli: '+(v.guard||'—'),
    fields:[{ id:'courier', label:'Kurye adı', value:v.courier||'' },
            { id:'company', label:'Firma', type:'company', value:v.company||firmOf(v.plate, v.courier) },
            { id:'plate', label:'Plaka', value:v.plate||'' },
            { id:'note', label:'Not', value:v.note||'', type:'textarea' }],
    ok:'Kaydet', onOk:async val=>{
      const p=fmtPlate(val.plate);
      v.courier=val.courier; v.company=(val.company||'').trim(); v.plate=p; v.note=val.note; v.updatedAt=Date.now(); v.dev=DEVICE;
      await dbPut(S_V,v);
      if(p && P.autolearn && !COURIERS.some(c=>c.key===plateKey(p)) && val.courier) await learnPlate(p, val.courier, v.company);
      else if(p && v.company){ const c=COURIERS.find(x=>x.key===plateKey(p));
        if(c && !c.company){ c.company=v.company; c.updatedAt=Date.now(); await dbPut(S_C,c); } }
      await refresh(); renderLog(); paintUnitHistory(); toast('Kayıt güncellendi','ok'); return true; },
    extra:'<button class="btn btn-ghost" id="entrySpeak" style="width:100%;margin-top:8px">Sesli oku</button>'
        +'<button class="btn btn-ghost" id="entryMaps" style="width:100%;margin-top:8px">Haritada aç</button>'
        +'<button class="btn btn-ghost" id="entryDel" style="width:100%;margin-top:8px;color:var(--danger)">Bu kaydı sil</button>',
    onMount:()=>{
      $('#entrySpeak').onclick=()=>speak(v.site+' '+v.unit+', kurye '+(v.courier||'—')+(v.plate?', plaka '+v.plate:'')+'.');
      $('#entryMaps').onclick=()=>{ closeForm(); const s=SITES.find(x=>x.name===v.site);
        openMaps(s, v.unit); };
      $('#entryDel').onclick=async ()=>{ closeForm(false);
        const ok=await ask('Kayıt silinsin mi?', v.site+' '+v.unit+' — '+fmtTR(v.ts,true));
        if(!ok) return; v.deleted=true; v.updatedAt=Date.now(); await dbPut(S_V,v); await refresh(); renderLog(); renderStats(); toast('Kayıt silindi','ok'); };
    } });
}

/* ---------------------------------------------------------------- 13. diyaloglar */
let askResolve=null;
function ask(title, text, okLabel){
  $('#askTitle').textContent=title; $('#askText').textContent=text; $('#askYes').textContent=okLabel||'Onayla';
  $('#askModal').classList.add('show');
  return new Promise(res=>{ askResolve=res; });
}
$('#askYes').onclick=()=>{ $('#askModal').classList.remove('show'); if(askResolve){ const r=askResolve; askResolve=null; r(true); } };
$('#askNo').onclick=()=>{ $('#askModal').classList.remove('show'); if(askResolve){ const r=askResolve; askResolve=null; r(false); } };

let formOk=null, formResolve=null, formGen=0;
function openForm(o){
  formGen++;
  $('#formTitle').textContent=o.title||'';
  const ft=$('#formText'); ft.textContent=o.text||''; ft.style.display=(o.text?'block':'none');
  const box=$('#formFields'); box.innerHTML='';
  (o.fields||[]).forEach(f=>{
    const d=document.createElement('div'); d.className='field';
    const l=document.createElement('label'); l.textContent=f.label||''; d.appendChild(l);
    let inp;
    if(f.type==='textarea') inp=document.createElement('textarea');
    else if(f.type==='select'){ inp=document.createElement('select');
      (f.options||[]).forEach(op=>{ const el=document.createElement('option'); el.value=op.v!=null?op.v:op; el.textContent=op.t!=null?op.t:op; inp.appendChild(el); }); }
    else inp=document.createElement('input');
    inp.id='f_'+f.id;
    if(f.type!=='select') inp.value=f.value==null?'':f.value;
    else { const first=(f.options&&f.options[0])?(f.options[0].v!=null?f.options[0].v:f.options[0]):''; inp.value=(f.value!=null?f.value:first); }
    if(f.placeholder) inp.placeholder=f.placeholder;
    inp.autocomplete='off';
    d.appendChild(inp);
    /* firma alanı: yazılabilir + açılır hazır rozetler */
    if(f.type==='company'){
      d.classList.add('co-field','slim');
      const wrap=document.createElement('div'); wrap.className='co-wrap';
      const row=document.createElement('div'); row.className='mrow'; row.style.marginBottom='0';
      inp.style.marginBottom='0'; row.appendChild(inp);
      const tg=document.createElement('button'); tg.type='button'; tg.className='co-toggle';
      tg.innerHTML='<span>Firmalar</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
      tg.onclick=e=>{ e.preventDefault(); firmToggle(d); };
      row.appendChild(tg); wrap.appendChild(row);
      const chips=document.createElement('div'); chips.className='co-chips'; wrap.appendChild(chips);
      const hint=document.createElement('div'); hint.className='co-hint';
      hint.textContent='Firma adını yazabilir ya da listeden dokunarak işaretleyebilirsiniz.';
      wrap.appendChild(hint);
      d.appendChild(wrap);
      box.appendChild(d);
      buildFirmUI(d, chips, inp.id, inp.value, null);
      inp.addEventListener('input', ()=>paintFirmChips(chips, inp.value));
      if(f.slim===false) d.classList.remove('slim');
      return;
    }
    box.appendChild(d);
  });
  if(o.extra) box.insertAdjacentHTML('beforeend', o.extra);
  $('#formOk').textContent=o.ok||'Kaydet';
  $('#formModal').classList.add('show');
  formOk=o.onOk||null;
  if(o.onMount) setTimeout(()=>o.onMount(),0);
  const first=box.querySelector('input,textarea,select'); if(first) setTimeout(()=>{ try{ first.focus(); }catch(e){} },250);
  return new Promise(res=>{ formResolve=res; });
}
function closeForm(res){ $('#formModal').classList.remove('show'); const r=formResolve; formResolve=null; formOk=null; if(r) r(res===undefined?true:res); }
$('#formOk').onclick=async ()=>{
  const v={};
  $$('#formFields input, #formFields textarea, #formFields select').forEach(i=>{ v[i.id.replace('f_','')]=i.value; });
  const cb=formOk, gen=formGen;
  if(!cb){ closeForm(); return; }
  let r; try{ r=await cb(v); }catch(e){ toast('İşlem tamamlanamadı','err'); return; }
  if(gen!==formGen) return;            // bu arada başka form açıldı, dokunma
  if(r!==false) closeForm(r);
};
$('#formCancel').onclick=()=>closeForm(false);
function sttHelp(msg){
  openForm({ title:'Sesli yazım yardımı', text:msg, ok:'Anladım', onOk:()=>true,
    extra:'<div class="mini-note" style="text-align:left;line-height:1.75;margin-top:2px">'
      +'<b>1.</b> Tarayıcı olarak <b>Google Chrome</b> (Android) ya da <b>Microsoft Edge</b> kullanın.<br>'
      +'<b>2.</b> Adres çubuğunun solundaki <b>kilit</b> (veya site ayarı) simgesine dokunup <b>Mikrofon: İzin Ver</b> yapın.<br>'
      +'<b>3.</b> Telefonda <b>Ayarlar › Uygulamalar › Tarayıcı › İzinler › Mikrofon</b> yolunu kontrol edin.<br>'
      +'<b>4.</b> Sesli yazım için <b>internet</b> gerekir (tarayıcı tanıma servisine bağlanır).<br>'
      +'<b>5.</b> Uygulama <code>Dosya</code> olarak değil bir <b>adres üzerinden (https)</b> açılırsa mikrofon sorunsuz çalışır.<br>'
      +'<b>6.</b> Kulaklık takılıysa mikrofon kaynağı değişmiş olabilir — çıkarın.<br>'
      +'<b>7.</b> En sonunda sayfayı bir kez yenileyin.</div>'
      +'<button class="btn btn-ghost" id="sttReload" style="width:100%;margin-top:10px">Sayfayı yenile</button>',
    onMount:()=>{ const b=$('#sttReload'); if(b) b.onclick=()=>{ closeForm(); location.reload(); }; } });
}
$('#rowStt').onclick=()=>{ sfx.tap();
  if(!SR){ sttHelp('Bu tarayıcıda sesli yazım yok. Google Chrome ya da Edge kullanın.'); return; }
  Voice.start($('#rowStt'), { onFinal:t=>{ toast('Algıladım: '+t,'ok'); sfx.ok(); } }); };
$('#rowSttFix').onclick=()=>sttHelp('Sesli yazım çalışmıyorsa aşağıdaki adımları deneyin.');

/* ---------------------------------------------------------------- 14. paylaşım */
function copyText(t, silent){
  function fallback(){
    try{ const ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.focus(); ta.select(); const ok=document.execCommand('copy'); ta.remove();
      if(!silent) ok? toast('Kopyalandı','ok') : toast('Kopyalanamadı','err'); return ok;
    }catch(e){ if(!silent) toast('Kopyalanamadı','err'); return false; } }
  try{ if(navigator.clipboard&&navigator.clipboard.writeText)
    return navigator.clipboard.writeText(t).then(()=>{ if(!silent) toast('Kopyalandı','ok'); return true; }).catch(()=>fallback()); }catch(e){}
  return Promise.resolve(fallback());
}
let sharePayload={ text:'', file:null, name:'rapor.txt' };
function openShare(title, text, file, name){
  sharePayload={ text:text, file:file||null, name:name||'rapor.txt' };
  $('#shareTitle').textContent=title;
  $('#shareArea').value=text;
  $('#shareModal').classList.add('show');
}
function waLink(text){ return P.waLink ? P.waLink : 'https://wa.me/?text='+encodeURIComponent(text); }
$('#shareWa').onclick=()=>{
  const url=waLink(sharePayload.text);
  copyText(sharePayload.text, true);
  const w=window.open(url,'_blank');
  if(!w) toast('Açılama engellendi — metin panoya kopyalandı','err');
};
$('#shareNative').onclick=async ()=>{
  const p={ title:'Çınarköy Nöbet', text:sharePayload.text };
  if(sharePayload.file) p.files=[sharePayload.file];
  if(navigator.share){ try{ await navigator.share(p); }catch(e){ if(e.name!=='AbortError') toast('Paylaşılamadı','err'); } }
  else copyText(sharePayload.text);
};
$('#shareCopy').onclick=()=>copyText(sharePayload.text);
$('#shareFile').onclick=()=>{ if(sharePayload.file) downloadBlob(sharePayload.file, sharePayload.name);
  else downloadBlob(new Blob([sharePayload.text],{type:'text/plain;charset=utf-8'}), sharePayload.name); };
function downloadBlob(blob, filename){
  try{ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    toast('Dosya indiriliyor','ok'); }
  catch(e){ toast('Dosya kaydedilemedi','err'); }
}
function dayLabel(list){
  if(!list.length) return dateStamp();
  const k=dayKey(list[0].ts);
  return (k===dayKey(Date.now())? 'Bugün ' : '') + new Date(list[0].ts).toLocaleDateString('tr-TR');
}
function reportText(list, title){
  let s=(title||('Çınarköy Nöbet — '+(logRange==='all'?dateStamp():dayLabel(list))+' Raporu'))+'\n'+'─'.repeat(26)+'\n';
  if(!list.length) return s+'Kayıt yok.';
  s+='Toplam: '+list.length+' giriş\n\n';
  list.forEach(v=>{ s+='• '+fmtTR(v.ts)+'  '+v.site+' '+v.unit+'\n    Kurye: '+(v.courier||'—')
    +((v.company||firmOf(v.plate,v.courier))? '  ('+(v.company||firmOf(v.plate,v.courier))+')':'')
    +(v.plate?'  |  Plaka: '+v.plate:'')+'\n    Görevli: '+(v.guard||'—')+'\n'; });
  return s;
}
#btnShareNative.onclick=()=>{
  openActions('Paylaş / Dışa Aktar', 'Raporu hangi formatta paylaşmak istiyorsunuz?', [
    { t:'Excel Tablosu (.xlsx)', run:async ()=>{
        if(!window.XLSX){ toast('Excel yüklenemedi','err'); return; }
        const rows=filteredLog().map(v=>({ Blok:v.site, Daire:v.unit, Kurye:v.courier, Firma:(v.company||firmOf(v.plate,v.courier)), Plaka:v.plate, Görevli:v.guard, Not:v.note||'', Tarih:new Date(v.ts).toLocaleDateString('tr-TR'), Saat:fmtTR(v.ts) }));
        if(!rows.length){ toast('Kayıt yok','err'); return; }
        const ws=XLSX.utils.json_to_sheet(rows), wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Kayıtlar');
        const buf=XLSX.write(wb,{type:'array',bookType:'xlsx'});
        const blob=new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const name='cinarkoy-kayitlar-'+fileStamp()+'.xlsx';
        if(navigator.share){ try{ await navigator.share({files:[new File([blob],name,{type:blob.type})]}); }catch(e){ downloadBlob(blob,name); } } else { downloadBlob(blob,name); }
    } },
    { t:'Metin Raporu (.txt)', run:async ()=>{
        const rows=filteredLog(); if(!rows.length){ toast('Kayıt yok','err'); return; }
        let text='Çınarköy Nöbet Kayıtları\n------------------------\n';
        rows.forEach(v=>{ text+=fmtTR(v.ts,true)+' | '+v.site+' '+v.unit+' | '+(v.courier||'İsimsiz')+(v.plate?' ('+v.plate+')':'')+'\n'; });
        const blob=new Blob([text],{type:'text/plain;charset=utf-8'}); const name='cinarkoy-rapor-'+fileStamp()+'.txt';
        if(navigator.share){ try{ await navigator.share({text:text}); }catch(e){ downloadBlob(blob,name); } } else { downloadBlob(blob,name); }
    } },
    { t:'JSON Veritabanı (.json)', run:async ()=>{
        const pkg=await buildPackage('full'); const json=JSON.stringify(pkg);
        const blob=new Blob([json],{type:'application/json'}); const name='cinarkoy-veri-'+fileStamp()+'.json';
        if(navigator.share){ try{ await navigator.share({files:[new File([blob],name,{type:blob.type})]}); }catch(e){ downloadBlob(blob,name); } } else { downloadBlob(blob,name); }
    } }
  ]);
};
$('#rowWaLink').onclick=()=>{
  openForm({ title:'WhatsApp bağlantısı', text:'Grubun veya kişinin https://chat.whatsapp.com/… bağlantısını yapıştırın. Boş bırakılırsa numara seçme ekranı açılır.',
    fields:[{ id:'link', label:'Bağlantı', value:P.waLink||'', placeholder:'https://chat.whatsapp.com/…' }],
    ok:'Kaydet', onOk:v=>{ P.waLink=(v.link||'').trim(); savePrefs(); paintPrefs(); toast('Kaydedildi','ok'); return true; } });
};

/* ---------------------------------------------------------------- 15. aktarım */
function packVisit(v){ return { u:v.uid, s:v.site, d:v.unit, g:v.guard, c:v.courier, f:v.company||'', p:v.plate, n:v.note, t:v.ts, m:v.updatedAt, v:v.dev, x:v.deleted?1:0 }; }
function unpackVisit(o){ return { uid:o.u||o.uid, site:o.s!=null?o.s:(o.site||''), unit:o.d!=null?o.d:(o.unit||''),
  guard:o.g!=null?o.g:(o.guard||''), courier:o.c!=null?o.c:(o.courier||''),
  company:o.f!=null?o.f:(o.company!=null?o.company:''), plate:fmtPlate(o.p!=null?o.p:o.plate),
  note:o.n!=null?o.n:(o.note||''), ts:o.t!=null?o.t:(o.ts||Date.now()), updatedAt:o.m!=null?o.m:(o.updatedAt||o.ts||Date.now()),
  dev:o.v||o.dev||'?', deleted:!!(o.x||o.deleted) }; }
function packCourier(c){ return { u:c.uid, p:c.plate, k:c.key, n:c.name, f:c.company||'', t:c.ts, m:c.updatedAt, v:c.dev, s:c.seen||0, x:c.deleted?1:0 }; }
function unpackCourier(o){ return { uid:o.u||o.uid, plate:fmtPlate(o.p!=null?o.p:o.plate), key:o.k||plateKey(o.p),
  name:o.n!=null?o.n:(o.name||''), company:o.f!=null?o.f:(o.company||''), ts:o.t!=null?o.t:(o.ts||Date.now()),
  updatedAt:o.m!=null?o.m:(o.updatedAt||Date.now()), dev:o.v||o.dev||'?', seen:o.s||0, deleted:!!(o.x||o.deleted) }; }

async function buildPackage(kind){
  /* "delta" = son GÖNDERİMDEN sonrası. Yedekleme (lastExport) gönderim sayılmaz. */
  const since = (kind==='delta' && P.lastSync) ? P.lastSync : 0;
  const raw=await dbAll(S_V);
  const visits=raw.filter(v=>!v.deleted && (!since || (v.updatedAt||0)>since));
  const tombs=raw.filter(v=>v.deleted && (!since || (v.updatedAt||0)>since));
  const couriers=(await dbAll(S_C)).filter(c=>!since || (c.updatedAt||0)>since);
  return { app:'ck-nobet', v:2, kind:kind||'full', at:Date.now(),
    from:{ d:DEVICE, n:P.guard||'' }, sites:userSites(), notes:NOTES,
    visits:visits.map(packVisit).concat(tombs.map(packVisit)), couriers:couriers.map(packCourier) };
}
async function mergePackage(pkg){
  if(!pkg) throw new Error('Boş veri');
  let legacy=false, vs=[], cs=[];
  if(Array.isArray(pkg)){ legacy=true; vs=pkg; }
  else if(pkg && pkg.app){ if(pkg.app!=='ck-nobet') throw new Error('Bu dosya Çınarköy Nöbet veri paketi değil'); vs=pkg.visits||[]; cs=pkg.couriers||[]; }
  else throw new Error('Veri okunamadı');
  let added=0, updated=0, skipped=0, cAdded=0, cUpdated=0;
  const have=await dbAll(S_V), byUid={}, bySig={};
  have.forEach(v=>{ byUid[v.uid]=v; bySig[v.site+'|'+v.unit+'|'+v.ts]=v; });
  for(const o of vs){
    const r = legacy ? mkVisit({ site:o.site, unit:o.unit, guard:o.guard, courier:o.courier, company:o.company,
      ts:o.ts, plate:o.plate, note:o.note }) : unpackVisit(o);
    if(!r.uid) r.uid=uid();
    const sig=r.site+'|'+r.unit+'|'+r.ts;
    const loc = byUid[r.uid] || bySig[sig];
    if(!loc){ await dbPut(S_V,r); byUid[r.uid]=r; bySig[sig]=r; added++; }
    else if((r.updatedAt||0)>(loc.updatedAt||0)){
      const merged=Object.assign({},loc,r);
      if(!merged.company && loc.company) merged.company=loc.company;
      await dbPut(S_V,merged); byUid[merged.uid]=merged; bySig[sig]=merged; updated++;
    }
    else skipped++;
  }
  const ch=await dbAll(S_C), cBy={};
  ch.forEach(c=>{ cBy[c.uid]=c; if(c.key) cBy['k:'+c.key]=c; });
  for(const o of cs){
    const r=unpackCourier(o); if(!r.key) r.key=plateKey(r.plate);
    if(!r.name && !r.plate) continue;
    const loc=cBy[r.uid]||cBy['k:'+r.key];
    if(!loc){ await dbPut(S_C,r); cBy[r.uid]=r; if(r.key) cBy['k:'+r.key]=r; cAdded++; }
    else if((r.updatedAt||0)>(loc.updatedAt||0)){
      const m=Object.assign({},loc,r);
      if(!m.company && loc.company) m.company=loc.company;
      m.seen=Math.max(loc.seen||0, r.seen||0);
      await dbPut(S_C,m); cBy[m.uid]=m; if(m.key) cBy['k:'+m.key]=m; cUpdated++;
    }
  }
  if(pkg.sites){ const cur=userSites(); const ids=cur.map(s=>s.id);
    pkg.sites.forEach(s=>{ if(s && s.id && ids.indexOf(s.id)<0){ cur.push(s); ids.push(s.id); } }); setUserSites(cur); }
  if(pkg.notes && typeof pkg.notes==='object'){ Object.assign(NOTES, pkg.notes); saveNotes(); rebuild(); }
  /* giriş kayıtlarında firma boşsa kurye listesinden tamamla */
  const all=await dbAll(S_V);
  for(const v of all){ if(!v.company && v.plate){
    const c=COURIERS.find(x=>x.key===plateKey(v.plate));
    if(c && c.company){ v.company=c.company; v.updatedAt=Date.now(); await dbPut(S_V,v); } } }
  await refresh(); renderLog(); paintUnitHistory();
  P.lastImport=Date.now(); savePrefs();
  paintPrefs(); paintSyncState();
  return { added:added, updated:updated, skipped:skipped, cAdded:cAdded, cUpdated:cUpdated, legacy:legacy };
}
$('#openSync').onclick=()=>{ $('#syncModal').classList.add('show'); paintSyncState(); };
$('#syncClose').onclick=()=>$('#syncModal').classList.remove('show');
function paintSyncState(){
  const e=$('#syncState2'); if(!e) return;
  const lastUp = P.lastSync ? new Date(P.lastSync).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : 'yok';
  const lastIn = P.lastImport ? new Date(P.lastImport).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : 'yok';
  e.innerHTML='Bu cihazda <b>'+VISITS.length+'</b> kayıt · <b>'+COURIERS.length+'</b> kurye'
    +'<br>Son gönderim: '+lastUp+' · Son alma: '+lastIn;
}
function b64enc(s){ try{ return btoa(unescape(encodeURIComponent(s))); }catch(e){ return ''; } }
function b64dec(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e){ return ''; } }
function packageText(json, header){
  return header+'\n\n'+b64enc(json);
}
$('#syncSend').onclick=async ()=>{
  $('#syncModal').classList.remove('show');
  const pkg=await buildPackage('full');
  P.lastExport=Date.now(); P.lastSync=Date.now(); savePrefs();
  const json=JSON.stringify(pkg);
  const head='Çınarköy Nöbet veri paketi\n'+dateStamp()+' '+new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})
    +'\nKayıt: '+pkg.visits.length+' · Kurye: '+pkg.couriers.length
    +'\n\nAlan kişi: uygulamada Kayıtlar › Veri Paketi › Dosyadan Al (ya da Metin Yapıştır)\n\n';
  openShare('Veri paketi', packageText(json, head), new Blob([json],{type:'application/json'}), 'cinarkoy-veri-'+fileStamp()+'.json');
  toast('Paket hazır — WhatsApp ile gönderin','ok'); sfx.ok(); paintSyncState();
};
$('#syncDelta').onclick=async ()=>{
  $('#syncModal').classList.remove('show');
  const pkg=await buildPackage('delta');
  if(!pkg.visits.length && !pkg.couriers.length){ toast('Gönderilecek yeni kayıt yok','err'); return; }
  P.lastExport=Date.now(); P.lastSync=Date.now(); savePrefs();
  const json=JSON.stringify(pkg);
  const head='Çınarköy Nöbet — yeni kayıtlar ('+pkg.visits.length+' kayıt, '+pkg.couriers.length+' kurye)\n\nAlan kişi: Kayıtlar › Veri Paketi › Dosyadan Al\n\n';
  openShare('Yeni kayıtlar', packageText(json, head), new Blob([json],{type:'application/json'}), 'cinarkoy-yeni-'+fileStamp()+'.json');
  paintSyncState();
};
$('#syncPick').onclick=()=>{ $('#syncModal').classList.remove('show'); setTimeout(()=>$('#fileInput').click(),250); };
$('#fileInput').addEventListener('change', e=>{
  const f=e.target.files&&e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=async ()=>{ await doImport(r.result); e.target.value=''; };
  r.onerror=()=>{ toast('Dosya okunamadı','err'); e.target.value=''; };
  r.readAsText(f,'utf-8');
});
$('#syncPaste').onclick=()=>{ $('#syncModal').classList.remove('show');
  setTimeout(()=>{ $('#pasteArea').value=''; $('#pasteModal').classList.add('show'); },250); };
$('#pasteCancel').onclick=()=>$('#pasteModal').classList.remove('show');
$('#pasteOk').onclick=async ()=>{ const t=$('#pasteArea').value.trim(); if(!t) return; $('#pasteModal').classList.remove('show'); await doImport(t); };

/* Gelen paketin ne getireceğini YAZMADAN hesaplar (onay metni için).
   mergePackage ile aynı imzaları kullanır, böylece "kaç tane yeni" sözü
   gerçekle örtüşür. */
async function previewPackage(pkg){
  let vs=[], cs=[], legacy=false;
  if(Array.isArray(pkg)){ legacy=true; vs=pkg; }
  else if(pkg && pkg.app){ vs=pkg.visits||[]; cs=pkg.couriers||[]; }
  const byUid={}, bySig={};
  (await dbAll(S_V)).forEach(v=>{ byUid[v.uid]=1; bySig[v.site+'|'+v.unit+'|'+v.ts]=1; });
  let nNew=0, nSame=0;
  for(const o of vs){
    const r = legacy ? mkVisit({ site:o.site, unit:o.unit, guard:o.guard, courier:o.courier,
      company:o.company, ts:o.ts, plate:o.plate, note:o.note }) : unpackVisit(o);
    const sig=r.site+'|'+r.unit+'|'+r.ts;
    if(!byUid[r.uid] && !bySig[sig]){ byUid[r.uid]=1; bySig[sig]=1; nNew++; } else nSame++;
  }
  const cBy={};
  (await dbAll(S_C)).forEach(c=>{ cBy[c.uid]=1; if(c.key) cBy['k:'+c.key]=1; });
  let cNew=0, cSame=0;
  for(const o of cs){
    const r=unpackCourier(o); const k=r.key||plateKey(r.plate);
    if(!cBy[r.uid] && !(k && cBy['k:'+k])){ cBy[r.uid]=1; if(k) cBy['k:'+k]=1; cNew++; } else cSame++;
  }
  return { visits:nNew, visitsSame:nSame, couriers:cNew, couriersSame:cSame, legacy:legacy };
}
async function doImport(raw, opt){
  opt = opt || {};
  const txt=String(raw||'').trim(); if(!txt){ toast('Metin boş','err'); return null; }
  const tries=[];
  try{ tries.push(JSON.parse(txt)); }catch(e){}
  /* base64 blob: uzun satırları sırayla dene (WhatsApp satır sonu ekleyebilir) */
  const lines = txt.split('\n').map(s=>s.trim()).filter(Boolean)
    .filter(s=>/^[A-Za-z0-9+/_=-]{40,}$/.test(s));
  for(const l of lines){
    const d=b64dec(l); if(!d) continue;
    try{ tries.push(JSON.parse(d)); }catch(e){}
    if(tries.length>1) break;
  }
  if(!tries.length){
    /* yapışan tek parça uzun metin */
    const m=txt.match(/[A-Za-z0-9+/_=-]{200,}/);
    if(m){ const d=b64dec(m[0]); if(d){ try{ tries.push(JSON.parse(d)); }catch(e){} } }
  }
  let obj=null;
  for(const t of tries){ if(t && (Array.isArray(t) || t.app)){ obj=t; break; } }
  if(!obj){ toast('Veri okunamadı — dosya bozuk ya da başka uygulamaya ait olabilir','err'); sfx.err(); return null; }
  /* gelen paketi göstermeden birleştirme: ne ekleneceğini önce hesapla,
     sonra tek dokunuşla onay iste. Böylece yanlış yapıştırılan paket
     veritabanını sessizce bozmaz. */
  if(!opt.noAsk){
    const pre=await previewPackage(obj);
    const n=pre.visits+pre.couriers;
    if(!n){
      const ok=await ask('Yenilik yok',
        'Bu pakette sizin telefonda olmayan yeni kayıt yok. '
        +'Mevcut '+VISITS.length+' kayıt ve '+COURIERS.length+' kurye aynen kalacak. Paketi yine de birleştirelim mi?',
        'Birleştir');
      if(!ok) return null;
    }else{
      const parts=[];
      if(pre.visits)   parts.push(pre.visits+' yeni kayıt');
      if(pre.couriers) parts.push(pre.couriers+' yeni kurye');
      if(pre.visitsSame||pre.couriersSame)
        parts.push((pre.visitsSame+pre.couriersSame)+' tanesi zaten var');
      const ok=await ask('Veri paketi alınsın mı?',
        'Alınacak: '+parts.join(', ')+'.\n\n'
        +'Mevcut kayıtlarınız silinmez, paketle birleştirilir. '
        +'Alan kişi: '+(obj.from&&obj.from.n?obj.from.n:'belirtilmemiş')+' · '
        +(obj.at?new Date(obj.at).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'tarih yok'),
        'Al ve birleştir');
      if(!ok) return null;
    }
  }
  try{
    const r=await mergePackage(obj);
    const parts=[];
    parts.push(r.added+' yeni');
    if(r.updated) parts.push(r.updated+' güncellendi');
    if(r.skipped) parts.push(r.skipped+' aynı');
    let msg='Aktarıldı: '+parts.join(' · ');
    if(r.cAdded||r.cUpdated) msg+=' · kurye +'+r.cAdded+' / ~'+r.cUpdated;
    toast(msg,'ok'); sfx.ok(); buzz(20);
    speak('Veri aktarıldı. '+r.added+' yeni kayıt.');
    $('#pasteModal').classList.remove('show'); $('#syncModal').classList.remove('show');
    if(!r.added && !r.updated && !r.cAdded && !r.cUpdated){
      openActions('Güncel', 'Bu pakette sizin telefonda olmayan yeni kayıt yok. '
        + VISITS.length+' kayıt, '+COURIERS.length+' kurye ile aynı.', [
          { ico:ic('list',17), t:'Kayıt listesini aç', primary:true, run:()=>setTab('log') },
          { ico:ic('repeat',17), t:'Yine de aktar', s:'Paketi tekrar birleştir', run:()=>setTab('log') } ]);
    } else setTab('log');
    return r;
  }catch(e){ toast('Aktarım hatası: '+e.message,'err'); sfx.err(); return null; }
}
$('#rowImport').onclick=()=>$('#fileInput').click();
$('#rowSync').onclick=()=>$('#openSync').click();
$('#rowBackup').onclick=async ()=>{
  const pkg=await buildPackage('full');
  downloadBlob(new Blob([JSON.stringify(pkg)],{type:'application/json'}), 'cinarkoy-yedek-'+fileStamp()+'.json');
  toast('Yedek indiriliyor','ok');
};
$('#rowMergeFix').onclick=async ()=>{
  const ok=await ask('Yinelenen kayıtlar temizlensin mi?','Aynı daireye aynı dakikada yazılmış kopyalar silinir ve 30 günden eski silinmiş kayıtlar temizlenir.');
  if(!ok) return;
  const all=(await dbAll(S_V)).slice().sort((a,b)=>(a.updatedAt||0)-(b.updatedAt||0));
  const seen={}; let n=0;
  for(const v of all){
    const sig=v.site+'|'+v.unit+'|'+v.ts+'|'+keyOf(v.courier);
    if(seen[sig]){ v.deleted=true; v.updatedAt=Date.now(); await dbPut(S_V,v); n++; } else seen[sig]=1;
  }
  const old=Date.now()-30*86400000; let t=0;
  for(const v of all) if(v.deleted && (v.updatedAt||0)<old){ await dbDrop(S_V,v.uid); t++; }
  await refresh(); renderLog();
  toast(n+' kopya silindi, '+t+' eski kayıt temizlendi','ok');
};

/* ---------------------------------------------------------------- 16. ayarlar */
$$('[data-sw]').forEach(sw=>{ sw.onclick=e=>{ e.stopPropagation(); const k=sw.dataset.sw; P[k]=!P[k];
  if(k==='tts') P.ttsSet=true;
  savePrefs(); paintPrefs(); sfx.tap(); buzz();
  if(k==='tts'){ if(P.tts) speak('Sesli okuma açıldı'); else stopSpeak(); }
  if(k==='autoFirm') firmToggle($('#courierCoField'), P.autoFirm); }; });
$$('[data-set]').forEach(r=>{ r.onclick=e=>{ if(e.target.closest('[data-sw]')) return;
  const k=r.dataset.set; P[k]=!P[k];
  if(k==='tts') P.ttsSet=true;
  savePrefs(); paintPrefs(); sfx.tap(); buzz();
  if(k==='autoPlate'){ const b=$('#courierPlateBox'); if(b) b.style.display=P.autoPlate?'block':'none'; }
  if(k==='autoFirm') firmToggle($('#courierCoField'), P.autoFirm);
  if(k==='tts'&&P.tts) speak('Sesli okuma açıldı'); }; });
function paintPrefs(){
  $$('[data-sw]').forEach(sw=>sw.classList.toggle('on',!!P[sw.dataset.sw]));
  const r=$('#rateVal'); if(r) r.textContent = P.rate<0.9?'Yavaş':(P.rate>1.15?'Hızlı':'Normal');
  paintGuard();
  const st=$('#sttState');
  if(st) st.textContent = SR ? (navigator.mediaDevices? 'Hazır — dokunup konuşun' : 'Tarayıcı izin vermiyor') : 'Bu tarayıcı desteklemiyor';
  const cn=$('#camNote');
  if(cn) cn.textContent = (navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)
    ? 'Kamera hazır. Plaka tanıma ilk kullanımda metin tanıma kütüphanesini internetten indirir (sizi rahatsız etmez).'
    : 'Bu tarayıcı kamera erişimine izin vermiyor — plakayı elle girebilir ya da galeriden fotoğraf okutabilirsiniz.';
  const wv=$('#waVal'); if(wv) wv.textContent = P.waLink? 'tanımlı' : '—';
  const ss=$('#syncState');
  if(ss) ss.textContent = VISITS.length+' kayıt · son aktarım: '+(P.lastImport? new Date(P.lastImport).toLocaleDateString('tr-TR') : 'yok');
  paintSyncState();
}
$('#rowRate').onclick=()=>{
  const opts=[['Çok yavaş',0.75],['Yavaş',0.9],['Normal',1],['Hızlı',1.2],['Çok hızlı',1.45]];
  const idx=opts.findIndex(o=>o[1]===P.rate);
  const n=opts[(idx+1)%opts.length];
  P.rate=n[1]; savePrefs(); paintPrefs();
  toast('Hız: '+n[0],'ok'); speak('Okuma hızı '+n[0]);
};
$('#rowNames').onclick=()=>{
  const names=P.names||[]; if(!names.length){ toast('Henüz isim geçmişi yok'); return; }
  openForm({ title:'Kullanılan isimler', text:'Kayıtlardaki isim geçmişi.',
    fields:[{ id:'list', label:'Listeler', type:'textarea', value:names.join('\n') }], ok:'Kapat', onOk:()=>true });
};
$('#rowAbout').onclick=()=>{
  openForm({ title:'Çınarköy Nöbet', text:'Sürüm 2.0 — çevrimdışı çalışan nöbet asistanı.',
    fields:[{ id:'i', label:'Cihaz kimliği', value:DEVICE },
            { id:'b', label:'Blok / daire', value:SITES.length+' blok · '+ALL.length+' daire' },
            { id:'r', label:'Kayıt', value:VISITS.length+' kayıt · '+COURIERS.length+' kurye' },
            { id:'s', label:'Sesli yazım', value:SR?'var':'yok' },
            { id:'t', label:'Sesli okuma', value:TTS.ok?'var':'yok' },
            { id:'c', label:'Kamera', value:(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)?'var':'yok' }],
    ok:'Kapat', onOk:()=>true });
};
$('#rowWipe').onclick=async ()=>{
  const ok=await ask('Tüm veriler silinsin mi?','Bu telefondaki tüm kayıtlar, kuryeler ve eklediğiniz bloklar kalıcı olarak silinir. Geri alınamaz.');
  if(!ok) return;
  const ok2=await ask('Emin misiniz?','Son şans: veriler silinecek. Gerekirse önce "Tam yedek al" yapın.');
  if(!ok2) return;
  await dbWipe(S_V); await dbWipe(S_C);
  localStorage.removeItem('ck_sites'); localStorage.removeItem('ck_notes');
  localStorage.removeItem('ck_ovr'); resetOvrCache();
  NOTES={}; rebuild(); await refresh(); populateLogFilter(); renderLog(); toast('Tüm veriler silindi','ok');
};
$('#setBtn').onclick=()=>setTab('set');
$('#rowCounts').onclick=()=>{
  let txt='';
  STREETS.forEach(g=>{
    txt+=g.name.toLocaleUpperCase('tr-TR')+'\n';
    g.sites.forEach(s=>{ txt+='  '+s.name+': '+s.units.map(u=>u.c).join(', ')+'\n'; });
    txt+='\n';
  });
  openForm({ title:'Blok ve daire listesi', text:'Sokaklara göre gruplanmış liste. Fotoğraflardaki numaralarla '
    +'karşılaştırmanız için — kopyalayıp WhatsApp grubunda kontrol edebilirsiniz. '
    +'Düzeltme yapmak için Ayarlar › Adresleri düzenle.',
    fields:[{ id:'t', label:STREETS.length+' sokak · '+SITES.length+' blok · '+ALL.length+' daire',
      type:'textarea', value:txt }], ok:'Listeyi kopyala', onOk:v=>{ copyText(v.t); return true; } });
};

/* =======================================================================
   ADRES YÖNETİCİSİ — blok adı, sokak, daire no ve gizleme
   Uygulamaya gömülü adres listesi hatalıysa buradan düzeltilir.
   ======================================================================= */
function openSiteMgr(){
  const p=$('#siteMgr'); if(!p) return;
  p.classList.add('show'); renderSiteMgr();
}
function closeSiteMgr(){ const p=$('#siteMgr'); if(p) p.classList.remove('show'); }
function renderSiteMgr(){
  const body=$('#siteMgrBody'); if(!body) return;
  const OVR=siteOvr();
  body.innerHTML='';
  if(!SITES.length){
    body.innerHTML='<div class="sm-empty">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14"/></svg>'
      +'<div>Hiç blok yok.<br>Alt taraftaki <b>Yeni blok ekle</b> düğmesiyle başlayın.</div></div>';
    return;
  }
  const order=streetFilter? STREETS.filter(s=>s.name===streetFilter) : STREETS;
  (order.length?order:STREETS).forEach(g=>{
    const h=document.createElement('div'); h.className='sm-head';
    h.innerHTML=esc(g.name)+'<span class="n">'+g.sites.length+' blok · '
      +g.sites.reduce(function(a,s){ return a+s.units.length; },0)+' daire</span>';
    body.appendChild(h);
    g.sites.forEach(site=>body.appendChild(siteCard(site, OVR)));
  });
  const foot=document.createElement('div');
  foot.className='mini-note';
  foot.style.marginTop='16px';
  foot.innerHTML='Buradaki değişiklikler yalnızca <b>bu telefon</b>da saklanır ve '
    +'telefonlar arası aktarımda <b>Veri Paketi</b> ile birlikte gönderilir. '
    +'Fabrika listesine dönmek için üstteki <b>Sıfırla</b> düğmesini kullanın.';
  body.appendChild(foot);
}
function siteCard(site, OVR){
  const o=OVR[site.id]||{};
  const el=document.createElement('div'); el.className='sm-card'+(o.name||o.units||o.street?' mod':'');
  const shown=site.units.slice(0,14);
  el.innerHTML=
      '<div class="sm-top"><div class="nm"><b>'+esc(site.name)+'</b>'
    + '<span>'+esc(site.street||'Sokak belirtilmemiş')+' · '+site.units.length+' daire'
    + (site.box? '' : ' · planda yok')+'</span></div></div>'
    + '<div class="sm-row">'
    +   '<span class="sm-tag">'+esc(site.street||'Sokak yok')+'</span>'
    +   (site.custom? '<span class="sm-tag plain">Sizin eklediğiniz</span>'
                  : '<span class="sm-tag plain">Fabrika listesi</span>')
    +   (o.off? '<span class="sm-tag plain" style="color:var(--danger);border-color:rgba(255,107,91,.35)">Gizli</span>':'')
    + '</div>'
    + '<div class="sm-units">'
    +   shown.map(u=>'<i class="'+(o.units?'edited':'')+'">'+esc(u.c)+'</i>').join('')
    +   (site.units.length>shown.length? '<span class="more">+'+(site.units.length-shown.length)+' daire daha</span>':'')
    + '</div>'
    + '<div class="sm-acts">'
    +   '<button data-a="edit">'+ic('edit',15)+'Düzenle</button>'
    +   '<button data-a="units">'+ic('layers',15)+'Daireler</button>'
    +   '<button data-a="pos">'+ic('pin',15)+'Plan</button>'
    +   '<button data-a="hide" class="del">'+(o.off? ic('check',15)+'Göster' : ic('trash',15)+'Gizle')+'</button>'
    + '</div>';
  el.querySelector('[data-a="edit"]').onclick=()=>editSiteForm(site);
  el.querySelector('[data-a="units"]').onclick=()=>editUnitsForm(site);
  el.querySelector('[data-a="pos"]').onclick=()=>{
    closeSiteMgr();
    if(site.box){ toast(site.name+' planda zaten işaretli','ok'); return; }
    setTab('map'); placing=site.id; toast('Plan üzerinde bloğun yerine dokunun','ok');
  };
  el.querySelector('[data-a="hide"]').onclick=async ()=>{
    if(o.off){ setOvr(site.id,{ off:false }); rebuild(); renderSiteMgr(); toast(site.name+' yeniden listeye alındı','ok'); return; }
    const ok=await ask('Blok gizlensin mi?', site.name+' listeden, plandan ve aramadan kaldırılacak. '
      +'Kayıtlar silinmez. Daha sonra "Göster" ile geri getirebilirsiniz.');
    if(!ok) return;
    setOvr(site.id,{ off:true }); rebuild(); renderSiteMgr(); toast(site.name+' gizlendi','ok');
  };
  return el;
}
function editSiteForm(site){
  openForm({ title:'Bloku düzenle', text:'Ad ve sokağı düzeltin. Değişiklikler bu telefonda saklanır.',
    fields:[{ id:'name', label:'Blok adı', value:site.name, placeholder:'Örn. Cevahir 563-20' },
            { id:'street', label:'Sokak adı', value:site.street||'', placeholder:'Örn. Cevahir' }],
    ok:'Kaydet', onOk:v=>{
      const name=String(v.name||'').trim();
      if(!name){ toast('Blok adı gerekli','err'); return false; }
      const street=String(v.street||'').trim();
      setOvr(site.id, { name:name, street:street || streetOf({ name:name }) });
      rebuild(); renderSiteMgr(); renderCouriers(); renderLog();
      toast(name+' güncellendi','ok'); sfx.ok(); return true; } });
}
function editUnitsForm(site){
  const cur=site.units.map(u=>u.c).join(', ');
  openForm({ title:'Daire numaraları', text:site.name+' — virgülle ayırarak yazın. '
    +'Eksik olanı yazmayın, tamamını yazın: liste tamamen değiştirilir.',
    fields:[{ id:'u', label:'Daireler', type:'textarea', value:cur },
            { id:'entry', label:'Varsa ortak kapı notu (örn: zemin kat arka bahçe)', value:'' }],
    ok:'Kaydet', onOk:v=>{
      const parts=String(v.u||'').split(/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]+/)
        .map(x=>x.trim().toUpperCase()).filter(Boolean);
      if(!parts.length){ toast('En az bir daire girin','err'); return false; }
      const entry=String(v.entry||'').trim();
      setOvr(site.id, { units:parts.map(c=>({ c:c, entry:entry })) });
      if(entry) parts.forEach(c=>{ NOTES[site.id+'|'+c]=entry; });
      saveNotes();
      rebuild(); renderSiteMgr();
      toast(parts.length+' daire kaydedildi','ok'); sfx.ok(); return true; } });
}
$('#siteMgrBack').onclick=()=>{ closeSiteMgr(); sfx.tap(); };
$('#siteMgrAdd').onclick=()=>{
  openForm({ title:'Yeni blok ekle', text:'Blok adını ve sokağını yazın. Daire numaralarını bir sonraki adımda girersiniz.',
    fields:[{ id:'name', label:'Blok adı', value:'', placeholder:'Örn. Cevahir 563-20' },
            { id:'street', label:'Sokak adı', value:'', placeholder:'Örn. Cevahir' }],
    ok:'Ekle', onOk:v=>{
      const name=String(v.name||'').trim(); if(!name){ toast('Blok adı girin','err'); return false; }
      const street=String(v.street||'').trim()||streetOf({ name:name });
      const id='u'+keyOf(name).replace(/[^a-z0-9]/g,'')+'-'+Math.random().toString(36).slice(2,6);
      const list=userSites(); list.push({ id:id, name:name, street:street, units:[] }); setUserSites(list);
      toast('Blok eklendi: '+name,'ok'); sfx.ok();
      setTimeout(()=>{ editUnitsForm(siteById(id)); },260);
      return true; } });
};
$('#siteMgrReset').onclick=async ()=>{
  const ok=await ask('Fabrika adres listesine dönülsün mü?',
    'Blok adı, sokak ve daire numarası için yaptığınız TÜM düzeltmeler silinir ve '
    +'gömülü varsayılan listeye dönülür. Kayıtlarınız ve kuryeleriniz ETKİLENMEZ. '
    +'Devam etmeden önce "Tam yedek al" yapmanız önerilir.');
  if(!ok) return;
  localStorage.removeItem('ck_ovr'); resetOvrCache();
  rebuild(); renderSiteMgr();
  toast('Fabrika listesine dönüldü','ok'); sfx.ok();
};

/* =======================================================================
   YARDIM — Sıkça sorulan sorular ve konu başlıkları
   ======================================================================= */
const HELP = {
  adres:{ title:'Bloklar, sokaklar ve daireler', html:
    '<p>Uygulamanın içinde hazır bir blok listesi vardır. Bu liste görselden çıkarılmıştır '
    +'ve <b>yanlış olabilir</b> — siz doğrusunu bildiğiniz için düzeltmekten çekinmeyin.</p>'
    +'<p><b>Adresleri düzenle</b> ekranında her blok için:</p>'
    +'<ul><li><b>Düzenle</b> — blok adını ve sokağı değiştirir (örn. <code>Cevahir 563-13</code>, sokak <code>Cevahir</code>).</li>'
    +'<li><b>Daireler</b> — o bloğun tüm daire numaralarını virgülle yazarak değiştirir.</li>'
    +'<li><b>Plan</b> — bloğu harita üzerindeki gerçek yerine taşır (yeni eklenen bloklar için).</li>'
    +'<li><b>Gizle</b> — kullanılmayan bloğu listeden ve plandan kaldırır. Kayıtlar silinmez, '
    +'sonra "Göster" ile geri gelir.</li></ul>'
    +'<p>Değişiklikler anında <b>Ara</b> ve <b>Plan</b> sekmelerine yansır. Kayıtlarınıza dokunulmaz.</p>'
    +'<p><b>Sıfırla</b> düğmesi tüm adres düzeltmelerini silip gömülü listeye döndürür. '
    +'Kendi eklediğiniz bloklar silinmez.</p>'
    +'<p><b>Not:</b> Adres listesi telefonlar arası aktarımda <b>gönderilmez</b> — her '
    +'telefon kendi adres listesini tutar. Böylece bir telefonun hatası diğerlerine yayılmaz. '
    +'Böyle bir aktarım isterseniz <b>Veri Paketi › Tam yedek</b> bölümünü kullanın.</p>' },

  kamera:{ title:'Plaka okutma nasıl çalışır?', html:
    '<p>Kamera açıldığında uygulama şunları yapar:</p>'
    +'<ul><li>Görüntüde <b>plaka bölgesini bulur</b> — parlak, koyu ve yansımalı plaka durumlarını '
    +'ayrı ayrı dener, en çok benzeyeni seçer.</li>'
    +'<li>Bölgeyi büyütüp <b>keskinleştirir</b>, kontrastını açar, gerekiyorsa düzeltir.</li>'
    +'<li>Birkaç farklı yöntemle okur ve <b>en çok benzeyen sonucu</b> seçer.</li>'
    +'<li>Kayıtlı bir kurye eşleşirse <b>adı otomatik</b> gelir ve işlem anında biter.</li></ul>'
    +'<p><b>Okuma zayıfsa</b> ekranda kırmızı uyarı çıkar ve 3 olası okuma gösterilir — '
    +'yanlış olanı bir dokunuşla seçebilirsiniz. Hiçbiri doğru değilse <b>Yaz</b> ile '
    +'elle girin; girilen plaka kurye listesine kaydedilir ve bir daha sorulmaz.</p>'
    +'<p><b>En iyi sonuç için:</b> plakayı çerçeveye alın, telefonu sabit tutun, '
    +'gece fotoğraf kullanmayın, mümkünse 3–6 metre mesafeden ve düz açıyla çekin.</p>'
    +'<p><b>Kamera neden açılmıyor?</b> Dosya olarak (<code>file://</code>) açılan sayfalarda '
    +'tarayıcı güvenlik gereği kamerayı engeller. Uygulamayı bir <b>https</b> adresine '
    +'yükleyip oradan açmak sorunu tamamen çözer. Bu durumda ekranın üstünde turuncu '
    +'uyarı şeridi belirir.</p>' },

  veri:{ title:'Veritabanı ve yedekleme', html:
    '<p><b>Veriler nerede?</b> Her şey yalnızca bu telefonun tarayıcısında saklanır. '
    +'Sunucuya gönderilmez, kimse göremez. Uygulama internetsiz de çalışır '
    +(location.protocol==='file:'? '(kamera ve mikrofon hariç)':'')+'.</p>'
    +'<p><b>Verileri ne zaman silinir?</b> Tarayıcı önbelleğini temizlemek, '
    +'uygulamayı silmek veya tarayıcı verisini sıfırlamak <code>localStorage</code> ve '
    +'veritabanını da siler. Bu yüzden düzenli yedek alın.</p>'
    +'<p><b>Yedek alın.</b> Ayarlar › Veri &amp; Yedek › <b>Tam yedek al</b> bir JSON dosyası '
    +'indirir. Bu dosya tüm kayıtları, kuryeleri, blokları ve ayarları içerir. '
    +'Kendi cihazınızda saklayın; birden fazla kopya tutun.</p>'
    +'<p><b>Telefonlar arası aktarım.</b> <b>Veri Paketi</b> ekranından bir metin kodu '
    +'oluşturulur, WhatsApp ile arkadaşınıza gönderilir, o da <b>Al</b> der. '
    +'Mükerrer kayıt oluşmaz: aynı kayıt iki kez alınsa bile tek kayıt kalır. '
    +'Kurye listesi ve adres listesi de pakete dahildir.</p>'
    +'<p><b>Sadece yeni kayıtları aktarmak</b> için <b>Delta</b> seçeneğini kullanın — '
    +'paket çok daha küçük olur ve aktarım anında biter.</p>' },

  arama:{ title:'Arama ve sokak filtresi', html:
    '<p><b>Ara</b> sekmesindeki arama kutusu; blok adı, daire numarası, kapı notu, '
    +'<b>sokak adı</b>, kurye adı, firma adı ve plaka üzerinde çalışır. '
    +'Yazdıkça sonuçlar anında gelir.</p>'
    +'<p><b>Sokak filtresi</b> blokların üstündeki çubuktadır. Bir sokağa dokununca '
    +'sadece o sokağın blokları kalır, arama sonuçları da daralır. '
    +'Aynı sokak adına sahip bloklar bir arada toplanır — '
    +'örneğin bir sitede birden fazla blok varsa hepsini tek dokunuşla görürsünüz.</p>'
    +'<p><b>Plaka veya kurye adı yazarsanız</b> arama sonuç vermezse uygulama '
    +'kurye listesindeki eşleşmeyi de gösterir.</p>' },

  plaka:{ title:'Plaka ve kurye listesi', html:
    +'<p><b>Plaka</b> sekmesi plaka tanımanın merkezidir. Kamera ile okutabilir, '
    +'elle yazabilir veya galeriden fotoğraf seçebilirsiniz.</p>'
    +'<p><b>Kurye listesi</b> plaka → kurye eşleştirmesini tutar. Kayıt sırasında '
    +'plaka girildiğinde kurye adı otomatik gelir. Firması da varsa (Trendyol, '
    +'Uber Eats, Yemeksepeti, Paket Taxi, Migros, Getir) o da yazılır ve '
    +'arama sonuçlarında bulunabilir.</p>'
    +'<p><b>Öğrenme:</b> <b>Yeni plakayı öğren</b> ayarı açıksa kayıtta girilen her '
    +'yeni plaka listeye eklenir — bir daha kurye adı sormak zorunda kalmazsınız. '
    +'Kapalıysa yalnızca elle eklediğiniz plakalar tanınır.</p>'
    +'<p><b>Yanlış plaka kaydedilirse</b> kayıtta plaka alanına dokunup düzeltin. '
    +'Gri gösterilen (düşük güvenli) okumalar uyarı işaretlidir; onlara mutlaka bakın.</p>' },

  mikrofon:{ title:'Sesli yazım (mikrofon)', html:
    '<p>Sesli yazım, kurye adını ve plakayı <b>düğmeye basılı tutup konuşarak</b> '
    +'girmenizi sağlar. Yazmaktan hızlıdır ve eliniz doluyken kullanılır.</p>'
    +'<p><b>Çalışması için iki şart vardır:</b></p>'
    +'<ul><li>Uygulama bir <b>https</b> adresinden açılmalıdır. Dosya olarak '
    +'(<code>file://</code>) açılan sayfalarda tarayıcı mikrofonu güvenlik gereği engeller.</li>'
    +'<li>Tarayıcıya mikrofon izni verilmelidir. Adres çubuğunun solundaki <b>kilit</b> '
    +'veya site ayarı simgesine dokunup <b>Mikrofon: İzin Ver</b> deyin.</li></ul>'
    +'<p>Tanıma servisi tarayıcının kendi sunucusuna bağlanır, bu yüzden ilk kullanımda '
    +'<b>internet</b> gerekir. Sesli okuma (TTS) ise tamamen cihazda çalışır, internete ihtiyaç duymaz.</p>'
    +'<p><b>Çalışmıyorsa</b> Ayarlar › Sesli yazım › <b>Mikrofon çalışmıyorsa</b> '
    +'satırı adım adım çözüm listeler. Her durumda <b>Yaz</b> düğmesiyle '
    +'elle yazabilirsiniz; uygulamanın hiçbir işlevi buna bağlı değildir.</p>'
    +'<p><b>Kulaklık takılıysa</b> mikrofon kaynağı değişmiş olabilir — çıkarıp deneyin.</p>' }
};
function openHelp(topic){
  const p=$('#helpPage'); if(!p) return;
  const body=$('#helpBody'); const H=HELP[topic]||null;
  $('#helpTitle').textContent = H ? H.title : 'Yardım';
  body.innerHTML='';
  if(H){ const d=document.createElement('div'); d.className='qa-a'; d.innerHTML=H.html;
    body.appendChild(d); }
  else body.appendChild(buildFaq());
  p.classList.add('show');
  body.scrollTop=0;
}
function closeHelp(){ const p=$('#helpPage'); if(p) p.classList.remove('show'); }
$('#helpBack').onclick=()=>{ closeHelp(); sfx.tap(); };

function buildFaq(){
  const wrap=document.createElement('div');
  const sec=(t)=>{ const d=document.createElement('div'); d.className='help-sec'; d.textContent=t; wrap.appendChild(d); };
  const tile=(ico,title,txt,fn)=>{
    const d=document.createElement('div'); d.className='help-tile';
    d.innerHTML='<div class="hi">'+ic(ico,17)+'</div><div><b>'+title+'</b><p>'+txt+'</p></div>';
    if(fn) d.onclick=fn;
    return d;
  };
  const qa=(q,a)=>{
    const d=document.createElement('details'); d.className='qa';
    d.innerHTML='<summary><span class="q">'+q+'</span>'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>'
      +'<div class="qa-a">'+a+'</div>';
    return d;
  };

  wrap.appendChild(tile('search','Uygulama ne işe yarar?',
    'Güvenlik nöbetinde kapıya gelen kuryenin plakasını okutup kimin geldiğini kaydeder. '
    +'Blok ve daire seçilir, plaka okutulur, kayıt tutulur. Telefonlar arasında veri paylaşılır.',
    ()=>openHelp('arama')));
  wrap.appendChild(tile('cam','Plaka okutma nasıl daha iyi çalışır?',
    'Düz açı, sabit telefon, gündüz ışığı ve çerçeveye dolu plaka. Ayrıntılı rehber:',
    ()=>openHelp('kamera')));
  wrap.appendChild(tile('pin','Blok adı yanlış görünüyor',
    'Adresleri telefonunuzdan düzeltebilir, ekleyebilir ve gizleyebilirsiniz. Detay:',
    ()=>openHelp('adres')));
  wrap.appendChild(tile('db','Veriler nerede ve güvende mi?',
    'Yalnızca bu telefonda. Sunucuya gitmez. Yedek alma ve aktarım anlatımı:',
    ()=>openHelp('veri')));

  sec('Genel');
  [
    ['Bu uygulama tam olarak ne yapar?',
     '<p>Çinarköy\'deki blok ve daireleri listeler, plaka okutarak gelen kuryenin kim olduğunu bulur, '
     +'giriş kaydı tutar ve bu kayıtları raporlar. Ayrıca plakayı kurye adıyla eşleştirip '
     +'listede tutar — ikinci kez aynı kurye geldiğinde adını otomatik yazar.</p>'],
    ['Uygulama neler YAPMAZ?',
     '<p><span class="no">Yapmadıkları:</span> kamerayı sürekli kaydetmez, konum takibi yapmaz, '
     +'internet üzerinden veri göndermez, para ödemesi almaz, üyelik gerektirmez, '
     +'kamerayla plaka okutmak dışında fotoğraf saklamaz.</p>'
     +'<p>Plaka tanıma <b>optik karakter tanıma</b>dır; bir fotoğrafın okunabilmesi için '
     +'plakanın net ve aydınlık olması gerekir. Okuma zayıfsa uygulama bunu açıkça söyler '
     +'ve elle düzeltmenizi ister — sessizce yanlış kaydetmez.</p>'],
    ['İnternet gerekli mi?',
     '<p><span class="ok">Hayır.</span> Kayıt, arama, kurye listesi, rapor ve plan tamamen '
     +'çevrimdışı çalışır. Yalnızca <b>plaka okutma</b> ve <b>sesli yazım</b> ilk kullanımda '
     +'tanıma motorunu internetten indirir, sonra önbellekten çalışır.</p>'],
    ['Verilerim güvende mi, biri görebilir mi?',
     '<p>Veriler yalnızca bu telefonun tarayıcısında saklanır. Hiçbir sunucuya yazılmaz, '
     +'internet bağlantısı üzerinden gönderilmez. Başka biri telefonu açıp kullanıyorsa '
     +'verileri görebilir — bu yüzden <b>Tam yedek al</b> dosyasını şifreli bir yere '
     +'koymanız önerilir.</p>'],
    ['Tarayıcı verilerini silersem ne olur?',
     '<p>Uygulama açık değilken tarayıcı önbelleğini temizlemek kayıtları siler. '
     +'Bu yüzden düzenli olarak <b>Tam yedek al</b> yapın.</p>']
  ].forEach(x=>wrap.appendChild(qa(x[0],x[1])));

  sec('Plaka');
  [
    ['Kamera açılmıyor / plaka okunmuyor ne yapmalıyım?',
     '<p>Uygulama dosya olarak açıldığında (<code>file://</code>) tarayıcı güvenlik kuralı '
     +'gereği kamerayı engeller. Bu bir arıza değil. <b>Çözüm:</b> uygulamayı bir '
     +'<b>https</b> adresine yükleyin (GitHub Pages, Netlify Drop gibi ücretsiz '
     +'hizmetler yeterlidir) ve oradan açın. Bu durumda kamera, mikrofon ve '
     +'otomatik kayıt özellikleri sorunsuz çalışır.</p>'
     +'<p>Dosya modundayken <b>Yaz</b> düğmesiyle plakayı elle girebilir, '
     +'uygulamanın geri kalanı aynen çalışır.</p>'],
    ['Okuduğu plaka yanlış çıkıyor',
     '<p>Ekranın altında <b>Diğer okumalar</b> başlığı altında 3 olası okuma listelenir — '
     +'doğrusuna bir dokunuşla geçebilirsiniz. Kırmızı uyarı çıktıysa okama güvenilmemiştir; '
     +'plaka alanına dokunup elle doğrusunu yazın.</p>'
     +'<p>En iyi sonuç için telefonu sabit tutun, plakayı çerçeveye tam alın ve '
     +'gün ışığında düz açıyla çekin.</p>'],
    ['Kurye adı neden otomatik gelmiyor?',
     '<p>Üç durumda olabilir: (1) plaka listede değil, (2) <b>Yeni plakayı öğren</b> '
     +'ayarı kapalı, (3) plaka kameradan zayıf okundu. Plaka listesine bakın; yoksa '
     +'kayıtta adı yazın, plaka o kuryeye bağlanır ve bir daha sorulmaz.</p>'],
    ['Firma adı nasıl giriliyor?',
     '<p>Kayıt ekranındaki firma alanına dokunun; hazır firmalar (Trendyol, Uber Eats, '
     +'Yemeksepeti, Paket Taxi, Migros, Getir) tek dokunuşla işaretlenir. Liste kapalıysa '
     +'kendi firmanızı yazabilirsiniz. Firma adı arama sonuçlarında da bulunur.</p>'],
    ['Aynı plaka iki kişiye bağlanır mı?',
     '<p>Hayır. Her plaka tek bir kuryeye bağlıdır. Aynı plaka ikinci bir adla '
     +'kaydedilirse mevcut kayıt güncellenir, kopya oluşmaz.</p>']
  ].forEach(x=>wrap.appendChild(qa(x[0],x[1])));

  sec('Adresler');
  [
    ['Blok adları doğru mu?',
     '<p>Uygulamaya gömülü liste bir görselden çıkarılmıştır ve <b>yanlış olabilir</b>. '
     +'<b>Ayarlar › Adresleri düzenle</b> ekranından adları, sokakları ve daire numaralarını '
     +'kendi bildiğiniz gibi düzeltebilirsiniz. Bu değişiklikler yalnızca bu telefonda '
     +'geçerlidir ve telefonlar arası aktarımda diğerlerini bozmaz.</p>'],
    ['Sokaklara göre nasıl filtrelerim?',
     '<p><b>Ara</b> sekmesinde blokların üstündeki çubuktan sokağı seçin. O sokağın blokları '
     +'kalır, arama da o sokakla daralır. Sokağı olmayan bloklar <b>Diğer</b> başlığı altında '
     +'toplanır. Arama kutusuna sokağın adını yazmak da aynı işi görür.</p>'],
    ['Daire numarası eksik / fazla ne yapayım?',
     '<p><b>Ayarlar › Adresler</b> ekranında bloğun <b>Daireler</b> düğmesine dokunun ve '
     +'tüm numaraları virgülle yazın. Liste tamamen değiştirilir, eksik olan eklenir, '
     +'olmayan silinir. <b>Blok / daire listesi</b> satırından tüm listeyi kopyalayıp '
     +'fotoğraflarla karşılaştırabilirsiniz.</p>'],
    ['Kullanmadığım bloğu kaldırabilir miyim?',
     '<p>Evet. Adresler ekranında <b>Gizle</b> deyin. Blok listeden, plandan ve aramadan '
     +'kalkar ama <b>geçmiş kayıtları silinmez</b>. Sonra <b>Göster</b> ile geri alınır.</p>']
  ].forEach(x=>wrap.appendChild(qa(x[0],x[1])));

  sec('Veri ve aktarım');
  [
    ['Kayıtlarımı nasıl yedeklerim?',
     '<p><b>Ayarlar › Veri &amp; Yedek › Tam yedek al</b> bir JSON dosyası indirir. '
     +'Dosyayı e-posta, bulut veya USB ile saklayın. Aynı dosyadan '
     +'<b>Dosyadan içe aktar</b> ile geri yükleyebilirsiniz.</p>'],
    ['Başka bir telefonla nasıl paylaşırım?',
     '<p><b>Veri Paketi</b> ekranından metin kodu oluşturup WhatsApp ile gönderin. '
     +'Karşı taraf <b>Al</b> dediğinde kayıtlar ve kuryeler birleşir. '
     +'Aynı kayıt iki kez gönderilse bile <b>mükerrer oluşmaz</b>. '
     +'Yalnızca yeni kayıtlar için <b>Delta</b> paketi çok daha küçüktür.</p>'],
    ['Bilinmeyen bir veri paketi alırsam ne olur?',
     '<p>Önce kaç kayıt ve kurye ekleneceği söylenir, onay istenir. Onaylarsanız '
     +'birleştirilir. Paket bozuksa hiçbir şey değişmez.</p>'],
    ['Verileri silmek istersem?',
     '<p>Ayarlar › Bakım › <b>Tüm verileri sil</b> iki kez onay ister ve kayıtları, '
     +'kuryeleri, eklediğiniz blokları siler. Bu geri alınamaz — önce yedek alın.</p>']
  ].forEach(x=>wrap.appendChild(qa(x[0],x[1])));

  sec('Ayarlar');
  [
    ['Ayar değişikliklerim kaydediliyor mu?',
     '<p><span class="ok">Evet.</span> Nöbetçi adı, ses, titreşim, hız, tüm anahtarlar, '
     +'adres listesi, kapı notları ve kurye listesi <code>localStorage</code> ile '
     +'telefonunuzda saklanır. Uygulamayı kapatıp açtığınızda aynı kalır. '
     +'Kapanmadan önce tarayıcının "kayıt sıfırla" gibi bir işlem yapmamanız yeterlidir.</p>'],
    ['Sesli okuma neden kapalı?',
     '<p>Sessiz ortamda rahatsız edebilsin diye <b>varsayılan kapalıdır</b>. '
     +'Ayarlardan açarsanız bulunan plakayı ve kaydı yüksek sesle okur. '
     +'Açtıktan sonra ayar kalıcıdır.</p>'],
    ['Sesli yazım (mikrofon) neden çalışmıyor?',
     '<p>Sesli yazım için <code>https</code> adres ve mikrofon izni gerekir. '
     +'Ayarlar › Sesli yazım › <b>Mikrofon çalışmıyorsa</b> satırı adım adım çözüm listeler. '
     +'<b>Yaz</b> düğmesi her zaman elle yazmak için çalışır.</p>']
  ].forEach(x=>wrap.appendChild(qa(x[0],x[1])));

  return wrap;
}
$('#rowFaq').onclick=()=>openHelp();
$('#rowTour').onclick=()=>{ closeHelp(); setTab('search'); toast('Ara sekmesinden başlayın: blok veya daire yazın','ok'); };
$('#rowSites').onclick=()=>openSiteMgr();
$$('[data-help]').forEach(b=>{ b.onclick=(e)=>{ e.stopPropagation(); openHelp(b.dataset.help); }; });
$('#helpPage').addEventListener('click',()=>{});


$('#rowAddSite').onclick=()=>{
  openForm({ title:'Yeni blok ekle', text:'Blok adını yazın. Daire numaralarını bir sonraki adımda eklersiniz.',
    fields:[{ id:'name', label:'Blok adı', value:'', placeholder:'Örn. Cevahir 563-20' }],
    ok:'Ekle', onOk:async v=>{
      const name=(v.name||'').trim(); if(!name){ toast('Blok adı girin','err'); return false; }
      const id=keyOf(name).replace(/[^a-z0-9]/g,'')+'-'+Math.random().toString(36).slice(2,5);
      const list=userSites(); list.push({ id:id, name:name, units:[] }); setUserSites(list);
      toast('Blok eklendi: '+name+' — daire numaralarını girin','ok'); sfx.ok();
      addUnitsFlow(id, name); return true; } });};
function addUnitsFlow(siteId, siteName){
  openForm({ title:'Daire numaraları', text:siteName+' — numaraları virgülle ayırarak yazın. Örn: A1, A2, B1, 12, 14',
    fields:[{ id:'u', label:'Daireler', type:'textarea', value:'' }],
    ok:'Kaydet', onOk:async v=>{
      const parts=String(v.u||'').split(/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]+/).map(x=>x.trim().toUpperCase()).filter(Boolean);
      if(!parts.length){ toast('En az bir daire girin','err'); return false; }
      const list=userSites(); const s=list.find(x=>x.id===siteId);
      if(s){ s.units=(s.units||[]).concat(parts.map(c=>({c:c,entry:''}))); setUserSites(list); }
      toast(parts.length+' daire eklendi','ok'); sfx.ok(); return true; } });
}
$('#rowAddUnit').onclick=()=>{
  openForm({ title:'Daire ekle / düzenle', text:'Bloğu seçin, sonra daire numarasını ve varsa kapı notunu girin.',
    fields:[{ id:'site', label:'Blok', type:'select', value:SITES[0]?SITES[0].id:'', options:SITES.map(s=>({v:s.id,t:s.name})) },
            { id:'unit', label:'Daire no', value:'' },{ id:'entry', label:'Kapı notu (örn: zemin kat, arka bahçe)', value:'' }],
    ok:'Kaydet', onOk:async v=>{
      const s=siteById(v.site); if(!s){ toast('Blok seçin','err'); return false; }
      const code=String(v.unit||'').trim().toUpperCase(); if(!code){ toast('Daire no girin','err'); return false; }
      const list=userSites(); let us=list.find(x=>x.id===s.id);
      if(!us){ us={ id:s.id, name:s.name, units:[] }; list.push(us); }
      const ex=(us.units||[]).find(u=>String(u.c).toUpperCase()===code);
      if(ex) ex.entry=v.entry||''; else us.units.push({ c:code, entry:v.entry||'' });
      setUserSites(list);
      if(v.entry) NOTES[s.id+'|'+code]=v.entry; else delete NOTES[s.id+'|'+code];
      saveNotes(); rebuild();
      toast(s.name+' '+code+' eklendi','ok'); sfx.ok(); return true; } });
};
let placing=null;
$('#rowPlace').onclick=()=>{
  const list=SITES.filter(s=>!s.box);
  if(!list.length){ toast('Tüm bloklar planda','ok'); return; }
  openForm({ title:'Plan üzerinde konumlandır', text:'Konumlanacak bloğu seçin, ardından planda bir noktaya dokunun.',
    fields:[{ id:'site', label:'Blok', type:'select', value:list[0].id, options:list.map(s=>({v:s.id,t:s.name})) }],
    ok:'Seç ve haritaya git', onOk:v=>{ placing=v.site; setTab('map');
      const s=siteById(v.site);
      $('#mapHint').innerHTML='<b>'+esc(s?s.name:'')+'</b> için planda bir noktaya dokunun.';
      toast('Planda konuma dokunun'); return true; } });
};
function placeAt(siteId, pt){
  const w=140,h=90,x=Math.max(4,Math.min(756,pt[0])),y=Math.max(4,Math.min(1229,pt[1]));
  const list=userSites(); let us=list.find(s=>s.id===siteId);
  if(!us){ us={ id:siteId, name:(siteById(siteId)||{}).name||siteId, units:[] }; list.push(us); }
  us.box=[Math.round(x),Math.round(y),w,h]; setUserSites(list);
  placing=null; $('#mapHint').textContent='Bir bloğa dokunun — gerçek yerleşim planı üzerinden.';
  $('#mapCaption').textContent='Bir parsele dokunup üniteyi seçin';
  toast('Konum kaydedildi — Veri Paketi ile arkadaşlarınıza gönderebilirsiniz','ok'); sfx.ok();
}

/* ---------------------------------------------------------------- 17. sekmeler */
function setTab(name){
  $$('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===name));
  $$('section').forEach(s=>s.classList.remove('active'));
  const el=$('#tab-'+name); if(el) el.classList.add('active');
  currentTabName=name; stopSpeak();
  if(name==='log') renderLog();
  if(name==='plate'){ renderCouriers(); renderLastPlates(); }
  if(name==='search') renderResults();
  if(name==='set') paintPrefs();
  window.scrollTo(0,0);
}
$$('.tab').forEach(t=>{ t.addEventListener('click', ()=>{ sfx.tap(); buzz(8); setTab(t.dataset.tab); }); });

/* ---------------------------------------------------------------- 18. ortam */
function checkEnv(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    const b=$('#banner');
    b.className='banner info'; b.style.display='flex';
    $('#bannerText').innerHTML='Mikrofon ve kamera bu açılışta kapalı görünüyor. <b>Dokunup yardım alın</b> — ya da plaka ve isimleri elle girin.';
    b.onclick=()=>sttHelp('Tarayıcı bu sayfada kamera/mikrofon erişimi vermiyor. Dosya olarak açılan uygulamalarda bu sınırlıdır.');
  }
  paintPrefs();
}

/* ---------------------------------------------------------------- 19. başlat */
(async function boot(){
  try{ await openDB(); }catch(e){ LS_MODE=true;
    setTimeout(()=>toast('Veritabanı açılamadı — kayıtlar tarayıcı belleğinde tutuluyor','err'),1800); }
  try{ const lg=await readLegacy(); if(lg.length){ const n=await migrateLegacy(lg); if(n) setTimeout(()=>toast(n+' eski kayıt aktarıldı','ok'),1400); } }catch(e){}
  rebuild(); await refresh(); populateLogFilter(); renderLog(); paintPrefs(); paintSyncState(); checkEnv();
  setInterval(tickClock,15000); tickClock();
  if(!P.guard) setTimeout(()=>openNameModal(false), 700);
  window.addEventListener('beforeunload', ()=>{ try{ speechSynthesis.cancel(); }catch(e){} });

/* ---------------------------------------------------------------- MAP ZOOM */
(function initMapZoom(){
  const frame = document.querySelector('.map-frame');
  const img = $('#mapImg');
  const svg = $('#hotspots');
  if(!frame || !img) return;

  let scale=1, minScale=0.5, maxScale=4;
  let posX=0, posY=0;
  let startDist=0, startScale=1;
  let lastTouchX=0, lastTouchY=0, lastTouchX2=0, lastTouchY2=0;
  let isPinching=false;

  function applyTransform(){
    const t='scale('+scale+') translate('+posX+'px,'+posY+'px)';
    img.style.transform=t; svg.style.transform=t;
    img.style.transformOrigin='0 0'; svg.style.transformOrigin='0 0';
  }

  function clamp(v,mn,mx){ return Math.min(mx,Math.max(mn,v)); }

  function zoomTo(newScale, cx, cy){
    const rect=frame.getBoundingClientRect();
    const ox = (cx-rect.left)/scale - posX;
    const oy = (cy-rect.top)/scale - posY;
    scale = clamp(newScale, minScale, maxScale);
    posX = (cx-rect.left)/scale - ox;
    posY = (cy-rect.top)/scale - oy;
    applyTransform();
  }

  // Buttons
  const inBtn=$('#mapZoomIn'), outBtn=$('#mapZoomOut'), resetBtn=$('#mapZoomReset');
  if(inBtn) inBtn.addEventListener('click',()=>{ const r=frame.getBoundingClientRect(); zoomTo(scale*1.5,r.left+r.width/2,r.top+r.height/2); });
  if(outBtn) outBtn.addEventListener('click',()=>{ const r=frame.getBoundingClientRect(); zoomTo(scale/1.5,r.left+r.width/2,r.top+r.height/2); });
  if(resetBtn) resetBtn.addEventListener('click',()=>{ scale=1; posX=0; posY=0; applyTransform(); });

  // Mouse wheel zoom
  frame.addEventListener('wheel',e=>{ e.preventDefault(); const delta=e.deltaY<0?1.2:0.85; zoomTo(scale*delta,e.clientX,e.clientY); },{passive:false});

  // Touch pinch zoom
  frame.addEventListener('touchstart',e=>{
    if(e.touches.length===2){
      isPinching=true;
      const dx=e.touches[1].clientX-e.touches[0].clientX;
      const dy=e.touches[1].clientY-e.touches[0].clientY;
      startDist=Math.sqrt(dx*dx+dy*dy);
      startScale=scale;
      lastTouchX=(e.touches[0].clientX+e.touches[1].clientX)/2;
      lastTouchY=(e.touches[0].clientY+e.touches[1].clientY)/2;
    } else { isPinching=false; }
  },{passive:true});

  frame.addEventListener('touchmove',e=>{
    if(e.touches.length===2){
      e.preventDefault();
      const dx=e.touches[1].clientX-e.touches[0].clientX;
      const dy=e.touches[1].clientY-e.touches[0].clientY;
      const dist=Math.sqrt(dx*dx+dy*dy);
      const newScale=clamp(startScale*(dist/startDist),minScale,maxScale);
      const cx=(e.touches[0].clientX+e.touches[1].clientX)/2;
      const cy=(e.touches[0].clientY+e.touches[1].clientY)/2;
      zoomTo(newScale,cx,cy);
    }
  },{passive:false});

  frame.addEventListener('touchend',()=>{ isPinching=false; });
})();

})();