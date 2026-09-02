/* =========================================================
   BUILD A GATHERING
   Best Buddies Canada Teacher Hub
   ========================================================= */

.gb-page{
  --gb-purple:#5A3F98;
  --gb-lilac:#9396CA;
  --gb-yellow:#FFD420;
  --gb-teal:#8FD1C4;
  --gb-orange:#F37735;
  --gb-ink:#1D1823;
  --gb-text:#514A58;
  --gb-soft:#F4F1F8;
  --gb-line:#E4DEE9;
  background:#fff;
  color:var(--gb-text);
}

/* HERO */
.gb-hero{
  padding:28px 0 66px;
  background:#fff;
}

.gb-back{
  display:inline-flex;
  min-height:36px;
  align-items:center;
  color:var(--gb-purple);
  font-size:.8rem;
  font-weight:850;
  text-decoration:none;
}

.gb-back:hover,
.gb-back:focus-visible{
  text-decoration:underline;
  text-underline-offset:3px;
}

.gb-hero-grid{
  display:grid;
  grid-template-columns:minmax(0,1.15fr) minmax(320px,.65fr);
  gap:clamp(50px,7vw,110px);
  align-items:end;
  padding-top:42px;
}

.gb-kicker{
  display:block;
  color:var(--gb-purple);
  font-size:.72rem;
  font-weight:900;
  letter-spacing:.078em;
  text-transform:uppercase;
}

.gb-hero h1{
  max-width:760px;
  margin:9px 0 0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(3.3rem,5.7vw,6rem);
  font-weight:850;
  line-height:.9;
  letter-spacing:-.045em;
}

.gb-hero h1 span{color:var(--gb-purple)}

.gb-hero h1::after{
  content:"";
  display:block;
  width:60px;
  height:7px;
  margin-top:24px;
  border-radius:999px;
  background:var(--gb-teal);
}

.gb-hero p{
  max-width:700px;
  margin:20px 0 0;
  font-size:1.02rem;
  line-height:1.62;
}

.gb-hero-note{
  padding:24px 25px;
  border-radius:22px 22px 48px 22px;
  background:var(--gb-soft);
  box-shadow:8px 8px 0 var(--gb-yellow);
}

.gb-hero-note strong{
  display:block;
  color:var(--gb-ink);
  font-size:.88rem;
  font-weight:900;
}

.gb-hero-note p{
  margin:7px 0 0;
  font-size:.8rem;
  line-height:1.5;
}

/* BUILDER FIELD */
.gb-builder-section{
  position:relative;
  padding:68px 0 90px;
  background:var(--gb-purple);
}

.gb-builder-section::before{
  content:"";
  position:absolute;
  left:0;right:0;top:-34px;
  height:36px;
  background:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 70' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath fill='%235A3F98' d='M0,37 C175,57 305,25 475,41 C650,57 780,28 950,42 C1120,56 1285,27 1440,44 L1440,70 L0,70 Z'/%3E%3C/svg%3E")
    center bottom/100% 100% no-repeat;
}

.gb-month-row{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:10px;
  margin-bottom:20px;
  color:#fff;
  font-size:.78rem;
  font-weight:850;
}

.gb-month-row select{
  min-height:44px;
  padding:8px 36px 8px 13px;
  border:0;
  border-radius:999px;
  background:#fff;
  color:var(--gb-ink);
  font:inherit;
  font-size:.8rem;
}

.gb-app{
  max-width:1120px;
  margin:0 auto;
}

.gb-panel{
  overflow:hidden;
  border-radius:28px 28px 66px 28px;
  background:#fff;
}

.gb-panel-head{
  padding:34px 36px 28px;
}

.gb-panel-head .gb-kicker{margin-bottom:8px}

.gb-panel-head h2{
  margin:0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(2.15rem,3.5vw,3.65rem);
  font-weight:850;
  line-height:.96;
  letter-spacing:-.03em;
}

.gb-panel-head p{
  max-width:700px;
  margin:12px 0 0;
  font-size:.9rem;
  line-height:1.55;
}

