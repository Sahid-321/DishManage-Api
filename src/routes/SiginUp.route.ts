const express = require('express');
const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/User.model');

const SignUpRouter = express.Router();

SignUpRouter.post('/', async (req:any, res:any) => {
  try {
    const { email, password, role } = req.body;
    const present = await UserModel.findOne({ email: email });
    if (present) {
      res.status(403).send({ msg: 'User already exists' });
    } else {
      bcrypt.hash(password, 6, async function (err:any, hash:any) {
        if (err) {
          console.log(err);
          res.sendStatus(500).send({ msg: 'Something went wrong' });
        } else {
          const data = new UserModel({ email: email, password: hash, role: role });
          await data.save();
          res.status(201).send({ msg: 'Account created successfully' });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send({ msg: 'Something went wrong' });
  }
});

module.exports = {
  SignUpRouter,
};
