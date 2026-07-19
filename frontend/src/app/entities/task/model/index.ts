import { Nullable } from '@/shared/types';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: EPriority;
  date: Nullable<string>;
  boardId: Nullable<string>;
  userId: string;
  order: number;
};

export type TaskDto = Partial<Task>;

export type TaskQueries = {
  id?: string;
  search?: string;
  boardId?: Nullable<string>;
  status?: string;
  priority?: string;
};

export enum EStatus {
  TODO = 'todo',
  BLOCKED = 'blocked',
  PREPARING = 'preparing',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export const TaskStatuses = [
  EStatus.TODO,
  EStatus.BLOCKED,
  EStatus.PREPARING,
  EStatus.IN_PROGRESS,
  EStatus.DONE,
];

export enum EPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export const TaskPriorities = [EPriority.LOW, EPriority.MEDIUM, EPriority.HIGH, EPriority.URGENT];
