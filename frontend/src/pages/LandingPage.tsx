import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import {
  Brain,
  FileText,
  Sparkles,
  Target,
  Stethoscope,
  Plane,
  Monitor,
  Scale,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Star,
  Check,
  ArrowRight,
  Play,
  Users,
  Award,
  BookOpen,
  ChevronRight,
  Quote,
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            BrainKit
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" onClick={() => navigate('/register')}>
              Get Started Free
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning Revolution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Stop Creating Flashcards.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                  Start Remembering.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AI generates personalized mnemonic techniques and flashcards from any list. Spaced
                repetition handles the rest. Remember 95% of what you learn.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="group"
                >
                  Create Your First Deck - Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="secondary" size="lg" className="group">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Social proof stats */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    <strong className="text-gray-900">2,500+</strong> active learners
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    <strong className="text-gray-900">4.9/5</strong> rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right content - App Preview */}
            <div className="relative animate-slide-up lg:animate-fade-in">
              <div className="relative">
                {/* Main app preview */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                        app.brainkit.io
                      </div>
                    </div>
                  </div>

                  {/* App content mockup */}
                  <div className="p-6 bg-gray-50">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Medical Terminology</div>
                            <div className="text-sm text-gray-500">24 cards to review</div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          Due today
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
                      </div>
                    </div>

                    {/* Mnemonic preview */}
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">
                          AI-Generated Mnemonic
                        </span>
                      </div>
                      <p className="text-lg font-medium leading-relaxed">
                        "SAMPLE" - Symptoms, Assessment, Medications, Past history, Last meal,
                        Events
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">95% Retention</div>
                      <div className="text-gray-500 text-xs">After 30 days</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">3 Seconds</div>
                      <div className="text-gray-500 text-xs">To generate mnemonics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY PROFESSIONALS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Johns Hopkins', 'Mayo Clinic', 'Stanford', 'MIT', 'Harvard'].map((name) => (
              <div key={name} className="text-xl font-semibold text-gray-400">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to master any subject
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combine the power of AI with proven learning science for unprecedented retention
              rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI Mnemonic Generation',
                description:
                  'Paste any list and get 3 different mnemonic techniques instantly. Pick the one that resonates with your brain.',
                color: 'primary',
              },
              {
                icon: Target,
                title: 'Spaced Repetition (SRS)',
                description:
                  'Scientifically-proven algorithm shows cards at the optimal time for long-term retention.',
                color: 'purple',
              },
              {
                icon: Clock,
                title: 'Quick Study Sessions',
                description:
                  'Review decks in just 5-10 minutes. Perfect for busy professionals on the go.',
                color: 'orange',
              },
              {
                icon: TrendingUp,
                title: 'Progress Analytics',
                description:
                  'Track your retention rate, study streaks, and identify weak areas that need more practice.',
                color: 'green',
              },
              {
                icon: Shield,
                title: 'Retention Guarantee',
                description:
                  'Our users achieve 95%+ retention rate after 30 days of consistent study.',
                color: 'blue',
              },
              {
                icon: Users,
                title: 'Shared Decks',
                description:
                  'Access community-created decks or share your own with colleagues and study groups.',
                color: 'pink',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.color === 'primary'
                      ? 'bg-primary-100 text-primary-600'
                      : feature.color === 'purple'
                        ? 'bg-purple-100 text-purple-600'
                        : feature.color === 'orange'
                          ? 'bg-orange-100 text-orange-600'
                          : feature.color === 'green'
                            ? 'bg-green-100 text-green-600'
                            : feature.color === 'blue'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start memorizing in 3 simple steps
            </h2>
            <p className="text-xl text-gray-600">
              From any list to permanent memory in under a minute
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                icon: FileText,
                title: 'Paste Your List',
                description:
                  'Copy any list - medical procedures, legal terms, programming concepts, flight protocols. Our AI understands any format.',
                gradient: 'from-primary-500 to-primary-600',
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'Choose Your Mnemonic',
                description:
                  'AI instantly generates 3 unique mnemonic techniques: acronyms, stories, and visual associations. Pick what clicks.',
                gradient: 'from-purple-500 to-purple-600',
              },
              {
                step: '03',
                icon: Target,
                title: 'Study with SRS',
                description:
                  'Review flashcards with our spaced repetition system. The algorithm adapts to your memory, showing cards at the perfect time.',
                gradient: 'from-green-500 to-green-600',
              },
            ].map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent" />
                )}

                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                  {/* Step number */}
                  <div
                    className={`absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {step.step}
                  </div>

                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by professionals who can't afford to forget
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen, RN',
                role: 'Emergency Nurse, Johns Hopkins',
                avatar: 'SC',
                content:
                  'BrainKit helped me memorize over 200 medication protocols in just 2 weeks. The mnemonic techniques are genius - I still remember everything months later.',
                rating: 5,
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Commercial Pilot, United',
                avatar: 'MR',
                content:
                  "As a pilot, forgetting procedures is not an option. BrainKit's SRS ensures I never miss a review. My check ride prep has never been smoother.",
                rating: 5,
              },
              {
                name: 'Dr. Emily Watson',
                role: 'Medical Resident, Stanford',
                avatar: 'EW',
                content:
                  'I used BrainKit for my board exams and scored in the 98th percentile. The AI-generated mnemonics made complex topics actually stick.',
                rating: 5,
              },
              {
                name: 'David Park',
                role: 'Senior Software Engineer, Google',
                avatar: 'DP',
                content:
                  'Learning new programming languages and frameworks is my job. BrainKit cut my learning time in half with its smart repetition system.',
                rating: 5,
              },
              {
                name: 'Jennifer Liu, JD',
                role: 'Associate Attorney, Kirkland',
                avatar: 'JL',
                content:
                  'Bar exam prep was overwhelming until I found BrainKit. The story-based mnemonics for legal rules made studying actually enjoyable.',
                rating: 5,
              },
              {
                name: 'Robert Thompson',
                role: 'IT Security Analyst',
                avatar: 'RT',
                content:
                  "Keeping up with security certifications is endless. BrainKit helps me maintain 12 different certs without feeling like I'm constantly studying.",
                rating: 5,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Built for high-stakes professionals
            </h2>
            <p className="text-gray-600">
              Join thousands who trust BrainKit for critical knowledge
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Stethoscope, label: 'Healthcare', count: '850+' },
              { icon: Plane, label: 'Aviation', count: '320+' },
              { icon: Monitor, label: 'Tech', count: '1.2K+' },
              { icon: Scale, label: 'Legal', count: '480+' },
              { icon: Award, label: 'Academia', count: '620+' },
              { icon: Shield, label: 'Security', count: '280+' },
            ].map((profession) => (
              <div
                key={profession.label}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <profession.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{profession.label}</div>
                  <div className="text-xs text-gray-500">{profession.count} users</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Simple Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start free, upgrade when you're ready
            </h2>
            <p className="text-xl text-gray-600">No credit card required. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for getting started</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '3 AI generations per month',
                  'Full spaced repetition system',
                  'Unlimited study sessions',
                  'Basic progress tracking',
                  'Mobile-friendly interface',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                className="w-full"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Get Started Free
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-white rounded-2xl border-2 border-primary-500 p-8 shadow-xl">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-600 mb-4">For serious learners</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-primary-600">$9.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">or $99/year (save 17%)</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited AI generations',
                  'Full spaced repetition system',
                  'Unlimited study sessions',
                  'Advanced analytics & insights',
                  'Priority support',
                  'Export decks to PDF/CSV',
                  'Shared deck collaboration',
                  'Early access to new features',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Start 14-Day Free Trial
              </Button>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-500" />
              <span>30-day money-back guarantee. No questions asked.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to never forget again?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join 2,500+ professionals who are mastering new knowledge faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-white text-primary-600 hover:bg-gray-50"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-primary-200 text-sm mt-6">
            No credit card required. Start learning in 30 seconds.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                BrainKit
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI-powered memorization for professionals who can't afford to forget.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2025 BrainKit. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
