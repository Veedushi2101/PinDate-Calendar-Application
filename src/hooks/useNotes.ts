import { useState, useCallback, useEffect } from "react";
import { CalendarNote, NoteColor } from "@/lib/types";
import { loadNotes, saveNotes } from "@/lib/notesStore";

export function useNotes() {
  const [notes, setNotes] = useState<CalendarNote[]>([]);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const persist = useCallback((updated: CalendarNote[]) => {
    setNotes(updated);
    saveNotes(updated);
  }, []);

  const addNote = useCallback((note: Omit<CalendarNote, "id" | "done">) => {
    persist([...notes, { ...note, id: crypto.randomUUID(), done: false }]);
  }, [notes, persist]);

  const updateNote = useCallback((id: string, updates: Partial<CalendarNote>) => {
    persist(notes.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  }, [notes, persist]);

  const deleteNote = useCallback((id: string) => {
    persist(notes.filter((n) => n.id !== id));
  }, [notes, persist]);

  const toggleDone = useCallback((id: string) => {
    persist(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)));
  }, [notes, persist]);

  const getNotesForDate = useCallback((dateStr: string) => {
    return notes.filter((n) => {
      if (n.done) return false;
      return dateStr >= n.startDate && dateStr <= n.endDate;
    });
  }, [notes]);

  return { notes, addNote, updateNote, deleteNote, toggleDone, getNotesForDate };
}
