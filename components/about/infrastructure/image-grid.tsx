import { ImageCard } from "@/components/about/infrastructure/image-card";

type GridItem = {
  title: string;
  summary?: string;
  imageSrc: string;
  imageAlt: string;
};

type ImageGridProps = {
  items: GridItem[];
  activeTitle?: string;
  onSelectItem?: (title: string) => void;
};

export function ImageGrid({ items, activeTitle, onSelectItem }: ImageGridProps) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ImageCard
          key={`${item.title}-${item.imageSrc}`}
          title={item.title}
          summary={item.summary}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          isActive={activeTitle === item.title}
          onClick={onSelectItem ? () => onSelectItem(item.title) : undefined}
        />
      ))}
    </div>
  );
}