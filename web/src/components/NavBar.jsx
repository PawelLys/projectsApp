import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiUserGroup } from 'react-icons/hi';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useUserToken, useUserTokenUpdate } from '../UserJWT';
import { NavButton } from './navBarComponents/NavButton';

export const NavBar = () => {
  const history = useHistory();
  const userToken = useUserToken();
  const userTokenUpdate = useUserTokenUpdate();

  const logout = () => {
    userTokenUpdate({ accessToken: '', email: '', userId: null });
    history.push('/');
  };

  let body = null;

  if (userToken?.accessToken) {
    const BtnMenu1 =
      userToken.userId < 10 && userToken.userId > 0
        ? [
            { href: '/users', name: 'Manage users' },
            { href: '/projects', name: 'Manage projects' },
            { href: '/evaluation', name: 'Manage evaluation' },
          ]
        : [
            { href: '/change-password', name: 'Change password' },
            { href: '/projects', name: 'Your projects' },
            { href: '/evaluation', name: 'Your evaluation' },
          ];

    body = (
      <Flex>
        <NavButton
          btnStyle={userToken.userId < 10 ? 'admin' : undefined}
          content={
            <>
              <Box display={{ base: 'none', sm: 'initial' }}>My account </Box>
              <Box ml="4px">({userToken.email})</Box>
            </>
          }
          menuContent={BtnMenu1}
          logoutFnc={logout}
        />
      </Flex>
    );
  }

  return (
    <Box
      bg={
        userToken.userId === null
          ? '#454545'
          : userToken.userId >= 10
          ? '#095968'
          : '#610303'
      }
      color={userToken.userId === null ? '#cfcfcf' : '#d8d8d8'}
      px={6}
      py={userToken?.accessToken ? 0 : '2px'}
    >
      <Flex alignItems="center" maxW="1360px" mx="auto">
        <Link
          as={RouterLink}
          to={userToken.accessToken ? '/panel' : '/'}
          _focus={{}}
          _hover={{ color: '#fafafa', textDecoration: 'none' }}
        >
          <Box
            fontWeight="500"
            padding=".5rem 0"
            fontSize={{ base: '16px', sm: '22px' }}
            userSelect="none"
          >
            APP <Icon as={HiUserGroup} w={{ base: 4, sm: 6 }} mt={-2} />
          </Box>
        </Link>
        <Box ml="auto" mr=".5rem">
          {body}
        </Box>
      </Flex>
    </Box>
  );
};
