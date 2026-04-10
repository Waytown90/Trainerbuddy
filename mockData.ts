import { ScheduleSlot } from './types';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coach {
  id: string;
  name: string;
  photo: string;
  sports: string[];
  specialization: string;
  experience: number;
  highestLevel: string;
  rateRange: string;
  sessionRate: number;
  availability: 'Online' | 'In-person' | 'Both';
  bio: string;
  isVerified: boolean;
  rating: number;
  reviews: Review[];
}

export const MOCK_COACHES: Coach[] = [
  {
    id: 'c1',
    name: 'Coach Alex',
    photo: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=400',
    sports: ['Running', 'Strength'],
    specialization: 'Marathon & Endurance',
    experience: 12,
    highestLevel: 'National Marathoners',
    rateRange: '₹2,000 - ₹5,000',
    sessionRate: 2500,
    availability: 'Both',
    bio: 'Specializing in long-distance running and functional strength for athletes.',
    isVerified: true,
    rating: 4.9,
    reviews: [
      { id: 'r1', userName: 'Rahul S.', rating: 5, comment: 'Incredible attention to detail. My marathon time improved by 15 mins!', date: '2024-03-15' },
      { id: 'r2', userName: 'Anjali K.', rating: 4, comment: 'Great coach, very motivating.', date: '2024-02-20' }
    ]
  },
  {
    id: 'c2',
    name: 'Coach Sarah',
    photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400',
    sports: ['Swimming', 'Yoga'],
    specialization: 'Technique & Mobility',
    experience: 8,
    highestLevel: 'State Level Swimmers',
    rateRange: '₹1,500 - ₹3,500',
    sessionRate: 1800,
    availability: 'In-person',
    bio: 'Focused on stroke refinement and injury prevention through yoga.',
    isVerified: true,
    rating: 4.8,
    reviews: [
      { id: 'r3', userName: 'Vikram M.', rating: 5, comment: 'The yoga sessions really helped with my shoulder mobility.', date: '2024-03-01' }
    ]
  },
  {
    id: 'c3',
    name: 'Coach Mike',
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    sports: ['Football', 'Strength'],
    specialization: 'Agility & Power',
    experience: 15,
    highestLevel: 'Pro League Players',
    rateRange: '₹3,000 - ₹7,000',
    sessionRate: 4500,
    availability: 'Both',
    bio: 'Former pro player helping athletes reach peak physical performance.',
    isVerified: true,
    rating: 5.0,
    reviews: [
      { id: 'r4', userName: 'Siddharth P.', rating: 5, comment: 'Best coach in the city for pro-level agility training.', date: '2024-03-10' }
    ]
  }
];
