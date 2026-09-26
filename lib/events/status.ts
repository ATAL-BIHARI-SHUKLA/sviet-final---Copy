export type EventStatus = "upcoming" | "ongoing" | "completed";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getEventStatus(
  event: { startDate: Date; endDate: Date | null },
  now = new Date(),
): EventStatus {
  const today = startOfDay(now);

  if (event.startDate >= today) {
    return "upcoming";
  }

  if (!event.endDate || event.endDate >= today) {
    return "ongoing";
  }

  return "completed";
}

export function getTodayStart(now = new Date()) {
  return startOfDay(now);
}
