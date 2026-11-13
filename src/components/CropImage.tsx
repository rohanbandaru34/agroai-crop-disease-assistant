import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { Crop } from '../types';

interface CropImageProps {
  crop: Crop;
  className?: string;
  containerClassName?: string;
  showAttribution?: boolean;
}

export const CropImage: React.FC<CropImageProps> = ({
  crop,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative',
  showAttribution = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If the image fails or is missing, display a neutral, crop-specific placeholder
  if (hasError || !crop.image) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-[#F2EFE8] border border-[#DDD7C9] text-center select-none ${containerClassName}`}
        aria-label={crop.imageAlt || `${crop.name} image placeholder`}
      >
        <div className="w-12 h-12 rounded-full bg-[#E5DFD1] border border-[#D5CEBD] flex items-center justify-center mb-2 text-[#295C42]">
          <Sprout className="w-6 h-6" />
        </div>
        <span className="font-serif font-bold text-sm text-[#142A1D]">{crop.name}</span>
        <span className="text-[11px] italic text-[#486351] mt-0.5">{crop.botanicalName}</span>
        <span className="mt-2 text-[10px] uppercase tracking-wider text-[#68786E] font-medium bg-[#E8E2D2] px-2 py-0.5 rounded">
          Photograph Pending
        </span>
        {showAttribution && (
          <div className="mt-3 text-[10px] text-[#7A8A7F] border-t border-[#DDD6C5] pt-2 w-full text-center">
            Path: <code className="text-[#193B28]">{crop.image}</code>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={crop.image}
        alt={crop.imageAlt || `${crop.name} - ${crop.botanicalName}`}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-80'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      {showAttribution && (
        <div className="bg-[#FAF8F2] border-t border-[#E5DFD0] px-3 py-1.5 text-[11px] text-[#55665B] flex flex-wrap items-center justify-between gap-2">
          <span className="truncate max-w-[280px]">
            <strong>Source:</strong> {crop.imageSource}
          </span>
          <span className="truncate max-w-[220px]">
            <strong>Credit:</strong> {crop.imageCredit}
          </span>
          <span className="text-[#193B28] font-medium bg-[#E8EFE9] px-2 py-0.5 rounded text-[10px]">
            {crop.imageLicense}
          </span>
        </div>
      )}
    </div>
  );
};
