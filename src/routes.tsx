import { Navigate } from 'react-router-dom';

import * as Page from './pages';

import AppLayout from './layouts/app';

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
      { path: 'tic-tac-toe', element: <Page.TicTacToeGame /> },
      { path: 'chess', element: <Page.ChessGame /> },
      { path: 'jokenpo', element: <Page.JokenpoGame /> },
      { path: '*', element: <Navigate to="/games" /> }
    ]
  },
  {
    path: 'tools',
    element: <AppLayout dashboard />,
    children: [
      { path: '', element: <Page.FunctionalitiesHomePageContainer /> },
      { path: '*', element: <Navigate to="/tools" /> }
    ]
  },
  {
    path: 'tools/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Page.FunctionalitiesHomePageContainer /> },
      { path: 'get-random', element: <Page.GetRandomFunctionalityContainer /> },

      { path: 'to-do-list', element: <Page.ToDoListContainer /> },
      {
        path: 'to-do-list/config',
        element: <Page.ConfigToDoListContainer />
      },

      {
        path: 'calculate/calculator',
        element: <Page.CalculatorToolContainer />
      },
      { path: 'calculate/imc', element: <Page.CalculateIMCContainer /> },

      { path: 'convert/coin', element: <Page.CoinConverterContainer /> },
      {
        path: 'convert/size',
        element: <Page.LengthMeasurementUnitConverterContainer />
      },
      {
        path: 'convert/temperature',
        element: <Page.TemperatureConverterContainer />
      },
      { path: '*', element: <Navigate to="/tools" /> }
    ]
  }
];

export default routes;
