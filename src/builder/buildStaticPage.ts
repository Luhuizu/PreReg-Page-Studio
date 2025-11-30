import type { StaticPageConfig } from '../types/config';
import { getTemplateHtml } from './templateMap';

const CONFIG_PLACEHOLDER = '{{CONFIG_JSON}}';

export function buildStaticPageHtml(config: StaticPageConfig): string {
  const template = getTemplateHtml(config.template);
  const json = JSON.stringify(config, null, 2);

  if (!template.includes(CONFIG_PLACEHOLDER)) {
    console.warn('Template does not contain CONFIG_JSON placeholder; returning template unchanged');
    return template;
  }

  return template.replace(CONFIG_PLACEHOLDER, json);
}

