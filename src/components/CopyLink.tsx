import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyLinkProps {
  showCopied: boolean;
  setShowCopied: (value: boolean) => void;
}

export default function CopyLink({ showCopied, setShowCopied }: CopyLinkProps) {
  const viewerUrl = window.location.href.replace(/\/$/, '') + '/viewer';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(viewerUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2 pr-4">
      <a
        href="/viewer"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        View Live Results
      </a>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
        title="Copy link"
      >
        {showCopied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
}