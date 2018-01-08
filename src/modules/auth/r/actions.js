export const ACTION_LOGIN       = "ACTION_LOGIN";
export const ACTION_AFTER_LOGIN = "ACTION_AFTER_LOGIN";
export const ACTION_USER_CHANGE = "ACTION_USER_CHANGE";

export const actionLoginWithEmail = (email, password) => ({
  type   : ACTION_LOGIN,
  payload: {email, password}
});

export const actionAfterLogin = (isOk, data = {}) => ({
  type   : ACTION_AFTER_LOGIN,
  payload: {isOk, data}
});

export const actionUserChange = (user) => ({
  type   : ACTION_USER_CHANGE,
  payload: {user}
});

export const ACTION_SAVE_USER = "ACTION_SAVE_USER";

export const actionSaveUser = (user) => ({
  type   : ACTION_SAVE_USER,
  payload: {user}
});

export const ACTION_LOGOUT = "ACTION_LOGOUT";

export const actionLogout = () => ({
  type   : ACTION_LOGOUT,
  payload: {}
});

export const ACTION_AFTER_LOGOUT = "ACTION_AFTER_LOGOUT";

export const actionAfterLogout = (isOk = true, err) => ({
  type   : ACTION_AFTER_LOGOUT,
  payload: {isOk, err}
});
