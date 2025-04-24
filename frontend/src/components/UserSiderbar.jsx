import { Home, ShoppingBag, User, HelpCircle, Bot, Cpu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, ShoppingCart, TrendingUp } from "lucide-react";

const UserSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get current path

  // Sidebar navigation links
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard/user" },
    { name: "Orders", icon: ShoppingBag, path: "/orders/user" },
    { name: "Settings", icon: User, path: "/settings/user" },
    { name: "Help", icon: HelpCircle, path: "/help/user" },
    { name: "Farm Help AI", icon: Bot, path: "/farm-ai" },
    { name: "Price Prediction", icon: Cpu, path: "/model-prediction" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 z-40 w-64 bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } h-[calc(100vh-4rem)] flex flex-col overflow-y-auto`}
    >
      <div className="flex h-16 items-center border-b px-2">
        <h2 className="text-md font-semibold flex items-center gap-3">
          <span className="flex items-center gap-1 text-lg font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent">
            <Sprout className="h-4 w-4 text-green-700" />
            Grow
          </span>
          <span className="flex items-center gap-1 text-lg font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent">
            <ShoppingCart className="h-4 w-4 text-green-700" />
            Sell
          </span>
          <span className="flex items-center gap-1 text-lg font-semibold bg-gradient-to-r from-green-400 to-green-900 bg-clip-text text-transparent">
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
                  ? "flex items-center gap-3 rounded-md bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
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

export default UserSidebar;
