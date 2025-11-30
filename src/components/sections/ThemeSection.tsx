import React from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { TemplateId, ThemeConfig } from '../../types/config';

interface ThemeSectionProps {
  data: ThemeConfig;
  onChange: (data: ThemeConfig) => void;
}

const FONT_OPTIONS = ['Noto Sans', 'Source Han Sans', '系統預設'];

export const ThemeSection: React.FC<ThemeSectionProps> = ({ data, onChange }) => {
  const updateField = <K extends keyof ThemeConfig>(field: K, value: ThemeConfig[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormCard>
      <SectionTitle title="主題與樣式" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            主題
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="adventure-default"
                checked={data.template === 'adventure-default'}
                onChange={(e) => updateField('template', e.target.value as TemplateId)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                冒險 / 海洋（模板 A）
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="palace-default"
                checked={data.template === 'palace-default'}
                onChange={(e) => updateField('template', e.target.value as TemplateId)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                宮殿 / 古代（模板 B）
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            主色
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => updateField('primaryColor', e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.primaryColor}
              onChange={(e) => updateField('primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            輔助色
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.secondaryColor}
              onChange={(e) => updateField('secondaryColor', e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.secondaryColor}
              onChange={(e) => updateField('secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            按鈕顏色
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.buttonColor}
              onChange={(e) => updateField('buttonColor', e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.buttonColor}
              onChange={(e) => updateField('buttonColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            字體
          </label>
          <select
            value={data.fontFamily}
            onChange={(e) => updateField('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormCard>
  );
};

