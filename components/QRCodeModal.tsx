import React from 'react';
import { X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortUrl: string;
  title?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, shortUrl, title }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const svg = document.getElementById('qrcode-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `qrcode-${shortUrl.split('/').pop()}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
          });
        }
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
            <QRCodeSVG
              id="qrcode-svg"
              value={shortUrl}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          
          {title && (
            <p className="font-semibold text-gray-900 text-center">{title}</p>
          )}
          
          <p className="text-sm text-gray-500 text-center break-all px-4">
            {shortUrl}
          </p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold"
          >
            <Download className="h-5 w-5" />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;

