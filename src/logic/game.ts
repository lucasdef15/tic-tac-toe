import Data from './data';

type CircleOrX = 'circle' | 'x';

export default class Game {
  static instance: Game = new Game();

  private circleTurn: boolean = false;
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

  private constructor() {}

  startGame(circleTurn: boolean) {
    this.circleTurn = circleTurn;
    const cellElements = document.querySelectorAll('[data-cell]');

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
  }

  handleClick(e: MouseEvent) {
    const cell = e.target as HTMLElement;
    if (cell.classList.contains('x') || cell.classList.contains('circle'))
      return;
    const currentClass: CircleOrX = this.circleTurn
      ? this.CIRCLE_CLASS
      : this.X_CLASS;
    this.placeMark(cell, currentClass);
    if (this.checkWIn(currentClass)) {
      this.endGame(false);
    } else if (this.isDraw()) {
      this.endGame(true);
    } else {
      this.swapTurns();
      this.setBoardHoverClass();
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

  endGame(draw: boolean) {
    if (draw) {
      console.log('draaw');
      // display message if draw
    } else {
      const message = document.querySelector(
        '[data-message]'
      ) as HTMLDivElement;
      message.classList.add('show');
    }
  }

  placeMark(cell: HTMLElement, currentClass: CircleOrX) {
    cell.classList.add(currentClass);
  }

  swapTurns() {
    this.circleTurn = !this.circleTurn;
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
