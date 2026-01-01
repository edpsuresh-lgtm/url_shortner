import React from 'react';
import { LogIn, Lock } from 'lucide-react';

interface AuthPromptProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ onSignIn, onSignUp }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
        <Lock className="h-10 w-10 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Sign In to Get Started
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Create an account or sign in to start shortening URLs, accessing analytics, and managing your links with AI-powered features.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onSignIn}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          <LogIn className="h-5 w-5" />
          Sign In
        </button>
        <button
          onClick={onSignUp}
          className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AuthPrompt;

