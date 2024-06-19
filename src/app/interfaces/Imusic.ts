export interface Imusic {
  id: string;
  title: string;
  time: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
}
