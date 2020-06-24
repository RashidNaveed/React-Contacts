export const editConatct = (state, action) => {
  const updatedArray = [...state.contacts];
  updatedArray[action.payload.editContactId] = action.payload.editContactData;
  return {
    ...state,
    contacts: updatedArray,
  };
};
export const deleteContact = (state, action) => {
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
