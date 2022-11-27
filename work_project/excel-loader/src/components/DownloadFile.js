import fileProcessApi from '../api/fileProcessApi';

function DownloadFile({ disabled }) {
  const getDownloadFile = async () => {
    try {
      const response = await fileProcessApi.get('diff/get-file');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'test_download_file.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      className="button is-success"
      onClick={getDownloadFile}
      disabled={disabled}
    >
      Doanload Excel file
    </button>
  );
}

export default DownloadFile;
