import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Key } from 'lucide-react';
import { loginAdmin } from '../services/auth.service';
import { USE_DEMO_DATA } from '../lib/firebase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-industrial-dark flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-elevated border border-industrial-border overflow-hidden">
        {/* Header */}
        <div className="bg-industrial-slate p-6 text-white text-center border-b border-industrial-steel">
          <div className="w-12 h-12 bg-industrial-orange rounded-md flex items-center justify-center font-black text-white text-2xl mx-auto mb-3">
            A
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Apex Industrial CMS</h1>
          <p className="text-xs text-gray-300 mt-1">Authorized Administrator Authentication</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {USE_DEMO_DATA && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs leading-relaxed">
              <span className="font-bold">Demo Mode Credentials:</span>
              <div className="mt-1 font-mono text-[11px]">Email: admin@apexindustrial.in</div>
              <div className="font-mono text-[11px]">Password: admin123</div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-industrial-dark uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@apexindustrial.in"
                className="w-full px-3 py-2 bg-white border border-industrial-border rounded text-xs text-industrial-dark focus:outline-none focus:border-industrial-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-industrial-dark uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-white border border-industrial-border rounded text-xs text-industrial-dark focus:outline-none focus:border-industrial-orange"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-industrial-orange hover:bg-industrial-orange-hover text-white font-bold text-xs rounded transition-colors shadow flex items-center justify-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin CMS'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
