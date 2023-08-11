import React, { useState } from 'react';
import { signUpAPI } from '../api/auth';
import useValidation from '../hooks/useValidation';
import SignButton from '../components/ui/CustomButton';
import { useNavigate } from 'react-router';
import { Wrapper, Form, Input } from '../styles/globalStyles';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
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
    signUpAPI({ email: userEmail, password: userPassWord })
      .then((res) => {
        if (res.status === 201) {
          navigate('/signin', { replace: true });
        }
      })
      .catch((error) =>
      {
        if(error.response.data.message) {
          alert("해당 사용자는 이미 존재합니다.")
        }
      } 
      );
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
        <SignButton id="signup-button" text="회원가입신청" isValid={isValid} />
      </Form>
    </Wrapper>
  );
};

export default SignUp;
