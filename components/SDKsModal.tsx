import React, { useState } from 'react';
import { X, Terminal, Copy, Check, ExternalLink, Package } from 'lucide-react';

interface SDKsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SDKsModal: React.FC<SDKsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const sdks = [
    {
      name: 'JavaScript/TypeScript',
      description: 'Official npm package for Node.js and browsers',
      install: 'npm install @linkgenie/api',
      language: 'javascript',
      icon: '📦',
      code: `import LinkGenie from '@linkgenie/api';

const client = new LinkGenie({
  apiKey: 'YOUR_API_KEY'
});

const link = await client.links.create({
  url: 'https://example.com',
  alias: 'my-link'
});

console.log(link.shortUrl);`
    },
    {
      name: 'Python',
      description: 'Official Python SDK for quick integration',
      install: 'pip install linkgenie',
      language: 'python',
      icon: '🐍',
      code: `from linkgenie import LinkGenie

client = LinkGenie(api_key='YOUR_API_KEY')

link = client.links.create(
    url='https://example.com',
    alias='my-link'
)

print(link.short_url)`
    },
    {
      name: 'PHP',
      description: 'Composer package for PHP applications',
      install: 'composer require linkgenie/api',
      language: 'php',
      icon: '🐘',
      code: `<?php
require 'vendor/autoload.php';

use LinkGenie\\Client;

$client = new Client(['apiKey' => 'YOUR_API_KEY']);

$link = $client->links->create([
    'url' => 'https://example.com',
    'alias' => 'my-link'
]);

echo $link->shortUrl;`
    },
    {
      name: 'Ruby',
      description: 'Gem package for Ruby applications',
      install: 'gem install linkgenie',
      language: 'ruby',
      icon: '💎',
      code: `require 'linkgenie'

client = LinkGenie::Client.new(api_key: 'YOUR_API_KEY')

link = client.links.create(
  url: 'https://example.com',
  alias: 'my-link'
)

puts link.short_url`
    },
    {
      name: 'Go',
      description: 'Go module for server-side applications',
      install: 'go get github.com/linkgenie/api-go',
      language: 'go',
      icon: '🚀',
      code: `package main

import (
    "fmt"
    "github.com/linkgenie/api-go"
)

func main() {
    client := linkgenie.NewClient("YOUR_API_KEY")
    
    link, err := client.Links.Create(&linkgenie.CreateLinkRequest{
        URL:   "https://example.com",
        Alias: "my-link",
    })
    
    if err != nil {
        panic(err)
    }
    
    fmt.Println(link.ShortURL)
}`
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
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Terminal className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">SDKs & Libraries</h2>
              <p className="text-sm text-gray-500">Official SDKs for popular programming languages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {sdks.map((sdk, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sdk.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{sdk.name}</h3>
                      <p className="text-sm text-gray-500">{sdk.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Install</label>
                  <div className="relative bg-gray-900 rounded-lg p-3">
                    <button
                      onClick={() => handleCopy(sdk.install, `install-${index}`)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    >
                      {copied === `install-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <code className="text-sm text-gray-300 font-mono">{sdk.install}</code>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Example</label>
                  <div className="relative bg-gray-900 rounded-lg p-4">
                    <button
                      onClick={() => handleCopy(sdk.code, `code-${index}`)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    >
                      {copied === `code-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="text-xs text-gray-300 overflow-x-auto">
                      <code>{sdk.code}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                    View Documentation
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Package className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Community SDKs</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Don't see your language? Check out our community-maintained SDKs or build your own using our REST API.
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-2">
                  Browse Community SDKs
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKsModal;

