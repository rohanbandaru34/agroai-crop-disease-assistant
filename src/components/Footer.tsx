import React from 'react';
import { Sprout } from 'lucide-react';
import { CropCategory } from '../types';

interface FooterProps {
  onNavigate: (tab: 'home' | 'assistant' | 'library') => void;
  onOpenAbout: () => void;
  onSelectCategory: (category: CropCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAbout,
  onSelectCategory,
}) => {
  return (
    <footer className="border-t border-[#E5DFD1] bg-[#F3EFE6] text-[#425046] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand Wordmark & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#193B28] flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-[#88C498]" />
              </div>
              <span className="font-serif text-xl font-bold text-[#142A1D]">
                AgroAI
              </span>
            </div>
            <p className="text-xs text-[#526258] leading-relaxed max-w-sm">
              AI crop disease diagnosis and management assistant empowering farmers and growers with reliable pathology recognition, sustainable remedies, and field-tested crop knowledge.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-[#173827] text-xs tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#173827] transition-colors cursor-pointer"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assistant')}
                  className="hover:text-[#173827] transition-colors cursor-pointer"
                >
                  Disease Diagnosis Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-[#173827] transition-colors cursor-pointer"
                >
                  Crop Library
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#173827] transition-colors cursor-pointer"
                >
                  About AgroAI & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Crop Categories */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-bold text-[#173827] text-xs tracking-wider uppercase">
              Featured Crop Sectors
            </h4>
            <div className="flex flex-wrap gap-2">
              {(['Cereals', 'Pulses', 'Vegetables', 'Fruits', 'Oilseeds', 'Cash crops'] as CropCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className="px-2.5 py-1 rounded bg-[#EAE5D7] hover:bg-[#DED7C5] text-[#29382F] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
            <p className="text-[11px] text-[#69796F] pt-2 leading-normal">
              Agricultural notice: AgroAI recommendations are generated for educational and decision-support purposes. Consult local agronomy extension services for chemical registration guidelines.
            </p>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-[#E3DCce] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6B7B71]">
          <span>© {new Date().getFullYear()} AgroAI Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Agronomic Decision Support</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Crop Stewardship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
