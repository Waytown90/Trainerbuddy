import { TrainingRequest } from '../types';

const SUBMISSIONS_KEY = 'trainerbuddy_submissions';

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