/**
 * OrderFlow Component with Paystack Integration
 * 
 * This is an example of how to integrate Paystack payments into your order flow.
 * Replace /components/OrderFlow.tsx with this file when ready to accept real payments.
 */

import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, DollarSign, Truck, XCircle } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { paystackService } from '../utils/paystack/paystackService';
import { createOrder, updateOrderPayment } from '../utils/database/ordersService';
import { toast } from 'sonner@2.0.3';

type OrderStatus = 'details' | 'validation' | 'payment' | 'delivery' | 'complete';

interface OrderFlowProps {
  listingId: string;
  currentUser: {
    id: string;
    name: string;
    role: string;
    email?: string;
  };
  onBack: () => void;
  onComplete: () => void;
}

export function OrderFlow({ listingId, currentUser, onBack, onComplete }: OrderFlowProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('details');
  const [quantity, setQuantity] = useState(50);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(false);
  
  const listing = mockListings.find(l => l.id === listingId);

  if (!listing) return null;

  const totalAmount = listing.price * quantity;
  const escrowFee = totalAmount * 0.02;
  const finalTotal = totalAmount + escrowFee;

  const handleSubmitOrder = async () => {
    setLoading(true);

    try {
      // Create order in database
      const { data, error } = await createOrder({
        buyer_id: currentUser.id,
        seller_id: listing.seller_id || '1', // Replace with actual seller ID
        listing_id: listingId,
        quantity,
        total_amount: totalAmount,
        escrow_fee: escrowFee,
        delivery_address: deliveryAddress,
      });

      if (error) throw error;

      if (data) {
        setOrderId(data.id);
        toast.success('Order created successfully!');
        
        // Move to validation step
        setOrderStatus('validation');
        
        // Simulate validation process (in production, this would be done by Extension Officer)
        setTimeout(() => {
          setValidationStatus('approved');
          setTimeout(() => {
            setOrderStatus('payment');
          }, 2000);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!orderId) {
      toast.error('Order ID not found');
      return;
    }

    // Generate payment reference
    const reference = paystackService.generateReference();
    
    // Convert amount to pesewas (Paystack requirement)
    const amountInPesewas = paystackService.cediseToPesewas(finalTotal);

    // Initialize Paystack payment
    paystackService.initializePayment(
      {
        email: currentUser.email || 'customer@example.com',
        amount: amountInPesewas,
        reference: reference,
        currency: 'GHS',
        metadata: {
          order_id: orderId,
          buyer_name: currentUser.name,
          product: listing.title,
          quantity: quantity,
          custom_fields: [
            {
              display_name: 'Order ID',
              variable_name: 'order_id',
              value: orderId,
            },
            {
              display_name: 'Product',
              variable_name: 'product',
              value: listing.title,
            }
          ]
        },
        channels: ['card', 'bank', 'mobile_money'], // Accept all payment methods
      },
      // On payment success
      async (paymentReference) => {
        toast.success('Payment successful!');
        
        // Update order with payment info
        const { error } = await updateOrderPayment(orderId, paymentReference, 'paid');
        
        if (error) {
          console.error('Failed to update payment:', error);
          toast.error('Payment recorded but failed to update order');
        }

        // Move to delivery step
        setOrderStatus('delivery');
        
        // Simulate delivery
        setTimeout(() => {
          setOrderStatus('complete');
          toast.success('Order delivered successfully!');
        }, 3000);
      },
      // On payment modal close
      () => {
        toast.info('Payment cancelled');
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 hover:text-green-600 transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-8">
            {[
              { id: 'details', label: 'Order Details', icon: '📝' },
              { id: 'validation', label: 'Validation', icon: '✓' },
              { id: 'payment', label: 'Payment', icon: '💳' },
              { id: 'delivery', label: 'Delivery', icon: '🚚' },
              { id: 'complete', label: 'Complete', icon: '✅' }
            ].map((step, index, arr) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition ${
                    orderStatus === step.id 
                      ? 'bg-green-600 text-white' 
                      : ['details', 'validation', 'payment', 'delivery', 'complete'].indexOf(orderStatus) > index
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <p className="text-sm text-center hidden md:block">{step.label}</p>
                </div>
                {index < arr.length - 1 && (
                  <div className={`h-1 flex-1 ${
                    ['details', 'validation', 'payment', 'delivery', 'complete'].indexOf(orderStatus) > index
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Step */}
        {orderStatus === 'details' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="mb-6">Order Details</h2>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{listing.category}</p>
                  <p className="text-green-600">
                    GH₵{listing.price.toLocaleString()} / {listing.unit}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2">Quantity ({listing.unit}s)</label>
                <input
                  type="number"
                  min="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum order: 50 {listing.unit}s</p>
              </div>

              <div>
                <label className="block mb-2">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({quantity} {listing.unit}s)</span>
                  <span>GH₵{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Escrow Fee (2%)</span>
                  <span>GH₵{escrowFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span>Total</span>
                  <span className="text-green-600">GH₵{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={!deliveryAddress || quantity < 50 || loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition"
            >
              {loading ? 'Creating Order...' : 'Submit Order for Validation'}
            </button>
          </div>
        )}

        {/* Validation Step */}
        {orderStatus === 'validation' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="mb-6">Order Validation</h2>
            
            <div className="text-center py-8">
              {validationStatus === 'pending' && (
                <>
                  <Clock size={64} className="mx-auto mb-4 text-yellow-500 animate-pulse" />
                  <h3 className="mb-2">Validation in Progress</h3>
                  <p className="text-gray-600 mb-4">
                    An extension officer is reviewing your order details...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto" />
                </>
              )}
              
              {validationStatus === 'approved' && (
                <>
                  <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
                  <h3 className="mb-2">Order Validated!</h3>
                  <p className="text-gray-600 mb-4">
                    Extension Officer approved your order. Proceeding to payment...
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Payment Step */}
        {orderStatus === 'payment' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="mb-6">Secure Payment</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <DollarSign size={24} className="text-blue-600 flex-shrink-0" />
                <div>
                  <p className="mb-1">Escrow Protection</p>
                  <p className="text-sm text-blue-800">
                    Your payment will be held securely until delivery is confirmed. 
                    Funds are only released to the seller after you confirm receipt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <span>GH₵{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Escrow Fee (2%)</span>
                  <span>GH₵{escrowFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span>Amount to Pay</span>
                  <span className="text-green-600">GH₵{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              <p className="mb-2">Payment methods accepted:</p>
              <ul className="space-y-1 pl-4">
                <li>✓ Credit/Debit Cards (Visa, Mastercard)</li>
                <li>✓ Bank Transfer</li>
                <li>✓ Mobile Money (MTN, Vodafone, AirtelTigo)</li>
              </ul>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Delivery Step */}
        {orderStatus === 'delivery' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="mb-6">Delivery in Progress</h2>
            
            <div className="text-center py-8">
              <Truck size={64} className="mx-auto mb-4 text-green-600 animate-bounce" />
              <h3 className="mb-2">Order Being Delivered</h3>
              <p className="text-gray-600 mb-4">
                Your order is on its way! You will be notified when it arrives.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto" />
            </div>
          </div>
        )}

        {/* Complete Step */}
        {orderStatus === 'complete' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="mb-6">Order Complete</h2>
            
            <div className="text-center py-8">
              <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
              <h3 className="mb-2">Order Delivered Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for using Agrilink Ghana. Funds have been released to the seller.
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                  View My Orders
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Browse More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
