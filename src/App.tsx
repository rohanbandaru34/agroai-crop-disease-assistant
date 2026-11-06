/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AssistantView } from './components/AssistantView';
import { CropLibraryView } from './components/CropLibraryView';
import { CropDetailView } from './components/CropDetailView';
import { DiseaseDetailView } from './components/DiseaseDetailView';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { Crop, CropCategory, Disease } from './types';
import { CROPS_DATA, DISEASES } from './data/cropsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'assistant' | 'library' | 'about'>('home');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [libraryCategory, setLibraryCategory] = useState<string>('All');
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | undefined>(undefined);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (tab: 'home' | 'assistant' | 'library') => {
    setActiveTab(tab);
    setSelectedCrop(null);
    setSelectedDisease(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssistant = (query?: string) => {
    setActiveTab('assistant');
    setSelectedCrop(null);
    setSelectedDisease(null);
    if (query) {
      setAssistantInitialQuery(query);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCrops = () => {
    setActiveTab('library');
    setSelectedCrop(null);
    setSelectedDisease(null);
    setLibraryCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHome = (cat: CropCategory) => {
    setActiveTab('library');
    setSelectedCrop(null);
    setSelectedDisease(null);
    setLibraryCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDiseaseDetail = (diseaseId: string) => {
    const disease = DISEASES[diseaseId];
    if (disease) {
      setSelectedDisease(disease);
      setSelectedCrop(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCropDetail = (cropIdOrCrop: string | Crop) => {
    if (typeof cropIdOrCrop === 'string') {
      const found = CROPS_DATA.find((c) => c.id === cropIdOrCrop);
      if (found) {
        setSelectedCrop(found);
        setSelectedDisease(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedCrop(cropIdOrCrop);
      setSelectedDisease(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1D2621] flex flex-col font-sans selection:bg-[#204B34]/15 selection:text-[#142A1D]">
      {/* Top Bar Contract (Brand, Nav links, 1 Primary Action) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'about') {
            setIsAboutModalOpen(true);
          } else {
            handleNavigate(tab);
          }
        }}
        onOpenAssistant={() => handleOpenAssistant()}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Priority 1: Disease Detail View (e.g. Early Blight from chat or home) */}
        {selectedDisease ? (
          <DiseaseDetailView
            disease={selectedDisease}
            onBack={() => {
              setSelectedDisease(null);
              // Return to previous context or assistant
            }}
            onAskAboutDisease={(query) => handleOpenAssistant(query)}
          />
        ) : selectedCrop ? (
          /* Priority 2: Crop Detail View */
          <CropDetailView
            crop={selectedCrop}
            onBack={() => setSelectedCrop(null)}
            onAskAboutCrop={(query) => handleOpenAssistant(query)}
            onSelectDisease={(diseaseId) => handleOpenDiseaseDetail(diseaseId)}
          />
        ) : activeTab === 'home' ? (
          /* Priority 3: Home View */
          <HomeView
            onDiagnoseClick={() => handleOpenAssistant()}
            onExploreCropsClick={handleExploreCrops}
            onSelectCategory={handleSelectCategoryFromHome}
            onOpenQuickDisease={handleOpenDiseaseDetail}
          />
        ) : activeTab === 'assistant' ? (
          /* Priority 4: Disease Assistant Chat View */
          <AssistantView
            onOpenDiseaseDetail={handleOpenDiseaseDetail}
            onOpenCropDetail={handleOpenCropDetail}
            initialQuestion={assistantInitialQuery}
          />
        ) : (
          /* Priority 5: Crop Library View */
          <CropLibraryView
            onSelectCrop={handleOpenCropDetail}
            onSelectDisease={handleOpenDiseaseDetail}
            initialCategory={libraryCategory}
            onAskAboutCrop={(cropName) =>
              handleOpenAssistant(`What are the key growing conditions and disease risks for ${cropName}?`)
            }
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onSelectCategory={handleSelectCategoryFromHome}
      />

      {/* About AgroAI Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onStartDiagnosis={() => handleOpenAssistant()}
      />
    </div>
  );
}
