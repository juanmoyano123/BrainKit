# BrainKit - AI-Powered Mnemonic Flashcard System

> Never forget critical protocols again. Automated mnemonics + smart flashcards + spaced repetition for certified professionals.

---

## PROJECT STATUS

**Phase:** Validation
**Target Market:** Professional certified workers (nurses, pilots, IT techs, paralegals)
**Development Start:** TBD (pending 48h validation)
**MVP Timeline:** 4-5 weeks from validation approval

---

## QUICK START

This repository contains the complete validation, technical specification, and action plan for BrainKit.

**Read in order:**

1. **VALIDATION_BRAINKIT.md** - Complete market validation, competitive analysis, and strategic recommendation
2. **MVP_TECHNICAL_SPEC.md** - Full technical specification, architecture, and implementation details
3. **ACTION_PLAN_48H.md** - Immediate next steps for market validation (customer interviews)

---

## WHAT IS BRAINKIT?

BrainKit helps certified professionals (nurses, pilots, IT techs) memorize and retain critical protocols and procedures through:

1. **AI Mnemonic Generation** - Paste a list, get 3 proven memorization techniques (acronyms, stories, visual patterns)
2. **Automatic Flashcard Creation** - AI generates 15-20 smart flashcards based on your chosen mnemonic
3. **Intelligent Spaced Repetition** - Study only what you're about to forget, retain knowledge for years

---

## WHY BRAINKIT EXISTS

### The Problem

Certified professionals (nurses, pilots, lawyers, IT techs) need to memorize critical information:
- Nurses: Emergency protocols, medication dosages, procedure steps
- Pilots: FAA checklists, emergency procedures
- IT Techs: Commands, troubleshooting procedures, security protocols
- Paralegals: Legal precedents, statutes, case law

Current solutions:
- Manual flashcard creation (tedious, time-consuming)
- Generic apps like Anki/Quizlet (require manual card creation, no mnemonic help)
- No tools specifically designed for professional retention (vs student exam prep)

### The Opportunity

Market size: $1.23B (2024) growing to $5.36B by 2033 (CAGR 18.4%)
- North America: 38% of global market
- Clear trend: AI-powered study tools are emerging (Quizlet added AI, third-party Anki tools)
- Gap: No one is combining AI mnemonics + flashcards + SRS for professionals

---

## DIFFERENTIATION

### vs Anki (Market Leader)
- **Anki:** Manual card creation, no mnemonic generation, student-focused
- **BrainKit:** Automated everything, AI mnemonics built-in, professional-focused (retention > exam prep)

### vs Quizlet
- **Quizlet:** Recently added basic AI flashcard generation, still student-focused
- **BrainKit:** AI mnemonics (not just flashcards), SRS algorithm, professional use cases

### vs Learvo (Direct Competitor)
- **Learvo:** Medical students only, beta/free (no clear business model)
- **BrainKit:** Professional workers (nurses in practice, not students), clear pricing from day 1, broader market

---

## STRATEGIC RECOMMENDATION

**Market Entry Strategy:** Target professional certified workers (NOT students)

**Why:**
- Higher willingness to pay ($15-20/month vs $9.99 for students)
- Longer retention (professionals use tools for years vs students for 6-12 months)
- B2B opportunity (hospitals, airlines, law firms buy team licenses)
- Less competition (Learvo/Anki/Quizlet all focus on students)

**Primary Target (MVP):** Registered Nurses (RN/LPN) in USA
- Market: 4.2M registered nurses
- Pain point: Need to retain emergency protocols, medications, procedures
- Accessible: Reddit r/nursing, nursing schools, professional associations

---

## TECH STACK

### Frontend
- React + TypeScript + TailwindCSS
- Deployed on Vercel (free tier)

### Backend
- Python (FastAPI)
- PostgreSQL (Supabase - free tier)
- Deployed on Railway (free tier)

### Integrations
- Anthropic Claude API (Sonnet 4.5) - Mnemonic + flashcard generation
- Supabase Auth - Email/password + Google OAuth
- Stripe - Subscription payments

### Cost Structure (MVP)
- Development: $0 (using free tiers)
- Claude API: ~$0.04 per generation (3 mnemonics + 18 flashcards)
- Hosting: $0 (Vercel + Railway + Supabase free tiers)
- Estimated monthly cost at 100 active users: $30-50

---

## MONETIZATION

### Free Tier
- 3 deck generations per month
- Unlimited study of created decks
- Basic spaced repetition

### Premium - $9.99/month (or $15-20 for professional positioning)
- Unlimited deck generations
- Advanced statistics
- Priority support
- Export/import decks

### B2B (Future)
- Team licenses for hospitals, airlines, law firms
- Admin dashboard, SSO, compliance tracking
- Pricing: $X per user/month (volume discounts)

