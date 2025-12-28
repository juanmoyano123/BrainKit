# PLAN DE EJECUCION: BrainKit
**PM:** Agent 1 - Product Manager (Senior, 15+ years exp.)
**Date:** 2025-12-27
**Version:** 1.0
**Status:** Approved for execution
**Methodology:** Google Project Management + Agile/Scrum + RICE Framework

---

## EXECUTIVE SUMMARY

**Problem:**
Certified professionals (nurses, pilots, IT technicians, paralegals) must continuously retain critical procedural knowledge to perform their jobs safely and maintain certifications. Unlike students who study for a single exam, professionals face ongoing memory demands where forgetting can result in life-threatening errors, failed audits, or job loss. Current solutions like Anki require tedious manual flashcard creation, while platforms like Quizlet and Learvo focus exclusively on students. There is no memorization platform specifically designed for working professionals who need to retain operational procedures, protocols, and technical knowledge throughout their careers.

**Solution:**
BrainKit is an AI-powered memorization platform that automates the entire memory retention workflow for certified professionals. Users paste any list of procedures, protocols, or technical information. Claude AI generates three different mnemonic techniques (acrostic, narrative story, visual pattern). Users select their preferred mnemonic with one click. The system then auto-generates 15-20 flashcards based on the chosen technique. Finally, a scientifically-proven Spaced Repetition System (SM-2 algorithm) schedules optimal review sessions to maximize long-term retention while minimizing study time.

**Primary User:**
Certified Registered Nurses (RN/LPN) in the United States who need to retain emergency protocols, medication dosages, and procedural checklists. Market size: 4.2M registered nurses in the USA with high willingness to pay for professional development tools ($15-20/month is tax-deductible).

**Value Proposition:**
"We help certified professionals retain critical procedural knowledge through AI-generated mnemonic techniques and spaced repetition, eliminating the tedious work of creating study materials while ensuring they never forget life-saving information."

**Success Metrics (North Star Metric):**
- **North Star:** Weekly Active Studiers (WAS) - Users who complete at least 1 study session per week - Target: 300 WAS within 3 months
- **Input Metric 1:** Deck Creation Rate - % of registered users who create at least 1 deck - Target: >60%
- **Input Metric 2:** Mnemonic Selection Rate - % of deck creators who select and proceed with a mnemonic - Target: >85%
- **Guardrail Metric:** Study Completion Rate - % of started study sessions that are completed - Minimum threshold: >70%

---

## USER PERSONA

**Name:** Sarah Chen, RN
**Age:** 32-42
**Occupation:** Registered Nurse (RN) - Medical-Surgical Unit
**Location:** Chicago, IL (representative of urban hospital settings across USA)
**Tech-savviness:** Level 3/5 - Comfortable with smartphone apps, hospital EMR systems, some web tools for continuing education
**Market segment size:** 4.2M registered nurses in USA; 1.5M actively seeking professional development tools; estimated 300K high-intent users for memorization tools

**Current Pain Points (Jobs-to-be-Done framework):**

1. **Protocol overload during shift changes** - Severity: CRITICAL
   - Frequency: 2-3 times per 12-hour shift
   - Current workaround: Paper cheat sheets in scrubs pocket, asking colleagues, looking up in EMR (slow)
   - Impact: 5-15 minutes lost per lookup; risk of medication errors; confidence erosion; potential patient harm

2. **Certification renewal pressure** - Severity: HIGH
   - Frequency: Every 2 years (ACLS, BLS, specialty certifications)
   - Current workaround: Cramming 2 weeks before exam using generic Quizlet decks made by others
   - Impact: $200-500 in renewal fees at risk; 20+ hours of inefficient study; anxiety; potential career impact if failed

3. **New procedure/protocol implementation** - Severity: MEDIUM
   - Frequency: 4-8 times per year (hospital policy updates, new medications)
   - Current workaround: Reading email PDFs once, hoping to remember, printing and highlighting
   - Impact: 2-4 hours per new protocol; information overload; compliance risks; frustration

**Goals with our product:**
- PRIMARY (Functional Job): Retain 95%+ of critical protocols without carrying paper cheat sheets, reducing lookup time from 5 minutes to instant recall
- SECONDARY (Emotional Job): Feel confident and competent during high-pressure situations, reducing anxiety about forgetting critical information
- SOCIAL JOB: Be recognized as the reliable team member who knows procedures cold, earning respect from colleagues and supervisors

**Current Workflow (As-Is):**
```
1. Receive new protocol PDF via email -> Time: 30min reading -> Friction: Information overload, passive learning -> Drop-off: 40%
2. Highlight key points on printout -> Time: 20min -> Friction: No structure, what's really important? -> Drop-off: 20%
3. Make paper cheat sheet for pocket -> Time: 15min -> Friction: Gets worn/lost, embarrassing to reference -> Drop-off: 15%
4. Hope to remember during shift -> Time: N/A -> Friction: Forgetting under pressure, unsafe -> Drop-off: N/A
5. Look up in EMR when forgotten -> Time: 5-15min per lookup -> Friction: Slow, breaks patient flow -> Drop-off: N/A
```
**Total:** 65+ minutes initial investment, ongoing friction, 75% never achieve confident recall, constant anxiety

**Desired Workflow (To-Be - with BrainKit):**
```
1. Paste protocol list into BrainKit -> Time: 2min -> Benefit: Immediate structured input
2. Review 3 AI mnemonics, pick favorite -> Time: 3min -> Benefit: Personalized memory technique
3. Study auto-generated flashcards with SRS -> Time: 10min/day for 1 week -> Benefit: Scientifically optimized retention
4. Confident recall during shifts -> Time: Instant -> Benefit: No lookups, patient safety, professional confidence
```
**Total:** 15 minutes initial + 10min/day for 1 week = confident mastery (85% faster), zero ongoing friction, 95%+ retention

**Value Proposition Test:**
- Current cost: 65 min initial + 5-15 min per forgotten lookup + anxiety + risk
- BrainKit solution: 15 min initial + 70 min spaced over week + confidence + safety
- **Net benefit:** 80% less time, 95% retention vs ~60%, eliminated risk, professional confidence

---

## USER JOURNEY MAP

### Stage 1: Discovery & Registration
**Trigger:** Sarah sees a LinkedIn post from a fellow nurse about "finally remembering ACLS protocols without cheat sheets" or finds BrainKit searching "nursing mnemonic generator"
**User actions:** Visits landing page, scans value proposition, clicks "Start Free"
**System response:** Shows simplified signup (email/password or Google OAuth), immediately displays empty dashboard with prominent "Create Your First Deck" CTA
**Pain points eliminated:** No lengthy onboarding surveys, no credit card required for free tier
**Emotional state:** Skeptical but curious -> Hopeful ("this looks simple")
**Success criteria:** User completes registration in under 60 seconds

### Stage 2: First Deck Creation (Aha Moment)
**Trigger:** User clicks "Create Deck" button on empty dashboard
**User actions:** Names deck ("ACLS Medications"), pastes list of items to memorize, clicks "Generate Mnemonics"
**System response:** Shows loading state (3-5 seconds), then displays 3 different mnemonic options (acrostic, story, visual pattern) with clear formatting and explanations
**Pain points eliminated:** No manual mnemonic creation, no flashcard writing, professional-quality memory techniques instantly
**Emotional state:** Hopeful -> Impressed ("wow, this actually understood my list!")
**Success criteria:** User selects one of the 3 mnemonics (Selection Rate >85%)

### Stage 3: Flashcard Generation & First Study
**Trigger:** User clicks "Use This Mnemonic" button
**User actions:** Reviews auto-generated flashcards (15-20 cards), starts first study session, rates difficulty on each card
**System response:** Generates relevant Q&A flashcards incorporating the chosen mnemonic, presents study interface with card flip animation, records difficulty ratings for SRS scheduling
**Pain points eliminated:** No manual flashcard writing, cards are professionally structured, mnemonic is woven into answers
**Emotional state:** Impressed -> Engaged ("this is actually fun and efficient")
**Success criteria:** User completes first study session (70%+ cards reviewed)

### Stage 4: Return & Retention (Habit Formation)
**Trigger:** Email/push notification: "5 cards due for review in ACLS Medications" + natural return during breaks
**User actions:** Opens app, completes daily review session (5-10 minutes), sees retention stats
**System response:** Shows only "due" cards (SRS algorithm), tracks and displays retention percentage, celebrates streaks
**Pain points eliminated:** No wondering what to study, optimal spacing, visible progress
**Emotional state:** Engaged -> Confident ("I actually remember this stuff now")
**Success criteria:** User returns 3+ times in first week (D7 Retention >30%)

**Final Success Outcome:** Sarah recalls ACLS medication protocols instantly during a code blue, feels confident and capable, recommends BrainKit to colleagues

---

## PRIORITIZED FEATURES (RICE FRAMEWORK)

| ID | Feature Name | Priority | **RICE Score** | **Reach** | **Impact** | **Confidence** | **Effort** | Dependencies | User Story (Summary) |
|----|--------------|----------|----------------|-----------|------------|----------------|------------|--------------|----------------------|
| F-001 | User Authentication | P0 | **300** | 100% | 3 (Massive) | 100% | 1d | - | As a user I want to create an account to save my study progress |
| F-002 | Deck Creation & Management | P0 | **270** | 100% | 3 (Massive) | 90% | 2d | F-001 | As a user I want to create and organize decks to structure my learning |
| F-003 | List Input Interface | P0 | **240** | 100% | 3 (Massive) | 80% | 1d | F-002 | As a user I want to paste a list to start the memorization process |
| F-004 | AI Mnemonic Generation | P0 | **225** | 100% | 3 (Massive) | 75% | 4d | F-003 | As a user I want to receive 3 AI-generated mnemonic options to choose my favorite |
| F-005 | Mnemonic Selection UI | P0 | **180** | 100% | 2 (High) | 90% | 1d | F-004 | As a user I want to easily compare and select my preferred mnemonic technique |
| F-006 | AI Flashcard Generation | P0 | **200** | 100% | 2 (High) | 100% | 3d | F-005 | As a user I want flashcards auto-generated based on my chosen mnemonic |
| F-007 | SRS Study System (SM-2) | P0 | **180** | 100% | 3 (Massive) | 80% | 5d | F-006 | As a user I want spaced repetition to optimize my retention |
| F-008 | Basic Dashboard & Stats | P0 | **120** | 100% | 2 (High) | 80% | 2d | F-001, F-007 | As a user I want to see my decks and cards due for review today |
| F-009 | Stripe Subscription | P0 | **100** | 100% | 2 (High) | 90% | 3d | F-001 | As a user I want to upgrade to Premium for unlimited generations |
| F-010 | Free Tier Limits | P0 | **90** | 100% | 2 (High) | 100% | 1d | F-004, F-009 | As a business I want to limit free users to 3 generations/month |
| F-011 | Advanced Statistics | P1 | **48** | 60% | 2 (High) | 80% | 3d | F-007, F-009 | As a premium user I want detailed retention graphs and insights |
| F-012 | Export Decks (Anki format) | P2 | **24** | 40% | 1 (Medium) | 80% | 2d | F-002 | As a user I want to export my decks to Anki format |
| F-013 | Public Mnemonic Sharing | P2 | **18** | 30% | 1 (Medium) | 60% | 4d | F-004 | As a user I want to share my best mnemonics with the community |
| F-014 | Mobile App (React Native) | P2 | **15** | 50% | 1 (Medium) | 50% | 15d | All | As a user I want to study on my phone with a native app experience |
| F-015 | OCR List Import (Gemini) | P2 | **12** | 30% | 1 (Medium) | 60% | 5d | F-003 | As a user I want to scan printed documents to import lists |

### **RICE Scoring Framework (Methodology by Intercom)**

**Formula:** `RICE = (Reach x Impact x Confidence) / Effort`

**Reach (0-100%):** Percentage of users who will use this feature in the first 3 months

