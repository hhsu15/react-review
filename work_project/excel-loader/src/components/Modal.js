import DownloadFile from './DownloadFile';

export function Modal({
  modalSatus,
  handleModalStatus,
  message,
  downloadDisabled,
  resultFile
}) {
  return (
    <div className={`modal ${modalSatus}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">File Processor</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              handleModalStatus('');
            }}
          ></button>
        </header>
        <section className="modal-card-body is-loading">{message}</section>
        <footer className="modal-card-foot">
          <DownloadFile disabled={downloadDisabled} resultFile={resultFile} />

          <button
            className="button"
            onClick={() => {
              handleModalStatus('');
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
