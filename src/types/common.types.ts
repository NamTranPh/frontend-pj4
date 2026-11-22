export interface ApiResponse<T> {
  status: 'success' | 'error';
  code: string;
  message: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  } | null;
  errors?: Record<string, string[]> | null;
  timestamp: string;
}

export type MovieType = 'SINGLE' | 'SERIES';
export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | 'C';
export type VideoQuality = 'HD' | 'FULL_HD' | 'FOUR_K';
