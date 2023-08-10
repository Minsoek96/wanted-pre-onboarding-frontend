import React from 'react';
import useAuth from '../hooks/useAuth';
import TodoCreator from '../components/TodoCreator';
import TodoList from '../components/TodoList';
import styled from 'styled-components';
import { TodoProvider } from '../context/TodoContext';

const TodoStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Todo = () => {
  useAuth();

  return (
    <TodoProvider>
      <TodoStyle>
        <TodoCreator />
        <TodoList />
      </TodoStyle>
    </TodoProvider>
  );
};

export default Todo;
