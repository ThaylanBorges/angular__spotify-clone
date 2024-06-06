import { Iartist } from '../interfaces/Iartist';
import { Imusic } from '../interfaces/Imusic';
import { Iplaylist } from '../interfaces/Iplaylist';

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

export function newMusics(): Imusic[] {
  return [
    {
      id: '',
      title: '',
      album: {
        id: '',
        imageUrl: '',
        name: '',
      },
      artists: [],
      time: '',
    },
  ];
}

export function newPlaylist(): Iplaylist[] {
  return [
    {
      id: '',
      name: '',
      imageUrl: '',
    },
  ];
}
