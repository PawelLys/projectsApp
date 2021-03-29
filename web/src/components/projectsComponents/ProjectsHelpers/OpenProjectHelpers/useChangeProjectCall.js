import axios from 'axios';
import useSkipFirstRender from '../../../../utils/skipFirstRender';
import { useHistory } from 'react-router-dom';
import {
  useProjectsData,
  useProjectsDataUpdate,
} from '../../../../ProjectsData';
import { useUserTokenUpdate } from '../../../../UserJWT';
import { useUsersData } from '../../../../UsersData';

const useChangeProjectCall = (
  data,
  onDataChange,
  projectId,
  accessToken,
  dataChanged,
  newUserAction = {}
) => {
  const history = useHistory();
  const projectsData = useProjectsData();
  const setProjectsData = useProjectsDataUpdate();
  const userTokenUpdate = useUserTokenUpdate();
  const userData = useUsersData();

  useSkipFirstRender(() => {
    async function fetchData() {
      try {
        const response = await axios.patch(
          `http://localhost:3000/projects/${projectId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data) {
          const index = projectsData.findIndex(
            project => project.id === projectId
          );
          let projects = projectsData;

          if (dataChanged === 'assignedUsersId') {
            const { todo } = newUserAction;
            if (todo === 'add') {
              projects[index].assignedUsers = [
                ...projects[index].assignedUsers,
                newUserAction,
              ];
            } else if (todo === 'remove') {
              projects[index].assignedUsers = projects[
                index
              ].assignedUsers.filter(user => user.id !== newUserAction.id);
            }
          } else {
            projects[index][dataChanged] = response.data[dataChanged];
          }

          setProjectsData(projects);
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
    }
    fetchData();
  }, [onDataChange]);
};

export default useChangeProjectCall;
