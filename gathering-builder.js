(() => {
  "use strict";

  const data =
    (typeof BB_MEETING_BUILDER_DATA !== "undefined" ? BB_MEETING_BUILDER_DATA : null) ||
    window.BB_MEETING_BUILDER_DATA;
  if (!data?.activities || !data?.months) return;

  const activities = data.activities;
  const months = data.months;
  const NON_VERBAL_URL = "https://drive.google.com/file/d/1oQwyeOMXP2vCxRpPvBJyBXKP8wTOOdVO/view?usp=sharing";

  /*
    This file enriches the dedicated Gathering Builder without changing the
    shared meeting-builder-data.js used by the month pages.

    - Adds the two Non-Verbal Activity Guide activities that were not already
      represented in the shared bank.
    - Adds builder-only fit metadata used for matching, badges, cautions, and
      source-fidelity labels.
    - Broadens month pools for the dedicated builder only.
  */

  if (!activities["spoons-nv"]) {
    activities["spoons-nv"] = {
      title: "Spoons",
      type: "main",
      source: "Non-Verbal Activity Guide · Activity Five",
      url: NON_VERBAL_URL,
      official: "Flexible",
      minutes: 15,
      prep: "Deck of cards + one fewer spoon than players",
      space: "Table group · seated play",
      summary: "Play the familiar card game using visual attention and non-speaking cues as players work toward four of a kind.",
      steps: [
        "Put the spoons in the middle of the table and deal four cards to each player.",
        "Players draw and pass cards while keeping four cards in their hand.",
        "When someone gets four of a kind, they grab a spoon. The other players follow the visual cue.",
        "The guide removes one spoon each round and continues until one player remains."
      ],
      participation: "The guide describes this as non-verbal friendly and seated at a table. It also relies on quick reaching and elimination. Teacher Hub fit note: if quick grabbing, fine-motor speed, or elimination creates a barrier for your group, choose another activity rather than making speed the price of participation.",
      modes: "Non-speaking visual cues, card play, seated group.",
      source_note: "The card game, quick-reach cue, and elimination format come from the Non-Verbal Activity Guide. The fit caution is Teacher Hub planning support.",
      source_kind: "Guide activity + Hub fit note"
    };
  }

  if (!activities["what-are-you-drawing"]) {
    activities["what-are-you-drawing"] = {
      title: "What Are You Drawing?",
      type: "main",
      source: "Non-Verbal Activity Guide · Activity Twelve",
      url: NON_VERBAL_URL,
      official: "Flexible",
      minutes: 18,
      prep: "Paper + markers",
      space: "Lines or small groups · wall space helpful",
      summary: "Pass a drawing down a line through tactile clues, then compare how the picture changed from person to person.",
      steps: [
        "Give each participant paper and a marker and arrange the group in a line facing the same direction.",
        "Each person holds or secures paper against the back of the person in front; the first person uses a wall.",
        "Give the last person a simple drawing prompt.",
        "Each person feels the drawing being made on the paper behind them and tries to reproduce it on their own paper.",
        "Reveal the drawings at the end and compare the results."
      ],
      participation: "The guide centres tactile perception, fine-motor drawing, and teamwork. Teacher Hub fit note: this activity involves drawing against another person’s back. Only use that format when everyone is comfortable with the touch involved. If touch or drawing is not a good fit, choose another communication activity.",
      modes: "Tactile perception, drawing, non-speaking teamwork.",
      source_note: "The tactile drawing format comes directly from the Non-Verbal Activity Guide. The consent and fit caution is Teacher Hub planning support.",
      source_kind: "Guide activity + Hub fit note"
    };
  }

  const BUILDER_META = {
    "member-checkin": {
      badges: ["No prep", "Seated works", "Multiple ways to respond", "Passing okay"],
      traits: ["noPrep", "seated", "lowMovement", "multimodal", "choice", "passAllowed", "lowReading", "lowPressure"]
    },
    "acts-friendship": {
      badges: ["Low prep", "Seated works", "AAC / sign / point", "Passing okay"],
      traits: ["lowPrep", "seated", "lowMovement", "multimodal", "aac", "sign", "partner", "passAllowed", "lowPressure"]
    },
    "gesture-chain": {
      badges: ["No materials", "Seated works", "Gesture", "No speech needed"],
      traits: ["noPrep", "seated", "lowMovement", "noSpeech", "gesture", "visual", "lowReading", "communicationRich"]
    },
    "defining-friendship": {
      badges: ["Pairs", "Words or pictures", "Low movement", "Creative"],
      traits: ["partner", "visual", "creative", "lowMovement", "multimodal", "friendship"]
    },
    "pass-yarn": {
      badges: ["Seated circle works", "AAC option", "Whole group", "Low reading"],
      traits: ["seated", "aac", "partner", "lowReading", "friendship", "know"]
    },
    "imagine-boards": {
      badges: ["Visual", "Partner option", "Seated works", "Creative"],
      traits: ["visual", "partner", "seated", "creative", "choice", "multimodal", "lowPressure"]
    },
    "adapted-charades": {
      badges: ["Gesture", "Buddy scribe", "Low movement", "No speech needed"],
      traits: ["gesture", "partner", "lowMovement", "noSpeech", "multimodal", "communicationRich", "fun"]
    },
    "sign-bingo": {
      badges: ["Sign Language", "Printable", "Seated works", "Whole chapter"],
      traits: ["sign", "visual", "printable", "seated", "lowMovement", "communicationRich", "fun"]
    },
    "aac-bingo": {
      badges: ["AAC", "Printable", "Seated works", "Whole chapter"],
      traits: ["aac", "visual", "printable", "seated", "lowMovement", "communicationRich", "fun"]
    },
    "time-capsule": {
      badges: ["Buddy scribe", "Seated works", "Personal choice", "Year-long"],
      traits: ["partner", "seated", "choice", "visual", "know", "lowPressure"]
    },
    "human-bingo": {
      badges: ["Partner option", "10+ people", "Social", "Stationary option"],
      traits: ["partner", "know", "social", "movementOptional"],
      minGroup: 10
    },
    "all-about-me": {
      badges: ["Visual", "Interests", "Small group", "Different response formats"],
      traits: ["visual", "choice", "know", "multimodal", "seated"]
    },
    "find-someone-nv": {
      badges: ["Non-speaking", "Printable", "Partner option", "Stationary option"],
      traits: ["noSpeech", "visual", "printable", "partner", "know", "communicationRich", "movementOptional"]
    },
    "stack-deck": {
      badges: ["No speech needed", "Cards", "Teamwork", "Table option"],
      traits: ["noSpeech", "communicationRich", "teamwork", "seatedOption", "visual", "lowReading"]
    },
    "envelope-game-elem": {
      badges: ["Small teams", "Multiple presentation formats", "Creative", "15+ ideal"],
      traits: ["teamwork", "creative", "multimodal", "partner", "lowMovement"],
      minGroup: 15
    },
    "over-under": {
      badges: ["Active", "Guide adaptation", "Teamwork"],
      traits: ["movementHeavy", "teamwork", "partner"],
      cautions: ["Large open space", "Movement-heavy"]
    },
    "statues": {
      badges: ["Movement", "Visual stop cue", "Partner support", "Music"],
      traits: ["movementHeavy", "visual", "partner", "fun"],
      cautions: ["Open space helpful", "Guide includes a sit-out rule; Hub recommends no elimination"]
    },
    "importance-teamwork": {
      badges: ["5 min", "Seated works", "AAC / sign / draw", "Low prep"],
      traits: ["lowPrep", "seated", "multimodal", "aac", "sign", "visual", "teamwork", "lowPressure"]
    },
    "building-block": {
      badges: ["Seated works", "No speech needed", "Teamwork", "Hands-on"],
      traits: ["seated", "noSpeech", "teamwork", "visual", "communicationRich", "lowReading"]
    },
    "paper-towers": {
      badges: ["Seated works", "Team roles", "Hands-on", "Low reading"],
      traits: ["seated", "teamwork", "partner", "lowReading", "creative"]
    },
    "brain-boggle": {
      badges: ["Small teams", "Language-heavy", "Guide alternative available"],
      traits: ["teamwork", "readingHeavy"],
      cautions: ["Reading/writing heavy"]
    },
    "pass-hoop": {
      badges: ["Active", "Guide replacement noted", "Teamwork"],
      traits: ["movementHeavy", "teamwork"],
      cautions: ["Specific movement pattern", "Guide provides a replacement when this format does not fit"]
    },
    "collective-banner-elem": {
      badges: ["Creative", "Many roles", "Visual", "Collaborative"],
      traits: ["creative", "visual", "choice", "teamwork", "multimodal", "lowPressure"]
    },
    "bubble-talk": {
      badges: ["Seated works", "Non-speaking", "Visual matching", "Team option"],
      traits: ["seated", "noSpeech", "visual", "teamwork", "communicationRich", "readingMedium"]
    },
    "i-have-who": {
      badges: ["ASL", "Printable", "Seated works", "Visual matching"],
      traits: ["sign", "visual", "printable", "seated", "communicationRich", "lowMovement"]
    },
    "asl-i-spy": {
      badges: ["ASL", "Printable", "Pairs or group", "Seated works"],
      traits: ["sign", "visual", "printable", "partner", "seated", "communicationRich"]
    },
    "body-language-posters": {
      badges: ["Visual", "Creative", "Body language", "Partner discussion"],
      traits: ["visual", "creative", "partner", "communicationRich", "seated"]
    },
    "teamwork-brainstorm": {
      badges: ["Visual choices", "AAC / sign / draw", "Any room", "Low pressure"],
      traits: ["visual", "multimodal", "aac", "sign", "teamwork", "lowPressure", "seated"]
    },
    "frustration-reflect": {
      badges: ["Any room", "Multiple response formats", "Passing okay", "5 min"],
      traits: ["multimodal", "passAllowed", "lowPressure", "seated"]
    },
    "pledge": {
      badges: ["5 min", "AAC / sign / listen", "Any room", "Shared close"],
      traits: ["multimodal", "aac", "sign", "seated", "lowPressure"]
    },
    "sept-member-voice": {
      badges: ["Member voice", "Visual choices", "AAC / sign / point", "Passing okay"],
      traits: ["choice", "multimodal", "aac", "sign", "visual", "passAllowed", "lowPressure", "seated"]
    },
    "oct-member-voice": {
      badges: ["Member voice", "Visual choices", "AAC / sign / point", "Passing okay"],
      traits: ["choice", "multimodal", "aac", "sign", "visual", "passAllowed", "lowPressure", "seated"]
    },
    "nov-member-voice": {
      badges: ["Member voice", "Multiple response formats", "Passing okay", "Seated works"],
      traits: ["choice", "multimodal", "passAllowed", "lowPressure", "seated"]
    },
    "dec-member-voice": {
      badges: ["Member voice", "Multiple response formats", "Passing okay", "Seated works"],
      traits: ["choice", "multimodal", "passAllowed", "lowPressure", "seated"]
    },
    "jan-member-voice": {
      badges: ["Member voice", "Multiple response formats", "Passing okay", "Seated works"],
      traits: ["choice", "multimodal", "passAllowed", "lowPressure", "seated"]
    },
    "appreciation-close": {
      badges: ["No prep", "Multiple response formats", "Passing okay", "5 min"],
      traits: ["noPrep", "multimodal", "passAllowed", "lowPressure", "seated"]
    },
    "choose-next": {
      badges: ["Member choice", "Visual vote", "AAC / sign / point", "Seated works"],
      traits: ["choice", "visual", "multimodal", "aac", "sign", "seated", "lowPressure"]
    },
    "spoons-nv": {
      badges: ["Seated game", "Non-speaking", "Cards", "Fast reach"],
      traits: ["seated", "noSpeech", "visual", "fun", "fastReach", "elimination"],
      cautions: ["Quick reaching", "Elimination in the guide"]
    },
    "what-are-you-drawing": {
      badges: ["Tactile", "Drawing", "Non-speaking", "Teamwork"],
      traits: ["noSpeech", "visual", "creative", "teamwork", "touch", "fineMotor"],
      cautions: ["Touch/consent", "Fine-motor drawing"]
    }
  };

  Object.entries(BUILDER_META).forEach(([id, meta]) => {
    if (!activities[id]) return;
    activities[id].builder = {
      ...(activities[id].builder || {}),
      ...meta,
      traits: [...new Set([...(activities[id].builder?.traits || []), ...(meta.traits || [])])],
      badges: [...new Set([...(activities[id].builder?.badges || []), ...(meta.badges || [])])],
      cautions: [...new Set([...(activities[id].builder?.cautions || []), ...(meta.cautions || [])])]
    };
  });

  function pushUnique(key, stage, ids) {
    const cfg = months[key];
    if (!cfg) return;
    cfg[stage] = cfg[stage] || [];
    ids.forEach((id) => {
      if (activities[id] && !cfg[stage].includes(id)) cfg[stage].push(id);
    });
  }

  /* Builder-only broadening. Month pages keep their existing curated lists. */
  pushUnique("elementary:october", "main", ["find-someone-nv", "adapted-charades"]);
  pushUnique("elementary:november", "main", ["building-block", "spoons-nv"]);
  pushUnique("elementary:december", "main", ["bubble-talk", "what-are-you-drawing"]);
  pushUnique("elementary:january", "main", ["sign-bingo", "aac-bingo", "asl-i-spy", "adapted-charades"]);
})();

