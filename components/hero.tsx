import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="py-16 text-center space-y-4">
      <h1 className="text-4xl font-black text-slate-900">What are you craving today?</h1>
      <p className="text-slate-500">Discover thousands of delicious recipes.</p>
      <div className="flex justify-center mt-6">
        <SearchBar />
      </div>
    </section>
  );
}