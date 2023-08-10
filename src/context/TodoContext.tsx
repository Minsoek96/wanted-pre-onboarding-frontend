import React, { useReducer, ReactNode, useEffect } from 'react';
import { UpdateTodo } from '../api/todo';
import { reducer } from './TodoReducer';
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from '../api/todo';

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

  useEffect(() => {
    getTodosAPI()
      .then((res) => dispatch({ type: 'INIT', data: res.data }))
      .catch((error) => console.log(error));
  }, []);

  const onCreate = (todo: string) => {
    createTodoAPI(todo).then((res) =>
      dispatch({ type: 'CREATE', data: res.data }),
    );
  };

  const onDelete = (targetId: number) => {
    deleteTodoAPI(targetId).then((res) =>
      dispatch({ type: 'DELETE', id: targetId }),
    );
  };

  const onEdit = (targetId: number, updataData: UpdateTodo) => {
    updateTodoAPI(targetId, updataData).then((res) =>
      dispatch({ type: 'EDIT', data: res.data }),
    );
  };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onDelete }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
