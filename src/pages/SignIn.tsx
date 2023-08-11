import React, { useState } from 'react';
import { signInAPI } from '../api/auth';
import useValidation from '../hooks/useValidation';
import SignButton from '../components/ui/CustomButton';
import { useNavigate } from 'react-router';
import { Wrapper, Form, Input } from '../styles/globalStyles';
import useAuth from '../hooks/useAuth';

const SignIn = () => {
  useAuth();
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
    signInAPI({ email: userEmail, password: userPassWord })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access_token);
          navigate('/todo', { replace: true });
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert('해당 사용자 정보가 틀립니다.');
        }
      });
  };

  return (
    <Wrapper>
      {errorMsg && errorMsg}
      <Form onSubmit={handleSubmit}>
        <Input
          data-testid="email-input"
          type={'email'}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        ></Input>
        <Input
          data-testid="password-input"
          type={'password'}
          value={userPassWord}
          onChange={(e) => setUserPassWord(e.target.value)}
        ></Input>
        <SignButton
          id="signin-button"
          text="로그인"
          isValid={isValid}
        ></SignButton>
        <SignButton
          id="goSign-button"
          text="회원가입"
          isValid={true}
          onClick={() => navigate('/signup', { replace: true })}
        ></SignButton>
      </Form>
    </Wrapper>
  );
};

export default SignIn;
