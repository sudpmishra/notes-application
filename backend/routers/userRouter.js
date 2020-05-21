const router = require('express').Router();
let User = require('../models/user.model');

router.route('/authenticate').post((req, res) => {
  const authenticationToken = Buffer.from(
    req.headers.authorization.split(' ')[1],
    'base64',
  );
  const decryptedAuthToken = authenticationToken.toString('ascii').split(':');
  const username = decryptedAuthToken[0];
  const password = decryptedAuthToken[1];
  User.find()
    .then(Users => {
      const foundUser = Users.find(user => {
        return user.username === username && user.password === password;
      });
      let jsonObj = {
        message: 'Username or Password is incorrect!',
        status: 0,
      };
      if (foundUser) {
        jsonObj = {
          message: 'User Authenticated Successfully!',
          username: foundUser.username,
          email: foundUser.email,
          fullname: foundUser.fullname,
          status: 1,
        };
      }
      return res.json(jsonObj);
    })
    .catch(err => res.status(400).json('ERROR: ' + err));
});
router.route('/').get((req, res) => {
  res.json('Todo user Get Page');
});

router.route('/checkUser').get((req, res) => {
  const userID = req.query.userId;
  User.findOne({username: userID})
    .then(users => {
      if (users !== null) return res.json(true);
      return res.json(false);
    })
    .catch(err => res.status(400).json('ERROR: ' + err));
});
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const newUserJson = {
    username: username,
    password: password,
    fullname: fullname,
    email: email,
  };
  const newUser = new User(newUserJson);
  User.findOne({email: email}).then(users => {
    if (users !== null) {
      return res.json('Email already exists');
    } else {
      newUser
        .save()
        .then(() => res.json('User ' + newUser.username + ' Added!'))
        .catch(err => res.status(400).json('ERROR: ' + err));
    }
  });
});
module.exports = router;
