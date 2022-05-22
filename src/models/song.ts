import {Document, model, Schema} from 'mongoose';

/**
 * Representa los atributos de una canción
 */
export interface songInterface extends Document {
  name: string,
  genre: string[],
  lenght: string,
  artist: string,
  single: boolean,
  rep: number
}

/**
 * Squema de una canción para ser alamcenado en la base de datos
 */
const songSchema = new Schema<songInterface>({
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
  length: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  single: {
    type: Boolean,
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
 * Declaración del modelo de datos de una canción
 */
export const songModel = model<songInterface>('song', songSchema);
