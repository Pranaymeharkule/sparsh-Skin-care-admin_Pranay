import { format } from "date-fns";

export function formatDateTime(dateStr, timeStr) {
  try {
    const normalized = `${dateStr.trim()}T${timeStr.trim()}`; // Ensure ISO format
    const dateObj = new Date(normalized);
    if (isNaN(dateObj)) return "-";
    return format(dateObj, "dd MMM yyyy, hh:mm a");
  } catch {
    return "-";
  }
}
