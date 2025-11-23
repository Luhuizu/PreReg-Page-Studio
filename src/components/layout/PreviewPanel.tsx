import React from 'react';
import { PreRegConfig } from '../../types/config';

interface PreviewPanelProps {
  config: PreRegConfig;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  const themeName =
    config.theme.type === 'adventure-ocean'
      ? 'Adventure / Ocean'
      : 'Palace / Ancient';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Theme:</span> {themeName}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Game:</span>{' '}
          {config.basicInfo.gameNameEnglish || config.basicInfo.gameNameChinese || 'Untitled'}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="max-w-sm mx-auto">
          {/* Fake phone frame */}
          <div className="bg-white rounded-lg shadow-lg border-4 border-gray-800 p-2">
            <div className="bg-gray-100 rounded-t-lg h-8 flex items-center justify-center">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="bg-white rounded-b-lg min-h-[500px] p-4">
              {/* Hero area */}
              <div
                className="h-32 rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.theme.primaryColor }}
              >
                <div className="text-white text-sm font-medium">
                  Hero Background
                </div>
              </div>

              {/* Game logo placeholder */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Logo</span>
                </div>
              </div>

              {/* Slogan */}
              {config.basicInfo.slogan && (
                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-gray-800">
                    {config.basicInfo.slogan}
                  </p>
                </div>
              )}

              {/* CTA Button */}
              <div className="flex justify-center mb-4">
                <button
                  className="px-6 py-3 rounded-lg text-white font-medium text-sm"
                  style={{ backgroundColor: config.theme.buttonColor }}
                >
                  Pre-Register Now
                </button>
              </div>

              {/* Additional placeholder content */}
              <div className="space-y-2 mt-6">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

