import GameBoard from '../views/GameBoard';
import Dashboard from '../views/Dashboard';
import AbstractView from '../views/AbstractView';
import store from '../store/store';

interface RouteObj {
  path: string;
  view: new () => AbstractView;
}

interface MatchesObj {
  route: RouteObj;
  isMatch: boolean;
}

export const navigateTo = (url: string): void => {
  history.pushState(null, '', url);
  router(store.getState());
};

const router = async (state: any) => {
  const routes: RouteObj[] = [
    // { path: '/404', view: () => console.log('viewing 404 page') },
    { path: '/', view: Dashboard },
    { path: '/gameboard/cpu', view: GameBoard },
    { path: '/gameboard/player', view: GameBoard },
  ];

  // Test each route for potential match
  const potentialMatches: MatchesObj[] = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match: MatchesObj | undefined = potentialMatches.find(
    (potentialMatche) => potentialMatche.isMatch
  );

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  document.querySelector('#app')!.innerHTML = await view.getHTML(state);
};

export default router;
