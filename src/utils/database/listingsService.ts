import { supabase } from '../supabase/client';

export interface Listing {
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
  seller?: {
    name: string;
    role: string;
    rating: number;
    verified: boolean;
  };
}

/**
 * Fetch all listings with optional filters
 */
export async function fetchListings(filters?: {
  category?: string;
  location?: string;
  search?: string;
  inStockOnly?: boolean;
}) {
  let query = supabase
    .from('listings')
    .select(`
      *,
      profiles!listings_seller_id_fkey (
        name,
        role,
        rating,
        verified
      )
    `)
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.location) {
    query = query.eq('location', filters.location);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters?.inStockOnly) {
    query = query.eq('in_stock', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching listings:', error);
    return { data: null, error };
  }

  // Transform data to match frontend format
  const listings = data?.map(listing => ({
    ...listing,
    seller: listing.profiles ? {
      name: listing.profiles.name,
      role: listing.profiles.role,
      rating: listing.profiles.rating,
      verified: listing.profiles.verified,
    } : undefined,
  }));

  return { data: listings, error: null };
}

/**
 * Fetch a single listing by ID
 */
export async function fetchListingById(id: string) {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      profiles!listings_seller_id_fkey (
        name,
        role,
        rating,
        verified,
        phone,
        email
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching listing:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Create a new listing
 */
export async function createListing(listing: Omit<Listing, 'id' | 'created_at' | 'seller'>) {
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Update a listing
 */
export async function updateListing(id: string, updates: Partial<Listing>) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating listing:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Delete a listing
 */
export async function deleteListing(id: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting listing:', error);
    return { error };
  }

  return { error: null };
}

/**
 * Fetch listings by seller
 */
export async function fetchListingsBySeller(sellerId: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching seller listings:', error);
    return { data: null, error };
  }

  return { data, error: null };
}
