export const APP_NAME = 'ZenAI';
export const APP_TAGLINE = 'Premium AI Soundscapes';

export const SESSION_DURATIONS = [15, 30, 45, 60] as const;
export const DEFAULT_DURATION = 30;
export const MIN_DURATION = 5;
export const MAX_DURATION = 60;

export const MOODS = [
  'Happy',
  'Sleepy',
  'Motivated',
  'Energetic',
  'Peaceful',
  'Focused',
  'Calm',
  'Relaxing',
] as const;

export const ACTIVITY = [
  'Study',
  'Focus',
  'Relax',
  'Exercise',
  'Read',
  'Meditate',
  'Work',
  'Sleep',
] as const;

export const ENVIRONMENTS = [
  'Forest',
  'Desert',
  'Cafe',
  'Mountain',
  'Ocean',
  'Rain',
  'Beach',
] as const;

export const SESSION_RATINGS = ['Poor', 'Good', 'Excellent'] as const;

export const LOGO_SIZE = 80;
export const LOGO_ICON_SIZE = 36;
export const CIRCULAR_SLIDER_SIZE = 240;
export const CIRCULAR_SLIDER_STROKE = 10;

export type Mood = (typeof MOODS)[number];
export type Environment = (typeof ENVIRONMENTS)[number];
export type Activity = (typeof ACTIVITY)[number];
export type SessionRating = (typeof SESSION_RATINGS)[number];
