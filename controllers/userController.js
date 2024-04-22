import model from '../mongo.js';
import { createHash } from 'crypto'

const {User} = model

const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const user = new User({ username, email, password:safePwd });
      await user.save();
      res.status(201).json(`User created : ${user}`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const user = await User.findByCredentials(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}; 

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export default {
  register, login, getAllUsers
};
// (getUser, updateUser, deleteUser)
