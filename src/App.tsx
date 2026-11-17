import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './storage/progressStorage';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { LearnPage } from './pages/LearnPage';
import { TechniqueDetailPage } from './pages/TechniqueDetailPage';
import { TechniqueLibraryPage } from './pages/TechniqueLibraryPage';
import { PracticePage } from './pages/PracticePage';
import { SpeedTrainerPage } from './pages/SpeedTrainerPage';
import { RevisionPage } from './pages/RevisionPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);

  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  return (
    <HashRouter>
      <AppLayout progress={progress} onUpdateProgress={handleUpdateProgress}>
        <Routes>
          <Route path="/" element={<DashboardPage progress={progress} />} />
          <Route path="/chapters" element={<ChaptersPage progress={progress} />} />
          <Route path="/learn" element={<LearnPage progress={progress} />} />
          <Route path="/learn/:chapterId" element={<LearnPage progress={progress} />} />
          <Route
            path="/technique/:id"
            element={
              <TechniqueDetailPage
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            }
          />
          <Route path="/library" element={<TechniqueLibraryPage progress={progress} />} />
          <Route
            path="/practice"
            element={
              <PracticePage
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            }
          />
          <Route
            path="/speed-trainer"
            element={
              <SpeedTrainerPage
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            }
          />
          <Route path="/revision" element={<RevisionPage progress={progress} />} />
          <Route
            path="/assessments"
            element={
              <AssessmentsPage
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            }
          />
          <Route path="/progress" element={<ProgressPage progress={progress} />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}

export default App;
