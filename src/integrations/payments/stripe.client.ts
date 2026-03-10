export interface CheckoutSession {
  id: string;
  url: string;
}

export async function createCheckoutSession(planId: string, _userId: string): Promise<CheckoutSession> {
  // Mock implementation - would call Supabase edge function in production
  console.log('Creating checkout for plan:', planId);
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: `cs_mock_${Date.now()}`,
    url: '/premium?checkout=success',
  };
}

export async function cancelSubscription(_subscriptionId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
}

export const stripeClient = { createCheckoutSession, cancelSubscription };
