import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Layers,
  Droplets,
  Clock,
  Thermometer,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  CheckCircle,
  Bug,
  ShieldCheck,
  Sun,
  CloudRain,
  ExternalLink,
  ChevronRight,
  Sprout,
  Info,
  BookOpen,
  Scissors,
  AlertCircle,
} from 'lucide-react';
import { Crop } from '../types';
import { CropImage } from './CropImage';

interface CropDetailViewProps {
  crop: Crop;
  onBack: () => void;
  onAskAboutCrop: (query: string) => void;
  onSelectDisease: (diseaseId: string) => void;
}

export const CropDetailView: React.FC<CropDetailViewProps> = ({
  crop,
  onBack,
  onAskAboutCrop,
  onSelectDisease,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'conditions' | 'cultivation' | 'growth' | 'diseases' | 'pests' | 'deficiencies' | 'harvest'
  >('overview');

  const defaultAskQuery = `I need agronomic advice for my ${crop.name} (${crop.botanicalName}) crop. What are the key disease, pest, and fertilization recommendations?`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-28">
      {/* Top Bar with Navigation & Extension Verification Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#193B28] hover:text-[#11281B] bg-white border border-[#DCD5C6] px-4 py-2 rounded-full hover:bg-[#F2EFE7] transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#295C42]" />
          <span>Back to Crop Library</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] border border-[#BCD1C0] text-xs font-semibold text-[#193B28]">
          <ShieldCheck className="w-4 h-4 text-[#204B34]" />
          <span>Verified Extension Agronomic Profile</span>
        </div>
      </div>

      {/* Hero Showcase Card */}
      <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Crop Photograph with Independent Attribution */}
          <div className="md:col-span-5 relative bg-[#EAE6DA] min-h-[300px] md:min-h-full flex flex-col justify-between">
            <CropImage
              crop={crop}
              className="w-full h-full object-cover min-h-[280px]"
              containerClassName="w-full h-full relative flex flex-col justify-between"
              showAttribution={true}
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
              <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
                {crop.category}
              </span>
            </div>
          </div>

          {/* Core Crop Details & Primary CTA */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B7E58]">
                  Comprehensive Agronomy & Pathology Repository
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142A1D] mt-1">
                  {crop.name}
                </h1>
                <p className="text-sm italic font-medium text-[#486351] mt-0.5">
                  {crop.botanicalName}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#38473D] leading-relaxed">
                {crop.detailedOverview || crop.shortDescription}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E8E4D9] text-xs">
              <div className="bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E4D9] space-y-1">
                <span className="text-[#68786E] flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#295C42]" />
                  Growing Season
                </span>
                <span className="font-bold text-[#173827] block truncate" title={crop.growingSeason}>
                  {crop.growingSeason.split('(')[0]}
                </span>
              </div>

              <div className="bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E4D9] space-y-1">
                <span className="text-[#68786E] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#295C42]" />
                  Crop Duration
                </span>
                <span className="font-bold text-[#173827] block truncate">
                  {crop.harvestWindowDays}
                </span>
              </div>

              <div className="bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E4D9] space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[#68786E] flex items-center gap-1 font-medium">
                  <Thermometer className="w-3.5 h-3.5 text-[#295C42]" />
                  Optimum Temp
                </span>
                <span className="font-bold text-[#173827] block truncate">
                  {crop.climateRequirements?.temperature?.split('(')[0] || crop.temperatureRange || '20°C–30°C'}
                </span>
              </div>
            </div>

            {/* Primary Required Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onAskAboutCrop(defaultAskQuery)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#193B28] hover:bg-[#11281B] transition-transform active:scale-98 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A3C5A7]" />
                <span>Ask AgroAI about this crop</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Anchor Tabs (8 Comprehensive Sections) */}
      <div className="flex border-b border-[#E0DBCF] gap-2 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none pb-0.5">
        {[
          { id: 'overview', label: '1. Overview' },
          { id: 'conditions', label: '2. Growing Conditions' },
          { id: 'cultivation', label: '3. Cultivation Guide' },
          { id: 'growth', label: '4. Growth Stages' },
          { id: 'diseases', label: `5. Diseases (${crop.commonDiseases?.length || crop.keyDiseases?.length || 0})` },
          { id: 'pests', label: `6. Pests (${crop.commonPests?.length || 0})` },
          { id: 'deficiencies', label: '7. Nutrient Deficiencies' },
          { id: 'harvest', label: '8. Harvesting' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap transition-colors cursor-pointer border-b-2 px-1 ${
              activeTab === tab.id
                ? 'border-[#193B28] text-[#193B28]'
                : 'border-transparent text-[#64746A] hover:text-[#193B28]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#173827]">
              <BookOpen className="w-5 h-5 text-[#295C42]" />
              <h3 className="font-serif text-xl font-bold">Crop Overview & Economic Importance</h3>
            </div>
            <p className="text-sm sm:text-base text-[#3E4D43] leading-relaxed">
              {crop.detailedOverview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE6DA]">
              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="text-xs uppercase font-bold text-[#68786E]">Botanical Family & Name</span>
                <p className="font-serif font-bold text-[#142A1D]">{crop.name} ({crop.botanicalName})</p>
              </div>
              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="text-xs uppercase font-bold text-[#68786E]">Agronomic Category</span>
                <p className="font-serif font-bold text-[#142A1D]">{crop.category}</p>
              </div>
            </div>
          </div>

          {crop.agronomyTips && crop.agronomyTips.length > 0 && (
            <div className="bg-[#FAF8F2] border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#173827]">
                <Sparkles className="w-5 h-5 text-[#295C42]" />
                <h3 className="font-serif text-lg font-bold">Key Agronomic Highlights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {crop.agronomyTips.map((tip, idx) => (
                  <div key={idx} className="bg-white border border-[#E5E0D2] rounded-xl p-4 space-y-2 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-[#E8EFE9] text-[#193B28] flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#3E4D43] leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Growing Conditions */}
      {activeTab === 'conditions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Climate Requirements */}
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#173827]">
                <Sun className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-lg font-bold">Climate Requirements</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#3E4C42]">
                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Temperature Profile:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.climateRequirements?.temperature || crop.temperatureRange || '20°C to 30°C optimal range'}
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Rainfall & Precipitation:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.climateRequirements?.rainfall || '500–800 mm uniformly distributed'}
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Sunshine & Photoperiod:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.climateRequirements?.sunshine || '6–8 hours daily direct sunlight'}
                  </p>
                </div>

                {crop.climateRequirements?.relativeHumidity && (
                  <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                    <span className="font-bold text-[#142A1D] block">Canopy Humidity Sensitivity:</span>
                    <p className="text-[#4E5D53] leading-relaxed">
                      {crop.climateRequirements.relativeHumidity}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Soil Requirements */}
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#173827]">
                <Layers className="w-5 h-5 text-[#295C42]" />
                <h3 className="font-serif text-lg font-bold">Soil Requirements</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#3E4C42]">
                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Ideal Soil Texture & Structure:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.soilRequirements?.type || crop.idealSoil || 'Well-aerated fertile loam with organic humus'}
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Optimal pH Range:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.soilRequirements?.phRange || '6.0–7.0 (Neutral to slightly acidic)'}
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                  <span className="font-bold text-[#142A1D] block">Drainage & Aeration:</span>
                  <p className="text-[#4E5D53] leading-relaxed">
                    {crop.soilRequirements?.drainage || 'Excellent internal and surface drainage required'}
                  </p>
                </div>

                {crop.soilRequirements?.organicMatter && (
                  <div className="p-3.5 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                    <span className="font-bold text-[#142A1D] block">Organic Manuring:</span>
                    <p className="text-[#4E5D53] leading-relaxed">
                      {crop.soilRequirements.organicMatter}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Water Requirements Bar */}
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-[#173827]">
              <Droplets className="w-5 h-5 text-[#204B34]" />
              <h3 className="font-serif text-lg font-bold">Water Requirements & Critical Irrigation Stages</h3>
            </div>
            <p className="text-sm text-[#46544B] leading-relaxed">
              {crop.waterRequirement}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Cultivation Guide */}
      {activeTab === 'cultivation' && (
        <div className="space-y-6">
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#173827]">
              <Sprout className="w-5 h-5 text-[#295C42]" />
              <h3 className="font-serif text-xl font-bold">Cultivation & Field Management Practices</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="font-bold text-[#142A1D] block">Growing Season & Sowing Window:</span>
                <p className="text-[#4E5D53]">{crop.growingSeason}</p>
              </div>
              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="font-bold text-[#142A1D] block">Crop Duration to Maturity:</span>
                <p className="text-[#4E5D53]">{crop.harvestWindowDays}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#193B28]">
                Recommended Preventive & Cultural Practices:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {crop.preventivePractices && crop.preventivePractices.length > 0 ? (
                  crop.preventivePractices.map((prev, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E0D2] rounded-xl p-4 flex items-start gap-3 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-[#E8EFE9] text-[#193B28] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-[#38483E] leading-relaxed">{prev}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 p-4 bg-white border border-[#E5E0D2] rounded-xl text-xs text-[#526257]">
                    Follow certified seed dressing and balanced NPK fertilizer recommendations based on local soil testing.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Growth Stages */}
      {activeTab === 'growth' && (
        <div className="space-y-6">
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#173827]">
              <Clock className="w-5 h-5 text-[#295C42]" />
              <h3 className="font-serif text-xl font-bold">Crop Lifecycle & Growth Stages</h3>
            </div>

            <div className="space-y-4">
              {[
                { stage: '1. Sowing & Germination', desc: 'Seed imbibition, radicle emergence, and seedling establishment.' },
                { stage: '2. Vegetative Growth & Tillering', desc: 'Rapid leaf canopy expansion, root branching, and structural biomass accumulation.' },
                { stage: '3. Flowering & Pollination', desc: 'Inflorescence emergence, anthesis, and fertilization. Critical moisture sensitivity.' },
                { stage: '4. Fruiting / Grain Formation', desc: 'Nutrient translocation, pod or grain filling, and dry matter accumulation.' },
                { stage: '5. Maturity & Harvesting', desc: 'Moisture dry-down, physiological maturity, and optimum harvest readiness.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white border border-[#E5E0D2] rounded-xl flex items-start gap-4 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#193B28] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#142A1D]">{item.stage}</h4>
                    <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Common Diseases */}
      {activeTab === 'diseases' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1D]">
                Common Diseases Affecting {crop.name}
              </h2>
            </div>
            <span className="text-xs text-[#6B7C71] font-medium hidden sm:inline">
              Evidence-based Plant Pathology
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crop.commonDiseases && crop.commonDiseases.length > 0 ? (
              crop.commonDiseases.map((dis, idx) => (
                <div
                  key={idx}
                  className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-3 shadow-2xs hover:border-[#BCD1C0] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base text-[#142A1D]">
                        {dis.name}
                      </h4>
                      {dis.scientificName && (
                        <p className="text-xs italic text-[#3B7E58]">
                          {dis.scientificName}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-[#193B28] bg-[#E8EFE9] border border-[#C5D8C8] px-2.5 py-0.5 rounded-full shrink-0">
                      {dis.type}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">
                    {dis.symptoms}
                  </p>

                  <div className="pt-2 border-t border-[#EFECE3] flex items-center justify-between gap-2">
                    {dis.diseaseId ? (
                      <button
                        onClick={() => onSelectDisease(dis.diseaseId!)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#193B28] hover:text-[#11281B] cursor-pointer"
                      >
                        <span>Open 5-Part Management Guide</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#3B7E58]" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onAskAboutCrop(`How do I prevent and manage ${dis.name} on my ${crop.name} crop?`)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#193B28] hover:text-[#11281B] cursor-pointer"
                      >
                        <span>Ask Assistant about {dis.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#3B7E58]" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-6 rounded-xl bg-white border border-[#E5E0D2] text-sm text-[#546459]">
                Detailed disease compendium entries for {crop.name} are available via the AgroAI Diagnostic Assistant.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Common Pests */}
      {activeTab === 'pests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bug className="w-5 h-5 text-amber-800" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1D]">
                Common Pests & Insect Management for {crop.name}
              </h2>
            </div>
            <span className="text-xs text-[#6B7C71] font-medium hidden sm:inline">
              Integrated Pest Management (IPM)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {crop.commonPests && crop.commonPests.length > 0 ? (
              crop.commonPests.map((pest, idx) => (
                <div
                  key={idx}
                  className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-3.5 shadow-2xs hover:border-[#BCD1C0] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-[#EAE6DA] pb-2.5">
                    <div>
                      <h4 className="font-bold text-base text-[#142A1D]">
                        {pest.name}
                      </h4>
                      {pest.scientificName && (
                        <p className="text-xs italic text-[#4B7057]">
                          {pest.scientificName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full shrink-0">
                      Insect Pest
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-[#193B28] uppercase tracking-wider block">
                      Damage Symptoms:
                    </span>
                    <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">
                      {pest.damageSymptoms}
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                    <span className="text-xs font-bold text-[#142A1D] block">
                      IPM Control & Management:
                    </span>
                    <p className="text-xs text-[#3E4C42] leading-relaxed">
                      {pest.management}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-6 rounded-xl bg-white border border-[#E5E0D2] text-sm text-[#546459]">
                Pest scouting guidelines for {crop.name} are available through the AgroAI assistant.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 7: Nutrient Deficiencies */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1D]">
              Nutrient Deficiencies & Physiological Disorders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-2 shadow-2xs">
              <h4 className="font-bold text-sm text-[#142A1D]">Nitrogen (N) Deficiency</h4>
              <p className="text-xs sm:text-sm text-[#4E5C53]">Uniform pale yellowing (chlorosis) of older leaves due to impaired protein synthesis. Corrective measure: Apply split doses of urea or ammonium sulfate.</p>
            </div>
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-2 shadow-2xs">
              <h4 className="font-bold text-sm text-[#142A1D]">Phosphorus (P) Deficiency</h4>
              <p className="text-xs sm:text-sm text-[#4E5C53]">Stunted growth with dark green or purplish discoloration on older leaves and stems. Corrective measure: Apply basal single superphosphate (SSP).</p>
            </div>
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-2 shadow-2xs">
              <h4 className="font-bold text-sm text-[#142A1D]">Potassium (K) Deficiency</h4>
              <p className="text-xs sm:text-sm text-[#4E5C53]">Marginal chlorosis and scorching (firing) on older leaves. Corrective measure: Apply muriate of potash or foliar spray 1% KNO3.</p>
            </div>
            <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-5 space-y-2 shadow-2xs">
              <h4 className="font-bold text-sm text-[#142A1D]">Zinc (Zn) Deficiency</h4>
              <p className="text-xs sm:text-sm text-[#4E5C53]">Interveinal chlorosis, shortened internodes (rosetting), and small mottled leaves. Corrective measure: Foliar spray of 0.5% zinc sulfate.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: Harvesting */}
      {activeTab === 'harvest' && (
        <div className="space-y-6">
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#173827]">
              <Scissors className="w-5 h-5 text-[#295C42]" />
              <h3 className="font-serif text-xl font-bold">Harvesting Indicators & Post-Harvest Handling</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#3E4C42]">
              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="font-bold text-[#142A1D] block">Crop Duration:</span>
                <p className="text-[#4E5D53]">{crop.harvestWindowDays}</p>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="font-bold text-[#142A1D] block">Maturity Indicators:</span>
                <p className="text-[#4E5D53]">Physiological maturity is reached when grain/fruit moisture drops to optimum levels, color changes uniformly, and abscission layers form.</p>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D2] rounded-xl space-y-1">
                <span className="font-bold text-[#142A1D] block">Post-Harvest Storage & Handling:</span>
                <p className="text-[#4E5D53]">Sun-dry produce to safe storage moisture limits (10%–12% for grains/pulses) before bagging in hermetic Purdue bags or clean silos to prevent insect weevil damage.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
