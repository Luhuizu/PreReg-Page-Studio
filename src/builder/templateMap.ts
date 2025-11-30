import type { TemplateId } from '../types/config';
import adventureTemplate from '../../docs/template-adventure-default.html?raw';
import palaceTemplate from '../../docs/template-palace-default.html?raw';

export function getTemplateHtml(templateId: TemplateId): string {
  switch (templateId) {
    case 'palace-default':
      return palaceTemplate;
    case 'adventure-default':
    default:
      return adventureTemplate;
  }
}

