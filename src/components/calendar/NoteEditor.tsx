import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CalendarNote, NoteColor } from "@/lib/types";

const COLORS: { value: NoteColor; label: string; cls: string }[] = [
  { value: "yellow", label: "Yellow", cls: "bg-note-yellow" },
  { value: "blue", label: "Blue", cls: "bg-note-blue" },
  { value: "green", label: "Green", cls: "bg-note-green" },
  { value: "coral", label: "Coral", cls: "bg-note-coral" },
  { value: "lavender", label: "Lavender", cls: "bg-note-lavender" },
];

interface NoteEditorProps {
  open: boolean;
  startDate: string;
  endDate: string;
  editNote?: CalendarNote | null;
  onSave: (data: {
    title: string;
    description: string;
    color: NoteColor;
    startDate: string;
    endDate: string;
  }) => void;
  onClose: () => void;
}

export function NoteEditor({
  open,
  startDate,
  endDate,
  editNote,
  onSave,
  onClose,
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");

  useEffect(() => {
    if (open) {
      setTitle(editNote?.title || "");
      setDescription(editNote?.description || "");
      setColor(editNote?.color || "yellow");
    }
  }, [open, editNote]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      color,
      startDate,
      endDate,
    });

    setTitle("");
    setDescription("");
    setColor("yellow");
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setColor(editNote?.color || "yellow");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {editNote ? "Edit Note" : "New Note"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {startDate === endDate ? startDate : `${startDate} → ${endDate}`}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close note editor"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write something..."
                  rows={4}
                  className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Color
                </label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`h-8 w-8 rounded-full ${c.cls} transition-all ${
                        color === c.value
                          ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-card"
                          : "hover:scale-105"
                      }`}
                      title={c.label}
                      aria-label={c.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border p-5">
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editNote ? "Update" : "Save Note"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}