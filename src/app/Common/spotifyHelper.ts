import { Iuser } from '../interfaces/iuser';

export function SpotifyOfUser(user: SpotifyApi.CurrentUsersProfileResponse): Iuser {
  return {
    id: user.id,
    name: user.display_name!,
    imageUrl: user.images!.pop()!.url,
  };
}
