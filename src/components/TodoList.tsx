import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoStateContext } from '../pages/Todo';
import { styled } from 'styled-components';

const TodoListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
`;

const TodoList = () => {
  const todoList = useContext(TodoStateContext);
  console.log(todoList);
  return (
    <TodoListStyle>
      {todoList.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </TodoListStyle>
  );
};

export default TodoList;
