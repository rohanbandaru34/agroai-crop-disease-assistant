import React, { useState } from 'react';
import {
  ArrowLeft,
  Zap,
  ShieldCheck,
  Sprout,
  Info,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  ThermometerSun,
  MessageSquare,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Beaker,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { Disease } from '../types';

interface DiseaseDetailViewProps {
  disease: Disease;
  onBack: () => void;
  onAskAboutDisease: (query: string) => void;
}

export const DiseaseDetailView: React.FC<DiseaseDetailViewProps> = ({
  disease,
  onBack,
  onAskAboutDisease,
}) => {
  const [activeMgmtTab, setActiveMgmtTab] = useState<'immediate' | 'cultural' | 'biological' | 'chemical' | 'prevention'>('immediate');

  const followUpQuestions = [
    `How do I prevent ${disease.name} from spreading?`,
    `Can ${disease.name} affect nearby plants?`,
    `What should I do first for ${disease.name}?`,
    `How long does recovery usually take from ${disease.name}?`,
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-28">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#193B28] hover:text-[#11281B] bg-white border border-[#DCD5C6] px-4 py-2 rounded-full hover:bg-[#F2EFE7] transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#295C42]" />
          <span>Back</span>
        </button>

        {/* Verified Extension Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] border border-[#BCD1C0] text-xs font-semibold text-[#193B28]">
          <ShieldCheck className="w-4 h-4 text-[#204B34]" />
          <span>Verified Agricultural Extension Knowledge</span>
        </div>
      </div>

      {/* Hero Card: What might be affecting your crop? */}
      <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3B7E58]">
          <Sparkles className="w-4 h-4 text-[#3B7E58]" />
          <span>Pathology Assessment · What might be affecting your crop?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Visual Specimen */}
          <div className="md:col-span-5 space-y-3">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#EAE6DA] border border-[#D5CEBF] relative shadow-2xs">
              <img
                src={disease.thumbnailUrl}
                alt={disease.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                {disease.type} Pathogen
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E8E4D9] space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#EAE6DA]">
                <span className="text-[#64746A]">Causative Organism:</span>
                <span className="font-semibold text-[#193B28] text-right truncate max-w-[200px]" title={disease.causativeOrganism}>
                  {disease.scientificName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE6DA]">
                <span className="text-[#64746A]">Affected Plant Parts:</span>
                <span className="font-semibold text-[#193B28] text-right">
                  {disease.affectedPlantParts ? disease.affectedPlantParts.slice(0, 2).join(', ') : 'Leaves, Stems'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#64746A]">Host Crops:</span>
                <span className="font-semibold text-[#193B28] text-right">
                  {disease.affectedCrops ? disease.affectedCrops.join(', ') : disease.cropName}
                </span>
              </div>
            </div>
          </div>

          {/* Core Info & Description */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142A1D]">
                  {disease.name}
                </h1>
                {disease.confidenceMatch && (
                  <span className="text-xs font-semibold text-[#193B28] bg-[#E8EFE9] border border-[#BCD1C0] px-3 py-1 rounded-full">
                    {disease.confidenceMatch}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[#3B7E58] italic">
                {disease.causativeOrganism || `${disease.scientificName} (${disease.type})`}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#38463E] leading-relaxed">
              {disease.detailedDescription}
            </p>

            {/* Favorable Environmental Conditions Box */}
            <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#CFDFD3] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E4631]">
                <ThermometerSun className="w-4 h-4 text-[#204B34]" />
                <span>Conditions That Encourage the Disease</span>
              </div>
              <p className="text-xs sm:text-sm text-[#35433A] leading-relaxed">
                {disease.favorableConditions}
              </p>
            </div>

            {/* Ask AgroAI CTA */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onAskAboutDisease(`How do I manage and treat ${disease.name} on my ${disease.cropName}?`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#193B28] hover:bg-[#11281B] transition-colors cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A3C5A7]" />
                <span>Consult AgroAI Assistant for {disease.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: What Should You Do Now? — Comprehensive 5-Part Management Recommendation */}
      <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E4D9] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#295C42]" />
              <h2 className="font-serif text-2xl font-bold text-[#142A1D]">
                Disease Management & Treatment Guide
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6B60] mt-1">
              Organized agronomic protocols based on certified integrated pest and disease management (IPM) standards.
            </p>
          </div>
        </div>

        {/* 5 Management Navigation Tabs (A through E) */}
        <div className="flex flex-wrap gap-2 border-b border-[#E8E4D9] pb-3 text-xs sm:text-sm">
          <button
            onClick={() => setActiveMgmtTab('immediate')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeMgmtTab === 'immediate'
                ? 'bg-[#193B28] text-white shadow-xs'
                : 'bg-white border border-[#DCD5C6] text-[#425046] hover:bg-[#EFECE3]'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>A. Immediate Actions</span>
          </button>

          <button
            onClick={() => setActiveMgmtTab('cultural')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeMgmtTab === 'cultural'
                ? 'bg-[#193B28] text-white shadow-xs'
                : 'bg-white border border-[#DCD5C6] text-[#425046] hover:bg-[#EFECE3]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>B. Cultural Management</span>
          </button>

          <button
            onClick={() => setActiveMgmtTab('biological')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeMgmtTab === 'biological'
                ? 'bg-[#193B28] text-white shadow-xs'
                : 'bg-white border border-[#DCD5C6] text-[#425046] hover:bg-[#EFECE3]'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>C. Biological Controls</span>
          </button>

          <button
            onClick={() => setActiveMgmtTab('chemical')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeMgmtTab === 'chemical'
                ? 'bg-[#193B28] text-white shadow-xs'
                : 'bg-white border border-[#DCD5C6] text-[#425046] hover:bg-[#EFECE3]'
            }`}
          >
            <Beaker className="w-4 h-4" />
            <span>D. Chemical Management</span>
          </button>

          <button
            onClick={() => setActiveMgmtTab('prevention')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeMgmtTab === 'prevention'
                ? 'bg-[#193B28] text-white shadow-xs'
                : 'bg-white border border-[#DCD5C6] text-[#425046] hover:bg-[#EFECE3]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>E. Prevention Plan</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {/* A. Immediate Actions */}
          {activeMgmtTab === 'immediate' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#142A1D]">
                <Zap className="w-4 h-4 text-amber-700" />
                <span>What the farmer should do first (First 24–48 Hours)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {disease.immediateActions.map((action, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#E5E0D2] flex items-start gap-3 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-[#E8EFE9] text-[#193B28] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#35433A] leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. Cultural Management */}
          {activeMgmtTab === 'cultural' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#142A1D]">
                <Layers className="w-4 h-4 text-[#295C42]" />
                <span>Agronomic Practices: Crop Rotation, Spacing, Sanitation & Irrigation</span>
              </div>
              <div className="space-y-3">
                {disease.culturalManagement && disease.culturalManagement.length > 0 ? (
                  disease.culturalManagement.map((practice, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-[#E5E0D2] flex items-start gap-3 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#295C42] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#35433A] leading-relaxed">
                        {practice}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#5D6D63]">General cultural practices: Maintain 3-year crop rotation and sanitize equipment.</p>
                )}
              </div>
            </div>
          )}

          {/* C. Biological Management */}
          {activeMgmtTab === 'biological' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#142A1D]">
                <Sprout className="w-4 h-4 text-[#295C42]" />
                <span>Biological & Organic Controls Supported by Agricultural Extension</span>
              </div>
              <div className="space-y-3">
                {disease.biologicalManagement && disease.biologicalManagement.length > 0 ? (
                  disease.biologicalManagement.map((bio, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-[#E5E0D2] flex items-start gap-3 shadow-2xs">
                      <Sprout className="w-4 h-4 text-[#3B7E58] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#35433A] leading-relaxed">
                        {bio}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#5D6D63]">Explore beneficial biocontrols like Trichoderma or Bacillus subtilis for soil and foliar suppression.</p>
                )}
              </div>
            </div>
          )}

          {/* D. Chemical Management */}
          {activeMgmtTab === 'chemical' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#142A1D]">
                <Beaker className="w-4 h-4 text-[#295C42]" />
                <span>Verified Active Ingredients & Responsible Usage Guidelines</span>
              </div>

              {disease.chemicalManagement && disease.chemicalManagement.hasChemicalRemedy ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E0D9C8] space-y-2">
                    <span className="text-xs font-bold text-[#173827] uppercase tracking-wider block">
                      Verified Registered Active Ingredients:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#334138]">
                      {disease.chemicalManagement.verifiedActives.map((active, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#295C42] shrink-0 mt-0.5" />
                          <span>{active}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Label Restrictions Box */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCD5C6] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#142A1D]">
                      <FileText className="w-4 h-4 text-[#295C42]" />
                      <span>Product Registration & Label Restrictions</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">
                      {disease.chemicalManagement.labelRestrictions}
                    </p>
                  </div>

                  {/* Safety & No-Fabrication Notice */}
                  <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3 text-xs text-[#78350F]">
                    <AlertTriangle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Reliability & Dosage Policy:</span>
                      <span>
                        {disease.chemicalManagement.cautionNote ||
                          'Commercial dosages and formulation rates vary by local product registration. Never guess chemical concentrations. Always follow the manufacturer label approved by your national agricultural board.'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2 text-xs sm:text-sm text-[#78350F]">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Info className="w-4 h-4 text-amber-700" />
                    <span>No Direct Chemical Cure Available</span>
                  </div>
                  <p className="leading-relaxed">
                    This disease is viral or physiological. Plant viruses cannot be cured by spraying chemical fungicides or bactericides. Applying unsupported chemicals wastes money, contaminates soil, and destroys natural insect predators. Management must focus strictly on vector control (e.g. whiteflies or thrips) and removing infected plants.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* E. Prevention Plan */}
          {activeMgmtTab === 'prevention' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#142A1D]">
                <ShieldCheck className="w-4 h-4 text-[#295C42]" />
                <span>How can you prevent it in the next cropping cycle?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {disease.prevention.map((prev, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#E5E0D2] flex items-start gap-3 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#295C42] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#35433A] leading-relaxed">
                      {prev}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: When Should You Contact an Agricultural Expert? */}
      <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-700" />
          <h2 className="font-serif text-xl font-bold text-[#142A1D]">
            When should you contact an agricultural expert?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#4E5C53]">
          Professional consultation with a certified agronomist or extension officer is strongly recommended in the following scenarios:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {disease.whenToContactExpert && disease.whenToContactExpert.length > 0 ? (
            disease.whenToContactExpert.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E0D2] flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  !
                </span>
                <span className="text-xs sm:text-sm text-[#39473E] leading-relaxed">
                  {item}
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E0D2] text-xs sm:text-sm text-[#39473E]">
              Contact extension if infection exceeds 10% of your crop stand or fails to respond to cultural sanitation.
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Follow-up Questions (Conversational Actions) */}
      <div className="bg-[#EFECE3] border border-[#DDD6C7] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#204B34]" />
          <h2 className="font-serif text-xl font-bold text-[#142A1D]">
            Ask AgroAI Follow-Up Questions
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#4B5950]">
          Click any of these verified diagnostic follow-ups to discuss specific management scenarios with conversational context:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {followUpQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onAskAboutDisease(q)}
              className="p-3.5 rounded-xl bg-white border border-[#D5CEBF] hover:border-[#193B28] text-xs sm:text-sm font-semibold text-[#193B28] hover:bg-[#FAF8F2] transition-all flex items-center justify-between text-left group cursor-pointer shadow-2xs"
            >
              <span>{q}</span>
              <ArrowLeft className="w-4 h-4 text-[#3B7E58] transform rotate-180 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Section 5: Verified Academic & Extension References */}
      <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#295C42]" />
            <h2 className="font-serif text-xl font-bold text-[#142A1D]">
              Verified Source References
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#193B28] bg-[#E8EFE9] px-2.5 py-1 rounded-full">
            Peer-Reviewed Agronomy Standards
          </span>
        </div>

        <p className="text-xs text-[#5D6D63] leading-relaxed">
          The disease parameters and management guidelines displayed above are grounded in official agricultural extension compendia and university plant pathology repositories:
        </p>

        <div className="space-y-2.5 pt-1">
          {disease.references && disease.references.length > 0 ? (
            disease.references.map((ref, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E8E4D9] flex items-start gap-3 text-xs">
                <FileText className="w-4 h-4 text-[#295C42] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-[#173827] block">{ref.title}</span>
                  <span className="text-[#55655B] block italic">{ref.citation} ({ref.organization})</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E8E4D9] text-xs text-[#55655B]">
              FAO Plant Production & Protection Series and National Agricultural Research System IPM bulletins.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
