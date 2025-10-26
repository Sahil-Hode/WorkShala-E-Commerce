import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordStrength = {
    weak: formData.password.length > 0 && formData.password.length < 6,
    medium: formData.password.length >= 6 && formData.password.length < 10,
    strong: formData.password.length >= 10
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <span className="text-2xl font-bold text-gray-900">W</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-2">
            WorkShala
          </h1>
          <p className="text-gray-400 text-lg">Create your account and start exploring</p>
        </div>

        {/* Registration Card */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" size={16} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-3.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className={`flex-1 h-1 rounded-full transition-colors ${
                      passwordStrength.weak ? 'bg-red-500' : 
                      passwordStrength.medium ? 'bg-yellow-500' : 
                      passwordStrength.strong ? 'bg-green-500' : 'bg-gray-600'
                    }`}></div>
                    <div className={`flex-1 h-1 rounded-full transition-colors ${
                      passwordStrength.medium ? 'bg-yellow-500' : 
                      passwordStrength.strong ? 'bg-green-500' : 'bg-gray-600'
                    }`}></div>
                    <div className={`flex-1 h-1 rounded-full transition-colors ${
                      passwordStrength.strong ? 'bg-green-500' : 'bg-gray-600'
                    }`}></div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {passwordStrength.weak && "Weak password"}
                    {passwordStrength.medium && "Medium strength"}
                    {passwordStrength.strong && "Strong password"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" size={16} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && (
                <p className={`text-xs ${
                  formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formData.password === formData.confirmPassword ? 
                    '✓ Passwords match' : '✗ Passwords do not match'
                  }
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  required
                />
              </div>
              <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                I agree to the{" "}
                <Link to="/terms" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">Or sign up with</span>
            </div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 p-3.5 bg-gray-700/50 border border-gray-600 text-white rounded-xl hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 group">
              <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Google</span>
            </button>

            <button className="flex items-center justify-center gap-3 p-3.5 bg-gray-700/50 border border-gray-600 text-white rounded-xl hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 group">
              <FaFacebookF className="text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-gray-400">
              Already on WorkShala?{" "}
              <Link 
                to="/login" 
                className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors hover:underline"
              >
                Sign in to your account
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaCheck className="text-green-500" size={10} />
            Free shipping
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaCheck className="text-green-500" size={10} />
            Secure payment
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaCheck className="text-green-500" size={10} />
            24/7 support
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaCheck className="text-green-500" size={10} />
            Easy returns
          </div>
        </div>
      </div>
    </section>
  );
}