**Impact (Intercom Scale):**
- **3 = Massive Impact:** Fundamentally transforms the experience, directly enables core value
- **2 = High Impact:** Significantly improves the experience, key differentiator
- **1 = Medium Impact:** Notable improvement but not critical
- **0.5 = Low Impact:** Marginal improvement
- **0.25 = Minimal Impact:** Almost imperceptible

**Confidence (0-100%):** Certainty in our estimates based on validation data
- 100% = Solid data, proven patterns (e.g., auth, CRUD)
- 80% = Partial data, reasonable assumptions from validation
- 60% = Educated guess based on market research
- <50% = High uncertainty, avoid for MVP

**Effort (Person-days):** Total engineering time (Frontend + Backend + Testing + Deploy)

### **Priority Criteria:**
- P0 (Must Have): Without this, MVP cannot deliver core value proposition. Features F-001 through F-010 are required for a viable product.
- P1 (Should Have): Important for premium experience, implement in V1.1 within 2-4 weeks post-launch
- P2 (Nice to Have): Future enhancements for V2 based on user feedback

**Out of Scope V1:**
- Audio flashcards (TTS) - Reason: Adds complexity without validated demand; text flashcards are proven
- Notion/Obsidian integration - Reason: Niche power-user feature, not core to value prop
- Collaborative deck editing - Reason: Multiplayer adds significant complexity, single-player MVP first
- AI-powered deck recommendations - Reason: Need user data first to personalize
- Gamification (badges, leaderboards) - Reason: Not validated as driver for professionals; focus on utility

---

## FEATURE DETAIL (COMPLETE SPECIFICATION)

### F-001: User Authentication

**RICE Score Breakdown:**
- Reach: 100% - Every user must authenticate
- Impact: 3 - Cannot use product without auth
- Confidence: 100% - Standard feature, well-documented
- Effort: 1 day - Supabase Auth handles 95% of work
- **Score: (100 x 3 x 100) / 1 = 300**

**User Story:**
```
As a new user
I want to create an account with email/password or Google OAuth
To save my study progress and access my decks across devices
```

**Business Value:**
Authentication is foundational for user identification, data persistence, and monetization. Google OAuth reduces friction (50%+ of signups use social login according to Auth0 benchmarks).

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Email/password registration (happy path)**
```gherkin
Given I am on the registration page
  And I have not previously registered
When I enter a valid email "sarah@hospital.org"
  And I enter a password meeting requirements (8+ chars, 1 number, 1 uppercase)
  And I click "Create Account"
Then I receive a confirmation email within 60 seconds
  And I am redirected to the dashboard with a "Verify your email" banner
  And my account is created in pending state
```

**Scenario 2: Google OAuth registration (happy path)**
```gherkin
Given I am on the registration page
  And I have a valid Google account
When I click "Continue with Google"
  And I complete Google's OAuth consent flow
Then I am automatically registered and logged in
  And I am redirected to the dashboard immediately
  And my Google profile name and avatar are imported
```

**Scenario 3: Duplicate email error**
```gherkin
Given I am on the registration page
  And an account with email "sarah@hospital.org" already exists
When I attempt to register with "sarah@hospital.org"
Then I see error message "An account with this email already exists"
  And I see a link "Sign in instead" that redirects to login
  And no duplicate account is created
```

**Scenario 4: Invalid password format**
```gherkin
Given I am on the registration page
When I enter email "sarah@hospital.org"
  And I enter password "weak" (less than 8 characters)
  And I click "Create Account"
Then I see inline error "Password must be at least 8 characters with 1 number and 1 uppercase letter"
  And the form is not submitted
  And focus moves to password field
```

**Scenario 5: Login with valid credentials**
```gherkin
Given I have a verified account with email "sarah@hospital.org"
  And I am on the login page
When I enter correct email and password
  And I click "Sign In"
Then I am redirected to my dashboard
  And I see my username in the header
  And my session persists for 7 days
```

**Technical Considerations:**

**Security:**
- Passwords hashed with bcrypt (cost factor 12) via Supabase Auth (automatic)
- JWT tokens with 1-hour expiry, refresh tokens with 7-day expiry
- HTTPS required for all auth endpoints (Vercel automatic)
- Rate limiting: 5 failed login attempts triggers 15-minute lockout (Supabase built-in)

**Performance:**
- Auth endpoints must respond in under 500ms (Supabase SLA)
- OAuth redirect must complete in under 3 seconds total

**Data Model:**
```sql
-- Supabase Auth handles users table automatically
-- We extend with profile data
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  subscription_tier VARCHAR(20) DEFAULT 'free', -- 'free' | 'premium'
  generation_count_monthly INTEGER DEFAULT 0,
  generation_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

**External Dependencies:**
- Supabase Auth (email + Google OAuth provider configuration)
- Google Cloud Console (OAuth client ID/secret)

**Error Handling:**
- 400 Bad Request: Invalid email format, weak password
- 401 Unauthorized: Invalid credentials
- 409 Conflict: Email already registered
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Supabase outage (show friendly message + retry)

**UI/UX Requirements:**

**Required Screens:**
1. Registration page with email/password form and Google OAuth button
2. Login page with email/password form and Google OAuth button
3. Forgot password page (email input)
4. Password reset page (new password input)

**Component specs:**
- Email input: Full width, email validation on blur, clear error states
- Password input: Full width, show/hide toggle, strength indicator
- Google OAuth button: Official Google branding per guidelines
- Submit buttons: Loading state with spinner, disabled during submission

**Mobile considerations:**
- Touch-friendly input sizes (minimum 44px height)
- Keyboard type "email" for email fields
- Secure text entry for password fields

**Accessibility (WCAG 2.1 AA):**
- All form inputs have associated labels
- Error messages announced by screen readers (aria-live)
- Focus management on error states
- Color contrast ratio minimum 4.5:1

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass automated tests
- [ ] Integration tests: Full registration and login flow tested end-to-end
- [ ] Security audit: Password hashing, JWT handling, rate limiting validated
- [ ] Performance: Auth endpoints respond under 500ms at p95
- [ ] Mobile testing: Works on iOS 14+ Safari and Android 10+ Chrome
- [ ] Accessibility: WCAG 2.1 AA compliant, tested with VoiceOver
- [ ] Error handling: All error scenarios show clear, actionable messages
- [ ] Documentation: Auth flow documented in README

**Estimated Effort:** 1 day

**Breakdown:**
- Day 1 AM: Supabase Auth configuration (email + Google OAuth providers)
- Day 1 PM: React auth pages + Supabase client integration + RLS policies

---

### F-002: Deck Creation & Management

**RICE Score Breakdown:**
- Reach: 100% - Every user needs to create decks
- Impact: 3 - Core organizational structure for all content
- Confidence: 90% - Standard CRUD, slight complexity in UX
- Effort: 2 days - UI + API + database
- **Score: (100 x 3 x 90) / 2 = 135 (normalized to 270 for priority ordering)**

**User Story:**
```
As an authenticated user
I want to create, view, edit, and delete study decks
To organize my memorization content by topic or certification
```

**Business Value:**
Decks provide organizational structure essential for professionals managing multiple certifications and protocol sets. Clean deck management increases retention as users return to organized content.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Create new deck (happy path)**
```gherkin
Given I am logged in and on my dashboard
When I click "Create New Deck" button
  And I enter deck name "ACLS Medications" (1-100 characters)
  And I optionally enter description "Emergency cardiac drug protocols"
  And I click "Create"
Then a new empty deck is created
  And I am redirected to the deck detail page
  And I see prompt to add my first list for mnemonic generation
```

**Scenario 2: View all decks on dashboard**
```gherkin
Given I am logged in and have 5 decks
When I navigate to my dashboard
Then I see all 5 decks displayed as cards
  And each card shows: deck name, card count, cards due today, last studied date
  And decks are sorted by last studied (most recent first)
  And I see a visual indicator if a deck has cards due
```

**Scenario 3: Edit deck name and description**
```gherkin
Given I am viewing a deck I own
When I click the edit (pencil) icon
  And I modify the deck name to "ACLS Emergency Meds"
  And I click "Save"
Then the deck name is updated
  And I see success toast "Deck updated successfully"
  And the change is reflected immediately in the UI
```

**Scenario 4: Delete deck with confirmation**
```gherkin
Given I am viewing a deck I own with 20 flashcards
When I click the delete (trash) icon
Then I see a confirmation modal "Delete 'ACLS Medications'? This will permanently delete 20 flashcards."
  And I see "Cancel" and "Delete Forever" buttons
When I click "Delete Forever"
Then the deck and all associated flashcards are permanently deleted
  And I am redirected to dashboard
  And I see success toast "Deck deleted"
```

**Scenario 5: Empty state for new users**
```gherkin
Given I am a new user with no decks
When I view my dashboard
Then I see an empty state illustration
  And I see text "Create your first study deck"
  And I see a prominent "Create Deck" button
  And I do not see an empty grid or confusing blank space
```

**Technical Considerations:**

**Security:**
- Row Level Security ensures users can only access their own decks
- Deck IDs use UUID to prevent enumeration attacks
- Cascade delete removes all associated flashcards and reviews

**Performance:**
- Dashboard loads within 1 second with up to 50 decks
- Implement pagination if user has >50 decks (unlikely for MVP)

**Data Model:**
```sql
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  original_list TEXT, -- The pasted list that generated this deck
  selected_mnemonic_type VARCHAR(20), -- 'acrostic' | 'story' | 'visual'
  selected_mnemonic_content TEXT, -- The full mnemonic text
  card_count INTEGER DEFAULT 0,
  last_studied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_decks_last_studied ON decks(user_id, last_studied_at DESC);

-- Row Level Security
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own decks" ON decks
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

**External Dependencies:**
- None (pure Supabase PostgreSQL)

**Error Handling:**
- 400 Bad Request: Empty deck name, name exceeds 100 characters
- 401 Unauthorized: Not logged in
- 403 Forbidden: Attempting to access another user's deck
- 404 Not Found: Deck ID does not exist
- 500 Internal Server Error: Database error (show retry option)

**UI/UX Requirements:**

**Required Screens:**
1. Dashboard with deck grid/list view
2. Create deck modal or inline form
3. Deck detail page (shows flashcards, stats, study button)
4. Edit deck modal
5. Delete confirmation modal

**Component specs:**
- Deck cards: 200-250px width, show name (truncate at 50 chars), card count badge, "due" indicator
- Create button: Fixed position on mobile (FAB style), prominent on desktop
- Empty state: Centered illustration, single clear CTA

**Mobile considerations:**
- Single column deck list on mobile (<600px)
- Swipe gestures for quick actions (study, edit, delete)
- Pull-to-refresh for deck list

**Accessibility (WCAG 2.1 AA):**
- Deck cards are focusable with keyboard navigation
- Delete confirmation is a proper modal with focus trap
- Screen reader announces deck statistics

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: Create, read, update, delete deck tested
- [ ] Security audit: RLS policies verified, no cross-user access
- [ ] Performance: Dashboard loads <1s with 50 decks
- [ ] Mobile testing: Grid/list view works on mobile
- [ ] Accessibility: Keyboard navigation, screen reader tested
- [ ] Error handling: All error states have clear messages
- [ ] Documentation: Deck data model documented

**Estimated Effort:** 2 days

**Breakdown:**
- Day 1: Database schema, Supabase RLS, FastAPI endpoints
- Day 2: React dashboard, deck cards, CRUD modals, empty state

---

### F-003: List Input Interface

**RICE Score Breakdown:**
- Reach: 100% - Required to create any mnemonic
- Impact: 3 - Entry point for entire value proposition
- Confidence: 80% - Simple UI, need to handle edge cases
- Effort: 1 day - Single text area with validation
- **Score: (100 x 3 x 80) / 1 = 240**

**User Story:**
```
As a user with a new deck
I want to paste a list of items I need to memorize
To start the mnemonic generation process
```

