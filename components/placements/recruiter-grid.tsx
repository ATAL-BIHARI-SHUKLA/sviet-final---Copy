import { LogoCard } from "@/components/placements/logo-card";

type Recruiter = {
  name: string;
  logoSrc: string;
  logoAlt: string;
};

type RecruiterGridProps = {
  recruiters: Recruiter[];
};

export function RecruiterGrid({ recruiters }: RecruiterGridProps) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recruiters.map((recruiter) => (
        <LogoCard key={recruiter.name} name={recruiter.name} logoSrc={recruiter.logoSrc} logoAlt={recruiter.logoAlt} />
      ))}
    </div>
  );
}