import { PreRegConfig, StaticPageConfig, ImageValue, ImageVariant } from '../types/config';

/**
 * Converts a File to a data URL
 */
async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Formats an ImageValue, converting Files to data URLs
 */
async function formatAssetValue(value?: ImageValue): Promise<string | null> {
  if (!value) return null;
  if (value instanceof File) {
    return await fileToDataUrl(value);
  }
  return value; // Already a string (data URL or regular URL)
}

async function formatImageVariant(
  variant?: ImageVariant
): Promise<ImageVariant | undefined> {
  if (!variant) return undefined;
  return {
    desktop: await formatAssetValue(variant.desktop),
    tablet: await formatAssetValue(variant.tablet),
    mobile: await formatAssetValue(variant.mobile),
  };
}

async function formatAssetsForExport(
  assets: PreRegConfig['assets']
): Promise<PreRegConfig['assets']> {
  return {
    heroBackground:
      (await formatImageVariant(assets.heroBackground)) || {
        desktop: null,
        tablet: null,
        mobile: null,
      },
    mainCtaButton:
      (await formatImageVariant(assets.mainCtaButton)) || {
        desktop: null,
        tablet: null,
        mobile: null,
      },
    gameLogo: await formatAssetValue(assets.gameLogo),
    platformIcons: {
      ios: await formatAssetValue(assets.platformIcons.ios),
      android: await formatAssetValue(assets.platformIcons.android),
    },
    genericIcons: await formatImageVariant(assets.genericIcons),
  };
}

export async function buildStaticPageConfig(
  config: PreRegConfig
): Promise<StaticPageConfig> {
  const formattedConfig: PreRegConfig = {
    ...config,
    assets: await formatAssetsForExport(config.assets),
  };

  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    template: config.theme.template,
    data: formattedConfig,
  };
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const downloadConfig = async (config: PreRegConfig): Promise<void> => {
  const staticConfig = await buildStaticPageConfig(config);
  const jsonString = JSON.stringify(staticConfig, null, 2);
  
  // Generate filename from game name
  const gameName = config.basicInfo.gameNameEnglish || 
                   config.basicInfo.gameNameChinese || 
                   'prereg-config';
  const slugifiedName = slugify(gameName);
  const filename = `prereg-config-${slugifiedName}.json`;
  
  // Create blob and download
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

