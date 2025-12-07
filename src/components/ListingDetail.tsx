import { ArrowLeft, MapPin, Phone, Mail, Star, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockListings } from '../data/mockData';

interface ListingDetailProps {
  listingId: string;
  onBack: () => void;
  onPlaceOrder: (listingId: string) => void;
}

export function ListingDetail({ listingId, onBack, onPlaceOrder }: ListingDetailProps) {
  const listing = mockListings.find(l => l.id === listingId);

  if (!listing) {
    return <div className="container mx-auto px-4 py-8">Listing not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 hover:text-green-600 transition"
      >
        <ArrowLeft size={20} />
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6">
            <div className="aspect-video bg-gray-100">
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-3">
                  {listing.category}
                </div>
                <h2 className="mb-2">{listing.title}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>{listing.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600 mb-1">
                  GH₵{listing.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per {listing.unit}</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {listing.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                High quality {listing.category.toLowerCase()} available for immediate purchase. 
                Suitable for commercial farming and personal use. All products are sourced from 
                verified suppliers and undergo quality checks before delivery.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p>{listing.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Availability</p>
                  <p className={listing.inStock ? 'text-green-600' : 'text-red-600'}>
                    {listing.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Minimum Order</p>
                  <p>50 {listing.unit}s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p>{listing.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="mb-4">Seller Information</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl">
                {listing.seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="mb-1">{listing.seller.name}</p>
                <p className="text-sm text-gray-600">{listing.seller.role}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>{listing.seller.rating} rating</span>
                  {listing.seller.verified && (
                    <ShieldCheck size={14} className="text-green-600 ml-1" />
                  )}
                </div>
              </div>
            </div>

            {listing.seller.verified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <ShieldCheck size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-green-800 mb-1">Verified Seller</p>
                  <p className="text-green-700">
                    This seller has been verified by our team and approved extension officers.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition">
                <Phone size={18} />
                Contact Seller
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition">
                <Mail size={18} />
                Send Message
              </button>
            </div>
          </div>

          {/* Order Action */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="mb-4">Place Secure Order</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="mb-1">Secure Payment Process</p>
                <p>Payment held in escrow until delivery is confirmed.</p>
              </div>
            </div>

            <div className="space-y-3 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <span>Place order</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <span>Extension officer validates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <span>Payment secured in escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                <span>Delivery & confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">5</div>
                <span>Funds released to seller</span>
              </div>
            </div>

            <button 
              onClick={() => onPlaceOrder(listing.id)}
              disabled={!listing.inStock}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition"
            >
              {listing.inStock ? 'Place Secure Order' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}