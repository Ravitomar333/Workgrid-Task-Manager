import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/ui/Avatar.jsx";

export default function Home() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (isAuthenticated) {
        navigate("/dashboard");
        } else {
        navigate("/login");
        }
    };

    const avatarSrc =
        user?.avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
        )}&background=6366f1&color=fff`;

    return (
        <div className="min-h-screen bg-white">

        {/* ================= NAVBAR ================= */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100">

            {/* LOGO */}
            <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
            >
            <img src="/assets/logo.png" className="h-8 w-auto object-contain" />
            </div>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#stats" className="hover:text-slate-900">Stats</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

            {!isAuthenticated ? (
                <>
                {/* LOGIN */}
                <button
                    onClick={() => navigate("/login")}
                    className="text-sm text-slate-600 hover:text-slate-900"
                >
                    Login
                </button>

                {/* SIGN UP */}
                <button
                    onClick={() => navigate("/register")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                >
                    Sign up
                </button>
                </>
            ) : (
                <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-1 rounded-lg transition"
                >

                <Avatar name={user?.name} src={avatarSrc} size="sm" />

                {/* Name + Role */}
                <div className="hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                    {user?.name}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                    {user?.role}
                    </p>
                </div>
                </div>
            )}

            </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="relative grid md:grid-cols-2 items-center px-8 py-24 gap-12 overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />

            {/* LEFT */}
            <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Bring clarity to every project,
                <br /> one task at a time.
            </h1>

            <p className="mt-5 text-slate-600 text-lg">
                WorkGrid helps your team plan work, assign owners, and ship faster —
                with clean dashboards, real-time updates, and powerful collaboration.
            </p>

            <div className="mt-8 flex gap-4">
                <button
                onClick={handleGetStarted}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 shadow-md"
                >
                Get Started
                </button>

                {!isAuthenticated && (
                <button
                    onClick={() => navigate("/login")}
                    className="border border-slate-300 px-6 py-3 rounded-xl font-medium hover:bg-slate-50"
                >
                    Login
                </button>
                )}
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-600">
                <li>✔ Role-based access (Admin, Manager, Member)</li>
                <li>✔ Drag & drop Kanban board</li>
                <li>✔ Real-time dashboards & analytics</li>
            </ul>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center">
            <div className="absolute w-72 h-72 bg-indigo-300/30 blur-3xl rounded-full" />
            <img
                src="/assets/log.png"
                alt="dashboard"
                className="relative w-[95%] md:w-full object-contain"
            />
            </div>

        </section>

        {/* ================= STATS ================= */}
        <section id="stats" className="px-8 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
            Trusted by teams worldwide
            </h2>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { label: "Projects", value: "10K+" },
                { label: "Tasks Managed", value: "50K+" },
                { label: "Teams", value: "2K+" },
                { label: "Uptime", value: "99.9%" },
            ].map((item) => (
                <div key={item.label}>
                <p className="text-2xl font-bold text-indigo-600">{item.value}</p>
                <p className="text-sm text-slate-500">{item.label}</p>
                </div>
            ))}
            </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="px-8 py-16 bg-slate-50">
            <h2 className="text-2xl font-semibold text-center text-slate-900">
            Powerful Features
            </h2>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
                "Project Management",
                "Task Tracking",
                "Team Collaboration",
            ].map((item) => (
                <div
                key={item}
                className="p-6 bg-white rounded-2xl border hover:shadow-xl transition duration-300 hover:-translate-y-1"
                >
                <h3 className="font-semibold text-slate-900">{item}</h3>
                <p className="mt-2 text-sm text-slate-500">
                    Manage your workflow efficiently with modern tools.
                </p>
                </div>
            ))}
            </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-8 py-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
            Ready to boost your productivity?
            </h2>

            <p className="mt-4 text-slate-500">
            Join thousands of teams using WorkGrid today.
            </p>

            <button
            onClick={handleGetStarted}
            className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700"
            >
            Get Started
            </button>
        </section>

        {/* ================= FOOTER ================= */}
        <footer id="contact" className="bg-slate-900 text-white px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">

            <div>
                <div className="flex items-center gap-2">
                <img src="/assets/logo.png" className="h-8" />
                <span className="font-semibold text-lg">WorkGrid</span>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                Manage projects with clarity and efficiency.
                </p>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <p className="text-sm text-slate-400">
                support@workgrid.com
                </p>
            </div>

            </div>

            <div className="mt-10 border-t border-slate-700 pt-4 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} WorkGrid. All rights reserved.
            </div>
        </footer>

        </div>
    );
}