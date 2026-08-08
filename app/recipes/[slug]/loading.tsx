export default function RecipeLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-12 w-2/3 bg-slate-200 rounded" />
        <div className="h-6 w-48 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/9] w-full rounded-3xl bg-slate-200" />
            <div className="h-64 rounded-3xl bg-slate-100" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-40 rounded-3xl bg-slate-200" />
            <div className="h-64 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
