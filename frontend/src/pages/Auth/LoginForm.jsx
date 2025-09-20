import React from 'react';
import { AuthFormHeader, SocialButton } from './AuthComponents';

export const LoginForm = ({ toggleView, setPage }) => (
    <div className="auth-form-container p-8 rounded-xl shadow-2xl">
        <AuthFormHeader title="Welcome back" subtitle="Sign in to continue to DebateAI." setPage={setPage} />
        <div className="grid grid-cols-2 gap-3 mb-4">
            <SocialButton provider="GitHub" />
            <SocialButton provider="Google" />
        </div>
        <div className="divider my-6">OR CONTINUE WITH</div>
        <form className="space-y-4">
            <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-400">Email</label>
                <input id="login-email" name="email" type="email" autoComplete="email" required className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" placeholder="m@example.com" />
            </div>
            <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-400">Password</label>
                <input id="login-password" name="password" type="password" autoComplete="current-password" required className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-gray-200 text-black font-semibold py-2.5 rounded-md hover:bg-white transition-colors">Sign in</button>
        </form>
        <p className="mt-6 text-center text-xs text-gray-400">
            Don't have an account? <button onClick={toggleView} className="font-semibold text-gray-200 hover:underline">Sign up</button>
        </p>
    </div>
);
