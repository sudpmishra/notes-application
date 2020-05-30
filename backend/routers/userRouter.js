const router = require('express').Router();
const nodemailer = require('nodemailer');
const RandExp = require('randexp');
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
          phone: foundUser.phone,
          country: foundUser.country,
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
  const phone = req.body.phone;
  const country = req.body.country;
  const newUserJson = {
    username: username,
    password: password,
    fullname: fullname,
    phone: phone,
    country: country,
    email: email,
  };
  const newUser = new User(newUserJson);
  User.findOne({email: email}).then(users => {
    if (users !== null) {
      return res.json('Email already exists');
    } else {
      newUser
        .save()
        .then(() =>
          res.json({
            message: 'User ' + newUser.username + ' Added!',
            status: 1,
          }),
        )
        .catch(err => res.status(400).json('ERROR: ' + err));
    }
  });
});

router.route('/resetPasswordRequest').put((req, res) => {
  const email = req.body.email;
  User.findOne({email: email}).then(async users => {
    if (users !== null) {
      const Token = encodeURIComponent(encode_ascii85(JSON.stringify(users)));
      const bodyText = `Hi ${
        users.fullname
      }, Open the link below in your browser to to reset your password for your Simple Notes account.`;
      const resetLink =
        'https://todo-server-sudeep.herokuapp.com/users/resetPassword?uuid=' +
        Token;
      const html = `<h1>Simple Notes</h1><p> ${bodyText}  </p> <p>${resetLink}</p> <p>If this was not you please discard the message</p>`;
      const [emailService, options] = _sendEmail(
        users.email,
        'Password Recovery',
        html,
      );
      emailService.sendMail(options, function(error, info) {
        if (error) {
          res.json(emailRes);
        } else {
          res.json({
            mailServerMessage: 'Email sent: ' + info.response,
            message: 'Password Recovery Email Sent.',
            status: 1,
          });
        }
      });
    } else {
      return res.json('Invalid Email');
    }
  });
});
router.route('/resetPassword').get((req, res) => {
  const userData = JSON.parse(decode_ascii85(req.query.uuid));
  User.findById({_id: userData._id}).then(users => {
    const newpassword = new RandExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    ).gen();
    users.password = newpassword;
    users.save().then(() => {
      const html = `<h1>Simple Notes</h1><p> Hi ${
        userData.fullname
      }, Your changed password has been changed.</p><p>Your new password is <b>${newpassword}</b></p>`;
      const [emailService, options] = _sendEmail(
        users.email,
        'Password Changed',
        html,
      );
      emailService.sendMail(options, function(error, info) {
        if (error) {
          res.json(emailRes);
        } else {
          res.json({
            mailServerMessage: 'Email sent: ' + info.response,
            message:
              'Password Changed! The new password has been mailed to you',
            status: 1,
          });
        }
      });
    });
  });
});

function _sendEmail(to, title, body) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
      user: 'smple.notes@gmail.com',
      pass: 'simple@Note1.1',
    },
  });

  var mailOptions = {
    from: 'smple.notes@gmail.com',
    to: to,
    subject: title,
    html: body,
  };
  return [transporter, mailOptions];
}
function encode_ascii85(a) {
  var b, c, d, e, f, g, h, i, j, k;
  for (
    !/[^\x00-\xFF]/.test(a),
      b = '\x00\x00\x00\x00'.slice(a.length % 4 || 4),
      a += b,
      c = [],
      d = 0,
      e = a.length;
    e > d;
    d += 4
  )
    (f =
      (a.charCodeAt(d) << 24) +
      (a.charCodeAt(d + 1) << 16) +
      (a.charCodeAt(d + 2) << 8) +
      a.charCodeAt(d + 3)),
      0 !== f
        ? ((k = f % 85),
          (f = (f - k) / 85),
          (j = f % 85),
          (f = (f - j) / 85),
          (i = f % 85),
          (f = (f - i) / 85),
          (h = f % 85),
          (f = (f - h) / 85),
          (g = f % 85),
          c.push(g + 33, h + 33, i + 33, j + 33, k + 33))
        : c.push(122);
  return (
    (function(a, b) {
      for (var c = b; c > 0; c--) a.pop();
    })(c, b.length),
    '<~' + String.fromCharCode.apply(String, c) + '~>'
  );
}

function decode_ascii85(a) {
  var c,
    d,
    e,
    f,
    g,
    h = String,
    l = 'length',
    w = 255,
    x = 'charCodeAt',
    y = 'slice',
    z = 'replace';
  for (
    '<~' === a[y](0, 2) && '~>' === a[y](-2),
      a = a[y](2, -2)
        [z](/\s/g, '')
        [z]('z', '!!!!!'),
      c = 'uuuuu'[y](a[l] % 5 || 5),
      a += c,
      e = [],
      f = 0,
      g = a[l];
    g > f;
    f += 5
  )
    (d =
      52200625 * (a[x](f) - 33) +
      614125 * (a[x](f + 1) - 33) +
      7225 * (a[x](f + 2) - 33) +
      85 * (a[x](f + 3) - 33) +
      (a[x](f + 4) - 33)),
      e.push(w & (d >> 24), w & (d >> 16), w & (d >> 8), w & d);
  return (
    (function(a, b) {
      for (var c = b; c > 0; c--) a.pop();
    })(e, c[l]),
    h.fromCharCode.apply(h, e)
  );
}

module.exports = router;
