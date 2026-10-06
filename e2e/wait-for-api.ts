#!/usr/bin/env node
// Wait for the E2E backend API to be healthy
// Usage: node e2e/wait-for-api.js [timeoutMs]

const HEALTH_URL = process.env.E2E_API_HEALTH_URL || 'http://127.0.0.1:8001/health';
const DEFAULT_TIMEOUT = 60_000;
const POLL_INTERVAL = 1_000;

async function waitForApi(timeoutMs: number) {
  const start = Date.now();
  let lastError: Error | null = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(HEALTH_URL);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && data.mongo === 'connected') {
          console.log(`✓ API healthy at ${HEALTH_URL}`);
          console.log(`  Status: ${data.status}, Mongo: ${data.mongo}`);
          return;
        }
        lastError = new Error(`API not ready: ${JSON.stringify(data)}`);
      } else {
        lastError = new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }

    const elapsed = Date.now() - start;
    const remaining = timeoutMs - elapsed;
    if (remaining > 0) {
      process.stdout.write(`\rWaiting for API... ${elapsed}ms / ${timeoutMs}ms`);
      await new Promise(r => setTimeout(r, POLL_INTERVAL));
    }
  }

  console.error(`\n✗ API health check failed after ${timeoutMs}ms`);
  console.error(`  Last error: ${lastError?.message}`);
  process.exit(1);
}

const timeout = parseInt(process.argv[2] || String(DEFAULT_TIMEOUT), 10);
waitForApi(timeout);