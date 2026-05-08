import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  LogOut,
  UserCircle2,
  Bell,
  PanelLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Avatar from "../ui/Avatar.jsx";
import { RolePill } from "../ui/StatusBadge.jsx";
import { logoUrl } from "../../assets.js";

export default function Topbar({ onMenuClick, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const avatarSrc =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=6366f1&color=fff`;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* DESKTOP COLLAPSE */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:inline-flex rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="WorkGrid" className="h-8 w-auto object-contain" />
          {/* <span className="font-semibold text-slate-900 hidden sm:block">
            WorkGrid
          </span> */}
        </Link>

        {/* TEXT */}
        <div className="hidden md:block ml-4">
          <p className="text-xs text-slate-500">Welcome back</p>
          <p className="text-sm font-semibold text-slate-900">
            {user?.name?.split(" ")[0] || "there"} 👋
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* NOTIFICATION */}
        <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition"
          >
            {/* ✅ FIXED AVATAR */}
            <Avatar name={user?.name} src={avatarSrc} size="sm" />

            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500">
                {user?.email}
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* DROPDOWN */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white shadow-lg">

              {/* USER INFO */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  {/* ✅ FIXED AVATAR */}
                  <Avatar name={user?.name} src={avatarSrc} size="md" />
                  <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <RolePill role={user?.role} />
                </div>
              </div>

              {/* PROFILE BUTTON */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50"
              >
                <UserCircle2 className="h-4 w-4 text-slate-400" />
                Profile
              </button>

              {/* LOGOUT */}
              <button
                onClick={async () => {
                  setMenuOpen(false);
                  await logout();
                  navigate("/");
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
