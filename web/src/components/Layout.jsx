import React from 'react';
import { Wrapper } from './Wrapper';
import { NavBar } from './NavBar';

export const Layout = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
