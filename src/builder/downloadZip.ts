import JSZip from 'jszip';
import type { StaticPageConfig } from '../types/config';
import { buildStaticPageHtml } from './buildStaticPage';
import { processAssets } from './assets';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function downloadStaticPageZip(config: StaticPageConfig) {
  const zip = new JSZip();

  // Process assets: convert data URLs to files and update config
  const { config: processedConfig, files } = processAssets(config);

  // Build HTML with processed config
  const html = buildStaticPageHtml(processedConfig);
  const json = JSON.stringify(processedConfig, null, 2);

  const gameName =
    processedConfig.data.basicInfo?.gameNameEnglish ||
    processedConfig.data.basicInfo?.gameNameChinese ||
    'prereg-page';

  const safeName = slugify(gameName) || 'prereg-page';

  // Add HTML and config to ZIP
  zip.file('index.html', html);
  zip.file('config.json', json);

  // Add asset files to ZIP if any exist
  if (files.length > 0) {
    const assetsFolder = zip.folder('assets');
    if (assetsFolder) {
      for (const file of files) {
        assetsFolder.file(file.path.replace('assets/', ''), file.data);
      }
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });

  const filename = `prereg-static-page-${safeName}.zip`;
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

