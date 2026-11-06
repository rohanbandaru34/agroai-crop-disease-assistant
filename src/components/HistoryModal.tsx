import React from 'react';
import { X, Clock, Trash2, ArrowRight, Sprout, Calendar, Stethoscope } from 'lucide-react';
import { ChatMessage } from '../types';

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  cropName?: string;
  diseaseName?: string;
  messages: ChatMessage[];
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historyItems,
  onSelectHistoryItem,
  onDeleteHistoryItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#DCD5C6] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F2] border-b border-[#E7E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#193B28] text-white flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#88C498]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#142A1D]">
                Diagnosis History & Past Sessions
              </h3>
              <span className="text-xs text-[#637267]">
                Review previous disease assessments and management recommendations
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#526257] hover:bg-[#EFECE3] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          {historyItems.length > 0 ? (
            <div className="space-y-3">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-xl p-4 hover:border-[#295C42] transition-all flex items-center justify-between gap-4 group"
                >
                  <div
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="space-y-1 flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#142A1D] group-hover:text-[#193B28] transition-colors">
                        {item.title}
                      </h4>
                      {item.diseaseName && (
                        <span className="text-[10px] font-semibold text-[#193B28] bg-[#E8EFE9] px-2 py-0.5 rounded-full">
                          {item.diseaseName}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#637267]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#295C42]" />
                        {item.timestamp}
                      </span>
                      <span>·</span>
                      <span>{item.messages.length} messages</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectHistoryItem(item);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#193B28] text-white hover:bg-[#11281B] transition-colors cursor-pointer flex items-center gap-1"
                      title="Resume session"
                    >
                      <span>Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="p-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAE6DA] text-[#637267] flex items-center justify-center mx-auto">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#142A1D]">
                No previous diagnosis history
              </h4>
              <p className="text-xs text-[#526257] max-w-sm mx-auto">
                Completed symptom checks and consultations with AgroAI will be saved here automatically for your review.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {historyItems.length > 0 && (
          <div className="px-6 py-3 bg-[#FAF8F2] border-t border-[#E7E2D5] flex justify-between items-center text-xs">
            <span className="text-[#637267]">{historyItems.length} saved sessions</span>
            <button
              onClick={onClearAll}
              className="text-red-700 hover:underline font-semibold cursor-pointer"
            >
              Clear all history
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
