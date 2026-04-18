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
  TASK_VIEW = 'task/:taskId',

  BACKLOG = 'backlog',
  BACKLOG_TASK_VIEW = 'backlog/:taskId',

  PROFILE = 'profile',
}
