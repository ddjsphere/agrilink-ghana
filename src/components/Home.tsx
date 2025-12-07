import { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { CategoryGrid } from './CategoryGrid';
import { ListingCard } from './ListingCard';
import { mockListings, categories, locations } from '../data/mockData';

interface HomeProps {
  onViewListing: (listingId: string) => void;
}

export function Home({ onViewListing }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    const matchesLocation = !selectedLocation || listing.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div>
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-2">Find Quality Agricultural Products &amp; Services</h2>
          <p className="text-center opacity-90 mb-8">Connect directly with farmers, suppliers, and buyers across Ghana</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for crops, equipment, services..."
                  className="flex-1 py-2 outline-none text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0">
                <MapPin className="text-gray-400" size={20} />
                <select 
                  className="py-2 outline-none text-gray-800 bg-transparent"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-md transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3>Browse by Category</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
        
        <CategoryGrid 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="container mx-auto px-4 pb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm">Location</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedLocation('');
                    setSearchQuery('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listings */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h3>
            {selectedCategory || selectedLocation || searchQuery 
              ? `Results (${filteredListings.length})` 
              : 'Latest Listings'}
          </h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Most Recent</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No listings found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map(listing => (
              <ListingCard 
                key={listing.id}
                listing={listing}
                onViewListing={onViewListing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}