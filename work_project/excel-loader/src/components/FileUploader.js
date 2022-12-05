import './FileUploader.css';
import { connect } from 'react-redux';
import { selectBaseFile, selectCompareFile } from '../actions';

// function FileUploader({ onFilesSelect, target, description }) {
function FileUploader({
  selectedFile,
  target,
  description,
  selectBaseFile,
  selectCompareFile
}) {
  const handleFileInput = e => {
    console.log('selected file:', selectedFile);
    const file = e.target.files[0];
    if (target == 'baseFile') {
      selectBaseFile(file);
    } else {
      if (target == 'compareFile') {
        selectCompareFile(file);
      }
    }

    // let obj = {};
    // obj[target] = file;
    // onFilesSelect(obj);
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

const mapStateToProps = state => {
  console.log('do i get the state?', state);
  // this state is what you see from the reducers (the object from combinedReducers)
  return { selectedFile: state.selectedFile };
};

export default connect(mapStateToProps, { selectBaseFile, selectCompareFile })(
  FileUploader
);

// first argument of connect is the mapStateToProps function, second is the action creator function
// The reason we pass the action creator (this case selectSong) into the connect, is that connect wiwill call the "dispatch" function which in turn will update the redux store.
//export default connect(mapStateToProps, { selectSong })(SongList); // second argument in conncet() is a short hand for {selectSong: selectSong}
