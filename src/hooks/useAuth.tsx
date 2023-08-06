import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getTodosAPI } from '../api/todo';

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getTodosAPI()
      .then((res) => {
        if (res.status === 200) {
          navigate('/todo', { replace: true });
        }
      })
      .catch((error) => navigate('/signin', { replace: true }));
  }, []);
  return;
};

export default useAuth;
