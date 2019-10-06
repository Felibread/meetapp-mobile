import React from 'react';
import { useSelector } from 'react-redux';

import createRoutes from './routes';
import NavigationService from './services/navigation';

export default function App() {
  function registerService(ref) {
    NavigationService.setTopLevelNavigator(ref);
  }

  const signed = useSelector(state => state.auth.signed);

  const Routes = createRoutes(signed);

  return <Routes ref={registerService} />;
}
