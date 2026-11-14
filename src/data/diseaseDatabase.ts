import { Disease } from '../types';

export const DISEASE_DATABASE: Record<string, Disease> = {
  'early-blight-tomato': {
    id: 'early-blight-tomato',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    causativeOrganism: 'Alternaria solani (Ascomycete Fungus)',
    cropId: 'tomato',
    cropName: 'Tomato',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Nightshade weeds'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 92%',
    thumbnailUrl: '/src/assets/images/disease_early_blight_1793973952649.jpg',
    summary: 'Causes circular brown spots with concentric target rings and yellow halos, beginning on older lower foliage.',
    detailedDescription:
      'Early blight is a widespread fungal disease caused by Alternaria solani. It initiates on older foliage near the ground where humidity and soil contact are greatest. As lesions enlarge, concentric rings develop due to alternating day/night spore expansion, eventually defoliating plants and causing collar rot on stems.',
    symptoms: [
      'Brown to black circular spots with distinct concentric rings (target pattern)',
      'Chlorotic yellow halos surrounding expanding leaf lesions',
      'Premature leaf drop from the base of the plant moving upward',
      'Dark, sunken, leathery cankers on stems and collar rot near soil level',
      'Sunken concentric dark lesions on fruit near stem attachment',
    ],
    affectedPlantParts: ['Lower foliage', 'Stems', 'Fruit pedicels', 'Fruit calyx'],
    favorableConditions:
      'Warm temperatures (24°C–29°C / 75°F–85°F) combined with extended leaf wetness (>8 hours) from rain, dew, or overhead irrigation.',

    // A. Immediate actions
    immediateActions: [
      'Immediately prune and remove infected lower leaves before spores wash upward.',
      'Dispose of diseased plant debris away from the field or seal in bags; do not compost.',
      'Stop all overhead and sprinkler watering; irrigate strictly at the soil base via drip or soaker hoses.',
      'Sanitize pruning tools in a 10% bleach solution or 70% ethanol between every cut.',
    ],

    // B. Cultural management
    culturalManagement: [
      'Crop rotation: Maintain a 3 to 4 year rotation cycle away from all solanaceous crops (tomatoes, potatoes, peppers, eggplants).',
      'Field sanitation: Thoroughly incorporate or remove crop residues immediately following the final harvest.',
      'Plant spacing & airflow: Space plants 45–60 cm (18–24 in) apart within rows and trellis or stake vines vertically.',
      'Mulching: Lay clean organic straw, wood shavings, or plastic mulch to form a barrier preventing rain splash of soil-borne inoculum.',
    ],

    // C. Biological management
    biologicalManagement: [
      'Bacillus subtilis (strain QST 713): Apply as a preventive bio-fungicide to colonize leaf surfaces before fungal spore germination.',
      'Trichoderma harzianum: Inoculate soil and nursery potting mix to suppress overwintering chlamydospores.',
      'Copper octanoate (copper soap): Acceptable in many certified organic production systems for early-stage foliar suppression.',
    ],

    // D. Chemical management
    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Chlorothalonil (broad-spectrum protective contact fungicide)',
        'Copper hydroxide / Copper oxychloride (protectant contact formulation)',
        'Azoxystrobin (QoI group 11 systemic fungicide; rotate modes of action)',
        'Mancozeb (dithiocarbamate multi-site protective barrier)',
      ],
      labelRestrictions:
        'Always verify product registration with local agricultural authorities. Adhere strictly to the Pre-Harvest Interval (PHI) of 0–7 days depending on product formulation. Observe worker Re-Entry Intervals (REI) of 12–48 hours.',
      cautionNote:
        'Dosages, spray intervals, and commercial formulations vary by jurisdiction. Never exceed label application rates. Always rotate FRAC chemical groups to prevent fungicide resistance.',
    },

    // E. Prevention
    prevention: [
      'Use certified pathogen-free seeds and disease-tested nursery transplants.',
      'Select cultivars with documented tolerance or partial resistance to Alternaria solani.',
      'Inspect fields twice weekly during warm humid weather, focusing on the lower 30 cm of canopy.',
      'Maintain balanced nitrogen nutrition; avoid over-fertilizing with excess nitrogen that produces soft, susceptible foliage.',
    ],

    whenToContactExpert: [
      'If lesions appear on stems causing collar girdling on young plants.',
      'When more than 25% of the lower canopy is defoliated within 7 days.',
      'If symptoms persist despite two preventive copper or bio-fungicide applications.',
      'To obtain official laboratory confirmation differentiating Early Blight from Septoria Leaf Spot or Late Blight.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Yes. Conidia spores are readily spread by wind, water splashing, insects, and contaminated tools to adjacent solanaceous plants.',
      recoveryTimeline: 'Affected leaves cannot heal and must be removed. With prompt sanitation and moisture control, new vegetative flush recovers within 10–14 days.',
      transmissionMode: 'Wind-borne conidia, rain splash from infested soil, and mechanical transfer during wet cultivation.',
    },

    references: [
      {
        title: 'Tomato Early Blight Management Guidelines',
        organization: 'University of California Statewide IPM Program (UC IPM)',
        citation: 'UC IPM Pest Management Guidelines: Tomato. UC ANR Publication 3470.',
      },
      {
        title: 'Compendium of Tomato Diseases and Pests',
        organization: 'American Phytopathological Society (APS Press)',
        citation: 'Jones, J.B. et al., APS Compendium Series, 2nd Edition.',
      },
      {
        title: 'Integrated Pest Management for Solanaceous Crops',
        organization: 'FAO Plant Production and Protection Division',
        citation: 'Food and Agriculture Organization of the United Nations (FAO IPM AGP).',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'late-blight-tomato': {
    id: 'late-blight-tomato',
    name: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    causativeOrganism: 'Phytophthora infestans (Oomycete / Water Mold)',
    cropId: 'tomato',
    cropName: 'Tomato',
    affectedCrops: ['Tomato', 'Potato', 'Petunia', 'Hairy nightshade'],
    type: 'Oomycete',
    confidenceMatch: 'High Alert • Fast Spread',
    thumbnailUrl: '/src/assets/images/tomato_late_blight.jpg',
    summary: 'Rapidly spreading dark water-soaked patches on leaves with white fuzzy fungal mold on undersides during humid weather.',
    detailedDescription:
      'Late blight is a devastating oomycete infection capable of destroying whole tomato and potato fields within days. Lesions start as pale green to dark water-soaked patches that turn brown and papery. In high humidity, a distinctive white downy mold appears on the underside of leaves.',
    symptoms: [
      'Large, irregular water-soaked dark green to purplish-brown lesions on leaves and stems',
      'White cottony or downy sporulation on the underside of affected leaves in morning humidity',
      'Greasy, olive-brown sunken blotches on green and ripening tomato fruits',
      'Rapid death and collapse of foliage resembling frost damage',
    ],
    affectedPlantParts: ['Entire canopy', 'Stems', 'Fruit', 'Petioles'],
    favorableConditions:
      'Cool to moderate temperatures (12°C–20°C / 54°F–68°F) accompanied by relative humidity above 90% and continuous leaf wetness.',

    immediateActions: [
      'Immediately isolate and bag heavily blighted plants to prevent billions of airborne sporangia from traveling downwind.',
      'Stop all sprinkler and overhead irrigation immediately; keep vines as dry as possible.',
      'Alert neighboring commercial growers and local agricultural extension, as late blight is a community-level epidemic pathogen.',
      'Do not harvest fruit or cultivate fields while foliage is wet.',
    ],

    culturalManagement: [
      'Destroy volunteer tomato and potato cull piles within 500 meters of planting areas.',
      'Maximize row spacing (minimum 75 cm / 30 in) and align rows parallel to prevailing winds for rapid drying.',
      'Avoid planting tomatoes immediately downwind of potato production fields.',
      'Sanitize all machinery, crates, and stakes with quaternary ammonium or 10% bleach.',
    ],

    biologicalManagement: [
      'Bacillus amyloliquefaciens: Foliar bio-protectant to suppress oomycete zoospore attachment before rain events.',
      'Copper-based formulations: Fixed copper hydroxide applied strictly as a preventive barrier before infection periods.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Cymoxanil (curative penetrating oomycide; must be paired with protectant)',
        'Mandipropamid (carboxylic acid amide oomycide; FRAC 40)',
        'Dimethomorph (cell wall biosynthesis inhibitor; FRAC 40)',
        'Mancozeb or Chlorothalonil (broad-spectrum protective shield)',
      ],
      labelRestrictions:
        'Late blight treatments are strictly preventative or early-curative; once disease exceeds 5% field severity, chemical control fails. Follow strict PHI limitations and rotate FRAC codes to prevent resistant strains (e.g. US-23).',
      cautionNote:
        'Dosages must follow local EPA or national pesticide registrations. Never apply systemic oomycides without an alternating protective contact partner.',
    },

    prevention: [
      'Plant only certified disease-free seedlings and inspected tubers.',
      'Choose resistant cultivars with Ph-2 and Ph-3 gene combinations (e.g., Mountain Magic, Defiant, Iron Lady).',
      'Sign up for regional Late Blight Decision Support Systems (e.g. BlightWatch or USABlight forecasts).',
    ],

    whenToContactExpert: [
      'Immediately upon first suspected observation of white downy mildew on leaf undersides.',
      'If community blight alerts have been declared for your county or province.',
      'To submit sample leaf tissue for genotype strain tracking (e.g. US-23 vs. EU strains).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Extremely high risk. Airborne sporangiospores can travel several kilometers on moist overcast wind currents.',
      recoveryTimeline: 'Severely affected vines do not recover. If caught at initial infection point (<1% plants), prompt excision may save remaining plants.',
      transmissionMode: 'Airborne sporangia carried on wind, driving rain, and infested volunteer tubers.',
    },

    references: [
      {
        title: 'USABlight Late Blight Information and Decision Support Portal',
        organization: 'USDA National Institute of Food and Agriculture (NIFA)',
        citation: 'USABlight Integrated National Monitoring Network, NC State University.',
      },
      {
        title: 'Late Blight of Tomato and Potato',
        organization: 'Cornell University Extension Vegetable Pathology',
        citation: 'Smart, C.D. et al., Cornell AgriTech Plant Pathology Factsheet.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'tomato-yellow-leaf-curl': {
    id: 'tomato-yellow-leaf-curl',
    name: 'Tomato Yellow Leaf Curl',
    scientificName: 'Tomato yellow leaf curl virus (TYLCV)',
    causativeOrganism: 'Tomato yellow leaf curl virus (Begomovirus / Viral)',
    cropId: 'tomato',
    cropName: 'Tomato',
    affectedCrops: ['Tomato', 'Pepper', 'Bean', 'Tobacco', 'Weeds (Datura, Malva)'],
    type: 'Viral',
    confidenceMatch: 'Likely Match • 88%',
    thumbnailUrl: '/src/assets/images/tomato_yellow_leaf_curl.jpg',
    summary: 'Viral disease causing dramatic upward cupping of leaves, yellow interveinal chlorosis, and bushy severe stunting.',
    detailedDescription:
      'Tomato Yellow Leaf Curl Virus (TYLCV) is a devastating begomovirus transmitted exclusively by the silverleaf whitefly (Bemisia tabaci). Infected plants exhibit small curled leaves, severe internode shortening, and near-complete flower drop.',
    symptoms: [
      'Upward curling and cupping of leaflets with crinkled puckered margins',
      'Interveinal chlorosis (prominent yellowing between green veins)',
      'Marked stunting of plants with a dense, bushy "witchs broom" appearance',
      'Flower abortion and failure to set marketable fruit',
    ],
    affectedPlantParts: ['Young terminal shoots', 'Leaflets', 'Flowers'],
    favorableConditions:
      'Warm, dry climatic zones (28°C–36°C) that favor rapid reproduction and dispersal of silverleaf whitefly vectors.',

    immediateActions: [
      'Rogue out and destroy infected symptomatic plants immediately into sealed plastic bags to prevent vector feeding.',
      'Install yellow sticky traps (15–20 per hectare/greenhouse) to gauge adult whitefly population density.',
      'Inspect the underside of young leaves for tiny powdery white adult flies and translucent flat nymphs.',
    ],

    culturalManagement: [
      'Establish a 2-month crop-free period (host-free bridge) between solanaceous plantings.',
      'Use UV-reflective silver or aluminized plastic mulches to disorient incoming flying whiteflies.',
      'Erect fine insect-exclusion netting (50-mesh screen) in nursery and greenhouse structures.',
      'Eliminate alternative host weeds (such as nightshades, mallows, and datura) around perimeter borders.',
    ],

    biologicalManagement: [
      'Encourage natural predators: Encarsia formosa and Eretmocerus parasitic wasps.',
      'Apply horticultural insecticidal soap or pure neem seed extract (azadirachtin) against nymphal stages.',
      'Beauveria bassiana (entomopathogenic fungus) sprays for whitefly population suppression.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: false,
      verifiedActives: [
        'NO DIRECT CHEMICAL CURE EXISTS FOR PLANT VIRUSES.',
        'Management focuses strictly on controlling the whitefly insect vector (e.g. Spiromesifen, Cyantraniliprole, or Acetamiprid where permitted).',
      ],
      labelRestrictions:
        'Do not spray fungicides or bactericides; they have zero efficacy against viral pathogens. Use vector insecticides strictly according to IRAC resistance management rotations.',
      cautionNote:
        'Never spray unauthorized toxic cocktails. Misuse of insecticides destroys natural whitefly predators and worsens viral transmission.',
    },

    prevention: [
      'Plant TYLCV-resistant or tolerant hybrid tomato varieties (look for cultivars bearing the Ty-1, Ty-2, or Ty-3 resistance genes).',
      'Raise all nursery transplants under strictly protected 50-mesh insect screen tunnels.',
      'Maintain clean borders free from weed reservoirs.',
    ],

    whenToContactExpert: [
      'If upward leaf curling is accompanied by sudden explosive whitefly swarms.',
      'To differentiate TYLCV from herbicide drift (e.g. 2,4-D injury) or physiological leaf roll caused by high heat.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High risk if whitefly vectors are present. Whiteflies transmit the virus persistently within 15–30 minutes of feeding.',
      recoveryTimeline: 'Virally infected tomato plants never recover. Early-infected plants should be discarded.',
      transmissionMode: 'Exclusively transmitted by the silverleaf whitefly (Bemisia tabaci); not seed-borne or sap-transmissible through touch.',
    },

    references: [
      {
        title: 'Management of Tomato Yellow Leaf Curl Virus',
        organization: 'University of Florida IFAS Extension',
        citation: 'Polston, J.E. & Lapidot, M., EDIS Publication PP-341.',
      },
      {
        title: 'Global Emergence and Distribution of Begomoviruses',
        organization: 'EPPO Global Database',
        citation: 'European and Mediterranean Plant Protection Organization Data Sheet on TYLCV.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'bacterial-canker-tomato': {
    id: 'bacterial-canker-tomato',
    name: 'Tomato Bacterial Canker',
    scientificName: 'Clavibacter michiganensis subsp. michiganensis',
    causativeOrganism: 'Clavibacter michiganensis (Gram-positive Bacterium)',
    cropId: 'tomato',
    cropName: 'Tomato',
    affectedCrops: ['Tomato', 'Pepper', 'Solanaceous weeds'],
    type: 'Bacterial',
    confidenceMatch: 'Likely Match • 85%',
    thumbnailUrl: '/src/assets/images/tomato_bacterial_canker.jpg',
    summary: 'Systemic vascular browning, wilting on one side of leaf, and characteristic white bird’s-eye spots with dark centers on fruit.',
    detailedDescription:
      'Bacterial canker is a highly infectious seed- and tool-transmitted vascular disease. Bacteria colonize xylem vessels, producing unilateral wilting of leaflets, necrotic marginal leaf firing, and distinctive white raised spots with dark centers (birds-eye spots) on developing fruit.',
    symptoms: [
      'Unilateral wilting: leaflets on only one side of a compound leaf wilt first',
      'Marginal browning and upward curling of lower leaves (leaf firing)',
      'Tan-to-brown vascular discoloration visible inside sliced stems',
      'Small, circular white raised blisters on fruit with dark central speck (birds-eye spots)',
      'Open pith cavities and stem splitting in advanced stages',
    ],
    affectedPlantParts: ['Vascular xylem', 'Stems', 'Foliage margins', 'Fruit skin'],
    favorableConditions:
      'Warm temperatures (25°C–28°C / 77°F–82°F) paired with wet foliage, overhead irrigation, and handling/pruning of wet plants.',

    immediateActions: [
      'Immediately remove and destroy systemically wilted plants and adjacent border plants.',
      'Do not prune, tie, or sucker plants while foliage is damp.',
      'Disinfect all stakes, wire trellises, and hands with certified sanitizer.',
    ],

    culturalManagement: [
      'Implement a minimum 3-year rotation away from tomatoes and solanaceous crops.',
      'Use hot-water treated certified seed (50°C / 122°F for 25 minutes).',
      'Never prune plants with wet machinery or bare hands during humid mornings.',
    ],

    biologicalManagement: [
      'Bacteriophage treatments: Formulations targeted specifically against Clavibacter michiganensis where commercially registered.',
      'Bacillus subtilis bio-fungicide/bactericide soil drenches for root colonization.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Fixed copper compounds (Copper hydroxide) tank-mixed with Mancozeb (synergistic bactericidal shield)',
        'Peroxyacetic acid / Hydrogen dioxide formulations (contact greenhouse surface sanitizers)',
      ],
      labelRestrictions:
        'Chemical sprays cannot cure systemic vascular infections; they only slow secondary foliar spread. Observe worker safety intervals.',
      cautionNote:
        'Never rely solely on copper sprays, as many bacterial strains develop copper resistance under frequent prophylactic usage.',
    },

    prevention: [
      'Source certified disease-free seeds tested negative for Clavibacter.',
      'Employ clean seedling trays; never reuse unsterilized polystyrene trays.',
      'Use drip irrigation instead of sprinkler systems to eliminate bacterial splash.',
    ],

    whenToContactExpert: [
      'When bird’s-eye spots appear on fruit batches intended for commercial sale.',
      'To perform laboratory ELISA or PCR testing to distinguish Clavibacter from Ralstonia bacterial wilt.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Extremely contagious via pruning shears, hands, splashing water, and clip-staking tools.',
      recoveryTimeline: 'Systemic bacterial canker cannot be cured inside infected plants; focus is on preventing clean plants from becoming contaminated.',
      transmissionMode: 'Contaminated seed coats, mechanical transmission during pruning, and splashing rain/irrigation.',
    },

    references: [
      {
        title: 'Bacterial Canker of Tomato Factsheet',
        organization: 'Ohio State University Extension Plant Pathology',
        citation: 'Miller, S.A. et al., OSU Extension Bulletin HYG-3120.',
      },
      {
        title: 'Management of Clavibacter in Greenhouse and Field Tomatoes',
        organization: 'University of California IPM',
        citation: 'UC IPM Pest Management Guidelines: Tomato Bacterial Canker.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'late-blight-potato': {
    id: 'late-blight-potato',
    name: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    causativeOrganism: 'Phytophthora infestans (Oomycete / Water Mold)',
    cropId: 'potato',
    cropName: 'Potato',
    affectedCrops: ['Potato', 'Tomato', 'Eggplant'],
    type: 'Oomycete',
    confidenceMatch: 'Likely Match • 94%',
    thumbnailUrl: '/src/assets/images/crop_potato_tubers_1793973980699.jpg',
    summary: 'Water-soaked blackening leaf margins, white cottony mold underneath in damp mornings, and rotting tubers with foul odor.',
    detailedDescription:
      'Late blight of potato is the historic causal agent of the Great Irish Famine. It spreads with catastrophic rapidity in cool, damp weather, destroying foliage and washing into soil to rot tubers into a purplish-brown granular decay.',
    symptoms: [
      'Water-soaked dark green/black irregular patches on leaf tips and margins',
      'White cottony fuzzy growth on leaf undersides in high morning humidity',
      'Brown purplish dry rot beneath tuber skins, extending into fleshy pulp',
      'Rapid stem lesions turning black and collapsing whole hills',
    ],
    affectedPlantParts: ['Foliage', 'Stems', 'Underground tubers', 'Stolons'],
    favorableConditions:
      'Temperatures between 10°C–20°C (50°F–68°F) accompanied by relative humidity above 90% and continuous free moisture on leaves.',

    immediateActions: [
      'Destroy and burn or deeply bury infected haulms (foliage) before fungal spores wash down into tuber hills.',
      'Do not harvest wet tubers; wait for dry sunny weather to minimize spore transfer.',
      'Stop sprinkler and overhead irrigation immediately.',
      'De-haulm (cut and destroy vines) at least 14 days prior to harvest to toughen tuber skins.',
    ],

    culturalManagement: [
      'Plant certified disease-free seed tubers with official certification tags.',
      'Ridge soil high around potato hills (25–30 cm) to create a thick physical soil buffer against washing spores.',
      'Eliminate all cull piles and volunteer potatoes growing near fields in spring.',
      'Allow tubers to dry completely before grading and binning into storage.',
    ],

    biologicalManagement: [
      'Bacillus amyloliquefaciens: Preventive foliar bio-fungicide applied before forecasted rainy periods.',
      'Copper oxychloride: Organic protectant barrier applied before leaf wetness events.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Cymoxanil + Mancozeb (curative translaminar + protective barrier combination)',
        'Fluopicolide (FRAC 43 systemic oomycide; delivers high translaminar protection)',
        'Mandipropamid (FRAC 40 preventative oomycide)',
        'Propamocarb hydrochloride (systemic protection for active canopy growth)',
      ],
      labelRestrictions:
        'Must be applied before disease exceeds economic thresholds (<1% incidence). Maintain minimum 7-day spray intervals and adhere strictly to harvest withdrawal times (PHI 7–14 days).',
      cautionNote:
        'Never spray systemic compounds consecutively. Rotate FRAC modes of action to prevent the development of resistant strains.',
    },

    prevention: [
      'Choose resistant cultivars (e.g. Defender, Elba, Sarpo Mira, Kufri Girdhari).',
      'Subscribe to regional Late Blight Decision Support Systems (e.g. BlightWatch).',
      'Store harvested tubers at 10°C–13°C for curing, then ramp down with good ventilation.',
    ],

    whenToContactExpert: [
      'When lesions are detected on tubers in field or storage bins.',
      'To confirm strain type (e.g., A1 vs A2 mating type or metalaxyl-resistant strain).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Very high contagion. Wind-borne sporangia can travel miles downwind during cloudy, damp weather.',
      recoveryTimeline: 'Infected leaves cannot recover. Prompt haulm destruction protects underground tubers from rot.',
      transmissionMode: 'Airborne sporangiospores, infested seed tubers, and rain splash into soil.',
    },

    references: [
      {
        title: 'Potato Late Blight Epidemiology and Management',
        organization: 'International Potato Center (CIP)',
        citation: 'CIP Technical Manual on Integrated Disease Management in Potato.',
      },
      {
        title: 'Commercial Potato Production in North America',
        organization: 'Potato Association of America (PAA)',
        citation: 'PAA Production Guide, University of Maine Extension.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'rice-blast': {
    id: 'rice-blast',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    causativeOrganism: 'Magnaporthe oryzae (Pyricularia oryzae / Ascomycete Fungus)',
    cropId: 'rice',
    cropName: 'Rice',
    affectedCrops: ['Rice', 'Barley', 'Millet', 'Grasses'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 89%',
    thumbnailUrl: '/src/assets/images/rice_blast.jpg',
    summary: 'Causes spindle-shaped diamond lesions on leaves and neck rot that prevents grain filling.',
    detailedDescription:
      'Rice blast is one of the most destructive cereal diseases worldwide. It infects seedlings, tillers, nodes, and panicle necks (neck blast). Leaf spots have grey/white centers with brown to purple borders resembling diamonds or spindles.',
    symptoms: [
      'Spindle-shaped or diamond elliptical lesions with grey/white centers and reddish-brown borders',
      'Rotting and blackening of panicle neck (neck blast), causing empty white grain heads',
      'Brown or black nodal lesions causing stem breakage at nodes',
      'Seedling leaf drying and wilting resembling fire scorch',
    ],
    affectedPlantParts: ['Leaf blades', 'Panicle neck', 'Stem nodes', 'Seeds'],
    favorableConditions:
      'Cool nighttime temperatures (18°C–22°C), high relative humidity (>90%), cloudy overcast weather, and excessive application of nitrogen fertilizer.',

    immediateActions: [
      'Immediately halt any additional urea or nitrogen fertilizer top-dressing.',
      'Maintain steady, shallow water level (2–5 cm) in paddies; avoid drying out the field during active tillering.',
      'Scout the flag leaf and boot leaf carefully as panicle emergence approaches.',
    ],

    culturalManagement: [
      'Balanced fertilization: Apply nitrogen in split doses combined with recommended potash (K) and silica (Si) to strengthen cell walls.',
      'Adjust planting dates: Schedule transplanting to avoid heading during peak overcast, foggy monsoon weeks.',
      'Field sanitation: Burn or thoroughly plow under straw stubble from previously blast-infected paddies.',
    ],

    biologicalManagement: [
      'Pseudomonas fluorescens: Seed treatment and foliar spray to induce systemic acquired resistance (SAR).',
      'Trichoderma asperellum: Nursery bed soil treatment to reduce seed-borne inoculum.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Tricyclazole 75 WP (standard systemic melanin biosynthesis inhibitor; highly effective at boot stage)',
        'Isoprothiolane (systemic fungicide effective against foliar and neck blast)',
        'Azoxystrobin + Difenoconazole (broad-spectrum protective and curative mix)',
        'Kasugamycin (antibiotic fungicide with high safety margins for aquatic fauna)',
      ],
      labelRestrictions:
        'Spray at early boot stage (prior to 5% panicle emergence) for neck blast prevention. Do not discharge paddy water into natural water bodies for at least 7 days post-treatment. Follow local environmental regulations.',
      cautionNote:
        'Always follow certified national extension guidelines. Never overdose chemical treatments in wetland paddy ecosystems.',
    },

    prevention: [
      'Plant blast-resistant certified seed varieties suited to your state or agro-climatic zone.',
      'Treat seed with hot water (52°C for 10 min) or certified seed-dressing fungicide before nursery bed sowing.',
      'Ensure proper transplant density; avoid ultra-dense planting that traps canopy humidity.',
    ],

    whenToContactExpert: [
      'If lesions appear on panicle necks (neck blast) during grain filling.',
      'If blast symptoms appear despite planting a labeled resistant cultivar (possible breakdown of resistance).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High risk. Airborne conidia are released in enormous quantities during humid nights and carried by wind.',
      recoveryTimeline: 'Tillering rice can produce healthy new leaves if nitrogen is withheld and moisture is stabilized; neck blast damage cannot be reversed.',
      transmissionMode: 'Airborne spores, infected seed lots, and overwintering rice straw debris.',
    },

    references: [
      {
        title: 'Rice Blast Management Manual',
        organization: 'International Rice Research Institute (IRRI)',
        citation: 'IRRI Rice Knowledge Bank: Rice Blast Diagnostic and Management Portal.',
      },
      {
        title: 'Package of Practices for Rice Pathology',
        organization: 'ICAR - National Rice Research Institute (NRRI)',
        citation: 'NRRI Extension Bulletin on Cereal Disease Management, Cuttack, India.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'bacterial-leaf-blight-rice': {
    id: 'bacterial-leaf-blight-rice',
    name: 'Bacterial Leaf Blight of Rice',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    causativeOrganism: 'Xanthomonas oryzae pv. oryzae (Gram-negative Bacterium)',
    cropId: 'rice',
    cropName: 'Rice',
    affectedCrops: ['Rice', 'Wild Oryza species', 'Leersia grasses'],
    type: 'Bacterial',
    confidenceMatch: 'Likely Match • 86%',
    thumbnailUrl: '/src/assets/images/bacterial-blight-of-rice.jpg',
    summary: 'Water-soaked wavy lesions starting from leaf tips moving downwards, turning yellow-white with amber bacterial ooze droplets.',
    detailedDescription:
      'Bacterial Leaf Blight (BLB) is a destructive vascular disease caused by Xanthomonas oryzae. Lesions typically start at leaf tips as water-soaked stripes, develop wavy irregular margins, and turn straw-white. In the early morning, milky to amber bacterial ooze beads emerge from leaf surfaces.',
    symptoms: [
      'Water-soaked to yellowish-green stripes with wavy margins starting from leaf tips and margins',
      'Lesions enlarge and turn whitish-gray (bleached straw appearance)',
      'Ooze drops (amber beads) visible on leaf surfaces in early morning humidity',
      '"Kresek" wilt phase in seedlings: complete wilting and rolling of young tillers',
    ],
    affectedPlantParts: ['Leaf blade', 'Leaf sheath', 'Young seedling tillers'],
    favorableConditions:
      'Warm temperatures (25°C–34°C), strong winds with rainstorms that cause micro-wounds, high humidity, and excessive nitrogen top-dressing.',

    immediateActions: [
      'Drain excess standing water temporarily if soil is waterlogged with high nitrogen.',
      'Stop nitrogen fertilization immediately.',
      'Avoid walking or working in wet paddies to prevent dragging bacterial slime between tillers.',
    ],

    culturalManagement: [
      'Balanced fertilization: Apply split nitrogen applications and increase muriate of potash (potassium).',
      'Clean irrigation channels: Remove weed hosts like Leersia and wild rice along bunds.',
      'Avoid clipping seedling tips before transplanting (creates open entry points for bacteria).',
    ],

    biologicalManagement: [
      'Pseudomonas fluorescens: Seed treatment and nursery drenching to stimulate systemic plant defense.',
      'Bacillus subtilis foliar sprays to suppress bacterial colonization on leaf margins.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Copper hydroxide / Copper oxychloride (contact bactericide shield)',
        'Streptocycline / Plantomycin (agricultural streptomycin + tetracycline formulation where legally registered)',
      ],
      labelRestrictions:
        'Antibiotic formulations are restricted or banned in many jurisdictions; verify national regulations. Chemical sprays have limited curative effect once vascular wilt sets in.',
      cautionNote:
        'Never apply unverified antibiotic dosages. Prioritize planting genetically resistant cultivars.',
    },

    prevention: [
      'Plant BLB-resistant rice cultivars incorporating Xa-genes (e.g., Improved Samba Mahsuri with Xa21, xa13, xa5).',
      'Follow certified seed treatment protocols with hot water or certified seed protectants.',
    ],

    whenToContactExpert: [
      'If rapid seedling wilting ("Kresek" phase) occurs within 3 weeks of transplanting.',
      'To test bacterial streaming in clear water to verify BLB from fungal blast or salinity burn.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High spread during wind and rain storms. Bacteria enter through hydathodes and mechanical wounds.',
      recoveryTimeline: 'Severely bleached leaves do not recover; balanced potassium helps unaffected younger tillers emerge.',
      transmissionMode: 'Wind-driven rain, contaminated irrigation water, and infected seeds/stubble.',
    },

    references: [
      {
        title: 'Bacterial Blight of Rice Diagnostic Sheet',
        organization: 'International Rice Research Institute (IRRI)',
        citation: 'IRRI Rice Knowledge Bank: Bacterial Blight Diagnostic Guide.',
      },
      {
        title: 'Breeding for Bacterial Blight Resistance in Rice',
        organization: 'FAO Plant Production Division',
        citation: 'Food and Agriculture Organization Plant Pathology Review.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'sheath-blight-rice': {
    id: 'sheath-blight-rice',
    name: 'Rice Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    causativeOrganism: 'Rhizoctonia solani (Basidiomycete Fungus)',
    cropId: 'rice',
    cropName: 'Rice',
    affectedCrops: ['Rice', 'Maize', 'Soybean', 'Sorghum'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 87%',
    thumbnailUrl: '/src/assets/images/sheath-blight-rice.jpg',
    summary: 'Greenish-grey oval spots on leaf sheaths near water line with distinct dark brown borders, causing lodging.',
    detailedDescription:
      'Sheath blight, caused by Rhizoctonia solani, thrives in high-density, heavily fertilized rice crops. Infection begins at the water line as oval, water-soaked greenish-grey lesions that band together, girdle the culm, and cause severe lodging.',
    symptoms: [
      'Oval or oblong greenish-grey water-soaked spots on lower leaf sheaths just above water line',
      'Lesions enlarge with distinct dark reddish-brown margins (snake-skin pattern)',
      'Spots coalesce and creep upward to flag leaves and panicles in dense canopies',
      'Premature lodging (culm collapse) and poorly filled panicles',
    ],
    affectedPlantParts: ['Lower leaf sheaths', 'Culms', 'Upper leaf blades'],
    favorableConditions:
      'High temperatures (28°C–32°C), high relative humidity (85%–100%), dense tillering canopy, and excessive nitrogen.',

    immediateActions: [
      'Drain field water to reduce microclimate humidity around lower culms.',
      'Withhold nitrogen top-dressings.',
      'Remove severely infected lodged clumps to arrest horizontal mycelial mat progression.',
    ],

    culturalManagement: [
      'Optimum plant spacing: Avoid overcrowding (maintain 20 × 15 cm spacing).',
      'Deep plowing in summer to bury floating sclerotia bodies deep into the soil.',
      'Skim floating sclerotia and stubble trash during final puddle leveling.',
    ],

    biologicalManagement: [
      'Trichoderma viride / harzianum applied with farmyard manure to decompose soil sclerotia.',
      'Pseudomonas fluorescens foliar spray at maximum tillering stage.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Validamycin 3L (specific antibiotic fungicide targeting Rhizoctonia mycelium)',
        'Hexaconazole 5% EC (triazole systemic fungicide)',
        'Thifluzamide (succinate dehydrogenase inhibitor; FRAC 7)',
        'Azoxystrobin (QoI strobilurin fungicide)',
      ],
      labelRestrictions:
        'Spray directed at the base of the plant canopy where lesions initiate. Maintain 15-day pre-harvest interval.',
      cautionNote:
        'Follow certified local pesticide guidelines and wear personal protective equipment during spray application.',
    },

    prevention: [
      'Avoid high-density transplanting and excessive seeding rates.',
      'Apply potassium and silica fertilizers to harden sheath epidermal tissues.',
    ],

    whenToContactExpert: [
      'When lesions advance upward from lower sheaths past the penultimate leaf before boot stage.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High risk across contiguous paddy fields via floating sclerotia on irrigation water.',
      recoveryTimeline: 'Girdled sheaths cannot heal; early spray prevents vertical spread to flag leaves.',
      transmissionMode: 'Buoyant sclerotia floating on water, and soil-borne fungal mycelium.',
    },

    references: [
      {
        title: 'Sheath Blight Management in Irrigated Rice',
        organization: 'International Rice Research Institute (IRRI)',
        citation: 'IRRI Rice Diagnostic Handbook, 3rd Edition.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'stripe-rust-wheat': {
    id: 'stripe-rust-wheat',
    name: 'Wheat Stripe Rust (Yellow Rust)',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    causativeOrganism: 'Puccinia striiformis (Basidiomycete Rust Fungus)',
    cropId: 'wheat',
    cropName: 'Wheat',
    affectedCrops: ['Wheat', 'Barley', 'Rye', 'Wild grasses'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 90%',
    thumbnailUrl: '/src/assets/images/stripe_rust_wheat.jpg',
    summary: 'Bright yellow to orange powdery pustules arranged in parallel linear stripes along leaf veins.',
    detailedDescription:
      'Yellow or stripe rust is an airborne obligate fungal biotroph that attacks wheat foliage during cool spring or winter seasons. The vivid yellow-orange urediniospores form unmistakable parallel stripes between leaf veins, causing desiccation and shriveled grains.',
    symptoms: [
      'Bright yellow to orange-yellow powdery pustules arranged in narrow, parallel linear stripes along leaf veins',
      'Chlorotic yellow banding preceding pustule rupture',
      'Severe foliage drying resembling fire scorch in advanced stages',
      'Shriveled, light grain kernels with low test weight',
    ],
    affectedPlantParts: ['Leaf blades', 'Glumes', 'Leaf sheaths', 'Awns'],
    favorableConditions:
      'Cool temperatures (10°C–15°C / 50°F–59°F) with high relative humidity, frequent morning dews, and overcast days.',

    immediateActions: [
      'Scout low-lying, damp hollows and windward field borders for initial rust foci ("hot spots").',
      'Avoid unnecessary late-season nitrogen top-dressing.',
      'Consult regional extension for immediate fungicide intervention if rust severity exceeds 5% on flag leaves.',
    ],

    culturalManagement: [
      'Adhere strictly to recommended regional sowing dates to bypass peak spore flight seasons.',
      'Eradicate green bridge volunteer wheat and wild grass hosts during the off-season.',
      'Grow multi-line cultivar blends to slow down pathotype selection pressure.',
    ],

    biologicalManagement: [
      'No standalone bio-fungicide provides complete control of epidemic stripe rust; focus is primarily on genetic resistance (Yr-genes).',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Propiconazole (systemic DMI triazole fungicide; highly effective curative and protective action)',
        'Tebuconazole (triazole systemic fungicide)',
        'Azoxystrobin + Cyproconazole (strobilurin + triazole premix)',
      ],
      labelRestrictions:
        'Apply when stripe rust pustules are first detected on lower or middle canopy before flag leaf emergence. Adhere to PHI of 30–35 days for cereal grain.',
      cautionNote:
        'Never spray after flowering completes unless permitted by product label. Observe honeybee precautions.',
    },

    prevention: [
      'Sow certified rust-resistant wheat varieties incorporating durable adult plant resistance genes (e.g. Yr18/Lr34).',
      'Participate in regional rust surveillance networks (Global Rust Reference Center).',
    ],

    whenToContactExpert: [
      'When rust is observed on a previously resistant wheat variety (possible new virulent pathotype/race).',
      'If rapid spread occurs across the flag leaf before the milk stage.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Extremely high. Microscopic urediniospores are transported hundreds of miles by jet-stream winds.',
      recoveryTimeline: 'Pustule stripes will desiccate; newly emerging leaves can remain clean if systemic fungicide is applied in time.',
      transmissionMode: 'Wind-borne airborne urediniospores.',
    },

    references: [
      {
        title: 'Global Rust Reference Center (GRRC) Wheat Rust Surveillance',
        organization: 'CIMMYT & Aarhus University',
        citation: 'CIMMYT International Maize and Wheat Improvement Center Technical Reports.',
      },
      {
        title: 'Wheat Stripe Rust Management Guidelines',
        organization: 'Washington State University Extension (WSU)',
        citation: 'Chen, X.M., WSU Extension Bulletin EB-2021.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'leaf-rust-wheat': {
    id: 'leaf-rust-wheat',
    name: 'Wheat Leaf Rust (Brown Rust)',
    scientificName: 'Puccinia triticina',
    causativeOrganism: 'Puccinia triticina (Basidiomycete Fungus)',
    cropId: 'wheat',
    cropName: 'Wheat',
    affectedCrops: ['Wheat', 'Triticale', 'Goatgrass'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 88%',
    thumbnailUrl: '/src/assets/images/wheat_leaf_rust.jpg',
    summary: 'Small round to oval orange-brown powdery pustules scattered randomly on upper leaf surfaces.',
    detailedDescription:
      'Brown or leaf rust is the most widely distributed wheat rust globally. Unlike stripe rust, its pustules are circular to oval, reddish-brown, and scattered randomly across the upper leaf surface rather than forming linear stripes.',
    symptoms: [
      'Small, circular to oval, reddish-orange to brown pustules scattered irregularly on upper leaf surface',
      'Epidermis ruptures cleanly around pustules releasing powdery orange spores',
      'Yellow chlorotic halos developing around older pustules',
      'Premature leaf senescence and reduced grain filling',
    ],
    affectedPlantParts: ['Upper leaf blade', 'Leaf sheath'],
    favorableConditions:
      'Mild to warm temperatures (15°C–25°C / 59°F–77°F) with minimum 6–8 hours of leaf moisture.',

    immediateActions: [
      'Scout middle canopy and flag leaves across multiple field transects.',
      'Avoid high nitrogen that promotes lush, soft canopy tissue.',
    ],

    culturalManagement: [
      'Timely sowing to avoid grain filling during warm, rust-favorable spring months.',
      'Destroy volunteer wheat plants in summer.',
    ],

    biologicalManagement: [
      'Genetic host resistance is the primary sustainable management pillar.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Propiconazole 25% EC',
        'Tebuconazole 250 EC',
        'Picoxystrobin + Cyproconazole',
      ],
      labelRestrictions:
        'Spray economic threshold: Apply when rust reaches 5–10% severity on leaves below the flag leaf. Strictly observe pre-harvest interval.',
      cautionNote:
        'Consult regional extension for registered products and certified rates.',
    },

    prevention: [
      'Plant cultivars possessing multi-gene resistance (Lr genes).',
      'Rotate wheat with non-cereal crops.',
    ],

    whenToContactExpert: [
      'If rust spreads rapidly to the flag leaf before anthesis (flowering).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High. Spores travel great distances on continental wind currents.',
      recoveryTimeline: 'Sprayed fields halt new pustule formation within 3–5 days.',
      transmissionMode: 'Airborne wind-carried spores.',
    },

    references: [
      {
        title: 'Cereal Rusts: Leaf Rust Biology and Resistance',
        organization: 'USDA-ARS Cereal Disease Laboratory (CDL)',
        citation: 'Kolmer, J.A., USDA-ARS CDL Research Publications.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'powdery-mildew-wheat': {
    id: 'powdery-mildew-wheat',
    name: 'Wheat Powdery Mildew',
    scientificName: 'Blumeria graminis f. sp. tritici',
    causativeOrganism: 'Blumeria graminis (Ascomycete Fungus)',
    cropId: 'wheat',
    cropName: 'Wheat',
    affectedCrops: ['Wheat', 'Barley'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 85%',
    thumbnailUrl: '/src/assets/images/powdery_mildew.jpg',
    summary: 'White fluffy powdery fungal patches on leaves and stems, turning dull grey with tiny black specks.',
    detailedDescription:
      'Wheat powdery mildew is favored by lush, dense canopies receiving high nitrogen fertilization. It appears as superficial white fluffy cottony colonies that turn grey-brown with embedded dark cleistothecia.',
    symptoms: [
      'Superficial white powdery patches on lower leaves, progressing upward to stems and glumes',
      'Patches enlarge, coalesce, and turn dull greyish-brown',
      'Tiny black pinhead-sized fruiting bodies (cleistothecia) embedded in older felt-like patches',
      'Yellowing and premature browning of underlying leaf tissue',
    ],
    affectedPlantParts: ['Lower leaves', 'Culms', 'Glumes', 'Spikes'],
    favorableConditions:
      'Cool, humid weather (15°C–22°C), high canopy density, shade, and high nitrogen.',

    immediateActions: [
      'Reduce canopy moisture by optimizing field drainage.',
      'Avoid further nitrogen application.',
    ],

    culturalManagement: [
      'Reduce seeding rates to avoid overly dense, humid canopies.',
      'Incorporate balanced potassium fertilizer.',
    ],

    biologicalManagement: [
      'Bacillus subtilis bio-fungicide foliar applications.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Propiconazole',
        'Fenpropimorph (morpholine fungicide; FRAC 5)',
        'Sulphur wettable powder (traditional protectant formulation)',
      ],
      labelRestrictions:
        'Spray when mildew reaches middle leaves before flag leaf expansion. Respect label withdrawal periods.',
      cautionNote:
        'Do not apply sulphur in high temperatures (>30°C) to prevent foliar phytotoxicity.',
    },

    prevention: [
      'Plant resistant cultivars carrying Pm resistance genes.',
      'Avoid excessive seeding rates and narrow row widths in mildew-prone valleys.',
    ],

    whenToContactExpert: [
      'When powdery mildew attacks the flag leaf and glumes during head emergence.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Moderate to high wind dispersal of conidia in dense microclimates.',
      recoveryTimeline: 'Powdery growth turns brown and halts within 48–72 hours after triazole spray.',
      transmissionMode: 'Airborne conidiospores.',
    },

    references: [
      {
        title: 'Managing Powdery Mildew in Wheat',
        organization: 'Purdue University Extension',
        citation: 'Wise, K., Purdue Extension Plant Pathology Bulletin BP-112-W.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'fall-armyworm-maize': {
    id: 'fall-armyworm-maize',
    name: 'Fall Armyworm (Maize)',
    scientificName: 'Spodoptera frugiperda',
    causativeOrganism: 'Spodoptera frugiperda (Lepidopteran Insect Pest)',
    cropId: 'maize',
    cropName: 'Maize',
    affectedCrops: ['Maize', 'Sorghum', 'Rice', 'Sugarcane', 'Cotton'],
    type: 'Pest',
    confidenceMatch: 'Likely Match • 93%',
    thumbnailUrl: '/src/assets/images/fall_armyworm.jpg',
    summary: 'Ragged feeding holes, windowpaning on young leaves, and abundant sawdust-like frass inside central whorls.',
    detailedDescription:
      'Fall Armyworm (FAW) is an aggressive, invasive moth pest. Young larvae scrape leaf tissue ("windowpaning"), while older instars burrow deep into the central whorl, chewing extensive ragged holes and leaving moist, sawdust-like brownish excrement (frass).',
    symptoms: [
      'Windowpane feeding patches on young whorl leaves (transparent leaf epidermis)',
      'Large, irregular ragged holes on unfurling leaves',
      'Abundant moist, coarse, sawdust-like frass packed in the center of the whorl',
      'Boring into the tip and side of developing corn ears',
      'Caterpillar identification: dark head capsule with inverted white "Y" mark and four square-arranged dots on the eighth abdominal segment',
    ],
    affectedPlantParts: ['Central leaf whorl', 'Developing corn cobs', 'Silks', 'Stalks'],
    favorableConditions:
      'Warm weather (25°C–32°C), continuous planting of host crops, and absence of natural predators.',

    immediateActions: [
      'In smaller plots, apply clean dry sand or wood ash mixed with chili powder directly into central whorls to desiccate caterpillars.',
      'Hand-pick and crush visible egg masses and caterpillars early in the morning.',
      'Apply Bacillus thuringiensis (Bt) or neem-based azadirachtin sprays directly targeted down into the whorl.',
    ],

    culturalManagement: [
      'Intercropping: Practice the "push-pull" strategy with Desmodium (repels moths) and Napier grass borders (attracts and traps moths).',
      'Timely synchronous planting: Avoid staggered plantings that provide continuous food supplies across multiple generations.',
      'Field sanitation: Deep plowing before sowing to expose pupae in soil to birds and sun.',
    ],

    biologicalManagement: [
      'Bacillus thuringiensis (Bt subsp. kurstaki): Highly effective when sprayed against young 1st and 2nd instar larvae.',
      'Trichogramma parasitoid wasps: Release egg parasitoids (50,000–100,000 per hectare) at early moth flight.',
      'Spodoptera frugiperda Multiple Nucleopolyhedrovirus (SfMNPV): Certified bio-viral pesticide.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Spinetoram (fermentation-derived spinosyn; FRAC 5; exceptional armyworm control)',
        'Chlorantraniliprole (anthranilic diamide; FRAC 28; low toxicity to beneficials)',
        'Emamectin benzoate (macrocyclic lactone formulation)',
      ],
      labelRestrictions:
        'Spray nozzles must be directed precisely into the center whorl tube. Spray early morning or late dusk when caterpillars are active. Do not exceed label maximum applications per season.',
      cautionNote:
        'Avoid broad-spectrum organophosphates and synthetic pyrethroids; FAW has developed widespread resistance, and pyrethroids destroy beneficial parasitoids.',
    },

    prevention: [
      'Install pheromone delta/funnel traps (4–5 traps/hectare) for early warning of adult male moth flight.',
      'Inspect 20 plants across 5 distinct points in each field weekly starting from seedling emergence.',
    ],

    whenToContactExpert: [
      'When more than 20% of plants in the vegetative stage show fresh whorl feeding with live larvae.',
      'If larvae begin burrowing into ear shanks and silks.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Very high. Adult female moths are strong flyers, capable of traveling up to 100 km per night on wind currents.',
      recoveryTimeline: 'Maize plants in vegetative stage can outgrow significant leaf loss if the central growing point (meristem) is uninjured.',
      transmissionMode: 'Night-flying adult moths laying egg masses (100–200 eggs/cluster) on leaf undersides.',
    },

    references: [
      {
        title: 'Community-Based Fall Armyworm (FAW) Management Guide',
        organization: 'Food and Agriculture Organization (FAO)',
        citation: 'FAO Plant Production and Protection Paper 230.',
      },
      {
        title: 'CABI Fall Armyworm Portal',
        organization: 'Centre for Agriculture and Bioscience International (CABI)',
        citation: 'CABI Invasive Species Compendium on Spodoptera frugiperda.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'northern-leaf-blight-maize': {
    id: 'northern-leaf-blight-maize',
    name: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    causativeOrganism: 'Exserohilum turcicum (Ascomycete Fungus)',
    cropId: 'maize',
    cropName: 'Maize',
    affectedCrops: ['Maize', 'Sorghum', 'Sudangrass'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 86%',
    thumbnailUrl: '/src/assets/images/northern_corn.jpg',
    summary: 'Long, cigar-shaped elliptical grey-green to tan lesions on leaves that coalesce to cause extensive leaf death.',
    detailedDescription:
      'Northern Corn Leaf Blight (NCLB) is caused by Exserohilum turcicum. It forms long (3–15 cm), cigar-shaped elliptical tan lesions with smooth margins. Under damp conditions, dark olive-grey fungal spores form within lesions.',
    symptoms: [
      'Large, long, elliptical cigar-shaped tan lesions (3 to 15 cm in length)',
      'Lesions start on lower leaves and move upward after tasseling',
      'Olive-grey or dark fungal sporulation inside lesions in humid mornings',
      'Extensive blighting and burning of whole canopy during grain filling',
    ],
    affectedPlantParts: ['Leaf blades', 'Ear husks'],
    favorableConditions:
      'Moderate temperatures (18°C–27°C / 64°F–80°F) with prolonged dews and cloudy days.',

    immediateActions: [
      'Scout lower leaves prior to tasseling and silk emergence.',
      'Avoid overhead irrigation that extends leaf wetness.',
    ],

    culturalManagement: [
      'Crop rotation: Rotate away from corn for at least 1–2 years.',
      'Tillage: Incorporate corn residue into soil to accelerate microbial breakdown of overwintering conidia.',
    ],

    biologicalManagement: [
      'Trichoderma harzianum soil and residue treatment.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Pyraclostrobin + Metconazole',
        'Azoxystrobin + Propiconazole',
        'Mancozeb (protective contact shield)',
      ],
      labelRestrictions:
        'Spray timing: Most cost-effective when applied between VT (tasseling) and R1 (silking) if lesions appear below the ear leaf.',
      cautionNote:
        'Consult agricultural extension for local hybrid resistance ratings and label safety.',
    },

    prevention: [
      'Plant corn hybrids possessing specific Ht resistance genes (Ht1, Ht2, HtN).',
      'Avoid continuous no-till corn-on-corn monoculture.',
    ],

    whenToContactExpert: [
      'When lesions appear on or above the ear leaf before blister stage (R2).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Moderate to high wind dispersal from infected corn stubble.',
      recoveryTimeline: 'Lesions cannot disappear, but fungicide protects ear leaves necessary for grain yield.',
      transmissionMode: 'Airborne and rain-splashed conidiospores.',
    },

    references: [
      {
        title: 'Northern Corn Leaf Blight Management',
        organization: 'Iowa State University Extension and Outreach',
        citation: 'Robertson, A., ISU Extension Integrated Crop Management Bulletin.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'bacterial-blight-cotton': {
    id: 'bacterial-blight-cotton',
    name: 'Cotton Bacterial Blight (Angular Leaf Spot)',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    causativeOrganism: 'Xanthomonas citri pv. malvacearum (Gram-negative Bacterium)',
    cropId: 'cotton',
    cropName: 'Cotton',
    affectedCrops: ['Cotton (Gossypium hirsutum, G. barbadense)'],
    type: 'Bacterial',
    confidenceMatch: 'Likely Match • 86%',
    thumbnailUrl: '/src/assets/images/angular.jpg',
    summary: 'Water-soaked angular leaf spots bounded by veinlets, dark lesions on stems ("black arm"), and rotting bolls.',
    detailedDescription:
      'Bacterial blight of cotton attacks all aerial plant parts. Foliar lesions appear angular because they are restricted by leaf veinlets. Systemic infection down petioles causes black, girdled stems known as "black arm", and sunken water-soaked spots on green bolls.',
    symptoms: [
      'Angular, water-soaked dark green spots on leaf undersides bounded strictly by small leaf veinlets',
      'Lesions turn dark brown to black and dry out',
      '"Black Arm" phase: purplish-black elongated cankers girdling petioles and main stems',
      'Round, sunken water-soaked lesions on green bolls causing premature drop or internal lint staining',
    ],
    affectedPlantParts: ['Leaves', 'Petioles', 'Stems (black arm)', 'Green bolls', 'Bracts'],
    favorableConditions:
      'Warm temperatures (28°C–34°C / 82°F–93°F) accompanied by high humidity, driving rains, and violent windstorms that cause micro-abrasions.',

    immediateActions: [
      'Do not cultivate or traverse cotton fields while foliage is damp from dew or rain.',
      'Sanitize all equipment to prevent mechanically spreading bacterial slime between rows.',
      'Check stems for black arm lesions that risk snapping in windy conditions.',
    ],

    culturalManagement: [
      'Acid-delinting of seeds: Treat seed with concentrated sulfuric acid to destroy seed-coat bacterial slime.',
      'Bury crop residue: Deep plow cotton stalks immediately post-harvest.',
      'Crop rotation: Minimum 2-year rotation with non-malvaceous crops (maize, sorghum, groundnut).',
    ],

    biologicalManagement: [
      'Pseudomonas fluorescens seed treatment to induce systemic resistance in young seedlings.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Copper oxychloride 50 WP (contact protective bactericide)',
        'Streptocycline (agricultural antibiotic; where registered by national regulations)',
      ],
      labelRestrictions:
        'Apply at first appearance of angular spots; repeated applications are only viable before extensive black arm sets in.',
      cautionNote:
        'Antibiotic usage in agriculture is restricted in multiple jurisdictions. Verify with national pesticide registrar.',
    },

    prevention: [
      'Plant certified resistant cotton cultivars (varieties bred with B-gene resistance complex).',
      'Use only acid-delinted and certified disease-free seed stocks.',
    ],

    whenToContactExpert: [
      'If black arm stem girdling causes lodging in more than 10% of field stands.',
      'If developing green bolls show premature water-soaked rotting.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High spread during rainstorms; bacteria travel via wind-driven droplets and splashing.',
      recoveryTimeline: 'Affected leaves drop; stem cankers do not heal but remain brittle.',
      transmissionMode: 'Seed-borne bacteria on seed fuzz, rain splash, and mechanical equipment.',
    },

    references: [
      {
        title: 'Bacterial Blight of Cotton Technical Factsheet',
        organization: 'Texas A&M AgriLife Extension',
        citation: 'Woodward, J. et al., Texas A&M Plant Pathology Guide.',
      },
      {
        title: 'Cotton Diseases and Their Management',
        organization: 'ICAR - Central Institute for Cotton Research (CICR)',
        citation: 'CICR Nagpur Technical Bulletin on Cotton Pathology.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'cotton-leaf-curl': {
    id: 'cotton-leaf-curl',
    name: 'Cotton Leaf Curl Virus (CLCuV)',
    scientificName: 'Cotton leaf curl virus (CLCuV Begomovirus complex)',
    causativeOrganism: 'Cotton leaf curl virus & Betasatellite (Begomovirus / Viral)',
    cropId: 'cotton',
    cropName: 'Cotton',
    affectedCrops: ['Cotton', 'Okra', 'Hibiscus', 'Weeds (Abutilon, Sida)'],
    type: 'Viral',
    confidenceMatch: 'Likely Match • 89%',
    thumbnailUrl: '/src/assets/images/leaf_curl.jpg',
    summary: 'Upward or downward leaf curling, vein thickening, small leaf-like enations on undersides, and extreme stunting.',
    detailedDescription:
      'Cotton Leaf Curl Virus (CLCuD) is a devastating viral disease transmitted by the whitefly (Bemisia tabaci). Distinctive diagnostic symptoms include thickening of the primary veins, upward or downward leaf curling, and the formation of cup-shaped or leaf-like green outgrowths (enations) on leaf undersides.',
    symptoms: [
      'Upward or downward rolling and curling of leaf margins',
      'Thickening and swelling of main and secondary veins (vein greening)',
      'Enations: unique cup-shaped leaf-like small outgrowths on the underside of main veins',
      'Severe plant stunting, reduced boll number, and poor fiber quality',
    ],
    affectedPlantParts: ['Foliage', 'Terminal shoots', 'Bolls'],
    favorableConditions:
      'Hot weather (30°C–40°C) with low to moderate humidity that promotes explosive silverleaf whitefly populations.',

    immediateActions: [
      'Rogue out and bury early-infected plants within 45 days of sowing.',
      'Install yellow sticky traps (10–12 per acre) to monitor and catch adult whiteflies.',
      'Eradicate weed hosts (Abutilon indicum, Sida, Parthenium) around field borders.',
    ],

    culturalManagement: [
      'Sow early in the planting window to establish mature canopy before peak whitefly migration.',
      'Grow border barrier rows of tall pearl millet, sorghum, or maize to intercept flying whiteflies.',
      'Avoid excessive nitrogen fertilizer that attracts sap-sucking whitefly swarms.',
    ],

    biologicalManagement: [
      'Conserve natural predators: Green lacewings (Chrysoperla carnea), predatory mites, and parasitoids.',
      'Neem oil formulations (5 ml/L) for whitefly oviposition deterrence.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: false,
      verifiedActives: [
        'NO DIRECT CHEMICAL CURE EXISTS FOR VIRUSES.',
        'Insecticides targeting the whitefly vector: Diafenthiuron, Spiromesifen, or Flonicamid where authorized.',
      ],
      labelRestrictions:
        'Apply vector insecticides strictly according to economic thresholds (e.g. 6–8 whiteflies per leaf).',
      cautionNote:
        'Never spray fungicides for viral diseases. Rotate insecticide chemical classes to prevent whitefly resistance.',
    },

    prevention: [
      'Plant certified CLCuD-resistant Bt or non-Bt cotton hybrids.',
      'Maintain regional host-free bridge during winter/spring.',
    ],

    whenToContactExpert: [
      'If enations appear on newly released "resistant" cultivars (potential resistance breakdown).',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'Rapid spread across entire field blocks via mobile whitefly insect swarms.',
      recoveryTimeline: 'Infected plants do not recover; early-infected plants produce minimal yield.',
      transmissionMode: 'Exclusively transmitted by whitefly (Bemisia tabaci).',
    },

    references: [
      {
        title: 'Cotton Leaf Curl Virus Disease Management',
        organization: 'ICAR - Central Institute for Cotton Research (CICR)',
        citation: 'CICR Technical Advisory on CLCuD Epidemiology.',
      },
      {
        title: 'Begomoviruses Infecting Cotton Worldwide',
        organization: 'International Cotton Advisory Committee (ICAC)',
        citation: 'ICAC Technical Information Section Bulletin.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'anthracnose-chilli': {
    id: 'anthracnose-chilli',
    name: 'Chilli Anthracnose (Fruit Rot / Dieback)',
    scientificName: 'Colletotrichum capsici / Colletotrichum acutatum',
    causativeOrganism: 'Colletotrichum species complex (Ascomycete Fungus)',
    cropId: 'chilli',
    cropName: 'Chilli',
    affectedCrops: ['Chilli', 'Bell pepper', 'Tomato', 'Eggplant'],
    type: 'Fungal',
    confidenceMatch: 'Likely Match • 91%',
    thumbnailUrl: '/src/assets/images/anthracnose.jpg',
    summary: 'Circular sunken lesions on ripe pods with concentric rings of black dots (acervuli), and twig dieback from tip downward.',
    detailedDescription:
      'Anthracnose is the most devastating fruit disease in chilli production. It causes dark, circular, sunken necrotic lesions on ripening and mature green fruits. Concentric rings of salmon-pink or black fungal fruiting bodies (acervuli) appear inside the lesion. Twigs die back from the tip downward.',
    symptoms: [
      'Circular sunken necrotic lesions on ripe fruits with concentric rings of dark acervuli',
      'Salmon-pink to black gelatinous spore masses oozing from fruit spots under moist conditions',
      'Dieback of branches: twigs dry up and turn straw-colored starting from top tip downward',
      'Premature fruit drop and unmarketable blemished pods',
    ],
    affectedPlantParts: ['Ripe fruit pods', 'Green fruit', 'Terminal twigs', 'Flowers'],
    favorableConditions:
      'Warm temperatures (27°C–32°C / 80°F–90°F) accompanied by high relative humidity (>80%) and frequent rain splash.',

    immediateActions: [
      'Harvest and segregate diseased fruits immediately; do not leave rotten pods on the bush or ground.',
      'Prune off dried dieback twigs 2–3 cm into healthy green wood and destroy.',
      'Stop all overhead sprinkler irrigation; convert to drip or furrow watering.',
    ],

    culturalManagement: [
      'Use certified disease-free seeds; treat seed with hot water (52°C for 30 minutes).',
      'Provide good canopy aeration by staking bushes and maintaining 60 × 45 cm spacing.',
      'Practice 2- to 3-year crop rotation with non-solanaceous crops.',
      'Mulch with straw or black plastic to prevent rain splash from soil inoculum.',
    ],

    biologicalManagement: [
      'Trichoderma viride seed treatment and foliar spray.',
      'Pseudomonas fluorescens foliar spray during flowering.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: true,
      verifiedActives: [
        'Azoxystrobin 23% SC (systemic strobilurin; preventative & early curative)',
        'Difenoconazole (triazole systemic fungicide)',
        'Copper oxychloride / Copper hydroxide (protective contact shield)',
        'Mancozeb (multi-site protective dithiocarbamate)',
      ],
      labelRestrictions:
        'Spray at first flowering and fruit set when humidity is elevated. Strictly adhere to harvest interval (PHI 3–7 days).',
      cautionNote:
        'Never spray chemicals without protective gear. Alternate FRAC codes to prevent resistant fungal strains.',
    },

    prevention: [
      'Plant cultivars with genetic tolerance to Colletotrichum fruit rot.',
      'Harvest ripe red chillies promptly; do not let overripe fruit linger on bushes.',
    ],

    whenToContactExpert: [
      'If more than 15% of developing fruit pods show sunken black lesion rings.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High spread during rains via splashing water droplets carrying sticky conidia.',
      recoveryTimeline: 'Blighted fruit cannot recover; healthy flowers can set clean pods following fungicide protection.',
      transmissionMode: 'Rain splash, seed-borne fungal mycelium, and wind-driven water droplets.',
    },

    references: [
      {
        title: 'Chilli Anthracnose: The Global Challenge and Management',
        organization: 'World Vegetable Center (AVRDC)',
        citation: 'AVRDC Publication on Pepper Anthracnose Biology and IPM.',
      },
      {
        title: 'Integrated Disease Management in Spice Crops',
        organization: 'ICAR - Indian Institute of Spices Research (IISR)',
        citation: 'IISR Calicut Technical Bulletin.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'chilli-leaf-curl': {
    id: 'chilli-leaf-curl',
    name: 'Chilli Leaf Curl Virus',
    scientificName: 'Chilli leaf curl virus (ChiLCV Begomovirus)',
    causativeOrganism: 'Chilli leaf curl virus (Begomovirus / Viral)',
    cropId: 'chilli',
    cropName: 'Chilli',
    affectedCrops: ['Chilli', 'Capsicum', 'Tomato', 'Tobacco'],
    type: 'Viral',
    confidenceMatch: 'Likely Match • 87%',
    thumbnailUrl: '/src/assets/images/chilli_curl.jpg',
    summary: 'Upward leaf curling, puckering, reduction of leaf size, vein thickening, and severe bushy stunting.',
    detailedDescription:
      'Chilli Leaf Curl is transmitted by the whitefly (Bemisia tabaci) and thrips. Leaves curl upward boat-like, become leathery and crinkled, with shortened internodes resulting in severe bushy stunting and near-total yield collapse.',
    symptoms: [
      'Upward curling and boat-shaped cupping of leaves',
      'Crinkled, puckered, and reduced leaf blade surface',
      'Shortened internodes producing a dense bushy stunted plant',
      'Flower abortion and tiny malformed fruit',
    ],
    affectedPlantParts: ['Foliage', 'Growing tips', 'Flowers'],
    favorableConditions:
      'Warm, dry periods that accelerate whitefly and thrips vector reproduction.',

    immediateActions: [
      'Rogue out and destroy severely stunted plants during early growth stages.',
      'Install blue (for thrips) and yellow (for whiteflies) sticky cards.',
      'Apply neem seed kernel extract (NSKE 5%) or insecticidal soap against vector nymphs.',
    ],

    culturalManagement: [
      'Grow barrier crops of maize or sorghum (2–3 rows) around chilli plots.',
      'Use reflective silver mulches to repel flying vector insects.',
      'Eradicate weed hosts around field margins.',
    ],

    biologicalManagement: [
      'Encourage predatory anthocorid bugs (Orius) and predatory mites that feed on thrips.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: false,
      verifiedActives: [
        'NO DIRECT CHEMICAL CURE FOR VIRAL PATHOGENS.',
        'Vector control: Spinetoram, Diafenthiuron, or Fipronil where registered for thrips/whiteflies.',
      ],
      labelRestrictions:
        'Spray vector insecticides strictly based on scouted economic thresholds.',
      cautionNote:
        'Do not apply broad-spectrum sprays that trigger secondary pest outbreaks (e.g. spider mites).',
    },

    prevention: [
      'Plant leaf curl-tolerant chilli hybrids.',
      'Raise nursery beds under 50-mesh insect-proof netting.',
    ],

    whenToContactExpert: [
      'If leaf curling affects more than 20% of the field within 30 days of transplanting.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High spread through vector insect flights.',
      recoveryTimeline: 'Virally stunted plants cannot recover; prevention of vector spread is essential.',
      transmissionMode: 'Vector-borne transmission by whiteflies (Bemisia tabaci) and thrips.',
    },

    references: [
      {
        title: 'Chilli Leaf Curl Virus Diagnostic Sheet',
        organization: 'World Vegetable Center (AVRDC)',
        citation: 'AVRDC International Pepper Disease Management Bulletin.',
      },
    ],
    isVerifiedExtensionData: true,
  },

  'yellow-mosaic-soybean': {
    id: 'yellow-mosaic-soybean',
    name: 'Soybean Yellow Mosaic Virus (YMV)',
    scientificName: 'Mungbean yellow mosaic India virus (MYMIV)',
    causativeOrganism: 'Mungbean yellow mosaic India virus (Begomovirus / Viral)',
    cropId: 'soybean',
    cropName: 'Soybean',
    affectedCrops: ['Soybean', 'Mung bean', 'Urad bean', 'Cowpea'],
    type: 'Viral',
    confidenceMatch: 'Likely Match • 88%',
    thumbnailUrl: '/src/assets/images/ymv.jpg',
    summary: 'Bright yellow patches alternating with green on leaflets, stunted growth, and empty flat pods.',
    detailedDescription:
      'Yellow Mosaic Virus is a major threat to leguminous crops across Asia and Africa. Transmitted by the whitefly (Bemisia tabaci), it creates irregular bright yellow patches that coalesce until entire leaves turn golden yellow, severely restricting photosynthesis and pod filling.',
    symptoms: [
      'Alternate bright yellow and green mosaic patches across trifoliate leaves',
      'Puckering, wrinkling, and reduced size of young leaflets',
      'Entire canopy takes on a bright golden-yellow appearance',
      'Drastically reduced flowering, empty flat pods, and seed shriveling',
    ],
    affectedPlantParts: ['Foliage', 'Pods', 'Seeds'],
    favorableConditions:
      'Dry, warm intervals following rains that promote rapid whitefly population expansion.',

    immediateActions: [
      'Rogue out and bury early infected plants during the first 30 days after sowing.',
      'Install yellow sticky traps (15 per hectare) across the canopy.',
      'Spray neem oil (azadirachtin 0.03%) or insecticidal soap to suppress whitefly vectors.',
    ],

    culturalManagement: [
      'Sow YMV-resistant cultivars (e.g., JS 335, NRC 37, SL 688).',
      'Maintain clean field borders free from alternative leguminous and malvaceous weeds.',
      'Avoid delayed sowing to bypass peak whitefly seasonal migration.',
    ],

    biologicalManagement: [
      'Conserve natural predators: Ladybird beetles, Chrysoperla, and mirid bugs.',
    ],

    chemicalManagement: {
      hasChemicalRemedy: false,
      verifiedActives: [
        'NO DIRECT CHEMICAL CURE FOR VIRAL INFECTIONS.',
        'Vector insecticide options: Thiamethoxam 25 WG or Acetamiprid where approved.',
      ],
      labelRestrictions:
        'Apply systemic insecticide as seed treatment or early foliar spray if whitefly threshold is crossed.',
      cautionNote:
        'Never spray fungicides; they have zero effect on viruses.',
    },

    prevention: [
      'Seed treatment with certified systemic neonicotinoid protectant.',
      'Adhere to timely community-wide synchronous sowing dates.',
    ],

    whenToContactExpert: [
      'If yellow mosaic patches appear across >15% of the crop before pod set.',
    ],

    spreadAndRecovery: {
      canAffectNearby: 'High spread through whitefly vector movement across soybean fields.',
      recoveryTimeline: 'Infected leaves remain yellow; new growth may stay green if vector is controlled early.',
      transmissionMode: 'Vector-transmitted by silverleaf whitefly (Bemisia tabaci); not seed-transmitted.',
    },

    references: [
      {
        title: 'Yellow Mosaic Disease of Grain Legumes',
        organization: 'ICAR - Indian Institute of Soybean Research (IISR)',
        citation: 'IISR Indore Technical Bulletin on Soybean Pathology.',
      },
    ],
    isVerifiedExtensionData: true,
  },
};
