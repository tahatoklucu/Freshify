export default function AdminLoading() {
  return (
    <div className="w-full p-4 md:p-8 space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-9 w-48 bg-slate-200 rounded" />
        <div className="h-4 w-64 bg-slate-100 rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-slate-200/70" />
        ))}
      </div>
      <div className="h-80 rounded-xl bg-slate-100" />
    </div>
  );
}
