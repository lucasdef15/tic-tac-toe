import './styles/main.css';
import './styles/gameboard.css';
import router, { navigateTo } from './routes/router';
import Game from './logic/game';
import store from './store/store';

window.addEventListener('popstate', () => router(store.getState()));

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('change', (event) => {
    if (
      event.target instanceof Element &&
      event.target.matches('[data-input]')
    ) {
      store.dispatch({ type: 'CHECK_CIRCLE' });
      store.dispatch({ type: 'SET_PLAYER' });
    }
  });
  document.body.addEventListener('click', (e: MouseEvent) => {
    const event = e.target as HTMLAnchorElement;
    if (event.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(event.href);
      setTimeout(() => Game.instance.startGame(), 100);
    } else if (event.matches('[data-cell]')) {
      Game.instance.handleClick(e);
    } else if (event.matches('[data-restart]')) {
      Game.instance.startGame();
    }
  });
  router(store.getState());

  if (location.pathname !== '/') {
    setTimeout(() => Game.instance.startGame(), 100);
  } else {
    return;
  }
});

store.subscribe(() => {
  const state = store.getState();
  router(state);
  console.log(state);

  // Update the input element based on the state
  const inputElement = document.querySelector(
    '[data-input]'
  ) as HTMLInputElement;
  if (inputElement) {
    inputElement.checked = state.isCircle;
  }
});