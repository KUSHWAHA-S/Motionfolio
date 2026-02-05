export interface DeveloperTwoColumnTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

export interface ProjectCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface SocialLinksProps {
  links: {
    facebook: string;
    linkedin: string;
    google: string;
    twitter: string;
  };
}

export interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export interface ProgressBarProps {
  skill: string;
  percentage: number;
  index: number;
}

export interface ExperienceCardProps {
  period?: string;
  title: string;
  company?: string;
  description?: string;
}

export interface ContactInfoProps {
  items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string;
  }>;
}

export interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  onFormDataChange: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
  onSubmit: () => void;
}
