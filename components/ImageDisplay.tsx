
import React from 'react';
import { LOADING_MESSAGES } from '../constants';

interface ImageDisplayProps {
  url: string | null;
  loading: boolean;
  prompt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ url, loading, prompt }) => {
  const [loadingMsg, setLoadingMsg] = React.useState(LOADING_MESSAGES[0]);

  React.useEffect(() => {
    let interval: number;
    if (loading) {
      let idx = 0;
      interval = window.setInterval(() => {
        idx = (idx + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[idx]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleDownload = () => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = `drishti-ai-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden rounded-2xl glass border border-slate-700 shadow-2xl">
      {loading ? (
        <div className="flex flex-col items-center text-center p-8">
          <div className="relative mb-8">
             <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-palette text-blue-400 text-2xl animate-pulse"></i>
             </div>
          </div>
          <h3 className="text-xl font-bold mb-2 animate-pulse">{loadingMsg}</h3>
          <p className="text-slate-500 text-sm">Our AI is manifesting your vision...</p>
        </div>
      ) : url ? (
        <div className="group relative w-full h-full flex items-center justify-center p-4">
          <img
            src={url}
            alt={prompt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-blue-500/10 transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleDownload}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
              title="Download"
            >
              <i className="fa-solid fa-download"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-12">
          <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-600">
            <i className="fa-regular fa-image text-4xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-300 mb-2">Ready to create?</h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            Describe what you see in your mind and let Drishti AI bring it to life.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
