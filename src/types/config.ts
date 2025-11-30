// src/types/config.ts

//export type TemplateId = 'adventure' | 'palace';
export type TemplateId = 'adventure-default' | 'palace-default' | (string & {});


export interface BasicInfo {
  gameNameChinese: string;
  gameNameEnglish: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  genreTags: string[];
}

export interface PreRegSettings {
  startDate: string;          // yyyy-mm-dd or empty string
  endDate: string;
  expectedLaunchDate: string;
  showCountdown: boolean;
}

export interface ThemeConfig {
  template: TemplateId;       // 'adventure' | 'palace' | future templates
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  fontFamily: string;
}

export type ImageValue = string | File | null;

export interface ImageVariant {
  desktop?: ImageValue;
  tablet?: ImageValue;
  mobile?: ImageValue;
}

export interface AssetsConfig {
  heroBackground: ImageVariant;
  mainCtaButton: ImageVariant;
  gameLogo?: ImageValue;
  platformIcons: {
    ios?: ImageValue;
    android?: ImageValue;
  };
  genericIcons?: ImageVariant;
}

export interface PreRegConfig {
  basicInfo: BasicInfo;
  preregSettings: PreRegSettings;
  theme: ThemeConfig;
  assets: AssetsConfig;
}

export interface StaticPageConfig {
  version: '1.0';
  generatedAt: string;
  template: TemplateId;
  data: PreRegConfig;
}