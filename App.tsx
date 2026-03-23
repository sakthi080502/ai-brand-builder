import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layout, 
  Newspaper, 
  Instagram, 
  Loader2, 
  ArrowRight, 
  RefreshCw,
  Image as ImageIcon,
  Download
} from 'lucide-react';
import { generateVisualIdentity, generateAsset, BrandAsset } from './services/geminiService';

const MEDIUMS = [
  { id: 'billboard', name: 'Billboard', icon: Layout, description: 'Large scale outdoor advertising' },
  { id: 'newspaper', name: 'Newspaper', icon: Newspaper, description: 'Classic print media ad' },
  { id: 'social post', name: 'Social Post', icon: Instagram, description: 'Modern digital engagement' },
];

export default function App() {
  const [description, setDescription] = useState('');
  const [visualIdentity, setVisualIdentity] = useState('');
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setError(null);
    setAssets([]);

    try {
      // 1. Generate a consistent visual identity
      const identity = await generateVisualIdentity(description);
      setVisualIdentity(identity);

      // 2. Generate assets for each medium
      const generatedAssets: BrandAsset[] = [];
      
      // We generate them sequentially or in parallel. 
      // Parallel is faster but might hit rate limits if too many. 
      // 3 is usually fine.
      const promises = MEDIUMS.map(async (medium) => {
        const imageUrl = await generateAsset(identity, medium.id);
        return {
          id: Math.random().toString(36).substr(2, 9),
          medium: medium.name,
          imageUrl,
          prompt: identity
        };
      });

      const results = await Promise.all(promises);
      setAssets(results);
    } catch (err) {
      console.error(err);
      setError('Failed to generate brand assets. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-emerald-100">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight">BrandBuilder</h1>
          </div>
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            Powered by Nano-Banana
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-zinc-900">
                Imagine your product.
              </h2>
              <p className="text-zinc-500 leading-relaxed">
                Describe your product in detail. We'll generate a consistent visual identity and apply it across multiple advertising mediums.
              </p>
            </section>

            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. A minimalist, matte ceramic coffee dripper in sage green..."
                  className="w-full h-40 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none text-zinc-800 placeholder:text-zinc-400"
                />
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-400">
                  {description.length} chars
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !description.trim()}
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:cursor-not-allowed text-white rounded-2xl font-medium flex items-center justify-center gap-2 transition-all group shadow-lg shadow-zinc-200"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Assets...</span>
                  </>
                ) : (
                  <>
                    <span>Build Brand Assets</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg border border-red-100">
                  {error}
                </p>
              )}
            </div>

            {visualIdentity && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Visual Identity</span>
                </div>
                <p className="text-xs text-emerald-800/80 leading-relaxed italic">
                  "{visualIdentity}"
                </p>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {isGenerating ? (
                  // Loading Skeletons
                  MEDIUMS.map((m, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="aspect-square bg-zinc-100 rounded-3xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-zinc-200"
                    >
                      <div className="w-12 h-12 bg-zinc-200 rounded-full animate-pulse" />
                      <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse" />
                    </motion.div>
                  ))
                ) : assets.length > 0 ? (
                  assets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-100"
                    >
                      <div className="aspect-square relative overflow-hidden bg-zinc-100">
                        <img
                          src={asset.imageUrl}
                          alt={asset.medium}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                          <button 
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = asset.imageUrl;
                              link.download = `brand-${asset.medium.toLowerCase().replace(' ', '-')}.png`;
                              link.click();
                            }}
                            className="bg-white text-zinc-900 py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download Asset
                          </button>
                        </div>
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-zinc-900">{asset.medium}</h3>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Campaign Asset</p>
                        </div>
                        <div className="p-2 bg-zinc-50 rounded-xl">
                          {MEDIUMS.find(m => m.name === asset.medium)?.icon && (
                            React.createElement(MEDIUMS.find(m => m.name === asset.medium)!.icon, {
                              className: "w-5 h-5 text-zinc-400"
                            })
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Empty State
                  <div className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-zinc-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-zinc-900">No assets generated yet</h3>
                      <p className="text-zinc-500 max-w-xs">
                        Enter a product description on the left to start building your brand assets.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">BrandBuilder AI</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-400">
            <span className="hover:text-zinc-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-zinc-600 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-zinc-600 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
