import React from 'react';
import { X, Sprout, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDiagnosis: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onStartDiagnosis,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FCFAF6] border border-[#DDD6C8] rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E4D9] flex items-center justify-between bg-[#FAF8F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#193B28] text-white flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#88C498]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#142A1D]">
              About AgroAI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#617166] hover:text-[#173827] hover:bg-[#EAE6DB] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Subtle line art image banner from user attachment */}
          <div className="rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5DFD1] p-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-32 h-24 sm:w-40 sm:h-28 shrink-0 overflow-hidden rounded-lg bg-white border border-[#E0D9C8]">
              <img
                src="/assets/aistudio/image_6a5f6119.png"
                alt="Botanical sprouting plant illustration"
                className="w-full h-full object-contain p-2"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-serif text-lg font-bold text-[#173827]">
                Empowering Sustainable Agriculture
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">
                AgroAI merges plant pathology fundamentals with conversational intelligence to help growers prevent crop loss early, accurately, and responsibly.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#38463E] leading-relaxed">
            <h4 className="font-bold text-[#173827] text-base">Our Core Principles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-[#FAF8F2] p-3.5 rounded-xl border border-[#E7E2D5] space-y-1.5">
                <ShieldCheck className="w-5 h-5 text-[#295C42]" />
                <h5 className="font-bold text-xs text-[#173827]">Prevention-First</h5>
                <p className="text-[11px] text-[#55655B]">
                  Cultural controls like spacing and mulch before expensive sprays.
                </p>
              </div>

              <div className="bg-[#FAF8F2] p-3.5 rounded-xl border border-[#E7E2D5] space-y-1.5">
                <BookOpen className="w-5 h-5 text-[#295C42]" />
                <h5 className="font-bold text-xs text-[#173827]">Agronomic Rigor</h5>
                <p className="text-[11px] text-[#55655B]">
                  Taxonomically grounded in plant pathology literature and extension standards.
                </p>
              </div>

              <div className="bg-[#FAF8F2] p-3.5 rounded-xl border border-[#E7E2D5] space-y-1.5">
                <HeartHandshake className="w-5 h-5 text-[#295C42]" />
                <h5 className="font-bold text-xs text-[#173827]">Accessible to All</h5>
                <p className="text-[11px] text-[#55655B]">
                  Designed for smallholder farmers, backyard growers, and agronomists alike.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFECE3] p-4 rounded-xl text-xs text-[#4E5C53] space-y-1 border border-[#DDD6C8]">
            <span className="font-bold text-[#173827] block">Agricultural Extension Advisory</span>
            <p>
              AgroAI assists in initial field identification and cultural mitigation. When considering restricted chemical interventions, always consult your regional agricultural extension agent and review local pesticide laws.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E4D9] bg-[#FAF8F2] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-[#46544B] hover:text-[#173827] cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartDiagnosis();
            }}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#193B28] rounded-full hover:bg-[#11281B] transition-colors cursor-pointer shadow-xs"
          >
            Try Disease Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
