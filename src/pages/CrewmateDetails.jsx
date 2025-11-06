import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import './CrewmateDetails.css';

const CrewmateDetails = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .eq('createCrewMate', true) 
        .single();
        
      if (error) {
        setError('Could not find the crewmate you are looking for');
        setCrewmate(null);
        console.error(error);
      }
      
      if (data) {
        setCrewmate(data);
        setError(null);
      }
      
      setLoading(false);
    };
    
    fetchCrewmate();
  }, [id]);
  
  if (loading) return <div className="loading">Loading...</div>;
  
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="details-container">
      {crewmate && (
        <div className="crewmate-details" style={{ borderColor: crewmate.color.toLowerCase() }}>
          <h2>Crewmate: {crewmate.name}</h2>
          <img 
            src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/among-us-crewmates.jpg" 
            alt="Crewmate" 
            className="crewmate-detail-image" 
          />
          <div className="stats">
            <h3>Stats:</h3>
            <p>Color: {crewmate.color}</p>
            <p>Speed: {crewmate.speed} mph</p>
          </div>
          <p className="fun-fact">You may want to find a Crewmate with more speed, this one is kind of slow 😉</p>
          <div className="buttons">
            <Link to={`/edit/${crewmate.id}`} className="edit-link">Edit this Crewmate?</Link>
            <Link to="/gallery" className="back-link">Back to Gallery</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrewmateDetails;
