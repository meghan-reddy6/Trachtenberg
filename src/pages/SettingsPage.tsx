import React, { useState } from 'react';
import { Settings, Download, Upload, Trash2, Sun, Moon, Check, AlertTriangle, Coffee, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';
import {
  saveUserProgress,
  exportProgressToJson,
  importProgressFromJson,
  resetProgress
} from '../storage/progressStorage';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { BuyMeAChaiModal } from '../components/common/BuyMeAChaiModal';

interface SettingsPageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ progress, onUpdateProgress }) => {
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showChaiModal, setShowChaiModal] = useState(false);

  // Update a setting
  const updateSetting = <K extends keyof UserProgress['settings']>(
    key: K,
    val: UserProgress['settings'][K]
  ) => {
    const updated: UserProgress = {
      ...progress,
      settings: {
        ...progress.settings,
        [key]: val
      }
    };
    onUpdateProgress(updated);
    saveUserProgress(updated);
  };

  // Export Progress to file
  const handleExport = () => {
    const jsonStr = exportProgressToJson(progress);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trachtenberg-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import Progress from text
  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imported = importProgressFromJson(importJsonText);
      onUpdateProgress(imported);
      setImportStatus({ success: true, msg: 'Progress imported successfully!' });
      setImportJsonText('');
    } catch (err: any) {
      setImportStatus({ success: false, msg: err.message });
    }
  };

  // Reset Progress
  const handleReset = () => {
    const reset = resetProgress();
    onUpdateProgress(reset);
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" /> Configuration & Storage
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          Settings & Local Data
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1 leading-relaxed">
          Manage interface aesthetics, mathematical typography sizing, and backup or restore your learning records. All data remains 100% private in local browser storage.
        </p>
      </div>

      {/* 1. Interface & Visual Preferences */}
      <Card className="p-6 space-y-5">
        <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
          Interface & Calculation Workspace
        </h3>

        {/* Theme Preference */}
        <div className="flex items-center justify-between border-b border-paper-200 dark:border-ink-800 pb-4">
          <div>
            <div className="text-sm font-medium text-ink-900 dark:text-paper-100">Color Palette</div>
            <div className="text-xs text-ink-500">Academic light theme or low-light dark theme</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSetting('theme', 'light')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 border transition-all ${
                progress.settings.theme === 'light'
                  ? 'bg-academic-700 text-white border-academic-800'
                  : 'bg-paper-100 dark:bg-ink-800 border-paper-300 dark:border-ink-700 text-ink-700 dark:text-paper-300'
              }`}
            >
              <Sun className="w-3.5 h-3.5" /> Light
            </button>
            <button
              onClick={() => updateSetting('theme', 'dark')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 border transition-all ${
                progress.settings.theme === 'dark'
                  ? 'bg-academic-700 text-white border-academic-800'
                  : 'bg-paper-100 dark:bg-ink-800 border-paper-300 dark:border-ink-700 text-ink-700 dark:text-paper-300'
              }`}
            >
              <Moon className="w-3.5 h-3.5" /> Dark
            </button>
          </div>
        </div>

        {/* Math Font Sizing */}
        <div className="flex items-center justify-between border-b border-paper-200 dark:border-ink-800 pb-4">
          <div>
            <div className="text-sm font-medium text-ink-900 dark:text-paper-100">Mathematical Digits Size</div>
            <div className="text-xs text-ink-500">Adjust the visual scale of calculations in the digit grid</div>
          </div>
          <select
            value={progress.settings.mathFontSize}
            onChange={e => updateSetting('mathFontSize', e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-md text-ink-900 dark:text-paper-100"
          >
            <option value="standard">Standard Monospace</option>
            <option value="large">Large (High Legibility)</option>
          </select>
        </div>

        {/* Auto-Advance Steps in Demo */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-ink-900 dark:text-paper-100">Step Auto-Advance</div>
            <div className="text-xs text-ink-500">Automatically progress to the next digit after successful input</div>
          </div>
          <input
            type="checkbox"
            checked={progress.settings.autoAdvanceStep}
            onChange={e => updateSetting('autoAdvanceStep', e.target.checked)}
            className="w-4 h-4 rounded text-academic-600 focus:ring-academic-500 border-paper-300"
          >
          </input>
        </div>
      </Card>

      {/* 2. Data Backup & Portability */}
      <Card className="p-6 space-y-5">
        <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
          Data Backup & Portability
        </h3>
        <p className="text-xs text-ink-600 dark:text-paper-400">
          Because this application runs entirely on your browser without external servers, you can export your entire learning history, streak records, and mastery ratings as a JSON file to transfer between devices.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="w-4 h-4" /> Export Progress Backup (JSON)
          </Button>
        </div>

        {/* Import JSON Form */}
        <div className="pt-3 border-t border-paper-200 dark:border-ink-800 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-ink-500 block">
            Import Progress from JSON Backup
          </label>
          <form onSubmit={handleImport} className="space-y-2">
            <textarea
              rows={3}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Paste previously exported JSON string here..."
              className="w-full p-2.5 text-xs font-mono bg-paper-50 dark:bg-ink-900 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100"
            />
            {importStatus && (
              <div
                className={`p-2 rounded text-xs flex items-center gap-1.5 ${
                  importStatus.success
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {importStatus.msg}
              </div>
            )}
            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={!importJsonText.trim()}
              className="gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" /> Restore Backup
            </Button>
          </form>
        </div>
      </Card>

      {/* 3. Developer Appreciation & Buy Me a Chai */}
      <Card className="p-6 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-[10px] font-mono uppercase font-bold text-amber-800 dark:text-amber-300">
              <Sparkles className="w-3 h-3" /> Engineered by Meghan (@meghan-reddy6)
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-paper-50">
              Developer Credits & Support
            </h3>
            <p className="text-xs text-ink-600 dark:text-paper-300 max-w-xl leading-relaxed">
              This interactive platform was architected and built by <strong>Meghan</strong> (<a href="https://github.com/meghan-reddy6" target="_blank" rel="noopener noreferrer" className="text-academic-700 dark:text-academic-400 font-semibold underline">@meghan-reddy6</a>), creator of <a href="https://meghan-reddy6.github.io/codetocompute/" target="_blank" rel="noopener noreferrer" className="text-academic-700 dark:text-academic-400 font-semibold underline">CodeToCompute</a>. If this educational software helped sharpen your calculation reflexes, support future open-source developments with a cup of chai!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
            <a
              href="https://buymeachai.in/meghansai6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Coffee className="w-4 h-4" /> Buy Me a Chai ☕
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChaiModal(true)}
            >
              View Bio
            </Button>
          </div>
        </div>
      </Card>

      {/* 4. Reset All Progress Danger Zone */}
      <Card className="p-6 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10 space-y-3">
        <h3 className="text-base font-serif font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          Reset All Progress
        </h3>
        <p className="text-xs text-ink-600 dark:text-paper-400 leading-relaxed">
          Permanently clear all practice attempts, mastered techniques, bookmarks, and speed records. This action cannot be undone.
        </p>

        {!showResetConfirm ? (
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset All Learning Progress
          </Button>
        ) : (
          <div className="p-3 rounded border border-rose-300 dark:border-rose-800 bg-white dark:bg-ink-900 space-y-2">
            <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
              Are you completely certain? All local calculation statistics will be reset.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" size="sm" onClick={handleReset}>
                Yes, Reset Everything
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Buy Me a Chai Modal */}
      <BuyMeAChaiModal
        isOpen={showChaiModal}
        onClose={() => setShowChaiModal(false)}
      />
    </div>
  );
};

