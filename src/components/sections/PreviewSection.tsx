import React, { useState, useEffect } from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { PreRegConfig, StaticPageConfig } from '../../types/config';
import { buildStaticPageConfig, downloadConfig } from '../../utils/exportConfig';
import { downloadStaticPageZip } from '../../builder/downloadZip';

interface PreviewSectionProps {
  config: PreRegConfig;
  onGenerate: () => void;
  onReset: () => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  config,
  onReset,
}) => {
  const [staticConfig, setStaticConfig] = useState<StaticPageConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    buildStaticPageConfig(config)
      .then((config) => {
        if (!cancelled) {
          setStaticConfig(config);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Failed to build static page config:', error);
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [config]);

  const handleDownloadStaticPage = async () => {
    const staticConfig = await buildStaticPageConfig(config);
    await downloadStaticPageZip(staticConfig);
  };

  const handleDownloadConfig = async () => {
    await downloadConfig(config);
  };

  return (
    <FormCard>
      <SectionTitle title="預覽與匯出" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            設定檔 JSON（唯讀）
          </label>
          {isLoading ? (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs text-gray-500">
              載入中...
            </div>
          ) : staticConfig ? (
            <pre className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs overflow-auto max-h-64">
              {JSON.stringify(staticConfig, null, 2)}
            </pre>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs text-gray-500">
              載入設定檔失敗
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDownloadConfig}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            產生靜態頁面設定檔
          </button>
          <button
            type="button"
            onClick={handleDownloadStaticPage}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
          >
            下載靜態頁面（ZIP）
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors"
          >
            重置所有欄位
          </button>
        </div>
      </div>
    </FormCard>
  );
};

