
export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clicks: number;
  title?: string;
  description?: string;
  tags?: string[];
}

export interface AliasSuggestion {
  alias: string;
  reason: string;
}
