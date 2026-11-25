import React from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Film } from 'lucide-react';

export interface VideoPlayerProps {
  title: string;
  src?: string;
  poster?: string;
  thumbnails?: string;
  isCinemaMode?: boolean;
  onEnded?: () => void;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  src,
  poster,
  thumbnails,
  isCinemaMode = false,
  onEnded,
  className = '',
}) => {
  if (!src) {
    return (
      <div
        className={`w-full rounded-2xl overflow-hidden bg-[#070913] border border-[#00A6FF]/40 dark:border-[#00F0FF]/30 shadow-2xl dark:shadow-[0_0_35px_rgba(0,240,255,0.25)] flex flex-col items-center justify-center gap-4 text-center p-6 transition-all duration-500 ${
          isCinemaMode ? 'aspect-21/9 max-h-[85vh]' : 'aspect-16/9'
        } ${className}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <Film size={36} className="animate-pulse" />
        </div>
        <div className="space-y-1.5 max-w-md">
          <h3 className="text-lg font-black text-slate-100">Đang Kết Nối Luồng Phát HLS 4K</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Luồng video mã hóa HLS Adaptive Bitrate được bảo mật qua Playback Token MinIO từ Backend Spring Boot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        {
          '--media-brand': '#00F0FF',
          '--media-focus-ring': '#00F0FF',
        } as React.CSSProperties
      }
      className={`relative w-full rounded-2xl overflow-hidden bg-black border border-[#00A6FF]/40 dark:border-[#00F0FF]/35 shadow-2xl dark:shadow-[0_0_35px_rgba(0,240,255,0.25)] transition-all duration-500 ${
        isCinemaMode ? 'aspect-21/9 max-h-[85vh]' : 'aspect-16/9'
      } ${className}`}
    >
      <MediaPlayer
        title={title}
        src={src}
        poster={poster}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        autoPlay
        onEnded={onEnded}
        className="w-full h-full vds-video-layout"
      >
        <MediaProvider>
          {poster && (
            <Poster
              className="vds-poster object-cover w-full h-full"
              src={poster}
              alt={title}
            />
          )}
        </MediaProvider>

        {/* Giao diện Điều Khiển Video Chuẩn Vidstack Giống 100% Ảnh 1 */}
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={thumbnails}
        />
      </MediaPlayer>
    </div>
  );
};
