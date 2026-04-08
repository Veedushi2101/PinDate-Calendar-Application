import { motion } from "framer-motion";
import { Check, Pencil, Trash2, Undo2 } from "lucide-react";
import { CalendarNote, NoteColor } from "@/lib/types";

const colorMap: Record<NoteColor, string> = {
  yellow: "border-l-note-yellow bg-note-yellow/30",
  blue: "border-l-note-blue bg-note-blue/30",
  green: "border-l-note-green bg-note-green/30",
  coral: "border-l-note-coral bg-note-coral/30",
  lavender: "border-l-note-lavender bg-note-lavender/30",
};

interface NotesListProps {
  notes: CalendarNote[];
  onEdit: (note: CalendarNote) => void;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

export function NotesList({ notes, onEdit, onDelete, onToggleDone }: NotesListProps) {
  const active = notes.filter((n) => !n.done);
  const completed = notes.filter((n) => n.done);

  return (
    <div className="space-y-4">
      {active.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Active Notes</h4>
          {active.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onToggleDone={onToggleDone} />
          ))}
        </div>
      )}
      {completed.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Completed</h4>
          {completed.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onToggleDone={onToggleDone} />
          ))}
        </div>
      )}
      {notes.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">No notes yet. Select dates to add one.</p>
      )}
    </div>
  );
}

function NoteItem({ note, onEdit, onDelete, onToggleDone }: {
  note: CalendarNote;
  onEdit: (note: CalendarNote) => void;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-md border-l-4 p-3 ${colorMap[note.color]} ${note.done ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium text-foreground ${note.done ? "line-through" : ""}`}>{note.title}</p>
          {note.description && (
            <p className={`mt-1 text-xs text-muted-foreground ${note.done ? "line-through" : ""}`}>{note.description}</p>
          )}
          <p className="mt-1 text-[10px] text-muted-foreground">
            {note.startDate === note.endDate ? note.startDate : `${note.startDate} → ${note.endDate}`}
          </p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onToggleDone(note.id)} className="rounded p-1 text-muted-foreground hover:bg-muted" title={note.done ? "Undo" : "Done"}>
            {note.done ? <Undo2 size={14} /> : <Check size={14} />}
          </button>
          {!note.done && (
            <button onClick={() => onEdit(note)} className="rounded p-1 text-muted-foreground hover:bg-muted" title="Edit">
              <Pencil size={14} />
            </button>
          )}
          <button onClick={() => onDelete(note.id)} className="rounded p-1 text-muted-foreground hover:bg-destructive/20" title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
