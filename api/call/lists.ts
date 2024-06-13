import { AxiosResponse } from "axios";
import api from "..";
import { Todo } from "@/types/app";

export interface IListForm {
  title: string;
  subject: string;
  date: Date;
}

type TTListResponse = AxiosResponse<Todo[]>;

export const getLists = async (todoId: string): Promise<TTListResponse> => {
  return await api.get(`list/listUser/${todoId}`);
};

export const createList = async (body: { title: string; subject: string; date: Date | null; todoId?: string }) => {
  const formData = new FormData();

  if (body.todoId) {
    formData.append("todoId", body.todoId.toString());
  }

  formData.append("title", body.title);
  formData.append("subject", body.subject);

  if (body.date) {
    formData.append("date", body.date.toISOString());
  } else {
    formData.append("date", "");
  }

  return await api.post("list", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
