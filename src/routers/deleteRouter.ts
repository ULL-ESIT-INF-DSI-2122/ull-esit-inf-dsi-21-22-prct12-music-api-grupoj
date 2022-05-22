import * as express from 'express';
import {artistModel} from '../models/artist';
import {playlistModel} from '../models/playlist';
import {songModel} from '../models/song';

// eslint-disable-next-line new-cap
export const deleteRouter = express.Router();

deleteRouter.delete('/song', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const song =
        await songModel.findOneAndDelete({name: req.query.name.toString()});
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/song/:id', async (req, res) => {
  try {
    const song = await songModel.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/artist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const artist =
      await artistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/artist/:id', async (req, res) => {
  try {
    const artist = await artistModel.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const playlist =
        await playlistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/playlist/:id', async (req, res) => {
  try {
    const playlist = await playlistModel.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});
