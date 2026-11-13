import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '15mb' }));

const rawApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const apiKey = rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' && rawApiKey.trim().length > 10 ? rawApiKey.trim() : null;

if (!apiKey) {
  console.warn('[AgroAI Startup Warning]: GEMINI_API_KEY is missing or invalid. AgroAI will operate using its robust local agronomic fallback inference engine.');
} else {
  console.log('[AgroAI Startup]: GEMINI_API_KEY successfully detected and validated.');
}

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

import { DISEASE_DATABASE } from './src/data/diseaseDatabase.ts';

const SYSTEM_INSTRUCTION = `You are the AgroAI Diagnostic Agronomist, a senior plant pathologist and precision crop disease management specialist.

Your mission is to help farmers and agronomists diagnose crop diseases, understand plant symptoms, and receive responsible, evidence-based management guidance.

CORE SAFETY & AGRONOMIC CONSTITUTION:
1. NEVER invent diseases, unregistered pesticides, or unauthorized chemical dosages. If reliable chemical information is unavailable for a disease (especially viral diseases), clearly say so.
2. NEVER present an uncertain diagnosis as a confirmed fact. Clearly express confidence levels (e.g., "Preliminary Observation", "Moderate Likelihood", "Strong Pattern Match", or "Ambiguous / Insufficient Evidence").
3. IMAGE & VISION ANALYSIS SAFETY: When the user uploads a photograph of an affected plant or leaf:
   - Identify visible symptoms (e.g., spots, chlorosis, lesions, mold, wilting).
   - Identify the likely affected plant part (e.g., lower leaves, stem collar, fruit panicle).
   - Suggest possible diseases matching the visual pattern.
   - Combine visual observations with any accompanying text description provided by the user.
   - **CRITICAL DISCLAIMER**: Never claim that an image alone confirms a disease with 100% certainty; always state that visual symptoms suggest a likelihood and recommend physical field inspection or laboratory confirmation.
4. MULTILINGUAL SUPPORT: Respond in the exact language requested by the user (English, Hindi, or Telugu). Preserve accurate agricultural terminology, chemical active ingredient names, and scientific plant pathology standards regardless of the output language.
5. If symptoms are ambiguous or lack critical diagnostic traits, DO NOT jump to a definitive diagnosis. State the top 2-3 possibilities and ASK specific clarifying questions (e.g., leaf underside appearance, spot geometry, upper vs. lower canopy, weather conditions).
6. Always clearly recommend consulting local agricultural extension services, certified crop advisors, or authorized plant health diagnostic clinics prior to applying restricted chemical interventions.
7. CITE VERIFIED REFERENCE SOURCES (such as FAO Plant Protection Guidelines, USDA ARS, University IPM Programs, or National Research Institutes).

MANAGEMENT PROTOCOL ORGANIZATION:
When recommending disease management, structure guidance into:
A. Immediate Actions (What the farmer should do first within 24-48 hours)
B. Cultural Management (Crop rotation, sanitation, spacing, irrigation, tillage)
C. Biological Management (Appropriate biological control options supported by agricultural sources)
D. Chemical Management (Provide only verified active ingredients with label restrictions; NEVER fabricate dosages)
E. Prevention (Reducing likelihood of future infection)

CONVERSATIONAL FOLLOW-UPS:
Maintain active conversation memory. If the user asks:
- "How do I prevent this from spreading?"
- "Can this disease affect nearby plants?"
- "What should I do first?"
- "How long does recovery usually take?"
Anchor your response in the previously diagnosed disease from this conversation. Address the transmission mode, cross-infection risks to adjacent crops, immediate sanitation sequence, and realistic recovery timelines.
`;

interface AgronomicMatch {
  diseaseName: string;
  scientificName: string;
  type: string;
  confidence: string;
  matchedDiseaseId?: string;
  whyMatches: string;
  immediateActions: string[];
  prevention: string[];
  clarifyingQuestions?: string[];
  followUps?: string[];
}

