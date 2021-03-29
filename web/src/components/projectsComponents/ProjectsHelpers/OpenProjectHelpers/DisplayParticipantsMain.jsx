import React from 'react';
import { Box, UnorderedList, ListItem, Flex, Icon } from '@chakra-ui/react';
import { FiUser, FiX } from 'react-icons/fi';
import { cutStrings } from '../../../../utils/cutStrings';

export const DisplayParticipantsMain = ({
  assignedUsers,
  allowRemove = false,
  removeFn = () => null,
  children,
}) => {
  return (
    <Box pl="10px">
      <Box fontWeight="500" fontSize="20px">
        Participants:
      </Box>
      <UnorderedList listStyleType="none" ml="0">
        {assignedUsers.map((user, index) => {
          return (
            <ListItem
              key={index}
              pb="5px"
              lineHeight="28px"
              fontWeight="500"
              borderRadius="10px"
              width="fit-content"
              cursor={allowRemove ? 'pointer' : 'default'}
              _hover={{
                backgroundColor: allowRemove ? '#ffbbbb' : '#fff',
                color: allowRemove ? '#b10000' : '#000',
              }}
              onClick={() => allowRemove && removeFn(user)}
            >
              <Flex mt="5px" p="5px 3px 0" justifyContent="center">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    w="26px"
                    h="26px"
                    border={
                      allowRemove ? '1px solid #e00000' : '1px solid #6d6d6d'
                    }
                    color={allowRemove ? '#e00000' : '#6d6d6d'}
                    borderRadius="50%"
                    mr="8px"
                  >
                    <Icon as={allowRemove ? FiX : FiUser} />
                  </Flex>
                  <Box textAlign="center">
                    {user?.name && cutStrings(user.name, 18)}{' '}
                    {(user?.surname && cutStrings(user.surname, 18)) || ''}
                  </Box>
                </Flex>
              </Flex>
              <Box flex="0 1 100%" ml="37px" fontWeight="400">
                Contact: {user?.email}
              </Box>
            </ListItem>
          );
        })}
        {children}
      </UnorderedList>
    </Box>
  );
};
