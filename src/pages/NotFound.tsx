import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../styles/globalStyles';

const Message = styled.h1`
  font-size: 3rem;
  color: #f02a2a;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Message>404 - Page Not Found</Message>
    </Wrapper>
  );
};

export default NotFound;
