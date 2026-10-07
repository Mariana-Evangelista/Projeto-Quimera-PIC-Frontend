import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  private context: APIRequestContext | null = null;
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.API_BASE_URL || 'http://127.0.0.1:8001';
  }

  async init() {
    if (!this.context) {
      this.context = await request.newContext({ baseURL: this.baseURL });
    }
    return this.context;
  }

  async dispose() {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }

  getContext() {
    if (!this.context) {
      throw new Error('ApiClient not initialized. Call init() first.');
    }
    return this.context;
  }

  async post(path: string, data: unknown, headers?: Record<string, string>) {
    const context = await this.init();
    return context.post(path, { data, headers });
  }

  async get(path: string, headers?: Record<string, string>) {
    const context = await this.init();
    return context.get(path, { headers });
  }

  async put(path: string, data: unknown, headers?: Record<string, string>) {
    const context = await this.init();
    return context.put(path, { data, headers });
  }

  async delete(path: string, headers?: Record<string, string>) {
    const context = await this.init();
    return context.delete(path, { headers });
  }

  async loginTeacher(email: string, password: string) {
    const response = await this.post('/auth/login', { email, password });
    const data = await response.json();
    return data.token || data.accessToken || '';
  }

  async createTeacher(name: string, email: string, password: string) {
    const response = await this.post('/teacher/', { name, email, password });
    return response.json();
  }

  async createExperiment(token: string, data: { type: string; university: string; class: string }) {
    const response = await this.post('/experiment/', data, { Authorization: `Bearer ${token}` });
    return response.json();
  }

  async getExperiments(token: string) {
    const response = await this.get('/experiment/me', { Authorization: `Bearer ${token}` });
    return response.json();
  }

  async getExperimentByPin(pin: string, slug: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await this.get(`/experiment/pin/${pin}/${slug}`, headers);
    return response.json();
  }

  async updateExperiment(token: string, id: string, data: unknown) {
    const response = await this.put(`/experiment/${id}`, data, { Authorization: `Bearer ${token}` });
    return response.json();
  }

  async deleteExperiment(token: string, id: string) {
    const response = await this.delete(`/experiment/${id}`, { Authorization: `Bearer ${token}` });
    return response.json();
  }

  async submitBWLResponse(pin: string, data: unknown) {
    const response = await this.post(`/body-water-loss-response/`, data);
    return response.json();
  }

  async submitGCResponse(pin: string, data: unknown) {
    const response = await this.post(`/glycemic-control-response/`, data);
    return response.json();
  }

  async getBWLAnalytics(pin: string) {
    const response = await this.get(`/body-water-loss-response/analytics/${pin}`);
    return response.json();
  }

  async getGCAnalytics(pin: string) {
    const response = await this.get(`/glycemic-control-response/analytics/${pin}`);
    return response.json();
  }
}

export function createApiClient(baseURL?: string) {
  return new ApiClient(baseURL);
}