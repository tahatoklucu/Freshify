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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.slug}`}
              key={category.id}
              className="group bg-white p-4 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl md:text-2xl font-black text-slate-300">
                    {category.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="space-y-0.5 md:space-y-1">
                <h3 className="font-bold text-slate-900 text-sm md:text-lg group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="hidden md:block text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="mt-3 md:mt-4 text-[10px] md:text-xs font-bold text-orange-600">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
