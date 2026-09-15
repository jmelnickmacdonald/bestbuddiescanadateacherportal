# Teacher Hub — Fine-Tooth Site Flow Pass

## The flow this pass locks in

The Elementary & Middle experience now has one clear mental model:

**Chapter Playbook** = I want the roadmap for the year  
**Monthly Planning** = I want the short version for where we are now  
**Plan a Meeting** = I need to plan the actual meeting  
**Program Calendar** = I need a date or reminder  
**Resources** = I need the original material, form, guide, or training  
**Quick Guides** = I need practical help with a specific Best Buddies question  
**Support** = I need a person

None of the first three is a prerequisite for another. Teachers can use the Playbook from start to finish, dip into it when they need context, or bypass it completely.

## What changed

### Homepage
The program hand-off no longer promises “step-by-step” help. It now tells teachers that choosing a program opens the chapter roadmap, monthly planning, meeting tools, activities, and resources.

The existing “Already know what you need?” route stays intact so experienced teachers can bypass the program path and go directly to Calendar, Resources, or Support.

### Elementary & Middle landing
The three core tools are now visibly framed as different levels of help rather than steps:

- Chapter Playbook
- Monthly Planning
- Plan a Meeting

The 01 / 02 / 03 sequence treatment is removed. Copy explicitly says nothing has to be completed in order.

### Chapter Playbook
“Follow the Playbook” is now “Use the Playbook.”

The opening copy makes it clear that the Playbook can be used start-to-finish, checked when a reminder is useful, or left entirely in favour of Monthly Planning, Calendar, or Plan a Meeting.

Meeting-builder wording is standardized to **Plan a Meeting** rather than mixing “Build a Meeting” and “Plan a Meeting.”

### Monthly Planning
“Plan by Month” is standardized to **Monthly Planning** throughout the Elementary & Middle experience.

The Monthly Planning landing now says plainly that it can be used whether or not the teacher is using the Playbook.

A subtle Playbook bridge gives teachers the bigger-picture route without making it the required next click.

Each September–December page now has one small “where does this fit?” bridge back to the Chapter Playbook.

### Plan a Meeting
The builder now says **Choose a month** rather than “Start here.”

A small context row gives two easy exits:
- Chapter Playbook
- Monthly Planning

This means a teacher can move backwards for context without feeling trapped in the builder.

### Program Calendar
The Calendar is now clearly positioned as the **when**, while the Playbook is the **roadmap**.

The copy no longer calls the Playbook a “step-by-step path.” It explicitly says the Calendar and Playbook can be used independently or together.

The unfinished High School Playbook is not newly promoted from this shared page; the High School link returns to the High School landing.

### Resources
A compact Teacher Hub planning strip now sits near the top:

- Chapter Playbook
- Monthly Planning
- Plan a Meeting

This makes it easy to leave Resources and return to planning without hunting through menus.

The Playbook description is also rewritten so it does not imply teachers have to follow the year in sequence.

### Quick Guides
The First 30 Days guide now distinguishes:
- Playbook = whole-year context
- Calendar = dates and reminders

It also links directly to the Chapter Playbook and September Planning.

The main “More tools” area now includes direct links to:
- Chapter Playbook
- Plan a Meeting

### Support
The old support page was one of the least consistent pages in the repo. It has been brought back into the current Teacher Hub visual/navigation system.

Support now explicitly includes:
- chapter planning / problem-solving
- recruitment / registration
- meetings / participation
- Friendship Walk / fundraising
- forms / guides / training
- starting a new chapter

The old “prototype for internal review” footer and legacy reversed-logo treatment are gone.

### Buddy Board
Buddy Board no longer replaces Calendar in the global navigation.

Its global header now behaves like the rest of the Hub:
- Calendar
- Resources
- Support
- My Chapter is injected when appropriate

Buddy Board remains a My Chapter/community tool, not a competing top-level public section.

### My Chapter
The newest flexible-navigation and orange sticky-toolbar work is included in this pass.

My Chapter keeps the guided and direct routes together:
- roadmap if wanted
- month if wanted
- meeting builder if wanted
- Calendar and Resources directly

The sticky toolbar groups:
**Chapter tools / My stuff / Community + help**.

## Important remaining gaps I did NOT paper over

### 1. January–May Monthly Planning does not exist yet
The Playbook runs through the full school year and the Calendar runs through June, but the dedicated Elementary & Middle Monthly Planning pages currently stop at December.

The meeting builder includes January, but there is no January Monthly Planning page.

That is the biggest remaining Elementary & Middle content gap. I did not invent those months without source material.

### 2. High School is intentionally untouched
The user has not finished the High School experience yet. No High School program pages were changed in this pass.

### 3. French is still a placeholder
`fr.html` remains a placeholder. This pass does not create French program content.

### 4. Development / orphan files remain in the repo
These are not reachable from the Teacher Hub homepage and should eventually be archived or removed so future editing is less confusing:

- `index-test.html`
- `elementary-middle-personalized.html`
- `calendar-planning-bridge.html`
- `landing-current-month.html`

`programadvisor.html` is also outside the teacher-facing flow and appears to be an internal tool.

### 5. Internal Program Advisor page has a broken link
`programadvisor.html` links to `how-do-i.html`, but that file is not present in the uploaded repo.

I did not change the internal Program Advisor tool as part of this teacher-facing pass.

### 6. Friendship Walk is intentionally separate
The Friendship Walk page already has a strong, low-pressure structure and was not rewritten in this pass. It remains reachable from Resources, Support, Buddy Board, and My Chapter.

## Flow rule used throughout

A teacher should never have to remember where a tool lives.

If they want:
- the whole year → Playbook
- this month → Monthly Planning
- the meeting → Plan a Meeting
- a date → Calendar
- a document → Resources
- a practical answer → Quick Guides
- another chapter’s experience → Buddy Board
- a person → Support

And if they already know what they need, they should be able to jump there directly.
