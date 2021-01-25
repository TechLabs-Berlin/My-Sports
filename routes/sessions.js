const express = require('express');
const User = require('../models/User');
const helper = require('../utils/helpers');
const passport = require('passport');

const sessionRouter = express.Router();

sessionRouter.post('', passport.authenticate('local'), async (req, res) => {
    try {
      const { username } = req.body
      const user = await User.findOne({ username });
      if (user) {
        // if (user.accountConfirmed) {
        const sessionUser = helper.sessionizeUser(user);
        req.session.user = sessionUser
        res.send(sessionUser);
        // } else {
        //   throw new Error('Please confirm email');
        // }
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (err) {
      res.status(401).send(err);
    }
});

sessionRouter.delete('', ({ session }, res) => {
    try {
      const user = session.user;
      if (user) {
        session.destroy(err => {
          if (err) throw (err);
          res.clearCookie('session');
          res.send(user);
        });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      res.status(422).send(err);
    }
});

sessionRouter.get('', ({ session: { user }}, res) => {
    res.send({ user });
});

module.exports = sessionRouter;