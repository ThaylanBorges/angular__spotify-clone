import { Imusic } from './Imusic';

export interface Iplaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: Imusic[];
}
