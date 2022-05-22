import * as express from 'express';
import './data/mongoose';
import {defaultRouter} from './routers/defaultRouter';
import {deleteRouter} from './routers/deleteRouter';
import {getRouter} from './routers/getRouter';
import {patchRouter} from './routers/patchRouter';
import {postRouter} from './routers/postRouter';

/**
 * Servidor
 */
const app = express();

/**
 * Se encarga de parsear todo a ormato json
 */
app.use(express.json());

/**
 * Diferentes llamadas a los routers para ver sus puntos de acceso
 */
app.use(deleteRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(postRouter);
app.use(defaultRouter);

/**
 * Puerto donde escuchará el servidor
 */
const port = process.env.PORT || 3000;

/**
 * El servidor se queda pendiente de recibir peticiones
 */
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
