import React from 'react';
import { Box } from '@chakra-ui/react';

export const Wrapper = ({ children, variant = 'regular' }) => {
  return (
    <Box
      maxW={variant === 'regular' ? '1120px' : '420px'}
      w="100%"
      minH="60vh"
      mt={8}
      mx="auto"
      px="5px"
    >
      {children}
    </Box>
  );
};
