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

  const onFilesSelect = target => {
    setSelectedFiles({ ...selectedFiles, ...target });
  };

  const onFilesSubmit = async () => {
    setModalStatus('is-active');

    // reset button status
    setMessage('');
    setdownloadDisabled(true);

    const formData = new FormData();

    const { baseFile, compareToFile } = selectedFiles;

    if (baseFile && compareToFile) {
      formData.append('baseFile', baseFile);
      formData.append('compareToFile', compareToFile);

      const endpoint = './diff';
      const res = await fileProcessApi.post(endpoint, formData);

      console.log(res);

      if (res.status === 200) {
        setMessage(res.data.message);
        setdownloadDisabled(false);
      } else setMessage('Some error happened');
    } else {
      setMessage('Please select both files.');
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
