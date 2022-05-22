import {Document, model, Schema} from 'mongoose';

/**
 * Representa los atributos de un artista
 */
export interface artistInterface extends Document {
  name: string,
  genres: string[],
  songs: string[],
  rep: number
}

/**
 * Squema de un artista para ser alamcenado en la base de datos
 */
const artistSchema = new Schema<artistInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
  },
  rep: {
    type: Number,
    required: true,
    trim: true,
  },
});

/**
 * Declaración del modelo de datos de un artista
 */
export const artistModel = model<artistInterface>('artist', artistSchema);
