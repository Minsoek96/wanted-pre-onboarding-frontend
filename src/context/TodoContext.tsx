import React, { useReducer, ReactNode, useEffect, useState } from 'react';
import { UpdateTodo } from '../api/todo';
import { reducer } from './TodoReducer';
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from '../api/todo';
import { error } from 'console';

interface TodoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoDispatch {
  onCreate: (todo: string) => void;
  onEdit: (targetId: number, updataData: UpdateTodo) => void;
  onDelete: (targetId: number) => void;
}

export const TodoStateContext = React.createContext<TodoType[]>([]);
export const TodoDispatchContext = React.createContext<TodoDispatch>({
  onCreate: () => {},
  onEdit: () => {},
  onDelete: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [data, dispatch] = useReducer(reducer, []);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getTodosAPI()
      .then((res) => dispatch({ type: 'INIT', data: res.data }))
      .catch((error) => {
        throw error;
      });
  }, []);

  const onCreate = (todo: string) => {
    createTodoAPI(todo)
      .then((res) => dispatch({ type: 'CREATE', data: res.data }))
      .catch((error) => {
        throw error;
      });
  };

  const onDelete = (targetId: number) => {
    deleteTodoAPI(targetId)
      .then((res) => dispatch({ type: 'DELETE', id: targetId }))
      .catch((error) => {
        throw error;
      });
  };

  const onEdit = (targetId: number, updataData: UpdateTodo) => {
    updateTodoAPI(targetId, updataData)
      .then((res) => dispatch({ type: 'EDIT', data: res.data }))
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    throw error;
  }

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onDelete }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
