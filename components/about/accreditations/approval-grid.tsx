import { LogoCard } from "@/components/about/accreditations/logo-card";

type ApprovalItem = {
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
};

type ApprovalGridProps = {
  items: ApprovalItem[];
};

export function ApprovalGrid({ items }: ApprovalGridProps) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <LogoCard
          key={item.title}
          title={item.title}
          description={item.description}
          logoSrc={item.logoSrc}
          logoAlt={item.logoAlt}
        />
      ))}
    </div>
  );
}
