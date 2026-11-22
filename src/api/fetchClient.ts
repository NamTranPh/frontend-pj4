import { env } from '../config/env';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...rest } = options;
    const url = this.buildUrl(path, params);

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers as Record<string, string>),
    };

    const config: RequestInit = {
      ...rest,
      headers: requestHeaders,
      credentials: 'include', // Trao đổi HttpOnly Cookie
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 401) {
        // Tự động thử refresh token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          if (newToken) {
            requestHeaders['Authorization'] = `Bearer ${newToken}`;
          }
          const retryResponse = await fetch(url, { ...config, headers: requestHeaders });
          if (!retryResponse.ok) {
            throw new Error(`HTTP Error ${retryResponse.status}`);
          }
          return await retryResponse.json();
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`[fetchClient] API request failed to ${url}:`, error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.data?.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          return true;
        }
      }
    } catch {
      // Ignore refresh error
    }
    localStorage.removeItem('accessToken');
    return false;
  }

  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>(path, { method: 'GET', params });
  }

  post<T>(path: string, body?: unknown, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      params,
    });
  }
}

export const fetchClient = new FetchClient(env.apiUrl);
