import { MapPin, User, Clock, Star } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  location: string;
  seller: {
    name: string;
    role: string;
    rating: number;
    verified: boolean;
  };
  image: string;
  postedDate: string;
  inStock: boolean;
}

interface ListingCardProps {
  listing: Listing;
  onViewListing: (id: string) => void;
}

export function ListingCard({ listing, onViewListing }: ListingCardProps) {
  return (
    <div 
      onClick={() => onViewListing(listing.id)}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition cursor-pointer group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {!listing.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
          {listing.category}
        </div>
      </div>

      <div className="p-4">
        <h4 className="mb-2 group-hover:text-green-600 transition line-clamp-2">
          {listing.title}
        </h4>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>

        <div className="mb-3">
          <span className="text-green-600">
            GH₵{listing.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm">/{listing.unit}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{listing.location}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-sm">
              <p>{listing.seller.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span>{listing.seller.rating}</span>
                {listing.seller.verified && (
                  <span className="text-green-600 ml-1">✓ Verified</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            <span>{listing.postedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}