/* ENTRY: only two choices */
.gb-paths{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
  padding:0 36px 34px;
}

.gb-path{
  position:relative;
  min-height:190px;
  padding:28px 64px 28px 28px;
  border:0;
  border-radius:22px 22px 48px 22px;
  text-align:left;
  cursor:pointer;
  font:inherit;
}

.gb-path.guided{
  background:var(--gb-yellow);
  color:var(--gb-ink);
}

.gb-path.manual{
  background:var(--gb-teal);
  color:var(--gb-ink);
}

.gb-path small{
  display:block;
  margin-bottom:8px;
  color:var(--gb-purple);
  font-size:.68rem;
  font-weight:900;
  letter-spacing:.07em;
  text-transform:uppercase;
}

.gb-path strong{
  display:block;
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:1.75rem;
  font-weight:850;
  line-height:1;
}

.gb-path span{
  display:block;
  max-width:430px;
  margin-top:10px;
  font-size:.82rem;
  line-height:1.48;
}

.gb-path b{
  position:absolute;
  right:24px;
  bottom:24px;
  font-size:1.5rem;
}

.gb-quick{
  display:flex;
  justify-content:center;
  padding:0 36px 34px;
}

.gb-quick button{
  min-height:44px;
  border:0;
  background:transparent;
  color:var(--gb-purple);
  font:inherit;
  font-size:.78rem;
  font-weight:850;
  text-decoration:underline;
  text-underline-offset:3px;
  cursor:pointer;
}

/* WIZARD */
.gb-progress{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:7px;
  padding:0 36px 8px;
}

.gb-progress span{
  height:6px;
  border-radius:999px;
  background:#E6E0EB;
}

.gb-progress span.done{background:var(--gb-purple)}
.gb-progress span.current{background:var(--gb-yellow)}

.gb-question{
  padding:22px 36px 36px;
}

.gb-question-count{
  color:var(--gb-purple);
  font-size:.68rem;
  font-weight:900;
  letter-spacing:.07em;
  text-transform:uppercase;
}

.gb-question h3{
  max-width:760px;
  margin:8px 0 20px;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(1.8rem,3vw,2.8rem);
  font-weight:850;
  line-height:.98;
}

.gb-choice-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:11px;
}

.gb-choice{
  min-height:76px;
  display:flex;
  align-items:center;
  gap:12px;
  padding:15px 17px;
  border:2px solid var(--gb-line);
  border-radius:16px 16px 34px 16px;
  background:#fff;
  color:var(--gb-ink);
  text-align:left;
  cursor:pointer;
  font:inherit;
  font-size:.83rem;
  font-weight:800;
}

.gb-choice:hover,
.gb-choice:focus-visible{
  border-color:var(--gb-lilac);
}

.gb-choice.selected{
  border-color:var(--gb-purple);
  background:#F8F5FC;
  box-shadow:4px 4px 0 var(--gb-yellow);
}

.gb-choice input{
  width:20px;
  height:20px;
  flex:0 0 auto;
  accent-color:var(--gb-purple);
}

.gb-question-actions{
  display:flex;
  justify-content:space-between;
  gap:12px;
  margin-top:24px;
}

.gb-btn{
  min-height:46px;
  padding:10px 18px;
  border-radius:999px;
  font:inherit;
  font-size:.8rem;
  font-weight:900;
  cursor:pointer;
}

.gb-btn.primary{
  border:0;
  background:var(--gb-purple);
  color:#fff;
}

.gb-btn.secondary{
  border:1px solid #CBC3D5;
  background:#fff;
  color:var(--gb-purple);
}

/* GENERATED OPTIONS */
.gb-results{
  padding:0 36px 36px;
}

.gb-results-intro{
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:24px;
  padding:0 0 22px;
}

.gb-results-intro h3{
  margin:0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(1.9rem,3vw,2.8rem);
  font-weight:850;
  line-height:.98;
}

.gb-results-intro p{
  max-width:470px;
  margin:0;
  font-size:.8rem;
  line-height:1.48;
}

.gb-plan-options{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}

