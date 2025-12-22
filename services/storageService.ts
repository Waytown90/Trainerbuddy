
import { TrainingRequest, RegisteredUser } from '../types';

const SUBMISSIONS_KEY = 'trainerbuddy_submissions';
const USERS_KEY = 'trainerbuddy_registered_users';

export const saveSubmission = (request: TrainingRequest) => {
  const existing = getSubmissions();
  const updated = [request, ...existing];
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
};

export const getSubmissions = (): TrainingRequest[] => {
  const data = localStorage.getItem(SUBMISSIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearSubmissions = () => {
  localStorage.removeItem(SUBMISSIONS_KEY);
};

export const registerUser = (user: RegisteredUser) => {
  const users = getRegisteredUsers();
  if (users.find(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error('User already exists');
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
};

export const getRegisteredUsers = (): RegisteredUser[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const findUser = (email: string): RegisteredUser | undefined => {
  return getRegisteredUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};
