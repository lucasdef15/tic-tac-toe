import './styles/main.css';
import './styles/gameboard.css';
import router, { naviagteTo } from './routes/router';

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e: MouseEvent) => {
    const event = e.target as HTMLAnchorElement;
    if (event.matches('[data-link]')) {
      e.preventDefault();
      naviagteTo(event.href);
    }
  });
  router();
});
