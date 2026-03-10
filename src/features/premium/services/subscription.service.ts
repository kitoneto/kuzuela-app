import { PLANS } from '../../../shared/constants/plans';
export class SubscriptionService {
  async getPlans() { return PLANS; }
  async subscribe(planId: string, _userId: string): Promise<void> { console.log('Subscribing to', planId); await new Promise(r=>setTimeout(r,500)); }
}
export const subscriptionService = new SubscriptionService();
