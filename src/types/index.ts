export type CropCategory = 'Cereals' | 'Pulses' | 'Vegetables' | 'Fruits' | 'Oilseeds' | 'Cash crops';

export interface ChemicalManagementInfo {
  verifiedActives: string[];
  labelRestrictions: string;
  cautionNote: string;
  hasChemicalRemedy: boolean;
}

export interface DiseaseReference {
  title: string;
  organization: string;
  citation: string;
}

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  causativeOrganism: string;
  cropId: string;
  cropName: string;
  affectedCrops: string[];
  type: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Deficiency' | 'Oomycete';
  confidenceMatch?: string;
  thumbnailUrl: string;
  summary: string;
  detailedDescription: string;
  symptoms: string[];
  affectedPlantParts: string[];
  favorableConditions: string;
  immediateActions: string[];
  culturalManagement: string[];
  biologicalManagement: string[];
  chemicalManagement: ChemicalManagementInfo;
  prevention: string[];
  whenToContactExpert: string[];
  spreadAndRecovery: {
    canAffectNearby: string;
    recoveryTimeline: string;
    transmissionMode: string;
  };
  references: DiseaseReference[];
  isVerifiedExtensionData: boolean;
}

export interface CropPest {
  name: string;
  scientificName?: string;
  damageSymptoms: string;
  management: string;
}

export interface ClimateRequirements {
  temperature: string;
  rainfall: string;
  sunshine: string;
  relativeHumidity?: string;
}

export interface SoilRequirements {
  type: string;
  phRange: string;
  drainage: string;
  organicMatter?: string;
}

export interface CommonDiseaseSummary {
  name: string;
  scientificName?: string;
  type: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Oomycete' | 'Deficiency';
  symptoms: string;
  diseaseId?: string;
}

export interface Crop {
  id: string;
  name: string;
  botanicalName: string;
  category: CropCategory;
  imageUrl: string;
  shortDescription: string;
  detailedOverview: string;
  growingSeason: string;
  climateRequirements: ClimateRequirements;
  soilRequirements: SoilRequirements;
  waterRequirement: string;
  harvestWindowDays: string;
  keyDiseases: Disease[];
  commonDiseases: CommonDiseaseSummary[];
  commonPests: CropPest[];
  preventivePractices: string[];
  agronomyTips: string[];
  // Backwards compatibility fields
  idealSoil?: string;
  temperatureRange?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  diagnosisCard?: {
    diseaseId: string;
    diseaseName: string;
    cropName: string;
    description: string;
    imageUrl: string;
    recommendedActions: string[];
    confidence?: string;
  };
  actionChips?: {
    label: string;
    action: string;
    payload?: string;
  }[];
}
