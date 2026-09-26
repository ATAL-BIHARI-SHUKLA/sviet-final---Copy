import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="mt-8" aria-label="Infrastructure categories">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "border-[#f7941d] bg-[#f7941d] text-white"
                  : "border-[#BFDBFE] bg-white text-[#f7941d] hover:border-[#f7941d] hover:text-[#111827]",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}