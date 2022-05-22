import {Document, model, Schema} from 'mongoose';

export interface songInterface extends Document {
  name: string,
  genre: string[],
  lenght: string,
  artist: string,
  single: boolean,
  rep: number
}

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

export const songModel = model<songInterface>('song', songSchema);
