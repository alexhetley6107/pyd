import { Task } from './board';

export type TaskDto = Omit<Task, 'id' | 'userId'> & Partial<Pick<Task, 'id'>>;

export type TaskQueries = {
  search?: string;
  boardId?: string | null;
  statusId?: string;
  priority?: string;
};
