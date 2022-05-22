import {Document, model, Schema} from 'mongoose';

/**
 * Representa los atributos de una playlist
 */
export interface playlistInterface extends Document {
  name: string,
  genre: string[],
  songs: string[],
  lenght: string
}

/**
 * Squema de una playlist para ser alamcenado en la base de datos
 */
const playlistSchema = new Schema<playlistInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  genre: {
    type: [String],
    required: true,
    trim: true,
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
  },
  length: {
    type: String,
    required: true,
    trim: true,
  },
});

/**
 * Declaración del modelo de datos de una playlist
 */
export const playlistModel =
  model<playlistInterface>('playlist', playlistSchema);
