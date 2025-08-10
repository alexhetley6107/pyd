import { Task } from './board';

export type TaskDto = Omit<Task, 'id' | 'userId'> & Partial<Pick<Task, 'id'>>;

export type TaskQueries = {
  boardId?: string;
  statusId?: string;
  priority?: string;
};
