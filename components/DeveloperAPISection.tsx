import React, { useState } from 'react';
import { Code, Key, BookOpen, Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import APIKeysModal from './APIKeysModal';
import DocumentationModal from './DocumentationModal';
import SDKsModal from './SDKsModal';

const DeveloperAPISection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showAPIKeysModal, setShowAPIKeysModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showSDKsModal, setShowSDKsModal] = useState(false);

  const codeExample = `// Create a short link
const response = await fetch('https://api.linkgenie.ai/v1/links', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url',
    alias: 'my-custom-alias',
    expiresAt: '2024-12-31'
  })
});

const data = await response.json();
console.log(data.shortUrl); // https://linkgenie.ai/my-custom-alias`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer-api" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <Code className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Developer API</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Integrate LinkGenie into Your App
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Powerful REST API to create, manage, and analyze links programmatically. Build custom integrations with comprehensive documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Key className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Generate secure API keys from your dashboard. Each key has configurable permissions and rate limits.
              </p>
              <button 
                onClick={() => setShowAPIKeysModal(true)}
                className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2"
              >
                Generate API Key
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Documentation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive API documentation with code examples, SDKs, and interactive testing tools.
              </p>
              <button 
                onClick={() => setShowDocModal(true)}
                className="text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-2"
              >
                View Documentation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Terminal className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">SDKs & Libraries</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Official SDKs for JavaScript, Python, PHP, Ruby, and more. Get started in minutes.
              </p>
              <button 
                onClick={() => setShowSDKsModal(true)}
                className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2"
              >
                View SDKs
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Start building with our API today. Free tier includes 1,000 requests per month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowAPIKeysModal(true)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
            >
              Get API Key
            </button>
            <button 
              onClick={() => setShowDocModal(true)}
              className="bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-800 transition-all border border-indigo-500"
            >
              View API Docs
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <APIKeysModal isOpen={showAPIKeysModal} onClose={() => setShowAPIKeysModal(false)} />
      <DocumentationModal isOpen={showDocModal} onClose={() => setShowDocModal(false)} />
      <SDKsModal isOpen={showSDKsModal} onClose={() => setShowSDKsModal(false)} />
    </section>
  );
};

export default DeveloperAPISection;

