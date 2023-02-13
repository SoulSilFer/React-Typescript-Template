import React from 'react';
import { Navigate } from 'react-router-dom';

import * as Page from './pages';

import AppLayout from './layouts/app';
import AuthLayout from 'layouts/auth';

const routes = [
  {
    path: '',
    element: <AppLayout />,
    children: [
      { path: 'home', element: <Page.Home /> },
      { path: '*', element: <Navigate to="/" /> }
    ]
  },
  {
    path: 'components',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Page.ComponetPage /> },
      { path: '*', element: <Navigate to="/" /> }
    ]
  },
  {
    path: 'games',
    element: <AppLayout dashboard />,
    children: [
      { path: '', element: <Page.GamePageDashboard /> },
      { path: '*', element: <Navigate to="/" /> }
    ]
  },
  {
    path: 'games/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Page.GamePageDashboard /> },
      { path: 'TicTacToe', element: <Page.TicTacToeGame /> },
      { path: '*', element: <Navigate to="/games" /> }
    ]
  }
];

export default routes;
