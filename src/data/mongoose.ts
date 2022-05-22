import {connect} from 'mongoose';

const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/grupojapp';

connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});
