import React, { useRef } from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { ImageUploadGroup } from '../shared/ImageUploadGroup';
import { Assets } from '../../types/config';

interface AssetsSectionProps {
  data: Assets;
  onChange: (data: Assets) => void;
}

export const AssetsSection: React.FC<AssetsSectionProps> = ({ data, onChange }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iosInputRef = useRef<HTMLInputElement>(null);
  const androidInputRef = useRef<HTMLInputElement>(null);

  const updateImageSet = (
    field: 'heroBackground' | 'ctaButtonImage' | 'otherIcons',
    size: 'desktop' | 'tablet' | 'mobile',
    file: File | null
  ) => {
    onChange({
      ...data,
      [field]: {
        ...data[field],
        [size]: file,
      },
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ ...data, gameLogo: file });
  };

  const handlePlatformIconChange = (
    platform: 'ios' | 'android',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    onChange({
      ...data,
      platformIcons: {
        ...data.platformIcons,
        [platform]: file,
      },
    });
  };

  return (
    <FormCard>
      <SectionTitle title="Images & Assets" />
      <div className="space-y-6">
        <ImageUploadGroup
          label="Hero Background"
          required
          desktopFile={data.heroBackground.desktop}
          tabletFile={data.heroBackground.tablet}
          mobileFile={data.heroBackground.mobile}
          onDesktopChange={(file) => updateImageSet('heroBackground', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('heroBackground', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('heroBackground', 'mobile', file)}
        />

        <ImageUploadGroup
          label="Main Call-to-Action Button Image"
          required
          desktopFile={data.ctaButtonImage.desktop}
          tabletFile={data.ctaButtonImage.tablet}
          mobileFile={data.ctaButtonImage.mobile}
          onDesktopChange={(file) => updateImageSet('ctaButtonImage', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('ctaButtonImage', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('ctaButtonImage', 'mobile', file)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Logo
          </label>
          <p className="text-xs text-gray-500 mb-2">Recommended: 512x512</p>
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={logoInputRef}
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
            >
              Upload
            </button>
            {data.gameLogo && (
              <span className="text-sm text-gray-600 truncate flex-1">
                {data.gameLogo.name}
              </span>
            )}
            {data.gameLogo && (
              <button
                type="button"
                onClick={() => onChange({ ...data, gameLogo: null })}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Platform Icons
          </label>
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                iOS Icon
              </label>
              <p className="text-xs text-gray-500 mb-2">Recommended: 1024x1024</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={iosInputRef}
                  accept="image/*"
                  onChange={(e) => handlePlatformIconChange('ios', e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => iosInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Upload
                </button>
                {data.platformIcons.ios && (
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {data.platformIcons.ios.name}
                  </span>
                )}
                {data.platformIcons.ios && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        platformIcons: { ...data.platformIcons, ios: null },
                      })
                    }
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Android Icon
              </label>
              <p className="text-xs text-gray-500 mb-2">Recommended: 1024x1024</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={androidInputRef}
                  accept="image/*"
                  onChange={(e) => handlePlatformIconChange('android', e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => androidInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Upload
                </button>
                {data.platformIcons.android && (
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {data.platformIcons.android.name}
                  </span>
                )}
                {data.platformIcons.android && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        platformIcons: { ...data.platformIcons, android: null },
                      })
                    }
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ImageUploadGroup
          label="Other Generic Icons"
          description="For rewards, steps, etc."
          desktopFile={data.otherIcons.desktop}
          tabletFile={data.otherIcons.tablet}
          mobileFile={data.otherIcons.mobile}
          onDesktopChange={(file) => updateImageSet('otherIcons', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('otherIcons', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('otherIcons', 'mobile', file)}
        />
      </div>
    </FormCard>
  );
};

