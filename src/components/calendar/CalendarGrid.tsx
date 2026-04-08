import { useMemo } from "react";
import { DayCell } from "./DayCell";
import { CalendarNote } from "@/lib/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  month: number;
  year: number;
  startDate: string | null;
  endDate: string | null;
  getNotesForDate: (dateStr: string) => CalendarNote[];
  onDateClick: (dateStr: string) => void;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CalendarGrid({ month, year, startDate, endDate, getNotesForDate, onDateClick }: CalendarGridProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [month, year]);

  const rangeStart = startDate && endDate ? (startDate < endDate ? startDate : endDate) : startDate;
  const rangeEnd = startDate && endDate ? (startDate < endDate ? endDate : startDate) : startDate;

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-xs font-medium text-muted-foreground py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const dateStr = day ? `${year}-${pad(month + 1)}-${pad(day)}` : "";
          const isStart = dateStr === rangeStart;
          const isEnd = dateStr === rangeEnd;
          const isInRange = !!(rangeStart && rangeEnd && dateStr > rangeStart && dateStr < rangeEnd);
          const notes = day ? getNotesForDate(dateStr) : [];

          return (
            <DayCell
              key={i}
              day={day}
              dateStr={dateStr}
              isToday={dateStr === todayStr}
              isStart={isStart}
              isEnd={isEnd}
              isInRange={isInRange}
              notes={notes}
              onClick={() => day && onDateClick(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}
