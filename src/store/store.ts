import { createStore } from 'redux';

export interface State {
  player: string;
  current_winner: string;
  you: number;
  ties: number;
  cpu: number;
  isCircle: boolean;
  boardPositions: string[];
}

// Define your initial state
const initialState: State = {
  player: '',
  current_winner: '',
  you: 0,
  ties: 0,
  cpu: 0,
  isCircle: true,
  boardPositions: Array(9).fill(null),
};

// Define your actions
const INCREMENT_YOU = 'INCREMENT_YOU';
// const INCREMENT_CPU = 'INCREMENT_CPU';
// const INCREMENT_TIES = 'INCREMENT_TIES';
const CHECK_CIRCLE = 'CHECK_CIRCLE';
const ADD_BOARD_POSITION = 'ADD_BOARD_POSITION';
const CLEAR_BOARD = 'CLEAR_BOARD';
const SET_PLAYER = 'SET_PLAYER';
const SET_WINNER = 'SET_WINNER';

interface AddBoardPositionPayload {
  index: number;
  mark: string;
}

// Define your root reducer
function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHECK_CIRCLE:
      return {
        ...state,
        isCircle: !state.isCircle,
      };
    case INCREMENT_YOU:
      return {
        ...state,
        you: state.you + 1,
      };
    case ADD_BOARD_POSITION:
      const { index, mark }: AddBoardPositionPayload = action.payload;
      const newBoardPositions = [...state.boardPositions];
      newBoardPositions[index] = mark;
      return {
        ...state,
        boardPositions: newBoardPositions,
      };
    case CLEAR_BOARD:
      return {
        ...state,
        boardPositions: Array(9).fill(null),
      };
    case SET_PLAYER:
      return {
        ...state,
        player: state.isCircle ? 'circle' : 'x',
      };
    case SET_WINNER:
      return {
        ...state,
        current_winner: action.payload,
      };
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(rootReducer);

export default store;
