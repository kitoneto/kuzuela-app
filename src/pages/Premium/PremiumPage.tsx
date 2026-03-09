import { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PlanCard } from '../../components/premium/PlanCard';
import type { PricingPlan } from '../../types';
import { CheckCircle, Zap } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const PLANS: PricingPlan[] = [
  {
    id: 'pro',
    tier: 'pro',
    name: 'Pro',
    description: 'Perfect for dedicated learners',
    price_usd: 9,
    price_eur: 8,
    price_aoa: 7500,
    price_mzn: 580,
    price_brl: 49,
    features: [
      'All free courses + premium courses',
      'AI Tutor unlimited access',
      'Offline learning mode',
      'Priority support',
      'No ads',
      'Advanced progress tracking',
    ],
  },
  {
    id: 'plus',
    tier: 'plus',
    name: 'Plus',
    description: 'For the most ambitious learners',
    price_usd: 19,
    price_eur: 17,
    price_aoa: 15000,
    price_mzn: 1200,
    price_brl: 99,
    features: [
      'Everything in Pro',
      'Live group sessions',
      'Personalized learning path',
      'Certificate of completion',
      '1-on-1 tutor sessions (2/month)',
      'Family plan (up to 4 members)',
    ],
  },
];

const FREE_FEATURES = [
  '5 free courses',
  'Basic AI Tutor (10 messages/day)',
  'Leaderboard access',
  'Core exercises',
  'Daily streak tracking',
];

type Currency = 'usd' | 'eur' | 'aoa' | 'mzn' | 'brl';

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: 'usd', label: 'USD $' },
  { code: 'eur', label: 'EUR €' },
  { code: 'aoa', label: 'AOA Kz' },
  { code: 'mzn', label: 'MZN MT' },
  { code: 'brl', label: 'BRL R$' },
];

export function PremiumPage() {
  const { info } = useToast();
  const [currency, setCurrency] = useState<Currency>('usd');

  const handleSelect = (plan: PricingPlan) => {
    info(`Upgrade to ${plan.name} coming soon! Contact support@kuzuela.app`);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            Unlock Your Potential
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Choose your plan
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>
        </div>

        {/* Currency selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currency === c.code
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Free */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Free</p>
              <h3 className="text-xl font-bold text-gray-900">Starter</h3>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-500 text-sm mb-1">/forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Begin your language journey</p>
            </div>
            <ul className="space-y-3 mb-6">
              {FREE_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="w-full py-3 rounded-xl border-2 border-gray-200 text-center text-sm font-semibold text-gray-500">
              Current Plan
            </div>
          </div>

          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currency={currency}
              highlighted={i === 0}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes! Cancel your subscription at any time with no penalties.' },
              { q: 'Is there a student discount?', a: 'Yes, students get 30% off. Contact us with your student email.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, mobile money (M-Pesa, Multicaixa).' },
              { q: 'Can I switch plans?', a: 'Yes, you can upgrade or downgrade at any time.' },
            ].map(faq => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
