import './AnimalShow.css';
import bird from './images/bird.svg';
import cat from './images/cat.svg';
import cow from './images/cow.svg';
import dog from './images/dog.svg';
import gator from './images/gator.svg';
import horse from './images/horse.svg';
import heart from './images/heart.svg';
import { useState } from 'react';

const svgMap = {
  bird, // same as bird: bird
  cat,
  cow,
  dog,
  gator,
  horse
};

function AnimalShow({ type }) {
  const [clicks, setClicks] = useState(0);
  const handleClick = () => {
    setClicks(clicks + 1);
  };
  console.log(clicks);
  return (
    <div className="animial-show" onClick={handleClick}>
      <img
        className="animal"
        src={svgMap[type]}
        alt="animal"
        style={{ width: '100px' }}
      />
      <img
        className="heart"
        src={heart}
        alt="heart"
        style={{ width: 10 + clicks * 5 + 'px' }}
      />
    </div>
  );
}

export default AnimalShow;
