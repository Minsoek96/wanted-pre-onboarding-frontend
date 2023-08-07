import React, { useContext, useState } from 'react';
import { TodoDispatchContext } from '../pages/Todo';

const TodoCreator = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [todo, setTodo] = useState<string>('');
  const handleAddTodo = () => {
    onCreate(todo);
  };
  return (
    <>
      <input value={todo} onChange={(e) => setTodo(e.target.value)}></input>
      <button onClick={handleAddTodo}>추가</button>
    </>
  );
};

export default TodoCreator;