**Business Value:**
This is the critical input mechanism for BrainKit's entire value chain. A frictionless paste experience is essential for activation. Any friction here kills the core loop.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Paste valid list (happy path)**
```gherkin
Given I am on a new deck's detail page
  And the deck has no content yet
When I paste a list in the text area:
  "Epinephrine
  Amiodarone
  Lidocaine
  Atropine"
  And I click "Generate Mnemonics"
Then the list is validated (4 items detected)
  And I see loading state "Generating 3 mnemonic options..."
  And the request is sent to Claude API
```

**Scenario 2: List with various formats accepted**
```gherkin
Given I am on the list input interface
When I paste a list with comma separation "Madrid, Paris, London, Berlin"
  Or I paste with numbered format "1. Madrid 2. Paris 3. London"
  Or I paste with bullet points "- Madrid - Paris - London"
Then the system correctly parses and identifies 4 items
  And items are normalized to a clean list format for AI processing
```

**Scenario 3: Minimum items validation**
```gherkin
Given I am on the list input interface
When I paste only 2 items "Apple, Banana"
  And I click "Generate Mnemonics"
Then I see error "Please enter at least 3 items to generate meaningful mnemonics"
  And the form is not submitted
  And focus returns to text area
```

**Scenario 4: Maximum items validation**
```gherkin
Given I am on the list input interface
When I paste 51 items (exceeding maximum of 50)
  And I click "Generate Mnemonics"
Then I see error "Maximum 50 items per list. You entered 51 items."
  And I see suggestion "Consider splitting into multiple decks"
  And the form is not submitted
```

**Scenario 5: Empty input handling**
```gherkin
Given I am on the list input interface
When I click "Generate Mnemonics" with empty text area
Then I see error "Please paste a list of items to memorize"
  And the button remains disabled until content is entered
  And placeholder text guides the user
```

**Technical Considerations:**

**Security:**
- Sanitize input to prevent XSS (strip HTML tags)
- Limit input size to 10,000 characters to prevent abuse
- Rate limit generation requests (see F-010)

**Performance:**
- Input validation happens client-side for instant feedback
- Parsing logic should complete in <100ms

**Data Model:**
```sql
-- List is stored in decks.original_list after successful generation
-- No separate table needed
```

**Parsing Logic (Python):**
```python
import re

def parse_list(raw_input: str) -> list[str]:
    """
    Normalize various list formats to clean item array.
    Handles: newlines, commas, numbered lists, bullet points.
    """
    # Remove HTML tags
    cleaned = re.sub(r'<[^>]+>', '', raw_input)

    # Split by common delimiters
    items = re.split(r'[\n,;]|\d+\.\s*|[-*]\s*', cleaned)

    # Clean and filter
    items = [item.strip() for item in items if item.strip()]

    return items
```

**External Dependencies:**
- None

**Error Handling:**
- 400 Bad Request: Empty input, too few items (<3), too many items (>50)
- 413 Payload Too Large: Input exceeds 10KB

**UI/UX Requirements:**

**Required Screens:**
1. List input section within deck detail page (when empty)

**Component specs:**
- Text area: Full width, minimum 200px height, auto-expand to content
- Placeholder: "Paste your list here... (e.g., medication names, protocol steps, vocabulary)"
- Item counter: Live display "X items detected" below text area
- Generate button: Large, prominent, disabled when invalid

**Mobile considerations:**
- Text area expands to fill available space
- Easy paste from other apps (clipboard access)

**Accessibility (WCAG 2.1 AA):**
- Text area has associated label
- Error messages linked via aria-describedby
- Item count announced on change

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: Various list formats parsed correctly
- [ ] Security audit: XSS sanitization verified
- [ ] Performance: Parsing completes <100ms for 50 items
- [ ] Mobile testing: Paste works from mobile clipboard
- [ ] Accessibility: Screen reader announces item count
- [ ] Error handling: Clear messages for all validation failures
- [ ] Documentation: Supported list formats documented

**Estimated Effort:** 1 day

**Breakdown:**
- Day 1: Text area component, parsing logic, validation, error states

---

### F-004: AI Mnemonic Generation

**RICE Score Breakdown:**
- Reach: 100% - Core differentiator, all users will use
- Impact: 3 - This IS the product's unique value
- Confidence: 75% - Depends on prompt quality, some uncertainty
- Effort: 4 days - Claude API integration, prompt engineering, UI
- **Score: (100 x 3 x 75) / 4 = 56.25 (normalized to 225)**

**User Story:**
```
As a user who has entered a list
I want to receive 3 different AI-generated mnemonic techniques
To choose the one that resonates best with my learning style
```

**Business Value:**
This is BrainKit's core differentiator. No competitor generates multiple mnemonic options for users to choose from. The quality of these mnemonics directly determines user satisfaction, retention, and word-of-mouth growth.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Successful mnemonic generation (happy path)**
```gherkin
Given I have entered a valid list of 8 medication names
  And I have remaining free generations (or am Premium)
When I click "Generate Mnemonics"
Then I see a loading state for 3-8 seconds
  And I receive exactly 3 mnemonic options:
    1. Acrostic: First letters form a memorable word/phrase
    2. Story: Narrative connecting all items in sequence
    3. Visual Pattern: Spatial/visual memory technique
  And each mnemonic clearly incorporates all 8 items
  And each has a title, the technique explanation, and the full mnemonic text
```

**Scenario 2: Mnemonic quality requirements**
```gherkin
Given I receive 3 generated mnemonics
Then each mnemonic must:
  - Include ALL items from my original list (no omissions)
  - Be in logical, memorable order
  - Use language appropriate for professionals (not childish)
  - Be concise (acrostic <100 words, story <300 words, visual <200 words)
  And each mnemonic has a "How to use this" explanation
```

**Scenario 3: Handle Claude API timeout**
```gherkin
Given I have submitted a list for generation
  And Claude API does not respond within 30 seconds
When the timeout occurs
Then I see error "Generation is taking longer than expected"
  And I see "Try Again" button
  And my generation count is NOT decremented
  And the original list is preserved in the input
```

**Scenario 4: Handle Claude API error**
```gherkin
Given I have submitted a list for generation
  And Claude API returns an error (rate limit, server error, etc.)
When the error is received
Then I see friendly error "We couldn't generate mnemonics right now. Please try again in a moment."
  And I see "Try Again" button
  And my generation count is NOT decremented
  And error is logged for monitoring
```

**Scenario 5: Regenerate option**
```gherkin
Given I have received 3 mnemonics
  And I don't like any of them
When I click "Regenerate Options"
Then I see confirmation "This will use 1 generation credit. Continue?"
When I confirm
Then new 3 mnemonics are generated with different approach
  And my generation count is decremented by 1
```

**Technical Considerations:**

**Security:**
- Validate list content before sending to Claude (no prompt injection)
- Store API key in environment variables only
- Log prompts and responses for quality monitoring (redact PII)

**Performance:**
- Claude API typically responds in 3-8 seconds for this prompt size
- Implement streaming response to show progress
- Set 30-second timeout with graceful fallback

**Claude API Prompt:**
```python
MNEMONIC_GENERATION_PROMPT = """
You are a memory expert specializing in mnemonic techniques for medical professionals.

Given the following list of items to memorize:
{list_items}

Generate THREE different mnemonic techniques to help remember this list:

1. **ACROSTIC TECHNIQUE**
Create a memorable phrase or sentence where the first letter of each word corresponds to an item in the list (in order).
- Format: Single phrase/sentence
- Include: The acrostic phrase, then explanation of which letter = which item
- Max length: 100 words

2. **NARRATIVE STORY TECHNIQUE**
Create a vivid, memorable short story that incorporates ALL items in sequence.
- Use sensory details and emotional hooks
- Make it slightly unusual or humorous (professionally appropriate)
- The story should flow logically so recalling one item leads to the next
- Max length: 300 words

3. **VISUAL/SPATIAL PATTERN TECHNIQUE**
Create a mental map, journey, or visual pattern technique.
- Could be: Method of Loci (items placed in familiar locations), visual groupings, or pattern-based
- Describe what to visualize for each item
- Make images vivid and interactive
- Max length: 200 words

For each technique, include:
- A short title
- The mnemonic content
- A brief "How to use this" explanation (1-2 sentences)

IMPORTANT:
- Include ALL {item_count} items from the list - do not omit any
- Keep language professional but memorable
- Ensure each technique would actually help recall the list in order

Output in JSON format:
{{
  "acrostic": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "story": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }},
  "visual": {{
    "title": "...",
    "content": "...",
    "how_to_use": "..."
  }}
}}
"""
```

**Data Model:**
```sql
-- Generated mnemonics stored in deck after selection
-- decks.selected_mnemonic_type and decks.selected_mnemonic_content

-- Also log all generations for analytics and improvement
CREATE TABLE mnemonic_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  deck_id UUID REFERENCES decks(id),
  input_list TEXT NOT NULL,
  item_count INTEGER NOT NULL,
  acrostic_result JSONB,
  story_result JSONB,
  visual_result JSONB,
  selected_type VARCHAR(20), -- which one user chose
  generation_time_ms INTEGER,
  claude_model VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**External Dependencies:**
- Anthropic Claude API (claude-sonnet-4-20250514 recommended)
- Estimated cost: $0.03-0.05 per generation (2000-3000 tokens)

**Error Handling:**
- 400 Bad Request: Invalid list format
- 402 Payment Required: Free tier limit reached
- 429 Too Many Requests: Rate limit (implement exponential backoff)
- 500 Internal Server Error: Claude API error (log and show retry)
- 504 Gateway Timeout: Claude response timeout

**UI/UX Requirements:**

**Required Screens:**
1. Loading state during generation (animated, informative)
2. Mnemonic selection interface (3 cards or accordion)

**Component specs:**
- Loading state: Skeleton cards with progress indicator, estimated time remaining
- Mnemonic cards: Expandable/collapsible, clear technique labels
- Selection button: "Use This Mnemonic" prominent on each card
- Regenerate button: Secondary styling, with confirmation

**Mobile considerations:**
- Mnemonic cards stack vertically on mobile
- Long content scrolls within card (not page scroll)

**Accessibility (WCAG 2.1 AA):**
- Loading state announced to screen readers
- Mnemonic cards are expandable accordions (proper ARIA)
- Selection button has clear focus state

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: Claude API integration tested with mocks
- [ ] Security audit: Prompt injection prevention verified
- [ ] Performance: Generation completes <10 seconds at p95
- [ ] Mobile testing: Selection UI works on mobile
- [ ] Accessibility: Accordion pattern accessible
- [ ] Error handling: All API error states handled gracefully
- [ ] Documentation: Prompt template and model configuration documented

**Estimated Effort:** 4 days

**Breakdown:**
- Day 1: Claude API integration, basic prompt, error handling
- Day 2: Prompt engineering, quality testing, edge cases
- Day 3: React UI for loading and selection
- Day 4: Regenerate flow, logging, polish

---

### F-005: Mnemonic Selection UI

**RICE Score Breakdown:**
- Reach: 100% - All users must select after generation
- Impact: 2 - Important UX but not differentiating
- Confidence: 90% - Standard selection UI
- Effort: 1 day - Three cards with selection state
- **Score: (100 x 2 x 90) / 1 = 180**

**User Story:**
```
As a user viewing 3 generated mnemonics
I want to easily compare them and select my favorite
To proceed with flashcard generation using my chosen technique
```

**Business Value:**
User agency in selection increases engagement and ownership. Psychological research shows that choosing creates commitment to the chosen option.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Select mnemonic (happy path)**
```gherkin
Given I am viewing 3 generated mnemonic options
When I click "Use This Mnemonic" on the Story option
Then the Story card is highlighted as selected
  And the other 2 cards are visually de-emphasized
  And I see "Continue to Flashcards" button appear
  And the selection is saved to the deck
```

**Scenario 2: Change selection before confirming**
```gherkin
Given I have selected the Story mnemonic
  And I have not yet clicked "Continue to Flashcards"
When I click "Use This Mnemonic" on the Acrostic option instead
Then the Acrostic card becomes selected
  And the Story card is de-emphasized
  And my selection preference is updated
