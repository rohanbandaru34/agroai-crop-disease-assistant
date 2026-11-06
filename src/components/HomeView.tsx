import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, ChevronRight, Stethoscope } from 'lucide-react';
import { CROP_CATEGORIES } from '../data/cropsData';
import { CropCategory } from '../types';

interface HomeViewProps {
  onDiagnoseClick: () => void;
  onExploreCropsClick: () => void;
  onSelectCategory: (category: CropCategory) => void;
  onOpenQuickDisease: (diseaseId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onDiagnoseClick,
  onExploreCropsClick,
  onSelectCategory,
  onOpenQuickDisease,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] font-bold text-[#142A1D] tracking-tight text-balance">
                  Better crop health starts with better knowledge.
                </h1>
                <p className="text-base sm:text-lg text-[#44534A] leading-relaxed max-w-xl">
                  Understand crop diseases, explore symptoms, and discover practical ways to protect your crops with reliable agronomic intelligence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onDiagnoseClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-base font-semibold text-[#FCFAF5] bg-[#193B28] hover:bg-[#11281B] active:scale-[0.98] transition-all shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#204B34]"
                >
                  <span>Diagnose a Crop</span>
                  <ArrowRight className="w-4 h-4 text-[#A3C5A7]" />
                </button>

                <button
                  onClick={onExploreCropsClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-[#193B28] bg-white border border-[#D5D0C3] hover:bg-[#F2EFE7] hover:border-[#B5AEA0] active:scale-[0.98] transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#193B28]"
                >
                  Explore Crops
                </button>
              </div>

              {/* Quiet Proof Points */}
              <div className="pt-2 flex items-center gap-6 text-xs text-[#5D6D63] border-t border-[#E8E4D9]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#193B28] text-sm tabular-nums">13+</span>
                  <span>Field Crops</span>
                </div>
                <span aria-hidden="true" className="text-[#CCC6B7]">·</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#193B28] text-sm tabular-nums">100%</span>
                  <span>Actionable Guidance</span>
                </div>
                <span aria-hidden="true" className="text-[#CCC6B7]">·</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#193B28] text-sm tabular-nums">Safe</span>
                  <span>Organic-First Remedies</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Agricultural Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D8D2C4] shadow-sm bg-[#EFECE3] aspect-16/10 sm:aspect-16/11 lg:aspect-4/3">
                <img
                  src="/src/assets/images/hero_crop_field_1793973951160.jpg"
                  alt="Healthy green maize crop leaves in morning sunlight with dew"
                  className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Subtle caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between pointer-events-none drop-shadow-sm">
                  <span className="font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    Field Monitoring · Maize & Cereal Canopy
                  </span>
                  <span className="hidden sm:inline bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md text-emerald-200">
                    Optimal Health
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div
            onClick={onDiagnoseClick}
            className="group relative bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-7 transition-all duration-200 hover:border-[#BCD1C0] hover:shadow-sm cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E8EFE9] text-[#204B34] flex items-center justify-center group-hover:bg-[#193B28] group-hover:text-white transition-colors">
                <Stethoscope className="w-6 h-6 text-[#295C42] group-hover:text-[#A3C5A7]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#173827]">
                  AI Disease Diagnosis
                </h3>
                <p className="text-sm text-[#4A574E] leading-relaxed">
                  Understand symptoms and identify possible diseases with intelligent visual and descriptive analysis.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-[#204B34] group-hover:text-[#11281B]">
              <span>Start symptom check</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => onOpenQuickDisease('early-blight-tomato')}
            className="group relative bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-7 transition-all duration-200 hover:border-[#BCD1C0] hover:shadow-sm cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E8EFE9] text-[#204B34] flex items-center justify-center group-hover:bg-[#193B28] group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#295C42] group-hover:text-[#A3C5A7]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#173827]">
                  Smart Management
                </h3>
                <p className="text-sm text-[#4A574E] leading-relaxed">
                  Get practical prevention and management guidance tailored to keep outbreaks from spreading.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-[#204B34] group-hover:text-[#11281B]">
              <span>View management guide</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 3 */}
          <div
            onClick={onExploreCropsClick}
            className="group relative bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-7 transition-all duration-200 hover:border-[#BCD1C0] hover:shadow-sm cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E8EFE9] text-[#204B34] flex items-center justify-center group-hover:bg-[#193B28] group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6 text-[#295C42] group-hover:text-[#A3C5A7]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#173827]">
                  Crop Knowledge
                </h3>
                <p className="text-sm text-[#4A574E] leading-relaxed">
                  Explore comprehensive information about major agricultural crops, growing cycles, and soil needs.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-[#204B34] group-hover:text-[#11281B]">
              <span>Browse crop library</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Crop Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173827]">
                Explore Crop Categories
              </h2>
              <p className="text-sm text-[#505F55] mt-1">
                Select a category to view specialized agronomy profiles, optimal soil profiles, and disease risks.
              </p>
            </div>
            <button
              onClick={onExploreCropsClick}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#193B28] hover:text-[#11281B] group self-start sm:self-auto cursor-pointer"
            >
              <span>Explore all crops</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CROP_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl overflow-hidden hover:border-[#A3C5A7] hover:shadow-md transition-all duration-200 cursor-pointer text-left"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-[#EAE6DA] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-3.5 bg-[#FCFAF6] flex items-center justify-between">
                  <span className="font-bold text-[#173827] text-sm group-hover:text-[#193B28]">
                    {cat.name}
                  </span>
                  <span className="text-xs text-[#7A8A7F] font-medium tabular-nums">
                    {cat.count} {cat.count === 1 ? 'crop' : 'crops'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clinical Pathology Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFECE3] border border-[#DCD5C6] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193B28] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#3B7E58]" />
                Featured Agronomic Case Study
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#142A1D]">
                Tomato Early Blight Diagnostic Guide
              </h3>
              <p className="text-sm sm:text-base text-[#46534B] leading-relaxed">
                Learn how to distinguish fungal concentric leaf ring spots from bacterial speck and nutritional deficiencies, and apply sustainable cultural controls.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenQuickDisease('early-blight-tomato')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#193B28] hover:bg-[#11281B] transition-colors cursor-pointer"
                >
                  <span>Read Early Blight Diagnosis</span>
                  <ArrowRight className="w-4 h-4 text-[#A3C5A7]" />
                </button>
                <button
                  onClick={onDiagnoseClick}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#193B28] bg-white border border-[#D5D0C3] hover:bg-[#F8F6F0] transition-colors cursor-pointer"
                >
                  Ask Assistant about Symptoms
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                onClick={() => onOpenQuickDisease('early-blight-tomato')}
                className="relative rounded-xl overflow-hidden border border-[#D5D0C3] bg-white shadow-xs group cursor-pointer"
              >
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src="/src/assets/images/disease_early_blight_1793973952649.jpg"
                    alt="Tomato Early Blight Leaf"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#173827]">Early Blight (Alternaria solani)</h4>
                    <p className="text-xs text-[#5D6D63]">Common fungal pathogen in solanaceous crops</p>
                  </div>
                  <span className="text-xs font-medium text-[#204B34] bg-[#E8EFE9] px-2.5 py-1 rounded-md">
                    92% Match Sample
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
