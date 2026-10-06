import { ApiClient } from '../utils/api-client';

export interface TeacherData {
  name: string;
  email: string;
  password: string;
}

export interface ExperimentInput {
  type: 'body-water-loss' | 'glycemic-control';
  university: string;
  class: string;
}

export interface ExperimentOutput {
  id: string;
  pin: string;
  type: 'body-water-loss' | 'glycemic-control';
  university: string;
  class: string;
}

export function generateTeacherData(runId: string, workerIndex: number): TeacherData {
  return {
    name: `Professor E2E ${runId}-${workerIndex}`,
    email: `quimera-e2e-${runId}-${workerIndex}@example.test`,
    password: 'E2eTest123!',
  };
}

export function generateExperimentInput(type: 'body-water-loss' | 'glycemic-control', runId: string): ExperimentInput {
  return {
    type,
    university: `Universidade E2E ${runId}`,
    class: `Turma E2E ${runId}`,
  };
}

export function generateStudentName(testId: string, prefix = 'Aluno'): string {
  return `${prefix} ${testId}`;
}

export async function createTeacherViaApi(api: ApiClient, data: TeacherData) {
  const response = await api.createTeacher(data.name, data.email, data.password);
  return response;
}

export async function loginTeacherViaApi(api: ApiClient, email: string, password: string) {
  return api.loginTeacher(email, password);
}

export async function createExperimentViaApi(api: ApiClient, token: string, input: ExperimentInput): Promise<ExperimentOutput> {
  const response = await api.createExperiment(token, input);
  return {
    id: response._id || response.id,
    pin: response.pin,
    type: input.type,
    university: input.university,
    class: input.class,
  };
}

export async function setupTeacherAndExperiment(
  api: ApiClient,
  runId: string,
  workerIndex: number,
  type: 'body-water-loss' | 'glycemic-control'
): Promise<{ teacher: TeacherData; token: string; experiment: ExperimentOutput }> {
  const teacher = generateTeacherData(runId, workerIndex);
  await createTeacherViaApi(api, teacher);
  const token = await loginTeacherViaApi(api, teacher.email, teacher.password);
  const experimentInput = generateExperimentInput(type, runId);
  const experiment = await createExperimentViaApi(api, token, experimentInput);
  return { teacher, token, experiment };
}