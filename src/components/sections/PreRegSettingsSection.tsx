import React from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { PreRegSettings } from '../../types/config';

interface PreRegSettingsSectionProps {
  data: PreRegSettings;
  onChange: (data: PreRegSettings) => void;
}

export const PreRegSettingsSection: React.FC<PreRegSettingsSectionProps> = ({
  data,
  onChange,
}) => {
  const updateField = <K extends keyof PreRegSettings>(
    field: K,
    value: PreRegSettings[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormCard>
      <SectionTitle title="預約活動設定" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            預約開始日期
          </label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            預約結束日期
          </label>
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => updateField('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            預計上線日期
          </label>
          <input
            type="date"
            value={data.expectedLaunchDate}
            onChange={(e) => updateField('expectedLaunchDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showCountdown"
            checked={data.showCountdown}
            onChange={(e) => updateField('showCountdown', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="showCountdown" className="ml-2 text-sm text-gray-700">
            在頁面上顯示倒數計時器
          </label>
        </div>
      </div>
    </FormCard>
  );
};

