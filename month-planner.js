(() => {
  'use strict';

  const PAGE_KEY = `${document.body?.dataset.program || 'general'}:${document.body?.dataset.month || 'general'}`;

  const STORAGE = {
    view: 'bbTeacherHubMonthView',
    plan: `bbTeacherHubMeetingPlan:${PAGE_KEY}`
  };

  const URLS = {
    programGuide: 'https://drive.google.com/file/d/1Wl6fB-vg2FlNzpQPuPY_LG9j1gj1mGJx/view?usp=drive_link',
    activityGuide: 'https://drive.google.com/file/d/1owF-DwEMSzVrZfnhwWE3pCyLUyCffi4C/view?usp=drive_link',
    activityGuideVol2: 'https://bestbuddies.ca/wp-content/uploads/2023/09/Elementary-Middle-School-Activity-Guide-.pdf',
    workbook: 'https://drive.google.com/file/d/1IfXfxQdiJmHe3Uk5k4GA96OHUnd_K0yd/view?usp=drive_link',
    nonVerbalGuide: 'https://drive.google.com/file/d/1oQwyeOMXP2vCxRpPvBJyBXKP8wTOOdVO/view?usp=sharing',
    helpfulResources: 'https://bestbuddies.ca/helpful-resources/',
    sensitivityTraining: 'https://learn.bestbuddies.ca/course/view.php?id=3',
    highSchoolManual: 'https://drive.google.com/file/d/1Fnh1560fLhjbFqBnH4MzfvVluslO0Hht/view?usp=drive_link',
    highSchoolActivityGuide: 'https://drive.google.com/file/d/1dht5evV19RhJQ51Y2CumvTtCpUm1tGpy/view?usp=drive_link',
    peerBuddyGuide: 'https://bestbuddies.ca/wp-content/uploads/2023/09/Peer-Buddy-Guide.pdf',
    buddyGuide: 'https://bestbuddies.ca/wp-content/uploads/2023/09/Buddy-Guide.pdf',
    interviewQuestions: 'https://bestbuddies.ca/wp-content/uploads/2023/09/Interview-Questions.pdf'
  };

  const ACTIVITIES = {
    'ultimate-rps': {
      title: 'Ultimate Rock, Paper, Scissors',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 1',
      url: URLS.programGuide,
      time: '5 min',
      min: 5,
      max: 5,
      materials: 'Appropriate open space.',
      bestFor: 'A quick energizer for a group that enjoys active play.',
      summary: 'Participants play Rock, Paper, Scissors in pairs. Winners continue to new rounds while other participants become supporters until the group reaches a final round.',
      participation: 'This activity is movement-based. If that format does not work well for your group, choose another opener from the activity bank rather than making movement the price of participation.',
      participationSource: false,
      tags: ['5 min', 'Active', 'Whole group']
    },

    'defining-friendship': {
      title: 'Defining Friendship',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 1',
      url: URLS.programGuide,
      time: '15–20 min',
      min: 15,
      max: 20,
      materials: 'Person Outline copies, markers or pens, chart paper with a large person outline, and tape.',
      bestFor: 'A new chapter exploring what friendship can look and feel like.',
      summary: 'Pairs add words and drawings that describe qualities of a good friend, then contribute ideas to a shared friendship outline the chapter can keep and revisit.',
      participation: 'Words and drawings can both be used. Pairing gives participants another way to contribute ideas without requiring everyone to present in the same way.',
      participationSource: false,
      tags: ['15–20 min', 'Low movement', 'Pairs', 'Creative']
    },

    'pass-the-yarn': {
      title: 'Pass the Yarn',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 1',
      url: URLS.programGuide,
      time: '15–20 min',
      min: 15,
      max: 20,
      materials: 'A ball of yarn and enough room for the group to gather together.',
      bestFor: 'Learning names, sharing interests, and creating a visible sense of connection.',
      summary: 'Participants share their name and something about themselves while passing yarn across the group and keeping hold of a section, creating a web that represents connection.',
      participation: 'The guide includes a modification for participants using an assistive speaking device. Plan names or preferred information in advance when that is helpful.',
      participationSource: true,
      tags: ['15–20 min', 'Names', 'AAC option', 'Whole group']
    },

    'best-buddies-pledge': {
      title: 'Best Buddies Pledge',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide',
      url: URLS.programGuide,
      time: '5 min',
      min: 5,
      max: 5,
      materials: 'Best Buddies Pledge from the Program Guide or current pledge form.',
      bestFor: 'A simple shared close.',
      summary: 'Use the Best Buddies Pledge as the Take-Away at the end of a gathering.',
      participation: 'Participation in a shared close can include speaking, signing, AAC, reading along, listening, or another meaningful way of joining the group.',
      participationSource: false,
      tags: ['5 min', 'Close', 'Low prep']
    },

    'imagine-boards': {
      title: 'Imagine Boards',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Activity Guide · Volume 2',
      url: URLS.activityGuideVol2,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Construction paper, markers, and crayons. Pictures or magazine images can also be used.',
      bestFor: 'A creative way to share hopes and goals for the Best Buddies year.',
      summary: 'Participants create a board using words, symbols, or pictures to show what they hope will happen or what they hope to accomplish during the year.',
      participation: 'The guide suggests partner support when reading, writing, or asking questions is difficult. The activity itself already allows words, symbols, and pictures.',
      participationSource: true,
      tags: ['Flexible', 'Creative', 'Visual', 'Partner option']
    },

    'back-to-school-mad-lib': {
      title: 'Back-to-School Mad Lib',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Activity Guide · Volume 2',
      url: URLS.activityGuideVol2,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Mad Lib worksheet for each pair and pens or pencils.',
      bestFor: 'Pairs who enjoy language, humour, and working together.',
      summary: 'Pairs build a silly Mad Lib together, with one partner prompting and recording while the other provides words. Roles can switch if time allows.',
      participation: 'The guide includes partner support for reading and writing and suggests pre-programming useful words on an assistive speaking device when appropriate.',
      participationSource: true,
      tags: ['Flexible', 'Pairs', 'Low movement', 'AAC option']
    },

    'time-capsule': {
      title: 'Time Capsule',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary School Activity Guide · Third Edition',
      url: URLS.activityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'A shoebox, questionnaires, pens or pencils, and one or more small items participants choose to bring.',
      bestFor: 'Getting to know one another now and creating something to revisit at year-end.',
      summary: 'Participants complete prompts and add an item that represents them to a chapter time capsule, which can be reopened at the final chapter meeting.',
      participation: 'The guide explicitly allows participants to pair up with someone who can scribe for them.',
      participationSource: true,
      tags: ['Flexible', 'Personal', 'Scribe option', 'Year-long']
    },

    'human-bingo': {
      title: 'Human Bingo',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary School Activity Guide · Third Edition',
      url: URLS.activityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Writing tools and one bingo grid per participant.',
      bestFor: 'Groups of more than 10 participants who want to meet several people and discover shared characteristics.',
      summary: 'Participants talk with people in the group to find someone who matches prompts on the bingo grid and add that person’s name to the corresponding square.',
      participation: 'The guide notes that when the activity is done in buddy pairs, only one partner needs to read and write.',
      participationSource: true,
      tags: ['Flexible', '10+ people', 'Social', 'Partner option']
    },

    'my-best-buddies-flag': {
      title: 'My Best Buddies Flag',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 2',
      url: URLS.programGuide,
      time: '30 min',
      min: 30,
      max: 30,
      materials: 'My Best Buddies Flag printouts, markers or crayons, and tape.',
      bestFor: 'Learning about interests while practising listening and introducing a partner.',
      summary: 'Participants decorate sections of a personal flag with things about themselves, share with a partner, and then use what they learned to introduce their partner to the group.',
      participation: 'The guide includes an assistive speaking device modification that can be prepared in advance with a partner’s name and a few details about them.',
      participationSource: true,
      tags: ['30 min', 'Creative', 'Pairs', 'AAC option']
    },

    'best-buddies-bingo': {
      title: 'Best Buddies Bingo',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 3',
      url: URLS.programGuide,
      time: '25 min',
      min: 25,
      max: 25,
      materials: 'Best Buddies Bingo sheets and markers.',
      bestFor: 'Discovering commonalities across the group.',
      summary: 'Participants find people who match descriptions on the Best Buddies Bingo sheet, then come back together to notice similarities across the chapter.',
      participation: 'The guide recommends partner support when reading, writing, or asking questions is difficult.',
      participationSource: true,
      tags: ['25 min', 'Social', 'Common interests', 'Partner option']
    },

    'seeking-common-ground': {
      title: 'I’m Seeking Common Ground',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Week 4',
      url: URLS.programGuide,
      time: '25 min',
      min: 25,
      max: 25,
      materials: 'Chairs and the sample question list from the Program Guide.',
      bestFor: 'Exploring shared preferences and experiences.',
      summary: 'Participants respond to statements about preferences or experiences and notice the common ground they share with others in the group.',
      participation: 'The Program Guide specifically says to replace this activity with “Raise Your Hand If” for participants using wheelchairs or walkers.',
      participationSource: true,
      tags: ['25 min', 'Common interests', 'Movement', 'Guide adaptation']
    },

    'sign-language-bingo': {
      title: 'Sign Language Bingo',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada Non-Verbal Activity Guide',
      url: URLS.nonVerbalGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Sign Language bingo cards, markers, and caller cards. Printables are included in the guide.',
      bestFor: 'A communication-focused bingo activity that can be played by participants who use Sign Language and by the wider chapter.',
      summary: 'A caller demonstrates signs from the deck and participants mark matching signs on their bingo cards.',
      participation: 'This activity comes directly from the Non-Verbal Activity Guide and is designed around Sign Language as a method of communication.',
      participationSource: true,
      tags: ['Flexible', 'Sign Language', 'Low movement', 'Printable']
    },

    'aac-bingo': {
      title: 'AAC Device Bingo',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada Non-Verbal Activity Guide',
      url: URLS.nonVerbalGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'AAC-inspired bingo cards, markers, and caller cards. Printables are included in the guide.',
      bestFor: 'A communication-focused group activity built around AAC symbols and word recognition.',
      summary: 'The caller uses words or actions from the deck while participants mark matching symbols on their cards.',
      participation: 'The guide explicitly includes calling and responding with a personal AAC device.',
      participationSource: true,
      tags: ['Flexible', 'AAC', 'Low movement', 'Printable']
    },

    'raise-your-hand-if': {
      title: 'Raise Your Hand If',
      sourceType: 'Official Best Buddies resource',
      source: 'Elementary & Middle School Program Guide · Additional Activities',
      url: URLS.programGuide,
      time: '10 min',
      min: 10,
      max: 10,
      materials: 'Sample statements from the Program Guide and a cleared area for the group.',
      bestFor: 'Finding common interests with a lower-movement format.',
      summary: 'One participant reads a statement and people for whom it applies raise a hand and keep it raised. The activity can be repeated with new statements.',
      participation: 'The Program Guide specifically recommends this as the replacement for “I’m Seeking Common Ground” for participants using wheelchairs or walkers.',
      participationSource: true,
      tags: ['10 min', 'Common interests', 'Lower movement', 'Guide adaptation']
    },

    'hs-time-capsule': {
      title: 'Time Capsule',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Time Capsule',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'A shoebox, pens or pencils, questionnaires from the guide, and one or more small items participants choose to bring.',
      bestFor: 'Getting to know one another and creating something the chapter can revisit at year-end.',
      summary: 'Participants complete prompts, share an item that represents them, and place the responses and items in a chapter time capsule to reopen at the final meeting of the year.',
      participation: 'The guide explicitly says participants may pair up if they would like someone to scribe for them.',
      participationSource: true,
      tags: ['Flexible', 'Personal', 'Scribe option', 'Year-long']
    },

    'hs-human-bingo': {
      title: 'Human Bingo',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Human Bingo',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Writing tools and one bingo grid per participant with common-interest or characteristic prompts.',
      bestFor: 'Groups of more than 10 participants who want to meet several people and discover shared characteristics.',
      summary: 'Participants talk with people in the group to find someone who matches prompts on the bingo grid and add that person’s name to the corresponding square.',
      participation: 'The guide notes that when Human Bingo is done in buddy pairs, only one partner needs to read and write.',
      participationSource: true,
      tags: ['Flexible', '10+ people', 'Social', 'Partner option']
    },

    'hs-two-truths': {
      title: 'Two Truths and a Lie',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Two Truths and a Lie',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'None.',
      bestFor: 'A low-prep get-to-know-you activity for a group that enjoys guessing and sharing personal facts.',
      summary: 'Participants think of two true statements and one false statement about themselves. The rest of the group guesses which statement is the lie before the answer is revealed.',
      participation: 'The guide describes spoken turn-taking. If speaking to the whole group is not a good fit for someone, use a communication format that works for that participant or choose another activity.',
      participationSource: false,
      tags: ['Flexible', 'No materials', 'Whole group', 'Low movement']
    },

    'hs-collective-banner': {
      title: 'Collective Best Buddies Banner',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Collective Best Buddies Banner',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'A large piece of butcher paper, art supplies such as paint, crayons, pastels or markers, and a dark marker for the main Best Buddies lettering.',
      bestFor: 'A collaborative chapter activity that creates something the group can use throughout the year.',
      summary: 'The group decorates a shared Best Buddies banner. The guide suggests using names, handprints, school colours, themes, and other personal touches.',
      participation: 'The guide invites everyone to work together on the banner. The Teacher Hub recommends offering several ways to contribute so participation is not dependent on writing, drawing, speaking, or fine-motor skills alone.',
      participationSource: false,
      tags: ['Flexible', 'Creative', 'Collaborative', 'Low pressure']
    },

    'hs-envelope-game': {
      title: 'The Envelope Game',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · The Envelope Game',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Four to six envelopes, each containing a skit or story prompt.',
      bestFor: 'Groups of more than 15 that enjoy working in small teams and sharing creative responses.',
      summary: 'Teams receive a prompt, get time to prepare, and then share their interpretation while the other teams guess the prompt.',
      participation: 'The guide explicitly allows teams to present through acting, singing, storytelling, or miming, giving groups more than one way to respond.',
      participationSource: true,
      tags: ['Flexible', '15+ people', 'Teamwork', 'Multiple formats']
    },

    'hs-who-am-i': {
      title: 'Who Am I?',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Who Am I?',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Sticky notes with well-known people or character names written on them.',
      bestFor: 'A low-prep guessing game for groups that enjoy asking and answering clues.',
      summary: 'Each participant has a character or well-known person name they cannot see and asks the group questions to figure out who they are.',
      participation: 'The guide assumes question-and-answer turn-taking. If that format creates a barrier, use AAC, written or visual choices, yes/no responses, partner support, or choose another activity that better fits the group.',
      participationSource: false,
      tags: ['Flexible', 'Low prep', 'Question game', 'Low movement']
    },

    'hs-photo-scavenger': {
      title: 'Photo Scavenger Hunt',
      sourceType: 'Official Best Buddies resource',
      source: 'Best Buddies Canada High School / University & College Activity Guide · Photo Scavenger Hunt',
      url: URLS.highSchoolActivityGuide,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'A scavenger hunt list and something to take photos with, such as a phone or camera.',
      bestFor: 'Buddy pairs or groups of three who enjoy exploring a school, park, or other planned setting together.',
      summary: 'Small groups search for items on a list, take photos, and return at an agreed time and place to share what they found.',
      participation: 'The guide allows the hunt to be scaled to a school, park, city, or other setting. The Teacher Hub recommends choosing a route and format that are accessible to everyone and following school expectations for photography and privacy.',
      participationSource: false,
      tags: ['Flexible', 'Pairs / groups of 3', 'Movement', 'Photos']
    },

    'all-about-me': {
      title: 'All About Me',
      sourceType: 'Best Buddies Program Calendar + workbook',
      source: 'October Program Calendar · Elementary & Middle Activity Workbook',
      url: URLS.workbook,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'The All About Me worksheet plus writing or drawing tools.',
      bestFor: 'Sharing favourite things, interests, and a little about each participant.',
      summary: 'Participants complete an All About Me page and can use it to share interests with a buddy or small group and look for things they have in common.',
      participation: 'The workbook offers written and drawing prompts. If the worksheet format is not a good fit for someone, use the same prompts in a communication format that works for that participant.',
      participationSource: false,
      tags: ['Flexible', 'Interests', 'Visual', 'Small group']
    },

    'pumpkin-decorating': {
      title: 'Pumpkin Decorating',
      sourceType: 'Best Buddies Program Calendar',
      source: 'October Program Calendar · optional seasonal idea',
      url: URLS.helpfulResources,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Pumpkins plus decorating materials such as paint, stickers, markers, craft supplies, or pre-cut designs.',
      bestFor: 'An optional seasonal social or creative station.',
      summary: 'Participants can work individually or in pairs to decorate pumpkins as part of a Halloween-themed gathering.',
      participation: 'The Program Calendar specifically suggests decorating alternatives to carving, including paint, stickers, markers, craft supplies, and pre-cut designs.',
      participationSource: true,
      tags: ['Flexible', 'Creative', 'Seasonal', 'Choice']
    },

    'skills-showcase': {
      title: 'Skills Showcase',
      sourceType: 'Program Calendar idea',
      source: 'Best Buddies Canada Program Calendar · October',
      url: URLS.helpfulResources,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Depends on what participants choose to share.',
      bestFor: 'Creating space for participants to share interests, strengths, hobbies, or something they enjoy.',
      summary: 'Invite participants who want to take part to share a skill, interest, hobby, collection, creation, joke, music, or another strength they would like the group to know about.',
      participation: 'Keep sharing voluntary and leave room for different ways of contributing rather than assuming everyone wants to perform in front of the group.',
      participationSource: false,
      tags: ['Flexible', 'Strengths', 'Choice', 'Whole group']
    },

    'chapter-mural': {
      title: 'Chapter Poster or Mural',
      sourceType: 'Program Calendar idea',
      source: 'Best Buddies Canada Program Calendar · October',
      url: URLS.helpfulResources,
      time: 'Flexible',
      min: null,
      max: null,
      materials: 'Large paper or poster board plus drawing, writing, or collage materials.',
      bestFor: 'A collaborative activity where everyone can contribute something to one shared chapter piece.',
      summary: 'Create a shared chapter poster or mural using names, drawings, words, interests, quotes, or hopes for the year.',
      participation: 'Offer several ways to contribute so participation is not dependent on writing, drawing, speaking, or fine-motor skills alone.',
      participationSource: false,
      tags: ['Flexible', 'Creative', 'Collaborative', 'Choice']
    }
  };

  const FLOWS = {
    'sept-short-friendship': {
      title: 'Short friendship-focused gathering',
      items: ['ultimate-rps', 'defining-friendship', 'best-buddies-pledge']
    },
    'sept-full-week1': {
      title: 'Full Week 1-style gathering',
      items: ['ultimate-rps', 'defining-friendship', 'pass-the-yarn', 'best-buddies-pledge']
    },
    'sept-creative': {
      title: 'Creative first gathering',
      items: ['imagine-boards', 'best-buddies-pledge']
    },
    'oct-meet-social': {
      title: 'Meet & Greet: social connection',
      items: ['human-bingo', 'time-capsule', 'best-buddies-pledge']
    },
    'oct-meet-guide': {
      title: 'Meet & Greet: Program Guide sequence',
      items: ['my-best-buddies-flag', 'best-buddies-bingo']
    },
    'oct-meet-communication': {
      title: 'Meet & Greet: communication-friendly options',
      items: ['sign-language-bingo', 'aac-bingo', 'chapter-mural']
    },
    'hs-sept-low-prep': {
      title: 'High School: low-pressure first hangout',
      items: ['hs-human-bingo', 'hs-collective-banner']
    },
    'hs-sept-reflective': {
      title: 'High School: get-to-know-you gathering',
      items: ['hs-two-truths', 'hs-time-capsule']
    },
    'hs-sept-communication': {
      title: 'High School: communication-focused gathering',
      items: ['sign-language-bingo', 'aac-bingo', 'hs-collective-banner']
    },
    'hs-oct-social': {
      title: 'High School Meet & Greet: social connection',
      items: ['hs-human-bingo', 'hs-time-capsule']
    },
    'hs-oct-creative': {
      title: 'High School Meet & Greet: creative chapter-building',
      items: ['hs-two-truths', 'hs-collective-banner']
    },
    'hs-oct-communication': {
      title: 'High School Meet & Greet: communication-focused',
      items: ['sign-language-bingo', 'aac-bingo', 'hs-collective-banner']
    }
  };

  const memoryStorage = new Map();

  function storageGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      return memoryStorage.has(key) ? memoryStorage.get(key) : null;
    }
  }

  function storageSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      memoryStorage.set(key, value);
    }
  }

  let plan = loadPlan();
  let lastFocusedElement = null;
  let plannerInitialized = false;

  function loadPlan() {
    try {
      const raw = storageGet(STORAGE.plan);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && Array.isArray(parsed.items)) {
        return {
          title: parsed.title || '',
          date: parsed.date || '',
          notes: parsed.notes || '',
          items: parsed.items.filter((id) => ACTIVITIES[id])
        };
      }
    } catch (error) {
      console.warn('Could not load meeting plan.', error);
    }

    return {
      title: '',
      date: '',
      notes: '',
      items: []
    };
  }

  function savePlan() {
    try {
      storageSet(STORAGE.plan, JSON.stringify(plan));
    } catch (error) {
      console.warn('Could not save meeting plan.', error);
    }
  }

  function getViewMode() {
    return storageGet(STORAGE.view) || 'essentials';
  }

  function setViewMode(mode, scrollToIdeas = false) {
    const nextMode = mode === 'ideas' ? 'ideas' : 'essentials';
    storageSet(STORAGE.view, nextMode);
    document.body.dataset.monthView = nextMode;

    document.querySelectorAll('[data-month-mode]').forEach((button) => {
      const active = button.dataset.monthMode === nextMode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (scrollToIdeas && nextMode === 'ideas') {
      const target = document.querySelector('#guided-planning');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function createPlannerUI() {
    if (document.querySelector('.plan-fab') || document.getElementById('plan-dialog')) return;

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'plan-fab';
    fab.dataset.openPlan = '';
    fab.innerHTML = '<span>My meeting plan</span><strong data-plan-count>0</strong>';
    document.body.appendChild(fab);

    const activityDialog = document.createElement('dialog');
    activityDialog.id = 'activity-dialog';
    activityDialog.className = 'planner-dialog activity-dialog';
    activityDialog.innerHTML = `
      <div class="planner-dialog-shell">
        <button class="planner-dialog-close" type="button" data-close-dialog aria-label="Close activity details">×</button>
        <div id="activity-dialog-content"></div>
      </div>
    `;
    document.body.appendChild(activityDialog);

    const planDialog = document.createElement('dialog');
    planDialog.id = 'plan-dialog';
    planDialog.className = 'planner-dialog plan-dialog';
    planDialog.innerHTML = `
      <div class="planner-dialog-shell plan-dialog-shell">
        <button class="planner-dialog-close" type="button" data-close-dialog aria-label="Close meeting plan">×</button>

        <div class="planner-dialog-kicker">Your printable plan</div>
        <h2 class="planner-dialog-title">My Best Buddies meeting</h2>
        <p class="planner-dialog-lede">Add, remove, or reorder activities. Your choices stay with you while this browser tab is open.</p>

        <div class="plan-fields">
          <label>
            Meeting title
            <input type="text" id="plan-title" placeholder="e.g. September first gathering">
          </label>

          <label>
            Date
            <input type="date" id="plan-date">
          </label>
        </div>

        <div class="plan-list" id="plan-list"></div>
        <div class="plan-time" id="plan-time"></div>

        <label class="plan-notes-label">
          Notes for me
          <textarea id="plan-notes" rows="4" placeholder="Supplies, room, who is helping, anything to remember..."></textarea>
        </label>

        <div class="plan-dialog-actions">
          <button type="button" class="portal-button" data-print-plan>Print / Save as PDF</button>
          <button type="button" class="planner-secondary-button" data-clear-plan>Clear plan</button>
        </div>
      </div>
    `;
    document.body.appendChild(planDialog);

    const toast = document.createElement('div');
    toast.className = 'planner-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    const printPlan = document.createElement('section');
    printPlan.id = 'print-plan';
    printPlan.className = 'print-plan';
    document.body.appendChild(printPlan);
  }

  function openDialog(dialog) {
    if (!dialog) return;
    lastFocusedElement = document.activeElement;

    try {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
        dialog.classList.add('is-fallback-open');
      }
    } catch (error) {
      dialog.setAttribute('open', '');
      dialog.classList.add('is-fallback-open');
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;

    try {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    } catch (error) {
      dialog.removeAttribute('open');
    }

    dialog.classList.remove('is-fallback-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function openActivity(id) {
    const activity = ACTIVITIES[id];
    const dialog = document.getElementById('activity-dialog');
    const content = document.getElementById('activity-dialog-content');
    if (!activity || !dialog || !content) return;

    const tags = activity.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    const alreadyAdded = plan.items.includes(id);

    content.innerHTML = `
      <div class="planner-dialog-kicker">${escapeHtml(activity.sourceType)}</div>
      <h2 class="planner-dialog-title">${escapeHtml(activity.title)}</h2>
      <div class="activity-modal-tags">${tags}</div>

      <div class="activity-modal-grid">
        <div>
          <h3>Why you might choose it</h3>
          <p>${escapeHtml(activity.bestFor)}</p>
        </div>
        <div>
          <h3>What you’ll need</h3>
          <p>${escapeHtml(activity.materials)}</p>
        </div>
      </div>

      <div class="activity-modal-section">
        <h3>What it looks like</h3>
        <p>${escapeHtml(activity.summary)}</p>
      </div>

      <div class="activity-modal-section activity-modal-participation">
        <h3>${activity.participationSource ? 'Participation in the resource' : 'Teacher Hub planning note'}</h3>
        <p>${escapeHtml(activity.participation)}</p>
      </div>

      <div class="activity-modal-source">
        <span>Source</span>
        <strong>${escapeHtml(activity.source)}</strong>
      </div>

      <div class="activity-modal-actions">
        <button type="button" class="portal-button" data-add-activity="${escapeHtml(id)}" ${alreadyAdded ? 'disabled' : ''}>
          ${alreadyAdded ? 'Added to my plan' : '+ Add to my plan'}
        </button>
        <a href="${escapeHtml(activity.url)}" target="_blank" rel="noopener">Open full resource ↗</a>
      </div>
    `;

    openDialog(dialog);
  }

  function addActivity(id, silent = false) {
    if (!ACTIVITIES[id] || plan.items.includes(id)) return;
    plan.items.push(id);
    savePlan();
    updatePlannerUI();
    if (!silent) showToast(`${ACTIVITIES[id].title} added to your meeting plan.`);
  }

  function addFlow(flowId) {
    const flow = FLOWS[flowId];
    if (!flow) return;

    let added = 0;
    flow.items.forEach((id) => {
      if (!plan.items.includes(id)) {
        addActivity(id, true);
        added += 1;
      }
    });

    updatePlannerUI();
    showToast(added ? `${flow.title} added to your plan.` : 'Those activities are already in your plan.');
    openPlan();
  }

  function removeActivity(id) {
    plan.items = plan.items.filter((item) => item !== id);
    savePlan();
    updatePlannerUI();
    renderPlan();
  }

  function moveActivity(id, direction) {
    const index = plan.items.indexOf(id);
    if (index < 0) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= plan.items.length) return;

    [plan.items[index], plan.items[nextIndex]] = [plan.items[nextIndex], plan.items[index]];
    savePlan();
    renderPlan();
  }

  function clearPlan() {
    if (!plan.items.length) return;
    const confirmed = window.confirm('Clear everything from this meeting plan?');
    if (!confirmed) return;

    plan = { title: '', date: '', notes: '', items: [] };
    savePlan();
    updatePlannerUI();
    renderPlan();
  }

  function calculateTime() {
    let min = 0;
    let max = 0;
    let flexible = 0;

    plan.items.forEach((id) => {
      const activity = ACTIVITIES[id];
      if (!activity) return;
      if (typeof activity.min === 'number' && typeof activity.max === 'number') {
        min += activity.min;
        max += activity.max;
      } else {
        flexible += 1;
      }
    });

    if (!plan.items.length) return 'Add activities to see your timing.';

    const known = min === max ? `${min} min` : `${min}–${max} min`;
    if (flexible === 0) return `Known activity time: ${known}`;
    if (min === 0 && max === 0) return `${flexible} flexible-timing ${flexible === 1 ? 'activity' : 'activities'}`;
    return `Known activity time: ${known} + ${flexible} flexible-timing ${flexible === 1 ? 'activity' : 'activities'}`;
  }

  function renderPlan() {
    const list = document.getElementById('plan-list');
    const time = document.getElementById('plan-time');
    const title = document.getElementById('plan-title');
    const date = document.getElementById('plan-date');
    const notes = document.getElementById('plan-notes');

    if (!list || !time || !title || !date || !notes) return;

    title.value = plan.title;
    date.value = plan.date;
    notes.value = plan.notes;

    if (!plan.items.length) {
      list.innerHTML = `
        <div class="plan-empty">
          <strong>Your plan is empty.</strong>
          <span>Use “+ Add to my plan” on any activity you want to keep.</span>
        </div>
      `;
    } else {
      list.innerHTML = plan.items.map((id, index) => {
        const activity = ACTIVITIES[id];
        return `
          <div class="plan-item">
            <div class="plan-item-number">${index + 1}</div>
            <div class="plan-item-copy">
              <strong>${escapeHtml(activity.title)}</strong>
              <span>${escapeHtml(activity.time)} · ${escapeHtml(activity.source)}</span>
            </div>
            <div class="plan-item-controls">
              <button type="button" data-move-activity="${escapeHtml(id)}" data-direction="-1" aria-label="Move ${escapeHtml(activity.title)} up" ${index === 0 ? 'disabled' : ''}>↑</button>
              <button type="button" data-move-activity="${escapeHtml(id)}" data-direction="1" aria-label="Move ${escapeHtml(activity.title)} down" ${index === plan.items.length - 1 ? 'disabled' : ''}>↓</button>
              <button type="button" data-remove-activity="${escapeHtml(id)}" aria-label="Remove ${escapeHtml(activity.title)}">×</button>
            </div>
          </div>
        `;
      }).join('');
    }

    time.textContent = calculateTime();
  }

  function openPlan() {
    renderPlan();
    openDialog(document.getElementById('plan-dialog'));
  }

  function updatePlannerUI() {
    document.querySelectorAll('[data-plan-count]').forEach((element) => {
      element.textContent = String(plan.items.length);
    });

    document.querySelectorAll('[data-add-activity]').forEach((button) => {
      const id = button.dataset.addActivity;
      const added = plan.items.includes(id);
      button.classList.toggle('is-added', added);
      button.setAttribute('aria-pressed', String(added));

      if (button.closest('#activity-dialog')) {
        button.disabled = added;
        button.textContent = added ? 'Added to my plan' : '+ Add to my plan';
      } else {
        button.textContent = added ? '✓ Added' : '+ Add to my plan';
      }
    });

    const fab = document.querySelector('.plan-fab');
    if (fab) fab.classList.toggle('has-items', plan.items.length > 0);
  }

  function syncPlanFields() {
    const title = document.getElementById('plan-title');
    const date = document.getElementById('plan-date');
    const notes = document.getElementById('plan-notes');
    if (title) plan.title = title.value.trim();
    if (date) plan.date = date.value;
    if (notes) plan.notes = notes.value.trim();
    savePlan();
  }

  function buildPrintPlan() {
    syncPlanFields();
    const container = document.getElementById('print-plan');
    if (!container) return;

    const pageTitle = document.body.dataset.monthLabel || 'Best Buddies Meeting Plan';
    const planTitle = plan.title || pageTitle;
    const planDate = plan.date ? formatDate(plan.date) : '________________________';

    const items = plan.items.length
      ? plan.items.map((id, index) => {
          const activity = ACTIVITIES[id];
          return `
            <article class="print-plan-item">
              <div class="print-plan-number">${index + 1}</div>
              <div>
                <h2>${escapeHtml(activity.title)}</h2>
                <p class="print-plan-meta">${escapeHtml(activity.time)} · ${escapeHtml(activity.source)}</p>
                <p><strong>You’ll need:</strong> ${escapeHtml(activity.materials)}</p>
                <p><strong>${activity.participationSource ? 'Participation in the resource' : 'Teacher Hub planning note'}:</strong> ${escapeHtml(activity.participation)}</p>
              </div>
            </article>
          `;
        }).join('')
      : '<p>No activities have been added yet.</p>';

    container.innerHTML = `
      <div class="print-plan-header">
        <img src="assets/bb-logo.png" alt="Best Buddies Canada">
        <div>
          <div class="print-plan-kicker">Teacher Hub · Meeting Plan</div>
          <h1>${escapeHtml(planTitle)}</h1>
          <p><strong>Date:</strong> ${escapeHtml(planDate)}</p>
        </div>
      </div>

      <div class="print-plan-time">${escapeHtml(calculateTime())}</div>
      <div class="print-plan-items">${items}</div>

      <section class="print-plan-prep">
        <h2>Before we meet</h2>
        <div class="print-check">□ Materials and printables are ready</div>
        <div class="print-check">□ The space works for the people attending</div>
        <div class="print-check">□ Communication and participation options are ready</div>
        <div class="print-check">□ Everyone knows when and where we are meeting</div>
      </section>

      ${plan.notes ? `<section class="print-plan-notes"><h2>My notes</h2><p>${escapeHtml(plan.notes).replace(/\n/g, '<br>')}</p></section>` : ''}

      <p class="print-plan-footer">Activity information is summarized from Best Buddies Canada resources. Use the linked original resources for complete instructions, printables, and program guidance.</p>
    `;
  }

  function printPlan() {
    buildPrintPlan();
    document.body.classList.add('printing-plan');
    window.print();
  }

  function formatDate(value) {
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  function showToast(message) {
    const toast = document.querySelector('.planner-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const modeButton = target.closest('[data-month-mode]');
    if (modeButton) {
      setViewMode(modeButton.dataset.monthMode);
      return;
    }

    const ideasButton = target.closest('[data-show-ideas]');
    if (ideasButton) {
      setViewMode('ideas', true);
      return;
    }

    const quickViewButton = target.closest('[data-quick-view]');
    if (quickViewButton) {
      openActivity(quickViewButton.dataset.quickView);
      return;
    }

    const addButton = target.closest('[data-add-activity]');
    if (addButton) {
      addActivity(addButton.dataset.addActivity);
      return;
    }

    const flowButton = target.closest('[data-add-flow]');
    if (flowButton) {
      addFlow(flowButton.dataset.addFlow);
      return;
    }

    const openPlanButton = target.closest('[data-open-plan]');
    if (openPlanButton) {
      openPlan();
      return;
    }

    const removeButton = target.closest('[data-remove-activity]');
    if (removeButton) {
      removeActivity(removeButton.dataset.removeActivity);
      return;
    }

    const moveButton = target.closest('[data-move-activity]');
    if (moveButton) {
      moveActivity(moveButton.dataset.moveActivity, Number(moveButton.dataset.direction));
      return;
    }

    const printButton = target.closest('[data-print-plan]');
    if (printButton) {
      printPlan();
      return;
    }

    const clearButton = target.closest('[data-clear-plan]');
    if (clearButton) {
      clearPlan();
      return;
    }

    const closeButton = target.closest('[data-close-dialog]');
    if (closeButton) {
      closeDialog(closeButton.closest('dialog'));
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('#plan-title, #plan-date, #plan-notes')) {
      syncPlanFields();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'DIALOG') {
      const rect = event.target.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) closeDialog(event.target);
    }
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-plan');
  });

  function initPlanner() {
    if (plannerInitialized) return;
    plannerInitialized = true;

    createPlannerUI();
    setViewMode(getViewMode());
    updatePlannerUI();
    document.body.dataset.plannerReady = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlanner, { once: true });
  } else {
    initPlanner();
  }
})();
