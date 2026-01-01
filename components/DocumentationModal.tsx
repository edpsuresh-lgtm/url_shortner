import React, { useState } from 'react';
import { X, BookOpen, Code, Terminal, Search, Copy, Check } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'authentication' | 'endpoints' | 'examples'>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/links',
      description: 'Create a new short link',
      example: `curl -X POST https://api.linkgenie.ai/v1/links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/very/long/url",
    "alias": "my-custom-alias",
    "expiresAt": "2024-12-31"
  }'`
    },
    {
      method: 'GET',
      path: '/v1/links/{id}',
      description: 'Get link details',
      example: `curl -X GET https://api.linkgenie.ai/v1/links/abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: 'GET',
      path: '/v1/links',
      description: 'List all links',
      example: `curl -X GET https://api.linkgenie.ai/v1/links?limit=10&page=1 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: 'DELETE',
      path: '/v1/links/{id}',
      description: 'Delete a link',
      example: `curl -X DELETE https://api.linkgenie.ai/v1/links/abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
              <p className="text-sm text-gray-500">Complete reference guide for LinkGenie API</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex gap-1 p-2">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'authentication', label: 'Authentication', icon: Terminal },
                { id: 'endpoints', label: 'Endpoints', icon: Code },
                { id: 'examples', label: 'Examples', icon: Code }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-violet-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h3>
                  <p className="text-gray-600 mb-4">
                    The LinkGenie API allows you to programmatically create, manage, and analyze shortened links. 
                    All API requests must be authenticated using an API key.
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-sm text-indigo-800">
                      <strong>Base URL:</strong> https://api.linkgenie.ai
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Rate Limits</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-600">
                      <li>• Free tier: 1,000 requests/month</li>
                      <li>• Pro tier: 50,000 requests/month</li>
                      <li>• Enterprise: Custom limits</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Response Format</h3>
                  <p className="text-gray-600 mb-3">All responses are in JSON format:</p>
                  <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "success": true,
  "data": { ... },
  "error": null
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    All API requests require authentication using a Bearer token in the Authorization header.
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-gray-400">Authorization Header</code>
                    <button
                      onClick={() => handleCopy('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      {copied === 'auth-header' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-300">Authorization: Bearer YOUR_API_KEY</code>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> Keep your API keys secure. Never commit them to version control or expose them in client-side code.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h3>
                </div>

                <div className="space-y-6">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                          endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                          endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                      </div>
                      <p className="text-gray-600 mb-4">{endpoint.description}</p>
                      <div className="relative bg-gray-900 rounded-lg p-4">
                        <button
                          onClick={() => handleCopy(endpoint.example, `endpoint-${index}`)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                        >
                          {copied === `endpoint-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">JavaScript (Fetch)</h4>
                    <div className="relative bg-gray-900 rounded-lg p-4">
                      <button
                        onClick={() => handleCopy(`const response = await fetch('https://api.linkgenie.ai/v1/links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    alias: 'my-link'
  })
});

const data = await response.json();
console.log(data);`, 'js-example')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                      >
                        {copied === 'js-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`const response = await fetch('https://api.linkgenie.ai/v1/links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    alias: 'my-link'
  })
});

const data = await response.json();
console.log(data);`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Python (Requests)</h4>
                    <div className="relative bg-gray-900 rounded-lg p-4">
                      <button
                        onClick={() => handleCopy(`import requests

response = requests.post(
    'https://api.linkgenie.ai/v1/links',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'url': 'https://example.com',
        'alias': 'my-link'
    }
)

data = response.json()
print(data)`, 'python-example')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                      >
                        {copied === 'python-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`import requests

response = requests.post(
    'https://api.linkgenie.ai/v1/links',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'url': 'https://example.com',
        'alias': 'my-link'
    }
)

data = response.json()
print(data)`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationModal;

