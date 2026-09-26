import "server-only";

type AsyncOperation<T> = () => Promise<T>;

const DB_RETRY_COOLDOWN_MS = 30_000;

type DbCircuitState = {
  unavailableUntil: number;
  lastLogAt: number;
};

const globalForDbCircuit = globalThis as unknown as {
  dbCircuit: DbCircuitState | undefined;
};

const dbCircuit: DbCircuitState =
  globalForDbCircuit.dbCircuit ?? {
    unavailableUntil: 0,
    lastLogAt: 0,
  };

if (process.env.NODE_ENV !== "production") {
  globalForDbCircuit.dbCircuit = dbCircuit;
}

function getErrorDetails(error: unknown): { code?: string; modelName?: string } {
  if (typeof error !== "object" || error === null) {
    return {};
  }

  const maybeCode = "code" in error ? (error.code as unknown) : undefined;
  const maybeMeta = "meta" in error ? (error.meta as unknown) : undefined;

  const code = typeof maybeCode === "string" ? maybeCode : undefined;

  let modelName: string | undefined;
  if (typeof maybeMeta === "object" && maybeMeta !== null && "modelName" in maybeMeta) {
    const candidate = (maybeMeta as { modelName?: unknown }).modelName;
    modelName = typeof candidate === "string" ? candidate : undefined;
  }

  return { code, modelName };
}

function shouldShortCircuit(): boolean {
  return Date.now() < dbCircuit.unavailableUntil;
}

function logFailureOncePerWindow(error: unknown) {
  const now = Date.now();
  if (now - dbCircuit.lastLogAt < DB_RETRY_COOLDOWN_MS) {
    return;
  }

  dbCircuit.lastLogAt = now;
  const { code, modelName } = getErrorDetails(error);

  const details = [
    code ? `code=${code}` : null,
    modelName ? `model=${modelName}` : null,
    `retry_in_ms=${DB_RETRY_COOLDOWN_MS}`,
  ]
    .filter(Boolean)
    .join(" ");

  console.warn(`Database unavailable. Using fallback data. ${details}`);
}

export async function safeRead<T>(operation: AsyncOperation<T>, fallback: T): Promise<T> {
  if (shouldShortCircuit()) {
    return fallback;
  }

  try {
    const result = await operation();
    dbCircuit.unavailableUntil = 0;
    return result;
  } catch (error) {
    dbCircuit.unavailableUntil = Date.now() + DB_RETRY_COOLDOWN_MS;
    logFailureOncePerWindow(error);
    return fallback;
  }
}
