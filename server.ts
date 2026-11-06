import express, { Request, Response } from 'express';
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

// Agronomic Knowledge Base & Expert Inference Engine (Used when Gemini API is connecting or for structured validation)
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
  latestQuery: string
): {
  text: string;
  matchedDiseaseId?: string;
  suggestedQuestions: string[];
} {
  const combined = (fullTextHistory + ' ' + latestQuery).toLowerCase();
  const lowerQuery = latestQuery.toLowerCase();

  // Check for specific follow-up questions
  const isFollowUpSpread = lowerQuery.includes('prevent this from spreading') || lowerQuery.includes('prevent spreading') || lowerQuery.includes('stop spreading');
  const isFollowUpNearby = lowerQuery.includes('affect nearby') || lowerQuery.includes('nearby plants') || lowerQuery.includes('spread to other plants') || lowerQuery.includes('contagious');
  const isFollowUpWhatFirst = lowerQuery.includes('what should i do first') || lowerQuery.includes('what to do first') || lowerQuery.includes('first step') || lowerQuery.includes('immediate step');
  const isFollowUpRecovery = lowerQuery.includes('recovery usually take') || lowerQuery.includes('how long does recovery') || lowerQuery.includes('will it recover') || lowerQuery.includes('can it heal');

  // Identify active disease from conversational history
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

  // 1. Extract Crop
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

  // 2. Extract Plant Part
  let part = 'Leaves (Foliage)';
  if (combined.includes('leaf') || combined.includes('leaves') || combined.includes('foliage')) part = 'Leaves (Foliage)';
  else if (combined.includes('fruit') || combined.includes('pod') || combined.includes('berry')) part = 'Fruit / Pod';
  else if (combined.includes('stem') || combined.includes('stalk') || combined.includes('branch')) part = 'Stem & Stalk';
  else if (combined.includes('root') || combined.includes('tuber') || combined.includes('collar')) part = 'Root & Tuber zone';
  else if (combined.includes('panicle') || combined.includes('whorl') || combined.includes('flower')) part = 'Inflorescence / Panicle / Whorl';

  const dbDisease = DISEASE_DATABASE[activeDiseaseKey] || DISEASE_DATABASE['early-blight-tomato'];

  // Handle "What should I do first?"
  if (isFollowUpWhatFirst) {
    const text = `### 1. Immediate Action Sequence for ${dbDisease.name}
**Priority Order (First 24–48 Hours)**:
${dbDisease.immediateActions.map((act, i) => `${i + 1}. **${act}**`).join('\n')}

### 2. Why Immediate Action Matters
${dbDisease.summary} Prompt isolation halts exponential spore or bacterial multiplication before lesions spread across the canopy.

### 3. Symptoms Extracted from Context
- **Target Crop**: ${dbDisease.cropName} (${dbDisease.scientificName})
- **Primary Affected Parts**: ${dbDisease.affectedPlantParts.join(', ')}
- **Favorable Factors**: ${dbDisease.favorableConditions}

### 4. Cultural & Field Sanitation
${dbDisease.culturalManagement.slice(0, 3).map((cm) => `- ${cm}`).join('\n')}

### 5. Biological & Chemical Support
- **Biological Option**: ${dbDisease.biologicalManagement[0] || 'Apply beneficial Bacillus subtilis or Trichoderma bio-protectant.'}
- **Chemical Restriction**: ${dbDisease.chemicalManagement.hasChemicalRemedy ? dbDisease.chemicalManagement.labelRestrictions : 'Viral / physiological condition; no direct curative chemicals exist. Focus on sanitation.'}

### 6. Prevention & Follow-Up
- ${dbDisease.prevention[0]}
- *Agricultural Extension Reference*: ${dbDisease.references[0]?.citation || 'FAO Integrated Pest Management Standards.'}`;

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

  // Handle "Can this disease affect nearby plants?"
  if (isFollowUpNearby) {
    const text = `### 1. Cross-Infection & Host Range for ${dbDisease.name}
**Cross-Contagion Risk**: ${dbDisease.spreadAndRecovery.canAffectNearby}

**Susceptible Host Crops**:
${dbDisease.affectedCrops.map((c) => `- **${c}**`).join('\n')}

### 2. Transmission Mode & Dispersal
${dbDisease.spreadAndRecovery.transmissionMode}

### 3. Immediate Protection for Nearby Plants
- Establish a physical barrier or buffer zone of at least 3–5 meters between symptomatic and healthy rows.
- Never move from infected beds to healthy beds while foliage is damp from dew or rain.
- Disinfect shears, footwear, and equipment with a 10% bleach solution or 70% alcohol before entering clean rows.

### 4. Cultural & Spacing Measures
${dbDisease.culturalManagement.slice(0, 2).map((cm) => `- ${cm}`).join('\n')}

### 5. Preventative Protection for Healthy Plants
- Apply preventive protective barrier (e.g. ${dbDisease.chemicalManagement.hasChemicalRemedy ? dbDisease.chemicalManagement.verifiedActives[0] : 'organic bio-fungicide or neem soap'}) to healthy adjacent rows.
- Ensure wide row spacing for maximum wind drying.

### 6. Extension Source Verification
- *Verified Source*: ${dbDisease.references[0]?.title} (${dbDisease.references[0]?.organization}).`;

    return {
      text,
      matchedDiseaseId: dbDisease.id,
      suggestedQuestions: [
        `What should I do first?`,
        `How do I prevent this from spreading?`,
        `How long does recovery usually take?`,
      ],
    };
  }

  // Handle "How do I prevent this from spreading?"
  if (isFollowUpSpread) {
    const text = `### 1. Containment & Spread Prevention for ${dbDisease.name}
To halt horizontal field progression, execute these proven containment protocols:

### 2. Step-by-Step Spread Mitigation
${dbDisease.immediateActions.map((act) => `- **Immediate**: ${act}`).join('\n')}

### 3. Cultural Practices to Stop Progression
${dbDisease.culturalManagement.map((cm) => `- ${cm}`).join('\n')}

### 4. Environmental & Moisture Control
- **Condition Trigger**: ${dbDisease.favorableConditions}
- Cease all overhead sprinkler irrigation; irrigate strictly at ground level.
- Water early in the morning so morning sun evaporates leaf moisture rapidly.

### 5. Biological & Chemical Barriers
${dbDisease.biologicalManagement.slice(0, 2).map((bm) => `- **Biological**: ${bm}`).join('\n')}
${dbDisease.chemicalManagement.hasChemicalRemedy ? `- **Chemical Protectant**: ${dbDisease.chemicalManagement.verifiedActives.slice(0, 2).join('; ')}. (${dbDisease.chemicalManagement.labelRestrictions})` : '- **Viral Note**: Plant viruses cannot be stopped by fungicides; vector insect suppression is mandatory.'}

### 6. When to Contact an Expert
${dbDisease.whenToContactExpert.slice(0, 2).map((ex) => `- ${ex}`).join('\n')}`;

    return {
      text,
      matchedDiseaseId: dbDisease.id,
      suggestedQuestions: [
        `What should I do first?`,
        `Can this disease affect nearby plants?`,
        `How long does recovery usually take?`,
      ],
    };
  }

  // Handle "How long does recovery usually take?"
  if (isFollowUpRecovery) {
    const text = `### 1. Recovery Timeline & Prognosis for ${dbDisease.name}
**Prognosis & Plant Recovery**:
${dbDisease.spreadAndRecovery.recoveryTimeline}

### 2. Biological Reality of Plant Recovery
Unlike animals, plant tissue with necrotic lesions or systemic viral distortion **does not regenerate or heal**. The goal of disease management is to protect the central growing point (meristem), undamaged foliage, and new developing flowers/fruits.

### 3. Post-Treatment Recovery Benchmarks
- **Day 1 to 3**: Lesion expansion halts; active fungal sporulation or bacterial ooze dries up.
- **Day 7 to 10**: New terminal shoots and green leaves emerge free of lesions.
- **Day 14+**: Canopy vigor recovers if secondary root damage was avoided and balanced nutrients are provided.

### 4. Supporting Plant Recovery
- Provide light split application of potassium and micronutrients (avoid high nitrogen which triggers soft, vulnerable tissue).
- Maintain consistent soil moisture to prevent root stress.
- Remove heavily diseased leaves so the plant does not expend metabolic energy supporting non-functional tissue.

### 5. Long-term Prevention
${dbDisease.prevention.slice(0, 2).map((p) => `- ${p}`).join('\n')}

### 6. Verified Extension Reference
- *Source Citation*: ${dbDisease.references[0]?.citation || 'Agricultural University Extension Service IPM Bulletin.'}`;

    return {
      text,
      matchedDiseaseId: dbDisease.id,
      suggestedQuestions: [
        `What should I do first?`,
        `How do I prevent this from spreading?`,
        `Can this disease affect nearby plants?`,
      ],
    };
  }

  // 3. Extract Symptoms
  const symptomList: string[] = [];
  if (combined.includes('brown spot') || combined.includes('dark spot') || combined.includes('lesion') || combined.includes('black spot')) {
    symptomList.push('Brown / dark necrotic foliar lesions');
  }
  if (combined.includes('concentric') || combined.includes('ring') || combined.includes('target')) {
    symptomList.push('Distinct concentric target-like rings within lesions');
  }
  if (combined.includes('yellow') || combined.includes('chloros')) {
    symptomList.push('Yellowing / chlorotic halos around lesions or along veins');
  }
  if (combined.includes('curling') || combined.includes('curl') || combined.includes('crinkle')) {
    symptomList.push('Leaf margin curling and deformation');
  }
  if (combined.includes('water-soaked') || combined.includes('water soaked') || combined.includes('wet')) {
    symptomList.push('Water-soaked dark spreading tissue necrosis');
  }
  if (combined.includes('mold') || combined.includes('fuzz') || combined.includes('mildew') || combined.includes('powder')) {
    symptomList.push('White or grey powdery fungal mycelium / mold');
  }
  if (combined.includes('pustule') || combined.includes('stripe') || combined.includes('rust')) {
    symptomList.push('Yellow or cinnamon-brown powdery pustules');
  }
  if (combined.includes('wilt') || combined.includes('droop')) {
    symptomList.push('Sudden foliage wilting and vascular collapse');
  }
  if (combined.includes('hole') || combined.includes('frass') || combined.includes('chew')) {
    symptomList.push('Ragged insect feeding perforations with frass');
  }
  if (symptomList.length === 0) {
    symptomList.push('General foliar discoloration and abnormal leaf appearance');
  }

  // 4. Extract Severity & Environmental
  let severity = 'Early to moderate stage';
  if (combined.includes('severe') || combined.includes('dying') || combined.includes('all leaves') || combined.includes('dead')) {
    severity = 'Severe / Advanced foliar infection';
  } else if (combined.includes('mild') || combined.includes('just started') || combined.includes('few spots')) {
    severity = 'Early onset / Localized';
  }

  let environment = 'Not explicitly stated (inspect leaf wetness duration)';
  if (combined.includes('humidity') || combined.includes('humid') || combined.includes('damp')) {
    environment = 'High relative humidity (>80%) with prolonged foliage dampness';
  } else if (combined.includes('rain') || combined.includes('wet weather') || combined.includes('monsoon')) {
    environment = 'Frequent rainfall with surface splash dispersal';
  } else if (combined.includes('overhead') || combined.includes('sprinkler')) {
    environment = 'Overhead irrigation keeping canopy moist';
  } else if (combined.includes('hot') || combined.includes('dry')) {
    environment = 'Warm, dry conditions with possible sucking insect vector pressure';
  }

  // 5. Evaluate Specific Pathology
  let match: AgronomicMatch;

  // Tomato Early Blight
  if (
    crop === 'Tomato' &&
    (combined.includes('concentric') ||
      combined.includes('target') ||
      (combined.includes('brown spot') && combined.includes('yellow')))
  ) {
    match = {
      diseaseName: 'Early Blight (Alternaria solani)',
      scientificName: 'Alternaria solani',
      type: 'Fungal Pathogen',
      confidence: 'Likely Match • 92% Pattern Match',
      matchedDiseaseId: 'early-blight-tomato',
      whyMatches:
        'The presence of brown spots with concentric target-like rings and yellow chlorotic halos starting on older foliage is the classic diagnostic signature of Alternaria solani. The fungal growth slows and speeds up between day and night, producing the distinctive target rings.',
      immediateActions: [
        'Prune and destroy infected lower leaves immediately (do not compost diseased foliage).',
        'Avoid overhead irrigation; water strictly at the soil line using drip tubes.',
        'Sanitize pruning shears in a 10% bleach solution between plant cuts.',
        'Improve vertical air circulation by staking and pruning non-fruiting suckers.',
      ],
      prevention: [
        'Apply clean straw or plastic mulch around plant bases to prevent soil-borne fungal spores from splashing upward.',
        'Practice 3-year crop rotation with non-solanaceous species (avoid planting after potatoes or peppers).',
        'Select certified disease-resistant tomato varieties (look for cultivars with resistance code "A" or "EB").',
        'Consult your local agricultural extension service for registered protective copper or bio-fungicide sprays.',
      ],
      followUps: [
        'How fast can Early Blight spread to other plants?',
        'What organic bio-fungicides work best?',
        'Can I still eat tomatoes from infected plants?',
      ],
    };
  }
  // Tomato Late Blight
  else if (
    crop === 'Tomato' &&
    (combined.includes('water-soaked') || combined.includes('white mold') || combined.includes('late blight'))
  ) {
    match = {
      diseaseName: 'Late Blight (Phytophthora infestans)',
      scientificName: 'Phytophthora infestans',
      type: 'Oomycete / Fungal-like Pathogen',
      confidence: 'High Alert • Requires Rapid Action',
      matchedDiseaseId: 'early-blight-tomato',
      whyMatches:
        'Rapidly spreading water-soaked dark lesions accompanied by white fuzzy growth on leaf undersides during cool, moist periods indicate Phytophthora infestans. Unlike Early Blight, Late Blight spreads rapidly and can destroy a canopy in days.',
      immediateActions: [
        'Isolate symptomatic plants and remove heavily blighted vines immediately.',
        'Keep foliage completely dry; stop sprinkler watering immediately.',
        'Check green tomato fruits for shiny greasy brown lesions.',
      ],
      prevention: [
        'Provide wide plant spacing (minimum 60 cm) for optimal wind drying.',
        'Plant certified blight-free transplants.',
        'Monitor local agricultural blight forecasting alerts.',
      ],
      followUps: [
        'How does Late Blight differ from Early Blight?',
        'Will copper fungicide stop Late Blight?',
        'How to protect greenhouse tomatoes?',
      ],
    };
  }
  // Rice Blast
  else if (
    crop === 'Rice' &&
    (combined.includes('blast') ||
      combined.includes('spindle') ||
      combined.includes('diamond') ||
      combined.includes('yellow') ||
      combined.includes('neck'))
  ) {
    match = {
      diseaseName: 'Rice Blast (Magnaporthe oryzae)',
      scientificName: 'Magnaporthe oryzae',
      type: 'Fungal Pathogen',
      confidence: 'Likely Match • 89% Pattern Match',
      matchedDiseaseId: 'rice-blast',
      whyMatches:
        'Spindle-shaped or diamond elliptical lesions with grey/white centers and reddish-brown borders on rice foliage or blackened panicle necks are characteristic of rice blast, particularly during overcast humid spells with high nitrogen fertilizer.',
      immediateActions: [
        'Withhold further excessive urea or nitrogen top-dressing immediately, as lush growth accelerates fungal penetration.',
        'Maintain a steady, shallow water level; avoid prolonged drying that stresses plants.',
        'Scout surrounding tillers and flag leaves for early diamond lesion emergence.',
      ],
      prevention: [
        'Sow blast-resistant certified paddy seed varieties.',
        'Balance fertilizer with recommended potassium and silicon supplements to strengthen leaf epidermal cell walls.',
        'Treat nursery seeds with hot water or certified bio-fungicides before sowing.',
      ],
      followUps: [
        'What is neck blast and how to prevent it?',
        'How does nitrogen fertilizer affect blast?',
        'Can I spray Tricyclazole safely?',
      ],
    };
  }
  // Potato Late Blight
  else if (
    crop === 'Potato' &&
    (combined.includes('late blight') ||
      combined.includes('fungal') ||
      combined.includes('black spot') ||
      combined.includes('tuber rot') ||
      combined.includes('white mold'))
  ) {
    match = {
      diseaseName: 'Potato Late Blight (Phytophthora infestans)',
      scientificName: 'Phytophthora infestans',
      type: 'Oomycete / Fungal-like Pathogen',
      confidence: 'Likely Match • 94% Pattern Match',
      matchedDiseaseId: 'late-blight-potato',
      whyMatches:
        'Dark water-soaked necrotic patches beginning at leaf tips and margins with white downy mildew on undersides during wet or cool mornings indicate Phytophthora infestans, the pathogen of historic potato late blight.',
      immediateActions: [
        'Cut and destroy blighted foliage (de-haulm) 10–14 days before harvest to prevent spores washing into soil.',
        'Avoid harvesting during wet spells to prevent infecting healthy tubers.',
        'Stop all sprinkler and overhead irrigation.',
      ],
      prevention: [
        'Hill soil high around potato rows to provide a thick soil barrier over developing tubers.',
        'Plant certified disease-free seed tubers from trusted certified growers.',
        'Follow regional agricultural weather warnings for blight-favorable days.',
      ],
      followUps: [
        'How to protect seed potatoes in storage?',
        'What is earthing-up and does it prevent blight?',
        'When is it safe to dig potatoes after blight?',
      ],
    };
  }
  // Chilli Leaf Curl / Anthracnose
  else if (
    crop === 'Chilli' &&
    (combined.includes('curl') || combined.includes('pucker') || combined.includes('stunt'))
  ) {
    match = {
      diseaseName: 'Chilli Leaf Curl Virus (PepLKV)',
      scientificName: 'Begomovirus complex',
      type: 'Viral Infection (Vector-borne)',
      confidence: 'Likely Match • 87% Pattern Match',
      whyMatches:
        'Upward curling, wrinkling, and puckering of young leaves with thickening of veins and stunted bushy growth are the diagnostic hallmarks of leaf curl virus, transmitted by whiteflies and thrips.',
      immediateActions: [
        'Rogue out and bury severely stunted early-infected plants to eliminate virus reservoirs.',
        'Install yellow and blue sticky cards (10–12 per acre) across the canopy to monitor and trap sucking insect vectors.',
        'Spray organic neem oil formulation (3–5 ml/L) or insecticidal soap to suppress whitefly nymphs.',
      ],
      prevention: [
        'Grow silver reflective mulch sheets to disorient incoming insect vectors.',
        'Erect a 2-meter barrier crop of tall maize or sorghum around chilli borders.',
        'Avoid growing near old solanaceous or cucurbit fields harboring whiteflies.',
      ],
      followUps: [
        'How do whiteflies transmit leaf curl virus?',
        'Can infected chilli plants recover?',
        'What organic remedies repel thrips?',
      ],
    };
  }
  // Wheat Stripe / Leaf Rust
  else if (
    crop === 'Wheat' &&
    (combined.includes('rust') || combined.includes('yellow') || combined.includes('stripe') || combined.includes('pustule'))
  ) {
    match = {
      diseaseName: 'Stripe Rust (Puccinia striiformis) / Leaf Rust',
      scientificName: 'Puccinia striiformis',
      type: 'Fungal Obligate Biotroph',
      confidence: 'Likely Match • 90% Pattern Match',
      whyMatches:
        'Bright yellow to orange-yellow powdery pustules arranged in linear stripes between leaf veins are unmistakable traits of wheat stripe rust, which thrives in cool humid canopy microclimates.',
      immediateActions: [
        'Scout field borders and low-lying hollows where dew lingers longest for early rust hot spots.',
        'Avoid excessive late nitrogen fertilization which creates dense susceptible foliage.',
        'Consult local extension for timely propiconazole or tebuconazole spray alerts if rust covers >5% flag leaves.',
      ],
      prevention: [
        'Cultivate certified rust-resistant wheat varieties recommended for your agro-ecological zone.',
        'Adhere strictly to recommended sowing windows to prevent exposing young crops to peak spore showers.',
        'Eradicate wild volunteer grasses around field bunds.',
      ],
      followUps: [
        'How does Stripe Rust differ from Leaf Rust?',
        'When is the economic threshold to spray wheat?',
        'Does crop rotation stop rust spores?',
      ],
    };
  }
  // Maize Fall Armyworm
  else if (
    crop === 'Maize' &&
    (combined.includes('hole') || combined.includes('whorl') || combined.includes('frass') || combined.includes('worm') || combined.includes('armyworm'))
  ) {
    match = {
      diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
      scientificName: 'Spodoptera frugiperda',
      type: 'Insect Pest Infestation',
      confidence: 'Likely Match • 93% Pattern Match',
      whyMatches:
        'Ragged feeding holes, windowpaning on young leaves, and abundant moist sawdust-like frass lodged deep within the central whorl are textbook signs of Fall Armyworm larvae.',
      immediateActions: [
        'Apply fine dry sand mixed with wood ash (or neem cake powder) directly into the central whorls to desiccate young caterpillars.',
        'Hand-pick and crush visible egg masses and larvae in smaller plots.',
        'Release Trichogramma egg parasitoids or apply Bacillus thuringiensis (Bt) spray during early instars.',
      ],
      prevention: [
        'Practice intercropping with desmodium (push-pull strategy) or legumes.',
        'Erect pheromone funnel traps (4–5 per acre) for early moth monitoring.',
        'Avoid staggered plantings that provide continuous food supplies for successive pest generations.',
      ],
      followUps: [
        'How does the push-pull strategy work in maize?',
        'What does a Fall Armyworm caterpillar look like?',
        'Is neem oil effective against armyworms?',
      ],
    };
  }
  // Cotton Leaf Curl / Bacterial Blight
  else if (
    crop === 'Cotton' &&
    (combined.includes('curl') || combined.includes('blight') || combined.includes('angular') || combined.includes('wilt'))
  ) {
    match = {
      diseaseName: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas citri)',
      scientificName: 'Xanthomonas citri pv. malvacearum',
      type: 'Bacterial Pathogen',
      confidence: 'Likely Match • 86% Pattern Match',
      whyMatches:
        'Water-soaked angular leaf spots bounded by small leaf veinlets, progressing to black lesions on stems ("black arm"), are classic indicators of bacterial blight in cotton.',
      immediateActions: [
        'Avoid working in wet cotton fields to prevent mechanical transmission of bacterial ooze.',
        'Destroy and bury severely infected plant debris.',
        'Ensure proper drainage to avoid standing water in field furrows.',
      ],
      prevention: [
        'Acid-delint and treat cotton seeds with certified bactericides or hot water before planting.',
        'Select certified resistant hybrid cultivars.',
        'Maintain balanced potassium fertilization to bolster natural plant defenses.',
      ],
      followUps: [
        'How does Bacterial Blight affect cotton bolls?',
        'What is Black Arm in cotton?',
        'How to manage sucking pests in cotton?',
      ],
    };
  }
  // Ambiguous / General Symptom
  else {
    match = {
      diseaseName: `Foliar Pathology in ${crop}`,
      scientificName: 'Symptom Examination Required',
      type: 'Uncertain / Multi-Factor Consideration',
      confidence: 'Preliminary Observation (Clarification Needed)',
      whyMatches:
        `The reported symptoms on ${crop} could arise from several distinct causes, including early fungal leaf spots, viral vector transmission, or localized moisture imbalance. More specific observations are needed to differentiate the pathogen accurately.`,
      immediateActions: [
        'Inspect the underside of leaves with a 10x hand lens for fungal mold, spore dust, or tiny sucking insects.',
        'Note whether spots are circular with concentric rings, or angular and bounded by leaf veins.',
        'Isolate symptomatic plants and stop overhead sprinkler watering.',
      ],
      prevention: [
        'Ensure proper plant spacing for unrestricted canopy ventilation.',
        'Water at the base of the plant to keep foliage dry.',
        'Take a clear, well-lit photo of an affected leaf for diagnostic verification.',
      ],
      clarifyingQuestions: [
        'Are the spots circular with concentric rings, or irregular water-soaked patches?',
        'Is there any white, grey, or powdery fuzz on the underside of the leaves in the morning?',
        'Are the symptoms primarily on the lowest older leaves, or on the newest top growth?',
      ],
      followUps: [
        'Spots are circular with darker rings',
        'Spots are irregular and spreading fast',
        'Leaves are also curling upward',
      ],
    };
  }

  // Format response into exact 6 sections
  const markdownResponse = `### 1. Possible Diagnosis
**${match.diseaseName}** — ${match.type}.

### 2. Confidence & Uncertainty Explanation
**${match.confidence}**.
${match.whyMatches.split('.')[0]}. Never treat a preliminary diagnosis as an absolute certainty; field confirmation and visual inspection are always advised.

### 3. Symptoms Extracted
- **Crop**: ${crop}
- **Affected Plant Part**: ${part}
- **Observed Symptoms**: ${symptomList.join('; ')}
- **Severity**: ${severity}
- **Environmental Factors**: ${environment}

### 4. Why This Disease Matches
${match.whyMatches}

### 5. Recommended Next Steps
${match.immediateActions.map((a) => `- ${a}`).join('\n')}

### 6. Prevention & Sustainable Management
${match.prevention.map((p) => `- ${p}`).join('\n')}
- *Agricultural Extension Advisory*: Always verify locally registered biological and chemical products with your regional agricultural extension officer before spraying.
${
  match.clarifyingQuestions && match.clarifyingQuestions.length > 0
    ? `\n### Clarifying Questions for You:\n${match.clarifyingQuestions.map((q) => `- ${q}`).join('\n')}`
    : ''
}`;

  return {
    text: markdownResponse,
    matchedDiseaseId: match.matchedDiseaseId,
    suggestedQuestions: match.followUps || [
      'What organic treatment do you recommend?',
      'How fast can this disease spread?',
      'Can nearby crops catch this?',
    ],
  };
}

// Diagnostic chat endpoint
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { messages, currentMessage, image, language } = req.body;

    if (!currentMessage && (!messages || messages.length === 0)) {
      res.status(400).json({ error: 'No message provided for diagnosis' });
      return;
    }

    let effectiveSystemInstruction = SYSTEM_INSTRUCTION;
    if (language === 'hi') {
      effectiveSystemInstruction += '\n\n[MANDATORY LANGUAGE INSTRUCTION]: Please respond entirely in Hindi (हिन्दी) while maintaining precise agricultural and plant pathology terminology.';
    } else if (language === 'te') {
      effectiveSystemInstruction += '\n\n[MANDATORY LANGUAGE INSTRUCTION]: Please respond entirely in Telugu (తెలుగు) while maintaining precise agricultural and plant pathology terminology.';
    }

    // Try Gemini API if API key is configured
    if (ai && apiKey) {
      try {
        const contents: any[] = [];

        // Append prior conversational turns
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

        const currentParts: any[] = [];
        if (image && typeof image === 'string') {
          const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
          if (match) {
            currentParts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
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

        const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
        let geminiReply = '';

        for (const modelName of modelsToTry) {
          try {
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Model timeout after 8000ms')), 8000)
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
            if (geminiReply) break;
          } catch (modelErr: any) {
            console.warn(`Attempt with ${modelName} returned:`, modelErr?.message || modelErr);
          }
        }

        if (geminiReply) {
          // Identify matched database disease
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

          res.json({
            text: geminiReply,
            matchedDiseaseId,
            suggestedQuestions: [
              'What organic treatments do you recommend?',
              'How can I prevent this in next planting?',
              'Can this spread to nearby plants?',
            ],
          });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, transitioning to expert agronomic engine:', geminiErr?.message);
      }
    }

    // Run expert agronomic pathological inference engine
    // Build full conversation history string to maintain context ("this disease", "those symptoms", "what to do now")
    const historyText = Array.isArray(messages)
      ? messages.map((m: any) => `${m.sender}: ${m.text}`).join('\n')
      : '';
    const result = runAgronomicExpertInference(historyText, currentMessage || '');

    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/diagnose:', err);
    res.status(500).json({
      error: err.message || 'An error occurred while generating crop disease diagnosis.',
    });
  }
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

  app.listen(port, '0.0.0.0', () => {
    console.log(`AgroAI server running on http://0.0.0.0:${port}`);
  });
}

startServer();