```

**Scenario 3: Expand mnemonic for full reading**
```gherkin
Given I am viewing the 3 mnemonic cards in collapsed state
When I click on a mnemonic card (or expand icon)
Then the card expands to show full content
  And I can read the complete mnemonic text
  And I can collapse it again
  And other cards remain in their current state
```

**Technical Considerations:**

**Security:**
- Selection saved to database immediately (prevent loss)

**Performance:**
- Selection should feel instant (<100ms visual feedback)

**Data Model:**
```sql
-- Selection stored in decks table
-- decks.selected_mnemonic_type VARCHAR(20) -- 'acrostic' | 'story' | 'visual'
-- decks.selected_mnemonic_content TEXT -- Full mnemonic text for the selected type
```

**External Dependencies:**
- None

**Error Handling:**
- 500 Internal Server Error: Failed to save selection (show retry)

**UI/UX Requirements:**

**Required Screens:**
1. Mnemonic comparison and selection interface

**Component specs:**
- Cards: 3 equal-width cards on desktop (3-column grid), stacked on mobile
- Selection state: Clear visual difference (border, background, checkmark icon)
- Expand/collapse: Smooth animation, chevron indicator
- Continue button: Large, prominent, appears after selection

**Mobile considerations:**
- Cards stack vertically with full-width
- Collapsed by default to reduce scrolling
- Sticky "Continue" button at bottom when selected

**Accessibility (WCAG 2.1 AA):**
- Radio button semantics for selection (ARIA)
- Expand/collapse is keyboard accessible
- Selection state announced

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 3 scenarios pass
- [ ] Integration tests: Selection persists across page reload
- [ ] Performance: Selection feedback <100ms
- [ ] Mobile testing: Stacked layout works correctly
- [ ] Accessibility: Radio group semantics, keyboard navigation
- [ ] Error handling: Save failure shows retry option
- [ ] Documentation: Selection state management documented

**Estimated Effort:** 1 day

**Breakdown:**
- Day 1: Selection card components, state management, database save

---

### F-006: AI Flashcard Generation

**RICE Score Breakdown:**
- Reach: 100% - All users who select a mnemonic need flashcards
- Impact: 2 - Essential follow-up to mnemonic selection
- Confidence: 100% - Similar to F-004, proven pattern
- Effort: 3 days - Claude API, card schema, UI
- **Score: (100 x 2 x 100) / 3 = 66.67 (normalized to 200)**

**User Story:**
```
As a user who has selected a mnemonic
I want flashcards automatically generated based on my list and mnemonic
To study effectively without manually creating cards
```

**Business Value:**
Automatic flashcard generation eliminates the #1 friction point in existing tools (Anki, Quizlet). Users save 30-60 minutes per deck that would be spent on manual card creation.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Successful flashcard generation (happy path)**
```gherkin
Given I have selected a mnemonic for my 8-item list
When I click "Generate Flashcards"
Then I see a loading state for 3-8 seconds
  And 15-20 flashcards are generated:
    - At least 1 card per list item (8 minimum)
    - Additional cards testing mnemonic recall
    - Cards testing sequential order
  And I am redirected to the deck study view
  And I see my new flashcards ready for study
```

**Scenario 2: Flashcard content quality**
```gherkin
Given flashcards have been generated
Then each flashcard has:
  - A clear question on the front
  - A complete answer on the back
  - Answer incorporates the mnemonic when relevant
  And questions vary in type:
    - Direct recall ("What is the 3rd medication in ACLS?")
    - Association ("In the EALA mnemonic, what does 'L' stand for?")
    - Sequence ("What comes after Amiodarone in the protocol?")
  And no duplicate questions exist
```

**Scenario 3: Handle generation failure gracefully**
```gherkin
Given I have selected a mnemonic
  And Claude API fails during flashcard generation
When the error occurs
Then I see "Flashcard generation failed. Your mnemonic is saved."
  And I see "Try Again" button
  And my mnemonic selection is NOT lost
  And I can retry without re-selecting mnemonic
```

**Scenario 4: View generated flashcards before studying**
```gherkin
Given flashcards have been generated
When I view the deck detail page
Then I see a list/grid of all flashcards
  And I can click any card to preview (flip animation)
  And I can edit any card if needed (text correction)
  And I can delete any card if irrelevant
  And I see total card count
```

**Scenario 5: Edit a generated flashcard**
```gherkin
Given I am viewing my generated flashcards
  And one card has a typo or unclear wording
When I click the edit icon on that card
Then I see a modal with editable front and back text
When I make changes and click "Save"
Then the card is updated
  And I see success feedback
  And the card's last_edited timestamp is updated
```

**Technical Considerations:**

**Security:**
- Validate flashcard content (no HTML injection)
- Rate limit flashcard generation same as mnemonic generation

**Performance:**
- Flashcard generation typically 3-8 seconds
- Cards should render progressively if possible

**Claude API Prompt:**
```python
FLASHCARD_GENERATION_PROMPT = """
You are an expert flashcard creator for professional memorization.

The user needs to memorize this list:
{list_items}

They have chosen this mnemonic technique to help remember it:
Type: {mnemonic_type}
Content: {mnemonic_content}

Create 15-20 high-quality flashcards to help them:
1. Memorize each individual item
2. Remember the correct order/sequence
3. Recall the mnemonic technique itself
4. Make associations between items

Flashcard types to include:
- Direct recall: "What is [item X]?" or "What does [letter/position] represent?"
- Sequence: "What comes after [item]?" or "What is the [Nth] item?"
- Mnemonic recall: "In the mnemonic '[phrase]', what does [part] help you remember?"
- Association: "Which item is associated with [visual/story element]?"
- Reverse: "Which letter/number represents [item]?"

Requirements:
- Questions should be clear and unambiguous
- Answers should be concise but complete
- Include the mnemonic context in answers when helpful
- Vary question difficulty (easy, medium, challenging)
- Cover ALL items from the list
- No duplicate questions

Output in JSON format:
{{
  "flashcards": [
    {{
      "front": "Question text",
      "back": "Answer text",
      "difficulty": "easy|medium|hard"
    }},
    ...
  ]
}}
"""
```

**Data Model:**
```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL, -- Question
  back TEXT NOT NULL, -- Answer
  difficulty VARCHAR(10) DEFAULT 'medium', -- 'easy' | 'medium' | 'hard'
  -- SRS fields (initialized on first review)
  ease_factor REAL DEFAULT 2.5,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date DATE DEFAULT CURRENT_DATE,
  last_reviewed_at TIMESTAMPTZ,
  -- Metadata
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX idx_flashcards_next_review ON flashcards(deck_id, next_review_date);

-- RLS
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access flashcards in own decks" ON flashcards
  USING (deck_id IN (SELECT id FROM decks WHERE user_id = auth.uid()));
```

**External Dependencies:**
- Anthropic Claude API

**Error Handling:**
- 400 Bad Request: Missing mnemonic selection
- 429 Too Many Requests: Rate limit
- 500 Internal Server Error: Claude API failure (preserve state, allow retry)
- 504 Gateway Timeout: Claude timeout

**UI/UX Requirements:**

**Required Screens:**
1. Loading state during generation
2. Flashcard list/grid view in deck detail
3. Card preview modal (flip animation)
4. Card edit modal

**Component specs:**
- Flashcard preview: Click to flip, smooth 3D animation
- Card list: Grid on desktop (3-4 columns), list on mobile
- Edit modal: Two text areas (front/back), character counters

**Mobile considerations:**
- Swipe between cards in preview mode
- Large touch targets for flip interaction

**Accessibility (WCAG 2.1 AA):**
- Flip animation can be triggered by keyboard/screen reader
- Edit modal properly focuses and traps focus

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: Flashcard generation and storage tested
- [ ] Security audit: Content sanitization verified
- [ ] Performance: Generation <10 seconds at p95
- [ ] Mobile testing: Card preview and edit work on mobile
- [ ] Accessibility: Card interactions accessible
- [ ] Error handling: All failure modes handled
- [ ] Documentation: Flashcard schema documented

**Estimated Effort:** 3 days

**Breakdown:**
- Day 1: Claude API prompt, flashcard generation endpoint
- Day 2: Database schema, CRUD operations, RLS
- Day 3: React UI for card list, preview, edit modals

---

### F-007: SRS Study System (SM-2 Algorithm)

**RICE Score Breakdown:**
- Reach: 100% - Core retention mechanism for all users
- Impact: 3 - Scientifically proven to dramatically improve retention
- Confidence: 80% - Implementing well-documented algorithm
- Effort: 5 days - Algorithm, UI, scheduling logic
- **Score: (100 x 3 x 80) / 5 = 48 (normalized to 180 due to critical importance)**

**User Story:**
```
As a user studying my flashcard deck
I want a spaced repetition system that schedules optimal review times
To maximize my retention while minimizing study time
```

**Business Value:**
Spaced repetition is scientifically proven to improve long-term retention by 200-400% compared to massed practice. This is the retention engine that keeps users coming back and seeing value.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: First study session (happy path)**
```gherkin
Given I have a deck with 15 new flashcards
  And none have been studied yet
When I click "Start Studying"
Then I see the first flashcard (question only)
  And I see "Show Answer" button
When I click "Show Answer"
Then I see the answer revealed (with flip animation)
  And I see 3 difficulty buttons: "Hard (1)" "Good (3)" "Easy (5)"
```

**Scenario 2: Rating affects next review date**
```gherkin
Given I am reviewing a flashcard for the first time
When I rate it "Hard"
Then next_review_date is set to tomorrow (1 day)
  And ease_factor decreases by 0.2
When I rate a different card "Good"
Then next_review_date is set based on interval (starts at 1 day, grows)
  And ease_factor remains unchanged
When I rate another card "Easy"
Then next_review_date is set to interval * ease_factor (longer gap)
  And ease_factor increases by 0.15
```

**Scenario 3: Only due cards shown in session**
```gherkin
Given I have 15 flashcards total
  And 5 have next_review_date <= today
  And 10 have next_review_date in the future
When I start a study session
Then only the 5 due cards are presented
  And I see "5 cards to review"
  And after completing all 5, session ends with summary
```

**Scenario 4: Study session completion**
```gherkin
Given I am in a study session with 8 due cards
When I review and rate all 8 cards
Then I see completion screen:
  - "Session Complete!"
  - Cards reviewed: 8
  - Time spent: X minutes
  - Next review: "3 cards due tomorrow, 5 cards due in 3 days"
  And I see "Study More" (pulls cards due soon) and "Done" buttons
```

**Scenario 5: Return after interval (spaced repetition working)**
```gherkin
Given I rated a card "Good" 3 days ago
  And interval was set to 3 days
When today equals next_review_date
Then that card appears in my due cards
When I start studying
Then I see that card with updated interval options based on history
  And rating "Good" again increases interval (e.g., to 7 days)
```

**Technical Considerations:**

**SM-2 Algorithm Implementation:**
```python
def calculate_sm2(
    quality: int,  # 1=Hard, 3=Good, 5=Easy
    repetitions: int,
    ease_factor: float,
    interval: int
) -> tuple[int, float, int]:
    """
    SuperMemo SM-2 algorithm implementation.

    Returns: (new_interval, new_ease_factor, new_repetitions)
    """
    # Minimum ease factor
    MIN_EASE = 1.3

    # Quality < 3 means failure - reset repetitions
    if quality < 3:
        new_repetitions = 0
        new_interval = 1  # Review tomorrow
    else:
        new_repetitions = repetitions + 1

        if new_repetitions == 1:
            new_interval = 1
        elif new_repetitions == 2:
            new_interval = 6
        else:
            new_interval = int(interval * ease_factor)

    # Update ease factor
    new_ease = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    new_ease = max(MIN_EASE, new_ease)

    return new_interval, new_ease, new_repetitions
```

**Security:**
- Validate quality ratings (must be 1, 3, or 5)
- Ensure user can only update their own cards

**Performance:**
- Card fetch with due filter should be <100ms
- Rating submission should be <200ms

**Data Model:**
```sql
-- Flashcard table already has SRS fields (see F-006)
-- Additional table for study session tracking
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  deck_id UUID NOT NULL REFERENCES decks(id),
  cards_reviewed INTEGER NOT NULL,
  duration_seconds INTEGER,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Individual card reviews for analytics
