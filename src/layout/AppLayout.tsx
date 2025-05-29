import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-bold">MyApp</h2>
          <button className="md:hidden" onClick={closeSidebar}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-4 text-gray-700">
          <Link to="/" className="block hover:text-blue-600">Dashboard</Link>
          <Link to="/settings" className="block hover:text-blue-600">Settings</Link>
          <Link to="/trips" className="block hover:text-blue-600">trips</Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white px-4 py-3 flex items-center justify-between shadow-md">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
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

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
