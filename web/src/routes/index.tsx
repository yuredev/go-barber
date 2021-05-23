import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import CustomRoute from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <CustomRoute path="/" exact component={SignIn} />
      <CustomRoute path="/signup" component={SignUp} />
      <CustomRoute path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}

export default Routes;
