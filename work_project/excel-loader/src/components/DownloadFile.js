function DownloadFile({ disabled, resultFile }) {
  const getDownloadFile = async () => {
    // on button lick it should take the file from the state
    // then create a download file element
    try {
      const url = window.URL.createObjectURL(
        new Blob([resultFile], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'summary.xlsx');
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
      Doanload summary file
    </button>
  );
}

export default DownloadFile;