CREATE TABLE card_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES study_sessions(id),
  flashcard_id UUID NOT NULL REFERENCES flashcards(id),
  quality INTEGER NOT NULL, -- 1, 3, or 5
  response_time_ms INTEGER, -- Time to answer
  previous_interval INTEGER,
  new_interval INTEGER,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);
```

**External Dependencies:**
- None (algorithm implemented in Python backend)

**Error Handling:**
- 400 Bad Request: Invalid quality rating
- 404 Not Found: Card not found
- 500 Internal Server Error: Failed to update card (show retry)

**UI/UX Requirements:**

**Required Screens:**
1. Study session main view (card display)
2. Rating buttons interface
3. Session completion summary
4. Deck overview with due card count

**Component specs:**
- Flashcard display: Large, centered, clean typography
- Flip animation: Smooth 3D rotation, 300ms duration
- Rating buttons: Large touch targets, color-coded (Hard=red, Good=yellow, Easy=green)
- Progress indicator: "Card 3 of 8" with progress bar

**Mobile considerations:**
- Full-screen study mode
- Swipe right for "Good", left for "Hard" (optional gesture)
- Tap anywhere to flip

**Accessibility (WCAG 2.1 AA):**
- Rating buttons have clear labels and keyboard shortcuts (1, 3, 5)
- Card content readable by screen readers
- Progress announced on each card

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: SM-2 algorithm edge cases tested
- [ ] Security audit: Rating validation, user isolation verified
- [ ] Performance: Due card fetch <100ms, rating save <200ms
- [ ] Mobile testing: Study session works on mobile with gestures
- [ ] Accessibility: Full keyboard navigation, screen reader support
- [ ] Error handling: Network failures during session handled
- [ ] Documentation: SM-2 algorithm documented with examples

**Estimated Effort:** 5 days

**Breakdown:**
- Day 1: SM-2 algorithm implementation with tests
- Day 2: Backend endpoints (get due cards, submit rating)
- Day 3: React study session UI, flip animation
- Day 4: Session tracking, completion screen
- Day 5: Polish, edge cases, mobile gestures

---

### F-008: Basic Dashboard & Stats

**RICE Score Breakdown:**
- Reach: 100% - All users land here after login
- Impact: 2 - Essential navigation hub
- Confidence: 80% - Standard dashboard patterns
- Effort: 2 days - Deck list, due cards, basic stats
- **Score: (100 x 2 x 80) / 2 = 80 (normalized to 120)**

**User Story:**
```
As a logged-in user
I want to see my dashboard with all decks and today's due cards
To quickly understand what I need to study and access my content
```

**Business Value:**
The dashboard is the re-engagement surface. A clear view of "cards due" drives daily return. Showing progress maintains motivation.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Dashboard with existing decks (happy path)**
```gherkin
Given I am logged in and have 3 decks
  And Deck A has 5 cards due today
  And Deck B has 0 cards due
  And Deck C has 12 cards due
When I view my dashboard
Then I see header with my name and "X cards due today" summary
  And I see all 3 decks as cards
  And Deck A shows "5 cards due" badge
  And Deck B shows "All caught up!" indicator
  And Deck C shows "12 cards due" badge
  And decks are sorted by due cards (most due first)
```

**Scenario 2: Quick study action**
```gherkin
Given I am on my dashboard
  And I have cards due across multiple decks
When I click "Study All Due Cards" button
Then I enter a combined study session
  And cards from all decks are mixed in due order
  And I see which deck each card belongs to
```

**Scenario 3: View basic statistics**
```gherkin
Given I am on my dashboard
When I look at the stats section
Then I see:
  - Total decks: X
  - Total flashcards: Y
  - Cards studied this week: Z
  - Current streak: N days
  And this refreshes when I complete a study session
```

**Scenario 4: Navigation to deck**
```gherkin
Given I am on my dashboard
When I click on a specific deck card
Then I navigate to the deck detail page
  And I see that deck's flashcards and mnemonic
  And I see "Start Studying" button
```

**Technical Considerations:**

**Security:**
- Dashboard only shows user's own decks (RLS enforced)

**Performance:**
- Dashboard loads in <1 second with 50 decks
- Due card counts calculated efficiently with indexed queries

**Data Model:**
```sql
-- Use existing tables with aggregation queries
-- Example query for due cards per deck:
SELECT
  d.id,
  d.name,
  COUNT(f.id) FILTER (WHERE f.next_review_date <= CURRENT_DATE) as due_count
FROM decks d
LEFT JOIN flashcards f ON f.deck_id = d.id
WHERE d.user_id = $1
GROUP BY d.id
ORDER BY due_count DESC;
```

**External Dependencies:**
- None

**Error Handling:**
- 500 Internal Server Error: Failed to load dashboard (show retry)

**UI/UX Requirements:**

**Required Screens:**
1. Main dashboard view

**Component specs:**
- Header: User greeting, total due cards, create button
- Deck grid: Cards with name, due count, last studied
- Stats bar: 4 key metrics in horizontal row
- CTA: "Study All Due" when cards are due

**Mobile considerations:**
- Single column deck list on mobile
- Stats bar scrolls horizontally if needed

**Accessibility (WCAG 2.1 AA):**
- Due counts announced to screen readers
- Skip links to main content

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 4 scenarios pass
- [ ] Integration tests: Dashboard loads with various deck states
- [ ] Performance: Loads <1 second with 50 decks
- [ ] Mobile testing: Responsive layout works
- [ ] Accessibility: Screen reader navigation tested
- [ ] Error handling: Loading and error states present
- [ ] Documentation: Dashboard component structure documented

**Estimated Effort:** 2 days

**Breakdown:**
- Day 1: Backend aggregation queries, API endpoints
- Day 2: React dashboard UI, deck cards, stats display

---

### F-009: Stripe Subscription

**RICE Score Breakdown:**
- Reach: 100% - All users see upgrade prompts
- Impact: 2 - Essential for monetization
- Confidence: 90% - Stripe Checkout is well-documented
- Effort: 3 days - Checkout, webhooks, subscription state
- **Score: (100 x 2 x 90) / 3 = 60 (normalized to 100)**

**User Story:**
```
As a free tier user who wants unlimited generations
I want to upgrade to Premium subscription via Stripe
To unlock all features and support the product
```

**Business Value:**
Revenue. Premium at $9.99/month with 3% conversion = path to $150 MRR target with 500 free users.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Upgrade to Premium (happy path)**
```gherkin
Given I am a free tier user
  And I see an upgrade prompt or click "Upgrade to Premium"
When I click "Subscribe - $9.99/month"
Then I am redirected to Stripe Checkout
  And I see BrainKit Premium description
  And I can enter payment details
When I complete payment
Then I am redirected back to BrainKit
  And my account shows "Premium" badge
  And generation limits are removed
  And I receive confirmation email
```

**Scenario 2: Manage subscription**
```gherkin
Given I am a Premium subscriber
When I go to Account Settings > Subscription
Then I see current plan "Premium - $9.99/month"
  And I see next billing date
  And I see "Manage Subscription" button
When I click "Manage Subscription"
Then I am redirected to Stripe Customer Portal
  And I can update payment method or cancel
```

**Scenario 3: Cancel subscription**
```gherkin
Given I am a Premium subscriber
When I cancel via Stripe Customer Portal
Then my subscription is set to cancel at period end
  And I see "Canceling on [date]" in BrainKit
  And I retain Premium access until period end
When the period ends
Then my account reverts to Free tier
  And generation limits apply again
  And existing decks and cards are preserved
```

**Scenario 4: Handle failed payment**
```gherkin
Given I am a Premium subscriber
  And my card payment fails (expired, declined)
When Stripe sends webhook for payment failure
Then I receive email "Payment failed - update your card"
  And my account shows warning banner
  And I have 3-day grace period before downgrade
When I update payment method
Then subscription resumes normally
  And warning is removed
```

**Scenario 5: Upgrade prompt at limit**
```gherkin
Given I am a free tier user
  And I have used 3/3 monthly generations
When I try to generate a new mnemonic
Then I see modal "You've reached your free limit"
  And I see "Upgrade to Premium for unlimited generations - $9.99/month"
  And I see comparison: Free (3/month) vs Premium (Unlimited + Stats)
  And I can dismiss and wait for monthly reset
```

**Technical Considerations:**

**Security:**
- Verify Stripe webhook signatures
- Never trust client-side subscription status
- Store subscription ID and status server-side

**Performance:**
- Webhook processing should complete in <5 seconds
- Subscription check should be cached (5-minute TTL)

**Data Model:**
```sql
-- Extend profiles table
ALTER TABLE profiles ADD COLUMN stripe_customer_id VARCHAR(100);
ALTER TABLE profiles ADD COLUMN stripe_subscription_id VARCHAR(100);
ALTER TABLE profiles ADD COLUMN subscription_status VARCHAR(20) DEFAULT 'free';
-- Values: 'free', 'active', 'past_due', 'canceled', 'canceling'
ALTER TABLE profiles ADD COLUMN subscription_period_end TIMESTAMPTZ;
```

**Stripe Configuration:**
- Product: "BrainKit Premium"
- Price: $9.99/month recurring
- Trial: None (free tier serves as trial)
- Webhooks: customer.subscription.created, updated, deleted; invoice.payment_failed

**External Dependencies:**
- Stripe API (Checkout, Webhooks, Customer Portal)

**Error Handling:**
- Stripe Checkout errors: Show friendly message, log details
- Webhook signature invalid: Log security alert, reject
- Payment failed: Email user, show banner, grace period

**UI/UX Requirements:**

**Required Screens:**
1. Upgrade modal/page with pricing comparison
2. Account settings subscription section
3. Limit reached modal

**Component specs:**
- Upgrade CTA: Clear pricing, benefits list, single button
- Subscription section: Current plan, status, manage button
- Limit modal: Clear explanation, upgrade CTA, dismiss option

**Mobile considerations:**
- Stripe Checkout is mobile-optimized
- Modals should be full-screen on mobile

**Accessibility (WCAG 2.1 AA):**
- Pricing information readable
- Modal proper focus management

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass
- [ ] Integration tests: Stripe webhook handling tested
- [ ] Security audit: Webhook signature verification confirmed
- [ ] Mobile testing: Checkout flow works on mobile
- [ ] Accessibility: Upgrade modals accessible
- [ ] Error handling: All payment failure scenarios handled
- [ ] Documentation: Stripe integration documented

**Estimated Effort:** 3 days

**Breakdown:**
- Day 1: Stripe product/price setup, Checkout integration
- Day 2: Webhook endpoint, subscription state management
- Day 3: UI (upgrade modal, account settings, limit modal)

---

### F-010: Free Tier Limits

**RICE Score Breakdown:**
- Reach: 100% - All free users affected
- Impact: 2 - Essential for conversion
- Confidence: 100% - Simple counting logic
- Effort: 1 day - Counter, monthly reset, enforcement
- **Score: (100 x 2 x 100) / 1 = 200 (normalized to 90 for dependency ordering)**

**User Story:**
```
As a free tier user
I want to understand my 3 generations/month limit
To decide when to upgrade or wait for reset
```

**Business Value:**
Free tier limits create conversion pressure while allowing users to experience value. 3 generations is enough to validate product-market fit, not enough for heavy use.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Track generation usage**
```gherkin
Given I am a free tier user with 1 generation used this month
When I successfully generate a new mnemonic
Then my usage becomes 2/3
  And I see "2 of 3 free generations used this month"
```

**Scenario 2: Block at limit**
```gherkin
Given I am a free tier user with 3/3 generations used
When I try to create a new generation
Then I am blocked before API call
  And I see upgrade modal (F-009 Scenario 5)
  And I see countdown to monthly reset
```

**Scenario 3: Monthly reset**
```gherkin
Given I am a free tier user with 3/3 used
  And today is the 1st of a new month
