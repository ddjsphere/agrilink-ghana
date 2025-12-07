export const categories = [
  { id: '1', name: 'Maize', icon: '🌽', count: 234 },
  { id: '2', name: 'Cocoa', icon: '🍫', count: 156 },
  { id: '3', name: 'Poultry', icon: '🐔', count: 189 },
  { id: '4', name: 'Fertilizers', icon: '🧪', count: 145 },
  { id: '5', name: 'Tractors', icon: '🚜', count: 67 },
  { id: '6', name: 'Seeds', icon: '🌱', count: 298 },
  { id: '7', name: 'Rice', icon: '🌾', count: 201 },
  { id: '8', name: 'Cassava', icon: '🥔', count: 176 },
  { id: '9', name: 'Livestock', icon: '🐄', count: 134 },
  { id: '10', name: 'Fish', icon: '🐟', count: 112 },
  { id: '11', name: 'Services', icon: '🛠️', count: 89 },
  { id: '12', name: 'Equipment', icon: '⚙️', count: 156 }
];

export const locations = [
  'Greater Accra',
  'Ashanti Region',
  'Western Region',
  'Eastern Region',
  'Central Region',
  'Northern Region',
  'Volta Region',
  'Upper East Region',
  'Upper West Region',
  'Brong-Ahafo Region'
];

export const mockListings = [
  {
    id: '1',
    title: 'Premium Yellow Maize - High Yield',
    description: 'Top quality yellow maize suitable for both human consumption and animal feed. Properly dried and stored.',
    price: 180000,
    unit: 'ton',
    category: 'Maize',
    location: 'Northern Region',
    seller: {
      name: 'Ibrahim Farms',
      role: 'Farmer',
      rating: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop',
    postedDate: '2 days ago',
    inStock: true
  },
  {
    id: '2',
    title: 'Organic Cocoa Beans - Premium Grade',
    description: 'Fresh organic cocoa beans from our plantation. Perfect for chocolate production and export.',
    price: 450000,
    unit: 'ton',
    category: 'Cocoa',
    location: 'Ashanti Region',
    seller: {
      name: 'Cocoa Masters Ltd',
      role: 'Aggregator',
      rating: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=800&auto=format&fit=crop',
    postedDate: '1 day ago',
    inStock: true
  },
  {
    id: '3',
    title: 'Live Broiler Chickens - Ready for Market',
    description: 'Healthy broiler chickens, well-fed and vaccinated. Average weight 2.5kg. Minimum order 100 birds.',
    price: 3500,
    unit: 'bird',
    category: 'Poultry',
    location: 'Eastern Region',
    seller: {
      name: 'Golden Poultry Farm',
      role: 'Farmer',
      rating: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop',
    postedDate: '3 hours ago',
    inStock: true
  },
  {
    id: '4',
    title: 'NPK 15-15-15 Fertilizer - 50kg Bags',
    description: 'High quality compound fertilizer suitable for all crops. Increases yield and soil fertility.',
    price: 18500,
    unit: 'bag',
    category: 'Fertilizers',
    location: 'Greater Accra',
    seller: {
      name: 'AgriChem Supplies',
      role: 'Input Supplier',
      rating: 4.6,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    postedDate: '1 week ago',
    inStock: true
  },
  {
    id: '5',
    title: 'John Deere Tractor 75HP - Used',
    description: 'Well-maintained John Deere tractor, 2018 model. Low hours, perfect working condition.',
    price: 8500000,
    unit: 'unit',
    category: 'Tractors',
    location: 'Brong-Ahafo Region',
    seller: {
      name: 'Farm Equipment Hub',
      role: 'Input Supplier',
      rating: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1625687632587-abb5154eb0c5?w=800&auto=format&fit=crop',
    postedDate: '5 days ago',
    inStock: true
  },
  {
    id: '6',
    title: 'Hybrid Tomato Seeds - Disease Resistant',
    description: 'High-yielding hybrid tomato seeds with excellent disease resistance. Suitable for all seasons.',
    price: 25000,
    unit: 'kg',
    category: 'Seeds',
    location: 'Eastern Region',
    seller: {
      name: 'SeedTech Ghana',
      role: 'Input Supplier',
      rating: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop',
    postedDate: '4 days ago',
    inStock: true
  },
  {
    id: '7',
    title: 'Premium Long Grain Rice - Milled',
    description: 'Stone-free, well-milled long grain rice. Ready for consumption or resale.',
    price: 320000,
    unit: 'ton',
    category: 'Rice',
    location: 'Northern Region',
    seller: {
      name: 'Rice Mills Consortium',
      role: 'Manufacturer',
      rating: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop',
    postedDate: '1 day ago',
    inStock: true
  },
  {
    id: '8',
    title: 'Fresh Cassava Tubers - Food Grade',
    description: 'Fresh cassava tubers harvested within 24 hours. Perfect for garri, fufu, or industrial processing.',
    price: 45000,
    unit: 'ton',
    category: 'Cassava',
    location: 'Volta Region',
    seller: {
      name: 'Cassava Farmers Cooperative',
      role: 'Aggregator',
      rating: 4.5,
      verified: false
    },
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&auto=format&fit=crop',
    postedDate: '6 hours ago',
    inStock: true
  },
  {
    id: '9',
    title: 'Live Goats - West African Dwarf Breed',
    description: 'Healthy West African Dwarf goats. Good for meat production and breeding.',
    price: 45000,
    unit: 'goat',
    category: 'Livestock',
    location: 'Upper West Region',
    seller: {
      name: 'Livestock Traders Ltd',
      role: 'Farmer',
      rating: 4.6,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop',
    postedDate: '2 days ago',
    inStock: true
  },
  {
    id: '10',
    title: 'Fresh Catfish - Table Size',
    description: 'Live table-size catfish from our well-managed ponds. Average weight 1kg per fish.',
    price: 1800,
    unit: 'kg',
    category: 'Fish',
    location: 'Central Region',
    seller: {
      name: 'AquaFarms Ghana',
      role: 'Farmer',
      rating: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&auto=format&fit=crop',
    postedDate: '1 day ago',
    inStock: true
  },
  {
    id: '11',
    title: 'Agricultural Extension Services - Farm Advisory',
    description: 'Professional agricultural extension services including soil testing, crop planning, and farm management advisory.',
    price: 50000,
    unit: 'visit',
    category: 'Services',
    location: 'Greater Accra',
    seller: {
      name: 'AgriConsult Pro',
      role: 'Extension Officer',
      rating: 5.0,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    postedDate: '3 days ago',
    inStock: true
  },
  {
    id: '12',
    title: 'Irrigation Drip System - Complete Kit',
    description: 'Complete drip irrigation system for 1 hectare. Includes pipes, emitters, filters, and installation guide.',
    price: 350000,
    unit: 'set',
    category: 'Equipment',
    location: 'Ashanti Region',
    seller: {
      name: 'IrrigationTech Solutions',
      role: 'Input Supplier',
      rating: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop',
    postedDate: '1 week ago',
    inStock: true
  }
];