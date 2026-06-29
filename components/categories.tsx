import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
}

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Categories
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Explore delicious recipes by selecting your favorite category.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/categories/${category.slug}`} 
              key={category.id}
              className="group relative bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-100 hover:bg-white transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white mb-5 shadow-sm border border-slate-100 relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                {category.imageUrl ? (
                  <Image
                  src={category.imageUrl} 
                  alt={category.name} 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority={true}
                />
                ) : (
                  <span className="text-2xl font-black text-slate-300">
                    {category.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors duration-300">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="mt-4 opacity-50 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-bold text-orange-500 border-b border-orange-200">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}