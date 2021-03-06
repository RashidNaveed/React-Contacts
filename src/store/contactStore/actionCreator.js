import * as actionType from './actionTypes';

export const editConatct = (contactId, contactData) => {
  return {
    type: actionType.EDIT_CONTACT,
    payload: {
      editContactId: contactId,
      editContactData: contactData,
    },
  };
};

export const deleteContact = (contactId) => {
  return {
    type: actionType.DELETE_CONTACT,
    payload: {
      deleteContactId: contactId,
    },
  };
};

export const newContact = (contactData) => {
  return {
    type: actionType.NEW_CONTACT,
    payload: {
      newContactData: contactData,
    },
  };
};

export const deleteSelectedContact = (contactId) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(deleteContact(contactId));
    }, 2000);
  };
};

export const addNewContact = (contactId) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(newContact(contactId));
    }, 2000);
  };
};
