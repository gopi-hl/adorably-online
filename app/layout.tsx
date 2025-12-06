import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Adorably.online - UI Design Prompts',
  description: 'A curated collection of 90 premium design effects. Preview live, copy the prompt, or generate the React code instantly.',
  keywords: ['UI design', 'React components', 'Tailwind CSS', 'design prompts', 'animations', 'interactions', 'dark mode'],
  openGraph: {
    title: 'Adorably.online - UI Design Prompts',
    description: 'A curated collection of 90 premium design effects. Preview live, copy the prompt, or generate the React code instantly.',
    type: 'website',
  },
  other: {
    'color-scheme': 'dark light',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
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
