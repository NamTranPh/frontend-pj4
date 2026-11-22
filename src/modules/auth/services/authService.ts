import { fetchClient } from '../../../api/fetchClient';
import { ApiResponse } from '../../../types/common.types';
import {
  AuthResponseData,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyRegistrationRequest,
} from '../types/auth.types';

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponseData> {
    try {
      const response = await fetchClient.post<ApiResponse<AuthResponseData>>('/auth/login', payload);
      if (response?.data) {
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
      }
    } catch {
      // Fallback demo khi Backend chưa bật
      console.warn('[authService] Backend offline, simulating login');
    }
    const mockToken = `mock_jwt_token_${Date.now()}`;
    localStorage.setItem('accessToken', mockToken);
    return { email: payload.email, name: payload.email.split('@')[0], accessToken: mockToken };
  },

  async register(payload: RegisterRequest): Promise<AuthResponseData> {
    try {
      const response = await fetchClient.post<ApiResponse<AuthResponseData>>('/auth/register', payload);
      if (response?.data) {
        return response.data;
      }
    } catch {
      console.warn('[authService] Backend offline, simulating register OTP sent');
    }
    return { email: payload.email, name: payload.name, otpSent: true };
  },

  async verifyRegistration(payload: VerifyRegistrationRequest): Promise<AuthResponseData> {
    try {
      const response = await fetchClient.post<ApiResponse<AuthResponseData>>(
        '/auth/verify-registration',
        payload
      );
      if (response?.data) {
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
      }
    } catch {
      console.warn('[authService] Backend offline, simulating verify registration');
    }
    const mockToken = `mock_verified_jwt_${Date.now()}`;
    localStorage.setItem('accessToken', mockToken);
    return { email: payload.email, accessToken: mockToken };
  },

  async resendRegistrationOtp(email: string): Promise<boolean> {
    try {
      await fetchClient.post<ApiResponse<unknown>>('/auth/resend-registration-otp', { email });
      return true;
    } catch {
      return true;
    }
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<boolean> {
    try {
      await fetchClient.post<ApiResponse<unknown>>('/auth/forgot-password', payload);
      return true;
    } catch {
      return true;
    }
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<boolean> {
    try {
      await fetchClient.post<ApiResponse<unknown>>('/auth/reset-password', payload);
      return true;
    } catch {
      return true;
    }
  },

  logout(): void {
    localStorage.removeItem('accessToken');
    fetchClient.post('/auth/logout').catch(() => {});
  },
};
