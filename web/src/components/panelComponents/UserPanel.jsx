import React from 'react';
import { Box, Flex, Link, Icon } from '@chakra-ui/react';
import { BsFileEarmark, BsCardList } from 'react-icons/bs';
import { Layout } from '../Layout';
import { Link as RouterLink } from 'react-router-dom';
import { StyledLink } from '../styledComponents/styledLink';

export const UserPanel = () => {
  return (
    <Layout>
      <Box color="white">
        <Flex flexWrap="wrap">
          <Box flex={{ base: '0 0 100%', md: '1' }}>
            <DisplayHelper
              title="Projects"
              iconName={BsCardList}
              btnText="Check your projects"
              btnHref="/projects"
            />
          </Box>
          <Box flex="1">
            <DisplayHelper
              title="Job evaluation"
              iconName={BsFileEarmark}
              btnText="Check your job evaluation"
              btnHref="/evaluation"
              btnColor="green"
            />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

const DisplayHelper = ({
  title,
  iconName,
  btnText,
  btnHref,
  btnColor = undefined,
}) => {
  const btnProps =
    btnColor === 'green'
      ? {
          bgColor: '#1a9916',
          _hover: { backgroundColor: '#0c6d09' },
          border: '1px solid #0c6d09',
        }
      : {};

  return (
    <Box mt="15px">
      <Box w="97.5%" mx="auto">
        <Flex
          p="6px"
          pl="16px"
          bgColor="#0b5f97"
          borderTopRadius="5px"
          alignItems="center"
        >
          <Icon as={iconName} />
          <Box
            ml="6px"
            fontSize={{ base: '15px', sm: '16px' }}
            textAlign="center"
          >
            {title}
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          minH="80px"
          border="2px solid #0b5f97"
          borderBottomRadius="5px"
        >
          <Link as={RouterLink} to={btnHref} {...StyledLink} {...btnProps}>
            {btnText}
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};
