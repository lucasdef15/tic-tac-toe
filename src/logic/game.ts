import store from '../store/store';

type CircleOrX = 'circle' | 'x';

export default class Game {
  static instance: Game = new Game();

  private circleTurn: boolean = store.getState().isCircle;
  private X_CLASS: 'x' = 'x';
  private CIRCLE_CLASS: 'circle' = 'circle';
  private WINNING_COMBINATIONS: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  startGame() {
    const cellElements = document.querySelectorAll('[data-cell]');
    this.circleTurn = store.getState().isCircle;
    if (cellElements.length) {
      const message = document.querySelector(
        '[data-message]'
      ) as HTMLDivElement;
      message.classList.remove('show');
      cellElements.forEach((cell) => {
        cell.classList.remove(this.X_CLASS);
        cell.classList.remove(this.CIRCLE_CLASS);
      });
    }
    store.dispatch({ type: 'CLEAR_BOARD' });
    store.dispatch({ type: 'SET_TIE', payload: false });

    if (store.getState().cpu_or_player !== 'player') {
      const cpuMark =
        store.getState().player === 'circle' ? this.X_CLASS : this.CIRCLE_CLASS;
      if (cpuMark === store.getState().current_winner) {
        this.startGameCPU();
      }
    }
  }
  async startGameCPU() {
    const cpuMark: CircleOrX =
      store.getState().player === 'circle' ? this.X_CLASS : this.CIRCLE_CLASS;
    const firstToPLay = cpuMark === 'x' ? 'cpu' : 'player';

    if (firstToPLay === 'cpu') {
      await this.startCPU(cpuMark);
    } else if (firstToPLay === 'player') {
      if (store.getState().count !== 0) {
        await this.startCPU(cpuMark);
      }
    }
  }
  async startCPU(cpuMark: CircleOrX) {
    const cellElements = document.querySelectorAll('[data-cell]');
    const occupiedPositions = store
      .getState()
      .boardPositions.map((cell) => cell !== null);

    let randomNumber = this.getRandomNumber(0, 8);

    // Check if the randomly generated number is in the occupied positions array
    while (occupiedPositions[randomNumber]) {
      randomNumber = this.getRandomNumber(0, 8); // Generate a new random number
    }

    store.dispatch({
      type: 'ADD_BOARD_POSITION',
      payload: { index: randomNumber, mark: cpuMark },
    });

    const cell = [...cellElements][randomNumber];

    cell.addEventListener('click', () => {
      if (
        store
          .getState()
          .boardPositions.every(
            (cell) => cell === this.X_CLASS || cell === this.CIRCLE_CLASS
          )
      ) {
        this.endGame(true).then(() => this.showMessage());
        return;
      }
      return;
    });

    const clickEvent = new MouseEvent('click', {
      view: window,
    });

    setTimeout(() => {
      cell.dispatchEvent(clickEvent);
    }, 0);

    if (this.checkWIn(cpuMark)) {
      this.endGame(false)
        .then(() => this.incrementPLayers())
        .then(() => this.showMessage());
    }

    return new Promise((resolve) => setTimeout(resolve, 100));
  }
  checkCPUTie() {
    const filter = store
      .getState()
      .boardPositions.filter((board) => board === null);
    return filter;
  }
  getRandomNumber(min: number, max: number): number {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  }
  async handleClick(e: MouseEvent) {
    store.dispatch({ type: 'INCREMENT_COUNT' });

    const cell = e.target as HTMLElement;
    const index = cell.getAttribute('data-value') as unknown as number;

    const cpuMark: CircleOrX =
      store.getState().player === 'circle' ? this.X_CLASS : this.CIRCLE_CLASS;

    if (cell.classList.contains('x') || cell.classList.contains('circle'))
      return;

    let currentClass: CircleOrX = this.circleTurn
      ? this.CIRCLE_CLASS
      : this.X_CLASS;

    if (store.getState().cpu_or_player === 'cpu') {
      currentClass = store.getState().player === 'circle' ? 'circle' : 'x';
    }

    this.placeMark(currentClass, index);

    if (this.checkWIn(currentClass)) {
      this.endGame(false)
        .then(() => this.incrementPLayers())
        .then(() => this.showMessage());
    } else if (this.isDraw()) {
      console.log('hey i am other tie');
      this.endGame(true).then(() => this.showMessage());
    } else {
      if (store.getState().cpu_or_player === 'cpu') {
        await this.startCPU(cpuMark);
      } else {
        this.swapTurns();
      }
    }
  }
  async incrementPLayers() {
    const { player, current_winner } = store.getState();

    if (player === current_winner) {
      store.dispatch({ type: 'INCREMENT_P1' });
    } else {
      store.dispatch({ type: 'INCREMENT_P2' });
    }
  }
  isDraw() {
    const cellElements = store.getState().boardPositions;

    return cellElements.every((cell) => {
      return cell === this.CIRCLE_CLASS || cell === this.X_CLASS;
    });
  }
  async endGame(draw: boolean) {
    if (draw) {
      store.dispatch({ type: 'SET_TIE', payload: true });
      store.dispatch({ type: 'INCREMENT_TIES' });
    } else {
      let currentClass: CircleOrX;
      const state = store.getState();

      if (state.cpu_or_player === 'cpu') {
        const playerClass =
          state.player === 'circle' ? this.CIRCLE_CLASS : this.X_CLASS;
        currentClass = this.checkCPUWins(playerClass)
          ? playerClass === this.CIRCLE_CLASS
            ? this.X_CLASS
            : this.CIRCLE_CLASS
          : playerClass;
      } else {
        currentClass = this.circleTurn ? this.CIRCLE_CLASS : this.X_CLASS;
      }

      store.dispatch({
        type: 'SET_WINNER',
        payload: currentClass,
      });
    }

    return new Promise((resolve) => setTimeout(resolve, 100));
  }
  checkCPUWins(currentClass: CircleOrX): boolean {
    return this.checkWIn(currentClass) ? false : true;
  }
  async showMessage() {
    const message = document.querySelector('[data-message]') as HTMLDivElement;
    message.classList.add('show');
  }
  placeMark(currentClass: CircleOrX, index: number) {
    store.dispatch({
      type: 'ADD_BOARD_POSITION',
      payload: { index, mark: currentClass },
    });
  }
  swapTurns() {
    this.circleTurn = !this.circleTurn;
    store.dispatch({ type: 'CHECK_CIRCLE' });
  }
  checkWIn(currentClass: CircleOrX) {
    const cellElements = store.getState().boardPositions;

    return this.WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index] === currentClass;
      });
    });
  }
}
