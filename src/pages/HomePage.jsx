import './HomePage.css';
import WelcomeModal from '../components/WelcomeModal';

const HomePage = () => {
  return (
    <div className="home-container">
      <WelcomeModal />
      <h1>Welcome to the Crewmatez!</h1>
      <p>Send your crewmates to space!!!</p>
      
      <div className="images-container">
        <img 
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/among-us-crewmates.jpg" 
          alt="Crewmates" 
          className="crewmate-image" 
        />
        <img 
          src="https://media.sketchfab.com/models/a0723361035342e08fcc338ca3f71e66/thumbnails/d31b3e9800a846e98eaa75f551ec103e/cfe35dbbad3648acbfc790d55b791366.jpeg" 
          alt="Spaceship" 
          className="spaceship-image" 
        />
      </div>
    </div>
  );
};

export default HomePage;
