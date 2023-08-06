import React, { useState } from 'react';
import { signUpAPI } from '../api/auth';
import useValidation from '../hooks/useValidation';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router';

const SignUp = () => {
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
      console.log(errorMsg);
      return;
    }
    signUpAPI({ email: userEmail, password: userPassWord })
      .then((res) => {
        if (res.status === 201) {
          navigate('/signin', { replace: true });
        }
      })
      .catch((error) => console.error(error));
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
          id="signup-button"
          text="회원가입신청"
          isValid={isValid}
        ></SignButton>
      </form>
    </div>
  );
};

export default SignUp;
