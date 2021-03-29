import React from 'react';
import { Box, Flex, Progress } from '@chakra-ui/react';
import { statusText } from '../DisplayProjectBox';

export const DisplayStatusUserAccess = props => {
  const { prio, status } = props;

  const displayPriorityHelper = () => {
    if (prio === '1')
      return (
        <Box>
          <Flex>
            Priority:
            <Box ml="5px" color="green.500" {...statusText}>
              low
            </Box>
          </Flex>

          <Progress
            border="1px solid #000"
            colorScheme="green"
            size="sm"
            value={33}
          />
        </Box>
      );
    else if (prio === '2')
      return (
        <Box>
          <Flex>
            Priority:
            <Box ml="5px" color="yellow.500" {...statusText}>
              medium
            </Box>
          </Flex>

          <Progress
            border="1px solid #a0a0a0"
            borderRadius="3px"
            colorScheme="yellow"
            size="sm"
            value={66}
          />
        </Box>
      );
    else if (prio === '3')
      return (
        <Box>
          <Flex>
            Priority:
            <Box ml="5px" color="red.500" {...statusText}>
              high
            </Box>
          </Flex>

          <Progress
            border="1px solid #000"
            colorScheme="red"
            size="sm"
            value={100}
          />
        </Box>
      );
  };

  return (
    <Flex justifyContent="space-between" flexWrap="wrap">
      <Flex>
        Status:
        {status === 'open' ? (
          <Box ml="5px" color="green.500" {...statusText}>
            active
          </Box>
        ) : (
          <Box ml="5px" color="red.500" {...statusText}>
            closed
          </Box>
        )}
      </Flex>
      {displayPriorityHelper()}
    </Flex>
  );
};
