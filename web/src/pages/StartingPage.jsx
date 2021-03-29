import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Flex, Box, Button } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useUserToken, useUserTokenUpdate, jwtDecode } from '../UserJWT';

export const StartingPage = () => {
  const history = useHistory();
  const userToken = useUserToken();
  const userTokenUpdate = useUserTokenUpdate();

  useEffect(() => {
    if (userToken.accessToken) {
      history.push('/panel');
    }
  }, []);

  return (
    <Formik
      initialValues={{ email: 'admin@test.com', password: 'admin' }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: values.email,
            password: values.password,
          });

          if (response.data && response.data.accessToken) {
            userTokenUpdate(jwtDecode(response.data.accessToken));
            history.push('/panel');
          }
        } catch (error) {
          if (error.response.data) {
            if (error.response.data === 'Cannot find user')
              setErrors({ email: error.response.data });
            else if (error.response.data === 'Incorrect password') {
              setErrors({ password: error.response.data });
            }
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Layout variant="small">
          <Form>
            <InputField name="email" placeholder="Email" label="Email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center">
              <Button
                type="submit"
                textTransform="capitalize"
                colorScheme="teal"
                _focus={{ boxShadow: 'none' }}
                mt={4}
                isLoading={isSubmitting}
              >
                login
              </Button>
            </Flex>
          </Form>
        </Layout>
      )}
    </Formik>
  );
};
