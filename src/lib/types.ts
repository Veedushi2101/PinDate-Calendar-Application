export type NoteColor = "yellow" | "blue" | "green" | "coral" | "lavender";

export interface CalendarNote {
  id: string;
  title: string;
  description: string;
  color: NoteColor;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  done: boolean;
}
