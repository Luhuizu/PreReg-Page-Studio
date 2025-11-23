import React, { useRef } from 'react';

interface ImageUploadGroupProps {
  label: string;
  description?: string;
  required?: boolean;
  desktopFile: File | null | undefined;
  tabletFile: File | null | undefined;
  mobileFile: File | null | undefined;
  onDesktopChange: (file: File | null) => void;
  onTabletChange: (file: File | null) => void;
  onMobileChange: (file: File | null) => void;
  desktopSize?: string;
  tabletSize?: string;
  mobileSize?: string;
}

export const ImageUploadGroup: React.FC<ImageUploadGroupProps> = ({
  label,
  description,
  required = false,
  desktopFile,
  tabletFile,
  mobileFile,
  onDesktopChange,
  onTabletChange,
  onMobileChange,
  desktopSize = '1920x1080',
  tabletSize = '1280x720',
  mobileSize = '750x1334',
}) => {
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const tabletInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const ImageUploadField = ({
    label: fieldLabel,
    file,
    onChange,
    inputRef,
    recommendedSize,
  }: {
    label: string;
    file: File | null | undefined;
    onChange: (file: File | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    recommendedSize: string;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {fieldLabel}
      </label>
      <p className="text-xs text-gray-500 mb-2">Recommended: {recommendedSize}</p>
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={(e) => handleFileChange(e, onChange)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
        >
          Upload
        </button>
        {file && (
          <span className="text-sm text-gray-600 truncate flex-1">
            {file.name}
          </span>
        )}
        {file && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}
      <div className="space-y-4 pl-4 border-l-2 border-gray-200">
        <ImageUploadField
          label="Desktop image"
          file={desktopFile}
          onChange={onDesktopChange}
          inputRef={desktopInputRef}
          recommendedSize={desktopSize}
        />
        <ImageUploadField
          label="Tablet image"
          file={tabletFile}
          onChange={onTabletChange}
          inputRef={tabletInputRef}
          recommendedSize={tabletSize}
        />
        <ImageUploadField
          label="Mobile image"
          file={mobileFile}
          onChange={onMobileChange}
          inputRef={mobileInputRef}
          recommendedSize={mobileSize}
        />
      </div>
    </div>
  );
};

