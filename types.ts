
export interface DesignPrompt {
  id: number;
  title: string;
  description: string;
  /** Visual style category */
  category: 'Card' | 'Layout' | 'Animation' | 'Interaction' | 'Background' | 'Hero';
  /** Component usage type - where/how the component is used */
  componentType: 'Hero Section' | 'Navigation' | 'Content' | 'Form' | 'Feedback' | 'Data Display' | 'Marketing' | 'Utility';
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