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

export type TaskDto = Partial<Task>;

export type TaskQueries = {
  id?: string;
  search?: string;
  boardId?: Nullable<string>;
  status?: string;
  priority?: string;
};

export const TaskPriorities = ['low', 'medium', 'high', 'urgent'] as const;

export const mediumPriority = 'medium';

export const TaskStatuses = ['todo', 'blocked', 'preparing', 'in-progress', 'done'] as const;
export const toDoStatus = 'todo';
