import React from 'react';

import GetRandomTextFunctionalityContainer from './text';
import GetRandomNumberFunctionalityContainer from './number';
import { useLocation } from 'react-router-dom';

type Location = {
  number?: boolean;
  string?: boolean;
  all?: boolean;
};

const GetRandomFunctionalityContainer: React.FC = () => {
  const location: Location = useLocation().state;

  if (location.number) {
    return <GetRandomNumberFunctionalityContainer />;
  }

  if (location.string) {
    return <GetRandomTextFunctionalityContainer allInOne={false} />;
  }

  if (location.all) {
    return (
      <>
        <GetRandomNumberFunctionalityContainer />
        <GetRandomTextFunctionalityContainer allInOne />
      </>
    );
  }

  return <>whaaat</>;
};

export default GetRandomFunctionalityContainer;
