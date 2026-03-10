import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { PlanCard } from '../components/PlanCard';
import { useSubscription } from '../hooks/useSubscription';
import { PLANS } from '../../../shared/constants/plans';
import { useToast } from '../../../shared/components/feedback/Toast';
export function PremiumPage() {
  const { subscribe, loading } = useSubscription();
  const { showToast } = useToast();
  const handleSelect = async (planId: string) => {
    await subscribe(planId);
    showToast('Redirecting to checkout...', 'info');
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-purple-700 to-indigo-700 px-4 pt-12 pb-8 text-white text-center">
        <Crown className="h-10 w-10 mx-auto mb-3 text-yellow-400"/>
        <h1 className="text-2xl font-bold">Go Premium</h1>
        <p className="text-purple-200 text-sm mt-1">Unlock your full learning potential</p>
      </div>
      <div className="px-4 py-4 space-y-4">
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}>
            <PlanCard plan={plan as never} onSelect={()=>handleSelect(plan.id)} loading={loading}/>
          </motion.div>
        ))}
      </div>
      <BottomNav/>
    </div>
  );
}
