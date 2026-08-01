import { formatHoursTable, type StoreHourRow } from "@/lib/hours";
import { cn } from "@/lib/utils";

interface OpeningHoursTableProps {
  hours: StoreHourRow[];
  className?: string;
}

export function OpeningHoursTable({ hours, className }: OpeningHoursTableProps) {
  const rows = formatHoursTable(hours);

  return (
    <table className={cn("w-full text-sm", className)}>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.day}
            className={cn(
              "border-b border-sage/10 last:border-0",
              row.isToday && "font-semibold text-sage"
            )}
          >
            <td className="py-2 pr-4">{row.day}</td>
            <td className="py-2 text-right text-earth/70">{row.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
