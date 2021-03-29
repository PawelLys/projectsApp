import React, { useEffect, useState } from 'react';
import { Flex, Box, Button, Select, Textarea } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useUserToken, useUserTokenUpdate } from '../UserJWT';

const returnTime = () => {
  const add0 = value => (value < 10 ? '0' + value : value.toString());
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const datetime = add0(day) + '.' + add0(month) + '.' + year;

  return datetime;
};

export const NewProject = () => {
  const history = useHistory();
  const userToken = useUserToken();
  const userTokenUpdate = useUserTokenUpdate();

  const [prio, setPrio] = useState('1');
  const [status, setStatus] = useState('open');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!userToken.accessToken) {
      history.push('/');
    } else if (userToken.userId >= 10) {
      history.push('/panel');
    }
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/projects',
        {
          createdAt: returnTime(),
          prio,
          status,
          description,
          assignedUsersId: '',
        },
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );

      if (response && response.data) {
        history.push('/projects');
      }
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data === 'jwt expired') {
          userTokenUpdate({ accessToken: '', email: '', userId: null });
          history.push('/');
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <Layout variant="small">
      <Box fontSize="16px" marginBottom="8px" fontWeight="500">
        Project Status
      </Box>
      <Select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="open">active</option>
        <option value="close">closed</option>
      </Select>
      <Box mt={4}>
        <Box fontSize="16px" marginBottom="8px" fontWeight="500">
          Project Priority
        </Box>
        <Select value={prio} onChange={e => setPrio(e.target.value)}>
          <option value="1">low</option>
          <option value="2">medium</option>
          <option value="3">high</option>
        </Select>
      </Box>
      <Box mt={4}>
        <Box fontSize="16px" marginBottom="8px" fontWeight="500">
          Project Description
        </Box>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          textTransform="capitalize"
          colorScheme="teal"
          _focus={{ boxShadow: 'none' }}
          mt={4}
          onClick={onSubmit}
        >
          Create project
        </Button>
      </Flex>
    </Layout>
  );
};
