import { Nullable } from '@/shared/types';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  date: Nullable<string>;
  boardId: Nullable<string>;
  status: string;
  userId: string;
};

export type TaskDto = Omit<Task, 'id' | 'userId'> & Partial<Pick<Task, 'id'>>;

export type TaskQueries = {
  search?: string;
  boardId?: Nullable<string>;
  status?: string;
  priority?: string;
};

export const TaskPriorities = [
  'low',
  'medium',
  'high',
  'urgent',
  'critical',
  'blocker',
  'optional',
] as const;

export const mediumStatus = 'medium';

export const TaskStatuses = ['todo', 'in-progress', 'done'] as const;
