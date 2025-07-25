/// map Shared Resource path
export function getResource(resourcePath: string | undefined): string {
  if (resourcePath == undefined) return '';
  return getAbsoluteUrl(
    resourcePath,
    import.meta.env.MODE === 'production' ? '/resources/' : 'http://localhost:5173/resources/',
  );
}

export function getAbsoluteUrl(path: string, baseUrl?: string): string {
  if (baseUrl) {
    const baseurl = new URL(baseUrl);
    const url = new URL(path, baseurl);
    console.debug({ path, baseUrl, baseurl, url: url?.href });
    return url?.href;
  }
  const url = URL.parse(path)?.href ?? path;
  console.debug({ path, url });
  return url;
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
