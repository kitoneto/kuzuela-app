import { Check } from 'lucide-react';
interface Props { plan: { id:string; name:string; description:string; price:{USD:number}; period:string; features:string[]; highlighted:boolean }; onSelect: ()=>void; loading:boolean; }
export function PlanCard({ plan, onSelect, loading }: Props) {
  return (
    <div className={`rounded-2xl p-6 border-2 ${plan.highlighted ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}>
      {plan.highlighted && <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mb-3 inline-block">Most Popular</span>}
      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
      <p className="text-gray-500 text-sm mb-3">{plan.description}</p>
      <div className="mb-4"><span className="text-3xl font-bold text-gray-900">${plan.price.USD}</span><span className="text-gray-400">/{plan.period}</span></div>
      <ul className="space-y-2 mb-6">{plan.features.map(f=><li key={f} className="flex items-center gap-2 text-sm text-gray-700"><Check className="h-4 w-4 text-green-500 flex-shrink-0"/>{f}</li>)}</ul>
      <button onClick={onSelect} disabled={loading || plan.price.USD===0} className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.price.USD===0?'bg-gray-100 text-gray-500 cursor-default':plan.highlighted?'bg-purple-600 text-white hover:bg-purple-700':'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'} disabled:opacity-60`}>
        {plan.price.USD===0 ? 'Current Plan' : loading ? 'Processing...' : 'Get Started'}
      </button>
    </div>
  );
}
