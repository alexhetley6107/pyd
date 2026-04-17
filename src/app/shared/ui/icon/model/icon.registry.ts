export const ICON_NAMES = [
  'agile',
  'backlog',
  'burger',
  'calendar',
  'chevron-left',
  'close',
  'dashboard',
  'delete',
  'error',
  'eye-off',
  'eye-on',
  'more',
  'notification',
  'success',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
