import DOMPurify, { type Config } from 'dompurify';

const fConfig: Config = { USE_PROFILES: { html: true } };
export const formatNewLine = (text: string): string => DOMPurify.sanitize(text.replace(/\n/g, '<br />'), fConfig);
