"use client";

import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShareButtons({ title, urlPath }: { title: string; urlPath?: string }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const basUrl = window.location.origin;
      setCurrentUrl(urlPath ? `${basUrl}${urlPath}` : window.location.href);
    }
  }, [urlPath]);

  const handleCopy = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleFacebookShare = () => {
    if (!currentUrl) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleLineShare = () => {
    if (!currentUrl) return;
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
    window.open(url, '_blank', 'width=500,height=500');
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={handleFacebookShare}
        className="flex-1 py-2.5 bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs font-bold rounded-xl transition-colors"
      >
        Facebook
      </button>
      <button 
        onClick={handleLineShare}
        className="flex-1 py-2.5 bg-[#06C755] hover:bg-[#05a648] text-white text-xs font-bold rounded-xl transition-colors"
      >
        LINE
      </button>
      <button 
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600">คัดลอก</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            คัดลอก
          </>
        )}
      </button>
    </div>
  );
}
