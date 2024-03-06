export const environment = {
  production: false,
};

export const SpotifyConfig = {
  clientId: '47f41303db6c49119b1aa30fb6b42852',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',

  scopes: [
    'user-read-currently-playing', // musica tocando agora
    'user-read-recently-played', // ler musicas tocadas recentemente
    'user-read-playback-state', // ler estado do player do usuario
    'user-top-read', // top artistas e musicas do usuario
    'user-modify-playback-state', // alterar do player do usuario
    'user-library-read', // ler biblioteca do usuario
    'playlist-read-private', // ler playlist privadas
    'playlist-read-collaborative', // ler playlist colaborativas
  ],
};
