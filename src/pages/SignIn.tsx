import React, { useState } from 'react';
import { signInAPI } from '../api/auth';
import useValidation from '../hooks/useValidation';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassWord, setUserPassWord] = useState<string>('');
  const { isValid, errorMsg } = useValidation({
    email: userEmail,
    password: userPassWord,
  });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    signInAPI({ email: userEmail, password: userPassWord }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('access_token', res.data.access_token);
        navigate('/todo', { replace: true });
      }
    });
    console.log(userEmail, userPassWord);
  };
  return (
    <div>
      {errorMsg && errorMsg}
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type={'email'}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        ></input>
        <input
          data-testid="password-input"
          type={'password'}
          value={userPassWord}
          onChange={(e) => setUserPassWord(e.target.value)}
        ></input>
        <SignButton
          id="signin-button"
          text="로그인"
          isValid={isValid}
        ></SignButton>
      </form>
    </div>
  );
};

export default SignIn;
