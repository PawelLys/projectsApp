import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Tooltip,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import {
  flexChildrenEvenlySplit,
  hideSM,
  hideMD,
  displayHelperMainBox,
} from './projectsStyle';
import { cutStrings } from '../../../utils/cutStrings';
import { DisplayOpenProject } from './DisplayOpenProject';

export const DisplayProjectBox = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayPriorityHelper = () => {
    if (project.prio === '1')
      return (
        <Flex alignItems="center">
          <Box flex="1">
            <Progress
              border="1px solid #000"
              colorScheme="green"
              size="sm"
              value={33}
            />
          </Box>
          <Box ml="3%" color="green.500" {...statusText}>
            low
          </Box>
        </Flex>
      );
    else if (project.prio === '2')
      return (
        <Flex alignItems="center" m="0 5%">
          <Box flex="1">
            <Progress
              border="1px solid #a0a0a0"
              borderRadius="3px"
              colorScheme="yellow"
              size="sm"
              value={66}
            />
          </Box>
          <Box ml="3%" color="yellow.500" {...statusText}>
            medium
          </Box>
        </Flex>
      );
    else if (project.prio === '3')
      return (
        <Flex alignItems="center">
          <Box flex="1">
            <Progress
              border="1px solid #000"
              colorScheme="red"
              size="sm"
              value={100}
            />
          </Box>
          <Box ml="3%" color="red.500" {...statusText}>
            high
          </Box>
        </Flex>
      );
  };

  return (
    <Box key={project.id}>
      <Flex
        direction="column"
        {...displayHelperMainBox}
        onClick={() => onOpen()}
      >
        <Flex justifyContent="space-evenly" alignItems="center" marginY="10px">
          <Box {...flexChildrenEvenlySplit} {...hideMD}>
            {project.createdAt}
          </Box>
          <Box {...flexChildrenEvenlySplit} flex="1">
            {project.id}
          </Box>
          <Box
            {...flexChildrenEvenlySplit}
            flex="3"
            flexWrap="wrap"
            {...hideSM}
          >
            {project.assignedUsers.map((participant, index) => {
              if (index === 2) {
                return (
                  <Box key={index}>
                    + {project.assignedUsers.length - 2} more participant
                  </Box>
                );
              }
              if (index > 2) return null;

              return (
                <Tooltip
                  label={`Contact: ${participant.email}`}
                  key={index}
                  fontSize="md"
                >
                  <Flex
                    border="1px solid #d1d1d1"
                    borderRadius="10px"
                    mb="5px"
                    p="5px 3px"
                    justifyContent="center"
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
                        mr="3px"
                      >
                        <Icon as={FiUser} />
                      </Flex>
                      <Box flex="1">
                        {cutStrings(participant?.name || '', 18)}{' '}
                        {cutStrings(participant?.surname || '', 18)}
                      </Box>
                    </Flex>
                  </Flex>
                </Tooltip>
              );
            })}
          </Box>
          <Box {...flexChildrenEvenlySplit} flex="3" flexWrap="wrap">
            <Box>
              {project.status === 'open' ? (
                <Box color="green.500" {...statusText}>
                  active
                </Box>
              ) : (
                <Box color="red.500" {...statusText}>
                  closed
                </Box>
              )}
            </Box>
            {displayPriorityHelper()}
          </Box>
        </Flex>
      </Flex>
      <DisplayOpenProject isOpen={isOpen} onClose={onClose} project={project} />
    </Box>
  );
};

export const statusText = {
  textTransform: 'uppercase',
  fontWeight: '500',
};
