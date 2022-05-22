import * as express from 'express';

// eslint-disable-next-line new-cap
export const defaultRouter = express.Router();

defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
