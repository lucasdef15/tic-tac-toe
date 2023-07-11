import AbstractView from './AbstractView';
import Data from '../logic/data';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Tic TacToe');
  }

  async getHTML(Data: Data): Promise<string> {
    console.log(Data);
    return `
    <main class="container">
        <img src="/assets/logo.svg" alt="logo" />
        <section class="player-box">
        <h1>pick player 1's mark</h1>
        <div class="toggle">
            <label class="switch">
            <input type="checkbox" data-input checked='${Data.isCircle}' />
            <span class="slider round">
                <img src="/assets/icon-x-grey.svg" alt="x" />
                <img src="/assets/icon-o-grey.svg" alt="o" />
            </span>
            </label>
        </div>
        <p>remember: x goes first</p>
        </section>
        <section class="button-box">
            <a href="/gameboard/cpu" class="btn yellow" data-link>new game (vs cpu)</a>
            <a href="/gameboard/player" class="btn blue" data-link>new game (vs player)</a>
        </section>
    </main>
      `;
  }
}
