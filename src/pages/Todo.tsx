import React, { useEffect, useReducer } from 'react';
import useAuth from '../hooks/useAuth';
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from '../api/todo';
import { UpdateTodo } from '../api/todo';
import TodoCreator from '../components/TodoCreator';

interface TodoList {
  id?: number;
  todo?: string;
  isCompleted?: boolean;
  userId?: number;
}

interface TodoDispatch {
  onCreate: (todo: string) => void;
  onEdit: (targetId: number, updataData: UpdateTodo) => void;
  onDelete: (targetId: number) => void;
}

type Action =
  | { type: 'INIT'; data: TodoList[] }
  | { type: 'CREATE'; data: TodoList }
  | { type: 'DELETE'; id: number }
  | { type: 'EDIT'; data: TodoList };

const reducer = (state: TodoList[], action: Action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'DELETE': {
      newState = state.filter((it) => it.id !== action.id);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it,
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const TodoStateContext = React.createContext<TodoList[]>([]);
export const TodoDispatchContext = React.createContext<TodoDispatch>({
  onCreate: () => {},
  onEdit: () => {},
  onDelete: () => {},
});

const Todo = () => {
  useAuth();
  useEffect(() => {
    console.log('t');
    getTodosAPI()
      .then((res) => dispatch({ type: 'INIT', data: res.data }))
      .catch((error) => console.log(error));
  }, []);

  const onCreate = (todo: string) => {
    createTodoAPI(todo).then((res) => console.log(res.data));
  };

  const onDelete = (targetId: number) => {
    deleteTodoAPI(targetId).then((res) => console.log(res.data));
  };

  const onEdit = (targetId: number, updataData: UpdateTodo) => {
    updateTodoAPI(targetId, updataData).then((res) => console.log(res));
  };

  const [data, dispatch] = useReducer(reducer, []);
  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onDelete }}>
        <div>
          <TodoCreator />
          {/* <TodoList /> */}
          {/* 컨테이너 */}
          {/* 아이템 */}
          {/* 체크박스 텍스트 수정 삭제 */}
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default Todo;
