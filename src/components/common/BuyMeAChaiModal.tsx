import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Heart, Sparkles, X, Check, Send, Award, ExternalLink, Code } from 'lucide-react';
import { Button } from './Button';

interface BuyMeAChaiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAI_STORAGE_KEY = 'trachtenberg_developer_chai_count';
const BUY_ME_A_CHAI_URL = 'https://buymeachai.in/meghansai6';
const GITHUB_PROFILE_URL = 'https://github.com/meghan-reddy6';
const CODETOCOMPUTE_URL = 'https://meghan-reddy6.github.io/codetocompute/';

export const BuyMeAChaiModal: React.FC<BuyMeAChaiModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [chaiCount, setChaiCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(CHAI_STORAGE_KEY) || '12', 10);
    } catch {
      return 12;
    }
  });
  const [donorName, setDonorName] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tiers = [
    {
      id: 1,
      name: 'Cutting Chai',
      emoji: '☕',
      amount: '₹50 / $3',
      tagline: 'A quick arithmetic recharge for late-night algorithms.'
    },
    {
      id: 2,
      name: 'Special Masala Chai',
      emoji: '🫖',
      amount: '₹150 / $5',
      tagline: 'Rich spiced tea with ginger & cardamom for deep mathematical focus.'
    },
    {
      id: 3,
      name: 'Chai & Samosa Marathon Fuel',
      emoji: '🧋',
      amount: '₹300 / $10',
      tagline: 'The ultimate fuel for building open-source systems & mathematics tools.'
    }
  ];

  const handleSendChai = (e: React.FormEvent) => {
    e.preventDefault();
    const newCount = chaiCount + (selectedTier === 1 ? 1 : selectedTier === 2 ? 2 : 4);
    setChaiCount(newCount);
    try {
      localStorage.setItem(CHAI_STORAGE_KEY, newCount.toString());
    } catch {}

    // Celebratory confetti burst!
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#D97706', '#B45309', '#1E3A8A', '#10B981']
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-white dark:bg-ink-900 border border-paper-300 dark:border-ink-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Warm Chai Gradient Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
              ☕
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                <Sparkles className="w-3 h-3" /> Developer Appreciation & Support
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-1">
                Buy Meghan a Chai ☕
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Meghan's Verified Developer Card */}
          <div className="bg-paper-100 dark:bg-ink-850 border border-paper-200 dark:border-ink-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-academic-700 text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                  MR
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink-950 dark:text-paper-50 flex items-center gap-1.5">
                    Meghan
                    <span className="text-xs font-mono font-normal text-ink-500">(@meghan-reddy6)</span>
                  </h3>
                  <p className="text-[11px] text-academic-700 dark:text-academic-400 font-medium">
                    Software & Systems Engineer · Creator of CodeToCompute
                  </p>
                </div>
              </div>

              {/* Direct Links */}
              <div className="flex items-center gap-1.5">
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-paper-300 hover:text-ink-950 transition-colors"
                  title="GitHub Profile (@meghan-reddy6)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  href={CODETOCOMPUTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-paper-300 hover:text-ink-950 transition-colors"
                  title="CodeToCompute: Systems, DSA & AI Engineering"
                >
                  <Code className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-xs text-ink-600 dark:text-paper-400 leading-relaxed font-sans">
              "Hi! I'm <strong>Meghan</strong>. I build open-source tools like <strong>CodeToCompute</strong> and this interactive <strong>Trachtenberg Speed Mathematics</strong> platform to make deep engineering and mental computation accessible, visual, and lightning-fast. If this tool helped you calculate faster, consider buying me a cup of chai!"
            </p>

            {/* Direct Official Link Button */}
            <div className="pt-1">
              <a
                href={BUY_ME_A_CHAI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Support directly on buymeachai.in/meghansai6</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSendChai} className="space-y-4">
              {/* Chai Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-ink-500 font-semibold block">
                  Select a Cup of Chai
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {tiers.map(tier => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 ring-2 ring-amber-500/30'
                            : 'border-paper-200 dark:border-ink-800 bg-paper-50 dark:bg-ink-850 hover:bg-paper-100 dark:hover:bg-ink-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tier.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-ink-900 dark:text-paper-100">
                              {tier.name}
                            </div>
                            <div className="text-[11px] text-ink-500 dark:text-paper-400">
                              {tier.tagline}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex-shrink-0 ml-2">
                          {tier.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message Note (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink-700 dark:text-paper-300 block">
                  Leave a Note or Shoutout to Meghan (Optional):
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  placeholder="Your Name / Handle"
                  className="w-full px-3 py-1.5 text-xs bg-paper-50 dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  rows={2}
                  value={donorMessage}
                  onChange={e => setDonorMessage(e.target.value)}
                  placeholder="e.g. Thanks Meghan! The Trachtenberg visualizer and direct multiplication method are fantastic."
                  className="w-full px-3 py-1.5 text-xs bg-paper-50 dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-ink-400 font-mono">
                  ☕ <strong>{chaiCount}</strong> cups gifted
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 shadow-sm"
                  >
                    <Coffee className="w-4 h-4 mr-1.5" /> Treat Meghan to Chai
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                ☕
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-paper-50">
                  Thank You So Much!
                </h3>
                <p className="text-xs text-ink-600 dark:text-paper-300 max-w-sm mx-auto leading-relaxed">
                  Your cup of chai and support have been received with immense gratitude by <strong>Meghan (@meghan-reddy6)</strong>!
                </p>
                {donorName && (
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 pt-1">
                    Special thanks to: <strong>{donorName}</strong>!
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={BUY_ME_A_CHAI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>Open buymeachai.in/meghansai6</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Return to Learning
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
