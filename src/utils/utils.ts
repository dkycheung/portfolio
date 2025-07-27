/// map Shared Resource path
export function getResource(resourcePath: string | undefined): string {
  if (resourcePath == undefined) return '';
  if (resourcePath.startsWith('/')) resourcePath = '.' + resourcePath;
  return getAbsoluteUrl(
    resourcePath,
    `${location.origin}/resources/`,
    // import.meta.env.MODE === 'production' ? `${location.origin}/resources/` : 'http://localhost:5173/resources/',
  );
}

export function getAbsoluteUrl(path: string, baseUrl?: string): string {
  const hash = import.meta.env.VITE_RESOURCE_HASH ?? undefined;
  try {
    const url = baseUrl == null ? new URL(path) : new URL(path, new URL(baseUrl));
    if (hash != undefined) {
      url.searchParams.append('v', hash);
    }
    console.debug({ path, baseUrl, url: url?.href });
    return url.href;
  } catch (error) {
    console.debug({ path, baseUrl, error });
    throw error;
  }
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
