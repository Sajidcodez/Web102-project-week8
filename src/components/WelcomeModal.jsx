import { useEffect, useState } from 'react';
import './WelcomeModal.css';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Always show on page load

  const handleClose = () => {
    setIsOpen(false);
    // Removed localStorage - modal will show every time page is refreshed
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        <div className="modal-header">
          <h2>🚀 Welcome to Crewmatez!</h2>
        </div>
        
        <div className="modal-body">
          <p className="modal-intro">
            Your ultimate crewmate management system for space missions!
          </p>
          
          <div className="modal-features">
            <div className="feature">
              <span className="feature-icon">👥</span>
              <h3>Create Crewmates</h3>
              <p>Build your perfect crew by creating custom crewmates with unique attributes and speeds</p>
            </div>
            
            <div className="feature">
              <span className="feature-icon">📋</span>
              <h3>View Gallery</h3>
              <p>Browse all your crewmates and click to view detailed information about each one</p>
            </div>
            
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h3>Speed Categories</h3>
              <p>Slow (≤10 mph) • Moderate (11-20 mph) • Fast (21+ mph)</p>
            </div>

            <div className="feature">
              <span className="feature-icon">✏️</span>
              <h3>Edit & Manage</h3>
              <p>Update crewmate details or remove them from your roster anytime</p>
            </div>
          </div>
          
          <p className="modal-footer-text">
            Ready to assemble your crew and send them to space? Let's go! 🌌
          </p>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button" onClick={handleClose}>
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
