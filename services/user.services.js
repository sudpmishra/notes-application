import base64 from 'react-native-base64';
import basePath from '../config.js';
const _userBasePath = `${basePath}/users/`;
const UserServices = (method, params) => {
  switch (method.toUpperCase()) {
    case 'USER_AUTHENTICATE':
      return _userAuthenticate(params);
    case 'NEW_USER':
      return _newUser(params);
    case 'CHECK_USER':
      return _checkIfUserExists(params);
  }
};

const _userAuthenticate = params => {
  const token = base64.encode(`${params.username}:${params.password}`);
  return fetch(`${_userBasePath}authenticate`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then(res => res.json());
};

const _newUser = params => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  return fetch(`${_userBasePath}add`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(params),
  }).then(res => res.json());
};

const _checkIfUserExists = params => {
  return fetch(`${_userBasePath}checkUser?userId=${params.userId}`, {
    method: 'GET',
  }).then(res => res.json());
};
export default UserServices;
