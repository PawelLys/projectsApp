import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserToken, useUserTokenUpdate } from '../../UserJWT';
import { useProjectsDataUpdate } from '../../ProjectsData';
import axios from 'axios';

const GetUserProjectData = () => {
  const [data, setData] = useState({ users: [], projects: [] });
  const history = useHistory();
  const userToken = useUserToken();
  const userTokenUpdate = useUserTokenUpdate();

  useEffect(async () => {
    if (!userToken?.accessToken) {
      history.push('/');
    } else {
      if (userToken.accessToken) {
        try {
          const projectResponse = await axios.get(
            'http://localhost:3000/projects',
            {
              headers: { Authorization: `Bearer ${userToken.accessToken}` },
            }
          );
          const userResponse = await axios.get('http://localhost:3000/users', {
            headers: { Authorization: `Bearer ${userToken.accessToken}` },
          });

          if (
            projectResponse.data &&
            userResponse.data &&
            userResponse.data.length > 0
          ) {
            setData({
              users: userResponse.data,
              projects: projectResponse.data,
            });
          }
        } catch (error) {
          if (error.response.data) {
            if (error.response.data === 'jwt expired') {
              userTokenUpdate({ accessToken: '', email: '', userId: null });
              history.push('/');
            } else {
              console.log(error);
            }
          }
        }
      }
    }
  }, []);

  return { data, userToken };
};

export default GetUserProjectData;
