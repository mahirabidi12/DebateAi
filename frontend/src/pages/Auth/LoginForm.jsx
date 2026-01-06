import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormHeader, SocialButton } from './AuthComponents.jsx';

export const LoginForm = ({ toggleView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[LOGIN FRONTEND] Form submitted');
        setLoading(true);
        setError('');

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
            console.log('[LOGIN FRONTEND] API URL:', apiUrl);
            console.log('[LOGIN FRONTEND] Request payload:', { email, password: password ? '***' : 'missing' });

            console.log('[LOGIN FRONTEND] Sending fetch request...');
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            console.log('[LOGIN FRONTEND] Response status:', res.status);
            console.log('[LOGIN FRONTEND] Response headers:', Object.fromEntries(res.headers.entries()));
            
            const data = await res.json();
            console.log('[LOGIN FRONTEND] Response data:', data);

            if (!res.ok) {
                console.error('[LOGIN FRONTEND] Request failed with status:', res.status);
                throw new Error(data.msg || data.message || 'Login failed. Please check your credentials.');
            }

            console.log('[LOGIN FRONTEND] Login successful!');
            console.log('[LOGIN FRONTEND] Checking cookies before delay...');
            console.log('[LOGIN FRONTEND] document.cookie:', document.cookie);
            
            // Wait a moment for cookie to be processed by browser
            console.log('[LOGIN FRONTEND] Waiting 200ms for cookie to be processed...');
            await new Promise(resolve => setTimeout(resolve, 200));
            
            console.log('[LOGIN FRONTEND] Checking cookies after delay...');
            console.log('[LOGIN FRONTEND] document.cookie:', document.cookie);
            console.log('[LOGIN FRONTEND] Navigating to dashboard...');
            navigate('/dashboard'); 
            console.log('[LOGIN FRONTEND] Navigation triggered');

        } catch (err) {
            console.error('[LOGIN FRONTEND] Error occurred:', err);
            console.error('[LOGIN FRONTEND] Error message:', err.message);
            setError(err.message);
        } finally {
            console.log('[LOGIN FRONTEND] Setting loading to false');
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container p-8 rounded-xl shadow-2xl">
            <AuthFormHeader title="Welcome back" subtitle="Sign in to continue to DebateAI." />
            <div className="grid grid-cols-2 gap-3 mb-4">
                <SocialButton provider="GitHub" />
                <SocialButton provider="Google" />
            </div>
            <div className="divider my-6">OR CONTINUE WITH</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-400">Email</label>
                    <input 
                        id="login-email" 
                        name="email" 
                        type="email" 
                        autoComplete="email" 
                        required 
                        className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" 
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-400">Password</label>
                    <input 
                        id="login-password" 
                        name="password" 
                        type="password" 
                        autoComplete="current-password" 
                        required 
                        className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button type="submit" className="w-full bg-gray-200 text-black font-semibold py-2.5 rounded-md hover:bg-white transition-colors disabled:opacity-50" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
            <p className="mt-6 text-center text-xs text-gray-400">
                Don't have an account? <button onClick={toggleView} className="font-semibold text-gray-200 hover:underline">Sign up</button>
            </p>
        </div>
    );
};

