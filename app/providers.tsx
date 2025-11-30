'use client';

import React, { ReactNode } from 'react';
import { AppProvider } from '@/context/AppContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
