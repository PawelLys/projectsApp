import React, { useEffect } from 'react';
import GetUserProjectData from '../components/projectsComponents/useGetUserProjectData';
import { Flex, Spinner } from '@chakra-ui/react';

import { Layout } from '../components/Layout';
import { ProjectBox } from '../components/projectsComponents/ProjectBox';

import { useProjectsDataUpdate } from '../ProjectsData';
import { useUsersDataUpdate } from '../UsersData';

export const Projects = () => {
  const setProjectData = useProjectsDataUpdate();
  const setUserData = useUsersDataUpdate();

  const { data, userToken } = GetUserProjectData();

  useEffect(() => {
    const adminPrivilages = userToken.userId > 0 && userToken.userId < 10;

    const projectsInfo = data.projects
      .map(project => {
        const userIdAsString = userToken.userId.toString();
        let assignedUsersId = [];
        if (project.assignedUsersId) {
          assignedUsersId = project.assignedUsersId.split(', ');
        }

        const checkIfUserIsAssigned = adminPrivilages
          ? true
          : !!assignedUsersId.find(userId => userId === userIdAsString);

        if (checkIfUserIsAssigned) {
          const assignedUsers = assignedUsersId
            .map(usersId => {
              const userObj = data.users.find(
                user => user.id === parseInt(usersId)
              );

              if (!userObj) return null;
              const { name, surname, email, id } = userObj;
              return { name, surname, email, id };
            })
            .filter(user => user);

          const { createdAt, id, prio, status, description } = project;

          return { assignedUsers, createdAt, id, prio, status, description };
        }
      })
      .filter(project => project)
      .sort((a, b) => a.id - b.id);
    if (projectsInfo.length > 0) {
      setProjectData(projectsInfo);
      const arrOfUsers = data.users.map(user => {
        const { email, name, surname, id } = user;
        return { email, name, surname, id };
      });
      setUserData(arrOfUsers);
    }
  }, [data]);

  if (data.users.length === 0) {
    return (
      <Layout>
        <Flex justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      </Layout>
    );
  }

  if (userToken?.userId) {
    return (
      <ProjectBox
        adminPrivilages={userToken.userId < 10 && userToken.userId > 0}
      />
    );
  }

  return null;
};
