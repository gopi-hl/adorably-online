import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Adorably.online - UI Design Prompts',
  description: 'A curated collection of 71 premium design effects. Preview live, copy the prompt, or generate the React code instantly.',
  keywords: ['UI design', 'React components', 'Tailwind CSS', 'design prompts', 'animations', 'interactions'],
  openGraph: {
    title: 'Adorably.online - UI Design Prompts',
    description: 'A curated collection of 71 premium design effects. Preview live, copy the prompt, or generate the React code instantly.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
