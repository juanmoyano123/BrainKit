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
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary-600">
            BrainKit
          </a>
          <nav className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" onClick={() => navigate('/register')}>
              Start Free →
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-[3.5rem] font-bold leading-tight mb-6">
              Stop Creating Flashcards. Start Remembering.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AI generates mnemonic techniques and flashcards from any list. Spaced repetition
              handles the rest.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
              Create Your First Deck - Free →
            </Button>
          </div>
          <div className="bg-primary-100 rounded-xl aspect-[4/3] flex items-center justify-center">
            <Brain className="w-24 h-24 text-primary-600" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[1.875rem] font-semibold">How it works - 3 simple steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: '1. Paste Your List',
                description:
                  'Paste any list of procedures, medications, protocols, or technical knowledge you need to memorize.',
              },
              {
                icon: Sparkles,
                title: '2. Choose Your Mnemonic',
                description:
                  'AI instantly generates 3 different mnemonic techniques. Pick the one that clicks with your brain.',
              },
              {
                icon: Target,
                title: '3. Study with SRS',
                description:
                  'Auto-generated flashcards + scientifically-proven spacing. Retain 95%+ without the guesswork.',
              },
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[1.875rem] font-semibold">
              Designed for professionals who can't afford to forget
            </h2>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { icon: Stethoscope, label: 'Nurses' },
              { icon: Plane, label: 'Pilots' },
              { icon: Monitor, label: 'IT Pros' },
              { icon: Scale, label: 'Legal' },
            ].map((profession) => (
              <div key={profession.label} className="text-center">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <profession.icon className="w-6 h-6 text-primary-700" />
                </div>
                <p className="text-gray-600">{profession.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[1.875rem] font-semibold">Simple, transparent pricing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">FREE</h3>
                <div className="text-4xl font-bold text-primary-600">
                  $0<span className="text-base text-gray-500 font-normal">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['3 generations/month', 'Full SRS system', 'Unlimited study'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Start Free →
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-primary-600 rounded-xl p-8 shadow-md">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">PREMIUM</h3>
                <div className="text-4xl font-bold text-primary-600">
                  $9.99<span className="text-base text-gray-500 font-normal">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited generations',
                  'Full SRS system',
                  'Unlimited study',
                  'Advanced stats',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Start Free, Upgrade Later
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <div className="flex gap-6 justify-center mb-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <p>© 2025 BrainKit. All rights reserved.</p>
      </footer>
    </div>
  );
}
