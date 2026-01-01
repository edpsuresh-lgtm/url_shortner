import React, { useState } from 'react';
import { X, Key, Copy, Check, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface APIKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APIKeysModal: React.FC<APIKeysModalProps> = ({ isOpen, onClose }) => {
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; key: string; createdAt: string; visible: boolean }>>([
    {
      id: '1',
      name: 'Production Key',
      key: 'lk_live_2k3j4h5g6f7d8s9a0q1w2e3r4t5y6u7i8o9p0',
      createdAt: '2024-01-15',
      visible: false
    }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleVisibility = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, visible: !key.visible } : key
    ));
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey: typeof apiKeys[0] = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `lk_live_${Math.random().toString(36).substring(2, 26)}${Math.random().toString(36).substring(2, 26)}`,
      createdAt: new Date().toISOString().split('T')[0],
      visible: true
    };
    
    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
    setShowCreateForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(prev => prev.filter(key => key.id !== id));
    }
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 8);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Key className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
              <p className="text-sm text-gray-500">Manage your API keys and access tokens</p>
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
          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              Create New API Key
            </button>
          </div>

          {showCreateForm && (
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production Key, Development Key"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateKey()}
                />
                <button
                  onClick={handleCreateKey}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewKeyName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {apiKeys.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Key className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No API keys found. Create your first key to get started.</p>
              </div>
            ) : (
              apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{apiKey.name}</h3>
                      <p className="text-sm text-gray-500">Created on {apiKey.createdAt}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(apiKey.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
                    <code className="flex-1 text-sm font-mono text-gray-700">
                      {apiKey.visible ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleVisibility(apiKey.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      title={apiKey.visible ? "Hide key" : "Show key"}
                    >
                      {apiKey.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleCopy(apiKey.key, apiKey.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      {copiedId === apiKey.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {apiKey.visible && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Make sure to copy your API key now. You won't be able to see it again!
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Key className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Security Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Never share your API keys publicly</li>
                <li>• Use environment variables to store keys</li>
                <li>• Rotate keys regularly for better security</li>
                <li>• Delete unused keys immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeysModal;

