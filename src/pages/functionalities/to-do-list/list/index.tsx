import React from 'react';

import { LocalStorage } from 'core/infra';
import ToDoListPage from './render';

import ConfigToDoListContainer from '../config';

const ToDoListContainer: React.FC = () => {
  const localStorage = new LocalStorage();
  const toDoListConfigured = localStorage.get('ConfiguredToDoList');

  if (!toDoListConfigured) {
    return <ConfigToDoListContainer />;
  }

  return <ToDoListPage />;
};

export default ToDoListContainer;
