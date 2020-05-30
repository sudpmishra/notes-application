import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, BackHandler, Picker} from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import {useHistory} from 'react-router-native';
import UserServices from '../services/User.services';
import Colors from '../assets/colors';
import countryList from 'react-select-country-list';

const Register = () => {
  const history = useHistory();
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const list = countryList().getData();
  const [fullnameError, setFullnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [country, setCountry] = useState('');
  const [userIDError, setUserIDError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isCheckingUserName, setIsCheckingUserName] = useState(null);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, []);
  const _submitUser = () => {
    if (fullnameError || emailError || userIDError || passwordError) {
      alert('Please fix errors before submiting the form!');
    } else {
      const params = {
        username: userNameRef.current.state.value,
        password: passwordRef.current.state.value,
        email: emailRef.current.state.value,
        country: country,
        phone: phoneRef.current.state.value,
        fullname: fullnameRef.current.state.value,
      };
      UserServices('NEW_USER', params).then(res => {
        if (res.status === 1) {
          setSnackBarVisible(true);
          setTimeout(() => {
            setSnackBarVisible(false);
          }, 2000);
        }
      });
    }
  };
  let errorMessage =
    fullnameError === true
      ? 'Please provide both first and last name.'
      : emailError === true
      ? 'Please provide a valid email'
      : userIDError === true
      ? 'UserId is already taken! Please use another one.'
      : passwordError === true
      ? 'Passwords must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter. And both password must match!'
      : '';
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <Text style={styles.subText}>**All Feilds are Mandatory.</Text>
      <View style={styles.view}>
        <TextInput
          style={
            fullnameError
              ? [styles.inputStyle, styles.error]
              : styles.inputStyle
          }
          mode="outlined"
          label="Full Name"
          ref={fullnameRef}
          onSubmitEditing={e => {
            emailRef.current.focus();
          }}
          onBlur={() => {
            const name =
              fullnameRef.current.state.value === undefined
                ? ''
                : fullnameRef.current.state.value;
            console.log(fullnameRef.current.state.value);
            if (name.indexOf(' ') === -1) {
              setFullnameError(true);
            } else {
              setFullnameError(false);
            }
          }}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            fullnameError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={fullnameError === false ? Colors.primary : Colors.background}
        />
      </View>
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
            console.log(email);
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
      <View style={[styles.view, styles.dropDown]}>
        <Picker
          selectedValue={country}
          style={styles.inputStyle}
          onValueChange={(itemValue, itemIndex) => {
            setCountry(itemValue);
            phoneRef.current.focus();
          }}>
          {list.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label} value={item.label} />
            );
          })}
        </Picker>
      </View>
      <View style={styles.view}>
        <TextInput
          style={
            phoneError ? [styles.inputStyle, styles.error] : styles.inputStyle
          }
          mode="outlined"
          label="Phone"
          keyboardType="numeric"
          ref={phoneRef}
          onSubmitEditing={e => {
            userNameRef.current.focus();
          }}
          onBlur={() => {
            const regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            const phone =
              phoneRef.current.state.value === undefined
                ? ''
                : phoneRef.current.state.value;
            if (phone.match(regx)) {
              setPhoneError(false);
            } else {
              setPhoneError(true);
            }
          }}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            phoneError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={phoneError === false ? Colors.primary : Colors.background}
        />
      </View>
      <View style={styles.view}>
        <TextInput
          style={
            userIDError ? [styles.inputStyle, styles.error] : styles.inputStyle
          }
          mode="outlined"
          label="User Name"
          ref={userNameRef}
          onSubmitEditing={e => {
            passwordRef.current.focus();
          }}
          onBlur={() => {
            const userId = userNameRef.current.state.value;
            setIsCheckingUserName(true);
            UserServices('CHECK_USER', {userId: userId}).then(res => {
              setIsCheckingUserName(false);
              setUserIDError(res);
            });
          }}
        />
        <ActivityIndicator
          animating={isCheckingUserName}
          style={styles.activity}
        />
        <IconButton
          style={styles.iconButton}
          icon={
            userIDError === false
              ? 'check-circle-outline'
              : 'alpha-x-circle-outline'
          }
          color={userIDError === false ? Colors.primary : Colors.background}
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
        Signup
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => history.replace('/')}>
        Already Registered?
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
          User Created!
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
    marginTop: 50,
    alignItems: 'center',
  },
});

export default Register;
