import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import './UpdateCrewmate.css';

const UpdateCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const colorOptions = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];
  
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
        navigate('/gallery', { replace: true });
        console.error(error);
      }
      
      if (data) {
        setName(data.name);
        setSpeed(data.speed);
        setColor(data.color);
      }
      
      setLoading(false);
    };
    
    fetchCrewmate();
  }, [id, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !speed || !color) {
      setFormError('Please fill in all the fields.');
      return;
    }
    
    const { error } = await supabase
      .from('Posts')
      .update({ name, speed, color, createCrewMate: true })
      .eq('id', id);
    
    if (error) {
      setFormError('Error updating crewmate. Please try again.');
      console.error(error);
      return;
    }
    
    navigate('/gallery');
  };
  
  const handleDelete = async () => {
    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(error);
      return;
    }
    
    navigate('/gallery');
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="update-container">
      <h2>Update Your Crewmate :)</h2>
      
      <div className="current-info">
        <h3>Current Crewmate Info:</h3>
        <p>Name: <strong>{name}</strong></p>
        <p>Speed: <strong>{speed} mph</strong></p>
        <p>Color: <strong>{color}</strong></p>
      </div>
      
      <img 
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/among-us-crewmates.jpg" 
        alt="Crewmates" 
        className="update-crewmate-image" 
      />
      
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="speed">Speed (mph):</label>
          <input 
            type="number" 
            step="0.1"
            id="speed" 
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {colorOptions.map(option => (
              <div 
                key={option} 
                className={`color-option ${color === option ? 'selected' : ''}`}
                onClick={() => setColor(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        
        {formError && <div className="error">{formError}</div>}
        
        <div className="button-group">
          <button className="update-button">Update Crewmate</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Delete Crewmate</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCrewmate;
