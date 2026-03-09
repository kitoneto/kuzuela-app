import { CheckCircle } from 'lucide-react';
import type { PricingPlan } from '../../types';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: PricingPlan;
  currency?: 'usd' | 'eur' | 'aoa' | 'mzn' | 'brl';
  highlighted?: boolean;
  onSelect?: (plan: PricingPlan) => void;
}

const currencySymbols = { usd: '$', eur: '€', aoa: 'Kz', mzn: 'MT', brl: 'R$' };

export function PlanCard({ plan, currency = 'usd', highlighted, onSelect }: PlanCardProps) {
  const price = plan[`price_${currency}` as keyof PricingPlan] as number;
  const symbol = currencySymbols[currency];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl p-6 border-2 transition-all
        ${highlighted
          ? 'border-primary-400 shadow-lg shadow-primary-100'
          : 'border-gray-200'
        }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className={`${highlighted ? 'bg-primary-50' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{plan.tier}</p>
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-3xl font-extrabold text-gray-900">{symbol}{price}</span>
          <span className="text-gray-500 text-sm mb-1">/month</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            <CheckCircle size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan)}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all
          ${highlighted
            ? 'bg-primary-500 hover:bg-primary-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
      >
        Get {plan.name}
      </button>
    </motion.div>
  );
}
