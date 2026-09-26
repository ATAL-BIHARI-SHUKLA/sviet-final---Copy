import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ABOUT_ROUTE_SLUGS, AboutPageTemplate, getAboutPageDataBySlug } from "@/components/about/about-page-template";

type AboutSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ABOUT_ROUTE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AboutSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getAboutPageDataBySlug(slug);

  if (!data) {
    return {
      title: "About",
    };
  }

  return {
    title: data.title,
    description: data.intro,
  };
}

export default async function AboutDetailPage({ params }: AboutSlugPageProps) {
  const { slug } = await params;
  const data = getAboutPageDataBySlug(slug);

  if (!data) {
    notFound();
  }

  return <AboutPageTemplate data={data} />;
}
