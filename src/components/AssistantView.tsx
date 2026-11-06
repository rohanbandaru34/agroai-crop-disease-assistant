import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  CheckCircle2,
  ArrowRight,
  Sprout,
  User,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Info,
  Calendar,
  Globe,
  FileText,
  History as HistoryIcon,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { DISEASES, SUGGESTED_QUESTIONS } from '../data/cropsData';
import { HistoryModal, HistoryItem } from './HistoryModal';
import { DiagnosisReportModal } from './DiagnosisReportModal';

interface AssistantViewProps {
  onOpenDiseaseDetail: (diseaseId: string) => void;
  onOpenCropDetail: (cropId: string) => void;
  initialQuestion?: string;
}

// Custom parser to render the structured diagnosis response with clean typography
const FormattedDiagnosisText: React.FC<{ text: string; onSelectQuestion?: (q: string) => void }> = ({
  text,
  onSelectQuestion,
}) => {
  // If text contains section headings (###)
  if (text.includes('###')) {
    const sections = text.split(/(?=###\s+)/g);

    return (
      <div className="space-y-4 text-sm leading-relaxed">
        {sections.map((sec, idx) => {
          const trimmed = sec.trim();
          if (!trimmed) return null;

          const lines = trimmed.split('\n');
          const heading = lines[0].replace(/^###\s+/, '').trim();
          const content = lines.slice(1).join('\n').trim();

          const lowerHeading = heading.toLowerCase();

          // Section 1: Possible Diagnosis
          if (lowerHeading.includes('possible diagnosis') || lowerHeading.includes('1.')) {
            return (
              <div key={idx} className="bg-[#FAF8F2] border border-[#E0D9C8] rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#142A1D]">
                  <Stethoscope className="w-3.5 h-3.5 text-[#295C42]" />
                  <span>{heading}</span>
                </div>
                <div className="text-sm font-semibold text-[#173827]">
                  {renderMarkdownInline(content)}
                </div>
              </div>
            );
          }

          // Section 2: Confidence & Uncertainty
          if (lowerHeading.includes('confidence') || lowerHeading.includes('uncertainty') || lowerHeading.includes('2.')) {
            return (
              <div key={idx} className="bg-[#F4F7F4] border border-[#D0E2D4] rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#204B34]">
                  <Info className="w-3.5 h-3.5 text-[#204B34]" />
                  <span>{heading}</span>
                </div>
                <div className="text-xs sm:text-sm text-[#35433A]">
                  {renderMarkdownInline(content)}
                </div>
              </div>
            );
          }

          // Section 3: Symptoms Extracted
          if (lowerHeading.includes('symptoms extracted') || lowerHeading.includes('3.')) {
            return (
              <div key={idx} className="bg-white border border-[#E5E0D2] rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#193B28] flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#3B7E58]" />
                  <span>{heading}</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-[#36443B]">
                  {content.split('\n').map((line, lIdx) => {
                    const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
                    if (!cleanLine) return null;
                    return (
                      <div key={lIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B7E58] mt-1.5 shrink-0" />
                        <div>{renderMarkdownInline(cleanLine)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Section 4: Why This Disease Matches
          if (lowerHeading.includes('why this disease matches') || lowerHeading.includes('4.')) {
            return (
              <div key={idx} className="bg-[#FAF8F2] border border-[#E5DFD0] rounded-xl p-3.5 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#173827]">
                  {heading}
                </div>
                <div className="text-xs sm:text-sm text-[#3A483F] leading-relaxed">
                  {renderMarkdownInline(content)}
                </div>
              </div>
            );
          }

          // Section 5: Recommended Next Steps
          if (lowerHeading.includes('next steps') || lowerHeading.includes('5.')) {
            return (
              <div key={idx} className="bg-[#FAF8F2] border border-[#E2DDD0] rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#173827] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#295C42]" />
                  <span>{heading}</span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-[#313E35]">
                  {content.split('\n').map((line, lIdx) => {
                    const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
                    if (!cleanLine) return null;
                    return (
                      <div key={lIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#295C42] shrink-0 mt-0.5" />
                        <span>{renderMarkdownInline(cleanLine)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Section 6: Prevention & Management
          if (lowerHeading.includes('prevention') || lowerHeading.includes('management') || lowerHeading.includes('6.')) {
            return (
              <div key={idx} className="bg-[#FAF8F2] border border-[#E2DDD0] rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#173827] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#295C42]" />
                  <span>{heading}</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-[#313E35]">
                  {content.split('\n').map((line, lIdx) => {
                    const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
                    if (!cleanLine) return null;
                    return (
                      <div key={lIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#295C42] mt-1.5 shrink-0" />
                        <span>{renderMarkdownInline(cleanLine)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Clarifying Questions
          if (lowerHeading.includes('clarifying') || lowerHeading.includes('question')) {
            return (
              <div key={idx} className="bg-[#FFFDF7] border border-[#E8DCBF] rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>{heading}</span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-[#443826]">
                  {content.split('\n').map((line, lIdx) => {
                    const cleanLine = line.replace(/^[-•*1-9.]\s*/, '').trim();
                    if (!cleanLine) return null;
                    return (
                      <div key={lIdx} className="flex items-start gap-2">
                        <span className="font-bold text-amber-800 text-xs mt-0.5">?</span>
                        <span>{renderMarkdownInline(cleanLine)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Fallback generic section
          return (
            <div key={idx} className="space-y-1.5">
              <h4 className="font-bold text-sm text-[#142A1D]">{heading}</h4>
              <div className="text-xs sm:text-sm text-[#37443C]">{renderMarkdownInline(content)}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // Regular plain or markdown text
  return (
    <div className="space-y-2 whitespace-pre-line text-sm leading-relaxed">
      {renderMarkdownInline(text)}
    </div>
  );
};

// Simple inline markdown renderer (bold and italic)
function renderMarkdownInline(text: string) {
  // Handle double asterisks for bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-[#142A1D]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Handle single asterisks for italics
        const italicParts = part.split(/(\*[^*]+\*)/g);
        return (
          <span key={i}>
            {italicParts.map((sub, j) => {
              if (sub.startsWith('*') && sub.endsWith('*')) {
                return (
                  <em key={j} className="italic text-[#295C42]">
                    {sub.slice(1, -1)}
                  </em>
                );
              }
              return sub;
            })}
          </span>
        );
      })}
    </>
  );
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  onOpenDiseaseDetail,
  onOpenCropDetail,
  initialQuestion,
}) => {
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'user',
      timestamp: 'Just now',
      text: 'My tomato plant leaves have brown spots and are turning yellow.',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `### 1. Possible Diagnosis
**Early Blight** (*Alternaria solani*) — Fungal Disease.

### 2. Confidence & Uncertainty Explanation
**High Likelihood (Estimated ~92% Pattern Match)**. Circular lesions with target-like concentric rings starting on lower leaves are hallmark signs of Early Blight. If spots are irregular and lack concentric rings, Late Blight or Septoria should be considered.

### 3. Symptoms Extracted
- **Crop**: Tomato (*Solanum lycopersicum*)
- **Affected Plant Part**: Foliage (older lower leaves)
- **Observed Symptoms**: Dark brown circular spots with concentric rings, chlorotic yellow halos
- **Severity**: Early to moderate vegetative progression
- **Environmental Factors**: Warm conditions with high humidity or foliage wetness

### 4. Why This Disease Matches
*Alternaria solani* produces brown necrotic spots with characteristic target rings due to diurnal fungal spore growth cycles. The yellow halo represents toxic cellular breakdown before the leaf defoliates.

### 5. Recommended Next Steps
- Prune off and destroy infected lower leaves immediately (do not compost).
- Cease overhead watering; irrigate strictly at the soil base or use drip irrigation.
- Disinfect shears in 10% bleach solution between plant cuts.

### 6. Prevention & Sustainable Management
- Apply organic straw mulch around bases to prevent spore-laden soil from splashing onto leaves.
- Ensure 45–60 cm plant spacing and stake vines to improve canopy air circulation.
- Consult your local extension office for approved copper-based or bio-fungicide protective sprays.`,
      diagnosisCard: {
        diseaseId: 'early-blight-tomato',
        diseaseName: 'Early Blight',
        cropName: 'Tomato',
        description: 'Caused by a fungus, it leads to brown spots with concentric rings and yellowing of leaves.',
        imageUrl: '/src/assets/images/disease_early_blight_1793973952649.jpg',
        confidence: 'Likely Match • 92%',
        recommendedActions: [
          'Remove affected leaves and dispose them.',
          'Avoid overhead irrigation.',
          'Improve air circulation.',
          'Consider approved fungicides if severe.',
        ],
      },
      actionChips: [
        { label: 'What should I do first?', action: 'suggest_q', payload: 'What should I do first for early blight?' },
        { label: 'How do I prevent spreading?', action: 'suggest_q', payload: 'How do I prevent early blight from spreading to nearby plants?' },
        { label: 'Can it affect nearby plants?', action: 'suggest_q', payload: 'Can early blight affect nearby plants?' },
        { label: 'How long does recovery take?', action: 'suggest_q', payload: 'How long does recovery usually take from early blight?' },
        { label: 'Full Management Guide (A–E)', action: 'view_report', payload: 'early-blight-tomato' },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Advanced feature state
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeReportDiseaseId, setActiveReportDiseaseId] = useState<string | undefined>(undefined);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('agroai_diagnosis_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agroai_diagnosis_history', JSON.stringify(historyItems));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [historyItems]);

  const saveCurrentToHistory = (currentMsgs: ChatMessage[]) => {
    if (currentMsgs.length <= 1) return;
    const firstUserMsg = currentMsgs.find(m => m.sender === 'user')?.text || 'Crop Diagnosis Session';
    const lastCard = currentMsgs.slice().reverse().find(m => m.diagnosisCard)?.diagnosisCard;
    const newItem: HistoryItem = {
      id: `session-${Date.now()}`,
      title: firstUserMsg.length > 50 ? firstUserMsg.slice(0, 47) + '...' : firstUserMsg,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      cropName: lastCard?.cropName || 'Crop Sample',
      diseaseName: lastCard?.diseaseName || 'Pathology Review',
      messages: currentMsgs,
    };
    setHistoryItems(prev => [newItem, ...prev.filter(p => p.id !== newItem.id).slice(0, 19)]);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: 'Hello! I am **AgroAI**, your AI crop pathology and disease diagnosis assistant.\n\nDescribe the symptoms you observe on your plants (e.g. leaf spots, yellowing, wilting, insect damage), mention the crop name, or upload a photo of the affected plant part.',
        actionChips: [
          { label: 'Tomato Leaf Spots', action: 'suggest_q', payload: 'My tomato leaves have brown spots. What could be wrong?' },
          { label: 'Rice Yellowing', action: 'suggest_q', payload: 'Why are my rice leaves turning yellow?' },
          { label: 'Potato Fungal Issues', action: 'suggest_q', payload: 'How can I prevent fungal diseases in my potato crop?' },
        ],
      },
    ]);
    setApiError(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend ?? inputText;
    if (!text.trim() && !attachedImage) return;

    const currentImage = attachedImage;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: text.trim() || 'Uploaded crop symptom photo for diagnostic review.',
      diagnosisCard: currentImage
        ? {
            diseaseId: 'photo-sample',
            diseaseName: 'Field Leaf Specimen',
            cropName: 'Submitted Sample',
            description: 'Analyzing leaf pattern against plant pathology database...',
            imageUrl: currentImage,
            recommendedActions: ['Analyzing leaf pattern against known pathology database...'],
          }
        : undefined,
    };

    // Update conversation state immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setAttachedImage(null);
    setIsTyping(true);
    setApiError(null);

    try {
      // Build conversation history for API (omitting cards to keep payload clean)
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text || '',
      }));

      // Call our secure server-side Gemini API endpoint
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentMessage: text.trim(),
          messages: historyPayload,
          image: currentImage,
          language,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();

      // Check if a known database disease was strongly identified
      let matchedCard: ChatMessage['diagnosisCard'] = undefined;
      if (data.matchedDiseaseId && DISEASES[data.matchedDiseaseId]) {
        const dbDis = DISEASES[data.matchedDiseaseId];
        matchedCard = {
          diseaseId: dbDis.id,
          diseaseName: dbDis.name,
          cropName: dbDis.cropName,
          description: dbDis.summary,
          imageUrl: dbDis.thumbnailUrl,
          confidence: dbDis.confidenceMatch || 'High Pattern Match',
          recommendedActions: dbDis.immediateActions,
        };
      }

      // Action chips from API or defaults
      const actionChips: ChatMessage['actionChips'] = [];
      if (data.matchedDiseaseId) {
        actionChips.push({
          label: 'What should I do first?',
          action: 'suggest_q',
          payload: `What should I do first for ${data.matchedDiseaseId.replace(/-/g, ' ')}?`,
        });
        actionChips.push({
          label: 'How do I prevent spreading?',
          action: 'suggest_q',
          payload: `How do I prevent this from spreading to nearby plants?`,
        });
        actionChips.push({
          label: 'Can it affect nearby plants?',
          action: 'suggest_q',
          payload: `Can this disease affect nearby plants?`,
        });
        actionChips.push({
          label: 'How long does recovery take?',
          action: 'suggest_q',
          payload: `How long does recovery usually take?`,
        });
        actionChips.push({
          label: 'Full Management Guide (A–E)',
          action: 'view_report',
          payload: data.matchedDiseaseId,
        });
      }

      if (Array.isArray(data.suggestedQuestions) && actionChips.length === 0) {
        for (const q of data.suggestedQuestions) {
          actionChips.push({
            label: q,
            action: 'suggest_q',
            payload: q,
          });
        }
      }

      const botMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: data.text,
        diagnosisCard: matchedCard,
        actionChips: actionChips.slice(0, 5),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Diagnostic error:', err);
      setApiError(err.message || 'Unable to connect to diagnostic server.');

      // Graceful fallback response
      const fallbackReply: ChatMessage = {
        id: `asst-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: `### 1. Diagnostic Advisory Notice\nAgroAI diagnostic service encountered a temporary network delay: *${err.message}*.\n\n### 2. Immediate Recommended Field Practice\nIf observing foliar spots or yellowing:\n- Avoid overhead watering and prune damaged foliage.\n- Ensure adequate plant spacing and sunlight.\n- Inspect the underside of leaves with a hand lens for fungal mold or tiny insects.\n\nYou can click any suggested question below or browse our verified Crop Library.`,
        actionChips: [
          { label: 'Tomato Blight Protocol', action: 'suggest_q', payload: 'My tomato leaves have brown spots. What could be wrong?' },
          { label: 'Rice Blast Protocol', action: 'suggest_q', payload: 'Why are my rice leaves turning yellow?' },
          { label: 'Explore Crop Library', action: 'open_library' },
        ],
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (chip: { label: string; action: string; payload?: string }) => {
    if (chip.action === 'view_report' && chip.payload) {
      onOpenDiseaseDetail(chip.payload);
      return;
    }
    if (chip.action === 'view_crop' && chip.payload) {
      onOpenCropDetail(chip.payload);
      return;
    }
    if (chip.action === 'open_library') {
      onOpenCropDetail('tomato');
      return;
    }
    if (chip.action === 'suggest_q' && chip.payload) {
      handleSendMessage(chip.payload);
      return;
    }
    if (chip.action === 'ask_prevention' && chip.payload) {
      handleSendMessage(`What are the key prevention methods and cultural practices for ${chip.payload.replace('-', ' ')}?`);
      return;
    }
    if (chip.action === 'ask_treatment' && chip.payload) {
      handleSendMessage(`What are the recommended treatments, biological controls, and safe management steps for ${chip.payload.replace('-', ' ')}?`);
      return;
    }
    if (chip.action === 'other_crop') {
      handleSendMessage('What symptoms should I look for in Rice, Wheat, or Potato crops?');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const attachPresetImage = (url: string) => {
    setAttachedImage(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Suggested Questions + Pastoral Landscape Illustration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#173827]">
                Suggested Questions
              </h2>
              <span className="text-xs text-[#738378] font-medium">Click to ask</span>
            </div>

            <div className="space-y-2.5">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left p-3.5 rounded-xl bg-[#EFECE3] hover:bg-[#E3EFE5] border border-[#E1DCcf] hover:border-[#BCD1C0] text-sm text-[#27342C] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="pr-2 leading-snug">{q}</span>
                  <ArrowRight className="w-4 h-4 text-[#7A8F80] group-hover:text-[#193B28] shrink-0 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>

            {/* Diagnostic Follow-Up Questions (Prompt Scenarios) */}
            <div className="pt-2 border-t border-[#E8E4D9]">
              <span className="text-xs font-semibold text-[#193B28] block mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#295C42]" />
                <span>Follow-Up Inquiries (Context-Aware):</span>
              </span>
              <div className="space-y-1.5">
                {[
                  { q: 'What should I do first?', desc: 'Immediate 24–48h action plan' },
                  { q: 'How do I prevent this from spreading?', desc: 'Containment & sanitation' },
                  { q: 'Can this disease affect nearby plants?', desc: 'Cross-infection risks' },
                  { q: 'How long does recovery usually take?', desc: 'Prognosis & growth timeline' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.q)}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-[#F2EFE8] border border-[#DDD8CA] hover:border-[#193B28] transition-colors text-xs text-[#204B34] flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="font-semibold block">{item.q}</span>
                      <span className="text-[10px] text-[#637267]">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#7A8F80] group-hover:text-[#193B28] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Diagnostic Presets */}
            <div className="pt-2 border-t border-[#E8E4D9]">
              <span className="text-xs font-semibold text-[#57665C] block mb-2">
                Simulate Photo Diagnostic:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    attachPresetImage('/src/assets/images/disease_early_blight_1793973952649.jpg');
                    setInputText('Attached tomato leaf with concentric brown spots and yellow edges. Please identify.');
                  }}
                  className="p-2 text-left bg-white border border-[#DDD8CA] rounded-lg hover:border-[#193B28] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#3B7E58] shrink-0" />
                  <span className="truncate">Tomato Leaf Sample</span>
                </button>
                <button
                  onClick={() => {
                    attachPresetImage('/src/assets/images/crop_rice_paddy_1793973980096.jpg');
                    setInputText('Examining rice leaf tips with water-soaked wavy lesions under cloudy weather.');
                  }}
                  className="p-2 text-left bg-white border border-[#DDD8CA] rounded-lg hover:border-[#193B28] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#3B7E58] shrink-0" />
                  <span className="truncate">Rice Paddy Sample</span>
                </button>
              </div>
            </div>

            {/* Supported Crops Tag List */}
            <div className="pt-2 border-t border-[#E8E4D9]">
              <span className="text-xs font-semibold text-[#57665C] block mb-2">
                Supported Primary Crops:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['Tomato', 'Rice', 'Wheat', 'Potato', 'Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Chilli', 'Onion', 'Soybean', 'Mango', 'Banana', 'Brinjal'].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleSendMessage(`What are the primary diseases, pests, and growing requirements for ${c}?`)}
                    className="px-2 py-0.5 rounded bg-white border border-[#DDD8CA] text-[#293A2E] hover:border-[#193B28] transition-colors cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pastoral Landscape Illustration */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#E7EFE8] to-[#D5E5D8] border border-[#C5D9C8] p-5 shadow-2xs">
            <svg
              className="w-full h-36"
              viewBox="0 0 320 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="260" cy="40" r="18" fill="#F4F8EB" opacity="0.8" />
              <path
                d="M-20 110 C60 85 140 120 220 95 C280 80 340 100 360 105 L360 160 L-20 160 Z"
                fill="#B8D3BE"
                opacity="0.6"
              />
              <path
                d="M-20 125 C70 105 160 135 250 115 C300 105 340 120 360 125 L360 160 L-20 160 Z"
                fill="#9EBF9F"
                opacity="0.8"
              />
              <path d="M0 160 L140 115 L144 115 L20 160 Z" fill="#7E9F80" opacity="0.7" />
              <path d="M45 160 L160 115 L164 115 L70 160 Z" fill="#7E9F80" opacity="0.7" />
              <path d="M95 160 L180 115 L184 115 L120 160 Z" fill="#7E9F80" opacity="0.7" />
              <path d="M150 160 L200 115 L204 115 L175 160 Z" fill="#7E9F80" opacity="0.7" />
              <path d="M210 160 L220 115 L224 115 L235 160 Z" fill="#7E9F80" opacity="0.7" />

              <g transform="translate(60, 92) scale(0.65)">
                <path d="M20 12 L35 12 L35 22 L20 22 Z" fill="#2E5A3D" />
                <path d="M35 16 L48 16 L48 22 L35 22 Z" fill="#2E5A3D" />
                <path d="M22 6 L33 6 L33 12 L22 12 Z" fill="#4B775B" />
                <line x1="43" y1="16" x2="43" y2="9" stroke="#2E5A3D" strokeWidth="2" />
                <circle cx="22" cy="24" r="8" fill="#1C3825" />
                <circle cx="22" cy="24" r="3" fill="#E2ECE4" />
                <circle cx="46" cy="25" r="5" fill="#1C3825" />
                <circle cx="46" cy="25" r="2" fill="#E2ECE4" />
              </g>
            </svg>
            <div className="mt-1 flex items-center justify-between text-xs text-[#2A4D35] font-medium">
              <span>AgroAI Neural Agronomist</span>
              <span>Gemini 3.8 Flash</span>
            </div>
          </div>
        </div>

        {/* Right Conversation Area */}
        <div className="lg:col-span-8 flex flex-col bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl shadow-sm overflow-hidden min-h-[640px] max-h-[840px]">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[#E7E2D5] bg-[#FAF8F2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#193B28] text-white flex items-center justify-center">
                <Sprout className="w-4 h-4 text-[#88C498]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#173827]">
                  AgroAI Crop Disease Diagnosis Chatbot
                </h3>
                <span className="text-xs text-[#637469] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Active · Multi-turn conversational context enabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Language Selector */}
              <div className="flex items-center bg-[#EFECE3] border border-[#DDD7C9] rounded-lg p-0.5 text-xs">
                <Globe className="w-3.5 h-3.5 text-[#55655B] ml-1.5 mr-1" />
                {(['en', 'hi', 'te'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-[#193B28] text-white shadow-xs'
                        : 'text-[#55655B] hover:text-[#173827]'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                  </button>
                ))}
              </div>

              {/* History Button */}
              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#173827] bg-[#EFECE3] hover:bg-[#E3DFD2] rounded-lg transition-colors cursor-pointer border border-[#DDD7C9]"
                title="View diagnosis history & past sessions"
              >
                <HistoryIcon className="w-3.5 h-3.5 text-[#295C42]" />
                <span className="hidden sm:inline">History</span>
                {historyItems.length > 0 && (
                  <span className="bg-[#193B28] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {historyItems.length}
                  </span>
                )}
              </button>

              {/* Report PDF Button */}
              <button
                onClick={() => {
                  setActiveReportDiseaseId('early-blight-tomato');
                  setIsReportModalOpen(true);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#193B28] hover:bg-[#11281B] rounded-lg transition-colors cursor-pointer shadow-xs"
                title="Generate diagnosis report PDF"
              >
                <FileText className="w-3.5 h-3.5 text-[#A3C5A7]" />
                <span className="hidden sm:inline">Report PDF</span>
              </button>

              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#55655B] hover:text-[#173827] bg-[#EFECE3] hover:bg-[#E3DFD2] rounded-lg transition-colors cursor-pointer"
                title="Clear current conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#193B28] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Sprout className="w-4 h-4 text-[#88C498]" />
                  </div>
                )}

                {/* Message Content Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[82%] space-y-3.5 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {/* Text bubble */}
                  {msg.text && (
                    <div
                      className={`inline-block p-4 sm:p-5 rounded-2xl text-left ${
                        msg.sender === 'user'
                          ? 'bg-[#EFECE3] text-[#1E2822] font-medium rounded-tr-xs border border-[#E0DACB]'
                          : 'bg-white text-[#19241E] rounded-tl-xs border border-[#E5E0D4] shadow-2xs'
                      }`}
                    >
                      {msg.sender === 'assistant' ? (
                        <FormattedDiagnosisText text={msg.text} />
                      ) : (
                        <div className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</div>
                      )}
                    </div>
                  )}

                  {/* Embedded Diagnosis Card */}
                  {msg.diagnosisCard && (
                    <div className="bg-white border border-[#DCD5C6] rounded-2xl p-5 shadow-xs text-left space-y-4">
                      {/* Verified Badge */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#193B28] bg-[#E8EFE9] px-2.5 py-1 rounded-full border border-[#BCD1C0] w-fit">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#204B34]" />
                        <span>Verified Agricultural Extension Knowledge</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#EAE6DA] shrink-0 border border-[#DDD7C9]">
                          <img
                            src={msg.diagnosisCard.imageUrl}
                            alt={msg.diagnosisCard.diseaseName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#142A1D]">
                              {msg.diagnosisCard.diseaseName}
                            </h4>
                            {msg.diagnosisCard.confidence && (
                              <span className="text-[11px] font-semibold text-[#193B28] bg-[#E8EFE9] px-2 py-0.5 rounded-full">
                                {msg.diagnosisCard.confidence}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#4E5C53] leading-relaxed">
                            {msg.diagnosisCard.description}
                          </p>
                        </div>
                      </div>

                      {/* Recommended Actions */}
                      <div className="space-y-2 pt-2 border-t border-[#EFECE3]">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#193B28]">
                          <Sprout className="w-3.5 h-3.5 text-[#3B7E58]" />
                          <span>Immediate Recommended Field Actions:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#35423A]">
                          {msg.diagnosisCard.recommendedActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#295C42] shrink-0 mt-0.5" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action buttons inside card */}
                      <div className="pt-2 border-t border-[#EFECE3] flex flex-wrap gap-2">
                        {msg.diagnosisCard.diseaseId && msg.diagnosisCard.diseaseId !== 'photo-sample' && (
                          <button
                            onClick={() => onOpenDiseaseDetail(msg.diagnosisCard!.diseaseId)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-[#193B28] text-white hover:bg-[#11281B] transition-colors cursor-pointer shadow-2xs"
                          >
                            <span>Open Full Management Guide (A–E)</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#A3C5A7]" />
                          </button>
                        )}
                        <button
                          onClick={() => handleSendMessage('What should I do first?')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FCFAF6] hover:bg-[#EFECE3] border border-[#DDD7C9] text-[#204B34] transition-colors cursor-pointer"
                        >
                          What to do first?
                        </button>
                        <button
                          onClick={() => handleSendMessage('How do I prevent this from spreading?')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FCFAF6] hover:bg-[#EFECE3] border border-[#DDD7C9] text-[#204B34] transition-colors cursor-pointer"
                        >
                          Prevent spreading
                        </button>
                        <button
                          onClick={() => handleSendMessage('Can this disease affect nearby plants?')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FCFAF6] hover:bg-[#EFECE3] border border-[#DDD7C9] text-[#204B34] transition-colors cursor-pointer"
                        >
                          Affect nearby plants?
                        </button>
                        <button
                          onClick={() => handleSendMessage('How long does recovery usually take?')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FCFAF6] hover:bg-[#EFECE3] border border-[#DDD7C9] text-[#204B34] transition-colors cursor-pointer"
                        >
                          Recovery time
                        </button>
                      </div>
                    </div>
                  )}

                  {/* External Action Chips below message */}
                  {msg.actionChips && msg.actionChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actionChips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChipClick(chip)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FCFAF6] hover:bg-[#EAE6DA] border border-[#DDD7C9] text-[#204B34] transition-colors cursor-pointer text-left"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#E5DFD1] text-[#2C3B31] flex items-center justify-center shrink-0 mt-0.5 border border-[#D5CEBF]">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3.5 items-center text-xs text-[#5D6D63]">
                <div className="w-8 h-8 rounded-full bg-[#193B28] text-white flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-[#88C498]" />
                </div>
                <div className="bg-white border border-[#E5E0D4] px-4 py-3 rounded-2xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#295C42] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#295C42] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#295C42] animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-1 text-xs font-medium text-[#44534A]">
                    Analyzing symptoms against agricultural pathology database...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Attached image preview banner */}
          {attachedImage && (
            <div className="px-6 py-2.5 bg-[#EFECE3] border-t border-[#E0DACB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md overflow-hidden bg-black/10 border border-[#D0C9B9]">
                  <img src={attachedImage} alt="Attachment" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-[#1E2822] font-medium">1 plant leaf specimen attached for diagnosis</span>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="text-xs text-red-700 hover:underline font-medium cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Quick Follow-up Inquiries Bar */}
          <div className="px-4 py-2 bg-[#FAF8F2] border-t border-[#EDE8DB] flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[#64746A] font-semibold whitespace-nowrap flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#295C42]" />
              Follow-Up:
            </span>
            {[
              { label: 'What should I do first?', q: 'What should I do first?' },
              { label: 'Prevent spreading', q: 'How do I prevent this from spreading?' },
              { label: 'Affect nearby plants?', q: 'Can this disease affect nearby plants?' },
              { label: 'Recovery timeline', q: 'How long does recovery usually take?' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item.q)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#EFECE3] border border-[#DDD8CA] text-[#204B34] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-4 bg-[#FAF8F2] border-t border-[#E7E2D5]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-full text-[#526257] hover:text-[#173827] hover:bg-[#EFECE3] transition-colors cursor-pointer"
                title="Attach plant or symptom photo"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe crop symptoms... (e.g. 'My chilli leaves are curling upward', 'yellow spots on wheat')"
                  className="w-full px-4 py-3 rounded-full bg-white border border-[#DCD5C6] focus:border-[#204B34] focus:ring-2 focus:ring-[#204B34]/15 focus:outline-none text-sm text-[#1A261F] placeholder-[#859489] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={(!inputText.trim() && !attachedImage) || isTyping}
                className="w-11 h-11 rounded-full bg-[#193B28] hover:bg-[#11281B] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#A3C5A7]" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        historyItems={historyItems}
        onSelectHistoryItem={(item) => {
          setMessages(item.messages);
        }}
        onDeleteHistoryItem={(id) => {
          setHistoryItems((prev) => prev.filter((i) => i.id !== id));
        }}
        onClearAll={() => {
          setHistoryItems([]);
        }}
      />

      {/* Diagnosis Report Modal */}
      <DiagnosisReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        diseaseId={activeReportDiseaseId}
        cropName={messages.slice().reverse().find(m => m.diagnosisCard?.cropName)?.diagnosisCard?.cropName || 'Tomato'}
        symptoms={['Foliar spots', 'Yellow halo', 'Concentric rings', 'Fungal spore progression']}
        assessmentText={messages.slice().reverse().find(m => m.sender === 'assistant')?.text}
      />
    </div>
  );
};
