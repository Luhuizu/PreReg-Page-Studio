export interface BasicInfo {
  gameNameChinese: string;
  gameNameEnglish: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  genreTags: string[];
}

export interface PreRegSettings {
  startDate: string;
  endDate: string;
  expectedLaunchDate: string;
  showCountdown: boolean;
}

export type ThemeType = 'adventure-ocean' | 'palace-ancient';

export interface Theme {
  type: ThemeType;
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  fontFamily: string;
}

export interface ImageSet {
  desktop?: File | null;
  tablet?: File | null;
  mobile?: File | null;
}

export interface Assets {
  heroBackground: ImageSet;
  ctaButtonImage: ImageSet;
  gameLogo?: File | null;
  platformIcons: {
    ios?: File | null;
    android?: File | null;
  };
  otherIcons: ImageSet;
}

export interface PreRegConfig {
  basicInfo: BasicInfo;
  preRegSettings: PreRegSettings;
  theme: Theme;
  assets: Assets;
}

