import { AgeRating, MovieType, VideoQuality } from '../../../types/common.types';

export interface Movie {
  id: number | string;
  title: string;
  originalTitle?: string;
  slug: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  videoUrl?: string;
  movieType: MovieType;
  ageRating: AgeRating;
  quality: VideoQuality;
  releaseYear: number;
  durationMinutes?: number;
  totalEpisodes?: number;
  currentEpisode?: number;
  rating: number; // e.g. 8.8
  viewsCount?: number;
  genres: string[];
  isVip?: boolean;
}
