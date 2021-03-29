import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Flex, Icon, Box, Link } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
//import axios from 'axios';
import { useHistory, Link as RouterLink } from 'react-router-dom';

export const ChangePassword = () => {
  const history = useHistory();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ oldPassword: '', newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.oldPassword) {
            setErrors({ oldPassword: 'Fill your current password' });
          } else if (!values.newPassword) {
            setErrors({ newPassword: 'Fill your new password' });
          }
          if (values.oldPassword && values.newPassword) {
            // const response = await axios.patch(`http://localhost:3000/user/${userToken.userId}`, {
            //      password: values.password,
            // },
            // {
            // headers: {
            //   'Authorization': `Bearer ${token}`
            // });
            await new Promise(resolve => setTimeout(resolve, 500));

            history.push('/panel');
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <InputField
              name="oldPassword"
              placeholder="Enter your current password"
              label="Current password"
              type="password"
            />
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="Enter your new password"
                label="New password"
                type="password"
              />
            </Box>

            <Flex justifyContent="space-between">
              <Button
                mt={4}
                type="submit"
                textTransform="capitalize"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Change password
              </Button>
              <Box mt={3}>
                <Link as={RouterLink} to="/panel">
                  <Icon as={HiChevronLeft} mb={1} />
                  Go back
                </Link>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
