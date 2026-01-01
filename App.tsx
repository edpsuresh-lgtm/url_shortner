
import React, { useState, useEffect } from 'react';
import { Scissors, Github, Shield, Zap, Info } from 'lucide-react';
import ShortenerForm from './components/ShortenerForm';
import UrlList from './components/UrlList';
import StatsDashboard from './components/StatsDashboard';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import UserProfile from './components/UserProfile';
import SettingsModal from './components/SettingsModal';
import FeaturesSection from './components/FeaturesSection';
import EnterpriseSection from './components/EnterpriseSection';
import DeveloperAPISection from './components/DeveloperAPISection';
import { ShortenedUrl } from './types';

interface User {
  email: string;
  name?: string;
}

const App: React.FC = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('linkgenie_urls');
    if (saved) {
      try {
        setUrls(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved URLs");
      }
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('linkgenie_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to load saved user");
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('linkgenie_urls', JSON.stringify(urls));
  }, [urls]);

  const handleUrlCreated = (newUrl: ShortenedUrl) => {
    setUrls(prev => [newUrl, ...prev]);
  };

  const handleDelete = (id: string) => {
    setUrls(prev => prev.filter(u => u.id !== id));
  };

  const handleCopy = (code: string) => {
    const fullUrl = `linkgenie.ai/${code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLinkClick = (id: string) => {
    setUrls(prev => prev.map(url => 
      url.id === id 
        ? { ...url, clicks: (url.clicks || 0) + 1 }
        : url
    ));
  };

  const handleSignIn = (email: string) => {
    const userData: User = { email };
    setUser(userData);
    localStorage.setItem('linkgenie_user', JSON.stringify(userData));
  };

  const handleSignUp = (email: string, name: string) => {
    const userData: User = { email, name };
    setUser(userData);
    localStorage.setItem('linkgenie_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('linkgenie_user');
  };

  const handleUpdateUser = (name: string) => {
    if (user) {
      const updatedUser: User = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem('linkgenie_user', JSON.stringify(updatedUser));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                LinkGenie AI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-indigo-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('enterprise')}
                className="hover:text-indigo-600 transition-colors"
              >
                Enterprise
              </button>
              <button 
                onClick={() => scrollToSection('developer-api')}
                className="hover:text-indigo-600 transition-colors"
              >
                Developer API
              </button>
              {user ? (
                <UserProfile 
                  user={user} 
                  onSignOut={handleSignOut}
                  onSettingsClick={() => setShowSettings(true)}
                />
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Shorten URLs with <span className="text-indigo-600">Magic</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the world's first AI-powered URL shortener. Smart aliases, content summaries, and powerful analytics at your fingertips.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Lightning Fast</p>
              <p className="text-xs text-indigo-400">Instant redirection</p>
            </div>
          </div>
          <div className="bg-violet-50 p-4 rounded-xl border border-violet-100 flex items-center gap-3">
            <div className="bg-violet-100 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Secure & Private</p>
              <p className="text-xs text-violet-400">Encrypted link tracking</p>
            </div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Info className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Smart Analysis</p>
              <p className="text-xs text-emerald-400">AI content profiling</p>
            </div>
          </div>
        </div>

        {/* Core Functionality */}
        <ShortenerForm onUrlCreated={handleUrlCreated} />
        
        <StatsDashboard urls={urls} />
        
        <UrlList 
          urls={urls} 
          onDelete={handleDelete} 
          onCopy={handleCopy}
          onLinkClick={handleLinkClick}
          copiedId={copiedId}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-gray-100 p-1.5 rounded-lg">
              <Scissors className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-lg font-bold text-gray-900">LinkGenie AI</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            © 2024 LinkGenie. All rights reserved. Powered by Google Gemini.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors text-sm font-medium mt-1">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors text-sm font-medium mt-1">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

      {/* Features Section */}
      <FeaturesSection />

      {/* Enterprise Section */}
      <EnterpriseSection />

      {/* Developer API Section */}
      <DeveloperAPISection />

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => setShowSignUp(true)}
        onSignIn={handleSignIn}
      />
      
      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSignUp} 
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => setShowSignIn(true)}
        onSignUp={handleSignUp}
      />

      {/* Settings Modal */}
      {user && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          user={user}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default App;
