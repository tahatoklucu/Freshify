export default function AdminLayoutPage({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="font-bold text-xl mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <a href="/admin" className="block text-gray-600 hover:text-black">Dashboard</a>
            <a href="/admin/users" className="block text-gray-600 hover:text-black">Manage Users</a>
            <a href="/admin/recipes" className="block text-gray-600 hover:text-black">Manage Recipes</a>
            <a href="/admin/reviews" className="block text-gray-600 hover:text-black">Manage Reviews</a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border p-6">
            {children}
          </div>
        </main>
      </div>
    );
  }