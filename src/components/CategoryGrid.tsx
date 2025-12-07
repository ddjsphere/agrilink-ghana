interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryGrid({ categories, selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(selectedCategory === category.name ? '' : category.name)}
          className={`bg-white p-6 rounded-lg border-2 transition hover:shadow-lg ${
            selectedCategory === category.name 
              ? 'border-green-600 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <div className="text-4xl mb-3">{category.icon}</div>
          <h4 className="mb-1">{category.name}</h4>
          <p className="text-sm text-gray-500">{category.count} listings</p>
        </button>
      ))}
    </div>
  );
}
