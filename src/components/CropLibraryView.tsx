import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Sprout,
  ShieldCheck,
  ThermometerSun,
  Stethoscope,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Layers,
  Droplets,
  Clock,
  X,
} from 'lucide-react';
import { CROPS_DATA, DISEASES } from '../data/cropsData';
import { Crop, CropCategory, Disease } from '../types';

interface CropLibraryViewProps {
  onSelectCrop: (crop: Crop) => void;
  onSelectDisease?: (diseaseId: string) => void;
  initialCategory?: string;
  onAskAboutCrop: (cropName: string) => void;
}

const CROP_CATEGORIES: ('All' | CropCategory)[] = [
  'All',
  'Cereals',
  'Pulses',
  'Vegetables',
  'Fruits',
  'Oilseeds',
  'Cash crops',
];

const DISEASE_TYPES: ('All' | Disease['type'])[] = [
  'All',
  'Fungal',
  'Bacterial',
  'Viral',
  'Pest',
  'Oomycete',
];

// All letters representing available crops + full alphabet navigation
const ALL_LETTERS = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const CropLibraryView: React.FC<CropLibraryViewProps> = ({
  onSelectCrop,
  onSelectDisease,
  initialCategory = 'All',
  onAskAboutCrop,
}) => {
  const [activeTab, setActiveTab] = useState<'crops' | 'diseases'>('crops');
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>(initialCategory);
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDiseaseType, setSelectedDiseaseType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allDiseasesList = useMemo(() => {
    return Object.values(DISEASES);
  }, []);

  // Compute available starting letters among all crops
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    CROPS_DATA.forEach((crop) => {
      letters.add(crop.name[0].toUpperCase());
    });
    return letters;
  }, []);

  // Filtered and sorted crops
  const filteredCrops = useMemo(() => {
    let list = CROPS_DATA.filter((crop) => {
      // Category filter
      const matchesCategory =
        selectedCropCategory === 'All' || crop.category === selectedCropCategory;

      // Alphabetical browse filter
      const matchesLetter =
        selectedLetter === 'All' ||
        crop.name.toUpperCase().startsWith(selectedLetter);

      // Search by common name, scientific/botanical name, or description
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        crop.name.toLowerCase().includes(q) ||
        crop.botanicalName.toLowerCase().includes(q) ||
        crop.shortDescription.toLowerCase().includes(q) ||
        (crop.detailedOverview && crop.detailedOverview.toLowerCase().includes(q));

      return matchesCategory && matchesLetter && matchesSearch;
    });

    // Alphabetical sorting
    list.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [selectedCropCategory, selectedLetter, searchQuery, sortOrder]);

  const filteredDiseases = useMemo(() => {
    return allDiseasesList.filter((d) => {
      const matchesType =
        selectedDiseaseType === 'All' || d.type === selectedDiseaseType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.scientificName.toLowerCase().includes(q) ||
        d.causativeOrganism.toLowerCase().includes(q) ||
        d.cropName.toLowerCase().includes(q) ||
        d.affectedCrops.some((c) => c.toLowerCase().includes(q));
      return matchesType && matchesSearch;
    });
  }, [allDiseasesList, selectedDiseaseType, searchQuery]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCropCategory('All');
    setSelectedLetter('All');
    setSelectedDiseaseType('All');
    setSortOrder('asc');
  };

  const isFiltered =
    selectedCropCategory !== 'All' ||
    selectedLetter !== 'All' ||
    selectedDiseaseType !== 'All' ||
    Boolean(searchQuery.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-[#EFECE3] border border-[#DDD6C7] p-8 sm:p-10 overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-[#D5CEBF] text-xs font-semibold text-[#193B28]">
            <Sprout className="w-3.5 h-3.5 text-[#295C42]" />
            <span>Agricultural Knowledge & Treatment Repository</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142A1D] tracking-tight">
            Crop Library
          </h1>
          <p className="text-base text-[#46544B] leading-relaxed">
            Explore dedicated agronomic profiles for major agricultural crops across Cereals, Pulses, Vegetables, Fruits, Oilseeds, and Cash crops. Access climate, soil, and water requirements, major diseases, pests, and preventive practices.
          </p>
        </div>

        {/* Subtle botanical line art illustration on right */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 max-w-[280px] pointer-events-none opacity-40 sm:opacity-75 overflow-hidden flex items-end justify-end">
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#387856] stroke-current fill-none stroke-[1.5]">
            <path d="M180 200 C150 140 100 120 70 80 C50 50 40 20 50 10" />
            <path d="M70 80 C90 70 120 75 130 90 C135 100 125 115 105 110 C85 105 75 90 70 80" fill="#9FBFA5" fillOpacity="0.25" />
            <path d="M100 120 C120 115 150 125 155 140 C160 155 145 165 130 160 C110 155 105 135 100 120" fill="#9FBFA5" fillOpacity="0.2" />
            <path d="M50 50 C30 40 10 50 15 65 C20 80 40 80 50 70" fill="#9FBFA5" fillOpacity="0.25" />
          </svg>
        </div>
      </div>

      {/* Main Mode Toggle: Crops vs Disease Database */}
      <div className="flex border-b border-[#E0DBCF] gap-6 text-sm font-semibold">
        <button
          onClick={() => {
            setActiveTab('crops');
            setSearchQuery('');
          }}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'crops'
              ? 'border-[#193B28] text-[#193B28]'
              : 'border-transparent text-[#64746A] hover:text-[#193B28]'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Crops ({CROPS_DATA.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('diseases');
            setSearchQuery('');
          }}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'diseases'
              ? 'border-[#193B28] text-[#193B28]'
              : 'border-transparent text-[#64746A] hover:text-[#193B28]'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Disease Management Guides ({allDiseasesList.length})</span>
        </button>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search by Crop Name or Scientific Name */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#7A8A7F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'crops'
                  ? 'Search by crop name (e.g. Rice, Tomato) or scientific name (e.g. Solanum, Oryza)...'
                  : 'Search diseases by name, pathogen, or host crop...'
              }
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#DCD5C6] focus:border-[#204B34] focus:ring-2 focus:ring-[#204B34]/15 focus:outline-none text-sm text-[#1A261F] placeholder-[#859489] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A8A7F] hover:text-[#193B28] cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Order Selector */}
          {activeTab === 'crops' && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3B4C41]">
              <span className="text-[#6A7B70] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#DDD8CA] hover:border-[#193B28] text-[#193B28] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{sortOrder === 'asc' ? 'A → Z (Alphabetical)' : 'Z → A'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Pills (Cereals, Pulses, Vegetables, Fruits, Oilseeds, Cash crops) */}
        {activeTab === 'crops' ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#55665B] uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {CROP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCropCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCropCategory === cat
                    ? 'bg-[#193B28] text-[#FCFAF5] shadow-xs'
                    : 'bg-white border border-[#D8D2C3] text-[#425046] hover:bg-[#EFECE3] hover:text-[#173827]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#55665B] uppercase tracking-wider shrink-0 mr-1">
              Pathogen:
            </span>
            {DISEASE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedDiseaseType(type)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedDiseaseType === type
                    ? 'bg-[#193B28] text-[#FCFAF5] shadow-xs'
                    : 'bg-white border border-[#D8D2C3] text-[#425046] hover:bg-[#EFECE3] hover:text-[#173827]'
                }`}
              >
                {type === 'All' ? 'All Pathogens' : type}
              </button>
            ))}
          </div>
        )}

        {/* Alphabetical Browsing Bar (Prompt requirement: "Browse crops alphabetically") */}
        {activeTab === 'crops' && (
          <div className="p-3 bg-[#FAF8F2] border border-[#E5E0D2] rounded-xl flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="font-bold text-[#193B28] uppercase tracking-wider text-[11px] shrink-0 mr-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#295C42]" />
              Browse A–Z:
            </span>
            {ALL_LETTERS.map((letter) => {
              const isAvailable = letter === 'All' || availableLetters.has(letter);
              const isSelected = selectedLetter === letter;

              return (
                <button
                  key={letter}
                  disabled={!isAvailable}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-7 h-7 rounded-md font-semibold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#193B28] text-white shadow-2xs'
                      : isAvailable
                      ? 'bg-white border border-[#DDD7C9] text-[#294232] hover:bg-[#EFECE3] hover:border-[#193B28]'
                      : 'text-[#B5BFB7] cursor-not-allowed opacity-40'
                  }`}
                  title={isAvailable ? `Filter crops starting with ${letter}` : `No crops start with ${letter}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Count Status & Clear Filters Button */}
      <div className="flex items-center justify-between text-xs text-[#637267] border-b border-[#E8E4D9] pb-3">
        <span>
          Showing{' '}
          <strong className="text-[#193B28] font-bold">
            {activeTab === 'crops' ? filteredCrops.length : filteredDiseases.length}
          </strong>{' '}
          {activeTab === 'crops' ? 'crops' : 'verified disease guides'}
          {selectedLetter !== 'All' && ` starting with "${selectedLetter}"`}
          {selectedCropCategory !== 'All' && ` in ${selectedCropCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {isFiltered && (
          <button
            onClick={resetAllFilters}
            className="text-[#204B34] hover:underline font-semibold cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Crop Grid (Clean agricultural card design avoiding generic e-commerce templates) */}
      {activeTab === 'crops' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="group bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl overflow-hidden hover:border-[#295C42] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                {/* Crop Photo with Category Badge */}
                <div className="aspect-16/10 w-full overflow-hidden bg-[#EAE6DA] relative">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {crop.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-[#142A1D] group-hover:text-[#193B28] transition-colors">
                      {crop.name}
                    </h3>
                    <p className="text-xs italic font-medium text-[#4B7057] truncate">
                      {crop.botanicalName}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A574E] line-clamp-2 leading-relaxed">
                    {crop.shortDescription}
                  </p>

                  {/* Key Metadata Pill Badges */}
                  <div className="pt-2 border-t border-[#EFECE3] grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#FAF8F2] p-2 rounded-lg border border-[#E8E4D9]">
                      <span className="text-[10px] uppercase font-bold text-[#6D7D72] block">Season</span>
                      <span className="font-semibold text-[#1B3224] truncate block" title={crop.growingSeason}>
                        {crop.growingSeason.split('(')[0]}
                      </span>
                    </div>

                    <div className="bg-[#FAF8F2] p-2 rounded-lg border border-[#E8E4D9]">
                      <span className="text-[10px] uppercase font-bold text-[#6D7D72] block">Duration</span>
                      <span className="font-semibold text-[#1B3224] truncate block">
                        {crop.harvestWindowDays}
                      </span>
                    </div>
                  </div>

                  {/* Highlights of Pathologies & Pests */}
                  <div className="space-y-1 text-xs text-[#546459] pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span>Key Diseases:</span>
                      <span className="font-semibold text-[#193B28]">
                        {crop.commonDiseases?.length || crop.keyDiseases?.length || 0} documented
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span>Scouted Pests:</span>
                      <span className="font-semibold text-[#193B28]">
                        {crop.commonPests?.length || 0} insect profiles
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 py-3.5 bg-[#FAF8F2] border-t border-[#EAE6DA] flex items-center justify-between text-xs font-semibold text-[#193B28] group-hover:bg-[#EFECE3] transition-colors">
                <span>View Complete Crop Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Disease Management Guides (21 Structured Pathologies) */}
      {activeTab === 'diseases' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => onSelectDisease && onSelectDisease(d.id)}
              className="group bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl overflow-hidden hover:border-[#295C42] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                {/* Visual Image & Tags */}
                <div className="aspect-16/9 w-full overflow-hidden bg-[#EAE6DA] relative">
                  <img
                    src={d.thumbnailUrl}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {d.type} Pathogen
                    </span>
                    <span className="bg-emerald-950/70 backdrop-blur-xs text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {d.cropName}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#142A1D] group-hover:text-[#193B28] transition-colors">
                        {d.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-[#193B28] bg-[#E8EFE9] px-2 py-0.5 rounded-full shrink-0">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#295C42] italic truncate">
                      {d.causativeOrganism}
                    </p>
                  </div>

                  <p className="text-xs text-[#4F5D54] line-clamp-2 leading-relaxed">
                    {d.summary}
                  </p>

                  <div className="pt-2 border-t border-[#EFECE3] space-y-1 text-xs">
                    <div className="flex justify-between text-[#637267]">
                      <span>Host Crops:</span>
                      <span className="font-semibold text-[#1F2D24] text-right truncate max-w-[170px]">
                        {d.affectedCrops.slice(0, 3).join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#637267]">
                      <span>First Action:</span>
                      <span className="font-semibold text-[#1F2D24] text-right truncate max-w-[170px]">
                        {d.immediateActions[0]?.slice(0, 32)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-5 py-3.5 bg-[#FAF8F2] border-t border-[#EAE6DA] flex items-center justify-between text-xs font-semibold text-[#193B28] group-hover:bg-[#EFECE3] transition-colors">
                <span>View Management Guide (A–E)</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === 'crops' && filteredCrops.length === 0) ||
        (activeTab === 'diseases' && filteredDiseases.length === 0)) && (
        <div className="text-center py-16 bg-[#FCFAF6] border border-[#E2DDD0] rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EAE6DA] text-[#637267] flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#173827]">
            No matching crops found
          </h3>
          <p className="text-sm text-[#526257] max-w-md mx-auto">
            No crops matched your filters. Try adjusting your search term, category, or starting letter.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#193B28] rounded-full hover:bg-[#11281B] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
