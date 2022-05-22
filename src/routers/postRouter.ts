import * as express from 'express';
import {artistModel} from '../models/artist';
import {playlistModel} from '../models/playlist';
import {songModel} from '../models/song';

/**
 * Router encargado de añadir un elementos que reciba en las peticiones
 */
// eslint-disable-next-line new-cap
export const postRouter = express.Router();

/**
 * Añade una canción a la base de datos
 */
postRouter.post('/song', async (req, res) => {
  // eslint-disable-next-line new-cap
  const song = new songModel(req.body);
  try {
    await song.save();
    res.status(201).send(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * Añade un artista a la base de datos
 */
postRouter.post('/artist', async (req, res) => {
  // eslint-disable-next-line new-cap
  const artist = new artistModel(req.body);
  try {
    await artist.save();
    res.status(201).send(artist);
  } catch (err) {
    res.status(400).send(err);
  }
});


/**
 * Añade una playlist a la base de datos
 */
postRouter.post('/playlist', async (req, res) => {
  // eslint-disable-next-line new-cap
  const playlist = new playlistModel(req.body);
  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (err) {
    res.status(400).send(err);
  }
});
