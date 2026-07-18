import { Task } from '@/entities/task/model';

export function getNewOrder(prev: Task | undefined, next: Task | undefined): number {
  if (!prev && !next) return 1;

  if (!prev) return next!.order - 1;
  if (!next) return prev.order + 1;

  return (prev.order + next.order) / 2;
}
