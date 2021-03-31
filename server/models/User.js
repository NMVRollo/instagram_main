import { Schema, model } from 'mongoose';

const User = new Schema({
  email: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  githubId: {
    type: String
  },
  googleId: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  createdOn: {
    type: Date,
    default: () => new Date(Date.now()).toUTCString(),
    required: true
  }
});

export default model('user', User);