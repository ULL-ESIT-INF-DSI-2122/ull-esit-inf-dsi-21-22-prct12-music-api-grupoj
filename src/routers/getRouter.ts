import * as express from 'express';
import {artistModel} from '../models/artist';
import {playlistModel} from '../models/playlist';
import {songModel} from '../models/song';

/**
 * Router encargado de buscar un elementos que reciba en las peticiones
 */
// eslint-disable-next-line new-cap
export const getRouter = express.Router();

/**
 * Busca una canción en la base de datos
 */
getRouter.get('/song', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const song = await songModel.find(filter);
    if (song.length !== 0) {
      return res.send(song);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Busca una canción por id en la base de datos
 */
getRouter.get('/song/:id', async (req, res) => {
  try {
    const song = await songModel.findById(req.params.id);
    if (!song) {
      return res.send(song);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Busca un artista en la base de datos
 */
getRouter.get('/artist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const artist = await artistModel.find(filter);
    if (artist.length !== 0) {
      return res.send(artist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Busca un artista por id en la base de datos
 */
getRouter.get('/artist/:id', async (req, res) => {
  try {
    const artist = await artistModel.findById(req.params.id);
    if (!artist) {
      return res.send(artist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Busca una playlist en la base de datos
 */
getRouter.get('/playlist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const playlist = await playlistModel.find(filter);
    if (playlist.length !== 0) {
      return res.send(playlist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Busca una playlist por id en la base de datos
 */
getRouter.get('/playlist/:id', async (req, res) => {
  try {
    const playlist = await playlistModel.findById(req.params.id);
    if (!playlist) {
      return res.send(playlist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
