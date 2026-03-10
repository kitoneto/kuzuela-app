import { Home, BookOpen, MessageCircle, Trophy, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from './constants';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: ROUTES.DASHBOARD, icon: Home },
  { label: 'Courses', path: ROUTES.COURSES, icon: BookOpen },
  { label: 'Tutor', path: ROUTES.TUTOR, icon: MessageCircle },
  { label: 'Ranking', path: ROUTES.LEADERBOARD, icon: Trophy },
  { label: 'Profile', path: ROUTES.PROFILE, icon: User },
];
