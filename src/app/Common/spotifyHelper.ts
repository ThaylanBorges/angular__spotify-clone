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
