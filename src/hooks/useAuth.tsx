import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getTodosAPI } from '../api/todo';

const useAuth = () => {
  const navigate = useNavigate();
  const whiteList = ['/signin', '/signup'];
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getTodosAPI()
        .then((res) => {
          if (res.status === 200) {
            navigate('/todo', { replace: true });
          }
        })
        .catch((error) => navigate('/signin', { replace: true }));
    } else if (!whiteList.includes(location.pathname)) {
      navigate('/signin', { replace: true });
    }
  }, []);
  return;
};

export default useAuth;
