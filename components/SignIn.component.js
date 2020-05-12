import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {TextInput, Snackbar} from 'react-native-paper';
import userServices from './../services/User.services';
import auth from '../auth';
import {Redirect} from 'react-router-native';

const SignIn = ({history, authenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const onLoginPressed = async e => {
    const requestParams = {
      username: username,
      password: password,
    };
    let userDetails = await userServices('USER_AUTHENTICATE', requestParams);
    if (userDetails.status === 1) {
      auth.login(() => {
        onSuccessfulSignIn(userDetails);
      });
      history.replace('/home');
    } else {
      setSnackbarVisibility(true);
      setTimeout(() => {
        setSnackbarVisibility(false);
      }, 2000);
    }
  };
  const onSuccessfulSignIn = details => {
    auth.setUserDetails(details);
  };
  const onForgotPasswordPressed = e => {
    /**TODO */
    alert('Forgot Password Pressed');
  };
  const onRegisterPressed = e => {
    /**TODO */
    alert('Register Pressed');
  };

  if (authenticated) {
    return <Redirect to="/home" />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={username}
            label="User-Id"
            onChangeText={email => setUsername(email)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={password}
            secureTextEntry={true}
            label="Password"
            onChangeText={password => setPassword(password)}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          underlayColor="#0066ff"
          onPress={e => {
            onLoginPressed(e);
          }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor="#ff1a1a"
          onPress={e => {
            onForgotPasswordPressed(e);
          }}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor="#ff9933"
          onPress={e => {
            onRegisterPressed(e);
          }}>
          <Text>Register</Text>
        </TouchableHighlight>
        <Snackbar
          visible={snackbarVisibility}
          onDismiss={e => {
            setSnackbarVisibility(false);
          }}
          action={{
            label: 'Close',
            onPress: () => {
              setSnackbarVisibility(false);
            },
          }}>
          Username or Password is incorrect!
        </Snackbar>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#006622',
  },
  loginText: {
    color: 'white',
  },
});
export default SignIn;
