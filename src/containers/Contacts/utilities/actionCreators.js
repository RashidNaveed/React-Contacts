import * as actionType from './actionTypes';

export const changeData = (value) => {
  return {
    type: actionType.CHANGEDATA,
    payload: {
      key: value.key,
      value: value.changedValue,
    },
  };
};

export const changeNumber = (value) => {
  return {
    type: actionType.CHANGENUMBER,
    payload: {
      key: value.key,
      value: value.changedValue,
      index: value.index,
      type: value.type,
    },
  };
};

export const addNumber = (value) => {
  return {
    type: actionType.ADDNUMBER,
    payload: {
      key: value.key,
    },
  };
};

export const removeNumber = (value) => {
  return {
    type: actionType.REMOVENUMBER,
    payload: {
      key: value.key,
      index: value.index,
    },
  };
};
