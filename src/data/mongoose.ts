import {connect} from 'mongoose';

/**
 * Varible que contiene la url base de datos de mongodb o una por defecto
 */
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/grupojapp';

/**
 * Conecta con la basse datos y devuelve el resultado de la conexión
 */
connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});
