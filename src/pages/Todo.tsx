import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import TodoList from '../components/TodoList';

const Todo = () => {
  useAuth();
  useEffect(() => {}, []);
  return (
    <div>
      여기는 TODO
      <input></input>
      <button />
      <TodoList/>
      {/* 컨테이너 */}
        {/* 아이템 */}
            {/* 체크박스 텍스트 수정 삭제 */}
    </div>
  );
};

export default Todo;
