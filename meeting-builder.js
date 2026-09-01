(function(){
  'use strict';
  const data = window.BB_MEETING_BUILDER_DATA;
  const root = document.querySelector('[data-meeting-builder]');
  if(!data || !root) return;

  const program = document.body.dataset.program;
  const month = document.body.dataset.month;
  const key = `${program}:${month}`;
  const cfg = data.months[key];
  if(!cfg) return;

  const acts = data.activities;
  const storageKey = `bb-builder-v2:${key}`;
  let state = {welcome:[], main:[], close:[]};
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if(saved) state = {...state, ...saved};
  } catch(e) {}

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bucketFor = id => acts[id]?.type === 'welcome' ? 'welcome' : acts[id]?.type === 'close' ? 'close' : 'main';
  const selected = id => state[bucketFor(id)].includes(id);
  const planIds = () => [...state.welcome, ...state.main, ...state.close];
  const save = () => { try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch(e) {} };
  const sourceIsHub = a => /Teacher Hub/i.test(a.source_kind || '') || /Teacher Hub/i.test(a.source || '');

  function minutesTotal(ids=planIds()){
    return ids.reduce((sum,id)=>sum+(Number(acts[id]?.minutes)||0),0);
  }

  function planStatus(total, count){
    if(!count) return {label:'Start choosing above', tone:'empty', message:'Pick one welcome, one main activity, and one close.'};
    if(total < 24) return {label:`About ${total} min`, tone:'short', message:'You have room for a little more if you want it. You do not need to fill every minute.'};
    if(total <= 35) return {label:`About ${total} min`, tone:'complete', message:'This is a complete gathering. Add another main activity only if you have extra time.'};
    return {label:`About ${total} min`, tone:'long', message:'You have built a longer gathering. Remove an activity if you are aiming for about 30 minutes.'};
  }

  function stageLabel(type){ return type==='welcome' ? 'Welcome' : type==='close' ? 'Close' : 'Main activity'; }

  function quickSteps(a){
    const steps = Array.isArray(a.steps) ? a.steps : [];
    return steps.length ? `<ol class="choice-steps">${steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>` : '';
  }

  function choice(id){
    const a = acts[id];
    if(!a) return '';
    const sel = selected(id);
    const mainAlreadyChosen = a.type === 'main' && state.main.length >= 1 && !sel;
    const buttonText = sel ? 'Remove from my meeting' : (mainAlreadyChosen ? 'Add if I have extra time' : 'Add to my meeting');
    const hub = sourceIsHub(a);
    return `<article class="choice-card${sel?' selected':''}" data-choice-card="${esc(id)}">
      <div class="choice-card-head">
        <h4>${esc(a.title)}</h4>
        ${sel?'<span class="selected-chip">✓ Selected</span>':''}
      </div>
      <p class="choice-summary">${esc(a.summary || '')}</p>
      <div class="choice-meta" aria-label="Activity details">
        <span>${esc(a.official)}</span>
        <span>${esc(a.prep)}</span>
        <span>${esc(a.space)}</span>
      </div>
      <details class="choice-details">
        <summary>How it works</summary>
        <div class="choice-details-body">
          ${quickSteps(a)}
          <div class="participation-note"><strong>Make it work for your group</strong><p>${esc(a.participation || a.modes || '')}</p></div>
          <div class="source-row">
            <div><span class="source-chip${hub?' hub':''}">${esc(a.source_kind || 'Official Best Buddies resource')}</span><small>${esc(a.source)}</small></div>
            ${a.url?`<a class="choice-link" href="${esc(a.url)}" target="_blank" rel="noopener">Open original ↗</a>`:''}
          </div>
          ${a.source_note?`<p class="source-note">${esc(a.source_note)}</p>`:''}
        </div>
      </details>
      <button class="choice-action" type="button" data-toggle-choice="${esc(id)}">${esc(buttonText)}</button>
    </article>`;
  }

  function renderStage(num,title,help,ids){
    return `<section class="builder-stage">
      <div class="builder-stage-head"><span class="builder-stage-num">${num}</span><div><h3>${esc(title)}</h3><p>${esc(help)}</p></div></div>
      <div class="choice-grid">${ids.map(choice).join('')}</div>
    </section>`;
  }

  function renderPlanItem(id){
    const a=acts[id]; if(!a) return '';
    const label=stageLabel(bucketFor(id));
    return `<article class="plan-item">
      <div class="plan-item-top"><small>${label}</small><strong>${esc(a.title)}</strong><span>${esc(a.official)}</span></div>
      <p class="plan-item-summary">${esc(a.summary || '')}</p>
      ${quickSteps(a)}
      <div class="plan-participation"><strong>Participation</strong><p>${esc(a.participation || a.modes || '')}</p></div>
      <div class="plan-materials"><strong>Have ready:</strong> ${esc(a.prep)} <span aria-hidden="true">·</span> <strong>Space:</strong> ${esc(a.space)}</div>
      <div class="plan-source"><span>${esc(a.source)}</span>${a.url?`<a href="${esc(a.url)}" target="_blank" rel="noopener">Original source ↗</a>`:''}</div>
    </article>`;
  }

  function renderPlan(){
    const ids=planIds();
    const total=minutesTotal(ids);
    const stat=planStatus(total,ids.length);
    const time=root.querySelector('[data-plan-time]');
    const msg=root.querySelector('[data-plan-message]');
    const items=root.querySelector('[data-plan-items]');
    if(!time || !msg || !items) return;
    time.textContent=stat.label;
    time.dataset.tone=stat.tone;
    msg.textContent=stat.message;
    items.innerHTML=ids.length ? ids.map(renderPlanItem).join('') : '<div class="plan-empty">Choose a welcome, one main activity, and a close. Your run-ready plan will build here.</div>';
  }

  function render(){
    root.innerHTML=`<div class="builder-wrap">
      <div class="builder-top">
        <div>
          <span class="builder-kicker">Build a meeting</span>
          <h2>Three picks. <span>Done.</span></h2>
          <p>Choose a welcome, one main activity, and a close. These choices lean on the Best Buddies Canada Program Guide, Activity Guides, Non-Verbal Activity Guide, workbook, and Program Calendar.</p>
        </div>
        <aside class="builder-rule">
          <strong>Everyone can take part in the way that works best for them.</strong>
          <p>Speaking, signing, pointing, AAC, drawing, writing, gesture, moving, staying seated, buddy support, another role, watching first, or passing can all be meaningful participation.</p>
        </aside>
      </div>
      <div class="builder-controls">
        <button class="builder-button primary" type="button" data-preset>Just give me a ~30-minute plan</button>
        <button class="builder-button secondary" type="button" data-clear>Start over</button>
      </div>
      ${renderStage(1,'Pick a welcome','About five minutes. Keep it easy to enter and easy to pass.',cfg.welcome)}
      ${renderStage(2,'Pick one main activity','For a ~30-minute gathering, choose ONE. Add a second only if you have extra time.',cfg.main)}
      ${renderStage(3,'Pick a close','Use the last few minutes to notice what worked or let members shape what comes next.',cfg.close)}
      <section class="plan-board" aria-live="polite">
        <div class="plan-board-top"><div><span class="plan-board-kicker">Ready to run</span><h3>Your meeting</h3></div><span class="plan-time" data-plan-time></span></div>
        <p class="plan-note" data-plan-message></p>
        <div class="plan-items" data-plan-items></div>
        <div class="plan-actions"><button class="print" type="button" data-print>Print this plan</button><button class="clear" type="button" data-clear>Clear plan</button></div>
      </section>
    </div>`;
    renderPlan();
  }

  function toggle(id){
    const b=bucketFor(id);
    const exists=state[b].includes(id);
    if(exists){
      state[b]=state[b].filter(x=>x!==id);
    } else if(b==='welcome' || b==='close') {
      state[b]=[id];
    } else {
      if(state.main.length>=2) state.main.shift();
      state.main.push(id);
    }
    save(); render();
  }

  root.addEventListener('click',e=>{
    const t=e.target.closest('[data-toggle-choice],[data-preset],[data-clear],[data-print]');
    if(!t) return;
    if(t.matches('[data-toggle-choice]')) toggle(t.dataset.toggleChoice);
    else if(t.matches('[data-preset]')){
      state={welcome:[],main:[],close:[]};
      cfg.preset.forEach(id=>{
        const b=bucketFor(id);
        if((b==='welcome'||b==='close')) state[b]=[id]; else state.main=[id];
      });
      save(); render();
    }
    else if(t.matches('[data-clear]')){ state={welcome:[],main:[],close:[]}; save(); render(); }
    else if(t.matches('[data-print]')) window.print();
  });

  render();
})();
