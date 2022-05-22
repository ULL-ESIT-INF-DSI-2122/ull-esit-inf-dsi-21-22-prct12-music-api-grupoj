import * as express from 'express';
import './data/mongoose';
import {defaultRouter} from './routers/defaultRouter';
import {deleteRouter} from './routers/deleteRouter';
import {getRouter} from './routers/getRouter';
import {patchRouter} from './routers/patchRouter';
import {postRouter} from './routers/postRouter';

const app = express();

app.use(express.json());

app.use(deleteRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(postRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