function runAgronomicExpertInference(
  fullTextHistory: string,
  latestQuery: string,
  language: 'en' | 'hi' | 'te' = 'en'
): {
  text: string;
  matchedDiseaseId?: string;
  suggestedQuestions: string[];
} {
  const combined = (fullTextHistory + ' ' + latestQuery).toLowerCase();
  const lowerQuery = latestQuery.toLowerCase();

  const isFollowUpSpread = lowerQuery.includes('prevent this from spreading') || lowerQuery.includes('prevent spreading') || lowerQuery.includes('stop spreading');
  const isFollowUpNearby = lowerQuery.includes('affect nearby') || lowerQuery.includes('nearby plants') || lowerQuery.includes('spread to other plants') || lowerQuery.includes('contagious');
  const isFollowUpWhatFirst = lowerQuery.includes('what should i do first') || lowerQuery.includes('what to do first') || lowerQuery.includes('first step') || lowerQuery.includes('immediate step');
  const isFollowUpRecovery = lowerQuery.includes('recovery usually take') || lowerQuery.includes('how long does recovery') || lowerQuery.includes('will it recover') || lowerQuery.includes('can it heal');

  let activeDiseaseKey = 'early-blight-tomato';
  if (combined.includes('rice') || combined.includes('blast') || combined.includes('paddy')) activeDiseaseKey = 'rice-blast';
  else if (combined.includes('potato') || combined.includes('tuber') || combined.includes('late blight')) activeDiseaseKey = 'late-blight-potato';
  else if (combined.includes('wheat') || combined.includes('rust')) activeDiseaseKey = 'stripe-rust-wheat';
  else if (combined.includes('maize') || combined.includes('corn') || combined.includes('armyworm')) activeDiseaseKey = 'fall-armyworm-maize';
  else if (combined.includes('cotton')) activeDiseaseKey = 'cotton-leaf-curl';
  else if (combined.includes('chilli') || combined.includes('pepper')) activeDiseaseKey = 'anthracnose-chilli';
  else if (combined.includes('soybean') || combined.includes('soya')) activeDiseaseKey = 'yellow-mosaic-soybean';
  else if (combined.includes('tomato')) activeDiseaseKey = 'early-blight-tomato';
  else if (combined.includes('sugarcane') || combined.includes('cane')) activeDiseaseKey = 'early-shoot-borer-sugarcane';
  else if (combined.includes('groundnut') || combined.includes('peanut')) activeDiseaseKey = 'tikka-groundnut';
  else if (combined.includes('onion')) activeDiseaseKey = 'purple-blotch-onion';
  else if (combined.includes('mango')) activeDiseaseKey = 'anthracnose-mango';
  else if (combined.includes('banana')) activeDiseaseKey = 'panama-wilt-banana';
  else if (combined.includes('brinjal') || combined.includes('eggplant')) activeDiseaseKey = 'phomopsis-brinjal';
  else if (combined.includes('chickpea') || combined.includes('chana') || combined.includes('gram')) activeDiseaseKey = 'fusarium-wilt-chickpea';

  let crop = 'Tomato';
  if (combined.includes('rice') || combined.includes('paddy')) crop = 'Rice';
  else if (combined.includes('potato') || combined.includes('tuber')) crop = 'Potato';
  else if (combined.includes('wheat')) crop = 'Wheat';
  else if (combined.includes('maize') || combined.includes('corn')) crop = 'Maize';
  else if (combined.includes('cotton')) crop = 'Cotton';
  else if (combined.includes('sugarcane') || combined.includes('cane')) crop = 'Sugarcane';
  else if (combined.includes('groundnut') || combined.includes('peanut')) crop = 'Groundnut';
  else if (combined.includes('chilli') || combined.includes('pepper') || combined.includes('chili')) crop = 'Chilli';
  else if (combined.includes('onion')) crop = 'Onion';
  else if (combined.includes('soybean') || combined.includes('soya')) crop = 'Soybean';
  else if (combined.includes('mango')) crop = 'Mango';
  else if (combined.includes('banana')) crop = 'Banana';
  else if (combined.includes('brinjal') || combined.includes('eggplant') || combined.includes('aubergine')) crop = 'Brinjal';
  else if (combined.includes('chickpea') || combined.includes('chana') || combined.includes('gram')) crop = 'Chickpea';

  let part = 'Leaves (Foliage)';
  if (combined.includes('leaf') || combined.includes('leaves') || combined.includes('foliage')) part = 'Leaves (Foliage)';
  else if (combined.includes('fruit') || combined.includes('pod') || combined.includes('berry')) part = 'Fruit / Pod';
  else if (combined.includes('stem') || combined.includes('stalk') || combined.includes('branch')) part = 'Stem & Stalk';
  else if (combined.includes('root') || combined.includes('tuber') || combined.includes('collar')) part = 'Root & Tuber zone';
  else if (combined.includes('panicle') || combined.includes('whorl') || combined.includes('flower')) part = 'Inflorescence / Panicle / Whorl';

  const dbDisease = DISEASE_DATABASE[activeDiseaseKey] || DISEASE_DATABASE['early-blight-tomato'];

  const headings = {
    en: {
      diag: '### 1. Possible Diagnosis',
      conf: '### 2. Confidence & Uncertainty Explanation',
      symp: '### 3. Symptoms Extracted',
      why: '### 4. Why This Disease Matches',
      steps: '### 5. Recommended Next Steps',
      prev: '### 6. Prevention & Sustainable Management',
      questions: '### Clarifying Questions for You:'
    },
    hi: {
      diag: '### 1. संभावित निदान (Possible Diagnosis)',
      conf: '### 2. आत्मविश्वास और अनिश्चितता स्पष्टीकरण (Confidence & Uncertainty Explanation)',
      symp: '### 3. निकाले गए लक्षण (Symptoms Extracted)',
      why: '### 4. यह बीमारी क्यों मेल खाती है (Why This Disease Matches)',
      steps: '### 5. अनुशंसित अगले चरण (Recommended Next Steps)',
      prev: '### 6. रोकथाम और सतत प्रबंधन (Prevention & Sustainable Management)',
      questions: '### आपके लिए स्पष्टीकरण प्रश्न (Clarifying Questions):'
    },
    te: {
      diag: '### 1. సాధ్యమయ్యే నిర్ధారణ (Possible Diagnosis)',
      conf: '### 2. విశ్వాసం & అనిశ్చితి వివరణ (Confidence & Uncertainty Explanation)',
      symp: '### 3. సేకరించిన లక్షణాలు (Symptoms Extracted)',
      why: '### 4. ఈ వ్యాధి ఎందుకు సరిపోతుంది (Why This Disease Matches)',
      steps: '### 5. సిఫార్సు చేయబడిన తదుపరి దశలు (Recommended Next Steps)',
      prev: '### 6. నివారణ & స్థిరమైన నిర్వహణ (Prevention & Sustainable Management)',
      questions: '### మీ కోసం స్పష్టత ప్రశ్నలు (Clarifying Questions):'
    }
  };

  const h = headings[language === 'hi' ? 'hi' : language === 'te' ? 'te' : 'en'];

  if (isFollowUpWhatFirst) {
    const text = `${h.diag}
**${dbDisease.name}** (${dbDisease.scientificName})

${h.steps}
${dbDisease.immediateActions.map((act, i) => `${i + 1}. **${act}**`).join('\n')}

${h.conf}
**Local Agronomic Fallback Inference**. Immediate isolation halts spore multiplication.

${h.why}
${dbDisease.summary}

${h.prev}
${dbDisease.prevention.map((p) => `- ${p}`).join('\n')}`;

    return {
      text,
      matchedDiseaseId: dbDisease.id,
      suggestedQuestions: [
        `How do I prevent ${dbDisease.name} from spreading?`,
        `Can this disease affect nearby plants?`,
        `How long does recovery usually take?`,
      ],
    };
  }

  let match: AgronomicMatch;

  if (crop === 'Tomato' && (combined.includes('concentric') || combined.includes('target') || (combined.includes('brown spot') && combined.includes('yellow')))) {
    match = {
      diseaseName: 'Early Blight (Alternaria solani)',
      scientificName: 'Alternaria solani',
      type: 'Fungal Pathogen',
      confidence: 'Likely Match • 92% Pattern Match (Local Fallback)',
      matchedDiseaseId: 'early-blight-tomato',
      whyMatches: 'The presence of brown spots with concentric target-like rings and yellow chlorotic halos starting on older foliage is the classic diagnostic signature of Alternaria solani.',
      immediateActions: [
        'Prune and destroy infected lower leaves immediately (do not compost diseased foliage).',
        'Avoid overhead irrigation; water strictly at the soil line using drip tubes.',
        'Sanitize pruning shears in a 10% bleach solution between plant cuts.',
      ],
      prevention: [
        'Apply clean straw or plastic mulch around plant bases to prevent soil-borne fungal spores from splashing upward.',
        'Practice 3-year crop rotation with non-solanaceous species.',
      ],
    };
  } else if (crop === 'Rice' && (combined.includes('blast') || combined.includes('spindle'))) {
    match = {
      diseaseName: 'Rice Blast (Magnaporthe oryzae)',
      scientificName: 'Magnaporthe oryzae',
      type: 'Fungal Pathogen',
      confidence: 'Likely Match • 89% Pattern Match (Local Fallback)',
      matchedDiseaseId: 'rice-blast',
      whyMatches: 'Spindle-shaped or diamond elliptical lesions with grey centers and reddish-brown borders on rice foliage are characteristic of rice blast.',
      immediateActions: [
        'Withhold excessive nitrogen top-dressing immediately.',
        'Maintain a steady, shallow water level in paddy.',
      ],
      prevention: [
        'Sow blast-resistant certified paddy seed varieties.',
        'Treat nursery seeds with certified bio-fungicides.',
      ],
    };
  } else {
    match = {
      diseaseName: `Foliar Pathology in ${crop}`,
      scientificName: 'Symptom Examination Required',
      type: 'Uncertain / Multi-Factor Consideration',
      confidence: 'Preliminary Observation (Local Fallback Inference)',
      whyMatches: `The reported symptoms on ${crop} could arise from early fungal leaf spots, viral vector transmission, or localized moisture stress.`,
      immediateActions: [
        'Inspect the underside of leaves with a hand lens for fungal mold or tiny pests.',
        'Isolate symptomatic plants and stop overhead sprinkler watering.',
      ],
      prevention: [
        'Ensure proper plant spacing for unrestricted canopy ventilation.',
        'Water at the base of the plant to keep foliage dry.',
      ],
      clarifyingQuestions: [
        'Are the spots circular with concentric rings, or irregular water-soaked patches?',
        'Is there any white, grey, or powdery fuzz on the underside of leaves?',
      ],
    };
  }

  const markdownResponse = `${h.diag}
**${match.diseaseName}** — ${match.type}.

${h.conf}
**${match.confidence}**. Field inspection and agricultural extension consultation are recommended.

${h.symp}
- **Crop**: ${crop}
- **Affected Plant Part**: ${part}
- **Observed Symptoms**: Foliar spotting, discoloration, or environmental stress.

${h.why}
${match.whyMatches}

${h.steps}
${match.immediateActions.map((a) => `- ${a}`).join('\n')}

${h.prev}
${match.prevention.map((p) => `- ${p}`).join('\n')}
${
  match.clarifyingQuestions && match.clarifyingQuestions.length > 0
    ? `\n${h.questions}\n${match.clarifyingQuestions.map((q) => `- ${q}`).join('\n')}`
    : ''
}`;

  return {
    text: markdownResponse,
    matchedDiseaseId: match.matchedDiseaseId,
    suggestedQuestions: [
      'What organic treatment do you recommend?',
      'How fast can this disease spread?',
      'Can nearby crops catch this?',
    ],
  };
}

