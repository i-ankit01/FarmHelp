import { Home, HelpCircle, ShoppingBag, Wallet, Repeat, Sun, TrendingUp, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CompanySidebar = ({ sidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard/company" },
    { name: "All Farmers", icon: Users, path: "/farmers/search" },
    { name: "Orders", icon: ShoppingBag, path: "/orders/company" },
    { name: "Help", icon: HelpCircle, path: "/help/company" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 z-40 w-64 bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } h-[calc(100vh-4rem)] flex flex-col overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-2">
        <h2 className="text-md font-semibold flex items-center gap-3 ml-3">
          <span className="flex items-center gap-1 text-lg font-bold truncate bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            <Wallet className="h-4 w-4 text-blue-700" />
            Buy
          </span>
          <span className="flex items-center gap-1 text-lg font-bold truncate bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            <Repeat className="h-4 w-4 text-blue-700 " />
            Trade
          </span>
          <span className="flex items-center gap-1 text-lg font-bold truncate bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            <TrendingUp className="h-4 w-4 text-blue-700" />
            Grow
          </span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? "flex items-center gap-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <Sun className="h-4 w-4 text-yellow-600 animate-pulse" />
                </div>
                <p className="text-sm font-medium text-blue-800">Weather Update</p>
              </div>
              <p className="text-xs text-blue-700">Perfect weather for crop harvesting in Punjab region today.</p>
            </div>
          </div>
    </aside>
  );
};

export default CompanySidebar;
