import React, { useState, useEffect } from 'react';
import { Box, UnorderedList, ListItem, Flex, Icon } from '@chakra-ui/react';
import { FiUser, FiPlus, FiMinus } from 'react-icons/fi';
import { cutStrings } from '../../../../utils/cutStrings';
import { DisplayParticipantsMain } from './DisplayParticipantsMain';
import useChangeProjectCall from './useChangeProjectCall';

import { useUsersData } from '../../../../UsersData';

export const DisplayParticipantsAdmin = props => {
  const { projectId, accessToken, assignedUsers: assigned } = props;

  const usersData = useUsersData();
  const [assignedUsers, setAssignedUsers] = useState(assigned);
  const [allowRemove, setAllowRemove] = useState(false);
  const [allowAdd, setAllowAdd] = useState(false);
  const [newUserAction, setNewUserAction] = useState({});
  const [availableUsers, setAvailableUsers] = useState(
    usersData
      .map(user =>
        !props.assignedUsers.find(assignedUser => assignedUser.id === user.id)
          ? user
          : null
      )
      .filter(user => user)
  );

  const onClickRemoveUser = _user => {
    setAvailableUsers([...availableUsers, _user]);
    setNewUserAction({ ..._user, todo: 'remove' });
    setAssignedUsers(assignedUsers.filter(user => user.id !== _user.id));
  };

  useChangeProjectCall(
    {
      assignedUsersId: assignedUsers.map(user => user.id).join(', '),
    },
    assignedUsers,
    projectId,
    accessToken,
    'assignedUsersId',
    newUserAction
  );

  return (
    <DisplayParticipantsMain
      assignedUsers={assignedUsers}
      allowRemove={allowRemove}
      removeFn={onClickRemoveUser}
    >
      <ListItem as={Flex} flexWrap="wrap-reverse">
        <Flex
          {...ItemStyleAdd(allowAdd)}
          p="5px"
          onClick={() => setAllowAdd(!allowAdd)}
        >
          <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
            <Flex
              alignItems="center"
              justifyContent="center"
              w="26px"
              h="26px"
              border={allowAdd ? '1px solid #fff' : '1px solid #6d6d6d'}
              color="#6d6d6d"
              borderRadius="50%"
              mr="8px"
            >
              <Icon as={FiPlus} color={allowAdd ? '#fff' : '#000'} />
            </Flex>
            <Box textAlign="center">Add new participants</Box>
          </Flex>
        </Flex>
        <Flex
          {...ItemStyleRemove(allowRemove)}
          p="5px 7px"
          onClick={() => setAllowRemove(!allowRemove)}
        >
          <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
            <Flex
              alignItems="center"
              justifyContent="center"
              w="26px"
              h="26px"
              border={allowRemove ? '1px solid #fff' : '1px solid #6d6d6d'}
              color="#6d6d6d"
              borderRadius="50%"
              mr="8px"
            >
              <Icon as={FiMinus} color={allowRemove ? '#fff' : '#000'} />
            </Flex>
            <Box textAlign="center">Remove participants</Box>
          </Flex>
        </Flex>
      </ListItem>

      <ListItem
        as={Flex}
        flexWrap="wrap"
        display={allowAdd ? 'inherit' : 'none'}
      >
        {availableUsers.length === 0 ? (
          <Box mt="5px" fontWeight="500">
            No available users.
          </Box>
        ) : (
          availableUsers.map(user => {
            return (
              <Box
                key={user.id}
                pb="5px"
                lineHeight="28px"
                fontWeight="500"
                minW={{ base: '0', sm: '195px' }}
                width="fit-content"
                cursor="pointer"
                borderRadius="10px"
                _hover={{
                  backgroundColor: '#f1f1f1',
                }}
                onClick={() => {
                  setNewUserAction({ ...user, todo: 'add' });
                  setAssignedUsers([...assignedUsers, user]);
                  setAvailableUsers(
                    availableUsers.filter(
                      availableUser => availableUser.id !== user.id
                    )
                  );
                }}
              >
                <Flex
                  mt="5px"
                  p="5px 3px 0"
                  justifyContent="center"
                  width="fit-content"
                >
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
                      border="1px solid #6d6d6d"
                      color="#6d6d6d"
                      borderRadius="50%"
                      mr="8px"
                    >
                      <Icon as={FiPlus} />
                    </Flex>
                    <Box textAlign="center">
                      {cutStrings(user.name, 30)} {cutStrings(user.surname, 30)}
                    </Box>
                  </Flex>
                </Flex>
                <Box
                  flex="0 1 100%"
                  ml={{ base: '0', sm: '37px' }}
                  fontWeight="400"
                  textAlign={{ base: 'center', sm: 'left' }}
                >
                  Contact: {user.email}
                </Box>
              </Box>
            );
          })
        )}
      </ListItem>
    </DisplayParticipantsMain>
  );
};

const ItemStyle = {
  transition: 'all .2s',
  userSelect: 'none',
  border: '1px solid #d1d1d1',
  borderRadius: '10px',
  mr: { base: '5px', sm: '15px' },
  mt: '5px',
  justifyContent: 'center',
  width: 'fit-content',
  cursor: 'pointer',

  _hover: {
    backgroundColor: '#fafafa',
  },
};

const ItemStyleRemove = allowRemove => {
  return {
    ...ItemStyle,
    backgroundColor: allowRemove ? '#ff2020' : '#fff',
    color: allowRemove ? '#fff' : '#000',
    border: allowRemove ? '1px solid #d60606' : '1px solid #d1d1d1',

    _hover: {
      backgroundColor: allowRemove ? '#cc0606' : '#fafafa',
    },
  };
};

const ItemStyleAdd = allowAdd => {
  return {
    ...ItemStyle,
    backgroundColor: allowAdd ? '#4CAF50' : '#fff',
    color: allowAdd ? '#fff' : '#000',
    border: allowAdd ? '1px solid #409242' : '1px solid #d1d1d1',

    _hover: {
      backgroundColor: allowAdd ? '#429945' : '#fafafa',
    },
  };
};
