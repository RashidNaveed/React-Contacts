import contactData from '../../projectData/contactData';
import * as actionType from './actionTypes';
import * as reducerFunction from '../contactStore/utility/index';

const initialState = {
  contacts: [...contactData],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.EDIT_CONTACT:
      return reducerFunction.editConatct(state, action);
    case actionType.DELETE_CONTACT:
      return reducerFunction.deleteContact(state, action);
    case actionType.NEW_CONTACT:
      return reducerFunction.newContact(state, action);
    default:
      return state;
  }
};

export default contactReducer;
