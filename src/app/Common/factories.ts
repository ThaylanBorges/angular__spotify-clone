import { Iartist } from '../interfaces/Iartist';

export function newArtist(): Iartist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}
