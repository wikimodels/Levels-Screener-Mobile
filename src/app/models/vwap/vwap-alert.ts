export interface VwapAlert {
  id: string;
  creationTime?: number;
  activationTime?: number;
  activationTimeStr?: string;
  price?: number;
  high?: number;
  low?: number;
  description?: string;
  tvScreensUrls?: string[];
  isActive: boolean;
  symbol: string;
  category?: string;
  tvLink?: string;
  cgLink?: string;
  exchanges?: string[];
  imageUrl?: string;
  anchorTime?: number;
  anchorPrice?: number;
  anchorTimeStr?: string;
}
