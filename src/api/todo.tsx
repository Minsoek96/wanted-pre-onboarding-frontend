import { API } from './client';
import { TODO_API } from './config';

export interface UpdateTodo {
  todo: string;
  isCompleted: boolean;
}

export const createTodoAPI = async (todo: string) => {
  return API.post(TODO_API, { todo });
};

export const getTodosAPI = async () => {
  return API.get(TODO_API);
};

export const updateTodoAPI = async (id: number, updateData: UpdateTodo) => {
  return API.put(`${TODO_API}/${id}`, updateData);
};

export const deleteTodoAPI = async (targetId: number) => {
  return API.delete(`${TODO_API}/${targetId}`);
};
