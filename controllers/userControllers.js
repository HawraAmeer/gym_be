const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { User } = require("../db/models");

exports.fetchUser = async (userId, next) => {
  try {
    return await User.findByPk(userId);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      type: newUser.type,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await req.userUpdate.update(req.body);
    if (req.body.class) updatedUser.addClass(req.body.class);
    res.status(201).json({ message: "User was updated" });
  } catch (error) {
    next(error);
  }
};
