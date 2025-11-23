import React from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { PreRegConfig } from '../../types/config';

interface PreviewSectionProps {
  config: PreRegConfig;
  onGenerate: () => void;
  onReset: () => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  config,
  onGenerate,
  onReset,
}) => {
  const configForJSON = {
    ...config,
    assets: {
      ...config.assets,
      heroBackground: {
        desktop: config.assets.heroBackground.desktop?.name || null,
        tablet: config.assets.heroBackground.tablet?.name || null,
        mobile: config.assets.heroBackground.mobile?.name || null,
      },
      ctaButtonImage: {
        desktop: config.assets.ctaButtonImage.desktop?.name || null,
        tablet: config.assets.ctaButtonImage.tablet?.name || null,
        mobile: config.assets.ctaButtonImage.mobile?.name || null,
      },
      gameLogo: config.assets.gameLogo?.name || null,
      platformIcons: {
        ios: config.assets.platformIcons.ios?.name || null,
        android: config.assets.platformIcons.android?.name || null,
      },
      otherIcons: {
        desktop: config.assets.otherIcons.desktop?.name || null,
        tablet: config.assets.otherIcons.tablet?.name || null,
        mobile: config.assets.otherIcons.mobile?.name || null,
      },
    },
  };

  return (
    <FormCard>
      <SectionTitle title="Preview & Export" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Configuration JSON (Read-only)
          </label>
          <pre className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs overflow-auto max-h-64">
            {JSON.stringify(configForJSON, null, 2)}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onGenerate}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            Generate Static Page Config
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors"
          >
            Reset All Fields
          </button>
        </div>
      </div>
    </FormCard>
  );
};

