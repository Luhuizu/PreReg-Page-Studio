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
  'Action',
  'Strategy',
  'Adventure',
  'Puzzle',
  'Simulation',
  'Sports',
  'Racing',
  'MMO',
  'Card Game',
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
      <SectionTitle title="Basic Info" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Name (Chinese)
          </label>
          <input
            type="text"
            value={data.gameNameChinese}
            onChange={(e) => updateField('gameNameChinese', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="游戏名称"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Name (English)
          </label>
          <input
            type="text"
            value={data.gameNameEnglish}
            onChange={(e) => updateField('gameNameEnglish', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Game Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Slogan
          </label>
          <input
            type="text"
            value={data.slogan}
            onChange={(e) => updateField('slogan', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One-line slogan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <input
            type="text"
            value={data.shortDescription}
            onChange={(e) => updateField('shortDescription', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description for lists/meta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long Description
          </label>
          <textarea
            value={data.longDescription}
            onChange={(e) => updateField('longDescription', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Genre / Tags
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

