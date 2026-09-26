type LogLevel = "info" | "warn" | "error";

type LogPayload = {
  message: string;
  context?: Record<string, unknown>;
};

export function log(level: LogLevel, payload: LogPayload) {
  const entry = {
    level,
    message: payload.message,
    context: payload.context ?? {},
    timestamp: new Date().toISOString(),
  };

  const serialized = JSON.stringify(entry);

  if (level === "error") {
    console.error(serialized);
    return;
  }

  if (level === "warn") {
    console.warn(serialized);
    return;
  }

  console.log(serialized);
}
