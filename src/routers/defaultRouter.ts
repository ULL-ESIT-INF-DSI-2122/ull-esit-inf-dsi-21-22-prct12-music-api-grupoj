import * as express from 'express';

/**
 * Router por defecto en cado de introducir una ruta no valida
 */
// eslint-disable-next-line new-cap
export const defaultRouter = express.Router();

/**
 * Estado devuelto por el router por defecto
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
