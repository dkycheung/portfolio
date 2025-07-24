export interface CaseViewConfig {
  title: string;
  contentUrl: string;
  description?: string;
  year?: string;
  thumbnailUrl?: string;
  backgroundUrl?: string;
}

export interface CaseListViewConfig extends CaseViewConfig {
  path: string;
}
