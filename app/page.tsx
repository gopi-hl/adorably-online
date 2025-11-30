import { Suspense } from 'react';
import { DESIGN_PROMPTS } from '@/constants';
import HomePageClient from './HomePageClient';

// Loading fallback for Suspense
function HomeLoading() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse mx-auto mb-4"></div>
      <div className="h-6 w-48 bg-white/10 rounded animate-pulse mx-auto"></div>
    </div>
  );
}

export default function HomePage() {
  // Server-side: Pass all prompts to the client component
  // This ensures the data is available for SSR/SEO
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomePageClient prompts={DESIGN_PROMPTS} />
    </Suspense>
  );
}
