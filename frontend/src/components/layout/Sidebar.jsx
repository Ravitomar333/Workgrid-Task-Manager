import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  UserCircle2,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { cn } from "../../utils/cn.js";
import { logoUrl } from "../../assets.js";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/users", label: "Team", icon: Users, roles: ["admin", "manager"] },
  { to: "/profile", label: "Profile", icon: UserCircle2 },
];

export default function Sidebar({ open, onClose, collapsed }) {
  const { hasRole } = useAuth();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          style={{ height: "100vh", width: "100vw" }}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 z-50 h-screen bg-white border-r flex flex-col transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >

        {/* ================= HEADER ================= */}
        <div className="h-16 px-4 flex items-center justify-between border-b">

          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="WorkGrid"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:bg-slate-100 p-1 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================= NAV ================= */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">

          {items.map((item) => {
            if (item.roles && !hasRole(...item.roles)) return null;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    collapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}

        </nav>
        
      </aside>
    </>
  );
}
