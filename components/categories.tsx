import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
}

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="py-12 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Browse Categories
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Explore delicious recipes by selecting your favorite category.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/categories/${category.slug}`} 
              key={category.id}
              className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-inner relative flex items-center justify-center">
                {category.imageUrl ? (
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <span className="text-xl font-bold text-slate-400">
                    {category.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <span className="font-bold text-slate-700 text-base group-hover:text-orange-500 transition-colors duration-300">
                {category.name}
              </span>

              <span className="text-xs text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Recipes →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}