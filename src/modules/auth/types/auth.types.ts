export type AuthMode =
  | 'login'
  | 'register'
  | 'verify_register'
  | 'forgot_email'
  | 'forgot_reset';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface VerifyRegistrationRequest {
  email: string;
  otpCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface AuthResponseData {
  userId?: string | number;
  email?: string;
  name?: string;
  accessToken?: string;
  otpSent?: boolean;
}
