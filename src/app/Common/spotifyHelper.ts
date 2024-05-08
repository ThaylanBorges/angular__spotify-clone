import { Iartist } from '../interfaces/Iartist';
import { Iplaylist } from '../interfaces/Iplaylist';
import { Iuser } from '../interfaces/Iuser';

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

export function SpotifyOfArtist(artist: SpotifyApi.ArtistObjectFull): Iartist {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.sort((a, b) => a.width! - b.width!).pop()!.url,
  };
}
