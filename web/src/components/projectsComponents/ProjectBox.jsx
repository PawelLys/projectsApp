import React, { useState, useEffect } from 'react';
import { Button, Box, Flex, Icon, UnorderedList } from '@chakra-ui/react';
import { BsCardList } from 'react-icons/bs';
import { HiArrowLeft } from 'react-icons/hi';
import { Layout } from '../Layout';
import { useHistory } from 'react-router-dom';

import { DisplayProjectBox } from './ProjectsHelpers/DisplayProjectBox';
import {
  borderBox,
  dataEnterColumn,
  flexChildrenEvenlySplit,
  hideMD,
  hideSM,
} from './ProjectsHelpers/projectsStyle';
import { useProjectsData } from '../../ProjectsData';

export const ProjectBox = ({ adminPrivilages }) => {
  const history = useHistory();
  const projects = useProjectsData();

  return (
    <Layout>
      <Flex direction="column">
        <Box {...borderBox}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="80%"
            mx="auto"
          >
            <Flex flex="0 1 100px" flexWrap="wrap">
              {adminPrivilages && (
                <Button
                  colorScheme="green"
                  onClick={() => history.push('/new-project')}
                >
                  <Icon as={BsCardList} mr="5px" mt="2px" />
                  New project
                </Button>
              )}
            </Flex>
            <Button colorScheme="blue" onClick={() => history.push('/panel')}>
              <Icon as={HiArrowLeft} mr="4px" mt="2px" />
              Go back
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Flex
        justifyContent="center"
        textAlign="center"
        fontSize={{ base: '26px', md: '30px' }}
        fontWeight="500"
        p="20px 10px"
      >
        Your projects
      </Flex>

      {projects[0].id !== null ? (
        <Box>
          <Box>
            <UnorderedList listStyleType="none" margin="0">
              <>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <Box {...flexChildrenEvenlySplit} {...hideMD}>
                      Creation date
                    </Box>
                    <Flex
                      {...flexChildrenEvenlySplit}
                      flex="1"
                      justifyContent="center"
                    >
                      <Box mr="5px" display={{ base: 'none', md: 'initial' }}>
                        Project
                      </Box>
                      ID
                    </Flex>
                    <Box {...flexChildrenEvenlySplit} flex="3" {...hideSM}>
                      Participants
                    </Box>
                    <Box {...flexChildrenEvenlySplit} flex="3" flexWrap="wrap">
                      <Box>Status</Box>
                      <Box>Priority</Box>
                    </Box>
                  </Flex>
                </Flex>
                {projects.map(project => (
                  <DisplayProjectBox key={project.id} project={project} />
                ))}
              </>
            </UnorderedList>
          </Box>
        </Box>
      ) : (
        <Flex
          {...dataEnterColumn}
          background="#f5f3f3"
          justifyContent="center"
          textAlign="center"
        >
          You aren't assigned to any projects.
        </Flex>
      )}
    </Layout>
  );
};
