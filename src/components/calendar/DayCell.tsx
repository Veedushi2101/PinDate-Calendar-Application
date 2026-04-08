import { CalendarNote, NoteColor } from "@/lib/types";

const colorMap: Record<NoteColor, string> = {
  yellow: "bg-note-yellow",
  blue: "bg-note-blue",
  green: "bg-note-green",
  coral: "bg-note-coral",
  lavender: "bg-note-lavender",
};

interface DayCellProps {
  day: number | null;
  dateStr: string;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  notes: CalendarNote[];
  onClick: () => void;
}

export function DayCell({
  day,
  isToday,
  isStart,
  isEnd,
  isInRange,
  notes,
  onClick,
}: DayCellProps) {
  if (!day) {
    return <div />;
  }

  const hasNote = notes.length > 0;
  const uniqueColors = Array.from(new Set(notes.map((note) => note.color)));

  const selectedClass =
    isStart || isEnd
      ? "bg-calendar-selected text-primary-foreground font-bold"
      : isInRange
      ? "bg-calendar-range"
      : "";

  const todayClass =
    isToday && !isStart && !isEnd ? "ring-2 ring-primary ring-inset" : "";

  return (
    <button
      onClick={onClick}
      className={`relative aspect-square w-full rounded-md p-1 text-center transition-colors ${selectedClass} ${todayClass}`}
    >
      <div className="flex h-full flex-col items-center pt-1">
        <div className="text-xs font-medium">{day}</div>

        {hasNote && !isStart && !isEnd && (
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1">
            {uniqueColors.map((color) => (
              <span
                key={color}
                className={`h-2 w-2 rounded-full ${colorMap[color]}`}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}