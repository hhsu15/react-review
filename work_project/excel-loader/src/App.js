import { useState } from 'react';
import FileUploader from './components/FileUploader';
import NavBar from './components/NavBar';
import fileProcessApi from './api/fileProcessApi';
import Modal from './components/Modal';
import 'bulma/css/bulma.css';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState({
    baseFile: null,
    compareToFile: null
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
    const { baseFile, compareToFile } = selectedFiles;

    if (!(baseFile && compareToFile)) {
      setMessage('Plesae select both files.');
      return;
    }

    setMessage('Processing...'); // TODO: add a loader
    formData.append('baseFile', baseFile);
    formData.append('compareToFile', compareToFile);

    // post files for processing and get back result file
    try {
      const res = await fileProcessApi.post('./diff/get-diff-file', formData, {
        responseType: 'arraybuffer'
      });
      if (res.status === 200) {
        // set the states once the output file is ready
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
      <div>
        <div className="app">
          <FileUploader
            target="baseFile"
            description="Base File"
            onFilesSelect={target =>
              setSelectedFiles({ ...selectedFiles, ...target })
            }
          />
          <FileUploader
            target="compareToFile"
            description="Compare to File"
            onFilesSelect={onFilesSelect}
          />

          <button className="button is-primary" onClick={onFilesSubmit}>
            Submit
          </button>
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
      </div>
    </div>
  );
}

export default App;
