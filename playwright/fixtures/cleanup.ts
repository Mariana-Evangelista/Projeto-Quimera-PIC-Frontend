export class CleanupRegistry {
  private tasks: Array<() => Promise<void>> = [];

  add(task: () => Promise<void>) {
    this.tasks.push(task);
  }

  async executeAll() {
    const errors: Error[] = [];
    for (const task of this.tasks) {
      try {
        await task();
      } catch (e) {
        errors.push(e instanceof Error ? e : new Error(String(e)));
      }
    }
    if (errors.length > 0) {
      console.warn('Some cleanup tasks failed:', errors.map(e => e.message).join('; '));
    }
  }
}

export function createCleanupRegistry() {
  return new CleanupRegistry();
}