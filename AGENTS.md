# AGENTS.md - Web Client Movie Streaming Rulebook (React 19 & Tailwind CSS v4)

## Mục lục

1. [Phạm vi & Ngăn xếp Công nghệ (Tech Stack)](#1-phạm-vi--ngăn-xếp-công-nghệ-tech-stack)
2. [Kiến trúc thư mục Module-based](#2-kiến-trúc-thư-mục-module-based)
3. [Quy chuẩn React 19](#3-quy-chuẩn-react-19)
4. [Quy chuẩn Tailwind CSS v4](#4-quy-chuẩn-tailwind-css-v4)
5. [Thiết kế UI/UX & Hệ màu Dark Slate Cinema](#5-thiết-kế-uiux--hệ-màu-dark-slate-cinema)
6. [Bố cục & Trải nghiệm Trang Xem Phim (Watch Page Layout)](#6-bố-cục--trải-nghiệm-trang-xem-phim-watch-page-layout)
7. [Trình phát Video Hiện đại (Vidstack Player & HLS Streaming)](#7-trình-phát-video-hiện-đại-vidstack-player--hls-streaming)
8. [Quản lý Lịch sử xem & Tiếp tục xem (Continue Watching)](#8-quản-lý-lịch-sử-xem--tiếp-tục-xem-continue-watching)
9. [Phim Yêu thích & Tương tác Người dùng](#9-phim-yêu-thích--tương-tác-người-dùng)
10. [Gói Membership VIP & Thanh toán VietQR PayOS](#10-gói-membership-vip--thanh-toán-vietqr-payos)
11. [Quy tắc Kiểm tra và Tái sử dụng Component (DRY)](#11-quy-tắc-kiểm-tra-và-tái-sử-dụng-component-dry)
12. [Tiêu chuẩn các UI Primitives dùng chung](#12-tiêu-chuẩn-các-ui-primitives-dùng-chung)
13. [Quản lý Form & Validation](#13-quản-lý-form--validation)
14. [Quản lý State (Local, URL & Redux Toolkit)](#14-quản-lý-state-local-url--redux-toolkit)
15. [Điều hướng & Bảo vệ Route (React Router v7)](#15-điều-hướng--bảo-vệ-route-react-router-v7)
16. [HTTP Client & Kết nối Mạng (Native Fetch - CẤM AXIOS)](#16-http-client--kết-nối-mạng-native-fetch---cấm-axios)
17. [Khớp nối Contract API Backend Spring Boot (ApiResponseDto)](#17-khớp-nối-contract-api-backend-spring-boot-apiresponsedto)
18. [Quản lý Biến môi trường & Cấu hình (Environment Config)](#18-quản-lý-biến-môi-trường--cấu-hình-environment-config)
19. [Quy chuẩn TypeScript & Kiểu dữ liệu](#19-quy-chuẩn-typescript--kiểu-dữ-liệu)
20. [Tối ưu Hiệu năng Render & Tải trang](#20-tối-ưu-hiệu-năng-render--tải-trang)
21. [Xử lý Lỗi, Error Boundary & Thông báo Toast](#21-xử-lý-lỗi-error-boundary--thông-báo-toast)
22. [Quy tắc Đặt tên (Naming Conventions)](#22-quy-tắc-đặt-tên-naming-conventions)
23. [CẤM TUYỆT ĐỐI TRONG WEB CLIENT](#23-cấm-tuyệt-đối-trong-web-client)
24. [Checklist Tự kiểm tra trước khi hoàn thành](#24-checklist-tự-kiểm-tra-trước-khi-hoàn-thành)

---

## 1. Phạm vi & Ngăn xếp Công nghệ (Tech Stack)

Tài liệu này là quy chuẩn kỹ thuật bắt buộc áp dụng cho cổng **Web Xem Phim dành cho Người dùng cuối (Web Client User Portal)**.

- **React:** `^19.2.x` (Functional Components + Hooks chuẩn React 19).
- **Styling:** `Tailwind CSS ^4.3.x` (Cấu hình qua `@tailwindcss/vite`, CSS-first, không dùng file `tailwind.config.js`).
- **Build Tool:** `Vite ^8.x`.
- **TypeScript:** `~6.x` (Strict mode toàn diện, cấm dùng `any`).
- **Routing:** `react-router-dom ^7.x` (Quản lý URL, phân trang, lọc phim, và bảo vệ route cá nhân).
- **Global State:** `@reduxjs/toolkit ^2.x` & `react-redux ^9.x` (Lưu trữ User Session, Thông báo, Trạng thái Player).
- **Trình phát Video Chuẩn:** **Vidstack Player (`@vidstack/react`)** tích hợp HLS `.m3u8`, đóng gói cục bộ qua npm (Local Bundle), **tuyệt đối không dùng CDN dynamic script**.
- **Bộ Icon:** `lucide-react` (Đồng nhất nét vẽ 1.5 - 2px, kích thước chuẩn 16/18/20px).
- **HTTP Client:** Native `fetch` wrapper tập trung (`fetchClient.ts`). **CẤM TUYỆT ĐỐI AXIOS**.

---

## 2. Kiến trúc thư mục Module-based

Toàn bộ mã nguồn chia theo tính năng (Module-based). Mỗi module quản lý trọn vẹn UI, logic nghiệp vụ, và API service của chính nó.

```text
src/
├── app/                              # Khởi tạo toàn cục, Router, Root Store
│   ├── App.tsx
│   ├── routes.tsx                    # Cấu hình Route tập trung
│   └── store.ts                      # Cấu hình Redux Toolkit store
│
├── modules/                          # Các Feature Module nghiệp vụ Client
│   ├── home/                         # Trang chủ: Hero Banner Slider, Phim đề cử, Danh sách thịnh hành
│   │   ├── components/               # HeroBanner.tsx, MovieSlider.tsx
│   │   └── pages/                    # HomePage.tsx
│   │
│   ├── movies/                       # Danh mục phim, Chi tiết phim, Bộ lọc phim
│   │   ├── components/               # MovieCard.tsx, MovieGrid.tsx, MovieFilterBar.tsx
│   │   ├── pages/                    # MovieListPage.tsx, MovieDetailPage.tsx
│   │   ├── services/                 # movieService.ts
│   │   └── types/                    # movie.types.ts
│   │
│   ├── watch/                        # Trang xem phim (Cinema Watch Page)
│   │   ├── components/               # VideoPlayer.tsx, EpisodeGrid.tsx, ServerSelector.tsx
│   │   ├── hooks/                    # useWatchProgress.ts (auto-save tiến độ xem)
│   │   ├── pages/                    # WatchPage.tsx
│   │   └── services/                 # streamingService.ts
│   │
│   ├── auth/                         # Đăng nhập, Đăng ký, OTP, Quên mật khẩu
│   │   ├── components/               # AuthModal.tsx, OtpInput.tsx, LoginForm.tsx
│   │   ├── services/                 # authService.ts
│   │   └── authSlice.ts              # Redux slice lưu thông tin đăng nhập
│   │
│   ├── history/                      # Lịch sử xem & Tiếp tục xem (Continue Watching)
│   │   ├── components/               # ContinueWatchingRow.tsx, HistoryItem.tsx
│   │   └── services/                 # historyService.ts
│   │
│   ├── favorites/                    # Danh sách phim yêu thích cá nhân
│   │   └── services/                 # favoriteService.ts
│   │
│   ├── membership/                   # Gói VIP, Bảng giá, Thanh toán QR PayOS
│   │   ├── components/               # PricingCard.tsx, PayOsQrModal.tsx
│   │   └── services/                 # paymentService.ts
│   │
│   ├── notification/                 # Thông báo cá nhân, Đếm chưa đọc
│   │   └── components/               # NotificationDropdown.tsx
│   │
│   └── account/                      # Quản lý Profile, Đổi mật khẩu, Avatar
│       ├── components/               # ProfileModal.tsx, ChangePasswordForm.tsx
│       └── services/                 # accountService.ts
│
├── components/                       # Shared Components (Dùng chung)
│   ├── ui/                           # UI Primitives: Button, Input, Modal, Badge, Dropdown, Skeleton
│   ├── layout/                       # ClientLayout, Header, NavigationBar, Footer
│   └── feedback/                     # LoadingSpinner, EmptyState, ToastNotification
│
├── api/                              # Network Layer
│   └── fetchClient.ts                # Wrapper native fetch (Bearer token, refresh token)
│
├── config/                           # Biến môi trường & cấu hình hằng số
│   └── env.ts                        # Wrapper an toàn cho import.meta.env
│
├── types/                            # Kiểu dữ liệu dùng chung (API response, Pagination)
│   └── common.types.ts
│
├── utils/                            # Helper functions (format thời lượng video, tiền VNĐ, ngày)
└── index.css                         # @import "tailwindcss"; + Custom theme tokens
```

---

## 3. Quy chuẩn React 19

1. **Truyền `ref` trực tiếp:** Trong React 19, `ref` là prop thông thường. **Không dùng `forwardRef`**.
   ```tsx
   // ✅ Đúng (React 19)
   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "primary" | "secondary" | "danger";
     ref?: React.Ref<HTMLButtonElement>;
   }
   export const Button = ({
     variant = "primary",
     ref,
     children,
     ...props
   }: ButtonProps) => (
     <button ref={ref} className={`btn-${variant}`} {...props}>
       {children}
     </button>
   );
   ```
2. **Không lạm dụng `useMemo` / `useCallback`:** React 19 có compiler tự động tối ưu render. Chỉ dùng khi thực sự có tính toán vòng lặp lớn hoặc giữ tham chiếu dependencies cho subscription.
3. **Async Transition & Form Actions:** Dùng `useActionState` và `useTransition` cho các thao tác gửi yêu cầu (Đăng nhập, Lưu tiến độ, Thêm yêu thích) để kiểm soát cờ `isPending` mượt mà, không giật màn hình.

---

## 4. Quy chuẩn Tailwind CSS v4

1. **Khai báo CSS-first:** Tailwind v4 dùng `@import "tailwindcss";` trong `src/index.css`.
2. **Cấu hình Design Tokens bằng `@theme`:** Không tạo file `tailwind.config.js`. Mọi định nghĩa màu hoặc font đều khai báo trong CSS:

   ```css
   @import "tailwindcss";

   @theme {
     --color-brand-cyan: #06b6d4; /* Màu xanh Cyan công nghệ */
     --color-brand-red: #e50914; /* Màu đỏ rạp chiếu phim */
     --color-surface-bg: #0b0f19; /* Nền tối sâu dịu mắt */
     --color-surface-card: #1e293b; /* Slate 800 */
   }
   ```

3. **Không dùng CSS inline:** Trừ các trường hợp giá trị động bất khả kháng (như phần trăm thanh tiến trình video `style={{ width: `${progress}%` }}`).

---

## 5. Thiết kế UI/UX & Hệ màu Dark Slate Cinema

Tuân thủ nguyên tắc: **Giao diện hài hòa, thân thiện, dễ nhìn, không quá tối và không quá sáng**.

### 5.1. Bảng màu chuẩn (Movie Client Palette)

- **Nền chính (Background):** `bg-[#0b0f19]` hoặc `bg-slate-900` (#0f172a).
  - ❌ **Tránh:** Màu đen tuyệt đối `#000000` (làm mất chiều sâu khối, gây mỏi mắt khi xem phim ban đêm).
  - ❌ **Tránh:** Nền trắng sáng `#ffffff` (gây chói lóa mắt).
- **Thẻ phim & Panel (Surface Cards):** `bg-slate-800/80` hoặc `bg-slate-850` kết hợp viền mờ `border border-white/10` hoặc `border-slate-700/50`.
- **Màu chữ (Typography Hierarchy):**
  - Chữ tiêu đề: `text-slate-100` (#f1f5f9) - sáng dịu, rõ nét.
  - Chữ nội dung: `text-slate-300` (#cbd5e1).
  - Chữ phụ / nhãn: `text-slate-400` (#94a3b8).
  - Chữ ghi chú / disabled: `text-slate-600`.
- **Màu điểm nhấn (Movie Accent):**
  - Xem ngay / Nút chính: `bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold` hoặc `bg-rose-600 hover:bg-rose-500 text-white`.
  - Huy hiệu VIP / 4K Ultra HD: `bg-amber-400 text-slate-950 font-bold`.
  - Thành công / Đang phát: `emerald-400`.
  - Lỗi / Hủy: `rose-500`.

### 5.2. Hiệu ứng & Tương tác

- Poster phim có hiệu ứng phóng to nhẹ khi rê chuột: `group-hover:scale-105 transition-transform duration-300 ease-out`.
- Nút bấm và các thẻ tương tác luôn có hiệu ứng phản hồi mềm: `active:scale-[0.98] transition-all`.

---

## 6. Bố cục & Trải nghiệm Trang Xem Phim (Watch Page Layout)

1. **Khung Player tỷ lệ chuẩn (16:9 hoặc 21:9):**
   - Hỗ trợ chế độ **"Rạp chiếu phim (Cinema Mode / Mở rộng màn hình)"**: Mở rộng khung player chiếm trọn chiều ngang màn hình mà chưa cần vào Fullscreen.
2. **Cụm thao tác nhanh ngay dưới Player:**
   - Nút Yêu thích (❤️ Favorite), Chia sẻ link, Báo lỗi phim, Chọn Server phát (Server VIP / Server Dự phòng).
3. **Danh sách tập phim (Dành cho Phim Bộ - Series):**
   - Lưới số tập (Tập 1, 2, 3...) chia theo nhóm (1-50, 51-100), highlight rõ ràng tập đang phát bằng màu Primary Accent (`bg-cyan-500 text-slate-950 font-bold`).
4. **Phần thông tin phụ:** Tóm tắt nội dung, Đạo diễn, Diễn viên, và Box Bình luận / Đánh giá sao.

---

## 7. Trình phát Video Hiện đại (Vidstack Player & HLS Streaming)

1. **Ưu tiên sử dụng Vidstack Player (`@vidstack/react`):**
   - Đóng gói cục bộ qua npm (Local Bundle), **CẤM** chèn thẻ `<script src="https://cdn.jsdelivr.net/...@latest">` để tránh rủi ro đứt mạng hoặc CDN sập.
   - Nhận diện và phát tự động file chỉ mục HLS `.m3u8` từ Backend Spring Boot kèm `playbackToken`.
2. **Tính năng bắt buộc của Player:**
   - **Đổi độ phân giải:** Tự động nhận diện các track chất lượng trong file `.m3u8` (Auto, 1080p, 720p, 480p).
   - **Phím tắt bàn phím (Keyboard Shortcuts):**
     - Phím `Space` hoặc `K`: Tạm dừng / Phát tiếp (Play / Pause).
     - Phím `F`: Bật / Tắt toàn màn hình (Fullscreen).
     - Phím `M`: Bật / Tắt tiếng (Mute).
     - Phím `Mũi tên Trái / Phải` (hoặc `J` / `L`): Tua lùi / Tua tới 5 - 10 giây.
     - Phím `Mũi tên Lên / Xuống`: Tăng / Giảm âm lượng.
   - **Thumbnail Preview Tooltip:** Hiển thị khung ảnh xem trước khi người dùng rê chuột dọc thanh timeline tua phim.
   - **Nút tùy chỉnh phim:** Hỗ trợ nút "Bỏ qua giới thiệu (Skip Intro 90s)" và "Tập tiếp theo (Next Episode)".
   - **Picture-in-Picture (PiP):** Thu nhỏ video góc dưới để người dùng vừa xem vừa lướt xem danh sách phim hoặc bình luận.

---

## 8. Quản lý Lịch sử xem & Tiếp tục xem (Continue Watching)

1. **Auto-save Progress (Lưu lịch sử xem):**
   - Sử dụng hook `useWatchProgress`: Lắng nghe thời gian phát của video (`currentTime`).
   - Debounce gửi API cập nhật tiến độ xem sau mỗi **5 - 10 giây** hoặc khi người dùng bấm `Pause` / tắt trình duyệt (`beforeunload`).
2. **Tự động tua tiếp (Resume Playback):**
   - Khi người dùng bấm xem lại bộ phim đang xem dở, Player tự động nhảy đến số giây đã lưu trước đó và hiển thị thông báo nhỏ _"Đã tiếp tục từ phút 14:20"_.

---

## 9. Phim Yêu thích & Tương tác Người dùng

1. **Nút Yêu thích (Favorite):** Đổi màu tức thì (Optimistic UI) sang màu đỏ tim `text-rose-500` khi bấm, sau đó gọi API ngầm. Nếu lỗi thì revert lại trạng thái cũ.
2. **Đánh giá sao & Bình luận:** Hiển thị điểm số trung bình (ví dụ: `★ 8.8/10`), kiểm tra đăng nhập trước khi cho phép gửi đánh giá.

---

## 10. Gói Membership VIP & Thanh toán VietQR PayOS

1. **Bảng giá VIP:** Hiển thị rõ ràng quyền lợi (Xem chất lượng 1080p/4K, Không quảng cáo, Tải xuống, Số thiết bị).
2. **Thanh toán VietQR PayOS:**
   - Gọi Backend tạo đơn thanh toán $\rightarrow$ Nhận link thanh toán và mã QR VietQR.
   - Hiển thị Modal quét mã QR với thời gian đếm ngược (Countdown timer 15 phút).
   - Polling trạng thái đơn hàng (`/api/v1/payment/check-status/:orderId`) mỗi 3 giây $\rightarrow$ Tự động chuyển màn hình _"Thanh toán thành công! Bạn đã được kích hoạt VIP"_ ngay khi nhận tiền.

---

## 11. Quy tắc Kiểm tra và Tái sử dụng Component (DRY)

1. **Nguyên tắc "Tìm trước khi tạo":** Khi cần bất kỳ thành phần nào, bắt buộc kiểm tra thư mục `src/components/ui/` trước.
2. **Ưu tiên mở rộng qua Props/Variants:**
   - Cần nút màu đỏ? Dùng `<Button variant="danger">`.
   - Cần nút nhỏ? Dùng `<Button size="sm">`.
   - **CẤM TUYỆT ĐỐI**: Tạo `DeleteButton.tsx`, `SaveButton.tsx`, `UserModal.tsx`, `MovieModal.tsx` khi có thể tái sử dụng `Button.tsx` và `Modal.tsx`.
3. **Phân định ranh giới:**
   - Component chung (`src/components/ui/`): Không chứa bất kỳ logic gọi API hay nghiệp vụ của một module cụ thể.
   - Component nghiệp vụ (`src/modules/<feature>/components/`): Nhận dữ liệu của module và lắp ghép từ các component UI chung.

---

## 12. Tiêu chuẩn các UI Primitives dùng chung

Mọi dự án phải có các UI Primitives tối thiểu sau trong `src/components/ui/`:

- **Button:** Hỗ trợ variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), và prop `isLoading`.
- **Input / Textarea:** Hỗ trợ nhãn `label`, dòng báo lỗi `error`, icon đầu/cuối `leftIcon`/`rightIcon`.
- **Select / Dropdown:** Giao diện đồng bộ dark slate, không dùng dropdown mặc định thô của trình duyệt nếu gây lệch thẩm mỹ.
- **Modal / Dialog:** Có animation phóng to/mờ mờ (`backdrop-blur-sm`), nút đóng `X`, đóng khi bấm ngoài backdrop hoặc phím `Escape`.
- **Badge:** Hiển thị nhãn trạng thái (`VIP`, `Phim Bộ`, `Phim Lẻ`, `FHD`, `4K`).
- **Skeleton:** Dùng làm placeholder nhấp nháy (`animate-pulse bg-slate-850`) khi poster hoặc danh sách đang tải.

---

## 13. Quản lý Form & Validation

1. **Hiển thị lỗi rõ ràng:** Lỗi nhập liệu phải hiển thị ngay dưới ô Input màu `text-rose-400 text-xs mt-1`, viền input đổi sang `border-rose-500`.
2. **Khóa nút khi Submit:** Nút bấm submit form phải tự động chuyển sang trạng thái disabled + hiển thị spinner khi đang gửi dữ liệu, tránh người dùng bấm double-click tạo đơn lặp.
3. **Reset form đúng cách:** Xóa sạch lỗi và dữ liệu tạm khi người dùng đóng modal hoặc chuyển tab.

---

## 14. Quản lý State (Local, URL & Redux Toolkit)

- **Local State (`useState`):** Bật/tắt popup modal, giá trị input form tạm thời, tab đang active.
- **URL State (`searchParams`):** Bộ lọc thể loại, từ khóa tìm kiếm, quốc gia, năm phát hành, trang hiện tại.
- **Redux Toolkit (`src/app/store.ts`):** Chỉ dùng cho dữ liệu chia sẻ toàn ứng dụng:
  - Thông tin tài khoản đăng nhập (`authSlice`).
  - Số lượng thông báo chưa đọc (`notificationSlice`).
  - Trạng thái trình phát thu nhỏ PiP / Âm lượng toàn cục (`playerSlice`).
- **Cấm:** Không đưa toàn bộ danh sách dữ liệu từ API vào Redux Store nếu danh sách đó chỉ sử dụng trên 1 màn hình duy nhất.

---

## 15. Điều hướng & Bảo vệ Route (React Router v7)

1. **Tách biệt Layout:**
   - `ClientLayout`: Header xem phim, thanh tìm kiếm, Banner, Footer.
2. **Protected Route:** Bọc các route cần đăng nhập (Lịch sử xem, Phim yêu thích, Cài đặt tài khoản):
   ```tsx
   <Route element={<ProtectedRoute />}>
     <Route path="/favorites" element={<FavoritesPage />} />
     <Route path="/history" element={<HistoryPage />} />
     <Route path="/account" element={<AccountPage />} />
   </Route>
   ```
3. **Xử lý 404:** Có trang `NotFoundPage` thân thiện, dẫn người dùng quay về Trang chủ.

---

## 16. HTTP Client & Kết nối Mạng (Native Fetch - CẤM AXIOS)

1. **Cấm tuyệt đối thư viện Axios:** Không cài `axios` vào `package.json`.
2. **Tập trung tại `src/api/fetchClient.ts`:**
   - Tự động gắn header `Authorization: Bearer <accessToken>`.
   - Bắt buộc gắn `credentials: 'include'` để trao đổi HttpOnly Refresh Token Cookie.
   - Bắt mã lỗi `401 Unauthorized` $\rightarrow$ Tự động gọi endpoint `/auth/refresh-token` $\rightarrow$ Lưu `accessToken` mới và gửi lại request cũ.
   - Nếu refresh thất bại $\rightarrow$ Đăng xuất, xóa storage và chuyển hướng về trang đăng nhập.

---

## 17. Khớp nối Contract API Backend Spring Boot (ApiResponseDto)

Backend Spring Boot trả về cấu trúc phẳng (`ApiResponseDto`):

```typescript
export interface ApiResponse<T> {
  status: "success" | "error";
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
```

- Mọi hàm trong `service` phải unwrap dữ liệu và trả về kiểu dữ liệu đích (`Promise<T>` hoặc `Promise<ApiResponse<T>>`).
- Xử lý mã lỗi chuẩn hóa theo `code` (ví dụ: `AUTH_INVALID_CREDENTIALS`, `MOVIE_NOT_FOUND`).

---

## 18. Quản lý Biến môi trường & Cấu hình (Environment Config)

1. **Tập trung tại `src/config/env.ts`:**
   ```typescript
   export const env = {
     apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3004/api/v1",
     appName: import.meta.env.VITE_APP_NAME || "Movie Streaming",
     storageBaseUrl: import.meta.env.VITE_STORAGE_BASE_URL || "",
   } as const;
   ```
2. **Nguyên tắc an toàn:**
   - Mọi biến frontend đều phải có tiền tố `VITE_`.
   - **CẤM TUYỆT ĐỐI** lưu trữ secret key, private key, payment secret trong code frontend.

---

## 19. Quy chuẩn TypeScript & Kiểu dữ liệu

1. **Cấm dùng `any`:** Nếu dữ liệu chưa xác định rõ, dùng `unknown` và viết type-guard để kiểm tra.
2. **Interface cho Object, Type cho Union/Alias:**
   ```typescript
   export interface Movie {
     id: string;
     title: string;
     slug: string;
     posterUrl: string;
     backdropUrl: string;
     type: "SINGLE" | "SERIES";
     quality: "HD" | "FHD" | "4K";
   }
   ```
3. **Không ép kiểu mù quáng (`as unknown as TargetType`).**

---

## 20. Tối ưu Hiệu năng Render & Tải trang

1. **Lazy Loading Routes:** Áp dụng `React.lazy` và `Suspense` cho các trang chi tiết phim hoặc trang tài khoản lớn để tối ưu First Load.
2. **Tối ưu hình ảnh Poster/Backdrop:** Sử dụng `loading="lazy"` cho ảnh bên dưới màn hình cuộn, luôn kèm fallback ảnh mặc định khi link ảnh lỗi (`onError`).
3. **Cleanup Effect:** Mọi `setInterval`, `addEventListener`, hoặc phiên phát video phải được dọn dẹp trong hàm return của `useEffect`.

---

## 21. Xử lý Lỗi, Error Boundary & Thông báo Toast

1. **Bắt lỗi giao diện:** Bọc ứng dụng trong `ErrorBoundary` để tránh việc lỗi một component nhỏ làm trắng toàn bộ màn hình.
2. **Thông báo thân thiện:** Dùng Toast thông báo góc màn hình với icon rõ ràng. Không hiển thị chuỗi lỗi thô của cơ sở dữ liệu (`SQL syntax error`) cho người dùng cuối.

---

## 22. Quy tắc Đặt tên (Naming Conventions)

| Đối tượng               | Quy tắc                             | Ví dụ                                    |
| :---------------------- | :---------------------------------- | :--------------------------------------- |
| **Component File**      | PascalCase                          | `MovieCard.tsx`, `VideoPlayer.tsx`       |
| **Custom Hook**         | camelCase (bắt đầu bằng `use`)      | `useWatchProgress.ts`, `useAuth.ts`      |
| **Service File**        | camelCase (kết thúc bằng `Service`) | `movieService.ts`, `streamingService.ts` |
| **Interface / Type**    | PascalCase                          | `MovieDetailDto`, `ApiResponse<T>`       |
| **Hằng số / Enum**      | UPPER_SNAKE_CASE                    | `API_TIMEOUT`, `VIDEO_QUALITY`           |
| **CSS Utility Classes** | kebab-case (chuẩn Tailwind)         | `bg-slate-900`, `text-cyan-400`          |

---

## 23. CẤM TUYỆT ĐỐI TRONG WEB CLIENT

- ❌ **CẤM cài đặt và sử dụng Axios** (bắt buộc dùng `fetchClient`).
- ❌ **CẤM chèn thẻ `<script src="...jsdelivr...">` động** để nạp player (bắt buộc đóng gói qua npm để tránh sập CDN).
- ❌ **CẤM sử dụng màu nền đen xì `#000000` hoặc màu trắng toát** gây chói và mỏi mắt người dùng.
- ❌ **CẤM hardcode URL API** trong components hoặc services.
- ❌ **CẤM dùng kiểu `any`** trong TypeScript.
- ❌ **CẤM sao chép component trùng lặp** chỉ để thay đổi 1-2 class màu sắc.
- ❌ **CẤM mutate state trực tiếp** (như `state.push(...)`).
- ❌ **CẤM gọi API trực tiếp trong thân Component** mà không qua tầng Service hoặc Hook.
- ❌ **CẤM tạo file cấu hình `tailwind.config.js`** (Tailwind v4 cấu hình trực tiếp qua CSS `@theme`).

---

## 24. Checklist Tự kiểm tra trước khi hoàn thành

Trước khi hoàn thành bất kỳ chức năng nào, phải xác nhận:

- [ ] Đã kiểm tra component dùng chung trong `components/ui/` trước khi viết mới chưa?
- [ ] Giao diện có đạt chuẩn màu Slate / Charcoal dịu mắt, thân thiện, không quá tối/sáng?
- [ ] Khung Player có hỗ trợ đầy đủ phím tắt, đổi chất lượng, và lưu tiến độ xem không?
- [ ] Có gọi API thông qua `fetchClient` (tuyệt đối không dùng `axios`) không?
- [ ] Các trạng thái Loading (Skeleton/Spinner), Empty state và Error message đã đầy đủ chưa?
- [ ] Đã kiểm tra hiển thị responsive trên mobile và desktop chưa?
- [ ] Không có cảnh báo linter (`oxlint` hoặc `tsc -b`) và không còn kiểu `any`?
