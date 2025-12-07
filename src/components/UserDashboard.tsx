import { Package, ShoppingBag, DollarSign, Star, TrendingUp, FileText } from 'lucide-react';

interface User {
  name: string;
  role: string;
  location: string;
  avatar: string;
}

interface UserDashboardProps {
  user: User;
  onViewListing: (id: string) => void;
}

export function UserDashboard({ user, onViewListing }: UserDashboardProps) {
  const stats = [
    { label: 'Active Orders', value: '5', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Spent', value: 'GH₵450K', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Completed', value: '23', icon: Package, color: 'bg-purple-100 text-purple-600' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600' }
  ];

  const recentOrders = [
    {
      id: '1',
      product: 'Premium Maize Seeds',
      seller: 'AgriSupply Ltd',
      amount: 75000,
      status: 'In Delivery',
      date: '2 days ago',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '2',
      product: 'NPK Fertilizer 50kg',
      seller: 'FarmInputs Co',
      amount: 45000,
      status: 'Delivered',
      date: '1 week ago',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: '3',
      product: 'Irrigation System',
      seller: 'TechFarm Solutions',
      amount: 180000,
      status: 'Validation',
      date: '3 days ago',
      statusColor: 'bg-yellow-100 text-yellow-700'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-start gap-6">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-green-100"
          />
          <div className="flex-1">
            <h2 className="mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-1">{user.role}</p>
            <p className="text-gray-500 text-sm mb-4">{user.location}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Settings
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <Star size={18} className="fill-green-700" />
              <span>4.8 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex gap-6 px-6">
            <button className="py-4 border-b-2 border-green-600 text-green-600">
              My Orders
            </button>
            <button className="py-4 hover:text-green-600 transition">
              My Listings
            </button>
            <button className="py-4 hover:text-green-600 transition">
              Messages
            </button>
            <button className="py-4 hover:text-green-600 transition">
              Favorites
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Recent Orders</h3>
            <button className="text-green-600 hover:text-green-700 text-sm">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="mb-1">{order.product}</h4>
                    <p className="text-sm text-gray-600">Seller: {order.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1">GH₵{order.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${order.statusColor} px-3 py-1 rounded-full text-sm`}>
                    {order.status}
                  </span>
                  <button className="text-green-600 hover:text-green-700 text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg shadow-lg p-6">
          <TrendingUp size={32} className="mb-3" />
          <h3 className="mb-2">Post a Listing</h3>
          <p className="text-sm mb-4 opacity-90">
            Sell your agricultural products to buyers across Ghana
          </p>
          <button className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
            Create Listing
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
          <Package size={32} className="mb-3" />
          <h3 className="mb-2">Track Orders</h3>
          <p className="text-sm mb-4 opacity-90">
            Monitor your active orders and delivery status
          </p>
          <button className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
            Track Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg shadow-lg p-6">
          <FileText size={32} className="mb-3" />
          <h3 className="mb-2">Get Verified</h3>
          <p className="text-sm mb-4 opacity-90">
            Become a verified seller and gain buyer trust
          </p>
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}