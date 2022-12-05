export const selectFilesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BASE_FILE_SELECTED':
      return { ...state, ...action.payload };
    case 'COMPARE_FILE_SELECTED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const diffFilesReducer = (state = {}, action) => {
  if (action.type === 'DIFF_PROCESSED') {
    return { ...state, ...action.payload };
  }
  return state;
};
