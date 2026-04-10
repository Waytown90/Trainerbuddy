
export interface ScheduleSlot {
  day: string;
  time: string;
}

export interface TrainingRequest {
  id: string;
  userEmail: string;
  userPhone?: string;
  userGender?: string;
  trainerGenderPreference?: string;
  sports: string[];
  equipment: string[];
  schedule: ScheduleSlot[];
  perSessionBudget: number;
  sessionsPerMonth: number;
  dateOfBirth?: string;
  submittedAt: string;
}

export enum View {
  HOME = 'home',
  WIZARD = 'wizard',
  SUCCESS = 'success',
  ADMIN = 'admin-secret-dashboard',
  COACH_PROFILE = 'coach-profile',
  MESSAGES = 'messages',
  PRICING = 'pricing'
}

export enum WizardStep {
  SPORT = 'sport',
  TIMING_BUDGET = 'timing_budget',
  PREVIEW = 'preview'
}