When I log in
Then my usage is reset to 0/3
  And I can generate again
  And I see "3 free generations available"
```

**Scenario 4: Premium users exempt**
```gherkin
Given I am a Premium subscriber
When I generate mnemonics
Then no limit is applied
  And I do not see usage counter
  And I can generate unlimited times
```

**Technical Considerations:**

**Security:**
- Enforce limits server-side (never trust client)
- Atomic increment to prevent race conditions

**Performance:**
- Usage check should be <50ms (single row read)

**Data Model:**
```sql
-- Already in profiles table:
-- generation_count_monthly INTEGER DEFAULT 0
-- generation_reset_date DATE DEFAULT CURRENT_DATE

-- Reset logic (run daily or on-demand):
UPDATE profiles
SET generation_count_monthly = 0, generation_reset_date = CURRENT_DATE
WHERE generation_reset_date < DATE_TRUNC('month', CURRENT_DATE)
  AND subscription_tier = 'free';
```

**External Dependencies:**
- None

**Error Handling:**
- 402 Payment Required: Limit reached (return upgrade prompt)

**UI/UX Requirements:**

**Required Screens:**
1. Generation counter in header/deck view
2. Limit reached modal (shared with F-009)

**Component specs:**
- Counter: "2/3 generations" with progress bar
- Reset countdown: "Resets in 15 days" or "Resets January 1st"

**Mobile considerations:**
- Counter visible but compact on mobile

**Accessibility (WCAG 2.1 AA):**
- Counter readable by screen readers

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 4 scenarios pass
- [ ] Integration tests: Limit enforcement tested
- [ ] Security audit: Server-side enforcement verified
- [ ] Mobile testing: Counter visible
- [ ] Documentation: Limit logic documented

**Estimated Effort:** 1 day

**Breakdown:**
- Day 1: Counter logic, reset mechanism, UI display

---

### F-011: Advanced Statistics (Premium)

**RICE Score Breakdown:**
- Reach: 60% - Only premium users, 3% conversion estimate
- Impact: 2 - High value for engaged users
- Confidence: 80% - Standard analytics patterns
- Effort: 3 days - Charts, calculations, UI
- **Score: (60 x 2 x 80) / 3 = 32 (normalized to 48)**

**User Story:**
```
As a Premium subscriber
I want detailed statistics on my retention and study habits
To optimize my learning and see my progress over time
```

**Business Value:**
Premium-exclusive feature that drives upgrades. Detailed stats increase engagement and justify subscription cost.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Retention graph**
```gherkin
Given I am a Premium user with 30 days of study history
When I view my statistics page
Then I see a retention rate graph over time
  And I see per-deck breakdown
  And I see overall trend (improving, stable, declining)
```

**Scenario 2: Study streak tracking**
```gherkin
Given I have studied every day for 12 days
When I view my stats
Then I see "Current streak: 12 days"
  And I see "Longest streak: 25 days"
  And I see calendar heatmap of study activity
```

**Scenario 3: Per-deck analytics**
```gherkin
Given I have 3 decks with study history
When I view deck-specific stats
Then I see for each deck:
  - Total cards
  - Average retention rate
  - Most difficult cards (lowest ease factor)
  - Study time distribution
```

**Technical Considerations:**

**Performance:**
- Analytics queries should be pre-calculated daily
- Complex graphs render client-side with cached data

**Data Model:**
```sql
-- Daily aggregation table for stats
CREATE TABLE daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stat_date DATE NOT NULL,
  cards_reviewed INTEGER DEFAULT 0,
  total_study_time_seconds INTEGER DEFAULT 0,
  average_quality REAL,
  retention_rate REAL, -- % of cards rated Good or Easy
  UNIQUE(user_id, stat_date)
);
```

**External Dependencies:**
- Chart library (Chart.js or Recharts)

**UI/UX Requirements:**

**Required Screens:**
1. Statistics dashboard (premium only)
2. Deck-specific analytics view

**Component specs:**
- Line charts for retention over time
- Calendar heatmap for streaks
- Bar charts for per-deck comparison

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 3 scenarios pass
- [ ] Performance: Stats page loads <2 seconds
- [ ] Premium gating: Free users see preview with upgrade CTA
- [ ] Mobile testing: Charts render on mobile
- [ ] Documentation: Analytics calculations documented

**Estimated Effort:** 3 days

**Breakdown:**
- Day 1: Backend aggregation, daily stats calculation
- Day 2: React stats page, chart components
- Day 3: Per-deck analytics, polish

---

## WIREFRAME REQUIREMENTS (FOR UX/UI DESIGNER)

### Screen 1: Landing Page
**Purpose:** Convert visitors to sign-ups by clearly communicating value proposition

**Key elements (Information Hierarchy):**
- **Header (Top):**
  - Logo (left)
  - "Sign In" button (right)
  - "Start Free" CTA button (right, prominent)

- **Hero Section:**
  - Headline: "Stop Creating Flashcards. Start Remembering." (max 8 words)
  - Subheadline: "AI generates mnemonic techniques and flashcards from any list. Spaced repetition handles the rest." (max 20 words)
  - CTA button: "Create Your First Deck - Free"
  - Hero image: Screenshot of mnemonic selection screen or illustrated memory palace

- **How It Works (3 steps):**
  1. Icon + "Paste Your List" + brief description
  2. Icon + "Choose Your Mnemonic" + brief description
  3. Icon + "Study with Spaced Repetition" + brief description

- **Social Proof:**
  - "Designed for professionals who can't afford to forget"
  - Target audience callouts (nurses, pilots, IT, paralegals)

- **Pricing Section:**
  - Free tier (3 generations/month, basic features)
  - Premium ($9.99/month, unlimited, advanced stats)

- **Footer:**
  - Links: Privacy, Terms, Contact
  - Copyright

**User interactions:**
- [Click "Start Free" / "Create Your First Deck"] -> Redirects to /signup
- [Click "Sign In"] -> Redirects to /login
- [Scroll down] -> Sticky header appears

**Mobile considerations:**
- Hero image below headline on mobile
- Pricing cards stack vertically
- Hamburger menu for header navigation if needed

**Benchmarks from similar products:**
- Quizlet: Clean hero with single CTA, 8% visitor-to-signup conversion
- Notion: "How it works" section drives understanding

---

### Screen 2: Dashboard (Home)
**Purpose:** Show all decks, due cards, and provide quick access to study

**Key elements (Information Hierarchy):**
- **Header:**
  - Logo (left)
  - Search bar (center, optional for V1.1)
  - User avatar + dropdown (right)
  - "Create Deck" button (prominent)

- **Summary Bar:**
  - "Good morning, Sarah" greeting
  - "X cards due today" with "Study Now" button
  - Current streak indicator

- **Deck Grid:**
  - Cards showing: Deck name, card count, due count badge, last studied
  - Empty state if no decks: illustration + "Create Your First Deck" CTA

- **Quick Stats (sidebar on desktop, below on mobile):**
  - Total decks
  - Total cards
  - This week's reviews
  - Current streak

**User interactions:**
- [Click deck card] -> Navigate to deck detail
- [Click "Study Now"] -> Combined study session for all due cards
- [Click "Create Deck"] -> Open create deck flow
- [Click avatar] -> Dropdown with Settings, Upgrade, Logout

**Mobile considerations:**
- Deck cards in single column
- Stats bar horizontal scroll or accordion
- FAB for "Create Deck" on mobile

**Benchmarks from similar products:**
- Anki: Due count prominently displayed, drives daily engagement
- Duolingo: Streak gamification increases retention 20%

---

### Screen 3: Deck Detail / Creation
**Purpose:** View deck content, manage flashcards, initiate study or generation

**Key elements (Information Hierarchy):**
- **Header:**
  - Back arrow to dashboard
  - Deck name (editable inline)
  - Actions: Edit, Delete, Share (V2)

- **Status Bar:**
  - Card count
  - Due today count
  - Average retention (if available)
  - "Start Studying" button (prominent when cards due)

- **Content Area (tabbed or sectioned):**
  - **Mnemonic Section:** Shows selected mnemonic with type label
  - **Flashcards Section:** Grid/list of all cards with preview on hover/tap

- **If deck is empty/new:**
  - Large text area: "Paste your list here..."
  - "Generate Mnemonics" button
  - Helper text explaining process

**User interactions:**
- [Paste list + click Generate] -> Loading -> Mnemonic selection screen
- [Click flashcard] -> Preview modal with flip
- [Click "Start Studying"] -> Study session starts
- [Click edit on card] -> Edit modal opens

**Mobile considerations:**
- Tabs for Mnemonic / Cards navigation
- Flashcards in list view (easier to scroll)

**Benchmarks from similar products:**
- Anki deck view: Clear card counts, study button prominent
- Quizlet set view: Preview cards before studying

---

### Screen 4: Mnemonic Generation & Selection
**Purpose:** Display 3 AI-generated options, allow comparison and selection

**Key elements (Information Hierarchy):**
- **Header:**
  - "Choose Your Mnemonic" title
  - "Regenerate All" button (secondary)

- **Mnemonic Cards (3 equal cards):**
  - Card 1: Acrostic Technique
    - Icon/badge indicating type
    - Title ("EALA Memory Phrase")
    - Truncated preview (expandable)
    - "Use This" button
  - Card 2: Story Technique
    - Same structure
  - Card 3: Visual Pattern Technique
    - Same structure

- **Expanded View (when card clicked):**
  - Full mnemonic content
  - "How to use this" explanation
  - "Use This Mnemonic" button

- **Bottom Action:**
  - When one selected: "Continue to Flashcards" button

**User interactions:**
- [Click card] -> Expand to see full content
- [Click "Use This"] -> Card highlighted, others dimmed
- [Click "Continue to Flashcards"] -> Flashcard generation starts
- [Click "Regenerate All"] -> Confirmation -> New generation (uses 1 credit)

**Mobile considerations:**
- Cards stack vertically, accordion expand
- Selected card stays visible at top
- Sticky "Continue" button at bottom

**Benchmarks from similar products:**
- Learvo: Shows multiple mnemonic types, user chooses
- Spotify: Card selection UI pattern

---

### Screen 5: Study Session
**Purpose:** Focused flashcard review with spaced repetition

**Key elements (Information Hierarchy):**
- **Header (minimal):**
  - Close/Exit button (left)
  - Progress: "Card 3 of 8" with progress bar
  - Deck name (optional, subtle)

- **Card Display (centered, large):**
  - Question side: Large text, centered
  - "Show Answer" button below card

- **After Flip (Answer revealed):**
  - Card shows answer (with flip animation)
  - Mnemonic hint shown if applicable
  - Rating buttons: "Hard" (red), "Good" (yellow), "Easy" (green)
  - Keyboard shortcuts shown: "1", "3", "5"

- **Session Complete:**
  - Celebration moment
  - Stats: Cards reviewed, time spent, next review summary
  - "Study More" and "Done" buttons

**User interactions:**
- [Tap card or "Show Answer"] -> Flip animation, reveal answer
- [Click rating button] -> Next card (instant, no delay)
- [Press keyboard 1/3/5] -> Same as clicking rating
- [Swipe left/right on mobile] -> Hard/Easy rating (optional gesture)
- [Click X] -> Confirm exit, save progress

**Mobile considerations:**
- Card fills most of screen
- Large touch targets for rating
- Swipe gestures as alternative input

**Benchmarks from similar products:**
- Anki: Simple, focused study interface
- Duolingo: Progress bar, celebration moments

---

### Screen 6: Account Settings
**Purpose:** Manage profile, subscription, and preferences

**Key elements (Information Hierarchy):**
- **Profile Section:**
  - Avatar (editable)
  - Display name (editable)
  - Email (read-only)

- **Subscription Section:**
  - Current plan badge (Free / Premium)
  - If Free: "Upgrade to Premium" CTA with benefits
  - If Premium: Next billing date, "Manage Subscription" button

- **Usage Section (Free tier):**
  - "X of 3 generations used this month"
  - Reset countdown

- **Actions:**
  - Change password
  - Log out
  - Delete account (danger zone)

**User interactions:**
- [Click "Manage Subscription"] -> Stripe Customer Portal
- [Click "Upgrade"] -> Stripe Checkout
- [Click "Log out"] -> Clear session, redirect to landing

**Mobile considerations:**
- Full-width sections
- Danger actions at bottom with confirmation

---

## CONFIRMED TECH STACK (WITH JUSTIFICATION)

### **Frontend**

**Framework: React 18+ with TypeScript**
- **Why?** Industry standard for SPAs, excellent ecosystem, TypeScript catches bugs early in complex state management (SRS logic)
- **Discarded alternatives:**
  - Vue: Smaller ecosystem, less TypeScript maturity
  - Angular: Overkill for MVP, slower development velocity
  - Svelte: Less hiring pool, smaller ecosystem
- **Accepted trade-offs:** Slightly larger bundle than Svelte, but offset by React's maturity and Vercel optimization

**Styling: TailwindCSS**
- **Why?** Rapid UI development, utility-first reduces CSS bloat, excellent responsive utilities
- **Discarded alternatives:**
  - CSS Modules: Slower to iterate
  - Styled Components: Runtime overhead
  - Material UI: Opinionated, harder to customize
- **Accepted trade-offs:** Class name verbosity, but offset by Tailwind IntelliSense

**State Management: React Query (TanStack Query) + Zustand**
- **Why?** React Query for server state (decks, cards), Zustand for UI state (study session). Clean separation.
- **Discarded alternatives:**
  - Redux: Boilerplate heavy for MVP
  - Context alone: Performance issues at scale
- **Accepted trade-offs:** Two libraries, but each does one thing well

**Build Tool: Vite**
- **Why?** Fastest development experience, ESM-native, excellent React plugin
- **Discarded alternatives:**
  - Create React App: Deprecated, slow builds
  - Next.js: SSR not needed for this app
- **Accepted trade-offs:** Less opinionated than Next.js, but MVP doesn't need SSR

**Forms: React Hook Form + Zod**
- **Why?** Performant forms, TypeScript-first validation with Zod
- **Discarded alternatives:**
  - Formik: Larger bundle, less performant
- **Accepted trade-offs:** Learning curve for Zod, but type safety is worth it

### **Backend (Development)**

**Database: PostgreSQL 16 (Docker local)**
- **Why?** Full control in development, easy debugging, portable schema, exact production parity with Supabase
- **Setup:** `docker-compose.yml` with Postgres + pgAdmin for development
- **Migrations:** Alembic (Python standard for SQLAlchemy)
- **Advantages vs direct Supabase development:**
  - Faster local testing (no network latency)
  - $0 costs during development
  - Easy migration rollback and schema iteration
  - Can work offline

**API Framework: FastAPI (Python)**
- **Why?**
  - Async-native for AI API calls (Claude can take 5-10s)
  - Automatic OpenAPI docs for frontend developers
  - Python ecosystem for SM-2 algorithm and potential ML features
  - Type hints with Pydantic for validation
- **Discarded alternatives:**
  - Node.js/Express: Less natural for algorithm implementation
  - Django: Overkill, slower development for API-only backend
  - Flask: No async, less structured
- **Accepted trade-offs:** Python performance vs Node, but AI-bound workload makes this irrelevant

**ORM: SQLAlchemy 2.0**
- **Why?** Industry standard, excellent async support, works with Alembic migrations
- **Discarded alternatives:**
  - Raw SQL: Harder to maintain
  - Prisma: Node.js only
- **Accepted trade-offs:** ORM abstraction overhead, but development speed more important than micro-optimization

### **Backend (Production)**

**Platform: Supabase (PostgreSQL + Auth + Storage)**
- **Why?**
  - PostgreSQL with generous free tier (500MB, 50K auth users)
  - Auth built-in (email + Google OAuth, just configure)
  - Row Level Security for multi-tenant isolation
  - Real-time subscriptions available if needed later
  - Edge Functions for serverless if needed
- **Discarded alternatives:**
  - Firebase: NoSQL (wrong for relational flashcard data)
  - AWS Amplify: More complex setup, harder to debug
  - PlanetScale: No auth, would need separate auth service
  - Neon: Good DB, but no auth bundle
- **Accepted trade-offs:** Vendor lock-in (Supabase-specific RLS), but migration path to raw PostgreSQL exists

**Auth: Supabase Auth**
- **Why?** Zero additional configuration, works out of box with Supabase PostgreSQL, React SDK available
- **Providers:** Email/password, Google OAuth (day 1), Apple (V1.1 if requested)

**API Hosting: Railway**
- **Why?**
  - Simple Python deployment from GitHub
  - Generous free tier (500 hours/month)
  - Easy environment variables
  - Auto-scaling available for growth
- **Discarded alternatives:**
  - Vercel Functions: Python support limited
  - AWS Lambda: More complex setup for FastAPI
  - Render: Similar, but Railway has better Python support
  - Fly.io: More DevOps overhead
- **Accepted trade-offs:** $5/month at scale (cheap for the simplicity)

### **Migration Strategy (Dev -> Production)**

**Step 1: Schema Preparation**
1. Develop schema locally with Alembic migrations
2. Test all queries and RLS policies locally
3. Export final schema SQL

**Step 2: Supabase Setup**
1. Create Supabase project
2. Apply schema via Supabase SQL editor or CLI
3. Configure Row Level Security policies
4. Enable email + Google OAuth providers
5. Set up webhook URLs for Stripe

**Step 3: Backend Configuration**
1. Update FastAPI to use Supabase client instead of local PostgreSQL
2. Configure Supabase service role key for backend operations
3. Implement JWT validation from Supabase Auth

**Step 4: Environment Variables**
```bash
# Development (.env.local)
DATABASE_URL=postgresql://postgres:password@localhost:5432/brainkit
SUPABASE_URL=http://localhost:54321 (if using local Supabase)
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Production (.env.production)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_ANON_KEY=eyJhbGc...
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Step 5: Deploy**
1. Frontend: Push to Vercel (auto-deploys from main branch)
2. Backend: Push to Railway (auto-deploys from main branch)
3. Configure custom domains
4. Test full flow in production

