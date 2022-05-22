import * as express from 'express';
import {artistModel} from '../models/artist';
import {playlistModel} from '../models/playlist';
import {songModel} from '../models/song';

/**
 * Router encargado de modificar un elementos que reciba en las peticiones
 */
// eslint-disable-next-line new-cap
export const patchRouter = express.Router();

/**
 * Modifica una canción en la base de datos
 */
patchRouter.patch('/song', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const song = await songModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Modifica una canción por id en la base de datos
 */
patchRouter.patch('/song/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
          actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const song = await songModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Modifica un artista en la base de datos
 */
patchRouter.patch('/artist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const artist = await artistModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Modifica un artista por id en la base de datos
 */
patchRouter.patch('/artist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const artist = await artistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Modifica una playlist en la base de datos
 */
patchRouter.patch('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const playlist = await playlistModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Modifica una playlist por id en la base de datos
 */
patchRouter.patch('/playlist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
          actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const playlist = await playlistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});
