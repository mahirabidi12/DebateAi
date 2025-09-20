import React from 'react';
import { AuthFormHeader, SocialButton } from './AuthComponents';

export const SignupForm = ({ toggleView, setPage }) => (
    <div className="auth-form-container p-8 rounded-xl shadow-2xl">
        <AuthFormHeader title="Create an account" subtitle="Enter your details below to get started." setPage={setPage} />
        <div className="grid grid-cols-2 gap-3 mb-4">
            <SocialButton provider="GitHub" />
            <SocialButton provider="Google" />
        </div>
        <div className="divider my-6">OR CONTINUE WITH</div>
        <form className="space-y-4">
            <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-400">Name</label>
                <input id="signup-name" name="name" type="text" required className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" placeholder="John Doe" />
            </div>
            <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-400">Email</label>
                <input id="signup-email" name="email" type="email" autoComplete="email" required className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" placeholder="m@example.com" />
            </div>
            <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-400">Password</label>
                <input id="signup-password" name="password" type="password" autoComplete="new-password" required className="form-input mt-1 block w-full rounded-md p-2.5 text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-gray-200 text-black font-semibold py-2.5 rounded-md hover:bg-white transition-colors">Create account</button>
        </form>
        <p className="mt-6 text-center text-xs text-gray-400">
            Already have an account? <button onClick={toggleView} className="font-semibold text-gray-200 hover:underline">Sign in</button>
        </p>
    </div>
);
