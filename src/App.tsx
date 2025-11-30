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
    alert('設定檔已記錄到控制台！請查看瀏覽器控制台以獲取詳細資訊。');
  };

  const handleReset = () => {
    if (confirm('您確定要重置所有欄位嗎？')) {
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

