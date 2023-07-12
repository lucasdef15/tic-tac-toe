import AbstractView from './AbstractView';
import { State } from '../store/store';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Game Board');
  }

  async getHTML(state: State): Promise<string> {
    const turn = state.isCircle
      ? '<img src="/assets/icon-o-grey.svg">'
      : '<img src="/assets/icon-x-grey.svg">';

    const cellElements = state.boardPositions
      .map(
        (item: any, index: number) =>
          `<div class="cell ${item}" data-cell data-value='${index}'></div>`
      )
      .join('');
    return `
        <main class='container'>
                <div class="header">
                        <img src="/assets/logo.svg" alt="logo">
                        <span>
                            ${turn}
                            turn
                        </span>
                        <button class='restart' data-restart>
                                <img src="/assets/icon-restart.svg" alt="restart">
                        </button>
                </div>
                <div class="board ${state.isCircle ? 'circle' : 'x'}">
                        ${cellElements}
                </div>
                <div class="footer">
                        <div class="counter blue bs-none">
                                <span>x (you)</span>
                                <span>${state.you}</span>
                        </div>
                        <div class="counter grey">
                                <span>ties</span>
                                <span>${state.ties}</span>
                        </div>
                        <div class="counter yellow bs-none">
                                <span>o (cpu)</span>
                                <span>${state.cpu}</span>
                        </div>
                </div>
        </main>
        <div class='message-wrapper' data-message>
                <div class="message">
                    <p>${
                      state.player === state.current_winner
                        ? 'player 1 wins!'
                        : 'player 2 wins!'
                    }</p>
                    <div class="winner">
                        <img src="/assets/icon-${
                          state.current_winner === 'circle' ? 'o' : 'x'
                        }.svg" alt="x">
                        <h1 style='color: ${
                          state.current_winner === 'circle'
                            ? '#f2b137'
                            : '#31c3bd'
                        }'>Takes the roud</h1>
                    </div>
                    <div class="button-wrapper">
                            <button class='grey' data-restart>quit</button>
                            <button class='yellow'>next roud</button>
                    </div>
                </div>
        </div>
      `;
  }
}
