import React from 'react';
import { PreRegConfig } from '../../types/config';
import { BasicInfoSection } from '../sections/BasicInfoSection';
import { PreRegSettingsSection } from '../sections/PreRegSettingsSection';
import { ThemeSection } from '../sections/ThemeSection';
import { AssetsSection } from '../sections/AssetsSection';
import { PreviewSection } from '../sections/PreviewSection';
import { PreviewPanel } from './PreviewPanel';

interface MainLayoutProps {
  config: PreRegConfig;
  onConfigChange: (config: PreRegConfig) => void;
  onGenerate: () => void;
  onReset: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  config,
  onConfigChange,
  onGenerate,
  onReset,
}) => {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-0">
      {/* Left Column: Configuration Form */}
      <div className="flex-1 lg:w-1/2 overflow-y-auto">
        <div className="space-y-6 max-w-3xl">
          <BasicInfoSection
            data={config.basicInfo}
            onChange={(data) => onConfigChange({ ...config, basicInfo: data })}
          />
          <PreRegSettingsSection
            data={config.preRegSettings}
            onChange={(data) => onConfigChange({ ...config, preRegSettings: data })}
          />
          <ThemeSection
            data={config.theme}
            onChange={(data) => onConfigChange({ ...config, theme: data })}
          />
          <AssetsSection
            data={config.assets}
            onChange={(data) => onConfigChange({ ...config, assets: data })}
          />
          <PreviewSection
            config={config}
            onGenerate={onGenerate}
            onReset={onReset}
          />
        </div>
      </div>

      {/* Right Column: Preview Panel */}
      <div className="flex-1 lg:w-1/2 lg:sticky lg:top-6 lg:h-[calc(100vh-8rem)]">
        <PreviewPanel config={config} />
      </div>
    </div>
  );
};

