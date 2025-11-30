import { useState } from 'react';
import { Header } from './components/layout/Header';
import { MainLayout } from './components/layout/MainLayout';
import { ImageVariant, PreRegConfig } from './types/config';

const createEmptyVariant = (): ImageVariant => ({
  desktop: null,
  tablet: null,
  mobile: null,
});

const initialConfig: PreRegConfig = {
  basicInfo: {
    gameNameChinese: '',
    gameNameEnglish: '',
    slogan: '',
    shortDescription: '',
    longDescription: '',
    genreTags: [],
  },
  preregSettings: {
    startDate: '',
    endDate: '',
    expectedLaunchDate: '',
    showCountdown: false,
  },
  theme: {
    template: 'adventure-default',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    buttonColor: '#10B981',
    fontFamily: 'Noto Sans',
  },
  assets: {
    heroBackground: createEmptyVariant(),
    mainCtaButton: createEmptyVariant(),
    gameLogo: null,
    platformIcons: {
      ios: null,
      android: null,
    },
    genericIcons: createEmptyVariant(),
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

