import React from 'react';
import styled from 'styled-components';

const SignButtonStyle = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
    color: #666666;
  }
`;

interface SignButtonProps {
  text: string;
  isValid: boolean;
  testid: string;
}

const SignButton = ({ text, isValid, testid }: SignButtonProps) => {
  return (
    <SignButtonStyle disabled={!isValid} data-testid={testid}>
      {text}
    </SignButtonStyle>
  );
};

export default SignButton;
