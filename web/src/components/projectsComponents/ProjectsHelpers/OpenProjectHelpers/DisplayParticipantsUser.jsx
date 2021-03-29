import React from 'react';
import { DisplayParticipantsMain } from './DisplayParticipantsMain';

export const DisplayParticipantsUser = ({ assignedUsers }) => {
  return <DisplayParticipantsMain assignedUsers={assignedUsers} />;
};
