import { useState } from 'react';
import { subscriptionService } from '../services/subscription.service';
import { useAuth } from '../../../app/providers/AuthProvider';
export function useSubscription() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const subscribe = async (planId: string) => {
    setLoading(true);
    try { await subscriptionService.subscribe(planId, user?.id ?? ''); }
    finally { setLoading(false); }
  };
  return { loading, subscribe };
}
