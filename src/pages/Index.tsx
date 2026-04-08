import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonthCard } from "@/components/calendar/MonthCard";
import { CalendarView } from "@/components/calendar/CalendarView";

const CURRENT_YEAR = new Date().getFullYear();

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {selectedMonth === null ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
          >
            <div className="mb-10 text-center">
              <h1 className="text-display text-4xl font-bold text-foreground sm:text-5xl">{CURRENT_YEAR}</h1>
              <p className="mt-2 text-body text-muted-foreground">Your year at a glance</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
              {Array.from({ length: 12 }, (_, i) => (
                <MonthCard
                  key={i}
                  month={i}
                  year={CURRENT_YEAR}
                  onClick={() => setSelectedMonth(i)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarView
              month={selectedMonth}
              year={CURRENT_YEAR}
              onBack={() => setSelectedMonth(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
