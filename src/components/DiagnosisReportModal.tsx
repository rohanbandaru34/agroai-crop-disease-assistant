import React from 'react';
import { X, Printer, ShieldCheck, Sprout, BookOpen, Calendar, AlertCircle } from 'lucide-react';
import { Disease } from '../types';
import { DISEASES } from '../data/cropsData';

interface DiagnosisReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  diseaseId?: string;
  cropName?: string;
  symptoms?: string[];
  assessmentText?: string;
  dateStr?: string;
}

export const DiagnosisReportModal: React.FC<DiagnosisReportModalProps> = ({
  isOpen,
  onClose,
  diseaseId,
  cropName = 'Tomato',
  symptoms = ['Foliar spots', 'Yellow halo', 'Concentric rings'],
  assessmentText,
  dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
}) => {
  if (!isOpen) return null;

  const disease: Disease | undefined = diseaseId ? DISEASES[diseaseId] : undefined;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#DCD5C6] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col print:shadow-none print:border-none">
        {/* Modal Header / Toolbar */}
        <div className="px-6 py-4 bg-[#FAF8F2] border-b border-[#E7E2D5] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#193B28] text-white flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#88C498]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#142A1D]">
                AgroAI Official Diagnosis & Management Report
              </h3>
              <span className="text-xs text-[#637267]">
                Generated on {dateStr}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#193B28] hover:bg-[#11281B] transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#A3C5A7]" />
              <span>Download / Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#526257] hover:bg-[#EFECE3] rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Body (Optimized for both screen and print) */}
        <div className="p-8 space-y-6 text-[#1E2822] bg-white print:p-0">
          {/* Report Letterhead Header */}
          <div className="border-b border-[#204B34] pb-6 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#173827]">AgroAI</span>
                <span className="text-xs font-semibold text-[#193B28] bg-[#E8EFE9] px-2 py-0.5 rounded">
                  Official Extension Report
                </span>
              </div>
              <p className="text-xs text-[#526257]">
                Advanced Crop Pathology & Integrated Pest Management Advisory
              </p>
            </div>
            <div className="text-right text-xs text-[#526257] space-y-0.5">
              <div><strong>Assessment Date:</strong> {dateStr}</div>
              <div><strong>System Version:</strong> AgroAI v3.8 Gemini Pro</div>
            </div>
          </div>

          {/* 1. Crop & Observation Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F2] border border-[#E5E0D2] rounded-xl text-xs">
            <div>
              <span className="text-[#68786E] block font-medium">Target Crop:</span>
              <strong className="text-[#142A1D] text-sm">{cropName}</strong>
            </div>
            <div>
              <span className="text-[#68786E] block font-medium">Primary Condition:</span>
              <strong className="text-[#142A1D] text-sm">{disease?.name || 'Foliar Pathology Assessment'}</strong>
            </div>
            <div>
              <span className="text-[#68786E] block font-medium">Pathogen Type:</span>
              <strong className="text-[#142A1D] text-sm">{disease?.type || 'Fungal / Environmental'}</strong>
            </div>
          </div>

          {/* Reported Symptoms */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#193B28]">
              Reported Symptoms & Visual Observations
            </h4>
            <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#D0E2D4] text-xs sm:text-sm text-[#35433A]">
              <ul className="list-disc pl-5 space-y-1">
                {symptoms.map((sym, i) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Possible Disease & Assessment Explanation */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#193B28]">
              Diagnosis Assessment & Pathology Explanation
            </h4>
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E0D2] text-xs sm:text-sm text-[#38463E] leading-relaxed whitespace-pre-line">
              {assessmentText || disease?.detailedDescription || disease?.summary || 'Based on symptom pattern analysis, the plant exhibits signs consistent with pathogenic infection. Field inspection is recommended.'}
            </div>
          </div>

          {/* Management Recommendations (A through E) */}
          {disease && (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#193B28]">
                Management Recommendations (Integrated Pest Management)
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-white border border-[#E5E0D2] space-y-1.5">
                  <span className="font-bold text-[#142A1D] block">A. Immediate Actions (First 24–48 Hours):</span>
                  <ul className="list-disc pl-5 space-y-1 text-[#35433A]">
                    {disease.immediateActions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E0D2] space-y-1.5">
                  <span className="font-bold text-[#142A1D] block">B. Cultural Management (Spacing, Sanitation, Irrigation):</span>
                  <ul className="list-disc pl-5 space-y-1 text-[#35433A]">
                    {disease.culturalManagement.map((cm, i) => (
                      <li key={i}>{cm}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E0D2] space-y-1.5">
                  <span className="font-bold text-[#142A1D] block">C. Biological Controls:</span>
                  <ul className="list-disc pl-5 space-y-1 text-[#35433A]">
                    {disease.biologicalManagement.map((bm, i) => (
                      <li key={i}>{bm}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E0D2] space-y-1.5">
                  <span className="font-bold text-[#142A1D] block">D. Chemical Management & Label Restrictions:</span>
                  <p className="text-[#35433A]">
                    {disease.chemicalManagement.hasChemicalRemedy
                      ? `Verified Actives: ${disease.chemicalManagement.verifiedActives.join('; ')}. ${disease.chemicalManagement.labelRestrictions}`
                      : 'Viral or physiological condition; no direct chemical cure exists. Focus strictly on vector suppression and sanitation.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E0D2] space-y-1.5">
                  <span className="font-bold text-[#142A1D] block">E. Prevention Plan for Next Cycle:</span>
                  <ul className="list-disc pl-5 space-y-1 text-[#35433A]">
                    {disease.prevention.map((prev, i) => (
                      <li key={i}>{prev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reference Sources */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#193B28]">
              Reference Sources & Verification Standards
            </h4>
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E0D2] text-xs text-[#526257] space-y-1">
              {disease?.references && disease.references.length > 0 ? (
                disease.references.map((ref, i) => (
                  <div key={i}>
                    <strong>{ref.title}</strong> — {ref.citation} ({ref.organization})
                  </div>
                ))
              ) : (
                <div>FAO Plant Protection Series & University Agricultural Extension IPM Compendia.</div>
              )}
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-4 border-t border-[#E5E0D2] text-[11px] text-[#637267] flex items-center justify-between">
            <span>AgroAI Decision Support System · Confidential Agricultural Report</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
