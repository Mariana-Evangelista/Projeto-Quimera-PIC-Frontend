import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

export interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ExperimentData {
  id: string;
  pin: string;
  type: 'body-water-loss' | 'glycemic-control';
  university: string;
  class: string;
}

export const test = base.extend<{
  teacherAccount: TeacherAccount;
  experimentFactory: ExperimentFactory;
  api: APIRequestContext;
  cleanup: CleanupRegistry;
}>({
  teacherAccount: async ({}, use, testInfo) => {
    const runId = testInfo.project.name + '-' + Date.now();
    const workerIndex = testInfo.workerIndex;
    const account: TeacherAccount = {
      id: '',
      name: `Professor E2E ${runId}-${workerIndex}`,
      email: `quimera-e2e-${runId}-${workerIndex}@example.test`,
      password: 'E2eTest123!',
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(account);
  },

  api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://127.0.0.1:8001',
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(api);
    await api.dispose();
  },

  experimentFactory: async ({ api, teacherAccount }, use) => {
    const factory = new ExperimentFactory(api, teacherAccount);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(factory);
  },

  cleanup: async ({}, use) => {
    const registry = new CleanupRegistry();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(registry);
    await registry.executeAll();
  },
});

export class ExperimentFactory {
  constructor(
    private api: APIRequestContext,
    private teacherAccount: TeacherAccount
  ) {}

  async createTeacher(): Promise<TeacherAccount> {
    const response = await this.api.post('/teacher/', {
      data: {
        name: this.teacherAccount.name,
        email: this.teacherAccount.email,
        password: this.teacherAccount.password,
      },
    });
    const data = await response.json();
    this.teacherAccount.id = data._id || data.id;
    return this.teacherAccount;
  }

  async loginTeacher(): Promise<string> {
    const response = await this.api.post('/auth/login', {
      data: {
        email: this.teacherAccount.email,
        password: this.teacherAccount.password,
      },
    });
    const data = await response.json();
    return data.token || data.accessToken || '';
  }

  async createExperiment(data: { type: 'body-water-loss' | 'glycemic-control'; university: string; class: string }, token: string): Promise<ExperimentData> {
    const response = await this.api.post('/experiment/', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        type: data.type,
        university: data.university,
        class: data.class,
      },
    });
    const exp = await response.json();
    return {
      id: exp._id || exp.id,
      pin: exp.pin,
      type: data.type,
      university: data.university,
      class: data.class,
    };
  }

  async deleteExperiment(id: string, token: string): Promise<void> {
    await this.api.delete(`/experiment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getExperiments(token: string) {
    const response = await this.api.get('/experiment/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }
}

export class CleanupRegistry {
  private tasks: Array<() => Promise<void>> = [];

  add(task: () => Promise<void>) {
    this.tasks.push(task);
  }

  async executeAll() {
    for (const task of this.tasks) {
      try {
        await task();
      } catch (e) {
        console.warn('Cleanup task failed:', e);
      }
    }
  }
}

export { expect } from '@playwright/test';