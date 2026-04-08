import { CalendarNote } from "./types";

const STORAGE_KEY = "wall-calendar-notes";

export function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
