import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, FormLabel, Textarea } from '@chakra-ui/react';
import { DisplayParticipantsMain } from './DisplayParticipantsMain';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useUserToken, useUserTokenUpdate } from '../../../../UserJWT';
import {
  useProjectsData,
  useProjectsDataUpdate,
} from '../../../../ProjectsData';

export const DisplayDescription = ({ project }) => {
  const userToken = useUserToken();
  const userTokenUpdate = useUserTokenUpdate();
  const history = useHistory();
  const projectsData = useProjectsData();
  const setProjectsData = useProjectsDataUpdate();

  const [value, setValue] = useState(project.description);

  const submitDescription = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/projects/${project.id}`,
        {
          description: value,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );

      if (response && response.data) {
        const _projectData = projectsData.map(_project => {
          if (_project.id === project.id) {
            _project.description = value;
          }
          return _project;
        });

        setProjectsData(_projectData);
      }
    } catch (error) {
      if (error.response.data === 'jwt expired') {
        userTokenUpdate({ accessToken: '', email: '', userId: null });
        history.push('/');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Box pt="20px">
      <FormLabel htmlFor="desc">Description</FormLabel>
      <Textarea
        minH="200px"
        value={value}
        _focus={{}}
        onChange={e =>
          userToken.userId < 10 &&
          userToken.userId > 0 &&
          setValue(e.target.value)
        }
      />
      {userToken.userId < 10 && userToken.userId > 0 && (
        <Flex justifyContent="flex-end">
          <Button colorScheme="green" onClick={submitDescription}>
            Submit
          </Button>
        </Flex>
      )}
    </Box>
  );
};
