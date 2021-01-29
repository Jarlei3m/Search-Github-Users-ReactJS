import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Private route will wrap the dashboard
// need to have access to 'chidren' because the dashboard will be a child of 'PrivateRoute'
// '...rest' collect the rest of the props that are in my component, whatever they are
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated, user)
  const isUser = isAuthenticated && user;
  console.log(isUser)

  return (
    // spreading out the props on the Route {...rest}, placing in the Rout that i'm returning
    <Route 
      {...rest} 
      render={() => {
        return isUser ? children : <Redirect to="/login" />;
      }}>

    </Route>
  );
};
export default PrivateRoute;
