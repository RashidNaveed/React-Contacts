export const changeData = (state, action) => {
  const updateData = { ...state };
  updateData[action.payload.key] = action.payload.value;
  return { ...updateData };
};

export const changeNumber = (state, action) => {
  const updateData = { ...state };
  const updateNumber = updateData[action.payload.key];
  let update = { ...updateNumber[action.payload.index] };
  if (action.payload.type) {
    update.type = action.payload.value;
  } else {
    update.number = action.payload.value;
  }
  updateNumber[action.payload.index] = update;
  return { ...updateData };
};

export const addNumber = (state, action) => {
  const newNumber = [
    ...state[action.payload.key],
    { type: 'mobile', number: '' },
  ];
  const updateData = { ...state };
  updateData[action.payload.key] = newNumber;
  return { ...updateData };
};
export const removeNumber = (state, action) => {
  const updatedData = { ...state };
  const removeNumber = [...state[action.payload.key]];
  let deleted = null;
  if (removeNumber.length <= 1) {
    alert('You must have at least one number');
    return { ...updatedData };
  } else {
    deleted = removeNumber
      .slice(0, action.payload.index)
      .concat(
        removeNumber.slice(action.payload.index + 1, removeNumber.length)
      );

    updatedData[action.payload.key] = deleted;
    return { ...updatedData };
  }
};
