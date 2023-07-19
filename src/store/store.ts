import { createStore } from 'redux';

export interface State {
  player: string;
  isTie: boolean;
  current_winner: string;
  p1: number;
  ties: number;
  p2: number;
  isCircle: boolean;
  boardPositions: string[];
  cpu_or_player: 'cpu' | 'player' | null;
  count: number;
  location: string;
}

// Define your initial state
const initialState: State = {
  player: 'circle',
  isTie: false,
  current_winner: '',
  p1: 0,
  ties: 0,
  p2: 0,
  isCircle: true,
  boardPositions: Array(9).fill(null),
  cpu_or_player: 'cpu', //change to null later
  count: 0,
  location: ''
};

// Define your actions
const INCREMENT_P1 = 'INCREMENT_P1';
const INCREMENT_P2 = 'INCREMENT_P2';
const INCREMENT_TIES = 'INCREMENT_TIES';
const CHECK_CIRCLE = 'CHECK_CIRCLE';
const ADD_BOARD_POSITION = 'ADD_BOARD_POSITION';
const CLEAR_BOARD = 'CLEAR_BOARD';
const SET_PLAYER = 'SET_PLAYER';
const SET_WINNER = 'SET_WINNER';
const SET_TIE = 'SET_TIE';
const SET_CPU_OR_PLAYER = 'SET_CPU_OR_PLAYER';
const QUIT_GAME = 'QUIT_GAME';
const INCREMENT_COUNT = 'INCREMENT_COUNT';
const SET_LOCATION = 'SET_LOCATION';

interface AddBoardPositionPayload {
  index: number;
  mark: string;
}

// Define your root reducer
function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CPU_OR_PLAYER:
      return {
        ...state,
        cpu_or_player: action.payload,
      };
    case CHECK_CIRCLE:
      return {
        ...state,
        isCircle: !state.isCircle,
      };
    case INCREMENT_P1:
      return {
        ...state,
        p1: state.p1 + 1,
      };
    case INCREMENT_P2:
      return {
        ...state,
        p2: state.p2 + 1,
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
    case SET_TIE:
      return {
        ...state,
        isTie: action.payload,
      };
    case INCREMENT_TIES:
      return {
        ...state,
        ties: state.ties + 1,
      };
    case QUIT_GAME:
      return initialState;
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case SET_LOCATION:
      return{
      ...state,
      location: location.href
    }
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(rootReducer);

export default store;
