import './styles/main.css';
import './styles/gameboard.css';
import router, { navigateTo } from './routes/router';
import Game from './logic/game';
import store from './store/store';

window.addEventListener('popstate', (e) => {
  const confirmationMsg = 'Are you sure you want to leave?';
  if (confirm(confirmationMsg)) {
    store.dispatch({ type: 'QUIT_GAME' });
    navigateTo(e as unknown as MouseEvent);
  } else {
    e.preventDefault();
    history.pushState(null, '', store.getState().location);
    router(store.getState());
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('change', (event) => {
    if (
      event.target instanceof Element &&
      event.target.matches('[data-input]')
    ) {
      handleChange();
    }
  });

  document.body.addEventListener('click', async (e: MouseEvent) => {
    const event = e.target as HTMLAnchorElement;
    if (event.matches('[data-link]')) {
      handleLinkClick(e);
    } else if (event.matches('[data-cell]')) {
      Game.instance.handleClick(e);
    } else if (event.matches('[data-restart]')) {
      Game.instance.startGame();
    } else if (event.matches('[data-quit]')) {
      store.dispatch({ type: 'QUIT_GAME' });
      navigateTo(e);
    }
  });

  initializeApp();
});

store.subscribe(() => {
  router(store.getState());
});

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = '';
  return 'Are you sure you want to leave?';
});

function handleLinkClick(event: MouseEvent) {
  store.dispatch({ type: 'SET_PLAYER' });
  if ((event.target as HTMLAnchorElement).hasAttribute('data-cpu')) {
    store.dispatch({ type: 'SET_CPU_OR_PLAYER', payload: 'cpu' });
  } else if ((event.target as HTMLAnchorElement).hasAttribute('data-player')) {
    store.dispatch({ type: 'SET_CPU_OR_PLAYER', payload: 'player' });
  }
  if (store.getState().cpu_or_player === 'cpu') {
    navigateTo(event);
    store.dispatch({ type: 'SET_LOCATION' });
    setTimeout(() => Game.instance.startGameCPU(), 100);
  } else {
    navigateTo(event);
    store.dispatch({ type: 'SET_LOCATION' });
    Game.instance.startGame();
  }
}

function initializeApp() {
  router(store.getState());
}

function handleChange() {
  store.dispatch({ type: 'CHECK_CIRCLE' });
  store.dispatch({ type: 'SET_PLAYER' });
}
