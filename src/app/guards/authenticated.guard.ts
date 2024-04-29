import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const spotifyService = inject(SpotifyService);

  const token = localStorage.getItem('token');

  if (!token) {
    return unauthenticated();
  }
  
  return new Promise(async (res) => {
    const userCreated = await spotifyService.initializeUser();

    if (!!userCreated) {
      res(true);
    } else {
      res(unauthenticated());
    }
  });

  function unauthenticated() {
    localStorage.clear();
    router.navigate(['login']);
    return false;
  }
};
