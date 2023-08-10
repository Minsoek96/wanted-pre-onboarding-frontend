import React, { useContext, useState, useRef } from 'react';
import { TodoDispatchContext } from '../pages/Todo';
import styled from 'styled-components';
import SignButton from './ui/CustomButton';
import { Input } from '../styles/globalStyles';

const TodoCreatorStyle = styled.div`
  display: flex;
  align-items: center;
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
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={todoRef}
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
