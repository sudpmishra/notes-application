import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {TextInput, Snackbar} from 'react-native-paper';
import userServices from './../services/User.services';
import auth from '../auth';
import {Redirect} from 'react-router-native';
import Colors from '../assets/colors';

const SignIn = ({history, authenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const passwordInputRef = useRef(null);
  if (
    history.location.isAuthenticated != null &&
    history.location.isAuthenticated != undefined
  )
    authenticated = history.location.isAuthenticated;

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
    history.push('/passwordReset');
  };
  const onRegisterPressed = e => {
    history.push('/register');
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
            onSubmitEditing={() => {
              passwordInputRef.current.focus();
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={passwordInputRef}
            style={styles.inputs}
            value={password}
            secureTextEntry={true}
            label="Password"
            onChangeText={password => setPassword(password)}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          underlayColor={Colors.accent}
          onPress={e => {
            onLoginPressed(e);
          }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor={Colors.danger}
          onPress={e => {
            onForgotPasswordPressed(e);
          }}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor={Colors.secondary}
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
    backgroundColor: Colors.background,
  },
  inputContainer: {
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    flex: 1,
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
    backgroundColor: Colors.primary,
  },
  loginText: {
    color: Colors.black,
  },
});
export default SignIn;
