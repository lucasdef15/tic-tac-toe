import AbstractView from './AbstractView';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Game Board');
  }

  async getHTML(data: { name: string; ties: number }): Promise<string> {
    return `
        <main class='container'>
                <div class="header">
                        <img src="/assets/logo.svg" alt="logo">
                        <span>
                            <img src="/assets/icon-x-grey.svg">
                            turn
                        </span>
                        <button class='restart'>
                                <img src="/assets/icon-restart.svg" alt="restart">
                        </button>
                </div>
                <div class="board">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                </div>
                <div class="footer">
                        <div class="counter blue bs-none">
                                <span>x (you)</span>
                                <span>0</span>
                        </div>
                        <div class="counter grey">
                                <span>ties</span>
                                <span>${data.ties}</span>
                        </div>
                        <div class="counter yellow bs-none">
                                <span>o (cpu)</span>
                                <span>0</span>
                        </div>
                </div>
        </main>
        <div class='message-wrapper'>
                <div class="message">
                    <p>you won!</p>
                    <div class="winner">
                        <img src="/assets/icon-x.svg" alt="x">
                        <h1>Takes the roud</h1>
                    </div>
                    <div class="button-wrapper">
                            <button class='grey'>quit</button>
                            <button class='yellow'>next roud</button>
                    </div>
                </div>
        </div>
      `;
  }
}