(() => {
  "use strict";

  const root = document.querySelector("[data-gathering-builder]");
  const monthSelect = document.querySelector("[data-gb-month]");
  const data =
    (typeof BB_MEETING_BUILDER_DATA !== "undefined" ? BB_MEETING_BUILDER_DATA : null) ||
    window.BB_MEETING_BUILDER_DATA;

  if (!root || !monthSelect) return;

  if (!data?.activities || !data?.months) {
    console.error("Build a Gathering: meeting-builder-data.js loaded, but BB_MEETING_BUILDER_DATA was not available.");
    root.innerHTML = `
      <section class="gb-panel">
        <div class="gb-panel-head">
          <span class="gb-kicker">Builder setup</span>
          <h2>We couldn’t load the activity bank.</h2>
          <p>Please check that <strong>meeting-builder-data.js</strong> exists in the same folder and loads before <strong>gathering-builder.js</strong>.</p>
        </div>
      </section>`;
    return;
  }

  /* Make the shared object available both ways for compatibility with
     existing month-page code and this dedicated builder. */
  if (!window.BB_MEETING_BUILDER_DATA) {
    window.BB_MEETING_BUILDER_DATA = data;
  }

  const acts = data.activities;
  const monthLabels = {
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    january: "January",
    any: "Any time"
  };

  const focusLabels = {
    know: "get to know each other",
    friendship: "build friendship & connection",
    teamwork: "work together",
    creative: "create or make something",
    communication: "explore different ways to communicate",
    fun: "keep it social & fun"
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
    print: "printing / prep is okay"
  };

  const fitLabels = {
    seated: "seated or lower movement",
    communication: "different ways to communicate",
    reading: "less reading & writing",
    partner: "partner / buddy support",
    visual: "visual or creative participation",
    lowpressure: "low-pressure participation"
  };

  const monthFromDate = (() => {
    const m = new Date().getMonth();
    return ({ 8: "september", 9: "october", 10: "november", 11: "december", 0: "january" })[m] || "any";
  })();

  monthSelect.value = monthFromDate;

  const state = {
    screen: "home",
    step: 0,
    answers: {
      time: "30",
      group: "",
      focus: "",
      prep: "",
      fit: []
    },
    generated: [],
    chosen: null,
    manual: { share: [], energize: [], main: [], close: [] }
  };

  const questions = [
    {
      key: "time",
      title: "How much time do you have?",
      hint: "We’ll use this to keep the plan realistic, not to fill every minute.",
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
      title: "What would be useful today?",
      hint: "Pick the main thing you want from this gathering. It can still do more than one thing.",
      type: "single",
      choices: [
        ["know", "Get to know each other"],
        ["friendship", "Build friendship & connection"],
        ["teamwork", "Work together"],
        ["creative", "Create or make something"],
        ["communication", "Explore different ways to communicate"],
        ["fun", "Keep it social & fun"]
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
      title: "Anything that would help this work better for your group?",
      hint: "Optional. Choose anything that would be useful when you are picking an activity.",
      type: "multi",
      optional: true,
      choices: [
        ["seated", "Optional movement or lower-movement options"],
        ["communication", "Different ways to communicate"],
        ["reading", "Less reading & writing"],
        ["partner", "Partner support"],
        ["visual", "Visual choices or creative ways to take part"],
        ["lowpressure", "Lower-pressure participation"]
      ]
    }
  ];

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  function monthConfig(month) {
    if (month === "any") return null;
    return data.months[`elementary:${month}`] || null;
  }

  function allElementaryIds() {
    const set = new Set();
    Object.entries(data.months).forEach(([key, cfg]) => {
      if (!key.startsWith("elementary:")) return;
      ["welcome", "main", "close"].forEach((type) => (cfg[type] || []).forEach((id) => set.add(id)));
    });
    return [...set];
  }

  function poolFor(month, type) {
    const cfg = monthConfig(month);
    if (cfg) return (cfg[type] || []).filter((id) => acts[id]);
    return allElementaryIds().filter((id) => acts[id]?.type === type);
  }

  function welcomeStageKey(id) {
    const a = acts[id];
    if (!a || a.type !== "welcome") return "";
    const text = `${a.title || ""} ${a.source || ""} ${a.source_note || ""}`.toLowerCase();
    return /recurring share|share\b|check-?in/.test(text) ? "share" : "energize";
  }

  function stageKey(id) {
    const type = acts[id]?.type || "main";
    if (type === "close") return "close";
    if (type === "main") return "main";
    if (type === "welcome") return welcomeStageKey(id) || "energize";
    return "main";
  }

  function stagePool(month, key) {
    if (key === "main") return poolFor(month, "main");
    if (key === "close") return poolFor(month, "close");

    const monthWelcome = poolFor(month, "welcome");
    let filtered = monthWelcome.filter((id) => stageKey(id) === key);

    if (!filtered.length) {
      filtered = allElementaryIds()
        .filter((id) => acts[id]?.type === "welcome" && stageKey(id) === key);
    }
    return filtered;
  }

  function structuredIds(ids, month, mode = "simple") {
    const out = [...ids].filter(Boolean);
    const present = new Set(out.map(stageKey));

    ["share", "energize", "main", "close"].forEach((key) => {
      if (present.has(key)) return;
      const candidate = pickStage(stagePool(month, key), mode, out);
      if (candidate && !out.includes(candidate)) out.push(candidate);
    });

    const order = { share: 0, energize: 1, main: 2, close: 3 };
    return out.sort((a, b) => order[stageKey(a)] - order[stageKey(b)]);
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
    if (/seated works|seated group|table group|tables or|any room/.test(text)) set.add("seated");
    if (/low movement|stationary version|no running/.test(text)) set.add("lowMovement");
    if (/large open space|movement-heavy|open space helpful|cleared space/.test(text)) set.add("movementHeavy");
    if (/aac|assistive speaking/.test(text)) set.add("aac");
    if (/sign language|\basl\b/.test(text)) set.add("sign");
    if (/gesture|non-verbal|non-speaking|without speaking|no talking|without relying on speech/.test(text)) set.add("communicationRich");
    if (/non-verbal|non-speaking|without speaking|no talking|without relying on speech/.test(text)) set.add("noSpeech");
    if (/partner|buddy|scribe/.test(text)) set.add("partner");
    if (/visual|draw|drawing|picture|symbol|poster|art|colour|collage/.test(text)) set.add("visual");
    if (/print|worksheet|bingo card|caller card/.test(text)) set.add("printable");
    if (/reading-heavy|language-heavy|read and write|worksheet/.test(text)) set.add("readingHeavy");
    if (/pass|watching first|listening is participation|voluntary/.test(text)) set.add("lowPressure");
    return set;
  }

  function activityBadges(id, limit = 4) {
    const a = acts[id];
    if (!a) return [];
    const explicit = a.builder?.badges || [];
    if (explicit.length) return explicit.slice(0, limit);

    const t = traitSet(id);
    const badges = [];
    const add = (label, trait) => { if (t.has(trait) && !badges.includes(label)) badges.push(label); };
    add("No prep", "noPrep");
    add("Seated works", "seated");
    add("AAC", "aac");
    add("Sign / ASL", "sign");
    add("No speech needed", "noSpeech");
    add("Partner option", "partner");
    add("Visual", "visual");
    add("Printable", "printable");
    add("Low pressure", "lowPressure");
    return badges.slice(0, limit);
  }

  function sourceFidelity(a) {
    const source = String(a?.source || "");
    const kind = String(a?.source_kind || "");
    const combined = `${source} ${kind}`;

    if (/teacher hub/i.test(source) && !/program guide|activity guide|non-verbal|best buddies/i.test(combined)) {
      return { label: "Teacher Hub planning idea", tone: "hub" };
    }
    if (/non-verbal activity guide/i.test(source)) {
      return { label: "From the Non-Verbal Activity Guide", tone: "guide" };
    }
    if (/elementary & middle program guide|program guide/i.test(source)) {
      return { label: "From the Program Guide", tone: "guide" };
    }
    if (/activity guide|activity workbook/i.test(source)) {
      return { label: "From the Activity Guide", tone: "guide" };
    }
    return { label: "From a Best Buddies resource", tone: "guide" };
  }

  function groupEstimate(bucket) {
    return ({ small: 5, medium: 10, large: 16, xlarge: 24 })[bucket] || 10;
  }

  function focusScore(id, focus) {
    if (!focus) return 0;
    const a = acts[id];
    const text = hay(a);
    const t = traitSet(id);
    const words = {
      know: ["get to know", "bingo", "time capsule", "all about me", "yarn", "find someone", "interests", "common"],
      friendship: ["friendship", "connection", "common", "appreciation", "buddy", "yarn"],
      teamwork: ["teamwork", "team", "stack", "envelope", "tower", "building", "collaborative"],
      creative: ["creative", "art", "banner", "imagine", "draw", "poster", "colour", "collage"],
      communication: ["gesture", "sign", "aac", "body language", "non-verbal", "non-speaking", "charades", "bubble talk", "asl"],
      fun: ["game", "bingo", "charades", "spoons", "i-spy", "social", "music", "fun"]
    };

    let score = 0;
    (words[focus] || []).forEach((w) => { if (text.includes(w)) score += 4; });
    if (focus === "communication" && t.has("communicationRich")) score += 10;
    if (focus === "teamwork" && t.has("teamwork")) score += 8;
    if (focus === "creative" && (t.has("creative") || t.has("visual"))) score += 7;
    if (focus === "friendship" && t.has("friendship")) score += 8;
    if (focus === "know" && t.has("know")) score += 8;
    if (focus === "fun" && t.has("fun")) score += 7;
    return Math.min(score, 24);
  }

  function scoreActivity(id, answers, mode = "match") {
    const a = acts[id];
    if (!a) return -9999;

    const t = traitSet(id);
    const text = hay(a);
    let score = focusScore(id, answers.focus);

    const fidelity = sourceFidelity(a);
    if (fidelity.tone === "hub") score -= 5;
    else score += 8;

    const group = groupEstimate(answers.group);
    const minGroup = Number(a.builder?.minGroup || 0);
    const maxGroup = Number(a.builder?.maxGroup || 0);
    if (minGroup) score += group >= minGroup ? 5 : -24;
    if (maxGroup) score += group <= maxGroup ? 3 : -10;

    if (answers.prep === "none") {
      if (t.has("noPrep")) score += 14;
      else if (/basic|paper|cards|yarn|markers/.test(text) && !t.has("printable")) score += 2;
      if (t.has("printable") || /art supplies|envelope|shoebox|poster|worksheet/.test(text)) score -= 9;
    } else if (answers.prep === "basic") {
      if (t.has("noPrep")) score += 5;
      if (/paper|markers|cards|yarn|building blocks|art supplies|classroom/.test(text)) score += 5;
      if (t.has("printable")) score -= 2;
    } else if (answers.prep === "print") {
      if (t.has("printable")) score += 8;
      if (/worksheet|bingo|card/.test(text)) score += 3;
    }

    const fit = new Set(answers.fit || []);
    if (fit.has("seated")) {
      if (t.has("seated") || t.has("seatedOption") || t.has("lowMovement")) score += 14;
      if (t.has("movementHeavy")) score -= 30;
    }
    if (fit.has("communication")) {
      if (t.has("communicationRich")) score += 15;
      if (t.has("aac") || t.has("sign") || t.has("noSpeech")) score += 8;
      if (t.has("multimodal")) score += 6;
    }
    if (fit.has("reading")) {
      if (t.has("lowReading") || t.has("noSpeech") || t.has("visual")) score += 10;
      if (t.has("readingHeavy")) score -= 22;
      if (t.has("partner")) score += 5;
    }
    if (fit.has("partner")) {
      if (t.has("partner")) score += 13;
    }
    if (fit.has("visual")) {
      if (t.has("visual") || t.has("creative")) score += 13;
    }
    if (fit.has("lowpressure")) {
      if (t.has("lowPressure") || t.has("passAllowed") || t.has("choice")) score += 13;
      if (t.has("elimination") || t.has("fastReach") || t.has("touch")) score -= 18;
    }

    if (mode === "simple") {
      if (t.has("noPrep")) score += 14;
      if (t.has("seated") || t.has("lowMovement")) score += 7;
      if (t.has("lowPressure")) score += 5;
      if (t.has("printable")) score -= 5;
      if (t.has("movementHeavy") || t.has("touch") || t.has("fastReach")) score -= 12;
      if ((a.builder?.cautions || []).length) score -= 5;
    }

    if (mode === "participation") {
      if (t.has("communicationRich") || t.has("multimodal")) score += 11;
      if (t.has("visual")) score += 7;
      if (t.has("partner")) score += 6;
      if (t.has("seated") || t.has("seatedOption")) score += 5;
      if (t.has("choice") || t.has("lowPressure")) score += 5;
      if (t.has("elimination") || t.has("fastReach") || t.has("touch") || t.has("movementHeavy")) score -= 14;
    }

    return score;
  }

  function rank(ids, answers, mode, exclude = []) {
    return ids
      .filter((id) => acts[id] && !exclude.includes(id))
      .map((id) => ({ id, score: scoreActivity(id, answers, mode) }))
      .sort((a, b) => b.score - a.score || (Number(acts[a.id]?.minutes) || 99) - (Number(acts[b.id]?.minutes) || 99));
  }

  function shortest(ids, exclude = []) {
    return ids
      .filter((id) => acts[id] && !exclude.includes(id))
      .sort((a, b) => (Number(acts[a]?.minutes) || 99) - (Number(acts[b]?.minutes) || 99))[0];
  }

  function pickStage(pool, mode, exclude = []) {
    return rank(pool, state.answers, mode, exclude)[0]?.id || shortest(pool, exclude);
  }

  function buildPlan(mode, excludeMainIds = []) {
    const month = monthSelect.value;
    const target = Number(state.answers.time || 30);

    const share = pickStage(stagePool(month, "share"), mode);
    const energize = pickStage(stagePool(month, "energize"), mode, [share]);
    const close = pickStage(stagePool(month, "close"), mode);

    const mainPool = stagePool(month, "main");
    const baseIds = [share, energize, close].filter(Boolean);
    const base = total(baseIds);
    const desiredMainCount = target >= 45 ? 2 : 1;

    let candidatePool = mainPool.filter((id) => !excludeMainIds.includes(id));
    if (candidatePool.length < desiredMainCount) candidatePool = [...mainPool];

    const available = Math.max(8, target - base);
    const ranked = rank(candidatePool, state.answers, mode)
      .map((x) => {
        const mins = Number(acts[x.id]?.minutes) || 15;
        const timingPenalty = mins > available + 8
          ? (mins - available) * 1.5
          : Math.abs(available - mins) * 0.08;
        return { ...x, score: x.score - timingPenalty };
      })
      .sort((a, b) => b.score - a.score);

    const mains = [];
    for (const candidate of ranked) {
      if (mains.length >= desiredMainCount) break;
      const current = mains.reduce((sum, id) => sum + (Number(acts[id]?.minutes) || 15), 0);
      const next = current + (Number(acts[candidate.id]?.minutes) || 15);
      const allowance = Math.max(6, target >= 45 ? 12 : 8);
      if (base + next <= target + allowance || mains.length === 0) mains.push(candidate.id);
    }

    if (!mains.length && mainPool.length) mains.push(shortest(mainPool));

    let ids = [share, energize, ...mains, close].filter(Boolean);

    /* The Program Guide uses four parts. For a very short gathering,
       keep the same sequence as far as practical without pretending
       every session must run longer than the time the teacher has. */
    if (target <= 20 && total(ids) > target + 7 && energize) {
      ids = ids.filter((id) => id !== energize);
    }

    const communicationRequested =
      state.answers.focus === "communication" ||
      state.answers.fit.includes("communication");

    const label = mode === "simple"
      ? "Keep it simple"
      : communicationRequested
        ? "Communication-rich fit"
        : "More ways to take part";

    const note = mode === "simple"
      ? "Uses Best Buddies source activities while keeping materials and setup especially light."
      : communicationRequested
        ? "Leans toward source activities where communication does not depend on speech alone."
        : "Leans toward source activities with more than one practical way to participate.";

    return { label, note, mode, ids };
  }

  function currentPresetPlan() {
    const month = monthSelect.value;
    const cfg = monthConfig(month);
    let ids = cfg?.preset?.filter((id) => acts[id]) || [];

    if (!ids.length) {
      ids = [
        pickStage(stagePool(month, "share"), "simple"),
        pickStage(stagePool(month, "energize"), "simple"),
        shortest(stagePool(month, "main")),
        shortest(stagePool(month, "close"))
      ].filter(Boolean);
    } else {
      ids = structuredIds(ids, month, "simple");
    }

    if (total(ids) > 38) {
      const energize = ids.find((id) => stageKey(id) === "energize");
      if (energize) ids = ids.filter((id) => id !== energize);
    }

    return {
      label: "Quick 30-minute plan",
      note: "A source-led starting point for this month. Use it as-is or swap a piece.",
      mode: "quick",
      ids
    };
  }

  function total(ids) {
    return ids.reduce((sum, id) => sum + (Number(acts[id]?.minutes) || 0), 0);
  }

  function stage(id) {
    return ({
      share: "Share",
      energize: "Energize",
      main: "Core Activity",
      close: "Take-Away"
    })[stageKey(id)] || "Core Activity";
  }

  function answerSummary() {
    const pieces = [];
    if (state.answers.time) pieces.push(`${state.answers.time} min`);
    if (state.answers.group) pieces.push(groupLabels[state.answers.group]);
    if (state.answers.focus) pieces.push(focusLabels[state.answers.focus]);
    if (state.answers.prep) pieces.push(prepLabels[state.answers.prep]);
    (state.answers.fit || []).forEach((v) => fitLabels[v] && pieces.push(fitLabels[v]));
    return pieces;
  }

  function fitReasons(id) {
    const a = acts[id];
    if (!a) return [];
    const t = traitSet(id);
    const reasons = [];

    if (state.answers.focus && focusScore(id, state.answers.focus) >= 7) reasons.push(`matches your goal to ${focusLabels[state.answers.focus]}`);

    if (state.answers.prep === "none" && t.has("noPrep")) reasons.push("almost no prep");
    if (state.answers.prep === "basic" && !t.has("printable") && !/special prep|print/.test(hay(a))) reasons.push("basic setup");
    if (state.answers.prep === "print" && t.has("printable")) reasons.push("you’re okay with printables");

    const fit = new Set(state.answers.fit || []);
    if (fit.has("seated") && (t.has("seated") || t.has("seatedOption") || t.has("lowMovement"))) reasons.push("seated / lower-movement participation");
    if (fit.has("communication") && (t.has("communicationRich") || t.has("multimodal") || t.has("aac") || t.has("sign"))) reasons.push("more than one way to communicate");
    if (fit.has("reading") && (t.has("lowReading") || t.has("visual") || t.has("noSpeech"))) reasons.push("keeps reading and writing lighter");
    if (fit.has("partner") && t.has("partner")) reasons.push("partner or buddy support");
    if (fit.has("visual") && (t.has("visual") || t.has("creative"))) reasons.push("visual / creative participation");
    if (fit.has("lowpressure") && (t.has("lowPressure") || t.has("passAllowed") || t.has("choice"))) reasons.push("lower-pressure participation");

    const minGroup = Number(a.builder?.minGroup || 0);
    if (state.answers.group && (!minGroup || groupEstimate(state.answers.group) >= minGroup)) reasons.push("fits your group size");

    return [...new Set(reasons)].slice(0, 3);
  }

  function fitReasonText(id) {
    const reasons = fitReasons(id);
    if (!reasons.length) return "Fits this month and the plan you’re building.";
    return reasons.join(" · ");
  }

  function cautions(id) {
    return acts[id]?.builder?.cautions || [];
  }

  function badgesMarkup(id, limit = 4) {
    const badges = activityBadges(id, limit);
    if (!badges.length) return "";
    return `<div class="gb-badges">${badges.map((b) => `<span class="gb-badge">${esc(b)}</span>`).join("")}</div>`;
  }

  function sourcePill(a) {
    const fidelity = sourceFidelity(a);
    return `<span class="gb-source-pill ${esc(fidelity.tone)}">${esc(fidelity.label)}</span>`;
  }

  function planPiece(id) {
    const a = acts[id];
    if (!a) return "";
    return `<div class="gb-piece">
      <small>${esc(stage(id))}</small>
      <div class="gb-piece-copy">
        <strong>${esc(a.title)}</strong>
        <p>${esc(a.summary || "")}</p>
        ${badgesMarkup(id, 3)}
        <span class="gb-piece-why"><strong>Why it fits:</strong> ${esc(fitReasonText(id))}</span>
      </div>
      <span class="gb-piece-time">${esc(a.official || `${a.minutes || ""} min`)}</span>
    </div>`;
  }

  function renderHome() {
    state.screen = "home";
    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Build a gathering</span>
        <h2>How do you want to plan?</h2>
        <p>Both paths use the same Best Buddies activity bank. The builder simply helps you narrow it down.</p>
      </div>

      <div class="gb-paths">
        <button class="gb-path guided" type="button" data-path="guided">
          <small>Answer five quick questions</small>
          <strong>Build it for me</strong>
          <span>Tell us what you have to work with and we’ll suggest two source-led ways to put the gathering together.</span>
          <b>→</b>
        </button>

        <button class="gb-path manual" type="button" data-path="manual">
          <small>Browse the activity bank</small>
          <strong>I’ll build my own</strong>
          <span>Choose from Share, Energize, Core Activity, and Take-Away, using the same structure as the Program Guide.</span>
          <b>→</b>
        </button>
      </div>

      <div class="gb-quick">
        <button type="button" data-quick>In a hurry? Give me a simple 30-minute plan →</button>
      </div>
    </section>`;
  }

  function renderQuestion() {
    const q = questions[state.step];
    const val = state.answers[q.key];
    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Build it for me</span>
        <h2>A few quick choices.</h2>
        <p>A few practical details help narrow the activity bank. Nothing here asks you to sort or label the people in your group.</p>
      </div>

      <div class="gb-progress" style="--gb-steps:${questions.length}">
        ${questions.map((_, i) => `<span class="${i < state.step ? "done" : i === state.step ? "current" : ""}"></span>`).join("")}
      </div>

      <div class="gb-question">
        <span class="gb-question-count">Question ${state.step + 1} of ${questions.length}${q.optional ? " · optional" : ""}</span>
        <h3>${esc(q.title)}</h3>
        <p class="gb-question-hint">${esc(q.hint || "")}</p>

        <div class="gb-choice-grid">
          ${q.choices.map(([v, label]) => {
            const selected = q.type === "multi" ? (val || []).includes(v) : val === v;
            if (q.type === "multi") {
              return `<label class="gb-choice${selected ? " selected" : ""}">
                <input type="checkbox" value="${esc(v)}" data-answer="${esc(q.key)}" ${selected ? "checked" : ""}>
                <span>${esc(label)}</span>
              </label>`;
            }
            return `<button type="button" class="gb-choice${selected ? " selected" : ""}" data-single="${esc(q.key)}" data-value="${esc(v)}">${esc(label)}</button>`;
          }).join("")}
        </div>

        <div class="gb-question-actions">
          <button class="gb-btn secondary" type="button" data-back>${state.step === 0 ? "Back to choices" : "Back"}</button>
          <button class="gb-btn primary" type="button" data-next>${state.step === questions.length - 1 ? "Build my options →" : "Next →"}</button>
        </div>
      </div>
    </section>`;
  }

  function renderResults() {
    state.screen = "results";
    const simple = buildPlan("simple");
    const simpleMains = simple.ids.filter((id) => acts[id]?.type === "main");
    let participation = buildPlan("participation", simpleMains);

    if (JSON.stringify(simple.ids) === JSON.stringify(participation.ids)) {
      participation = buildPlan("participation");
      const alt = rank(poolFor(monthSelect.value, "main"), state.answers, "participation", simpleMains)[0]?.id;
      if (alt) {
        const idx = participation.ids.findIndex((id) => acts[id]?.type === "main");
        if (idx >= 0) participation.ids[idx] = alt;
      }
    }

    state.generated = [simple, participation];
    const summary = answerSummary();

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">${esc(monthLabels[monthSelect.value])}</span>
        <h2>Two source-led options.</h2>
        <p>Both use Best Buddies source activities wherever the activity bank gives us a good fit. One keeps setup especially simple; the other prioritizes more participation options.</p>
        ${summary.length ? `<div class="gb-answer-summary">${summary.map((s) => `<span>${esc(s)}</span>`).join("")}</div>` : ""}
      </div>

      <div class="gb-results">
        <div class="gb-plan-options">
          ${state.generated.map((plan, i) => `<article class="gb-plan-option">
            <div class="gb-plan-option-head">
              <small>Option ${i + 1}</small>
              <h4>${esc(plan.label)}</h4>
              <p>${esc(plan.note)} <strong>About ${total(plan.ids)} minutes</strong> using Hub planning estimates where a source lists timing as flexible.</p>
            </div>
            <div class="gb-plan-pieces">${plan.ids.map(planPiece).join("")}</div>
            <button class="gb-use-plan" type="button" data-use-plan="${i}">Use this plan →</button>
          </article>`).join("")}
        </div>

        <div class="gb-question-actions">
          <button class="gb-btn secondary" type="button" data-edit-answers>Change my answers</button>
          <button class="gb-btn secondary" type="button" data-home>Start another way</button>
        </div>
      </div>
    </section>`;
  }

  function candidateAlternatives(currentId, plan) {
    const key = stageKey(currentId);
    const pool = stagePool(monthSelect.value, key);
    const exclude = plan.ids.filter((id) => id !== currentId);
    return rank(
      pool,
      state.answers,
      plan.mode === "simple" ? "simple" : "participation",
      exclude
    ).map((x) => x.id);
  }

  function renderFinal(plan) {
    state.screen = "final";
    state.chosen = {
      label: plan.label,
      note: plan.note,
      mode: plan.mode || "manual",
      ids: [...plan.ids]
    };

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Ready to use</span>
        <h2>Your gathering.</h2>
        <p>The four Program Guide pieces stay visible. Open the detail only when you want participation notes or the original source.</p>
      </div>

      <div class="gb-final">
        <div class="gb-final-top">
          <div>
            <h3>${esc(monthLabels[monthSelect.value])} gathering</h3>
            <p class="gb-final-plan-note">${esc(state.chosen.note || "")}</p>
          </div>
          <span class="gb-total">About ${total(state.chosen.ids)} min</span>
        </div>

        <div class="gb-final-items">
          ${state.chosen.ids.map((id, index) => finalItem(id, index)).join("")}
        </div>

        <div class="gb-final-actions">
          <button class="gb-print" type="button" data-print>Print / Save PDF</button>
          <button class="gb-email" type="button" data-email>Email plan</button>
          <button class="gb-edit" type="button" data-edit-plan>Choose a different plan</button>
          <button class="gb-restart" type="button" data-home>Start over</button>
        </div>
      </div>
    </section>`;
  }

  function finalItem(id, index) {
    const a = acts[id];
    if (!a) return "";
    const steps = Array.isArray(a.steps) ? a.steps : [];
    const warning = cautions(id);
    const fidelity = sourceFidelity(a);
    const showReason = state.chosen?.mode !== "manual";

    return `<article class="gb-final-item">
      <span class="gb-final-stage">${esc(stage(id))}</span>
      <h4>${esc(a.title)}</h4>
      <p>${esc(a.summary || "")}</p>
      ${badgesMarkup(id, 5)}

      <div class="gb-final-meta">
        <strong>Time:</strong> ${esc(a.official || `${a.minutes || ""} min`)}
        · <strong>Materials:</strong> ${esc(a.prep || "See source")}
        · <strong>Space:</strong> ${esc(a.space || "Flexible")}
      </div>

      ${steps.length ? `<ol class="gb-final-steps">${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}

      ${warning.length ? `<div class="gb-watch"><strong>Worth noticing:</strong> ${warning.map(esc).join(" · ")}</div>` : ""}

      <details class="gb-access-detail">
        <summary>Ways to participate + source</summary>
        <p>${esc(a.participation || a.modes || "Use the participation options that fit your group.")}</p>
        <div class="gb-fidelity-row">
          <span class="gb-source-pill ${esc(fidelity.tone)}">${esc(fidelity.label)}</span>
          ${a.source_note ? `<span>${esc(a.source_note)}</span>` : ""}
        </div>
      </details>

      <div class="gb-source">
        <span><strong>Source:</strong> ${esc(a.source || "Teacher Hub planning support")}</span>
        ${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">Open original ↗</a>` : ""}
      </div>

      <button class="gb-swap" type="button" data-swap="${index}">Swap this</button>
    </article>`;
  }

  function swap(index) {
    if (!state.chosen) return;
    const currentId = state.chosen.ids[index];
    const alts = candidateAlternatives(currentId, state.chosen);
    if (!alts.length) return;
    state.chosen.ids[index] = alts[0];
    renderFinal(state.chosen);
  }

  function renderManual() {
    state.screen = "manual";
    const month = monthSelect.value;
    const groups = [
      ["share", "1 · Share", "A short way to arrive, connect, or share something together."],
      ["energize", "2 · Energize", "A brief activity to get the group engaged before the core activity."],
      ["main", "3 · Core Activity", "The main friendship or chapter activity from the source guides."],
      ["close", "4 · Take-Away", "A short reflection, pledge, or close from the guide."]
    ];

    root.innerHTML = `<section class="gb-panel">
      <div class="gb-panel-head">
        <span class="gb-kicker">Build my own</span>
        <h2>Choose the four parts.</h2>
        <p>This follows the Program Guide structure. Choose what fits, and open the original source whenever you want the full wording or printable.</p>
      </div>

      <div class="gb-manual">
        <div class="gb-manual-intro">
          <p>Participation notes stay with each activity, so you can see the options already included in the guide and any clearly labelled Teacher Hub planning note.</p>
        </div>

        ${groups.map(([type, title, help]) => `<section class="gb-manual-stage">
          <div class="gb-manual-stage-head">
            <h4>${esc(title)}</h4>
            <p>${esc(help)}</p>
          </div>
          <div class="gb-activity-grid">
            ${stagePool(month, type).map((id) => activityCard(id)).join("")}
          </div>
        </section>`).join("")}

        <div class="gb-manual-plan">
          <div>
            <strong>${manualIds().length ? `${manualIds().length} pieces selected` : "Start choosing above"}</strong>
            <span>${manualIds().length ? ` · About ${total(manualIds())} minutes` : " · Your plan will build here."}</span>
          </div>
          <button type="button" data-use-manual ${manualIds().length ? "" : "disabled"}>Use my plan →</button>
        </div>

        <div class="gb-question-actions">
          <button class="gb-btn secondary" type="button" data-home>Back to planning choices</button>
        </div>
      </div>
    </section>`;
  }

  function manualIds() {
    return [
      ...state.manual.share,
      ...state.manual.energize,
      ...state.manual.main,
      ...state.manual.close
    ];
  }

  function activityCard(id) {
    const a = acts[id];
    if (!a) return "";
    const type = stageKey(id);
    const selected = state.manual[type].includes(id);
    const fidelity = sourceFidelity(a);
    const warning = cautions(id);

    return `<article class="gb-activity${selected ? " selected" : ""}">
      <div class="gb-activity-source">${sourcePill(a)}</div>
      <strong>${esc(a.title)}</strong>
      <p>${esc(a.summary || "")}</p>
      ${badgesMarkup(id, 4)}
      ${warning.length ? `<div class="gb-card-watch">Fit note: ${warning.map(esc).join(" · ")}</div>` : ""}
      <div class="gb-activity-meta"><span>${esc(a.official || "Flexible")}</span><span>${esc(a.prep || "See source")}</span></div>
      <details class="gb-card-detail">
        <summary>Ways to join + source</summary>
        <p>${esc(a.participation || a.modes || "Use the participation options that fit your group.")}</p>
        ${a.source_note ? `<small>${esc(a.source_note)}</small>` : ""}
        ${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">Open original resource ↗</a>` : ""}
      </details>
      <button type="button" data-manual-toggle="${esc(id)}">${selected ? "Remove" : "Add to plan"}</button>
    </article>`;
  }

  function toggleManual(id) {
    const a = acts[id];
    if (!a) return;

    const type = stageKey(id);
    const arr = state.manual[type];
    const exists = arr.includes(id);

    if (exists) {
      state.manual[type] = arr.filter((x) => x !== id);
    } else if (type === "main") {
      if (state.manual.main.length >= 2) state.manual.main.shift();
      state.manual.main.push(id);
    } else {
      state.manual[type] = [id];
    }

    renderManual();
  }

  function emailPlan() {
    if (!state.chosen) return;
    const lines = [
      `Best Buddies ${monthLabels[monthSelect.value]} Gathering`,
      `About ${total(state.chosen.ids)} minutes (Hub planning estimate where source timing is flexible)`,
      ""
    ];

    state.chosen.ids.forEach((id) => {
      const a = acts[id];
      const fidelity = sourceFidelity(a);
      lines.push(`${stage(id)}: ${a.title} (${a.official || `${a.minutes || ""} min`})`);
      if (a.summary) lines.push(a.summary);
      if (a.prep) lines.push(`Materials: ${a.prep}`);
      if (a.space) lines.push(`Space: ${a.space}`);
      if (a.participation) lines.push(`Ways to take part: ${a.participation}`);
      lines.push(`${fidelity.label}: ${a.source || "Teacher Hub planning support"}`);
      if (a.url) lines.push(`Source: ${a.url}`);
      lines.push("");
    });

    lines.push("Built with the Best Buddies Canada Teacher Hub.");
    const subject = encodeURIComponent(`Best Buddies ${monthLabels[monthSelect.value]} gathering plan`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function printPlan() {
    const details = [...document.querySelectorAll(".gb-final .gb-access-detail")];
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
      state.screen = "guided";
      renderQuestion();
      return;
    }

    if (t.matches("[data-path='manual']")) {
      renderManual();
      return;
    }

    if (t.matches("[data-quick]")) {
      renderFinal(currentPresetPlan());
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
        t.textContent = "Choose one first";
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
      swap(Number(t.dataset.swap));
      return;
    }

    if (t.matches("[data-edit-plan]")) {
      renderResults();
      return;
    }

    if (t.matches("[data-print]")) {
      printPlan();
      return;
    }

    if (t.matches("[data-email]")) {
      emailPlan();
      return;
    }

    if (t.matches("[data-manual-toggle]")) {
      toggleManual(t.dataset.manualToggle);
      return;
    }

    if (t.matches("[data-use-manual]") && manualIds().length) {
      renderFinal({ label: "My plan", note: "Built by you from the activity bank.", mode: "manual", ids: manualIds() });
    }
  });

  root.addEventListener("change", (e) => {
    const input = e.target.closest("[data-answer]");
    if (!input) return;
    const key = input.dataset.answer;
    if (key !== "fit") return;

    state.answers.fit = [...root.querySelectorAll(`[data-answer="fit"]:checked`)].map((el) => el.value);
    renderQuestion();
  });

  monthSelect.addEventListener("change", () => {
    state.generated = [];
    state.chosen = null;
    state.manual = { share: [], energize: [], main: [], close: [] };
    renderHome();
  });

  renderHome();
})();
