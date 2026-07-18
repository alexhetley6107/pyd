import { Task } from './task.model';

export const TASK_REPOSITORY = 'Task_repository';

export const tasksProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