.gb-plan-option{
  overflow:hidden;
  border:1px solid var(--gb-line);
  border-radius:20px 20px 48px 20px;
  background:#fff;
}

.gb-plan-option:first-child{border-top:8px solid var(--gb-teal)}
.gb-plan-option:last-child{border-top:8px solid var(--gb-yellow)}

.gb-plan-option-head{
  padding:22px 22px 14px;
}

.gb-plan-option-head small{
  color:var(--gb-purple);
  font-size:.65rem;
  font-weight:900;
  letter-spacing:.07em;
  text-transform:uppercase;
}

.gb-plan-option-head h4{
  margin:5px 0 0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:1.55rem;
  font-weight:850;
  line-height:1;
}

.gb-plan-option-head p{
  margin:7px 0 0;
  font-size:.75rem;
  line-height:1.45;
}

.gb-plan-pieces{
  padding:0 22px 18px;
}

.gb-piece{
  display:grid;
  grid-template-columns:70px minmax(0,1fr) auto;
  gap:10px;
  align-items:start;
  padding:13px 0;
  border-top:1px solid var(--gb-line);
}

.gb-piece > small{
  color:var(--gb-purple);
  font-size:.62rem;
  font-weight:900;
  letter-spacing:.06em;
  text-transform:uppercase;
}

.gb-piece strong{
  display:block;
  color:var(--gb-ink);
  font-size:.82rem;
  font-weight:900;
}

.gb-piece p{
  margin:3px 0 0;
  font-size:.7rem;
  line-height:1.4;
}

.gb-piece-time{
  color:var(--gb-text);
  font-size:.65rem;
  font-weight:800;
}

.gb-use-plan{
  width:calc(100% - 44px);
  min-height:44px;
  margin:0 22px 22px;
  border:0;
  border-radius:999px;
  background:var(--gb-purple);
  color:#fff;
  font:inherit;
  font-size:.78rem;
  font-weight:900;
  cursor:pointer;
}

/* FINAL PLAN */
.gb-final{
  padding:0 36px 36px;
}

.gb-final-top{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:24px;
  padding:0 0 22px;
}

.gb-final h3{
  margin:0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(2.1rem,3.5vw,3.3rem);
  font-weight:850;
  line-height:.96;
}

.gb-total{
  flex:0 0 auto;
  padding:8px 12px;
  border-radius:999px;
  background:#F0ECF7;
  color:var(--gb-purple);
  font-size:.74rem;
  font-weight:900;
}

.gb-final-items{
  display:grid;
  gap:12px;
}

.gb-final-item{
  position:relative;
  padding:20px 130px 20px 20px;
  border:1px solid var(--gb-line);
  border-radius:17px 17px 38px 17px;
  background:#fff;
}

.gb-final-stage{
  display:block;
  margin-bottom:4px;
  color:var(--gb-purple);
  font-size:.63rem;
  font-weight:900;
  letter-spacing:.07em;
  text-transform:uppercase;
}

.gb-final-item h4{
  margin:0;
  color:var(--gb-ink);
  font-size:1rem;
  font-weight:900;
}

.gb-final-item > p{
  margin:6px 0 0;
  font-size:.77rem;
  line-height:1.47;
}

.gb-final-meta{
  margin-top:11px;
  color:var(--gb-text);
  font-size:.7rem;
  line-height:1.48;
}

.gb-final-meta strong{color:var(--gb-ink)}

.gb-final-steps{
  margin:12px 0 0;
  padding-left:20px;
  color:var(--gb-text);
  font-size:.72rem;
  line-height:1.45;
}

.gb-final-steps li{margin:4px 0}

.gb-participation{
  margin-top:13px;
  padding:11px 13px;
  border-left:5px solid var(--gb-teal);
  border-radius:0 12px 20px 0;
  background:#EBF7F4;
  color:#355F58;
  font-size:.72rem;
  line-height:1.45;
}

.gb-source{
  display:flex;
  flex-wrap:wrap;
  gap:7px 14px;
  margin-top:11px;
  color:#746C79;
  font-size:.66rem;
}

