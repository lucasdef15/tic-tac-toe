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
      this.setBoardHoverClass();
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

  }

  handleClick(e: MouseEvent) {
    const cell = e.target as HTMLElement;
    const index = cell.getAttribute('data-value') as unknown as number;
  
    if (cell.classList.contains('x') || cell.classList.contains('circle'))
      return;
  
    const currentClass: CircleOrX = this.circleTurn
      ? this.CIRCLE_CLASS
      : this.X_CLASS;
  
    this.placeMark(cell, currentClass, index);
  
    if (this.checkWIn(currentClass)) {
      this.endGame(false)
        .then(() => this.incrementPLayers())
        .then(() => this.showMessage());
    } else if (this.isDraw()) {
      this.endGame(true).then(() => this.showMessage());
    } else {
      this.swapTurns();
      this.setBoardHoverClass();
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
    const cellElements = document.querySelectorAll('[data-cell]');
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(this.CIRCLE_CLASS) ||
        cell.classList.contains(this.X_CLASS)
      );
    });
  }

  async endGame(draw: boolean) {
    if (draw) {
      store.dispatch({ type: 'SET_TIE', payload: true });
      store.dispatch({ type: 'INCREMENT_TIES' });
    } else {
      const currentClass: CircleOrX = this.circleTurn
        ? this.CIRCLE_CLASS
        : this.X_CLASS;
      store.dispatch({
        type: 'SET_WINNER',
        payload: currentClass,
      });
    }

    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  async showMessage() {
    const message = document.querySelector('[data-message]') as HTMLDivElement;
    message.classList.add('show');
  }

  placeMark(cell: HTMLElement, currentClass: CircleOrX, index: number) {
    cell.classList.add(currentClass);
    store.dispatch({
      type: 'ADD_BOARD_POSITION',
      payload: { index, mark: currentClass },
    });
  }

  swapTurns() {
    this.circleTurn = !this.circleTurn;
    store.dispatch({ type: 'CHECK_CIRCLE' });
  }
  setBoardHoverClass() {
    let board = document.querySelector('.board') as HTMLDivElement;
    board.classList.remove(this.X_CLASS);
    board.classList.remove(this.CIRCLE_CLASS);
    if (this.circleTurn) {
      board.classList.add(this.CIRCLE_CLASS);
    } else {
      board.classList.add(this.X_CLASS);
    }
  }

  checkWIn(currentClass: CircleOrX) {
    const cellElements = document.querySelectorAll('[data-cell]');
    return this.WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
}
