import { fetchClient } from '../../../api/fetchClient';
import { ApiResponse } from '../../../types/common.types';
import { Movie } from '../types/movie.types';

// Dữ liệu hạt nhân Cyberpunk chuẩn phong cách Ảnh 1 & Ảnh 2 (Fallback an toàn khi Backend chưa bật)
export const SEED_CYBER_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'ĐƯỜNG ĐUA RỰC LỬA',
    originalTitle: 'Cyber Velocity: Overdrive',
    slug: 'duong-dua-ruc-lua',
    synopsis: 'Trong thế giới tương lai 2088 ngập tràn ánh đèn neon, một tay đua ngầm phải điều khiển cỗ máy siêu lượng tử để giải cứu thành phố New Neo khỏi bàn tay tập đoàn hắc ám.',
    posterUrl: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.png',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop',
    videoUrl: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.mp4',
    movieType: 'SINGLE',
    ageRating: 'T16',
    quality: 'FOUR_K',
    releaseYear: 2026,
    durationMinutes: 135,
    rating: 9.4,
    viewsCount: 145020,
    genres: ['Hành Động', 'Cyberpunk', 'Viễn Tưởng', 'Đua Xe'],
    isVip: true,
  },
  {
    id: 2,
    title: 'ONE PIECE FILM: RED',
    originalTitle: 'One Piece Film: Red',
    slug: 'one-piece-film-red',
    synopsis: 'Tại hòn đảo âm nhạc Elegia, diva nổi tiếng bậc nhất thế giới Uta thực hiện buổi biểu diễn trực tiếp đầu tiên. Thân thế chấn động được hé lộ: Uta chính là con gái của Tứ hoàng Shanks.',
    posterUrl: '/img/banner/one_piece_film_red/logo.png',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    videoUrl: '/img/banner/one_piece_film_red/one_piece_film_red.mp4',
    movieType: 'SINGLE',
    ageRating: 'P',
    quality: 'FOUR_K',
    releaseYear: 2024,
    durationMinutes: 115,
    rating: 9.1,
    viewsCount: 289300,
    genres: ['Anime', 'Âm Nhạc', 'Hành Động', 'Phiêu Lưu'],
    isVip: true,
  },
  {
    id: 3,
    title: 'YOUR NAME',
    originalTitle: 'Kimi no Na wa',
    slug: 'your-name',
    synopsis: 'Mitsuha - nữ sinh vùng quê và Taki - nam sinh Tokyo bất ngờ bị hoán đổi thân xác sau khi ngôi sao chổi Tiamat xuất hiện. Một câu chuyện tình vượt không gian và thời gian.',
    posterUrl: '/img/banner/your_name/Your_name_movie_logo.png',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    videoUrl: '/img/banner/your_name/your_name.mp4',
    movieType: 'SINGLE',
    ageRating: 'P',
    quality: 'FULL_HD',
    releaseYear: 2023,
    durationMinutes: 107,
    rating: 9.6,
    viewsCount: 520100,
    genres: ['Anime', 'Lãng Mạn', 'Tâm Lý', 'Kỳ Ảo'],
    isVip: false,
  },
  {
    id: 4,
    title: 'CHÚ THUẬT HỒI CHIẾN 0',
    originalTitle: 'Jujutsu Kaisen 0',
    slug: 'chu-thuat-hoi-chien-0',
    synopsis: 'Yuta Okkotsu chịu sự ám ảnh bởi linh hồn nguyền rủa của Rika - người bạn gái thời thơ ấu. Cậu gia nhập Chú thuật Sư để học cách phá giải lời nguyền định mệnh.',
    posterUrl: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.png',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop',
    videoUrl: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.mp4',
    movieType: 'SINGLE',
    ageRating: 'T16',
    quality: 'FOUR_K',
    releaseYear: 2024,
    durationMinutes: 105,
    rating: 8.9,
    viewsCount: 310400,
    genres: ['Anime', 'Hành Động', 'Trừ Tà', 'Siêu Nhiên'],
    isVip: true,
  },
  {
    id: 5,
    title: 'SWORD ART ONLINE: ALTERNATIVE',
    originalTitle: 'Gun Gale Online II',
    slug: 'gun-gale-online-2',
    synopsis: 'Tại thế giới súng đạn thực tế ảo GGO, nữ xạ thủ tí hon Llenn với bộ đồ hồng huyền thoại tái xuất trong giải đấu sinh tử Squad Jam đầy kịch tính.',
    posterUrl: '/img/banner/sword_art_online_ngoai_truyen_gun_gale_online_phan_2/logo.png',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    videoUrl: '/img/banner/sword_art_online_ngoai_truyen_gun_gale_online_phan_2/sword_art_online_ngoai_truyen_gun_gale_online_phan_2.mp4',
    movieType: 'SERIES',
    ageRating: 'T13',
    quality: 'FULL_HD',
    releaseYear: 2025,
    totalEpisodes: 12,
    currentEpisode: 12,
    rating: 8.7,
    viewsCount: 184500,
    genres: ['Anime', 'Sci-Fi', 'Bắn Súng', 'Sinh Tồn'],
    isVip: false,
  },
];

export const movieService = {
  async getFeaturedMovies(): Promise<Movie[]> {
    try {
      const response = await fetchClient.get<ApiResponse<Movie[]>>('/movies/featured');
      if (response && response.data && response.data.length > 0) {
        return response.data;
      }
    } catch {
      // Fallback khi backend chưa có API
    }
    return SEED_CYBER_MOVIES;
  },

  async getMovies(params?: { page?: number; limit?: number; type?: string; genre?: string; search?: string }): Promise<{
    movies: Movie[];
    total: number;
    totalPages: number;
  }> {
    try {
      const response = await fetchClient.get<ApiResponse<Movie[]>>('/movies', params);
      if (response && response.data) {
        return {
          movies: response.data,
          total: response.pagination?.totalItems || response.data.length,
          totalPages: response.pagination?.totalPages || 1,
        };
      }
    } catch {
      // Fallback
    }

    let list = [...SEED_CYBER_MOVIES];
    if (params?.type) {
      list = list.filter((m) => m.movieType === params.type);
    }
    if (params?.genre && params.genre !== 'Tất Cả') {
      list = list.filter((m) => m.genres.includes(params.genre!));
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.synopsis.toLowerCase().includes(q));
    }

    return {
      movies: list,
      total: list.length,
      totalPages: 1,
    };
  },

  async getMovieBySlug(slug: string): Promise<Movie | null> {
    try {
      const response = await fetchClient.get<ApiResponse<Movie>>(`/movies/${slug}`);
      if (response && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    return SEED_CYBER_MOVIES.find((m) => m.slug === slug) || SEED_CYBER_MOVIES[0];
  },
};
