import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/create" className="nav-item">Create a Crewmate</Link>
      <Link to="/gallery" className="nav-item">Crewmate Gallery</Link>
    </nav>
  );
};

export default Navigation;
