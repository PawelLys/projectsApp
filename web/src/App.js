import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { Router } from 'react-router-dom';
import history from '../../web/src/routing/history';
import { Routing } from '../../web/src/routing';
import UserJWT from './UserJWT';
import ProjectsData from './ProjectsData';
import UserData from './UsersData';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box boxSizing="border-box" overflowX="hidden">
        <UserJWT>
          <ProjectsData>
            <UserData>
              <Router history={history}>
                <Routing />
              </Router>
            </UserData>
          </ProjectsData>
        </UserJWT>
      </Box>
    </ChakraProvider>
  );
}

export default App;
