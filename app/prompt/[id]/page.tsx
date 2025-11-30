import { DESIGN_PROMPTS } from '@/constants';
import { notFound } from 'next/navigation';
import PromptDetailClient from './PromptDetailClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all prompts (SSG)
export async function generateStaticParams() {
  return DESIGN_PROMPTS.map((prompt) => ({
    id: String(prompt.id),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const prompt = DESIGN_PROMPTS.find(p => p.id === Number(id));

  if (!prompt) {
    return {
      title: 'Prompt Not Found - Adorably.online',
    };
  }

  return {
    title: `${prompt.title} - Adorably.online`,
    description: prompt.description,
    openGraph: {
      title: `${prompt.title} - Adorably.online`,
      description: prompt.description,
      type: 'article',
    },
  };
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params;
  const prompt = DESIGN_PROMPTS.find(p => p.id === Number(id));

  if (!prompt) {
    notFound();
  }

  // Server-side: Pass the prompt data to the client component
  return <PromptDetailClient prompt={prompt} />;
}
