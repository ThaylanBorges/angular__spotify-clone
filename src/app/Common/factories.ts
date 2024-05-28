import { Iartist } from '../interfaces/Iartist';
import { Imusic } from '../interfaces/Imusic';

export function newArtist(): Iartist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}

export function newArtists(): Iartist[] {
  return [
    {
      id: '',
      name: '',
      imageUrl: '',
    },
  ];
}

export function newMusic(): Imusic {
  return {
    id: '',
    title: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    time: '',
  };
}
