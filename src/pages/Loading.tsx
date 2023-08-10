import React from 'react';
import { Wrapper } from '../styles/globalStyles';
import styled from 'styled-components';

const P = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12rem;
`;

const Loading = () => {
  return (
    <Wrapper>
      <P>Loading...</P>
    </Wrapper>
  );
};

export default Loading;
