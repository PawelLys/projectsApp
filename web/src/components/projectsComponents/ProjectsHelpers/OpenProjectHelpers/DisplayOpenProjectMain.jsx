import React from 'react';
import {
  Box,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Button,
  Stack,
  Drawer,
  Flex,
} from '@chakra-ui/react';

export const DisplayOpenProjectMain = ({
  isOpen,
  onClose,
  id,
  createdAt,
  children,
}) => {
  return (
    <Drawer isOpen={isOpen} size="lg" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton _focus={{}} />
          <DrawerHeader borderBottomWidth="1px" mr="25px">
            <Flex justifyContent="space-between" flexWrap="wrap">
              <Box>Project ID: {id}</Box>
              <Box fontSize="16px">Created: {createdAt}</Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">{children}</Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
