import { Task } from './board';

export type TaskDto = Omit<Task, 'id' | 'userId'>;
