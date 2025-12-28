# BrainKit MVP - Technical Specification

## EXECUTIVE SUMMARY

**Product:** BrainKit - AI-powered mnemonic generator + flashcard system with spaced repetition
**Target Market:** Professional certified workers (nurses, pilots, IT techs, paralegals)
**Development Time:** 4-5 weeks full-time with Claude Code
**Tech Stack:** React + FastAPI + PostgreSQL (Supabase) + Claude API
**MVP Budget:** ~$0-50/month (free tiers + minimal API costs during beta)

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────┐
│   Frontend      │  React + TypeScript + TailwindCSS
│   (Vercel)      │  - Dashboard, Generation UI, Study UI
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│   Backend       │  FastAPI (Python)
│   (Railway)     │  - API endpoints, SRS algorithm, business logic
└────────┬────────┘
         │
    ┌────┴─────┬──────────────┬────────────┐
    ▼          ▼              ▼            ▼
┌────────┐ ┌─────────┐  ┌──────────┐ ┌─────────┐
│Supabase│ │Claude   │  │ Stripe   │ │ Vercel  │
│ Auth + │ │  API    │  │ Payments │ │  Blob   │
│   DB   │ │Sonnet4.5│  │          │ │(images) │
└────────┘ └─────────┘  └──────────┘ └─────────┘
```

---

## DATABASE SCHEMA (PostgreSQL)

### Core Tables

```sql
-- Users (handled by Supabase Auth)
-- Supabase creates this automatically with auth.users

-- User Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  subscription_tier TEXT DEFAULT 'free', -- 'free' | 'premium'
  subscription_status TEXT, -- 'active' | 'canceled' | 'past_due'
  stripe_customer_id TEXT,
  generations_used_this_month INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Decks (collections of flashcards)
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_list TEXT NOT NULL, -- The original list user pasted
  chosen_mnemonic_type TEXT, -- 'acronym' | 'story' | 'visual'
  chosen_mnemonic_content TEXT, -- The actual mnemonic text
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flashcards (individual Q&A pairs)
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  card_order INTEGER, -- Order within the deck
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review History (for SRS algorithm)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quality INTEGER NOT NULL, -- 0-5 (SM-2 scale: 0=complete blackout, 5=perfect)
  -- SRS state variables
  easiness_factor FLOAT DEFAULT 2.5,
  interval INTEGER DEFAULT 1, -- Days until next review
  repetitions INTEGER DEFAULT 0,
  next_review_date DATE NOT NULL,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_cards_deck_id ON cards(deck_id);
