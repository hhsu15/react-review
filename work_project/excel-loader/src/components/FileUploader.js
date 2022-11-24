import './FileUploader.css';

function FileUploader({ onFilesSelect, target, description }) {
  const handleFileInput = e => {
    const file = e.target.files[0];
    let obj = {};
    obj[target] = file;
    onFilesSelect(obj);
  };

  return (
    <form>
      <label htmlFor="images" className="drop-container">
        <span className="drop-title">{description}</span>
        <input
          type="file"
          required
          onChange={handleFileInput}
          accept=".xlsx, .csv"
        />
      </label>
    </form>
  );
}

export default FileUploader;
