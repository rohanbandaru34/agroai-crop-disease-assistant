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
} from 'lucide-react';
import { Crop } from '../types';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'diseases' | 'pests' | 'prevention'>('overview');

  const defaultAskQuery = `I need agronomic advice for my ${crop.name} (${crop.botanicalName}) crop. What are the key disease and pest risks to watch out for right now?`;

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
          {/* Crop Photograph */}
          <div className="md:col-span-5 relative bg-[#EAE6DA] min-h-[300px] md:min-h-full">
            <img
              src={crop.imageUrl}
              alt={crop.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
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
                  Crop Profile & Pathology Guide
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

      {/* Internal Navigation Anchor Tabs */}
      <div className="flex border-b border-[#E0DBCF] gap-2 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none pb-0.5">
        {[
          { id: 'overview', label: 'Overview & Requirements' },
          { id: 'diseases', label: `Common Diseases (${crop.commonDiseases?.length || crop.keyDiseases?.length || 0})` },
          { id: 'pests', label: `Common Pests (${crop.commonPests?.length || 0})` },
          { id: 'prevention', label: 'Preventive Practices' },
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

      {/* Tab 1: Overview & Growing Requirements */}
      {activeTab === 'overview' && (
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
                    {crop.climateRequirements?.rainfall || '500–800 mm uniformly distributed across growth stages'}
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
                    {crop.soilRequirements?.drainage || 'Excellent internal and surface drainage required; avoid waterlogging'}
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

          {/* Agronomy Quick Field Tips */}
          {crop.agronomyTips && crop.agronomyTips.length > 0 && (
            <div className="bg-[#FAF8F2] border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#173827]">
                <Sparkles className="w-5 h-5 text-[#295C42]" />
                <h3 className="font-serif text-lg font-bold">Field Agronomy Best Practices</h3>
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

      {/* Tab 2: Common Diseases */}
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

      {/* Tab 3: Common Pests */}
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

                  <div className="pt-1">
                    <button
                      onClick={() =>
                        onAskAboutCrop(`What are the economic threshold levels and organic controls for ${pest.name} in ${crop.name}?`)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193B28] hover:underline cursor-pointer"
                    >
                      <span>Consult AgroAI on {pest.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
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

      {/* Tab 4: Disease Prevention Information */}
      {activeTab === 'prevention' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#204B34]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1D]">
              Preventive Practices & Cultural Plant Health for {crop.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crop.preventivePractices && crop.preventivePractices.length > 0 ? (
              crop.preventivePractices.map((prev, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E0D2] rounded-xl p-4.5 flex items-start gap-3.5 shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E8EFE9] text-[#193B28] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-[#38483E] leading-relaxed">
                    {prev}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-6 rounded-xl bg-white border border-[#E5E0D2] text-sm text-[#546459]">
                Standard preventive practices include using certified disease-free seeds and rotating crops with non-host species.
              </div>
            )}
          </div>

          {/* Deep Consult CTA box */}
          <div className="p-6 rounded-2xl bg-[#EFECE3] border border-[#DDD6C7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-base font-bold text-[#142A1D]">
                Need a customized seasonal prevention schedule for your {crop.name} acreage?
              </h4>
              <p className="text-xs text-[#526257]">
                Ask AgroAI for weather-adapted fungicide timing, organic soil amendments, or certified resistant varieties.
              </p>
            </div>
            <button
              onClick={() => onAskAboutCrop(defaultAskQuery)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#193B28] hover:bg-[#11281B] transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#A3C5A7]" />
              <span>Ask AgroAI about this crop</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
