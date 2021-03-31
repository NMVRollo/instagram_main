import { Strategy as LocalStrategy } from 'passport-local';
import { server } from 'config';
import { User } from 'models';

export const localStrategy = new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!(user.password === password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export const serializeUser = (user, done) => {
  done(null, user.id);
};

export const deserializeUser = async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log(id, done, user);
    if (user) done(null, user);
  } catch (err) {
    done(err, null);
  }
};

export const checkAuth = (req, res, next) => {
  console.log(req.isAuthenticated());
  req.isAuthenticated()
    ? next()
    : res.status(401).send({ message: 'Unauthorized' });
};