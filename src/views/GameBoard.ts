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
                                <img src="/assets/icon-restart.svg" alt="restart" data-restart>
                        </button>
                </div>
                <div class="board ${state.isCircle ? 'circle' : 'x'}">
                        ${cellElements}
                </div>
                <div class="footer">
                        <div class="counter blue bs-none">
                                <span>x (${
                                  state.cpu_or_player === 'cpu'
                                    ? state.player === 'x'
                                      ? 'you'
                                      : 'cpu'
                                    : state.player === 'x'
                                    ? 'p1'
                                    : 'p2'
                                })</span>
                                <span>${
                                  state.player === 'x' ? state.p1 : state.p2
                                }</span>
                        </div>
                        <div class="counter grey">
                                <span>ties</span>
                                <span>${state.ties}</span>
                        </div>
                        <div class="counter yellow bs-none">
                                <span>o (${
                                  state.cpu_or_player === 'cpu'
                                    ? state.player === 'circle'
                                      ? 'you'
                                      : 'cpu'
                                    : state.player === 'circle'
                                    ? 'p1'
                                    : 'p2'
                                })</span>
                                <span>${
                                  state.player === 'circle'
                                    ? state.p1
                                    : state.p2
                                }</span>
                        </div>
                </div>
        </main>
        <div class='message-wrapper' data-message>
                <div class="message">
                    ${
                      !state.isTie
                        ? `<p>${
                            state.player === state.current_winner
                              ? 'player 1 wins!'
                              : 'player 2 wins!'
                          }</p>`
                        : ''
                    }
                    <div class="winner">
                        ${
                          !state.isTie
                            ? `<img src="/assets/icon-${
                                state.current_winner === 'circle' ? 'o' : 'x'
                              }.svg" alt="x">`
                            : ''
                        }
                        <h1 style='color: ${
                          !state.isTie
                            ? state.current_winner === 'circle'
                              ? '#f2b137'
                              : '#31c3bd'
                            : '#a8bfc9'
                        }'>${state.isTie ? 'round tied' : 'Takes the roud'}</h1>
                    </div>
                    <div class="button-wrapper">
                            <a href='/' class='grey' data-quit>quit</a>
                            <button class='yellow' data-restart>next roud</button>
                    </div>
                </div>
        </div>
      `;
  }
}
