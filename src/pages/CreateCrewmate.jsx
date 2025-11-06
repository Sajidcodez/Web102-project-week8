import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import './CreateCrewmate.css';

const CreateCrewmate = () => {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const colorOptions = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !speed || !color) {
      setFormError('Please fill in all the fields.');
      return;
    }
    
    try {
      setLoading(true);
      setFormError(null);
      
      const crewmateData = {
        name: name.trim(),
        speed: parseFloat(speed),
        color: color,
        createCrewMate: true 
      };
      
      console.log('Creating crewmate with data:', crewmateData);
      
      const { error } = await supabase
        .from('Posts')
        .insert([crewmateData]);
      
      if (error) {
        console.error('Error creating crewmate:', error);
        setFormError(`Database error: ${error.message} (Code: ${error.code})`);
        return;
      }
      
      setFormError(null);
      navigate('/gallery');
      
    } catch (err) {
      console.error('Exception during crewmate creation:', err);
      setFormError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="create-container">
      <h2>Create a New Crewmate</h2>
      
      <img 
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/among-us-crewmates.jpg" 
        alt="Crewmates" 
        className="create-crewmate-image" 
      />
      
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate name"
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
            placeholder="Enter speed"
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
        {loading && <div className="loading">Creating crewmate...</div>}
        
        <button className="create-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Crewmate'}
        </button>
      </form>
    </div>
  );
};

export default CreateCrewmate;
