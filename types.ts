
export interface DesignPrompt {
  id: number;
  title: string;
  description: string;
  category: 'Card' | 'Layout' | 'Animation' | 'Interaction' | 'Background' | 'Hero';
  useCases?: string[];
  implementationTips?: string[];
  accessibility?: string;
}

export interface GeneratedCodeResponse {
  code: string;
  explanation: string;
}

export interface User {
  name: string;
  email: string;
}