import { useState } from 'react';
import FileUploader from './components/FileUploader';
import NavBar from './components/NavBar';
import fileProcessApi from './api/fileProcessApi';
import Modal from './components/Modal';
import 'bulma/css/bulma.css';
import './App.css';
import { connect } from 'react-redux';
import { diffFiles } from './actions';
import Menu from './components/Menu';

function App({ selectedFilesFromStore, diffFiles }) {
  console.log('my files from store', selectedFilesFromStore);
  const [selectedFiles, setSelectedFiles] = useState({
    baseFile: null,
    compareFile: null
  });
  const [message, setMessage] = useState('');
  const [modalStatus, setModalStatus] = useState('');
  const [downloadDisabled, setdownloadDisabled] = useState(true);
  const [resultFile, setResultFile] = useState(null);

  const onFilesSelect = target => {
    setSelectedFiles({ ...selectedFiles, ...target });
  };

  const onFilesSubmit = async () => {
    /*
    Currently there is no intermediate file saved anywhere, not even in memory
    on clicking submit button it will 
    1. reset the states for message and download button 
       -> message ""
       -> download buttton "disabled"
    2. make sure both files are slected then
       -> set message -> "processing"
    3. call api to perform diffing and retrieve file stream
    4. once successed, update resultFile state with the file stream
    5. update message state -> "process completed"
    */

    setModalStatus('is-active');
    setMessage('');
    setdownloadDisabled(true);

    const formData = new FormData();
    const { baseFile, compareFile } = selectedFiles;

    if (
      !(selectedFilesFromStore.baseFile && selectedFilesFromStore.compareFile)
    ) {
      setMessage('Plesae select both files.');
      return;
    }

    setMessage('Processing...'); // TODO: add a loader
    formData.append('baseFile', selectedFilesFromStore.baseFile);
    formData.append('compareFile', selectedFilesFromStore.compareFile);

    // post files for processing and get back result file
    const response = await diffFiles(formData);
    try {
      const res = await fileProcessApi.post('./diff/get-diff-file', formData, {
        responseType: 'arraybuffer'
      });
      if (res.status === 200) {
        setResultFile(res.data);
        setdownloadDisabled(false);
        setMessage('Process completed!');
      } else setMessage(`Some error happened:${res}`);
    } catch (err) {
      console.log(err);
      setMessage(`Error occured during the process: ${err}`);
    }
  };

  return (
    <div>
      <NavBar />

      <Menu />

      <div className="app">
        <div>
          Please Select the files you would like to compare.
          efefefefefefefefefefefefefe
        </div>
        <div class="control is-loading is-large">
          <p></p>
        </div>

        <div>
          Please Select the files you would like to compare.
          efefefefefefefefefefefefefe
          <p>This is very important</p>
        </div>
        <div>
          <input
            type="file"
            id="filepicker"
            name="filelist"
            webkitdirectory
            multiple
          ></input>
        </div>
        <FileUploader
          target="baseFile"
          description="Base File"
          onFilesSelect={target =>
            setSelectedFiles({ ...selectedFiles, ...target })
          }
        />

        <FileUploader
          target="compareFile"
          description="Compare File"
          onFilesSelect={onFilesSelect}
        />

        <button className="button is-primary" onClick={onFilesSubmit}>
          Submit
        </button>
        <div>Loader!!!!</div>
      </div>
      <div>
        <Modal
          modalSatus={modalStatus}
          handleModalStatus={setModalStatus}
          message={message}
          downloadDisabled={downloadDisabled}
          resultFile={resultFile}
        />
      </div>
      <div></div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('state for the App', state);
  return {
    selectedFilesFromStore: state.selectedFile,
    diffResult: state.file
  };
};

export default connect(mapStateToProps, { diffFiles })(App);
