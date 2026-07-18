import { Board } from './board.model';

export const BOARD_REPOSITORY = 'boards_repository';

export const boardsProviders = [
  {
    provide: BOARD_REPOSITORY,
    useValue: Board,
  },
];
