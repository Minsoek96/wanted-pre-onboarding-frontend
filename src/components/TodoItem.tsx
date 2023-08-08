import React, { useContext, useState } from 'react';
import { TodoDispatchContext } from '../pages/Todo';
import styled from 'styled-components';

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

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
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      {isEditing ? (
        <input
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          data-testid="new-todo-input"
        ></input>
      ) : (
        <h5>{todo}</h5>
      )}
      <button
        onClick={handleChangeTodo}
        data-testid={isEditing ? 'submit-button' : 'modify-button'}
      >
        {isEditing ? '제출하기' : '수정하기'}
      </button>
      <button onClick={handleDeleteTodo} data-testid="delete-button">
        삭제하기
      </button>
    </li>
  );
};

export default TodoItem;
