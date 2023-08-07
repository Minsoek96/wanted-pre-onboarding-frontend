import React, { useEffect, useState, useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoStateContext } from '../pages/Todo';

const TodoList = () => {
  const todoList = useContext(TodoStateContext);
  console.log(todoList)
  return (
    <ul>
      {todoList.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default TodoList;
