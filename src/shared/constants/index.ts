import { SelectOption } from '../types/ui';

export const MOBILE_WIDTH = 768;

export const TaskPriorities = [
  'low',
  'medium',
  'high',
  'urgent',
  'critical',
  'blocker',
  'optional',
] as const;

export const NoneOption: SelectOption = { value: null, label: 'None' };
