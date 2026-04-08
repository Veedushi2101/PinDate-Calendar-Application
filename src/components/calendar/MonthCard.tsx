import { motion } from "framer-motion";
import { monthImages, monthNames } from "@/lib/monthImages";

interface MonthCardProps {
  month: number;
  year: number;
  onClick: () => void;
}

export function MonthCard({ month, year, onClick }: MonthCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-card shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layout
      layoutId={`month-${month}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={monthImages[month]}
          alt={monthNames[month]}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1280}
          height={640}
        />
        <div className="absolute inset-0 bg-card/20" />
      </div>
      <div className="px-4 py-3 text-left">
        <h3 className="text-display text-lg font-semibold text-foreground">{monthNames[month]}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
    </motion.button>
  );
}
