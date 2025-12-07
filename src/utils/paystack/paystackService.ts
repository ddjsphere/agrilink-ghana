// Paystack Integration for Ghana
// Documentation: https://paystack.com/docs/

interface PaystackConfig {
  publicKey: string;
}

interface PaymentData {
  email: string;
  amount: number; // in pesewas (GH₵1 = 100 pesewas)
  reference: string;
  currency?: string;
  metadata?: any;
  channels?: string[];
}

interface PaymentResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// Get your Paystack public key from: https://dashboard.paystack.com/#/settings/developers
// For testing, use: pk_test_xxxxxxxxxxxxxxxx
// For production, use: pk_live_xxxxxxxxxxxxxxxx
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_KEY_HERE';

export class PaystackService {
  private publicKey: string;

  constructor(config?: PaystackConfig) {
    this.publicKey = config?.publicKey || PAYSTACK_PUBLIC_KEY;
  }

  /**
   * Initialize a payment
   * This opens the Paystack payment modal
   */
  initializePayment(data: PaymentData, onSuccess: (reference: string) => void, onClose: () => void) {
    // Check if PaystackPop is loaded
    if (typeof (window as any).PaystackPop === 'undefined') {
      console.error('Paystack script not loaded. Please add the script to your HTML.');
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: this.publicKey,
      email: data.email,
      amount: data.amount, // Amount in pesewas
      currency: data.currency || 'GHS', // Ghana Cedis
      ref: data.reference,
      metadata: data.metadata,
      channels: data.channels || ['card', 'bank', 'mobile_money'], // Accept cards, bank, and mobile money
      onClose: onClose,
      callback: function(response: any) {
        if (response.status === 'success') {
          onSuccess(response.reference);
        }
      },
    });

    handler.openIframe();
  }

  /**
   * Generate a unique payment reference
   */
  generateReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `AGRILINK-${timestamp}-${random}`;
  }

  /**
   * Convert Ghana Cedis to Pesewas
   * GH₵100 = 10,000 pesewas
   */
  cediseToPesewas(cedis: number): number {
    return Math.round(cedis * 100);
  }

  /**
   * Convert Pesewas to Ghana Cedis
   */
  pesewasToCedis(pesewas: number): number {
    return pesewas / 100;
  }

  /**
   * Verify payment on your backend
   * This should be called from your server, not the frontend
   */
  async verifyPayment(reference: string): Promise<any> {
    // This should be done on the backend for security
    console.warn('Payment verification should be done on the server side');
    
    // Example of what should happen on your backend:
    // const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    //   headers: {
    //     Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` // Secret key, not public key!
    //   }
    // });
    // return response.json();
    
    return { warning: 'Implement verification on backend' };
  }
}

// Export singleton instance
export const paystackService = new PaystackService();

/**
 * Usage Example:
 * 
 * import { paystackService } from './utils/paystack/paystackService';
 * 
 * const handlePayment = () => {
 *   const reference = paystackService.generateReference();
 *   const amountInPesewas = paystackService.cediseToPesewas(500); // GH₵500
 *   
 *   paystackService.initializePayment(
 *     {
 *       email: 'customer@example.com',
 *       amount: amountInPesewas,
 *       reference: reference,
 *       metadata: {
 *         order_id: '12345',
 *         custom_fields: [
 *           { display_name: 'Customer Name', variable_name: 'customer_name', value: 'John Doe' }
 *         ]
 *       }
 *     },
 *     (reference) => {
 *       // Payment successful
 *       console.log('Payment successful:', reference);
 *       // Verify payment on backend and update order status
 *     },
 *     () => {
 *       // User closed payment modal
 *       console.log('Payment cancelled');
 *     }
 *   );
 * };
 */
