
import React, { useState } from 'react';
import { ExternalLink, Copy, Trash2, Calendar, MousePointer2, Check, QrCode, Edit, Lock as LockIcon, Clock } from 'lucide-react';
import { ShortenedUrl } from '../types';
import QRCodeModal from './QRCodeModal';
import EditLinkModal from './EditLinkModal';

interface UrlListProps {
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
  onLinkClick?: (id: string) => void;
  onUpdate?: (updatedLink: ShortenedUrl) => void;
  copiedId: string | null;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onDelete, onCopy, onLinkClick, onUpdate, copiedId }) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ShortenedUrl | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };
  if (urls.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-lg">No links shortened yet. Start by pasting a URL above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Your Recent Links</h2>
      {urls.map((url) => (
        <div key={url.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (onLinkClick) {
                      onLinkClick(url.id);
                    }
                  }}
                  className="text-lg font-bold text-indigo-600 truncate hover:text-indigo-700 hover:underline transition-colors cursor-pointer"
                >
                  linkgenie.ai/{url.shortCode}
                </a>
                <button
                  onClick={() => onCopy(url.shortCode)}
                  className={`p-1.5 rounded-lg transition-colors ${copiedId === url.shortCode ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {copiedId === url.shortCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 line-clamp-1">{url.title || "Untitled Link"}</h3>
              <p className="text-sm text-gray-500 truncate mt-0.5">{url.originalUrl}</p>
              {url.description && (
                <p className="text-xs text-gray-400 mt-2 line-clamp-1 italic">"{url.description}"</p>
              )}
              
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {url.password && (
                  <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    <LockIcon className="h-3 w-3" />
                    Protected
                  </span>
                )}
                {url.expiresAt && (
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    isExpired(url.expiresAt) 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    <Clock className="h-3 w-3" />
                    {isExpired(url.expiresAt) ? 'Expired' : `Expires ${new Date(url.expiresAt).toLocaleDateString()}`}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 border-t md:border-t-0 pt-3 md:pt-0">
              <div className="flex items-center">
                <MousePointer2 className="h-4 w-4 mr-1 text-indigo-400" />
                <span className="font-medium text-gray-700">{url.clicks}</span>
                <span className="ml-1">clicks</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-300" />
                <span>{new Date(url.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedLink(url);
                    setQrModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="QR Code"
                >
                  <QrCode className="h-5 w-5" />
                </button>
                {onUpdate && (
                  <button
                    onClick={() => {
                      setSelectedLink(url);
                      setEditModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Open"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <button
                  onClick={() => onDelete(url.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* QR Code Modal */}
      {selectedLink && (
        <QRCodeModal
          isOpen={qrModalOpen}
          onClose={() => {
            setQrModalOpen(false);
            setSelectedLink(null);
          }}
          shortUrl={`https://linkgenie.ai/${selectedLink.shortCode}`}
          title={selectedLink.title}
        />
      )}
      
      {/* Edit Link Modal */}
      {selectedLink && onUpdate && (
        <EditLinkModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedLink(null);
          }}
          link={selectedLink}
          onSave={(updatedLink) => {
            onUpdate(updatedLink);
            setEditModalOpen(false);
            setSelectedLink(null);
          }}
        />
      )}
    </div>
  );
};

export default UrlList;
