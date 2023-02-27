import React from 'react';
import GetRandomTextFunctionality from './component';

type Props = {
  allInOne: boolean;
};

const GetRandomTextFunctionalityContainer: React.FC<Props> = ({ allInOne }) => {
  return <GetRandomTextFunctionality allInOne={allInOne} />;
};

export default GetRandomTextFunctionalityContainer;
