export enum ERoute {
  ME = 'me',
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',

  DASHBOARD = 'dashboard',
  BOARDS = 'boards',
  BOARD_VIEW = 'boards/:boardId',
  BOARD_DETAILS = 'boards/:boardId/details',
  CREATE_BOARD = 'create-board',

  CREATE_TASK = 'create-task',
  TASK_VIEW = 'boards/:boardId/:taskId',

  AGILE_BOARD = 'agile-board',

  BACKLOG = 'backlog',
  SETTING = 'setting',
}
