import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      // o location pega o histórico das rotas, é bom passá-lo nos Redirects
      render={({ location }) => {

        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect 
            to={{ 
              pathname: isPrivate ? '/' : '/dashboard',
              // passando histórico
              state:{ from: location }
            }} 
          />
        );
      }}
    />
  );
};

export default Route;
