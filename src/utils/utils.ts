export function getResource(resourcePath: string): string {
  return getAbsoluteUrl(resourcePath, import.meta.env.MODE === 'production' ? '/resources/' : 'http://127.0.0.1:7777/');
}

export function getAbsoluteUrl(path: string, baseUrl?: string): string {
  return URL.parse(path)?.href ?? URL.parse(path, baseUrl)?.href ?? path;
}

export function setCSSRootVariable(key: string, value: string): void {
  setCSSRootVariables({ key, value });
}

export function setCSSRootVariables(...styles: { key: string; value: string }[]): void {
  const root = document.documentElement;
  if (root) {
    styles.forEach(({ key, value }) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
}
