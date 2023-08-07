import React, { useContext, useState } from 'react';
import { TodoDispatchContext } from '../pages/Todo';

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

const TodoItem = ({ id, todo, isCompleted }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo);
  const { onEdit, onDelete } = useContext(TodoDispatchContext);

  // 수정요청
  const handleChangeTodo = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(id, { todo: 'dsadfsafsafasfsfsafsa', isCompleted: true });
    }
  };

  const handleDeleteTodo = () => {
    onDelete(id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => console.log('확인')}
      />
      <h5>{id}</h5>
      {isEditing ? <input></input> : <h5>{todo}</h5>}
      {todo}
      <button onClick={handleChangeTodo}>
        {isEditing ? '제출하기' : '수정하기'}
      </button>
      <button onClick={handleDeleteTodo}>삭제하기</button>
    </li>
  );
};

export default TodoItem;
