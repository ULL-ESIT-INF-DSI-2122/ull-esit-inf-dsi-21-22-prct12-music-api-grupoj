import {Document, model, Schema} from 'mongoose';

export interface artistInterface extends Document {
  name: string,
  genres: string[],
  songs: string[],
  rep: number
}

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

export const artistModel = model<artistInterface>('artist', artistSchema);
