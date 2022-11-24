function App() {
  let msg = 'Bye there';
  if (Math.random() > 0.5) {
    msg = 'Ok then';
  }
  // here it looks like HTML but they are actually JSX
  // also notice
  const maxLen = 10;
  const myList = [1, 2, 3];

  return (
    <div>
      <h1>{msg}</h1>

      <p>{new Date().toLocaleTimeString()}</p>

      <input
        type="text"
        maxLength={maxLen}
        list={myList}
        spellCheck
        style={{ border: '3px solid red', width: '20em' }}
      />

      <div>
        <textarea autoFocus={true} />
      </div>
    </div>
  );
}
export default App;
