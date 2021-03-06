import React from 'react';
import {NativeRouter, Switch, Route} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import SyncStorage from 'sync-storage';

import SignIn from './components/SignIn.component';
import Home, {HomeComponent} from './components/Home.component';
import CreateNote from './components/CreateNote.component';
import UserProfile from './components/UserProfile.component';

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
        <PaperProvider>
          <NativeRouter>
            <Switch>
              <Home exact path="/home" component={HomeComponent} />} />
              <Route
                exact path="/"
                render={props => (
                  <SignIn
                    {...props}
                    authenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route exact path="/createNote" component={CreateNote} />
              <Route exact path="/profile" component={UserProfile} />
            </Switch>
          </NativeRouter>
        </PaperProvider>
      </>
    );
  }
}

export default App;
