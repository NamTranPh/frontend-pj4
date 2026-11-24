import { fetchClient, ApiError } from '../../../api/fetchClient';
import { ApiResponse } from '../../../types/common.types';
import {
  AuthResponseData,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyRegistrationRequest,
} from '../types/auth.types';

export const getFriendlyErrorMessage = (
  error: unknown,
  fallback: string = 'Đã có lỗi xảy ra. Vui lòng thử lại.'
): string => {
  if (error instanceof ApiError) {
    const code = error.code?.toLowerCase();
    const msg = error.message?.toLowerCase() || '';

    if (code === 'otp_invalid' || msg.includes('otp code is invalid') || msg.includes('invalid otp')) {
      return 'Mã OTP không chính xác. Vui lòng kiểm tra lại.';
    }
    if (code === 'otp_expired' || msg.includes('otp code has expired') || msg.includes('expired')) {
      return 'Mã OTP đã hết hạn. Vui lòng bấm gửi lại mã mới.';
    }
    if (code === 'invalid_credentials' || msg.includes('bad credentials') || msg.includes('invalid credentials')) {
      return 'Email hoặc mật khẩu không chính xác.';
    }
    if (code === 'user_already_exists' || msg.includes('already exists') || msg.includes('duplicate')) {
      return 'Email này đã được đăng ký tài khoản.';
    }
    if (code === 'user_not_found' || msg.includes('user not found')) {
      return 'Không tìm thấy tài khoản với email này.';
    }
    if (error.message && !error.message.startsWith('HTTP error')) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('otp code is invalid') || msg.includes('invalid otp')) {
      return 'Mã OTP không chính xác. Vui lòng kiểm tra lại.';
    }
    if (msg.includes('otp code has expired') || msg.includes('expired')) {
      return 'Mã OTP đã hết hạn. Vui lòng bấm gửi lại mã mới.';
    }
    if (msg.includes('failed to fetch') || msg.includes('networkerror')) {
      return 'Không thể kết nối đến máy chủ Backend. Vui lòng kiểm tra lại kết nối mạng.';
    }
    if (error.message && !error.message.startsWith('HTTP error')) {
      return error.message;
    }
  }

  return fallback;
};

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponseData> {
    const response = await fetchClient.post<ApiResponse<AuthResponseData>>('/auth/login', payload);
    if (response?.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponseData> {
    const response = await fetchClient.post<ApiResponse<AuthResponseData>>('/auth/register', payload);
    return response?.data || { email: payload.email, name: payload.name, otpSent: true };
  },

  async verifyRegistration(payload: VerifyRegistrationRequest): Promise<AuthResponseData> {
    const response = await fetchClient.post<ApiResponse<AuthResponseData>>(
      '/auth/verify-registration',
      payload
    );
    if (response?.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  async resendRegistrationOtp(email: string): Promise<boolean> {
    await fetchClient.post<ApiResponse<unknown>>('/auth/resend-registration-otp', { email });
    return true;
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<boolean> {
    await fetchClient.post<ApiResponse<unknown>>('/auth/forgot-password', payload);
    return true;
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<boolean> {
    await fetchClient.post<ApiResponse<unknown>>('/auth/reset-password', payload);
    return true;
  },

  logout(): void {
    localStorage.removeItem('accessToken');
    fetchClient.post('/auth/logout').catch(() => {});
  },
};
