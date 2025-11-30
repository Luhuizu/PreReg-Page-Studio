import React from 'react';
import { FormCard } from '../shared/FormCard';
import { SectionTitle } from '../shared/SectionTitle';
import { BasicInfo } from '../../types/config';

interface BasicInfoSectionProps {
  data: BasicInfo;
  onChange: (data: BasicInfo) => void;
}

const GENRE_OPTIONS = [
  'RPG',
  '動作',
  '策略',
  '冒險',
  '益智',
  '模擬',
  '運動',
  '競速',
  'MMO',
  '卡牌',
];

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ data, onChange }) => {
  const updateField = <K extends keyof BasicInfo>(field: K, value: BasicInfo[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleGenreToggle = (genre: string) => {
    const newGenres = data.genreTags.includes(genre)
      ? data.genreTags.filter((g) => g !== genre)
      : [...data.genreTags, genre];
    updateField('genreTags', newGenres);
  };

  return (
    <FormCard>
      <SectionTitle title="基本資料" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            遊戲名稱（中文）
          </label>
          <input
            type="text"
            value={data.gameNameChinese}
            onChange={(e) => updateField('gameNameChinese', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="遊戲名稱"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            遊戲名稱（英文）
          </label>
          <input
            type="text"
            value={data.gameNameEnglish}
            onChange={(e) => updateField('gameNameEnglish', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="遊戲名稱"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            簡短標語
          </label>
          <input
            type="text"
            value={data.slogan}
            onChange={(e) => updateField('slogan', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="一行標語"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            簡短描述
          </label>
          <input
            type="text"
            value={data.shortDescription}
            onChange={(e) => updateField('shortDescription', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="用於列表/元資料的簡短描述"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細描述
          </label>
          <textarea
            value={data.longDescription}
            onChange={(e) => updateField('longDescription', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="詳細描述"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            遊戲類型 / 標籤
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {GENRE_OPTIONS.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  data.genreTags.includes(genre)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FormCard>
  );
};

