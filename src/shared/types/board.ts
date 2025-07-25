export type Board = {
  id: string;
  name: string;
  userId: string;
};

export type Status = {
  id: string;
  name: string;
  order: number;
  userId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  date: string;

  boardId: string;
  statusId: string;
  userId: string;
};
