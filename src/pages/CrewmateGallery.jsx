import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import './CrewmateGallery.css';

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  
  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('createCrewMate', true) 
        .order('created_at', { ascending: false });
        
      if (error) {
        setFetchError('Could not fetch crewmates');
        setCrewmates([]);
        console.error(error);
      }
      
      if (data) {
        console.log('Data from Supabase:', data);
        setCrewmates(data);
        setFetchError(null);
      }
    };
    
    fetchCrewmates();
  }, []);
  
  return (
    <div className="gallery-container">
      <h2>Your Crewmate Gallery!</h2>
      
      {fetchError && <p className="error">{fetchError}</p>}
      
      {crewmates.length === 0 && !fetchError && (
        <div className="empty-gallery">
          <p>You haven't made a crewmate yet!</p>
          <Link to="/create" className="create-link">Create one now!</Link>
        </div>
      )}
      
      <div className="crewmate-grid">
        {crewmates.map(crewmate => (
          <Link to={`/crewmate/${crewmate.id}`} key={crewmate.id} className="crewmate-card-link">
            <div className="crewmate-card" style={{ borderColor: crewmate.color.toLowerCase() }}>
              <img 
                src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/among-us-crewmates.jpg" 
                alt="Crewmate" 
                className="crewmate-image" 
              />
              <div className="crewmate-info">
                <h3>Name of Crewmate: {crewmate.name}</h3>
                <p>Speed of Crewmate: {crewmate.speed} mph</p>
                <p>Color of Crewmate: {crewmate.color}</p>
              </div>
              <Link to={`/edit/${crewmate.id}`} className="edit-button" onClick={(e) => e.stopPropagation()}>Edit Crewmate</Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CrewmateGallery;
