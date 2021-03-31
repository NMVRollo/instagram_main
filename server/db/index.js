
import mongoose from 'mongoose';
import { server } from 'config';

try {
  mongoose.connect(server.db.fullUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.Promise = Promise;
  mongoose.connection.on('open', () => {
    console.info('mongo connected');
  });
  mongoose.connection.on('error', error => {
    console.error('mongo error', error);
  });
} catch (error) {
  console.erro(error);
}

export const mongoConnection = mongoose.connection;