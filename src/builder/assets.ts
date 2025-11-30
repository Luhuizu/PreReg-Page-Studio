import type { StaticPageConfig, ImageValue, ImageVariant } from '../types/config';

const DATA_URL_REGEX = /^data:(.+);base64,(.*)$/;

export interface AssetFile {
  path: string;
  data: Uint8Array;
  mimeType: string;
}

export interface ProcessedAssets {
  config: StaticPageConfig;
  files: AssetFile[];
}

/**
 * Checks if a string is a data URL
 */
export function isDataUrl(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false;
  return DATA_URL_REGEX.test(value);
}

/**
 * Parses a data URL and returns the MIME type and base64 data
 */
export function parseDataUrl(dataUrl: string): { mimeType: string; base64Data: string } | null {
  const match = dataUrl.match(DATA_URL_REGEX);
  if (!match) return null;

  const [, mimeType, base64Data] = match;
  return { mimeType, base64Data };
}

/**
 * Converts base64 string to Uint8Array
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Determines file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  };
  return mimeMap[mimeType] || 'png';
}

/**
 * Generates a consistent asset path based on the asset type and variant
 */
function generateAssetPath(
  assetType: string,
  variant?: string,
  mimeType: string = 'image/png'
): string {
  const ext = getExtensionFromMimeType(mimeType);
  const variantSuffix = variant ? `-${variant}` : '';
  return `assets/${assetType}${variantSuffix}.${ext}`;
}

/**
 * Processes a single ImageValue, converting data URLs to asset files
 */
function processImageValue(
  value: ImageValue | undefined,
  assetType: string,
  files: AssetFile[],
  variant?: string
): string | null {
  // Keep null values as-is
  if (!value) return null;

  // Keep non-string values (Files) - they should be converted to data URLs first
  // But for now, if it's a File, we'll skip it (shouldn't happen in StaticPageConfig)
  if (typeof value !== 'string') {
    console.warn(`Unexpected non-string ImageValue for ${assetType}:`, value);
    return null;
  }

  // Keep non-data-URL strings (e.g., http URLs) as-is
  if (!isDataUrl(value)) {
    return value;
  }

  // Convert data URL to file
  const parsed = parseDataUrl(value);
  if (!parsed) {
    console.warn(`Failed to parse data URL for ${assetType}`);
    return value; // Return original if parsing fails
  }

  const { mimeType, base64Data } = parsed;
  const path = generateAssetPath(assetType, variant, mimeType);
  const data = base64ToUint8Array(base64Data);

  files.push({ path, data, mimeType });

  return path;
}

/**
 * Processes an ImageVariant, converting data URLs in each variant
 */
function processImageVariant(
  variant: ImageVariant | undefined,
  assetType: string,
  files: AssetFile[]
): ImageVariant | undefined {
  if (!variant) return undefined;

  const result: ImageVariant = {};

  if (variant.desktop !== undefined) {
    result.desktop = processImageValue(variant.desktop, assetType, files, 'desktop');
  }
  if (variant.tablet !== undefined) {
    result.tablet = processImageValue(variant.tablet, assetType, files, 'tablet');
  }
  if (variant.mobile !== undefined) {
    result.mobile = processImageValue(variant.mobile, assetType, files, 'mobile');
  }

  // Return undefined if all variants are null/undefined
  if (!result.desktop && !result.tablet && !result.mobile) {
    return undefined;
  }

  return result;
}

/**
 * Processes all assets in the config, converting data URLs to files
 */
export function processAssets(config: StaticPageConfig): ProcessedAssets {
  const files: AssetFile[] = [];
  const assets = config.data.assets;

  // Process heroBackground
  const heroBackground = processImageVariant(
    assets.heroBackground,
    'hero',
    files
  );

  // Process mainCtaButton
  const mainCtaButton = processImageVariant(
    assets.mainCtaButton,
    'cta',
    files
  );

  // Process gameLogo
  const gameLogo = processImageValue(assets.gameLogo, 'game-logo', files);

  // Process platformIcons
  const platformIcons = {
    ios: processImageValue(assets.platformIcons.ios, 'platform-ios', files),
    android: processImageValue(
      assets.platformIcons.android,
      'platform-android',
      files
    ),
  };

  // Process genericIcons
  const genericIcons = processImageVariant(
    assets.genericIcons,
    'generic-icons',
    files
  );

  // Build updated config
  const updatedConfig: StaticPageConfig = {
    ...config,
    data: {
      ...config.data,
      assets: {
        heroBackground: heroBackground || {
          desktop: null,
          tablet: null,
          mobile: null,
        },
        mainCtaButton: mainCtaButton || {
          desktop: null,
          tablet: null,
          mobile: null,
        },
        gameLogo,
        platformIcons,
        ...(genericIcons && { genericIcons }),
      },
    },
  };

  return {
    config: updatedConfig,
    files,
  };
}

