import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { MainLayout } from './components/layout/MainLayout';
import { PreRegConfig } from './types/config';

const initialConfig: PreRegConfig = {
  basicInfo: {
    gameNameChinese: '',
    gameNameEnglish: '',
    slogan: '',
    shortDescription: '',
    longDescription: '',
    genreTags: [],
  },
  preRegSettings: {
    startDate: '',
    endDate: '',
    expectedLaunchDate: '',
    showCountdown: false,
  },
  theme: {
    type: 'adventure-ocean',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    buttonColor: '#10B981',
    fontFamily: 'Noto Sans',
  },
  assets: {
    heroBackground: {},
    ctaButtonImage: {},
    gameLogo: null,
    platformIcons: {
      ios: null,
      android: null,
    },
    otherIcons: {},
  },
};

function App() {
  const [config, setConfig] = useState<PreRegConfig>(initialConfig);

  const handleGenerate = () => {
    console.log('Generated Config:', config);
    alert('Configuration logged to console! Check the browser console for details.');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all fields?')) {
      setConfig(initialConfig);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MainLayout
        config={config}
        onConfigChange={setConfig}
        onGenerate={handleGenerate}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;

