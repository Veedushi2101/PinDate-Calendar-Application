import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { monthImages, monthNames } from "@/lib/monthImages";
import { CalendarGrid } from "./CalendarGrid";
import { NoteEditor } from "./NoteEditor";
import { NotesList } from "./NotesList";
import { CalendarNote, NoteColor } from "@/lib/types";
import { useNotes } from "@/hooks/useNotes";

interface CalendarViewProps {
  month: number;
  year: number;
  onBack: () => void;
}

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -18 : 18,
    x: direction > 0 ? 80 : -80,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transformOrigin: "center center",
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 18 : -18,
    x: direction > 0 ? -80 : 80,
    transformOrigin: direction > 0 ? "right center" : "left center",
  }),
};

export function CalendarView({ month, year, onBack }: CalendarViewProps) {
  const { notes, addNote, updateNote, deleteNote, toggleDone, getNotesForDate } = useNotes();

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [direction, setDirection] = useState(1);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editNote, setEditNote] = useState<CalendarNote | null>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStart, setPreviewStart] = useState<string | null>(null);
  const [previewEnd, setPreviewEnd] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }, [month, year]);

  const monthNotes = useMemo(() => {
    const prefix = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;
    return notes.filter(
      (n) => n.startDate.startsWith(prefix) || n.endDate.startsWith(prefix)
    );
  }, [notes, currentMonth, currentYear]);

  const handleDateClick = (dateStr: string) => {
    if (!startDate) {
      setStartDate(dateStr);
      setEndDate(null);
      setPreviewOpen(false);
    } else if (!endDate) {
      setEndDate(dateStr);
      setPreviewOpen(false);
    } else {
      setStartDate(dateStr);
      setEndDate(null);
      setPreviewOpen(false);
    }
  };

  const handleAddNote = () => {
    if (!startDate) return;
    setEditNote(null);
    setEditorOpen(true);
  };

  const handleEditNote = (note: CalendarNote) => {
    setEditNote(note);
    setStartDate(note.startDate);
    setEndDate(note.endDate);
    setEditorOpen(true);
  };

  const resolvedStart =
    startDate && endDate ? (startDate < endDate ? startDate : endDate) : startDate;

  const resolvedEnd =
    startDate && endDate ? (startDate < endDate ? endDate : startDate) : startDate;

  const previewNotes = useMemo(() => {
    if (!previewStart) return [];

    if (!previewEnd || previewStart === previewEnd) {
      return getNotesForDate(previewStart);
    }

    return monthNotes.filter(
      (note) =>
        note.startDate <= (previewEnd || previewStart) &&
        note.endDate >= previewStart
    );
  }, [previewStart, previewEnd, monthNotes, getNotesForDate]);

  const handleSave = (data: {
    title: string;
    description: string;
    color: NoteColor;
    startDate: string;
    endDate: string;
  }) => {
    if (editNote) {
      updateNote(editNote.id, data);
    } else {
      addNote(data);
    }

    setEditorOpen(false);
    setEditNote(null);

    setPreviewStart(data.startDate);
    setPreviewEnd(data.endDate);
    setPreviewOpen(true);

    setStartDate(null);
    setEndDate(null);
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setPreviewOpen(false);
    setStartDate(null);
    setEndDate(null);

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setDirection(1);
    setPreviewOpen(false);
    setStartDate(null);
    setEndDate(null);

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-foreground shadow-sm transition hover:bg-muted"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={handleNextMonth}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-foreground shadow-sm transition hover:bg-muted"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="relative pt-6 md:pt-10 [perspective:1600px]">
              <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 md:block">
                <div className="flex items-center gap-20 lg:gap-28">
                  <div className="h-8 w-8 rounded-full border-[6px] border-muted-foreground/50 bg-background shadow-sm" />
                  <div className="h-8 w-8 rounded-full border-[6px] border-muted-foreground/50 bg-background shadow-sm" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-12 top-3 z-10 hidden h-4 rounded-full bg-muted shadow-sm md:block" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${currentYear}-${currentMonth}`}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                >
                  <div className="h-6 w-full bg-gradient-to-b from-muted/90 to-muted/40" />

                  <div className="relative h-48 w-full overflow-hidden md:h-60">
                    <img
                      src={monthImages[currentMonth]}
                      alt={`${monthNames[currentMonth]} cover`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        {monthNames[currentMonth]}
                      </h1>
                      <p className="mt-1 text-sm text-white/85 md:text-base">{currentYear}</p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-5 md:px-8">
                    {startDate && (
                      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 shadow-sm">
                        <span className="text-sm font-medium text-foreground">
                          {resolvedStart === resolvedEnd || !resolvedEnd
                            ? resolvedStart
                            : `${resolvedStart} → ${resolvedEnd}`}
                        </span>

                        <button
                          onClick={handleAddNote}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Note
                        </button>

                        <button
                          onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                          }}
                          className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <CalendarGrid
                      month={currentMonth}
                      year={currentYear}
                      startDate={startDate}
                      endDate={endDate}
                      getNotesForDate={getNotesForDate}
                      onDateClick={handleDateClick}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-foreground">Notes</h2>
                <NotesList
                  notes={monthNotes}
                  onEdit={handleEditNote}
                  onDelete={deleteNote}
                  onToggleDone={toggleDone}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <NoteEditor
          open={editorOpen}
          startDate={resolvedStart || ""}
          endDate={resolvedEnd || resolvedStart || ""}
          editNote={editNote}
          onSave={handleSave}
          onClose={() => {
            setEditorOpen(false);
            setEditNote(null);
          }}
        />

        <AnimatePresence>
          {previewOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-3xl border border-border bg-card p-5 shadow-2xl"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Saved Notes</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {previewStart === previewEnd || !previewEnd
                        ? previewStart
                        : `${previewStart} → ${previewEnd}`}
                    </p>
                  </div>

                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
                  {previewNotes.length > 0 ? (
                    previewNotes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-2xl border border-border bg-background/70 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-medium text-foreground">{note.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {note.startDate === note.endDate
                              ? note.startDate
                              : `${note.startDate} → ${note.endDate}`}
                          </span>
                        </div>

                        {note.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {note.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      No notes found for this selection.
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}