import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Change 1: Added Eye and EyeOff to imports
import { Lock, Mail, AlertCircle, Loader2, Cpu, Eye, EyeOff } from "lucide-react";

// --- 1. THE 3D TECH LOGO COMPONENT ---
const TechLogo = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center perspective-1000">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border-2 border-blue-500/50 rounded-full border-dashed"
      />
      {/* Middle Square (The "Tech" Block) */}
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-16 h-16 border-2 border-cyan-400 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]"
      />
      {/* Inner X (The "X" in TechEraX) */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute flex items-center justify-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50"></div>
          <span className="relative text-3xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            X
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  // Change 2: State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (formData.email === "admin@techerax.com" && formData.password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050B14] relative overflow-hidden font-sans perspective-1000">
      
      {/* --- 2. 3D PERSPECTIVE GRID BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Floor */}
        <div 
            className="absolute -bottom-[50%] -left-[50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
            style={{ transform: 'rotateX(60deg)' }} 
        />
        
        {/* Floating Particles */}
        <motion.div 
            animate={{ y: [-20, -40, -20] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[80px]" 
        />
        <motion.div 
            animate={{ y: [20, 40, 20] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px]" 
        />
      </div>

      {/* --- 3. LOGIN CARD (Glassmorphism + Tilt Feel) --- */}
      <motion.div
        initial={{ opacity: 0, rotateX: 20, z: -100 }}
        animate={{ opacity: 1, rotateX: 0, z: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Outer Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-30 animate-pulse"></div>
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl">
          
          {/* Animated 3D Logo */}
          <TechLogo />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 tracking-wide">
              TECH<span className="text-white">ERA</span>X
            </h1>
            <p className="text-slate-400 text-sm mt-2">Access the Mainframe</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1 group-focus-within:text-blue-400 transition-colors">ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@techerax.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all hover:bg-slate-800"
                />
              </div>
            </div>

            {/* Password - Change 3: Added Toggle Logic Here */}
            {/* Password Field */}
<div className="space-y-2 group">
  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1 group-focus-within:text-purple-400 transition-colors">
    Passcode
  </label>
  <div className="relative">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
    
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all hover:bg-slate-800"
    />
    
    {/* Updated Eye Button Styling */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-blue-400 focus:outline-none bg-transparent transition-colors cursor-pointer"
      style={{ background: 'none', border: 'none' }} // Extra safety styles
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  </div>
</div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-red-300 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 border border-blue-400/20 relative overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
              
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Authenticate <Cpu className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center flex justify-between items-center text-xs text-slate-600 border-t border-slate-800 pt-4">
            <span>System v2.0</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Secure Connection</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

