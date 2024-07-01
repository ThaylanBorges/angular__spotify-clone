export interface Imusic {
  id: string;
  uri: string;
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
