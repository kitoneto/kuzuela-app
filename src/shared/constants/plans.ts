export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Start your language learning journey',
    price: { USD: 0, AOA: 0, EUR: 0, MZN: 0, BRL: 0 },
    period: 'forever',
    features: [
      '5 hearts per day',
      'Access to basic lessons',
      'Progress tracking',
      'Leaderboard access',
    ],
    limitations: ['Limited to 5 lessons/day', 'Ads enabled', 'No AI Tutor'],
    highlighted: false,
  },
  {
    id: 'premium_monthly',
    name: 'Premium',
    description: 'Unlimited learning, zero limits',
    price: { USD: 9.99, AOA: 5000, EUR: 8.99, MZN: 650, BRL: 49.90 },
    period: 'month',
    features: [
      'Unlimited hearts',
      'All lessons unlocked',
      'AI Tutor access',
      'No ads',
      'Offline mode',
      'Progress analytics',
      'Priority support',
    ],
    limitations: [],
    highlighted: true,
  },
  {
    id: 'premium_annual',
    name: 'Premium Annual',
    description: 'Best value — save 40%',
    price: { USD: 71.88, AOA: 36000, EUR: 64.80, MZN: 4680, BRL: 359.28 },
    period: 'year',
    features: [
      'Everything in Premium',
      '40% savings vs monthly',
      'Exclusive annual badge',
      'Early access to new features',
    ],
    limitations: [],
    highlighted: false,
  },
] as const;

export type PlanId = typeof PLANS[number]['id'];
