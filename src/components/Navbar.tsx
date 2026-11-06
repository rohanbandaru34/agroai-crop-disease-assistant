import React, { useState } from 'react';
import { Sprout, MessageSquare, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'assistant' | 'library' | 'about';
  setActiveTab: (tab: 'home' | 'assistant' | 'library' | 'about') => void;
  onOpenAssistant: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAssistant,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'assistant' | 'library') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    onOpenAbout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E7E2D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark with minimal leaf icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#204B34] rounded-lg py-1"
          >
            <div className="w-9 h-9 rounded-xl bg-[#204B34] flex items-center justify-center text-[#E8EFE9] shadow-xs group-hover:bg-[#193B28] transition-colors">
              <Sprout className="w-5 h-5 text-[#88C498]" />
            </div>
            <div className="flex items-baseline">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#173827]">
                AgroAI
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line, quiet typography) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#46534B]">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'home'
                  ? 'border-[#204B34] text-[#173827] font-semibold'
                  : 'border-transparent hover:text-[#173827] hover:border-[#BCD1C0]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('assistant')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'assistant'
                  ? 'border-[#204B34] text-[#173827] font-semibold'
                  : 'border-transparent hover:text-[#173827] hover:border-[#BCD1C0]'
              }`}
            >
              Disease Assistant
            </button>
            <button
              onClick={() => handleNavClick('library')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'library'
                  ? 'border-[#204B34] text-[#173827] font-semibold'
                  : 'border-transparent hover:text-[#173827] hover:border-[#BCD1C0]'
              }`}
            >
              Crop Library
            </button>
            <button
              onClick={handleAboutClick}
              className="text-[#46534B] hover:text-[#173827] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#BCD1C0]"
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Ask AgroAI) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FCFAF5] bg-[#193B28] hover:bg-[#11281B] active:scale-[0.98] rounded-full transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#204B34]"
            >
              <MessageSquare className="w-4 h-4 text-[#A3C5A7]" />
              <span className="whitespace-nowrap">Ask AgroAI</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAssistant}
              className="p-2 text-[#193B28] bg-[#E8EFE9] rounded-lg"
              aria-label="Ask AgroAI"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#173827] hover:bg-[#EAE6DA] rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E2D5] bg-[#F8F6F0] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
              activeTab === 'home' ? 'bg-[#E8EFE9] text-[#173827] font-semibold' : 'text-[#3D4B42]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('assistant')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
              activeTab === 'assistant' ? 'bg-[#E8EFE9] text-[#173827] font-semibold' : 'text-[#3D4B42]'
            }`}
          >
            Disease Assistant
          </button>
          <button
            onClick={() => handleNavClick('library')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
              activeTab === 'library' ? 'bg-[#E8EFE9] text-[#173827] font-semibold' : 'text-[#3D4B42]'
            }`}
          >
            Crop Library
          </button>
          <button
            onClick={handleAboutClick}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-[#3D4B42] hover:bg-[#EAE6DA]"
          >
            About AgroAI
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-[#193B28]"
            >
              <MessageSquare className="w-4 h-4 text-[#A3C5A7]" />
              Ask AgroAI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
