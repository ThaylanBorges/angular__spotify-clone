import { Imusic } from './Imusic';

export interface Iartist {
  id: string;
  name: string;
  imageUrl: string;

  musics?: Imusic[];
}