.gb-source a{
  color:var(--gb-purple);
  font-weight:850;
}

.gb-swap{
  position:absolute;
  right:18px;
  top:18px;
  min-height:38px;
  padding:7px 11px;
  border:1px solid #CEC6D7;
  border-radius:999px;
  background:#fff;
  color:var(--gb-purple);
  font:inherit;
  font-size:.68rem;
  font-weight:900;
  cursor:pointer;
}

.gb-final-actions{
  display:flex;
  flex-wrap:wrap;
  gap:9px;
  margin-top:20px;
}

.gb-final-actions button{
  min-height:44px;
  padding:9px 15px;
  border-radius:999px;
  font:inherit;
  font-size:.75rem;
  font-weight:900;
  cursor:pointer;
}

.gb-print,
.gb-email{
  border:0;
  background:var(--gb-purple);
  color:#fff;
}

.gb-edit,
.gb-restart{
  border:1px solid #CAC2D4;
  background:#fff;
  color:var(--gb-purple);
}

/* MANUAL */
.gb-manual{
  padding:0 36px 36px;
}

.gb-manual-intro{
  max-width:730px;
  margin-bottom:20px;
}

.gb-manual-intro h3{
  margin:0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:2rem;
  font-weight:850;
}

.gb-manual-intro p{
  margin:8px 0 0;
  font-size:.82rem;
  line-height:1.5;
}

.gb-manual-stage{
  margin-top:24px;
}

.gb-manual-stage h4{
  margin:0 0 10px;
  color:var(--gb-ink);
  font-size:.92rem;
  font-weight:900;
}

.gb-activity-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:10px;
}

.gb-activity{
  display:flex;
  flex-direction:column;
  min-height:170px;
  padding:15px;
  border:1px solid var(--gb-line);
  border-radius:15px 15px 34px 15px;
  background:#fff;
}

.gb-activity.selected{
  border:2px solid var(--gb-purple);
  padding:14px;
  box-shadow:4px 4px 0 var(--gb-yellow);
}

.gb-activity strong{
  display:block;
  color:var(--gb-ink);
  font-size:.82rem;
  font-weight:900;
}

.gb-activity p{
  margin:6px 0 10px;
  font-size:.69rem;
  line-height:1.42;
}

.gb-activity-meta{
  margin-top:auto;
  color:#746C79;
  font-size:.62rem;
  line-height:1.4;
}

.gb-activity button{
  min-height:38px;
  margin-top:10px;
  border:0;
  border-radius:999px;
  background:var(--gb-purple);
  color:#fff;
  font:inherit;
  font-size:.67rem;
  font-weight:900;
  cursor:pointer;
}

.gb-manual-plan{
  position:sticky;
  bottom:12px;
  z-index:4;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  margin-top:24px;
  padding:14px 16px;
  border-radius:16px;
  background:var(--gb-yellow);
  color:var(--gb-ink);
}

.gb-manual-plan strong{font-size:.8rem}
.gb-manual-plan span{font-size:.7rem}

.gb-manual-plan button{
  min-height:40px;
  padding:8px 14px;
  border:0;
  border-radius:999px;
  background:var(--gb-purple);
  color:#fff;
  font:inherit;
  font-size:.7rem;
  font-weight:900;
  cursor:pointer;
}

/* SOURCES */
.gb-source-band{
  padding:62px 0 68px;
  background:#fff;
}

.gb-source-inner{
  display:grid;
  grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);
  gap:60px;
  align-items:start;
}

.gb-source-band h2{
  margin:7px 0 0;
  color:var(--gb-ink);
  font-family:var(--display,"League Spartan",Arial,sans-serif);
  font-size:clamp(2rem,3vw,3rem);
  font-weight:850;
  line-height:.98;
}

.gb-source-band p{
  max-width:590px;
  margin:13px 0 0;
  font-size:.84rem;
  line-height:1.55;
}

