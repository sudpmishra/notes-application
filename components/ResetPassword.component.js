import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, BackHandler, Picker} from 'react-native';
import {TextInput, Button, IconButton, Snackbar} from 'react-native-paper';
import {useHistory} from 'react-router-native';
import UserServices from '../services/User.services';
import Colors from '../assets/colors';

const ResetPassword = () => {
  const history = useHistory();
  if (history.location.changePassword) {
    return <Change data={history.location.userid} />;
  }
  return <Reset />;
};
const Change = ({data}) => {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [passwordError, setPasswordError] = useState(null);
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const _submitUser = () => {
    if (passwordError) {
      alert('Please fix errors before submiting the form!');
    } else {
      const params = {
        password: passwordRef.current.state.value,
      };
      /**
       * TODO Call service
       */
      //   UserServices('NEW_USER', params).then(res => {
      //     if (res.status === 1) {
      //       setSnackBarVisible(true);
      //       setTimeout(() => {
      //         setSnackBarVisible(false);
      //       }, 2000);
      //     }
      //   });
    }
  };
  let errorMessage =
    passwordError === true
      ? 'Passwords must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter. And both password must match!'
      : '';
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change password for {data.username}</Text>
      <Text style={styles.subText}>**All Feilds are Mandatory.</Text>
      <View style={styles.view}>
        <TextInput
          style={
            passwordError
              ? [styles.inputStyle, styles.error]
              : styles.inputStyle
          }
          mode="outlined"
          placeholder="Password"
          maxLength={15}
          ref={passwordRef}
          secureTextEntry={true}
          onSubmitEditing={e => {
            confirmPasswordRef.current.focus();
          }}
          onBlur={() => {
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            const pass1 =
              passwordRef.current.state.value === undefined
                ? ''
                : passwordRef.current.state.value;
            const pass2 =
              confirmPasswordRef.current.state.value === undefined
                ? ''
                : confirmPasswordRef.current.state.value;
            if (pass1.match(passw)) {
              if (pass2 !== '') {
                if (pass1 == pass2) {
                  setPasswordError(false);
                } else {
                  setPasswordError(true);
                }
              }
            } else {
              setPasswordError(true);
            }
          }}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            passwordError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={passwordError === false ? Colors.primary : Colors.background}
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={
            passwordError
              ? [styles.inputStyle, styles.error]
              : styles.inputStyle
          }
          mode="outlined"
          placeholder="Confirm Password"
          maxLength={15}
          ref={confirmPasswordRef}
          secureTextEntry={true}
          onBlur={async () => {
            const pass1 =
              passwordRef.current.state.value === undefined
                ? ''
                : passwordRef.current.state.value;
            const pass2 =
              confirmPasswordRef.current.state.value === undefined
                ? ''
                : confirmPasswordRef.current.state.value;
            if (pass1 !== pass2) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
            }
          }}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            passwordError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={passwordError === false ? Colors.primary : Colors.background}
        />
      </View>
      <Text style={styles.subText}>{errorMessage}</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => _submitUser()}>
        Change Password
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => history.goBack()}>
        Cancel
      </Button>
      <View style={styles.snackabar}>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => {
            setSnackBarVisible(false);
          }}
          action={{
            label: 'Relogin?',
            onPress: () => {
              history.replace('/');
            },
          }}>
          Password Changed!
        </Snackbar>
      </View>
    </View>
  );
};
const Reset = () => {
  const history = useHistory();
  const emailRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const _submitUser = () => {
    if (emailError) {
      alert('Please fix errors before submiting the form!');
    } else {
      const params = {
        email: emailRef.current.state.value,
      };

      /**
       * TODO Call service
       */
      //   UserServices('NEW_USER', params).then(res => {
      //     if (res.status === 1) {
      //       setSnackBarVisible(true);
      //       setTimeout(() => {
      //         setSnackBarVisible(false);
      //       }, 2000);
      //     }
      //   });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset password</Text>
      <Text style={styles.subText}>
        **Please enter valid email registered with Simple Notes.
      </Text>
      <View style={styles.view}>
        <TextInput
          style={
            emailError ? [styles.inputStyle, styles.error] : styles.inputStyle
          }
          mode="outlined"
          label="Email"
          ref={emailRef}
          onBlur={() => {
            const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const email =
              emailRef.current.state.value === undefined
                ? ''
                : emailRef.current.state.value;
            if (regx.test(email)) {
              setEmailError(false);
            } else {
              setEmailError(true);
            }
          }}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            emailError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={emailError === false ? Colors.primary : Colors.background}
        />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => _submitUser()}>
        Reset Password
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => history.goBack()}>
        Cancel
      </Button>
      <View style={styles.snackabar}>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => {
            setSnackBarVisible(false);
          }}
          action={{
            label: 'Go to Login',
            onPress: () => {
              history.replace('/');
            },
          }}>
          If the provided email is valid you will recieve an email with a link
          to reset your password. Please make sure to check spam folder.
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: Colors.white,
  },
  header: {
    color: Colors.primary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: Colors.danger,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  view: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 2,
  },
  activity: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  dropDown: {
    borderRadius: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    borderWidth: 2,
    paddingBottom: 0,
  },
  button: {
    borderWidth: 2,
    justifyContent: 'center',
    alignContent: 'center',
    height: 45,
    borderRadius: 25,
    width: '100%',
    marginBottom: 15,
  },
  inputStyle: {
    width: '100%',
    height: 40,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: Colors.background,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  error: {
    backgroundColor: Colors.danger,
  },
  snackabar: {
    top: 180,
    alignItems: 'center',
  },
});
export default ResetPassword;
