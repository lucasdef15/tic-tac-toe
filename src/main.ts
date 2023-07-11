import './styles/main.css';
import './styles/gameboard.css';
import router, { naviagteTo } from './routes/router';
import Game from './logic/game';
import Data from './logic/data';

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  let circleTurn: boolean;

  document.body.addEventListener('change', (event) => {
    if (
      event.target instanceof Element &&
      event.target.matches('[data-input]')
    ) {
      let inputElement = event.target as HTMLInputElement;
      circleTurn = inputElement.checked;
      Data.isCircle = circleTurn;
      setTimeout(() => Game.instance.startGame(circleTurn), 100);
    }
  });
  document.body.addEventListener('click', (e: MouseEvent) => {
    const event = e.target as HTMLAnchorElement;
    if (event.matches('[data-link]')) {
      e.preventDefault();
      naviagteTo(event.href);
      setTimeout(() => Game.instance.startGame(circleTurn), 100);
    } else if (event.matches('[data-cell]')) {
      Game.instance.handleClick(e);
    } else if (event.matches('[data-restart]')) {
      Game.instance.startGame(true);
    }
  });
  router();
  if (location.pathname !== '/') {
    setTimeout(() => Game.instance.startGame(circleTurn), 100);
  } else {
    return;
  }
});