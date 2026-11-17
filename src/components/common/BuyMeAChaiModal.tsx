import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Heart, Sparkles, X, Check, Send, Award, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface BuyMeAChaiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAI_STORAGE_KEY = 'trachtenberg_developer_chai_count';

export const BuyMeAChaiModal: React.FC<BuyMeAChaiModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [chaiCount, setChaiCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(CHAI_STORAGE_KEY) || '3', 10);
    } catch {
      return 3;
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
      amount: '$3 / ₹50',
      tagline: 'A quick arithmetic recharge for late-night algorithms.'
    },
    {
      id: 2,
      name: 'Special Masala Chai',
      emoji: '🫖',
      amount: '$5 / ₹150',
      tagline: 'Rich spiced tea with ginger & cardamom for deep mathematical focus.'
    },
    {
      id: 3,
      name: 'Chai & Samosa Combo',
      emoji: '🧋',
      amount: '$10 / ₹300',
      tagline: 'The ultimate mathematical marathon fuel for developer Me.'
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
      particleCount: 80,
      spread: 70,
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
        {/* Header with Warm Chai Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              ☕
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                <Sparkles className="w-3 h-3" /> Developer Credits & Appreciation
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-1">
                Buy Me a Chai ☕
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Developer Attribution Card */}
          <div className="bg-paper-100 dark:bg-ink-850 border border-paper-200 dark:border-ink-800 rounded-xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-academic-100 dark:bg-academic-950/70 text-academic-700 dark:text-academic-300 font-serif font-bold flex items-center justify-center flex-shrink-0 text-sm">
              Me
            </div>
            <div className="text-xs text-ink-700 dark:text-paper-300 space-y-1">
              <div className="font-semibold text-ink-900 dark:text-paper-100">
                Created & Engineered by <strong className="text-academic-700 dark:text-academic-400">Me</strong>
              </div>
              <p className="leading-relaxed text-[11px] text-ink-600 dark:text-paper-400">
                Hi! I am <strong>Me</strong>, the developer behind this interactive Trachtenberg Speed Mathematics learning platform. Conceived to replace mechanical rote memorization with verified visual intuition and lightning-fast mental reflexes.
              </p>
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
                  Leave a Note or Shoutout to Me (Optional):
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  placeholder="Your Name / Nickname"
                  className="w-full px-3 py-1.5 text-xs bg-paper-50 dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  rows={2}
                  value={donorMessage}
                  onChange={e => setDonorMessage(e.target.value)}
                  placeholder="e.g. Thanks Me, mastering 11 and the Direct Method was mindblowing!"
                  className="w-full px-3 py-1.5 text-xs bg-paper-50 dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-ink-400 font-mono">
                  ☕ <strong>{chaiCount}</strong> cups gifted so far
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
                    <Coffee className="w-4 h-4 mr-1.5" /> Treat Developer Me to Chai
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
                  Your cup of chai and heartfelt support have been received by <strong>Me</strong>! Thank you for supporting independent mathematical tools and keeping education accessible.
                </p>
                {donorName && (
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 pt-1">
                    Special thanks to: <strong>{donorName}</strong>!
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onClose}
                  className="bg-academic-700 dark:bg-academic-600"
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
