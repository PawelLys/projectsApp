import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useUserToken } from '../../../UserJWT';
import { DisplayOpenProjectMain } from './OpenProjectHelpers/DisplayOpenProjectMain';
import { DisplayStatusUserAccess } from './OpenProjectHelpers/DisplayStatusUserAccess';
import { DisplayStatusAdminAccess } from './OpenProjectHelpers/DisplayStatusAdminAccess';
import { DisplayParticipantsUser } from './OpenProjectHelpers//DisplayParticipantsUser';
import { DisplayParticipantsAdmin } from './OpenProjectHelpers//DisplayParticipantsAdmin';
import { DisplayDescription } from './OpenProjectHelpers/DisplayDescription';

export const DisplayOpenProject = ({ project, isOpen, onClose }) => {
  const userToken = useUserToken();
  const adminPrivilages = userToken.userId < 10 && userToken.userId > 0;

  return (
    <DisplayOpenProjectMain
      id={project?.id}
      createdAt={project?.createdAt}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Stack spacing="24px">
        {adminPrivilages ? (
          <DisplayStatusAdminAccess
            accessToken={userToken.accessToken}
            projectId={project?.id}
            prio={project?.prio}
            status={project?.status}
          />
        ) : (
          <DisplayStatusUserAccess
            prio={project?.prio}
            status={project?.status}
          />
        )}

        {adminPrivilages ? (
          <DisplayParticipantsAdmin
            accessToken={userToken.accessToken}
            projectId={project?.id}
            assignedUsers={project?.assignedUsers}
          />
        ) : (
          <DisplayParticipantsUser assignedUsers={project?.assignedUsers} />
        )}

        <DisplayDescription project={project} />
      </Stack>
    </DisplayOpenProjectMain>
  );
};
