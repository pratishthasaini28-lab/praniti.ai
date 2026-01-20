
import React, { useState, useEffect, useCallback } from 'react';
import { ImageStyle, GeneratedImage, GenerationRequest } from './types';
import { ASPECT_RATIOS } from './constants';
import PromptInput from './components/PromptInput';
import StyleGrid from './components/StyleGrid';
import ImageDisplay from './components/ImageDisplay';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.TWO_D);
  const [aspectRatio, setAspectRatio] = useState<GenerationRequest['aspectRatio']>("1:1");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('drishti-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('drishti-history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateImage({
        prompt,
        style,
        aspectRatio,
      });

      setCurrentImage(imageUrl);
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        prompt: prompt,
        style: style,
        timestamp: Date.now(),
      };
      setHistory(prev => [newImage, ...prev].slice(0, 12));
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHistoryItemClick = (img: GeneratedImage) => {
    setCurrentImage(img.url);
    setPrompt(img.prompt);
    setStyle(img.style);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 mb-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-eye text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent leading-tight">
                DRISHTI AI
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Image Manifestation</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
            <span className="bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">English & Hindi</span>
            <div className="h-4 w-[1px] bg-slate-700"></div>
            <span className="bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">Powered by Gemini 2.5</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Section */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm italic">1</span>
                  What do you envision?
                </h2>
              </div>
              <PromptInput 
                value={prompt} 
                onChange={setPrompt} 
                onSubmit={handleGenerate} 
                disabled={isGenerating} 
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm italic">2</span>
                Choose a Style (2D/3D)
              </h2>
              <StyleGrid selected={style} onSelect={setStyle} />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm italic">3</span>
                Frame Aspect Ratio
              </h2>
              <div className="flex flex-wrap gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      aspectRatio === ratio.id
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 flex items-start gap-3 animate-shake">
                <i className="fa-solid fa-circle-exclamation mt-1"></i>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 space-y-8">
             <div className="sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Output</h2>
                  {currentImage && (
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = currentImage;
                        link.download = 'generated-image.png';
                        link.click();
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors uppercase font-bold flex items-center gap-2"
                    >
                      <i className="fa-solid fa-download"></i> Save Image
                    </button>
                  )}
                </div>
                <ImageDisplay 
                  url={currentImage} 
                  loading={isGenerating} 
                  prompt={prompt} 
                />
             </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <section className="mt-20 border-t border-slate-800 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Your Gallery</h2>
                <p className="text-slate-500 text-sm">Recently generated masterpieces</p>
              </div>
              <button 
                onClick={() => {
                  if(confirm("Clear your history?")) setHistory([]);
                }}
                className="text-slate-500 hover:text-red-400 text-xs font-bold uppercase"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {history.map((img) => (
                <button
                  key={img.id}
                  onClick={() => handleHistoryItemClick(img)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all bg-slate-900"
                >
                  <img 
                    src={img.url} 
                    alt={img.prompt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    <p className="text-[10px] text-white line-clamp-2 leading-tight">{img.prompt}</p>
                    <span className="text-[8px] text-blue-300 font-bold uppercase mt-1">{img.style}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
