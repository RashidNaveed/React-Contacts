import * as actionType from './actionTypes';
import * as hookFunction from './hookReducerFunctions';

const hookReducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGEDATA:
      return hookFunction.changeData(state, action);
    case actionType.CHANGENUMBER:
      return hookFunction.changeNumber(state, action);
    case actionType.ADDNUMBER:
      return hookFunction.addNumber(state, action);
    case actionType.REMOVENUMBER:
      return hookFunction.removeNumber(state, action);
    default:
      return state;
  }
};

export default hookReducer;
