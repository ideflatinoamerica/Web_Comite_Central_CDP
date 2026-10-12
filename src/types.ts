export type TabType = 'inicio' | 'plan' | 'agenda' | 'cuentas' | 'participa';

export type UserRole = 'parent' | 'admin';

export type ProposalCategory = 'idea' | 'voluntariado' | 'escuela';

export interface Proposal {
  id: string;
  ticketNumber: string;
  category: ProposalCategory;
  categoryTitle: string;
  author: string;
  grade: string;
  discipline: string;
  description: string;
  createdAt: string;
  status: 'Recibido' | 'En revisión' | 'Aprobado';
}

export interface SponsorApplication {
  id: string;
  ticketNumber: string;
  orgName: string;
  modality: string;
  phone: string;
  notes: string;
  createdAt: string;
  status: 'Recibido' | 'En evaluación' | 'Convenio acordado';
}

export interface PlanAxis {
  id: string;
  code: string;
  category: 'gestion' | 'bienestar' | 'comunidad';
  categoryLabel: string;
  title: string;
  description: string;
  meta: string;
  indicator: string;
  initialLikes: number;
  phase: string;
  keywords: string;
}

export interface AgendaEvent {
  id: string;
  month: 'OCT' | 'NOV' | 'DIC' | 'ENE' | 'FEB' | 'MAR' | 'ABR' | 'MAY' | 'JUN';
  dayRange: string;
  category: 'DEPORTE' | 'APRENDIZAJE' | 'COMUNIDAD' | 'BIENESTAR';
  badgeType: string;
  timeOrPlace: string;
  title: string;
  description: string;
  responsible: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  fileName: string;
  date: string;
  summary: string;
}