---

## MVP FEATURES (4-5 Week Build)

**Core Loop:**
1. User pastes a list (protocols, procedures, terms)
2. AI generates 3 mnemonic techniques (acronym, story, visual)
3. User selects favorite
4. AI generates 15-20 flashcards
5. User studies with spaced repetition (SM-2 algorithm)

**Must-Have Features:**
- Auth (email/password + Google)
- Deck creation (list input → mnemonic → flashcards)
- Study session (flashcard UI + review buttons)
- Spaced repetition (SM-2 algorithm)
- Basic dashboard (deck list + due counts)

**V2 Features (Post-Launch):**
- Deck sharing
- PDF import (OCR with Gemini Vision)
- Audio flashcards (TTS)
- Mobile apps (React Native)
- Advanced analytics
- Team/Enterprise features

---

## VALIDATION STATUS

**Completed:**
- Market research (competitive analysis, pricing analysis)
- Technical feasibility assessment
- Strategic positioning
- MVP specification

**In Progress (Next 48 Hours):**
- Customer interviews (target: 5 nurses)
- Pain point validation
- Willingness to pay validation
- Early beta tester recruitment

**Go/No-Go Decision Criteria:**
- 3/5 nurses validate pain point as "very frustrating"
- 3/5 would use BrainKit
- 2/5 would pay $10+/month
- No existing solution perfectly solves this
- MVP buildable in 4-5 weeks

---

## TIMELINE

### Phase 1: Validation (Week 0 - Current)
- [x] Market research
- [x] Competitive analysis
- [x] Technical specification
- [ ] Customer interviews (5 nurses)
- [ ] Go/No-Go decision

### Phase 2: Development (Weeks 1-5)
- Week 1: Foundation (auth, DB, skeleton)
- Week 2: AI generation (mnemonics + flashcards)
- Week 3: Study system (SRS algorithm + UI)
- Week 4: Monetization (Stripe) + polish
- Week 5: Beta testing + iteration

### Phase 3: Beta Launch (Week 6)
- Launch to 10 beta testers (nurses)
- Collect feedback
- Measure retention (D7, D14, D30)
- Iterate based on usage data

### Phase 4: Public Launch (Week 8-10)
- Landing page + marketing
- Productized onboarding
- Launch on Product Hunt / Reddit / LinkedIn
- Target: 50 WAU by end of Month 1

---

## SUCCESS METRICS

**Activation:** % of signups who create 1+ deck (Target: >60%)
**Retention D7:** % who return after 7 days (Target: >30%)
**Conversion:** % who upgrade to Premium (Target: >3%)
**Study Completion:** % of sessions completed (Target: >70%)

**Revenue Target (Month 3):**
- 300 WAU → 15 Premium users → $150 MRR
- Path to $10K MRR: ~1000 Premium users (20K total users at 5% conversion)

---

## RISK MITIGATION

**Technical Risks:**
- Claude API quality → Extensive prompt engineering + regeneration option
- API costs → Rate limiting + caching + monitoring
- SRS algorithm → Use proven SM-2 (Anki's algorithm)

**Business Risks:**
- Learvo launches first → Move fast (4-5 weeks not 3 months) + differentiate (professionals vs students)
- Low conversion → A/B test pricing + free tier limits
- Low retention → Email reminders + rewarding UX (streaks, progress)

---

## REPOSITORY STRUCTURE

```
BrainKit/
├── README.md                      # This file
├── VALIDATION_BRAINKIT.md         # Full market validation + competitive analysis
├── MVP_TECHNICAL_SPEC.md          # Complete technical specification
├── ACTION_PLAN_48H.md             # Next steps (customer interviews)
├── idea.md                        # Original idea brief
├── frontend/                      # React app (TBD)
├── backend/                       # FastAPI app (TBD)
└── docs/                          # Additional documentation (TBD)
```

---

## NEXT STEPS

If you're joining this project:

1. **Read VALIDATION_BRAINKIT.md** - Understand the market, competition, and strategy
2. **Read MVP_TECHNICAL_SPEC.md** - Understand the architecture and implementation plan
3. **Execute ACTION_PLAN_48H.md** - Validate with real customers (5 nurse interviews)
4. **Make Go/No-Go decision** based on interview findings
5. **If GO:** Start Week 1 of development (auth + DB setup)

---

## CONTACT

**Project Lead:** [Your Name]
**Status Updates:** [Link to project board / Notion / Discord]
**Beta Signup:** [Link to landing page when ready]

---

## LICENSE

TBD (Proprietary for now, may open-source parts later)

---

**Last Updated:** 2025-12-27
**Phase:** Validation
**Next Milestone:** Customer interviews + Go/No-Go decision (48 hours)

---

Built with Claude Code.
