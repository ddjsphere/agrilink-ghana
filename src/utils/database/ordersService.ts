import { supabase } from '../supabase/client';

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  quantity: number;
  total_amount: number;
  escrow_fee: number;
  delivery_address: string;
  status: 'pending' | 'validated' | 'paid' | 'in_delivery' | 'delivered' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'released' | 'refunded';
  payment_reference?: string;
  validated_by?: string;
  validation_notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new order
 */
export async function createOrder(orderData: {
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  quantity: number;
  total_amount: number;
  escrow_fee: number;
  delivery_address: string;
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...orderData,
      status: 'pending',
      payment_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  additionalData?: Partial<Order>
) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      ...additionalData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Update payment status and reference
 */
export async function updateOrderPayment(
  orderId: string,
  paymentReference: string,
  paymentStatus: Order['payment_status']
) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      payment_reference: paymentReference,
      payment_status: paymentStatus,
      status: paymentStatus === 'paid' ? 'paid' : 'pending',
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating payment:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Validate order (Extension Officer action)
 */
export async function validateOrder(
  orderId: string,
  validatedBy: string,
  approved: boolean,
  notes?: string
) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: approved ? 'validated' : 'cancelled',
      validated_by: validatedBy,
      validation_notes: notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error validating order:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Fetch orders by buyer
 */
export async function fetchOrdersByBuyer(buyerId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      listings (
        title,
        image_url,
        category
      ),
      profiles!orders_seller_id_fkey (
        name,
        role
      )
    `)
    .eq('buyer_id', buyerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching buyer orders:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Fetch orders by seller
 */
export async function fetchOrdersBySeller(sellerId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      listings (
        title,
        image_url,
        category
      ),
      profiles!orders_buyer_id_fkey (
        name,
        role
      )
    `)
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching seller orders:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Fetch single order by ID
 */
export async function fetchOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      listings (
        title,
        image_url,
        category,
        price,
        unit
      ),
      profiles!orders_seller_id_fkey (
        name,
        role,
        phone,
        email
      ),
      buyer:profiles!orders_buyer_id_fkey (
        name,
        role,
        phone,
        email
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Fetch pending orders for validation (Extension Officers)
 */
export async function fetchPendingOrdersForValidation() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      listings (
        title,
        category,
        price,
        unit
      ),
      profiles!orders_buyer_id_fkey (
        name,
        location
      ),
      seller:profiles!orders_seller_id_fkey (
        name,
        verified
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pending orders:', error);
    return { data: null, error };
  }

  return { data, error: null };
}