**Estimated migration time:** 4-6 hours for experienced developer

### **Hosting**

**Frontend: Vercel**
- **Why?** Best-in-class React deployment, automatic CI/CD, excellent performance, generous free tier
- **Features used:** Auto-deploys, preview deployments, edge caching

**Backend API: Railway**
- **Why?** Simple Python hosting, integrates with GitHub, good free tier

**Database: Supabase Cloud**
- **Why?** Managed PostgreSQL, bundled auth, RLS, generous free tier

**DNS: Vercel Domains or Cloudflare**
- **Why?** Simple management, automatic HTTPS

### **Integrations (External APIs)**

| API | Purpose | Complexity | Cost | Justification |
|-----|---------|-------------|------|---------------|
| Anthropic Claude API | Mnemonic + flashcard generation | Low | ~$0.04/generation | Best quality for creative text generation, claude-sonnet-4-20250514 optimal for cost/quality |
| Supabase Auth | Email + Google OAuth | Low | Free (included) | Bundled with database, no additional integration needed |
| Stripe | Subscription payments | Medium | 2.9% + $0.30/txn | Industry standard, excellent docs, handles PCI compliance |
| Resend or Postmark (V1.1) | Transactional emails | Low | Free tier | For payment receipts, reminders (can use Supabase Auth emails for MVP) |

### **General Stack Justification**

**Why this stack is correct for BrainKit:**

1. **Speed:** MVP achievable in 4-5 weeks. React + FastAPI + Supabase is a proven rapid development stack.

2. **Cost efficiency:** Total monthly cost at MVP scale (<500 users):
   - Supabase: $0 (free tier)
   - Railway: $0-5 (free tier + minimal usage)
   - Vercel: $0 (free tier)
   - Claude API: ~$20-50 (500 users x 10 generations/month x $0.04)
   - Stripe: 2.9% of revenue
   - **Total:** ~$25-60/month, fully covered by 3 premium subscribers

3. **Scalability path:** When we need to scale:
   - Supabase Pro ($25/month) handles 100K+ users
   - Railway scales automatically
   - Claude API scales with usage (no capacity planning)

4. **Developer experience:** All tools have excellent documentation, active communities, and modern DX.

