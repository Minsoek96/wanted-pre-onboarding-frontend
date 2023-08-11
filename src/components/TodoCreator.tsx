import React, { useContext, useState, useRef, useEffect } from 'react';
import { TodoDispatchContext } from '../context/TodoContext';
import styled from 'styled-components';
import SignButton from './ui/CustomButton';
import { Input } from '../styles/globalStyles';

const TodoCreatorStyle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`;

const TodoCreator = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [todo, setTodo] = useState<string>('');
  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = () => {
    if (todo.length > 0) {
      onCreate(todo);
      setTodo('');
    }
    todoRef.current?.focus();
  };

  return (
    <TodoCreatorStyle>
      <label htmlFor="new-todo-input"></label>
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={todoRef}
        data-testid="new-todo-input"
        placeholder="TODO값 입력"
      ></Input>
      <SignButton
        text="추가"
        id="new-todo-add-button"
        isValid={true}
        onClick={handleAddTodo}
      ></SignButton>
    </TodoCreatorStyle>
  );
};

export default TodoCreator;
