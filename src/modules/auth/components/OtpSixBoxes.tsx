import React, { useState, useEffect, useRef } from 'react';

interface OtpSixBoxesProps {
  value: string[];
  onChange: (otp: string[]) => void;
  onResendOtp: () => void;
  isResending?: boolean;
}

export const OtpSixBoxes: React.FC<OtpSixBoxesProps> = ({
  value,
  onChange,
  onResendOtp,
  isResending = false,
}) => {
  const [resendCountdown, setResendCountdown] = useState<number>(60);
  const [expiryCountdown, setExpiryCountdown] = useState<number>(300); // 5 phút
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Tự động focus ô đầu tiên khi mở form
  useEffect(() => {
    const timer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Đếm ngược gửi lại mã OTP (60s)
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Đếm ngược thời hạn mã OTP (300s)
  useEffect(() => {
    if (expiryCountdown <= 0) return;
    const timer = setInterval(() => {
      setExpiryCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryCountdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleChange = (index: number, char: string) => {
    const cleanValue = char.replace(/[^0-9]/g, '').slice(-1);
    const nextOtp = [...value];
    nextOtp[index] = cleanValue;
    onChange(nextOtp);

    // Tự động nhảy sang ô tiếp theo
    if (cleanValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const nextOtp = [...value];
      nextOtp[index - 1] = '';
      onChange(nextOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;

    const nextOtp = Array(6).fill('');
    for (let i = 0; i < pastedData.length; i++) {
      nextOtp[i] = pastedData[i];
    }
    onChange(nextOtp);

    const targetIndex = Math.min(pastedData.length, 5);
    inputsRef.current[targetIndex]?.focus();
  };

  const handleTriggerResend = () => {
    if (resendCountdown > 0 || isResending) return;
    setResendCountdown(60);
    setExpiryCountdown(300);
    onChange(Array(6).fill(''));
    onResendOtp();
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="space-y-4">
      {/* 6 Ô nhập OTP */}
      <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-full aspect-square text-center text-lg sm:text-xl font-black rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-[#070913] text-slate-900 dark:text-[#00F0FF] border-2 border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.4)] outline-none transition-all selection:bg-transparent"
          />
        ))}
      </div>

      {/* Bộ đếm thời gian & Gửi lại mã */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-1 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span>Thời hạn hiệu lực:</span>
          <span className="font-mono font-bold text-[#00A6FF] dark:text-[#00F0FF]">
            {formatTime(expiryCountdown)}
          </span>
        </div>

        <div>
          {resendCountdown > 0 ? (
            <span className="text-slate-400 dark:text-slate-500">
              Gửi lại mã sau <strong className="font-mono text-slate-700 dark:text-slate-300">{resendCountdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleTriggerResend}
              disabled={isResending}
              className="text-[#00A6FF] dark:text-[#00F0FF] font-bold hover:underline cursor-pointer disabled:opacity-50"
            >
              {isResending ? 'Đang gửi lại...' : 'Gửi lại mã OTP ngay'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
