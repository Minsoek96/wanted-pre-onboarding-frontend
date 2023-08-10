import React, { useContext, useState } from 'react';
import { TodoDispatchContext } from '../context/TodoContext';
import styled from 'styled-components';
import { v } from '../styles/variables';
import SignButton from './ui/CustomButton';

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

const TodoItemStyle = styled.li`
  width: ${v.width};
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  margin: 12px auto;
  &:hover {
    scale: 1.1;
  }
`;

const TodoView = styled.div`
  width: 300px;
  overflow: hidden;
`;

const Input = styled.input`
  height: 30px;
  width: 95%;
  border-radius: 12px;
`;

const TodoController = styled.div`
  display: flex;
  margin: 0 3px;
  button {
    height: 40px;
    padding: 5px;
    background-color: gray;
    text-align: center;
    &:hover {
      background-color: red;
    }
  }
`;

const TodoItem = ({ id, todo, isCompleted }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(isCompleted);
  const [contents, setContents] = useState<string>(todo);
  const { onEdit, onDelete } = useContext(TodoDispatchContext);

  // 수정요청
  const handleChangeTodo = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(id, { todo: contents, isCompleted: completed });
    }
  };

  const handleDeleteTodo = () => {
    onDelete(id);
  };

  return (
    <TodoItemStyle>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <TodoView>
        {isEditing ? (
          <Input
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            data-testid="new-todo-input"
          ></Input>
        ) : (
          <h5>{todo}</h5>
        )}
      </TodoView>
      <TodoController>
        <SignButton
          isValid={true}
          text={isEditing ? '제출' : '수정'}
          onClick={handleChangeTodo}
          id={isEditing ? 'submit-button' : 'modify-button'}
        ></SignButton>
        <SignButton
          isValid={true}
          text="삭제"
          onClick={handleDeleteTodo}
          id="delete-button"
        ></SignButton>
      </TodoController>
    </TodoItemStyle>
  );
};

export default React.memo(TodoItem);
