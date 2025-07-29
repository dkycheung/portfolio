export type AppUrls = {
  google?: string;
  apple?: string;
};

export interface CaseViewConfig {
  title: string;
  contentUrl?: string;
  company?: string;
  role: string;
  description?: string;
  year?: string;
  thumbnailUrl?: string;
  backgroundUrl?: string;
  siteUrl?: string;
  appUrl?: AppUrls;
}

export interface CaseListViewConfig extends CaseViewConfig {
  path: string;
}
