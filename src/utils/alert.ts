/**
 * src/utils/alert.ts
 * Wrapper Hộp thoại Thông báo & Cảnh báo Cinema Dark Slate
 * Tuân thủ mục 21 trong AGENTS.md (Hỗ trợ SweetAlert2 với fallback mượt mà)
 */

export interface ConfirmDialogOptions {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
}

// 1. Toast Góc Màn Hình (Cinema Toast)
export const showToast = {
  success: (message: string) => renderCinemaToast(message, 'success', '#10b981'),
  error: (message: string) => renderCinemaToast(message, 'error', '#f43f5e'),
  info: (message: string) => renderCinemaToast(message, 'info', '#00F0FF'),
  warning: (message: string) => renderCinemaToast(message, 'warning', '#f59e0b'),
};

function renderCinemaToast(message: string, type: string, color: string) {
  // Tạo container toast nếu chưa có
  let container = document.getElementById('cinema-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cinema-toast-container';
    container.className = 'fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className =
    'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0d1224]/95 text-slate-100 text-xs sm:text-sm font-bold border border-slate-700/80 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 transform translate-x-full opacity-0';

  // Biểu tượng
  const iconSpan = document.createElement('span');
  iconSpan.style.color = color;
  iconSpan.className = 'text-base sm:text-lg flex-shrink-0';
  iconSpan.innerHTML =
    type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';

  const textSpan = document.createElement('span');
  textSpan.className = 'truncate max-w-xs';
  textSpan.innerText = message;

  toast.appendChild(iconSpan);
  toast.appendChild(textSpan);
  container.appendChild(toast);

  // Hiệu ứng xuất hiện
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
  });

  // Tự động ẩn sau 3s
  setTimeout(() => {
    toast.classList.remove('translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      toast.remove();
      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 300);
  }, 3000);
}

// 2. Hộp Thoại Xác Nhận Trung Tâm (Confirm Dialog)
export const showConfirmDialog = async ({
  title,
  text,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  icon = 'warning',
}: ConfirmDialogOptions): Promise<{ isConfirmed: boolean }> => {
  return new Promise((resolve) => {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className =
      'fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 opacity-0 transition-opacity duration-200';

    // Modal Box
    const modal = document.createElement('div');
    modal.className =
      'w-full max-w-md p-6 sm:p-7 rounded-3xl bg-[#0d1224] border border-slate-700/80 shadow-2xl flex flex-col items-center text-center gap-4 transform scale-95 transition-all duration-200';

    // Icon Circle
    const iconDiv = document.createElement('div');
    const isDanger = icon === 'warning' || icon === 'error';
    iconDiv.className = `w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg ${
      isDanger
        ? 'bg-rose-500/15 border border-rose-500/30 text-rose-500 shadow-rose-500/20'
        : 'bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] shadow-[#00F0FF]/20'
    }`;
    iconDiv.innerHTML = isDanger ? '!' : 'ℹ';

    // Title & Text
    const titleEl = document.createElement('h3');
    titleEl.className = 'text-lg sm:text-xl font-black text-slate-100 tracking-tight';
    titleEl.innerText = title;

    const descEl = document.createElement('p');
    descEl.className = 'text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm';
    descEl.innerText = text;

    // Buttons Container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'flex items-center justify-center gap-3 w-full pt-2';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className =
      'flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 text-xs sm:text-sm transition-all cursor-pointer active:scale-95';
    cancelBtn.innerText = cancelText;

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = `flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95 shadow-md ${
      isDanger
        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
        : 'bg-[#00F0FF] hover:bg-[#00A6FF] text-[#070913] shadow-[#00F0FF]/30'
    }`;
    confirmBtn.innerText = confirmText;

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(confirmBtn);

    modal.appendChild(iconDiv);
    modal.appendChild(titleEl);
    modal.appendChild(descEl);
    modal.appendChild(btnContainer);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Animate In
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      modal.classList.remove('scale-95');
      modal.classList.add('scale-100');
    });

    const close = (confirmed: boolean) => {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      modal.classList.remove('scale-100');
      modal.classList.add('scale-95');
      setTimeout(() => {
        backdrop.remove();
        resolve({ isConfirmed: confirmed });
      }, 200);
    };

    cancelBtn.onclick = () => close(false);
    confirmBtn.onclick = () => close(true);
    backdrop.onclick = (e) => {
      if (e.target === backdrop) close(false);
    };
  });
};
