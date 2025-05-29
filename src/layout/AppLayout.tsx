import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold border-b">Bills Split</div>
      <nav className="flex-1 p-4 space-y-4 text-gray-700">
        <a href="/" className="block hover:text-blue-600">Dashboard</a>
        <a href="/settings" className="block hover:text-blue-600">Settings</a>
      </nav>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <button className="md:hidden">
        </button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
  );
}
