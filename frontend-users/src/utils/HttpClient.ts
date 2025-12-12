const BASE_URL = 'http://localhost:3000/api';

export class HttpClient {
  private static async request<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
    const headers = { 'Content-Type': 'application/json' };
    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const text = await response.text();
      return (text ? JSON.parse(text) : {}) as T;
    } catch (error) {
      console.error('API Call Failed:', error);
      throw error;
    }
  }

  static get<T>(path: string) { return this.request<T>(path, 'GET'); }
  static post<T>(path: string, body: unknown) { return this.request<T>(path, 'POST', body); }
  static put<T>(path: string, body: unknown) { return this.request<T>(path, 'PUT', body); }
  static delete<T>(path: string) { return this.request<T>(path, 'DELETE'); }
}