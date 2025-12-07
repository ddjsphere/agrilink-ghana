import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Singleton Supabase client for the frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'Farmer' | 'Input Supplier' | 'Aggregator' | 'Manufacturer' | 'Extension Officer' | 'Buyer';
          location: string;
          phone?: string;
          avatar_url?: string;
          verified: boolean;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'rating'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      listings: {
        Row: {
          id: string;
          seller_id: string;
          title: string;
          description: string;
          price: number;
          unit: string;
          category: string;
          location: string;
          image_url: string;
          in_stock: boolean;
          min_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['listings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['listings']['Insert']>;
      };
      orders: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
    };
  };
}
