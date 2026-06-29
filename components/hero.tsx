import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="py-12 md:py-16 text-center space-y-4 px-4">
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
        What are you craving today?
      </h1>
      <p className="text-slate-500 text-sm md:text-base max-w-sm mx-auto">
        Discover thousands of delicious recipes tailored to your taste.
      </p>
      <div className="flex justify-center mt-8">
        <SearchBar />
      </div>
    </section>
  );
}
