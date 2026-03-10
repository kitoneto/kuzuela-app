// EMIS - Electronic Money Interbank System (Angola)
export interface EmisPaymentRequest {
  amount: number;
  currency: 'AOA';
  reference: string;
  description: string;
  phoneNumber?: string;
}

export interface EmisPaymentResponse {
  transactionId: string;
  reference: string;
  status: 'pending' | 'success' | 'failed';
}

export async function initiateEmisPayment(request: EmisPaymentRequest): Promise<EmisPaymentResponse> {
  // Mock implementation - would integrate with EMIS API in production
  console.log('Initiating EMIS payment:', request);
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    transactionId: `emis_${Date.now()}`,
    reference: request.reference,
    status: 'pending',
  };
}

export const emisClient = { initiatePayment: initiateEmisPayment };
