import { Imusic } from 'src/app/interfaces/Imusic';
import { Iartist } from '../interfaces/Iartist';
import { Iplaylist } from '../interfaces/Iplaylist';

export function newArtist(): Iartist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}

export function newArtists(): Iartist[] {
  return [
    {
      id: '',
      name: '',
      imageUrl: '',
      musics: [],
    },
  ];
}

export function newMusic(): Imusic {
  return {
    id: '',
    uri: '',
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
      uri: '',
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

export function newPlaylist(): Iplaylist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}
