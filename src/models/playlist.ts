import {Document, model, Schema} from 'mongoose';

export interface playlistInterface extends Document {
  name: string,
  genre: string[],
  songs: string[],
  lenght: string
}

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

export const playlistModel =
  model<playlistInterface>('playlist', playlistSchema);
