export interface IUser {
  id: string;
  username: string;
  fullname: string;
  email: string;
  todo: Todo[];
}

export interface Todo {
  id: string;
  title: string;
  date: Date;
  subject: string;
  status: boolean;
  todoId: string;
}
