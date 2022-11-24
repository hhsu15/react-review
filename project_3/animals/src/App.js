import './App.css';
import { useState } from 'react';
import AnimalShow from './AnimalShow';

function getRadomAnimal() {
  const animals = ['bird', 'cat', 'dog', 'gator', 'horse', 'cow'];
  return animals[Math.floor(Math.random() * animals.length)];
}

console.log(getRadomAnimal());

function App() {
  const [animals, setAnimals] = useState([]); // useState takes argment as inital value.
  // we are starting with an empth array
  // then we define a function called setAnimals. this is the fucntion to set/change the state value
  const handleClick = () => {
    setAnimals([...animals, getRadomAnimal()]);
  };

  const renderAnimals = animals.map((animal, index) => {
    return <AnimalShow type={animal} key={index} />;
  });

  return (
    <div className="app">
      <button onClick={handleClick}>Add animal!</button>
      <div className="animal-list">{renderAnimals}</div>
    </div>
  );
}

export default App;
