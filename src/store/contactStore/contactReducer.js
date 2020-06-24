import * as actionType from "./actionTypes";
import contactData from "../../projectData/contactData";

const initialState = {
  contacts: [...contactData],
};

const editConatct = (state, action) => {
  const updatedArray = [...state.contacts];
  updatedArray[action.payload.editContactId] = action.payload.editContactData;
  return {
    ...state,
    contacts: updatedArray,
  };
};
const deleteContact = (state, action) => {
  const updatedArray = state.contacts
    .slice(0, action.payload.deleteContactId)
    .concat(
      state.contacts.slice(
        action.payload.deleteContactId + 1,
        state.contacts.length
      )
    );
  return {
    ...state,
    contacts: updatedArray,
  };
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.EDIT_CONTACT:
      return editConatct(state, action);
    case actionType.DELETE_CONTACT:
      return deleteContact(state, action);
    default:
      return state;
  }
};

export default contactReducer;
