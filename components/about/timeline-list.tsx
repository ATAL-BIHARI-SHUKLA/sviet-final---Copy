type TimelineItem = {
  year: string;
  event: string;
};

type TimelineListProps = {
  items: TimelineItem[];
  className?: string;
};

export function TimelineList({ items, className }: TimelineListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={`${item.year}-${item.event}`} className="flex items-start gap-4 border-l-2 border-[#BFDBFE] py-2 pl-4">
          <span className="min-w-14 text-sm font-semibold text-[#f7941d]">{item.year}</span>
          <span className="text-sm leading-relaxed text-[#4B5563]">{item.event}</span>
        </li>
      ))}
    </ul>
  );
}
