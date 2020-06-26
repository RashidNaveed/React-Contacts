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
