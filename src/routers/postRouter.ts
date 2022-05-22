import * as express from 'express';
import {artistModel} from '../models/artist';
import {playlistModel} from '../models/playlist';
import {songModel} from '../models/song';

// eslint-disable-next-line new-cap
export const postRouter = express.Router();

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