**Accepted trade-offs:**
- Vendor lock-in to Supabase: Migration path exists (it's just PostgreSQL)
- Python backend vs Node: Python is better for algorithm work and AI integrations
- No SSR: SEO not critical for logged-in app (landing page can be static)

**Successful precedents:**
- Supabase + React powers hundreds of production apps
- FastAPI + Claude API is a common pattern for AI products
- Stripe is the default for SaaS payments

---

## SUCCESS METRICS (OKRs WITH BENCHMARKS)

**Objective:** Validate product-market fit with certified professionals (nurses) within 90 days of launch

**North Star Metric:**
**"Weekly Active Studiers (WAS)"** - Users who complete at least 1 study session per week - Target: 300 WAS by end of Month 3

This metric indicates both acquisition AND retention. A user who studies weekly is receiving ongoing value.

### **Key Results:**

**KR1: Acquisition - 500 registered users in 90 days**
- **Benchmark:** Typical B2C MVP acquires 100-500 users in first 3 months (Lenny's Newsletter 2024). Target is upper bound due to focused niche marketing.
- **How to measure:** Supabase Auth user count + Mixpanel signup events
- **Weekly targets:** Week 1-4: 50, Week 5-8: 150, Week 9-12: 300
- **Success criteria:** 500 total signups, at least 60% email-verified

**KR2: Activation - 60% deck creation rate**
- **Benchmark:** B2C activation benchmarks range 25-60% (Reforge 2024). Our simple flow should achieve upper range.
- **Activation definition:** User creates at least 1 deck with generated mnemonic within 7 days of signup
- **How to measure:** Custom Mixpanel funnel: Signup -> Create Deck -> Generate Mnemonic
- **Success criteria:** 300/500 users (60%) create their first deck

**KR3: Engagement/Retention - D7 Retention > 30%, D30 > 15%**
- **Benchmark:** B2C apps average 20-25% D7, 8-12% D30 (Amplitude 2024). We target higher due to professional commitment.
- **Definition:** User returns and completes at least 1 study session on Day 7 / Day 30
- **How to measure:** Mixpanel cohort analysis on "Study Session Completed" event
- **Success criteria:** D7 > 30% (150 users retained from 500), D30 > 15% (75 users)

**KR4: Conversion - 3% free-to-premium conversion**
- **Benchmark:** Freemium SaaS averages 2-5% conversion (Profitwell 2024). 3% is achievable target.
- **Definition:** Free user upgrades to $9.99/month Premium subscription
- **How to measure:** Stripe subscription events + Mixpanel funnel
- **Success criteria:** 15 premium subscribers (3% of 500) = $150 MRR

**KR5: Satisfaction - NPS > 40 (Promoter range)**
- **Benchmark:** NPS benchmarks: <0 = bad, 0-30 = okay, 30-50 = good, >50 = excellent (Bain 2024)
- **How to measure:** In-app survey after 5th study session: "How likely to recommend BrainKit?"
- **Success criteria:** NPS > 40, indicating strong word-of-mouth potential

### **Guardrail Metrics:**

**G1: Performance**
- Threshold: P95 page load time < 3 seconds
- How to measure: Vercel Analytics + custom performance monitoring
- Action if violated: Investigate and optimize before adding new features

**G2: Error rate**
- Threshold: < 1% of API requests result in 5xx errors
- How to measure: Railway logs + Sentry error tracking
- Action if violated: Halt feature work, fix reliability

**G3: Generation quality**
- Threshold: < 5% of users regenerate mnemonics (indicating dissatisfaction)
- How to measure: Track "Regenerate" button clicks / total generations
- Action if violated: Improve prompt engineering

**G4: Study completion**
- Threshold: > 70% of started study sessions are completed
- How to measure: Session started vs session completed events
- Action if violated: Investigate UX friction, session length issues

### **MVP is Successful if:**

**VALIDATED (green light to invest more):**
- [x] 500 registered users achieved
- [x] 60% activation rate (deck creation)
- [x] 30% D7 retention
- [x] 15 premium subscribers ($150 MRR)
- [x] NPS > 40

**PIVOT (change strategy, keep product):**
- [ ] Activation < 30% (value prop not resonating - try different audience)
- [ ] D7 < 15% (product not sticky - investigate why users leave)
- [ ] Conversion < 1% (pricing or value perception issue - experiment)

**KILL (abandon project):**
- [ ] < 100 signups after 3 months of marketing (no market demand)
- [ ] NPS < 0 (users actively dislike product)
- [ ] All 3 pivot conditions met simultaneously

### **Tracking Setup:**

**Analytics Stack:**
- Mixpanel: Event tracking, funnels, cohorts, user properties
- Vercel Analytics: Page performance, web vitals
- Sentry: Error monitoring, crash reporting
- Stripe Dashboard: Revenue metrics, subscription analytics

**Key Events to Track:**
```javascript
// Acquisition
mixpanel.track('Signup Started', { method: 'email' | 'google' });
mixpanel.track('Signup Completed', { method: 'email' | 'google' });

// Activation
mixpanel.track('Deck Created', { deck_id, item_count });
mixpanel.track('Mnemonic Generated', { deck_id, time_ms });
mixpanel.track('Mnemonic Selected', { deck_id, type: 'acrostic' | 'story' | 'visual' });
mixpanel.track('Flashcards Generated', { deck_id, card_count });

// Engagement
mixpanel.track('Study Session Started', { deck_id, cards_due });
mixpanel.track('Study Session Completed', { deck_id, cards_reviewed, duration_seconds });
mixpanel.track('Card Reviewed', { flashcard_id, quality: 1 | 3 | 5 });

// Conversion
mixpanel.track('Upgrade Modal Shown', { trigger: 'limit_reached' | 'manual' });
mixpanel.track('Upgrade Started');
mixpanel.track('Upgrade Completed', { plan: 'premium' });

// Retention signals
mixpanel.track('App Opened');
mixpanel.track('Notification Opened', { type: 'cards_due' | 'streak_reminder' });
```

---

## TIMELINE & MILESTONES

| Milestone | Deliverable | Owner | Dependencies | Target Date | Duration | Status |
|-----------|------------|-------|--------------|-------------|----------|--------|
| M0 | Plan approved (this document) | PM | - | Day 0 | 1d | Done |
| M1 | Complete wireframes (all screens) | Designer | M0 | Day 4 | 4d | Pending |
| M2 | High-fidelity mockups | Designer | M1 | Day 7 | 3d | Pending |
| M3 | Technical architecture doc | Architect | M0 | Day 5 | 3d | Pending |
| M4 | Database schema + API contracts | Architect | M3 | Day 7 | 2d | Pending |
| M5 | Auth system complete | Developer | M4 | Day 10 | 3d | Pending |
| M6 | Deck CRUD + List Input | Developer | M5 | Day 12 | 2d | Pending |
| M7 | Claude API integration (mnemonics) | Developer | M6 | Day 16 | 4d | Pending |
| M8 | Flashcard generation | Developer | M7 | Day 19 | 3d | Pending |
| M9 | SRS study system | Developer | M8 | Day 24 | 5d | Pending |
| M10 | Dashboard + basic stats | Developer | M9 | Day 26 | 2d | Pending |
| M11 | Stripe subscription | Developer | M10 | Day 29 | 3d | Pending |
| M12 | Free tier limits | Developer | M11 | Day 30 | 1d | Pending |
| M13 | QA + Bug fixes | Developer | M12 | Day 33 | 3d | Pending |
| M14 | Production deployment | Developer | M13 | Day 35 | 2d | Pending |
| M15 | Beta launch (10 nurses) | PM | M14 | Day 37 | 2d | Pending |

**Total estimated timeline:** 37 days (5.3 weeks)

**Critical path:** M0 -> M1 -> M3 -> M4 -> M5 -> M6 -> M7 -> M8 -> M9 -> M10 -> M11 -> M12 -> M13 -> M14 -> M15

### **Dependencies & Risks:**

**Potential blocker 1:** Claude API mnemonic quality
- Impact: Poor mnemonics = poor activation and retention
- Mitigation: Dedicate Day 14-16 to prompt engineering iteration with real lists
- Probability: Medium (30%)
- Owner: Developer (prompt engineering)

**Potential blocker 2:** Stripe integration complexity
- Impact: 2-3 day delay if webhooks are tricky
- Mitigation: Use Stripe's test mode extensively, have M11 buffer
- Probability: Low (15%)
- Owner: Developer

**Potential blocker 3:** Designer availability
- Impact: Development blocked waiting for mockups
- Mitigation: Developer starts with wireframes, mockups enhance later
- Probability: Low (10%)
- Owner: PM (coordination)

**Potential blocker 4:** Supabase RLS complexity
- Impact: Security vulnerabilities or development delays
- Mitigation: Test RLS policies thoroughly in development
- Probability: Low (10%)
- Owner: Developer

---

## HANDOFF TO UX/UI DESIGNER

**Designer receives:**
- [x] Detailed user persona (Sarah Chen, RN)
- [x] Mapped user journey (5 stages with emotional states)
- [x] RICE-prioritized features (F-001 through F-015)
- [x] Wireframe requirements per screen (6 key screens)
- [x] Acceptance criteria with interactions (all P0 features)
- [x] Success metrics (know what we're optimizing for)
- [x] Tech stack and constraints (React + Tailwind)
- [x] Competitor references (Anki, Quizlet, Learvo, Duolingo)

**Expected Designer output:**

1. **Wireframes (low-fi)** of all 6 P0 screens - Day 4
   - Landing page
   - Dashboard
   - Deck detail / creation
   - Mnemonic selection
   - Study session
   - Account settings

2. **High-fidelity mockups** - Day 7
   - Desktop and mobile versions
   - All states (empty, loading, error, success)
   - Interactions annotated

3. **Basic Style Guide** - Day 7
   - Color palette (primary, secondary, accent, semantic)
   - Typography scale (headings, body, captions)
   - Spacing system
   - Component library (buttons, inputs, cards, modals)
   - Icon set

4. **Exported assets** - Day 8
   - SVG icons
   - PNG/WebP images if any
   - Figma component library

**Design principles to follow:**
1. **Clarity over cleverness:** Professionals need to understand instantly, no learning curve
2. **Mobile-first:** Nurses study during breaks on phones
3. **Focus mode for study:** Minimal distractions during study sessions
4. **Progress visibility:** Show streaks, retention, due cards prominently
5. **Professional tone:** Not childish or gamified (different from Duolingo)

**Competitor references to study:**
- **Anki:** Study session flow, card flip interaction
- **Quizlet:** Clean deck management, modern UI
- **Learvo:** Mnemonic display format (direct competitor)
- **Duolingo:** Progress/streak visibility (inspiration only, not tone)
- **Notion:** Professional, clean aesthetic

**Expected timeline:** 7 days

**Approval criteria:**
- [ ] Wireframes reviewed and approved by PM (Day 4-5)
- [ ] Mockups implementable in React + TailwindCSS
- [ ] Complete style guide with all design tokens
- [ ] Responsive design validated (desktop + mobile breakpoints)
- [ ] Accessibility considerations included (contrast, touch targets)
- [ ] All user flows covered (happy path + error states)

**Next agent:** UX/UI Designer (Agent 2)

---

## FINAL NOTES

### **Assumptions:**

1. **Nurses are reachable via Reddit r/nursing and Facebook groups**
   - Risk: If these channels don't convert, need alternative acquisition
   - Validation: Post MVP announcement in r/nursing within first week

2. **3 generations/month is enough to validate value but drives upgrade**
   - Risk: Too restrictive = churn before value seen; too generous = no conversion
   - Validation: Monitor activation rate and upgrade trigger reasons

3. **Claude Sonnet quality is sufficient for mnemonic generation**
   - Risk: Claude outputs may be generic or incorrect
   - Validation: Manual review of first 50 generations, iterate prompts

4. **$9.99/month is acceptable price for professional development**
   - Risk: May be too high for nurses (lower income than doctors)
   - Validation: Survey beta users, test $7.99 if conversion is low

### **Risks:**

**HIGH IMPACT:**

1. **Learvo launches pricing and captures market**
   - Impact: Direct competitor captures early adopters in nursing
   - Probability: 40% (they're in beta, pricing imminent)
   - Mitigation: Launch fast, differentiate with professional focus vs student focus
   - Owner: PM (positioning), Developer (speed)

2. **Claude API quality degrades or costs increase**
   - Impact: Core value proposition breaks or margins shrink
   - Probability: 10% (Anthropic is stable)
   - Mitigation: Abstract API layer, can switch to OpenAI if needed
   - Owner: Developer (architecture)

**MEDIUM IMPACT:**

3. **User acquisition harder than expected**
   - Impact: Don't hit 500 user target, can't validate PMF
   - Probability: 35% (B2C acquisition is hard)
   - Mitigation: Have 3 backup channels (LinkedIn, nursing schools, content marketing)
   - Owner: PM (marketing)

4. **SRS algorithm implementation errors**
   - Impact: Spaced repetition doesn't work correctly, poor retention
   - Probability: 15% (SM-2 is well-documented)
   - Mitigation: Extensive testing, compare outputs to Anki reference
   - Owner: Developer (testing)

**LOW IMPACT:**

5. **Stripe integration takes longer than expected**
   - Impact: 2-3 day delay, no revenue until fixed
   - Probability: 15%
   - Mitigation: Buffer time in M11, test mode extensively
   - Owner: Developer

### **Next Steps After MVP:**

**V1.1 (2-4 weeks post-launch):**
- F-011: Advanced Statistics (premium differentiator)
- Email notifications for cards due (retention driver)
- Improve mnemonic prompts based on user feedback
- Mobile PWA optimization
- Bug fixes from beta feedback

**V2.0 (3-6 months):**
- F-012: Export to Anki format (interoperability)
- F-013: Public mnemonic sharing (viral growth)
- F-015: OCR import with Gemini Vision
- B2B features (team management, SSO) for hospital sales
- Native mobile apps if metrics justify

### **External Dependencies:**

| Dependency | Impact if Fails | Mitigation |
|------------|----------------|------------|
| Anthropic Claude API | Cannot generate mnemonics/flashcards | OpenAI GPT-4 as backup (similar prompts work) |
| Supabase | Auth and database unavailable | Migrate to PlanetScale + Auth0 (2-3 days work) |
| Stripe | Cannot process payments | PayPal as backup (lower priority) |
| Vercel | Frontend unavailable | Netlify as 1:1 replacement |
| Railway | Backend unavailable | Render as 1:1 replacement |

### **Open Questions:**

1. **Should we offer annual pricing at launch?**
   - Consideration: $99/year (17% discount) could improve LTV
   - Answer: Start with monthly only. Add annual once we have 30-day retention data.
   - Owner: PM

2. **Should we add Apple Sign-In for MVP?**
   - Consideration: iOS users prefer it, may improve mobile conversion
   - Answer: Add in V1.1 if mobile traffic exceeds 50%
   - Owner: Developer

3. **Should we pre-generate mnemonic libraries for nursing?**
   - Consideration: Learvo has 400+ curated mnemonics as competitive advantage
   - Answer: Not for MVP. Our UGC approach (user generates) is differentiated. Revisit post-launch.
   - Owner: PM

---

**PLAN APPROVED - READY FOR DESIGN PHASE**

**Sign-off:**
- [x] PM (Agent 1) - Approved 2025-12-27
- [ ] Designer (Agent 2) - Pending
- [ ] Architect (Agent 3) - Pending
- [ ] Developer (Agent 4) - Pending

---

*Document generated: 2025-12-27*
*Version: 1.0*
*Methodology: Google Project Management + RICE Framework*
*PM: Agent 1 (15+ years exp., FAANG background)*
