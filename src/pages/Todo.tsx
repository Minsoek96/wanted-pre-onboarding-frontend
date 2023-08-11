import React from 'react';
import useAuth from '../hooks/useAuth';
import TodoCreator from '../components/TodoCreator';
import TodoList from '../components/TodoList';
import styled from 'styled-components';
import { TodoProvider } from '../context/TodoContext';
import ErrorBoundary from '../components/ErrorBoundary';

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
    <ErrorBoundary>
      <TodoProvider>
        <TodoStyle>
          <TodoCreator />
          <TodoList />
        </TodoStyle>
      </TodoProvider>
    </ErrorBoundary>
  );
};

export default Todo;
