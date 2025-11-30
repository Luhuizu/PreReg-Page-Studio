import React, { useRef } from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { ImageUploadGroup } from '../shared/ImageUploadGroup';
import { AssetsConfig, ImageVariant } from '../../types/config';

interface AssetsSectionProps {
  data: AssetsConfig;
  onChange: (data: AssetsConfig) => void;
}

type VariantField = 'heroBackground' | 'mainCtaButton' | 'genericIcons';

const asFile = (value?: ImageVariant[keyof ImageVariant]) =>
  value instanceof File ? value : null;

const assetLabel = (value?: string | File | null) => {
  if (!value) return null;
  return value instanceof File ? value.name : value;
};

const updateVariant = (
  variant: ImageVariant | undefined,
  size: keyof ImageVariant,
  file: File | null
): ImageVariant => {
  const next: ImageVariant = { ...(variant ?? {}) };
  if (file) {
    next[size] = file;
  } else {
    delete next[size];
  }
  return next;
};

export const AssetsSection: React.FC<AssetsSectionProps> = ({ data, onChange }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iosInputRef = useRef<HTMLInputElement>(null);
  const androidInputRef = useRef<HTMLInputElement>(null);

  const updateImageSet = (
    field: VariantField,
    size: 'desktop' | 'tablet' | 'mobile',
    file: File | null
  ) => {
    onChange({
      ...data,
      [field]: updateVariant(data[field], size, file),
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
      <SectionTitle title="圖片與素材" />
      <div className="space-y-6">
        <ImageUploadGroup
          label="主視覺背景圖"
          required
          desktopFile={asFile(data.heroBackground.desktop)}
          tabletFile={asFile(data.heroBackground.tablet)}
          mobileFile={asFile(data.heroBackground.mobile)}
          onDesktopChange={(file) => updateImageSet('heroBackground', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('heroBackground', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('heroBackground', 'mobile', file)}
        />

        <ImageUploadGroup
          label="主要行動呼籲按鈕圖片"
          required
          desktopFile={asFile(data.mainCtaButton.desktop)}
          tabletFile={asFile(data.mainCtaButton.tablet)}
          mobileFile={asFile(data.mainCtaButton.mobile)}
          onDesktopChange={(file) => updateImageSet('mainCtaButton', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('mainCtaButton', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('mainCtaButton', 'mobile', file)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            遊戲標誌
          </label>
          <p className="text-xs text-gray-500 mb-2">建議尺寸：512x512</p>
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
              上傳
            </button>
            {assetLabel(data.gameLogo) && (
              <span className="text-sm text-gray-600 truncate flex-1">
                {assetLabel(data.gameLogo)}
              </span>
            )}
            {assetLabel(data.gameLogo) && (
              <button
                type="button"
                onClick={() => onChange({ ...data, gameLogo: null })}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                移除
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            平台圖示
          </label>
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                iOS 圖示
              </label>
              <p className="text-xs text-gray-500 mb-2">建議尺寸：1024x1024</p>
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
                  上傳
                </button>
                {assetLabel(data.platformIcons.ios) && (
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {assetLabel(data.platformIcons.ios)}
                  </span>
                )}
                {assetLabel(data.platformIcons.ios) && (
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
                    移除
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Android 圖示
              </label>
              <p className="text-xs text-gray-500 mb-2">建議尺寸：1024x1024</p>
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
                  上傳
                </button>
                {assetLabel(data.platformIcons.android) && (
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {assetLabel(data.platformIcons.android)}
                  </span>
                )}
                {assetLabel(data.platformIcons.android) && (
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
                    移除
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ImageUploadGroup
          label="其他通用圖示"
          description="用於獎勵、步驟等"
          desktopFile={asFile(data.genericIcons?.desktop)}
          tabletFile={asFile(data.genericIcons?.tablet)}
          mobileFile={asFile(data.genericIcons?.mobile)}
          onDesktopChange={(file) => updateImageSet('genericIcons', 'desktop', file)}
          onTabletChange={(file) => updateImageSet('genericIcons', 'tablet', file)}
          onMobileChange={(file) => updateImageSet('genericIcons', 'mobile', file)}
        />
      </div>
    </FormCard>
  );
};

