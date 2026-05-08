import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { getApiError } from "../api/client.js";
import { dashboardImageUrl, logoUrl } from "../assets.js";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPwd, setShowPwd] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  if (isAuthenticated) return <Navigate to={from} replace />;

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = getApiError(err, "Login failed");
      setError("password", { message: msg });
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src={dashboardImageUrl}
          alt="illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">

          {/* LOGO → HOME */}
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src={logoUrl} alt="WorkGrid" className="h-10" />
            <span className="text-lg font-semibold text-slate-900">
              WorkGrid
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back. Please enter your details.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="pointer-events-auto p-1 rounded hover:bg-slate-100"
                  tabIndex={-1}
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full"
              size="lg"
            >
              Sign in
            </Button>
          </form>

          {/* REGISTER LINK */}
          <p className="mt-6 text-sm text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create one
            </Link>
          </p>

          {/* DEMO ACCOUNTS */}
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Demo accounts</p>
            <p className="mt-1">admin@pm.app / admin123</p>
            <p>manager@pm.app / manager123</p>
            <p>dev@pm.app / dev12345</p>
          </div>

        </div>
      </div>
    </div>
  );
}
