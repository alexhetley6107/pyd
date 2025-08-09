import { Task } from './board';

export type TaskDto = Omit<Task, 'id' | 'userId'>;

export type TaskQueries = {
  boardId?: string;
  statusId?: string;
  priority?: string;
};
