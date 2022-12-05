import fileProcessApi from '../api/fileProcessApi';

export const selectBaseFile = file => {
  return {
    type: 'BASE_FILE_SELECTED',
    payload: { baseFile: file }
  };
};

export const selectCompareFile = file => {
  return {
    type: 'COMPARE_FILE_SELECTED',
    payload: { compareFile: file }
  };
};

export const diffFiles = formData => async (dispatch, getState) => {
  const res = await fileProcessApi.post('./diff/get-diff-file', formData, {
    responseType: 'arraybuffer'
  });
  console.log('action res', res);
  dispatch({ type: 'DIFF_PROCESSED', payload: { file: res.data } });
};

// try {
//     const res = await fileProcessApi.post('./diff/get-diff-file', formData, {
//       responseType: 'arraybuffer'
//     });
//     if (res.status === 200) {
//       setResultFile(res.data);
//       setdownloadDisabled(false);
//       setMessage('Process completed!');
//     } else setMessage(`Some error happened:${res}`);
//   } catch (err) {
//     console.log(err);
//     setMessage(`Error occured during the process: ${err}`);
//   }
