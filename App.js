import React from 'react';
import {NativeRouter, Switch, Route} from 'react-router-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import SyncStorage from 'sync-storage';

import SignIn from './components/SignIn.component';
import Home, {HomeComponent} from './components/Home.component';
import CreateNote from './components/CreateNote.component';
import UserProfile from './components/UserProfile.component';
import EditNote from './components/EditNote.component';
import Register from './components/Register.component';
import ResetPassword from './components/ResetPassword.component';
import Colors from './assets/colors';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  async componentDidMount() {
    await SyncStorage.init();
    if (SyncStorage.get('authenticated') == true) {
      this.setState({
        isAuthenticated: true,
      });
    }
  }
  render() {
    return (
      <>
        <PaperProvider theme={theme}>
          <NativeRouter>
            <Switch>
              <Home exact path="/home" component={HomeComponent} />} />
              <Route
                exact
                path="/"
                render={props => (
                  <SignIn
                    {...props}
                    authenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route exact path="/createNote" component={CreateNote} />
              <Route exact path="/editNote" component={EditNote} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/passwordReset" component={ResetPassword} />
            </Switch>
          </NativeRouter>
        </PaperProvider>
      </>
    );
  }
}
const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
    background: Colors.background,
  },
};
export default App;
