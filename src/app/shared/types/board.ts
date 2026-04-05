export type Board = {
  id: string;
  name: string;
  userId: string;
  description: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  date: string | null;
  boardId: string | null;
  statusId: string;
  userId: string;
};
