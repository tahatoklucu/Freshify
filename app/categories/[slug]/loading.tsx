export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-4 w-28 bg-slate-200 rounded mb-6" />
        <div className="h-12 w-64 bg-slate-200 rounded mb-4" />
        <div className="h-5 w-96 max-w-full bg-slate-100 rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-72 rounded-3xl bg-slate-200/70" />
          ))}
        </div>
      </div>
    </div>
  );
}
