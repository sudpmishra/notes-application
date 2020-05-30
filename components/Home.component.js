import React from 'react';
import {Route, Redirect} from 'react-router-native';
import auth from '../auth';

import FabButton from './FabButton.component';
import NotesList from './../components/NotesList.component';

const HomeComponent = ({history}) => {
  const onLogoutPressed = () => {
    auth.logout(() => {
      history.replace({pathname: '/', isAuthenticated: false});
    });
  };
  return (
    <>
      <NotesList />
      <FabButton onLogoutPressed={onLogoutPressed} />
    </>
  );
};
const Home = ({component: Component, ...rest}) => {
  const isAuthenticated = auth.isAuthenticated();
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          );
        }
      }}
    />
  );
};
export {HomeComponent};

export default Home;
