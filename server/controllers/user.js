import bcrypt from 'bcrypt';
import { User } from 'models';
import { user as userValidation } from 'validation';
import { server } from 'config';

export const add = async (req, res, next) => {
  try {
    await userValidation.validateAsync(req.body, { abortEarly: false });

    const findedUser = await User.find({ email: req.body.email });

    if (findedUser.length) {
      res
        .status(409)
        .send({ error: 'User with the same email already exists' });
      return;
    }

    req.body.password = await bcrypt.hash(req.body.password, server.salt);

    const user = new User(req.body);
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    if (error.isJoi) {
      console.error(error.message);
      res.status(400).send(error);
      return;
    }
    next(error);
  }
};