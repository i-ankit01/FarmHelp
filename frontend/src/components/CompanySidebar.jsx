import { Home, ShoppingBag, User, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, ShoppingCart, TrendingUp } from "lucide-react";

const CompanySidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get current path

  // Sidebar navigation links
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard/user" },
    { name: "Orders", icon: ShoppingBag, path: "/orders/user" },
    { name: "Settings", icon: User, path: "/settings/user" },
    { name: "Help", icon: HelpCircle, path: "/help/user" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto md:w-64 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center border-b px-2">
        <h2 className="text-md font-semibold flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Sprout className="h-4 w-4 text-green-700" />
            Grow
          </span>
          <span className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4 text-green-700" />
            Sell
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-700" />
            Succeed
          </span>
        </h2>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path; // Check if this item is active
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? "text-green-700 bg-green-50 font-medium border border-green-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default CompanySidebar;