CREATE INDEX idx_reviews_card_user ON reviews(card_id, user_id);
CREATE INDEX idx_reviews_next_date ON reviews(next_review_date);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies (users can only see their own data)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view own decks"
  ON decks FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view cards from own decks"
  ON cards FOR ALL
  USING (
    deck_id IN (
      SELECT id FROM decks WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own reviews"
  ON reviews FOR ALL
  USING (auth.uid() = user_id);
```

---

## BACKEND API ENDPOINTS (FastAPI)

### Authentication
- Handled by Supabase (no custom endpoints needed)
- Frontend uses Supabase JS client for auth

### Core Endpoints

```python
# 1. Generate Mnemonics
POST /api/mnemonics/generate
Request:
{
  "list": ["Madrid", "Paris", "London", "Berlin"],
  "context": "European capitals" # Optional context for better mnemonics
}
Response:
{
  "mnemonics": [
    {
      "type": "acronym",
      "title": "MPLB Method",
      "content": "Make People Love Breakfast - each word starts with capital city first letter"
    },
    {
      "type": "story",
      "title": "The European Road Trip",
      "content": "Maria drove from Madrid to Paris, then flew to London before taking a train to Berlin..."
    },
    {
      "type": "visual",
      "title": "Map Pattern",
      "content": "Imagine the cities forming a diagonal line from bottom-left (Madrid) to top-right (Berlin)..."
    }
  ]
}

# 2. Generate Flashcards
POST /api/flashcards/generate
Request:
{
  "list": ["Madrid", "Paris", "London", "Berlin"],
  "mnemonic_type": "story",
  "mnemonic_content": "Maria drove from Madrid to Paris..."
}
Response:
{
  "flashcards": [
    {"question": "What is the first city in our story?", "answer": "Madrid"},
    {"question": "After Madrid, Maria drove to which city?", "answer": "Paris"},
    {"question": "What is the capital of Spain?", "answer": "Madrid"},
    // ... 15-20 cards total
  ]
}

# 3. Create Deck
POST /api/decks
Request:
{
  "title": "European Capitals",
  "original_list": "Madrid, Paris, London, Berlin",
  "chosen_mnemonic_type": "story",
  "chosen_mnemonic_content": "Maria drove...",
  "flashcards": [/* array from step 2 */]
}
Response:
{
  "deck_id": "uuid",
  "cards_created": 18
}

# 4. Get Due Cards for Study
GET /api/decks/{deck_id}/due-cards
Response:
{
  "due_cards": [
    {
      "card_id": "uuid",
      "question": "What is the capital of Spain?",
      "answer": "Madrid",
      "is_new": true // true if never reviewed
    }
  ],
  "total_due": 5,
  "total_cards": 18
}

# 5. Submit Review (SRS algorithm)
POST /api/reviews
Request:
{
  "card_id": "uuid",
  "quality": 4 // 0-5 scale (SM-2)
}
Response:
{
  "next_review_date": "2024-01-15",
  "interval_days": 7,
  "message": "See you in 7 days!"
}

# 6. Get User Stats
GET /api/stats
Response:
{
  "total_decks": 3,
  "total_cards": 54,
  "cards_due_today": 12,
  "cards_mastered": 28,
  "streak_days": 5
}
```

---

## SPACED REPETITION ALGORITHM (SM-2)

### Implementation (Python)

```python
from datetime import datetime, timedelta
from typing import Tuple

def calculate_next_review(
    quality: int,  # 0-5 (user response)
    easiness_factor: float = 2.5,
    interval: int = 1,
    repetitions: int = 0
) -> Tuple[float, int, int, datetime]:
    """
    SM-2 Algorithm Implementation
    Returns: (new_easiness_factor, new_interval, new_repetitions, next_review_date)
    """

    # Update easiness factor
    new_ef = easiness_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    new_ef = max(1.3, new_ef)  # EF minimum is 1.3

    # Update repetitions and interval
    if quality < 3:
        # User forgot - reset
        new_repetitions = 0
        new_interval = 1
    else:
        # User remembered
        new_repetitions = repetitions + 1

        if new_repetitions == 1:
            new_interval = 1
        elif new_repetitions == 2:
            new_interval = 6
        else:
            new_interval = int(interval * new_ef)

    # Calculate next review date
    next_review = datetime.now() + timedelta(days=new_interval)

    return (new_ef, new_interval, new_repetitions, next_review)

# Usage in API endpoint:
@app.post("/api/reviews")
async def submit_review(card_id: str, quality: int, user_id: str):
    # Get last review state
    last_review = db.query(Review).filter_by(
        card_id=card_id,
        user_id=user_id
    ).order_by(Review.reviewed_at.desc()).first()

    if last_review:
        ef = last_review.easiness_factor
        interval = last_review.interval
        reps = last_review.repetitions
    else:
        # First review
        ef, interval, reps = 2.5, 1, 0

    # Calculate next review
    new_ef, new_interval, new_reps, next_date = calculate_next_review(
        quality, ef, interval, reps
    )

    # Save new review
    review = Review(
        card_id=card_id,
        user_id=user_id,
        quality=quality,
        easiness_factor=new_ef,
        interval=new_interval,
        repetitions=new_reps,
        next_review_date=next_date.date()
    )
    db.add(review)
    db.commit()

    return {"next_review_date": next_date.date(), "interval_days": new_interval}
```

---

## CLAUDE API INTEGRATION

### Prompt Templates

```python
# 1. Mnemonic Generation Prompt
MNEMONIC_PROMPT = """You are an expert memory coach helping people memorize lists using proven mnemonic techniques.

User wants to memorize this list:
{list_items}

Context (if provided): {context}

Generate 3 different mnemonic techniques:

1. ACRONYM/ACROSTIC: Create a memorable word or sentence using first letters
2. STORY: Create a vivid narrative that connects all items in sequence
3. VISUAL PATTERN: Describe a visual pattern or mental image linking the items

Requirements:
- Make them creative and memorable
- Use vivid imagery and emotion
- Keep each technique under 100 words
- Ensure they actually help recall the exact items

Return response as JSON:
{{
  "acronym": {{"title": "...", "content": "..."}},
  "story": {{"title": "...", "content": "..."}},
  "visual": {{"title": "...", "content": "..."}}
}}
"""

# 2. Flashcard Generation Prompt
FLASHCARD_PROMPT = """You are creating flashcards to help someone memorize this list:
{list_items}

They chose this mnemonic technique:
Type: {mnemonic_type}
{mnemonic_content}

Generate 15-20 flashcards (question/answer pairs) that:
1. Test recall of individual items from the list
2. Test understanding of the mnemonic technique
3. Test associations between items
4. Vary in difficulty (some easy recall, some harder connections)

Return as JSON array:
[
  {{"question": "...", "answer": "..."}},
  {{"question": "...", "answer": "..."}}
]

Make questions specific and answers concise (1-3 words when possible).
"""

# API Call Function
import anthropic
import json

async def generate_mnemonics(list_items: list[str], context: str = "") -> dict:
    client = anthropic.AsyncAnthropic(api_key=settings.CLAUDE_API_KEY)

    prompt = MNEMONIC_PROMPT.format(
        list_items=", ".join(list_items),
        context=context or "general memorization"
    )

    message = await client.messages.create(
        model="claude-sonnet-4.5-20250929",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    response_text = message.content[0].text
    return json.loads(response_text)

async def generate_flashcards(
    list_items: list[str],
    mnemonic_type: str,
    mnemonic_content: str
) -> list[dict]:
    client = anthropic.AsyncAnthropic(api_key=settings.CLAUDE_API_KEY)

    prompt = FLASHCARD_PROMPT.format(
        list_items=", ".join(list_items),
        mnemonic_type=mnemonic_type,
        mnemonic_content=mnemonic_content
    )

    message = await client.messages.create(
        model="claude-sonnet-4.5-20250929",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}]
    )

    response_text = message.content[0].text
    return json.loads(response_text)
```

### Cost Estimation

**Per Generation:**
- Mnemonic generation: ~500 input tokens + 800 output tokens
- Flashcard generation: ~600 input tokens + 1500 output tokens
- Total: ~1100 input + 2300 output tokens per complete flow

**Pricing (Claude Sonnet 4.5):**
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens

**Cost per user generation:**
- Input: 1100 tokens = $0.0033
- Output: 2300 tokens = $0.0345
- **Total: ~$0.038 per generation** (less than 4 cents)

**Monthly cost projections:**
- 100 users × 10 generations/month = 1000 generations = $38/month
- 500 users × 10 generations/month = 5000 generations = $190/month
- With Premium at $9.99/month, break-even at ~130 Premium users

**Free tier sustainability:**
- 3 generations/month per free user = $0.11/user/month
- Sustainable if conversion rate to Premium > 5% (industry standard is 2-5%)

---

## FRONTEND STRUCTURE (React)

### Key Components

```
src/
├── pages/
│   ├── Dashboard.tsx          # Home - list of decks
│   ├── CreateDeck.tsx         # Multi-step deck creation flow
│   ├── StudySession.tsx       # Flashcard study UI
│   └── Stats.tsx              # User progress/stats
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── Decks/
│   │   ├── DeckCard.tsx       # Individual deck preview
│   │   └── DeckList.tsx
│   ├── Generation/
│   │   ├── ListInput.tsx      # Paste list input
│   │   ├── MnemonicSelector.tsx  # Choose from 3 mnemonics
│   │   └── FlashcardPreview.tsx  # Preview generated cards
│   ├── Study/
│   │   ├── Flashcard.tsx      # Single card UI
│   │   └── ReviewButtons.tsx  # Again/Hard/Good/Easy buttons
│   └── Layout/
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── hooks/
│   ├── useAuth.ts             # Supabase auth hook
│   ├── useDecks.ts            # Deck CRUD operations
│   └── useStudySession.ts     # Study session logic
└── services/
    ├── api.ts                 # API client (axios/fetch)
    ├── supabase.ts            # Supabase client
    └── stripe.ts              # Stripe checkout
```

### Critical User Flows

**1. Deck Creation Flow**
```
Step 1: Paste List
┌─────────────────────────────┐
│ Enter your list (one item   │
│ per line or comma-separated)│
│                              │
│ Madrid                       │
│ Paris                        │
│ London                       │
│ Berlin                       │
│                              │
│ [Next →]                     │
└─────────────────────────────┘

Step 2: Choose Mnemonic (Loading → 3 options)
┌─────────────────────────────┐
│ ⚡ Generating mnemonics...   │
│ (Claude API call ~2-3 secs) │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│ Choose your favorite:        │
│                              │
│ ○ ACRONYM: MPLB Method      │
│   "Make People Love..."      │
│                              │
│ ● STORY: The Road Trip      │
│   "Maria drove from..."      │
│                              │
│ ○ VISUAL: Diagonal Map      │
│   "Imagine cities in line..."│
│                              │
│ [Generate Flashcards →]      │
└─────────────────────────────┘

Step 3: Generate & Preview Cards
┌─────────────────────────────┐
│ ⚡ Creating 18 flashcards... │
│ (Claude API call ~3-4 secs) │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│ Preview (18 cards created)   │
│                              │
│ Q: First city in story?      │
│ A: Madrid                    │
│                              │
│ Q: After Madrid, Maria went? │
│ A: Paris                     │
│                              │
│ [Edit] [Save & Start Study →]│
└─────────────────────────────┘
```

**2. Study Session Flow**
```
┌─────────────────────────────┐
│ European Capitals            │
│ 5 cards due today            │
│                              │
│ Q: What is the capital of    │
│    Spain?                    │
│                              │
│ [Show Answer]                │
└─────────────────────────────┘
        ↓ (user clicks)
┌─────────────────────────────┐
│ European Capitals            │
│ 5 cards due today            │
│                              │
│ Q: What is the capital of    │
│    Spain?                    │
│                              │
│ A: Madrid                    │
│                              │
│ How well did you remember?   │
│ [Again] [Hard] [Good] [Easy] │
└─────────────────────────────┘
        ↓ (user clicks "Good")
        ↓ (SRS algorithm calculates next review)
        ↓ (Next card appears)
```

---

## DEPLOYMENT SETUP

### Frontend (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy (from frontend directory)
vercel --prod

# Environment variables needed:
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_API_BASE_URL=https://brainkit-api.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Backend (Railway)

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Deploy (from backend directory)
railway up

# Environment variables needed:
DATABASE_URL=postgresql://user:pass@host:5432/db
CLAUDE_API_KEY=sk-ant-xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # For server-side auth verification
CORS_ORIGINS=https://brainkit.vercel.app
```

### Database (Supabase)

1. Create project at supabase.com
2. Run SQL schema (from Database Schema section above)
3. Enable Auth providers:
   - Email/Password (enabled by default)
   - Google OAuth (need Google Console setup)
4. Get API keys from Settings → API

### Monitoring & Analytics

**Free tier tools:**
- Vercel Analytics (built-in, free)
- Railway logs (built-in)
- Supabase logs (built-in)
- Sentry (error tracking, free tier 5K events/month)

**Later (when needed):**
- PostHog (product analytics, free tier 1M events/month)
- Mixpanel (user analytics, free tier 100K events/month)

---

## TESTING STRATEGY

### Must-Have Tests for MVP

**Backend (Python + pytest):**
```python
# test_srs_algorithm.py
def test_sm2_calculation():
    # Test that SM-2 calculates correct intervals
    ef, interval, reps, next_date = calculate_next_review(
        quality=4, easiness_factor=2.5, interval=1, repetitions=0
    )
    assert interval == 1  # First review
    assert reps == 1

def test_forgotten_card_resets():
    # Test that quality < 3 resets the card
    ef, interval, reps, _ = calculate_next_review(
        quality=2, easiness_factor=2.5, interval=10, repetitions=5
    )
    assert interval == 1
    assert reps == 0

# test_api.py
def test_generate_mnemonics_endpoint():
    response = client.post("/api/mnemonics/generate", json={
        "list": ["Madrid", "Paris", "London"],
        "context": "European capitals"
    })
    assert response.status_code == 200
    data = response.json()
    assert "mnemonics" in data
    assert len(data["mnemonics"]) == 3
```

**Frontend (React + Vitest):**
```typescript
// StudySession.test.tsx
test('shows answer after clicking Show Answer button', () => {
  render(<StudySession />);
  const showButton = screen.getByText('Show Answer');
  fireEvent.click(showButton);
  expect(screen.getByText('Madrid')).toBeInTheDocument();
});

test('moves to next card after review', async () => {
  render(<StudySession />);
  // ... simulate review
  await waitFor(() => {
    expect(screen.getByText(/card 2 of 5/i)).toBeInTheDocument();
  });
});
```

**Manual Testing Checklist (before launch):**
- [ ] Sign up with email works
- [ ] Sign up with Google works
- [ ] Create deck with 10-item list
- [ ] All 3 mnemonic types generate correctly
- [ ] Flashcards generate (15-20 cards)
- [ ] Study session works (show answer, review buttons)
- [ ] SRS scheduling works (cards don't show up tomorrow if marked "Easy")
- [ ] Free tier limit works (blocks after 3 generations)
- [ ] Premium upgrade flow works (Stripe checkout)
- [ ] Mobile responsive (test on iPhone + Android)

---

## MONETIZATION IMPLEMENTATION

### Stripe Integration

```typescript
// Frontend: Checkout button
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

async function handleUpgradeToPremium() {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id })
  });

  const { session_id } = await response.json();

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: session_id });
}
```

```python
# Backend: Create checkout session
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

@app.post("/api/create-checkout-session")
async def create_checkout_session(user_id: str):
    # Create or retrieve Stripe customer
    user_profile = db.query(Profile).filter_by(id=user_id).first()

    if not user_profile.stripe_customer_id:
        customer = stripe.Customer.create(email=user_profile.email)
        user_profile.stripe_customer_id = customer.id
        db.commit()

    # Create checkout session
    session = stripe.checkout.Session.create(
        customer=user_profile.stripe_customer_id,
        mode='subscription',
        line_items=[{
            'price': settings.STRIPE_PRICE_ID,  # Price ID from Stripe dashboard
            'quantity': 1
        }],
        success_url=f"{settings.FRONTEND_URL}/dashboard?upgrade=success",
        cancel_url=f"{settings.FRONTEND_URL}/pricing?upgrade=canceled"
    )

    return {"session_id": session.id}

# Webhook handler for subscription events
@app.post("/api/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")

    # Handle subscription events
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_id = session['customer']

        # Update user to Premium
        profile = db.query(Profile).filter_by(
            stripe_customer_id=customer_id
        ).first()
        profile.subscription_tier = 'premium'
        profile.subscription_status = 'active'
        db.commit()

    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        customer_id = subscription['customer']

        # Downgrade user to Free
        profile = db.query(Profile).filter_by(
            stripe_customer_id=customer_id
        ).first()
        profile.subscription_tier = 'free'
        profile.subscription_status = 'canceled'
        db.commit()

    return {"status": "success"}
```

### Usage Tracking (Free Tier Limit)

```python
# Middleware to check generation limits
def check_generation_limit(user_id: str) -> bool:
    profile = db.query(Profile).filter_by(id=user_id).first()

    # Premium users have unlimited
    if profile.subscription_tier == 'premium':
        return True

    # Free users limited to 3/month
    # Reset counter on first day of month
    today = datetime.now()
    if profile.last_reset_date.month != today.month:
        profile.generations_used_this_month = 0
        profile.last_reset_date = today
        db.commit()

    if profile.generations_used_this_month >= 3:
        return False  # Limit reached

    return True

# Use in generation endpoint
@app.post("/api/mnemonics/generate")
async def generate_mnemonics(request: MnemonicRequest, user_id: str):
    if not check_generation_limit(user_id):
        raise HTTPException(
            status_code=403,
            detail="Free tier limit reached (3/month). Upgrade to Premium for unlimited generations."
        )

    # Generate mnemonics...
    mnemonics = await generate_mnemonics_with_claude(request.list)

    # Increment counter
    profile = db.query(Profile).filter_by(id=user_id).first()
    profile.generations_used_this_month += 1
    db.commit()

    return mnemonics
```

---

## MVP LAUNCH CHECKLIST

### Week 1: Foundation
- [ ] Set up Supabase project (DB + Auth)
- [ ] Create database schema + RLS policies
- [ ] Set up React project (Vite + TypeScript + TailwindCSS)
- [ ] Set up FastAPI project (with Supabase client)
- [ ] Implement basic auth (login/signup UI + Supabase integration)
- [ ] Deploy skeleton to Vercel + Railway (confirm CI/CD works)

### Week 2: Core Generation Features
- [ ] Build "Create Deck" UI (list input → mnemonic selector)
- [ ] Implement Claude API integration (mnemonic generation)
- [ ] Implement Claude API integration (flashcard generation)
- [ ] Build flashcard preview UI
- [ ] Save deck + cards to database
- [ ] Test end-to-end deck creation flow

### Week 3: Study System + SRS
- [ ] Implement SM-2 algorithm in backend
- [ ] Build study session UI (flashcard display)
- [ ] Build review buttons (Again/Hard/Good/Easy)
- [ ] Connect review submission to SRS backend
- [ ] Test SRS scheduling (verify cards show up at correct intervals)
- [ ] Build dashboard (list decks + due counts)

### Week 4: Polish + Monetization
- [ ] Implement usage tracking (free tier 3/month limit)
- [ ] Integrate Stripe checkout
- [ ] Implement Stripe webhooks
- [ ] Add upgrade prompts in UI
- [ ] Add basic stats page (decks count, cards mastered, streak)
- [ ] Mobile responsive testing (iOS + Android Chrome)
- [ ] Bug fixes from testing

### Week 5: Beta Launch Prep
- [ ] Write onboarding flow (first-time user tutorial)
- [ ] Add loading states (skeleton screens, spinners)
- [ ] Error handling (API failures, network errors)
- [ ] Analytics setup (Vercel Analytics + Sentry)
- [ ] Create landing page (pitch + signup)
- [ ] Recruit 10 beta testers (target: nurses via Reddit r/nursing)
- [ ] Launch to beta testers
- [ ] Collect feedback + iterate

---

## POST-MVP ROADMAP (V2 Features)

**Quick Wins (1-2 weeks each):**
1. **Deck sharing** - Public/private decks, share link
2. **PDF import** - OCR with Gemini Vision API
3. **Audio flashcards** - TTS for auditory learners
4. **Dark mode** - User preference toggle

**Medium Efforts (3-4 weeks each):**
5. **Mobile apps** - React Native (iOS + Android)
6. **Advanced statistics** - Retention curves, heatmaps, predictions
7. **Deck templates** - Pre-made decks for common certifications (NCLEX, FAA, CompTIA)
8. **Team/Enterprise** - B2B features (admin dashboard, SSO, bulk licensing)

**Big Bets (2-3 months each):**
9. **AI tutor mode** - Chat with AI about cards you're struggling with
10. **Gamification** - XP, levels, achievements, leaderboards
11. **Community marketplace** - Users sell curated decks (BrainKit takes 30% cut)

---

## RISK MITIGATION

### Technical Risks

**Risk:** Claude API generates low-quality mnemonics
- **Mitigation:** Extensive prompt engineering + few-shot examples + allow regeneration
- **Fallback:** Manual mnemonic entry as backup option

**Risk:** Claude API costs spiral out of control
- **Mitigation:** Strict rate limiting + caching common lists + prompt optimization
- **Monitoring:** Daily cost alerts via Stripe billing dashboard

**Risk:** SRS algorithm doesn't work well
- **Mitigation:** Use proven SM-2 (Anki's algorithm) + allow user manual scheduling override
- **Iteration:** Collect data, potentially upgrade to FSRS (newer algorithm) in V2

### Business Risks

**Risk:** Learvo launches paid tier before BrainKit and captures market
- **Mitigation:** Move FAST - launch beta in 4-5 weeks, not 3 months
- **Differentiation:** Target professionals (not students) to avoid direct competition

**Risk:** Low conversion from Free to Premium (< 2%)
- **Mitigation:** Make free tier useful but limited (3 decks/month is enough to see value)
- **Optimization:** A/B test pricing ($7.99 vs $9.99 vs $12.99) and upgrade prompts

**Risk:** Users don't stick (low retention)
- **Mitigation:** Email reminders for due cards + push notifications (PWA) in V1.5
- **Core UX:** Make study sessions feel rewarding (animations, progress bars, streaks)

---

## SUCCESS METRICS (First 3 Months)

**North Star Metric:** Weekly Active Users (WAU)
- Target: 50 WAU by end of Month 1
- Target: 150 WAU by end of Month 2
- Target: 300 WAU by end of Month 3

**Key Metrics:**

1. **Activation Rate:** % of signups who create at least 1 deck
   - Target: > 60%

2. **Retention D7:** % of users who return after 7 days
   - Target: > 30%

3. **Conversion to Premium:** % of users who upgrade
   - Target: > 3% (industry standard: 2-5%)

4. **Study Session Completion:** % of study sessions completed (not abandoned)
   - Target: > 70%

5. **Generation Quality:** % of generated mnemonics that users choose (vs regenerate)
   - Target: > 80% (at least 1 of 3 is good enough)

**Revenue Target (Month 3):**
- 300 WAU × 5% Premium conversion = 15 Premium users
- 15 × $9.99/month = $150 MRR
- Annual run rate: $1,800/year

**Path to $10K MRR (12-month goal):**
- Need ~1000 Premium users
- At 5% conversion rate → Need 20,000 total users
- At 50% activation → Need 40,000 signups

---

## TECHNICAL DOCUMENTATION

All code will be documented with:
- Inline comments for complex logic (SRS algorithm, Claude prompts)
- README.md files in each directory (frontend, backend)
- API documentation auto-generated by FastAPI (Swagger UI)
- Database schema diagram (generated from Supabase or dbdiagram.io)

Keep documentation minimal but useful. Prioritize code clarity over comments.

---

**Document version:** 1.0
**Last updated:** 2025-12-27
**Author:** BrainKit Technical Team
**Status:** Ready for Development
