
import React, { useState } from 'react';
import { Sparkles, Link, ArrowRight, Loader2, Check } from 'lucide-react';
import { getSmartAliases, getUrlMetadata } from '../services/geminiService';
import { AliasSuggestion, ShortenedUrl } from '../types';

interface ShortenerFormProps {
  onUrlCreated: (url: ShortenedUrl) => void;
}

const ShortenerForm: React.FC<ShortenerFormProps> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AliasSuggestion[]>([]);
  const [customAlias, setCustomAlias] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuggest = async () => {
    if (!url) return;
    setLoading(true);
    const result = await getSmartAliases(url);
    setSuggestions(result);
    setLoading(false);
  };

  const handleShorten = async (aliasToUse?: string) => {
    if (!url) return;
    setLoading(true);

    const finalAlias = aliasToUse || customAlias || Math.random().toString(36).substring(2, 8);
    const metadata = await getUrlMetadata(url);

    const newUrl: ShortenedUrl = {
      id: crypto.randomUUID(),
      originalUrl: url,
      shortCode: finalAlias,
      createdAt: new Date().toISOString(),
      clicks: 0,
      title: metadata.title,
      description: metadata.description,
    };

    onUrlCreated(newUrl);
    setUrl('');
    setCustomAlias('');
    setSuggestions([]);
    setLoading(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            className="block w-full pl-10 pr-3 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSuggest}
            disabled={loading || !url}
            className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
            Get AI Aliases
          </button>
          
          <button
            onClick={() => handleShorten()}
            disabled={loading || !url}
            className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-lg"
          >
            {isSuccess ? <Check className="mr-2 h-5 w-5" /> : <ArrowRight className="mr-2 h-5 w-5" />}
            Shorten Now
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">AI Suggested Aliases</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleShorten(s.alias)}
                  className="group text-left p-4 border border-indigo-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                >
                  <span className="block font-bold text-indigo-600 group-hover:text-indigo-700">/{s.alias}</span>
                  <span className="block text-xs text-gray-400 mt-1 line-clamp-2">{s.reason}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center text-sm text-gray-400 italic">
          <Sparkles className="h-4 w-4 mr-1 text-indigo-400" />
          AI helps you pick memorable names and analyzes link content
        </div>
      </div>
    </div>
  );
};

export default ShortenerForm;
