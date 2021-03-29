import React, { useState } from 'react';
import { Box, Flex, Link, Icon } from '@chakra-ui/react';
import {
  HiOutlineUserGroup,
  HiChevronDown,
  HiClipboardList,
} from 'react-icons/hi';
import { Layout } from '../Layout';
import { Link as RouterLink } from 'react-router-dom';
import { StyledLink } from '../styledComponents/styledLink';

export const AdminPanel = () => {
  return (
    <Layout variant="small">
      <DisplayHelper
        title="Users"
        iconName={HiOutlineUserGroup}
        btnInfoArr={[
          { text: 'Manage users', href: '/users' },
          { text: 'Create new user', href: '/users?new' },
        ]}
      />
      <DisplayHelper
        title="Projects"
        iconName={HiClipboardList}
        btnInfoArr={[
          { text: 'Manage projects', href: '/projects' },
          { text: 'Create new project', href: '/new-project' },
          { text: 'Evaluate assigned users', href: '/projects?evaluation' },
        ]}
      />
    </Layout>
  );
};

const DisplayHelper = ({ title, iconName, btnInfoArr }) => {
  const [displayUserOptions, setDisplayUserOptions] = useState(false);

  return (
    <Box color="white" marginY="20px" _first={{ mt: '0' }}>
      <Box
        w="95%"
        mx="auto"
        mb="10px"
        border="1px solid #661717"
        bgColor="#9c2121"
        borderRadius="5px"
        cursor="pointer"
        _hover={{ bgColor: '#bd2b2b' }}
        onClick={() => setDisplayUserOptions(!displayUserOptions)}
      >
        <Flex p="6px 10px" alignItems="center">
          <Icon as={iconName} />
          <Box mx="6px" userSelect="none">
            {title}
          </Box>
          <Flex flex="1" justifyContent="flex-end">
            <Icon as={HiChevronDown} />
          </Flex>
        </Flex>
      </Box>
      {displayUserOptions &&
        btnInfoArr.map((btnInfo, index) => {
          return (
            <Flex
              alignItems="center"
              justifyContent="center"
              minH="60px"
              key={index}
            >
              <Link
                as={RouterLink}
                to={btnInfo.href}
                {...StyledLink}
                bgColor="#bb1b0f"
                _hover={{ backgroundColor: '#d42114' }}
                border="1px solid #800e06"
                userSelect="none"
              >
                {btnInfo.text}
              </Link>
            </Flex>
          );
        })}
    </Box>
  );
};

/*


<ProtectedLayout variant="small" privilages>
      {mainBtnOptions.map((value, index) => {
        return (
          <Box {...StyledWrapperBox} key={index}>
            <Box {...StyledBox} onClick={() => setBtnState({ type: ActionTypes.getOperators, payload: index })}>
              <Flex p="6px 10px" alignItems="center">
                <Icon as={value.icon} />
                <Box mx="6px" userSelect="none">
                  {value.groupTitle}
                </Box>
                <Flex flex="1" justifyContent="flex-end">
                  <Icon as={HiChevronDown} />
                </Flex>
              </Flex>
            </Box>
            {btnState[index] &&
              value.groupBtn.map((btn, index) => {
                return (
                  <Flex key={index} alignItems="center" justifyContent="center" minH="60px">
                    <NextLink href={btn.link}>
                      <Link {...StyledLink} userSelect="none">
                        {btn.title}
                      </Link>
                    </NextLink>
                  </Flex>
                );
              })}
          </Box>
        );
      })}
    </ProtectedLayout>


*/
