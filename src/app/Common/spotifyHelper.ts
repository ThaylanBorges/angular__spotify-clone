import { Iartist } from '../interfaces/Iartist';
import { Iplaylist } from '../interfaces/Iplaylist';
import { Iuser } from '../interfaces/Iuser';
import { Imusic } from '../interfaces/Imusic';
import { addMilliseconds, format } from 'date-fns';
import { newMusic, newPlaylist } from './factories';

export function SpotifyOfUser(
  user: SpotifyApi.CurrentUsersProfileResponse
): Iuser {
  return {
    id: user.id,
    name: user.display_name!,
    imageUrl: user.images!.pop()!.url,
  };
}

export function SpotifyOfPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): Iplaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop()!.url,
  };
}

export function SpotifySingleOfPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): Iplaylist {
  if (!playlist) {
    return newPlaylist();
  }

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift()!.url,
    musics: [],
  };
}

export function SpotifyOfArtist(artist: SpotifyApi.ArtistObjectFull): Iartist {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.sort((a, b) => a.width! - b.width!).pop()!.url,
  };
}

export function SpotifySingleOfArtist(
  artist: SpotifyApi.SingleArtistResponse
): Iartist {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.sort((a, b) => a.width! - b.width!).pop()!.url,
    musics: [],
  };
}

export function SpotifyOfMusics(musics: SpotifyApi.TrackObjectFull): Imusic {
  if (!musics) {
    return newMusic();
  }

  const msForM = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    id: musics.uri,
    uri: musics.id,
    title: musics.name,
    artists: musics.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    album: {
      id: musics.id,
      imageUrl: musics.album.images.shift()!.url,
      name: musics.album.name,
    },
    time: msForM(musics.duration_ms),
  };
}