.gb-source-links{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.gb-source-links a{
  min-height:66px;
  display:flex;
  align-items:center;
  padding:14px 16px;
  border-radius:14px 14px 30px 14px;
  background:var(--gb-soft);
  color:var(--gb-purple);
  font-size:.76rem;
  font-weight:900;
  text-decoration:none;
}

/* RESPONSIVE */
@media (max-width:900px){
  .gb-hero-grid,
  .gb-source-inner{
    grid-template-columns:1fr;
  }

  .gb-hero-note{max-width:700px}

  .gb-results-intro{
    align-items:flex-start;
    flex-direction:column;
  }

  .gb-activity-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}

@media (max-width:720px){
  .gb-hero{padding-bottom:54px}

  .gb-hero-grid{padding-top:30px}

  .gb-hero h1{
    font-size:clamp(3rem,14vw,4.2rem);
  }

  .gb-builder-section{
    padding:54px 0 66px;
  }

  .gb-month-row{
    justify-content:flex-start;
  }

  .gb-panel{
    border-radius:22px 22px 48px 22px;
  }

  .gb-panel-head,
  .gb-question,
  .gb-results,
  .gb-final,
  .gb-manual{
    padding-left:20px;
    padding-right:20px;
  }

  .gb-paths{
    grid-template-columns:1fr;
    padding:0 20px 26px;
  }

  .gb-quick{padding:0 20px 26px}

  .gb-progress{padding:0 20px 8px}

  .gb-choice-grid,
  .gb-plan-options,
  .gb-source-links{
    grid-template-columns:1fr;
  }

  .gb-activity-grid{grid-template-columns:1fr}

  .gb-final-item{
    padding:18px;
  }

  .gb-swap{
    position:static;
    margin-top:12px;
  }

  .gb-piece{
    grid-template-columns:62px minmax(0,1fr);
  }

  .gb-piece-time{
    grid-column:2;
  }

  .gb-question-actions{
    flex-wrap:wrap;
  }

  .gb-manual-plan{
    position:static;
    align-items:flex-start;
    flex-direction:column;
  }
}

@media print{
  .portal-header,
  .portal-footer,
  .gb-hero,
  .gb-month-row,
  .gb-source-band,
  .gb-panel-head,
  .gb-progress,
  .gb-final-actions,
  .gb-swap{
    display:none!important;
  }

  .gb-builder-section{
    padding:0;
    background:#fff!important;
  }

  .gb-panel{
    border-radius:0;
  }

  .gb-final{
    padding:0;
  }

  .gb-final-item{
    break-inside:avoid;
    border:1px solid #bbb;
  }

  body{background:#fff!important}
}

/* =========================================================
   REFINEMENT PASS · richer matching + participation detail
   ========================================================= */

.gb-progress{
  grid-template-columns:repeat(var(--gb-steps,5),1fr);
}

.gb-question-hint{
  max-width:760px;
  margin:-10px 0 20px;
  color:#6E6674;
  font-size:.76rem;
  line-height:1.48;
}

.gb-answer-summary{
  display:flex;
  flex-wrap:wrap;
  gap:7px;
  margin-top:17px;
}

.gb-answer-summary span{
  display:inline-flex;
  align-items:center;
  min-height:30px;
  padding:5px 10px;
  border-radius:999px;
  background:#F2EEF8;
  color:var(--gb-purple);
  font-size:.65rem;
  font-weight:850;
}

.gb-badges{
  display:flex;
  flex-wrap:wrap;
  gap:5px;
  margin-top:9px;
}

.gb-badge{
  display:inline-flex;
  align-items:center;
  min-height:25px;
  padding:4px 8px;
  border:1px solid #DED7E6;
  border-radius:999px;
  background:#FAF9FC;
  color:#514A58;
  font-size:.58rem;
  font-weight:800;
  line-height:1.15;
}

.gb-source-pill{
  display:inline-flex;
  align-items:center;
  width:max-content;
  max-width:100%;
  min-height:25px;
  padding:4px 8px;
  border-radius:999px;
  font-size:.56rem;
  font-weight:900;
  line-height:1.15;
}

.gb-source-pill.guide{
  background:#F0ECF7;
  color:var(--gb-purple);
}

.gb-source-pill.mixed{
  background:#E2F4EF;
  color:#286D63;
}

.gb-source-pill.hub{
  background:#FFF4B7;
  color:#6D5600;
}

.gb-piece{
  grid-template-columns:68px minmax(0,1fr) auto;
}

.gb-piece-copy{
  min-width:0;
}

.gb-piece-copy .gb-badges{
  margin-top:7px;
}

.gb-piece-why{
  display:block;
  margin-top:8px;
  color:#5D5267;
  font-size:.63rem;
  line-height:1.4;
}

.gb-piece-why strong{
  display:inline;
  color:var(--gb-purple);
  font-size:inherit;
}

.gb-plan-option-head p strong{
  color:var(--gb-ink);
}

.gb-final-plan-note{
  max-width:650px;
  margin:7px 0 0;
  font-size:.75rem;
  line-height:1.45;
}

.gb-final-item .gb-badges{
  margin-top:10px;
}

.gb-fit-reason{
  margin-top:11px;
  padding:9px 11px;
  border-radius:11px;
  background:#F5F1FA;
  color:#5A5063;
  font-size:.68rem;
  line-height:1.42;
}

.gb-fit-reason strong{
  color:var(--gb-purple);
}

.gb-watch,
.gb-card-watch{
  margin-top:11px;
  padding:9px 11px;
  border-radius:11px;
  background:#FFF7D1;
  color:#65551B;
  font-size:.66rem;
  line-height:1.42;
}

.gb-watch strong{
  color:#4C4016;
}

.gb-access-detail{
  margin-top:13px;
  border:1px solid #CFE8E2;
  border-radius:13px 13px 24px 13px;
  background:#EFF8F6;
}

.gb-access-detail summary{
  min-height:42px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding:9px 12px;
  color:#275F58;
  font-size:.7rem;
  font-weight:900;
  cursor:pointer;
  list-style:none;
}

.gb-access-detail summary::-webkit-details-marker{display:none}

.gb-access-detail summary::after{
  content:"+";
  flex:0 0 auto;
  color:var(--gb-purple);
  font-size:1rem;
  line-height:1;
}

.gb-access-detail[open] summary::after{content:"−"}

.gb-access-detail > p{
  margin:0;
  padding:0 12px 11px;
  color:#385E59;
  font-size:.69rem;
  line-height:1.5;
}

.gb-fidelity-row{
  display:flex;
  flex-wrap:wrap;
  align-items:flex-start;
  gap:7px 10px;
  padding:10px 12px 12px;
  border-top:1px solid #D6ECE7;
  color:#665F6C;
  font-size:.6rem;
  line-height:1.42;
}

.gb-fidelity-row > span:last-child{
  flex:1 1 320px;
}

.gb-source strong{
  color:#5A5260;
}

.gb-manual-stage-head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:22px;
  margin-bottom:10px;
}

.gb-manual-stage-head h4{
  margin:0;
}

.gb-manual-stage-head p{
  max-width:540px;
  margin:0;
  color:#716A77;
  font-size:.68rem;
  line-height:1.4;
  text-align:right;
}

.gb-activity{
  min-height:250px;
}

.gb-activity-source{
  min-height:28px;
  margin-bottom:8px;
}

.gb-activity .gb-badges{
  margin:0 0 9px;
}

.gb-activity-meta{
  display:flex;
  flex-wrap:wrap;
  gap:5px 8px;
  margin-top:auto;
  padding-top:4px;
}

.gb-activity-meta span{
  display:inline-block;
}

.gb-card-watch{
  margin:0 0 9px;
  font-size:.6rem;
}

.gb-card-detail{
  margin-top:9px;
  border-top:1px solid var(--gb-line);
  padding-top:8px;
}

.gb-card-detail summary{
  min-height:34px;
  display:flex;
  align-items:center;
  color:var(--gb-purple);
  font-size:.63rem;
  font-weight:900;
  cursor:pointer;
  list-style:none;
}

.gb-card-detail summary::-webkit-details-marker{display:none}
.gb-card-detail summary::after{content:" +";margin-left:4px}
.gb-card-detail[open] summary::after{content:" −"}

.gb-card-detail p{
  margin:5px 0 0;
  color:#5D5662;
  font-size:.63rem;
  line-height:1.45;
}

.gb-card-detail small{
  display:block;
  margin-top:6px;
  color:#77707D;
  font-size:.57rem;
  line-height:1.4;
}

.gb-card-detail a{
  display:inline-block;
  margin-top:7px;
  color:var(--gb-purple);
  font-size:.6rem;
  font-weight:900;
}

.gb-activity button{
  margin-top:12px;
}

@media (max-width:720px){
  .gb-manual-stage-head{
    align-items:flex-start;
    flex-direction:column;
    gap:5px;
  }

  .gb-manual-stage-head p{
    text-align:left;
  }

  .gb-piece{
    grid-template-columns:58px minmax(0,1fr);
  }

  .gb-piece-time{
    grid-column:2;
    margin-top:2px;
  }

  .gb-badge{
    font-size:.56rem;
  }
}

@media print{
  .gb-access-detail{
    border:1px solid #bbb;
    background:#fff!important;
  }

  .gb-access-detail summary{
    padding:8px 0 4px;
    color:#111;
  }

  .gb-access-detail summary::after{display:none}

  .gb-access-detail > p,
  .gb-fidelity-row{
    color:#222;
  }

  .gb-source-pill{
    border:1px solid #aaa;
    background:#fff!important;
    color:#111!important;
  }

  .gb-badge{
    background:#fff!important;
    border-color:#aaa;
    color:#222;
  }

  .gb-watch,
  .gb-fit-reason{
    background:#fff!important;
    border:1px solid #bbb;
  }
}


/* =========================================================
   V2 — PDF-ALIGNED GATHERING BUILDER
   ========================================================= */

/* Keep the source explanation present, but quieter and more human. */
.gb-page .gb-hero-grid{
  grid-template-columns:minmax(0,1.15fr) minmax(300px,.62fr);
}

.gb-page .gb-hero-note{
  box-shadow:none;
  border-left:7px solid var(--gb-yellow);
  border-radius:0 18px 34px 0;
  background:#F7F4FA;
}

/* Official session labels should read like the guide, not software metadata. */
.gb-page .gb-final-stage,
.gb-page .gb-piece > small{
  color:var(--gb-purple);
  font-weight:900;
  letter-spacing:.055em;
  text-transform:uppercase;
}

.gb-page .gb-final-stage{
  font-size:.66rem;
}

/* Reduce the 'algorithm explaining itself' feel. */
.gb-page .gb-final .gb-fit-reason{
  display:none !important;
}

/* Make source labels supportive rather than pill-heavy. */
.gb-page .gb-fidelity-row{
  align-items:flex-start;
}

.gb-page .gb-source-pill{
  border-radius:7px;
  padding:4px 7px;
  font-size:.59rem;
}

/* Quieter end of page: Resource Hub is now the canonical library. */
.gb-resource-exit{
  padding:30px 0 34px;
  background:#fff;
}

.gb-resource-exit-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:28px;
  padding-top:24px;
  border-top:1px solid var(--gb-line);
}

.gb-resource-exit-inner strong{
  display:block;
  max-width:700px;
  margin-top:5px;
  color:var(--gb-ink);
  font-size:.88rem;
  font-weight:900;
}

.gb-resource-exit-inner a{
  flex:0 0 auto;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:44px;
  padding:10px 16px;
  border-radius:999px;
  background:var(--gb-purple);
  color:#fff;
  font-size:.75rem;
  font-weight:900;
  text-decoration:none;
}

/* Manual build now visibly follows the four Program Guide parts. */
.gb-page .gb-manual-stage{
  border-top:1px solid var(--gb-line);
  padding-top:24px;
}

.gb-page .gb-manual-stage:first-of-type{
  border-top:0;
}

@media(max-width:760px){
  .gb-page .gb-hero-grid{
    grid-template-columns:1fr;
  }

  .gb-resource-exit-inner{
    align-items:flex-start;
    flex-direction:column;
  }
}
