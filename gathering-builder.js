(() => {
  "use strict";

  const root = document.querySelector("[data-gathering-builder]");
  const monthSelect = document.querySelector("[data-gb-month]");
  const data =
    (typeof BB_MEETING_BUILDER_DATA !== "undefined" ? BB_MEETING_BUILDER_DATA : null) ||
    window.BB_MEETING_BUILDER_DATA;

  if (!root || !monthSelect) return;

  if (!data?.activities || !data?.months) {
    root.innerHTML = `
      <section class="gb-panel">
        <div class="gb-panel-head">
          <span class="gb-kicker">Planner setup</span>
          <h2>We couldn’t load the activity bank.</h2>
          <p>Please check that <strong>meeting-builder-data.js</strong> loads before <strong>gathering-builder.js</strong>.</p>
        </div>
      </section>`;
    return;
  }

  if (!window.BB_MEETING_BUILDER_DATA) window.BB_MEETING_BUILDER_DATA = data;

  const acts = data.activities;
  const months = data.months;
  const PROGRAM_GUIDE = "https://drive.google.com/file/d/1Wl6fB-vg2FlNzpQPuPY_LG9j1gj1mGJx/view?usp=drive_link";

  /* ---------------------------------------------------------
     Small Teacher Hub planning prompts.
     These are deliberately labelled as Hub suggestions, not
     Best Buddies Program Guide activities.
     --------------------------------------------------------- */
  const hubActivities = {
    "hub-looking-forward": {
      title: "Something I’m looking forward to",
      type: "welcome",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "No special prep",
      space: "Any room",
      summary: "Open with one easy prompt about something members are looking forward to.",
      steps: [
        "Ask one simple question: “What’s something you’re looking forward to?”",
        "Offer a few examples or visible choices if that makes the question easier to enter.",
        "Invite people to answer in the way that works for them. Passing is okay."
      ],
      participation: "Speak, sign, point, use a communication device, draw, gesture, work with a buddy, or pass.",
      builder: {
        stage: "share",
        traits: ["noPrep","seated","lowMovement","multimodal","choice","passAllowed","lowReading","lowPressure","know"],
        badges: ["No prep","Can be done seated","Different ways to respond","Passing is okay"]
      }
    },
    "hub-this-or-that": {
      title: "This or That Check-In",
      type: "welcome",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "Two simple choices",
      space: "Any room",
      summary: "Use a few light either-or choices to get everyone responding without putting anyone on the spot.",
      steps: [
        "Offer two choices at a time, such as music or movies, indoors or outdoors, sweet or salty.",
        "Members can answer by moving, pointing, holding up a card, signing, speaking, or using a communication device.",
        "Keep it quick. Two or three prompts is plenty."
      ],
      participation: "Use movement, pointing, cards, speech, sign, a communication device, gesture, a buddy, or passing.",
      builder: {
        stage: "share",
        traits: ["noPrep","multimodal","choice","visual","lowPressure","passAllowed","fun","know"],
        badges: ["Quick choices","Different ways to respond","Little reading or writing","Passing is okay"]
      }
    },
    "hub-one-word-picture": {
      title: "One word, picture, or gesture",
      type: "welcome",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "Optional picture or word choices",
      space: "Any room",
      summary: "Invite members to show how they’re arriving today with a word, picture, gesture, or another simple response.",
      steps: [
        "Ask: “How are you arriving today?”",
        "Offer a few words or pictures if useful.",
        "Keep responses brief and make listening or passing valid choices."
      ],
      participation: "Speak, point, choose a picture, sign, gesture, use a communication device, work with a buddy, or pass.",
      builder: {
        stage: "share",
        traits: ["seated","multimodal","visual","choice","passAllowed","lowPressure","lowReading"],
        badges: ["Visual choices work","Different ways to respond","Can be done seated","Passing is okay"]
      }
    },
    "hub-mirror-moves": {
      title: "Mirror Moves",
      type: "welcome",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "No materials",
      space: "Pairs or small groups",
      summary: "A short movement warm-up where partners take turns leading and mirroring simple motions.",
      steps: [
        "Pair up or make small groups.",
        "One person chooses a simple motion and the other person mirrors it.",
        "Switch leaders after a few motions. Keep movements comfortable and easy to adapt."
      ],
      participation: "Movements can be small, seated, standing, facial, hand-based, or adapted by each pair.",
      builder: {
        stage: "energize",
        traits: ["noPrep","partner","movementOptional","visual","fun","lowReading"],
        badges: ["No materials","Buddy or partner","Movement can be small","Speaking isn’t required"]
      }
    },
    "hub-name-motion": {
      title: "Name + Motion",
      type: "welcome",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "No materials",
      space: "Circle or small group",
      summary: "Pair a name with a simple movement, then let the group echo it back.",
      steps: [
        "Invite a member to share their name and choose a simple movement or gesture.",
        "The group repeats the name and movement together.",
        "Continue only as long as the energy stays positive. Passing is okay."
      ],
      participation: "A member can choose a movement, gesture, sign, facial expression, or have a buddy help lead.",
      builder: {
        stage: "energize",
        traits: ["noPrep","multimodal","visual","fun","passAllowed","lowReading"],
        badges: ["No materials","Gesture friendly","Different ways to lead","Passing is okay"]
      }
    },
    "hub-take-one": {
      title: "One thing I’m taking with me",
      type: "close",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "No special prep",
      space: "Any room",
      summary: "Close with one thing someone enjoyed, noticed, learned, or wants to remember.",
      steps: [
        "Ask: “What’s one thing you’re taking with you from today?”",
        "Offer examples or visible choices if helpful.",
        "Invite a few responses. No one needs to answer."
      ],
      participation: "Speak, sign, point, choose a picture, use a communication device, draw, gesture, use a buddy, or pass.",
      builder: {
        stage: "close",
        traits: ["noPrep","seated","multimodal","choice","passAllowed","lowPressure"],
        badges: ["No prep","Different ways to respond","Can be done seated","Passing is okay"]
      }
    },
    "hub-next-time": {
      title: "What should we try next?",
      type: "close",
      source: "Teacher Hub planning suggestion",
      source_kind: "Teacher Hub planning note",
      url: "",
      official: "About 5 min",
      minutes: 5,
      prep: "Optional visible choices",
      space: "Any room",
      summary: "Let members help choose what kind of activity they’d like to do next time.",
      steps: [
        "Ask what kind of activity the group wants next.",
        "Offer two to four visible choices if helpful: game, art, teamwork, conversation, movement, or another idea.",
        "Notice the group’s preference and carry one idea forward."
      ],
      participation: "Speak, sign, point, vote, use a communication device, draw, gesture, use a buddy, or pass.",
      builder: {
        stage: "close",
        traits: ["choice","visual","multimodal","aac","sign","seated","lowPressure"],
        badges: ["Member choice","Visual vote works","Different ways to respond","Can be done seated"]
      }
    }
  };

  Object.entries(hubActivities).forEach(([id, activity]) => {
    if (!acts[id]) acts[id] = activity;
  });

  const HUB_STAGE_IDS = {
    share: ["hub-looking-forward","hub-this-or-that","hub-one-word-picture"],
    energize: ["hub-mirror-moves","hub-name-motion"],
    close: ["hub-take-one","hub-next-time"]
  };

  const monthLabels = {
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    january: "January",
    any: "Any time"
  };

  const monthContext = {
    september: {
      kicker: "September · Getting started",
      title: "Your first meeting can be simple.",
      text: "September is mostly about getting your chapter set up. If your group is ready, use this planner for a simple Meet & Greet or get-to-know-you meeting. Still recruiting or organizing? You’re on track."
    },
    october: {
      kicker: "October · Getting to know one another",
      title: "Make the first few meetings easy to enter.",
      text: "This is a good time for names, interests, friendship, and low-pressure ways to spend time together. Pick what fits your group rather than trying to do everything at once."
    },
    november: {
      kicker: "November · Working together",
      title: "Shift from introductions into shared experiences.",
      text: "Use teamwork, games, and small challenges to help members learn how they communicate and contribute together."
    },
    december: {
      kicker: "December · Teamwork in action",
      title: "Keep it light when the school calendar gets busy.",
      text: "A simple creative or social meeting is enough. Give people a few clear ways to contribute and leave room to enjoy being together."
    },
    january: {
      kicker: "January · Reconnect & communicate",
      title: "Come back together before asking for too much.",
      text: "Start with reconnection, then use activities that make communication and teamwork visible. Member choice can help shape what comes next."
    },
    any: {
      kicker: "Any time",
      title: "Start with the group in front of you.",
      text: "Use the planner whenever you need a meeting idea. The month suggestions can help, but your chapter does not have to move at exactly the same pace."
    }
  };

  const focusLabels = {
    know: "getting to know each other",
    friendship: "building friendships",
    teamwork: "working together",
    creative: "making or creating something",
    communication: "communicating in different ways",
    fun: "keeping things social and fun"
  };

  const groupLabels = {
    small: "2–6 people",
    medium: "7–12 people",
    large: "13–20 people",
    xlarge: "20+ people"
  };

  const prepLabels = {
    none: "almost no prep",
    basic: "basic classroom supplies",
    print: "printing or prep is okay"
  };

  const fitLabels = {
    seated: "can work seated or with less movement",
    communication: "more than one way to communicate",
    reading: "little reading or writing",
    partner: "buddy or partner support",
    visual: "visual or creative ways to take part",
    lowpressure: "easy to watch first, pass, or join gradually"
  };

  const state = {
    screen: "home",
    step: 0,
    answers: {
      time: "30",
      group: "",
      focus: [],
      prep: "",
      fit: []
    },
    generated: [],
    chosen: null,
    swapIndex: null,
    browserStage: "share",
    manual: { share: "", energize: "", main: "", close: "" }
  };

  const questions = [
    {
      key: "time",
      title: "How much time do you have?",
      hint: "We’ll keep the plan realistic. The Program Guide’s full four-part rhythm often lands around 30 minutes or more.",
      type: "single",
      choices: [
        ["20", "About 20 minutes"],
        ["30", "About 30 minutes"],
        ["45", "About 45 minutes"],
        ["60", "About an hour"]
      ]
    },
    {
      key: "group",
      title: "About how many people are coming?",
      hint: "A rough range is enough. Some activities work better with a bigger group.",
      type: "single",
      choices: [
        ["small", "2–6 people"],
        ["medium", "7–12 people"],
        ["large", "13–20 people"],
        ["xlarge", "20+ people"]
      ]
    },
    {
      key: "focus",
      title: "What would you like this meeting to help with?",
      hint: "Choose up to three. These can overlap.",
      type: "multi",
      max: 3,
      choices: [
        ["know", "Getting to know each other"],
        ["friendship", "Building friendships"],
        ["teamwork", "Working together"],
        ["creative", "Making or creating something"],
        ["communication", "Communicating in different ways"],
        ["fun", "Keeping things social and fun"]
      ]
    },
    {
      key: "prep",
      title: "How much prep are you up for?",
      hint: "There’s no prize for complicated. Pick what actually fits your day.",
      type: "single",
      choices: [
        ["none", "Almost none, please"],
        ["basic", "Basic classroom supplies are fine"],
        ["print", "I can print or prep materials"]
      ]
    },
    {
      key: "fit",
      title: "What would make participation easier today?",
      hint: "Choose any that help, or skip this question. This is about removing barriers, not labelling students.",
      type: "multi",
      optional: true,
      choices: [
        ["seated", "Can work seated or with less movement"],
        ["communication", "More than one way to communicate"],
        ["reading", "Keep reading and writing light"],
        ["partner", "Buddy or partner support"],
        ["visual", "Visual or creative ways to take part"],
        ["lowpressure", "Easy to watch first, pass, or join gradually"]
      ]
    }
  ];

  const monthFromDate = (() => {
    const m = new Date().getMonth();
    return ({ 8: "september", 9: "october", 10: "november", 11: "december", 0: "january" })[m] || "any";
  })();
  monthSelect.value = monthFromDate;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  function monthConfig(month) {
    if (month === "any") return null;
    return months[`elementary:${month}`] || null;
  }

  function allElementaryIds() {
    const set = new Set();
    Object.entries(months).forEach(([key, cfg]) => {
      if (!key.startsWith("elementary:")) return;
      ["welcome","main","close"].forEach((type) => (cfg[type] || []).forEach((id) => {
        if (acts[id]) set.add(id);
      }));
    });
    Object.values(HUB_STAGE_IDS).flat().forEach((id) => acts[id] && set.add(id));
    return [...set];
  }

  function stageKey(id) {
    const a = acts[id];
    if (!a) return "main";
    if (a.builder?.stage) return a.builder.stage;
    if (a.type === "main") return "main";
    if (a.type === "close") return "close";
    if (id === "acts-friendship" || id === "member-checkin") return "share";
    if (/recurring share|check-?in|\bshare\b/i.test(`${a.source || ""} ${a.title || ""}`)) return "share";
    return "energize";
  }

  function monthIds() {
    const cfg = monthConfig(monthSelect.value);
    if (!cfg) return allElementaryIds();
    return [...new Set([
      ...(cfg.welcome || []),
      ...(cfg.main || []),
      ...(cfg.close || [])
    ].filter((id) => acts[id]))];
  }

  function recommendedSet(stage) {
    const ids = monthIds().filter((id) => stageKey(id) === stage);
    if (stage === "share") HUB_STAGE_IDS.share.forEach((id) => ids.push(id));
    if (stage === "energize") HUB_STAGE_IDS.energize.forEach((id) => ids.push(id));
    if (stage === "close") HUB_STAGE_IDS.close.forEach((id) => ids.push(id));
    return new Set(ids);
  }

  function stagePool(stage, all = false) {
    let ids = (all ? allElementaryIds() : monthIds()).filter((id) => stageKey(id) === stage);
    (HUB_STAGE_IDS[stage] || []).forEach((id) => {
      if (acts[id] && !ids.includes(id)) ids.push(id);
    });

    if (all) {
      const rec = recommendedSet(stage);
      ids.sort((a,b) => Number(rec.has(b)) - Number(rec.has(a)));
    }
    return [...new Set(ids)];
  }

  function hay(a) {
    return [
      a?.title, a?.summary, a?.prep, a?.space, a?.modes, a?.participation,
      a?.source, a?.source_kind, a?.source_note
    ].filter(Boolean).join(" ").toLowerCase();
  }

  function traitSet(id) {
    const a = acts[id];
    const text = hay(a);
    const set = new Set(a?.builder?.traits || []);

    if (/no prep|no materials|no special prep/.test(text)) set.add("noPrep");
    if (/seated|table|any room/.test(text)) set.add("seated");
    if (/low movement|lower movement|small movement/.test(text)) set.add("lowMovement");
    if (/large open space|movement-heavy|open space helpful/.test(text)) set.add("movementHeavy");
    if (/aac|communication device|assistive speaking/.test(text)) set.add("aac");
    if (/sign language|\basl\b|sign\b/.test(text)) set.add("sign");
    if (/gesture|non-verbal|non-speaking|without speaking|no talking|without relying on speech/.test(text)) set.add("communicationRich");
    if (/non-verbal|non-speaking|without speaking|no talking|without relying on speech/.test(text)) set.add("noSpeech");
    if (/partner|buddy|scribe|pair/.test(text)) set.add("partner");
    if (/visual|draw|drawing|picture|symbol|poster|art|colour|collage/.test(text)) set.add("visual");
    if (/print|worksheet|bingo card|caller card/.test(text)) set.add("printable");
    if (/reading-heavy|language-heavy|read and write|worksheet/.test(text)) set.add("readingHeavy");
    if (/pass|watching first|listening is participation|voluntary/.test(text)) set.add("lowPressure");
    if (/friend/.test(text)) set.add("friendship");
    if (/team|together|collaborat/.test(text)) set.add("teamwork");
    if (/creative|draw|art|make|build/.test(text)) set.add("creative");
    if (/game|fun|music|charades|bingo/.test(text)) set.add("fun");
    if (/name|interest|get to know|common|about me|looking forward/.test(text)) set.add("know");
    return set;
  }

  function focusScore(id, focus) {
    const t = traitSet(id);
    const text = hay(acts[id]);
    const words = {
      know: ["get to know","name","interest","common","about me","bingo","looking forward"],
      friendship: ["friend","connection","buddy","appreciation","welcome"],
      teamwork: ["team","together","collaborat","tower","stack","building"],
      creative: ["creative","art","draw","picture","banner","board","make","build"],
      communication: ["gesture","sign","aac","communication device","body language","non-verbal","non-speaking"],
      fun: ["game","fun","music","charades","bingo","social"]
    };
    let score = 0;
    (words[focus] || []).forEach((w) => { if (text.includes(w)) score += 4; });
    if (t.has(focus)) score += 8;
    if (focus === "communication" && t.has("communicationRich")) score += 10;
    return score;
  }

  function groupEstimate(bucket) {
    return ({ small: 5, medium: 10, large: 16, xlarge: 24 })[bucket] || 10;
  }

  function scoreActivity(id, mode = "match") {
    const a = acts[id];
    if (!a) return -9999;
    const t = traitSet(id);
    const text = hay(a);
    let score = recommendedSet(stageKey(id)).has(id) ? 8 : 0;

    (state.answers.focus || []).forEach((focus) => {
      score += focusScore(id, focus);
    });

    const group = groupEstimate(state.answers.group);
    const minGroup = Number(a.builder?.minGroup || 0);
    const maxGroup = Number(a.builder?.maxGroup || 0);
    if (minGroup) score += group >= minGroup ? 5 : -25;
    if (maxGroup) score += group <= maxGroup ? 3 : -10;

    if (state.answers.prep === "none") {
      if (t.has("noPrep")) score += 14;
      if (t.has("printable") || /worksheet|shoebox|poster|special prep/.test(text)) score -= 10;
    } else if (state.answers.prep === "basic") {
      if (t.has("noPrep")) score += 4;
      if (/paper|markers|cards|yarn|classroom|crayon/.test(text)) score += 5;
      if (t.has("printable")) score -= 2;
    } else if (state.answers.prep === "print") {
      if (t.has("printable")) score += 8;
    }

    const fit = new Set(state.answers.fit || []);
    if (fit.has("seated")) {
      if (t.has("seated") || t.has("lowMovement")) score += 14;
      if (t.has("movementHeavy")) score -= 28;
    }
    if (fit.has("communication")) {
      if (t.has("communicationRich")) score += 15;
      if (t.has("aac") || t.has("sign") || t.has("noSpeech")) score += 8;
    }
    if (fit.has("reading")) {
      if (t.has("visual") || t.has("noSpeech")) score += 9;
      if (t.has("readingHeavy")) score -= 22;
    }
    if (fit.has("partner") && t.has("partner")) score += 13;
    if (fit.has("visual") && (t.has("visual") || t.has("creative"))) score += 13;
    if (fit.has("lowpressure") && t.has("lowPressure")) score += 13;

    if (mode === "simple") {
      if (t.has("noPrep")) score += 16;
      if (t.has("seated") || t.has("lowMovement")) score += 6;
      if (t.has("printable") || t.has("movementHeavy")) score -= 8;
    }
    return score;
  }

  function rank(stage, mode = "match", exclude = [], all = false) {
    return stagePool(stage, all)
      .filter((id) => !exclude.includes(id))
      .map((id) => ({ id, score: scoreActivity(id, mode) }))
      .sort((a,b) => b.score - a.score || (Number(acts[a.id]?.minutes) || 99) - (Number(acts[b.id]?.minutes) || 99));
  }

  function pick(stage, mode, exclude = []) {
    return rank(stage, mode, exclude)[0]?.id || stagePool(stage)[0];
  }

  function total(ids) {
    return ids.reduce((sum,id) => sum + (Number(acts[id]?.minutes) || 0), 0);
  }

  function stageName(stage) {
    return ({ share:"Share", energize:"Energize", main:"Core Activity", close:"Take-Away" })[stage] || "Core Activity";
  }

  function timeLabel(a) {
    const raw = String(a?.official || "").trim();
    if (/hub pacing/i.test(raw)) return `About ${a.minutes || 5} min`;
    if (raw) return raw;
    if (a?.minutes) return `About ${a.minutes} min`;
    return "Flexible";
  }

  function sourceInfo(a) {
    const kind = `${a?.source_kind || ""} ${a?.source || ""}`.toLowerCase();
    if (/teacher hub/.test(kind) && !/guide activity \+ hub|best buddies/.test(kind)) {
      return { label:"Teacher Hub suggestion", cls:"hub" };
    }
    if (/hub option|hub fit|guide activity \+ hub/.test(kind)) {
      return { label:"Best Buddies activity + Hub note", cls:"mixed" };
    }
    if (/program guide/.test(kind)) return { label:"From the Program Guide", cls:"guide" };
    if (/activity guide|non-verbal/.test(kind)) return { label:"From a Best Buddies activity guide", cls:"guide" };
    return { label:"Best Buddies resource", cls:"guide" };
  }

  const badgeReplacements = [
    [/^AAC option$/i, "Communication device friendly"],
    [/^AAC$/i, "Communication device friendly"],
    [/AAC \/ sign \/ point/i, "Different ways to communicate"],
    [/AAC \/ sign \/ draw/i, "Different ways to communicate"],
    [/AAC \/ sign \/ listen/i, "Different ways to communicate"],
    [/^Sign \/ ASL$/i, "Sign Language friendly"],
    [/^ASL$/i, "Sign Language"],
    [/^No speech needed$/i, "Speaking isn’t required"],
    [/^Non-speaking$/i, "Speaking isn’t required"],
    [/^Seated works$/i, "Can be done seated"],
    [/^Seated circle works$/i, "Seated circle works"],
    [/^Partner option$/i, "Buddy or partner support"],
    [/^Buddy scribe$/i, "Buddy or scribe support"],
    [/^Low reading$/i, "Little reading or writing"],
    [/^Low movement$/i, "Lower movement"],
    [/^Passing okay$/i, "Passing is okay"],
    [/^Multiple response formats$/i, "Different ways to respond"],
    [/^Multiple ways to respond$/i, "Different ways to respond"],
    [/^Visual$/i, "Visual or creative"],
    [/^Printable$/i, "Printable needed"]
  ];

  function friendlyBadge(label) {
    let out = String(label || "");
    badgeReplacements.forEach(([re, replacement]) => { if (re.test(out)) out = replacement; });
    return out;
  }

  function badges(id, limit = 4) {
    const a = acts[id];
    const explicit = a?.builder?.badges || [];
    const list = explicit.length ? explicit : [];
    if (!list.length) {
      const t = traitSet(id);
      if (t.has("noPrep")) list.push("No prep");
      if (t.has("seated")) list.push("Can be done seated");
      if (t.has("noSpeech")) list.push("Speaking isn’t required");
      if (t.has("partner")) list.push("Buddy or partner support");
      if (t.has("visual")) list.push("Visual or creative");
      if (t.has("printable")) list.push("Printable needed");
      if (t.has("lowPressure")) list.push("Passing is okay");
    }
    return [...new Set(list.map(friendlyBadge))].slice(0,limit);
  }

  function badgesMarkup(id, limit=4) {
    const list = badges(id,limit);
    if (!list.length) return "";
    return `<div class="gb-badges">${list.map((b) => `<span>${esc(b)}</span>`).join("")}</div>`;
  }

  function buildPlan(mode = "match", exclude = []) {
    const ids = [];
    ["share","energize","main","close"].forEach((stage) => {
      const stageExcludes = exclude.filter((id) => stageKey(id) === stage);
      const id = pick(stage, mode, stageExcludes);
      if (id) ids.push(id);
    });

    return {
      label: mode === "simple" ? "Easiest setup" : "Best match for your choices",
      title: mode === "simple" ? "Keep it simple" : "Built around your priorities",
      note: mode === "simple"
        ? "Leans toward lighter prep and straightforward activities."
        : "Uses the goals and participation options you picked to shape the meeting.",
      mode,
      ids
    };
  }

  function quickPlan() {
    const cfg = monthConfig(monthSelect.value);
    const preset = (cfg?.preset || []).filter((id) => acts[id]);
    const ids = [];
    ["share","energize","main","close"].forEach((stage) => {
      const fromPreset = preset.find((id) => stageKey(id) === stage);
      ids.push(fromPreset || pick(stage,"simple",ids));
    });
    return {
      label: "Quick plan",
      title: "A simple meeting to use today",
      note: "A straightforward four-part starting point. Swap any piece that doesn’t fit your group.",
      mode: "quick",
      ids: ids.filter(Boolean)
    };
  }

  function answerSummary() {
    const list = [];
    if (state.answers.time) list.push(`${state.answers.time} min`);
    if (state.answers.group) list.push(groupLabels[state.answers.group]);
    (state.answers.focus || []).forEach((v) => focusLabels[v] && list.push(focusLabels[v]));
    if (state.answers.prep) list.push(prepLabels[state.answers.prep]);
    (state.answers.fit || []).forEach((v) => fitLabels[v] && list.push(fitLabels[v]));
    return list;
  }

  function renderMonthContext() {
    const c = monthContext[monthSelect.value] || monthContext.any;
    return `<div class="gb-month-context">
      <div>
        <span>${esc(c.kicker)}</span>
        <h3>${esc(c.title)}</h3>
      </div>
      <p>${esc(c.text)}</p>
    </div>`;
  }

  function renderHome() {
    state.screen = "home";
    state.swapIndex = null;
    root.innerHTML = `<section class="gb-panel">
      ${renderMonthContext()}

      <div class="gb-panel-head gb-home-head">
        <span class="gb-kicker">Plan a meeting</span>
        <h2>What are you working with today?</h2>
        <p>Choose the route that saves you the most time. You can swap activities later without starting over.</p>
      </div>

      <div class="gb-paths">
        <button class="gb-path guided" type="button" data-path="guided">
          <small>Activity Builder · 5 quick questions</small>
          <strong>Build one for me</strong>
          <span>Answer five quick questions and the Activity Builder will suggest a four-part meeting using activities that fit your time, group, goals, and participation needs.</span>
          <b>→</b>
        </button>

        <button class="gb-path manual" type="button" data-path="manual">
          <small>Browse the activity bank</small>
          <strong>I’ll choose the pieces</strong>
          <span>Browse Share, Energize, Core Activity, and Take-Away ideas and build the meeting yourself.</span>
          <b>→</b>
        </button>

        <button class="gb-path quick" type="button" data-quick>
          <small>Need something now?</small>
          <strong>Give me a quick plan</strong>
          <span>Start with a simple four-part meeting for this month, then swap anything you want.</span>
          <b>→</b>
        </button>
      </div>
    </section>`;
  }

  function renderQuestion() {
    state.screen = "guided";
    const q = questions[state.step];
    const val = state.answers[q.key];

    const choiceMarkup = q.choices.map(([value,label]) => {
      if (q.type === "single") {
        const selected = val === value;
        return `<button class="gb-choice${selected ? " selected" : ""}" type="button" data-single="${esc(q.key)}" data-value="${esc(value)}">
          <span class="gb-choice-dot"></span>
          <span>${esc(label)}</span>
        </button>`;
      }

      const selected = (val || []).includes(value);
      return `<label class="gb-choice${selected ? " selected" : ""}">
        <input type="checkbox" data-answer="${esc(q.key)}" value="${esc(value)}" ${selected ? "checked" : ""}>
        <span>${esc(label)}</span>
      </label>`;
    }).join("");

    const countNote = q.max ? `<span class="gb-selection-count">${(val || []).length} of ${q.max} selected</span>` : "";

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Guided Activity Builder</span>
        <h2>Let’s build your meeting.</h2>
        <p>Answer a few quick questions and we’ll suggest activities for Share, Energize, Core Activity, and Take-Away. You can swap any activity afterward.</p>
      </div>

      <div class="gb-progress" style="--gb-steps:${questions.length}">
        ${questions.map((_,i) => `<span class="${i < state.step ? "done" : i === state.step ? "current" : ""}"></span>`).join("")}
      </div>

      <div class="gb-question">
        <div class="gb-question-topline">
          <span class="gb-question-count">Question ${state.step + 1} of ${questions.length}${q.optional ? " · optional" : ""}</span>
          ${countNote}
        </div>
        <h3>${esc(q.title)}</h3>
        <p class="gb-question-hint">${esc(q.hint || "")}</p>

        <div class="gb-choice-grid">${choiceMarkup}</div>

        <div class="gb-question-actions">
          <button class="gb-btn secondary" type="button" data-back>${state.step === 0 ? "Back to planning choices" : "Back"}</button>
          <button class="gb-btn primary" type="button" data-next>${state.step === questions.length - 1 ? "Show my options →" : "Next →"}</button>
        </div>
      </div>
    </section>`;
  }

  function compactPiece(id) {
    const a = acts[id];
    const st = stageKey(id);
    return `<div class="gb-piece ${st}">
      <div class="gb-piece-stage">${esc(stageName(st))}</div>
      <div class="gb-piece-copy">
        <strong>${esc(a.title)}</strong>
        <p>${esc(a.summary || "")}</p>
      </div>
      <span class="gb-piece-time">${esc(timeLabel(a))}</span>
    </div>`;
  }

  function renderResults() {
    state.screen = "results";
    const first = buildPlan("match");
    const second = buildPlan("simple", first.ids);
    state.generated = [first,second];

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Two starting points</span>
        <h2>Here are two ways to run it.</h2>
        <p>Both follow the four-part Program Guide rhythm. Pick one, then swap individual pieces if you want more options.</p>
        <div class="gb-answer-summary">${answerSummary().map((x) => `<span>${esc(x)}</span>`).join("")}</div>
      </div>

      <div class="gb-results">
        <div class="gb-plan-options">
          ${state.generated.map((plan,index) => `<article class="gb-plan-option ${index === 0 ? "best" : "simple"}">
            <div class="gb-plan-option-head">
              <small>${esc(plan.label)}</small>
              <h3>${esc(plan.title)}</h3>
              <p>${esc(plan.note)} <strong>About ${total(plan.ids)} minutes.</strong></p>
            </div>
            <div class="gb-plan-pieces">${plan.ids.map(compactPiece).join("")}</div>
            <button class="gb-use-plan" type="button" data-use-plan="${index}">Use this plan →</button>
          </article>`).join("")}
        </div>

        <div class="gb-results-actions">
          <button class="gb-btn secondary" type="button" data-edit-answers>Change my answers</button>
          <button class="gb-text-button" type="button" data-path="manual">Browse all activities instead →</button>
        </div>
      </div>
    </section>`;
  }

  function detailMarkup(id) {
    const a = acts[id];
    if (!a) return "";
    const src = sourceInfo(a);
    const steps = Array.isArray(a.steps) ? a.steps : [];
    const memberCheckinExample = id === "member-checkin"
      ? `<div class="gb-example"><strong>Try this:</strong> “What sounds good today?” <span>Talk together · Play a game · Make something · Move around</span></div>`
      : "";

    return `<details class="gb-activity-detail">
      <summary>See how it works</summary>
      <div class="gb-detail-grid">
        <div>
          <h5>What you need</h5>
          <p>${esc(a.prep || "No special materials listed.")}</p>
        </div>
        <div>
          <h5>How it works</h5>
          ${memberCheckinExample}
          ${steps.length ? `<ol>${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : `<p>${esc(a.summary || "")}</p>`}
        </div>
        <div>
          <h5>Ways to participate</h5>
          <p>${esc(a.participation || a.modes || "Use the participation options that work for your group.")}</p>
        </div>
        <div>
          <h5>Source</h5>
          <p><span class="gb-source-label ${src.cls}">${esc(src.label)}</span><br>${esc(a.source || "Teacher Hub planning support")}</p>
          ${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">Open original ↗</a>` : ""}
        </div>
      </div>
    </details>`;
  }

  function alternativePicker(index, currentId) {
    if (state.swapIndex !== index) return "";
    const stage = stageKey(currentId);
    const alternatives = rank(stage, "match", [currentId], true).slice(0,8);
    return `<div class="gb-swap-picker">
      <div class="gb-swap-picker-head">
        <div>
          <span class="gb-kicker">More ${esc(stageName(stage))} ideas</span>
          <h4>Choose another.</h4>
        </div>
        <button type="button" data-close-swap>Close</button>
      </div>
      <div class="gb-alt-grid">
        ${alternatives.map(({id}) => {
          const a = acts[id];
          const src = sourceInfo(a);
          const rec = recommendedSet(stage).has(id);
          return `<article class="gb-alt-card">
            <div class="gb-alt-meta">
              <span class="gb-source-label ${src.cls}">${esc(src.label)}</span>
              ${rec ? `<span class="gb-recommended">Good fit for ${esc(monthLabels[monthSelect.value])}</span>` : ""}
            </div>
            <h5>${esc(a.title)}</h5>
            <p>${esc(a.summary || "")}</p>
            ${badgesMarkup(id,3)}
            <div class="gb-alt-bottom">
              <span>${esc(timeLabel(a))}</span>
              <button type="button" data-use-alt="${esc(id)}" data-index="${index}">Use this →</button>
            </div>
          </article>`;
        }).join("")}
      </div>
    </div>`;
  }

  function finalItem(id,index) {
    const a = acts[id];
    if (!a) return "";
    const stage = stageKey(id);
    const src = sourceInfo(a);

    return `<article class="gb-final-item ${stage}">
      <div class="gb-stage-number">${index + 1}</div>
      <div class="gb-final-main">
        <div class="gb-final-heading">
          <div>
            <span class="gb-final-stage">${esc(stageName(stage))}</span>
            <h4>${esc(a.title)}</h4>
          </div>
          <span class="gb-time">${esc(timeLabel(a))}</span>
        </div>
        <p>${esc(a.summary || "")}</p>
        ${badgesMarkup(id,4)}
        ${detailMarkup(id)}
        <div class="gb-final-footer">
          <span class="gb-source-label ${src.cls}">${esc(src.label)}</span>
          <button type="button" data-swap="${index}">See other ${esc(stageName(stage))} ideas →</button>
        </div>
      </div>
      ${alternativePicker(index,id)}
    </article>`;
  }

  function renderFinal(plan) {
    state.screen = "final";
    state.chosen = {
      ...plan,
      ids: [...plan.ids]
    };

    root.innerHTML = `<section class="gb-panel gb-final-panel">
      <div class="gb-panel-head gb-final-intro">
        <div>
          <span class="gb-kicker">${esc(plan.label || "Your meeting")}</span>
          <h2>${esc(plan.title || "Your meeting")}</h2>
          <p>${esc(plan.note || "Use this as a starting point and make it your own.")}</p>
        </div>
        <div class="gb-total">About ${total(state.chosen.ids)} min</div>
      </div>

      <div class="gb-final">
        <div class="gb-rhythm-line" aria-hidden="true">
          <span class="share">Share</span><b>→</b>
          <span class="energize">Energize</span><b>→</b>
          <span class="core">Core Activity</span><b>→</b>
          <span class="takeaway">Take-Away</span>
        </div>

        <div class="gb-final-items">
          ${state.chosen.ids.map((id,index) => finalItem(id,index)).join("")}
        </div>

        <div class="gb-final-actions">
          <button class="gb-btn primary" type="button" data-print>Print this plan</button>
          <button class="gb-btn secondary" type="button" data-email>Email this plan</button>
          <button class="gb-btn secondary" type="button" data-path="manual">Browse all activities</button>
          <button class="gb-text-button" type="button" data-edit-answers>Change my answers</button>
        </div>
      </div>
    </section>`;
  }

  function activityCard(id, stage) {
    const a = acts[id];
    if (!a) return "";
    const src = sourceInfo(a);
    const selected = state.manual[stage] === id;
    const recommended = recommendedSet(stage).has(id);

    return `<article class="gb-activity${selected ? " selected" : ""}">
      <div class="gb-activity-top">
        <span class="gb-source-label ${src.cls}">${esc(src.label)}</span>
        ${recommended ? `<span class="gb-recommended">Recommended for ${esc(monthLabels[monthSelect.value])}</span>` : ""}
      </div>
      <h4>${esc(a.title)}</h4>
      <p>${esc(a.summary || "")}</p>
      ${badgesMarkup(id,4)}
      <div class="gb-activity-meta">
        <span>${esc(timeLabel(a))}</span>
        ${a.space ? `<span>${esc(a.space)}</span>` : ""}
      </div>
      ${detailMarkup(id)}
      <button class="gb-add-activity" type="button" data-manual-select="${esc(id)}" data-stage="${esc(stage)}">${selected ? "Selected ✓" : `Use as my ${esc(stageName(stage))}`}</button>
    </article>`;
  }

  function manualIds() {
    return ["share","energize","main","close"].map((stage) => state.manual[stage]).filter(Boolean);
  }

  function renderManual() {
    state.screen = "manual";
    const stage = state.browserStage;
    const ids = stagePool(stage,true);

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Build it yourself</span>
        <h2>Choose the pieces.</h2>
        <p>Recommended ideas for ${esc(monthLabels[monthSelect.value])} appear first, but the full Elementary &amp; Middle activity bank stays available.</p>
      </div>

      <div class="gb-stage-tabs" role="tablist" aria-label="Meeting parts">
        ${["share","energize","main","close"].map((key,i) => `<button type="button" class="${stage === key ? "active" : ""}" data-browser-stage="${key}">
          <b>${i+1}</b><span>${esc(stageName(key))}</span>
        </button>`).join("")}
      </div>

      <div class="gb-manual">
        <div class="gb-manual-stage-head">
          <div>
            <span class="gb-kicker">Part ${["share","energize","main","close"].indexOf(stage)+1}</span>
            <h3>${esc(stageName(stage))}</h3>
          </div>
          <p>${esc({
            share:"Start with a quick connection. Easy to enter, easy to pass.",
            energize:"Warm the group up with a short burst of energy, movement, play, or interaction.",
            main:"This is the main focus of the meeting. Pick the activity that best fits your group and time.",
            close:"End with a reflection, shared message, appreciation, or member choice."
          }[stage])}</p>
        </div>

        <div class="gb-activity-grid">
          ${ids.map((id) => activityCard(id,stage)).join("")}
        </div>

        <div class="gb-manual-plan">
          <div>
            <strong>${manualIds().length} of 4 parts selected</strong>
            <span>${manualIds().length ? ` · About ${total(manualIds())} minutes so far` : " · Start with any section."}</span>
          </div>
          <div class="gb-mini-plan">
            ${["share","energize","main","close"].map((key) => `<span class="${state.manual[key] ? "filled" : ""}">${esc(stageName(key))}${state.manual[key] ? `: ${esc(acts[state.manual[key]].title)}` : ""}</span>`).join("")}
          </div>
          <button type="button" data-use-manual ${manualIds().length === 4 ? "" : "disabled"}>Use my meeting →</button>
        </div>

        <div class="gb-question-actions">
          <button class="gb-btn secondary" type="button" data-home>Back to planning choices</button>
        </div>
      </div>
    </section>`;
  }

  function emailPlan() {
    if (!state.chosen) return;
    const lines = [
      `Best Buddies ${monthLabels[monthSelect.value]} meeting`,
      `About ${total(state.chosen.ids)} minutes`,
      ""
    ];
    state.chosen.ids.forEach((id) => {
      const a = acts[id];
      lines.push(`${stageName(stageKey(id))}: ${a.title} (${timeLabel(a)})`);
      if (a.summary) lines.push(a.summary);
      if (a.prep) lines.push(`What you need: ${a.prep}`);
      if (a.participation) lines.push(`Ways to participate: ${a.participation}`);
      lines.push(`Source: ${a.source || "Teacher Hub planning suggestion"}`);
      if (a.url) lines.push(a.url);
      lines.push("");
    });
    lines.push("Built with the Best Buddies Canada Teacher Hub.");
    window.location.href = `mailto:?subject=${encodeURIComponent(`Best Buddies ${monthLabels[monthSelect.value]} meeting plan`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function printPlan() {
    const details = [...document.querySelectorAll(".gb-final .gb-activity-detail")];
    const closed = details.filter((d) => !d.open);
    details.forEach((d) => { d.open = true; });
    window.print();
    window.setTimeout(() => closed.forEach((d) => { d.open = false; }), 250);
  }

  root.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;

    if (t.matches("[data-path='guided']")) {
      state.step = 0;
      renderQuestion();
      return;
    }

    if (t.matches("[data-path='manual']")) {
      renderManual();
      return;
    }

    if (t.matches("[data-quick]")) {
      state.swapIndex = null;
      renderFinal(quickPlan());
      return;
    }

    if (t.matches("[data-single]")) {
      state.answers[t.dataset.single] = t.dataset.value;
      renderQuestion();
      return;
    }

    if (t.matches("[data-back]")) {
      if (state.step === 0) renderHome();
      else {
        state.step -= 1;
        renderQuestion();
      }
      return;
    }

    if (t.matches("[data-next]")) {
      const q = questions[state.step];
      const value = state.answers[q.key];
      const valid = q.optional || (q.type === "multi" ? (value || []).length > 0 : Boolean(value));
      if (!valid) {
        t.textContent = q.type === "multi" ? "Choose at least one" : "Choose one first";
        return;
      }
      if (state.step < questions.length - 1) {
        state.step += 1;
        renderQuestion();
      } else {
        renderResults();
      }
      return;
    }

    if (t.matches("[data-use-plan]")) {
      state.swapIndex = null;
      renderFinal(state.generated[Number(t.dataset.usePlan)]);
      return;
    }

    if (t.matches("[data-edit-answers]")) {
      state.step = 0;
      renderQuestion();
      return;
    }

    if (t.matches("[data-home]")) {
      renderHome();
      return;
    }

    if (t.matches("[data-swap]")) {
      state.swapIndex = Number(t.dataset.swap);
      renderFinal(state.chosen);
      return;
    }

    if (t.matches("[data-close-swap]")) {
      state.swapIndex = null;
      renderFinal(state.chosen);
      return;
    }

    if (t.matches("[data-use-alt]")) {
      const index = Number(t.dataset.index);
      state.chosen.ids[index] = t.dataset.useAlt;
      state.swapIndex = null;
      renderFinal(state.chosen);
      return;
    }

    if (t.matches("[data-browser-stage]")) {
      state.browserStage = t.dataset.browserStage;
      renderManual();
      return;
    }

    if (t.matches("[data-manual-select]")) {
      state.manual[t.dataset.stage] = t.dataset.manualSelect;
      renderManual();
      return;
    }

    if (t.matches("[data-use-manual]") && manualIds().length === 4) {
      state.swapIndex = null;
      renderFinal({
        label:"Built by you",
        title:"Your meeting",
        note:"Four pieces chosen from the activity bank. Swap anything you want.",
        mode:"manual",
        ids: manualIds()
      });
      return;
    }

    if (t.matches("[data-print]")) {
      printPlan();
      return;
    }

    if (t.matches("[data-email]")) {
      emailPlan();
    }
  });

  root.addEventListener("change", (e) => {
    const input = e.target.closest("[data-answer]");
    if (!input) return;

    const key = input.dataset.answer;
    const q = questions.find((x) => x.key === key);
    if (!q || q.type !== "multi") return;

    let values = [...root.querySelectorAll(`[data-answer="${key}"]:checked`)].map((el) => el.value);
    if (q.max && values.length > q.max) {
      input.checked = false;
      values = values.filter((v) => v !== input.value);
    }
    state.answers[key] = values;
    renderQuestion();
  });

  monthSelect.addEventListener("change", () => {
    state.generated = [];
    state.chosen = null;
    state.swapIndex = null;
    state.manual = { share:"", energize:"", main:"", close:"" };
    renderHome();
  });

  renderHome();
})();
