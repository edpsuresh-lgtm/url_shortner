
export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clicks: number;
  title?: string;
  description?: string;
  tags?: string[];
  expiresAt?: string; // Link expiration date
  password?: string; // Password protection (hashed)
  qrCode?: string; // QR code data URL
}

export interface AliasSuggestion {
  alias: string;
  reason: string;
}
