import {ActionCreator} from 'redux';

type Action<T> = (props: Omit<T, 'type'>) => T;

const setAuthStateAction: Action<SetAuthStateAction> = props => {
  return {
    type: 'SET_AUTH_STATE',
    ...props,
  };
};

const setMyUserAction: Action<SetMyUserAction> = props => {
  return {
    type: 'SET_MY_USER',
    ...props,
  };
};

const updateMyUserAction: Action<UpdateMyUserAction> = props => {
  return {
    type: 'UPDATE_MY_USER',
    ...props,
  };
};

const joinChatAction: Action<JoinChatAction> = props => {
  return {
    type: 'JOIN_CHAT',
    ...props,
  };
};

const leaveChatAction: Action<LeaveChatAction> = props => {
  return {
    type: 'LEAVE_CHAT',
    ...props,
  };
};

const setTokenDataAction: Action<SetTokenDataAction> = props => {
  return {
    type: 'SET_TOKEN_DATA',
    ...props,
  };
};

const refreshTokenDataAction: Action<RefreshTokenDataAction> = props => {
  return {
    type: 'REFRESH_TOKEN_DATA',
    ...props,
  };
};

const updateCoursesAction: Action<UpdateCoursesAction> = props => {
  return {
    type: 'UPDATE_COURSES',
    ...props,
  };
};

const setQuarterAction: Action<SetQuarterAction> = props => {
  return {
    type: 'SET_QUARTER',
    ...props,
  };
};

const signOutAction: Action<SignOutAction> = () => {
  return {
    type: 'SIGN_OUT',
  };
};

const clearStoreAction: Action<ClearStoreAction> = () => {
  return {
    type: 'CLEAR_STORE',
  };
};

const newMessagesAction: Action<NewMessagesAction> = props => {
  return {
    type: 'NEW_MESSAGES',
    ...props,
  };
};

const editUsersAction: Action<EditUsersAction> = props => {
  return {
    type: 'EDIT_USERS',
    ...props,
  };
};

const setUserAction: Action<SetUserAction> = props => {
  return {
    type: 'SET_USER',
    ...props,
  };
};

export {
  setAuthStateAction,
  setMyUserAction,
  updateMyUserAction,
  joinChatAction,
  leaveChatAction,
  setTokenDataAction,
  refreshTokenDataAction,
  updateCoursesAction,
  setQuarterAction,
  signOutAction,
  clearStoreAction,
  newMessagesAction,
  editUsersAction,
  setUserAction,
};
