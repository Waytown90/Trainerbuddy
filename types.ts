
export interface User {
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
  password?: string; // Added to carry password to the form
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export interface RegisteredUser {
  email: string;
  phone: string;
  dob: string;
  gender: string;
  password: string;
}

export interface TrainingRequest {
  id: string;
  userEmail: string;
  userPhone?: string;
  userGender?: string;
  userDob?: string;      // Added for full info reporting
  userPassword?: string; // Added for full info reporting
  trainerGenderPreference?: string; // New: preference for trainer
  sports: string[];
  equipment: string[];
  timeSlots: string[];
  days: string[];
  budget: number;
  submittedAt: string;
}

export enum View {
  HOME = 'home',
  AUTH = 'auth',
  FORM = 'form',
  SUCCESS = 'success',
  ADMIN = 'admin-secret-dashboard'
}
