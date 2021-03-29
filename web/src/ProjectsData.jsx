import React, { useState, createContext, useContext } from 'react';

const ProjectsDataContext = createContext({});
const ProjectsDataUpdateContext = createContext(() => {});

export const useProjectsData = () => useContext(ProjectsDataContext);

export const useProjectsDataUpdate = () =>
  useContext(ProjectsDataUpdateContext);

const ContextApp = ({ children }) => {
  const [projectsData, setProjectsData] = useState([
    {
      assignedUsers: [],
      createdAt: '',
      id: null,
      prio: '',
      status: '',
      description: '',
    },
  ]);

  return (
    <ProjectsDataContext.Provider value={projectsData}>
      <ProjectsDataUpdateContext.Provider value={setProjectsData}>
        {children}
      </ProjectsDataUpdateContext.Provider>
    </ProjectsDataContext.Provider>
  );
};

export default ContextApp;
