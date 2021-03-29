import React, { useState } from 'react';
import { Box, Flex, Progress, Select } from '@chakra-ui/react';
import useChangeProjectCall from './useChangeProjectCall';

export const DisplayStatusAdminAccess = ({
  prio,
  status,
  accessToken,
  projectId,
}) => {
  const [statusSelected, setStatusSelected] = useState(status);
  const [prioSelected, setPrioSelected] = useState(prio);

  useChangeProjectCall(
    { status: statusSelected },
    statusSelected,
    projectId,
    accessToken,
    'status'
  );

  useChangeProjectCall(
    { prio: prioSelected },
    prioSelected,
    projectId,
    accessToken,
    'prio'
  );

  const displayPriorityHelper = () => {
    let value = 33;
    let color = 'green';
    if (prioSelected === '2') {
      value = 66;
      color = 'yellow';
    } else if (prioSelected === '3') {
      value = 100;
      color = 'red';
    }
    return (
      <Box>
        <Flex>
          Priority:
          <Select
            ml="5px"
            h="28px"
            value={prioSelected}
            onChange={e => setPrioSelected(e.target.value)}
          >
            <option value="1">low</option>
            <option value="2">medium</option>
            <option value="3">high</option>
          </Select>
        </Flex>

        <Progress
          border="1px solid #000"
          colorScheme={color}
          size="sm"
          value={value}
        />
      </Box>
    );
  };

  return (
    <Flex justifyContent="space-between" flexWrap="wrap">
      <Flex>
        Status:
        <Select
          ml="5px"
          h="28px"
          value={statusSelected}
          onChange={e => setStatusSelected(e.target.value)}
        >
          <option value="open">active</option>
          <option value="close">closed</option>
        </Select>
      </Flex>
      {displayPriorityHelper()}
    </Flex>
  );
};