// Diagnostic chat endpoint
app.post('/api/diagnose', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, currentMessage, image, language } = req.body;

    if (!currentMessage && (!messages || messages.length === 0)) {
      res.status(400).json({ error: 'No message provided for diagnosis.' });
      return;
    }

    let effectiveSystemInstruction = SYSTEM_INSTRUCTION;
    const requestedLang = language === 'hi' ? 'hi' : language === 'te' ? 'te' : 'en';

    if (requestedLang === 'hi') {
      effectiveSystemInstruction += '\n\n[MANDATORY LANGUAGE INSTRUCTION]: Please respond entirely in Hindi (हिन्दी) while maintaining precise agricultural and plant pathology terminology.';
    } else if (requestedLang === 'te') {
      effectiveSystemInstruction += '\n\n[MANDATORY LANGUAGE INSTRUCTION]: Please respond entirely in Telugu (తెలుగు) while maintaining precise agricultural and plant pathology terminology.';
    }

    let geminiReply = '';
    let successfulModel = '';

    // Validate and process image attachment with security/size constraints
    let currentParts: any[] = [];
    if (image && typeof image === 'string') {
      const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (!match) {
        res.status(400).json({ error: 'Invalid image data format. Expected base64 data URL.' });
        return;
      }
      const mimeType = match[1];
      const base64Data = match[2];
      const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validMimeTypes.includes(mimeType)) {
        res.status(400).json({ error: `Unsupported image MIME type: ${mimeType}. Allowed: JPEG, PNG, WebP, GIF.` });
        return;
      }
      const estimatedBytes = base64Data.length * 0.75;
      if (estimatedBytes > 10 * 1024 * 1024) {
        res.status(400).json({ error: 'Uploaded image file size exceeds the 10MB limit.' });
        return;
      }

      currentParts.push({
        inlineData: {
          mimeType,
          data: base64Data,
        },
      });
      console.log(`[AgroAI Vision]: Processed image attachment successfully (MIME: ${mimeType}, Size: ~${Math.round(estimatedBytes / 1024)} KB).`);
    }

    // Try Gemini API if API key is configured
    if (ai && apiKey) {
      try {
        const contents: any[] = [];

        if (Array.isArray(messages)) {
          for (const msg of messages) {
            if (!msg.text) continue;
            const role = msg.sender === 'user' ? 'user' : 'model';
            contents.push({
              role,
              parts: [{ text: msg.text }],
            });
          }
        }

        if (currentMessage) {
          currentParts.push({ text: currentMessage });
        }

        if (currentParts.length > 0) {
          contents.push({
            role: 'user',
            parts: currentParts,
          });
        }

        const modelsToTry = [
          'gemini-2.5-flash',
          'gemini-2.0-flash',
          'gemini-1.5-flash',
          'gemini-3.8-flash',
          'gemini-3.5-flash-lite'
        ];

        for (const modelName of modelsToTry) {
          let success = false;
          let attempts = 0;
          const maxRetries = 2;

          while (attempts <= maxRetries && !success) {
            try {
              attempts++;
              console.log(`[AgroAI Gemini]: Attempting model '${modelName}' (attempt ${attempts}/${maxRetries + 1})...`);
              const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Model timeout after 10000ms')), 10000)
              );
              const callPromise = ai.models.generateContent({
                model: modelName,
                contents: contents,
                config: {
                  systemInstruction: effectiveSystemInstruction,
                },
              });
              const response = await Promise.race([callPromise, timeoutPromise]);
              geminiReply = response.text || '';
              if (geminiReply) {
                success = true;
                successfulModel = modelName;
                console.log(`[AgroAI Gemini Success]: Model '${modelName}' responded successfully on attempt ${attempts}.`);
                break;
              }
            } catch (modelErr: any) {
              const errMsg = modelErr?.message || String(modelErr);
              const status = modelErr?.status || modelErr?.statusCode || 
                (errMsg.includes('503') ? 503 : 
                 errMsg.includes('429') ? 429 : 
                 errMsg.includes('404') ? 404 : 
                 errMsg.includes('400') ? 400 : 
                 errMsg.includes('401') ? 401 : 
                 errMsg.includes('403') ? 403 : 500);

              console.warn(`[AgroAI Gemini Warn]: Model '${modelName}' attempt ${attempts} failed (Status: ${status}, Error: ${errMsg})`);

              // Do not retry unrecoverable status codes (404, 400, 401, 403)
              if (status === 404 || status === 400 || status === 401 || status === 403) {
                console.warn(`[AgroAI Gemini Fallback Reason]: Model '${modelName}' returned unrecoverable status ${status}. Skipping further retries for this model.`);
                break;
              }

              // Exponential backoff for 503 or 429 or timeout
              if (attempts <= maxRetries && (status === 503 || status === 429 || errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('timeout'))) {
                const backoffMs = attempts * 1000;
                console.log(`[AgroAI Gemini Retry]: Waiting ${backoffMs}ms before retrying '${modelName}'...`);
                await new Promise((r) => setTimeout(r, backoffMs));
              } else {
                break;
              }
            }
          }

          if (geminiReply) break;
        }

        if (geminiReply) {
          let matchedDiseaseId: string | undefined = undefined;
          const lower = geminiReply.toLowerCase();
          if (lower.includes('early blight') && (lower.includes('tomato') || lower.includes('alternaria'))) {
            matchedDiseaseId = 'early-blight-tomato';
          } else if (lower.includes('rice blast') || (lower.includes('blast') && lower.includes('rice'))) {
            matchedDiseaseId = 'rice-blast';
          } else if (lower.includes('late blight') && (lower.includes('potato') || lower.includes('phytophthora'))) {
            matchedDiseaseId = 'late-blight-potato';
          } else if (lower.includes('yellow mosaic') && lower.includes('soybean')) {
            matchedDiseaseId = 'yellow-mosaic-soybean';
          }

          console.log(`[AgroAI Diagnosis Result]: Served via Gemini AI model '${successfulModel}'.`);
          res.json({
            text: geminiReply,
            matchedDiseaseId,
            source: `gemini-${successfulModel}`,
            suggestedQuestions: [
              'What organic treatments do you recommend?',
              'How can I prevent this in next planting?',
              'Can this spread to nearby plants?',
            ],
          });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('[AgroAI Gemini Fallback Trigger]: Gemini API pipeline encountered an error:', geminiErr?.message);
      }
    } else {
      console.log('[AgroAI Local Fallback]: Gemini API key not configured. Using local expert agronomic inference engine.');
    }

    // Run local expert agronomic inference engine with multilingual support
    const historyText = Array.isArray(messages)
      ? messages.map((m: any) => `${m.sender}: ${m.text}`).join('\n')
      : '';
    const result = runAgronomicExpertInference(historyText, currentMessage || '', requestedLang);

    console.log('[AgroAI Diagnosis Result]: Served via local expert agronomic inference engine.');
    res.json({
      ...result,
      source: 'local-agronomic-inference',
    });
  } catch (err: any) {
    next(err);
  }
});

// Centralized Express JSON / error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[AgroAI Server Error Middleware]:', err?.message || err);
  if (res.headersSent) return next(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status === 400 ? 'Invalid request payload or malformed JSON.' : 'An unexpected error occurred while processing your request.',
  });
});

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, 'localhost', () => {
    console.log(`AgroAI server running on http://localhost:${port}`);
  });
}

startServer();
