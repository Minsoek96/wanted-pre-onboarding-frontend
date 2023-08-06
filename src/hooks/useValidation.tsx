import React, { useEffect, useState } from 'react';

type ValidationProps = {
  email: string;
  password: string;
};

const useValidation = (userInfo: ValidationProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const checkValidate = () => {
      const specialCharRegex = /[@]/;
      if (!userInfo.email || !userInfo.password) {
        setIsValid(false);
        setErrorMsg('빈칸을 채워주세요');
      } else if (!specialCharRegex.test(userInfo.email)) {
        setIsValid(false);
        setErrorMsg('이메일에 @를 포함해주세요');
      } else if (userInfo.password.length < 8) {
        setIsValid(false);
        setErrorMsg('패스워드를 8자리 이상 설정해주세요.');
      } else {
        setIsValid(true);
        setErrorMsg('');
      }
    };
    checkValidate();
  }, [userInfo]);

  return { isValid, errorMsg };
};

export default useValidation;
