import React from 'react';

import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import { LocalStorage } from 'core/infra';
import WeeklyToDoList from './render';
import ConfigToDoListContainer from './config';

const WeeklyToDoListContainer: React.FC = () => {
  const localStorage = new LocalStorage();
  const toDoListConfigured = localStorage.get('ConfiguredToDoList');

  if (!toDoListConfigured) {
    return <ConfigToDoListContainer />;
  }

  return <WeeklyToDoList />;
};

export default WeeklyToDoListContainer;
