import { Home, HelpCircle, ShoppingBag, Wallet, Repeat, TrendingUp, Users } from "lucide-react";
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
          <span className="flex items-center gap-1">
            <Wallet className="h-4 w-4 text-green-700" />
            Buy
          </span>
          <span className="flex items-center gap-1">
            <Repeat className="h-4 w-4 text-green-700" />
            Trade
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-700" />
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
