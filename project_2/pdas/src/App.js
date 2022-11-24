import ProfileCard from './ProfileCard';
import AlexaImage from './images/alexa.png';
import CortanaImage from './images/cortana.png';
import SiriImage from './images/siri.png';
import 'bulma/css/bulma.css';
// console.log(AlexaImage);
// console.log(SiriImage);

function App() {
  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Personal Digital Assistants</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-3">
              {' '}
              <ProfileCard
                tile="alexa"
                handle="@alexa99"
                des="some description"
                image={AlexaImage}
              />
            </div>
            <div className="column is-3">
              <ProfileCard
                tile="Siri"
                handle="@siri99"
                des="some description"
                image={SiriImage}
              />
            </div>
            <div className="column is-3">
              <ProfileCard
                tile="cortana"
                handle="@cortana99"
                des="some description"
                image={CortanaImage}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
