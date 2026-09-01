(function(){
  'use strict';

  const data = window.BB_MEETING_BUILDER_DATA;
  const root = document.querySelector('[data-meeting-builder]');
  if(!data || !root) return;

  const rawProgram = document.body.dataset.program;
  const program = rawProgram === 'elementary-middle' ? 'elementary' : rawProgram;
  const month = document.body.dataset.month;
  const key = `${program}:${month}`;
  const cfg = data.months[key];
  if(!cfg) return;

  const acts = data.activities;
  const storageKey = `bb-builder-v3:${key}`;
  let state = {welcome:[], main:[], close:[]};

  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if(saved) state = {...state, ...saved};
  } catch(e) {}

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c]));

  const bucketFor = id =>
    acts[id]?.type === 'welcome'
      ? 'welcome'
      : acts[id]?.type === 'close'
        ? 'close'
        : 'main';

  const selected = id => state[bucketFor(id)].includes(id);
  const planIds = () => [...state.welcome, ...state.main, ...state.close];

  const save = () => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch(e) {}
  };

  const sourceIsHub = a =>
    /Teacher Hub/i.test(a.source_kind || '') ||
    /Teacher Hub/i.test(a.source || '');

  function minutesTotal(ids = planIds()){
    return ids.reduce(
      (sum,id) => sum + (Number(acts[id]?.minutes) || 0),
      0
    );
  }

  function planStatus(total, count){
    if(!count) return null;

    if(total < 24){
      return {
        label:`About ${total} min`,
        tone:'short',
        message:'You have room for a little more if you want it. You do not need to fill every minute.'
      };
    }

    if(total <= 35){
      return {
        label:`About ${total} min`,
        tone:'complete',
        message:'This is a complete gathering.'
      };
    }

    return {
      label:`About ${total} min`,
      tone:'long',
      message:'This is a longer gathering. Remove an activity if you are aiming for about 30 minutes.'
    };
  }

  function stageLabel(type){
    return type === 'welcome'
      ? 'Welcome'
      : type === 'close'
        ? 'Close'
        : 'Main';
  }

  function quickSteps(a){
    const steps = Array.isArray(a.steps) ? a.steps : [];

    return steps.length
      ? `<ol class="choice-steps">
          ${steps.map(s => `<li>${esc(s)}</li>`).join('')}
        </ol>`
      : '';
  }

  function choice(id){
    const a = acts[id];
    if(!a) return '';

    const sel = selected(id);
    const mainAlreadyChosen =
      a.type === 'main' &&
      state.main.length >= 1 &&
      !sel;

    const buttonText = sel
      ? 'Remove'
      : mainAlreadyChosen
        ? 'Add as extra'
        : 'Add to meeting';

    const hub = sourceIsHub(a);

    return `
      <article
        class="choice-card${sel ? ' selected' : ''}"
        data-choice-card="${esc(id)}"
      >
        <div class="choice-card-head">
          <h4>${esc(a.title)}</h4>
          ${sel ? '<span class="selected-chip">Selected</span>' : ''}
        </div>

        <p class="choice-summary">
          ${esc(a.summary || '')}
        </p>

        <div class="choice-meta" aria-label="Activity details">
          <span>${esc(a.official)}</span>
          <span>${esc(a.prep)}</span>
          <span>${esc(a.space)}</span>
        </div>

        <details class="choice-details">
          <summary>How it works</summary>

          <div class="choice-details-body">
            ${quickSteps(a)}

            <div class="participation-note">
              <strong>Ways to join in</strong>
              <p>${esc(a.participation || a.modes || '')}</p>
            </div>

            <div class="source-row">
              <span class="source-chip${hub ? ' hub' : ''}">
                ${esc(a.source_kind || 'Best Buddies resource')}
              </span>

              <small>${esc(a.source)}</small>

              ${
                a.url
                  ? `<a
                      class="choice-link"
                      href="${esc(a.url)}"
                      target="_blank"
                      rel="noopener"
                    >
                      Open original ↗
                    </a>`
                  : ''
              }
            </div>

            ${
              a.source_note
                ? `<p class="source-note">${esc(a.source_note)}</p>`
                : ''
            }
          </div>
        </details>

        <button
          class="choice-action"
          type="button"
          data-toggle-choice="${esc(id)}"
        >
          ${esc(buttonText)}
        </button>
      </article>
    `;
  }

  function renderStage(num, title, help, ids){
    return `
      <section class="builder-stage">
        <div class="builder-stage-head">
          <span class="builder-stage-num">${num}</span>

          <div>
            <h3>${esc(title)}</h3>
            <p>${esc(help)}</p>
          </div>
        </div>

        <div class="choice-grid">
          ${ids.map(choice).join('')}
        </div>
      </section>
    `;
  }

  function renderPlanItem(id){
    const a = acts[id];
    if(!a) return '';

    const label = stageLabel(bucketFor(id));

    return `
      <article class="plan-item">
        <div class="plan-item-top">
          <small>${label}</small>
          <strong>${esc(a.title)}</strong>
          <span>${esc(a.official)}</span>
        </div>

        <p class="plan-item-summary">
          ${esc(a.summary || '')}
        </p>

        ${quickSteps(a)}

        <div class="plan-participation">
          <strong>Ways to join in</strong>
          <p>${esc(a.participation || a.modes || '')}</p>
        </div>

        <div class="plan-materials">
          <strong>What you need:</strong>
          ${esc(a.prep)}
          ·
          <strong>Space:</strong>
          ${esc(a.space)}
        </div>

        <div class="plan-source">
          <span>${esc(a.source)}</span>

          ${
            a.url
              ? `<a
                  href="${esc(a.url)}"
                  target="_blank"
                  rel="noopener"
                >
                  Original source ↗
                </a>`
              : ''
          }
        </div>
      </article>
    `;
  }

  function planMarkup(){
    const ids = planIds();
    if(!ids.length) return '';

    const stat = planStatus(
      minutesTotal(ids),
      ids.length
    );

    return `
      <div class="builder-plan-wrap">
        <section
          class="plan-board"
          aria-live="polite"
        >
          <div class="plan-board-top">
            <div>
              <span class="plan-board-kicker">
                Ready to use
              </span>

              <h3>Your plan</h3>
            </div>

            <span
              class="plan-time"
              data-tone="${esc(stat.tone)}"
            >
              ${esc(stat.label)}
            </span>
          </div>

          <p class="plan-note">
            ${esc(stat.message)}
          </p>

          <div class="plan-items">
            ${ids.map(renderPlanItem).join('')}
          </div>

          <div class="plan-actions">
            <button
              class="print"
              type="button"
              data-print
            >
              Print / save
            </button>

            <button
              class="change"
              type="button"
              data-custom-open
            >
              Change this plan
            </button>

            <button
              class="clear"
              type="button"
              data-clear
            >
              Clear
            </button>
          </div>
        </section>
      </div>
    `;
  }

  function render(){
    const hasPlan = planIds().length > 0;

    root.innerHTML = `
      <div class="builder-wrap">

        <div class="builder-intro">
          <div>
            <span class="builder-kicker">
              Plan a gathering
            </span>

            <h2>Meeting coming up?</h2>

            <p>
              Start with one easy plan and use it as-is,
              or swap in something that fits your group better.
            </p>
          </div>

          <p class="builder-access-note">
            <strong>
              Participation can look different for everyone.
            </strong>
            Speaking, signing, AAC, pointing, drawing,
            moving, staying seated, buddy support,
            another role, watching first, or passing
            can all count.
          </p>
        </div>

        <div class="builder-start">
          <button
            class="builder-button primary"
            type="button"
            data-preset
          >
            Give me a 30-minute plan
          </button>

          ${
            hasPlan
              ? `<button
                  class="builder-button secondary"
                  type="button"
                  data-clear
                >
                  Start over
                </button>`
              : ''
          }
        </div>

        ${planMarkup()}

        <details class="builder-custom">
          <summary>
            Build my own
            <span>
              Choose a welcome, one main activity,
              and a wrap-up.
            </span>
          </summary>

          <div class="builder-stages">

            ${renderStage(
              1,
              'Welcome',
              'About five minutes. Easy to enter, easy to pass.',
              cfg.welcome
            )}

            ${renderStage(
              2,
              'Main activity',
              'Choose one for a ~30-minute gathering. Add another only if you have extra time.',
              cfg.main
            )}

            ${renderStage(
              3,
              'Close',
              'Use the last few minutes to notice what worked or shape what comes next.',
              cfg.close
            )}

          </div>
        </details>

      </div>
    `;
  }

  function toggle(id){
    const b = bucketFor(id);
    const exists = state[b].includes(id);

    if(exists){
      state[b] =
        state[b].filter(x => x !== id);

    } else if(
      b === 'welcome' ||
      b === 'close'
    ){
      state[b] = [id];

    } else {
      if(state.main.length >= 2){
        state.main.shift();
      }

      state.main.push(id);
    }

    save();
    render();

    const custom =
      root.querySelector('.builder-custom');

    if(custom){
      custom.open = true;
    }
  }

  root.addEventListener('click', e => {
    const t = e.target.closest(
      '[data-toggle-choice],' +
      '[data-preset],' +
      '[data-clear],' +
      '[data-print],' +
      '[data-custom-open]'
    );

    if(!t) return;

    if(t.matches('[data-toggle-choice]')){
      toggle(t.dataset.toggleChoice);
      return;
    }

    if(t.matches('[data-preset]')){
      state = {
        welcome:[],
        main:[],
        close:[]
      };

      cfg.preset.forEach(id => {
        const b = bucketFor(id);

        if(
          b === 'welcome' ||
          b === 'close'
        ){
          state[b] = [id];
        } else {
          state.main = [id];
        }
      });

      save();
      render();

      requestAnimationFrame(() =>
        root
          .querySelector('.plan-board')
          ?.scrollIntoView({
            block:'nearest'
          })
      );

      return;
    }

    if(t.matches('[data-clear]')){
      state = {
        welcome:[],
        main:[],
        close:[]
      };

      save();
      render();
      return;
    }

    if(t.matches('[data-print]')){
      window.print();
      return;
    }

    if(t.matches('[data-custom-open]')){
      const custom =
        root.querySelector('.builder-custom');

      if(custom){
        custom.open = true;

        custom.scrollIntoView({
          block:'start'
        });
      }
    }
  });

  render();

})();
